const TAG = "REGISTERSSTRUCT"

export default class RegistersStruct
{
	#dataView;

	constructor(buffer, offset = 0, length = 29) {
		this.#dataView = new DataView(buffer,offset, length * 8);
		this.length = length;
	}
    
	get(index) {
        if (index >= this.length || index < 0) {
            console.log(TAG,`Got wrong index in get:${index}`);
			return;
        }
        return this.#dataView.getBigUint64(index * 8, true); // true for little-endian
    }

    set(index, value) {
        if (index >= this.length || index < 0) {
            console.log(TAG,`Got wrong index in set`);
			return;
        }
        this.#dataView.setBigUint64(index * 8, BigInt(value), true); // true for little-endian
    }
}