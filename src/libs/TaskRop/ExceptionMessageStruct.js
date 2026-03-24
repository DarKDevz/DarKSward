import MachMsgHeaderStruct from "./MachMsgHeaderStruct";
import ThreadState from "./ThreadState";

export default class ExceptionMessageStruct 
{
	#buffer;
	#dataView;

	constructor(buffer) {
		this.#buffer = buffer;
		this.#dataView = new DataView(this.#buffer);
		this.Head = new MachMsgHeaderStruct(this.#buffer);
		this.threadState = new ThreadState(this.#buffer,64);
	}

	get NDR() { return this.#dataView.getBigUint64(24,true); }
	set NDR(value) { this.#dataView.setBigUint64(24,value,true); }

	get exception() { return this.#dataView.getUint32(32,true); }
	set exception(value) { this.#dataView.setUint32(32,value,true); }

	get codeCnt() { return this.#dataView.getUint32(36,true); }
	set codeCnt(value) { this.#dataView.setUint32(36,value,true); }

	get codeFirst() { return this.#dataView.getBigUint64(40,true); }
	set codeFirst(value) { this.#dataView.setBigUint64(40,value,true); }

	get codeSecond() { return this.#dataView.getBigUint64(48,true); }
	set codeSecond(value) { this.#dataView.setBigUint64(48,value,true); }

	get flavor() { return this.#dataView.getUint32(56,true); }
	set flavor(value) { this.#dataView.setUint32(56,value,true); }

	get old_stateCnt() { return this.#dataView.getUint32(60,true); }
	set old_stateCnt(value) { this.#dataView.setUint32(60,value,true); }

	get paddingFirst() { return this.#dataView.getBigUint64(336,true); }
	set paddingFirst(value) { this.#dataView.setBigUint64(336,value,true); }
	
	get paddingSecond() { return this.#dataView.getBigUint64(344,true); }
	set paddingSecond(value) { this.#dataView.setBigUint64(344,value,true); }
}