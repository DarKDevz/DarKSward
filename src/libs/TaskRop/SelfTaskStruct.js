export default class SelfTaskStruct 
{
	#buffer;
	#dataView;
	constructor()
	{
		this.#buffer = new ArrayBuffer(32);
		this.#dataView = new DataView(this.#buffer);
		this.addr = 0x0n;
		this.spaceTable = 0x0n;
		this.portObject = 0x0n;
		this.launchdTask = 0x0n;
	}
	get addr()
	{
		return this.#dataView.getBigUint64(0,true);
	}
	set addr(value)
	{
		this.#dataView.setBigUint64(0,value,true);
	}
	get spaceTable()
	{
		return this.#dataView.getBigUint64(8,true);
	}
	set spaceTable(value)
	{
		this.#dataView.setBigUint64(8,value,true);
	}
	get portObject()
	{
		return this.#dataView.getBigUint64(16,true);
	}
	set portObject(value)
	{
		this.#dataView.setBigUint64(16,value,true);
	}
	get launchdTask()
	{
		return this.#dataView.getBigUint64(24,true);
	}
	set launchdTask(value)
	{
		this.#dataView.setBigUint64(24,value,true);
	}
}