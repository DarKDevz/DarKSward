import Chain from "libs/Chain/Chain";
import Utils from "libs/JSUtils/Utils";
import Task from "./Task";

const TAG = "TASKROP"

export default class TaskRop
{
	static init()
	{
		let selfTaskAddr = Chain.getSelfTaskAddr();
		if (!selfTaskAddr)
		{
			console.log(TAG,`Unable to find self task address`);
			return;
		}	
		console.log(TAG,`selfTaskAddr:${Utils.hex(selfTaskAddr)}`);
		Task.init(selfTaskAddr);
	}
}