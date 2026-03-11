typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
const Gi = 1, Ki = 2, wn = 4, Ji = 8, Qi = 16, Xi = 2, Zi = 4, eo = 8, to = 1, ro = 2, Da = "[", Hs = "[!", Pa = "]", Fr = {}, yt = /* @__PURE__ */ Symbol(), so = "http://www.w3.org/1999/xhtml", ia = !1;
var Ia = Array.isArray, ao = Array.prototype.indexOf, Xr = Array.prototype.includes, Ws = Array.from, Rs = Object.keys, gs = Object.defineProperty, Jr = Object.getOwnPropertyDescriptor, $n = Object.getOwnPropertyDescriptors, no = Object.prototype, io = Array.prototype, Ta = Object.getPrototypeOf, en = Object.isExtensible;
const hr = () => {
};
function oo(e) {
  return e();
}
function Ls(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function kn() {
  var e, t, r = new Promise((a, o) => {
    e = a, t = o;
  });
  return { promise: r, resolve: e, reject: t };
}
function oa(e, t) {
  if (Array.isArray(e))
    return e;
  if (!(Symbol.iterator in e))
    return Array.from(e);
  const r = [];
  for (const a of e)
    if (r.push(a), r.length === t) break;
  return r;
}
const wt = 2, Os = 4, $s = 8, En = 1 << 24, mr = 16, rr = 32, Pr = 64, Ma = 128, zt = 512, bt = 1024, $t = 2048, er = 4096, Ft = 8192, xr = 16384, qs = 32768, Zr = 65536, tn = 1 << 17, Cn = 1 << 18, qr = 1 << 19, Sn = 1 << 20, fr = 1 << 25, Vr = 32768, ca = 1 << 21, Na = 1 << 22, Er = 1 << 23, Cr = /* @__PURE__ */ Symbol("$state"), co = /* @__PURE__ */ Symbol("legacy props"), lo = /* @__PURE__ */ Symbol(""), Kr = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), zs = 3, zr = 8;
function An(e) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function uo() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function vo(e, t, r) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function fo(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function po() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function ho(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function xo() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function _o() {
  throw new Error("https://svelte.dev/e/hydration_failed");
}
function bo() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function go() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function mo() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function yo() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function ks(e) {
  console.warn("https://svelte.dev/e/hydration_mismatch");
}
function wo() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function $o() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
let Ze = !1;
function pr(e) {
  Ze = e;
}
let tt;
function St(e) {
  if (e === null)
    throw ks(), Fr;
  return tt = e;
}
function es() {
  return St(/* @__PURE__ */ sr(tt));
}
function n(e) {
  if (Ze) {
    if (/* @__PURE__ */ sr(tt) !== null)
      throw ks(), Fr;
    tt = e;
  }
}
function xt(e = 1) {
  if (Ze) {
    for (var t = e, r = tt; t--; )
      r = /** @type {TemplateNode} */
      /* @__PURE__ */ sr(r);
    tt = r;
  }
}
function Fs(e = !0) {
  for (var t = 0, r = tt; ; ) {
    if (r.nodeType === zr) {
      var a = (
        /** @type {Comment} */
        r.data
      );
      if (a === Pa) {
        if (t === 0) return r;
        t -= 1;
      } else (a === Da || a === Hs || // "[1", "[2", etc. for if blocks
      a[0] === "[" && !isNaN(Number(a.slice(1)))) && (t += 1);
    }
    var o = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ sr(r)
    );
    e && r.remove(), r = o;
  }
}
function Dn(e) {
  if (!e || e.nodeType !== zr)
    throw ks(), Fr;
  return (
    /** @type {Comment} */
    e.data
  );
}
function Pn(e) {
  return e === this.v;
}
function In(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function Tn(e) {
  return !In(e, this.v);
}
let ns = !1, ko = !1;
function Eo() {
  ns = !0;
}
let vt = null;
function ts(e) {
  vt = e;
}
function kt(e, t = !1, r) {
  vt = {
    p: vt,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    l: ns && !t ? { s: null, u: null, $: [] } : null
  };
}
function Et(e) {
  var t = (
    /** @type {ComponentContext} */
    vt
  ), r = t.e;
  if (r !== null) {
    t.e = null;
    for (var a of r)
      Xn(a);
  }
  return e !== void 0 && (t.x = e), t.i = !0, vt = t.p, e ?? /** @type {T} */
  {};
}
function Es() {
  return !ns || vt !== null && vt.l === null;
}
let Tr = [];
function Mn() {
  var e = Tr;
  Tr = [], Ls(e);
}
function lr(e) {
  if (Tr.length === 0 && !fs) {
    var t = Tr;
    queueMicrotask(() => {
      t === Tr && Mn();
    });
  }
  Tr.push(e);
}
function Co() {
  for (; Tr.length > 0; )
    Mn();
}
function Nn(e) {
  var t = rt;
  if (t === null)
    return et.f |= Er, e;
  if ((t.f & qs) === 0) {
    if ((t.f & Ma) === 0)
      throw e;
    t.b.error(e);
  } else
    rs(e, t);
}
function rs(e, t) {
  for (; t !== null; ) {
    if ((t.f & Ma) !== 0)
      try {
        t.b.error(e);
        return;
      } catch (r) {
        e = r;
      }
    t = t.parent;
  }
  throw e;
}
const So = -7169;
function ft(e, t) {
  e.f = e.f & So | t;
}
function Ra(e) {
  (e.f & zt) !== 0 || e.deps === null ? ft(e, bt) : ft(e, er);
}
function Rn(e) {
  if (e !== null)
    for (const t of e)
      (t.f & wt) === 0 || (t.f & Vr) === 0 || (t.f ^= Vr, Rn(
        /** @type {Derived} */
        t.deps
      ));
}
function Ln(e, t, r) {
  (e.f & $t) !== 0 ? t.add(e) : (e.f & er) !== 0 && r.add(e), Rn(e.deps), ft(e, bt);
}
const Is = /* @__PURE__ */ new Set();
let st = null, Vs = null, Qt = null, It = [], Us = null, la = !1, fs = !1;
class _r {
  committed = !1;
  /**
   * The current values of any sources that are updated in this batch
   * They keys of this map are identical to `this.#previous`
   * @type {Map<Source, any>}
   */
  current = /* @__PURE__ */ new Map();
  /**
   * The values of any sources that are updated in this batch _before_ those updates took place.
   * They keys of this map are identical to `this.#current`
   * @type {Map<Source, any>}
   */
  previous = /* @__PURE__ */ new Map();
  /**
   * When the batch is committed (and the DOM is updated), we need to remove old branches
   * and append new ones by calling the functions added inside (if/each/key/etc) blocks
   * @type {Set<() => void>}
   */
  #e = /* @__PURE__ */ new Set();
  /**
   * If a fork is discarded, we need to destroy any effects that are no longer needed
   * @type {Set<(batch: Batch) => void>}
   */
  #t = /* @__PURE__ */ new Set();
  /**
   * The number of async effects that are currently in flight
   */
  #r = 0;
  /**
   * The number of async effects that are currently in flight, _not_ inside a pending boundary
   */
  #i = 0;
  /**
   * A deferred that resolves when the batch is committed, used with `settled()`
   * TODO replace with Promise.withResolvers once supported widely enough
   * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
   */
  #o = null;
  /**
   * Deferred effects (which run after async work has completed) that are DIRTY
   * @type {Set<Effect>}
   */
  #a = /* @__PURE__ */ new Set();
  /**
   * Deferred effects that are MAYBE_DIRTY
   * @type {Set<Effect>}
   */
  #s = /* @__PURE__ */ new Set();
  /**
   * A map of branches that still exist, but will be destroyed when this batch
   * is committed — we skip over these during `process`.
   * The value contains child effects that were dirty/maybe_dirty before being reset,
   * so they can be rescheduled if the branch survives.
   * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
   */
  #n = /* @__PURE__ */ new Map();
  is_fork = !1;
  #c = !1;
  is_deferred() {
    return this.is_fork || this.#i > 0;
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(t) {
    this.#n.has(t) || this.#n.set(t, { d: [], m: [] });
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   */
  unskip_effect(t) {
    var r = this.#n.get(t);
    if (r) {
      this.#n.delete(t);
      for (var a of r.d)
        ft(a, $t), Xt(a);
      for (a of r.m)
        ft(a, er), Xt(a);
    }
  }
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(t) {
    It = [], this.apply();
    var r = [], a = [];
    for (const o of t)
      this.#l(o, r, a);
    if (this.is_deferred()) {
      this.#d(a), this.#d(r);
      for (const [o, l] of this.#n)
        jn(o, l);
    } else {
      for (const o of this.#e) o();
      this.#e.clear(), this.#r === 0 && this.#u(), Vs = this, st = null, rn(a), rn(r), Vs = null, this.#o?.resolve();
    }
    Qt = null;
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   * @param {Effect[]} effects
   * @param {Effect[]} render_effects
   */
  #l(t, r, a) {
    t.f ^= bt;
    for (var o = t.first, l = null; o !== null; ) {
      var u = o.f, d = (u & (rr | Pr)) !== 0, v = d && (u & bt) !== 0, x = v || (u & Ft) !== 0 || this.#n.has(o);
      if (!x && o.fn !== null) {
        d ? o.f ^= bt : l !== null && (u & (Os | $s | En)) !== 0 ? l.b.defer_effect(o) : (u & Os) !== 0 ? r.push(o) : Ss(o) && ((u & mr) !== 0 && this.#s.add(o), ms(o));
        var _ = o.first;
        if (_ !== null) {
          o = _;
          continue;
        }
      }
      var g = o.parent;
      for (o = o.next; o === null && g !== null; )
        g === l && (l = null), o = g.next, g = g.parent;
    }
  }
  /**
   * @param {Effect[]} effects
   */
  #d(t) {
    for (var r = 0; r < t.length; r += 1)
      Ln(t[r], this.#a, this.#s);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(t, r) {
    r !== yt && !this.previous.has(t) && this.previous.set(t, r), (t.f & Er) === 0 && (this.current.set(t, t.v), Qt?.set(t, t.v));
  }
  activate() {
    st = this, this.apply();
  }
  deactivate() {
    st === this && (st = null, Qt = null);
  }
  flush() {
    if (this.activate(), It.length > 0) {
      if (On(), st !== null && st !== this)
        return;
    } else this.#r === 0 && this.process([]);
    this.deactivate();
  }
  discard() {
    for (const t of this.#t) t(this);
    this.#t.clear();
  }
  #u() {
    if (Is.size > 1) {
      this.previous.clear();
      var t = Qt, r = !0;
      for (const o of Is) {
        if (o === this) {
          r = !1;
          continue;
        }
        const l = [];
        for (const [d, v] of this.current) {
          if (o.current.has(d))
            if (r && v !== o.current.get(d))
              o.current.set(d, v);
            else
              continue;
          l.push(d);
        }
        if (l.length === 0)
          continue;
        const u = [...o.current.keys()].filter((d) => !this.current.has(d));
        if (u.length > 0) {
          var a = It;
          It = [];
          const d = /* @__PURE__ */ new Set(), v = /* @__PURE__ */ new Map();
          for (const x of l)
            Fn(x, u, d, v);
          if (It.length > 0) {
            st = o, o.apply();
            for (const x of It)
              o.#l(x, [], []);
            o.deactivate();
          }
          It = a;
        }
      }
      st = null, Qt = t;
    }
    this.committed = !0, Is.delete(this);
  }
  /**
   *
   * @param {boolean} blocking
   */
  increment(t) {
    this.#r += 1, t && (this.#i += 1);
  }
  /**
   *
   * @param {boolean} blocking
   */
  decrement(t) {
    this.#r -= 1, t && (this.#i -= 1), !this.#c && (this.#c = !0, lr(() => {
      this.#c = !1, this.is_deferred() ? It.length > 0 && this.flush() : this.revive();
    }));
  }
  revive() {
    for (const t of this.#a)
      this.#s.delete(t), ft(t, $t), Xt(t);
    for (const t of this.#s)
      ft(t, er), Xt(t);
    this.flush();
  }
  /** @param {() => void} fn */
  oncommit(t) {
    this.#e.add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    this.#t.add(t);
  }
  settled() {
    return (this.#o ??= kn()).promise;
  }
  static ensure() {
    if (st === null) {
      const t = st = new _r();
      Is.add(st), fs || lr(() => {
        st === t && t.flush();
      });
    }
    return st;
  }
  apply() {
  }
}
function ht(e) {
  var t = fs;
  fs = !0;
  try {
    for (var r; ; ) {
      if (Co(), It.length === 0 && (st?.flush(), It.length === 0))
        return Us = null, /** @type {T} */
        r;
      On();
    }
  } finally {
    fs = t;
  }
}
function On() {
  la = !0;
  var e = null;
  try {
    for (var t = 0; It.length > 0; ) {
      var r = _r.ensure();
      if (t++ > 1e3) {
        var a, o;
        Ao();
      }
      r.process(It), Sr.clear();
    }
  } finally {
    It = [], la = !1, Us = null;
  }
}
function Ao() {
  try {
    xo();
  } catch (e) {
    rs(e, Us);
  }
}
let dr = null;
function rn(e) {
  var t = e.length;
  if (t !== 0) {
    for (var r = 0; r < t; ) {
      var a = e[r++];
      if ((a.f & (xr | Ft)) === 0 && Ss(a) && (dr = /* @__PURE__ */ new Set(), ms(a), a.deps === null && a.first === null && a.nodes === null && (a.teardown === null && a.ac === null ? si(a) : a.fn = null), dr?.size > 0)) {
        Sr.clear();
        for (const o of dr) {
          if ((o.f & (xr | Ft)) !== 0) continue;
          const l = [o];
          let u = o.parent;
          for (; u !== null; )
            dr.has(u) && (dr.delete(u), l.push(u)), u = u.parent;
          for (let d = l.length - 1; d >= 0; d--) {
            const v = l[d];
            (v.f & (xr | Ft)) === 0 && ms(v);
          }
        }
        dr.clear();
      }
    }
    dr = null;
  }
}
function Fn(e, t, r, a) {
  if (!r.has(e) && (r.add(e), e.reactions !== null))
    for (const o of e.reactions) {
      const l = o.f;
      (l & wt) !== 0 ? Fn(
        /** @type {Derived} */
        o,
        t,
        r,
        a
      ) : (l & (Na | mr)) !== 0 && (l & $t) === 0 && Vn(o, t, a) && (ft(o, $t), Xt(
        /** @type {Effect} */
        o
      ));
    }
}
function Vn(e, t, r) {
  const a = r.get(e);
  if (a !== void 0) return a;
  if (e.deps !== null)
    for (const o of e.deps) {
      if (Xr.call(t, o))
        return !0;
      if ((o.f & wt) !== 0 && Vn(
        /** @type {Derived} */
        o,
        t,
        r
      ))
        return r.set(
          /** @type {Derived} */
          o,
          !0
        ), !0;
    }
  return r.set(e, !1), !1;
}
function Xt(e) {
  for (var t = Us = e; t.parent !== null; ) {
    t = t.parent;
    var r = t.f;
    if (la && t === rt && (r & mr) !== 0 && (r & Cn) === 0)
      return;
    if ((r & (Pr | rr)) !== 0) {
      if ((r & bt) === 0) return;
      t.f ^= bt;
    }
  }
  It.push(t);
}
function jn(e, t) {
  if (!((e.f & rr) !== 0 && (e.f & bt) !== 0)) {
    (e.f & $t) !== 0 ? t.d.push(e) : (e.f & er) !== 0 && t.m.push(e), ft(e, bt);
    for (var r = e.first; r !== null; )
      jn(r, t), r = r.next;
  }
}
function Do(e) {
  let t = 0, r = jr(0), a;
  return () => {
    ja() && (s(r), Js(() => (t === 0 && (a = Ur(() => e(() => ps(r)))), t += 1, () => {
      lr(() => {
        t -= 1, t === 0 && (a?.(), a = void 0, ps(r));
      });
    })));
  };
}
var Po = Zr | qr | Ma;
function Io(e, t, r) {
  new To(e, t, r);
}
class To {
  /** @type {Boundary | null} */
  parent;
  is_pending = !1;
  /** @type {TemplateNode} */
  #e;
  /** @type {TemplateNode | null} */
  #t = Ze ? tt : null;
  /** @type {BoundaryProps} */
  #r;
  /** @type {((anchor: Node) => void)} */
  #i;
  /** @type {Effect} */
  #o;
  /** @type {Effect | null} */
  #a = null;
  /** @type {Effect | null} */
  #s = null;
  /** @type {Effect | null} */
  #n = null;
  /** @type {DocumentFragment | null} */
  #c = null;
  /** @type {TemplateNode | null} */
  #l = null;
  #d = 0;
  #u = 0;
  #p = !1;
  #f = !1;
  /** @type {Set<Effect>} */
  #h = /* @__PURE__ */ new Set();
  /** @type {Set<Effect>} */
  #x = /* @__PURE__ */ new Set();
  /**
   * A source containing the number of pending async deriveds/expressions.
   * Only created if `$effect.pending()` is used inside the boundary,
   * otherwise updating the source results in needless `Batch.ensure()`
   * calls followed by no-op flushes
   * @type {Source<number> | null}
   */
  #v = null;
  #y = Do(() => (this.#v = jr(this.#d), () => {
    this.#v = null;
  }));
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   */
  constructor(t, r, a) {
    this.#e = t, this.#r = r, this.#i = a, this.parent = /** @type {Effect} */
    rt.b, this.is_pending = !!this.#r.pending, this.#o = Ba(() => {
      if (rt.b = this, Ze) {
        const l = this.#t;
        es(), /** @type {Comment} */
        l.nodeType === zr && /** @type {Comment} */
        l.data === Hs ? this.#$() : (this.#w(), this.#u === 0 && (this.is_pending = !1));
      } else {
        var o = this.#g();
        try {
          this.#a = Ht(() => a(o));
        } catch (l) {
          this.error(l);
        }
        this.#u > 0 ? this.#b() : this.is_pending = !1;
      }
      return () => {
        this.#l?.remove();
      };
    }, Po), Ze && (this.#e = tt);
  }
  #w() {
    try {
      this.#a = Ht(() => this.#i(this.#e));
    } catch (t) {
      this.error(t);
    }
  }
  #$() {
    const t = this.#r.pending;
    t && (this.#s = Ht(() => t(this.#e)), lr(() => {
      var r = this.#g();
      this.#a = this.#_(() => (_r.ensure(), Ht(() => this.#i(r)))), this.#u > 0 ? this.#b() : (Rr(
        /** @type {Effect} */
        this.#s,
        () => {
          this.#s = null;
        }
      ), this.is_pending = !1);
    }));
  }
  #g() {
    var t = this.#e;
    return this.is_pending && (this.#l = Ut(), this.#e.before(this.#l), t = this.#l), t;
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(t) {
    Ln(t, this.#h, this.#x);
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!this.#r.pending;
  }
  /**
   * @param {() => Effect | null} fn
   */
  #_(t) {
    var r = rt, a = et, o = vt;
    ur(this.#o), Gt(this.#o), ts(this.#o.ctx);
    try {
      return t();
    } catch (l) {
      return Nn(l), null;
    } finally {
      ur(r), Gt(a), ts(o);
    }
  }
  #b() {
    const t = (
      /** @type {(anchor: Node) => void} */
      this.#r.pending
    );
    this.#a !== null && (this.#c = document.createDocumentFragment(), this.#c.append(
      /** @type {TemplateNode} */
      this.#l
    ), ii(this.#a, this.#c)), this.#s === null && (this.#s = Ht(() => t(this.#e)));
  }
  /**
   * Updates the pending count associated with the currently visible pending snippet,
   * if any, such that we can replace the snippet with content once work is done
   * @param {1 | -1} d
   */
  #m(t) {
    if (!this.has_pending_snippet()) {
      this.parent && this.parent.#m(t);
      return;
    }
    if (this.#u += t, this.#u === 0) {
      this.is_pending = !1;
      for (const r of this.#h)
        ft(r, $t), Xt(r);
      for (const r of this.#x)
        ft(r, er), Xt(r);
      this.#h.clear(), this.#x.clear(), this.#s && Rr(this.#s, () => {
        this.#s = null;
      }), this.#c && (this.#e.before(this.#c), this.#c = null);
    }
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   */
  update_pending_count(t) {
    this.#m(t), this.#d += t, !(!this.#v || this.#p) && (this.#p = !0, lr(() => {
      this.#p = !1, this.#v && ss(this.#v, this.#d);
    }));
  }
  get_effect_pending() {
    return this.#y(), s(
      /** @type {Source<number>} */
      this.#v
    );
  }
  /** @param {unknown} error */
  error(t) {
    var r = this.#r.onerror;
    let a = this.#r.failed;
    if (this.#f || !r && !a)
      throw t;
    this.#a && (At(this.#a), this.#a = null), this.#s && (At(this.#s), this.#s = null), this.#n && (At(this.#n), this.#n = null), Ze && (St(
      /** @type {TemplateNode} */
      this.#t
    ), xt(), St(Fs()));
    var o = !1, l = !1;
    const u = () => {
      if (o) {
        $o();
        return;
      }
      o = !0, l && yo(), _r.ensure(), this.#d = 0, this.#n !== null && Rr(this.#n, () => {
        this.#n = null;
      }), this.is_pending = this.has_pending_snippet(), this.#a = this.#_(() => (this.#f = !1, Ht(() => this.#i(this.#e)))), this.#u > 0 ? this.#b() : this.is_pending = !1;
    };
    lr(() => {
      try {
        l = !0, r?.(t, u), l = !1;
      } catch (d) {
        rs(d, this.#o && this.#o.parent);
      }
      a && (this.#n = this.#_(() => {
        _r.ensure(), this.#f = !0;
        try {
          return Ht(() => {
            a(
              this.#e,
              () => t,
              () => u
            );
          });
        } catch (d) {
          return rs(
            d,
            /** @type {Effect} */
            this.#o.parent
          ), null;
        } finally {
          this.#f = !1;
        }
      }));
    });
  }
}
function Mo(e, t, r, a) {
  const o = Es() ? Cs : cr;
  var l = e.filter((E) => !E.settled);
  if (r.length === 0 && l.length === 0) {
    a(t.map(o));
    return;
  }
  var u = st, d = (
    /** @type {Effect} */
    rt
  ), v = No(), x = l.length === 1 ? l[0].promise : l.length > 1 ? Promise.all(l.map((E) => E.promise)) : null;
  function _(E) {
    v();
    try {
      a(E);
    } catch (P) {
      (d.f & xr) === 0 && rs(P, d);
    }
    u?.deactivate(), ua();
  }
  if (r.length === 0) {
    x.then(() => _(t.map(o)));
    return;
  }
  function g() {
    v(), Promise.all(r.map((E) => /* @__PURE__ */ Ro(E))).then((E) => _([...t.map(o), ...E])).catch((E) => rs(E, d));
  }
  x ? x.then(g) : g();
}
function No() {
  var e = rt, t = et, r = vt, a = st;
  return function(l = !0) {
    ur(e), Gt(t), ts(r), l && a?.activate();
  };
}
function ua() {
  ur(null), Gt(null), ts(null);
}
// @__NO_SIDE_EFFECTS__
function Cs(e) {
  var t = wt | $t, r = et !== null && (et.f & wt) !== 0 ? (
    /** @type {Derived} */
    et
  ) : null;
  return rt !== null && (rt.f |= qr), {
    ctx: vt,
    deps: null,
    effects: null,
    equals: Pn,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      yt
    ),
    wv: 0,
    parent: r ?? rt,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function Ro(e, t, r) {
  let a = (
    /** @type {Effect | null} */
    rt
  );
  a === null && uo();
  var o = (
    /** @type {Boundary} */
    a.b
  ), l = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), u = jr(
    /** @type {V} */
    yt
  ), d = !et, v = /* @__PURE__ */ new Map();
  return Wo(() => {
    var x = kn();
    l = x.promise;
    try {
      Promise.resolve(e()).then(x.resolve, x.reject).then(() => {
        _ === st && _.committed && _.deactivate(), ua();
      });
    } catch (P) {
      x.reject(P), ua();
    }
    var _ = (
      /** @type {Batch} */
      st
    );
    if (d) {
      var g = o.is_rendered();
      o.update_pending_count(1), _.increment(g), v.get(_)?.reject(Kr), v.delete(_), v.set(_, x);
    }
    const E = (P, C = void 0) => {
      if (_.activate(), C)
        C !== Kr && (u.f |= Er, ss(u, C));
      else {
        (u.f & Er) !== 0 && (u.f ^= Er), ss(u, P);
        for (const [Q, S] of v) {
          if (v.delete(Q), Q === _) break;
          S.reject(Kr);
        }
      }
      d && (o.update_pending_count(-1), _.decrement(g));
    };
    x.promise.then(E, (P) => E(null, P || "unknown"));
  }), Ks(() => {
    for (const x of v.values())
      x.reject(Kr);
  }), new Promise((x) => {
    function _(g) {
      function E() {
        g === l ? x(u) : _(l);
      }
      g.then(E, E);
    }
    _(l);
  });
}
// @__NO_SIDE_EFFECTS__
function Ce(e) {
  const t = /* @__PURE__ */ Cs(e);
  return oi(t), t;
}
// @__NO_SIDE_EFFECTS__
function cr(e) {
  const t = /* @__PURE__ */ Cs(e);
  return t.equals = Tn, t;
}
function Bn(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var r = 0; r < t.length; r += 1)
      At(
        /** @type {Effect} */
        t[r]
      );
  }
}
function Lo(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & wt) === 0)
      return (t.f & xr) === 0 ? (
        /** @type {Effect} */
        t
      ) : null;
    t = t.parent;
  }
  return null;
}
function La(e) {
  var t, r = rt;
  ur(Lo(e));
  try {
    e.f &= ~Vr, Bn(e), t = di(e);
  } finally {
    ur(r);
  }
  return t;
}
function Hn(e) {
  var t = La(e);
  if (!e.equals(t) && (e.wv = li(), (!st?.is_fork || e.deps === null) && (e.v = t, e.deps === null))) {
    ft(e, bt);
    return;
  }
  Dr || (Qt !== null ? (ja() || st?.is_fork) && Qt.set(e, t) : Ra(e));
}
let da = /* @__PURE__ */ new Set();
const Sr = /* @__PURE__ */ new Map();
let Wn = !1;
function jr(e, t) {
  var r = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: Pn,
    rv: 0,
    wv: 0
  };
  return r;
}
// @__NO_SIDE_EFFECTS__
function ne(e, t) {
  const r = jr(e);
  return oi(r), r;
}
// @__NO_SIDE_EFFECTS__
function Oa(e, t = !1, r = !0) {
  const a = jr(e);
  return t || (a.equals = Tn), ns && r && vt !== null && vt.l !== null && (vt.l.s ??= []).push(a), a;
}
function h(e, t, r = !1) {
  et !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!Zt || (et.f & tn) !== 0) && Es() && (et.f & (wt | mr | Na | tn)) !== 0 && (Yt === null || !Xr.call(Yt, e)) && mo();
  let a = r ? Wt(t) : t;
  return ss(e, a);
}
function ss(e, t) {
  if (!e.equals(t)) {
    var r = e.v;
    Dr ? Sr.set(e, t) : Sr.set(e, r), e.v = t;
    var a = _r.ensure();
    if (a.capture(e, r), (e.f & wt) !== 0) {
      const o = (
        /** @type {Derived} */
        e
      );
      (e.f & $t) !== 0 && La(o), Ra(o);
    }
    e.wv = li(), qn(e, $t), Es() && rt !== null && (rt.f & bt) !== 0 && (rt.f & (rr | Pr)) === 0 && (Bt === null ? zo([e]) : Bt.push(e)), !a.is_fork && da.size > 0 && !Wn && Oo();
  }
  return t;
}
function Oo() {
  Wn = !1;
  for (const e of da)
    (e.f & bt) !== 0 && ft(e, er), Ss(e) && ms(e);
  da.clear();
}
function ps(e) {
  h(e, e.v + 1);
}
function qn(e, t) {
  var r = e.reactions;
  if (r !== null)
    for (var a = Es(), o = r.length, l = 0; l < o; l++) {
      var u = r[l], d = u.f;
      if (!(!a && u === rt)) {
        var v = (d & $t) === 0;
        if (v && ft(u, t), (d & wt) !== 0) {
          var x = (
            /** @type {Derived} */
            u
          );
          Qt?.delete(x), (d & Vr) === 0 && (d & zt && (u.f |= Vr), qn(x, er));
        } else v && ((d & mr) !== 0 && dr !== null && dr.add(
          /** @type {Effect} */
          u
        ), Xt(
          /** @type {Effect} */
          u
        ));
      }
    }
}
function Wt(e) {
  if (typeof e != "object" || e === null || Cr in e)
    return e;
  const t = Ta(e);
  if (t !== no && t !== io)
    return e;
  var r = /* @__PURE__ */ new Map(), a = Ia(e), o = /* @__PURE__ */ ne(0), l = Lr, u = (d) => {
    if (Lr === l)
      return d();
    var v = et, x = Lr;
    Gt(null), cn(l);
    var _ = d();
    return Gt(v), cn(x), _;
  };
  return a && r.set("length", /* @__PURE__ */ ne(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(d, v, x) {
        (!("value" in x) || x.configurable === !1 || x.enumerable === !1 || x.writable === !1) && bo();
        var _ = r.get(v);
        return _ === void 0 ? u(() => {
          var g = /* @__PURE__ */ ne(x.value);
          return r.set(v, g), g;
        }) : h(_, x.value, !0), !0;
      },
      deleteProperty(d, v) {
        var x = r.get(v);
        if (x === void 0) {
          if (v in d) {
            const _ = u(() => /* @__PURE__ */ ne(yt));
            r.set(v, _), ps(o);
          }
        } else
          h(x, yt), ps(o);
        return !0;
      },
      get(d, v, x) {
        if (v === Cr)
          return e;
        var _ = r.get(v), g = v in d;
        if (_ === void 0 && (!g || Jr(d, v)?.writable) && (_ = u(() => {
          var P = Wt(g ? d[v] : yt), C = /* @__PURE__ */ ne(P);
          return C;
        }), r.set(v, _)), _ !== void 0) {
          var E = s(_);
          return E === yt ? void 0 : E;
        }
        return Reflect.get(d, v, x);
      },
      getOwnPropertyDescriptor(d, v) {
        var x = Reflect.getOwnPropertyDescriptor(d, v);
        if (x && "value" in x) {
          var _ = r.get(v);
          _ && (x.value = s(_));
        } else if (x === void 0) {
          var g = r.get(v), E = g?.v;
          if (g !== void 0 && E !== yt)
            return {
              enumerable: !0,
              configurable: !0,
              value: E,
              writable: !0
            };
        }
        return x;
      },
      has(d, v) {
        if (v === Cr)
          return !0;
        var x = r.get(v), _ = x !== void 0 && x.v !== yt || Reflect.has(d, v);
        if (x !== void 0 || rt !== null && (!_ || Jr(d, v)?.writable)) {
          x === void 0 && (x = u(() => {
            var E = _ ? Wt(d[v]) : yt, P = /* @__PURE__ */ ne(E);
            return P;
          }), r.set(v, x));
          var g = s(x);
          if (g === yt)
            return !1;
        }
        return _;
      },
      set(d, v, x, _) {
        var g = r.get(v), E = v in d;
        if (a && v === "length")
          for (var P = x; P < /** @type {Source<number>} */
          g.v; P += 1) {
            var C = r.get(P + "");
            C !== void 0 ? h(C, yt) : P in d && (C = u(() => /* @__PURE__ */ ne(yt)), r.set(P + "", C));
          }
        if (g === void 0)
          (!E || Jr(d, v)?.writable) && (g = u(() => /* @__PURE__ */ ne(void 0)), h(g, Wt(x)), r.set(v, g));
        else {
          E = g.v !== yt;
          var Q = u(() => Wt(x));
          h(g, Q);
        }
        var S = Reflect.getOwnPropertyDescriptor(d, v);
        if (S?.set && S.set.call(_, x), !E) {
          if (a && typeof v == "string") {
            var I = (
              /** @type {Source<number>} */
              r.get("length")
            ), z = Number(v);
            Number.isInteger(z) && z >= I.v && h(I, z + 1);
          }
          ps(o);
        }
        return !0;
      },
      ownKeys(d) {
        s(o);
        var v = Reflect.ownKeys(d).filter((g) => {
          var E = r.get(g);
          return E === void 0 || E.v !== yt;
        });
        for (var [x, _] of r)
          _.v !== yt && !(x in d) && v.push(x);
        return v;
      },
      setPrototypeOf() {
        go();
      }
    }
  );
}
function sn(e) {
  try {
    if (e !== null && typeof e == "object" && Cr in e)
      return e[Cr];
  } catch {
  }
  return e;
}
function Fo(e, t) {
  return Object.is(sn(e), sn(t));
}
var an, zn, Un, Yn;
function va() {
  if (an === void 0) {
    an = window, zn = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, r = Text.prototype;
    Un = Jr(t, "firstChild").get, Yn = Jr(t, "nextSibling").get, en(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), en(r) && (r.__t = void 0);
  }
}
function Ut(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function qt(e) {
  return (
    /** @type {TemplateNode | null} */
    Un.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function sr(e) {
  return (
    /** @type {TemplateNode | null} */
    Yn.call(e)
  );
}
function i(e, t) {
  if (!Ze)
    return /* @__PURE__ */ qt(e);
  var r = /* @__PURE__ */ qt(tt);
  if (r === null)
    r = tt.appendChild(Ut());
  else if (t && r.nodeType !== zs) {
    var a = Ut();
    return r?.before(a), St(a), a;
  }
  return t && Va(
    /** @type {Text} */
    r
  ), St(r), r;
}
function nt(e, t = !1) {
  if (!Ze) {
    var r = /* @__PURE__ */ qt(e);
    return r instanceof Comment && r.data === "" ? /* @__PURE__ */ sr(r) : r;
  }
  if (t) {
    if (tt?.nodeType !== zs) {
      var a = Ut();
      return tt?.before(a), St(a), a;
    }
    Va(
      /** @type {Text} */
      tt
    );
  }
  return tt;
}
function c(e, t = 1, r = !1) {
  let a = Ze ? tt : e;
  for (var o; t--; )
    o = a, a = /** @type {TemplateNode} */
    /* @__PURE__ */ sr(a);
  if (!Ze)
    return a;
  if (r) {
    if (a?.nodeType !== zs) {
      var l = Ut();
      return a === null ? o?.after(l) : a.before(l), St(l), l;
    }
    Va(
      /** @type {Text} */
      a
    );
  }
  return St(a), a;
}
function Fa(e) {
  e.textContent = "";
}
function Gn() {
  return !1;
}
function Va(e) {
  if (
    /** @type {string} */
    e.nodeValue.length < 65536
  )
    return;
  let t = e.nextSibling;
  for (; t !== null && t.nodeType === zs; )
    t.remove(), e.nodeValue += /** @type {string} */
    t.nodeValue, t = e.nextSibling;
}
function Ys(e) {
  Ze && /* @__PURE__ */ qt(e) !== null && Fa(e);
}
let nn = !1;
function Kn() {
  nn || (nn = !0, document.addEventListener(
    "reset",
    (e) => {
      Promise.resolve().then(() => {
        if (!e.defaultPrevented)
          for (
            const t of
            /**@type {HTMLFormElement} */
            e.target.elements
          )
            t.__on_r?.();
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
    { capture: !0 }
  ));
}
function Gs(e) {
  var t = et, r = rt;
  Gt(null), ur(null);
  try {
    return e();
  } finally {
    Gt(t), ur(r);
  }
}
function Jn(e, t, r, a = r) {
  e.addEventListener(t, () => Gs(r));
  const o = e.__on_r;
  o ? e.__on_r = () => {
    o(), a(!0);
  } : e.__on_r = () => a(!0), Kn();
}
function Qn(e) {
  rt === null && (et === null && ho(), po()), Dr && fo();
}
function Vo(e, t) {
  var r = t.last;
  r === null ? t.last = t.first = e : (r.next = e, e.prev = r, t.last = e);
}
function ar(e, t, r) {
  var a = rt;
  a !== null && (a.f & Ft) !== 0 && (e |= Ft);
  var o = {
    ctx: vt,
    deps: null,
    nodes: null,
    f: e | $t | zt,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: a,
    b: a && a.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  };
  if (r)
    try {
      ms(o), o.f |= qs;
    } catch (d) {
      throw At(o), d;
    }
  else t !== null && Xt(o);
  var l = o;
  if (r && l.deps === null && l.teardown === null && l.nodes === null && l.first === l.last && // either `null`, or a singular child
  (l.f & qr) === 0 && (l = l.first, (e & mr) !== 0 && (e & Zr) !== 0 && l !== null && (l.f |= Zr)), l !== null && (l.parent = a, a !== null && Vo(l, a), et !== null && (et.f & wt) !== 0 && (e & Pr) === 0)) {
    var u = (
      /** @type {Derived} */
      et
    );
    (u.effects ??= []).push(l);
  }
  return o;
}
function ja() {
  return et !== null && !Zt;
}
function Ks(e) {
  const t = ar($s, null, !1);
  return ft(t, bt), t.teardown = e, t;
}
function Mt(e) {
  Qn();
  var t = (
    /** @type {Effect} */
    rt.f
  ), r = !et && (t & rr) !== 0 && (t & qs) === 0;
  if (r) {
    var a = (
      /** @type {ComponentContext} */
      vt
    );
    (a.e ??= []).push(e);
  } else
    return Xn(e);
}
function Xn(e) {
  return ar(Os | Sn, e, !1);
}
function jo(e) {
  return Qn(), ar($s | Sn, e, !0);
}
function Bo(e) {
  _r.ensure();
  const t = ar(Pr | qr, e, !0);
  return () => {
    At(t);
  };
}
function Ho(e) {
  _r.ensure();
  const t = ar(Pr | qr, e, !0);
  return (r = {}) => new Promise((a) => {
    r.outro ? Rr(t, () => {
      At(t), a(void 0);
    }) : (At(t), a(void 0));
  });
}
function Zn(e) {
  return ar(Os, e, !1);
}
function Wo(e) {
  return ar(Na | qr, e, !0);
}
function Js(e, t = 0) {
  return ar($s | t, e, !0);
}
function D(e, t = [], r = [], a = []) {
  Mo(a, t, r, (o) => {
    ar($s, () => e(...o.map(s)), !0);
  });
}
function Ba(e, t = 0) {
  var r = ar(mr | t, e, !0);
  return r;
}
function Ht(e) {
  return ar(rr | qr, e, !0);
}
function ei(e) {
  var t = e.teardown;
  if (t !== null) {
    const r = Dr, a = et;
    on(!0), Gt(null);
    try {
      t.call(null);
    } finally {
      on(r), Gt(a);
    }
  }
}
function ti(e, t = !1) {
  var r = e.first;
  for (e.first = e.last = null; r !== null; ) {
    const o = r.ac;
    o !== null && Gs(() => {
      o.abort(Kr);
    });
    var a = r.next;
    (r.f & Pr) !== 0 ? r.parent = null : At(r, t), r = a;
  }
}
function qo(e) {
  for (var t = e.first; t !== null; ) {
    var r = t.next;
    (t.f & rr) === 0 && At(t), t = r;
  }
}
function At(e, t = !0) {
  var r = !1;
  (t || (e.f & Cn) !== 0) && e.nodes !== null && e.nodes.end !== null && (ri(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), r = !0), ti(e, t && !r), js(e, 0), ft(e, xr);
  var a = e.nodes && e.nodes.t;
  if (a !== null)
    for (const l of a)
      l.stop();
  ei(e);
  var o = e.parent;
  o !== null && o.first !== null && si(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = null;
}
function ri(e, t) {
  for (; e !== null; ) {
    var r = e === t ? null : /* @__PURE__ */ sr(e);
    e.remove(), e = r;
  }
}
function si(e) {
  var t = e.parent, r = e.prev, a = e.next;
  r !== null && (r.next = a), a !== null && (a.prev = r), t !== null && (t.first === e && (t.first = a), t.last === e && (t.last = r));
}
function Rr(e, t, r = !0) {
  var a = [];
  ai(e, a, !0);
  var o = () => {
    r && At(e), t && t();
  }, l = a.length;
  if (l > 0) {
    var u = () => --l || o();
    for (var d of a)
      d.out(u);
  } else
    o();
}
function ai(e, t, r) {
  if ((e.f & Ft) === 0) {
    e.f ^= Ft;
    var a = e.nodes && e.nodes.t;
    if (a !== null)
      for (const d of a)
        (d.is_global || r) && t.push(d);
    for (var o = e.first; o !== null; ) {
      var l = o.next, u = (o.f & Zr) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (o.f & rr) !== 0 && (e.f & mr) !== 0;
      ai(o, t, u ? r : !1), o = l;
    }
  }
}
function Ha(e) {
  ni(e, !0);
}
function ni(e, t) {
  if ((e.f & Ft) !== 0) {
    e.f ^= Ft, (e.f & bt) === 0 && (ft(e, $t), Xt(e));
    for (var r = e.first; r !== null; ) {
      var a = r.next, o = (r.f & Zr) !== 0 || (r.f & rr) !== 0;
      ni(r, o ? t : !1), r = a;
    }
    var l = e.nodes && e.nodes.t;
    if (l !== null)
      for (const u of l)
        (u.is_global || t) && u.in();
  }
}
function ii(e, t) {
  if (e.nodes)
    for (var r = e.nodes.start, a = e.nodes.end; r !== null; ) {
      var o = r === a ? null : /* @__PURE__ */ sr(r);
      t.append(r), r = o;
    }
}
let Ts = !1, Dr = !1;
function on(e) {
  Dr = e;
}
let et = null, Zt = !1;
function Gt(e) {
  et = e;
}
let rt = null;
function ur(e) {
  rt = e;
}
let Yt = null;
function oi(e) {
  et !== null && (Yt === null ? Yt = [e] : Yt.push(e));
}
let Tt = null, Lt = 0, Bt = null;
function zo(e) {
  Bt = e;
}
let ci = 1, Mr = 0, Lr = Mr;
function cn(e) {
  Lr = e;
}
function li() {
  return ++ci;
}
function Ss(e) {
  var t = e.f;
  if ((t & $t) !== 0)
    return !0;
  if (t & wt && (e.f &= ~Vr), (t & er) !== 0) {
    for (var r = (
      /** @type {Value[]} */
      e.deps
    ), a = r.length, o = 0; o < a; o++) {
      var l = r[o];
      if (Ss(
        /** @type {Derived} */
        l
      ) && Hn(
        /** @type {Derived} */
        l
      ), l.wv > e.wv)
        return !0;
    }
    (t & zt) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    Qt === null && ft(e, bt);
  }
  return !1;
}
function ui(e, t, r = !0) {
  var a = e.reactions;
  if (a !== null && !(Yt !== null && Xr.call(Yt, e)))
    for (var o = 0; o < a.length; o++) {
      var l = a[o];
      (l.f & wt) !== 0 ? ui(
        /** @type {Derived} */
        l,
        t,
        !1
      ) : t === l && (r ? ft(l, $t) : (l.f & bt) !== 0 && ft(l, er), Xt(
        /** @type {Effect} */
        l
      ));
    }
}
function di(e) {
  var t = Tt, r = Lt, a = Bt, o = et, l = Yt, u = vt, d = Zt, v = Lr, x = e.f;
  Tt = /** @type {null | Value[]} */
  null, Lt = 0, Bt = null, et = (x & (rr | Pr)) === 0 ? e : null, Yt = null, ts(e.ctx), Zt = !1, Lr = ++Mr, e.ac !== null && (Gs(() => {
    e.ac.abort(Kr);
  }), e.ac = null);
  try {
    e.f |= ca;
    var _ = (
      /** @type {Function} */
      e.fn
    ), g = _(), E = e.deps, P = st?.is_fork;
    if (Tt !== null) {
      var C;
      if (P || js(e, Lt), E !== null && Lt > 0)
        for (E.length = Lt + Tt.length, C = 0; C < Tt.length; C++)
          E[Lt + C] = Tt[C];
      else
        e.deps = E = Tt;
      if (ja() && (e.f & zt) !== 0)
        for (C = Lt; C < E.length; C++)
          (E[C].reactions ??= []).push(e);
    } else !P && E !== null && Lt < E.length && (js(e, Lt), E.length = Lt);
    if (Es() && Bt !== null && !Zt && E !== null && (e.f & (wt | er | $t)) === 0)
      for (C = 0; C < /** @type {Source[]} */
      Bt.length; C++)
        ui(
          Bt[C],
          /** @type {Effect} */
          e
        );
    if (o !== null && o !== e) {
      if (Mr++, o.deps !== null)
        for (let Q = 0; Q < r; Q += 1)
          o.deps[Q].rv = Mr;
      if (t !== null)
        for (const Q of t)
          Q.rv = Mr;
      Bt !== null && (a === null ? a = Bt : a.push(.../** @type {Source[]} */
      Bt));
    }
    return (e.f & Er) !== 0 && (e.f ^= Er), g;
  } catch (Q) {
    return Nn(Q);
  } finally {
    e.f ^= ca, Tt = t, Lt = r, Bt = a, et = o, Yt = l, ts(u), Zt = d, Lr = v;
  }
}
function Uo(e, t) {
  let r = t.reactions;
  if (r !== null) {
    var a = ao.call(r, e);
    if (a !== -1) {
      var o = r.length - 1;
      o === 0 ? r = t.reactions = null : (r[a] = r[o], r.pop());
    }
  }
  if (r === null && (t.f & wt) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (Tt === null || !Xr.call(Tt, t))) {
    var l = (
      /** @type {Derived} */
      t
    );
    (l.f & zt) !== 0 && (l.f ^= zt, l.f &= ~Vr), Ra(l), Bn(l), js(l, 0);
  }
}
function js(e, t) {
  var r = e.deps;
  if (r !== null)
    for (var a = t; a < r.length; a++)
      Uo(e, r[a]);
}
function ms(e) {
  var t = e.f;
  if ((t & xr) === 0) {
    ft(e, bt);
    var r = rt, a = Ts;
    rt = e, Ts = !0;
    try {
      (t & (mr | En)) !== 0 ? qo(e) : ti(e), ei(e);
      var o = di(e);
      e.teardown = typeof o == "function" ? o : null, e.wv = ci;
      var l;
      ia && ko && (e.f & $t) !== 0 && e.deps;
    } finally {
      Ts = a, rt = r;
    }
  }
}
async function Wa() {
  await Promise.resolve(), ht();
}
function s(e) {
  var t = e.f, r = (t & wt) !== 0;
  if (et !== null && !Zt) {
    var a = rt !== null && (rt.f & xr) !== 0;
    if (!a && (Yt === null || !Xr.call(Yt, e))) {
      var o = et.deps;
      if ((et.f & ca) !== 0)
        e.rv < Mr && (e.rv = Mr, Tt === null && o !== null && o[Lt] === e ? Lt++ : Tt === null ? Tt = [e] : Tt.push(e));
      else {
        (et.deps ??= []).push(e);
        var l = e.reactions;
        l === null ? e.reactions = [et] : Xr.call(l, et) || l.push(et);
      }
    }
  }
  if (Dr && Sr.has(e))
    return Sr.get(e);
  if (r) {
    var u = (
      /** @type {Derived} */
      e
    );
    if (Dr) {
      var d = u.v;
      return ((u.f & bt) === 0 && u.reactions !== null || fi(u)) && (d = La(u)), Sr.set(u, d), d;
    }
    var v = (u.f & zt) === 0 && !Zt && et !== null && (Ts || (et.f & zt) !== 0), x = u.deps === null;
    Ss(u) && (v && (u.f |= zt), Hn(u)), v && !x && vi(u);
  }
  if (Qt?.has(e))
    return Qt.get(e);
  if ((e.f & Er) !== 0)
    throw e.v;
  return e.v;
}
function vi(e) {
  if (e.deps !== null) {
    e.f |= zt;
    for (const t of e.deps)
      (t.reactions ??= []).push(e), (t.f & wt) !== 0 && (t.f & zt) === 0 && vi(
        /** @type {Derived} */
        t
      );
  }
}
function fi(e) {
  if (e.v === yt) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (Sr.has(t) || (t.f & wt) !== 0 && fi(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function Ur(e) {
  var t = Zt;
  try {
    return Zt = !0, e();
  } finally {
    Zt = t;
  }
}
function Yo(e) {
  if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
    if (Cr in e)
      fa(e);
    else if (!Array.isArray(e))
      for (let t in e) {
        const r = e[t];
        typeof r == "object" && r && Cr in r && fa(r);
      }
  }
}
function fa(e, t = /* @__PURE__ */ new Set()) {
  if (typeof e == "object" && e !== null && // We don't want to traverse DOM elements
  !(e instanceof EventTarget) && !t.has(e)) {
    t.add(e), e instanceof Date && e.getTime();
    for (let a in e)
      try {
        fa(e[a], t);
      } catch {
      }
    const r = Ta(e);
    if (r !== Object.prototype && r !== Array.prototype && r !== Map.prototype && r !== Set.prototype && r !== Date.prototype) {
      const a = $n(r);
      for (let o in a) {
        const l = a[o].get;
        if (l)
          try {
            l.call(e);
          } catch {
          }
      }
    }
  }
}
const pi = /* @__PURE__ */ new Set(), pa = /* @__PURE__ */ new Set();
function Go(e, t, r, a = {}) {
  function o(l) {
    if (a.capture || ds.call(t, l), !l.cancelBubble)
      return Gs(() => r?.call(this, l));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? lr(() => {
    t.addEventListener(e, o, a);
  }) : t.addEventListener(e, o, a), o;
}
function mt(e, t, r, a, o) {
  var l = { capture: a, passive: o }, u = Go(e, t, r, l);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && Ks(() => {
    t.removeEventListener(e, u, l);
  });
}
function Nt(e) {
  for (var t = 0; t < e.length; t++)
    pi.add(e[t]);
  for (var r of pa)
    r(e);
}
let ln = null;
function ds(e) {
  var t = this, r = (
    /** @type {Node} */
    t.ownerDocument
  ), a = e.type, o = e.composedPath?.() || [], l = (
    /** @type {null | Element} */
    o[0] || e.target
  );
  ln = e;
  var u = 0, d = ln === e && e.__root;
  if (d) {
    var v = o.indexOf(d);
    if (v !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e.__root = t;
      return;
    }
    var x = o.indexOf(t);
    if (x === -1)
      return;
    v <= x && (u = v);
  }
  if (l = /** @type {Element} */
  o[u] || e.target, l !== t) {
    gs(e, "currentTarget", {
      configurable: !0,
      get() {
        return l || r;
      }
    });
    var _ = et, g = rt;
    Gt(null), ur(null);
    try {
      for (var E, P = []; l !== null; ) {
        var C = l.assignedSlot || l.parentNode || /** @type {any} */
        l.host || null;
        try {
          var Q = l["__" + a];
          Q != null && (!/** @type {any} */
          l.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === l) && Q.call(l, e);
        } catch (S) {
          E ? P.push(S) : E = S;
        }
        if (e.cancelBubble || C === t || C === null)
          break;
        l = C;
      }
      if (E) {
        for (let S of P)
          queueMicrotask(() => {
            throw S;
          });
        throw E;
      }
    } finally {
      e.__root = t, delete e.currentTarget, Gt(_), ur(g);
    }
  }
}
function hi(e) {
  var t = document.createElement("template");
  return t.innerHTML = e.replaceAll("<!>", "<!---->"), t.content;
}
function Ar(e, t) {
  var r = (
    /** @type {Effect} */
    rt
  );
  r.nodes === null && (r.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function p(e, t) {
  var r = (t & to) !== 0, a = (t & ro) !== 0, o, l = !e.startsWith("<!>");
  return () => {
    if (Ze)
      return Ar(tt, null), tt;
    o === void 0 && (o = hi(l ? e : "<!>" + e), r || (o = /** @type {TemplateNode} */
    /* @__PURE__ */ qt(o)));
    var u = (
      /** @type {TemplateNode} */
      a || zn ? document.importNode(o, !0) : o.cloneNode(!0)
    );
    if (r) {
      var d = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ qt(u)
      ), v = (
        /** @type {TemplateNode} */
        u.lastChild
      );
      Ar(d, v);
    } else
      Ar(u, u);
    return u;
  };
}
function br() {
  if (Ze)
    return Ar(tt, null), tt;
  var e = document.createDocumentFragment(), t = document.createComment(""), r = Ut();
  return e.append(t, r), Ar(t, r), e;
}
function f(e, t) {
  if (Ze) {
    var r = (
      /** @type {Effect & { nodes: EffectNodes }} */
      rt
    );
    ((r.f & qs) === 0 || r.nodes.end === null) && (r.nodes.end = tt), es();
    return;
  }
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
const Ko = ["touchstart", "touchmove"];
function Jo(e) {
  return Ko.includes(e);
}
function m(e, t) {
  var r = t == null ? "" : typeof t == "object" ? t + "" : t;
  r !== (e.__t ??= e.nodeValue) && (e.__t = r, e.nodeValue = r + "");
}
function xi(e, t) {
  return _i(e, t);
}
function Qo(e, t) {
  va(), t.intro = t.intro ?? !1;
  const r = t.target, a = Ze, o = tt;
  try {
    for (var l = /* @__PURE__ */ qt(r); l && (l.nodeType !== zr || /** @type {Comment} */
    l.data !== Da); )
      l = /* @__PURE__ */ sr(l);
    if (!l)
      throw Fr;
    pr(!0), St(
      /** @type {Comment} */
      l
    );
    const u = _i(e, { ...t, anchor: l });
    return pr(!1), /**  @type {Exports} */
    u;
  } catch (u) {
    if (u instanceof Error && u.message.split(`
`).some((d) => d.startsWith("https://svelte.dev/e/")))
      throw u;
    return u !== Fr && console.warn("Failed to hydrate: ", u), t.recover === !1 && _o(), va(), Fa(r), pr(!1), xi(e, t);
  } finally {
    pr(a), St(o);
  }
}
const Yr = /* @__PURE__ */ new Map();
function _i(e, { target: t, anchor: r, props: a = {}, events: o, context: l, intro: u = !0 }) {
  va();
  var d = /* @__PURE__ */ new Set(), v = (g) => {
    for (var E = 0; E < g.length; E++) {
      var P = g[E];
      if (!d.has(P)) {
        d.add(P);
        var C = Jo(P);
        t.addEventListener(P, ds, { passive: C });
        var Q = Yr.get(P);
        Q === void 0 ? (document.addEventListener(P, ds, { passive: C }), Yr.set(P, 1)) : Yr.set(P, Q + 1);
      }
    }
  };
  v(Ws(pi)), pa.add(v);
  var x = void 0, _ = Ho(() => {
    var g = r ?? t.appendChild(Ut());
    return Io(
      /** @type {TemplateNode} */
      g,
      {
        pending: () => {
        }
      },
      (E) => {
        kt({});
        var P = (
          /** @type {ComponentContext} */
          vt
        );
        if (l && (P.c = l), o && (a.$$events = o), Ze && Ar(
          /** @type {TemplateNode} */
          E,
          null
        ), x = e(E, a) || {}, Ze && (rt.nodes.end = tt, tt === null || tt.nodeType !== zr || /** @type {Comment} */
        tt.data !== Pa))
          throw ks(), Fr;
        Et();
      }
    ), () => {
      for (var E of d) {
        t.removeEventListener(E, ds);
        var P = (
          /** @type {number} */
          Yr.get(E)
        );
        --P === 0 ? (document.removeEventListener(E, ds), Yr.delete(E)) : Yr.set(E, P);
      }
      pa.delete(v), g !== r && g.parentNode?.removeChild(g);
    };
  });
  return ha.set(x, _), x;
}
let ha = /* @__PURE__ */ new WeakMap();
function Xo(e, t) {
  const r = ha.get(e);
  return r ? (ha.delete(e), r(t)) : Promise.resolve();
}
class Zo {
  /** @type {TemplateNode} */
  anchor;
  /** @type {Map<Batch, Key>} */
  #e = /* @__PURE__ */ new Map();
  /**
   * Map of keys to effects that are currently rendered in the DOM.
   * These effects are visible and actively part of the document tree.
   * Example:
   * ```
   * {#if condition}
   * 	foo
   * {:else}
   * 	bar
   * {/if}
   * ```
   * Can result in the entries `true->Effect` and `false->Effect`
   * @type {Map<Key, Effect>}
   */
  #t = /* @__PURE__ */ new Map();
  /**
   * Similar to #onscreen with respect to the keys, but contains branches that are not yet
   * in the DOM, because their insertion is deferred.
   * @type {Map<Key, Branch>}
   */
  #r = /* @__PURE__ */ new Map();
  /**
   * Keys of effects that are currently outroing
   * @type {Set<Key>}
   */
  #i = /* @__PURE__ */ new Set();
  /**
   * Whether to pause (i.e. outro) on change, or destroy immediately.
   * This is necessary for `<svelte:element>`
   */
  #o = !0;
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(t, r = !0) {
    this.anchor = t, this.#o = r;
  }
  #a = () => {
    var t = (
      /** @type {Batch} */
      st
    );
    if (this.#e.has(t)) {
      var r = (
        /** @type {Key} */
        this.#e.get(t)
      ), a = this.#t.get(r);
      if (a)
        Ha(a), this.#i.delete(r);
      else {
        var o = this.#r.get(r);
        o && (this.#t.set(r, o.effect), this.#r.delete(r), o.fragment.lastChild.remove(), this.anchor.before(o.fragment), a = o.effect);
      }
      for (const [l, u] of this.#e) {
        if (this.#e.delete(l), l === t)
          break;
        const d = this.#r.get(u);
        d && (At(d.effect), this.#r.delete(u));
      }
      for (const [l, u] of this.#t) {
        if (l === r || this.#i.has(l)) continue;
        const d = () => {
          if (Array.from(this.#e.values()).includes(l)) {
            var x = document.createDocumentFragment();
            ii(u, x), x.append(Ut()), this.#r.set(l, { effect: u, fragment: x });
          } else
            At(u);
          this.#i.delete(l), this.#t.delete(l);
        };
        this.#o || !a ? (this.#i.add(l), Rr(u, d, !1)) : d();
      }
    }
  };
  /**
   * @param {Batch} batch
   */
  #s = (t) => {
    this.#e.delete(t);
    const r = Array.from(this.#e.values());
    for (const [a, o] of this.#r)
      r.includes(a) || (At(o.effect), this.#r.delete(a));
  };
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(t, r) {
    var a = (
      /** @type {Batch} */
      st
    ), o = Gn();
    if (r && !this.#t.has(t) && !this.#r.has(t))
      if (o) {
        var l = document.createDocumentFragment(), u = Ut();
        l.append(u), this.#r.set(t, {
          effect: Ht(() => r(u)),
          fragment: l
        });
      } else
        this.#t.set(
          t,
          Ht(() => r(this.anchor))
        );
    if (this.#e.set(a, t), o) {
      for (const [d, v] of this.#t)
        d === t ? a.unskip_effect(v) : a.skip_effect(v);
      for (const [d, v] of this.#r)
        d === t ? a.unskip_effect(v.effect) : a.skip_effect(v.effect);
      a.oncommit(this.#a), a.ondiscard(this.#s);
    } else
      Ze && (this.anchor = tt), this.#a();
  }
}
function bi(e) {
  vt === null && An(), ns && vt.l !== null ? tc(vt).m.push(e) : Mt(() => {
    const t = Ur(e);
    if (typeof t == "function") return (
      /** @type {() => void} */
      t
    );
  });
}
function ec(e) {
  vt === null && An(), bi(() => () => Ur(e));
}
function tc(e) {
  var t = (
    /** @type {ComponentContextLegacy} */
    e.l
  );
  return t.u ??= { a: [], b: [], m: [] };
}
function R(e, t, r = !1) {
  Ze && es();
  var a = new Zo(e), o = r ? Zr : 0;
  function l(u, d) {
    if (Ze) {
      const _ = Dn(e);
      var v;
      if (_ === Da ? v = 0 : _ === Hs ? v = !1 : v = parseInt(_.substring(1)), u !== v) {
        var x = Fs();
        St(x), a.anchor = x, pr(!1), a.ensure(u, d), pr(!0);
        return;
      }
    }
    a.ensure(u, d);
  }
  Ba(() => {
    var u = !1;
    t((d, v = 0) => {
      u = !0, l(v, d);
    }), u || l(!1, null);
  }, o);
}
function it(e, t) {
  return t;
}
function rc(e, t, r) {
  for (var a = [], o = t.length, l, u = t.length, d = 0; d < o; d++) {
    let g = t[d];
    Rr(
      g,
      () => {
        if (l) {
          if (l.pending.delete(g), l.done.add(g), l.pending.size === 0) {
            var E = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            xa(Ws(l.done)), E.delete(l), E.size === 0 && (e.outrogroups = null);
          }
        } else
          u -= 1;
      },
      !1
    );
  }
  if (u === 0) {
    var v = a.length === 0 && r !== null;
    if (v) {
      var x = (
        /** @type {Element} */
        r
      ), _ = (
        /** @type {Element} */
        x.parentNode
      );
      Fa(_), _.append(x), e.items.clear();
    }
    xa(t, !v);
  } else
    l = {
      pending: new Set(t),
      done: /* @__PURE__ */ new Set()
    }, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(l);
}
function xa(e, t = !0) {
  for (var r = 0; r < e.length; r++)
    At(e[r], t);
}
var un;
function ze(e, t, r, a, o, l = null) {
  var u = e, d = /* @__PURE__ */ new Map(), v = (t & wn) !== 0;
  if (v) {
    var x = (
      /** @type {Element} */
      e
    );
    u = Ze ? St(/* @__PURE__ */ qt(x)) : x.appendChild(Ut());
  }
  Ze && es();
  var _ = null, g = /* @__PURE__ */ cr(() => {
    var I = r();
    return Ia(I) ? I : I == null ? [] : Ws(I);
  }), E, P = !0;
  function C() {
    S.fallback = _, sc(S, E, u, t, a), _ !== null && (E.length === 0 ? (_.f & fr) === 0 ? Ha(_) : (_.f ^= fr, vs(_, null, u)) : Rr(_, () => {
      _ = null;
    }));
  }
  var Q = Ba(() => {
    E = /** @type {V[]} */
    s(g);
    var I = E.length;
    let z = !1;
    if (Ze) {
      var we = Dn(u) === Hs;
      we !== (I === 0) && (u = Fs(), St(u), pr(!1), z = !0);
    }
    for (var he = /* @__PURE__ */ new Set(), Pe = (
      /** @type {Batch} */
      st
    ), ue = Gn(), Le = 0; Le < I; Le += 1) {
      Ze && tt.nodeType === zr && /** @type {Comment} */
      tt.data === Pa && (u = /** @type {Comment} */
      tt, z = !0, pr(!1));
      var ge = E[Le], Ke = a(ge, Le), xe = P ? null : d.get(Ke);
      xe ? (xe.v && ss(xe.v, ge), xe.i && ss(xe.i, Le), ue && Pe.unskip_effect(xe.e)) : (xe = ac(
        d,
        P ? u : un ??= Ut(),
        ge,
        Ke,
        Le,
        o,
        t,
        r
      ), P || (xe.e.f |= fr), d.set(Ke, xe)), he.add(Ke);
    }
    if (I === 0 && l && !_ && (P ? _ = Ht(() => l(u)) : (_ = Ht(() => l(un ??= Ut())), _.f |= fr)), I > he.size && vo(), Ze && I > 0 && St(Fs()), !P)
      if (ue) {
        for (const [Me, Ne] of d)
          he.has(Me) || Pe.skip_effect(Ne.e);
        Pe.oncommit(C), Pe.ondiscard(() => {
        });
      } else
        C();
    z && pr(!0), s(g);
  }), S = { effect: Q, items: d, outrogroups: null, fallback: _ };
  P = !1, Ze && (u = tt);
}
function ls(e) {
  for (; e !== null && (e.f & rr) === 0; )
    e = e.next;
  return e;
}
function sc(e, t, r, a, o) {
  var l = (a & Ji) !== 0, u = t.length, d = e.items, v = ls(e.effect.first), x, _ = null, g, E = [], P = [], C, Q, S, I;
  if (l)
    for (I = 0; I < u; I += 1)
      C = t[I], Q = o(C, I), S = /** @type {EachItem} */
      d.get(Q).e, (S.f & fr) === 0 && (S.nodes?.a?.measure(), (g ??= /* @__PURE__ */ new Set()).add(S));
  for (I = 0; I < u; I += 1) {
    if (C = t[I], Q = o(C, I), S = /** @type {EachItem} */
    d.get(Q).e, e.outrogroups !== null)
      for (const xe of e.outrogroups)
        xe.pending.delete(S), xe.done.delete(S);
    if ((S.f & fr) !== 0)
      if (S.f ^= fr, S === v)
        vs(S, null, r);
      else {
        var z = _ ? _.next : v;
        S === e.effect.last && (e.effect.last = S.prev), S.prev && (S.prev.next = S.next), S.next && (S.next.prev = S.prev), wr(e, _, S), wr(e, S, z), vs(S, z, r), _ = S, E = [], P = [], v = ls(_.next);
        continue;
      }
    if ((S.f & Ft) !== 0 && (Ha(S), l && (S.nodes?.a?.unfix(), (g ??= /* @__PURE__ */ new Set()).delete(S))), S !== v) {
      if (x !== void 0 && x.has(S)) {
        if (E.length < P.length) {
          var we = P[0], he;
          _ = we.prev;
          var Pe = E[0], ue = E[E.length - 1];
          for (he = 0; he < E.length; he += 1)
            vs(E[he], we, r);
          for (he = 0; he < P.length; he += 1)
            x.delete(P[he]);
          wr(e, Pe.prev, ue.next), wr(e, _, Pe), wr(e, ue, we), v = we, _ = ue, I -= 1, E = [], P = [];
        } else
          x.delete(S), vs(S, v, r), wr(e, S.prev, S.next), wr(e, S, _ === null ? e.effect.first : _.next), wr(e, _, S), _ = S;
        continue;
      }
      for (E = [], P = []; v !== null && v !== S; )
        (x ??= /* @__PURE__ */ new Set()).add(v), P.push(v), v = ls(v.next);
      if (v === null)
        continue;
    }
    (S.f & fr) === 0 && E.push(S), _ = S, v = ls(S.next);
  }
  if (e.outrogroups !== null) {
    for (const xe of e.outrogroups)
      xe.pending.size === 0 && (xa(Ws(xe.done)), e.outrogroups?.delete(xe));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (v !== null || x !== void 0) {
    var Le = [];
    if (x !== void 0)
      for (S of x)
        (S.f & Ft) === 0 && Le.push(S);
    for (; v !== null; )
      (v.f & Ft) === 0 && v !== e.fallback && Le.push(v), v = ls(v.next);
    var ge = Le.length;
    if (ge > 0) {
      var Ke = (a & wn) !== 0 && u === 0 ? r : null;
      if (l) {
        for (I = 0; I < ge; I += 1)
          Le[I].nodes?.a?.measure();
        for (I = 0; I < ge; I += 1)
          Le[I].nodes?.a?.fix();
      }
      rc(e, Le, Ke);
    }
  }
  l && lr(() => {
    if (g !== void 0)
      for (S of g)
        S.nodes?.a?.apply();
  });
}
function ac(e, t, r, a, o, l, u, d) {
  var v = (u & Gi) !== 0 ? (u & Qi) === 0 ? /* @__PURE__ */ Oa(r, !1, !1) : jr(r) : null, x = (u & Ki) !== 0 ? jr(o) : null;
  return {
    v,
    i: x,
    e: Ht(() => (l(t, v ?? r, x ?? o, d), () => {
      e.delete(a);
    }))
  };
}
function vs(e, t, r) {
  if (e.nodes)
    for (var a = e.nodes.start, o = e.nodes.end, l = t && (t.f & fr) === 0 ? (
      /** @type {EffectNodes} */
      t.nodes.start
    ) : r; a !== null; ) {
      var u = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ sr(a)
      );
      if (l.before(a), a === o)
        return;
      a = u;
    }
}
function wr(e, t, r) {
  t === null ? e.effect.first = r : t.next = r, r === null ? e.effect.last = t : r.prev = t;
}
function nc(e, t, r = !1, a = !1, o = !1) {
  var l = e, u = "";
  D(() => {
    var d = (
      /** @type {Effect} */
      rt
    );
    if (u === (u = t() ?? "")) {
      Ze && es();
      return;
    }
    if (d.nodes !== null && (ri(
      d.nodes.start,
      /** @type {TemplateNode} */
      d.nodes.end
    ), d.nodes = null), u !== "") {
      if (Ze) {
        tt.data;
        for (var v = es(), x = v; v !== null && (v.nodeType !== zr || /** @type {Comment} */
        v.data !== ""); )
          x = v, v = /* @__PURE__ */ sr(v);
        if (v === null)
          throw ks(), Fr;
        Ar(tt, x), l = St(v);
        return;
      }
      var _ = u + "";
      r ? _ = `<svg>${_}</svg>` : a && (_ = `<math>${_}</math>`);
      var g = hi(_);
      if ((r || a) && (g = /** @type {Element} */
      /* @__PURE__ */ qt(g)), Ar(
        /** @type {TemplateNode} */
        /* @__PURE__ */ qt(g),
        /** @type {TemplateNode} */
        g.lastChild
      ), r || a)
        for (; /* @__PURE__ */ qt(g); )
          l.before(
            /** @type {TemplateNode} */
            /* @__PURE__ */ qt(g)
          );
      else
        l.before(g);
    }
  });
}
function gi(e) {
  var t, r, a = "";
  if (typeof e == "string" || typeof e == "number") a += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (r = gi(e[t])) && (a && (a += " "), a += r);
  } else for (r in e) e[r] && (a && (a += " "), a += r);
  return a;
}
function ic() {
  for (var e, t, r = 0, a = "", o = arguments.length; r < o; r++) (e = arguments[r]) && (t = gi(e)) && (a && (a += " "), a += t);
  return a;
}
function oc(e) {
  return typeof e == "object" ? ic(e) : e ?? "";
}
function cc(e, t, r) {
  var a = e == null ? "" : "" + e;
  return a === "" ? null : a;
}
function lc(e, t) {
  return e == null ? null : String(e);
}
function Ve(e, t, r, a, o, l) {
  var u = e.__className;
  if (Ze || u !== r || u === void 0) {
    var d = cc(r);
    (!Ze || d !== e.getAttribute("class")) && (d == null ? e.removeAttribute("class") : e.className = d), e.__className = r;
  }
  return l;
}
function $r(e, t, r, a) {
  var o = e.__style;
  if (Ze || o !== t) {
    var l = lc(t);
    (!Ze || l !== e.getAttribute("style")) && (l == null ? e.removeAttribute("style") : e.style.cssText = l), e.__style = t;
  }
  return a;
}
function mi(e, t, r = !1) {
  if (e.multiple) {
    if (t == null)
      return;
    if (!Ia(t))
      return wo();
    for (var a of e.options)
      a.selected = t.includes(hs(a));
    return;
  }
  for (a of e.options) {
    var o = hs(a);
    if (Fo(o, t)) {
      a.selected = !0;
      return;
    }
  }
  (!r || t !== void 0) && (e.selectedIndex = -1);
}
function uc(e) {
  var t = new MutationObserver(() => {
    mi(e, e.__value);
  });
  t.observe(e, {
    // Listen to option element changes
    childList: !0,
    subtree: !0,
    // because of <optgroup>
    // Listen to option element value attribute changes
    // (doesn't get notified of select value changes,
    // because that property is not reflected as an attribute)
    attributes: !0,
    attributeFilter: ["value"]
  }), Ks(() => {
    t.disconnect();
  });
}
function ys(e, t, r = t) {
  var a = /* @__PURE__ */ new WeakSet(), o = !0;
  Jn(e, "change", (l) => {
    var u = l ? "[selected]" : ":checked", d;
    if (e.multiple)
      d = [].map.call(e.querySelectorAll(u), hs);
    else {
      var v = e.querySelector(u) ?? // will fall back to first non-disabled option if no option is selected
      e.querySelector("option:not([disabled])");
      d = v && hs(v);
    }
    r(d), st !== null && a.add(st);
  }), Zn(() => {
    var l = t();
    if (e === document.activeElement) {
      var u = (
        /** @type {Batch} */
        Vs ?? st
      );
      if (a.has(u))
        return;
    }
    if (mi(e, l, o), o && l === void 0) {
      var d = e.querySelector(":checked");
      d !== null && (l = hs(d), r(l));
    }
    e.__value = l, o = !1;
  }), uc(e);
}
function hs(e) {
  return "__value" in e ? e.__value : e.value;
}
const dc = /* @__PURE__ */ Symbol("is custom element"), vc = /* @__PURE__ */ Symbol("is html");
function dt(e) {
  if (Ze) {
    var t = !1, r = () => {
      if (!t) {
        if (t = !0, e.hasAttribute("value")) {
          var a = e.value;
          Vt(e, "value", null), e.value = a;
        }
        if (e.hasAttribute("checked")) {
          var o = e.checked;
          Vt(e, "checked", null), e.checked = o;
        }
      }
    };
    e.__on_r = r, lr(r), Kn();
  }
}
function Vt(e, t, r, a) {
  var o = fc(e);
  Ze && (o[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === "LINK") || o[t] !== (o[t] = r) && (t === "loading" && (e[lo] = r), r == null ? e.removeAttribute(t) : typeof r != "string" && pc(e).includes(t) ? e[t] = r : e.setAttribute(t, r));
}
function fc(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    e.__attributes ??= {
      [dc]: e.nodeName.includes("-"),
      [vc]: e.namespaceURI === so
    }
  );
}
var dn = /* @__PURE__ */ new Map();
function pc(e) {
  var t = e.getAttribute("is") || e.nodeName, r = dn.get(t);
  if (r) return r;
  dn.set(t, r = []);
  for (var a, o = e, l = Element.prototype; l !== o; ) {
    a = $n(o);
    for (var u in a)
      a[u].set && r.push(u);
    o = Ta(o);
  }
  return r;
}
function ot(e, t, r = t) {
  var a = /* @__PURE__ */ new WeakSet();
  Jn(e, "input", async (o) => {
    var l = o ? e.defaultValue : e.value;
    if (l = aa(e) ? na(l) : l, r(l), st !== null && a.add(st), await Wa(), l !== (l = t())) {
      var u = e.selectionStart, d = e.selectionEnd, v = e.value.length;
      if (e.value = l ?? "", d !== null) {
        var x = e.value.length;
        u === d && d === v && x > v ? (e.selectionStart = x, e.selectionEnd = x) : (e.selectionStart = u, e.selectionEnd = Math.min(d, x));
      }
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  (Ze && e.defaultValue !== e.value || // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  Ur(t) == null && e.value) && (r(aa(e) ? na(e.value) : e.value), st !== null && a.add(st)), Js(() => {
    var o = t();
    if (e === document.activeElement) {
      var l = (
        /** @type {Batch} */
        Vs ?? st
      );
      if (a.has(l))
        return;
    }
    aa(e) && o === na(e.value) || e.type === "date" && !o && !e.value || o !== e.value && (e.value = o ?? "");
  });
}
function aa(e) {
  var t = e.type;
  return t === "number" || t === "range";
}
function na(e) {
  return e === "" ? null : +e;
}
function vn(e, t) {
  return e === t || e?.[Cr] === t;
}
function Qr(e = {}, t, r, a) {
  return Zn(() => {
    var o, l;
    return Js(() => {
      o = l, l = [], Ur(() => {
        e !== r(...l) && (t(e, ...l), o && vn(r(...o), e) && t(null, ...o));
      });
    }), () => {
      lr(() => {
        l && vn(r(...l), e) && t(null, ...l);
      });
    };
  }), e;
}
function yi(e = !1) {
  const t = (
    /** @type {ComponentContextLegacy} */
    vt
  ), r = t.l.u;
  if (!r) return;
  let a = () => Yo(t.s);
  if (e) {
    let o = 0, l = (
      /** @type {Record<string, any>} */
      {}
    );
    const u = /* @__PURE__ */ Cs(() => {
      let d = !1;
      const v = t.s;
      for (const x in v)
        v[x] !== l[x] && (l[x] = v[x], d = !0);
      return d && o++, o;
    });
    a = () => s(u);
  }
  r.b.length && jo(() => {
    fn(t, a), Ls(r.b);
  }), Mt(() => {
    const o = Ur(() => r.m.map(oo));
    return () => {
      for (const l of o)
        typeof l == "function" && l();
    };
  }), r.a.length && Mt(() => {
    fn(t, a), Ls(r.a);
  });
}
function fn(e, t) {
  if (e.l.s)
    for (const r of e.l.s) s(r);
  t();
}
function qa(e, t, r) {
  if (e == null)
    return t(void 0), r && r(void 0), hr;
  const a = Ur(
    () => e.subscribe(
      t,
      // @ts-expect-error
      r
    )
  );
  return a.unsubscribe ? () => a.unsubscribe() : a;
}
const Gr = [];
function hc(e, t) {
  return {
    subscribe: Xe(e, t).subscribe
  };
}
function Xe(e, t = hr) {
  let r = null;
  const a = /* @__PURE__ */ new Set();
  function o(d) {
    if (In(e, d) && (e = d, r)) {
      const v = !Gr.length;
      for (const x of a)
        x[1](), Gr.push(x, e);
      if (v) {
        for (let x = 0; x < Gr.length; x += 2)
          Gr[x][0](Gr[x + 1]);
        Gr.length = 0;
      }
    }
  }
  function l(d) {
    o(d(
      /** @type {T} */
      e
    ));
  }
  function u(d, v = hr) {
    const x = [d, v];
    return a.add(x), a.size === 1 && (r = t(o, l) || hr), d(
      /** @type {T} */
      e
    ), () => {
      a.delete(x), a.size === 0 && r && (r(), r = null);
    };
  }
  return { set: o, update: l, subscribe: u };
}
function Kt(e, t, r) {
  const a = !Array.isArray(e), o = a ? [e] : e;
  if (!o.every(Boolean))
    throw new Error("derived() expects stores as input, got a falsy value");
  const l = t.length < 2;
  return hc(r, (u, d) => {
    let v = !1;
    const x = [];
    let _ = 0, g = hr;
    const E = () => {
      if (_)
        return;
      g();
      const C = t(a ? x[0] : x, u, d);
      l ? u(C) : g = typeof C == "function" ? C : hr;
    }, P = o.map(
      (C, Q) => qa(
        C,
        (S) => {
          x[Q] = S, _ &= ~(1 << Q), v && E();
        },
        () => {
          _ |= 1 << Q;
        }
      )
    );
    return v = !0, E(), function() {
      Ls(P), g(), v = !1;
    };
  });
}
function Ot(e) {
  let t;
  return qa(e, (r) => t = r)(), t;
}
let _a = /* @__PURE__ */ Symbol();
function $e(e, t, r) {
  const a = r[t] ??= {
    store: null,
    source: /* @__PURE__ */ Oa(void 0),
    unsubscribe: hr
  };
  if (a.store !== e && !(_a in r))
    if (a.unsubscribe(), a.store = e ?? null, e == null)
      a.source.v = void 0, a.unsubscribe = hr;
    else {
      var o = !0;
      a.unsubscribe = qa(e, (l) => {
        o ? a.source.v = l : h(a.source, l);
      }), o = !1;
    }
  return e && _a in r ? Ot(e) : s(a.source);
}
function Rt() {
  const e = {};
  function t() {
    Ks(() => {
      for (var r in e)
        e[r].unsubscribe();
      gs(e, _a, {
        enumerable: !1,
        value: !0
      });
    });
  }
  return [e, t];
}
function _t(e, t, r, a) {
  var o = !ns || (r & Xi) !== 0, l = (r & eo) !== 0, u = (
    /** @type {V} */
    a
  ), d = !0, v = () => (d && (d = !1, u = /** @type {V} */
  a), u), x;
  x = /** @type {V} */
  e[t], x === void 0 && a !== void 0 && (x = v());
  var _;
  if (o ? _ = () => {
    var C = (
      /** @type {V} */
      e[t]
    );
    return C === void 0 ? v() : (d = !0, C);
  } : _ = () => {
    var C = (
      /** @type {V} */
      e[t]
    );
    return C !== void 0 && (u = /** @type {V} */
    void 0), C === void 0 ? u : C;
  }, o && (r & Zi) === 0)
    return _;
  var g = !1, E = /* @__PURE__ */ Cs(() => (g = !1, _())), P = (
    /** @type {Effect} */
    rt
  );
  return (
    /** @type {() => V} */
    (function(C, Q) {
      if (arguments.length > 0) {
        const S = Q ? s(E) : o && l ? Wt(C) : C;
        return h(E, S), g = !0, u !== void 0 && (u = S), C;
      }
      return Dr && g || (P.f & xr) !== 0 ? E.v : s(E);
    })
  );
}
function xc(e) {
  return new _c(e);
}
class _c {
  /** @type {any} */
  #e;
  /** @type {Record<string, any>} */
  #t;
  /**
   * @param {ComponentConstructorOptions & {
   *  component: any;
   * }} options
   */
  constructor(t) {
    var r = /* @__PURE__ */ new Map(), a = (l, u) => {
      var d = /* @__PURE__ */ Oa(u, !1, !1);
      return r.set(l, d), d;
    };
    const o = new Proxy(
      { ...t.props || {}, $$events: {} },
      {
        get(l, u) {
          return s(r.get(u) ?? a(u, Reflect.get(l, u)));
        },
        has(l, u) {
          return u === co ? !0 : (s(r.get(u) ?? a(u, Reflect.get(l, u))), Reflect.has(l, u));
        },
        set(l, u, d) {
          return h(r.get(u) ?? a(u, d), d), Reflect.set(l, u, d);
        }
      }
    );
    this.#t = (t.hydrate ? Qo : xi)(t.component, {
      target: t.target,
      anchor: t.anchor,
      props: o,
      context: t.context,
      intro: t.intro ?? !1,
      recover: t.recover
    }), (!t?.props?.$$host || t.sync === !1) && ht(), this.#e = o.$$events;
    for (const l of Object.keys(this.#t))
      l === "$set" || l === "$destroy" || l === "$on" || gs(this, l, {
        get() {
          return this.#t[l];
        },
        /** @param {any} value */
        set(u) {
          this.#t[l] = u;
        },
        enumerable: !0
      });
    this.#t.$set = /** @param {Record<string, any>} next */
    (l) => {
      Object.assign(o, l);
    }, this.#t.$destroy = () => {
      Xo(this.#t);
    };
  }
  /** @param {Record<string, any>} props */
  $set(t) {
    this.#t.$set(t);
  }
  /**
   * @param {string} event
   * @param {(...args: any[]) => any} callback
   * @returns {any}
   */
  $on(t, r) {
    this.#e[t] = this.#e[t] || [];
    const a = (...o) => r.call(this, ...o);
    return this.#e[t].push(a), () => {
      this.#e[t] = this.#e[t].filter(
        /** @param {any} fn */
        (o) => o !== a
      );
    };
  }
  $destroy() {
    this.#t.$destroy();
  }
}
let wi;
typeof HTMLElement == "function" && (wi = class extends HTMLElement {
  /** The Svelte component constructor */
  $$ctor;
  /** Slots */
  $$s;
  /** @type {any} The Svelte component instance */
  $$c;
  /** Whether or not the custom element is connected */
  $$cn = !1;
  /** @type {Record<string, any>} Component props data */
  $$d = {};
  /** `true` if currently in the process of reflecting component props back to attributes */
  $$r = !1;
  /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
  $$p_d = {};
  /** @type {Record<string, EventListenerOrEventListenerObject[]>} Event listeners */
  $$l = {};
  /** @type {Map<EventListenerOrEventListenerObject, Function>} Event listener unsubscribe functions */
  $$l_u = /* @__PURE__ */ new Map();
  /** @type {any} The managed render effect for reflecting attributes */
  $$me;
  /** @type {ShadowRoot | null} The ShadowRoot of the custom element */
  $$shadowRoot = null;
  /**
   * @param {*} $$componentCtor
   * @param {*} $$slots
   * @param {ShadowRootInit | undefined} shadow_root_init
   */
  constructor(e, t, r) {
    super(), this.$$ctor = e, this.$$s = t, r && (this.$$shadowRoot = this.attachShadow(r));
  }
  /**
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  addEventListener(e, t, r) {
    if (this.$$l[e] = this.$$l[e] || [], this.$$l[e].push(t), this.$$c) {
      const a = this.$$c.$on(e, t);
      this.$$l_u.set(t, a);
    }
    super.addEventListener(e, t, r);
  }
  /**
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  removeEventListener(e, t, r) {
    if (super.removeEventListener(e, t, r), this.$$c) {
      const a = this.$$l_u.get(t);
      a && (a(), this.$$l_u.delete(t));
    }
  }
  async connectedCallback() {
    if (this.$$cn = !0, !this.$$c) {
      let e = function(a) {
        return (o) => {
          const l = document.createElement("slot");
          a !== "default" && (l.name = a), f(o, l);
        };
      };
      if (await Promise.resolve(), !this.$$cn || this.$$c)
        return;
      const t = {}, r = bc(this);
      for (const a of this.$$s)
        a in r && (a === "default" && !this.$$d.children ? (this.$$d.children = e(a), t.default = !0) : t[a] = e(a));
      for (const a of this.attributes) {
        const o = this.$$g_p(a.name);
        o in this.$$d || (this.$$d[o] = Ms(o, a.value, this.$$p_d, "toProp"));
      }
      for (const a in this.$$p_d)
        !(a in this.$$d) && this[a] !== void 0 && (this.$$d[a] = this[a], delete this[a]);
      this.$$c = xc({
        component: this.$$ctor,
        target: this.$$shadowRoot || this,
        props: {
          ...this.$$d,
          $$slots: t,
          $$host: this
        }
      }), this.$$me = Bo(() => {
        Js(() => {
          this.$$r = !0;
          for (const a of Rs(this.$$c)) {
            if (!this.$$p_d[a]?.reflect) continue;
            this.$$d[a] = this.$$c[a];
            const o = Ms(
              a,
              this.$$d[a],
              this.$$p_d,
              "toAttribute"
            );
            o == null ? this.removeAttribute(this.$$p_d[a].attribute || a) : this.setAttribute(this.$$p_d[a].attribute || a, o);
          }
          this.$$r = !1;
        });
      });
      for (const a in this.$$l)
        for (const o of this.$$l[a]) {
          const l = this.$$c.$on(a, o);
          this.$$l_u.set(o, l);
        }
      this.$$l = {};
    }
  }
  // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
  // and setting attributes through setAttribute etc, this is helpful
  /**
   * @param {string} attr
   * @param {string} _oldValue
   * @param {string} newValue
   */
  attributeChangedCallback(e, t, r) {
    this.$$r || (e = this.$$g_p(e), this.$$d[e] = Ms(e, r, this.$$p_d, "toProp"), this.$$c?.$set({ [e]: this.$$d[e] }));
  }
  disconnectedCallback() {
    this.$$cn = !1, Promise.resolve().then(() => {
      !this.$$cn && this.$$c && (this.$$c.$destroy(), this.$$me(), this.$$c = void 0);
    });
  }
  /**
   * @param {string} attribute_name
   */
  $$g_p(e) {
    return Rs(this.$$p_d).find(
      (t) => this.$$p_d[t].attribute === e || !this.$$p_d[t].attribute && t.toLowerCase() === e
    ) || e;
  }
});
function Ms(e, t, r, a) {
  const o = r[e]?.type;
  if (t = o === "Boolean" && typeof t != "boolean" ? t != null : t, !a || !r[e])
    return t;
  if (a === "toAttribute")
    switch (o) {
      case "Object":
      case "Array":
        return t == null ? null : JSON.stringify(t);
      case "Boolean":
        return t ? "" : null;
      case "Number":
        return t ?? null;
      default:
        return t;
    }
  else
    switch (o) {
      case "Object":
      case "Array":
        return t && JSON.parse(t);
      case "Boolean":
        return t;
      // conversion already handled above
      case "Number":
        return t != null ? +t : t;
      default:
        return t;
    }
}
function bc(e) {
  const t = {};
  return e.childNodes.forEach((r) => {
    t[
      /** @type {Element} node */
      r.slot || "default"
    ] = !0;
  }), t;
}
function Dt(e, t, r, a, o, l) {
  let u = class extends wi {
    constructor() {
      super(e, r, o), this.$$p_d = t;
    }
    static get observedAttributes() {
      return Rs(t).map(
        (d) => (t[d].attribute || d).toLowerCase()
      );
    }
  };
  return Rs(t).forEach((d) => {
    gs(u.prototype, d, {
      get() {
        return this.$$c && d in this.$$c ? this.$$c[d] : this.$$d[d];
      },
      set(v) {
        v = Ms(d, v, t), this.$$d[d] = v;
        var x = this.$$c;
        if (x) {
          var _ = Jr(x, d)?.get;
          _ ? x[d] = v : x.$set({ [d]: v });
        }
      }
    });
  }), a.forEach((d) => {
    gs(u.prototype, d, {
      get() {
        return this.$$c?.[d];
      }
    });
  }), e.element = /** @type {any} */
  u, u;
}
const $i = 8, ki = 16, xs = 64;
function kr(e, t) {
  return (e & t) !== 0;
}
function ba(e, t) {
  switch (t) {
    case "storming":
      return e.storming_status_label ?? "";
    case "planning":
      return e.planning_status_label ?? "";
    case "kanban":
      return e.kanban_status_label ?? "";
    case "crafting":
      return e.crafting_status_label ?? "";
  }
}
function ga(e, t) {
  switch (t) {
    case "storming":
      return e.storming_available_actions ?? [];
    case "planning":
      return e.planning_available_actions ?? [];
    case "kanban":
      return e.kanban_available_actions ?? [];
    case "crafting":
      return e.crafting_available_actions ?? [];
  }
}
let ma;
function gc(e) {
  ma = e;
}
function Ge() {
  if (!ma)
    throw new Error("Martha API not initialized. Call setApi() first.");
  return ma;
}
const Ei = "hecate://localhost";
async function mc() {
  try {
    const e = await fetch(`${Ei}/api/llm/models`);
    if (!e.ok) return [];
    const t = await e.json();
    return t.ok && Array.isArray(t.models) ? t.models.map((r) => r.name) : [];
  } catch {
    return [];
  }
}
function yc(e, t) {
  let r = null, a = null, o = null, l = !1;
  const u = {
    onChunk(d) {
      return r = d, u;
    },
    onDone(d) {
      return a = d, u;
    },
    onError(d) {
      return o = d, u;
    },
    async start() {
      if (!l)
        try {
          const d = await fetch(`${Ei}/api/llm/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model: e, messages: t })
          });
          if (l) return;
          if (!d.ok) {
            const x = await d.text().catch(() => d.statusText);
            o && o(x || "LLM request failed");
            return;
          }
          const v = await d.json();
          r && r({ content: v.content }), a && a({ content: "", done: !0 });
        } catch (d) {
          if (l) return;
          o && o(d.message || "LLM request failed");
        }
    },
    cancel() {
      l = !0;
    }
  };
  return u;
}
function Ci() {
  return {
    stream: {
      chat: yc
    }
  };
}
const za = Xe(!1), Si = Xe(""), Ua = Xe(null), Ai = Xe(null), Ya = Xe([]), Ga = Kt(
  [Ai, Ya],
  ([e, t]) => e ?? t[0] ?? null
), Di = "hecate-app-martha-phase-models";
function wc() {
  try {
    const e = localStorage.getItem(Di);
    if (e)
      return { storming: null, planning: null, kanban: null, crafting: null, ...JSON.parse(e) };
  } catch {
  }
  return { storming: null, planning: null, kanban: null, crafting: null };
}
function $c(e) {
  try {
    localStorage.setItem(Di, JSON.stringify(e));
  } catch {
  }
}
const Pi = Xe(wc()), kc = [
  /code/i,
  /coder/i,
  /codestral/i,
  /starcoder/i,
  /codellama/i,
  /wizard-?coder/i,
  /deepseek-coder/i
];
function pn(e) {
  return kc.some((t) => t.test(e)) ? "code" : "general";
}
function Ec(e) {
  return e === "crafting" ? "code" : "general";
}
function vr(e, t) {
  Ua.set(t ?? null), Si.set(e), za.set(!0);
}
function Cc() {
  za.set(!1), Ua.set(null);
}
function Ka(e) {
  Ai.set(e);
}
function hn(e, t) {
  Pi.update((r) => {
    const a = { ...r, [e]: t };
    return $c(a), a;
  });
}
function Sc(e) {
  return e.split(`
`).map((t) => t.replace(/^[\s\-*\u2022\d.]+/, "").trim()).filter((t) => t.length > 0 && t.length < 80 && !t.includes(":")).map((t) => t.replace(/["`]/g, ""));
}
const Or = [
  {
    code: "storming",
    name: "Storming",
    shortName: "Storming",
    description: "Design aggregates, events, desks, and dependencies",
    role: "storming",
    color: "phase-storming"
  },
  {
    code: "planning",
    name: "Planning",
    shortName: "Planning",
    description: "Lifecycle management for the division",
    role: "planning",
    color: "phase-planning"
  },
  {
    code: "kanban",
    name: "Kanban",
    shortName: "Kanban",
    description: "Work items board for desk crafting",
    role: "kanban",
    color: "phase-kanban"
  },
  {
    code: "crafting",
    name: "Crafting",
    shortName: "Crafting",
    description: "Generate code, run tests, deliver releases",
    role: "crafting",
    color: "phase-crafting"
  }
], ws = Xe([]), gt = Xe(null), Br = Xe([]), _s = Xe(null), pt = Xe(!1), nr = Xe(null), Ir = Kt(
  [Br, _s],
  ([e, t]) => e.find((r) => r.division_id === t) ?? null
), Qs = Kt(
  gt,
  (e) => e ? kr(e.status, xs) ? "archived" : kr(e.status, ki) ? "discovery_paused" : kr(e.status, $i) ? "discovering" : e.phase || "initiated" : "none"
);
function bs(e) {
  gt.set(e);
}
function ya() {
  gt.set(null);
}
async function As() {
  try {
    const t = await Ge().get("/ventures");
    ws.set(t.ventures);
  } catch {
    ws.set([]);
  }
}
async function ir() {
  try {
    const t = await Ge().get("/ventures/active");
    gt.set(t.venture);
  } catch {
    gt.set(null);
  }
}
async function is(e) {
  try {
    const r = await Ge().get(
      `/ventures/${e}/divisions`
    );
    Br.set(r.divisions);
  } catch {
    Br.set([]);
  }
}
async function Ii(e, t) {
  try {
    return pt.set(!0), await Ge().post("/ventures/initiate", { name: e, brief: t, initiated_by: "hecate-web" }), await As(), await ir(), !0;
  } catch (r) {
    const a = r;
    return nr.set(a.message || "Failed to initiate venture"), !1;
  } finally {
    pt.set(!1);
  }
}
async function Ti(e, t, r, a, o) {
  try {
    return pt.set(!0), await Ge().post(`/ventures/${e}/repo`, {
      repo_url: t,
      vision: r || void 0,
      name: a || void 0,
      brief: o || void 0
    }), await ir(), !0;
  } catch (l) {
    const u = l;
    return nr.set(u.message || "Failed to scaffold venture repo"), !1;
  } finally {
    pt.set(!1);
  }
}
async function Ja(e) {
  try {
    return pt.set(!0), await Ge().post(`/ventures/${e}/discovery/start`, {}), await ir(), !0;
  } catch (t) {
    const r = t;
    return nr.set(r.message || "Failed to start discovery"), !1;
  } finally {
    pt.set(!1);
  }
}
async function Mi(e, t, r) {
  try {
    return pt.set(!0), await Ge().post(`/ventures/${e}/discovery/identify`, {
      context_name: t,
      description: r || null,
      identified_by: "hecate-web"
    }), await is(e), !0;
  } catch (a) {
    const o = a;
    return nr.set(o.message || "Failed to identify division"), !1;
  } finally {
    pt.set(!1);
  }
}
async function Ni(e, t) {
  try {
    return pt.set(!0), await Ge().post(`/ventures/${e}/discovery/pause`, {
      reason: t || null
    }), await ir(), !0;
  } catch (r) {
    const a = r;
    return nr.set(a.message || "Failed to pause discovery"), !1;
  } finally {
    pt.set(!1);
  }
}
async function Ri(e) {
  try {
    return pt.set(!0), await Ge().post(`/ventures/${e}/discovery/resume`, {}), await ir(), !0;
  } catch (t) {
    const r = t;
    return nr.set(r.message || "Failed to resume discovery"), !1;
  } finally {
    pt.set(!1);
  }
}
async function Li(e) {
  try {
    return pt.set(!0), await Ge().post(`/ventures/${e}/discovery/complete`, {}), await ir(), !0;
  } catch (t) {
    const r = t;
    return nr.set(r.message || "Failed to complete discovery"), !1;
  } finally {
    pt.set(!1);
  }
}
const Ac = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activeVenture: gt,
  clearActiveVenture: ya,
  completeDiscovery: Li,
  divisions: Br,
  fetchActiveVenture: ir,
  fetchDivisions: is,
  fetchVentures: As,
  identifyDivision: Mi,
  initiateVenture: Ii,
  isLoading: pt,
  pauseDiscovery: Ni,
  resumeDiscovery: Ri,
  scaffoldVentureRepo: Ti,
  selectVenture: bs,
  selectedDivision: Ir,
  selectedDivisionId: _s,
  startDiscovery: Ja,
  ventureError: nr,
  ventureStep: Qs,
  ventures: ws
}, Symbol.toStringTag, { value: "Module" })), as = Xe("storming"), Xs = Xe(null), gr = Xe(!1);
function Zs(e) {
  switch (e) {
    case "storming":
      return "stormings";
    case "planning":
      return "plannings";
    case "kanban":
      return "kanbans";
    case "crafting":
      return "craftings";
  }
}
async function Dc(e, t) {
  try {
    gr.set(!0), await Ge().post(`/${Zs(t)}/${e}/open`, {});
    const a = Ot(gt);
    return a && await is(a.venture_id), !0;
  } catch (r) {
    const a = r;
    return Xs.set(a.message || `Failed to open ${t}`), !1;
  } finally {
    gr.set(!1);
  }
}
async function Pc(e, t, r) {
  try {
    gr.set(!0), await Ge().post(`/${Zs(t)}/${e}/shelve`, {
      reason: r || null
    });
    const o = Ot(gt);
    return o && await is(o.venture_id), !0;
  } catch (a) {
    const o = a;
    return Xs.set(o.message || `Failed to shelve ${t}`), !1;
  } finally {
    gr.set(!1);
  }
}
async function Ic(e, t) {
  try {
    gr.set(!0), await Ge().post(`/${Zs(t)}/${e}/resume`, {});
    const a = Ot(gt);
    return a && await is(a.venture_id), !0;
  } catch (r) {
    const a = r;
    return Xs.set(a.message || `Failed to resume ${t}`), !1;
  } finally {
    gr.set(!1);
  }
}
async function Tc(e, t) {
  try {
    gr.set(!0), await Ge().post(`/${Zs(t)}/${e}/conclude`, {});
    const a = Ot(gt);
    return a && await is(a.venture_id), !0;
  } catch (r) {
    const a = r;
    return Xs.set(a.message || `Failed to conclude ${t}`), !1;
  } finally {
    gr.set(!1);
  }
}
const Hr = Xe("ready"), os = Xe([]), ea = Xe([]), Qa = Xe([]), Bs = Xe(600), Xa = Xe([]), wa = Xe(!1), Ct = Xe(null), $a = Xe(!1);
let Nr = null;
const Mc = Kt(
  os,
  (e) => e.filter((t) => !t.cluster_id)
), Nc = Kt(
  os,
  (e) => {
    const t = /* @__PURE__ */ new Map();
    for (const r of e)
      if (r.stack_id) {
        const a = t.get(r.stack_id) || [];
        a.push(r), t.set(r.stack_id, a);
      }
    return t;
  }
), Rc = Kt(
  os,
  (e) => e.length
);
async function Pt(e) {
  try {
    const a = (await Ge().get(
      `/ventures/${e}/storm/state`
    )).storm;
    Hr.set(a.phase), os.set(a.stickies), ea.set(a.clusters), Qa.set(a.arrows);
  } catch {
    Hr.set("ready");
  }
}
async function xn(e, t = 0, r = 50) {
  try {
    const o = await Ge().get(
      `/ventures/${e}/events?offset=${t}&limit=${r}`
    );
    return Xa.set(o.events), { events: o.events, count: o.count };
  } catch {
    return { events: [], count: 0 };
  }
}
async function Lc(e) {
  try {
    return $a.set(!0), await Ge().post(`/ventures/${e}/storm/start`, {}), Hr.set("storm"), Bs.set(600), Nr = setInterval(() => {
      Bs.update((r) => r <= 1 ? (Nr && (clearInterval(Nr), Nr = null), 0) : r - 1);
    }, 1e3), !0;
  } catch (t) {
    const r = t;
    return Ct.set(r.message || "Failed to start storm"), !1;
  } finally {
    $a.set(!1);
  }
}
async function ka(e, t, r = "user") {
  try {
    return await Ge().post(`/ventures/${e}/storm/sticky`, { text: t, author: r }), await Pt(e), !0;
  } catch (a) {
    const o = a;
    return Ct.set(o.message || "Failed to post sticky"), !1;
  }
}
async function Oc(e, t) {
  try {
    return await Ge().post(`/ventures/${e}/storm/sticky/${t}/pull`, {}), await Pt(e), !0;
  } catch (r) {
    const a = r;
    return Ct.set(a.message || "Failed to pull sticky"), !1;
  }
}
async function _n(e, t, r) {
  try {
    return await Ge().post(`/ventures/${e}/storm/sticky/${t}/stack`, {
      target_sticky_id: r
    }), await Pt(e), !0;
  } catch (a) {
    const o = a;
    return Ct.set(o.message || "Failed to stack sticky"), !1;
  }
}
async function Fc(e, t) {
  try {
    return await Ge().post(`/ventures/${e}/storm/sticky/${t}/unstack`, {}), await Pt(e), !0;
  } catch (r) {
    const a = r;
    return Ct.set(a.message || "Failed to unstack sticky"), !1;
  }
}
async function Vc(e, t, r) {
  try {
    return await Ge().post(`/ventures/${e}/storm/stack/${t}/groom`, {
      canonical_sticky_id: r
    }), await Pt(e), !0;
  } catch (a) {
    const o = a;
    return Ct.set(o.message || "Failed to groom stack"), !1;
  }
}
async function bn(e, t, r) {
  try {
    return await Ge().post(`/ventures/${e}/storm/sticky/${t}/cluster`, {
      target_cluster_id: r
    }), await Pt(e), !0;
  } catch (a) {
    const o = a;
    return Ct.set(o.message || "Failed to cluster sticky"), !1;
  }
}
async function jc(e, t) {
  try {
    return await Ge().post(`/ventures/${e}/storm/sticky/${t}/uncluster`, {}), await Pt(e), !0;
  } catch (r) {
    const a = r;
    return Ct.set(a.message || "Failed to uncluster sticky"), !1;
  }
}
async function Bc(e, t) {
  try {
    return await Ge().post(`/ventures/${e}/storm/cluster/${t}/dissolve`, {}), await Pt(e), !0;
  } catch (r) {
    const a = r;
    return Ct.set(a.message || "Failed to dissolve cluster"), !1;
  }
}
async function Hc(e, t, r) {
  try {
    return await Ge().post(`/ventures/${e}/storm/cluster/${t}/name`, { name: r }), await Pt(e), !0;
  } catch (a) {
    const o = a;
    return Ct.set(o.message || "Failed to name cluster"), !1;
  }
}
async function Wc(e, t, r, a) {
  try {
    return await Ge().post(`/ventures/${e}/storm/fact`, {
      from_cluster: t,
      to_cluster: r,
      fact_name: a
    }), await Pt(e), !0;
  } catch (o) {
    const l = o;
    return Ct.set(l.message || "Failed to draw fact arrow"), !1;
  }
}
async function qc(e, t) {
  try {
    return await Ge().post(`/ventures/${e}/storm/fact/${t}/erase`, {}), await Pt(e), !0;
  } catch (r) {
    const a = r;
    return Ct.set(a.message || "Failed to erase fact arrow"), !1;
  }
}
async function zc(e, t) {
  try {
    return await Ge().post(`/ventures/${e}/storm/cluster/${t}/promote`, {}), await Pt(e), !0;
  } catch (r) {
    const a = r;
    return Ct.set(a.message || "Failed to promote cluster"), !1;
  }
}
async function us(e, t) {
  try {
    return await Ge().post(`/ventures/${e}/storm/phase/advance`, {
      target_phase: t
    }), await Pt(e), !0;
  } catch (r) {
    const a = r;
    return Ct.set(a.message || "Failed to advance phase"), !1;
  }
}
async function Uc(e) {
  try {
    return await Ge().post(`/ventures/${e}/storm/shelve`, {}), Hr.set("shelved"), !0;
  } catch (t) {
    const r = t;
    return Ct.set(r.message || "Failed to shelve storm"), !1;
  }
}
async function Yc(e) {
  try {
    return await Ge().post(`/ventures/${e}/storm/resume`, {}), await Pt(e), !0;
  } catch (t) {
    const r = t;
    return Ct.set(r.message || "Failed to resume storm"), !1;
  }
}
async function Gc(e) {
  const t = Ot(ea);
  let r = !0;
  for (const a of t) {
    if (a.status !== "active" || !a.name?.trim()) continue;
    await zc(e, a.cluster_id) || (r = !1);
  }
  if (r) {
    const { fetchDivisions: a } = await Promise.resolve().then(() => Ac);
    await a(e);
  }
  return r;
}
function Kc() {
  Nr && (clearInterval(Nr), Nr = null), Hr.set("ready"), os.set([]), ea.set([]), Qa.set([]), Xa.set([]), Bs.set(600);
}
const gn = Xe(!1), Jc = Xe(null), Qc = Xe(null);
async function Xc(e, t) {
  try {
    gn.set(!0);
    const a = await Ge().post(
      `/ventures/${e}/vision/refine`,
      { vision: t }
    );
    return Jc.set(a.refined), await ir(), !0;
  } catch (r) {
    const a = r;
    return Qc.set(a.message || "Failed to refine vision"), !1;
  } finally {
    gn.set(!1);
  }
}
var Zc = /* @__PURE__ */ p('<div class="text-[10px] text-surface-400 truncate mt-0.5"> </div>'), el = /* @__PURE__ */ p('<button><div class="font-medium"> </div> <!></button>'), tl = /* @__PURE__ */ p(`<div class="absolute top-full left-0 mt-1 z-20 min-w-[220px]
						bg-surface-700 border border-surface-600 rounded-lg shadow-lg overflow-hidden"><!> <button class="w-full text-left px-3 py-2 text-xs text-hecate-400
							hover:bg-hecate-600/20 transition-colors border-t border-surface-600">+ New Venture</button></div>`), rl = /* @__PURE__ */ p('<span class="text-[11px] text-surface-400 truncate max-w-[300px]"> </span>'), sl = /* @__PURE__ */ p('<span class="text-[10px] text-surface-400"> </span>'), al = /* @__PURE__ */ p('<span class="text-[10px] text-surface-400 italic">Oracle active</span>'), nl = /* @__PURE__ */ p(`<button class="text-[11px] px-2.5 py-1 rounded bg-hecate-600/20 text-hecate-300
					hover:bg-hecate-600/30 transition-colors disabled:opacity-50">Start Discovery</button>`), il = /* @__PURE__ */ p(`<button class="text-[11px] px-2 py-1 rounded text-surface-400
						hover:text-health-ok hover:bg-surface-700 transition-colors disabled:opacity-50">Complete Discovery</button>`), ol = /* @__PURE__ */ p(
  `<button class="text-[11px] px-2.5 py-1 rounded bg-hecate-600/20 text-hecate-300
					hover:bg-hecate-600/30 transition-colors disabled:opacity-50">+ Identify Division</button> <button class="text-[11px] px-2 py-1 rounded text-surface-400
					hover:text-health-warn hover:bg-surface-700 transition-colors disabled:opacity-50">Pause</button> <!>`,
  1
), cl = /* @__PURE__ */ p(`<button class="text-[11px] px-2.5 py-1 rounded bg-health-warn/10 text-health-warn
					hover:bg-health-warn/20 transition-colors disabled:opacity-50">Resume Discovery</button>`), ll = /* @__PURE__ */ p('<div class="mt-2 text-[11px] text-health-err bg-health-err/10 rounded px-3 py-1.5"> </div>'), ul = /* @__PURE__ */ p(`<div class="mt-3 flex gap-2 items-end"><div class="flex-1"><label for="refine-brief" class="text-[10px] text-surface-400 block mb-1">Vision Brief</label> <textarea id="refine-brief" placeholder="Describe what this venture aims to achieve..." class="w-full bg-surface-700 border border-surface-600 rounded px-3 py-2 text-xs
						text-surface-100 placeholder-surface-400 resize-none
						focus:outline-none focus:border-hecate-500"></textarea></div> <button class="px-3 py-2 rounded text-xs bg-hecate-600 text-surface-50
					hover:bg-hecate-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Refine</button> <button class="px-3 py-2 rounded text-xs text-surface-400 hover:text-surface-100 transition-colors">Cancel</button></div>`), dl = /* @__PURE__ */ p(`<div class="mt-3 flex gap-2 items-end"><div class="flex-1"><label for="div-name" class="text-[10px] text-surface-400 block mb-1">Context Name</label> <input id="div-name" placeholder="e.g., authentication, billing, notifications" class="w-full bg-surface-700 border border-surface-600 rounded px-3 py-1.5 text-xs
						text-surface-100 placeholder-surface-400
						focus:outline-none focus:border-hecate-500"/></div> <div class="flex-1"><label for="div-desc" class="text-[10px] text-surface-400 block mb-1">Description (optional)</label> <input id="div-desc" placeholder="Brief description of this bounded context" class="w-full bg-surface-700 border border-surface-600 rounded px-3 py-1.5 text-xs
						text-surface-100 placeholder-surface-400
						focus:outline-none focus:border-hecate-500"/></div> <button class="px-3 py-1.5 rounded text-xs bg-hecate-600 text-surface-50
					hover:bg-hecate-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Identify</button> <button class="px-3 py-1.5 rounded text-xs text-surface-400 hover:text-surface-100 transition-colors">Cancel</button></div>`), vl = /* @__PURE__ */ p(`<div class="border-b border-surface-600 bg-surface-800/50 px-4 py-3 shrink-0"><div class="flex items-center gap-3"><button class="flex items-center gap-1 text-xs text-surface-400 hover:text-hecate-300
				transition-colors shrink-0 -ml-1 px-1.5 py-1 rounded hover:bg-surface-700"><span class="text-sm"></span> <span>Ventures</span></button> <span class="text-surface-600 text-xs">|</span> <div class="relative flex items-center gap-2"><span class="text-hecate-400 text-lg"></span> <button class="flex items-center gap-1.5 text-sm font-semibold text-surface-100
					hover:text-hecate-300 transition-colors"> <span class="text-[9px] text-surface-400"></span></button> <!></div> <span> </span> <!> <div class="flex-1"></div> <!> <!></div> <!> <!> <!></div>`);
function Oi(e, t) {
  kt(t, !0);
  const r = () => $e(gt, "$activeVenture", v), a = () => $e(ws, "$ventures", v), o = () => $e(Qs, "$ventureStep", v), l = () => $e(Br, "$divisions", v), u = () => $e(pt, "$isLoading", v), d = () => $e(nr, "$ventureError", v), [v, x] = Rt();
  let _ = /* @__PURE__ */ ne(!1), g = /* @__PURE__ */ ne(!1), E = /* @__PURE__ */ ne(!1), P = /* @__PURE__ */ ne(""), C = /* @__PURE__ */ ne(""), Q = /* @__PURE__ */ ne("");
  async function S() {
    if (!r() || !s(P).trim()) return;
    await Xc(r().venture_id, s(P).trim()) && (h(_, !1), h(P, ""));
  }
  async function I() {
    r() && await Ja(r().venture_id);
  }
  async function z() {
    if (!r() || !s(C).trim()) return;
    await Mi(r().venture_id, s(C).trim(), s(Q).trim() || void 0) && (h(g, !1), h(C, ""), h(Q, ""));
  }
  function we(w) {
    switch (w) {
      case "discovering":
        return "bg-hecate-600/20 text-hecate-300 border-hecate-600/40";
      case "discovery_completed":
        return "bg-health-ok/10 text-health-ok border-health-ok/30";
      case "discovery_paused":
        return "bg-health-warn/10 text-health-warn border-health-warn/30";
      default:
        return "bg-surface-700 text-surface-300 border-surface-600";
    }
  }
  var he = vl(), Pe = i(he), ue = i(Pe);
  ue.__click = () => ya();
  var Le = i(ue);
  Le.textContent = "←", xt(2), n(ue);
  var ge = c(ue, 4), Ke = i(ge);
  Ke.textContent = "◆";
  var xe = c(Ke, 2);
  xe.__click = () => h(E, !s(E));
  var Me = i(xe), Ne = c(Me);
  Ne.textContent = "▾", n(xe);
  var Ye = c(xe, 2);
  {
    var Je = (w) => {
      var k = tl(), F = i(k);
      ze(F, 1, () => a().filter((ye) => !(ye.status & xs)), it, (ye, Z) => {
        var K = el();
        K.__click = () => {
          bs(s(Z)), h(E, !1);
        };
        var be = i(K), T = i(be, !0);
        n(be);
        var j = c(be, 2);
        {
          var V = (le) => {
            var de = Zc(), ie = i(de, !0);
            n(de), D(() => m(ie, s(Z).brief)), f(le, de);
          };
          R(j, (le) => {
            s(Z).brief && le(V);
          });
        }
        n(K), D(() => {
          Ve(K, 1, `w-full text-left px-3 py-2 text-xs transition-colors
								${s(Z).venture_id === r()?.venture_id ? "bg-hecate-600/20 text-hecate-300" : "text-surface-200 hover:bg-surface-600"}`), m(T, s(Z).name);
        }), f(ye, K);
      });
      var re = c(F, 2);
      re.__click = () => {
        ya(), h(E, !1);
      }, n(k), f(w, k);
    };
    R(Ye, (w) => {
      s(E) && w(Je);
    });
  }
  n(ge);
  var fe = c(ge, 2), y = i(fe, !0);
  n(fe);
  var ee = c(fe, 2);
  {
    var je = (w) => {
      var k = rl(), F = i(k, !0);
      n(k), D(() => m(F, r().brief)), f(w, k);
    };
    R(ee, (w) => {
      r()?.brief && w(je);
    });
  }
  var We = c(ee, 4);
  {
    var Ae = (w) => {
      var k = sl(), F = i(k);
      n(k), D(() => m(F, `${l().length ?? ""} division${l().length !== 1 ? "s" : ""}`)), f(w, k);
    };
    R(We, (w) => {
      l().length > 0 && w(Ae);
    });
  }
  var ke = c(We, 2);
  {
    var me = (w) => {
      var k = al();
      f(w, k);
    }, oe = (w) => {
      var k = nl();
      k.__click = I, D(() => k.disabled = u()), f(w, k);
    }, _e = (w) => {
      var k = ol(), F = nt(k);
      F.__click = () => h(g, !s(g));
      var re = c(F, 2);
      re.__click = () => r() && Ni(r().venture_id);
      var ye = c(re, 2);
      {
        var Z = (K) => {
          var be = il();
          be.__click = () => r() && Li(r().venture_id), D(() => be.disabled = u()), f(K, be);
        };
        R(ye, (K) => {
          l().length > 0 && K(Z);
        });
      }
      D(() => {
        F.disabled = u(), re.disabled = u();
      }), f(w, k);
    }, ce = (w) => {
      var k = cl();
      k.__click = () => r() && Ri(r().venture_id), D(() => k.disabled = u()), f(w, k);
    };
    R(ke, (w) => {
      o() === "initiated" || o() === "vision_refined" ? w(me) : o() === "vision_submitted" ? w(oe, 1) : o() === "discovering" ? w(_e, 2) : o() === "discovery_paused" && w(ce, 3);
    });
  }
  n(Pe);
  var Ee = c(Pe, 2);
  {
    var L = (w) => {
      var k = ll(), F = i(k, !0);
      n(k), D(() => m(F, d())), f(w, k);
    };
    R(Ee, (w) => {
      d() && w(L);
    });
  }
  var H = c(Ee, 2);
  {
    var De = (w) => {
      var k = ul(), F = i(k), re = c(i(F), 2);
      Ys(re), Vt(re, "rows", 2), n(F);
      var ye = c(F, 2);
      ye.__click = S;
      var Z = c(ye, 2);
      Z.__click = () => h(_, !1), n(k), D((K) => ye.disabled = K, [() => !s(P).trim() || u()]), ot(re, () => s(P), (K) => h(P, K)), f(w, k);
    };
    R(H, (w) => {
      s(_) && w(De);
    });
  }
  var He = c(H, 2);
  {
    var te = (w) => {
      var k = dl(), F = i(k), re = c(i(F), 2);
      dt(re), n(F);
      var ye = c(F, 2), Z = c(i(ye), 2);
      dt(Z), n(ye);
      var K = c(ye, 2);
      K.__click = z;
      var be = c(K, 2);
      be.__click = () => h(g, !1), n(k), D((T) => K.disabled = T, [() => !s(C).trim() || u()]), ot(re, () => s(C), (T) => h(C, T)), ot(Z, () => s(Q), (T) => h(Q, T)), f(w, k);
    };
    R(He, (w) => {
      s(g) && w(te);
    });
  }
  n(he), D(
    (w) => {
      m(Me, `${r()?.name ?? "Venture" ?? ""} `), Ve(fe, 1, `text-[10px] px-2 py-0.5 rounded-full border ${w ?? ""}`), m(y, r()?.status_label ?? "New");
    },
    [() => we(o())]
  ), f(e, he), Et(), x();
}
Nt(["click"]);
Dt(Oi, {}, [], [], { mode: "open" });
var fl = /* @__PURE__ */ p('<p class="text-xs text-surface-300 mt-1.5 max-w-md mx-auto"> </p>'), pl = /* @__PURE__ */ p("<span></span>"), hl = /* @__PURE__ */ p('<div class="flex items-center gap-1"><div class="flex flex-col items-center gap-0.5 px-2"><span> </span> <span> </span></div> <!></div>'), xl = /* @__PURE__ */ p('<div class="rounded-lg border border-surface-600 bg-surface-800 p-3 col-span-2"><div class="text-[9px] text-surface-400 uppercase tracking-wider mb-1">Repository</div> <div class="text-xs text-surface-200 font-mono"> </div></div>'), _l = /* @__PURE__ */ p('<div class="rounded-lg border border-hecate-600/30 bg-hecate-600/5 p-5 text-center"><div class="text-xs text-surface-200 mb-3">Your venture repo has been scaffolded. The next step is <strong class="text-hecate-300">Big Picture Event Storming</strong> </div> <button> </button></div>'), bl = /* @__PURE__ */ p(`<div class="rounded-lg border border-surface-600 bg-surface-800 p-5 text-center"><div class="text-xs text-surface-200 mb-2">Discovery is complete. Identify divisions (bounded contexts)
						from the events you discovered.</div> <div class="text-[10px] text-surface-400">Use the header controls to identify divisions.</div></div>`), gl = /* @__PURE__ */ p('<div class="rounded-lg border border-surface-600 bg-surface-800 p-5 text-center"><div class="text-xs text-surface-200">Continue from the header controls to advance through the lifecycle.</div></div>'), ml = /* @__PURE__ */ p('<div class="text-center"><div class="text-3xl mb-3 text-hecate-400"></div> <h2 class="text-lg font-semibold text-surface-100"> </h2> <!></div> <div class="flex items-center justify-center gap-1 py-4"></div> <div class="grid grid-cols-2 gap-3"><div class="rounded-lg border border-surface-600 bg-surface-800 p-3"><div class="text-[9px] text-surface-400 uppercase tracking-wider mb-1">Status</div> <div class="text-xs text-surface-100"> </div></div> <div class="rounded-lg border border-surface-600 bg-surface-800 p-3"><div class="text-[9px] text-surface-400 uppercase tracking-wider mb-1">Initiated</div> <div class="text-xs text-surface-100"> </div></div> <!></div> <!>', 1), yl = /* @__PURE__ */ p('<div class="flex flex-col h-full overflow-y-auto"><div class="max-w-2xl mx-auto w-full p-8 space-y-6"><!></div></div>');
function Ns(e, t) {
  kt(t, !0);
  const r = () => $e(gt, "$activeVenture", l), a = () => $e(Qs, "$ventureStep", l), o = () => $e(pt, "$isLoading", l), [l, u] = Rt();
  let d = _t(t, "nextAction", 7);
  function v(z) {
    return z ? new Date(z * 1e3).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }) : "";
  }
  async function x() {
    if (!r()) return;
    await Ja(r().venture_id) && (await ir(), await As());
  }
  const _ = [
    { key: "vision", label: "Vision", icon: "◇" },
    { key: "discovery", label: "Discovery", icon: "○" },
    { key: "design", label: "Design", icon: "△" },
    { key: "plan", label: "Plan", icon: "□" },
    { key: "implement", label: "Implement", icon: "⚙" },
    { key: "deploy", label: "Deploy", icon: "▲" },
    { key: "monitor", label: "Monitor", icon: "◉" },
    { key: "rescue", label: "Rescue", icon: "↺" }
  ];
  let g = /* @__PURE__ */ Ce(() => {
    const z = a();
    return z === "initiated" || z === "vision_refined" || z === "vision_submitted" ? 0 : z === "discovering" || z === "discovery_paused" || z === "discovery_completed" ? 1 : 0;
  });
  var E = {
    get nextAction() {
      return d();
    },
    set nextAction(z) {
      d(z), ht();
    }
  }, P = yl(), C = i(P), Q = i(C);
  {
    var S = (z) => {
      var we = ml(), he = nt(we), Pe = i(he);
      Pe.textContent = "◆";
      var ue = c(Pe, 2), Le = i(ue, !0);
      n(ue);
      var ge = c(ue, 2);
      {
        var Ke = (_e) => {
          var ce = fl(), Ee = i(ce, !0);
          n(ce), D(() => m(Ee, r().brief)), f(_e, ce);
        };
        R(ge, (_e) => {
          r().brief && _e(Ke);
        });
      }
      n(he);
      var xe = c(he, 2);
      ze(xe, 21, () => _, it, (_e, ce, Ee) => {
        const L = /* @__PURE__ */ Ce(() => Ee < s(g)), H = /* @__PURE__ */ Ce(() => Ee === s(g)), De = /* @__PURE__ */ Ce(() => Ee === s(g) + 1);
        var He = hl(), te = i(He), w = i(te), k = i(w, !0);
        n(w);
        var F = c(w, 2), re = i(F, !0);
        n(F), n(te);
        var ye = c(te, 2);
        {
          var Z = (K) => {
            var be = pl();
            be.textContent = "→", D(() => Ve(be, 1, `text-[10px]
									${s(L) ? "text-health-ok/40" : "text-surface-700"}`)), f(K, be);
          };
          R(ye, (K) => {
            Ee < _.length - 1 && K(Z);
          });
        }
        n(He), D(() => {
          Vt(te, "title", s(ce).label), Ve(w, 1, `text-sm transition-colors
									${s(L) ? "text-health-ok" : s(H) ? "text-hecate-400" : "text-surface-600"}`), m(k, s(L) ? "✓" : s(ce).icon), Ve(F, 1, `text-[9px] transition-colors
									${s(L) ? "text-health-ok/70" : s(H) ? "text-hecate-300" : s(De) ? "text-surface-400" : "text-surface-600"}`), m(re, s(ce).label);
        }), f(_e, He);
      }), n(xe);
      var Me = c(xe, 2), Ne = i(Me), Ye = c(i(Ne), 2), Je = i(Ye, !0);
      n(Ye), n(Ne);
      var fe = c(Ne, 2), y = c(i(fe), 2), ee = i(y, !0);
      n(y), n(fe);
      var je = c(fe, 2);
      {
        var We = (_e) => {
          var ce = xl(), Ee = c(i(ce), 2), L = i(Ee, !0);
          n(Ee), n(ce), D(() => m(L, r().repos[0])), f(_e, ce);
        };
        R(je, (_e) => {
          r().repos && r().repos.length > 0 && _e(We);
        });
      }
      n(Me);
      var Ae = c(Me, 2);
      {
        var ke = (_e) => {
          var ce = _l(), Ee = i(ce), L = c(i(Ee), 2);
          L.nodeValue = " — discover the domain events that define your system.", n(Ee);
          var H = c(Ee, 2);
          H.__click = x;
          var De = i(H, !0);
          n(H), n(ce), D(() => {
            H.disabled = o(), Ve(H, 1, `px-5 py-2.5 rounded-lg text-sm font-medium transition-colors
							${o() ? "bg-surface-600 text-surface-400 cursor-not-allowed" : "bg-hecate-600 text-surface-50 hover:bg-hecate-500"}`), m(De, o() ? "Starting..." : "Start Discovery");
          }), f(_e, ce);
        }, me = (_e) => {
          var ce = bl();
          f(_e, ce);
        }, oe = (_e) => {
          var ce = gl();
          f(_e, ce);
        };
        R(Ae, (_e) => {
          d() === "discovery" && a() === "vision_submitted" ? _e(ke) : d() === "identify" ? _e(me, 1) : _e(oe, !1);
        });
      }
      D(
        (_e) => {
          m(Le, r().name), m(Je, r().status_label), m(ee, _e);
        },
        [() => v(r().initiated_at ?? 0)]
      ), f(z, we);
    };
    R(Q, (z) => {
      r() && z(S);
    });
  }
  n(C), n(P), f(e, P);
  var I = Et(E);
  return u(), I;
}
Nt(["click"]);
Dt(Ns, { nextAction: {} }, [], [], { mode: "open" });
Eo();
var wl = /* @__PURE__ */ p("<button><span> </span> <span> </span> <span> </span></button>"), $l = /* @__PURE__ */ p('<div class="ml-2 mt-1 space-y-0.5"></div>'), kl = /* @__PURE__ */ p('<div class="mb-2"><button><span class="font-medium"> </span></button> <!></div>'), El = /* @__PURE__ */ p('<div class="text-[10px] text-surface-400 px-2 py-4 text-center">No divisions yet. <br/> Start discovery to identify them.</div>'), Cl = /* @__PURE__ */ p('<div class="w-48 border-r border-surface-600 bg-surface-800/30 overflow-y-auto shrink-0"><div class="p-3"><div class="text-[10px] text-surface-400 uppercase tracking-wider mb-2">Divisions</div> <!> <!></div></div>');
function Fi(e, t) {
  kt(t, !1);
  const r = () => $e(Br, "$divisions", l), a = () => $e(_s, "$selectedDivisionId", l), o = () => $e(as, "$selectedPhase", l), [l, u] = Rt();
  function d(S) {
    _s.set(S);
  }
  function v(S, I) {
    _s.set(S), as.set(I);
  }
  function x(S, I) {
    return S ? I.length === 0 ? { icon: "●", css: "text-health-ok" } : I.includes("resume") ? { icon: "○", css: "text-health-warn" } : I.includes("shelve") || I.includes("conclude") || I.includes("archive") ? { icon: "◐", css: "text-hecate-400" } : I.includes("open") ? { icon: "○", css: "text-surface-300" } : { icon: "○", css: "text-surface-500" } : { icon: "○", css: "text-surface-500" };
  }
  function _(S, I) {
    return S ? I.length === 0 ? "text-health-ok" : I.includes("resume") ? "text-health-warn" : I.includes("shelve") || I.includes("conclude") || I.includes("archive") ? "text-hecate-400" : "text-surface-300" : "text-surface-500";
  }
  yi();
  var g = Cl(), E = i(g), P = c(i(E), 2);
  ze(P, 1, r, it, (S, I) => {
    const z = /* @__PURE__ */ cr(() => a() === s(I).division_id);
    var we = kl(), he = i(we);
    he.__click = () => d(s(I).division_id);
    var Pe = i(he), ue = i(Pe, !0);
    n(Pe), n(he);
    var Le = c(he, 2);
    {
      var ge = (Ke) => {
        var xe = $l();
        ze(xe, 5, () => Or, it, (Me, Ne) => {
          const Ye = /* @__PURE__ */ cr(() => ba(s(I), s(Ne).code)), Je = /* @__PURE__ */ cr(() => ga(s(I), s(Ne).code)), fe = /* @__PURE__ */ cr(() => {
            const { icon: oe, css: _e } = x(s(Ye), s(Je));
            return { icon: oe, css: _e };
          });
          var y = wl();
          y.__click = () => v(s(I).division_id, s(Ne).code);
          var ee = i(y), je = i(ee, !0);
          n(ee);
          var We = c(ee, 2), Ae = i(We, !0);
          n(We);
          var ke = c(We, 2), me = i(ke, !0);
          n(ke), n(y), D(
            (oe) => {
              Ve(y, 1, `w-full flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px]
									transition-colors
									${o() === s(Ne).code ? "bg-surface-600/50 text-surface-100" : "text-surface-400 hover:text-surface-300"}`), Ve(ee, 1, oc(s(fe).css)), m(je, s(fe).icon), m(Ae, s(Ne).shortName), Ve(ke, 1, `ml-auto text-[9px] ${oe ?? ""}`), m(me, s(Ye) || "Pending");
            },
            [() => _(s(Ye), s(Je))]
          ), f(Me, y);
        }), n(xe), f(Ke, xe);
      };
      R(Le, (Ke) => {
        s(z) && Ke(ge);
      });
    }
    n(we), D(() => {
      Ve(he, 1, `w-full text-left px-2 py-1.5 rounded text-xs transition-colors
						${s(z) ? "bg-surface-700 text-surface-100" : "text-surface-300 hover:bg-surface-700/50 hover:text-surface-100"}`), m(ue, s(I).context_name);
    }), f(S, we);
  });
  var C = c(P, 2);
  {
    var Q = (S) => {
      var I = El();
      f(S, I);
    };
    R(C, (S) => {
      r().length === 0 && S(Q);
    });
  }
  n(E), n(g), f(e, g), Et(), u();
}
Nt(["click"]);
Dt(Fi, {}, [], [], { mode: "open" });
const Vi = Xe(
  "You are Martha, an AI assistant specializing in software architecture and domain-driven design."
), Sl = `You are The Oracle, a vision architect. You interview the user about their venture and build a vision document.

RULES:
1. Ask ONE question per response. Keep it short (2-3 sentences + question).
2. After EVERY response, include a vision draft inside a \`\`\`markdown code fence.
3. Cover 5 topics: Problem, Users, Capabilities, Constraints, Success Criteria.

Be warm but direct. Push for specifics when answers are vague.`, Al = "Be concise and practical. Suggest specific, actionable items. When suggesting domain elements, use snake_case naming. When suggesting events, use the format: {subject}_{verb_past}_v{N}.", Dl = [
  {
    id: "oracle",
    name: "The Oracle",
    role: "Domain Expert",
    icon: "◇",
    description: "Rapid-fires domain events from the vision document",
    prompt: "You are The Oracle, a domain expert participating in a Big Picture Event Storming session. Your job is to rapidly identify domain events. Output ONLY event names in past tense business language. One per line. Be fast, be prolific."
  },
  {
    id: "architect",
    name: "The Architect",
    role: "Boundary Spotter",
    icon: "△",
    description: "Identifies natural context boundaries between event clusters",
    prompt: "You are The Architect, a DDD strategist. Given the events on the board, identify BOUNDED CONTEXT BOUNDARIES. Name the candidate contexts (divisions) and list which events belong to each."
  },
  {
    id: "advocate",
    name: "The Advocate",
    role: "Devil's Advocate",
    icon: "★",
    description: "Challenges context boundaries and finds missing events",
    prompt: "You are The Advocate. Identify MISSING events and challenge proposed boundaries. Be specific and constructive."
  },
  {
    id: "scribe",
    name: "The Scribe",
    role: "Integration Mapper",
    icon: "□",
    description: "Maps how contexts communicate via integration facts",
    prompt: 'You are The Scribe. Map INTEGRATION FACTS between contexts. Use: "Context A publishes fact_name -> Context B".'
  }
], Pl = [
  {
    id: "oracle",
    name: "The Oracle",
    role: "Domain Expert",
    icon: "◇",
    description: "Identifies domain events and business processes",
    prompt: "You are The Oracle for Design-Level Event Storming. Identify business events in past tense snake_case_v1 format with one-line rationale each."
  },
  {
    id: "architect",
    name: "The Architect",
    role: "Technical Lead",
    icon: "△",
    description: "Identifies aggregates and structural patterns",
    prompt: "You are The Architect for Design-Level Event Storming. Identify aggregate boundaries and explain which events cluster around them."
  },
  {
    id: "advocate",
    name: "The Advocate",
    role: "Devil's Advocate",
    icon: "★",
    description: "Questions assumptions and identifies edge cases",
    prompt: "You are The Advocate. Find problems, edge cases, and hotspots. Challenge every assumption."
  },
  {
    id: "scribe",
    name: "The Scribe",
    role: "Process Analyst",
    icon: "□",
    description: "Organizes discoveries and identifies read models",
    prompt: "You are The Scribe. Identify read models and policies. Focus on queryable information and domain rules."
  }
], Il = Xe(Dl), Tl = Xe(Pl), Ml = Xe(Sl), Nl = Xe(Al);
function Rl(e, t) {
  return e.replace(/\{\{(\w+)\}\}/g, (r, a) => t[a] ?? `{{${a}}}`);
}
var Ll = /* @__PURE__ */ p('<span class="text-[8px] text-hecate-400"></span>'), Ol = /* @__PURE__ */ p('<span class="truncate"> </span> <!>', 1), Fl = /* @__PURE__ */ p('<span class="text-surface-500">Select model</span>'), Vl = /* @__PURE__ */ p('<span class="text-hecate-400 ml-1">(code-optimized)</span>'), jl = /* @__PURE__ */ p('<button class="text-[9px] text-surface-500 hover:text-surface-300" title="Clear pinned model for this phase">Unpin</button>'), Bl = /* @__PURE__ */ p('<div class="px-2 py-1.5 border-b border-surface-700 flex items-center justify-between"><span class="text-[9px] text-surface-400">Phase: <span class="text-surface-200"> </span> <!></span> <!></div>'), Hl = /* @__PURE__ */ p('<div class="p-3 text-center text-[11px] text-surface-500"> </div>'), Wl = /* @__PURE__ */ p('<span class="text-[8px] text-hecate-400 shrink-0" title="Code model"></span>'), ql = /* @__PURE__ */ p('<span class="text-[8px] text-hecate-400 shrink-0" title="Pinned for this phase"></span>'), zl = /* @__PURE__ */ p('<span class="text-[9px] text-hecate-400 shrink-0"></span>'), Ul = /* @__PURE__ */ p('<button class="text-[8px] text-surface-600 hover:text-hecate-400 shrink-0">pin</button>'), Yl = /* @__PURE__ */ p('<div><span class="truncate flex-1"> </span> <!> <!> <!> <!></div>'), Gl = /* @__PURE__ */ p('<div class="py-1"><div class="px-2 py-1 text-[9px] text-surface-500 uppercase tracking-wider font-medium"> </div> <!></div>'), Kl = /* @__PURE__ */ p(`<div class="absolute top-full left-0 mt-1 w-72 max-h-80 overflow-hidden
				bg-surface-800 border border-surface-600 rounded-lg shadow-xl z-50
				flex flex-col"><div class="p-2 border-b border-surface-700"><input placeholder="Search models..." class="w-full bg-surface-700 border border-surface-600 rounded px-2 py-1
						text-[11px] text-surface-100 placeholder-surface-500
						focus:outline-none focus:border-hecate-500"/></div> <!> <div class="overflow-y-auto flex-1"><!> <!></div></div>`), Jl = /* @__PURE__ */ p(`<div class="relative"><button class="text-[10px] px-2 py-0.5 rounded bg-surface-700 text-surface-300
			hover:bg-surface-600 transition-colors truncate max-w-[180px] flex items-center gap-1"><!> <span class="text-[8px] ml-0.5"> </span></button> <!></div>`);
function ta(e, t) {
  kt(t, !0);
  const r = () => $e(Ya, "$availableModels", a), [a, o] = Rt();
  let l = _t(t, "currentModel", 7), u = _t(t, "onSelect", 7), d = _t(t, "showPhaseInfo", 7, !1), v = _t(t, "phasePreference", 7, null), x = _t(t, "phaseAffinity", 7, "general"), _ = _t(t, "onPinModel", 7), g = _t(t, "onClearPin", 7), E = _t(t, "phaseName", 7, ""), P = /* @__PURE__ */ ne(!1), C = /* @__PURE__ */ ne(""), Q = /* @__PURE__ */ ne(void 0), S = /* @__PURE__ */ Ce(() => {
    const y = r(), ee = s(C).toLowerCase(), je = ee ? y.filter((ke) => ke.toLowerCase().includes(ee)) : y, We = /* @__PURE__ */ new Map();
    for (const ke of je) {
      const me = I(ke), oe = We.get(me) ?? [];
      oe.push(ke), We.set(me, oe);
    }
    const Ae = [];
    for (const [ke, me] of We)
      Ae.push({ provider: ke, models: me });
    return Ae;
  });
  function I(y) {
    return y.startsWith("claude") || y.startsWith("anthropic") ? "Anthropic" : y.startsWith("gemini") || y.startsWith("gemma") ? "Google" : y.startsWith("llama") || y.startsWith("meta-llama") ? "Meta" : y.startsWith("qwen") ? "Alibaba" : y.startsWith("groq/") ? "Groq" : y.startsWith("openai/") || y.startsWith("gpt") ? "OpenAI" : y.includes("/") ? y.split("/")[0] : "Other";
  }
  function z(y) {
    u()(y), h(P, !1), h(C, "");
  }
  function we(y) {
    s(Q) && !s(Q).contains(y.target) && (h(P, !1), h(C, ""));
  }
  function he(y) {
    return y.length <= 24 ? y : y.slice(0, 22) + "…";
  }
  Mt(() => (s(P) ? document.addEventListener("click", we, !0) : document.removeEventListener("click", we, !0), () => document.removeEventListener("click", we, !0)));
  var Pe = {
    get currentModel() {
      return l();
    },
    set currentModel(y) {
      l(y), ht();
    },
    get onSelect() {
      return u();
    },
    set onSelect(y) {
      u(y), ht();
    },
    get showPhaseInfo() {
      return d();
    },
    set showPhaseInfo(y = !1) {
      d(y), ht();
    },
    get phasePreference() {
      return v();
    },
    set phasePreference(y = null) {
      v(y), ht();
    },
    get phaseAffinity() {
      return x();
    },
    set phaseAffinity(y = "general") {
      x(y), ht();
    },
    get onPinModel() {
      return _();
    },
    set onPinModel(y) {
      _(y), ht();
    },
    get onClearPin() {
      return g();
    },
    set onClearPin(y) {
      g(y), ht();
    },
    get phaseName() {
      return E();
    },
    set phaseName(y = "") {
      E(y), ht();
    }
  }, ue = Jl(), Le = i(ue);
  Le.__click = () => h(P, !s(P));
  var ge = i(Le);
  {
    var Ke = (y) => {
      var ee = Ol(), je = nt(ee), We = i(je, !0);
      n(je);
      var Ae = c(je, 2);
      {
        var ke = (oe) => {
          var _e = Ll();
          _e.textContent = "•", f(oe, _e);
        }, me = /* @__PURE__ */ Ce(() => pn(l()) === "code");
        R(Ae, (oe) => {
          s(me) && oe(ke);
        });
      }
      D((oe) => m(We, oe), [() => he(l())]), f(y, ee);
    }, xe = (y) => {
      var ee = Fl();
      f(y, ee);
    };
    R(ge, (y) => {
      l() ? y(Ke) : y(xe, !1);
    });
  }
  var Me = c(ge, 2), Ne = i(Me, !0);
  n(Me), n(Le);
  var Ye = c(Le, 2);
  {
    var Je = (y) => {
      var ee = Kl(), je = i(ee), We = i(je);
      dt(We), n(je);
      var Ae = c(je, 2);
      {
        var ke = (Ee) => {
          var L = Bl(), H = i(L), De = c(i(H)), He = i(De, !0);
          n(De);
          var te = c(De, 2);
          {
            var w = (re) => {
              var ye = Vl();
              f(re, ye);
            };
            R(te, (re) => {
              x() === "code" && re(w);
            });
          }
          n(H);
          var k = c(H, 2);
          {
            var F = (re) => {
              var ye = jl();
              ye.__click = () => g()?.(), f(re, ye);
            };
            R(k, (re) => {
              v() && re(F);
            });
          }
          n(L), D(() => m(He, E())), f(Ee, L);
        };
        R(Ae, (Ee) => {
          d() && E() && Ee(ke);
        });
      }
      var me = c(Ae, 2), oe = i(me);
      {
        var _e = (Ee) => {
          var L = Hl(), H = i(L, !0);
          n(L), D(() => m(H, r().length === 0 ? "No models available" : "No matching models")), f(Ee, L);
        };
        R(oe, (Ee) => {
          s(S).length === 0 && Ee(_e);
        });
      }
      var ce = c(oe, 2);
      ze(ce, 17, () => s(S), it, (Ee, L) => {
        var H = Gl(), De = i(H), He = i(De, !0);
        n(De);
        var te = c(De, 2);
        ze(te, 17, () => s(L).models, it, (w, k) => {
          const F = /* @__PURE__ */ Ce(() => s(k) === l()), re = /* @__PURE__ */ Ce(() => s(k) === v());
          var ye = Yl();
          ye.__click = () => z(s(k));
          var Z = i(ye), K = i(Z, !0);
          n(Z);
          var be = c(Z, 2);
          {
            var T = (se) => {
              var U = Wl();
              U.textContent = "• code", f(se, U);
            }, j = /* @__PURE__ */ Ce(() => pn(s(k)) === "code");
            R(be, (se) => {
              s(j) && se(T);
            });
          }
          var V = c(be, 2);
          {
            var le = (se) => {
              var U = ql();
              U.textContent = "📌", f(se, U);
            };
            R(V, (se) => {
              s(re) && se(le);
            });
          }
          var de = c(V, 2);
          {
            var ie = (se) => {
              var U = zl();
              U.textContent = "✓", f(se, U);
            };
            R(de, (se) => {
              s(F) && se(ie);
            });
          }
          var G = c(de, 2);
          {
            var Re = (se) => {
              var U = Ul();
              U.__click = (Oe) => {
                Oe.stopPropagation(), _()?.(s(k));
              }, D(() => Vt(U, "title", `Pin for ${E() ?? ""} phase`)), f(se, U);
            };
            R(G, (se) => {
              d() && _() && !s(re) && se(Re);
            });
          }
          n(ye), D(() => {
            Ve(ye, 1, `w-full text-left px-2 py-1.5 text-[11px] flex items-center gap-1.5
									transition-colors cursor-pointer
									${s(F) ? "bg-hecate-600/20 text-hecate-300" : "text-surface-200 hover:bg-surface-700"}`), m(K, s(k));
          }), f(w, ye);
        }), n(H), D(() => m(He, s(L).provider)), f(Ee, H);
      }), n(me), n(ee), ot(We, () => s(C), (Ee) => h(C, Ee)), f(y, ee);
    };
    R(Ye, (y) => {
      s(P) && y(Je);
    });
  }
  n(ue), Qr(ue, (y) => h(Q, y), () => s(Q)), D(() => {
    Vt(Le, "title", l() ?? "No model selected"), m(Ne, s(P) ? "▲" : "▼");
  }), f(e, ue);
  var fe = Et(Pe);
  return o(), fe;
}
Nt(["click"]);
Dt(
  ta,
  {
    currentModel: {},
    onSelect: {},
    showPhaseInfo: {},
    phasePreference: {},
    phaseAffinity: {},
    onPinModel: {},
    onClearPin: {},
    phaseName: {}
  },
  [],
  [],
  { mode: "open" }
);
var Ql = /* @__PURE__ */ p(`<div class="flex justify-end"><div class="max-w-[85%] rounded-lg px-3 py-2 text-[11px]
							bg-hecate-600/20 text-surface-100 border border-hecate-600/20"><div class="whitespace-pre-wrap break-words"> </div></div></div>`), Xl = /* @__PURE__ */ p(`<details class="mb-1.5 group"><summary class="text-[10px] text-surface-400 cursor-pointer hover:text-surface-300
											select-none flex items-center gap-1"><span class="text-[9px] transition-transform group-open:rotate-90"></span> Reasoning</summary> <div class="mt-1 pl-2 border-l-2 border-surface-600 text-[10px] text-surface-400
											whitespace-pre-wrap break-words max-h-32 overflow-y-auto"> </div></details>`), Zl = /* @__PURE__ */ p('<div class="whitespace-pre-wrap break-words"> </div>'), eu = /* @__PURE__ */ p('<div class="flex justify-start"><div></div></div>'), tu = /* @__PURE__ */ p(`<details class="group"><summary class="text-[10px] text-surface-500 cursor-pointer hover:text-surface-400
										select-none flex items-center gap-1"><span class="text-[9px] transition-transform group-open:rotate-90"></span> Show reasoning</summary> <div class="mt-1 pl-2 border-l-2 border-surface-600 text-[10px] text-surface-400
										whitespace-pre-wrap break-words max-h-32 overflow-y-auto"> <span class="inline-block w-1 h-3 bg-accent-400/50 animate-pulse ml-0.5"></span></div></details>`), ru = /* @__PURE__ */ p('<div class="flex items-center gap-2 text-surface-400 mb-1"><span class="flex gap-1"><span class="w-1.5 h-1.5 rounded-full bg-accent-500/60 animate-bounce" style="animation-delay: 0ms"></span> <span class="w-1.5 h-1.5 rounded-full bg-accent-500/60 animate-bounce" style="animation-delay: 150ms"></span> <span class="w-1.5 h-1.5 rounded-full bg-accent-500/60 animate-bounce" style="animation-delay: 300ms"></span></span> <span class="text-[10px] text-accent-400/70">Reasoning...</span></div> <!>', 1), su = /* @__PURE__ */ p(`<details class="mb-1.5 group"><summary class="text-[10px] text-surface-400 cursor-pointer hover:text-surface-300
										select-none flex items-center gap-1"><span class="text-[9px] transition-transform group-open:rotate-90"></span> Reasoning</summary> <div class="mt-1 pl-2 border-l-2 border-surface-600 text-[10px] text-surface-400
										whitespace-pre-wrap break-words max-h-32 overflow-y-auto"> </div></details>`), au = /* @__PURE__ */ p('<!> <div class="whitespace-pre-wrap break-words"> <span class="inline-block w-1.5 h-3 bg-hecate-400 animate-pulse ml-0.5"></span></div>', 1), nu = /* @__PURE__ */ p('<div class="flex items-center gap-1.5 text-surface-400"><span class="animate-bounce" style="animation-delay: 0ms">.</span> <span class="animate-bounce" style="animation-delay: 150ms">.</span> <span class="animate-bounce" style="animation-delay: 300ms">.</span></div>'), iu = /* @__PURE__ */ p(`<div class="flex justify-start"><div class="max-w-[85%] rounded-lg px-3 py-2 text-[11px]
						bg-surface-700 text-surface-200 border border-surface-600"><!></div></div>`), ou = /* @__PURE__ */ p('<div class="flex items-center justify-center h-full"><div class="text-center text-surface-400"><div class="text-2xl mb-2"></div> <div class="text-[11px]">The Oracle is preparing...</div></div></div>'), cu = /* @__PURE__ */ p('<span class="text-[10px] text-health-ok"></span>'), lu = /* @__PURE__ */ p('<span class="text-[10px] text-accent-400"></span>'), uu = /* @__PURE__ */ p('<span class="text-[10px] text-surface-400"></span>'), du = /* @__PURE__ */ p('<span class="text-[10px] text-surface-400">Waiting for Oracle...</span>'), vu = /* @__PURE__ */ p('<div class="mt-4 p-2 rounded bg-surface-700 border border-surface-600"><div class="text-[9px] text-surface-400 uppercase tracking-wider mb-1">Brief</div> <div class="text-[11px] text-surface-200"> </div></div>'), fu = /* @__PURE__ */ p('<div class="prose prose-sm prose-invert"><!></div> <!>', 1), pu = /* @__PURE__ */ p(`<div class="flex items-center justify-center h-full"><div class="text-center text-surface-400 max-w-[220px]"><div class="text-2xl mb-2"></div> <div class="text-[11px]">Your vision will take shape here as the Oracle
							gathers context about your venture.</div></div></div>`), hu = /* @__PURE__ */ p('<div class="text-[10px] text-health-err bg-health-err/10 rounded px-2 py-1"> </div>'), xu = /* @__PURE__ */ p(`<div class="space-y-2"><div><label for="repo-path" class="text-[10px] text-surface-400 block mb-1">Repository Path</label> <input id="repo-path" placeholder="~/ventures/my-venture" class="w-full bg-surface-700 border border-surface-600 rounded px-3 py-1.5
								text-[11px] text-surface-100 placeholder-surface-400
								focus:outline-none focus:border-hecate-500"/></div> <!> <button> </button></div>`), _u = /* @__PURE__ */ p('<div class="text-center text-[10px] text-surface-400 py-2"></div>'), bu = /* @__PURE__ */ p('<div class="text-center text-[10px] text-surface-400 py-2">The Oracle will guide you through defining your venture</div>'), gu = /* @__PURE__ */ p(`<div class="flex h-full overflow-hidden"><div class="flex flex-col overflow-hidden"><div class="flex items-center gap-2 px-4 py-2.5 border-b border-surface-600 shrink-0"><span class="text-hecate-400"></span> <span class="text-xs font-semibold text-surface-100">The Oracle</span> <span class="text-[10px] text-surface-400">Vision Architect</span> <div class="flex-1"></div> <!></div> <div class="flex-1 overflow-y-auto p-4 space-y-3"><!> <!> <!></div> <div class="border-t border-surface-600 p-3 shrink-0"><div class="flex gap-2"><textarea class="flex-1 bg-surface-700 border border-surface-600 rounded-lg px-3 py-2
						text-[11px] text-surface-100 placeholder-surface-400 resize-none
						focus:outline-none focus:border-hecate-500
						disabled:opacity-50 disabled:cursor-not-allowed"></textarea> <button>Send</button></div></div></div>  <div></div> <div class="flex flex-col overflow-hidden flex-1"><div class="flex items-center gap-2 px-4 py-2.5 border-b border-surface-600 shrink-0"><span class="text-surface-400 text-xs"></span> <span class="text-xs font-semibold text-surface-100">Vision Preview</span> <div class="flex-1"></div> <!></div> <div class="flex-1 overflow-y-auto p-4"><!></div> <div class="border-t border-surface-600 p-3 shrink-0"><!></div></div></div>`);
function ji(e, t) {
  kt(t, !0);
  const r = () => $e(gt, "$activeVenture", l), a = () => $e(Ga, "$aiModel", l), o = () => $e(pt, "$isLoading", l), [l, u] = Rt(), d = Ci();
  let v = /* @__PURE__ */ ne(Wt([])), x = /* @__PURE__ */ ne(""), _ = /* @__PURE__ */ ne(!1), g = /* @__PURE__ */ ne(""), E = /* @__PURE__ */ ne(void 0), P = /* @__PURE__ */ ne(!1), C = /* @__PURE__ */ ne(""), Q = /* @__PURE__ */ ne(""), S = /* @__PURE__ */ ne(null), I = /* @__PURE__ */ ne(null), z = /* @__PURE__ */ ne(65), we = /* @__PURE__ */ ne(!1), he = /* @__PURE__ */ ne(void 0);
  function Pe(b) {
    let $ = b.replace(/```markdown\n[\s\S]*?```/g, "◇ Vision updated ↗");
    return $ = $.replace(/```markdown\n[\s\S]*$/, "◇ Synthesizing vision... ↗"), $;
  }
  function ue(b) {
    const $ = Pe(b), O = [];
    let A = $;
    for (; A.length > 0; ) {
      const N = A.indexOf("<think>");
      if (N === -1) {
        A.trim() && O.push({ type: "text", content: A });
        break;
      }
      if (N > 0) {
        const M = A.slice(0, N);
        M.trim() && O.push({ type: "text", content: M });
      }
      const Y = A.indexOf("</think>", N);
      if (Y === -1) {
        const M = A.slice(N + 7);
        M.trim() && O.push({ type: "think", content: M });
        break;
      }
      const W = A.slice(N + 7, Y);
      W.trim() && O.push({ type: "think", content: W }), A = A.slice(Y + 8);
    }
    return O.length > 0 ? O : [{ type: "text", content: $ }];
  }
  function Le(b) {
    return b.includes("<think>") && !b.includes("</think>");
  }
  function ge(b) {
    const $ = Pe(b);
    return $.includes("</think>") ? ($.split("</think>").pop() || "").trim() : $.includes("<think>") ? "" : $;
  }
  function Ke(b) {
    const $ = Pe(b), O = $.indexOf("<think>");
    if (O === -1) return "";
    const A = $.indexOf("</think>");
    return A === -1 ? $.slice(O + 7) : $.slice(O + 7, A);
  }
  let xe = /* @__PURE__ */ Ce(() => {
    for (let b = s(v).length - 1; b >= 0; b--)
      if (s(v)[b].role === "assistant") {
        const $ = s(v)[b].content.match(/```markdown\n([\s\S]*?)```/);
        if ($) return $[1].trim();
      }
    if (s(g)) {
      const b = s(g).match(/```markdown\n([\s\S]*?)```/);
      if (b) return b[1].trim();
      const $ = s(g).match(/```markdown\n([\s\S]*)$/);
      if ($) return $[1].trim();
    }
    return null;
  }), Me = /* @__PURE__ */ Ce(() => s(xe) !== null && !s(xe).includes("(Not yet explored)") && !s(xe).includes("*(Hypothetical)*")), Ne = /* @__PURE__ */ Ce(() => {
    if (!s(xe)) return null;
    const b = s(xe).match(/<!--\s*brief:\s*(.*?)\s*-->/);
    return b ? b[1].trim() : null;
  }), Ye = /* @__PURE__ */ ne(null);
  Mt(() => {
    const b = r(), $ = b?.venture_id ?? null;
    if ($ !== s(Ye) && (h(v, [], !0), h(g, ""), h(_, !1), h(C, ""), h(Q, ""), h(Ye, $, !0)), b && !s(Q)) {
      const O = "~/ventures", A = b.name.toLowerCase().replace(/[^a-z0-9-]/g, "-");
      h(Q, `${O}/${A}`);
    }
  }), Mt(() => {
    const b = a();
    s(I) !== null && s(I) !== b && (s(S) && (s(S).cancel(), h(S, null)), h(v, [], !0), h(g, ""), h(_, !1)), h(I, b, !0);
  }), Mt(() => {
    const b = r();
    if (b && s(v).length === 0 && !s(_)) {
      const $ = `I just initiated a new venture called "${b.name}". ${b.brief ? `Here's what I know so far: ${b.brief}` : "I need help defining the vision for this venture."}`;
      fe($);
    }
  });
  function Je() {
    const b = [], $ = Ot(Vi);
    $ && b.push($);
    const O = Ot(Ml);
    if (b.push(Rl(O, { venture_name: r()?.name ?? "Unnamed" })), r()) {
      let A = `The venture is called "${r().name}"`;
      r().brief && (A += `. Initial brief: ${r().brief}`), b.push(A);
    }
    return b.join(`

---

`);
  }
  async function fe(b) {
    const $ = a();
    if (!$ || !b.trim() || s(_)) return;
    const O = { role: "user", content: b.trim() };
    h(v, [...s(v), O], !0), h(x, "");
    const A = [], N = Je();
    N && A.push({ role: "system", content: N }), A.push(...s(v)), h(_, !0), h(g, "");
    let Y = "";
    const W = d.stream.chat($, A);
    h(S, W, !0), W.onChunk((M) => {
      M.content && (Y += M.content, h(g, Y, !0));
    }).onDone(async (M) => {
      M.content && (Y += M.content);
      const q = {
        role: "assistant",
        content: Y || "(empty response)"
      };
      h(v, [...s(v), q], !0), h(g, ""), h(_, !1), h(S, null);
    }).onError((M) => {
      const q = { role: "assistant", content: `Error: ${M}` };
      h(v, [...s(v), q], !0), h(g, ""), h(_, !1), h(S, null);
    });
    try {
      await W.start();
    } catch (M) {
      const q = { role: "assistant", content: `Error: ${String(M)}` };
      h(v, [...s(v), q], !0), h(_, !1);
    }
  }
  async function y() {
    if (!r() || !s(xe) || !s(Q).trim()) return;
    h(P, !0), h(C, ""), await Ti(r().venture_id, s(Q).trim(), s(xe), r().name, s(Ne) ?? void 0) ? (await ir(), await As()) : h(C, Ot(nr) || "Failed to scaffold venture repo", !0), h(P, !1);
  }
  let ee = /* @__PURE__ */ ne(void 0);
  function je(b) {
    b.key === "Enter" && !b.shiftKey && (b.preventDefault(), fe(s(x)), s(ee) && (s(ee).style.height = "auto"));
  }
  function We(b) {
    const $ = b.target;
    $.style.height = "auto", $.style.height = Math.min($.scrollHeight, 150) + "px";
  }
  function Ae(b) {
    h(we, !0), b.preventDefault();
  }
  function ke(b) {
    if (!s(we) || !s(he)) return;
    const $ = s(he).getBoundingClientRect(), A = (b.clientX - $.left) / $.width * 100;
    h(z, Math.max(30, Math.min(80, A)), !0);
  }
  function me() {
    h(we, !1);
  }
  Mt(() => {
    s(v), s(g), Wa().then(() => {
      s(E) && (s(E).scrollTop = s(E).scrollHeight);
    });
  });
  function oe(b) {
    return b.replace(/<!--.*?-->/gs, "").replace(/^### (.*$)/gm, '<h3 class="text-xs font-semibold text-surface-100 mt-3 mb-1">$1</h3>').replace(/^## (.*$)/gm, '<h2 class="text-sm font-semibold text-hecate-300 mt-4 mb-1.5">$1</h2>').replace(/^# (.*$)/gm, '<h1 class="text-base font-bold text-surface-100 mb-2">$1</h1>').replace(/^(\d+)\.\s+(.*$)/gm, '<div class="text-[11px] text-surface-200 ml-3 mb-1"><span class="text-surface-400 mr-1.5">$1.</span>$2</div>').replace(/^\- (.*$)/gm, '<div class="text-[11px] text-surface-200 ml-3 mb-1"><span class="text-surface-400 mr-1.5">&bull;</span>$1</div>').replace(/\*\*(.*?)\*\*/g, '<strong class="text-surface-100">$1</strong>').replace(/\*(.*?)\*/g, '<em class="text-surface-300">$1</em>').replace(/\n\n/g, "<br/><br/>").trim();
  }
  var _e = gu();
  _e.__mousemove = ke, _e.__mouseup = me;
  var ce = i(_e), Ee = i(ce), L = i(Ee);
  L.textContent = "◇";
  var H = c(L, 8);
  ta(H, {
    get currentModel() {
      return a();
    },
    onSelect: (b) => Ka(b)
  }), n(Ee);
  var De = c(Ee, 2), He = i(De);
  ze(He, 17, () => s(v), it, (b, $) => {
    var O = br(), A = nt(O);
    {
      var N = (W) => {
        var M = Ql(), q = i(M), ve = i(q), Ie = i(ve, !0);
        n(ve), n(q), n(M), D(() => m(Ie, s($).content)), f(W, M);
      }, Y = (W) => {
        var M = eu(), q = i(M);
        ze(q, 21, () => ue(s($).content), it, (ve, Ie) => {
          var Fe = br(), Ue = nt(Fe);
          {
            var Be = (qe) => {
              var Qe = Xl(), at = i(Qe), ct = i(at);
              ct.textContent = "▶", xt(), n(at);
              var ut = c(at, 2), jt = i(ut, !0);
              n(ut), n(Qe), D((Jt) => m(jt, Jt), [() => s(Ie).content.trim()]), f(qe, Qe);
            }, Se = (qe) => {
              var Qe = Zl(), at = i(Qe, !0);
              n(Qe), D((ct) => m(at, ct), [() => s(Ie).content.trim()]), f(qe, Qe);
            };
            R(Ue, (qe) => {
              s(Ie).type === "think" ? qe(Be) : qe(Se, !1);
            });
          }
          f(ve, Fe);
        }), n(q), n(M), D(
          (ve) => Ve(q, 1, `max-w-[85%] rounded-lg px-3 py-2 text-[11px]
							bg-surface-700 text-surface-200 border border-surface-600
							${ve ?? ""}`),
          [
            () => s($).content.startsWith("Error:") ? "border-health-err/30 text-health-err" : ""
          ]
        ), f(W, M);
      };
      R(A, (W) => {
        s($).role === "user" ? W(N) : s($).role === "assistant" && W(Y, 1);
      });
    }
    f(b, O);
  });
  var te = c(He, 2);
  {
    var w = (b) => {
      var $ = iu(), O = i($), A = i(O);
      {
        var N = (q) => {
          var ve = ru(), Ie = c(nt(ve), 2);
          {
            var Fe = (Be) => {
              var Se = tu(), qe = i(Se), Qe = i(qe);
              Qe.textContent = "▶", xt(), n(qe);
              var at = c(qe, 2), ct = i(at, !0);
              xt(), n(at), n(Se), D((ut) => m(ct, ut), [
                () => Ke(s(g)).trim()
              ]), f(Be, Se);
            }, Ue = /* @__PURE__ */ Ce(() => Ke(s(g)).trim());
            R(Ie, (Be) => {
              s(Ue) && Be(Fe);
            });
          }
          f(q, ve);
        }, Y = /* @__PURE__ */ Ce(() => s(g) && Le(s(g))), W = (q) => {
          var ve = au(), Ie = nt(ve);
          {
            var Fe = (qe) => {
              var Qe = su(), at = i(Qe), ct = i(at);
              ct.textContent = "▶", xt(), n(at);
              var ut = c(at, 2), jt = i(ut, !0);
              n(ut), n(Qe), D((Jt) => m(jt, Jt), [
                () => Ke(s(g)).trim()
              ]), f(qe, Qe);
            }, Ue = /* @__PURE__ */ Ce(() => Ke(s(g)).trim());
            R(Ie, (qe) => {
              s(Ue) && qe(Fe);
            });
          }
          var Be = c(Ie, 2), Se = i(Be, !0);
          xt(), n(Be), D((qe) => m(Se, qe), [() => ge(s(g))]), f(q, ve);
        }, M = (q) => {
          var ve = nu();
          f(q, ve);
        };
        R(A, (q) => {
          s(Y) ? q(N) : s(g) ? q(W, 1) : q(M, !1);
        });
      }
      n(O), n($), f(b, $);
    };
    R(te, (b) => {
      s(_) && b(w);
    });
  }
  var k = c(te, 2);
  {
    var F = (b) => {
      var $ = ou(), O = i($), A = i(O);
      A.textContent = "◇", xt(2), n(O), n($), f(b, $);
    };
    R(k, (b) => {
      s(v).length === 0 && !s(_) && b(F);
    });
  }
  n(De), Qr(De, (b) => h(E, b), () => s(E));
  var re = c(De, 2), ye = i(re), Z = i(ye);
  Ys(Z), Z.__keydown = je, Z.__input = We, Vt(Z, "rows", 1), Qr(Z, (b) => h(ee, b), () => s(ee));
  var K = c(Z, 2);
  K.__click = () => fe(s(x)), n(ye), n(re), n(ce);
  var be = c(ce, 2);
  be.__mousedown = Ae;
  var T = c(be, 2), j = i(T), V = i(j);
  V.textContent = "📄";
  var le = c(V, 6);
  {
    var de = (b) => {
      var $ = cu();
      $.textContent = "● Complete", f(b, $);
    }, ie = (b) => {
      var $ = lu();
      $.textContent = "◐ Drafting...", f(b, $);
    }, G = (b) => {
      var $ = uu();
      $.textContent = "◐ Listening...", f(b, $);
    }, Re = (b) => {
      var $ = du();
      f(b, $);
    };
    R(le, (b) => {
      s(Me) ? b(de) : s(xe) ? b(ie, 1) : s(_) ? b(G, 2) : b(Re, !1);
    });
  }
  n(j);
  var se = c(j, 2), U = i(se);
  {
    var Oe = (b) => {
      var $ = fu(), O = nt($), A = i(O);
      nc(A, () => oe(s(xe))), n(O);
      var N = c(O, 2);
      {
        var Y = (W) => {
          var M = vu(), q = c(i(M), 2), ve = i(q, !0);
          n(q), n(M), D(() => m(ve, s(Ne))), f(W, M);
        };
        R(N, (W) => {
          s(Ne) && W(Y);
        });
      }
      f(b, $);
    }, Te = (b) => {
      var $ = pu(), O = i($), A = i(O);
      A.textContent = "📄", xt(2), n(O), n($), f(b, $);
    };
    R(U, (b) => {
      s(xe) ? b(Oe) : b(Te, !1);
    });
  }
  n(se);
  var ae = c(se, 2), B = i(ae);
  {
    var J = (b) => {
      var $ = xu(), O = i($), A = c(i(O), 2);
      dt(A), n(O);
      var N = c(O, 2);
      {
        var Y = (q) => {
          var ve = hu(), Ie = i(ve, !0);
          n(ve), D(() => m(Ie, s(C))), f(q, ve);
        };
        R(N, (q) => {
          s(C) && q(Y);
        });
      }
      var W = c(N, 2);
      W.__click = y;
      var M = i(W, !0);
      n(W), n($), D(
        (q, ve) => {
          W.disabled = q, Ve(W, 1, `w-full px-3 py-2 rounded-lg text-xs font-medium transition-colors
							${ve ?? ""}`), m(M, s(P) ? "Scaffolding..." : "Scaffold Venture");
        },
        [
          () => s(P) || o() || !s(Q).trim(),
          () => s(P) || o() || !s(Q).trim() ? "bg-surface-600 text-surface-400 cursor-not-allowed" : "bg-hecate-600 text-surface-50 hover:bg-hecate-500"
        ]
      ), ot(A, () => s(Q), (q) => h(Q, q)), f(b, $);
    }, X = (b) => {
      var $ = _u();
      $.textContent = "Vision is taking shape — keep exploring with the Oracle", f(b, $);
    }, pe = (b) => {
      var $ = bu();
      f(b, $);
    };
    R(B, (b) => {
      s(Me) ? b(J) : s(xe) ? b(X, 1) : b(pe, !1);
    });
  }
  n(ae), n(T), n(_e), Qr(_e, (b) => h(he, b), () => s(he)), D(
    (b, $) => {
      $r(ce, `width: ${s(z) ?? ""}%`), Vt(Z, "placeholder", s(_) ? "Oracle is thinking..." : "Describe your venture..."), Z.disabled = s(_) || !a(), K.disabled = b, Ve(K, 1, `px-3 rounded-lg text-[11px] transition-colors self-end
						${$ ?? ""}`), Ve(be, 1, `w-1 cursor-col-resize shrink-0 transition-colors
			${s(we) ? "bg-hecate-500" : "bg-surface-600 hover:bg-surface-500"}`);
    },
    [
      () => s(_) || !s(x).trim() || !a(),
      () => s(_) || !s(x).trim() || !a() ? "bg-surface-600 text-surface-400 cursor-not-allowed" : "bg-hecate-600 text-surface-50 hover:bg-hecate-500"
    ]
  ), mt("mouseleave", _e, me), ot(Z, () => s(x), (b) => h(x, b)), f(e, _e), Et(), u();
}
Nt([
  "mousemove",
  "mouseup",
  "keydown",
  "input",
  "click",
  "mousedown"
]);
Dt(ji, {}, [], [], { mode: "open" });
var mu = /* @__PURE__ */ p("<div></div>"), yu = /* @__PURE__ */ p("<!> <div><span> </span> <span> </span></div>", 1), wu = /* @__PURE__ */ p('<span class="text-[10px] text-surface-400"> </span>'), $u = /* @__PURE__ */ p("<span> </span>"), ku = /* @__PURE__ */ p(
  `<button title="Toggle event stream viewer">Stream</button> <button class="text-[9px] px-2 py-0.5 rounded ml-1
						text-surface-400 hover:text-health-warn hover:bg-surface-700 transition-colors" title="Shelve storm">Shelve</button>`,
  1
), Eu = /* @__PURE__ */ p(`<button class="flex items-center gap-1 text-[10px] px-2 py-1 rounded
										text-surface-400 hover:text-hecate-300
										hover:bg-hecate-600/10 transition-colors"><span> </span> <span> </span></button>`), Cu = /* @__PURE__ */ p(`<div class="flex items-center justify-center h-full"><div class="text-center max-w-lg mx-4"><div class="text-4xl mb-4 text-es-event"></div> <h2 class="text-lg font-semibold text-surface-100 mb-3">Big Picture Event Storming</h2> <p class="text-xs text-surface-400 leading-relaxed mb-6">Discover the domain landscape by storming events onto the board.
						Start with a 10-minute high octane phase where everyone
						(including AI agents) throws domain events as fast as possible. <br/><br/> Volume over quality. The thick stacks reveal what matters.
						Natural clusters become your divisions (bounded contexts).</p> <div class="flex flex-col items-center gap-4"><button class="px-6 py-3 rounded-lg text-sm font-medium
								bg-es-event text-surface-50 hover:bg-es-event/90
								transition-colors shadow-lg shadow-es-event/20"></button> <div class="flex gap-2"></div></div></div></div>`), Su = /* @__PURE__ */ p(`<div class="group relative px-3 py-2 rounded text-xs
									bg-es-event/15 border border-es-event/30 text-surface-100
									hover:border-es-event/50 transition-colors"><span> </span> <span class="text-[8px] text-es-event/60 ml-1.5"> </span> <button class="absolute -top-1 -right-1 w-4 h-4 rounded-full
										bg-surface-700 border border-surface-600
										text-surface-400 hover:text-health-err
										text-[8px] flex items-center justify-center
										opacity-0 group-hover:opacity-100 transition-opacity"></button></div>`), Au = /* @__PURE__ */ p('<div class="text-surface-500 text-xs italic">Start throwing events! Type below or ask an AI agent...</div>'), Du = /* @__PURE__ */ p(`<button class="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded
										text-surface-400 hover:text-hecate-300
										hover:bg-hecate-600/10 transition-colors"><span> </span> <span> </span></button>`), Pu = /* @__PURE__ */ p(`<div class="flex flex-col h-full"><div class="flex-1 overflow-y-auto p-4"><div class="flex flex-wrap gap-2 content-start"><!> <!></div></div> <div class="border-t border-surface-600 p-3 shrink-0"><div class="flex gap-2 mb-2"><input placeholder="Type a domain event (past tense)... e.g., order_placed" class="flex-1 bg-surface-700 border border-es-event/30 rounded px-3 py-2
								text-xs text-surface-100 placeholder-surface-400
								focus:outline-none focus:border-es-event"/> <button>Add</button></div> <div class="flex items-center justify-between"><div class="flex gap-1.5"></div> <button class="text-[10px] px-3 py-1 rounded
								bg-surface-700 text-surface-300
								hover:text-surface-100 hover:bg-surface-600 transition-colors"></button></div></div></div>`), Iu = /* @__PURE__ */ p('<span class="text-[8px] px-1 rounded bg-es-event/20 text-es-event"> </span>'), Tu = /* @__PURE__ */ p(`<div draggable="true" class="group flex items-center gap-1.5 px-2 py-1.5 rounded text-[11px]
											bg-es-event/15 border border-es-event/30 text-surface-100
											cursor-grab active:cursor-grabbing hover:border-es-event/50"><span class="flex-1 truncate"> </span> <!></div>`), Mu = /* @__PURE__ */ p(`<div class="group flex items-center gap-1 px-2 py-1 rounded text-[10px]
														bg-es-event/10 text-surface-200"><span class="flex-1 truncate"> </span> <button class="text-[8px] text-surface-500 hover:text-surface-300
															opacity-0 group-hover:opacity-100" title="Unstack"></button></div>`), Nu = /* @__PURE__ */ p('<div><div class="flex items-center gap-2 mb-2"><span class="text-[10px] font-bold text-es-event"> </span> <span class="text-[9px] text-surface-500 font-mono"> </span></div> <div class="space-y-1"></div></div>'), Ru = /* @__PURE__ */ p(`<div class="col-span-2 text-center py-8 text-surface-500 text-xs
											border border-dashed border-surface-600 rounded-lg">Drag stickies onto each other to create stacks.</div>`), Lu = /* @__PURE__ */ p(`<button class="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded
										text-surface-400 hover:text-hecate-300
										hover:bg-hecate-600/10 transition-colors"><span> </span> <span> </span></button>`), Ou = /* @__PURE__ */ p(`<div class="flex flex-col h-full"><div class="flex-1 overflow-y-auto p-4"><p class="text-xs text-surface-400 mb-3">Drag duplicate or related stickies onto each other to form stacks.
						Thick stacks reveal what matters most.</p> <div class="flex gap-4"><div class="w-64 shrink-0"><h3 class="text-[10px] font-semibold text-surface-300 mb-2 uppercase tracking-wider"> </h3> <div class="space-y-1 min-h-[200px] rounded-lg border border-dashed border-surface-600 p-2"></div></div> <div class="flex-1"><h3 class="text-[10px] font-semibold text-surface-300 mb-2 uppercase tracking-wider"> </h3> <div class="grid grid-cols-2 gap-3"><!> <!></div></div></div></div> <div class="border-t border-surface-600 p-3 shrink-0"><div class="flex items-center justify-between"><div class="flex gap-1.5"></div> <button class="text-[10px] px-3 py-1 rounded transition-colors
								bg-hecate-600/20 text-hecate-300 hover:bg-hecate-600/30"></button></div></div></div>`), Fu = /* @__PURE__ */ p('<button><span></span> <span class="flex-1"> </span> <span class="text-[8px] text-surface-400"> </span></button>'), Vu = /* @__PURE__ */ p('<div class="rounded-lg border border-surface-600 bg-surface-800 p-4"><div class="flex items-center gap-2 mb-3"><span class="text-xs font-semibold text-surface-200"> </span> <div class="flex-1"></div> <button></button></div> <div class="space-y-1.5"></div></div>'), ju = /* @__PURE__ */ p('<div class="space-y-4 mb-6"></div>'), Bu = /* @__PURE__ */ p(`<div class="text-center py-8 text-surface-500 text-xs
									border border-dashed border-surface-600 rounded-lg mb-6">No stacks to groom. All stickies are unique.</div>`), Hu = /* @__PURE__ */ p('<span class="text-[8px] text-es-event ml-1"> </span>'), Wu = /* @__PURE__ */ p(`<span class="text-[10px] px-2 py-1 rounded
												bg-es-event/10 text-surface-200"> <!></span>`), qu = /* @__PURE__ */ p('<div><h3 class="text-[10px] font-semibold text-surface-300 mb-2 uppercase tracking-wider"> </h3> <div class="flex flex-wrap gap-1.5"></div></div>'), zu = /* @__PURE__ */ p(`<div class="flex flex-col h-full"><div class="flex-1 overflow-y-auto p-4"><div class="max-w-2xl mx-auto"><p class="text-xs text-surface-400 mb-4">For each stack, select the best representative sticky. The winner
							gets the stack's weight (vote count). Other stickies are absorbed.</p> <!> <!></div></div> <div class="border-t border-surface-600 p-3 shrink-0"><div class="flex items-center justify-end"><button class="text-[10px] px-3 py-1 rounded transition-colors
								bg-hecate-600/20 text-hecate-300 hover:bg-hecate-600/30"></button></div></div></div>`), Uu = /* @__PURE__ */ p('<span class="text-[8px] px-1 rounded bg-es-event/20 text-es-event"> </span>'), Yu = /* @__PURE__ */ p(`<div draggable="true" class="group flex items-center gap-1.5 px-2 py-1.5 rounded text-[11px]
											bg-es-event/15 border border-es-event/30 text-surface-100
											cursor-grab active:cursor-grabbing hover:border-es-event/50"><span class="flex-1 truncate"> </span> <!></div>`), Gu = /* @__PURE__ */ p('<div class="text-[10px] text-surface-500 text-center py-4 italic">All events clustered</div>'), Ku = /* @__PURE__ */ p('<span class="text-[8px] text-es-event/60"> </span>'), Ju = /* @__PURE__ */ p(`<div draggable="true" class="group flex items-center gap-1 px-2 py-1 rounded text-[10px]
														bg-es-event/10 text-surface-200
														cursor-grab active:cursor-grabbing"><span class="flex-1 truncate"> </span> <!> <button class="text-[8px] text-surface-500 hover:text-surface-300
															opacity-0 group-hover:opacity-100" title="Remove from cluster"></button></div>`), Qu = /* @__PURE__ */ p('<div><div class="flex items-center gap-2 mb-2"><div class="w-3 h-3 rounded-sm shrink-0"></div> <span class="flex-1 text-xs font-semibold text-surface-100 truncate"> </span> <span class="text-[9px] text-surface-400"> </span> <button class="text-[9px] text-surface-500 hover:text-health-err transition-colors" title="Dissolve cluster"></button></div> <div class="space-y-1"></div></div>'), Xu = /* @__PURE__ */ p(`<div class="col-span-2 text-center py-8 text-surface-500 text-xs
											border border-dashed border-surface-600 rounded-lg">Drag stickies onto each other to create clusters.</div>`), Zu = /* @__PURE__ */ p(`<button class="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded
										text-surface-400 hover:text-hecate-300
										hover:bg-hecate-600/10 transition-colors"><span> </span> <span> </span></button>`), ed = /* @__PURE__ */ p(`<div class="flex flex-col h-full"><div class="flex-1 overflow-y-auto p-4"><p class="text-xs text-surface-400 mb-3">Drag related stickies onto each other to form clusters.
						Clusters become candidate divisions (bounded contexts).</p> <div class="flex gap-4"><div class="w-64 shrink-0"><h3 class="text-[10px] font-semibold text-surface-300 mb-2 uppercase tracking-wider"> </h3> <div class="space-y-1 min-h-[200px] rounded-lg border border-dashed border-surface-600 p-2"><!> <!></div></div> <div class="flex-1"><h3 class="text-[10px] font-semibold text-surface-300 mb-2 uppercase tracking-wider"> </h3> <div class="grid grid-cols-2 gap-3"><!> <!></div></div></div></div> <div class="border-t border-surface-600 p-3 shrink-0"><div class="flex items-center justify-between"><div class="flex gap-1.5"></div> <button></button></div></div></div>`), td = /* @__PURE__ */ p(`<input class="flex-1 bg-surface-700 border border-surface-500 rounded px-3 py-1.5
													text-sm text-surface-100 focus:outline-none focus:border-hecate-500" placeholder="division_name (snake_case)"/>`), rd = /* @__PURE__ */ p('<button title="Click to name"> </button>'), sd = /* @__PURE__ */ p('<span class="text-es-event/50"> </span>'), ad = /* @__PURE__ */ p(`<span class="text-[9px] px-1.5 py-0.5 rounded
													bg-es-event/10 text-es-event/80"> <!></span>`), nd = /* @__PURE__ */ p('<div class="rounded-lg border bg-surface-800 p-4"><div class="flex items-center gap-3 mb-2"><div class="w-4 h-4 rounded"></div> <!> <span class="text-[10px] text-surface-400"> </span></div> <div class="flex flex-wrap gap-1.5 ml-7"></div></div>'), id = /* @__PURE__ */ p(`<div class="flex flex-col h-full"><div class="flex-1 overflow-y-auto p-4"><div class="max-w-2xl mx-auto"><p class="text-xs text-surface-400 mb-4">Name each cluster as a bounded context (division). These become
							the divisions in your venture. Use snake_case naming.</p> <div class="space-y-3"></div></div></div> <div class="border-t border-surface-600 p-3 shrink-0"><div class="flex items-center justify-end"><button class="text-[10px] px-3 py-1 rounded
								bg-hecate-600/20 text-hecate-300 hover:bg-hecate-600/30 transition-colors"></button></div></div></div>`), od = /* @__PURE__ */ p('<div class="px-4 py-2 rounded-lg border-2 text-xs font-semibold text-surface-100"> <span class="text-[9px] text-surface-400 ml-1"> </span></div>'), cd = /* @__PURE__ */ p(`<div class="flex items-center gap-2 px-3 py-1.5 rounded
												bg-surface-800 border border-surface-600 text-xs"><span class="px-1.5 py-0.5 rounded text-[10px] font-medium"> </span> <span class="text-surface-400"></span> <span class="text-es-event font-mono text-[10px]"> </span> <span class="text-surface-400"></span> <span class="px-1.5 py-0.5 rounded text-[10px] font-medium"> </span> <div class="flex-1"></div> <button class="text-surface-500 hover:text-health-err text-[9px] transition-colors"></button></div>`), ld = /* @__PURE__ */ p('<div class="space-y-1.5 mb-4"></div>'), ud = /* @__PURE__ */ p("<option> </option>"), dd = /* @__PURE__ */ p("<option> </option>"), vd = /* @__PURE__ */ p(`<div class="rounded-lg border border-surface-600 bg-surface-800 p-4"><h4 class="text-[10px] font-semibold text-surface-300 uppercase tracking-wider mb-3">Add Integration Fact</h4> <div class="flex items-end gap-2"><div class="flex-1"><label class="text-[9px] text-surface-400 block mb-1">From (publishes)</label> <select class="w-full bg-surface-700 border border-surface-600 rounded px-2 py-1.5
												text-[10px] text-surface-100 focus:outline-none focus:border-hecate-500"><option>Select...</option><!></select></div> <div class="flex-1"><label class="text-[9px] text-surface-400 block mb-1">Fact name</label> <input placeholder="e.g., order_confirmed" class="w-full bg-surface-700 border border-surface-600 rounded px-2 py-1.5
												text-[10px] text-surface-100 placeholder-surface-400
												focus:outline-none focus:border-hecate-500"/></div> <div class="flex-1"><label class="text-[9px] text-surface-400 block mb-1">To (consumes)</label> <select class="w-full bg-surface-700 border border-surface-600 rounded px-2 py-1.5
												text-[10px] text-surface-100 focus:outline-none focus:border-hecate-500"><option>Select...</option><!></select></div> <button>Add</button></div></div>`), fd = /* @__PURE__ */ p(`<button class="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded
										text-surface-400 hover:text-hecate-300
										hover:bg-hecate-600/10 transition-colors"><span> </span> <span> </span></button>`), pd = /* @__PURE__ */ p(`<div class="flex flex-col h-full"><div class="flex-1 overflow-y-auto p-4"><div class="max-w-3xl mx-auto"><p class="text-xs text-surface-400 mb-4">Map how divisions communicate. Each arrow represents an
							integration fact that flows from one context to another.
							This is your Context Map.</p> <div class="mb-6"><div class="flex flex-wrap gap-3 justify-center mb-4"></div> <!></div> <!></div></div> <div class="border-t border-surface-600 p-3 shrink-0"><div class="flex items-center justify-between"><div class="flex gap-2"></div> <button> </button></div></div></div>`), hd = /* @__PURE__ */ p(`<div class="flex items-center justify-center h-full"><div class="text-center max-w-md mx-4"><div class="text-4xl mb-4 text-health-ok"></div> <h2 class="text-lg font-semibold text-surface-100 mb-2">Context Map Complete</h2> <p class="text-xs text-surface-400 mb-4"> </p> <p class="text-xs text-surface-400 mb-6">Select a division from the sidebar to begin Design-Level
						Event Storming in its DnA phase.</p> <button class="text-[10px] px-3 py-1 rounded
							text-surface-400 hover:text-surface-200 hover:bg-surface-700 transition-colors">Reset Board</button></div></div>`), xd = /* @__PURE__ */ p(`<div class="flex items-center justify-center h-full"><div class="text-center max-w-md mx-4"><div class="text-4xl mb-4 text-health-warn"></div> <h2 class="text-lg font-semibold text-surface-100 mb-2">Storm Shelved</h2> <p class="text-xs text-surface-400 mb-6">This storm session has been shelved. You can resume it at any time
						to continue where you left off.</p> <button class="px-6 py-3 rounded-lg text-sm font-medium
							bg-hecate-600 text-surface-50 hover:bg-hecate-500
							transition-colors">Resume Storm</button></div></div>`), _d = /* @__PURE__ */ p('<div class="flex flex-col h-full"><div class="border-b border-surface-600 bg-surface-800/50 px-4 py-2 shrink-0"><div class="flex items-center gap-1"><span class="text-xs text-surface-400 mr-2">Big Picture</span> <!> <div class="flex-1"></div> <!> <!> <!></div></div> <div class="flex-1 overflow-y-auto"><!></div></div>');
function Ea(e, t) {
  kt(t, !0);
  const r = () => $e(gt, "$activeVenture", C), a = () => $e(os, "$bigPictureEvents", C), o = () => $e(ea, "$eventClusters", C), l = () => $e(Qa, "$factArrows", C), u = () => $e(Hr, "$bigPicturePhase", C), d = () => $e(Rc, "$bigPictureEventCount", C), v = () => $e(Bs, "$highOctaneRemaining", C), x = () => $e(wa, "$showEventStream", C), _ = () => $e(Il, "$bigPictureAgents", C), g = () => $e(Nc, "$stickyStacks", C), E = () => $e(Mc, "$unclusteredEvents", C), P = () => $e($a, "$isLoading", C), [C, Q] = Rt();
  let S = /* @__PURE__ */ ne(""), I = /* @__PURE__ */ ne(null), z = /* @__PURE__ */ ne(""), we = /* @__PURE__ */ ne(null), he = /* @__PURE__ */ ne(null), Pe = /* @__PURE__ */ ne(""), ue = /* @__PURE__ */ ne(null), Le = /* @__PURE__ */ ne(Wt({}));
  function ge() {
    return r()?.venture_id ?? "";
  }
  function Ke(T) {
    const j = Math.floor(T / 60), V = T % 60;
    return `${j}:${V.toString().padStart(2, "0")}`;
  }
  async function xe(T) {
    T.key === "Enter" && !T.shiftKey && s(S).trim() && (T.preventDefault(), await ka(ge(), s(S)), h(S, ""));
  }
  async function Me(T, j) {
    T.key === "Enter" && s(z).trim() ? (await Hc(ge(), j, s(z).trim()), h(I, null), h(z, "")) : T.key === "Escape" && h(I, null);
  }
  function Ne(T) {
    h(I, T.cluster_id, !0), h(z, T.name ?? "", !0);
  }
  async function Ye() {
    s(we) && s(he) && s(we) !== s(he) && s(Pe).trim() && (await Wc(ge(), s(we), s(he), s(Pe).trim()), h(Pe, ""));
  }
  async function Je() {
    await Gc(ge());
  }
  function fe(T) {
    return a().filter((j) => j.cluster_id === T);
  }
  let y = /* @__PURE__ */ Ce(() => a().filter((T) => !T.stack_id));
  function ee(T) {
    const j = r(), V = a(), le = o(), de = l();
    let ie = T + `

---

`;
    if (j && (ie += `Venture: "${j.name}"`, j.brief && (ie += ` — ${j.brief}`), ie += `

`), V.length > 0 && (ie += `Events on the board:
`, ie += V.map((G) => `- ${G.text}${G.weight > 1 ? ` (x${G.weight})` : ""}`).join(`
`), ie += `

`), le.length > 0) {
      ie += `Current clusters (candidate divisions):
`;
      for (const G of le) {
        const Re = V.filter((se) => se.cluster_id === G.cluster_id);
        ie += `- ${G.name ?? "(unnamed)"}: ${Re.map((se) => se.text).join(", ") || "(empty)"}
`;
      }
      ie += `
`;
    }
    if (de.length > 0) {
      ie += `Integration fact arrows:
`;
      for (const G of de) {
        const Re = le.find((U) => U.cluster_id === G.from_cluster)?.name ?? "?", se = le.find((U) => U.cluster_id === G.to_cluster)?.name ?? "?";
        ie += `- ${Re} → ${G.fact_name} → ${se}
`;
      }
    }
    return ie;
  }
  const je = [
    { phase: "storm", label: "Storm", icon: "⚡" },
    { phase: "stack", label: "Stack", icon: "≡" },
    { phase: "groom", label: "Groom", icon: "✂" },
    { phase: "cluster", label: "Cluster", icon: "⭐" },
    { phase: "name", label: "Name", icon: "⬡" },
    { phase: "map", label: "Map", icon: "→" },
    { phase: "promoted", label: "Done", icon: "✓" }
  ];
  Mt(() => {
    const T = r();
    T && Pt(T.venture_id);
  });
  var We = _d(), Ae = i(We), ke = i(Ae), me = c(i(ke), 2);
  ze(me, 17, () => je, it, (T, j, V) => {
    const le = /* @__PURE__ */ Ce(() => u() === s(j).phase), de = /* @__PURE__ */ Ce(() => je.findIndex((B) => B.phase === u()) > V);
    var ie = yu(), G = nt(ie);
    {
      var Re = (B) => {
        var J = mu();
        D(() => Ve(J, 1, `w-6 h-px ${s(de) ? "bg-hecate-400/60" : "bg-surface-600"}`)), f(B, J);
      };
      R(G, (B) => {
        V > 0 && B(Re);
      });
    }
    var se = c(G, 2), U = i(se), Oe = i(U, !0);
    n(U);
    var Te = c(U, 2), ae = i(Te, !0);
    n(Te), n(se), D(() => {
      Ve(se, 1, `flex items-center gap-1 px-2 py-1 rounded text-[10px]
						${s(le) ? "bg-surface-700 border border-hecate-500/40 text-hecate-300" : s(de) ? "text-hecate-400/60" : "text-surface-500"}`), m(Oe, s(j).icon), m(ae, s(j).label);
    }), f(T, ie);
  });
  var oe = c(me, 4);
  {
    var _e = (T) => {
      var j = wu(), V = i(j);
      n(j), D(() => m(V, `${d() ?? ""} events`)), f(T, j);
    };
    R(oe, (T) => {
      u() !== "ready" && u() !== "promoted" && u() !== "shelved" && T(_e);
    });
  }
  var ce = c(oe, 2);
  {
    var Ee = (T) => {
      var j = $u(), V = i(j, !0);
      n(j), D(
        (le) => {
          Ve(j, 1, `text-sm font-bold tabular-nums ml-2
						${v() <= 60 ? "text-health-err animate-pulse" : v() <= 180 ? "text-health-warn" : "text-es-event"}`), m(V, le);
        },
        [() => Ke(v())]
      ), f(T, j);
    };
    R(ce, (T) => {
      u() === "storm" && T(Ee);
    });
  }
  var L = c(ce, 2);
  {
    var H = (T) => {
      var j = ku(), V = nt(j);
      V.__click = () => wa.update((de) => !de);
      var le = c(V, 2);
      le.__click = () => Uc(ge()), D(() => Ve(V, 1, `text-[9px] px-2 py-0.5 rounded ml-1
						${x() ? "text-hecate-300 bg-hecate-600/20" : "text-surface-400 hover:text-surface-200 hover:bg-surface-700"} transition-colors`)), f(T, j);
    };
    R(L, (T) => {
      u() !== "ready" && u() !== "promoted" && u() !== "shelved" && T(H);
    });
  }
  n(ke), n(Ae);
  var De = c(Ae, 2), He = i(De);
  {
    var te = (T) => {
      var j = Cu(), V = i(j), le = i(V);
      le.textContent = "⚡";
      var de = c(le, 6), ie = i(de);
      ie.__click = () => Lc(ge()), ie.textContent = "⚡ Start High Octane (10 min)";
      var G = c(ie, 2);
      ze(G, 5, _, it, (Re, se) => {
        var U = Eu();
        U.__click = () => vr(ee(s(se).prompt), s(se).id);
        var Oe = i(U), Te = i(Oe, !0);
        n(Oe);
        var ae = c(Oe, 2), B = i(ae, !0);
        n(ae), n(U), D(() => {
          Vt(U, "title", s(se).description), m(Te, s(se).icon), m(B, s(se).name);
        }), f(Re, U);
      }), n(G), n(de), n(V), n(j), f(T, j);
    }, w = (T) => {
      var j = Pu(), V = i(j), le = i(V), de = i(le);
      ze(de, 1, a, (J) => J.sticky_id, (J, X) => {
        var pe = Su(), b = i(pe), $ = i(b, !0);
        n(b);
        var O = c(b, 2), A = i(O, !0);
        n(O);
        var N = c(O, 2);
        N.__click = () => Oc(ge(), s(X).sticky_id), N.textContent = "✕", n(pe), D(() => {
          m($, s(X).text), m(A, s(X).author === "user" ? "" : s(X).author);
        }), f(J, pe);
      });
      var ie = c(de, 2);
      {
        var G = (J) => {
          var X = Au();
          f(J, X);
        };
        R(ie, (J) => {
          a().length === 0 && J(G);
        });
      }
      n(le), n(V);
      var Re = c(V, 2), se = i(Re), U = i(se);
      dt(U), U.__keydown = xe;
      var Oe = c(U, 2);
      Oe.__click = async () => {
        s(S).trim() && (await ka(ge(), s(S)), h(S, ""));
      }, n(se);
      var Te = c(se, 2), ae = i(Te);
      ze(ae, 5, _, it, (J, X) => {
        var pe = Du();
        pe.__click = () => vr(ee(s(X).prompt), s(X).id);
        var b = i(pe), $ = i(b, !0);
        n(b);
        var O = c(b, 2), A = i(O, !0);
        n(O), n(pe), D(() => {
          Vt(pe, "title", s(X).description), m($, s(X).icon), m(A, s(X).role);
        }), f(J, pe);
      }), n(ae);
      var B = c(ae, 2);
      B.__click = () => us(ge(), "stack"), B.textContent = "End Storm → Stack", n(Te), n(Re), n(j), D(
        (J, X) => {
          Oe.disabled = J, Ve(Oe, 1, `px-3 py-2 rounded text-xs transition-colors
								${X ?? ""}`);
        },
        [
          () => !s(S).trim(),
          () => s(S).trim() ? "bg-es-event text-surface-50 hover:bg-es-event/80" : "bg-surface-600 text-surface-400 cursor-not-allowed"
        ]
      ), ot(U, () => s(S), (J) => h(S, J)), f(T, j);
    }, k = (T) => {
      var j = Ou(), V = i(j), le = c(i(V), 2), de = i(le), ie = i(de), G = i(ie);
      n(ie);
      var Re = c(ie, 2);
      ze(Re, 21, () => s(y), (O) => O.sticky_id, (O, A) => {
        var N = Tu(), Y = i(N), W = i(Y, !0);
        n(Y);
        var M = c(Y, 2);
        {
          var q = (ve) => {
            var Ie = Iu(), Fe = i(Ie);
            n(Ie), D(() => m(Fe, `x${s(A).weight ?? ""}`)), f(ve, Ie);
          };
          R(M, (ve) => {
            s(A).weight > 1 && ve(q);
          });
        }
        n(N), D(() => m(W, s(A).text)), mt("dragstart", N, () => h(ue, s(A).sticky_id, !0)), mt("dragend", N, () => h(ue, null)), mt("dragover", N, (ve) => ve.preventDefault()), mt("drop", N, () => {
          s(ue) && s(ue) !== s(A).sticky_id && (_n(ge(), s(ue), s(A).sticky_id), h(ue, null));
        }), f(O, N);
      }), n(Re), n(de);
      var se = c(de, 2), U = i(se), Oe = i(U);
      n(U);
      var Te = c(U, 2), ae = i(Te);
      ze(ae, 1, () => [...g().entries()], ([O, A]) => O, (O, A) => {
        var N = /* @__PURE__ */ Ce(() => oa(s(A), 2));
        let Y = () => s(N)[0], W = () => s(N)[1];
        var M = Nu(), q = i(M), ve = i(q), Ie = i(ve);
        n(ve);
        var Fe = c(ve, 2), Ue = i(Fe, !0);
        n(Fe), n(q);
        var Be = c(q, 2);
        ze(Be, 21, W, (Se) => Se.sticky_id, (Se, qe) => {
          var Qe = Mu(), at = i(Qe), ct = i(at, !0);
          n(at);
          var ut = c(at, 2);
          ut.__click = () => Fc(ge(), s(qe).sticky_id), ut.textContent = "↩", n(Qe), D(() => m(ct, s(qe).text)), f(Se, Qe);
        }), n(Be), n(M), D(
          (Se) => {
            Ve(M, 1, `rounded-lg border-2 p-3 min-h-[80px] transition-colors
											${s(ue) ? "border-dashed border-hecate-500/50 bg-hecate-600/5" : "border-surface-600 bg-surface-800"}`), m(Ie, `${W().length ?? ""}x`), m(Ue, Se);
          },
          [() => Y().slice(0, 8)]
        ), mt("dragover", M, (Se) => Se.preventDefault()), mt("drop", M, () => {
          s(ue) && W().length > 0 && (_n(ge(), s(ue), W()[0].sticky_id), h(ue, null));
        }), f(O, M);
      });
      var B = c(ae, 2);
      {
        var J = (O) => {
          var A = Ru();
          f(O, A);
        };
        R(B, (O) => {
          g().size === 0 && O(J);
        });
      }
      n(Te), n(se), n(le), n(V);
      var X = c(V, 2), pe = i(X), b = i(pe);
      ze(b, 5, () => _().slice(0, 2), it, (O, A) => {
        var N = Lu();
        N.__click = () => vr(ee(s(A).prompt), s(A).id);
        var Y = i(N), W = i(Y, !0);
        n(Y);
        var M = c(Y, 2), q = i(M);
        n(M), n(N), D(() => {
          m(W, s(A).icon), m(q, `Ask ${s(A).name ?? ""}`);
        }), f(O, N);
      }), n(b);
      var $ = c(b, 2);
      $.__click = () => us(ge(), "groom"), $.textContent = "Groom Stacks →", n(pe), n(X), n(j), D(() => {
        m(G, `Stickies (${s(y).length ?? ""})`), m(Oe, `Stacks (${g().size ?? ""})`);
      }), f(T, j);
    }, F = (T) => {
      var j = zu(), V = i(j), le = i(V), de = c(i(le), 2);
      {
        var ie = (ae) => {
          var B = ju();
          ze(B, 5, () => [...g().entries()], ([J, X]) => J, (J, X) => {
            var pe = /* @__PURE__ */ Ce(() => oa(s(X), 2));
            let b = () => s(pe)[0], $ = () => s(pe)[1];
            const O = /* @__PURE__ */ Ce(() => s(Le)[b()]);
            var A = Vu(), N = i(A), Y = i(N), W = i(Y);
            n(Y);
            var M = c(Y, 4);
            M.__click = () => {
              s(O) && Vc(ge(), b(), s(O));
            }, M.textContent = "Groom ✂", n(N);
            var q = c(N, 2);
            ze(q, 21, $, (ve) => ve.sticky_id, (ve, Ie) => {
              var Fe = Fu();
              Fe.__click = () => h(Le, { ...s(Le), [b()]: s(Ie).sticky_id }, !0);
              var Ue = i(Fe), Be = c(Ue, 2), Se = i(Be, !0);
              n(Be);
              var qe = c(Be, 2), Qe = i(qe, !0);
              n(qe), n(Fe), D(() => {
                Ve(Fe, 1, `w-full text-left flex items-center gap-2 px-3 py-2 rounded text-[11px]
														transition-colors
														${s(O) === s(Ie).sticky_id ? "bg-hecate-600/20 border border-hecate-500/40 text-hecate-200" : "bg-surface-700/50 border border-transparent text-surface-200 hover:border-surface-500"}`), Ve(Ue, 1, `w-3 h-3 rounded-full border-2 shrink-0
															${s(O) === s(Ie).sticky_id ? "border-hecate-400 bg-hecate-400" : "border-surface-500"}`), m(Se, s(Ie).text), m(Qe, s(Ie).author === "user" ? "" : s(Ie).author);
              }), f(ve, Fe);
            }), n(q), n(A), D(() => {
              m(W, `Stack (${$().length ?? ""} stickies)`), M.disabled = !s(O), Ve(M, 1, `text-[10px] px-2 py-1 rounded transition-colors
													${s(O) ? "bg-hecate-600/20 text-hecate-300 hover:bg-hecate-600/30" : "bg-surface-700 text-surface-500 cursor-not-allowed"}`);
            }), f(J, A);
          }), n(B), f(ae, B);
        }, G = (ae) => {
          var B = Bu();
          f(ae, B);
        };
        R(de, (ae) => {
          g().size > 0 ? ae(ie) : ae(G, !1);
        });
      }
      var Re = c(de, 2);
      {
        var se = (ae) => {
          var B = qu(), J = i(B), X = i(J);
          n(J);
          var pe = c(J, 2);
          ze(pe, 21, () => s(y), (b) => b.sticky_id, (b, $) => {
            var O = Wu(), A = i(O), N = c(A);
            {
              var Y = (W) => {
                var M = Hu(), q = i(M);
                n(M), D(() => m(q, `x${s($).weight ?? ""}`)), f(W, M);
              };
              R(N, (W) => {
                s($).weight > 1 && W(Y);
              });
            }
            n(O), D(() => m(A, `${s($).text ?? ""} `)), f(b, O);
          }), n(pe), n(B), D(() => m(X, `Standalone Stickies (${s(y).length ?? ""})`)), f(ae, B);
        };
        R(Re, (ae) => {
          s(y).length > 0 && ae(se);
        });
      }
      n(le), n(V);
      var U = c(V, 2), Oe = i(U), Te = i(Oe);
      Te.__click = () => us(ge(), "cluster"), Te.textContent = "Cluster Events →", n(Oe), n(U), n(j), f(T, j);
    }, re = (T) => {
      var j = ed(), V = i(j), le = c(i(V), 2), de = i(le), ie = i(de), G = i(ie);
      n(ie);
      var Re = c(ie, 2), se = i(Re);
      ze(se, 1, E, (Y) => Y.sticky_id, (Y, W) => {
        var M = Yu(), q = i(M), ve = i(q, !0);
        n(q);
        var Ie = c(q, 2);
        {
          var Fe = (Ue) => {
            var Be = Uu(), Se = i(Be);
            n(Be), D(() => m(Se, `x${s(W).weight ?? ""}`)), f(Ue, Be);
          };
          R(Ie, (Ue) => {
            s(W).weight > 1 && Ue(Fe);
          });
        }
        n(M), D(() => m(ve, s(W).text)), mt("dragstart", M, () => h(ue, s(W).sticky_id, !0)), mt("dragend", M, () => h(ue, null)), mt("dragover", M, (Ue) => Ue.preventDefault()), mt("drop", M, () => {
          s(ue) && s(ue) !== s(W).sticky_id && (bn(ge(), s(ue), s(W).sticky_id), h(ue, null));
        }), f(Y, M);
      });
      var U = c(se, 2);
      {
        var Oe = (Y) => {
          var W = Gu();
          f(Y, W);
        };
        R(U, (Y) => {
          E().length === 0 && Y(Oe);
        });
      }
      n(Re), n(de);
      var Te = c(de, 2), ae = i(Te), B = i(ae);
      n(ae);
      var J = c(ae, 2), X = i(J);
      ze(X, 1, o, (Y) => Y.cluster_id, (Y, W) => {
        const M = /* @__PURE__ */ Ce(() => fe(s(W).cluster_id));
        var q = Qu(), ve = i(q), Ie = i(ve), Fe = c(Ie, 2), Ue = i(Fe, !0);
        n(Fe);
        var Be = c(Fe, 2), Se = i(Be, !0);
        n(Be);
        var qe = c(Be, 2);
        qe.__click = () => Bc(ge(), s(W).cluster_id), qe.textContent = "✕", n(ve);
        var Qe = c(ve, 2);
        ze(Qe, 21, () => s(M), (at) => at.sticky_id, (at, ct) => {
          var ut = Ju(), jt = i(ut), Jt = i(jt, !0);
          n(jt);
          var yr = c(jt, 2);
          {
            var cs = (ra) => {
              var sa = Ku(), Yi = i(sa);
              n(sa), D(() => m(Yi, `x${s(ct).weight ?? ""}`)), f(ra, sa);
            };
            R(yr, (ra) => {
              s(ct).weight > 1 && ra(cs);
            });
          }
          var Ps = c(yr, 2);
          Ps.__click = () => jc(ge(), s(ct).sticky_id), Ps.textContent = "↩", n(ut), D(() => m(Jt, s(ct).text)), mt("dragstart", ut, () => h(ue, s(ct).sticky_id, !0)), mt("dragend", ut, () => h(ue, null)), f(at, ut);
        }), n(Qe), n(q), D(() => {
          Ve(q, 1, `rounded-lg border-2 p-3 min-h-[120px] transition-colors
											${s(ue) ? "border-dashed border-hecate-500/50 bg-hecate-600/5" : "border-surface-600 bg-surface-800"}`), $r(q, `border-color: ${s(ue) ? "" : s(W).color + "40"}`), $r(Ie, `background-color: ${s(W).color ?? ""}`), m(Ue, s(W).name ?? "Unnamed"), m(Se, s(M).length);
        }), mt("dragover", q, (at) => at.preventDefault()), mt("drop", q, () => {
          s(ue) && s(M).length > 0 && (bn(ge(), s(ue), s(M)[0].sticky_id), h(ue, null));
        }), f(Y, q);
      });
      var pe = c(X, 2);
      {
        var b = (Y) => {
          var W = Xu();
          f(Y, W);
        };
        R(pe, (Y) => {
          o().length === 0 && Y(b);
        });
      }
      n(J), n(Te), n(le), n(V);
      var $ = c(V, 2), O = i($), A = i(O);
      ze(A, 5, () => _().slice(0, 2), it, (Y, W) => {
        var M = Zu();
        M.__click = () => vr(ee(s(W).prompt), s(W).id);
        var q = i(M), ve = i(q, !0);
        n(q);
        var Ie = c(q, 2), Fe = i(Ie);
        n(Ie), n(M), D(() => {
          m(ve, s(W).icon), m(Fe, `Ask ${s(W).name ?? ""}`);
        }), f(Y, M);
      }), n(A);
      var N = c(A, 2);
      N.__click = () => us(ge(), "name"), N.textContent = "Name Divisions →", n(O), n($), n(j), D(() => {
        m(G, `Unclustered (${E().length ?? ""})`), m(B, `Clusters (${o().length ?? ""})`), N.disabled = o().length === 0, Ve(N, 1, `text-[10px] px-3 py-1 rounded transition-colors
								${o().length === 0 ? "bg-surface-700 text-surface-500 cursor-not-allowed" : "bg-hecate-600/20 text-hecate-300 hover:bg-hecate-600/30"}`);
      }), f(T, j);
    }, ye = (T) => {
      var j = id(), V = i(j), le = i(V), de = c(i(le), 2);
      ze(de, 5, o, (se) => se.cluster_id, (se, U) => {
        const Oe = /* @__PURE__ */ Ce(() => fe(s(U).cluster_id));
        var Te = nd(), ae = i(Te), B = i(ae), J = c(B, 2);
        {
          var X = (A) => {
            var N = td();
            dt(N), N.__keydown = (Y) => Me(Y, s(U).cluster_id), mt("blur", N, () => h(I, null)), ot(N, () => s(z), (Y) => h(z, Y)), f(A, N);
          }, pe = (A) => {
            var N = rd();
            N.__click = () => Ne(s(U));
            var Y = i(N, !0);
            n(N), D(() => {
              Ve(N, 1, `flex-1 text-left text-sm font-semibold transition-colors
													${s(U).name ? "text-surface-100 hover:text-hecate-300" : "text-surface-400 italic hover:text-hecate-300"}`), m(Y, s(U).name ?? "Click to name...");
            }), f(A, N);
          };
          R(J, (A) => {
            s(I) === s(U).cluster_id ? A(X) : A(pe, !1);
          });
        }
        var b = c(J, 2), $ = i(b);
        n(b), n(ae);
        var O = c(ae, 2);
        ze(O, 21, () => s(Oe), (A) => A.sticky_id, (A, N) => {
          var Y = ad(), W = i(Y), M = c(W);
          {
            var q = (ve) => {
              var Ie = sd(), Fe = i(Ie);
              n(Ie), D(() => m(Fe, `x${s(N).weight ?? ""}`)), f(ve, Ie);
            };
            R(M, (ve) => {
              s(N).weight > 1 && ve(q);
            });
          }
          n(Y), D(() => m(W, `${s(N).text ?? ""} `)), f(A, Y);
        }), n(O), n(Te), D(() => {
          $r(Te, `border-color: ${s(U).color ?? ""}40`), $r(B, `background-color: ${s(U).color ?? ""}`), m($, `${s(Oe).length ?? ""} events`);
        }), f(se, Te);
      }), n(de), n(le), n(V);
      var ie = c(V, 2), G = i(ie), Re = i(G);
      Re.__click = () => us(ge(), "map"), Re.textContent = "Map Integration Facts →", n(G), n(ie), n(j), f(T, j);
    }, Z = (T) => {
      var j = pd(), V = i(j), le = i(V), de = c(i(le), 2), ie = i(de);
      ze(ie, 5, o, (X) => X.cluster_id, (X, pe) => {
        var b = od(), $ = i(b), O = c($), A = i(O);
        n(O), n(b), D(
          (N) => {
            $r(b, `border-color: ${s(pe).color ?? ""}; background-color: ${s(pe).color ?? ""}15`), m($, `${s(pe).name ?? "Unnamed" ?? ""} `), m(A, `(${N ?? ""})`);
          },
          [() => fe(s(pe).cluster_id).length]
        ), f(X, b);
      }), n(ie);
      var G = c(ie, 2);
      {
        var Re = (X) => {
          var pe = ld();
          ze(pe, 5, l, (b) => b.arrow_id, (b, $) => {
            const O = /* @__PURE__ */ Ce(() => o().find((Se) => Se.cluster_id === s($).from_cluster)), A = /* @__PURE__ */ Ce(() => o().find((Se) => Se.cluster_id === s($).to_cluster));
            var N = cd(), Y = i(N), W = i(Y, !0);
            n(Y);
            var M = c(Y, 2);
            M.textContent = "→";
            var q = c(M, 2), ve = i(q, !0);
            n(q);
            var Ie = c(q, 2);
            Ie.textContent = "→";
            var Fe = c(Ie, 2), Ue = i(Fe, !0);
            n(Fe);
            var Be = c(Fe, 4);
            Be.__click = () => qc(ge(), s($).arrow_id), Be.textContent = "✕", n(N), D(() => {
              $r(Y, `color: ${s(O)?.color ?? "#888" ?? ""}; background-color: ${s(O)?.color ?? "#888" ?? ""}15`), m(W, s(O)?.name ?? "?"), m(ve, s($).fact_name), $r(Fe, `color: ${s(A)?.color ?? "#888" ?? ""}; background-color: ${s(A)?.color ?? "#888" ?? ""}15`), m(Ue, s(A)?.name ?? "?");
            }), f(b, N);
          }), n(pe), f(X, pe);
        };
        R(G, (X) => {
          l().length > 0 && X(Re);
        });
      }
      n(de);
      var se = c(de, 2);
      {
        var U = (X) => {
          var pe = vd(), b = c(i(pe), 2), $ = i(b), O = c(i($), 2), A = i(O);
          A.value = (A.__value = null) ?? "";
          var N = c(A);
          ze(N, 1, o, it, (Ue, Be) => {
            var Se = ud(), qe = i(Se, !0);
            n(Se);
            var Qe = {};
            D(() => {
              m(qe, s(Be).name ?? "Unnamed"), Qe !== (Qe = s(Be).cluster_id) && (Se.value = (Se.__value = s(Be).cluster_id) ?? "");
            }), f(Ue, Se);
          }), n(O), n($);
          var Y = c($, 2), W = c(i(Y), 2);
          dt(W), n(Y);
          var M = c(Y, 2), q = c(i(M), 2), ve = i(q);
          ve.value = (ve.__value = null) ?? "";
          var Ie = c(ve);
          ze(Ie, 1, o, it, (Ue, Be) => {
            var Se = dd(), qe = i(Se, !0);
            n(Se);
            var Qe = {};
            D(() => {
              m(qe, s(Be).name ?? "Unnamed"), Qe !== (Qe = s(Be).cluster_id) && (Se.value = (Se.__value = s(Be).cluster_id) ?? "");
            }), f(Ue, Se);
          }), n(q), n(M);
          var Fe = c(M, 2);
          Fe.__click = Ye, n(b), n(pe), D(
            (Ue, Be) => {
              Fe.disabled = Ue, Ve(Fe, 1, `px-3 py-1.5 rounded text-[10px] transition-colors shrink-0
											${Be ?? ""}`);
            },
            [
              () => !s(we) || !s(he) || s(we) === s(he) || !s(Pe).trim(),
              () => s(we) && s(he) && s(we) !== s(he) && s(Pe).trim() ? "bg-hecate-600/20 text-hecate-300 hover:bg-hecate-600/30" : "bg-surface-700 text-surface-500 cursor-not-allowed"
            ]
          ), ys(O, () => s(we), (Ue) => h(we, Ue)), ot(W, () => s(Pe), (Ue) => h(Pe, Ue)), ys(q, () => s(he), (Ue) => h(he, Ue)), f(X, pe);
        };
        R(se, (X) => {
          o().length >= 2 && X(U);
        });
      }
      n(le), n(V);
      var Oe = c(V, 2), Te = i(Oe), ae = i(Te);
      ze(ae, 5, () => _().slice(2), it, (X, pe) => {
        var b = fd();
        b.__click = () => vr(ee(s(pe).prompt), s(pe).id);
        var $ = i(b), O = i($, !0);
        n($);
        var A = c($, 2), N = i(A);
        n(A), n(b), D(() => {
          m(O, s(pe).icon), m(N, `Ask ${s(pe).name ?? ""}`);
        }), f(X, b);
      }), n(ae);
      var B = c(ae, 2);
      B.__click = Je;
      var J = i(B, !0);
      n(B), n(Te), n(Oe), n(j), D(() => {
        B.disabled = P(), Ve(B, 1, `text-[10px] px-4 py-1.5 rounded font-medium transition-colors
								${P() ? "bg-surface-700 text-surface-500 cursor-not-allowed" : "bg-hecate-600 text-surface-50 hover:bg-hecate-500"}`), m(J, P() ? "Promoting..." : "Promote to Divisions");
      }), f(T, j);
    }, K = (T) => {
      var j = hd(), V = i(j), le = i(V);
      le.textContent = "✓";
      var de = c(le, 4), ie = i(de);
      n(de);
      var G = c(de, 4);
      G.__click = function(...Re) {
        Kc?.apply(this, Re);
      }, n(V), n(j), D(() => m(ie, `${o().length ?? ""} divisions identified from
						${d() ?? ""} domain events, with
						${l().length ?? ""} integration fact${l().length !== 1 ? "s" : ""} mapped.`)), f(T, j);
    }, be = (T) => {
      var j = xd(), V = i(j), le = i(V);
      le.textContent = "⏸";
      var de = c(le, 6);
      de.__click = () => Yc(ge()), n(V), n(j), f(T, j);
    };
    R(He, (T) => {
      u() === "ready" ? T(te) : u() === "storm" ? T(w, 1) : u() === "stack" ? T(k, 2) : u() === "groom" ? T(F, 3) : u() === "cluster" ? T(re, 4) : u() === "name" ? T(ye, 5) : u() === "map" ? T(Z, 6) : u() === "promoted" ? T(K, 7) : u() === "shelved" && T(be, 8);
    });
  }
  n(De), n(We), f(e, We), Et(), Q();
}
Nt(["click", "keydown"]);
Dt(Ea, {}, [], [], { mode: "open" });
const or = Xe([]), Za = Xe(null), bd = Kt(or, (e) => {
  const t = /* @__PURE__ */ new Set();
  for (const r of e)
    r.aggregate && t.add(r.aggregate);
  return Array.from(t).sort();
}), gd = Kt(or, (e) => {
  const t = /* @__PURE__ */ new Map(), r = [];
  for (const a of e)
    if (a.aggregate) {
      const o = t.get(a.aggregate) || [];
      o.push(a), t.set(a.aggregate, o);
    } else
      r.push(a);
  return { grouped: t, ungrouped: r };
});
function md(e, t, r = "human") {
  const a = crypto.randomUUID(), o = {
    id: a,
    name: e.trim(),
    aggregate: t?.trim() || void 0,
    execution: r,
    policies: [],
    events: []
  };
  return or.update((l) => [...l, o]), a;
}
function yd(e) {
  or.update((t) => t.filter((r) => r.id !== e));
}
function wd(e, t) {
  or.update(
    (r) => r.map((a) => a.id === e ? { ...a, ...t } : a)
  );
}
function $d(e, t) {
  or.update(
    (r) => r.map((a) => a.id === e ? { ...a, execution: t } : a)
  );
}
function kd(e, t) {
  const r = { id: crypto.randomUUID(), text: t.trim() };
  or.update(
    (a) => a.map(
      (o) => o.id === e ? { ...o, policies: [...o.policies, r] } : o
    )
  );
}
function Ed(e, t) {
  or.update(
    (r) => r.map(
      (a) => a.id === e ? { ...a, policies: a.policies.filter((o) => o.id !== t) } : a
    )
  );
}
function Cd(e, t) {
  const r = { id: crypto.randomUUID(), text: t.trim() };
  or.update(
    (a) => a.map(
      (o) => o.id === e ? { ...o, events: [...o.events, r] } : o
    )
  );
}
function Sd(e, t) {
  or.update(
    (r) => r.map(
      (a) => a.id === e ? { ...a, events: a.events.filter((o) => o.id !== t) } : a
    )
  );
}
async function Ad(e, t) {
  try {
    return await Ge().post(`/stormings/${e}/design-aggregate`, t), !0;
  } catch (r) {
    const a = r;
    return Za.set(a.message || "Failed to design aggregate"), !1;
  }
}
async function Dd(e, t) {
  try {
    return await Ge().post(`/stormings/${e}/design-event`, t), !0;
  } catch (r) {
    const a = r;
    return Za.set(a.message || "Failed to design event"), !1;
  }
}
async function mn(e, t) {
  try {
    return await Ge().post(`/stormings/${e}/plan-desk`, t), !0;
  } catch (r) {
    const a = r;
    return Za.set(a.message || "Failed to plan desk"), !1;
  }
}
var Pd = /* @__PURE__ */ p(`<button class="text-[10px] px-2.5 py-1 rounded bg-hecate-600/20 text-hecate-300
					hover:bg-hecate-600/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"> </button>`), Id = /* @__PURE__ */ p(`<button class="text-[10px] px-2 py-1 rounded text-surface-400
					hover:text-hecate-300 hover:bg-hecate-600/10 transition-colors" title="Get AI assistance"></button>`), Td = /* @__PURE__ */ p('<div><div class="flex items-start gap-2"><span class="text-hecate-400 text-sm mt-0.5"> </span> <div class="flex-1 min-w-0"><div class="flex items-center gap-2"><h3 class="text-xs font-semibold text-surface-100"> </h3> <span> </span></div> <p class="text-[11px] text-surface-400 mt-1"> </p></div></div> <div class="flex items-center gap-2 mt-1"><!> <!></div></div>');
function lt(e, t) {
  kt(t, !0);
  let r = _t(t, "title", 7), a = _t(t, "description", 7), o = _t(t, "icon", 7, "■"), l = _t(t, "status", 7, "pending"), u = _t(t, "aiContext", 7), d = _t(t, "onaction", 7), v = _t(t, "actionLabel", 7, "Execute"), x = _t(t, "disabled", 7, !1), _ = /* @__PURE__ */ Ce(() => E(l()));
  function g(fe) {
    switch (fe) {
      case "active":
        return "border-hecate-600/40";
      case "done":
        return "border-health-ok/30";
      default:
        return "border-surface-600";
    }
  }
  function E(fe) {
    switch (fe) {
      case "active":
        return { text: "Active", cls: "bg-hecate-600/20 text-hecate-300" };
      case "done":
        return { text: "Done", cls: "bg-health-ok/10 text-health-ok" };
      default:
        return { text: "Pending", cls: "bg-surface-700 text-surface-400" };
    }
  }
  var P = {
    get title() {
      return r();
    },
    set title(fe) {
      r(fe), ht();
    },
    get description() {
      return a();
    },
    set description(fe) {
      a(fe), ht();
    },
    get icon() {
      return o();
    },
    set icon(fe = "■") {
      o(fe), ht();
    },
    get status() {
      return l();
    },
    set status(fe = "pending") {
      l(fe), ht();
    },
    get aiContext() {
      return u();
    },
    set aiContext(fe) {
      u(fe), ht();
    },
    get onaction() {
      return d();
    },
    set onaction(fe) {
      d(fe), ht();
    },
    get actionLabel() {
      return v();
    },
    set actionLabel(fe = "Execute") {
      v(fe), ht();
    },
    get disabled() {
      return x();
    },
    set disabled(fe = !1) {
      x(fe), ht();
    }
  }, C = Td(), Q = i(C), S = i(Q), I = i(S, !0);
  n(S);
  var z = c(S, 2), we = i(z), he = i(we), Pe = i(he, !0);
  n(he);
  var ue = c(he, 2), Le = i(ue, !0);
  n(ue), n(we);
  var ge = c(we, 2), Ke = i(ge, !0);
  n(ge), n(z), n(Q);
  var xe = c(Q, 2), Me = i(xe);
  {
    var Ne = (fe) => {
      var y = Pd();
      y.__click = function(...je) {
        d()?.apply(this, je);
      };
      var ee = i(y, !0);
      n(y), D(() => {
        y.disabled = x(), m(ee, v());
      }), f(fe, y);
    };
    R(Me, (fe) => {
      d() && fe(Ne);
    });
  }
  var Ye = c(Me, 2);
  {
    var Je = (fe) => {
      var y = Id();
      y.__click = () => vr(u()), y.textContent = "✦ AI", f(fe, y);
    };
    R(Ye, (fe) => {
      u() && fe(Je);
    });
  }
  return n(xe), n(C), D(
    (fe) => {
      Ve(C, 1, `rounded-lg bg-surface-800 border ${fe ?? ""} p-4 flex flex-col gap-2 transition-colors hover:border-surface-500`), m(I, o()), m(Pe, r()), Ve(ue, 1, `text-[9px] px-1.5 py-0.5 rounded ${s(_).cls ?? ""}`), m(Le, s(_).text), m(Ke, a());
    },
    [() => g(l())]
  ), f(e, C), Et(P);
}
Nt(["click"]);
Dt(
  lt,
  {
    title: {},
    description: {},
    icon: {},
    status: {},
    aiContext: {},
    onaction: {},
    actionLabel: {},
    disabled: {}
  },
  [],
  [],
  { mode: "open" }
);
var Md = /* @__PURE__ */ p(`<div class="group/policy flex items-center gap-1 px-2 py-1 rounded-l rounded-r-sm
						bg-es-policy/15 border border-es-policy/30 text-[9px] text-surface-200
						max-w-[160px]"><span class="truncate flex-1"> </span> <button class="text-[7px] text-surface-500 hover:text-health-err
							opacity-0 group-hover/policy:opacity-100 transition-opacity shrink-0"></button></div>`), Nd = /* @__PURE__ */ p(`<input class="flex-1 bg-surface-700 border border-es-command/30 rounded px-2 py-0.5
							text-xs font-semibold text-surface-100
							focus:outline-none focus:border-es-command"/>`), Rd = /* @__PURE__ */ p(`<button class="flex-1 text-left text-xs font-semibold text-surface-100
							hover:text-es-command transition-colors" title="Double-click to rename"> </button>`), Ld = /* @__PURE__ */ p('<span class="text-[9px] text-es-aggregate/70"> </span>'), Od = /* @__PURE__ */ p(`<div class="group/event flex items-center gap-1 px-2 py-1 rounded-r rounded-l-sm
						bg-es-event/15 border border-es-event/30 text-[9px] text-surface-200
						max-w-[200px]"><span class="truncate flex-1"> </span> <button class="text-[7px] text-surface-500 hover:text-health-err
							opacity-0 group-hover/event:opacity-100 transition-opacity shrink-0"></button></div>`), Fd = /* @__PURE__ */ p(`<div class="flex items-stretch gap-0 group/card"><div class="flex flex-col items-end gap-1 -mr-2 z-10 pt-1 min-w-[100px]"><!> <input placeholder="+ policy" class="w-24 bg-transparent border border-dashed border-es-policy/20 rounded
					px-1.5 py-0.5 text-[8px] text-surface-400 placeholder-surface-500
					focus:outline-none focus:border-es-policy/40
					opacity-0 group-hover/card:opacity-100 transition-opacity"/></div> <div class="relative flex-1 rounded-lg border-2 border-es-command/40 bg-es-command/10
				px-4 py-3 min-h-[72px] z-20"><div class="flex items-center gap-2 mb-1"><button> </button> <!> <div class="flex items-center gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity"><button class="text-[8px] px-1.5 py-0.5 rounded text-health-ok
							hover:bg-health-ok/10 transition-colors" title="Promote to daemon"></button> <button class="text-[8px] px-1 py-0.5 rounded text-surface-500
							hover:text-health-err hover:bg-health-err/10 transition-colors" title="Remove desk"></button></div></div> <!></div> <div class="flex flex-col items-start gap-1 -ml-2 z-10 pt-1 min-w-[100px]"><!> <input placeholder="+ event" class="w-32 bg-transparent border border-dashed border-es-event/20 rounded
					px-1.5 py-0.5 text-[8px] text-surface-400 placeholder-surface-500
					focus:outline-none focus:border-es-event/40
					opacity-0 group-hover/card:opacity-100 transition-opacity"/></div></div>`), Vd = /* @__PURE__ */ p("<option></option>"), jd = /* @__PURE__ */ p('<div class="space-y-2"><div class="flex items-center gap-2"><div class="w-3 h-3 rounded-sm bg-es-aggregate/40"></div> <span class="text-[10px] font-semibold text-es-aggregate uppercase tracking-wider"> </span> <div class="flex-1 h-px bg-es-aggregate/20"></div> <span class="text-[9px] text-surface-400"> </span></div> <div class="space-y-3 ml-5"></div></div>'), Bd = /* @__PURE__ */ p('<div class="flex items-center gap-2"><span class="text-[10px] font-semibold text-surface-400 uppercase tracking-wider">No Aggregate</span> <div class="flex-1 h-px bg-surface-600"></div></div>'), Hd = /* @__PURE__ */ p("<!> <div></div>", 1), Wd = /* @__PURE__ */ p("<!> <!>", 1), qd = /* @__PURE__ */ p(`<div class="text-center py-8 text-surface-500 text-xs border border-dashed border-surface-600 rounded-lg">No desk cards yet. Add your first command desk above,
				or ask an AI agent for suggestions.</div>`), zd = /* @__PURE__ */ p(`<button class="rounded-lg border border-surface-600 bg-surface-800/50
							p-3 text-left transition-all hover:border-hecate-500/40
							hover:bg-surface-700/50 group"><div class="flex items-center gap-2 mb-1.5"><span class="text-hecate-400 group-hover:text-hecate-300 transition-colors"> </span> <span class="text-[11px] font-semibold text-surface-100"> </span></div> <div class="text-[10px] text-surface-400 mb-1"> </div> <div class="text-[9px] text-surface-500"> </div></button>`), Ud = /* @__PURE__ */ p(
  `<div class="rounded-lg border border-es-command/20 bg-es-command/5 p-3"><div class="flex items-end gap-2"><div class="flex-1"><label class="text-[9px] text-surface-400 block mb-1">Desk Name (command)</label> <input placeholder="e.g., register_user, process_order" class="w-full bg-surface-700 border border-surface-600 rounded px-2.5 py-1.5
							text-xs text-surface-100 placeholder-surface-400
							focus:outline-none focus:border-es-command/50"/></div> <div class="w-40"><label class="text-[9px] text-surface-400 block mb-1">Aggregate</label> <input placeholder="e.g., user, order" list="existing-aggregates" class="w-full bg-surface-700 border border-surface-600 rounded px-2.5 py-1.5
							text-xs text-surface-100 placeholder-surface-400
							focus:outline-none focus:border-surface-500"/> <datalist id="existing-aggregates"></datalist></div> <div class="w-24"><label class="text-[9px] text-surface-400 block mb-1">Execution</label> <select class="w-full bg-surface-700 border border-surface-600 rounded px-2 py-1.5
							text-xs text-surface-100
							focus:outline-none focus:border-surface-500"><option>Human</option><option>Agent</option><option>Both</option></select></div> <button>+ Desk</button></div></div> <!> <div class="rounded-lg border border-hecate-600/20 bg-hecate-950/20 p-4"><div class="flex items-center gap-2 mb-3"><span class="text-hecate-400"></span> <h4 class="text-xs font-semibold text-surface-100">AI Domain Experts</h4> <span class="text-[10px] text-surface-400">Ask a virtual agent to analyze the domain and suggest desk cards</span></div> <div class="grid grid-cols-2 md:grid-cols-4 gap-2"></div></div> <div><h4 class="text-xs font-semibold text-surface-100 mb-3">Design Tasks</h4> <div class="grid grid-cols-1 md:grid-cols-2 gap-3"><!> <!> <!> <!></div></div>`,
  1
), Yd = /* @__PURE__ */ p(`<div class="flex gap-2 items-end mb-4 p-3 rounded bg-surface-700/30"><div class="flex-1"><label for="desk-name" class="text-[10px] text-surface-400 block mb-1">Desk Name</label> <input id="desk-name" placeholder="e.g., register_user" class="w-full bg-surface-700 border border-surface-600 rounded
								px-2.5 py-1.5 text-xs text-surface-100 placeholder-surface-400
								focus:outline-none focus:border-hecate-500/50"/></div> <div class="flex-1"><label for="desk-desc" class="text-[10px] text-surface-400 block mb-1">Description</label> <input id="desk-desc" placeholder="Brief purpose of this desk" class="w-full bg-surface-700 border border-surface-600 rounded
								px-2.5 py-1.5 text-xs text-surface-100 placeholder-surface-400
								focus:outline-none focus:border-hecate-500/50"/></div> <div><label for="desk-dept" class="text-[10px] text-surface-400 block mb-1">Dept</label> <select id="desk-dept" class="bg-surface-700 border border-surface-600 rounded
								px-2 py-1.5 text-xs text-surface-100
								focus:outline-none focus:border-hecate-500/50 cursor-pointer"><option>CMD</option><option>QRY</option><option>PRJ</option></select></div> <button class="px-3 py-1.5 rounded text-xs bg-hecate-600/20 text-hecate-300
							hover:bg-hecate-600/30 transition-colors disabled:opacity-50">Plan</button> <button class="px-3 py-1.5 rounded text-xs text-surface-400 hover:text-surface-100">Cancel</button></div>`), Gd = /* @__PURE__ */ p(
  `<div class="rounded-lg border border-surface-600 bg-surface-800/50 p-4"><div class="flex items-center justify-between mb-3"><h4 class="text-xs font-semibold text-surface-100">Desk Inventory</h4> <button class="text-[10px] px-2 py-0.5 rounded bg-hecate-600/10 text-hecate-300
						hover:bg-hecate-600/20 transition-colors">+ Plan Desk</button></div> <!> <p class="text-[10px] text-surface-400">Desks are individual capabilities within a department. Each desk owns a
				vertical slice: command + event + handler + projection.</p></div> <div><h4 class="text-xs font-semibold text-surface-100 mb-3">Planning Tasks</h4> <div class="grid grid-cols-1 md:grid-cols-2 gap-3"><!> <!> <!> <!></div></div>`,
  1
), Kd = /* @__PURE__ */ p('<div class="p-4 space-y-6"><div class="flex items-center justify-between"><div><h3 class="text-sm font-semibold text-surface-100">Storming</h3> <p class="text-[11px] text-surface-400 mt-0.5">Design aggregates, events, desks, and dependencies for <span class="text-surface-200"> </span></p></div> <div class="flex items-center gap-1 bg-surface-700/50 rounded-lg p-0.5"><button>Event Storm</button> <button>Desk Inventory</button></div></div> <!></div>');
function Bi(e, t) {
  kt(t, !0);
  const r = () => $e(Ir, "$selectedDivision", v), a = () => $e(or, "$deskCards", v), o = () => $e(bd, "$deskAggregates", v), l = () => $e(gd, "$deskCardsByAggregate", v), u = () => $e(Tl, "$designLevelAgents", v), d = () => $e(pt, "$isLoading", v), [v, x] = Rt(), _ = (w, k = hr) => {
    var F = Fd(), re = i(F), ye = i(re);
    ze(ye, 17, () => k().policies, (B) => B.id, (B, J) => {
      var X = Md(), pe = i(X), b = i(pe, !0);
      n(pe);
      var $ = c(pe, 2);
      $.__click = () => Ed(k().id, s(J).id), $.textContent = "✕", n(X), D(() => m(b, s(J).text)), f(B, X);
    });
    var Z = c(ye, 2);
    dt(Z), Z.__keydown = (B) => Ke(B, k().id), n(re);
    var K = c(re, 2), be = i(K), T = i(be);
    T.__click = () => Ye(k());
    var j = i(T, !0);
    n(T);
    var V = c(T, 2);
    {
      var le = (B) => {
        var J = Nd();
        dt(J), J.__keydown = (X) => {
          X.key === "Enter" && Ne(k().id), X.key === "Escape" && h(S, null);
        }, mt("blur", J, () => Ne(k().id)), ot(J, () => s(I), (X) => h(I, X)), f(B, J);
      }, de = (B) => {
        var J = Rd();
        J.__dblclick = () => Me(k());
        var X = i(J, !0);
        n(J), D(() => m(X, k().name)), f(B, J);
      };
      R(V, (B) => {
        s(S) === k().id ? B(le) : B(de, !1);
      });
    }
    var ie = c(V, 2), G = i(ie);
    G.__click = () => ee(k()), G.textContent = "↑ promote";
    var Re = c(G, 2);
    Re.__click = () => yd(k().id), Re.textContent = "✕", n(ie), n(be);
    var se = c(be, 2);
    {
      var U = (B) => {
        var J = Ld(), X = i(J);
        n(J), D(() => m(X, `■ ${k().aggregate ?? ""}`)), f(B, J);
      };
      R(se, (B) => {
        k().aggregate && B(U);
      });
    }
    n(K);
    var Oe = c(K, 2), Te = i(Oe);
    ze(Te, 17, () => k().events, (B) => B.id, (B, J) => {
      var X = Od(), pe = i(X), b = i(pe, !0);
      n(pe);
      var $ = c(pe, 2);
      $.__click = () => Sd(k().id, s(J).id), $.textContent = "✕", n(X), D(() => m(b, s(J).text)), f(B, X);
    });
    var ae = c(Te, 2);
    dt(ae), ae.__keydown = (B) => xe(B, k().id), n(Oe), n(F), D(
      (B, J, X) => {
        Ve(T, 1, `text-sm ${B ?? ""}
						hover:scale-110 transition-transform`), Vt(T, "title", `${J ?? ""} — click to cycle`), m(j, X);
      },
      [
        () => y(k().execution),
        () => fe(k().execution),
        () => Je(k().execution)
      ]
    ), ot(Z, () => s(C)[k().id], (B) => s(C)[k().id] = B), ot(ae, () => s(Q)[k().id], (B) => s(Q)[k().id] = B), f(w, F);
  };
  let g = /* @__PURE__ */ ne(""), E = /* @__PURE__ */ ne(""), P = /* @__PURE__ */ ne("human"), C = /* @__PURE__ */ ne(Wt({})), Q = /* @__PURE__ */ ne(Wt({})), S = /* @__PURE__ */ ne(null), I = /* @__PURE__ */ ne(""), z = /* @__PURE__ */ ne(!1), we = /* @__PURE__ */ ne(""), he = /* @__PURE__ */ ne(""), Pe = /* @__PURE__ */ ne("cmd"), ue = /* @__PURE__ */ ne("design");
  function Le() {
    s(g).trim() && (md(s(g), s(E) || void 0, s(P)), h(g, ""), h(E, ""), h(P, "human"));
  }
  function ge(w) {
    w.key === "Enter" && !w.shiftKey && s(g).trim() && (w.preventDefault(), Le());
  }
  function Ke(w, k) {
    w.key === "Enter" && s(C)[k]?.trim() && (w.preventDefault(), kd(k, s(C)[k]), s(C)[k] = "");
  }
  function xe(w, k) {
    w.key === "Enter" && s(Q)[k]?.trim() && (w.preventDefault(), Cd(k, s(Q)[k]), s(Q)[k] = "");
  }
  function Me(w) {
    h(S, w.id, !0), h(I, w.name, !0);
  }
  function Ne(w) {
    s(I).trim() && wd(w, { name: s(I).trim() }), h(S, null);
  }
  function Ye(w) {
    const k = ["human", "agent", "both"], F = k.indexOf(w.execution);
    $d(w.id, k[(F + 1) % k.length]);
  }
  function Je(w) {
    switch (w) {
      case "human":
        return "𝗨";
      case "agent":
        return "⚙";
      case "both":
      case "pair":
        return "✦";
    }
  }
  function fe(w) {
    switch (w) {
      case "human":
        return "Interactive (human)";
      case "agent":
        return "Automated (AI agent)";
      case "both":
      case "pair":
        return "Assisted (human + AI)";
    }
  }
  function y(w) {
    switch (w) {
      case "human":
        return "text-es-command";
      case "agent":
        return "text-hecate-400";
      case "both":
      case "pair":
        return "text-phase-crafting";
    }
  }
  async function ee(w) {
    if (!r()) return;
    const k = r().division_id;
    await mn(k, {
      desk_name: w.name,
      description: [
        w.execution === "agent" ? "AI-automated" : w.execution === "both" ? "Human+AI assisted" : "Interactive",
        w.policies.length > 0 ? `Policies: ${w.policies.map((F) => F.text).join(", ")}` : "",
        w.events.length > 0 ? `Emits: ${w.events.map((F) => F.text).join(", ")}` : ""
      ].filter(Boolean).join(". "),
      department: "CMD"
    });
    for (const F of w.events)
      await Dd(k, {
        event_name: F.text,
        aggregate_type: w.aggregate || w.name
      });
    w.aggregate && await Ad(k, { aggregate_name: w.aggregate });
  }
  async function je() {
    if (!r() || !s(we).trim()) return;
    await mn(r().division_id, {
      desk_name: s(we).trim(),
      description: s(he).trim() || void 0,
      department: s(Pe)
    }) && (h(we, ""), h(he, ""), h(z, !1));
  }
  function We(w) {
    const k = r()?.context_name ?? "this division", F = a(), re = F.map((be) => be.name).join(", "), ye = F.flatMap((be) => be.events.map((T) => T.text)).join(", "), Z = F.flatMap((be) => be.policies.map((T) => T.text)).join(", ");
    let K = `We are doing Design-Level Event Storming for the "${k}" division.

`;
    return K += `Our board uses command-centric desk cards:
`, K += `- Each card = a desk (command/slice)
`, K += `- Left side: policies (grey) = filter/guard conditions
`, K += `- Right side: events (orange) = what the desk emits
`, K += `- Cards can be human (interactive), agent (AI), or both

`, re && (K += `Desks so far: ${re}
`), ye && (K += `Events so far: ${ye}
`), Z && (K += `Policies so far: ${Z}
`), K += `
${w.prompt}

Please analyze and suggest items for the board.`, K;
  }
  var Ae = Kd(), ke = i(Ae), me = i(ke), oe = c(i(me), 2), _e = c(i(oe)), ce = i(_e, !0);
  n(_e), n(oe), n(me);
  var Ee = c(me, 2), L = i(Ee);
  L.__click = () => h(ue, "design");
  var H = c(L, 2);
  H.__click = () => h(ue, "plan"), n(Ee), n(ke);
  var De = c(ke, 2);
  {
    var He = (w) => {
      var k = Ud(), F = nt(k), re = i(F), ye = i(re), Z = c(i(ye), 2);
      dt(Z), Z.__keydown = ge, n(ye);
      var K = c(ye, 2), be = c(i(K), 2);
      dt(be);
      var T = c(be, 2);
      ze(T, 5, o, it, (A, N) => {
        var Y = Vd(), W = {};
        D(() => {
          W !== (W = s(N)) && (Y.value = (Y.__value = s(N)) ?? "");
        }), f(A, Y);
      }), n(T), n(K);
      var j = c(K, 2), V = c(i(j), 2), le = i(V);
      le.value = le.__value = "human";
      var de = c(le);
      de.value = de.__value = "agent";
      var ie = c(de);
      ie.value = ie.__value = "both", n(V), n(j);
      var G = c(j, 2);
      G.__click = Le, n(re), n(F);
      var Re = c(F, 2);
      {
        var se = (A) => {
          const N = /* @__PURE__ */ Ce(() => {
            const { grouped: ve, ungrouped: Ie } = l();
            return { grouped: ve, ungrouped: Ie };
          });
          var Y = Wd(), W = nt(Y);
          ze(W, 17, () => [...s(N).grouped.entries()], it, (ve, Ie) => {
            var Fe = /* @__PURE__ */ Ce(() => oa(s(Ie), 2));
            let Ue = () => s(Fe)[0], Be = () => s(Fe)[1];
            var Se = jd(), qe = i(Se), Qe = c(i(qe), 2), at = i(Qe, !0);
            n(Qe);
            var ct = c(Qe, 4), ut = i(ct);
            n(ct), n(qe);
            var jt = c(qe, 2);
            ze(jt, 21, Be, (Jt) => Jt.id, (Jt, yr) => {
              _(Jt, () => s(yr));
            }), n(jt), n(Se), D(() => {
              m(at, Ue()), m(ut, `${Be().length ?? ""} desk${Be().length !== 1 ? "s" : ""}`);
            }), f(ve, Se);
          });
          var M = c(W, 2);
          {
            var q = (ve) => {
              var Ie = Hd(), Fe = nt(Ie);
              {
                var Ue = (Se) => {
                  var qe = Bd();
                  f(Se, qe);
                };
                R(Fe, (Se) => {
                  s(N).grouped.size > 0 && Se(Ue);
                });
              }
              var Be = c(Fe, 2);
              ze(Be, 21, () => s(N).ungrouped, (Se) => Se.id, (Se, qe) => {
                _(Se, () => s(qe));
              }), n(Be), D(() => Ve(Be, 1, `space-y-3 ${s(N).grouped.size > 0 ? "ml-5" : ""}`)), f(ve, Ie);
            };
            R(M, (ve) => {
              s(N).ungrouped.length > 0 && ve(q);
            });
          }
          f(A, Y);
        }, U = (A) => {
          var N = qd();
          f(A, N);
        };
        R(Re, (A) => {
          a().length > 0 ? A(se) : A(U, !1);
        });
      }
      var Oe = c(Re, 2), Te = i(Oe), ae = i(Te);
      ae.textContent = "✦", xt(4), n(Te);
      var B = c(Te, 2);
      ze(B, 5, u, it, (A, N) => {
        var Y = zd();
        Y.__click = () => vr(We(s(N)));
        var W = i(Y), M = i(W), q = i(M, !0);
        n(M);
        var ve = c(M, 2), Ie = i(ve, !0);
        n(ve), n(W);
        var Fe = c(W, 2), Ue = i(Fe, !0);
        n(Fe);
        var Be = c(Fe, 2), Se = i(Be, !0);
        n(Be), n(Y), D(() => {
          m(q, s(N).icon), m(Ie, s(N).name), m(Ue, s(N).role), m(Se, s(N).description);
        }), f(A, Y);
      }), n(B), n(Oe);
      var J = c(Oe, 2), X = c(i(J), 2), pe = i(X);
      {
        let A = /* @__PURE__ */ Ce(() => `Help me design aggregates for the "${r()?.context_name}" division. What are the natural consistency boundaries? What entities accumulate history over time?`);
        lt(pe, {
          title: "Design Aggregates",
          description: "Identify aggregate boundaries, define stream patterns and status flags",
          icon: "■",
          get aiContext() {
            return s(A);
          }
        });
      }
      var b = c(pe, 2);
      {
        let A = /* @__PURE__ */ Ce(() => `Help me define status bit flags for aggregates in the "${r()?.context_name}" division. Each aggregate needs lifecycle states as bit flags (powers of 2).`);
        lt(b, {
          title: "Define Status Flags",
          description: "Design bit flag status fields for each aggregate lifecycle",
          icon: "⚑",
          get aiContext() {
            return s(A);
          }
        });
      }
      var $ = c(b, 2);
      {
        let A = /* @__PURE__ */ Ce(() => `Help me identify read models for the "${r()?.context_name}" division. What queries will users run? What data views are needed?`);
        lt($, {
          title: "Map Read Models",
          description: "Identify what queries users will run and what data they need",
          icon: "▶",
          get aiContext() {
            return s(A);
          }
        });
      }
      var O = c($, 2);
      {
        let A = /* @__PURE__ */ Ce(() => `Help me create a domain glossary for the "${r()?.context_name}" division. Define key terms, bounded context boundaries, and ubiquitous language.`);
        lt(O, {
          title: "Domain Glossary",
          description: "Document ubiquitous language and bounded context definitions",
          icon: "✎",
          get aiContext() {
            return s(A);
          }
        });
      }
      n(X), n(J), D(
        (A, N) => {
          G.disabled = A, Ve(G, 1, `px-3 py-1.5 rounded text-xs transition-colors shrink-0
						${N ?? ""}`);
        },
        [
          () => !s(g).trim(),
          () => s(g).trim() ? "bg-es-command/20 text-es-command hover:bg-es-command/30" : "bg-surface-700 text-surface-500 cursor-not-allowed"
        ]
      ), ot(Z, () => s(g), (A) => h(g, A)), ot(be, () => s(E), (A) => h(E, A)), ys(V, () => s(P), (A) => h(P, A)), f(w, k);
    }, te = (w) => {
      var k = Gd(), F = nt(k), re = i(F), ye = c(i(re), 2);
      ye.__click = () => h(z, !s(z)), n(re);
      var Z = c(re, 2);
      {
        var K = (ie) => {
          var G = Yd(), Re = i(G), se = c(i(Re), 2);
          dt(se), n(Re);
          var U = c(Re, 2), Oe = c(i(U), 2);
          dt(Oe), n(U);
          var Te = c(U, 2), ae = c(i(Te), 2), B = i(ae);
          B.value = B.__value = "cmd";
          var J = c(B);
          J.value = J.__value = "qry";
          var X = c(J);
          X.value = X.__value = "prj", n(ae), n(Te);
          var pe = c(Te, 2);
          pe.__click = je;
          var b = c(pe, 2);
          b.__click = () => h(z, !1), n(G), D(($) => pe.disabled = $, [() => !s(we).trim() || d()]), ot(se, () => s(we), ($) => h(we, $)), ot(Oe, () => s(he), ($) => h(he, $)), ys(ae, () => s(Pe), ($) => h(Pe, $)), f(ie, G);
        };
        R(Z, (ie) => {
          s(z) && ie(K);
        });
      }
      xt(2), n(F);
      var be = c(F, 2), T = c(i(be), 2), j = i(T);
      {
        let ie = /* @__PURE__ */ Ce(() => `Help me create a desk inventory for the "${r()?.context_name}" division. Each desk is a vertical slice (command + event + handler). Organize by CMD (write), QRY (read), and PRJ (projection) departments.`);
        lt(j, {
          title: "Desk Inventory",
          description: "Create a complete inventory of desks needed for this division, organized by department (CMD, QRY, PRJ)",
          icon: "▣",
          get aiContext() {
            return s(ie);
          }
        });
      }
      var V = c(j, 2);
      {
        let ie = /* @__PURE__ */ Ce(() => `Help me map dependencies between desks in the "${r()?.context_name}" division. Which desks depend on which? What's the optimal implementation order?`);
        lt(V, {
          title: "Dependency Mapping",
          description: "Map dependencies between desks to determine implementation order",
          icon: "⇄",
          get aiContext() {
            return s(ie);
          }
        });
      }
      var le = c(V, 2);
      {
        let ie = /* @__PURE__ */ Ce(() => `Help me sequence the implementation of desks in the "${r()?.context_name}" division into logical sprints. Consider dependencies, walking skeleton principles, and the "initiate + archive" first rule.`);
        lt(le, {
          title: "Sprint Sequencing",
          description: "Prioritize and sequence desks into implementation sprints",
          icon: "☰",
          get aiContext() {
            return s(ie);
          }
        });
      }
      var de = c(le, 2);
      {
        let ie = /* @__PURE__ */ Ce(() => `Help me design REST API endpoints for the "${r()?.context_name}" division. Follow the pattern: POST /api/{resource}/{action} for commands, GET /api/{resource} for queries.`);
        lt(de, {
          title: "API Design",
          description: "Design REST API endpoints for each desk's capabilities",
          icon: "↔",
          get aiContext() {
            return s(ie);
          }
        });
      }
      n(T), n(be), f(w, k);
    };
    R(De, (w) => {
      s(ue) === "design" ? w(He) : w(te, !1);
    });
  }
  n(Ae), D(() => {
    m(ce, r()?.context_name), Ve(L, 1, `px-3 py-1 rounded text-[11px] transition-colors
					${s(ue) === "design" ? "bg-surface-600 text-surface-100" : "text-surface-400 hover:text-surface-200"}`), Ve(H, 1, `px-3 py-1 rounded text-[11px] transition-colors
					${s(ue) === "plan" ? "bg-surface-600 text-surface-100" : "text-surface-400 hover:text-surface-200"}`);
  }), f(e, Ae), Et(), x();
}
Nt(["click", "keydown", "dblclick"]);
Dt(Bi, {}, [], [], { mode: "open" });
var Jd = /* @__PURE__ */ p(`<div class="p-4 space-y-6"><div><h3 class="text-sm font-semibold text-surface-100">Planning</h3> <p class="text-[11px] text-surface-400 mt-0.5">Lifecycle management for <span class="text-surface-200"> </span></p></div> <div class="rounded-lg border border-surface-600 bg-surface-800/50 p-4"><h4 class="text-xs font-semibold text-surface-100 mb-3">Division Lifecycle</h4> <p class="text-[10px] text-surface-400 leading-relaxed">Use the phase controls above to manage this division's planning lifecycle: <span class="text-surface-300">Open</span> to begin work, <span class="text-surface-300">Shelve</span> to pause, <span class="text-surface-300">Resume</span> to continue, or <span class="text-surface-300">Conclude</span> when planning is complete.</p> <p class="text-[10px] text-surface-400 mt-2 leading-relaxed">Content work (designing aggregates, events, desks) happens in the <span class="text-es-event">Storming</span> phase.
			Implementation items are tracked on the <span class="text-hecate-400">Kanban</span> board.</p></div> <div><h4 class="text-xs font-semibold text-surface-100 mb-3">Planning Tasks</h4> <div class="grid grid-cols-1 md:grid-cols-2 gap-3"><!> <!> <!> <!></div></div></div>`);
function Hi(e, t) {
  kt(t, !1);
  const r = () => $e(Ir, "$selectedDivision", a), [a, o] = Rt();
  yi();
  var l = Jd(), u = i(l), d = c(i(u), 2), v = c(i(d)), x = i(v, !0);
  n(v), n(d), n(u);
  var _ = c(u, 4), g = c(i(_), 2), E = i(g);
  {
    let S = /* @__PURE__ */ cr(() => `Help me create a desk inventory for the "${r()?.context_name}" division. Each desk is a vertical slice (command + event + handler). Organize by CMD (write), QRY (read), and PRJ (projection) departments.`);
    lt(E, {
      title: "Desk Inventory",
      description: "Create a complete inventory of desks needed for this division, organized by department (CMD, QRY, PRJ)",
      icon: "▣",
      get aiContext() {
        return s(S);
      }
    });
  }
  var P = c(E, 2);
  {
    let S = /* @__PURE__ */ cr(() => `Help me map dependencies between desks in the "${r()?.context_name}" division. Which desks depend on which? What's the optimal implementation order?`);
    lt(P, {
      title: "Dependency Mapping",
      description: "Map dependencies between desks to determine implementation order",
      icon: "⇄",
      get aiContext() {
        return s(S);
      }
    });
  }
  var C = c(P, 2);
  {
    let S = /* @__PURE__ */ cr(() => `Help me sequence the implementation of desks in the "${r()?.context_name}" division into logical sprints. Consider dependencies, walking skeleton principles, and the "initiate + archive" first rule.`);
    lt(C, {
      title: "Sprint Sequencing",
      description: "Prioritize and sequence desks into implementation sprints",
      icon: "☰",
      get aiContext() {
        return s(S);
      }
    });
  }
  var Q = c(C, 2);
  {
    let S = /* @__PURE__ */ cr(() => `Help me design REST API endpoints for the "${r()?.context_name}" division. Follow the pattern: POST /api/{resource}/{action} for commands, GET /api/{resource} for queries.`);
    lt(Q, {
      title: "API Design",
      description: "Design REST API endpoints for each desk's capabilities",
      icon: "↔",
      get aiContext() {
        return s(S);
      }
    });
  }
  n(g), n(_), n(l), D(() => m(x, r()?.context_name)), f(e, l), Et(), o();
}
Dt(Hi, {}, [], [], { mode: "open" });
const yn = Xe(null), Wr = Xe([]), tr = Xe(null), Ca = Xe(!1), Qd = Kt(
  Wr,
  (e) => e.filter((t) => t.status_text === "ready")
), Xd = Kt(
  Wr,
  (e) => e.filter((t) => t.status_text === "in_progress")
), Zd = Kt(
  Wr,
  (e) => e.filter((t) => t.status_text === "done")
), ev = Kt(Wr, (e) => ({
  ready: e.filter((t) => t.status_text === "ready").length,
  in_progress: e.filter((t) => t.status_text === "in_progress").length,
  done: e.filter((t) => t.status_text === "done").length,
  total: e.length
}));
async function Ds(e) {
  try {
    Ca.set(!0), tr.set(null);
    const r = await Ge().get(
      `/kanbans/${e}`
    );
    yn.set(r.board), Wr.set(r.items ?? []);
  } catch (t) {
    const r = t;
    tr.set(r.message || "Failed to fetch kanban board"), yn.set(null), Wr.set([]);
  } finally {
    Ca.set(!1);
  }
}
async function tv(e, t) {
  try {
    return tr.set(null), await Ge().post(`/kanbans/${e}/items`, t), await Ds(e), !0;
  } catch (r) {
    const a = r;
    return tr.set(a.message || "Failed to submit item"), !1;
  }
}
async function rv(e, t, r = "hecate-web") {
  try {
    return tr.set(null), await Ge().post(`/kanbans/${e}/items/${t}/pick`, {
      picked_by: r
    }), await Ds(e), !0;
  } catch (a) {
    const o = a;
    return tr.set(o.message || "Failed to pick item"), !1;
  }
}
async function sv(e, t) {
  try {
    return tr.set(null), await Ge().post(`/kanbans/${e}/items/${t}/complete`, {}), await Ds(e), !0;
  } catch (r) {
    const a = r;
    return tr.set(a.message || "Failed to complete item"), !1;
  }
}
async function av(e, t, r) {
  try {
    return tr.set(null), await Ge().post(`/kanbans/${e}/items/${t}/return`, {
      reason: r
    }), await Ds(e), !0;
  } catch (a) {
    const o = a;
    return tr.set(o.message || "Failed to return item"), !1;
  }
}
var nv = /* @__PURE__ */ p('<div class="flex items-center gap-3 text-[10px] text-surface-400 mr-2"><span> </span> <span> </span> <span> </span></div>'), iv = /* @__PURE__ */ p('<div class="text-[11px] text-health-err bg-health-err/10 rounded px-3 py-2"> </div>'), ov = /* @__PURE__ */ p(`<div class="rounded-lg border border-hecate-600/30 bg-surface-800/80 p-4 space-y-3"><h4 class="text-xs font-medium text-hecate-300 uppercase tracking-wider">New Work Item</h4> <div class="grid grid-cols-[1fr_auto] gap-3"><div><label for="item-title" class="text-[10px] text-surface-400 block mb-1">Title (desk name)</label> <input id="item-title" placeholder="e.g., register_user" class="w-full bg-surface-700 border border-surface-600 rounded px-2.5 py-1.5
							text-xs text-surface-100 placeholder-surface-400
							focus:outline-none focus:border-hecate-500/50"/></div> <div><label for="item-type" class="text-[10px] text-surface-400 block mb-1">Department</label> <select id="item-type" class="bg-surface-700 border border-surface-600 rounded px-2 py-1.5
							text-xs text-surface-100
							focus:outline-none focus:border-hecate-500/50 cursor-pointer"><option>CMD</option><option>PRJ</option><option>QRY</option></select></div></div> <div><label for="item-desc" class="text-[10px] text-surface-400 block mb-1">Description (optional)</label> <input id="item-desc" placeholder="Brief description of this desk" class="w-full bg-surface-700 border border-surface-600 rounded px-2.5 py-1.5
						text-xs text-surface-100 placeholder-surface-400
						focus:outline-none focus:border-hecate-500/50"/></div> <div class="flex gap-2"><button>Submit</button> <button class="px-3 py-1.5 rounded text-xs text-surface-400 hover:text-surface-100">Cancel</button></div></div>`), cv = /* @__PURE__ */ p('<div class="text-center py-8 text-surface-400 text-xs animate-pulse">Loading kanban board...</div>'), lv = /* @__PURE__ */ p('<div class="text-center py-12 text-surface-500 text-xs border border-dashed border-surface-600 rounded-lg"><div class="text-2xl mb-3 text-surface-400"></div> <p class="mb-1">No work items yet.</p> <p class="text-[10px] text-surface-500">Submit items from storming output, or add them manually above.</p></div>'), uv = /* @__PURE__ */ p('<p class="text-[10px] text-surface-400 mb-2 leading-relaxed"> </p>'), dv = /* @__PURE__ */ p('<div class="text-[9px] text-health-warn bg-health-warn/10 rounded px-2 py-1 mb-2"> </div>'), vv = /* @__PURE__ */ p(`<div class="rounded border border-surface-600 bg-surface-800/60 p-2.5 group"><div class="flex items-start gap-2 mb-1.5"><span class="text-xs font-medium text-surface-100 flex-1 leading-tight"> </span> <span> </span></div> <!> <!> <div class="flex items-center justify-between"><span class="text-[9px] text-surface-500"> </span> <button class="text-[10px] px-2 py-0.5 rounded bg-hecate-600/15 text-hecate-300
										hover:bg-hecate-600/25 transition-colors
										opacity-0 group-hover:opacity-100">Pick up</button></div></div>`), fv = /* @__PURE__ */ p('<p class="text-[10px] text-surface-400 mb-2 leading-relaxed"> </p>'), pv = /* @__PURE__ */ p('<div class="text-[9px] text-surface-400 mb-2"> </div>'), hv = /* @__PURE__ */ p(`<div class="rounded border border-surface-600 bg-surface-800/60 p-2.5 group"><div class="flex items-start gap-2 mb-1.5"><span class="text-xs font-medium text-surface-100 flex-1 leading-tight"> </span> <span> </span></div> <!> <!> <div class="flex items-center gap-1 justify-end
								opacity-0 group-hover:opacity-100 transition-opacity"><button class="text-[10px] px-2 py-0.5 rounded text-health-warn
										hover:bg-health-warn/10 transition-colors">Return</button> <button class="text-[10px] px-2 py-0.5 rounded bg-health-ok/15 text-health-ok
										hover:bg-health-ok/25 transition-colors">Complete</button></div></div>`), xv = /* @__PURE__ */ p('<div class="rounded border border-surface-600/50 bg-surface-800/30 p-2.5 opacity-70"><div class="flex items-start gap-2 mb-1"><span class="text-[10px] text-health-ok"></span> <span class="text-xs text-surface-300 flex-1 leading-tight"> </span> <span> </span></div> <div class="text-[9px] text-surface-500 ml-4"> </div></div>'), _v = /* @__PURE__ */ p('<div class="grid grid-cols-3 gap-3 min-h-[300px]"><div class="rounded-lg border border-surface-600 bg-surface-800/30"><div class="px-3 py-2 border-b border-surface-600 flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-hecate-400"></span> <span class="text-[11px] font-semibold text-surface-200">Ready</span> <span class="text-[10px] text-surface-500 ml-auto"> </span></div> <div class="p-2 space-y-2"></div></div> <div class="rounded-lg border border-surface-600 bg-surface-800/30"><div class="px-3 py-2 border-b border-surface-600 flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-phase-crafting"></span> <span class="text-[11px] font-semibold text-surface-200">In Progress</span> <span class="text-[10px] text-surface-500 ml-auto"> </span></div> <div class="p-2 space-y-2"></div></div> <div class="rounded-lg border border-surface-600 bg-surface-800/30"><div class="px-3 py-2 border-b border-surface-600 flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-health-ok"></span> <span class="text-[11px] font-semibold text-surface-200">Done</span> <span class="text-[10px] text-surface-500 ml-auto"> </span></div> <div class="p-2 space-y-2"></div></div></div>'), bv = /* @__PURE__ */ p(`<div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" role="dialog" aria-modal="true"><div class="bg-surface-800 border border-surface-600 rounded-xl p-5 w-96 space-y-3"><h4 class="text-sm font-semibold text-surface-100">Return Item</h4> <p class="text-[11px] text-surface-400">Returning <span class="text-surface-200 font-medium"> </span> to the Ready column.</p> <div><label for="return-reason" class="text-[10px] text-surface-400 block mb-1">Reason</label> <textarea id="return-reason" placeholder="Why is this item being returned?" rows="3" class="w-full bg-surface-700 border border-surface-600 rounded px-2.5 py-1.5
							text-xs text-surface-100 placeholder-surface-400
							focus:outline-none focus:border-health-warn/50 resize-none"></textarea></div> <div class="flex gap-2 justify-end"><button class="px-3 py-1.5 rounded text-xs text-surface-400 hover:text-surface-100">Cancel</button> <button>Return Item</button></div></div></div>`), gv = /* @__PURE__ */ p(`<div class="p-4 space-y-4"><div class="flex items-center justify-between"><div><h3 class="text-sm font-semibold text-surface-100">Kanban</h3> <p class="text-[11px] text-surface-400 mt-0.5">Work items for <span class="text-surface-200"> </span></p></div> <div class="flex items-center gap-2"><!> <button class="text-[11px] px-3 py-1 rounded bg-hecate-600/20 text-hecate-300
					hover:bg-hecate-600/30 transition-colors">+ Submit Item</button></div></div> <!> <!> <!> <!></div>`);
function Wi(e, t) {
  kt(t, !0);
  const r = () => $e(Ir, "$selectedDivision", _), a = () => $e(Wr, "$kanbanItems", _), o = () => $e(ev, "$itemCounts", _), l = () => $e(tr, "$kanbanError", _), u = () => $e(Ca, "$kanbanLoading", _), d = () => $e(Qd, "$readyItems", _), v = () => $e(Xd, "$inProgressItems", _), x = () => $e(Zd, "$doneItems", _), [_, g] = Rt();
  let E = /* @__PURE__ */ ne(null);
  Mt(() => {
    const te = r();
    te && te.division_id !== s(E) && (h(E, te.division_id, !0), Ds(te.division_id));
  });
  let P = /* @__PURE__ */ ne(!1), C = /* @__PURE__ */ ne(""), Q = /* @__PURE__ */ ne(""), S = /* @__PURE__ */ ne("cmd_desk"), I = /* @__PURE__ */ ne(null), z = /* @__PURE__ */ ne("");
  async function we() {
    if (!r() || !s(C).trim()) return;
    await tv(r().division_id, {
      title: s(C).trim(),
      description: s(Q).trim() || void 0,
      item_type: s(S),
      submitted_by: "hecate-web"
    }) && (h(C, ""), h(Q, ""), h(P, !1));
  }
  async function he(te) {
    r() && await rv(r().division_id, te.item_id);
  }
  async function Pe(te) {
    r() && await sv(r().division_id, te.item_id);
  }
  function ue(te) {
    h(I, te, !0), h(z, "");
  }
  async function Le() {
    if (!r() || !s(I) || !s(z).trim()) return;
    await av(r().division_id, s(I).item_id, s(z).trim()) && (h(I, null), h(z, ""));
  }
  function ge(te) {
    switch (te) {
      case "cmd_desk":
        return "CMD";
      case "prj_desk":
        return "PRJ";
      case "qry_desk":
        return "QRY";
      default:
        return te;
    }
  }
  function Ke(te) {
    switch (te) {
      case "cmd_desk":
        return "bg-es-command/20 text-es-command";
      case "prj_desk":
        return "bg-phase-crafting/20 text-phase-crafting";
      case "qry_desk":
        return "bg-hecate-600/20 text-hecate-400";
      default:
        return "bg-surface-600 text-surface-300";
    }
  }
  function xe(te) {
    return te ? new Date(te).toLocaleDateString(void 0, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }) : "";
  }
  var Me = gv(), Ne = i(Me), Ye = i(Ne), Je = c(i(Ye), 2), fe = c(i(Je)), y = i(fe, !0);
  n(fe), n(Je), n(Ye);
  var ee = c(Ye, 2), je = i(ee);
  {
    var We = (te) => {
      var w = nv(), k = i(w), F = i(k);
      n(k);
      var re = c(k, 2), ye = i(re);
      n(re);
      var Z = c(re, 2), K = i(Z);
      n(Z), n(w), D(() => {
        m(F, `${o().ready ?? ""} ready`), m(ye, `${o().in_progress ?? ""} active`), m(K, `${o().done ?? ""} done`);
      }), f(te, w);
    };
    R(je, (te) => {
      a().length > 0 && te(We);
    });
  }
  var Ae = c(je, 2);
  Ae.__click = () => h(P, !s(P)), n(ee), n(Ne);
  var ke = c(Ne, 2);
  {
    var me = (te) => {
      var w = iv(), k = i(w, !0);
      n(w), D(() => m(k, l())), f(te, w);
    };
    R(ke, (te) => {
      l() && te(me);
    });
  }
  var oe = c(ke, 2);
  {
    var _e = (te) => {
      var w = ov(), k = c(i(w), 2), F = i(k), re = c(i(F), 2);
      dt(re), n(F);
      var ye = c(F, 2), Z = c(i(ye), 2), K = i(Z);
      K.value = K.__value = "cmd_desk";
      var be = c(K);
      be.value = be.__value = "prj_desk";
      var T = c(be);
      T.value = T.__value = "qry_desk", n(Z), n(ye), n(k);
      var j = c(k, 2), V = c(i(j), 2);
      dt(V), n(j);
      var le = c(j, 2), de = i(le);
      de.__click = we;
      var ie = c(de, 2);
      ie.__click = () => h(P, !1), n(le), n(w), D(
        (G, Re) => {
          de.disabled = G, Ve(de, 1, `px-3 py-1.5 rounded text-xs transition-colors
						${Re ?? ""}`);
        },
        [
          () => !s(C).trim(),
          () => s(C).trim() ? "bg-hecate-600/20 text-hecate-300 hover:bg-hecate-600/30" : "bg-surface-700 text-surface-500 cursor-not-allowed"
        ]
      ), ot(re, () => s(C), (G) => h(C, G)), ys(Z, () => s(S), (G) => h(S, G)), ot(V, () => s(Q), (G) => h(Q, G)), f(te, w);
    };
    R(oe, (te) => {
      s(P) && te(_e);
    });
  }
  var ce = c(oe, 2);
  {
    var Ee = (te) => {
      var w = cv();
      f(te, w);
    }, L = (te) => {
      var w = lv(), k = i(w);
      k.textContent = "☐", xt(4), n(w), f(te, w);
    }, H = (te) => {
      var w = _v(), k = i(w), F = i(k), re = c(i(F), 4), ye = i(re, !0);
      n(re), n(F);
      var Z = c(F, 2);
      ze(Z, 5, d, (se) => se.item_id, (se, U) => {
        var Oe = vv(), Te = i(Oe), ae = i(Te), B = i(ae, !0);
        n(ae);
        var J = c(ae, 2), X = i(J, !0);
        n(J), n(Te);
        var pe = c(Te, 2);
        {
          var b = (M) => {
            var q = uv(), ve = i(q, !0);
            n(q), D(() => m(ve, s(U).description)), f(M, q);
          };
          R(pe, (M) => {
            s(U).description && M(b);
          });
        }
        var $ = c(pe, 2);
        {
          var O = (M) => {
            var q = dv(), ve = i(q);
            n(q), D(() => m(ve, `Returned: ${s(U).return_reason ?? ""}`)), f(M, q);
          };
          R($, (M) => {
            s(U).return_reason && M(O);
          });
        }
        var A = c($, 2), N = i(A), Y = i(N, !0);
        n(N);
        var W = c(N, 2);
        W.__click = () => he(s(U)), n(A), n(Oe), D(
          (M, q, ve) => {
            m(B, s(U).title), Ve(J, 1, `text-[9px] px-1.5 py-0.5 rounded ${M ?? ""} shrink-0`), m(X, q), m(Y, ve);
          },
          [
            () => Ke(s(U).item_type),
            () => ge(s(U).item_type),
            () => xe(s(U).submitted_at)
          ]
        ), f(se, Oe);
      }), n(Z), n(k);
      var K = c(k, 2), be = i(K), T = c(i(be), 4), j = i(T, !0);
      n(T), n(be);
      var V = c(be, 2);
      ze(V, 5, v, (se) => se.item_id, (se, U) => {
        var Oe = hv(), Te = i(Oe), ae = i(Te), B = i(ae, !0);
        n(ae);
        var J = c(ae, 2), X = i(J, !0);
        n(J), n(Te);
        var pe = c(Te, 2);
        {
          var b = (W) => {
            var M = fv(), q = i(M, !0);
            n(M), D(() => m(q, s(U).description)), f(W, M);
          };
          R(pe, (W) => {
            s(U).description && W(b);
          });
        }
        var $ = c(pe, 2);
        {
          var O = (W) => {
            var M = pv(), q = i(M);
            n(M), D(() => m(q, `Picked by ${s(U).picked_by ?? ""}`)), f(W, M);
          };
          R($, (W) => {
            s(U).picked_by && W(O);
          });
        }
        var A = c($, 2), N = i(A);
        N.__click = () => ue(s(U));
        var Y = c(N, 2);
        Y.__click = () => Pe(s(U)), n(A), n(Oe), D(
          (W, M) => {
            m(B, s(U).title), Ve(J, 1, `text-[9px] px-1.5 py-0.5 rounded ${W ?? ""} shrink-0`), m(X, M);
          },
          [
            () => Ke(s(U).item_type),
            () => ge(s(U).item_type)
          ]
        ), f(se, Oe);
      }), n(V), n(K);
      var le = c(K, 2), de = i(le), ie = c(i(de), 4), G = i(ie, !0);
      n(ie), n(de);
      var Re = c(de, 2);
      ze(Re, 5, x, (se) => se.item_id, (se, U) => {
        var Oe = xv(), Te = i(Oe), ae = i(Te);
        ae.textContent = "✓";
        var B = c(ae, 2), J = i(B, !0);
        n(B);
        var X = c(B, 2), pe = i(X, !0);
        n(X), n(Te);
        var b = c(Te, 2), $ = i(b, !0);
        n(b), n(Oe), D(
          (O, A, N) => {
            m(J, s(U).title), Ve(X, 1, `text-[9px] px-1.5 py-0.5 rounded ${O ?? ""} shrink-0`), m(pe, A), m($, N);
          },
          [
            () => Ke(s(U).item_type),
            () => ge(s(U).item_type),
            () => xe(s(U).completed_at)
          ]
        ), f(se, Oe);
      }), n(Re), n(le), n(w), D(() => {
        m(ye, d().length), m(j, v().length), m(G, x().length);
      }), f(te, w);
    };
    R(ce, (te) => {
      u() ? te(Ee) : a().length === 0 && !s(P) ? te(L, 1) : te(H, !1);
    });
  }
  var De = c(ce, 2);
  {
    var He = (te) => {
      var w = bv(), k = i(w), F = c(i(k), 2), re = c(i(F)), ye = i(re, !0);
      n(re), xt(), n(F);
      var Z = c(F, 2), K = c(i(Z), 2);
      Ys(K), n(Z);
      var be = c(Z, 2), T = i(be);
      T.__click = () => h(I, null);
      var j = c(T, 2);
      j.__click = Le, n(be), n(k), n(w), D(
        (V, le) => {
          m(ye, s(I).title), j.disabled = V, Ve(j, 1, `px-3 py-1.5 rounded text-xs transition-colors
							${le ?? ""}`);
        },
        [
          () => !s(z).trim(),
          () => s(z).trim() ? "bg-health-warn/20 text-health-warn hover:bg-health-warn/30" : "bg-surface-700 text-surface-500 cursor-not-allowed"
        ]
      ), ot(K, () => s(z), (V) => h(z, V)), f(te, w);
    };
    R(De, (te) => {
      s(I) && te(He);
    });
  }
  n(Me), D(() => m(y, r()?.context_name)), f(e, Me), Et(), g();
}
Nt(["click"]);
Dt(Wi, {}, [], [], { mode: "open" });
const qi = Xe(null);
async function mv(e, t) {
  try {
    return await Ge().post(`/craftings/${e}/generate-module`, t), !0;
  } catch (r) {
    const a = r;
    return qi.set(a.message || "Failed to generate module"), !1;
  }
}
async function yv(e, t) {
  try {
    return await Ge().post(`/craftings/${e}/deliver-release`, { version: t }), !0;
  } catch (r) {
    const a = r;
    return qi.set(a.message || "Failed to deliver release"), !1;
  }
}
var wv = /* @__PURE__ */ p(`<div class="flex gap-2 items-end mb-4 p-3 rounded bg-surface-700/30"><div class="flex-1"><label for="mod-name" class="text-[10px] text-surface-400 block mb-1">Module Name</label> <input id="mod-name" placeholder="e.g., register_user_v1" class="w-full bg-surface-700 border border-surface-600 rounded
								px-2.5 py-1.5 text-xs text-surface-100 placeholder-surface-400
								focus:outline-none focus:border-hecate-500/50"/></div> <div class="flex-1"><label for="mod-template" class="text-[10px] text-surface-400 block mb-1">Template (optional)</label> <input id="mod-template" placeholder="e.g., command, event, handler" class="w-full bg-surface-700 border border-surface-600 rounded
								px-2.5 py-1.5 text-xs text-surface-100 placeholder-surface-400
								focus:outline-none focus:border-hecate-500/50"/></div> <button class="px-3 py-1.5 rounded text-xs bg-hecate-600/20 text-hecate-300
							hover:bg-hecate-600/30 transition-colors disabled:opacity-50">Generate</button> <button class="px-3 py-1.5 rounded text-xs text-surface-400 hover:text-surface-100">Cancel</button></div>`), $v = /* @__PURE__ */ p(
  `<div class="rounded-lg border border-surface-600 bg-surface-800/50 p-4"><div class="flex items-center justify-between mb-3"><h4 class="text-xs font-semibold text-surface-100">Code Generation</h4> <button class="text-[10px] px-2 py-0.5 rounded bg-hecate-600/10 text-hecate-300
						hover:bg-hecate-600/20 transition-colors">+ Generate Module</button></div> <!> <p class="text-[10px] text-surface-400">Generate Erlang modules from templates based on planned desks and design
				artifacts.</p></div> <div><h4 class="text-xs font-semibold text-surface-100 mb-3">Implementation Tasks</h4> <div class="grid grid-cols-1 md:grid-cols-2 gap-3"><!> <!> <!> <!> <!> <!></div></div>`,
  1
), kv = /* @__PURE__ */ p(`<div class="flex gap-2 items-end mb-4 p-3 rounded bg-surface-700/30"><div class="flex-1"><label for="rel-version" class="text-[10px] text-surface-400 block mb-1">Version</label> <input id="rel-version" placeholder="e.g., 0.1.0" class="w-full bg-surface-700 border border-surface-600 rounded
								px-2.5 py-1.5 text-xs text-surface-100 placeholder-surface-400
								focus:outline-none focus:border-hecate-500/50"/></div> <button class="px-3 py-1.5 rounded text-xs bg-hecate-600/20 text-hecate-300
							hover:bg-hecate-600/30 transition-colors disabled:opacity-50">Deliver</button> <button class="px-3 py-1.5 rounded text-xs text-surface-400 hover:text-surface-100">Cancel</button></div>`), Ev = /* @__PURE__ */ p(
  `<div class="rounded-lg border border-surface-600 bg-surface-800/50 p-4"><div class="flex items-center justify-between mb-3"><h4 class="text-xs font-semibold text-surface-100">Releases</h4> <button class="text-[10px] px-2 py-0.5 rounded bg-hecate-600/10 text-hecate-300
						hover:bg-hecate-600/20 transition-colors">+ Deliver Release</button></div> <!> <p class="text-[10px] text-surface-400">Deliver through GitOps: version bump, git tag, CI/CD builds and deploys.</p></div> <div><h4 class="text-xs font-semibold text-surface-100 mb-3">Delivery Tasks</h4> <div class="grid grid-cols-1 md:grid-cols-2 gap-3"><!> <!> <!> <!></div></div>`,
  1
), Cv = /* @__PURE__ */ p('<div class="p-4 space-y-6"><div class="flex items-center justify-between"><div><h3 class="text-sm font-semibold text-surface-100">Crafting</h3> <p class="text-[11px] text-surface-400 mt-0.5">Generate code, run tests, and deliver releases for <span class="text-surface-200"> </span></p></div> <div class="flex items-center gap-1 bg-surface-700/50 rounded-lg p-0.5"><button>Implementation</button> <button>Delivery</button></div></div> <!></div>');
function zi(e, t) {
  kt(t, !0);
  const r = () => $e(Ir, "$selectedDivision", o), a = () => $e(pt, "$isLoading", o), [o, l] = Rt();
  let u = /* @__PURE__ */ ne("implement"), d = /* @__PURE__ */ ne(!1), v = /* @__PURE__ */ ne(""), x = /* @__PURE__ */ ne(""), _ = /* @__PURE__ */ ne(!1), g = /* @__PURE__ */ ne("");
  async function E() {
    if (!r() || !s(v).trim()) return;
    await mv(r().division_id, {
      module_name: s(v).trim(),
      template: s(x).trim() || void 0
    }) && (h(v, ""), h(x, ""), h(d, !1));
  }
  async function P() {
    if (!r() || !s(g).trim()) return;
    await yv(r().division_id, s(g).trim()) && (h(g, ""), h(_, !1));
  }
  var C = Cv(), Q = i(C), S = i(Q), I = c(i(S), 2), z = c(i(I)), we = i(z, !0);
  n(z), n(I), n(S);
  var he = c(S, 2), Pe = i(he);
  Pe.__click = () => h(u, "implement");
  var ue = c(Pe, 2);
  ue.__click = () => h(u, "deliver"), n(he), n(Q);
  var Le = c(Q, 2);
  {
    var ge = (xe) => {
      var Me = $v(), Ne = nt(Me), Ye = i(Ne), Je = c(i(Ye), 2);
      Je.__click = () => h(d, !s(d)), n(Ye);
      var fe = c(Ye, 2);
      {
        var y = (ce) => {
          var Ee = wv(), L = i(Ee), H = c(i(L), 2);
          dt(H), n(L);
          var De = c(L, 2), He = c(i(De), 2);
          dt(He), n(De);
          var te = c(De, 2);
          te.__click = E;
          var w = c(te, 2);
          w.__click = () => h(d, !1), n(Ee), D((k) => te.disabled = k, [() => !s(v).trim() || a()]), ot(H, () => s(v), (k) => h(v, k)), ot(He, () => s(x), (k) => h(x, k)), f(ce, Ee);
        };
        R(fe, (ce) => {
          s(d) && ce(y);
        });
      }
      xt(2), n(Ne);
      var ee = c(Ne, 2), je = c(i(ee), 2), We = i(je);
      {
        let ce = /* @__PURE__ */ Ce(() => `Help me implement the walking skeleton for the "${r()?.context_name}" division. We need initiate_{aggregate} and archive_{aggregate} desks first. Generate the Erlang module structure for each.`);
        lt(We, {
          title: "Walking Skeleton",
          description: "Generate initiate + archive desks first, establishing the aggregate lifecycle foundation",
          icon: "⚲",
          get aiContext() {
            return s(ce);
          }
        });
      }
      var Ae = c(We, 2);
      {
        let ce = /* @__PURE__ */ Ce(() => `Help me generate Erlang command modules for the "${r()?.context_name}" division. Each command needs: module, record, to_map/1, from_map/1. Use the evoq command pattern.`);
        lt(Ae, {
          title: "Generate Commands",
          description: "Create command modules from the desk inventory with proper versioning",
          icon: "▶",
          get aiContext() {
            return s(ce);
          }
        });
      }
      var ke = c(Ae, 2);
      {
        let ce = /* @__PURE__ */ Ce(() => `Help me generate Erlang event modules for the "${r()?.context_name}" division. Each event needs: module, record, to_map/1, from_map/1. Follow the event naming convention: {subject}_{verb_past}_v{N}.`);
        lt(ke, {
          title: "Generate Events",
          description: "Create event modules matching the designed domain events",
          icon: "◆",
          get aiContext() {
            return s(ce);
          }
        });
      }
      var me = c(ke, 2);
      {
        let ce = /* @__PURE__ */ Ce(() => `Help me write EUnit tests for the "${r()?.context_name}" division. Cover aggregate behavior (execute + apply), handler dispatch, and projection state updates.`);
        lt(me, {
          title: "Write Tests",
          description: "Generate EUnit test modules for aggregates, handlers, and projections",
          icon: "✓",
          get aiContext() {
            return s(ce);
          }
        });
      }
      var oe = c(me, 2);
      {
        let ce = /* @__PURE__ */ Ce(() => `Help me analyze test results for the "${r()?.context_name}" division. What patterns should I look for? How do I ensure adequate coverage of the aggregate lifecycle?`);
        lt(oe, {
          title: "Run Test Suite",
          description: "Execute all tests and review results for quality gates",
          icon: "▷",
          get aiContext() {
            return s(ce);
          }
        });
      }
      var _e = c(oe, 2);
      {
        let ce = /* @__PURE__ */ Ce(() => `Help me define acceptance criteria for the "${r()?.context_name}" division. What must be true before we can say this division is implemented correctly?`);
        lt(_e, {
          title: "Acceptance Criteria",
          description: "Validate that implementation meets the design specifications",
          icon: "☑",
          get aiContext() {
            return s(ce);
          }
        });
      }
      n(je), n(ee), f(xe, Me);
    }, Ke = (xe) => {
      var Me = Ev(), Ne = nt(Me), Ye = i(Ne), Je = c(i(Ye), 2);
      Je.__click = () => h(_, !s(_)), n(Ye);
      var fe = c(Ye, 2);
      {
        var y = (oe) => {
          var _e = kv(), ce = i(_e), Ee = c(i(ce), 2);
          dt(Ee), n(ce);
          var L = c(ce, 2);
          L.__click = P;
          var H = c(L, 2);
          H.__click = () => h(_, !1), n(_e), D((De) => L.disabled = De, [() => !s(g).trim() || a()]), ot(Ee, () => s(g), (De) => h(g, De)), f(oe, _e);
        };
        R(fe, (oe) => {
          s(_) && oe(y);
        });
      }
      xt(2), n(Ne);
      var ee = c(Ne, 2), je = c(i(ee), 2), We = i(je);
      {
        let oe = /* @__PURE__ */ Ce(() => `Help me prepare a release for the "${r()?.context_name}" division. Walk me through the GitOps flow: version bump, CHANGELOG update, git tag, and CI/CD pipeline.`);
        lt(We, {
          title: "Release Management",
          description: "Prepare release: version bump, changelog, git tag, push for CI/CD",
          icon: "↑",
          get aiContext() {
            return s(oe);
          }
        });
      }
      var Ae = c(We, 2);
      {
        let oe = /* @__PURE__ */ Ce(() => `Help me plan a staged rollout for the "${r()?.context_name}" division. How should we structure canary deployments with health gates on the beam cluster?`);
        lt(Ae, {
          title: "Staged Rollout",
          description: "Plan a staged rollout with canary deployment and health gates",
          icon: "▤",
          get aiContext() {
            return s(oe);
          }
        });
      }
      var ke = c(Ae, 2);
      {
        let oe = /* @__PURE__ */ Ce(() => `Help me set up health monitoring for the "${r()?.context_name}" division. What health checks should we configure? What SLA thresholds make sense?`);
        lt(ke, {
          title: "Health Monitoring",
          description: "Configure health checks and SLA thresholds",
          icon: "♥",
          get aiContext() {
            return s(oe);
          }
        });
      }
      var me = c(ke, 2);
      {
        let oe = /* @__PURE__ */ Ce(() => `Help me set up observability for the "${r()?.context_name}" division. What should we log? What metrics should we track? How do we set up distributed tracing on the beam cluster?`);
        lt(me, {
          title: "Observability",
          description: "Set up logging, metrics, and tracing for production visibility",
          icon: "◎",
          get aiContext() {
            return s(oe);
          }
        });
      }
      n(je), n(ee), f(xe, Me);
    };
    R(Le, (xe) => {
      s(u) === "implement" ? xe(ge) : xe(Ke, !1);
    });
  }
  n(C), D(() => {
    m(we, r()?.context_name), Ve(Pe, 1, `px-3 py-1 rounded text-[11px] transition-colors
					${s(u) === "implement" ? "bg-surface-600 text-surface-100" : "text-surface-400 hover:text-surface-200"}`), Ve(ue, 1, `px-3 py-1 rounded text-[11px] transition-colors
					${s(u) === "deliver" ? "bg-surface-600 text-surface-100" : "text-surface-400 hover:text-surface-200"}`);
  }), f(e, C), Et(), l();
}
Nt(["click"]);
Dt(zi, {}, [], [], { mode: "open" });
var Sv = /* @__PURE__ */ p("<div></div>"), Av = /* @__PURE__ */ p("<!> <button><span> </span> <span> </span></button>", 1), Dv = /* @__PURE__ */ p('<span class="text-[10px] text-surface-500 mr-1">Pending</span>'), Pv = /* @__PURE__ */ p("<button> </button>"), Iv = /* @__PURE__ */ p(`<div class="border-b border-surface-600 bg-surface-800/30 px-4 py-2 shrink-0"><div class="flex items-center gap-1"><!> <div class="flex-1"></div> <span class="text-[10px] text-surface-400 mr-2"> </span> <!> <button class="text-[10px] px-2 py-0.5 rounded text-hecate-400
					hover:bg-hecate-600/20 transition-colors ml-1" title="Open AI Assistant"></button></div></div>`);
function Ui(e, t) {
  kt(t, !0);
  const r = () => $e(Ir, "$selectedDivision", l), a = () => $e(as, "$selectedPhase", l), o = () => $e(gr, "$isLoading", l), [l, u] = Rt();
  let d = /* @__PURE__ */ Ce(() => r() ? ga(r(), a()) : []);
  function v(I) {
    as.set(I);
  }
  function x(I, z) {
    switch (I) {
      case "storming":
        return "border-es-event text-es-event";
      case "planning":
        return "border-phase-planning text-phase-planning";
      case "kanban":
        return "border-hecate-400 text-hecate-400";
      case "crafting":
        return "border-phase-crafting text-phase-crafting";
    }
  }
  function _(I, z) {
    return I ? z.length === 0 ? { icon: "✓", css: "text-health-ok" } : z.includes("resume") ? { icon: "◐", css: "text-health-warn" } : z.includes("shelve") || z.includes("conclude") || z.includes("archive") ? { icon: "●", css: "text-hecate-400 animate-pulse" } : z.includes("open") ? { icon: "○", css: "text-surface-300" } : { icon: "○", css: "text-surface-500" } : { icon: "○", css: "text-surface-500" };
  }
  function g(I) {
    switch (I) {
      case "open":
        return "bg-hecate-600/20 text-hecate-300 hover:bg-hecate-600/30";
      case "shelve":
        return "text-surface-400 hover:text-health-warn hover:bg-surface-700";
      case "conclude":
        return "text-surface-400 hover:text-health-ok hover:bg-surface-700";
      case "resume":
        return "bg-health-warn/10 text-health-warn hover:bg-health-warn/20";
      case "archive":
        return "text-surface-400 hover:text-surface-200 hover:bg-surface-700";
      default:
        return "text-surface-400 hover:bg-surface-700";
    }
  }
  function E(I) {
    return I.charAt(0).toUpperCase() + I.slice(1);
  }
  async function P(I) {
    if (!r()) return;
    const z = r().division_id, we = a();
    switch (I) {
      case "open":
        await Dc(z, we);
        break;
      case "shelve":
        await Pc(z, we);
        break;
      case "resume":
        await Ic(z, we);
        break;
      case "conclude":
        await Tc(z, we);
        break;
    }
  }
  var C = br(), Q = nt(C);
  {
    var S = (I) => {
      var z = Iv(), we = i(z), he = i(we);
      ze(he, 17, () => Or, it, (Me, Ne, Ye) => {
        const Je = /* @__PURE__ */ Ce(() => ba(r(), s(Ne).code)), fe = /* @__PURE__ */ Ce(() => ga(r(), s(Ne).code)), y = /* @__PURE__ */ Ce(() => a() === s(Ne).code), ee = /* @__PURE__ */ Ce(() => {
          const { icon: L, css: H } = _(s(Je), s(fe));
          return { icon: L, css: H };
        }), je = /* @__PURE__ */ Ce(() => s(Je) && s(fe).length === 0);
        var We = Av(), Ae = nt(We);
        {
          var ke = (L) => {
            var H = Sv();
            D(() => Ve(H, 1, `w-4 h-px ${s(je) ? "bg-health-ok/40" : "bg-surface-600"}`)), f(L, H);
          };
          R(Ae, (L) => {
            Ye > 0 && L(ke);
          });
        }
        var me = c(Ae, 2);
        me.__click = () => v(s(Ne).code);
        var oe = i(me), _e = i(oe, !0);
        n(oe);
        var ce = c(oe, 2), Ee = i(ce, !0);
        n(ce), n(me), D(
          (L) => {
            Ve(me, 1, `flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-all
						border
						${L ?? ""}`), Ve(oe, 1, `${s(ee).css ?? ""} text-[10px]`), m(_e, s(ee).icon), m(Ee, s(Ne).shortName);
          },
          [
            () => s(y) ? `bg-surface-700 border-current ${x(s(Ne).code)}` : "border-transparent text-surface-400 hover:text-surface-200 hover:bg-surface-700/50"
          ]
        ), f(Me, We);
      });
      var Pe = c(he, 4), ue = i(Pe, !0);
      n(Pe);
      var Le = c(Pe, 2);
      {
        var ge = (Me) => {
          const Ne = /* @__PURE__ */ Ce(() => ba(r(), a()));
          var Ye = br(), Je = nt(Ye);
          {
            var fe = (y) => {
              var ee = Dv();
              f(y, ee);
            };
            R(Je, (y) => {
              s(Ne) || y(fe);
            });
          }
          f(Me, Ye);
        }, Ke = (Me) => {
          var Ne = br(), Ye = nt(Ne);
          ze(Ye, 17, () => s(d), it, (Je, fe) => {
            var y = Pv();
            y.__click = () => P(s(fe));
            var ee = i(y, !0);
            n(y), D(
              (je, We) => {
                y.disabled = o(), Ve(y, 1, `text-[10px] px-2 py-0.5 rounded transition-colors disabled:opacity-50
							${je ?? ""}`), m(ee, We);
              },
              [
                () => g(s(fe)),
                () => E(s(fe))
              ]
            ), f(Je, y);
          }), f(Me, Ne);
        };
        R(Le, (Me) => {
          s(d).length === 0 ? Me(ge) : Me(Ke, !1);
        });
      }
      var xe = c(Le, 2);
      xe.__click = () => vr(`Help with ${Or.find((Me) => Me.code === a())?.name} phase for division "${r()?.context_name}"`), xe.textContent = "✦ AI Assist", n(we), n(z), D((Me) => m(ue, Me), [() => Or.find((Me) => Me.code === a())?.name]), f(I, z);
    };
    R(Q, (I) => {
      r() && I(S);
    });
  }
  f(e, C), Et(), u();
}
Nt(["click"]);
Dt(Ui, {}, [], [], { mode: "open" });
var Tv = /* @__PURE__ */ p('<span class="text-[9px] text-surface-500"> </span>'), Mv = /* @__PURE__ */ p('<div class="flex items-center justify-center h-full"><div class="text-center text-surface-400"><div class="text-sm mb-2 animate-pulse">...</div> <div class="text-[10px]">Loading events</div></div></div>'), Nv = /* @__PURE__ */ p('<div class="flex items-center justify-center h-full"><div class="text-center text-surface-500 text-xs">Select a venture to view its event stream.</div></div>'), Rv = /* @__PURE__ */ p('<div class="flex items-center justify-center h-full"><div class="text-center text-surface-500"><div class="text-lg mb-2"></div> <div class="text-xs">No events recorded yet.</div> <div class="text-[10px] mt-1">Events will appear here as the venture progresses.</div></div></div>'), Lv = /* @__PURE__ */ p('<span class="text-[9px] px-1 py-0.5 rounded bg-surface-700 text-surface-400 shrink-0"> </span>'), Ov = /* @__PURE__ */ p('<span class="text-[9px] text-surface-500 shrink-0 tabular-nums"> </span>'), Fv = /* @__PURE__ */ p(`<div class="px-4 pb-3 pt-0 ml-5"><pre class="text-[10px] text-surface-300 bg-surface-800 border border-surface-600
									rounded p-3 overflow-x-auto whitespace-pre-wrap break-words
									font-mono leading-relaxed"> </pre></div>`), Vv = /* @__PURE__ */ p(`<div class="group"><button class="w-full text-left px-4 py-2 flex items-start gap-2
								hover:bg-surface-700/30 transition-colors"><span class="text-[9px] text-surface-500 mt-0.5 shrink-0 w-3"> </span> <span> </span> <!> <!></button> <!></div>`), jv = /* @__PURE__ */ p('<div class="p-3 border-t border-surface-700/50"><button> </button></div>'), Bv = /* @__PURE__ */ p('<div class="divide-y divide-surface-700/50"></div> <!>', 1), Hv = /* @__PURE__ */ p('<div class="flex flex-col h-full"><div class="border-b border-surface-600 bg-surface-800/50 px-4 py-2 shrink-0"><div class="flex items-center gap-2"><span class="text-xs text-surface-400">Event Stream</span> <!> <div class="flex-1"></div> <button title="Refresh events"> </button></div></div> <div class="flex-1 overflow-y-auto"><!></div></div>');
function Sa(e, t) {
  kt(t, !0);
  const r = () => $e(Xa, "$ventureRawEvents", o), a = () => $e(gt, "$activeVenture", o), [o, l] = Rt(), u = 50;
  let d = /* @__PURE__ */ ne(!1), v = /* @__PURE__ */ ne(0), x = /* @__PURE__ */ ne(0), _ = /* @__PURE__ */ ne(Wt(/* @__PURE__ */ new Set())), g = /* @__PURE__ */ Ce(() => s(x) + u < s(v)), E = /* @__PURE__ */ Ce(r);
  async function P(y, ee = !0) {
    h(d, !0), ee && (h(x, 0), h(_, /* @__PURE__ */ new Set(), !0));
    try {
      const je = await xn(y, s(x), u);
      h(v, je.count, !0);
    } finally {
      h(d, !1);
    }
  }
  async function C() {
    const y = a();
    if (!(!y || s(d))) {
      h(x, s(x) + u), h(d, !0);
      try {
        const ee = await xn(y.venture_id, s(x), u);
        h(v, ee.count, !0);
      } finally {
        h(d, !1);
      }
    }
  }
  function Q(y) {
    const ee = new Set(s(_));
    ee.has(y) ? ee.delete(y) : ee.add(y), h(_, ee, !0);
  }
  function S(y) {
    return y.startsWith("venture_") || y.startsWith("big_picture_storm_") ? "text-hecate-400" : y.startsWith("event_sticky_") ? "text-es-event" : y.startsWith("event_stack_") || y.startsWith("event_cluster_") ? "text-success-400" : y.startsWith("fact_arrow_") ? "text-sky-400" : y.startsWith("storm_phase_") ? "text-accent-400" : "text-surface-400";
  }
  function I(y) {
    if (!y) return "";
    const ee = typeof y == "string" ? Number(y) || new Date(y).getTime() : y;
    if (isNaN(ee)) return "";
    const je = new Date(ee), Ae = Date.now() - ee, ke = Math.floor(Ae / 1e3);
    if (ke < 60) return `${ke}s ago`;
    const me = Math.floor(ke / 60);
    if (me < 60) return `${me}m ago`;
    const oe = Math.floor(me / 60);
    if (oe < 24) return `${oe}h ago`;
    const _e = Math.floor(oe / 24);
    return _e < 7 ? `${_e}d ago` : je.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  function z(y) {
    try {
      return JSON.stringify(y, null, 2);
    } catch {
      return String(y);
    }
  }
  Mt(() => {
    const y = a();
    y && P(y.venture_id);
  });
  var we = Hv(), he = i(we), Pe = i(he), ue = c(i(Pe), 2);
  {
    var Le = (y) => {
      var ee = Tv(), je = i(ee);
      n(ee), D(() => m(je, `${s(E).length ?? ""}${s(v) > s(E).length ? ` / ${s(v)}` : ""} events`)), f(y, ee);
    };
    R(ue, (y) => {
      s(E).length > 0 && y(Le);
    });
  }
  var ge = c(ue, 4);
  ge.__click = () => {
    const y = a();
    y && P(y.venture_id);
  };
  var Ke = i(ge, !0);
  n(ge), n(Pe), n(he);
  var xe = c(he, 2), Me = i(xe);
  {
    var Ne = (y) => {
      var ee = Mv();
      f(y, ee);
    }, Ye = (y) => {
      var ee = Nv();
      f(y, ee);
    }, Je = (y) => {
      var ee = Rv(), je = i(ee), We = i(je);
      We.textContent = "○", xt(4), n(je), n(ee), f(y, ee);
    }, fe = (y) => {
      var ee = Bv(), je = nt(ee);
      ze(je, 21, () => s(E), it, (ke, me, oe) => {
        const _e = /* @__PURE__ */ Ce(() => s(_).has(oe)), ce = /* @__PURE__ */ Ce(() => S(s(me).event_type));
        var Ee = Vv(), L = i(Ee);
        L.__click = () => Q(oe);
        var H = i(L), De = i(H, !0);
        n(H);
        var He = c(H, 2), te = i(He, !0);
        n(He);
        var w = c(He, 2);
        {
          var k = (K) => {
            var be = Lv(), T = i(be);
            n(be), D(() => m(T, `v${s(me).version ?? ""}`)), f(K, be);
          };
          R(w, (K) => {
            s(me).version !== void 0 && K(k);
          });
        }
        var F = c(w, 2);
        {
          var re = (K) => {
            var be = Ov(), T = i(be, !0);
            n(be), D((j) => m(T, j), [() => I(s(me).timestamp)]), f(K, be);
          };
          R(F, (K) => {
            s(me).timestamp && K(re);
          });
        }
        n(L);
        var ye = c(L, 2);
        {
          var Z = (K) => {
            var be = Fv(), T = i(be), j = i(T, !0);
            n(T), n(be), D((V) => m(j, V), [() => z(s(me).data)]), f(K, be);
          };
          R(ye, (K) => {
            s(_e) && K(Z);
          });
        }
        n(Ee), D(() => {
          m(De, s(_e) ? "▾" : "▸"), Ve(He, 1, `text-[11px] font-mono ${s(ce) ?? ""} flex-1 min-w-0 truncate`), m(te, s(me).event_type);
        }), f(ke, Ee);
      }), n(je);
      var We = c(je, 2);
      {
        var Ae = (ke) => {
          var me = jv(), oe = i(me);
          oe.__click = C;
          var _e = i(oe, !0);
          n(oe), n(me), D(() => {
            oe.disabled = s(d), Ve(oe, 1, `w-full text-[10px] py-1.5 rounded transition-colors
							${s(d) ? "bg-surface-700 text-surface-500 cursor-not-allowed" : "bg-surface-700 text-surface-300 hover:text-surface-100 hover:bg-surface-600"}`), m(_e, s(d) ? "Loading..." : `Load More (${s(v) - s(E).length} remaining)`);
          }), f(ke, me);
        };
        R(We, (ke) => {
          s(g) && ke(Ae);
        });
      }
      f(y, ee);
    };
    R(Me, (y) => {
      s(d) && s(E).length === 0 ? y(Ne) : a() ? s(E).length === 0 ? y(Je, 2) : y(fe, !1) : y(Ye, 1);
    });
  }
  n(xe), n(we), D(() => {
    ge.disabled = s(d) || !a(), Ve(ge, 1, `text-[10px] px-2 py-0.5 rounded transition-colors
					${s(d) || !a() ? "text-surface-500 cursor-not-allowed" : "text-surface-400 hover:text-surface-200 hover:bg-surface-700"}`), m(Ke, s(d) ? "Loading..." : "Refresh");
  }), f(e, we), Et(), l();
}
Nt(["click"]);
Dt(Sa, {}, [], [], { mode: "open" });
var Wv = /* @__PURE__ */ p(`<div class="flex justify-end"><div class="max-w-[85%] rounded-lg px-3 py-2 text-[11px]
						bg-hecate-600/20 text-surface-100 border border-hecate-600/20"> </div></div>`), qv = /* @__PURE__ */ p('<div class="flex justify-start"><div><div class="whitespace-pre-wrap break-words"> </div></div></div>'), zv = /* @__PURE__ */ p('<div class="whitespace-pre-wrap break-words"> <span class="inline-block w-1.5 h-3 bg-hecate-400 animate-pulse ml-0.5"></span></div>'), Uv = /* @__PURE__ */ p('<div class="flex items-center gap-1.5 text-surface-400"><span class="animate-bounce" style="animation-delay: 0ms">.</span> <span class="animate-bounce" style="animation-delay: 150ms">.</span> <span class="animate-bounce" style="animation-delay: 300ms">.</span></div>'), Yv = /* @__PURE__ */ p(`<div class="flex justify-start"><div class="max-w-[85%] rounded-lg px-3 py-2 text-[11px]
					bg-surface-700 text-surface-200 border border-surface-600"><!></div></div>`), Gv = /* @__PURE__ */ p('<span class="text-[9px] text-hecate-400 ml-1">(code-optimized)</span>'), Kv = /* @__PURE__ */ p('<span class="text-hecate-400"> </span> <!>', 1), Jv = /* @__PURE__ */ p('<span class="text-health-warn">No model available</span>'), Qv = /* @__PURE__ */ p('<div class="flex items-center justify-center h-full"><div class="text-center text-surface-400"><div class="text-xl mb-2"></div> <div class="text-[11px]">AI Assistant ready <br/> <!></div></div></div>'), Xv = /* @__PURE__ */ p(`<div class="w-[380px] border-l border-surface-600 bg-surface-800 flex flex-col shrink-0 overflow-hidden"><div class="flex items-center gap-2 px-3 py-2 border-b border-surface-600 shrink-0"><span class="text-hecate-400"></span> <span class="text-xs font-semibold text-surface-100">AI</span> <!> <div class="flex-1"></div> <span class="text-[9px] text-surface-400"> </span> <button class="text-surface-400 hover:text-surface-100 transition-colors px-1" title="Close AI Assistant"></button></div> <div class="flex-1 overflow-y-auto p-3 space-y-3"><!> <!> <!></div> <div class="border-t border-surface-600 p-2 shrink-0"><div class="flex gap-1.5"><textarea class="flex-1 bg-surface-700 border border-surface-600 rounded px-2.5 py-1.5
					text-[11px] text-surface-100 placeholder-surface-400 resize-none
					focus:outline-none focus:border-hecate-500
					disabled:opacity-50 disabled:cursor-not-allowed"></textarea> <button>Send</button></div></div></div>`);
function Aa(e, t) {
  kt(t, !0);
  const r = () => $e(as, "$selectedPhase", v), a = () => $e(Pi, "$phaseModelPrefs", v), o = () => $e(Ga, "$aiModel", v), l = () => $e(Si, "$aiAssistContext", v), u = () => $e(gt, "$activeVenture", v), d = () => $e(Ir, "$selectedDivision", v), [v, x] = Rt(), _ = Ci();
  let g = /* @__PURE__ */ ne(Wt([])), E = /* @__PURE__ */ ne(""), P = /* @__PURE__ */ ne(!1), C = /* @__PURE__ */ ne(""), Q = /* @__PURE__ */ ne(void 0), S = /* @__PURE__ */ ne(null), I = /* @__PURE__ */ ne(null), z = /* @__PURE__ */ Ce(() => Ec(r())), we = /* @__PURE__ */ Ce(() => a()[r()]);
  Mt(() => {
    const L = o();
    s(I) !== null && s(I) !== L && (s(S) && (s(S).cancel(), h(S, null)), h(g, [], !0), h(C, ""), h(P, !1)), h(I, L, !0);
  }), Mt(() => {
    const L = l();
    L && s(g).length === 0 && Pe(L);
  });
  function he() {
    const L = [], H = Ot(Vi);
    H && L.push(H);
    const De = Or.find((He) => He.code === r());
    if (De && L.push(`You are currently assisting with the ${De.name} phase. ${De.description}.`), u()) {
      let He = `Venture: "${u().name}"`;
      u().brief && (He += ` — ${u().brief}`), L.push(He);
    }
    return d() && L.push(`Division: "${d().context_name}" (bounded context)`), L.push(Ot(Nl)), L.join(`

---

`);
  }
  async function Pe(L) {
    const H = o();
    if (!H || !L.trim() || s(P)) return;
    const De = { role: "user", content: L.trim() };
    h(g, [...s(g), De], !0), h(E, "");
    const He = [], te = he();
    te && He.push({ role: "system", content: te }), He.push(...s(g)), h(P, !0), h(C, "");
    let w = "";
    const k = _.stream.chat(H, He);
    h(S, k, !0), k.onChunk((F) => {
      F.content && (w += F.content, h(C, w, !0));
    }).onDone(async (F) => {
      h(S, null), F.content && (w += F.content);
      const re = {
        role: "assistant",
        content: w || "(empty response)"
      };
      if (h(g, [...s(g), re], !0), h(C, ""), h(P, !1), Ot(Ua) === "oracle" && w) {
        const Z = Ot(gt)?.venture_id;
        if (Z) {
          const K = Sc(w);
          for (const be of K)
            await ka(Z, be, "oracle");
        }
      }
    }).onError((F) => {
      h(S, null);
      const re = { role: "assistant", content: `Error: ${F}` };
      h(g, [...s(g), re], !0), h(C, ""), h(P, !1);
    });
    try {
      await k.start();
    } catch (F) {
      const re = { role: "assistant", content: `Error: ${String(F)}` };
      h(g, [...s(g), re], !0), h(P, !1);
    }
  }
  let ue = /* @__PURE__ */ ne(void 0);
  function Le(L) {
    L.key === "Enter" && !L.shiftKey && (L.preventDefault(), Pe(s(E)), s(ue) && (s(ue).style.height = "auto"));
  }
  function ge(L) {
    const H = L.target;
    H.style.height = "auto", H.style.height = Math.min(H.scrollHeight, 120) + "px";
  }
  function Ke() {
    Cc(), h(g, [], !0), h(C, "");
  }
  Mt(() => {
    s(g), s(C), Wa().then(() => {
      s(Q) && (s(Q).scrollTop = s(Q).scrollHeight);
    });
  });
  var xe = Xv(), Me = i(xe), Ne = i(Me);
  Ne.textContent = "✦";
  var Ye = c(Ne, 4);
  {
    let L = /* @__PURE__ */ Ce(() => Or.find((H) => H.code === r())?.shortName ?? "");
    ta(Ye, {
      get currentModel() {
        return o();
      },
      onSelect: (H) => Ka(H),
      showPhaseInfo: !0,
      get phasePreference() {
        return s(we);
      },
      get phaseAffinity() {
        return s(z);
      },
      onPinModel: (H) => hn(r(), H),
      onClearPin: () => hn(r(), null),
      get phaseName() {
        return s(L);
      }
    });
  }
  var Je = c(Ye, 4), fe = i(Je, !0);
  n(Je);
  var y = c(Je, 2);
  y.__click = Ke, y.textContent = "✕", n(Me);
  var ee = c(Me, 2), je = i(ee);
  ze(je, 17, () => s(g), it, (L, H) => {
    var De = br(), He = nt(De);
    {
      var te = (k) => {
        var F = Wv(), re = i(F), ye = i(re, !0);
        n(re), n(F), D(() => m(ye, s(H).content)), f(k, F);
      }, w = (k) => {
        var F = qv(), re = i(F), ye = i(re), Z = i(ye, !0);
        n(ye), n(re), n(F), D(
          (K) => {
            Ve(re, 1, `max-w-[85%] rounded-lg px-3 py-2 text-[11px]
						bg-surface-700 text-surface-200 border border-surface-600
						${K ?? ""}`), m(Z, s(H).content);
          },
          [
            () => s(H).content.startsWith("Error:") ? "border-health-err/30 text-health-err" : ""
          ]
        ), f(k, F);
      };
      R(He, (k) => {
        s(H).role === "user" ? k(te) : s(H).role === "assistant" && k(w, 1);
      });
    }
    f(L, De);
  });
  var We = c(je, 2);
  {
    var Ae = (L) => {
      var H = Yv(), De = i(H), He = i(De);
      {
        var te = (k) => {
          var F = zv(), re = i(F, !0);
          xt(), n(F), D(() => m(re, s(C))), f(k, F);
        }, w = (k) => {
          var F = Uv();
          f(k, F);
        };
        R(He, (k) => {
          s(C) ? k(te) : k(w, !1);
        });
      }
      n(De), n(H), f(L, H);
    };
    R(We, (L) => {
      s(P) && L(Ae);
    });
  }
  var ke = c(We, 2);
  {
    var me = (L) => {
      var H = Qv(), De = i(H), He = i(De);
      He.textContent = "✦";
      var te = c(He, 2), w = c(i(te), 3);
      {
        var k = (re) => {
          var ye = Kv(), Z = nt(ye), K = i(Z, !0);
          n(Z);
          var be = c(Z, 2);
          {
            var T = (j) => {
              var V = Gv();
              f(j, V);
            };
            R(be, (j) => {
              s(z) === "code" && j(T);
            });
          }
          D(() => m(K, o())), f(re, ye);
        }, F = (re) => {
          var ye = Jv();
          f(re, ye);
        };
        R(w, (re) => {
          o() ? re(k) : re(F, !1);
        });
      }
      n(te), n(De), n(H), f(L, H);
    };
    R(ke, (L) => {
      s(g).length === 0 && !s(P) && L(me);
    });
  }
  n(ee), Qr(ee, (L) => h(Q, L), () => s(Q));
  var oe = c(ee, 2), _e = i(oe), ce = i(_e);
  Ys(ce), ce.__keydown = Le, ce.__input = ge, Vt(ce, "rows", 1), Qr(ce, (L) => h(ue, L), () => s(ue));
  var Ee = c(ce, 2);
  Ee.__click = () => Pe(s(E)), n(_e), n(oe), n(xe), D(
    (L, H, De) => {
      m(fe, L), Vt(ce, "placeholder", s(P) ? "Waiting..." : "Ask about this phase..."), ce.disabled = s(P) || !o(), Ee.disabled = H, Ve(Ee, 1, `px-2.5 rounded text-[11px] transition-colors self-end
					${De ?? ""}`);
    },
    [
      () => Or.find((L) => L.code === r())?.shortName ?? "",
      () => s(P) || !s(E).trim() || !o(),
      () => s(P) || !s(E).trim() || !o() ? "bg-surface-600 text-surface-400 cursor-not-allowed" : "bg-hecate-600 text-surface-50 hover:bg-hecate-500"
    ]
  ), ot(ce, () => s(E), (L) => h(E, L)), f(e, xe), Et(), x();
}
Nt(["click", "keydown", "input"]);
Dt(Aa, {}, [], [], { mode: "open" });
var Zv = /* @__PURE__ */ p('<div class="flex items-center justify-center h-full"><div class="text-center text-surface-400"><div class="text-2xl mb-2 animate-pulse"></div> <div class="text-sm">Loading venture...</div></div></div>'), ef = /* @__PURE__ */ p('<div class="text-[11px] text-health-err bg-health-err/10 rounded px-3 py-2"> </div>'), tf = /* @__PURE__ */ p(`<div class="rounded-xl border border-hecate-600/30 bg-surface-800/80 p-5 space-y-4"><h3 class="text-xs font-medium text-hecate-300 uppercase tracking-wider">New Venture</h3> <div class="grid grid-cols-[1fr_2fr] gap-4"><div><label for="venture-name" class="text-[11px] text-surface-300 block mb-1.5">Name</label> <input id="venture-name" placeholder="e.g., my-saas-app" class="w-full bg-surface-700 border border-surface-600 rounded-lg
										px-3 py-2 text-sm text-surface-100 placeholder-surface-500
										focus:outline-none focus:border-hecate-500"/></div> <div><label for="venture-brief" class="text-[11px] text-surface-300 block mb-1.5">Brief (optional)</label> <input id="venture-brief" placeholder="What does this venture aim to achieve?" class="w-full bg-surface-700 border border-surface-600 rounded-lg
										px-3 py-2 text-sm text-surface-100 placeholder-surface-500
										focus:outline-none focus:border-hecate-500"/></div></div> <!> <div class="flex gap-3"><button> </button> <button class="px-4 py-2 rounded-lg text-xs text-hecate-400 border border-hecate-600/30
									hover:bg-hecate-600/10 transition-colors"></button></div></div>`), rf = /* @__PURE__ */ p(`<div class="flex flex-col items-center justify-center py-20 text-center"><div class="text-4xl mb-4 text-hecate-400"></div> <h2 class="text-lg font-semibold text-surface-100 mb-2">No Ventures Yet</h2> <p class="text-xs text-surface-400 leading-relaxed max-w-sm mb-6">A venture is the umbrella for your software endeavor. It houses
							divisions (bounded contexts) and guides them through the development
							lifecycle.</p> <button class="px-5 py-2.5 rounded-lg text-sm font-medium bg-hecate-600 text-surface-50
								hover:bg-hecate-500 transition-colors">+ Create Your First Venture</button></div>`), sf = /* @__PURE__ */ p('<div class="text-[11px] text-surface-400 truncate mt-1.5 ml-5"> </div>'), af = /* @__PURE__ */ p(`<button class="group text-left p-4 rounded-xl bg-surface-800/80 border border-surface-600
												hover:border-hecate-500 hover:bg-hecate-600/5 transition-all"><div class="flex items-center gap-2"><span class="text-hecate-400 group-hover:text-hecate-300"></span> <span class="font-medium text-sm text-surface-100 truncate"> </span> <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-surface-700 text-surface-300 border border-surface-600 shrink-0"> </span></div> <!></button>`), nf = /* @__PURE__ */ p('<div><h3 class="text-[11px] text-surface-400 uppercase tracking-wider mb-3">Recently Updated</h3> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"></div></div>'), of = /* @__PURE__ */ p('<div class="text-[11px] text-surface-500 truncate mt-1.5 ml-5"> </div>'), cf = /* @__PURE__ */ p(`<button class="group text-left p-4 rounded-xl bg-surface-800/40 border border-surface-700
													hover:border-surface-500 transition-all opacity-60 hover:opacity-80"><div class="flex items-center gap-2"><span class="text-surface-500"></span> <span class="font-medium text-sm text-surface-300 truncate"> </span> <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-surface-700 text-surface-400 border border-surface-600 shrink-0">Archived</span></div> <!></button>`), lf = /* @__PURE__ */ p('<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"></div>'), uf = /* @__PURE__ */ p(`<div><button class="flex items-center gap-2 text-[11px] text-surface-500 uppercase tracking-wider
										hover:text-surface-300 transition-colors mb-3"><span class="text-[9px]"> </span> <span class="text-surface-600"> </span></button> <!></div>`), df = /* @__PURE__ */ p('<div class="text-[11px] text-surface-400 truncate mt-1.5 ml-5"> </div>'), vf = /* @__PURE__ */ p(`<button class="group text-left p-4 rounded-xl bg-surface-800/80 border border-surface-600
												hover:border-hecate-500 hover:bg-hecate-600/5 transition-all"><div class="flex items-center gap-2"><span class="text-hecate-400 group-hover:text-hecate-300"></span> <span class="font-medium text-sm text-surface-100 truncate"> </span> <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-surface-700 text-surface-300 border border-surface-600 shrink-0"> </span></div> <!></button>`), ff = /* @__PURE__ */ p('<div><h3 class="text-[11px] text-surface-400 uppercase tracking-wider mb-3"> </h3> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"></div></div>'), pf = /* @__PURE__ */ p('<div class="text-center py-12 text-surface-400 text-sm"> </div>'), hf = /* @__PURE__ */ p("<!>  <!> <!>", 1), xf = /* @__PURE__ */ p('<div class="absolute top-0 right-0 bottom-0 z-10"><!></div>'), _f = /* @__PURE__ */ p(
  `<div class="flex flex-col h-full overflow-hidden"><div class="border-b border-surface-600 bg-surface-800/50 px-4 py-3 shrink-0"><div class="flex items-center gap-3"><span class="text-hecate-400 text-lg"></span> <h1 class="text-sm font-semibold text-surface-100">Martha Studio</h1> <div class="flex items-center gap-1.5 text-[10px]"><span></span> <span class="text-surface-500"> </span></div> <!> <div class="flex-1"></div> <input placeholder="Search ventures..." class="w-48 bg-surface-700 border border-surface-600 rounded-lg
							px-3 py-1.5 text-xs text-surface-100 placeholder-surface-500
							focus:outline-none focus:border-hecate-500"/> <button> </button></div></div> <div class="flex-1 overflow-y-auto p-4 space-y-6"><!> <!></div></div> <!>`,
  1
), bf = /* @__PURE__ */ p('<!> <div class="flex-1 overflow-y-auto"><!></div>', 1), gf = /* @__PURE__ */ p('<div class="w-80 border-l border-surface-600 overflow-hidden shrink-0"><!></div>'), mf = /* @__PURE__ */ p('<div class="flex h-full"><div class="flex-1 overflow-hidden"><!></div> <!></div>'), yf = /* @__PURE__ */ p('<div class="w-80 border-l border-surface-600 overflow-hidden shrink-0"><!></div>'), wf = /* @__PURE__ */ p('<div class="flex h-full"><div class="flex-1 overflow-hidden"><!></div> <!></div>'), $f = /* @__PURE__ */ p('<div class="flex items-center justify-center h-full text-surface-400 text-sm">Select a division from the sidebar</div>'), kf = /* @__PURE__ */ p('<!> <div class="absolute top-2 right-2 flex items-center gap-1.5 text-[10px] z-10"><span></span> <span class="text-surface-500"> </span></div> <div class="flex flex-1 overflow-hidden relative"><!> <div class="flex-1 flex flex-col overflow-hidden"><!></div> <!></div>', 1), Ef = /* @__PURE__ */ p('<div class="flex flex-col h-full"><!></div>');
function Cf(e, t) {
  kt(t, !0);
  const r = () => $e(pt, "$isLoading", C), a = () => $e(gt, "$activeVenture", C), o = () => $e(Ga, "$aiModel", C), l = () => $e(nr, "$ventureError", C), u = () => $e(ws, "$ventures", C), d = () => $e(za, "$showAIAssist", C), v = () => $e(Br, "$divisions", C), x = () => $e(Ir, "$selectedDivision", C), _ = () => $e(as, "$selectedPhase", C), g = () => $e(Qs, "$ventureStep", C), E = () => $e(Hr, "$bigPicturePhase", C), P = () => $e(wa, "$showEventStream", C), [C, Q] = Rt();
  let S = _t(t, "api", 7), I = /* @__PURE__ */ ne(null), z = /* @__PURE__ */ ne("connecting"), we, he = /* @__PURE__ */ ne(""), Pe = /* @__PURE__ */ ne(""), ue = /* @__PURE__ */ ne(""), Le = /* @__PURE__ */ ne(!1), ge = /* @__PURE__ */ ne(!1);
  function Ke(Ae, ke) {
    let me = Ae;
    if (ke.trim()) {
      const H = ke.toLowerCase();
      me = Ae.filter((De) => De.name.toLowerCase().includes(H) || De.brief && De.brief.toLowerCase().includes(H));
    }
    const oe = [], _e = [], ce = [], Ee = [];
    for (const H of me)
      kr(H.status, xs) ? Ee.push(H) : kr(H.status, $i) || kr(H.status, ki) ? _e.push(H) : H.phase === "initiated" || H.phase === "vision_refined" || H.phase === "vision_submitted" ? oe.push(H) : H.phase === "discovery_completed" || H.phase === "designing" || H.phase === "planning" || H.phase === "crafting" || H.phase === "deploying" ? ce.push(H) : oe.push(H);
    const L = [];
    return oe.length > 0 && L.push({ label: "Setup", ventures: oe }), _e.length > 0 && L.push({ label: "Discovery", ventures: _e }), ce.length > 0 && L.push({ label: "Building", ventures: ce }), Ee.length > 0 && L.push({ label: "Archived", ventures: Ee }), L;
  }
  function xe(Ae) {
    return Ae.filter((ke) => !kr(ke.status, xs)).sort((ke, me) => (me.updated_at ?? "").localeCompare(ke.updated_at ?? "")).slice(0, 5);
  }
  async function Me() {
    try {
      h(I, await S().get("/health"), !0), h(z, "connected");
    } catch {
      h(I, null), h(z, "disconnected");
    }
  }
  bi(async () => {
    gc(S()), Me(), we = setInterval(Me, 5e3), ir(), As();
    const Ae = await mc();
    Ya.set(Ae);
  }), ec(() => {
    we && clearInterval(we);
  });
  async function Ne() {
    if (!s(he).trim()) return;
    await Ii(s(he).trim(), s(Pe).trim() || "") && (h(he, ""), h(Pe, ""), h(Le, !1));
  }
  var Ye = {
    get api() {
      return S();
    },
    set api(Ae) {
      S(Ae), ht();
    }
  }, Je = Ef(), fe = i(Je);
  {
    var y = (Ae) => {
      var ke = Zv(), me = i(ke), oe = i(me);
      oe.textContent = "◆", xt(2), n(me), n(ke), f(Ae, ke);
    }, ee = (Ae) => {
      var ke = _f(), me = nt(ke), oe = i(me), _e = i(oe), ce = i(_e);
      ce.textContent = "◆";
      var Ee = c(ce, 4), L = i(Ee), H = c(L, 2), De = i(H, !0);
      n(H), n(Ee);
      var He = c(Ee, 2);
      ta(He, {
        get currentModel() {
          return o();
        },
        onSelect: (V) => Ka(V)
      });
      var te = c(He, 4);
      dt(te);
      var w = c(te, 2);
      w.__click = () => h(Le, !s(Le));
      var k = i(w, !0);
      n(w), n(_e), n(oe);
      var F = c(oe, 2), re = i(F);
      {
        var ye = (V) => {
          var le = tf(), de = c(i(le), 2), ie = i(de), G = c(i(ie), 2);
          dt(G), n(ie);
          var Re = c(ie, 2), se = c(i(Re), 2);
          dt(se), n(Re), n(de);
          var U = c(de, 2);
          {
            var Oe = (X) => {
              var pe = ef(), b = i(pe, !0);
              n(pe), D(() => m(b, l())), f(X, pe);
            };
            R(U, (X) => {
              l() && X(Oe);
            });
          }
          var Te = c(U, 2), ae = i(Te);
          ae.__click = Ne;
          var B = i(ae, !0);
          n(ae);
          var J = c(ae, 2);
          J.__click = () => vr("Help me define a new venture. What should I consider? Ask me about the problem domain, target users, and core functionality."), J.textContent = "✦ AI Help", n(Te), n(le), D(
            (X, pe) => {
              ae.disabled = X, Ve(ae, 1, `px-4 py-2 rounded-lg text-xs font-medium transition-colors
									${pe ?? ""}`), m(B, r() ? "Initiating..." : "Initiate Venture");
            },
            [
              () => !s(he).trim() || r(),
              () => !s(he).trim() || r() ? "bg-surface-600 text-surface-400 cursor-not-allowed" : "bg-hecate-600 text-surface-50 hover:bg-hecate-500"
            ]
          ), ot(G, () => s(he), (X) => h(he, X)), ot(se, () => s(Pe), (X) => h(Pe, X)), f(V, le);
        };
        R(re, (V) => {
          s(Le) && V(ye);
        });
      }
      var Z = c(re, 2);
      {
        var K = (V) => {
          var le = rf(), de = i(le);
          de.textContent = "◆";
          var ie = c(de, 6);
          ie.__click = () => h(Le, !0), n(le), f(V, le);
        }, be = (V) => {
          const le = /* @__PURE__ */ Ce(() => Ke(u(), s(ue)));
          var de = hf(), ie = nt(de);
          {
            var G = (ae) => {
              const B = /* @__PURE__ */ Ce(() => xe(u()));
              var J = br(), X = nt(J);
              {
                var pe = (b) => {
                  var $ = nf(), O = c(i($), 2);
                  ze(O, 21, () => s(B), it, (A, N) => {
                    var Y = af();
                    Y.__click = () => bs(s(N));
                    var W = i(Y), M = i(W);
                    M.textContent = "◆";
                    var q = c(M, 2), ve = i(q, !0);
                    n(q);
                    var Ie = c(q, 2), Fe = i(Ie, !0);
                    n(Ie), n(W);
                    var Ue = c(W, 2);
                    {
                      var Be = (Se) => {
                        var qe = sf(), Qe = i(qe, !0);
                        n(qe), D(() => m(Qe, s(N).brief)), f(Se, qe);
                      };
                      R(Ue, (Se) => {
                        s(N).brief && Se(Be);
                      });
                    }
                    n(Y), D(() => {
                      m(ve, s(N).name), m(Fe, s(N).status_label ?? s(N).phase);
                    }), f(A, Y);
                  }), n(O), n($), f(b, $);
                };
                R(X, (b) => {
                  s(B).length > 0 && b(pe);
                });
              }
              f(ae, J);
            }, Re = /* @__PURE__ */ Ce(() => !s(ue).trim() && u().filter((ae) => !kr(ae.status, xs)).length > 3);
            R(ie, (ae) => {
              s(Re) && ae(G);
            });
          }
          var se = c(ie, 2);
          ze(se, 17, () => s(le), it, (ae, B) => {
            var J = br(), X = nt(J);
            {
              var pe = ($) => {
                var O = uf(), A = i(O);
                A.__click = () => h(ge, !s(ge));
                var N = i(A), Y = i(N, !0);
                n(N);
                var W = c(N), M = c(W), q = i(M);
                n(M), n(A);
                var ve = c(A, 2);
                {
                  var Ie = (Fe) => {
                    var Ue = lf();
                    ze(Ue, 21, () => s(B).ventures, it, (Be, Se) => {
                      var qe = cf();
                      qe.__click = () => bs(s(Se));
                      var Qe = i(qe), at = i(Qe);
                      at.textContent = "◆";
                      var ct = c(at, 2), ut = i(ct, !0);
                      n(ct), xt(2), n(Qe);
                      var jt = c(Qe, 2);
                      {
                        var Jt = (yr) => {
                          var cs = of(), Ps = i(cs, !0);
                          n(cs), D(() => m(Ps, s(Se).brief)), f(yr, cs);
                        };
                        R(jt, (yr) => {
                          s(Se).brief && yr(Jt);
                        });
                      }
                      n(qe), D(() => m(ut, s(Se).name)), f(Be, qe);
                    }), n(Ue), f(Fe, Ue);
                  };
                  R(ve, (Fe) => {
                    s(ge) && Fe(Ie);
                  });
                }
                n(O), D(() => {
                  m(Y, s(ge) ? "▼" : "▶"), m(W, ` ${s(B).label ?? ""} `), m(q, `(${s(B).ventures.length ?? ""})`);
                }), f($, O);
              }, b = ($) => {
                var O = ff(), A = i(O), N = i(A, !0);
                n(A);
                var Y = c(A, 2);
                ze(Y, 21, () => s(B).ventures, it, (W, M) => {
                  var q = vf();
                  q.__click = () => bs(s(M));
                  var ve = i(q), Ie = i(ve);
                  Ie.textContent = "◆";
                  var Fe = c(Ie, 2), Ue = i(Fe, !0);
                  n(Fe);
                  var Be = c(Fe, 2), Se = i(Be, !0);
                  n(Be), n(ve);
                  var qe = c(ve, 2);
                  {
                    var Qe = (at) => {
                      var ct = df(), ut = i(ct, !0);
                      n(ct), D(() => m(ut, s(M).brief)), f(at, ct);
                    };
                    R(qe, (at) => {
                      s(M).brief && at(Qe);
                    });
                  }
                  n(q), D(() => {
                    m(Ue, s(M).name), m(Se, s(M).status_label ?? s(M).phase);
                  }), f(W, q);
                }), n(Y), n(O), D(() => m(N, s(B).label)), f($, O);
              };
              R(X, ($) => {
                s(B).label === "Archived" ? $(pe) : $(b, !1);
              });
            }
            f(ae, J);
          });
          var U = c(se, 2);
          {
            var Oe = (ae) => {
              var B = pf(), J = i(B);
              n(B), D(() => m(J, `No ventures matching "${s(ue) ?? ""}"`)), f(ae, B);
            }, Te = /* @__PURE__ */ Ce(() => s(le).length === 0 && s(ue).trim());
            R(U, (ae) => {
              s(Te) && ae(Oe);
            });
          }
          f(V, de);
        };
        R(Z, (V) => {
          u().length === 0 && !s(Le) ? V(K) : V(be, !1);
        });
      }
      n(F), n(me);
      var T = c(me, 2);
      {
        var j = (V) => {
          var le = xf(), de = i(le);
          Aa(de, {}), n(le), f(V, le);
        };
        R(T, (V) => {
          d() && V(j);
        });
      }
      D(() => {
        Ve(L, 1, `inline-block w-1.5 h-1.5 rounded-full ${s(z) === "connected" ? "bg-success-400" : s(z) === "connecting" ? "bg-yellow-400 animate-pulse" : "bg-danger-400"}`), m(De, s(z) === "connected" ? `v${s(I)?.version ?? "?"}` : s(z)), Ve(w, 1, `px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
							${s(Le) ? "bg-surface-600 text-surface-300" : "bg-hecate-600 text-surface-50 hover:bg-hecate-500"}`), m(k, s(Le) ? "Cancel" : "+ New Venture");
      }), ot(te, () => s(ue), (V) => h(ue, V)), f(Ae, ke);
    }, je = (Ae) => {
      var ke = kf(), me = nt(ke);
      Oi(me, {});
      var oe = c(me, 2), _e = i(oe), ce = c(_e, 2), Ee = i(ce, !0);
      n(ce), n(oe);
      var L = c(oe, 2), H = i(L);
      {
        var De = (Z) => {
          Fi(Z, {});
        };
        R(H, (Z) => {
          v().length > 0 && Z(De);
        });
      }
      var He = c(H, 2), te = i(He);
      {
        var w = (Z) => {
          var K = bf(), be = nt(K);
          Ui(be, {});
          var T = c(be, 2), j = i(T);
          {
            var V = (G) => {
              Bi(G, {});
            }, le = (G) => {
              Hi(G, {});
            }, de = (G) => {
              Wi(G, {});
            }, ie = (G) => {
              zi(G, {});
            };
            R(j, (G) => {
              _() === "storming" ? G(V) : _() === "planning" ? G(le, 1) : _() === "kanban" ? G(de, 2) : _() === "crafting" && G(ie, 3);
            });
          }
          n(T), f(Z, K);
        }, k = (Z) => {
          var K = br(), be = nt(K);
          {
            var T = (G) => {
              var Re = mf(), se = i(Re), U = i(se);
              Ea(U, {}), n(se);
              var Oe = c(se, 2);
              {
                var Te = (ae) => {
                  var B = gf(), J = i(B);
                  Sa(J, {}), n(B), f(ae, B);
                };
                R(Oe, (ae) => {
                  P() && ae(Te);
                });
              }
              n(Re), f(G, Re);
            }, j = (G) => {
              ji(G, {});
            }, V = (G) => {
              Ns(G, { nextAction: "discovery" });
            }, le = (G) => {
              var Re = wf(), se = i(Re), U = i(se);
              Ea(U, {}), n(se);
              var Oe = c(se, 2);
              {
                var Te = (ae) => {
                  var B = yf(), J = i(B);
                  Sa(J, {}), n(B), f(ae, B);
                };
                R(Oe, (ae) => {
                  P() && ae(Te);
                });
              }
              n(Re), f(G, Re);
            }, de = (G) => {
              Ns(G, { nextAction: "identify" });
            }, ie = (G) => {
              Ns(G, { nextAction: "discovery" });
            };
            R(be, (G) => {
              g() === "discovering" || E() !== "ready" ? G(T) : g() === "initiated" || g() === "vision_refined" ? G(j, 1) : g() === "vision_submitted" ? G(V, 2) : g() === "discovery_paused" ? G(le, 3) : g() === "discovery_completed" ? G(de, 4) : G(ie, !1);
            });
          }
          f(Z, K);
        }, F = (Z) => {
          var K = $f();
          f(Z, K);
        };
        R(te, (Z) => {
          x() ? Z(w) : v().length === 0 ? Z(k, 1) : Z(F, !1);
        });
      }
      n(He);
      var re = c(He, 2);
      {
        var ye = (Z) => {
          Aa(Z, {});
        };
        R(re, (Z) => {
          d() && Z(ye);
        });
      }
      n(L), D(() => {
        Ve(_e, 1, `inline-block w-1.5 h-1.5 rounded-full ${s(z) === "connected" ? "bg-success-400" : s(z) === "connecting" ? "bg-yellow-400 animate-pulse" : "bg-danger-400"}`), m(Ee, s(z) === "connected" ? `v${s(I)?.version ?? "?"}` : s(z));
      }), f(Ae, ke);
    };
    R(fe, (Ae) => {
      r() && !a() ? Ae(y) : a() ? Ae(je, !1) : Ae(ee, 1);
    });
  }
  n(Je), f(e, Je);
  var We = Et(Ye);
  return Q(), We;
}
Nt(["click"]);
customElements.define("martha-studio", Dt(Cf, { api: {} }, [], []));
export {
  Cf as default
};
