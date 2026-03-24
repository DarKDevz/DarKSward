const RTLD_DEFAULT = 0xFFFFFFFFFFFFFFFEn;

export default class Native {

	// Preallocated memory chunk for general purpose stuff for public use
	static mem = 0n;
	static memSize = 0x4000;

	// Preallocated memory chunk for encoding/decoding of string arguments
	static #argMem = 0n;

	// Pointer to next available memory for native argument
	static #argPtr = 0n;

	static {
		this.mem = this.callSymbol("malloc", this.memSize);
		this.#argMem = this.callSymbol("malloc", 0x1000n);
		this.#argPtr = this.#argMem;
	}

	static write(ptr, buff) {
		let buffPtr = read64(read64(addrof(buff) + 0x10n) + 0x10n);
		this.callSymbol("memcpy", ptr, buffPtr, buff.byteLength);
	}
	static write32(ptr, value) {
		let buffWrite = new ArrayBuffer(4);
		const view = new DataView(buffWrite);
		view.setUint32(0, value, true);
		this.write(ptr, buffWrite);
	}

	static read(ptr, length) {
		let buffRes = new ArrayBuffer(length);
		let buffPtr = read64(read64(addrof(buffRes) + 0x10n) + 0x10n);
		this.callSymbol("memcpy", buffPtr, ptr, length);
		return buffRes;
	}

	static read8(ptr) {
		let buff = this.read(ptr, 1);
		const view = new DataView(buff);
		return view.getUint8(0);
	}

	static read16(ptr) {
		let buff = this.read(ptr, 2);
		const view = new DataView(buff);
		return view.getUint16(0, true);
	}

	static read32(ptr) {
		let buff = this.read(ptr, 4);
		const view = new DataView(buff);
		return view.getUint32(0, true);
	}

	static read64(ptr) {
		let buff = this.read(ptr, 8);
		const view = new DataView(buff);
		return view.getBigUint64(0, true);
	}

	static readPtr(ptr) {
		return this.read64(ptr);
	}

	static readString(ptr, len=1024) {
		let buff = this.read(ptr, len);
		return this.bytesToString(buff, false);
	}

	static write8(ptr, value) {
		let buffWrite = new ArrayBuffer(1);
		const view = new DataView(buffWrite);
		view.setUint8(0, value);
		this.write(ptr, buffWrite);
	}

	static write16(ptr, value) {
		let buffWrite = new ArrayBuffer(2);
		const view = new DataView(buffWrite);
		view.setUint16(0, value, true);
		this.write(ptr, buffWrite);
	}

	static write32(ptr, value) {
		let buffWrite = new ArrayBuffer(4);
		const view = new DataView(buffWrite);
		view.setUint32(0, value, true);
		this.write(ptr, buffWrite);
	}

	static write64(ptr, value) {
		let buffWrite = new ArrayBuffer(8);
		const view = new DataView(buffWrite);
		view.setBigUint64(0, value, true);
		this.write(ptr, buffWrite);
	}

	static writeString(ptr, str) {
		//const buff = this.stringToBytes(str, true);
		//this.write(ptr, buff);
		this.callSymbol("memcpy", ptr, str, str.length + 1);
	}

	static getCString(str) {
		return get_cstring(str);
	}

	static #prepareArg(arg) {
		if(!arg)
			arg = 0n;
		if(typeof(arg) === "string")
			return get_cstring(arg);
		return BigInt(arg);
	}

	static strip(address) {
		return address & 0x7fffffffffn;
	}

	static pacia(address, modifier) {
		address = Native.strip(address);
		//console.log(TAG,`address:${Utils.hex(address)}, modifier:${Utils.hex(modifier)}`);
		let signedAddress = pacia(address, BigInt(modifier));
		//console.log(TAG,`signedAddress:${Utils.hex(signedAddress)}`);
		return signedAddress;
	}

	static dlsym(name) {
		return Native.callSymbol("dlsym", RTLD_DEFAULT, name);
	}

	static callSymbol(name, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
		let funcSymbol = null;
		if(name === "dlysm")
			funcSymbol = DLSYM;
		else
			funcSymbol = fcall(DLSYM,RTLD_DEFAULT,get_cstring(name));
		a0 = this.#prepareArg(a0);
		a1 = this.#prepareArg(a1);
		a2 = this.#prepareArg(a2);
		a3 = this.#prepareArg(a3);
		a4 = this.#prepareArg(a4);
		a5 = this.#prepareArg(a5);
		a6 = this.#prepareArg(a6);
		a7 = this.#prepareArg(a7);
		a8 = this.#prepareArg(a8);
		a9 = this.#prepareArg(a9);
		a10 = this.#prepareArg(a10);
		a11 = this.#prepareArg(a11);
		a12 = this.#prepareArg(a12);
		a13 = this.#prepareArg(a13);
		a14 = this.#prepareArg(a14);
		a15 = this.#prepareArg(a15);
		let chosen_fcall = null;
		if(typeof fcall_with_pacia !== 'undefined')
			chosen_fcall = fcall_with_pacia;
		else
			chosen_fcall = fcall;
		const ret64 = chosen_fcall(funcSymbol, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15);
		if (ret64 < 0xffffffffn && ret64 > -0xffffffffn)
			return Number(ret64);
		if (ret64 == 0xffffffffffffffffn)
			return -1;
		return ret64;
	}

	static callSymbolRetain(name, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
		return Native.callSymbol(name,a0,a1,a2,a3,a4,a5,a6,a7,a8, a9, a10, a11, a12, a13, a14, a15);
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

	static #doNativeCall(func, name, x0, x1, x2, x3, x4, x5, x6, x7) {
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
		let ret = func(name, x0, x1, x2, x3, x4, x5, x6, x7);
		// Reset argPtr
		this.#argPtr = this.#argMem;
		return this.#fromNative(ret);
	}

	static #fromNative(value) {
		if (!(value instanceof ArrayBuffer))
			return value;
		const view = new DataView(value);
		return view.getBigInt64(0, true);
	}

	static #toNative(value) {
		// Strings need to be manually written to native memory
		if (typeof value === 'string') {
			let ptr = this.#argPtr;
			this.writeString(ptr, value);
			this.#argPtr += BigInt(value.length + 1);
			return this.#bigIntToArray(ptr);
		}
		else if (typeof value === 'bigint') {
			return this.#bigIntToArray(value);
		}
		else
			return value;
	}

	static #bigIntToArray(value) {
		let a = new Uint8Array(8);
		for (let i=0; i<8; i++) {
			a[i] = Number(value & 0xffn)
			value >>= 8n;
		}
		return a.buffer;
	}
	static gc() {
	}
}

// Register global Native class
globalThis.Native = Native;
