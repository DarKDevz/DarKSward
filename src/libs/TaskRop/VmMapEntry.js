export class vm_map_links {
    #__mem;
    #__view;
    #__addr;
    #__off;
    constructor(mem=undefined, off=0) {
        this.#__mem = mem ? mem : new Uint8Array(0x20);
        this.#__view = new DataView(this.#__mem.buffer);
        this.#__off = off;
        this.sizeof = this.#__mem.length;
    }
    get addr() { if (!this.#__addr) { this.#__addr = get_buffer_addr(this.#__mem).add(this.#__off); } return this.#__addr; }
    /* previous entry */
    get prev() { return this.#__view.getBigUint64(this.#__off, true); }
    set prev(val) { this.#__view.setBigUint64(this.#__off, val, true); }
    /* next entry */
    get next() { return this.#__view.getBigUint64(this.#__off+0x8, true); }
    set next(val) { this.#__view.setBigUint64(this.#__off+0x8, val, true); }
    /* start address */
    get start() { return this.#__view.getBigUint64(this.#__off+0x10, true); }
    set start(val) { this.#__view.setBigUint64(this.#__off+0x10, val, true); }
    /* end address */
    get end() { return this.#__view.getBigUint64(this.#__off+0x18, true); }
    set end(val) { this.#__view.setBigUint64(this.#__off+0x18, val, true); }
};

class vm_map_store {
    #__mem;
    #__view;
    #__addr;
    #__off;
    constructor(mem=undefined, off=0) {
        this.#__mem = mem ? mem : new Uint8Array(0x18);
        this.#__view = new DataView(this.#__mem.buffer);
        this.#__off = off;
        this.sizeof = this.#__mem.length;
    }
    get addr() { if (!this.#__addr) { this.#__addr = get_buffer_addr(this.#__mem).add(this.#__off); } return this.#__addr; }
    /* left element */
    get rbe_left() { return this.#__view.getBigUint64(this.#__off, true); }
    set rbe_left(val) { this.#__view.setBigUint64(this.#__off, val, true); }
    /* right element */
    get rbe_right() { return this.#__view.getBigUint64(this.#__off+0x8, true); }
    set rbe_right(val) { this.#__view.setBigUint64(this.#__off+0x8, val, true); }
    /* parent element */
    get rbe_parent() { return this.#__view.getBigUint64(this.#__off+0x10, true); }
    set rbe_parent(val) { this.#__view.setBigUint64(this.#__off+0x10, val, true); }
};

export class vm_map_entry {
    #__mem;
    #__view;
    #__addr;
    #__off;
    constructor(mem=undefined, off=0) {
        this.#__mem = mem ? mem : new Uint8Array(0x50);
        this.#__view = new DataView(this.#__mem.buffer);
        this.#__off = off;
        this.sizeof = this.#__mem.length;
        this.links = new vm_map_links(this.#__mem, this.#__off);
        this.store = new vm_map_store(this.#__mem, this.#__off+0x20);
    }
    get addr() { if (!this.#__addr) { this.#__addr = get_buffer_addr(this.#__mem).add(this.#__off); } return this.#__addr; }

    // Union field 1
    get vme_object_value() { return this.#__view.getBigUint64(this.#__off+0x38, true); }
    set vme_object_value(val) { this.#__view.setBigUint64(this.#__off+0x38, val, true); }

    // Union field 2
    get vme_atomic() { return this.#__view.getUint8(this.#__off+0x38, true) & 1; }
    set vme_atomic(val) {
        let cur = this.#__view.getUint8(this.#__off+0x38, true) & 0xfe;
        this.#__view.setUint8(this.#__off+0x38, cur + (val & 1), true);
    }
    get is_sub_map() { return (this.#__view.getUint8(this.#__off+0x38, true) & 2) >> 1; }
    set is_sub_map(val) {
        let cur = this.#__view.getUint8(this.#__off+0x38, true) & 0xfd;
        this.#__view.setUint8(this.#__off+0x38, cur + ((val & 1) << 1), true);
    }
    get vme_submap() { return this.#__view.getBigUint64(this.#__off+0x38, true) >> 2n; }
    set vme_submap(val) {
        let cur = this.#__view.getBigUint64(this.#__off+0x38, true) & 3n;
        this.#__view.setBigUint64(this.#__off+0x38, cur + ((val & 0x3fffffffffffffffn) << 2n), true);
    }

    // Union field 3
    get vme_ctx_atomic() { return this.#__view.getUint8(this.#__off+0x38, true) & 1; }
    set vme_ctx_atomic(val) {
        let cur = this.#__view.getUint8(this.#__off+0x38, true) & 0xfe;
        this.#__view.setUint8(this.#__off+0x38, cur + (val & 1), true);
    }
    get vme_ctx_is_sub_map() { return (this.#__view.getUint8(this.#__off+0x38, true) & 2) >> 1; }
    set vme_ctx_is_sub_map(val) {
        let cur = this.#__view.getUint8(this.#__off+0x38, true) & 0xfd;
        this.#__view.setUint8(this.#__off+0x38, cur + ((val & 1) << 1), true);
    }
    get vme_context() { return this.#__view.getUint32(this.#__off+0x38, true) >> 2; }
    set vme_context(val) {
        let cur = this.#__view.getUint32(this.#__off+0x38, true) & 2;
        this.#__view.setUint32(this.#__off+0x38, cur + (val << 2), true);
    }
    get vme_object() { return this.#__view.getUint32(this.#__off+0x3c, true); }
    set vme_object(val) { this.#__view.setUint32(this.#__off+0x3c, val, true); }

    // vme_alias:12,               /* entry VM tag */
    // vme_offset:52,              /* offset into object */
    get vme_offset() { return this.#__view.getBigUint64(this.#__off+0x40, true) >> 12n;  }
    set vme_offset(val) {
        let cur = this.#__view.getBigUint64(this.#__off+0x40, true) & 0xfffn;
        this.#__view.setBigUint64(this.#__off+0x40, cur + (val << 12n), true);
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
    get wired_count() { return this.#__view.getUint16(this.#__off+0x4c, true); }
    set wired_count(val) { this.#__view.setUint16(this.#__off+0x4c, val, true); }
    /* for vm_wire */
    get user_wired_count() { return this.#__view.getUint16(this.#__off+0x4e, true); }
    set user_wired_count(val) { this.#__view.setUint16(this.#__off+0x4e, val, true); }
};
export default {vm_map_entry,vm_map_links,vm_map_store}
