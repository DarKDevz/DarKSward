export default class VmPackingParams
{
	#buffer;
	#dataView;
	constructor(buffer)
	{
		this.#buffer = buffer;
		this.#dataView = new DataView(this.#buffer);
	}
	get vmpp_base()
	{
		return this.#dataView.getBigUint64(0,true);
	}
	set vmpp_base(value)
	{
		this.#dataView.setBigUint64(0,value,true);
	}
	get vmpp_bits()
	{
		return this.#dataView.getUint8(8,true);
	}
	set vmpp_bits(value)
	{
		this.#dataView.setUint8(8,value,true);
	}
	get vmpp_shift()
	{
		return this.#dataView.getUint8(9,true);
	}
	set vmpp_shift(value)
	{
		this.#dataView.setUint8(9,value,true);
	}
	get vmpp_base_relative()
	{
		return this.#dataView.getUint8(10,true);
	}
	set vmpp_base_relative(value)
	{
		this.#dataView.setUint8(10,value,true);
	}
}