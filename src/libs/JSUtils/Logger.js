import FileUtils from "./FileUtils";
import Native from "libs/Chain/Native";



export default class Logger {

	static #logging = false;
	static #logfile = "/private/var/mobile/Media/PostLogs.txt";

	static {
		//LOG("Log file: " + Logger.#logfile);
	}

	static log(TAG, msg) {
		// Avoid recursive logging
		if (Logger.#logging)
			return;
		Logger.#logging = true;
		const logMsg = `[${TAG}] ${msg}`;

		LOG(logMsg);

		if (false) {}
		Logger.#logging = false;
	}

	static clearPreviousLogs(){
		Native.callSymbol("unlink", Logger.#logfile);
	}
}
