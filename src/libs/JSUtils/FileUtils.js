

const TAG = "FILE-UTILS";

const O_RDONLY	= 0x0000;
const O_WRONLY	= 0x0001;
const O_RDWR	= 0x0002;
const O_APPEND  = 0x0008;
const O_CREAT	= 0x0200;
const O_TRUNC	= 0x0400;
const O_EVTONLY	= 0x8000;

const ERROR		= -1;

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

const SEEK_SET = 0;

export default class FileUtils {


	static open(path) {
		const fd = Native.callSymbol("open", path, O_RDONLY);
		if (fd == ERROR) {
			console.log(TAG, "Unable to open: " + path);
			return false;
		}
		return fd;
	}

	static close(fd) {
		Native.callSymbol("close", fd);
	}

	static read(fd, size=0) {
		if (!size || size > Native.memSize)
			size = Native.memSize;
		const len = Native.callSymbol("read", fd, Native.mem, size);
		if (!len || len == ERROR)
			return false;
		const buff = Native.read(Native.mem, len);
		return buff;
	}

	static readFile(path, seek=0, length=0) {
		const fd = this.open(path);
		if (fd === false)
			return null;

		let data = new Uint8Array();

		if (seek)
			Native.callSymbol("lseek", fd, seek, SEEK_SET);

		let remaining = length;

		while (true) {
			let size = remaining ? remaining : Native.memSize;
			if (size > Native.memSize)
				size = Native.memSize;
			const buff = this.read(fd, size);
			if (buff === false)
				break;
			const buff8 = new Uint8Array(buff);
			let newData = new Uint8Array(data.length + buff8.length);
			newData.set(data, 0);
			newData.set(buff8, data.length);
			data = newData;

			if (remaining) {
				remaining -= buff.byteLength;
				if (!remaining)
					break;
			}
		}

		this.close(fd);

		return data.buffer;
	}

	static writeFile(path, data) {
		return this.#commonWriteFile(path, data, O_WRONLY | O_CREAT | O_TRUNC);
	}

	static appendFile(path, data) {
		return this.#commonWriteFile(path, data, O_WRONLY | O_CREAT | O_APPEND);
	}

	static deleteFile(path) {
		Native.callSymbol("unlink", path);
	}
	static foreachDir(path, func) {
		let dir = Native.callSymbol("opendir", path);
		if (!dir) {
			console.log(TAG, "Unable to open dir: " + path);
			return;
		}

		while (true) {
			let item = this.#readdir(dir);
			if (!item)
				break;

			switch (item.d_type) {
				case DT.DT_DIR:
					if (item.d_name.startsWith("."))
						break;
					func(item.d_name);
					break;
			}
		}

		Native.callSymbol("closedir", dir);
	}

	static foreachFile(path, func) {
		let dir = Native.callSymbol("opendir", path);
		if (!dir) {
			console.log(TAG, "Unable to open dir: " + path);
			return false;
		}

		while (true) {
			let item = this.#readdir(dir);
			if (!item)
				break;

			switch (item.d_type) {
				case DT.DT_REG:
					func(item.d_name);
					break;
			}
		}

		Native.callSymbol("closedir", dir);
		return true;
	}

	static createDir(path, permission=0o755) {
		return !Native.callSymbol("mkdir", path, permission);
	}

	static deleteDir(path, recursive=false) {
		if (recursive) {
			const dir = Native.callSymbol("opendir", path);
			if (!dir) {
				console.log(TAG, "deleteDir: Unable to open dir: " + path);
				return false;
			}

			while (true) {
				const item = this.#readdir(dir);
				if (!item)
					break;

				const newPath = path + '/' + item.d_name;

				switch (item.d_type) {
					case DT.DT_DIR:
						if (item.d_name.startsWith("."))
							break;
						this.deleteDir(newPath, true);
						break;

					case DT.DT_REG:
						console.log(TAG, `deleting: ${newPath}`);
						this.deleteFile(newPath);
						break;
				}
			}

			Native.callSymbol("closedir", dir);
		}

		return !Native.callSymbol("rmdir", path);
	}

	static exists(path, permission=0/*F_OK*/) {
		return !Native.callSymbol("access", path, permission);
	}

	static stat(path) {
		const ret = Native.callSymbol("stat", path, Native.mem);
		if (ret == ERROR)
			return null;
		const buff = Native.read(Native.mem, 144);
		const view = new DataView(buff);

		const dev = view.getInt32(0, true);
		const mode = view.getUint16(0x4, true);
		const nlink = view.getUint16(0x6, true);
		const ino = view.getBigUint64(0x8, true);
		const uid = view.getUint32(0x10, true);
		const gid = view.getUint32(0x14, true);
		const atime_tv_sec = view.getBigInt64(0x20, true);
		const mtime_tv_sec = view.getBigInt64(0x30, true);
		const ctime_tv_sec = view.getBigInt64(0x40, true);
		const size = view.getBigInt64(0x60, true);

		return {
			mode: Number(mode),
			ino: Number(ino),
			dev: Number(dev),
			nlink: Number(nlink),
			uid: Number(uid),
			gid: Number(gid),
			size: Number(size),
			atime: Number(atime_tv_sec),
			mtime: Number(mtime_tv_sec),
			ctime: Number(ctime_tv_sec)
		};
	}

	static #readdir(dir) {
		const itemPtr = Native.callSymbol("readdir", dir);
		if (!itemPtr)
			return null;

		const item = Native.read(itemPtr, 24);
		const view = new DataView(item);

		const d_ino = view.getBigUint64(0, true);
		const d_namlen = view.getUint16(18, true);
		const d_type = view.getUint8(20);
		const d_name = Native.readString(itemPtr + 21n, d_namlen + 1);

		return {
			d_ino: d_ino,
			d_type: d_type,
			d_name: d_name
		};
	}

	static #commonWriteFile(path, data, flags) {
		const fd = Native.callSymbol("open", path, flags, 0o644);
		if (fd == ERROR) {
			console.log(TAG, "Unable to open: " + path);
			return false;
		}

		// For some reason file mode is not applied on open()
		Native.callSymbol("fchmod", fd, 0o644);

		let offs = 0;
		let left = data.byteLength;

		const buffSize = 0x4000;
		const buffPtr = Native.callSymbol("malloc", buffSize);

		while (true) {
			const size = left > buffSize ? buffSize : left;
			const src8 = new Uint8Array(data, offs, size);
			const dst8 = new Uint8Array(src8);
			Native.write(buffPtr, dst8.buffer);
			const len = Native.callSymbol("write", fd, buffPtr, size);
			if (!len || len == ERROR)
				break;
			offs += len;
			left -= len;
			if (!left)
				break;
		}

		Native.callSymbol("free", buffPtr);
		Native.callSymbol("close", fd);

		return true;
	}
}
