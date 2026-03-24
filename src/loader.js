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
		
		//log("baseAddr: " + this.#baseAddr);
		//log("dlsymAddr: " + this.#dlsymAddr);
		
		//this.#memcpyAddr = this.#dlsym("test");
		//log("memcpyAddr: " + this.#memcpyAddr);
		//log("oinvAddr: " + this.#oinvAddr);
		
		this.mem = this.#nativeCallAddr(this.#mallocAddr, BigInt(this.memSize)); //this.callSymbol("malloc", this.memSize);
		this.#argMem = this.#nativeCallAddr(this.#mallocAddr, 0x1000n); //this.callSymbol("malloc", 0x1000);
		this.#argMemPtr = this.#nativeCallAddr(this.#mallocAddr, 0x1000n); //this.callSymbol("malloc", 0x1000);
		this.#argMemPtrStr = this.#nativeCallAddr(this.#mallocAddr, 0x1000n); //this.callSymbol("malloc", 0x1000);
		this.#argPtr = this.#argMem;
		this.#argPtrPtr = this.#argMemPtr;
		this.#argPtrStrPtr = this.#argMemPtrStr;
		
		//log("argMem: " + this.#argMem);
		//log("argMemPtr: " + this.#argMemPtr);
		//log("argMemPtrStr: " + this.#argMemPtrStr);
	}
	
	static write(ptr, buff) {
		if (!ptr)
			return false;
		//log("write: " + buff.byteLength);
		let buff8 = new Uint8Array(nativeCallBuff);
		let offs = 0;
		let left = buff.byteLength;
		while (left) {
			let len = left;
			if (len > 0x1000)
				len = 0x1000;
			//log(`writing: ptr=${ptr}, src=${Native.#baseAddr + 0x1000n}, offs=${offs}, len=${len}`);
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
		//log(`read: ptr=${ptr}, length=${length}, ${typeof(length)}`, ptr, length);
		let buff = new ArrayBuffer(length);
		let buff8 = new Uint8Array(buff);
		let offs = 0;
		let left = length;
		while (left) {
			let len = left;
			if (len > 0x1000)
				len = 0x1000;
			//log(`reading: ptr=${ptr}, dst=${Native.#baseAddr + 0x1000n}, offs=${offs}, len=${len}`);
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
	
	static readString(ptr, len=1024) {
		let buff = this.read(ptr, len);
		return this.bytesToString(buff, false);
	}
	
	static writeString(ptr, str) {
		const buff = this.stringToBytes(str, true);
		this.write(ptr, buff);
	}
	
	static callSymbol(name, x0, x1, x2, x3, x4, x5, x6, x7) {
		//log("callSymbol: " + name);
		// Initialize argPtr to point to general purpose memory chunk
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
	
	static callSymbolRetain(name, x0, x1, x2, x3, x4, x5, x6, x7) {
		//log("callSymbolRetain: " + name);
		// Initialize argPtrPtr to point to general purpose memory chunk
		this.#argPtrPtr = this.#argMemPtr;
		this.#argPtrStrPtr = this.#argMemPtrStr;
		x0 = this.#toNativePtr(x0);
		x1 = this.#toNativePtr(x1);
		x2 = this.#toNativePtr(x2);
		x3 = this.#toNativePtr(x3);
		x4 = this.#toNativePtr(x4);
		x5 = this.#toNativePtr(x5);
		x6 = this.#toNativePtr(x6);
		x7 = this.#toNativePtr(x7);
		let ret = this.#nativeCallSymbolRetain(name, x0, x1, x2, x3, x4, x5, x6, x7);
		// Reset argPtrPtr
		this.#argPtrPtr = this.#argMemPtr;
		this.#argPtrStrPtr = this.#argMemPtrStr;
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
		//log("toNative: " + typeof value);
		// Strings need to be manually written to native memory
		if (!value)
			return 0n;
		if (typeof value === 'string') {
			if (value.length >= 0x1000) {
				log('toNative(): arg string is too long');
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
	
	static #toNativePtr(value) {
		//log("toNativePtr: " + typeof value);
		// Strings need to be manually written to native memory
		if (!value)
			return 0n;
		let ptr = this.#argPtrPtr;
		if (typeof value === 'string') {
			if (value.length >= 0x1000) {
				log('toNativePtr(): arg string is too long');
				return 0n;
			}
			let strPtr = this.#argPtrStrPtr;
			this.writeString(strPtr, value);
			this.#argPtrStrPtr += BigInt(value.length + 1);
			value = strPtr;
		}
		else if (typeof value !== 'bigint') {
			value = BigInt(value);
		}
		const buff = new ArrayBuffer(8);
		const view = new DataView(buff);
		view.setBigUint64(0, value, true);
		this.write(ptr, buff);
		this.#argPtrPtr += 8n;
		return ptr;
	}
	
	static #dlsym(name) {
		if (!name)
			return 0n;
		let addr = this.#dlsymCache[name];
		if (addr)
			return addr;
		//log("dlsym(): " + name);
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
		//log("nativeCallAddr(): " + addr);
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
		//log("nativeCallSymbol(): " + name);
		const funcAddr = this.#dlsym(name);
		const ret64 = this.#nativeCallAddr(funcAddr, ...args);
		if (ret64 < 0xffffffffn && ret64 > -0xffffffffn)
			return Number(ret64);
		return ret64;
	}
	
	static #nativeCallSymbolRetain(name, x0, x1, x2, x3, x4, x5, x6, x7) {
		//log("nativeCallSymbolRetain(): " + name);
		const funcAddr = this.#dlsym(name);
		
		const selRetainArguments = this.callSymbol("sel_registerName", "retainArguments");
		const selSetArgument = this.callSymbol("sel_registerName", "setArgument:atIndex:");
		const selInvokeUsingIMP = this.callSymbol("sel_registerName", "invokeUsingIMP:");
		const selGetReturnValue = this.callSymbol("sel_registerName", "getReturnValue:");
		
		this.callSymbol("objc_msgSend", this.#oinvAddr, selRetainArguments);
		
		if (x0) this.callSymbol("objc_msgSend", this.#oinvAddr, selSetArgument, x0, 0);
		if (x1) this.callSymbol("objc_msgSend", this.#oinvAddr, selSetArgument, x1, 1);
		if (x2) this.callSymbol("objc_msgSend", this.#oinvAddr, selSetArgument, x2, 2);
		if (x3) this.callSymbol("objc_msgSend", this.#oinvAddr, selSetArgument, x3, 3);
		if (x4) this.callSymbol("objc_msgSend", this.#oinvAddr, selSetArgument, x4, 4);
		if (x5) this.callSymbol("objc_msgSend", this.#oinvAddr, selSetArgument, x5, 5);
		if (x6) this.callSymbol("objc_msgSend", this.#oinvAddr, selSetArgument, x6, 6);
		if (x7) this.callSymbol("objc_msgSend", this.#oinvAddr, selSetArgument, x7, 7);
		
		this.callSymbol("objc_msgSend", this.#oinvAddr, selInvokeUsingIMP, funcAddr);
		
		this.callSymbol("objc_msgSend", this.#oinvAddr, selGetReturnValue, this.#argMemPtr);
		const ret64 = this.readPtr(this.#argMemPtr);
		if (ret64 < 0xffffffffn && ret64 > -0xffffffffn)
			return Number(ret64);
		return ret64;
	}
}

function File(path) {
	return path;
}

function log(msg) {
	if (logging)
		return;

	logging = true;
	
	const data = Native.stringToBytes(msg + "\n");

	const O_WRONLY = 0x0001;
	const O_APPEND = 0x0008;
	const O_CREAT = 0x0200;
	const flags = O_WRONLY | O_CREAT | O_APPEND;
	const fd = Native.callSymbol("open", File(logfile), flags, 0o644);
	if (fd < 0) {
		logging = false;
		return;
	}

	// For some reason file mode is not applied on open()
	Native.callSymbol("fchmod", fd, 0o644);

	let offs = 0;
	let left = data.byteLength;

	const buffSize = 0x4000;
	const buffPtr = Native.callSymbol("malloc", buffSize);

	while (left) {
		const size = left > buffSize ? buffSize : left;
		const src8 = new Uint8Array(data, offs, size);
		const dst8 = new Uint8Array(src8);
		Native.write(buffPtr, dst8.buffer);
		const len = Native.callSymbol("write", fd, buffPtr, size);
		if (!len || len < 0)
			break;
		offs += len;
		left -= len;
	}

	Native.callSymbol("free", buffPtr);
	Native.callSymbol("close", fd);

	logging = false;
}

var logging = false;
const logfile = "/private/var/mobile/Media/RemoteLog.log";

Native.init();

Native.callSymbol("unlink", File(logfile));
