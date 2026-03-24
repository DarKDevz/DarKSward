export default class MachMsgHeaderStruct
{
	#dataView;

	constructor(buffer, offset = 0) {
		this.#dataView = new DataView(buffer,offset);
	}

	get msgh_bits() { return this.#dataView.getUint32(0,true); }
	set msgh_bits(value) { this.#dataView.setUint32(0,value,true); }

	get msgh_size() { return this.#dataView.getUint32(4,true); }
	set msgh_size(value) { this.#dataView.setUint32(4,value,true); }

	get msgh_remote_port() { return this.#dataView.getUint32(8,true); }
	set msgh_remote_port(value) { this.#dataView.setUint32(8,value,true); }

	get msgh_local_port() { return this.#dataView.getUint32(12,true); }
	set msgh_local_port(value) { this.#dataView.setUint32(12,value,true); }

	get msgh_voucher_port() { return this.#dataView.getUint32(16,true); }
	set msgh_voucher_port(value) { this.#dataView.setUint32(16,value,true); }
	
	get msgh_id() { return this.#dataView.getUint32(20,true); }
	set msgh_id(value) { this.#dataView.setUint32(20,value,true); }

	static MACH_MSGH_BITS(remote, local)
	{
		return ((remote) | ((local) << 8));
	}
}