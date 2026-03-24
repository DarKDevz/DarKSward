import RegistersStruct from "./RegistersStruct";

export default class ThreadState
{
	#buffer;
	#dataView;
	constructor(buffer, offset = 0)
	{
		this.#buffer = buffer;
		this.#dataView = new DataView(buffer,offset);
		this.registers = new RegistersStruct(buffer,offset);
	}
	get buffer()
	{
		return this.#buffer;
	}
	get opaque_fp()
	{
		return this.#dataView.getBigUint64(232,true);
	}
	set opaque_fp(value)
	{
		this.#dataView.setBigUint64(232,value,true);
	}
	get opaque_lr()
	{
		return this.#dataView.getBigUint64(240,true);
	}
	set opaque_lr(value)
	{
		this.#dataView.setBigUint64(240,value,true);
	}
	get opaque_sp()
	{
		return this.#dataView.getBigUint64(248,true);
	}
	set opaque_sp(value)
	{
		this.#dataView.setBigUint64(248,value,true);
	}
	get opaque_pc()
	{
		return this.#dataView.getBigUint64(256,true);
	}
	set opaque_pc(value)
	{
		this.#dataView.setBigUint64(256,value,true);
	}
	get cpsr()
	{
		return this.#dataView.getUint32(264,true);
	}
	set cpsr(value)
	{
		this.#dataView.setUint32(264,value,true);
	}
	get opaque_flags()
	{
		return this.#dataView.getUint32(268,true);
	}
	set opaque_flags(value)
	{
		this.#dataView.setUint32(268,value,true);
	}
}