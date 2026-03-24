import Chain from "libs/Chain/Chain";
import Utils from "libs/JSUtils/Utils";
import ThreadState from "./ThreadState";
import Native from "libs/Chain/Native";

const AST_GUARD = 0x1000;
const TAG = "THREAD";

export default class Thread
{
	static getTro(thread)
	{
		let tro = Chain.read64(thread + Chain.offsets().tro);
		// Ignore threads with invalid tro address.
		if (!(tro & 0xf000000000000000n))
		{
			//console.log(TAG,`Got invalid tro of thread:${Utils.hex(thread)} and value:${Utils.hex(tro)}`);
			return 0n;
		}
		return tro;
	}
	static getCtid(thread)
	{
		let ctid = Chain.read32(thread + Chain.offsets().ctid);
		return ctid;
	}
	static getTask(thread)
	{
		let tro = this.getTro(thread);
		// Ignore threads with invalid tro address.
		if (!(tro & 0xf000000000000000n) || tro === 0n)
			return 0n;
		let task = Chain.read64(tro + Chain.offsets().troTask);
		return task;
	}
	static next(thread)
	{
		if (Chain.strip(thread + Chain.offsets().taskThreads) < 0xffffffd000000000n)
			return 0;
		let next = Chain.read64(thread + Chain.offsets().taskThreads);
		if (next < 0xffffffd000000000n)
			return 0;
		return next;
	}
	static setMutex(thread,ctid)
	{
		Chain.write32(thread + Chain.offsets().mutexData, ctid);
	}
	static getMutex(thread)
	{
		let mutex = Chain.read32(thread + Chain.offsets().mutexData);
		return mutex;
	}
	static getStack(thread)
	{
		let stackptr = Chain.read64(thread + Chain.offsets().kstackptr);
		return stackptr;
	}
	static injectGuardException(thread,code)
	{
		if(!this.getTro(thread))
		{
			console.log(TAG,`got invalid tro of thread, not injecting exception since thread is dead`);
			return false;
		}

		// 18.4+
		if (xnuVersion.major == 24 && xnuVersion.minor >= 4) {
			Chain.write64(thread + Chain.offsets().guardExcCode, 0x17n);
			Chain.write64(thread + Chain.offsets().guardExcCode + 0x8n, code);
		}
		else {
			Chain.write64(thread + Chain.offsets().guardExcCode, code);
		}

		let ast = Chain.read32(thread + Chain.offsets().ast);
		ast |= AST_GUARD;
		Chain.write32(thread + Chain.offsets().ast, ast);
		return true;
	}
	static clearGuardException(thread)
	{
		if(!this.getTro(thread))
		{
			console.log(TAG,`got invalid tro of thread, still clearing exception to avoid crash`);
		}
		let ast = Chain.read32(thread + Chain.offsets().ast);
		ast &= ~AST_GUARD | 0x80000000;
		Chain.write32(thread + Chain.offsets().ast, ast);

		// 18.4+
		if (xnuVersion.major == 24 && xnuVersion.minor >= 4) {
			if (Chain.read64(thread + Chain.offsets().guardExcCode) == 0x17n) {
				Chain.write64(thread + Chain.offsets().guardExcCode, 0n);
				Chain.write64(thread + Chain.offsets().guardExcCode + 0x8n, 0n);
			}
		}
		else {
			Chain.write64(thread + Chain.offsets().guardExcCode, 0n);
		}
	}
	static getOptions(thread)
	{
		let options = Chain.read16(thread + Chain.offsets().options);
		return options;
	}
	static setOptions(thread, options)
	{
		Chain.write16(thread + Chain.offsets().options, options);
	}
	static getRopPid(thread)
	{
		let ropPid = Chain.read64(thread + Chain.offsets().ropPid);
		return ropPid;
	}
	static getJopPid(thread)
	{
		let jopPid = Chain.read64(thread + Chain.offsets().jopPid);
		return jopPid;
	}
	static setPACKeys(thread, keyA, keyB)
	{
		Chain.write64(thread + Chain.offsets().ropPid, keyA);
		Chain.write64(thread + Chain.offsets().jopPid, keyB);
	}

	static getState(machThread)
	{
		let statePtr = Native.mem;
		let stateCountPtr = Native.mem + 0x200n;
		Native.write32(stateCountPtr, Utils.ARM_THREAD_STATE64_COUNT);
		let kr = Native.callSymbol("thread_get_state",
			machThread,
			Utils.ARM_THREAD_STATE64,
			statePtr,
			stateCountPtr);
		if (kr != 0) {
			console.log(TAG, "Unable to read thread state");
			return false;
		}

		let stateBuff = Native.read(statePtr, Utils.ARM_THREAD_STATE64_SIZE);
		let state = new ThreadState(stateBuff);
		return state;
	}

	static setState(machThread, threadAddr, state)
	{
		let options = 0;
		if (threadAddr) {
			options = Thread.getOptions(threadAddr);
			options |= 0x8000;
			Thread.setOptions(threadAddr, options);
		}

		let statePtr = Native.mem;
		Native.write(statePtr, state.buffer);
		//console.log(TAG,`thread:${Utils.hex(thread)}`);
		let kr = Native.callSymbol("thread_set_state",
			machThread,
			Utils.ARM_THREAD_STATE64,
			statePtr,
			Utils.ARM_THREAD_STATE64_COUNT);
		if (kr != 0)
		{
			console.log(TAG,`Failed thread_set_state with error:${kr}`);
			return false;
		}

		if (threadAddr) {
			options &= ~0x8000;
			Thread.setOptions(threadAddr, options);
		}
		return true;
	}

	static resume(machThread)
	{
		let kr = Native.callSymbol("thread_resume", machThread);
		if (kr != 0) {
			console.log(TAG, "Unable to resume suspended thread");
			return false;
		}
		return true;
	}
}
