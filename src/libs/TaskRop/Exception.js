import Chain from "libs/Chain/Native";
import Utils from "libs/JSUtils/Utils";
import ExceptionMessageStruct from "./ExceptionMessageStruct";
import ExceptionReplyStruct from "./ExceptionReplyStruct";
import MachMsgHeaderStruct from "./MachMsgHeaderStruct";

const TAG = "EXCEPTION";

const MPO_INSERT_SEND_RIGHT = 0x10;
const MPO_PROVISIONAL_ID_PROT_OPTOUT = 0x8000;
const MACH_SEND_MSG = 0x00000001n;
const MACH_RCV_MSG = 0x00000002n;
const MACH_SEND_TIMEOUT = 0x00000010n;
const MACH_RCV_TIMEOUT = 0x00000100n;
const MACH_MSG_TYPE_MOVE_SEND_ONCE = 18;

export default class Exception
{
	static ExceptionMessageSize = 0x160n;
	static ExceptionReplySize = 0x13cn;

	static createPort()
	{
		let options = Chain.mem;
		const buffer = new ArrayBuffer(8);
		const view = new DataView(buffer);
		view.setUint32(0, MPO_INSERT_SEND_RIGHT | MPO_PROVISIONAL_ID_PROT_OPTOUT, true);
		view.setUint32(4, 0, true);
		Chain.write(options, buffer);
		let exceptionPortPtr = Chain.mem + 0x100n;
		let kr = Chain.callSymbol("mach_port_construct",0x203, options, 0n, exceptionPortPtr);
		if (kr != 0)
		{
			console.log(TAG,`Error creating exception port:${kr}`);
			return 0;
		}
		let port = Chain.read32(exceptionPortPtr);
		return BigInt(port);
	}

	static waitException(exceptionPort, excBuffer, timeout, debug)
	{
		let t1 = new Date().getTime();
		if (debug)
			console.log(TAG,`Waiting exception...`);
		let ret = Chain.callSymbol("mach_msg",
			excBuffer,
			MACH_RCV_MSG | MACH_RCV_TIMEOUT,
			0, this.ExceptionMessageSize,
			exceptionPort,
			timeout,
			0);
		if (ret != 0)
		{
			let errString = Chain.callSymbol("mach_error_string",ret);
			errString = Chain.readString(errString);
			//console.log(TAG,`Error receiving exception message:${errString}`);
			return false;
		}
		if (debug)
		{
			let excRes = Chain.read(excBuffer,Number(this.ExceptionMessageSize));
			let exc = new ExceptionMessageStruct(excRes);
			let elapsed = new Date().getTime() - t1;
			//console.log(TAG,`Got exception succesfully after ${elapsed} ms with [id:${exc.Head.msgh_id}, exc=${exc.exception}, code=${Utils.hex(exc.codeFirst)}]`);
			//console.log(TAG,`PC:${Utils.hex(exc.threadState.opaque_pc)}`);
			//console.log(TAG,`LR:${Utils.hex(exc.threadState.opaque_lr)}`);
			//console.log(TAG,`SP:${Utils.hex(exc.threadState.opaque_sp)}`);
			//console.log(TAG,`FP:${Utils.hex(exc.threadState.opaque_fp)}`);
			//for(let i = 0; i < 29; i++)
			//	console.log(TAG,`x[${i}]:${Utils.hex(exc.threadState.registers.get(i))}`);
		}
		return true;
	}

	static replyWithState(exc,state,debug)
	{
		let replyBuf = new ArrayBuffer(Number(this.ExceptionReplySize));
		let reply = new ExceptionReplyStruct(replyBuf);
		let sendSize = Number(this.ExceptionReplySize);
		let recvSize = 0n;
		if(debug)
		{
			console.log(TAG,`Reply with state:`);
			console.log(TAG,`PC:${Utils.hex(state.opaque_pc)}`);
			console.log(TAG,`LR:${Utils.hex(state.opaque_lr)}`);
			console.log(TAG,`SP:${Utils.hex(state.opaque_sp)}`);
			console.log(TAG,`FP:${Utils.hex(state.opaque_fp)}`);
		}
		
		reply.Head.msgh_bits = MachMsgHeaderStruct.MACH_MSGH_BITS(MACH_MSG_TYPE_MOVE_SEND_ONCE, 0);
		reply.Head.msgh_size = sendSize;
		reply.Head.msgh_remote_port = exc.Head.msgh_remote_port;
		reply.Head.msgh_local_port = 0;
		reply.Head.msgh_id = exc.Head.msgh_id + 100;
		reply.NDR = exc.NDR;
		reply.RetCode = 0;
		reply.flavor = Utils.ARM_THREAD_STATE64;
		reply.new_stateCnt = Utils.ARM_THREAD_STATE64_COUNT;
		//TODO make it inside ThreadState to copy thread state to another variable
		for(let i = 0; i < 29; i++)
		{
			reply.threadState.registers.set(i,state.registers.get(i));
		}
		reply.threadState.opaque_fp = state.opaque_fp;
		reply.threadState.opaque_lr = state.opaque_lr;
		reply.threadState.opaque_sp = state.opaque_sp;
		reply.threadState.opaque_pc = state.opaque_pc;
		reply.threadState.cspr = state.cspr;
		reply.threadState.opaque_flags = state.opaque_flags;
		let replyMem = Chain.mem;
		Chain.write(replyMem,replyBuf);
		if(debug)
			Utils.printArrayBufferInChunks(replyBuf);
		let ret = Chain.callSymbol("mach_msg",
				replyMem,
				MACH_SEND_MSG,
				sendSize, recvSize,
				0n,
				0n,
				0n);

		if (ret != 0)
			console.log(TAG,`Error replying exception:${Chain.callSymbol("mach_error_string",ret)}`);
	}
}
