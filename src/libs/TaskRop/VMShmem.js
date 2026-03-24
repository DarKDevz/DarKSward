export default class VMShmem 
{
	#buffer;
	#dataView;
	constructor(buffer)
	{
		this.#buffer = buffer;
		this.#dataView = new DataView(this.#buffer);
	}
	get port()
	{
		return this.#dataView.getBigUint64(0,true);
	}
	set port(value)
	{
		this.#dataView.setBigUint64(0,value,true);
	}
	get remoteAddress()
	{
		return this.#dataView.getBigUint64(8,true);
	}
	set remoteAddress(value)
	{
		this.#dataView.setBigUint64(8,value,true);
	}
	get localAddress()
	{
		return this.#dataView.getBigUint64(16,true);
	}
	set localAddress(value)
	{
		this.#dataView.setBigUint64(16,value,true);
	}
}