export default class VMObject
{
	#buffer;
	#dataView;
	constructor(buffer)
	{
		this.#buffer = buffer;
		this.#dataView = new DataView(this.#buffer);
	}
	get vmAddress()
	{
		return this.#dataView.getBigUint64(0,true);
	}
	set vmAddress(value)
	{
		this.#dataView.setBigUint64(0,value,true);
	}
	get address()
	{
		return this.#dataView.getBigUint64(8,true);
	}
	set address(value)
	{
		this.#dataView.setBigUint64(8,value,true);
	}
	get objectOffset()
	{
		return this.#dataView.getBigUint64(16,true);
	}
	set objectOffset(value)
	{
		this.#dataView.setBigUint64(16,value,true);
	}
	get entryOffset()
	{
		return this.#dataView.getBigUint64(24,true);
	}
	set entryOffset(value)
	{
		this.#dataView.setBigUint64(24,value,true);
	}
}