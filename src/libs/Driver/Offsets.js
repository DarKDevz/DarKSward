import OffsetsStruct from "libs/Chain/OffsetsStruct";
import {offsets} from "./OffsetsTable";

const TAG  = "OFFSETS"

export default class Offsets
{
	static getByDeviceAndVersion()
	{
		Native.callSymbol("uname", Native.mem);
		const sysname = Native.readString(Native.mem, 0x100);
		const nodename = Native.readString(Native.mem + 0x100n, 0x100);
		const release = Native.readString(Native.mem + 0x200n, 0x100);
		const version = Native.readString(Native.mem + 0x300n, 0x100);
		const machine = Native.readString(Native.mem + 0x400n, 0x100);
		console.log(TAG, `release: ${release} with machine: ${machine}`);

		const buildVer = this.getBuildVersion();
		console.log(TAG, "Build version: " + buildVer);

		let splittedVersion = release.split(".");
		let xnuMajor = splittedVersion[0];
		let xnuMinor = splittedVersion[1];

		let splittedMachine = machine.split(",");
		let deviceFamily = splittedMachine[0];
		let deviceModel = splittedMachine[1];

		console.log(TAG, "deviceFamily: " + deviceFamily);

		// Ugly hack to support 17.7, 17.7.1 and 17.7.2
		if (buildVer) {
			if (buildVer == "21H16")
				xnuMinor = 6.1;
			else if (buildVer == "21H216")
				xnuMinor = 6.2;
			else if (buildVer == "21H221")
				xnuMinor = 6.3;
		}
		// Get offsets per device family
		let deviceOffsets = offsets[deviceFamily];
		if (!deviceOffsets) {
			console.log(TAG, `Unsupported machine: ${machine}`);
			return null;
		}

		let familyOffsets = deviceOffsets["*"];
		let foundFamilyOffsets = this.#getOffsetsByVersion(familyOffsets, xnuMajor, xnuMinor);

		if (!foundFamilyOffsets)
			return null;

		// Adjustments per device model
		let modelOffsets = deviceOffsets[deviceModel];
		let foundModelOffsets = null;
		if (modelOffsets)
			foundModelOffsets = this.#getOffsetsByVersion(modelOffsets, xnuMajor, xnuMinor);

		// Merge family offsets and device offsets
		let foundOffsets = new OffsetsStruct();
		Object.assign(foundOffsets, foundFamilyOffsets);
		if (foundModelOffsets)
			Object.assign(foundOffsets, foundModelOffsets);

		if (["iPhone15", "iPhone16", "iPhone17"].includes(deviceFamily))
			foundOffsets.T1SZ_BOOT = 17n;
		else
			foundOffsets.T1SZ_BOOT = 25n;

		console.log(TAG, "Offsets: " + JSON.stringify(foundOffsets, (_,v) => typeof v === 'bigint' ? "0x"+v.toString(16) : v, 2));

		return foundOffsets;
	}

	static #getOffsetsByVersion(offsets, xnuMajor, xnuMinor) {
		let xnuMajorOffsets = 0;
		for (let major in offsets) {
			if (xnuMajor < major)
				continue;
			if (xnuMajorOffsets < major)
				xnuMajorOffsets = major;
		}

		if (!xnuMajorOffsets) {
			console.log(TAG, "Unsupported XNU major: " + xnuMajor);
			return null;
		}

		//console.log(TAG, "Matching XNU major: " + xnuMajorOffsets);
		xnuMajorOffsets = offsets[xnuMajorOffsets];

		let foundOffsets = {};
		let xnuMinorOffsets = -1;
		const sortedMinors = Object.keys(xnuMajorOffsets).sort();
		for (let minor of sortedMinors) {
			//console.log(TAG, `minor: ${minor}, xnuMinor: ${xnuMinor}`);
			if (minor > xnuMinor)
				break;
			if (xnuMinorOffsets < minor) {
				xnuMinorOffsets = minor;
				Object.assign(foundOffsets, xnuMajorOffsets[minor]);
			}
		}

		//console.log(TAG, "Matching XNU minor: " + xnuMinorOffsets);

		return foundOffsets;
	}
	static getBuildVersion() {
		const CTL_KERN = 1;
		const KERN_OSVERSION = 65;

		const mib = new ArrayBuffer(4 * 2);
		const mibView = new DataView(mib);
		mibView.setInt32(0, CTL_KERN, true);
		mibView.setInt32(4, KERN_OSVERSION, true);

		const mibAddr = Native.mem;
		const resultAddr = Native.mem + 0x100n;
		const lengthAddr = Native.mem + 0x200n;

		Native.write(Native.mem, mib);

		let ret = Native.callSymbol("sysctl", mibAddr, 2, resultAddr, lengthAddr, null, 0);
		if (ret != 0) {
			console.log(TAG, "Unable to get iOS build version");
			return null;
		}

		const length = Native.read32(lengthAddr);
		const buildVer = Native.readString(resultAddr, length);
		return buildVer;
	}
}
