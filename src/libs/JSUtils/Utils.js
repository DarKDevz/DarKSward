

const TAG = "UTILS";

const DT = {
	DT_UNKNOWN: 0,
	DT_FIFO: 1,
	DT_CHR: 2,
	DT_DIR: 4,
	DT_BLK: 6,
	DT_REG: 8,
	DT_LNK: 10,
	DT_SOCK: 12,
	DT_WHT: 14
};

export default class Utils {

	static UINT64_SIZE = 8;
	static UINT32_SIZE = 4;
	static UINT16_SIZE = 2;
	static ARM_THREAD_STATE64 = 6;
	static ARM_THREAD_STATE64_SIZE = 0x110;
	static ARM_THREAD_STATE64_COUNT = (this.ARM_THREAD_STATE64_SIZE / this.UINT32_SIZE);
	static ptrauth_key_asia = 0;
	static EXC_BAD_ACCESS = 1n;
	static EXC_GUARD = 12n;
	static EXC_MASK_GUARD = (1n << this.EXC_GUARD);
	static EXC_MASK_BAD_ACCESS = (1n << this.EXC_BAD_ACCESS);
	static EXCEPTION_STATE = 2n;
	static MACH_EXCEPTION_CODES = 0x80000000n;
	static PAGE_SIZE = 0x4000n;
	static PAGE_MASK = (this.PAGE_SIZE - 1n);

	static hex(val) {
		return val.toString(16);
	}

	static memmem(haystack, needle) {
		const hLen = haystack.byteLength;
		const nLen = needle.byteLength;

		if (nLen === 0 || hLen < nLen) {
		  return 0;
		}

		const haystackView = new Uint8Array(haystack);
		const needleView = new Uint8Array(needle);

		for (let i = 0; i <= hLen - nLen; i++) {
		  let found = true;
		  for (let j = 0; j < nLen; j++) {
			if (haystackView[i + j] !== needleView[j]) {
			  found = false;
			  break;
			}
		  }
		  if (found) {
			return i;
		  }
		}

		return 0;
	}

	static ptrauth_string_discriminator(discriminator)
	{
		switch (discriminator) {
			case "pc":
				return 0x7481n;
			case "lr":
				return 0x77d3n;
			case "sp":
				return 0xcbedn;
			case "fp":
				return 0x4517n;
			default:
				console.log(TAG,`Cannot find discriminator for value:${discriminator}`);
				return 0n;
		}
	}

	static ptrauth_string_discriminator_special(discriminator)
	{
		switch (discriminator) {
			case "pc":
				return 0x7481000000000000n;
			case "lr":
				return 0x77d3000000000000n;
			case "sp":
				return 0xcbed000000000000n;
			case "fp":
				return 0x4517000000000000n;
			default:
				console.log(TAG,`Cannot find discriminator for value:${discriminator}`);
				return 0n;
		}
	}

	static ptrauth_blend_discriminator(diver,discriminator)
	{
		return diver & 0xFFFFFFFFFFFFn | discriminator;
	}

    static printArrayBufferInChunks(buffer) {
        const view = new DataView(buffer);
        const chunkSize = 8;

        for (let i = 0; i < buffer.byteLength; i += chunkSize) {
			// Read the chunk as a BigInt
			const chunk = view.getBigUint64(i, true); // Little-endian

            console.log(TAG, `0x${Utils.hex(i)}: ${Utils.hex(chunk)}`);
        }
    }

	static MIN(a, b)
	{
		if(a < b)
			return a;
		return b;
	}

	static MAX(a, b)
	{
		if(a > b)
			return a;
		return b;
	}
}
