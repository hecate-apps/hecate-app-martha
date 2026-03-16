typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
const qo = 1, Ho = 2, ti = 4, zo = 8, Uo = 16, Wo = 2, Yo = 4, Ko = 8, Jo = 1, Qo = 2, an = "[", us = "[!", sn = "]", ta = {}, Ft = /* @__PURE__ */ Symbol(), Xo = "http://www.w3.org/1999/xhtml", Is = !1;
var nn = Array.isArray, Zo = Array.prototype.indexOf, _a = Array.prototype.includes, vs = Array.from, ss = Object.keys, Ba = Object.defineProperty, fa = Object.getOwnPropertyDescriptor, ri = Object.getOwnPropertyDescriptors, ec = Object.prototype, tc = Array.prototype, on = Object.getPrototypeOf, Mn = Object.isExtensible;
const Pr = () => {
};
function rc(e) {
  return e();
}
function ns(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function ai() {
  var e, t, a = new Promise((n, c) => {
    e = n, t = c;
  });
  return { promise: a, resolve: e, reject: t };
}
function Ms(e, t) {
  if (Array.isArray(e))
    return e;
  if (!(Symbol.iterator in e))
    return Array.from(e);
  const a = [];
  for (const n of e)
    if (a.push(n), a.length === t) break;
  return a;
}
const jt = 2, is = 4, Ha = 8, si = 1 << 24, Or = 16, _r = 32, Wr = 64, cn = 128, nr = 512, It = 1024, Bt = 2048, xr = 4096, Zt = 8192, Tr = 16384, fs = 32768, ha = 65536, Nn = 1 << 17, ni = 1 << 18, na = 1 << 19, ii = 1 << 20, Ar = 1 << 25, ra = 32768, Ns = 1 << 21, ln = 1 << 22, Gr = 1 << 23, qr = /* @__PURE__ */ Symbol("$state"), ac = /* @__PURE__ */ Symbol("legacy props"), sc = /* @__PURE__ */ Symbol(""), ua = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), za = 3, ia = 8;
function oi(e) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function nc() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function ic(e, t, a) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function oc(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function cc() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function lc(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function dc() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function uc() {
  throw new Error("https://svelte.dev/e/hydration_failed");
}
function vc() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function fc() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function pc() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function xc() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function Ua(e) {
  console.warn("https://svelte.dev/e/hydration_mismatch");
}
function _c() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function hc() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
let ot = !1;
function Dr(e) {
  ot = e;
}
let dt;
function Gt(e) {
  if (e === null)
    throw Ua(), ta;
  return dt = e;
}
function ga() {
  return Gt(/* @__PURE__ */ hr(dt));
}
function s(e) {
  if (ot) {
    if (/* @__PURE__ */ hr(dt) !== null)
      throw Ua(), ta;
    dt = e;
  }
}
function Dt(e = 1) {
  if (ot) {
    for (var t = e, a = dt; t--; )
      a = /** @type {TemplateNode} */
      /* @__PURE__ */ hr(a);
    dt = a;
  }
}
function os(e = !0) {
  for (var t = 0, a = dt; ; ) {
    if (a.nodeType === ia) {
      var n = (
        /** @type {Comment} */
        a.data
      );
      if (n === sn) {
        if (t === 0) return a;
        t -= 1;
      } else (n === an || n === us || // "[1", "[2", etc. for if blocks
      n[0] === "[" && !isNaN(Number(n.slice(1)))) && (t += 1);
    }
    var c = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ hr(a)
    );
    e && a.remove(), a = c;
  }
}
function ci(e) {
  if (!e || e.nodeType !== ia)
    throw Ua(), ta;
  return (
    /** @type {Comment} */
    e.data
  );
}
function li(e) {
  return e === this.v;
}
function di(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function ui(e) {
  return !di(e, this.v);
}
let ka = !1, gc = !1;
function bc() {
  ka = !0;
}
let $t = null;
function ba(e) {
  $t = e;
}
function bt(e, t = !1, a) {
  $t = {
    p: $t,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    l: ka && !t ? { s: null, u: null, $: [] } : null
  };
}
function mt(e) {
  var t = (
    /** @type {ComponentContext} */
    $t
  ), a = t.e;
  if (a !== null) {
    t.e = null;
    for (var n of a)
      Ti(n);
  }
  return e !== void 0 && (t.x = e), t.i = !0, $t = t.p, e ?? /** @type {T} */
  {};
}
function Wa() {
  return !ka || $t !== null && $t.l === null;
}
let Kr = [];
function vi() {
  var e = Kr;
  Kr = [], ns(e);
}
function yr(e) {
  if (Kr.length === 0 && !Na) {
    var t = Kr;
    queueMicrotask(() => {
      t === Kr && vi();
    });
  }
  Kr.push(e);
}
function mc() {
  for (; Kr.length > 0; )
    vi();
}
function fi(e) {
  var t = vt;
  if (t === null)
    return lt.f |= Gr, e;
  if ((t.f & fs) === 0) {
    if ((t.f & cn) === 0)
      throw e;
    t.b.error(e);
  } else
    ma(e, t);
}
function ma(e, t) {
  for (; t !== null; ) {
    if ((t.f & cn) !== 0)
      try {
        t.b.error(e);
        return;
      } catch (a) {
        e = a;
      }
    t = t.parent;
  }
  throw e;
}
const yc = -7169;
function Ct(e, t) {
  e.f = e.f & yc | t;
}
function dn(e) {
  (e.f & nr) !== 0 || e.deps === null ? Ct(e, It) : Ct(e, xr);
}
function pi(e) {
  if (e !== null)
    for (const t of e)
      (t.f & jt) === 0 || (t.f & ra) === 0 || (t.f ^= ra, pi(
        /** @type {Derived} */
        t.deps
      ));
}
function xi(e, t, a) {
  (e.f & Bt) !== 0 ? t.add(e) : (e.f & xr) !== 0 && a.add(e), pi(e.deps), Ct(e, It);
}
const Ja = /* @__PURE__ */ new Set();
let ft = null, cs = null, ur = null, Yt = [], ps = null, Ls = !1, Na = !1;
class Rr {
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
  #s = /* @__PURE__ */ new Set();
  /**
   * Deferred effects that are MAYBE_DIRTY
   * @type {Set<Effect>}
   */
  #a = /* @__PURE__ */ new Set();
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
    var a = this.#n.get(t);
    if (a) {
      this.#n.delete(t);
      for (var n of a.d)
        Ct(n, Bt), vr(n);
      for (n of a.m)
        Ct(n, xr), vr(n);
    }
  }
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(t) {
    Yt = [], this.apply();
    var a = [], n = [];
    for (const c of t)
      this.#l(c, a, n);
    if (this.is_deferred()) {
      this.#u(n), this.#u(a);
      for (const [c, l] of this.#n)
        bi(c, l);
    } else {
      for (const c of this.#e) c();
      this.#e.clear(), this.#r === 0 && this.#d(), cs = this, ft = null, Ln(n), Ln(a), cs = null, this.#o?.resolve();
    }
    ur = null;
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   * @param {Effect[]} effects
   * @param {Effect[]} render_effects
   */
  #l(t, a, n) {
    t.f ^= It;
    for (var c = t.first, l = null; c !== null; ) {
      var f = c.f, v = (f & (_r | Wr)) !== 0, p = v && (f & It) !== 0, h = p || (f & Zt) !== 0 || this.#n.has(c);
      if (!h && c.fn !== null) {
        v ? c.f ^= It : l !== null && (f & (is | Ha | si)) !== 0 ? l.b.defer_effect(c) : (f & is) !== 0 ? a.push(c) : Ka(c) && ((f & Or) !== 0 && this.#a.add(c), Va(c));
        var b = c.first;
        if (b !== null) {
          c = b;
          continue;
        }
      }
      var $ = c.parent;
      for (c = c.next; c === null && $ !== null; )
        $ === l && (l = null), c = $.next, $ = $.parent;
    }
  }
  /**
   * @param {Effect[]} effects
   */
  #u(t) {
    for (var a = 0; a < t.length; a += 1)
      xi(t[a], this.#s, this.#a);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(t, a) {
    a !== Ft && !this.previous.has(t) && this.previous.set(t, a), (t.f & Gr) === 0 && (this.current.set(t, t.v), ur?.set(t, t.v));
  }
  activate() {
    ft = this, this.apply();
  }
  deactivate() {
    ft === this && (ft = null, ur = null);
  }
  flush() {
    if (this.activate(), Yt.length > 0) {
      if (_i(), ft !== null && ft !== this)
        return;
    } else this.#r === 0 && this.process([]);
    this.deactivate();
  }
  discard() {
    for (const t of this.#t) t(this);
    this.#t.clear();
  }
  #d() {
    if (Ja.size > 1) {
      this.previous.clear();
      var t = ur, a = !0;
      for (const c of Ja) {
        if (c === this) {
          a = !1;
          continue;
        }
        const l = [];
        for (const [v, p] of this.current) {
          if (c.current.has(v))
            if (a && p !== c.current.get(v))
              c.current.set(v, p);
            else
              continue;
          l.push(v);
        }
        if (l.length === 0)
          continue;
        const f = [...c.current.keys()].filter((v) => !this.current.has(v));
        if (f.length > 0) {
          var n = Yt;
          Yt = [];
          const v = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Map();
          for (const h of l)
            hi(h, f, v, p);
          if (Yt.length > 0) {
            ft = c, c.apply();
            for (const h of Yt)
              c.#l(h, [], []);
            c.deactivate();
          }
          Yt = n;
        }
      }
      ft = null, ur = t;
    }
    this.committed = !0, Ja.delete(this);
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
    this.#r -= 1, t && (this.#i -= 1), !this.#c && (this.#c = !0, yr(() => {
      this.#c = !1, this.is_deferred() ? Yt.length > 0 && this.flush() : this.revive();
    }));
  }
  revive() {
    for (const t of this.#s)
      this.#a.delete(t), Ct(t, Bt), vr(t);
    for (const t of this.#a)
      Ct(t, xr), vr(t);
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
    return (this.#o ??= ai()).promise;
  }
  static ensure() {
    if (ft === null) {
      const t = ft = new Rr();
      Ja.add(ft), Na || yr(() => {
        ft === t && t.flush();
      });
    }
    return ft;
  }
  apply() {
  }
}
function ut(e) {
  var t = Na;
  Na = !0;
  try {
    for (var a; ; ) {
      if (mc(), Yt.length === 0 && (ft?.flush(), Yt.length === 0))
        return ps = null, /** @type {T} */
        a;
      _i();
    }
  } finally {
    Na = t;
  }
}
function _i() {
  Ls = !0;
  var e = null;
  try {
    for (var t = 0; Yt.length > 0; ) {
      var a = Rr.ensure();
      if (t++ > 1e3) {
        var n, c;
        wc();
      }
      a.process(Yt), Hr.clear();
    }
  } finally {
    Yt = [], Ls = !1, ps = null;
  }
}
function wc() {
  try {
    dc();
  } catch (e) {
    ma(e, ps);
  }
}
let Sr = null;
function Ln(e) {
  var t = e.length;
  if (t !== 0) {
    for (var a = 0; a < t; ) {
      var n = e[a++];
      if ((n.f & (Tr | Zt)) === 0 && Ka(n) && (Sr = /* @__PURE__ */ new Set(), Va(n), n.deps === null && n.first === null && n.nodes === null && (n.teardown === null && n.ac === null ? Ni(n) : n.fn = null), Sr?.size > 0)) {
        Hr.clear();
        for (const c of Sr) {
          if ((c.f & (Tr | Zt)) !== 0) continue;
          const l = [c];
          let f = c.parent;
          for (; f !== null; )
            Sr.has(f) && (Sr.delete(f), l.push(f)), f = f.parent;
          for (let v = l.length - 1; v >= 0; v--) {
            const p = l[v];
            (p.f & (Tr | Zt)) === 0 && Va(p);
          }
        }
        Sr.clear();
      }
    }
    Sr = null;
  }
}
function hi(e, t, a, n) {
  if (!a.has(e) && (a.add(e), e.reactions !== null))
    for (const c of e.reactions) {
      const l = c.f;
      (l & jt) !== 0 ? hi(
        /** @type {Derived} */
        c,
        t,
        a,
        n
      ) : (l & (ln | Or)) !== 0 && (l & Bt) === 0 && gi(c, t, n) && (Ct(c, Bt), vr(
        /** @type {Effect} */
        c
      ));
    }
}
function gi(e, t, a) {
  const n = a.get(e);
  if (n !== void 0) return n;
  if (e.deps !== null)
    for (const c of e.deps) {
      if (_a.call(t, c))
        return !0;
      if ((c.f & jt) !== 0 && gi(
        /** @type {Derived} */
        c,
        t,
        a
      ))
        return a.set(
          /** @type {Derived} */
          c,
          !0
        ), !0;
    }
  return a.set(e, !1), !1;
}
function vr(e) {
  for (var t = ps = e; t.parent !== null; ) {
    t = t.parent;
    var a = t.f;
    if (Ls && t === vt && (a & Or) !== 0 && (a & ni) === 0)
      return;
    if ((a & (Wr | _r)) !== 0) {
      if ((a & It) === 0) return;
      t.f ^= It;
    }
  }
  Yt.push(t);
}
function bi(e, t) {
  if (!((e.f & _r) !== 0 && (e.f & It) !== 0)) {
    (e.f & Bt) !== 0 ? t.d.push(e) : (e.f & xr) !== 0 && t.m.push(e), Ct(e, It);
    for (var a = e.first; a !== null; )
      bi(a, t), a = a.next;
  }
}
function $c(e) {
  let t = 0, a = aa(0), n;
  return () => {
    pn() && (r(a), gs(() => (t === 0 && (n = oa(() => e(() => La(a)))), t += 1, () => {
      yr(() => {
        t -= 1, t === 0 && (n?.(), n = void 0, La(a));
      });
    })));
  };
}
var kc = ha | na | cn;
function Cc(e, t, a) {
  new Sc(e, t, a);
}
class Sc {
  /** @type {Boundary | null} */
  parent;
  is_pending = !1;
  /** @type {TemplateNode} */
  #e;
  /** @type {TemplateNode | null} */
  #t = ot ? dt : null;
  /** @type {BoundaryProps} */
  #r;
  /** @type {((anchor: Node) => void)} */
  #i;
  /** @type {Effect} */
  #o;
  /** @type {Effect | null} */
  #s = null;
  /** @type {Effect | null} */
  #a = null;
  /** @type {Effect | null} */
  #n = null;
  /** @type {DocumentFragment | null} */
  #c = null;
  /** @type {TemplateNode | null} */
  #l = null;
  #u = 0;
  #d = 0;
  #p = !1;
  #f = !1;
  /** @type {Set<Effect>} */
  #x = /* @__PURE__ */ new Set();
  /** @type {Set<Effect>} */
  #_ = /* @__PURE__ */ new Set();
  /**
   * A source containing the number of pending async deriveds/expressions.
   * Only created if `$effect.pending()` is used inside the boundary,
   * otherwise updating the source results in needless `Batch.ensure()`
   * calls followed by no-op flushes
   * @type {Source<number> | null}
   */
  #v = null;
  #y = $c(() => (this.#v = aa(this.#u), () => {
    this.#v = null;
  }));
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   */
  constructor(t, a, n) {
    this.#e = t, this.#r = a, this.#i = n, this.parent = /** @type {Effect} */
    vt.b, this.is_pending = !!this.#r.pending, this.#o = _n(() => {
      if (vt.b = this, ot) {
        const l = this.#t;
        ga(), /** @type {Comment} */
        l.nodeType === ia && /** @type {Comment} */
        l.data === us ? this.#$() : (this.#w(), this.#d === 0 && (this.is_pending = !1));
      } else {
        var c = this.#b();
        try {
          this.#s = ar(() => n(c));
        } catch (l) {
          this.error(l);
        }
        this.#d > 0 ? this.#g() : this.is_pending = !1;
      }
      return () => {
        this.#l?.remove();
      };
    }, kc), ot && (this.#e = dt);
  }
  #w() {
    try {
      this.#s = ar(() => this.#i(this.#e));
    } catch (t) {
      this.error(t);
    }
  }
  #$() {
    const t = this.#r.pending;
    t && (this.#a = ar(() => t(this.#e)), yr(() => {
      var a = this.#b();
      this.#s = this.#h(() => (Rr.ensure(), ar(() => this.#i(a)))), this.#d > 0 ? this.#g() : (Xr(
        /** @type {Effect} */
        this.#a,
        () => {
          this.#a = null;
        }
      ), this.is_pending = !1);
    }));
  }
  #b() {
    var t = this.#e;
    return this.is_pending && (this.#l = Jt(), this.#e.before(this.#l), t = this.#l), t;
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(t) {
    xi(t, this.#x, this.#_);
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
  #h(t) {
    var a = vt, n = lt, c = $t;
    $r(this.#o), cr(this.#o), ba(this.#o.ctx);
    try {
      return t();
    } catch (l) {
      return fi(l), null;
    } finally {
      $r(a), cr(n), ba(c);
    }
  }
  #g() {
    const t = (
      /** @type {(anchor: Node) => void} */
      this.#r.pending
    );
    this.#s !== null && (this.#c = document.createDocumentFragment(), this.#c.append(
      /** @type {TemplateNode} */
      this.#l
    ), Fi(this.#s, this.#c)), this.#a === null && (this.#a = ar(() => t(this.#e)));
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
    if (this.#d += t, this.#d === 0) {
      this.is_pending = !1;
      for (const a of this.#x)
        Ct(a, Bt), vr(a);
      for (const a of this.#_)
        Ct(a, xr), vr(a);
      this.#x.clear(), this.#_.clear(), this.#a && Xr(this.#a, () => {
        this.#a = null;
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
    this.#m(t), this.#u += t, !(!this.#v || this.#p) && (this.#p = !0, yr(() => {
      this.#p = !1, this.#v && ya(this.#v, this.#u);
    }));
  }
  get_effect_pending() {
    return this.#y(), r(
      /** @type {Source<number>} */
      this.#v
    );
  }
  /** @param {unknown} error */
  error(t) {
    var a = this.#r.onerror;
    let n = this.#r.failed;
    if (this.#f || !a && !n)
      throw t;
    this.#s && (Ut(this.#s), this.#s = null), this.#a && (Ut(this.#a), this.#a = null), this.#n && (Ut(this.#n), this.#n = null), ot && (Gt(
      /** @type {TemplateNode} */
      this.#t
    ), Dt(), Gt(os()));
    var c = !1, l = !1;
    const f = () => {
      if (c) {
        hc();
        return;
      }
      c = !0, l && xc(), Rr.ensure(), this.#u = 0, this.#n !== null && Xr(this.#n, () => {
        this.#n = null;
      }), this.is_pending = this.has_pending_snippet(), this.#s = this.#h(() => (this.#f = !1, ar(() => this.#i(this.#e)))), this.#d > 0 ? this.#g() : this.is_pending = !1;
    };
    yr(() => {
      try {
        l = !0, a?.(t, f), l = !1;
      } catch (v) {
        ma(v, this.#o && this.#o.parent);
      }
      n && (this.#n = this.#h(() => {
        Rr.ensure(), this.#f = !0;
        try {
          return ar(() => {
            n(
              this.#e,
              () => t,
              () => f
            );
          });
        } catch (v) {
          return ma(
            v,
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
function Ec(e, t, a, n) {
  const c = Wa() ? Ya : va;
  var l = e.filter((w) => !w.settled);
  if (a.length === 0 && l.length === 0) {
    n(t.map(c));
    return;
  }
  var f = ft, v = (
    /** @type {Effect} */
    vt
  ), p = Ac(), h = l.length === 1 ? l[0].promise : l.length > 1 ? Promise.all(l.map((w) => w.promise)) : null;
  function b(w) {
    p();
    try {
      n(w);
    } catch (F) {
      (v.f & Tr) === 0 && ma(F, v);
    }
    f?.deactivate(), Os();
  }
  if (a.length === 0) {
    h.then(() => b(t.map(c)));
    return;
  }
  function $() {
    p(), Promise.all(a.map((w) => /* @__PURE__ */ Dc(w))).then((w) => b([...t.map(c), ...w])).catch((w) => ma(w, v));
  }
  h ? h.then($) : $();
}
function Ac() {
  var e = vt, t = lt, a = $t, n = ft;
  return function(l = !0) {
    $r(e), cr(t), ba(a), l && n?.activate();
  };
}
function Os() {
  $r(null), cr(null), ba(null);
}
// @__NO_SIDE_EFFECTS__
function Ya(e) {
  var t = jt | Bt, a = lt !== null && (lt.f & jt) !== 0 ? (
    /** @type {Derived} */
    lt
  ) : null;
  return vt !== null && (vt.f |= na), {
    ctx: $t,
    deps: null,
    effects: null,
    equals: li,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      Ft
    ),
    wv: 0,
    parent: a ?? vt,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function Dc(e, t, a) {
  let n = (
    /** @type {Effect | null} */
    vt
  );
  n === null && nc();
  var c = (
    /** @type {Boundary} */
    n.b
  ), l = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), f = aa(
    /** @type {V} */
    Ft
  ), v = !lt, p = /* @__PURE__ */ new Map();
  return Oc(() => {
    var h = ai();
    l = h.promise;
    try {
      Promise.resolve(e()).then(h.resolve, h.reject).then(() => {
        b === ft && b.committed && b.deactivate(), Os();
      });
    } catch (F) {
      h.reject(F), Os();
    }
    var b = (
      /** @type {Batch} */
      ft
    );
    if (v) {
      var $ = c.is_rendered();
      c.update_pending_count(1), b.increment($), p.get(b)?.reject(ua), p.delete(b), p.set(b, h);
    }
    const w = (F, D = void 0) => {
      if (b.activate(), D)
        D !== ua && (f.f |= Gr, ya(f, D));
      else {
        (f.f & Gr) !== 0 && (f.f ^= Gr), ya(f, F);
        for (const [te, P] of p) {
          if (p.delete(te), te === b) break;
          P.reject(ua);
        }
      }
      v && (c.update_pending_count(-1), b.decrement($));
    };
    h.promise.then(w, (F) => w(null, F || "unknown"));
  }), hs(() => {
    for (const h of p.values())
      h.reject(ua);
  }), new Promise((h) => {
    function b($) {
      function w() {
        $ === l ? h(f) : b(l);
      }
      $.then(w, w);
    }
    b(l);
  });
}
// @__NO_SIDE_EFFECTS__
function we(e) {
  const t = /* @__PURE__ */ Ya(e);
  return ji(t), t;
}
// @__NO_SIDE_EFFECTS__
function va(e) {
  const t = /* @__PURE__ */ Ya(e);
  return t.equals = ui, t;
}
function mi(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var a = 0; a < t.length; a += 1)
      Ut(
        /** @type {Effect} */
        t[a]
      );
  }
}
function Pc(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & jt) === 0)
      return (t.f & Tr) === 0 ? (
        /** @type {Effect} */
        t
      ) : null;
    t = t.parent;
  }
  return null;
}
function un(e) {
  var t, a = vt;
  $r(Pc(e));
  try {
    e.f &= ~ra, mi(e), t = qi(e);
  } finally {
    $r(a);
  }
  return t;
}
function yi(e) {
  var t = un(e);
  if (!e.equals(t) && (e.wv = Vi(), (!ft?.is_fork || e.deps === null) && (e.v = t, e.deps === null))) {
    Ct(e, It);
    return;
  }
  zr || (ur !== null ? (pn() || ft?.is_fork) && ur.set(e, t) : dn(e));
}
let Fs = /* @__PURE__ */ new Set();
const Hr = /* @__PURE__ */ new Map();
let wi = !1;
function aa(e, t) {
  var a = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: li,
    rv: 0,
    wv: 0
  };
  return a;
}
// @__NO_SIDE_EFFECTS__
function ve(e, t) {
  const a = aa(e);
  return ji(a), a;
}
// @__NO_SIDE_EFFECTS__
function vn(e, t = !1, a = !0) {
  const n = aa(e);
  return t || (n.equals = ui), ka && a && $t !== null && $t.l !== null && ($t.l.s ??= []).push(n), n;
}
function _(e, t, a = !1) {
  lt !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!fr || (lt.f & Nn) !== 0) && Wa() && (lt.f & (jt | Or | ln | Nn)) !== 0 && (ir === null || !_a.call(ir, e)) && pc();
  let n = a ? Vt(t) : t;
  return ya(e, n);
}
function ya(e, t) {
  if (!e.equals(t)) {
    var a = e.v;
    zr ? Hr.set(e, t) : Hr.set(e, a), e.v = t;
    var n = Rr.ensure();
    if (n.capture(e, a), (e.f & jt) !== 0) {
      const c = (
        /** @type {Derived} */
        e
      );
      (e.f & Bt) !== 0 && un(c), dn(c);
    }
    e.wv = Vi(), $i(e, Bt), Wa() && vt !== null && (vt.f & It) !== 0 && (vt.f & (_r | Wr)) === 0 && (rr === null ? jc([e]) : rr.push(e)), !n.is_fork && Fs.size > 0 && !wi && Tc();
  }
  return t;
}
function Tc() {
  wi = !1;
  for (const e of Fs)
    (e.f & It) !== 0 && Ct(e, xr), Ka(e) && Va(e);
  Fs.clear();
}
function La(e) {
  _(e, e.v + 1);
}
function $i(e, t) {
  var a = e.reactions;
  if (a !== null)
    for (var n = Wa(), c = a.length, l = 0; l < c; l++) {
      var f = a[l], v = f.f;
      if (!(!n && f === vt)) {
        var p = (v & Bt) === 0;
        if (p && Ct(f, t), (v & jt) !== 0) {
          var h = (
            /** @type {Derived} */
            f
          );
          ur?.delete(h), (v & ra) === 0 && (v & nr && (f.f |= ra), $i(h, xr));
        } else p && ((v & Or) !== 0 && Sr !== null && Sr.add(
          /** @type {Effect} */
          f
        ), vr(
          /** @type {Effect} */
          f
        ));
      }
    }
}
function Vt(e) {
  if (typeof e != "object" || e === null || qr in e)
    return e;
  const t = on(e);
  if (t !== ec && t !== tc)
    return e;
  var a = /* @__PURE__ */ new Map(), n = nn(e), c = /* @__PURE__ */ ve(0), l = Zr, f = (v) => {
    if (Zr === l)
      return v();
    var p = lt, h = Zr;
    cr(null), Vn(l);
    var b = v();
    return cr(p), Vn(h), b;
  };
  return n && a.set("length", /* @__PURE__ */ ve(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(v, p, h) {
        (!("value" in h) || h.configurable === !1 || h.enumerable === !1 || h.writable === !1) && vc();
        var b = a.get(p);
        return b === void 0 ? f(() => {
          var $ = /* @__PURE__ */ ve(h.value);
          return a.set(p, $), $;
        }) : _(b, h.value, !0), !0;
      },
      deleteProperty(v, p) {
        var h = a.get(p);
        if (h === void 0) {
          if (p in v) {
            const b = f(() => /* @__PURE__ */ ve(Ft));
            a.set(p, b), La(c);
          }
        } else
          _(h, Ft), La(c);
        return !0;
      },
      get(v, p, h) {
        if (p === qr)
          return e;
        var b = a.get(p), $ = p in v;
        if (b === void 0 && (!$ || fa(v, p)?.writable) && (b = f(() => {
          var F = Vt($ ? v[p] : Ft), D = /* @__PURE__ */ ve(F);
          return D;
        }), a.set(p, b)), b !== void 0) {
          var w = r(b);
          return w === Ft ? void 0 : w;
        }
        return Reflect.get(v, p, h);
      },
      getOwnPropertyDescriptor(v, p) {
        var h = Reflect.getOwnPropertyDescriptor(v, p);
        if (h && "value" in h) {
          var b = a.get(p);
          b && (h.value = r(b));
        } else if (h === void 0) {
          var $ = a.get(p), w = $?.v;
          if ($ !== void 0 && w !== Ft)
            return {
              enumerable: !0,
              configurable: !0,
              value: w,
              writable: !0
            };
        }
        return h;
      },
      has(v, p) {
        if (p === qr)
          return !0;
        var h = a.get(p), b = h !== void 0 && h.v !== Ft || Reflect.has(v, p);
        if (h !== void 0 || vt !== null && (!b || fa(v, p)?.writable)) {
          h === void 0 && (h = f(() => {
            var w = b ? Vt(v[p]) : Ft, F = /* @__PURE__ */ ve(w);
            return F;
          }), a.set(p, h));
          var $ = r(h);
          if ($ === Ft)
            return !1;
        }
        return b;
      },
      set(v, p, h, b) {
        var $ = a.get(p), w = p in v;
        if (n && p === "length")
          for (var F = h; F < /** @type {Source<number>} */
          $.v; F += 1) {
            var D = a.get(F + "");
            D !== void 0 ? _(D, Ft) : F in v && (D = f(() => /* @__PURE__ */ ve(Ft)), a.set(F + "", D));
          }
        if ($ === void 0)
          (!w || fa(v, p)?.writable) && ($ = f(() => /* @__PURE__ */ ve(void 0)), _($, Vt(h)), a.set(p, $));
        else {
          w = $.v !== Ft;
          var te = f(() => Vt(h));
          _($, te);
        }
        var P = Reflect.getOwnPropertyDescriptor(v, p);
        if (P?.set && P.set.call(b, h), !w) {
          if (n && typeof p == "string") {
            var q = (
              /** @type {Source<number>} */
              a.get("length")
            ), ue = Number(p);
            Number.isInteger(ue) && ue >= q.v && _(q, ue + 1);
          }
          La(c);
        }
        return !0;
      },
      ownKeys(v) {
        r(c);
        var p = Reflect.ownKeys(v).filter(($) => {
          var w = a.get($);
          return w === void 0 || w.v !== Ft;
        });
        for (var [h, b] of a)
          b.v !== Ft && !(h in v) && p.push(h);
        return p;
      },
      setPrototypeOf() {
        fc();
      }
    }
  );
}
function On(e) {
  try {
    if (e !== null && typeof e == "object" && qr in e)
      return e[qr];
  } catch {
  }
  return e;
}
function Rc(e, t) {
  return Object.is(On(e), On(t));
}
var Fn, ki, Ci, Si;
function js() {
  if (Fn === void 0) {
    Fn = window, ki = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, a = Text.prototype;
    Ci = fa(t, "firstChild").get, Si = fa(t, "nextSibling").get, Mn(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), Mn(a) && (a.__t = void 0);
  }
}
function Jt(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function sr(e) {
  return (
    /** @type {TemplateNode | null} */
    Ci.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function hr(e) {
  return (
    /** @type {TemplateNode | null} */
    Si.call(e)
  );
}
function i(e, t) {
  if (!ot)
    return /* @__PURE__ */ sr(e);
  var a = /* @__PURE__ */ sr(dt);
  if (a === null)
    a = dt.appendChild(Jt());
  else if (t && a.nodeType !== za) {
    var n = Jt();
    return a?.before(n), Gt(n), n;
  }
  return t && xs(
    /** @type {Text} */
    a
  ), Gt(a), a;
}
function it(e, t = !1) {
  if (!ot) {
    var a = /* @__PURE__ */ sr(e);
    return a instanceof Comment && a.data === "" ? /* @__PURE__ */ hr(a) : a;
  }
  if (t) {
    if (dt?.nodeType !== za) {
      var n = Jt();
      return dt?.before(n), Gt(n), n;
    }
    xs(
      /** @type {Text} */
      dt
    );
  }
  return dt;
}
function o(e, t = 1, a = !1) {
  let n = ot ? dt : e;
  for (var c; t--; )
    c = n, n = /** @type {TemplateNode} */
    /* @__PURE__ */ hr(n);
  if (!ot)
    return n;
  if (a) {
    if (n?.nodeType !== za) {
      var l = Jt();
      return n === null ? c?.after(l) : n.before(l), Gt(l), l;
    }
    xs(
      /** @type {Text} */
      n
    );
  }
  return Gt(n), n;
}
function fn(e) {
  e.textContent = "";
}
function Ei() {
  return !1;
}
function xs(e) {
  if (
    /** @type {string} */
    e.nodeValue.length < 65536
  )
    return;
  let t = e.nextSibling;
  for (; t !== null && t.nodeType === za; )
    t.remove(), e.nodeValue += /** @type {string} */
    t.nodeValue, t = e.nextSibling;
}
function Ca(e) {
  ot && /* @__PURE__ */ sr(e) !== null && fn(e);
}
let jn = !1;
function Ai() {
  jn || (jn = !0, document.addEventListener(
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
function _s(e) {
  var t = lt, a = vt;
  cr(null), $r(null);
  try {
    return e();
  } finally {
    cr(t), $r(a);
  }
}
function Di(e, t, a, n = a) {
  e.addEventListener(t, () => _s(a));
  const c = e.__on_r;
  c ? e.__on_r = () => {
    c(), n(!0);
  } : e.__on_r = () => n(!0), Ai();
}
function Pi(e) {
  vt === null && (lt === null && lc(), cc()), zr && oc();
}
function Ic(e, t) {
  var a = t.last;
  a === null ? t.last = t.first = e : (a.next = e, e.prev = a, t.last = e);
}
function gr(e, t, a) {
  var n = vt;
  n !== null && (n.f & Zt) !== 0 && (e |= Zt);
  var c = {
    ctx: $t,
    deps: null,
    nodes: null,
    f: e | Bt | nr,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: n,
    b: n && n.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  };
  if (a)
    try {
      Va(c), c.f |= fs;
    } catch (v) {
      throw Ut(c), v;
    }
  else t !== null && vr(c);
  var l = c;
  if (a && l.deps === null && l.teardown === null && l.nodes === null && l.first === l.last && // either `null`, or a singular child
  (l.f & na) === 0 && (l = l.first, (e & Or) !== 0 && (e & ha) !== 0 && l !== null && (l.f |= ha)), l !== null && (l.parent = n, n !== null && Ic(l, n), lt !== null && (lt.f & jt) !== 0 && (e & Wr) === 0)) {
    var f = (
      /** @type {Derived} */
      lt
    );
    (f.effects ??= []).push(l);
  }
  return c;
}
function pn() {
  return lt !== null && !fr;
}
function hs(e) {
  const t = gr(Ha, null, !1);
  return Ct(t, It), t.teardown = e, t;
}
function Rt(e) {
  Pi();
  var t = (
    /** @type {Effect} */
    vt.f
  ), a = !lt && (t & _r) !== 0 && (t & fs) === 0;
  if (a) {
    var n = (
      /** @type {ComponentContext} */
      $t
    );
    (n.e ??= []).push(e);
  } else
    return Ti(e);
}
function Ti(e) {
  return gr(is | ii, e, !1);
}
function Mc(e) {
  return Pi(), gr(Ha | ii, e, !0);
}
function Nc(e) {
  Rr.ensure();
  const t = gr(Wr | na, e, !0);
  return () => {
    Ut(t);
  };
}
function Lc(e) {
  Rr.ensure();
  const t = gr(Wr | na, e, !0);
  return (a = {}) => new Promise((n) => {
    a.outro ? Xr(t, () => {
      Ut(t), n(void 0);
    }) : (Ut(t), n(void 0));
  });
}
function xn(e) {
  return gr(is, e, !1);
}
function Oc(e) {
  return gr(ln | na, e, !0);
}
function gs(e, t = 0) {
  return gr(Ha | t, e, !0);
}
function g(e, t = [], a = [], n = []) {
  Ec(n, t, a, (c) => {
    gr(Ha, () => e(...c.map(r)), !0);
  });
}
function _n(e, t = 0) {
  var a = gr(Or | t, e, !0);
  return a;
}
function ar(e) {
  return gr(_r | na, e, !0);
}
function Ri(e) {
  var t = e.teardown;
  if (t !== null) {
    const a = zr, n = lt;
    Bn(!0), cr(null);
    try {
      t.call(null);
    } finally {
      Bn(a), cr(n);
    }
  }
}
function Ii(e, t = !1) {
  var a = e.first;
  for (e.first = e.last = null; a !== null; ) {
    const c = a.ac;
    c !== null && _s(() => {
      c.abort(ua);
    });
    var n = a.next;
    (a.f & Wr) !== 0 ? a.parent = null : Ut(a, t), a = n;
  }
}
function Fc(e) {
  for (var t = e.first; t !== null; ) {
    var a = t.next;
    (t.f & _r) === 0 && Ut(t), t = a;
  }
}
function Ut(e, t = !0) {
  var a = !1;
  (t || (e.f & ni) !== 0) && e.nodes !== null && e.nodes.end !== null && (Mi(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), a = !0), Ii(e, t && !a), ls(e, 0), Ct(e, Tr);
  var n = e.nodes && e.nodes.t;
  if (n !== null)
    for (const l of n)
      l.stop();
  Ri(e);
  var c = e.parent;
  c !== null && c.first !== null && Ni(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = null;
}
function Mi(e, t) {
  for (; e !== null; ) {
    var a = e === t ? null : /* @__PURE__ */ hr(e);
    e.remove(), e = a;
  }
}
function Ni(e) {
  var t = e.parent, a = e.prev, n = e.next;
  a !== null && (a.next = n), n !== null && (n.prev = a), t !== null && (t.first === e && (t.first = n), t.last === e && (t.last = a));
}
function Xr(e, t, a = !0) {
  var n = [];
  Li(e, n, !0);
  var c = () => {
    a && Ut(e), t && t();
  }, l = n.length;
  if (l > 0) {
    var f = () => --l || c();
    for (var v of n)
      v.out(f);
  } else
    c();
}
function Li(e, t, a) {
  if ((e.f & Zt) === 0) {
    e.f ^= Zt;
    var n = e.nodes && e.nodes.t;
    if (n !== null)
      for (const v of n)
        (v.is_global || a) && t.push(v);
    for (var c = e.first; c !== null; ) {
      var l = c.next, f = (c.f & ha) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (c.f & _r) !== 0 && (e.f & Or) !== 0;
      Li(c, t, f ? a : !1), c = l;
    }
  }
}
function hn(e) {
  Oi(e, !0);
}
function Oi(e, t) {
  if ((e.f & Zt) !== 0) {
    e.f ^= Zt, (e.f & It) === 0 && (Ct(e, Bt), vr(e));
    for (var a = e.first; a !== null; ) {
      var n = a.next, c = (a.f & ha) !== 0 || (a.f & _r) !== 0;
      Oi(a, c ? t : !1), a = n;
    }
    var l = e.nodes && e.nodes.t;
    if (l !== null)
      for (const f of l)
        (f.is_global || t) && f.in();
  }
}
function Fi(e, t) {
  if (e.nodes)
    for (var a = e.nodes.start, n = e.nodes.end; a !== null; ) {
      var c = a === n ? null : /* @__PURE__ */ hr(a);
      t.append(a), a = c;
    }
}
let Qa = !1, zr = !1;
function Bn(e) {
  zr = e;
}
let lt = null, fr = !1;
function cr(e) {
  lt = e;
}
let vt = null;
function $r(e) {
  vt = e;
}
let ir = null;
function ji(e) {
  lt !== null && (ir === null ? ir = [e] : ir.push(e));
}
let Kt = null, Qt = 0, rr = null;
function jc(e) {
  rr = e;
}
let Bi = 1, Jr = 0, Zr = Jr;
function Vn(e) {
  Zr = e;
}
function Vi() {
  return ++Bi;
}
function Ka(e) {
  var t = e.f;
  if ((t & Bt) !== 0)
    return !0;
  if (t & jt && (e.f &= ~ra), (t & xr) !== 0) {
    for (var a = (
      /** @type {Value[]} */
      e.deps
    ), n = a.length, c = 0; c < n; c++) {
      var l = a[c];
      if (Ka(
        /** @type {Derived} */
        l
      ) && yi(
        /** @type {Derived} */
        l
      ), l.wv > e.wv)
        return !0;
    }
    (t & nr) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    ur === null && Ct(e, It);
  }
  return !1;
}
function Gi(e, t, a = !0) {
  var n = e.reactions;
  if (n !== null && !(ir !== null && _a.call(ir, e)))
    for (var c = 0; c < n.length; c++) {
      var l = n[c];
      (l.f & jt) !== 0 ? Gi(
        /** @type {Derived} */
        l,
        t,
        !1
      ) : t === l && (a ? Ct(l, Bt) : (l.f & It) !== 0 && Ct(l, xr), vr(
        /** @type {Effect} */
        l
      ));
    }
}
function qi(e) {
  var t = Kt, a = Qt, n = rr, c = lt, l = ir, f = $t, v = fr, p = Zr, h = e.f;
  Kt = /** @type {null | Value[]} */
  null, Qt = 0, rr = null, lt = (h & (_r | Wr)) === 0 ? e : null, ir = null, ba(e.ctx), fr = !1, Zr = ++Jr, e.ac !== null && (_s(() => {
    e.ac.abort(ua);
  }), e.ac = null);
  try {
    e.f |= Ns;
    var b = (
      /** @type {Function} */
      e.fn
    ), $ = b(), w = e.deps, F = ft?.is_fork;
    if (Kt !== null) {
      var D;
      if (F || ls(e, Qt), w !== null && Qt > 0)
        for (w.length = Qt + Kt.length, D = 0; D < Kt.length; D++)
          w[Qt + D] = Kt[D];
      else
        e.deps = w = Kt;
      if (pn() && (e.f & nr) !== 0)
        for (D = Qt; D < w.length; D++)
          (w[D].reactions ??= []).push(e);
    } else !F && w !== null && Qt < w.length && (ls(e, Qt), w.length = Qt);
    if (Wa() && rr !== null && !fr && w !== null && (e.f & (jt | xr | Bt)) === 0)
      for (D = 0; D < /** @type {Source[]} */
      rr.length; D++)
        Gi(
          rr[D],
          /** @type {Effect} */
          e
        );
    if (c !== null && c !== e) {
      if (Jr++, c.deps !== null)
        for (let te = 0; te < a; te += 1)
          c.deps[te].rv = Jr;
      if (t !== null)
        for (const te of t)
          te.rv = Jr;
      rr !== null && (n === null ? n = rr : n.push(.../** @type {Source[]} */
      rr));
    }
    return (e.f & Gr) !== 0 && (e.f ^= Gr), $;
  } catch (te) {
    return fi(te);
  } finally {
    e.f ^= Ns, Kt = t, Qt = a, rr = n, lt = c, ir = l, ba(f), fr = v, Zr = p;
  }
}
function Bc(e, t) {
  let a = t.reactions;
  if (a !== null) {
    var n = Zo.call(a, e);
    if (n !== -1) {
      var c = a.length - 1;
      c === 0 ? a = t.reactions = null : (a[n] = a[c], a.pop());
    }
  }
  if (a === null && (t.f & jt) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (Kt === null || !_a.call(Kt, t))) {
    var l = (
      /** @type {Derived} */
      t
    );
    (l.f & nr) !== 0 && (l.f ^= nr, l.f &= ~ra), dn(l), mi(l), ls(l, 0);
  }
}
function ls(e, t) {
  var a = e.deps;
  if (a !== null)
    for (var n = t; n < a.length; n++)
      Bc(e, a[n]);
}
function Va(e) {
  var t = e.f;
  if ((t & Tr) === 0) {
    Ct(e, It);
    var a = vt, n = Qa;
    vt = e, Qa = !0;
    try {
      (t & (Or | si)) !== 0 ? Fc(e) : Ii(e), Ri(e);
      var c = qi(e);
      e.teardown = typeof c == "function" ? c : null, e.wv = Bi;
      var l;
      Is && gc && (e.f & Bt) !== 0 && e.deps;
    } finally {
      Qa = n, vt = a;
    }
  }
}
async function gn() {
  await Promise.resolve(), ut();
}
function r(e) {
  var t = e.f, a = (t & jt) !== 0;
  if (lt !== null && !fr) {
    var n = vt !== null && (vt.f & Tr) !== 0;
    if (!n && (ir === null || !_a.call(ir, e))) {
      var c = lt.deps;
      if ((lt.f & Ns) !== 0)
        e.rv < Jr && (e.rv = Jr, Kt === null && c !== null && c[Qt] === e ? Qt++ : Kt === null ? Kt = [e] : Kt.push(e));
      else {
        (lt.deps ??= []).push(e);
        var l = e.reactions;
        l === null ? e.reactions = [lt] : _a.call(l, lt) || l.push(lt);
      }
    }
  }
  if (zr && Hr.has(e))
    return Hr.get(e);
  if (a) {
    var f = (
      /** @type {Derived} */
      e
    );
    if (zr) {
      var v = f.v;
      return ((f.f & It) === 0 && f.reactions !== null || zi(f)) && (v = un(f)), Hr.set(f, v), v;
    }
    var p = (f.f & nr) === 0 && !fr && lt !== null && (Qa || (lt.f & nr) !== 0), h = f.deps === null;
    Ka(f) && (p && (f.f |= nr), yi(f)), p && !h && Hi(f);
  }
  if (ur?.has(e))
    return ur.get(e);
  if ((e.f & Gr) !== 0)
    throw e.v;
  return e.v;
}
function Hi(e) {
  if (e.deps !== null) {
    e.f |= nr;
    for (const t of e.deps)
      (t.reactions ??= []).push(e), (t.f & jt) !== 0 && (t.f & nr) === 0 && Hi(
        /** @type {Derived} */
        t
      );
  }
}
function zi(e) {
  if (e.v === Ft) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (Hr.has(t) || (t.f & jt) !== 0 && zi(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function oa(e) {
  var t = fr;
  try {
    return fr = !0, e();
  } finally {
    fr = t;
  }
}
function Vc(e) {
  if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
    if (qr in e)
      Bs(e);
    else if (!Array.isArray(e))
      for (let t in e) {
        const a = e[t];
        typeof a == "object" && a && qr in a && Bs(a);
      }
  }
}
function Bs(e, t = /* @__PURE__ */ new Set()) {
  if (typeof e == "object" && e !== null && // We don't want to traverse DOM elements
  !(e instanceof EventTarget) && !t.has(e)) {
    t.add(e), e instanceof Date && e.getTime();
    for (let n in e)
      try {
        Bs(e[n], t);
      } catch {
      }
    const a = on(e);
    if (a !== Object.prototype && a !== Array.prototype && a !== Map.prototype && a !== Set.prototype && a !== Date.prototype) {
      const n = ri(a);
      for (let c in n) {
        const l = n[c].get;
        if (l)
          try {
            l.call(e);
          } catch {
          }
      }
    }
  }
}
const Ui = /* @__PURE__ */ new Set(), Vs = /* @__PURE__ */ new Set();
function Gc(e, t, a, n = {}) {
  function c(l) {
    if (n.capture || Ia.call(t, l), !l.cancelBubble)
      return _s(() => a?.call(this, l));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? yr(() => {
    t.addEventListener(e, c, n);
  }) : t.addEventListener(e, c, n), c;
}
function Ot(e, t, a, n, c) {
  var l = { capture: n, passive: c }, f = Gc(e, t, a, l);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && hs(() => {
    t.removeEventListener(e, f, l);
  });
}
function At(e) {
  for (var t = 0; t < e.length; t++)
    Ui.add(e[t]);
  for (var a of Vs)
    a(e);
}
let Gn = null;
function Ia(e) {
  var t = this, a = (
    /** @type {Node} */
    t.ownerDocument
  ), n = e.type, c = e.composedPath?.() || [], l = (
    /** @type {null | Element} */
    c[0] || e.target
  );
  Gn = e;
  var f = 0, v = Gn === e && e.__root;
  if (v) {
    var p = c.indexOf(v);
    if (p !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e.__root = t;
      return;
    }
    var h = c.indexOf(t);
    if (h === -1)
      return;
    p <= h && (f = p);
  }
  if (l = /** @type {Element} */
  c[f] || e.target, l !== t) {
    Ba(e, "currentTarget", {
      configurable: !0,
      get() {
        return l || a;
      }
    });
    var b = lt, $ = vt;
    cr(null), $r(null);
    try {
      for (var w, F = []; l !== null; ) {
        var D = l.assignedSlot || l.parentNode || /** @type {any} */
        l.host || null;
        try {
          var te = l["__" + n];
          te != null && (!/** @type {any} */
          l.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === l) && te.call(l, e);
        } catch (P) {
          w ? F.push(P) : w = P;
        }
        if (e.cancelBubble || D === t || D === null)
          break;
        l = D;
      }
      if (w) {
        for (let P of F)
          queueMicrotask(() => {
            throw P;
          });
        throw w;
      }
    } finally {
      e.__root = t, delete e.currentTarget, cr(b), $r($);
    }
  }
}
function Wi(e) {
  var t = document.createElement("template");
  return t.innerHTML = e.replaceAll("<!>", "<!---->"), t.content;
}
function wr(e, t) {
  var a = (
    /** @type {Effect} */
    vt
  );
  a.nodes === null && (a.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function u(e, t) {
  var a = (t & Jo) !== 0, n = (t & Qo) !== 0, c, l = !e.startsWith("<!>");
  return () => {
    if (ot)
      return wr(dt, null), dt;
    c === void 0 && (c = Wi(l ? e : "<!>" + e), a || (c = /** @type {TemplateNode} */
    /* @__PURE__ */ sr(c)));
    var f = (
      /** @type {TemplateNode} */
      n || ki ? document.importNode(c, !0) : c.cloneNode(!0)
    );
    if (a) {
      var v = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ sr(f)
      ), p = (
        /** @type {TemplateNode} */
        f.lastChild
      );
      wr(v, p);
    } else
      wr(f, f);
    return f;
  };
}
function As(e = "") {
  if (!ot) {
    var t = Jt(e + "");
    return wr(t, t), t;
  }
  var a = dt;
  return a.nodeType !== za ? (a.before(a = Jt()), Gt(a)) : xs(
    /** @type {Text} */
    a
  ), wr(a, a), a;
}
function or() {
  if (ot)
    return wr(dt, null), dt;
  var e = document.createDocumentFragment(), t = document.createComment(""), a = Jt();
  return e.append(t, a), wr(t, a), e;
}
function d(e, t) {
  if (ot) {
    var a = (
      /** @type {Effect & { nodes: EffectNodes }} */
      vt
    );
    ((a.f & fs) === 0 || a.nodes.end === null) && (a.nodes.end = dt), ga();
    return;
  }
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
const qc = ["touchstart", "touchmove"];
function Hc(e) {
  return qc.includes(e);
}
function x(e, t) {
  var a = t == null ? "" : typeof t == "object" ? t + "" : t;
  a !== (e.__t ??= e.nodeValue) && (e.__t = a, e.nodeValue = a + "");
}
function Yi(e, t) {
  return Ki(e, t);
}
function zc(e, t) {
  js(), t.intro = t.intro ?? !1;
  const a = t.target, n = ot, c = dt;
  try {
    for (var l = /* @__PURE__ */ sr(a); l && (l.nodeType !== ia || /** @type {Comment} */
    l.data !== an); )
      l = /* @__PURE__ */ hr(l);
    if (!l)
      throw ta;
    Dr(!0), Gt(
      /** @type {Comment} */
      l
    );
    const f = Ki(e, { ...t, anchor: l });
    return Dr(!1), /**  @type {Exports} */
    f;
  } catch (f) {
    if (f instanceof Error && f.message.split(`
`).some((v) => v.startsWith("https://svelte.dev/e/")))
      throw f;
    return f !== ta && console.warn("Failed to hydrate: ", f), t.recover === !1 && uc(), js(), fn(a), Dr(!1), Yi(e, t);
  } finally {
    Dr(n), Gt(c);
  }
}
const la = /* @__PURE__ */ new Map();
function Ki(e, { target: t, anchor: a, props: n = {}, events: c, context: l, intro: f = !0 }) {
  js();
  var v = /* @__PURE__ */ new Set(), p = ($) => {
    for (var w = 0; w < $.length; w++) {
      var F = $[w];
      if (!v.has(F)) {
        v.add(F);
        var D = Hc(F);
        t.addEventListener(F, Ia, { passive: D });
        var te = la.get(F);
        te === void 0 ? (document.addEventListener(F, Ia, { passive: D }), la.set(F, 1)) : la.set(F, te + 1);
      }
    }
  };
  p(vs(Ui)), Vs.add(p);
  var h = void 0, b = Lc(() => {
    var $ = a ?? t.appendChild(Jt());
    return Cc(
      /** @type {TemplateNode} */
      $,
      {
        pending: () => {
        }
      },
      (w) => {
        bt({});
        var F = (
          /** @type {ComponentContext} */
          $t
        );
        if (l && (F.c = l), c && (n.$$events = c), ot && wr(
          /** @type {TemplateNode} */
          w,
          null
        ), h = e(w, n) || {}, ot && (vt.nodes.end = dt, dt === null || dt.nodeType !== ia || /** @type {Comment} */
        dt.data !== sn))
          throw Ua(), ta;
        mt();
      }
    ), () => {
      for (var w of v) {
        t.removeEventListener(w, Ia);
        var F = (
          /** @type {number} */
          la.get(w)
        );
        --F === 0 ? (document.removeEventListener(w, Ia), la.delete(w)) : la.set(w, F);
      }
      Vs.delete(p), $ !== a && $.parentNode?.removeChild($);
    };
  });
  return Gs.set(h, b), h;
}
let Gs = /* @__PURE__ */ new WeakMap();
function Uc(e, t) {
  const a = Gs.get(e);
  return a ? (Gs.delete(e), a(t)) : Promise.resolve();
}
class Wc {
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
  constructor(t, a = !0) {
    this.anchor = t, this.#o = a;
  }
  #s = () => {
    var t = (
      /** @type {Batch} */
      ft
    );
    if (this.#e.has(t)) {
      var a = (
        /** @type {Key} */
        this.#e.get(t)
      ), n = this.#t.get(a);
      if (n)
        hn(n), this.#i.delete(a);
      else {
        var c = this.#r.get(a);
        c && (this.#t.set(a, c.effect), this.#r.delete(a), c.fragment.lastChild.remove(), this.anchor.before(c.fragment), n = c.effect);
      }
      for (const [l, f] of this.#e) {
        if (this.#e.delete(l), l === t)
          break;
        const v = this.#r.get(f);
        v && (Ut(v.effect), this.#r.delete(f));
      }
      for (const [l, f] of this.#t) {
        if (l === a || this.#i.has(l)) continue;
        const v = () => {
          if (Array.from(this.#e.values()).includes(l)) {
            var h = document.createDocumentFragment();
            Fi(f, h), h.append(Jt()), this.#r.set(l, { effect: f, fragment: h });
          } else
            Ut(f);
          this.#i.delete(l), this.#t.delete(l);
        };
        this.#o || !n ? (this.#i.add(l), Xr(f, v, !1)) : v();
      }
    }
  };
  /**
   * @param {Batch} batch
   */
  #a = (t) => {
    this.#e.delete(t);
    const a = Array.from(this.#e.values());
    for (const [n, c] of this.#r)
      a.includes(n) || (Ut(c.effect), this.#r.delete(n));
  };
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(t, a) {
    var n = (
      /** @type {Batch} */
      ft
    ), c = Ei();
    if (a && !this.#t.has(t) && !this.#r.has(t))
      if (c) {
        var l = document.createDocumentFragment(), f = Jt();
        l.append(f), this.#r.set(t, {
          effect: ar(() => a(f)),
          fragment: l
        });
      } else
        this.#t.set(
          t,
          ar(() => a(this.anchor))
        );
    if (this.#e.set(n, t), c) {
      for (const [v, p] of this.#t)
        v === t ? n.unskip_effect(p) : n.skip_effect(p);
      for (const [v, p] of this.#r)
        v === t ? n.unskip_effect(p.effect) : n.skip_effect(p.effect);
      n.oncommit(this.#s), n.ondiscard(this.#a);
    } else
      ot && (this.anchor = dt), this.#s();
  }
}
function Ji(e) {
  $t === null && oi(), ka && $t.l !== null ? Kc($t).m.push(e) : Rt(() => {
    const t = oa(e);
    if (typeof t == "function") return (
      /** @type {() => void} */
      t
    );
  });
}
function Yc(e) {
  $t === null && oi(), Ji(() => () => oa(e));
}
function Kc(e) {
  var t = (
    /** @type {ComponentContextLegacy} */
    e.l
  );
  return t.u ??= { a: [], b: [], m: [] };
}
function A(e, t, a = !1) {
  ot && ga();
  var n = new Wc(e), c = a ? ha : 0;
  function l(f, v) {
    if (ot) {
      const b = ci(e);
      var p;
      if (b === an ? p = 0 : b === us ? p = !1 : p = parseInt(b.substring(1)), f !== p) {
        var h = os();
        Gt(h), n.anchor = h, Dr(!1), n.ensure(f, v), Dr(!0);
        return;
      }
    }
    n.ensure(f, v);
  }
  _n(() => {
    var f = !1;
    t((v, p = 0) => {
      f = !0, l(p, v);
    }), f || l(!1, null);
  }, c);
}
function ct(e, t) {
  return t;
}
function Jc(e, t, a) {
  for (var n = [], c = t.length, l, f = t.length, v = 0; v < c; v++) {
    let $ = t[v];
    Xr(
      $,
      () => {
        if (l) {
          if (l.pending.delete($), l.done.add($), l.pending.size === 0) {
            var w = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            qs(vs(l.done)), w.delete(l), w.size === 0 && (e.outrogroups = null);
          }
        } else
          f -= 1;
      },
      !1
    );
  }
  if (f === 0) {
    var p = n.length === 0 && a !== null;
    if (p) {
      var h = (
        /** @type {Element} */
        a
      ), b = (
        /** @type {Element} */
        h.parentNode
      );
      fn(b), b.append(h), e.items.clear();
    }
    qs(t, !p);
  } else
    l = {
      pending: new Set(t),
      done: /* @__PURE__ */ new Set()
    }, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(l);
}
function qs(e, t = !0) {
  for (var a = 0; a < e.length; a++)
    Ut(e[a], t);
}
var qn;
function He(e, t, a, n, c, l = null) {
  var f = e, v = /* @__PURE__ */ new Map(), p = (t & ti) !== 0;
  if (p) {
    var h = (
      /** @type {Element} */
      e
    );
    f = ot ? Gt(/* @__PURE__ */ sr(h)) : h.appendChild(Jt());
  }
  ot && ga();
  var b = null, $ = /* @__PURE__ */ va(() => {
    var q = a();
    return nn(q) ? q : q == null ? [] : vs(q);
  }), w, F = !0;
  function D() {
    P.fallback = b, Qc(P, w, f, t, n), b !== null && (w.length === 0 ? (b.f & Ar) === 0 ? hn(b) : (b.f ^= Ar, Ma(b, null, f)) : Xr(b, () => {
      b = null;
    }));
  }
  var te = _n(() => {
    w = /** @type {V[]} */
    r($);
    var q = w.length;
    let ue = !1;
    if (ot) {
      var Ce = ci(f) === us;
      Ce !== (q === 0) && (f = os(), Gt(f), Dr(!1), ue = !0);
    }
    for (var ge = /* @__PURE__ */ new Set(), fe = (
      /** @type {Batch} */
      ft
    ), ie = Ei(), Fe = 0; Fe < q; Fe += 1) {
      ot && dt.nodeType === ia && /** @type {Comment} */
      dt.data === sn && (f = /** @type {Comment} */
      dt, ue = !0, Dr(!1));
      var Pe = w[Fe], Ie = n(Pe, Fe), ce = F ? null : v.get(Ie);
      ce ? (ce.v && ya(ce.v, Pe), ce.i && ya(ce.i, Fe), ie && fe.unskip_effect(ce.e)) : (ce = Xc(
        v,
        F ? f : qn ??= Jt(),
        Pe,
        Ie,
        Fe,
        c,
        t,
        a
      ), F || (ce.e.f |= Ar), v.set(Ie, ce)), ge.add(Ie);
    }
    if (q === 0 && l && !b && (F ? b = ar(() => l(f)) : (b = ar(() => l(qn ??= Jt())), b.f |= Ar)), q > ge.size && ic(), ot && q > 0 && Gt(os()), !F)
      if (ie) {
        for (const [G, M] of v)
          ge.has(G) || fe.skip_effect(M.e);
        fe.oncommit(D), fe.ondiscard(() => {
        });
      } else
        D();
    ue && Dr(!0), r($);
  }), P = { effect: te, items: v, outrogroups: null, fallback: b };
  F = !1, ot && (f = dt);
}
function Pa(e) {
  for (; e !== null && (e.f & _r) === 0; )
    e = e.next;
  return e;
}
function Qc(e, t, a, n, c) {
  var l = (n & zo) !== 0, f = t.length, v = e.items, p = Pa(e.effect.first), h, b = null, $, w = [], F = [], D, te, P, q;
  if (l)
    for (q = 0; q < f; q += 1)
      D = t[q], te = c(D, q), P = /** @type {EachItem} */
      v.get(te).e, (P.f & Ar) === 0 && (P.nodes?.a?.measure(), ($ ??= /* @__PURE__ */ new Set()).add(P));
  for (q = 0; q < f; q += 1) {
    if (D = t[q], te = c(D, q), P = /** @type {EachItem} */
    v.get(te).e, e.outrogroups !== null)
      for (const ce of e.outrogroups)
        ce.pending.delete(P), ce.done.delete(P);
    if ((P.f & Ar) !== 0)
      if (P.f ^= Ar, P === p)
        Ma(P, null, a);
      else {
        var ue = b ? b.next : p;
        P === e.effect.last && (e.effect.last = P.prev), P.prev && (P.prev.next = P.next), P.next && (P.next.prev = P.prev), jr(e, b, P), jr(e, P, ue), Ma(P, ue, a), b = P, w = [], F = [], p = Pa(b.next);
        continue;
      }
    if ((P.f & Zt) !== 0 && (hn(P), l && (P.nodes?.a?.unfix(), ($ ??= /* @__PURE__ */ new Set()).delete(P))), P !== p) {
      if (h !== void 0 && h.has(P)) {
        if (w.length < F.length) {
          var Ce = F[0], ge;
          b = Ce.prev;
          var fe = w[0], ie = w[w.length - 1];
          for (ge = 0; ge < w.length; ge += 1)
            Ma(w[ge], Ce, a);
          for (ge = 0; ge < F.length; ge += 1)
            h.delete(F[ge]);
          jr(e, fe.prev, ie.next), jr(e, b, fe), jr(e, ie, Ce), p = Ce, b = ie, q -= 1, w = [], F = [];
        } else
          h.delete(P), Ma(P, p, a), jr(e, P.prev, P.next), jr(e, P, b === null ? e.effect.first : b.next), jr(e, b, P), b = P;
        continue;
      }
      for (w = [], F = []; p !== null && p !== P; )
        (h ??= /* @__PURE__ */ new Set()).add(p), F.push(p), p = Pa(p.next);
      if (p === null)
        continue;
    }
    (P.f & Ar) === 0 && w.push(P), b = P, p = Pa(P.next);
  }
  if (e.outrogroups !== null) {
    for (const ce of e.outrogroups)
      ce.pending.size === 0 && (qs(vs(ce.done)), e.outrogroups?.delete(ce));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (p !== null || h !== void 0) {
    var Fe = [];
    if (h !== void 0)
      for (P of h)
        (P.f & Zt) === 0 && Fe.push(P);
    for (; p !== null; )
      (p.f & Zt) === 0 && p !== e.fallback && Fe.push(p), p = Pa(p.next);
    var Pe = Fe.length;
    if (Pe > 0) {
      var Ie = (n & ti) !== 0 && f === 0 ? a : null;
      if (l) {
        for (q = 0; q < Pe; q += 1)
          Fe[q].nodes?.a?.measure();
        for (q = 0; q < Pe; q += 1)
          Fe[q].nodes?.a?.fix();
      }
      Jc(e, Fe, Ie);
    }
  }
  l && yr(() => {
    if ($ !== void 0)
      for (P of $)
        P.nodes?.a?.apply();
  });
}
function Xc(e, t, a, n, c, l, f, v) {
  var p = (f & qo) !== 0 ? (f & Uo) === 0 ? /* @__PURE__ */ vn(a, !1, !1) : aa(a) : null, h = (f & Ho) !== 0 ? aa(c) : null;
  return {
    v: p,
    i: h,
    e: ar(() => (l(t, p ?? a, h ?? c, v), () => {
      e.delete(n);
    }))
  };
}
function Ma(e, t, a) {
  if (e.nodes)
    for (var n = e.nodes.start, c = e.nodes.end, l = t && (t.f & Ar) === 0 ? (
      /** @type {EffectNodes} */
      t.nodes.start
    ) : a; n !== null; ) {
      var f = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ hr(n)
      );
      if (l.before(n), n === c)
        return;
      n = f;
    }
}
function jr(e, t, a) {
  t === null ? e.effect.first = a : t.next = a, a === null ? e.effect.last = t : a.prev = t;
}
function Zc(e, t, a = !1, n = !1, c = !1) {
  var l = e, f = "";
  g(() => {
    var v = (
      /** @type {Effect} */
      vt
    );
    if (f === (f = t() ?? "")) {
      ot && ga();
      return;
    }
    if (v.nodes !== null && (Mi(
      v.nodes.start,
      /** @type {TemplateNode} */
      v.nodes.end
    ), v.nodes = null), f !== "") {
      if (ot) {
        dt.data;
        for (var p = ga(), h = p; p !== null && (p.nodeType !== ia || /** @type {Comment} */
        p.data !== ""); )
          h = p, p = /* @__PURE__ */ hr(p);
        if (p === null)
          throw Ua(), ta;
        wr(dt, h), l = Gt(p);
        return;
      }
      var b = f + "";
      a ? b = `<svg>${b}</svg>` : n && (b = `<math>${b}</math>`);
      var $ = Wi(b);
      if ((a || n) && ($ = /** @type {Element} */
      /* @__PURE__ */ sr($)), wr(
        /** @type {TemplateNode} */
        /* @__PURE__ */ sr($),
        /** @type {TemplateNode} */
        $.lastChild
      ), a || n)
        for (; /* @__PURE__ */ sr($); )
          l.before(
            /** @type {TemplateNode} */
            /* @__PURE__ */ sr($)
          );
      else
        l.before($);
    }
  });
}
function Qi(e, t) {
  xn(() => {
    var a = e.getRootNode(), n = (
      /** @type {ShadowRoot} */
      a.host ? (
        /** @type {ShadowRoot} */
        a
      ) : (
        /** @type {Document} */
        a.head ?? /** @type {Document} */
        a.ownerDocument.head
      )
    );
    if (!n.querySelector("#" + t.hash)) {
      const c = document.createElement("style");
      c.id = t.hash, c.textContent = t.code, n.appendChild(c);
    }
  });
}
function el(e, t, a) {
  var n = e == null ? "" : "" + e;
  return t && (n = n ? n + " " + t : t), n === "" ? null : n;
}
function tl(e, t) {
  return e == null ? null : String(e);
}
function Re(e, t, a, n, c, l) {
  var f = e.__className;
  if (ot || f !== a || f === void 0) {
    var v = el(a, n);
    (!ot || v !== e.getAttribute("class")) && (v == null ? e.removeAttribute("class") : e.className = v), e.__className = a;
  }
  return l;
}
function dr(e, t, a, n) {
  var c = e.__style;
  if (ot || c !== t) {
    var l = tl(t);
    (!ot || l !== e.getAttribute("style")) && (l == null ? e.removeAttribute("style") : e.style.cssText = l), e.__style = t;
  }
  return n;
}
function Xi(e, t, a = !1) {
  if (e.multiple) {
    if (t == null)
      return;
    if (!nn(t))
      return _c();
    for (var n of e.options)
      n.selected = t.includes(Oa(n));
    return;
  }
  for (n of e.options) {
    var c = Oa(n);
    if (Rc(c, t)) {
      n.selected = !0;
      return;
    }
  }
  (!a || t !== void 0) && (e.selectedIndex = -1);
}
function rl(e) {
  var t = new MutationObserver(() => {
    Xi(e, e.__value);
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
  }), hs(() => {
    t.disconnect();
  });
}
function Ga(e, t, a = t) {
  var n = /* @__PURE__ */ new WeakSet(), c = !0;
  Di(e, "change", (l) => {
    var f = l ? "[selected]" : ":checked", v;
    if (e.multiple)
      v = [].map.call(e.querySelectorAll(f), Oa);
    else {
      var p = e.querySelector(f) ?? // will fall back to first non-disabled option if no option is selected
      e.querySelector("option:not([disabled])");
      v = p && Oa(p);
    }
    a(v), ft !== null && n.add(ft);
  }), xn(() => {
    var l = t();
    if (e === document.activeElement) {
      var f = (
        /** @type {Batch} */
        cs ?? ft
      );
      if (n.has(f))
        return;
    }
    if (Xi(e, l, c), c && l === void 0) {
      var v = e.querySelector(":checked");
      v !== null && (l = Oa(v), a(l));
    }
    e.__value = l, c = !1;
  }), rl(e);
}
function Oa(e) {
  return "__value" in e ? e.__value : e.value;
}
const al = /* @__PURE__ */ Symbol("is custom element"), sl = /* @__PURE__ */ Symbol("is html");
function wt(e) {
  if (ot) {
    var t = !1, a = () => {
      if (!t) {
        if (t = !0, e.hasAttribute("value")) {
          var n = e.value;
          Mt(e, "value", null), e.value = n;
        }
        if (e.hasAttribute("checked")) {
          var c = e.checked;
          Mt(e, "checked", null), e.checked = c;
        }
      }
    };
    e.__on_r = a, yr(a), Ai();
  }
}
function Mt(e, t, a, n) {
  var c = nl(e);
  ot && (c[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === "LINK") || c[t] !== (c[t] = a) && (t === "loading" && (e[sc] = a), a == null ? e.removeAttribute(t) : typeof a != "string" && il(e).includes(t) ? e[t] = a : e.setAttribute(t, a));
}
function nl(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    e.__attributes ??= {
      [al]: e.nodeName.includes("-"),
      [sl]: e.namespaceURI === Xo
    }
  );
}
var Hn = /* @__PURE__ */ new Map();
function il(e) {
  var t = e.getAttribute("is") || e.nodeName, a = Hn.get(t);
  if (a) return a;
  Hn.set(t, a = []);
  for (var n, c = e, l = Element.prototype; l !== c; ) {
    n = ri(c);
    for (var f in n)
      n[f].set && a.push(f);
    c = on(c);
  }
  return a;
}
function xt(e, t, a = t) {
  var n = /* @__PURE__ */ new WeakSet();
  Di(e, "input", async (c) => {
    var l = c ? e.defaultValue : e.value;
    if (l = Ds(e) ? Ps(l) : l, a(l), ft !== null && n.add(ft), await gn(), l !== (l = t())) {
      var f = e.selectionStart, v = e.selectionEnd, p = e.value.length;
      if (e.value = l ?? "", v !== null) {
        var h = e.value.length;
        f === v && v === p && h > p ? (e.selectionStart = h, e.selectionEnd = h) : (e.selectionStart = f, e.selectionEnd = Math.min(v, h));
      }
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  (ot && e.defaultValue !== e.value || // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  oa(t) == null && e.value) && (a(Ds(e) ? Ps(e.value) : e.value), ft !== null && n.add(ft)), gs(() => {
    var c = t();
    if (e === document.activeElement) {
      var l = (
        /** @type {Batch} */
        cs ?? ft
      );
      if (n.has(l))
        return;
    }
    Ds(e) && c === Ps(e.value) || e.type === "date" && !c && !e.value || c !== e.value && (e.value = c ?? "");
  });
}
function Ds(e) {
  var t = e.type;
  return t === "number" || t === "range";
}
function Ps(e) {
  return e === "" ? null : +e;
}
function zn(e, t) {
  return e === t || e?.[qr] === t;
}
function ea(e = {}, t, a, n) {
  return xn(() => {
    var c, l;
    return gs(() => {
      c = l, l = [], oa(() => {
        e !== a(...l) && (t(e, ...l), c && zn(a(...c), e) && t(null, ...c));
      });
    }), () => {
      yr(() => {
        l && zn(a(...l), e) && t(null, ...l);
      });
    };
  }), e;
}
function ol(e = !1) {
  const t = (
    /** @type {ComponentContextLegacy} */
    $t
  ), a = t.l.u;
  if (!a) return;
  let n = () => Vc(t.s);
  if (e) {
    let c = 0, l = (
      /** @type {Record<string, any>} */
      {}
    );
    const f = /* @__PURE__ */ Ya(() => {
      let v = !1;
      const p = t.s;
      for (const h in p)
        p[h] !== l[h] && (l[h] = p[h], v = !0);
      return v && c++, c;
    });
    n = () => r(f);
  }
  a.b.length && Mc(() => {
    Un(t, n), ns(a.b);
  }), Rt(() => {
    const c = oa(() => a.m.map(rc));
    return () => {
      for (const l of c)
        typeof l == "function" && l();
    };
  }), a.a.length && Rt(() => {
    Un(t, n), ns(a.a);
  });
}
function Un(e, t) {
  if (e.l.s)
    for (const a of e.l.s) r(a);
  t();
}
function bn(e, t, a) {
  if (e == null)
    return t(void 0), a && a(void 0), Pr;
  const n = oa(
    () => e.subscribe(
      t,
      // @ts-expect-error
      a
    )
  );
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
const da = [];
function cl(e, t) {
  return {
    subscribe: et(e, t).subscribe
  };
}
function et(e, t = Pr) {
  let a = null;
  const n = /* @__PURE__ */ new Set();
  function c(v) {
    if (di(e, v) && (e = v, a)) {
      const p = !da.length;
      for (const h of n)
        h[1](), da.push(h, e);
      if (p) {
        for (let h = 0; h < da.length; h += 2)
          da[h][0](da[h + 1]);
        da.length = 0;
      }
    }
  }
  function l(v) {
    c(v(
      /** @type {T} */
      e
    ));
  }
  function f(v, p = Pr) {
    const h = [v, p];
    return n.add(h), n.size === 1 && (a = t(c, l) || Pr), v(
      /** @type {T} */
      e
    ), () => {
      n.delete(h), n.size === 0 && a && (a(), a = null);
    };
  }
  return { set: c, update: l, subscribe: f };
}
function Tt(e, t, a) {
  const n = !Array.isArray(e), c = n ? [e] : e;
  if (!c.every(Boolean))
    throw new Error("derived() expects stores as input, got a falsy value");
  const l = t.length < 2;
  return cl(a, (f, v) => {
    let p = !1;
    const h = [];
    let b = 0, $ = Pr;
    const w = () => {
      if (b)
        return;
      $();
      const D = t(n ? h[0] : h, f, v);
      l ? f(D) : $ = typeof D == "function" ? D : Pr;
    }, F = c.map(
      (D, te) => bn(
        D,
        (P) => {
          h[te] = P, b &= ~(1 << te), p && w();
        },
        () => {
          b |= 1 << te;
        }
      )
    );
    return p = !0, w(), function() {
      ns(F), $(), p = !1;
    };
  });
}
function Xt(e) {
  let t;
  return bn(e, (a) => t = a)(), t;
}
let Hs = /* @__PURE__ */ Symbol();
function Ee(e, t, a) {
  const n = a[t] ??= {
    store: null,
    source: /* @__PURE__ */ vn(void 0),
    unsubscribe: Pr
  };
  if (n.store !== e && !(Hs in a))
    if (n.unsubscribe(), n.store = e ?? null, e == null)
      n.source.v = void 0, n.unsubscribe = Pr;
    else {
      var c = !0;
      n.unsubscribe = bn(e, (l) => {
        c ? n.source.v = l : _(n.source, l);
      }), c = !1;
    }
  return e && Hs in a ? Xt(e) : r(n.source);
}
function Nt() {
  const e = {};
  function t() {
    hs(() => {
      for (var a in e)
        e[a].unsubscribe();
      Ba(e, Hs, {
        enumerable: !1,
        value: !0
      });
    });
  }
  return [e, t];
}
function pt(e, t, a, n) {
  var c = !ka || (a & Wo) !== 0, l = (a & Ko) !== 0, f = (
    /** @type {V} */
    n
  ), v = !0, p = () => (v && (v = !1, f = /** @type {V} */
  n), f), h;
  h = /** @type {V} */
  e[t], h === void 0 && n !== void 0 && (h = p());
  var b;
  if (c ? b = () => {
    var D = (
      /** @type {V} */
      e[t]
    );
    return D === void 0 ? p() : (v = !0, D);
  } : b = () => {
    var D = (
      /** @type {V} */
      e[t]
    );
    return D !== void 0 && (f = /** @type {V} */
    void 0), D === void 0 ? f : D;
  }, c && (a & Yo) === 0)
    return b;
  var $ = !1, w = /* @__PURE__ */ Ya(() => ($ = !1, b())), F = (
    /** @type {Effect} */
    vt
  );
  return (
    /** @type {() => V} */
    (function(D, te) {
      if (arguments.length > 0) {
        const P = te ? r(w) : c && l ? Vt(D) : D;
        return _(w, P), $ = !0, f !== void 0 && (f = P), D;
      }
      return zr && $ || (F.f & Tr) !== 0 ? w.v : r(w);
    })
  );
}
function ll(e) {
  return new dl(e);
}
class dl {
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
    var a = /* @__PURE__ */ new Map(), n = (l, f) => {
      var v = /* @__PURE__ */ vn(f, !1, !1);
      return a.set(l, v), v;
    };
    const c = new Proxy(
      { ...t.props || {}, $$events: {} },
      {
        get(l, f) {
          return r(a.get(f) ?? n(f, Reflect.get(l, f)));
        },
        has(l, f) {
          return f === ac ? !0 : (r(a.get(f) ?? n(f, Reflect.get(l, f))), Reflect.has(l, f));
        },
        set(l, f, v) {
          return _(a.get(f) ?? n(f, v), v), Reflect.set(l, f, v);
        }
      }
    );
    this.#t = (t.hydrate ? zc : Yi)(t.component, {
      target: t.target,
      anchor: t.anchor,
      props: c,
      context: t.context,
      intro: t.intro ?? !1,
      recover: t.recover
    }), (!t?.props?.$$host || t.sync === !1) && ut(), this.#e = c.$$events;
    for (const l of Object.keys(this.#t))
      l === "$set" || l === "$destroy" || l === "$on" || Ba(this, l, {
        get() {
          return this.#t[l];
        },
        /** @param {any} value */
        set(f) {
          this.#t[l] = f;
        },
        enumerable: !0
      });
    this.#t.$set = /** @param {Record<string, any>} next */
    (l) => {
      Object.assign(c, l);
    }, this.#t.$destroy = () => {
      Uc(this.#t);
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
  $on(t, a) {
    this.#e[t] = this.#e[t] || [];
    const n = (...c) => a.call(this, ...c);
    return this.#e[t].push(n), () => {
      this.#e[t] = this.#e[t].filter(
        /** @param {any} fn */
        (c) => c !== n
      );
    };
  }
  $destroy() {
    this.#t.$destroy();
  }
}
let Zi;
typeof HTMLElement == "function" && (Zi = class extends HTMLElement {
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
  constructor(e, t, a) {
    super(), this.$$ctor = e, this.$$s = t, a && (this.$$shadowRoot = this.attachShadow(a));
  }
  /**
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  addEventListener(e, t, a) {
    if (this.$$l[e] = this.$$l[e] || [], this.$$l[e].push(t), this.$$c) {
      const n = this.$$c.$on(e, t);
      this.$$l_u.set(t, n);
    }
    super.addEventListener(e, t, a);
  }
  /**
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  removeEventListener(e, t, a) {
    if (super.removeEventListener(e, t, a), this.$$c) {
      const n = this.$$l_u.get(t);
      n && (n(), this.$$l_u.delete(t));
    }
  }
  async connectedCallback() {
    if (this.$$cn = !0, !this.$$c) {
      let e = function(n) {
        return (c) => {
          const l = document.createElement("slot");
          n !== "default" && (l.name = n), d(c, l);
        };
      };
      if (await Promise.resolve(), !this.$$cn || this.$$c)
        return;
      const t = {}, a = ul(this);
      for (const n of this.$$s)
        n in a && (n === "default" && !this.$$d.children ? (this.$$d.children = e(n), t.default = !0) : t[n] = e(n));
      for (const n of this.attributes) {
        const c = this.$$g_p(n.name);
        c in this.$$d || (this.$$d[c] = Xa(c, n.value, this.$$p_d, "toProp"));
      }
      for (const n in this.$$p_d)
        !(n in this.$$d) && this[n] !== void 0 && (this.$$d[n] = this[n], delete this[n]);
      this.$$c = ll({
        component: this.$$ctor,
        target: this.$$shadowRoot || this,
        props: {
          ...this.$$d,
          $$slots: t,
          $$host: this
        }
      }), this.$$me = Nc(() => {
        gs(() => {
          this.$$r = !0;
          for (const n of ss(this.$$c)) {
            if (!this.$$p_d[n]?.reflect) continue;
            this.$$d[n] = this.$$c[n];
            const c = Xa(
              n,
              this.$$d[n],
              this.$$p_d,
              "toAttribute"
            );
            c == null ? this.removeAttribute(this.$$p_d[n].attribute || n) : this.setAttribute(this.$$p_d[n].attribute || n, c);
          }
          this.$$r = !1;
        });
      });
      for (const n in this.$$l)
        for (const c of this.$$l[n]) {
          const l = this.$$c.$on(n, c);
          this.$$l_u.set(c, l);
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
  attributeChangedCallback(e, t, a) {
    this.$$r || (e = this.$$g_p(e), this.$$d[e] = Xa(e, a, this.$$p_d, "toProp"), this.$$c?.$set({ [e]: this.$$d[e] }));
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
    return ss(this.$$p_d).find(
      (t) => this.$$p_d[t].attribute === e || !this.$$p_d[t].attribute && t.toLowerCase() === e
    ) || e;
  }
});
function Xa(e, t, a, n) {
  const c = a[e]?.type;
  if (t = c === "Boolean" && typeof t != "boolean" ? t != null : t, !n || !a[e])
    return t;
  if (n === "toAttribute")
    switch (c) {
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
    switch (c) {
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
function ul(e) {
  const t = {};
  return e.childNodes.forEach((a) => {
    t[
      /** @type {Element} node */
      a.slot || "default"
    ] = !0;
  }), t;
}
function kt(e, t, a, n, c, l) {
  let f = class extends Zi {
    constructor() {
      super(e, a, c), this.$$p_d = t;
    }
    static get observedAttributes() {
      return ss(t).map(
        (v) => (t[v].attribute || v).toLowerCase()
      );
    }
  };
  return ss(t).forEach((v) => {
    Ba(f.prototype, v, {
      get() {
        return this.$$c && v in this.$$c ? this.$$c[v] : this.$$d[v];
      },
      set(p) {
        p = Xa(v, p, t), this.$$d[v] = p;
        var h = this.$$c;
        if (h) {
          var b = fa(h, v)?.get;
          b ? h[v] = p : h.$set({ [v]: p });
        }
      }
    });
  }), n.forEach((v) => {
    Ba(f.prototype, v, {
      get() {
        return this.$$c?.[v];
      }
    });
  }), e.element = /** @type {any} */
  f, f;
}
const eo = 8, to = 16, Fa = 64;
function Br(e, t) {
  return (e & t) !== 0;
}
function pa(e, t) {
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
function zs(e, t) {
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
let Us;
function vl(e) {
  Us = e;
}
function Ze() {
  if (!Us)
    throw new Error("Martha API not initialized. Call setApi() first.");
  return Us;
}
const ro = "hecate://localhost";
async function fl() {
  try {
    const e = await fetch(`${ro}/api/llm/models`);
    if (!e.ok) return [];
    const t = await e.json();
    return t.ok && Array.isArray(t.models) ? t.models.map((a) => ({
      name: String(a.name ?? ""),
      context_length: Number(a.context_length ?? 0),
      family: String(a.family ?? ""),
      parameter_size: String(a.parameter_size ?? ""),
      format: String(a.format ?? "api"),
      provider: String(a.provider ?? ""),
      quantization: a.quantization ? String(a.quantization) : void 0,
      size_bytes: a.size_bytes ? Number(a.size_bytes) : void 0
    })) : [];
  } catch {
    return [];
  }
}
function pl(e, t) {
  let a = null, n = null, c = null, l = !1;
  const f = {
    onChunk(v) {
      return a = v, f;
    },
    onDone(v) {
      return n = v, f;
    },
    onError(v) {
      return c = v, f;
    },
    async start() {
      if (!l)
        try {
          const v = await fetch(`${ro}/api/llm/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model: e, messages: t, stream: !0 })
          });
          if (l) return;
          if (!v.ok) {
            const $ = await v.text().catch(() => v.statusText);
            c && c($ || "LLM request failed");
            return;
          }
          const p = v.body?.getReader();
          if (!p) {
            c && c("No response body");
            return;
          }
          const h = new TextDecoder();
          let b = "";
          for (; !l; ) {
            const { done: $, value: w } = await p.read();
            if ($) break;
            b += h.decode(w, { stream: !0 });
            const F = b.split(`

`);
            b = F.pop() ?? "";
            for (const D of F) {
              const te = D.trim();
              if (!te.startsWith("data: ")) continue;
              const P = te.slice(6);
              if (P === "[DONE]") {
                n && n({ content: "", done: !0 }), p.cancel();
                return;
              }
              try {
                const q = JSON.parse(P);
                if (q.error) {
                  c && c(q.error), p.cancel();
                  return;
                }
                a && a({ content: q.content ?? "" });
              } catch {
              }
            }
          }
        } catch (v) {
          if (l) return;
          c && c(v.message || "LLM request failed");
        }
    },
    cancel() {
      l = !0;
    }
  };
  return f;
}
function ao() {
  return {
    stream: {
      chat: pl
    }
  };
}
const mn = et(!1), so = et(""), yn = et(null), no = et(null), wn = et([]);
function $n(e) {
  const t = e.name.toLowerCase(), a = e.context_length;
  return e.format !== "api" ? "local" : /claude-opus|claude-sonnet-4|o4-mini|o3|gpt-4o$/.test(t) || /gemini-2\.5-pro/.test(t) ? "flagship" : /claude-haiku|claude-sonnet|gpt-4o-mini|gemini-2\.5-flash|gemini-2\.0-flash/.test(t) || /llama-3\.3|llama-3\.1/.test(t) && a >= 32e3 ? "balanced" : /flash|mini|nano|small|lite|fast/.test(t) || a > 0 && a <= 8192 ? "fast" : "balanced";
}
function io(e, t) {
  const a = $n(e);
  let n = 0;
  switch (a) {
    case "flagship":
      n += 100;
      break;
    case "balanced":
      n += 70;
      break;
    case "fast":
      n += 40;
      break;
    case "local":
      n += 20;
      break;
  }
  e.context_length >= 1e5 ? n += 15 : e.context_length >= 32e3 ? n += 10 : e.context_length >= 8e3 && (n += 5);
  const c = e.name.toLowerCase();
  return t === "code" && (/code|coder|codestral|starcoder|deepseek-coder|wizard-?coder/.test(c) && (n += 25), /claude|gpt-4o/.test(c) && (n += 10)), t === "creative" && (/claude-opus|claude-sonnet-4|o3|gpt-4o$/.test(c) && (n += 20), /gemini-2\.5-pro/.test(c) && (n += 15)), e.format === "api" && (n += 5), n;
}
function xl(e, t = "general") {
  return e.length === 0 ? null : e.map((n) => ({ model: n, tier: $n(n), score: io(n, t) })).sort((n, c) => c.score - n.score)[0]?.model ?? null;
}
function _l(e, t = "general", a = 5) {
  return e.map((n) => ({ model: n, tier: $n(n), score: io(n, t) })).sort((n, c) => c.score - n.score).slice(0, a);
}
const kn = Tt(
  [no, wn],
  ([e, t]) => e || (xl(t, "general")?.name ?? null)
), oo = "hecate-app-martha-phase-models";
function hl() {
  try {
    const e = localStorage.getItem(oo);
    if (e)
      return { storming: null, planning: null, kanban: null, crafting: null, ...JSON.parse(e) };
  } catch {
  }
  return { storming: null, planning: null, kanban: null, crafting: null };
}
function gl(e) {
  try {
    localStorage.setItem(oo, JSON.stringify(e));
  } catch {
  }
}
const co = et(hl()), bl = [
  /code/i,
  /coder/i,
  /codestral/i,
  /starcoder/i,
  /codellama/i,
  /wizard-?coder/i,
  /deepseek-coder/i
];
function ml(e) {
  return bl.some((t) => t.test(e)) ? "code" : "general";
}
function yl(e) {
  return e === "crafting" ? "code" : e === "storming" ? "creative" : "general";
}
function Ts(e) {
  return e <= 0 ? "" : e >= 1e6 ? `${Math.round(e / 1e6)}M` : e >= 1e3 ? `${Math.round(e / 1e3)}k` : `${e}`;
}
function Er(e, t) {
  yn.set(t ?? null), so.set(e), mn.set(!0);
}
function wl() {
  mn.set(!1), yn.set(null);
}
function Cn(e) {
  no.set(e);
}
function Wn(e, t) {
  co.update((a) => {
    const n = { ...a, [e]: t };
    return gl(n), n;
  });
}
function $l(e) {
  return e.split(`
`).map((t) => t.replace(/^[\s\-*\u2022\d.]+/, "").trim()).filter((t) => t.length > 0 && t.length < 80 && !t.includes(":")).map((t) => t.replace(/["`]/g, ""));
}
const Ir = [
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
], wa = et([]), St = et(null), Ur = et([]), xa = et(null), Et = et(!1), br = et(null), Yr = Tt(
  [Ur, xa],
  ([e, t]) => e.find((a) => a.division_id === t) ?? null
), bs = Tt(
  St,
  (e) => e ? Br(e.status, Fa) ? "archived" : Br(e.status, to) ? "discovery_paused" : Br(e.status, eo) ? "discovering" : e.phase || "initiated" : "none"
);
function ja(e) {
  St.set(e);
}
function Ws() {
  St.set(null);
}
async function ms() {
  try {
    const t = await Ze().get("/get_ventures_page");
    wa.set(t.ventures);
  } catch {
    wa.set([]);
  }
}
async function kr() {
  try {
    const t = await Ze().get("/get_active_venture");
    St.set(t.venture);
  } catch {
    St.set(null);
  }
}
async function Sa(e) {
  try {
    const a = await Ze().get(
      `/get_discovered_divisions_page/${e}`
    );
    Ur.set(a.divisions);
  } catch {
    Ur.set([]);
  }
}
async function lo(e, t) {
  try {
    Et.set(!0);
    const n = await Ze().post("/initiate_venture", { name: e, brief: t, initiated_by: "hecate-web" }), c = {
      venture_id: n.venture_id,
      name: n.name,
      vision: "",
      brief: n.brief || "",
      status: n.status,
      status_label: n.status_label,
      phase: "initiated",
      initiated_at: n.initiated_at,
      created_at: String(n.initiated_at),
      updated_at: String(n.initiated_at)
    };
    return wa.update((l) => [...l, c]), St.set(c), !0;
  } catch (a) {
    const n = a;
    return br.set(n.message || "Failed to initiate venture"), !1;
  } finally {
    Et.set(!1);
  }
}
async function uo(e, t, a, n, c) {
  try {
    return Et.set(!0), await Ze().post(`/scaffold_venture_repo/${e}`, {
      repo_path: t,
      vision_content: a || void 0,
      venture_name: n || void 0,
      brief: c || void 0
    }), await kr(), !0;
  } catch (l) {
    const f = l;
    return br.set(f.message || "Failed to scaffold venture repo"), !1;
  } finally {
    Et.set(!1);
  }
}
async function Sn(e) {
  try {
    return Et.set(!0), await Ze().post(`/start_discovery/${e}`, {}), await kr(), !0;
  } catch (t) {
    const a = t;
    return br.set(a.message || "Failed to start discovery"), !1;
  } finally {
    Et.set(!1);
  }
}
async function vo(e, t, a) {
  try {
    return Et.set(!0), await Ze().post(`/identify_division/${e}`, {
      context_name: t,
      description: a || null,
      identified_by: "hecate-web"
    }), await Sa(e), !0;
  } catch (n) {
    const c = n;
    return br.set(c.message || "Failed to identify division"), !1;
  } finally {
    Et.set(!1);
  }
}
async function fo(e, t) {
  try {
    return Et.set(!0), await Ze().post(`/pause_discovery/${e}`, {
      reason: t || null
    }), await kr(), !0;
  } catch (a) {
    const n = a;
    return br.set(n.message || "Failed to pause discovery"), !1;
  } finally {
    Et.set(!1);
  }
}
async function po(e) {
  try {
    return Et.set(!0), await Ze().post(`/resume_discovery/${e}`, {}), await kr(), !0;
  } catch (t) {
    const a = t;
    return br.set(a.message || "Failed to resume discovery"), !1;
  } finally {
    Et.set(!1);
  }
}
async function xo(e) {
  try {
    return Et.set(!0), await Ze().post(`/complete_discovery/${e}`, {}), await kr(), !0;
  } catch (t) {
    const a = t;
    return br.set(a.message || "Failed to complete discovery"), !1;
  } finally {
    Et.set(!1);
  }
}
const kl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activeVenture: St,
  clearActiveVenture: Ws,
  completeDiscovery: xo,
  divisions: Ur,
  fetchActiveVenture: kr,
  fetchDivisions: Sa,
  fetchVentures: ms,
  identifyDivision: vo,
  initiateVenture: lo,
  isLoading: Et,
  pauseDiscovery: fo,
  resumeDiscovery: po,
  scaffoldVentureRepo: uo,
  selectVenture: ja,
  selectedDivision: Yr,
  selectedDivisionId: xa,
  startDiscovery: Sn,
  ventureError: br,
  ventureStep: bs,
  ventures: wa
}, Symbol.toStringTag, { value: "Module" })), qa = et("storming"), ys = et(null), Nr = et(!1);
async function Cl(e, t) {
  try {
    Nr.set(!0), await Ze().post(`/open_${t}/${e}`, {});
    const n = Xt(St);
    return n && await Sa(n.venture_id), !0;
  } catch (a) {
    const n = a;
    return ys.set(n.message || `Failed to open ${t}`), !1;
  } finally {
    Nr.set(!1);
  }
}
async function Sl(e, t, a) {
  try {
    Nr.set(!0), await Ze().post(`/shelve_${t}/${e}`, {
      reason: a || null
    });
    const c = Xt(St);
    return c && await Sa(c.venture_id), !0;
  } catch (n) {
    const c = n;
    return ys.set(c.message || `Failed to shelve ${t}`), !1;
  } finally {
    Nr.set(!1);
  }
}
async function El(e, t) {
  try {
    Nr.set(!0), await Ze().post(`/resume_${t}/${e}`, {});
    const n = Xt(St);
    return n && await Sa(n.venture_id), !0;
  } catch (a) {
    const n = a;
    return ys.set(n.message || `Failed to resume ${t}`), !1;
  } finally {
    Nr.set(!1);
  }
}
async function Al(e, t) {
  try {
    Nr.set(!0), await Ze().post(`/submit_${t}/${e}`, {});
    const n = Xt(St);
    return n && await Sa(n.venture_id), !0;
  } catch (a) {
    const n = a;
    return ys.set(n.message || `Failed to conclude ${t}`), !1;
  } finally {
    Nr.set(!1);
  }
}
const sa = et("ready"), Ea = et([]), ws = et([]), En = et([]), ds = et(600), An = et([]), Ys = et(!1), qt = et(null), Ks = et(!1);
let Qr = null;
const Dl = Tt(
  Ea,
  (e) => e.filter((t) => !t.cluster_id)
), Pl = Tt(
  Ea,
  (e) => {
    const t = /* @__PURE__ */ new Map();
    for (const a of e)
      if (a.stack_id) {
        const n = t.get(a.stack_id) || [];
        n.push(a), t.set(a.stack_id, n);
      }
    return t;
  }
), Tl = Tt(
  Ea,
  (e) => e.length
);
async function Wt(e) {
  try {
    const n = (await Ze().get(
      `/get_storm_state/${e}`
    )).storm;
    sa.set(n.phase), Ea.set(n.stickies), ws.set(n.clusters), En.set(n.arrows);
  } catch {
    sa.set("ready");
  }
}
async function Yn(e, t = 0, a = 50) {
  try {
    const c = await Ze().get(
      `/get_venture_events_page/${e}?offset=${t}&limit=${a}`
    );
    return An.set(c.events), { events: c.events, count: c.count };
  } catch {
    return { events: [], count: 0 };
  }
}
async function Rl(e) {
  try {
    return Ks.set(!0), await Ze().post(`/start_big_picture_storm/${e}`, {}), sa.set("storm"), ds.set(600), Qr = setInterval(() => {
      ds.update((a) => a <= 1 ? (Qr && (clearInterval(Qr), Qr = null), 0) : a - 1);
    }, 1e3), !0;
  } catch (t) {
    const a = t;
    return qt.set(a.message || "Failed to start storm"), !1;
  } finally {
    Ks.set(!1);
  }
}
async function Za(e, t, a = "user") {
  try {
    return await Ze().post(`/post_event_sticky/${e}`, { text: t, author: a }), await Wt(e), !0;
  } catch (n) {
    const c = n;
    return qt.set(c.message || "Failed to post sticky"), !1;
  }
}
async function Il(e, t) {
  try {
    return await Ze().post(`/pull_event_sticky/${e}/${t}`, {}), await Wt(e), !0;
  } catch (a) {
    const n = a;
    return qt.set(n.message || "Failed to pull sticky"), !1;
  }
}
async function Kn(e, t, a) {
  try {
    return await Ze().post(`/stack_event_sticky/${e}/${t}`, {
      target_sticky_id: a
    }), await Wt(e), !0;
  } catch (n) {
    const c = n;
    return qt.set(c.message || "Failed to stack sticky"), !1;
  }
}
async function Ml(e, t) {
  try {
    return await Ze().post(`/unstack_event_sticky/${e}/${t}`, {}), await Wt(e), !0;
  } catch (a) {
    const n = a;
    return qt.set(n.message || "Failed to unstack sticky"), !1;
  }
}
async function Nl(e, t, a) {
  try {
    return await Ze().post(`/groom_event_stack/${e}/${t}`, {
      canonical_sticky_id: a
    }), await Wt(e), !0;
  } catch (n) {
    const c = n;
    return qt.set(c.message || "Failed to groom stack"), !1;
  }
}
async function Jn(e, t, a) {
  try {
    return await Ze().post(`/cluster_event_sticky/${e}/${t}`, {
      target_cluster_id: a
    }), await Wt(e), !0;
  } catch (n) {
    const c = n;
    return qt.set(c.message || "Failed to cluster sticky"), !1;
  }
}
async function Ll(e, t) {
  try {
    return await Ze().post(`/uncluster_event_sticky/${e}/${t}`, {}), await Wt(e), !0;
  } catch (a) {
    const n = a;
    return qt.set(n.message || "Failed to uncluster sticky"), !1;
  }
}
async function Ol(e, t) {
  try {
    return await Ze().post(`/dissolve_event_cluster/${e}/${t}`, {}), await Wt(e), !0;
  } catch (a) {
    const n = a;
    return qt.set(n.message || "Failed to dissolve cluster"), !1;
  }
}
async function Fl(e, t, a) {
  try {
    return await Ze().post(`/name_event_cluster/${e}/${t}`, { name: a }), await Wt(e), !0;
  } catch (n) {
    const c = n;
    return qt.set(c.message || "Failed to name cluster"), !1;
  }
}
async function jl(e, t, a, n) {
  try {
    return await Ze().post(`/draw_fact_arrow/${e}`, {
      from_cluster: t,
      to_cluster: a,
      fact_name: n
    }), await Wt(e), !0;
  } catch (c) {
    const l = c;
    return qt.set(l.message || "Failed to draw fact arrow"), !1;
  }
}
async function Bl(e, t) {
  try {
    return await Ze().post(`/erase_fact_arrow/${e}/${t}`, {}), await Wt(e), !0;
  } catch (a) {
    const n = a;
    return qt.set(n.message || "Failed to erase fact arrow"), !1;
  }
}
async function Vl(e, t) {
  try {
    return await Ze().post(`/promote_event_cluster/${e}/${t}`, {}), await Wt(e), !0;
  } catch (a) {
    const n = a;
    return qt.set(n.message || "Failed to promote cluster"), !1;
  }
}
async function Ta(e, t) {
  try {
    return await Ze().post(`/advance_storm_phase/${e}`, {
      target_phase: t
    }), await Wt(e), !0;
  } catch (a) {
    const n = a;
    return qt.set(n.message || "Failed to advance phase"), !1;
  }
}
async function Gl(e) {
  try {
    return await Ze().post(`/shelve_big_picture_storm/${e}`, {}), sa.set("shelved"), !0;
  } catch (t) {
    const a = t;
    return qt.set(a.message || "Failed to shelve storm"), !1;
  }
}
async function ql(e) {
  try {
    return await Ze().post(`/resume_big_picture_storm/${e}`, {}), await Wt(e), !0;
  } catch (t) {
    const a = t;
    return qt.set(a.message || "Failed to resume storm"), !1;
  }
}
async function Hl(e) {
  const t = Xt(ws);
  let a = !0;
  for (const n of t) {
    if (n.status !== "active" || !n.name?.trim()) continue;
    await Vl(e, n.cluster_id) || (a = !1);
  }
  if (a) {
    const { fetchDivisions: n } = await Promise.resolve().then(() => kl);
    await n(e);
  }
  return a;
}
function zl() {
  Qr && (clearInterval(Qr), Qr = null), sa.set("ready"), Ea.set([]), ws.set([]), En.set([]), An.set([]), ds.set(600);
}
const er = {
  visionary: { label: "Visionary", tier: "creative", icon: "◇" },
  explorer: { label: "Explorer", tier: "creative", icon: "🔍" },
  stormer: { label: "Stormer", tier: "creative", icon: "⚡" },
  reviewer: { label: "Reviewer", tier: "creative", icon: "🔎" },
  architect: { label: "Architect", tier: "mechanical", icon: "△" },
  erlang_coder: { label: "Erl Coder", tier: "mechanical", icon: "⚙" },
  svelte_coder: { label: "Svlt Coder", tier: "mechanical", icon: "⬡" },
  sql_coder: { label: "SQL Coder", tier: "mechanical", icon: "▣" },
  tester: { label: "Tester", tier: "mechanical", icon: "✓" },
  delivery: { label: "Delivery", tier: "mechanical", icon: "→" },
  coordinator: { label: "Coordinator", tier: "always_on", icon: "💬" },
  mentor: { label: "Mentor", tier: "always_on", icon: "💬" }
}, Ul = [
  "visionary",
  "explorer",
  "stormer",
  "reviewer",
  "architect",
  "erlang_coder",
  "svelte_coder",
  "sql_coder",
  "tester",
  "delivery",
  "coordinator",
  "mentor"
], Wl = {
  visionary: "initiate_visionary",
  explorer: "initiate_explorer",
  stormer: "initiate_stormer",
  architect: "initiate_architect",
  erlang_coder: "initiate_erlang_coder",
  svelte_coder: "initiate_svelte_coder",
  sql_coder: "initiate_sql_coder",
  tester: "initiate_tester",
  reviewer: "initiate_reviewer",
  delivery: "initiate_delivery_manager",
  coordinator: "initiate_coordinator",
  mentor: "initiate_mentor"
}, _o = {
  visionary: { pass: "pass_vision_gate", reject: "reject_vision_gate" },
  explorer: { pass: "pass_boundary_gate", reject: "reject_boundary_gate" },
  stormer: { pass: "pass_design_gate", reject: "reject_design_gate" },
  reviewer: { pass: "pass_review_gate", reject: "reject_review_gate" }
}, ho = et([]), ca = et([]), tr = et(null), Js = et(!1), es = et(null), Qs = et([]), Aa = et([]), Yl = Tt(
  ca,
  (e) => e.filter((t) => er[t.role]?.tier === "creative")
), Kl = Tt(
  ca,
  (e) => e.filter((t) => er[t.role]?.tier === "mechanical")
), Jl = Tt(
  ca,
  (e) => e.filter((t) => er[t.role]?.tier === "always_on")
), Ql = Tt(Aa, (e) => e.length > 0);
async function $a(e) {
  try {
    Js.set(!0), tr.set(null);
    const a = await Ze().get("/get_sessions_page");
    ho.set(a.sessions ?? []), rd(a.sessions ?? []), ad(a.sessions ?? []);
  } catch (t) {
    const a = t;
    tr.set(a.message || "Failed to fetch agent sessions");
  } finally {
    Js.set(!1);
  }
}
async function Xl(e, t) {
  try {
    tr.set(null);
    const n = await Ze().get(
      `/get_session_by_id/${t}`
    );
    es.set(n.session);
  } catch (a) {
    const n = a;
    tr.set(n.message || "Failed to fetch session detail");
  }
}
async function Zl(e, t) {
  try {
    const n = await Ze().get(
      `/get_session_turns/${t}`
    );
    Qs.set(n.turns ?? []);
  } catch {
    Qs.set([]);
  }
}
async function ed(e, t, a) {
  try {
    tr.set(null);
    const n = Ze(), c = { venture_id: e };
    return await n.post(`/${Wl[t]}`, c), await $a(e), !0;
  } catch (n) {
    const c = n;
    return tr.set(c.message || `Failed to initiate ${t}`), !1;
  }
}
async function go(e, t, a) {
  try {
    tr.set(null);
    const n = Ze(), c = _o[t];
    if (!c) throw new Error(`No gate for role ${t}`);
    return await n.post(`/${c.pass}`, { session_id: a }), await $a(e), !0;
  } catch (n) {
    const c = n;
    return tr.set(c.message || "Failed to pass gate"), !1;
  }
}
async function bo(e, t, a, n) {
  try {
    tr.set(null);
    const c = Ze(), l = _o[t];
    if (!l) throw new Error(`No gate for role ${t}`);
    return await c.post(`/${l.reject}`, {
      session_id: a,
      reason: n
    }), await $a(e), !0;
  } catch (c) {
    const l = c;
    return tr.set(l.message || "Failed to reject gate"), !1;
  }
}
async function td(e, t) {
  try {
    return tr.set(null), await Ze().post("/archive_agent_session", { session_id: t }), await $a(e), !0;
  } catch (a) {
    const n = a;
    return tr.set(n.message || "Failed to archive session"), !1;
  }
}
function rd(e) {
  const t = Ul.map((a) => {
    const n = e.filter((p) => p.role === a), c = n.find((p) => p.status === "running" || p.status === "gate_pending"), l = n.filter((p) => p.status === "completed").sort((p, h) => (h.completed_at ?? 0) - (p.completed_at ?? 0))[0], f = n.find((p) => p.status === "failed");
    let v = "idle";
    return c?.status === "gate_pending" ? v = "gate_pending" : c?.status === "running" ? v = "running" : f && !l ? v = "failed" : l && (v = "completed"), {
      role: a,
      label: er[a].label,
      tier: er[a].tier,
      status: v,
      active_session: c ?? l ?? f ?? null,
      session_count: n.length
    };
  });
  ca.set(t);
}
function ad(e) {
  Aa.set(e.filter((t) => t.status === "gate_pending"));
}
const pr = et("disconnected"), sd = et(null), mo = "/plugin/hecate-app-martha/api/events/stream", nd = 3e3;
let Vr = null, Mr = null, ts = [];
function id(e) {
  return ts.push(e), () => {
    ts = ts.filter((t) => t !== e);
  };
}
function od(e) {
  sd.set(e);
  for (const t of ts)
    t(e);
}
function yo() {
  if (!Vr) {
    pr.set("connecting");
    try {
      Vr = new EventSource(mo), Vr.onopen = () => {
        pr.set("connected"), Mr && (clearTimeout(Mr), Mr = null);
      }, Vr.onerror = () => {
        pr.set("disconnected"), $o(), Xs();
      }, Vr.onmessage = (e) => {
        wo("message", e.data);
      };
    } catch {
      pr.set("disconnected"), cd();
    }
  }
}
async function cd() {
  pr.set("connecting");
  try {
    const e = await fetch(mo);
    if (!e.ok || !e.body) {
      pr.set("disconnected"), Xs();
      return;
    }
    pr.set("connected");
    const t = e.body.getReader(), a = new TextDecoder();
    let n = "";
    for (; ; ) {
      const { done: c, value: l } = await t.read();
      if (c) break;
      n += a.decode(l, { stream: !0 });
      const f = n.split(`

`);
      n = f.pop() ?? "";
      for (const v of f)
        !v.trim() || v.startsWith(":") || ld(v);
    }
  } catch {
  }
  pr.set("disconnected"), Xs();
}
function ld(e) {
  let t = "message", a = "";
  for (const n of e.split(`
`))
    n.startsWith("event: ") ? t = n.slice(7) : n.startsWith("data: ") && (a = n.slice(6));
  a && wo(t, a);
}
function wo(e, t) {
  try {
    const a = JSON.parse(t);
    od({ type: e, data: a, receivedAt: Date.now() });
  } catch {
  }
}
function Xs() {
  Mr || (Mr = setTimeout(() => {
    Mr = null, yo();
  }, nd));
}
function $o() {
  Vr && (Vr.close(), Vr = null);
}
function dd() {
  Mr && (clearTimeout(Mr), Mr = null), $o(), pr.set("disconnected");
}
const Qn = 50;
let lr = 0;
const ko = et([]), Dn = et(0), ud = Tt(
  ko,
  (e) => e.slice(0, 10)
);
function vd(e) {
  const { type: t, data: a, receivedAt: n } = e;
  if (t === "venture_initiated_v1")
    return {
      id: `act-${lr++}`,
      type: t,
      summary: `Venture "${a.name ?? "unknown"}" initiated`,
      severity: "success",
      timestamp: n
    };
  if (t === "venture_archived_v1")
    return {
      id: `act-${lr++}`,
      type: t,
      summary: "Venture archived",
      severity: "info",
      timestamp: n
    };
  if (t === "division_initiated_v1")
    return {
      id: `act-${lr++}`,
      type: t,
      summary: `Division "${a.context_name ?? "unknown"}" initiated`,
      severity: "success",
      timestamp: n
    };
  if (t.includes("_opened_v")) {
    const c = Rs(t);
    return {
      id: `act-${lr++}`,
      type: t,
      summary: `${c} phase opened`,
      severity: "info",
      timestamp: n
    };
  }
  if (t.includes("_shelved_v")) {
    const c = Rs(t);
    return {
      id: `act-${lr++}`,
      type: t,
      summary: `${c} phase shelved`,
      detail: a.reason ?? void 0,
      severity: "warning",
      timestamp: n
    };
  }
  if (t.includes("_resumed_v")) {
    const c = Rs(t);
    return {
      id: `act-${lr++}`,
      type: t,
      summary: `${c} phase resumed`,
      severity: "info",
      timestamp: n
    };
  }
  if (t.includes("agent_") || t.includes("mentor_") || t.includes("coordinator_"))
    return {
      id: `act-${lr++}`,
      type: t,
      summary: Ra(t),
      severity: "info",
      timestamp: n
    };
  if (t.startsWith("aggregate_designed_v") || t.startsWith("event_designed_v"))
    return {
      id: `act-${lr++}`,
      type: t,
      summary: Ra(t),
      detail: a.name ?? void 0,
      severity: "info",
      timestamp: n
    };
  if (t.startsWith("kanban_card_"))
    return {
      id: `act-${lr++}`,
      type: t,
      summary: Ra(t),
      severity: "info",
      timestamp: n
    };
  if (t.includes("_gate_")) {
    const c = t.includes("passed"), l = t.includes("rejected");
    return {
      id: `act-${lr++}`,
      type: t,
      summary: Ra(t),
      severity: l ? "error" : c ? "success" : "warning",
      timestamp: n
    };
  }
  return {
    id: `act-${lr++}`,
    type: t,
    summary: Ra(t),
    severity: "info",
    timestamp: n
  };
}
function Rs(e) {
  return e.includes("planning") ? "Planning" : e.includes("crafting") ? "Crafting" : e.includes("storming") ? "Storming" : e.includes("kanban") ? "Kanban" : "Phase";
}
function Ra(e) {
  return e.replace(/_v\d+$/, "").replace(/_/g, " ").replace(/\b\w/g, (t) => t.toUpperCase());
}
function fd() {
  return id((e) => {
    const t = vd(e);
    t && (ko.update((a) => {
      const n = [t, ...a];
      return n.length > Qn && (n.length = Qn), n;
    }), Dn.update((a) => a + 1));
  });
}
function pd() {
  Dn.set(0);
}
const Xn = et(!1), xd = et(null), _d = et(null);
async function hd(e, t) {
  try {
    Xn.set(!0);
    const n = await Ze().post(
      `/refine_vision/${e}`,
      { vision: t }
    );
    return xd.set(n.refined), await kr(), !0;
  } catch (a) {
    const n = a;
    return _d.set(n.message || "Failed to refine vision"), !1;
  } finally {
    Xn.set(!1);
  }
}
var gd = /* @__PURE__ */ u('<div class="text-[10px] text-surface-400 truncate mt-0.5"> </div>'), bd = /* @__PURE__ */ u('<button><div class="font-medium"> </div> <!></button>'), md = /* @__PURE__ */ u(`<div class="absolute top-full left-0 mt-1 z-20 min-w-[220px]
						bg-surface-700 border border-surface-600 rounded-lg shadow-lg overflow-hidden"><!> <button class="w-full text-left px-3 py-2 text-xs text-hecate-400
							hover:bg-hecate-600/20 transition-colors border-t border-surface-600">+ New Venture</button></div>`), yd = /* @__PURE__ */ u('<span class="text-[11px] text-surface-400 truncate max-w-[300px]"> </span>'), wd = /* @__PURE__ */ u('<span class="text-[10px] text-surface-400"> </span>'), $d = /* @__PURE__ */ u('<span class="text-[10px] text-surface-400 italic">Oracle active</span>'), kd = /* @__PURE__ */ u(`<button class="text-[11px] px-2.5 py-1 rounded bg-hecate-600/20 text-hecate-300
					hover:bg-hecate-600/30 transition-colors disabled:opacity-50">Start Discovery</button>`), Cd = /* @__PURE__ */ u(`<button class="text-[11px] px-2 py-1 rounded text-surface-400
						hover:text-health-ok hover:bg-surface-700 transition-colors disabled:opacity-50">Complete Discovery</button>`), Sd = /* @__PURE__ */ u(
  `<button class="text-[11px] px-2.5 py-1 rounded bg-hecate-600/20 text-hecate-300
					hover:bg-hecate-600/30 transition-colors disabled:opacity-50">+ Identify Division</button> <button class="text-[11px] px-2 py-1 rounded text-surface-400
					hover:text-health-warn hover:bg-surface-700 transition-colors disabled:opacity-50">Pause</button> <!>`,
  1
), Ed = /* @__PURE__ */ u(`<button class="text-[11px] px-2.5 py-1 rounded bg-health-warn/10 text-health-warn
					hover:bg-health-warn/20 transition-colors disabled:opacity-50">Resume Discovery</button>`), Ad = /* @__PURE__ */ u('<div class="mt-2 text-[11px] text-health-err bg-health-err/10 rounded px-3 py-1.5"> </div>'), Dd = /* @__PURE__ */ u(`<div class="mt-3 flex gap-2 items-end"><div class="flex-1"><label for="refine-brief" class="text-[10px] text-surface-400 block mb-1">Vision Brief</label> <textarea id="refine-brief" placeholder="Describe what this venture aims to achieve..." class="w-full bg-surface-700 border border-surface-600 rounded px-3 py-2 text-xs
						text-surface-100 placeholder-surface-400 resize-none
						focus:outline-none focus:border-hecate-500"></textarea></div> <button class="px-3 py-2 rounded text-xs bg-hecate-600 text-surface-50
					hover:bg-hecate-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Refine</button> <button class="px-3 py-2 rounded text-xs text-surface-400 hover:text-surface-100 transition-colors">Cancel</button></div>`), Pd = /* @__PURE__ */ u(`<div class="mt-3 flex gap-2 items-end"><div class="flex-1"><label for="div-name" class="text-[10px] text-surface-400 block mb-1">Context Name</label> <input id="div-name" placeholder="e.g., authentication, billing, notifications" class="w-full bg-surface-700 border border-surface-600 rounded px-3 py-1.5 text-xs
						text-surface-100 placeholder-surface-400
						focus:outline-none focus:border-hecate-500"/></div> <div class="flex-1"><label for="div-desc" class="text-[10px] text-surface-400 block mb-1">Description (optional)</label> <input id="div-desc" placeholder="Brief description of this bounded context" class="w-full bg-surface-700 border border-surface-600 rounded px-3 py-1.5 text-xs
						text-surface-100 placeholder-surface-400
						focus:outline-none focus:border-hecate-500"/></div> <button class="px-3 py-1.5 rounded text-xs bg-hecate-600 text-surface-50
					hover:bg-hecate-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Identify</button> <button class="px-3 py-1.5 rounded text-xs text-surface-400 hover:text-surface-100 transition-colors">Cancel</button></div>`), Td = /* @__PURE__ */ u(`<div class="border-b border-surface-600 bg-surface-800/50 px-4 py-3 shrink-0"><div class="flex items-center gap-3"><button class="flex items-center gap-1 text-xs text-surface-400 hover:text-hecate-300
				transition-colors shrink-0 -ml-1 px-1.5 py-1 rounded hover:bg-surface-700"><span class="text-sm"></span> <span>Ventures</span></button> <span class="text-surface-600 text-xs">|</span> <div class="relative flex items-center gap-2"><span class="text-hecate-400 text-lg"></span> <button class="flex items-center gap-1.5 text-sm font-semibold text-surface-100
					hover:text-hecate-300 transition-colors"> <span class="text-[9px] text-surface-400"></span></button> <!></div> <span> </span> <!> <div class="flex-1"></div> <!> <!></div> <!> <!> <!></div>`);
function Co(e, t) {
  bt(t, !0);
  const a = () => Ee(St, "$activeVenture", p), n = () => Ee(wa, "$ventures", p), c = () => Ee(bs, "$ventureStep", p), l = () => Ee(Ur, "$divisions", p), f = () => Ee(Et, "$isLoading", p), v = () => Ee(br, "$ventureError", p), [p, h] = Nt();
  let b = /* @__PURE__ */ ve(!1), $ = /* @__PURE__ */ ve(!1), w = /* @__PURE__ */ ve(!1), F = /* @__PURE__ */ ve(""), D = /* @__PURE__ */ ve(""), te = /* @__PURE__ */ ve("");
  async function P() {
    if (!a() || !r(F).trim()) return;
    await hd(a().venture_id, r(F).trim()) && (_(b, !1), _(F, ""));
  }
  async function q() {
    a() && await Sn(a().venture_id);
  }
  async function ue() {
    if (!a() || !r(D).trim()) return;
    await vo(a().venture_id, r(D).trim(), r(te).trim() || void 0) && (_($, !1), _(D, ""), _(te, ""));
  }
  function Ce(S) {
    switch (S) {
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
  var ge = Td(), fe = i(ge), ie = i(fe);
  ie.__click = () => Ws();
  var Fe = i(ie);
  Fe.textContent = "←", Dt(2), s(ie);
  var Pe = o(ie, 4), Ie = i(Pe);
  Ie.textContent = "◆";
  var ce = o(Ie, 2);
  ce.__click = () => _(w, !r(w));
  var G = i(ce), M = o(G);
  M.textContent = "▾", s(ce);
  var z = o(ce, 2);
  {
    var W = (S) => {
      var C = md(), H = i(C);
      He(H, 1, () => n().filter((Be) => !(Be.status & Fa)), ct, (Be, V) => {
        var O = bd();
        O.__click = () => {
          ja(r(V)), _(w, !1);
        };
        var J = i(O), Te = i(J, !0);
        s(J);
        var Oe = o(J, 2);
        {
          var Ke = (Qe) => {
            var tt = gd(), Ye = i(tt, !0);
            s(tt), g(() => x(Ye, r(V).brief)), d(Qe, tt);
          };
          A(Oe, (Qe) => {
            r(V).brief && Qe(Ke);
          });
        }
        s(O), g(() => {
          Re(O, 1, `w-full text-left px-3 py-2 text-xs transition-colors
								${r(V).venture_id === a()?.venture_id ? "bg-hecate-600/20 text-hecate-300" : "text-surface-200 hover:bg-surface-600"}`), x(Te, r(V).name);
        }), d(Be, O);
      });
      var oe = o(H, 2);
      oe.__click = () => {
        Ws(), _(w, !1);
      }, s(C), d(S, C);
    };
    A(z, (S) => {
      r(w) && S(W);
    });
  }
  s(Pe);
  var N = o(Pe, 2), I = i(N, !0);
  s(N);
  var B = o(N, 2);
  {
    var $e = (S) => {
      var C = yd(), H = i(C, !0);
      s(C), g(() => x(H, a().brief)), d(S, C);
    };
    A(B, (S) => {
      a()?.brief && S($e);
    });
  }
  var je = o(B, 4);
  {
    var qe = (S) => {
      var C = wd(), H = i(C);
      s(C), g(() => x(H, `${l().length ?? ""} division${l().length !== 1 ? "s" : ""}`)), d(S, C);
    };
    A(je, (S) => {
      l().length > 0 && S(qe);
    });
  }
  var Ve = o(je, 2);
  {
    var Se = (S) => {
      var C = $d();
      d(S, C);
    }, Ne = (S) => {
      var C = kd();
      C.__click = q, g(() => C.disabled = f()), d(S, C);
    }, be = (S) => {
      var C = Sd(), H = it(C);
      H.__click = () => _($, !r($));
      var oe = o(H, 2);
      oe.__click = () => a() && fo(a().venture_id);
      var Be = o(oe, 2);
      {
        var V = (O) => {
          var J = Cd();
          J.__click = () => a() && xo(a().venture_id), g(() => J.disabled = f()), d(O, J);
        };
        A(Be, (O) => {
          l().length > 0 && O(V);
        });
      }
      g(() => {
        H.disabled = f(), oe.disabled = f();
      }), d(S, C);
    }, K = (S) => {
      var C = Ed();
      C.__click = () => a() && po(a().venture_id), g(() => C.disabled = f()), d(S, C);
    };
    A(Ve, (S) => {
      c() === "initiated" || c() === "vision_refined" ? S(Se) : c() === "vision_submitted" ? S(Ne, 1) : c() === "discovering" ? S(be, 2) : c() === "discovery_paused" && S(K, 3);
    });
  }
  s(fe);
  var k = o(fe, 2);
  {
    var E = (S) => {
      var C = Ad(), H = i(C, !0);
      s(C), g(() => x(H, v())), d(S, C);
    };
    A(k, (S) => {
      v() && S(E);
    });
  }
  var j = o(k, 2);
  {
    var T = (S) => {
      var C = Dd(), H = i(C), oe = o(i(H), 2);
      Ca(oe), Mt(oe, "rows", 2), s(H);
      var Be = o(H, 2);
      Be.__click = P;
      var V = o(Be, 2);
      V.__click = () => _(b, !1), s(C), g((O) => Be.disabled = O, [() => !r(F).trim() || f()]), xt(oe, () => r(F), (O) => _(F, O)), d(S, C);
    };
    A(j, (S) => {
      r(b) && S(T);
    });
  }
  var re = o(j, 2);
  {
    var Le = (S) => {
      var C = Pd(), H = i(C), oe = o(i(H), 2);
      wt(oe), s(H);
      var Be = o(H, 2), V = o(i(Be), 2);
      wt(V), s(Be);
      var O = o(Be, 2);
      O.__click = ue;
      var J = o(O, 2);
      J.__click = () => _($, !1), s(C), g((Te) => O.disabled = Te, [() => !r(D).trim() || f()]), xt(oe, () => r(D), (Te) => _(D, Te)), xt(V, () => r(te), (Te) => _(te, Te)), d(S, C);
    };
    A(re, (S) => {
      r($) && S(Le);
    });
  }
  s(ge), g(
    (S) => {
      x(G, `${a()?.name ?? "Venture" ?? ""} `), Re(N, 1, `text-[10px] px-2 py-0.5 rounded-full border ${S ?? ""}`), x(I, a()?.status_label ?? "New");
    },
    [() => Ce(c())]
  ), d(e, ge), mt(), h();
}
At(["click"]);
kt(Co, {}, [], [], { mode: "open" });
var Rd = /* @__PURE__ */ u('<p class="text-xs text-surface-300 mt-1.5 max-w-md mx-auto"> </p>'), Id = /* @__PURE__ */ u("<span></span>"), Md = /* @__PURE__ */ u('<div class="flex items-center gap-1"><div class="flex flex-col items-center gap-0.5 px-2"><span> </span> <span> </span></div> <!></div>'), Nd = /* @__PURE__ */ u('<div class="rounded-lg border border-surface-600 bg-surface-800 p-3 col-span-2"><div class="text-[9px] text-surface-400 uppercase tracking-wider mb-1">Repository</div> <div class="text-xs text-surface-200 font-mono"> </div></div>'), Ld = /* @__PURE__ */ u('<div class="rounded-lg border border-hecate-600/30 bg-hecate-600/5 p-5 text-center"><div class="text-xs text-surface-200 mb-3">Your venture repo has been scaffolded. The next step is <strong class="text-hecate-300">Big Picture Event Storming</strong> </div> <button> </button></div>'), Od = /* @__PURE__ */ u(`<div class="rounded-lg border border-surface-600 bg-surface-800 p-5 text-center"><div class="text-xs text-surface-200 mb-2">Discovery is complete. Identify divisions (bounded contexts)
						from the events you discovered.</div> <div class="text-[10px] text-surface-400">Use the header controls to identify divisions.</div></div>`), Fd = /* @__PURE__ */ u('<div class="rounded-lg border border-surface-600 bg-surface-800 p-5 text-center"><div class="text-xs text-surface-200">Continue from the header controls to advance through the lifecycle.</div></div>'), jd = /* @__PURE__ */ u('<div class="text-center"><div class="text-3xl mb-3 text-hecate-400"></div> <h2 class="text-lg font-semibold text-surface-100"> </h2> <!></div> <div class="flex items-center justify-center gap-1 py-4"></div> <div class="grid grid-cols-2 gap-3"><div class="rounded-lg border border-surface-600 bg-surface-800 p-3"><div class="text-[9px] text-surface-400 uppercase tracking-wider mb-1">Status</div> <div class="text-xs text-surface-100"> </div></div> <div class="rounded-lg border border-surface-600 bg-surface-800 p-3"><div class="text-[9px] text-surface-400 uppercase tracking-wider mb-1">Initiated</div> <div class="text-xs text-surface-100"> </div></div> <!></div> <!>', 1), Bd = /* @__PURE__ */ u('<div class="flex flex-col h-full overflow-y-auto"><div class="max-w-2xl mx-auto w-full p-8 space-y-6"><!></div></div>');
function rs(e, t) {
  bt(t, !0);
  const a = () => Ee(St, "$activeVenture", l), n = () => Ee(bs, "$ventureStep", l), c = () => Ee(Et, "$isLoading", l), [l, f] = Nt();
  let v = pt(t, "nextAction", 7);
  function p(ue) {
    return ue ? new Date(ue * 1e3).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }) : "";
  }
  async function h() {
    if (!a()) return;
    await Sn(a().venture_id) && (await kr(), await ms());
  }
  const b = [
    { key: "vision", label: "Vision", icon: "◇" },
    { key: "discovery", label: "Discovery", icon: "○" },
    { key: "design", label: "Design", icon: "△" },
    { key: "plan", label: "Plan", icon: "□" },
    { key: "implement", label: "Implement", icon: "⚙" },
    { key: "deploy", label: "Deploy", icon: "▲" },
    { key: "monitor", label: "Monitor", icon: "◉" },
    { key: "rescue", label: "Rescue", icon: "↺" }
  ];
  let $ = /* @__PURE__ */ we(() => {
    const ue = n();
    return ue === "initiated" || ue === "vision_refined" || ue === "vision_submitted" ? 0 : ue === "discovering" || ue === "discovery_paused" || ue === "discovery_completed" ? 1 : 0;
  });
  var w = {
    get nextAction() {
      return v();
    },
    set nextAction(ue) {
      v(ue), ut();
    }
  }, F = Bd(), D = i(F), te = i(D);
  {
    var P = (ue) => {
      var Ce = jd(), ge = it(Ce), fe = i(ge);
      fe.textContent = "◆";
      var ie = o(fe, 2), Fe = i(ie, !0);
      s(ie);
      var Pe = o(ie, 2);
      {
        var Ie = (be) => {
          var K = Rd(), k = i(K, !0);
          s(K), g(() => x(k, a().brief)), d(be, K);
        };
        A(Pe, (be) => {
          a().brief && be(Ie);
        });
      }
      s(ge);
      var ce = o(ge, 2);
      He(ce, 21, () => b, ct, (be, K, k) => {
        const E = /* @__PURE__ */ we(() => k < r($)), j = /* @__PURE__ */ we(() => k === r($)), T = /* @__PURE__ */ we(() => k === r($) + 1);
        var re = Md(), Le = i(re), S = i(Le), C = i(S, !0);
        s(S);
        var H = o(S, 2), oe = i(H, !0);
        s(H), s(Le);
        var Be = o(Le, 2);
        {
          var V = (O) => {
            var J = Id();
            J.textContent = "→", g(() => Re(J, 1, `text-[10px]
									${r(E) ? "text-health-ok/40" : "text-surface-700"}`)), d(O, J);
          };
          A(Be, (O) => {
            k < b.length - 1 && O(V);
          });
        }
        s(re), g(() => {
          Mt(Le, "title", r(K).label), Re(S, 1, `text-sm transition-colors
									${r(E) ? "text-health-ok" : r(j) ? "text-hecate-400" : "text-surface-600"}`), x(C, r(E) ? "✓" : r(K).icon), Re(H, 1, `text-[9px] transition-colors
									${r(E) ? "text-health-ok/70" : r(j) ? "text-hecate-300" : r(T) ? "text-surface-400" : "text-surface-600"}`), x(oe, r(K).label);
        }), d(be, re);
      }), s(ce);
      var G = o(ce, 2), M = i(G), z = o(i(M), 2), W = i(z, !0);
      s(z), s(M);
      var N = o(M, 2), I = o(i(N), 2), B = i(I, !0);
      s(I), s(N);
      var $e = o(N, 2);
      {
        var je = (be) => {
          var K = Nd(), k = o(i(K), 2), E = i(k, !0);
          s(k), s(K), g(() => x(E, a().repos[0])), d(be, K);
        };
        A($e, (be) => {
          a().repos && a().repos.length > 0 && be(je);
        });
      }
      s(G);
      var qe = o(G, 2);
      {
        var Ve = (be) => {
          var K = Ld(), k = i(K), E = o(i(k), 2);
          E.nodeValue = " — discover the domain events that define your system.", s(k);
          var j = o(k, 2);
          j.__click = h;
          var T = i(j, !0);
          s(j), s(K), g(() => {
            j.disabled = c(), Re(j, 1, `px-5 py-2.5 rounded-lg text-sm font-medium transition-colors
							${c() ? "bg-surface-600 text-surface-400 cursor-not-allowed" : "bg-hecate-600 text-surface-50 hover:bg-hecate-500"}`), x(T, c() ? "Starting..." : "Start Discovery");
          }), d(be, K);
        }, Se = (be) => {
          var K = Od();
          d(be, K);
        }, Ne = (be) => {
          var K = Fd();
          d(be, K);
        };
        A(qe, (be) => {
          v() === "discovery" && n() === "vision_submitted" ? be(Ve) : v() === "identify" ? be(Se, 1) : be(Ne, !1);
        });
      }
      g(
        (be) => {
          x(Fe, a().name), x(W, a().status_label), x(B, be);
        },
        [() => p(a().initiated_at ?? 0)]
      ), d(ue, Ce);
    };
    A(te, (ue) => {
      a() && ue(P);
    });
  }
  s(D), s(F), d(e, F);
  var q = mt(w);
  return f(), q;
}
At(["click"]);
kt(rs, { nextAction: {} }, [], [], { mode: "open" });
const So = et(
  "You are Martha, an AI assistant specializing in software architecture and domain-driven design."
), Vd = `You are The Oracle, a vision architect. You interview the user about their venture and build a vision document.

RULES:
1. Ask ONE question per response. Keep it short (2-3 sentences + question).
2. After EVERY response, include a vision draft inside a \`\`\`markdown code fence.
3. Cover 5 topics: Problem, Users, Capabilities, Constraints, Success Criteria.

Be warm but direct. Push for specifics when answers are vague.`, Gd = "Be concise and practical. Suggest specific, actionable items. When suggesting domain elements, use snake_case naming. When suggesting events, use the format: {subject}_{verb_past}_v{N}.", qd = [
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
], Hd = [
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
], zd = et(qd), Ud = et(Hd), Wd = et(Vd), Yd = et(Gd);
function Kd(e, t) {
  return e.replace(/\{\{(\w+)\}\}/g, (a, n) => t[n] ?? `{{${n}}}`);
}
var Jd = /* @__PURE__ */ u('<span class="text-[8px] text-surface-500"> </span>'), Qd = /* @__PURE__ */ u('<span class="truncate"> </span> <!>', 1), Xd = /* @__PURE__ */ u('<span class="text-surface-500">Select model</span>'), Zd = /* @__PURE__ */ u('<span class="text-hecate-400 ml-1">(code-optimized)</span>'), eu = /* @__PURE__ */ u('<span class="text-orange-400 ml-1">(creative)</span>'), tu = /* @__PURE__ */ u('<button class="text-[9px] text-surface-500 hover:text-surface-300" title="Clear pinned model for this phase">Unpin</button>'), ru = /* @__PURE__ */ u('<div class="px-2 py-1.5 border-b border-surface-700 flex items-center justify-between"><span class="text-[9px] text-surface-400">Phase: <span class="text-surface-200"> </span> <!></span> <!></div>'), au = /* @__PURE__ */ u('<div class="p-3 text-center text-[11px] text-surface-500"> </div>'), su = /* @__PURE__ */ u("<span> </span>"), nu = /* @__PURE__ */ u('<span class="text-[9px] text-hecate-400 shrink-0"></span>'), iu = /* @__PURE__ */ u('<div><span class="text-[8px] text-surface-500 w-3 text-center shrink-0"> </span> <span class="truncate flex-1"> </span> <!> <span> </span> <!></div>'), ou = /* @__PURE__ */ u('<div class="py-1 border-b border-surface-700"><div class="px-2 py-1 text-[9px] text-hecate-400 uppercase tracking-wider font-medium"> </div> <!></div>'), cu = /* @__PURE__ */ u('<span class="text-[8px] w-3 text-center"> </span>'), lu = /* @__PURE__ */ u("<span> </span>"), du = /* @__PURE__ */ u('<span class="text-[8px] text-hecate-400 shrink-0" title="Pinned for this phase"></span>'), uu = /* @__PURE__ */ u('<span class="text-[9px] text-hecate-400 shrink-0"></span>'), vu = /* @__PURE__ */ u('<button class="text-[8px] text-surface-600 hover:text-hecate-400 shrink-0">pin</button>'), fu = /* @__PURE__ */ u('<div><span class="truncate flex-1"> </span> <!> <!> <!> <!></div>'), pu = /* @__PURE__ */ u('<div class="py-0.5"><div><!> <span class="text-[9px]"> </span> <span> </span> <span class="text-surface-600 font-normal"> </span></div> <!></div>'), xu = /* @__PURE__ */ u(`<div class="absolute top-full left-0 mt-1 w-96 max-h-[460px] overflow-hidden
				bg-surface-800 border border-surface-600 rounded-lg shadow-xl z-50
				flex flex-col"><div class="p-2 border-b border-surface-700"><input class="w-full bg-surface-700 border border-surface-600 rounded px-2 py-1
						text-[11px] text-surface-100 placeholder-surface-500
						focus:outline-none focus:border-hecate-500"/></div> <!> <div class="overflow-y-auto flex-1"><!> <!> <!></div></div>`), _u = /* @__PURE__ */ u(`<div class="relative"><button class="text-[10px] px-2 py-0.5 rounded bg-surface-700 text-surface-300
			hover:bg-surface-600 transition-colors truncate max-w-[220px] flex items-center gap-1"><!> <span class="text-[8px] ml-0.5"> </span></button> <!></div>`);
function $s(e, t) {
  bt(t, !0);
  const a = () => Ee(wn, "$availableModels", n), [n, c] = Nt();
  let l = pt(t, "currentModel", 7), f = pt(t, "onSelect", 7), v = pt(t, "showPhaseInfo", 7, !1), p = pt(t, "phasePreference", 7, null), h = pt(t, "phaseAffinity", 7, "general"), b = pt(t, "onPinModel", 7), $ = pt(t, "onClearPin", 7), w = pt(t, "phaseName", 7, ""), F = /* @__PURE__ */ ve(!1), D = /* @__PURE__ */ ve(""), te = /* @__PURE__ */ ve(void 0), P = /* @__PURE__ */ ve(void 0), q = /* @__PURE__ */ ve(Vt(/* @__PURE__ */ new Set()));
  const ue = ["Anthropic", "OpenAI", "Google", "Groq", "Ollama", "Other"];
  let Ce = /* @__PURE__ */ we(() => {
    const k = a(), E = r(D).toLowerCase(), j = E ? k.filter((S) => S.name.toLowerCase().includes(E) || S.provider.toLowerCase().includes(E) || S.family.toLowerCase().includes(E)) : k, T = /* @__PURE__ */ new Map();
    for (const S of j) {
      const C = Fe(S.provider), H = T.get(C) ?? [];
      H.push(S), T.set(C, H);
    }
    const re = [], Le = [...T.keys()].sort((S, C) => {
      const H = ue.indexOf(S), oe = ue.indexOf(C);
      return (H === -1 ? 999 : H) - (oe === -1 ? 999 : oe) || S.localeCompare(C);
    });
    for (const S of Le) {
      const C = T.get(S) ?? [];
      C.sort((H, oe) => oe.context_length - H.context_length || H.name.localeCompare(oe.name)), re.push({ provider: S, models: C });
    }
    return re;
  }), ge = /* @__PURE__ */ we(() => _l(a(), h(), 4)), fe = /* @__PURE__ */ we(() => a().length), ie = /* @__PURE__ */ we(() => a().find((k) => k.name === l()) ?? null);
  function Fe(k) {
    const E = k.toLowerCase();
    return E.includes("anthropic") ? "Anthropic" : E.includes("openai") ? "OpenAI" : E.includes("google") || E.includes("gemini") ? "Google" : E.includes("groq") ? "Groq" : E.includes("ollama") ? "Ollama" : k ? k.charAt(0).toUpperCase() + k.slice(1) : "Other";
  }
  function Pe(k) {
    switch (k) {
      case "Anthropic":
        return "◆";
      case "OpenAI":
        return "○";
      case "Google":
        return "△";
      case "Groq":
        return "⚡";
      case "Ollama":
        return "⌂";
      default:
        return "●";
    }
  }
  function Ie(k) {
    const E = [], j = Ts(k.context_length);
    return j && E.push({ label: j, css: "text-surface-400 bg-surface-700" }), k.format !== "api" && E.push({ label: "local", css: "text-emerald-400 bg-emerald-500/10" }), ml(k.name) === "code" && E.push({ label: "code", css: "text-hecate-400 bg-hecate-500/10" }), k.parameter_size && k.parameter_size !== "" && k.parameter_size !== "unknown" && E.push({
      label: k.parameter_size,
      css: "text-surface-400 bg-surface-700"
    }), E;
  }
  function ce(k) {
    f()(k), _(F, !1), _(D, ""), _(q, /* @__PURE__ */ new Set(), !0);
  }
  function G(k) {
    const E = new Set(r(q));
    E.has(k) ? E.delete(k) : E.add(k), _(q, E, !0);
  }
  function M(k) {
    r(te) && !r(te).contains(k.target) && (_(F, !1), _(D, ""), _(q, /* @__PURE__ */ new Set(), !0));
  }
  function z(k) {
    return k.length <= 24 ? k : k.slice(0, 22) + "…";
  }
  function W(k) {
    k.key === "Escape" && (_(F, !1), _(D, ""));
  }
  Rt(() => (r(F) ? (document.addEventListener("click", M, !0), requestAnimationFrame(() => r(P)?.focus())) : document.removeEventListener("click", M, !0), () => document.removeEventListener("click", M, !0)));
  var N = {
    get currentModel() {
      return l();
    },
    set currentModel(k) {
      l(k), ut();
    },
    get onSelect() {
      return f();
    },
    set onSelect(k) {
      f(k), ut();
    },
    get showPhaseInfo() {
      return v();
    },
    set showPhaseInfo(k = !1) {
      v(k), ut();
    },
    get phasePreference() {
      return p();
    },
    set phasePreference(k = null) {
      p(k), ut();
    },
    get phaseAffinity() {
      return h();
    },
    set phaseAffinity(k = "general") {
      h(k), ut();
    },
    get onPinModel() {
      return b();
    },
    set onPinModel(k) {
      b(k), ut();
    },
    get onClearPin() {
      return $();
    },
    set onClearPin(k) {
      $(k), ut();
    },
    get phaseName() {
      return w();
    },
    set phaseName(k = "") {
      w(k), ut();
    }
  }, I = _u(), B = i(I);
  B.__click = () => _(F, !r(F));
  var $e = i(B);
  {
    var je = (k) => {
      var E = Qd(), j = it(E), T = i(j, !0);
      s(j);
      var re = o(j, 2);
      {
        var Le = (S) => {
          const C = /* @__PURE__ */ we(() => Ts(r(ie).context_length));
          var H = or(), oe = it(H);
          {
            var Be = (V) => {
              var O = Jd(), J = i(O, !0);
              s(O), g(() => x(J, r(C))), d(V, O);
            };
            A(oe, (V) => {
              r(C) && V(Be);
            });
          }
          d(S, H);
        };
        A(re, (S) => {
          r(ie) && S(Le);
        });
      }
      g((S) => x(T, S), [() => z(l())]), d(k, E);
    }, qe = (k) => {
      var E = Xd();
      d(k, E);
    };
    A($e, (k) => {
      l() ? k(je) : k(qe, !1);
    });
  }
  var Ve = o($e, 2), Se = i(Ve, !0);
  s(Ve), s(B);
  var Ne = o(B, 2);
  {
    var be = (k) => {
      var E = xu();
      E.__keydown = W;
      var j = i(E), T = i(j);
      wt(T), ea(T, (O) => _(P, O), () => r(P)), s(j);
      var re = o(j, 2);
      {
        var Le = (O) => {
          var J = ru(), Te = i(J), Oe = o(i(Te)), Ke = i(Oe, !0);
          s(Oe);
          var Qe = o(Oe, 2);
          {
            var tt = (We) => {
              var L = Zd();
              d(We, L);
            }, Ye = (We) => {
              var L = eu();
              d(We, L);
            };
            A(Qe, (We) => {
              h() === "code" ? We(tt) : h() === "creative" && We(Ye, 1);
            });
          }
          s(Te);
          var at = o(Te, 2);
          {
            var ze = (We) => {
              var L = tu();
              L.__click = () => $()?.(), d(We, L);
            };
            A(at, (We) => {
              p() && We(ze);
            });
          }
          s(J), g(() => x(Ke, w())), d(O, J);
        };
        A(re, (O) => {
          v() && w() && O(Le);
        });
      }
      var S = o(re, 2), C = i(S);
      {
        var H = (O) => {
          var J = au(), Te = i(J, !0);
          s(J), g(() => x(Te, r(fe) === 0 ? "No models available" : "No matching models")), d(O, J);
        };
        A(C, (O) => {
          r(Ce).length === 0 && O(H);
        });
      }
      var oe = o(C, 2);
      {
        var Be = (O) => {
          var J = ou(), Te = i(J), Oe = i(Te);
          s(Te);
          var Ke = o(Te, 2);
          He(Ke, 17, () => r(ge), ct, (Qe, tt) => {
            let Ye = () => r(tt).model, at = () => r(tt).tier;
            const ze = /* @__PURE__ */ we(() => Ye().name === l()), We = /* @__PURE__ */ we(() => Ie(Ye()));
            var L = iu();
            L.__click = () => ce(Ye().name);
            var U = i(L), Y = i(U, !0);
            s(U);
            var xe = o(U, 2), se = i(xe, !0);
            s(xe);
            var pe = o(xe, 2);
            He(pe, 17, () => r(We), ct, (de, R) => {
              var ae = su(), he = i(ae, !0);
              s(ae), g(() => {
                Re(ae, 1, `text-[8px] px-1 py-0.5 rounded ${r(R).css ?? ""} shrink-0`), x(he, r(R).label);
              }), d(de, ae);
            });
            var Me = o(pe, 2), Je = i(Me, !0);
            s(Me);
            var m = o(Me, 2);
            {
              var y = (de) => {
                var R = nu();
                R.textContent = "✓", d(de, R);
              };
              A(m, (de) => {
                r(ze) && de(y);
              });
            }
            s(L), g(
              (de) => {
                Re(L, 1, `w-full text-left px-2 py-1.5 text-[11px] flex items-center gap-1.5
									transition-colors cursor-pointer
									${r(ze) ? "bg-hecate-600/20 text-hecate-300" : "text-surface-200 hover:bg-surface-700"}`), x(Y, de), x(se, Ye().name), Re(Me, 1, `text-[8px] px-1 py-0.5 rounded shrink-0
									${at() === "flagship" ? "text-amber-400 bg-amber-500/10" : at() === "balanced" ? "text-blue-400 bg-blue-500/10" : at() === "fast" ? "text-emerald-400 bg-emerald-500/10" : "text-surface-400 bg-surface-700"}`), x(Je, at());
              },
              [() => Pe(Fe(Ye().provider))]
            ), d(Qe, L);
          }), s(J), g(() => x(Oe, `Recommended${h() !== "general" ? ` for ${h()}` : ""}`)), d(O, J);
        };
        A(oe, (O) => {
          !r(D) && r(ge).length > 0 && O(Be);
        });
      }
      var V = o(oe, 2);
      He(V, 17, () => r(Ce), ct, (O, J) => {
        const Te = /* @__PURE__ */ we(() => r(D) !== "" || r(q).has(r(J).provider));
        var Oe = pu(), Ke = i(Oe);
        Ke.__click = () => !r(D) && G(r(J).provider);
        var Qe = i(Ke);
        {
          var tt = (se) => {
            var pe = cu(), Me = i(pe, !0);
            s(pe), g(() => x(Me, r(Te) ? "▼" : "▶")), d(se, pe);
          };
          A(Qe, (se) => {
            r(D) || se(tt);
          });
        }
        var Ye = o(Qe, 2), at = i(Ye, !0);
        s(Ye);
        var ze = o(Ye, 2), We = i(ze, !0);
        s(ze);
        var L = o(ze, 2), U = i(L);
        s(L), s(Ke);
        var Y = o(Ke, 2);
        {
          var xe = (se) => {
            var pe = or(), Me = it(pe);
            He(Me, 17, () => r(J).models, ct, (Je, m) => {
              const y = /* @__PURE__ */ we(() => r(m).name === l()), de = /* @__PURE__ */ we(() => r(m).name === p()), R = /* @__PURE__ */ we(() => Ie(r(m)));
              var ae = fu();
              ae.__click = () => ce(r(m).name);
              var he = i(ae), Ae = i(he, !0);
              s(he);
              var ne = o(he, 2);
              He(ne, 17, () => r(R), ct, (ee, Q) => {
                var ye = lu(), De = i(ye, !0);
                s(ye), g(() => {
                  Re(ye, 1, `text-[8px] px-1 py-0.5 rounded ${r(Q).css ?? ""} shrink-0`), x(De, r(Q).label);
                }), d(ee, ye);
              });
              var X = o(ne, 2);
              {
                var Z = (ee) => {
                  var Q = du();
                  Q.textContent = "📌", d(ee, Q);
                };
                A(X, (ee) => {
                  r(de) && ee(Z);
                });
              }
              var _e = o(X, 2);
              {
                var ke = (ee) => {
                  var Q = uu();
                  Q.textContent = "✓", d(ee, Q);
                };
                A(_e, (ee) => {
                  r(y) && ee(ke);
                });
              }
              var me = o(_e, 2);
              {
                var le = (ee) => {
                  var Q = vu();
                  Q.__click = (ye) => {
                    ye.stopPropagation(), b()?.(r(m).name);
                  }, g(() => Mt(Q, "title", `Pin for ${w() ?? ""} phase`)), d(ee, Q);
                };
                A(me, (ee) => {
                  v() && b() && !r(de) && ee(le);
                });
              }
              s(ae), g(() => {
                Re(ae, 1, `w-full text-left px-2 py-1.5 text-[11px] flex items-center gap-1.5
										transition-colors cursor-pointer
										${r(D) ? "pl-2" : "pl-7"}
										${r(y) ? "bg-hecate-600/20 text-hecate-300" : "text-surface-200 hover:bg-surface-700"}`), x(Ae, r(m).name);
              }), d(Je, ae);
            }), d(se, pe);
          };
          A(Y, (se) => {
            r(Te) && se(xe);
          });
        }
        s(Oe), g(
          (se) => {
            Re(Ke, 1, `px-2 py-1 text-[9px] uppercase tracking-wider font-medium flex items-center gap-1.5
								${r(D) ? "text-surface-500" : "text-surface-500 hover:text-surface-300 cursor-pointer"}`), x(at, se), x(We, r(J).provider), x(U, `(${r(J).models.length ?? ""})`);
          },
          [() => Pe(r(J).provider)]
        ), d(O, Oe);
      }), s(S), s(E), g(() => Mt(T, "placeholder", `Search ${r(fe) ?? ""} models...`)), xt(T, () => r(D), (O) => _(D, O)), d(k, E);
    };
    A(Ne, (k) => {
      r(F) && k(be);
    });
  }
  s(I), ea(I, (k) => _(te, k), () => r(te)), g(
    (k) => {
      Mt(B, "title", k), x(Se, r(F) ? "▲" : "▼");
    },
    [
      () => l() ? `${l()}${r(ie) ? ` (${r(ie).provider}, ${Ts(r(ie).context_length)} ctx)` : ""}` : "No model selected"
    ]
  ), d(e, I);
  var K = mt(N);
  return c(), K;
}
At(["click", "keydown"]);
kt(
  $s,
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
var hu = /* @__PURE__ */ u(`<div class="flex justify-end"><div class="max-w-[85%] rounded-lg px-3 py-2 text-[11px]
							bg-hecate-600/20 text-surface-100 border border-hecate-600/20"><div class="whitespace-pre-wrap break-words"> </div></div></div>`), gu = /* @__PURE__ */ u(`<details class="mb-1.5 group"><summary class="text-[10px] text-surface-400 cursor-pointer hover:text-surface-300
											select-none flex items-center gap-1"><span class="text-[9px] transition-transform group-open:rotate-90"></span> Reasoning</summary> <div class="mt-1 pl-2 border-l-2 border-surface-600 text-[10px] text-surface-400
											whitespace-pre-wrap break-words max-h-32 overflow-y-auto"> </div></details>`), bu = /* @__PURE__ */ u('<div class="whitespace-pre-wrap break-words"> </div>'), mu = /* @__PURE__ */ u('<div class="flex justify-start"><div></div></div>'), yu = /* @__PURE__ */ u(`<details class="group"><summary class="text-[10px] text-surface-500 cursor-pointer hover:text-surface-400
										select-none flex items-center gap-1"><span class="text-[9px] transition-transform group-open:rotate-90"></span> Show reasoning</summary> <div class="mt-1 pl-2 border-l-2 border-surface-600 text-[10px] text-surface-400
										whitespace-pre-wrap break-words max-h-32 overflow-y-auto"> <span class="inline-block w-1 h-3 bg-accent-400/50 animate-pulse ml-0.5"></span></div></details>`), wu = /* @__PURE__ */ u('<div class="flex items-center gap-2 text-surface-400 mb-1"><span class="flex gap-1"><span class="w-1.5 h-1.5 rounded-full bg-accent-500/60 animate-bounce" style="animation-delay: 0ms"></span> <span class="w-1.5 h-1.5 rounded-full bg-accent-500/60 animate-bounce" style="animation-delay: 150ms"></span> <span class="w-1.5 h-1.5 rounded-full bg-accent-500/60 animate-bounce" style="animation-delay: 300ms"></span></span> <span class="text-[10px] text-accent-400/70">Reasoning...</span></div> <!>', 1), $u = /* @__PURE__ */ u(`<details class="mb-1.5 group"><summary class="text-[10px] text-surface-400 cursor-pointer hover:text-surface-300
										select-none flex items-center gap-1"><span class="text-[9px] transition-transform group-open:rotate-90"></span> Reasoning</summary> <div class="mt-1 pl-2 border-l-2 border-surface-600 text-[10px] text-surface-400
										whitespace-pre-wrap break-words max-h-32 overflow-y-auto"> </div></details>`), ku = /* @__PURE__ */ u('<!> <div class="whitespace-pre-wrap break-words"> <span class="inline-block w-1.5 h-3 bg-hecate-400 animate-pulse ml-0.5"></span></div>', 1), Cu = /* @__PURE__ */ u('<div class="flex items-center gap-1.5 text-surface-400"><span class="animate-bounce" style="animation-delay: 0ms">.</span> <span class="animate-bounce" style="animation-delay: 150ms">.</span> <span class="animate-bounce" style="animation-delay: 300ms">.</span></div>'), Su = /* @__PURE__ */ u(`<div class="flex justify-start"><div class="max-w-[85%] rounded-lg px-3 py-2 text-[11px]
						bg-surface-700 text-surface-200 border border-surface-600"><!></div></div>`), Eu = /* @__PURE__ */ u('<div class="flex items-center justify-center h-full"><div class="text-center text-surface-400"><div class="text-2xl mb-2"></div> <div class="text-[11px]">The Oracle is preparing...</div></div></div>'), Au = /* @__PURE__ */ u('<span class="text-[10px] text-health-ok"></span>'), Du = /* @__PURE__ */ u('<span class="text-[10px] text-accent-400"></span>'), Pu = /* @__PURE__ */ u('<span class="text-[10px] text-surface-400"></span>'), Tu = /* @__PURE__ */ u('<span class="text-[10px] text-surface-400">Waiting for Oracle...</span>'), Ru = /* @__PURE__ */ u('<div class="mt-4 p-2 rounded bg-surface-700 border border-surface-600"><div class="text-[9px] text-surface-400 uppercase tracking-wider mb-1">Brief</div> <div class="text-[11px] text-surface-200"> </div></div>'), Iu = /* @__PURE__ */ u('<div class="prose prose-sm prose-invert"><!></div> <!>', 1), Mu = /* @__PURE__ */ u(`<div class="flex items-center justify-center h-full"><div class="text-center text-surface-400 max-w-[220px]"><div class="text-2xl mb-2"></div> <div class="text-[11px]">Your vision will take shape here as the Oracle
							gathers context about your venture.</div></div></div>`), Nu = /* @__PURE__ */ u('<div class="text-[10px] text-health-err bg-health-err/10 rounded px-2 py-1"> </div>'), Lu = /* @__PURE__ */ u(`<div class="space-y-2"><div><label for="repo-path" class="text-[10px] text-surface-400 block mb-1">Repository Path</label> <input id="repo-path" placeholder="~/ventures/my-venture" class="w-full bg-surface-700 border border-surface-600 rounded px-3 py-1.5
								text-[11px] text-surface-100 placeholder-surface-400
								focus:outline-none focus:border-hecate-500"/></div> <!> <button> </button></div>`), Ou = /* @__PURE__ */ u('<div class="text-center text-[10px] text-surface-400 py-2"></div>'), Fu = /* @__PURE__ */ u('<div class="text-center text-[10px] text-surface-400 py-2">The Oracle will guide you through defining your venture</div>'), ju = /* @__PURE__ */ u(`<div class="flex h-full overflow-hidden"><div class="flex flex-col overflow-hidden"><div class="flex items-center gap-2 px-4 py-2.5 border-b border-surface-600 shrink-0"><span class="text-hecate-400"></span> <span class="text-xs font-semibold text-surface-100">The Oracle</span> <span class="text-[10px] text-surface-400">Vision Architect</span> <div class="flex-1"></div> <!></div> <div class="flex-1 overflow-y-auto p-4 space-y-3"><!> <!> <!></div> <div class="border-t border-surface-600 p-3 shrink-0"><div class="flex gap-2"><textarea class="flex-1 bg-surface-700 border border-surface-600 rounded-lg px-3 py-2
						text-[11px] text-surface-100 placeholder-surface-400 resize-none
						focus:outline-none focus:border-hecate-500
						disabled:opacity-50 disabled:cursor-not-allowed"></textarea> <button>Send</button></div></div></div>  <div></div> <div class="flex flex-col overflow-hidden flex-1"><div class="flex items-center gap-2 px-4 py-2.5 border-b border-surface-600 shrink-0"><span class="text-surface-400 text-xs"></span> <span class="text-xs font-semibold text-surface-100">Vision Preview</span> <div class="flex-1"></div> <!></div> <div class="flex-1 overflow-y-auto p-4"><!></div> <div class="border-t border-surface-600 p-3 shrink-0"><!></div></div></div>`);
function Eo(e, t) {
  bt(t, !0);
  const a = () => Ee(St, "$activeVenture", l), n = () => Ee(kn, "$aiModel", l), c = () => Ee(Et, "$isLoading", l), [l, f] = Nt(), v = ao();
  let p = /* @__PURE__ */ ve(Vt([])), h = /* @__PURE__ */ ve(""), b = /* @__PURE__ */ ve(!1), $ = /* @__PURE__ */ ve(""), w = /* @__PURE__ */ ve(void 0), F = /* @__PURE__ */ ve(!1), D = /* @__PURE__ */ ve(""), te = /* @__PURE__ */ ve(""), P = /* @__PURE__ */ ve(null), q = /* @__PURE__ */ ve(null), ue = /* @__PURE__ */ ve(65), Ce = /* @__PURE__ */ ve(!1), ge = /* @__PURE__ */ ve(void 0);
  function fe(m) {
    let y = m.replace(/```markdown\n[\s\S]*?```/g, "◇ Vision updated ↗");
    return y = y.replace(/```markdown\n[\s\S]*$/, "◇ Synthesizing vision... ↗"), y;
  }
  function ie(m) {
    const y = fe(m), de = [];
    let R = y;
    for (; R.length > 0; ) {
      const ae = R.indexOf("<think>");
      if (ae === -1) {
        R.trim() && de.push({ type: "text", content: R });
        break;
      }
      if (ae > 0) {
        const ne = R.slice(0, ae);
        ne.trim() && de.push({ type: "text", content: ne });
      }
      const he = R.indexOf("</think>", ae);
      if (he === -1) {
        const ne = R.slice(ae + 7);
        ne.trim() && de.push({ type: "think", content: ne });
        break;
      }
      const Ae = R.slice(ae + 7, he);
      Ae.trim() && de.push({ type: "think", content: Ae }), R = R.slice(he + 8);
    }
    return de.length > 0 ? de : [{ type: "text", content: y }];
  }
  function Fe(m) {
    return m.includes("<think>") && !m.includes("</think>");
  }
  function Pe(m) {
    const y = fe(m);
    return y.includes("</think>") ? (y.split("</think>").pop() || "").trim() : y.includes("<think>") ? "" : y;
  }
  function Ie(m) {
    const y = fe(m), de = y.indexOf("<think>");
    if (de === -1) return "";
    const R = y.indexOf("</think>");
    return R === -1 ? y.slice(de + 7) : y.slice(de + 7, R);
  }
  let ce = /* @__PURE__ */ we(() => {
    for (let m = r(p).length - 1; m >= 0; m--)
      if (r(p)[m].role === "assistant") {
        const y = r(p)[m].content.match(/```markdown\n([\s\S]*?)```/);
        if (y) return y[1].trim();
      }
    if (r($)) {
      const m = r($).match(/```markdown\n([\s\S]*?)```/);
      if (m) return m[1].trim();
      const y = r($).match(/```markdown\n([\s\S]*)$/);
      if (y) return y[1].trim();
    }
    return null;
  }), G = /* @__PURE__ */ we(() => r(ce) !== null && !r(ce).includes("(Not yet explored)") && !r(ce).includes("*(Hypothetical)*")), M = /* @__PURE__ */ we(() => {
    if (!r(ce)) return null;
    const m = r(ce).match(/<!--\s*brief:\s*(.*?)\s*-->/);
    return m ? m[1].trim() : null;
  }), z = /* @__PURE__ */ ve(null);
  Rt(() => {
    const m = a(), y = m?.venture_id ?? null;
    if (y !== r(z) && (_(p, [], !0), _($, ""), _(b, !1), _(D, ""), _(te, ""), _(z, y, !0)), m && !r(te)) {
      const de = "~/ventures", R = m.name.toLowerCase().replace(/[^a-z0-9-]/g, "-");
      _(te, `${de}/${R}`);
    }
  }), Rt(() => {
    const m = n();
    r(q) !== null && r(q) !== m && (r(P) && (r(P).cancel(), _(P, null)), _(p, [], !0), _($, ""), _(b, !1)), _(q, m, !0);
  }), Rt(() => {
    const m = a();
    if (m && r(p).length === 0 && !r(b)) {
      const y = `I just initiated a new venture called "${m.name}". ${m.brief ? `Here's what I know so far: ${m.brief}` : "I need help defining the vision for this venture."}`;
      N(y);
    }
  });
  function W() {
    const m = [], y = Xt(So);
    y && m.push(y);
    const de = Xt(Wd);
    if (m.push(Kd(de, { venture_name: a()?.name ?? "Unnamed" })), a()) {
      let R = `The venture is called "${a().name}"`;
      a().brief && (R += `. Initial brief: ${a().brief}`), m.push(R);
    }
    return m.join(`

---

`);
  }
  async function N(m) {
    const y = n();
    if (!y || !m.trim() || r(b)) return;
    const de = { role: "user", content: m.trim() };
    _(p, [...r(p), de], !0), _(h, "");
    const R = [], ae = W();
    ae && R.push({ role: "system", content: ae }), R.push(...r(p)), _(b, !0), _($, "");
    let he = "";
    const Ae = v.stream.chat(y, R);
    _(P, Ae, !0), Ae.onChunk((ne) => {
      ne.content && (he += ne.content, _($, he, !0));
    }).onDone(async (ne) => {
      ne.content && (he += ne.content);
      const X = {
        role: "assistant",
        content: he || "(empty response)"
      };
      _(p, [...r(p), X], !0), _($, ""), _(b, !1), _(P, null);
    }).onError((ne) => {
      const X = { role: "assistant", content: `Error: ${ne}` };
      _(p, [...r(p), X], !0), _($, ""), _(b, !1), _(P, null);
    });
    try {
      await Ae.start();
    } catch (ne) {
      const X = { role: "assistant", content: `Error: ${String(ne)}` };
      _(p, [...r(p), X], !0), _(b, !1);
    }
  }
  async function I() {
    if (!a() || !r(ce) || !r(te).trim()) return;
    _(F, !0), _(D, ""), await uo(a().venture_id, r(te).trim(), r(ce), a().name, r(M) ?? void 0) ? (await kr(), await ms()) : _(D, Xt(br) || "Failed to scaffold venture repo", !0), _(F, !1);
  }
  let B = /* @__PURE__ */ ve(void 0);
  function $e(m) {
    m.key === "Enter" && !m.shiftKey && (m.preventDefault(), N(r(h)), r(B) && (r(B).style.height = "auto"));
  }
  function je(m) {
    const y = m.target;
    y.style.height = "auto", y.style.height = Math.min(y.scrollHeight, 150) + "px";
  }
  function qe(m) {
    _(Ce, !0), m.preventDefault();
  }
  function Ve(m) {
    if (!r(Ce) || !r(ge)) return;
    const y = r(ge).getBoundingClientRect(), R = (m.clientX - y.left) / y.width * 100;
    _(ue, Math.max(30, Math.min(80, R)), !0);
  }
  function Se() {
    _(Ce, !1);
  }
  Rt(() => {
    r(p), r($), gn().then(() => {
      r(w) && (r(w).scrollTop = r(w).scrollHeight);
    });
  });
  function Ne(m) {
    return m.replace(/<!--.*?-->/gs, "").replace(/^### (.*$)/gm, '<h3 class="text-xs font-semibold text-surface-100 mt-3 mb-1">$1</h3>').replace(/^## (.*$)/gm, '<h2 class="text-sm font-semibold text-hecate-300 mt-4 mb-1.5">$1</h2>').replace(/^# (.*$)/gm, '<h1 class="text-base font-bold text-surface-100 mb-2">$1</h1>').replace(/^(\d+)\.\s+(.*$)/gm, '<div class="text-[11px] text-surface-200 ml-3 mb-1"><span class="text-surface-400 mr-1.5">$1.</span>$2</div>').replace(/^\- (.*$)/gm, '<div class="text-[11px] text-surface-200 ml-3 mb-1"><span class="text-surface-400 mr-1.5">&bull;</span>$1</div>').replace(/\*\*(.*?)\*\*/g, '<strong class="text-surface-100">$1</strong>').replace(/\*(.*?)\*/g, '<em class="text-surface-300">$1</em>').replace(/\n\n/g, "<br/><br/>").trim();
  }
  var be = ju();
  be.__mousemove = Ve, be.__mouseup = Se;
  var K = i(be), k = i(K), E = i(k);
  E.textContent = "◇";
  var j = o(E, 8);
  $s(j, {
    get currentModel() {
      return n();
    },
    onSelect: (m) => Cn(m)
  }), s(k);
  var T = o(k, 2), re = i(T);
  He(re, 17, () => r(p), ct, (m, y) => {
    var de = or(), R = it(de);
    {
      var ae = (Ae) => {
        var ne = hu(), X = i(ne), Z = i(X), _e = i(Z, !0);
        s(Z), s(X), s(ne), g(() => x(_e, r(y).content)), d(Ae, ne);
      }, he = (Ae) => {
        var ne = mu(), X = i(ne);
        He(X, 21, () => ie(r(y).content), ct, (Z, _e) => {
          var ke = or(), me = it(ke);
          {
            var le = (Q) => {
              var ye = gu(), De = i(ye), Ge = i(De);
              Ge.textContent = "▶", Dt(), s(De);
              var Ue = o(De, 2), Xe = i(Ue, !0);
              s(Ue), s(ye), g((rt) => x(Xe, rt), [() => r(_e).content.trim()]), d(Q, ye);
            }, ee = (Q) => {
              var ye = bu(), De = i(ye, !0);
              s(ye), g((Ge) => x(De, Ge), [() => r(_e).content.trim()]), d(Q, ye);
            };
            A(me, (Q) => {
              r(_e).type === "think" ? Q(le) : Q(ee, !1);
            });
          }
          d(Z, ke);
        }), s(X), s(ne), g(
          (Z) => Re(X, 1, `max-w-[85%] rounded-lg px-3 py-2 text-[11px]
							bg-surface-700 text-surface-200 border border-surface-600
							${Z ?? ""}`),
          [
            () => r(y).content.startsWith("Error:") ? "border-health-err/30 text-health-err" : ""
          ]
        ), d(Ae, ne);
      };
      A(R, (Ae) => {
        r(y).role === "user" ? Ae(ae) : r(y).role === "assistant" && Ae(he, 1);
      });
    }
    d(m, de);
  });
  var Le = o(re, 2);
  {
    var S = (m) => {
      var y = Su(), de = i(y), R = i(de);
      {
        var ae = (X) => {
          var Z = wu(), _e = o(it(Z), 2);
          {
            var ke = (le) => {
              var ee = yu(), Q = i(ee), ye = i(Q);
              ye.textContent = "▶", Dt(), s(Q);
              var De = o(Q, 2), Ge = i(De, !0);
              Dt(), s(De), s(ee), g((Ue) => x(Ge, Ue), [
                () => Ie(r($)).trim()
              ]), d(le, ee);
            }, me = /* @__PURE__ */ we(() => Ie(r($)).trim());
            A(_e, (le) => {
              r(me) && le(ke);
            });
          }
          d(X, Z);
        }, he = /* @__PURE__ */ we(() => r($) && Fe(r($))), Ae = (X) => {
          var Z = ku(), _e = it(Z);
          {
            var ke = (Q) => {
              var ye = $u(), De = i(ye), Ge = i(De);
              Ge.textContent = "▶", Dt(), s(De);
              var Ue = o(De, 2), Xe = i(Ue, !0);
              s(Ue), s(ye), g((rt) => x(Xe, rt), [
                () => Ie(r($)).trim()
              ]), d(Q, ye);
            }, me = /* @__PURE__ */ we(() => Ie(r($)).trim());
            A(_e, (Q) => {
              r(me) && Q(ke);
            });
          }
          var le = o(_e, 2), ee = i(le, !0);
          Dt(), s(le), g((Q) => x(ee, Q), [() => Pe(r($))]), d(X, Z);
        }, ne = (X) => {
          var Z = Cu();
          d(X, Z);
        };
        A(R, (X) => {
          r(he) ? X(ae) : r($) ? X(Ae, 1) : X(ne, !1);
        });
      }
      s(de), s(y), d(m, y);
    };
    A(Le, (m) => {
      r(b) && m(S);
    });
  }
  var C = o(Le, 2);
  {
    var H = (m) => {
      var y = Eu(), de = i(y), R = i(de);
      R.textContent = "◇", Dt(2), s(de), s(y), d(m, y);
    };
    A(C, (m) => {
      r(p).length === 0 && !r(b) && m(H);
    });
  }
  s(T), ea(T, (m) => _(w, m), () => r(w));
  var oe = o(T, 2), Be = i(oe), V = i(Be);
  Ca(V), V.__keydown = $e, V.__input = je, Mt(V, "rows", 1), ea(V, (m) => _(B, m), () => r(B));
  var O = o(V, 2);
  O.__click = () => N(r(h)), s(Be), s(oe), s(K);
  var J = o(K, 2);
  J.__mousedown = qe;
  var Te = o(J, 2), Oe = i(Te), Ke = i(Oe);
  Ke.textContent = "📄";
  var Qe = o(Ke, 6);
  {
    var tt = (m) => {
      var y = Au();
      y.textContent = "● Complete", d(m, y);
    }, Ye = (m) => {
      var y = Du();
      y.textContent = "◐ Drafting...", d(m, y);
    }, at = (m) => {
      var y = Pu();
      y.textContent = "◐ Listening...", d(m, y);
    }, ze = (m) => {
      var y = Tu();
      d(m, y);
    };
    A(Qe, (m) => {
      r(G) ? m(tt) : r(ce) ? m(Ye, 1) : r(b) ? m(at, 2) : m(ze, !1);
    });
  }
  s(Oe);
  var We = o(Oe, 2), L = i(We);
  {
    var U = (m) => {
      var y = Iu(), de = it(y), R = i(de);
      Zc(R, () => Ne(r(ce))), s(de);
      var ae = o(de, 2);
      {
        var he = (Ae) => {
          var ne = Ru(), X = o(i(ne), 2), Z = i(X, !0);
          s(X), s(ne), g(() => x(Z, r(M))), d(Ae, ne);
        };
        A(ae, (Ae) => {
          r(M) && Ae(he);
        });
      }
      d(m, y);
    }, Y = (m) => {
      var y = Mu(), de = i(y), R = i(de);
      R.textContent = "📄", Dt(2), s(de), s(y), d(m, y);
    };
    A(L, (m) => {
      r(ce) ? m(U) : m(Y, !1);
    });
  }
  s(We);
  var xe = o(We, 2), se = i(xe);
  {
    var pe = (m) => {
      var y = Lu(), de = i(y), R = o(i(de), 2);
      wt(R), s(de);
      var ae = o(de, 2);
      {
        var he = (X) => {
          var Z = Nu(), _e = i(Z, !0);
          s(Z), g(() => x(_e, r(D))), d(X, Z);
        };
        A(ae, (X) => {
          r(D) && X(he);
        });
      }
      var Ae = o(ae, 2);
      Ae.__click = I;
      var ne = i(Ae, !0);
      s(Ae), s(y), g(
        (X, Z) => {
          Ae.disabled = X, Re(Ae, 1, `w-full px-3 py-2 rounded-lg text-xs font-medium transition-colors
							${Z ?? ""}`), x(ne, r(F) ? "Scaffolding..." : "Scaffold Venture");
        },
        [
          () => r(F) || c() || !r(te).trim(),
          () => r(F) || c() || !r(te).trim() ? "bg-surface-600 text-surface-400 cursor-not-allowed" : "bg-hecate-600 text-surface-50 hover:bg-hecate-500"
        ]
      ), xt(R, () => r(te), (X) => _(te, X)), d(m, y);
    }, Me = (m) => {
      var y = Ou();
      y.textContent = "Vision is taking shape — keep exploring with the Oracle", d(m, y);
    }, Je = (m) => {
      var y = Fu();
      d(m, y);
    };
    A(se, (m) => {
      r(G) ? m(pe) : r(ce) ? m(Me, 1) : m(Je, !1);
    });
  }
  s(xe), s(Te), s(be), ea(be, (m) => _(ge, m), () => r(ge)), g(
    (m, y) => {
      dr(K, `width: ${r(ue) ?? ""}%`), Mt(V, "placeholder", r(b) ? "Oracle is thinking..." : "Describe your venture..."), V.disabled = r(b) || !n(), O.disabled = m, Re(O, 1, `px-3 rounded-lg text-[11px] transition-colors self-end
						${y ?? ""}`), Re(J, 1, `w-1 cursor-col-resize shrink-0 transition-colors
			${r(Ce) ? "bg-hecate-500" : "bg-surface-600 hover:bg-surface-500"}`);
    },
    [
      () => r(b) || !r(h).trim() || !n(),
      () => r(b) || !r(h).trim() || !n() ? "bg-surface-600 text-surface-400 cursor-not-allowed" : "bg-hecate-600 text-surface-50 hover:bg-hecate-500"
    ]
  ), Ot("mouseleave", be, Se), xt(V, () => r(h), (m) => _(h, m)), d(e, be), mt(), f();
}
At([
  "mousemove",
  "mouseup",
  "keydown",
  "input",
  "click",
  "mousedown"
]);
kt(Eo, {}, [], [], { mode: "open" });
var Bu = /* @__PURE__ */ u("<div></div>"), Vu = /* @__PURE__ */ u('<!> <div><span class="svelte-gwxd3p"> </span> <span class="svelte-gwxd3p"> </span></div>', 1), Gu = /* @__PURE__ */ u("<span> </span>"), qu = /* @__PURE__ */ u("<span> </span>"), Hu = /* @__PURE__ */ u(
  `<button title="Toggle event stream viewer">Stream</button> <button class="text-[9px] px-2 py-0.5 rounded ml-1
						text-surface-400 hover:text-health-warn hover:bg-surface-700 transition-colors svelte-gwxd3p" title="Shelve storm">Shelve</button>`,
  1
), zu = /* @__PURE__ */ u(`<button class="flex items-center gap-1 text-[10px] px-2 py-1 rounded
										text-surface-400 hover:text-hecate-300
										hover:bg-hecate-600/10 transition-colors svelte-gwxd3p"><span class="svelte-gwxd3p"> </span> <span class="svelte-gwxd3p"> </span></button>`), Uu = /* @__PURE__ */ u(`<div class="flex items-center justify-center h-full svelte-gwxd3p"><div class="text-center max-w-lg mx-4 svelte-gwxd3p"><div class="text-4xl mb-4 text-es-event svelte-gwxd3p"></div> <h2 class="text-lg font-semibold text-surface-100 mb-3 svelte-gwxd3p">Big Picture Event Storming</h2> <p class="text-xs text-surface-400 leading-relaxed mb-6 svelte-gwxd3p">Discover the domain landscape by storming events onto the board.
						Start with a 10-minute high octane phase where everyone
						(including AI agents) throws domain events as fast as possible. <br class="svelte-gwxd3p"/><br class="svelte-gwxd3p"/> Volume over quality. The thick stacks reveal what matters.
						Natural clusters become your divisions (bounded contexts).</p> <div class="flex flex-col items-center gap-4 svelte-gwxd3p"><button class="px-6 py-3 rounded-lg text-sm font-medium
								bg-es-event text-surface-50 hover:bg-es-event/90
								transition-colors shadow-lg shadow-es-event/20 svelte-gwxd3p"></button> <div class="flex gap-2 svelte-gwxd3p"></div></div></div></div>`), Wu = /* @__PURE__ */ u(`<div class="group relative px-3 py-2 rounded text-xs
									bg-es-event/15 border border-es-event/30 text-surface-100
									hover:border-es-event/50 transition-all duration-200
									storm-sticky svelte-gwxd3p"><span class="svelte-gwxd3p"> </span> <span class="text-[8px] text-es-event/60 ml-1.5 svelte-gwxd3p"> </span> <button class="absolute -top-1 -right-1 w-4 h-4 rounded-full
										bg-surface-700 border border-surface-600
										text-surface-400 hover:text-health-err
										text-[8px] flex items-center justify-center
										opacity-0 group-hover:opacity-100 transition-opacity svelte-gwxd3p"></button></div>`), Yu = /* @__PURE__ */ u(`<div class="group relative px-3 py-2 rounded text-xs
									border-2 border-dashed border-es-event/40 text-surface-300
									opacity-50 hover:opacity-80 transition-all duration-200
									storm-sticky ghost-sticky svelte-gwxd3p"><span class="italic svelte-gwxd3p"> </span> <span class="text-[8px] text-es-event/40 ml-1.5 svelte-gwxd3p">oracle</span> <div class="absolute -top-1 -right-1 flex gap-0.5
									opacity-0 group-hover:opacity-100 transition-opacity svelte-gwxd3p"><button class="w-4 h-4 rounded-full bg-health-ok/20 border border-health-ok/40
											text-health-ok text-[8px] flex items-center justify-center
											hover:bg-health-ok/30 svelte-gwxd3p" title="Accept"></button> <button class="w-4 h-4 rounded-full bg-surface-700 border border-surface-600
											text-surface-400 hover:text-health-err
											text-[8px] flex items-center justify-center svelte-gwxd3p" title="Dismiss"></button></div></div>`), Ku = /* @__PURE__ */ u('<div class="text-surface-500 text-xs italic svelte-gwxd3p">Start throwing events! Type below or ask an AI agent...</div>'), Ju = /* @__PURE__ */ u(`<button class="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded
										text-surface-400 hover:text-hecate-300
										hover:bg-hecate-600/10 transition-colors svelte-gwxd3p"><span class="svelte-gwxd3p"> </span> <span class="svelte-gwxd3p"> </span></button>`), Qu = /* @__PURE__ */ u(`<div class="flex flex-col h-full svelte-gwxd3p"><div class="flex-1 overflow-y-auto p-4 svelte-gwxd3p"><div class="flex flex-wrap gap-2 content-start storm-board svelte-gwxd3p"><!> <!> <!></div></div> <div class="border-t border-surface-600 p-3 shrink-0 svelte-gwxd3p"><div class="flex gap-2 mb-2 svelte-gwxd3p"><input placeholder="Type a domain event (past tense)... e.g., order_placed" class="flex-1 bg-surface-700 border border-es-event/30 rounded px-3 py-2
								text-xs text-surface-100 placeholder-surface-400
								focus:outline-none focus:border-es-event svelte-gwxd3p"/> <button>Add</button></div> <div class="flex items-center justify-between svelte-gwxd3p"><div class="flex gap-1.5 svelte-gwxd3p"></div> <button class="text-[10px] px-3 py-1 rounded
								bg-surface-700 text-surface-300
								hover:text-surface-100 hover:bg-surface-600 transition-colors svelte-gwxd3p"></button></div></div></div>`), Xu = /* @__PURE__ */ u('<span class="text-[8px] px-1 rounded bg-es-event/20 text-es-event svelte-gwxd3p"> </span>'), Zu = /* @__PURE__ */ u(`<div draggable="true" class="group flex items-center gap-1.5 px-2 py-1.5 rounded text-[11px]
											bg-es-event/15 border border-es-event/30 text-surface-100
											cursor-grab active:cursor-grabbing hover:border-es-event/50 svelte-gwxd3p"><span class="flex-1 truncate svelte-gwxd3p"> </span> <!></div>`), ev = /* @__PURE__ */ u(`<div class="group flex items-center gap-1 px-2 py-1 rounded text-[10px]
														bg-es-event/10 text-surface-200 svelte-gwxd3p"><span class="flex-1 truncate svelte-gwxd3p"> </span> <button class="text-[8px] text-surface-500 hover:text-surface-300
															opacity-0 group-hover:opacity-100 svelte-gwxd3p" title="Unstack"></button></div>`), tv = /* @__PURE__ */ u('<div><div class="flex items-center gap-2 mb-2 svelte-gwxd3p"><span class="text-[10px] font-bold text-es-event svelte-gwxd3p"> </span> <span class="text-[9px] text-surface-500 font-mono svelte-gwxd3p"> </span></div> <div class="space-y-1 svelte-gwxd3p"></div></div>'), rv = /* @__PURE__ */ u(`<div class="col-span-2 text-center py-8 text-surface-500 text-xs
											border border-dashed border-surface-600 rounded-lg svelte-gwxd3p">Drag stickies onto each other to create stacks.</div>`), av = /* @__PURE__ */ u(`<button class="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded
										text-surface-400 hover:text-hecate-300
										hover:bg-hecate-600/10 transition-colors svelte-gwxd3p"><span class="svelte-gwxd3p"> </span> <span class="svelte-gwxd3p"> </span></button>`), sv = /* @__PURE__ */ u(`<div class="flex flex-col h-full svelte-gwxd3p"><div class="flex-1 overflow-y-auto p-4 svelte-gwxd3p"><p class="text-xs text-surface-400 mb-3 svelte-gwxd3p">Drag duplicate or related stickies onto each other to form stacks.
						Thick stacks reveal what matters most.</p> <div class="flex gap-4 svelte-gwxd3p"><div class="w-64 shrink-0 svelte-gwxd3p"><h3 class="text-[10px] font-semibold text-surface-300 mb-2 uppercase tracking-wider svelte-gwxd3p"> </h3> <div class="space-y-1 min-h-[200px] rounded-lg border border-dashed border-surface-600 p-2 svelte-gwxd3p"></div></div> <div class="flex-1 svelte-gwxd3p"><h3 class="text-[10px] font-semibold text-surface-300 mb-2 uppercase tracking-wider svelte-gwxd3p"> </h3> <div class="grid grid-cols-2 gap-3 svelte-gwxd3p"><!> <!></div></div></div></div> <div class="border-t border-surface-600 p-3 shrink-0 svelte-gwxd3p"><div class="flex items-center justify-between svelte-gwxd3p"><div class="flex gap-1.5 svelte-gwxd3p"></div> <button class="text-[10px] px-3 py-1 rounded transition-colors
								bg-hecate-600/20 text-hecate-300 hover:bg-hecate-600/30 svelte-gwxd3p"></button></div></div></div>`), nv = /* @__PURE__ */ u('<button><span></span> <span class="flex-1 svelte-gwxd3p"> </span> <span class="text-[8px] text-surface-400 svelte-gwxd3p"> </span></button>'), iv = /* @__PURE__ */ u('<div class="rounded-lg border border-surface-600 bg-surface-800 p-4 svelte-gwxd3p"><div class="flex items-center gap-2 mb-3 svelte-gwxd3p"><span class="text-xs font-semibold text-surface-200 svelte-gwxd3p"> </span> <div class="flex-1 svelte-gwxd3p"></div> <button></button></div> <div class="space-y-1.5 svelte-gwxd3p"></div></div>'), ov = /* @__PURE__ */ u('<div class="space-y-4 mb-6 svelte-gwxd3p"></div>'), cv = /* @__PURE__ */ u(`<div class="text-center py-8 text-surface-500 text-xs
									border border-dashed border-surface-600 rounded-lg mb-6 svelte-gwxd3p">No stacks to groom. All stickies are unique.</div>`), lv = /* @__PURE__ */ u('<span class="text-[8px] text-es-event ml-1 svelte-gwxd3p"> </span>'), dv = /* @__PURE__ */ u(`<span class="text-[10px] px-2 py-1 rounded
												bg-es-event/10 text-surface-200 svelte-gwxd3p"> <!></span>`), uv = /* @__PURE__ */ u('<div class="svelte-gwxd3p"><h3 class="text-[10px] font-semibold text-surface-300 mb-2 uppercase tracking-wider svelte-gwxd3p"> </h3> <div class="flex flex-wrap gap-1.5 svelte-gwxd3p"></div></div>'), vv = /* @__PURE__ */ u(`<div class="flex flex-col h-full svelte-gwxd3p"><div class="flex-1 overflow-y-auto p-4 svelte-gwxd3p"><div class="max-w-2xl mx-auto svelte-gwxd3p"><p class="text-xs text-surface-400 mb-4 svelte-gwxd3p">For each stack, select the best representative sticky. The winner
							gets the stack's weight (vote count). Other stickies are absorbed.</p> <!> <!></div></div> <div class="border-t border-surface-600 p-3 shrink-0 svelte-gwxd3p"><div class="flex items-center justify-end svelte-gwxd3p"><button class="text-[10px] px-3 py-1 rounded transition-colors
								bg-hecate-600/20 text-hecate-300 hover:bg-hecate-600/30 svelte-gwxd3p"></button></div></div></div>`), fv = /* @__PURE__ */ u('<span class="text-[8px] px-1 rounded bg-es-event/20 text-es-event svelte-gwxd3p"> </span>'), pv = /* @__PURE__ */ u(`<div draggable="true" class="group flex items-center gap-1.5 px-2 py-1.5 rounded text-[11px]
											bg-es-event/15 border border-es-event/30 text-surface-100
											cursor-grab active:cursor-grabbing hover:border-es-event/50 svelte-gwxd3p"><span class="flex-1 truncate svelte-gwxd3p"> </span> <!></div>`), xv = /* @__PURE__ */ u('<div class="text-[10px] text-surface-500 text-center py-4 italic svelte-gwxd3p">All events clustered</div>'), _v = /* @__PURE__ */ u('<span class="text-[8px] text-es-event/60 svelte-gwxd3p"> </span>'), hv = /* @__PURE__ */ u(`<div draggable="true" class="group flex items-center gap-1 px-2 py-1 rounded text-[10px]
														bg-es-event/10 text-surface-200
														cursor-grab active:cursor-grabbing svelte-gwxd3p"><span class="flex-1 truncate svelte-gwxd3p"> </span> <!> <button class="text-[8px] text-surface-500 hover:text-surface-300
															opacity-0 group-hover:opacity-100 svelte-gwxd3p" title="Remove from cluster"></button></div>`), gv = /* @__PURE__ */ u('<div><div class="flex items-center gap-2 mb-2 svelte-gwxd3p"><div class="w-3 h-3 rounded-sm shrink-0 svelte-gwxd3p"></div> <span class="flex-1 text-xs font-semibold text-surface-100 truncate svelte-gwxd3p"> </span> <span class="text-[9px] text-surface-400 svelte-gwxd3p"> </span> <button class="text-[9px] text-surface-500 hover:text-health-err transition-colors svelte-gwxd3p" title="Dissolve cluster"></button></div> <div class="space-y-1 svelte-gwxd3p"></div></div>'), bv = /* @__PURE__ */ u(`<div class="col-span-2 text-center py-8 text-surface-500 text-xs
											border border-dashed border-surface-600 rounded-lg svelte-gwxd3p">Drag stickies onto each other to create clusters.</div>`), mv = /* @__PURE__ */ u(`<button class="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded
										text-surface-400 hover:text-hecate-300
										hover:bg-hecate-600/10 transition-colors svelte-gwxd3p"><span class="svelte-gwxd3p"> </span> <span class="svelte-gwxd3p"> </span></button>`), yv = /* @__PURE__ */ u(`<div class="flex flex-col h-full svelte-gwxd3p"><div class="flex-1 overflow-y-auto p-4 svelte-gwxd3p"><p class="text-xs text-surface-400 mb-3 svelte-gwxd3p">Drag related stickies onto each other to form clusters.
						Clusters become candidate divisions (bounded contexts).</p> <div class="flex gap-4 svelte-gwxd3p"><div class="w-64 shrink-0 svelte-gwxd3p"><h3 class="text-[10px] font-semibold text-surface-300 mb-2 uppercase tracking-wider svelte-gwxd3p"> </h3> <div class="space-y-1 min-h-[200px] rounded-lg border border-dashed border-surface-600 p-2 svelte-gwxd3p"><!> <!></div></div> <div class="flex-1 svelte-gwxd3p"><h3 class="text-[10px] font-semibold text-surface-300 mb-2 uppercase tracking-wider svelte-gwxd3p"> </h3> <div class="grid grid-cols-2 gap-3 svelte-gwxd3p"><!> <!></div></div></div></div> <div class="border-t border-surface-600 p-3 shrink-0 svelte-gwxd3p"><div class="flex items-center justify-between svelte-gwxd3p"><div class="flex gap-1.5 svelte-gwxd3p"></div> <button></button></div></div></div>`), wv = /* @__PURE__ */ u(`<input class="flex-1 bg-surface-700 border border-surface-500 rounded px-3 py-1.5
													text-sm text-surface-100 focus:outline-none focus:border-hecate-500 svelte-gwxd3p" placeholder="division_name (snake_case)"/>`), $v = /* @__PURE__ */ u('<button title="Click to name"> </button>'), kv = /* @__PURE__ */ u('<span class="text-es-event/50 svelte-gwxd3p"> </span>'), Cv = /* @__PURE__ */ u(`<span class="text-[9px] px-1.5 py-0.5 rounded
													bg-es-event/10 text-es-event/80 svelte-gwxd3p"> <!></span>`), Sv = /* @__PURE__ */ u('<div class="rounded-lg border bg-surface-800 p-4 svelte-gwxd3p"><div class="flex items-center gap-3 mb-2 svelte-gwxd3p"><div class="w-4 h-4 rounded svelte-gwxd3p"></div> <!> <span class="text-[10px] text-surface-400 svelte-gwxd3p"> </span></div> <div class="flex flex-wrap gap-1.5 ml-7 svelte-gwxd3p"></div></div>'), Ev = /* @__PURE__ */ u(`<div class="flex flex-col h-full svelte-gwxd3p"><div class="flex-1 overflow-y-auto p-4 svelte-gwxd3p"><div class="max-w-2xl mx-auto svelte-gwxd3p"><p class="text-xs text-surface-400 mb-4 svelte-gwxd3p">Name each cluster as a bounded context (division). These become
							the divisions in your venture. Use snake_case naming.</p> <div class="space-y-3 svelte-gwxd3p"></div></div></div> <div class="border-t border-surface-600 p-3 shrink-0 svelte-gwxd3p"><div class="flex items-center justify-end svelte-gwxd3p"><button class="text-[10px] px-3 py-1 rounded
								bg-hecate-600/20 text-hecate-300 hover:bg-hecate-600/30 transition-colors svelte-gwxd3p"></button></div></div></div>`), Av = /* @__PURE__ */ u('<div class="px-4 py-2 rounded-lg border-2 text-xs font-semibold text-surface-100 svelte-gwxd3p"> <span class="text-[9px] text-surface-400 ml-1 svelte-gwxd3p"> </span></div>'), Dv = /* @__PURE__ */ u(`<div class="flex items-center gap-2 px-3 py-1.5 rounded
												bg-surface-800 border border-surface-600 text-xs svelte-gwxd3p"><span class="px-1.5 py-0.5 rounded text-[10px] font-medium svelte-gwxd3p"> </span> <span class="text-surface-400 svelte-gwxd3p"></span> <span class="text-es-event font-mono text-[10px] svelte-gwxd3p"> </span> <span class="text-surface-400 svelte-gwxd3p"></span> <span class="px-1.5 py-0.5 rounded text-[10px] font-medium svelte-gwxd3p"> </span> <div class="flex-1 svelte-gwxd3p"></div> <button class="text-surface-500 hover:text-health-err text-[9px] transition-colors svelte-gwxd3p"></button></div>`), Pv = /* @__PURE__ */ u('<div class="space-y-1.5 mb-4 svelte-gwxd3p"></div>'), Tv = /* @__PURE__ */ u('<option class="svelte-gwxd3p"> </option>'), Rv = /* @__PURE__ */ u('<option class="svelte-gwxd3p"> </option>'), Iv = /* @__PURE__ */ u(`<div class="rounded-lg border border-surface-600 bg-surface-800 p-4 svelte-gwxd3p"><h4 class="text-[10px] font-semibold text-surface-300 uppercase tracking-wider mb-3 svelte-gwxd3p">Add Integration Fact</h4> <div class="flex items-end gap-2 svelte-gwxd3p"><div class="flex-1 svelte-gwxd3p"><label class="text-[9px] text-surface-400 block mb-1 svelte-gwxd3p">From (publishes)</label> <select class="w-full bg-surface-700 border border-surface-600 rounded px-2 py-1.5
												text-[10px] text-surface-100 focus:outline-none focus:border-hecate-500 svelte-gwxd3p"><option class="svelte-gwxd3p">Select...</option><!></select></div> <div class="flex-1 svelte-gwxd3p"><label class="text-[9px] text-surface-400 block mb-1 svelte-gwxd3p">Fact name</label> <input placeholder="e.g., order_confirmed" class="w-full bg-surface-700 border border-surface-600 rounded px-2 py-1.5
												text-[10px] text-surface-100 placeholder-surface-400
												focus:outline-none focus:border-hecate-500 svelte-gwxd3p"/></div> <div class="flex-1 svelte-gwxd3p"><label class="text-[9px] text-surface-400 block mb-1 svelte-gwxd3p">To (consumes)</label> <select class="w-full bg-surface-700 border border-surface-600 rounded px-2 py-1.5
												text-[10px] text-surface-100 focus:outline-none focus:border-hecate-500 svelte-gwxd3p"><option class="svelte-gwxd3p">Select...</option><!></select></div> <button>Add</button></div></div>`), Mv = /* @__PURE__ */ u(`<button class="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded
										text-surface-400 hover:text-hecate-300
										hover:bg-hecate-600/10 transition-colors svelte-gwxd3p"><span class="svelte-gwxd3p"> </span> <span class="svelte-gwxd3p"> </span></button>`), Nv = /* @__PURE__ */ u(`<div class="flex flex-col h-full svelte-gwxd3p"><div class="flex-1 overflow-y-auto p-4 svelte-gwxd3p"><div class="max-w-3xl mx-auto svelte-gwxd3p"><p class="text-xs text-surface-400 mb-4 svelte-gwxd3p">Map how divisions communicate. Each arrow represents an
							integration fact that flows from one context to another.
							This is your Context Map.</p> <div class="mb-6 svelte-gwxd3p"><div class="flex flex-wrap gap-3 justify-center mb-4 svelte-gwxd3p"></div> <!></div> <!></div></div> <div class="border-t border-surface-600 p-3 shrink-0 svelte-gwxd3p"><div class="flex items-center justify-between svelte-gwxd3p"><div class="flex gap-2 svelte-gwxd3p"></div> <button> </button></div></div></div>`), Lv = /* @__PURE__ */ u(`<div class="flex items-center justify-center h-full svelte-gwxd3p"><div class="text-center max-w-md mx-4 svelte-gwxd3p"><div class="text-4xl mb-4 text-health-ok svelte-gwxd3p"></div> <h2 class="text-lg font-semibold text-surface-100 mb-2 svelte-gwxd3p">Context Map Complete</h2> <p class="text-xs text-surface-400 mb-4 svelte-gwxd3p"> </p> <p class="text-xs text-surface-400 mb-6 svelte-gwxd3p">Select a division from the sidebar to begin Design-Level
						Event Storming in its DnA phase.</p> <button class="text-[10px] px-3 py-1 rounded
							text-surface-400 hover:text-surface-200 hover:bg-surface-700 transition-colors svelte-gwxd3p">Reset Board</button></div></div>`), Ov = /* @__PURE__ */ u(`<div class="flex items-center justify-center h-full svelte-gwxd3p"><div class="text-center max-w-md mx-4 svelte-gwxd3p"><div class="text-4xl mb-4 text-health-warn svelte-gwxd3p"></div> <h2 class="text-lg font-semibold text-surface-100 mb-2 svelte-gwxd3p">Storm Shelved</h2> <p class="text-xs text-surface-400 mb-6 svelte-gwxd3p">This storm session has been shelved. You can resume it at any time
						to continue where you left off.</p> <button class="px-6 py-3 rounded-lg text-sm font-medium
							bg-hecate-600 text-surface-50 hover:bg-hecate-500
							transition-colors svelte-gwxd3p">Resume Storm</button></div></div>`), Fv = /* @__PURE__ */ u('<div class="flex flex-col h-full svelte-gwxd3p"><div class="border-b border-surface-600 bg-surface-800/50 px-4 py-2 shrink-0 svelte-gwxd3p"><div class="flex items-center gap-1 svelte-gwxd3p"><span class="text-xs text-surface-400 mr-2 svelte-gwxd3p">Big Picture</span> <!> <div class="flex-1 svelte-gwxd3p"></div> <!> <!> <!></div></div> <div><!></div></div>');
const jv = {
  hash: "svelte-gwxd3p",
  code: `
	/* Storm phase: stickies animate to aligned grid on phase change */.storm-board .storm-sticky {transition:transform 0.5s ease, opacity 0.3s ease;}

	/* Ghost stickies: translucent dashed border, subtle float */.ghost-sticky {
		animation: svelte-gwxd3p-ghost-float 3s ease-in-out infinite;}

	@keyframes svelte-gwxd3p-ghost-float {
		0%, 100% { transform: translateY(0px); }
		50% { transform: translateY(-2px); }
	}

	/* Scale utility for event count pulse */.scale-110 {transform:scale(1.15);}`
};
function Zs(e, t) {
  bt(t, !0), Qi(e, jv);
  const a = () => Ee(zd, "$bigPictureAgents", D), n = () => Ee(Tl, "$bigPictureEventCount", D), c = () => Ee(sa, "$bigPicturePhase", D), l = () => Ee(St, "$activeVenture", D), f = () => Ee(Ea, "$bigPictureEvents", D), v = () => Ee(ws, "$eventClusters", D), p = () => Ee(En, "$factArrows", D), h = () => Ee(ds, "$highOctaneRemaining", D), b = () => Ee(Ys, "$showEventStream", D), $ = () => Ee(Pl, "$stickyStacks", D), w = () => Ee(Dl, "$unclusteredEvents", D), F = () => Ee(Ks, "$isLoading", D), [D, te] = Nt();
  let P = /* @__PURE__ */ ve(""), q = /* @__PURE__ */ ve(null), ue = /* @__PURE__ */ ve(""), Ce = /* @__PURE__ */ ve(null), ge = /* @__PURE__ */ ve(null), fe = /* @__PURE__ */ ve(""), ie = /* @__PURE__ */ ve(null), Fe = /* @__PURE__ */ ve(Vt({})), Pe = /* @__PURE__ */ ve(Vt(/* @__PURE__ */ new Map()));
  function Ie(L) {
    return r(Pe).has(L) || r(Pe).set(L, {
      rotate: (Math.random() - 0.5) * 6,
      // -3 to +3 degrees
      dx: (Math.random() - 0.5) * 4,
      // -2 to +2 px
      dy: (Math.random() - 0.5) * 4
    }), r(Pe).get(L);
  }
  let ce = /* @__PURE__ */ ve(Vt([]));
  async function G(L) {
    await Za(B(), L.text, "oracle"), _(ce, r(ce).filter((U) => U.id !== L.id), !0);
  }
  function M(L) {
    _(ce, r(ce).filter((U) => U.id !== L.id), !0);
  }
  let z = /* @__PURE__ */ ve(!1), W = /* @__PURE__ */ ve(0);
  Rt(() => {
    const L = n();
    L > r(W) && r(W) > 0 && (_(z, !0), setTimeout(() => _(z, !1), 300)), _(W, L, !0);
  });
  let N = /* @__PURE__ */ ve(!1), I = /* @__PURE__ */ ve("");
  Rt(() => {
    const L = c();
    L !== r(I) && r(I) !== "" && (_(N, !0), setTimeout(() => _(N, !1), 300)), _(I, L, !0);
  });
  function B() {
    return l()?.venture_id ?? "";
  }
  function $e(L) {
    const U = Math.floor(L / 60), Y = L % 60;
    return `${U}:${Y.toString().padStart(2, "0")}`;
  }
  async function je(L) {
    L.key === "Enter" && !L.shiftKey && r(P).trim() && (L.preventDefault(), await Za(B(), r(P)), _(P, ""));
  }
  async function qe(L, U) {
    L.key === "Enter" && r(ue).trim() ? (await Fl(B(), U, r(ue).trim()), _(q, null), _(ue, "")) : L.key === "Escape" && _(q, null);
  }
  function Ve(L) {
    _(q, L.cluster_id, !0), _(ue, L.name ?? "", !0);
  }
  async function Se() {
    r(Ce) && r(ge) && r(Ce) !== r(ge) && r(fe).trim() && (await jl(B(), r(Ce), r(ge), r(fe).trim()), _(fe, ""));
  }
  async function Ne() {
    await Hl(B());
  }
  function be(L) {
    return f().filter((U) => U.cluster_id === L);
  }
  let K = /* @__PURE__ */ we(() => f().filter((L) => !L.stack_id));
  function k(L) {
    const U = l(), Y = f(), xe = v(), se = p();
    let pe = L + `

---

`;
    if (U && (pe += `Venture: "${U.name}"`, U.brief && (pe += ` — ${U.brief}`), pe += `

`), Y.length > 0 && (pe += `Events on the board:
`, pe += Y.map((Me) => `- ${Me.text}${Me.weight > 1 ? ` (x${Me.weight})` : ""}`).join(`
`), pe += `

`), xe.length > 0) {
      pe += `Current clusters (candidate divisions):
`;
      for (const Me of xe) {
        const Je = Y.filter((m) => m.cluster_id === Me.cluster_id);
        pe += `- ${Me.name ?? "(unnamed)"}: ${Je.map((m) => m.text).join(", ") || "(empty)"}
`;
      }
      pe += `
`;
    }
    if (se.length > 0) {
      pe += `Integration fact arrows:
`;
      for (const Me of se) {
        const Je = xe.find((y) => y.cluster_id === Me.from_cluster)?.name ?? "?", m = xe.find((y) => y.cluster_id === Me.to_cluster)?.name ?? "?";
        pe += `- ${Je} → ${Me.fact_name} → ${m}
`;
      }
    }
    return pe;
  }
  const E = [
    { phase: "storm", label: "Storm", icon: "⚡" },
    { phase: "stack", label: "Stack", icon: "≡" },
    { phase: "groom", label: "Groom", icon: "✂" },
    { phase: "cluster", label: "Cluster", icon: "⭐" },
    { phase: "name", label: "Name", icon: "⬡" },
    { phase: "map", label: "Map", icon: "→" },
    { phase: "promoted", label: "Done", icon: "✓" }
  ];
  Rt(() => {
    const L = l();
    L && Wt(L.venture_id);
  });
  var j = Fv(), T = i(j), re = i(T), Le = o(i(re), 2);
  He(Le, 17, () => E, ct, (L, U, Y) => {
    const xe = /* @__PURE__ */ we(() => c() === r(U).phase), se = /* @__PURE__ */ we(() => E.findIndex((he) => he.phase === c()) > Y);
    var pe = Vu(), Me = it(pe);
    {
      var Je = (he) => {
        var Ae = Bu();
        g(() => Re(Ae, 1, `w-6 h-px ${r(se) ? "bg-hecate-400/60" : "bg-surface-600"}`, "svelte-gwxd3p")), d(he, Ae);
      };
      A(Me, (he) => {
        Y > 0 && he(Je);
      });
    }
    var m = o(Me, 2), y = i(m), de = i(y, !0);
    s(y);
    var R = o(y, 2), ae = i(R, !0);
    s(R), s(m), g(() => {
      Re(
        m,
        1,
        `flex items-center gap-1 px-2 py-1 rounded text-[10px]
						${r(xe) ? "bg-surface-700 border border-hecate-500/40 text-hecate-300" : r(se) ? "text-hecate-400/60" : "text-surface-500"}`,
        "svelte-gwxd3p"
      ), x(de, r(U).icon), x(ae, r(U).label);
    }), d(L, pe);
  });
  var S = o(Le, 4);
  {
    var C = (L) => {
      var U = Gu(), Y = i(U);
      s(U), g(() => {
        Re(
          U,
          1,
          `text-[10px] transition-all duration-300
						${r(z) ? "scale-110 text-es-event font-bold" : "text-surface-400"}`,
          "svelte-gwxd3p"
        ), x(Y, `${n() ?? ""} events`);
      }), d(L, U);
    };
    A(S, (L) => {
      c() !== "ready" && c() !== "promoted" && c() !== "shelved" && L(C);
    });
  }
  var H = o(S, 2);
  {
    var oe = (L) => {
      var U = qu(), Y = i(U, !0);
      s(U), g(
        (xe) => {
          Re(
            U,
            1,
            `text-sm font-bold tabular-nums ml-2
						${h() <= 60 ? "text-health-err animate-pulse" : h() <= 180 ? "text-health-warn" : "text-es-event"}`,
            "svelte-gwxd3p"
          ), x(Y, xe);
        },
        [() => $e(h())]
      ), d(L, U);
    };
    A(H, (L) => {
      c() === "storm" && L(oe);
    });
  }
  var Be = o(H, 2);
  {
    var V = (L) => {
      var U = Hu(), Y = it(U);
      Y.__click = () => Ys.update((se) => !se);
      var xe = o(Y, 2);
      xe.__click = () => Gl(B()), g(() => Re(
        Y,
        1,
        `text-[9px] px-2 py-0.5 rounded ml-1
						${b() ? "text-hecate-300 bg-hecate-600/20" : "text-surface-400 hover:text-surface-200 hover:bg-surface-700"} transition-colors`,
        "svelte-gwxd3p"
      )), d(L, U);
    };
    A(Be, (L) => {
      c() !== "ready" && c() !== "promoted" && c() !== "shelved" && L(V);
    });
  }
  s(re), s(T);
  var O = o(T, 2), J = i(O);
  {
    var Te = (L) => {
      var U = Uu(), Y = i(U), xe = i(Y);
      xe.textContent = "⚡";
      var se = o(xe, 6), pe = i(se);
      pe.__click = () => Rl(B()), pe.textContent = "⚡ Start High Octane (10 min)";
      var Me = o(pe, 2);
      He(Me, 5, a, ct, (Je, m) => {
        var y = zu();
        y.__click = () => Er(k(r(m).prompt), r(m).id);
        var de = i(y), R = i(de, !0);
        s(de);
        var ae = o(de, 2), he = i(ae, !0);
        s(ae), s(y), g(() => {
          Mt(y, "title", r(m).description), x(R, r(m).icon), x(he, r(m).name);
        }), d(Je, y);
      }), s(Me), s(se), s(Y), s(U), d(L, U);
    }, Oe = (L) => {
      var U = Qu(), Y = i(U), xe = i(Y), se = i(xe);
      He(se, 1, f, (ne) => ne.sticky_id, (ne, X) => {
        const Z = /* @__PURE__ */ we(() => Ie(r(X).sticky_id));
        var _e = Wu(), ke = i(_e), me = i(ke, !0);
        s(ke);
        var le = o(ke, 2), ee = i(le, !0);
        s(le);
        var Q = o(le, 2);
        Q.__click = () => Il(B(), r(X).sticky_id), Q.textContent = "✕", s(_e), g(() => {
          dr(_e, `transform: rotate(${r(Z).rotate ?? ""}deg) translate(${r(Z).dx ?? ""}px, ${r(Z).dy ?? ""}px)`), x(me, r(X).text), x(ee, r(X).author === "user" ? "" : r(X).author);
        }), d(ne, _e);
      });
      var pe = o(se, 2);
      He(pe, 17, () => r(ce), (ne) => ne.id, (ne, X) => {
        var Z = Yu();
        dr(Z, `transform: rotate(${(Math.random() - 0.5) * 4}deg)`);
        var _e = i(Z), ke = i(_e, !0);
        s(_e);
        var me = o(_e, 4), le = i(me);
        le.__click = () => G(r(X)), le.textContent = "✓";
        var ee = o(le, 2);
        ee.__click = () => M(r(X)), ee.textContent = "✕", s(me), s(Z), g(() => x(ke, r(X).text)), d(ne, Z);
      });
      var Me = o(pe, 2);
      {
        var Je = (ne) => {
          var X = Ku();
          d(ne, X);
        };
        A(Me, (ne) => {
          f().length === 0 && r(ce).length === 0 && ne(Je);
        });
      }
      s(xe), s(Y);
      var m = o(Y, 2), y = i(m), de = i(y);
      wt(de), de.__keydown = je;
      var R = o(de, 2);
      R.__click = async () => {
        r(P).trim() && (await Za(B(), r(P)), _(P, ""));
      }, s(y);
      var ae = o(y, 2), he = i(ae);
      He(he, 5, a, ct, (ne, X) => {
        var Z = Ju();
        Z.__click = () => Er(k(r(X).prompt), r(X).id);
        var _e = i(Z), ke = i(_e, !0);
        s(_e);
        var me = o(_e, 2), le = i(me, !0);
        s(me), s(Z), g(() => {
          Mt(Z, "title", r(X).description), x(ke, r(X).icon), x(le, r(X).role);
        }), d(ne, Z);
      }), s(he);
      var Ae = o(he, 2);
      Ae.__click = () => Ta(B(), "stack"), Ae.textContent = "End Storm → Stack", s(ae), s(m), s(U), g(
        (ne, X) => {
          R.disabled = ne, Re(
            R,
            1,
            `px-3 py-2 rounded text-xs transition-colors
								${X ?? ""}`,
            "svelte-gwxd3p"
          );
        },
        [
          () => !r(P).trim(),
          () => r(P).trim() ? "bg-es-event text-surface-50 hover:bg-es-event/80" : "bg-surface-600 text-surface-400 cursor-not-allowed"
        ]
      ), xt(de, () => r(P), (ne) => _(P, ne)), d(L, U);
    }, Ke = (L) => {
      var U = sv(), Y = i(U), xe = o(i(Y), 2), se = i(xe), pe = i(se), Me = i(pe);
      s(pe);
      var Je = o(pe, 2);
      He(Je, 21, () => r(K), (ke) => ke.sticky_id, (ke, me) => {
        var le = Zu(), ee = i(le), Q = i(ee, !0);
        s(ee);
        var ye = o(ee, 2);
        {
          var De = (Ge) => {
            var Ue = Xu(), Xe = i(Ue);
            s(Ue), g(() => x(Xe, `x${r(me).weight ?? ""}`)), d(Ge, Ue);
          };
          A(ye, (Ge) => {
            r(me).weight > 1 && Ge(De);
          });
        }
        s(le), g(() => x(Q, r(me).text)), Ot("dragstart", le, () => _(ie, r(me).sticky_id, !0)), Ot("dragend", le, () => _(ie, null)), Ot("dragover", le, (Ge) => Ge.preventDefault()), Ot("drop", le, () => {
          r(ie) && r(ie) !== r(me).sticky_id && (Kn(B(), r(ie), r(me).sticky_id), _(ie, null));
        }), d(ke, le);
      }), s(Je), s(se);
      var m = o(se, 2), y = i(m), de = i(y);
      s(y);
      var R = o(y, 2), ae = i(R);
      He(ae, 1, () => [...$().entries()], ([ke, me]) => ke, (ke, me) => {
        var le = /* @__PURE__ */ we(() => Ms(r(me), 2));
        let ee = () => r(le)[0], Q = () => r(le)[1];
        var ye = tv(), De = i(ye), Ge = i(De), Ue = i(Ge);
        s(Ge);
        var Xe = o(Ge, 2), rt = i(Xe, !0);
        s(Xe), s(De);
        var st = o(De, 2);
        He(st, 21, Q, (nt) => nt.sticky_id, (nt, yt) => {
          var _t = ev(), Ht = i(_t), zt = i(Ht, !0);
          s(Ht);
          var ht = o(Ht, 2);
          ht.__click = () => Ml(B(), r(yt).sticky_id), ht.textContent = "↩", s(_t), g(() => x(zt, r(yt).text)), d(nt, _t);
        }), s(st), s(ye), g(
          (nt) => {
            Re(
              ye,
              1,
              `rounded-lg border-2 p-3 min-h-[80px] transition-colors
											${r(ie) ? "border-dashed border-hecate-500/50 bg-hecate-600/5" : "border-surface-600 bg-surface-800"}`,
              "svelte-gwxd3p"
            ), x(Ue, `${Q().length ?? ""}x`), x(rt, nt);
          },
          [() => ee().slice(0, 8)]
        ), Ot("dragover", ye, (nt) => nt.preventDefault()), Ot("drop", ye, () => {
          r(ie) && Q().length > 0 && (Kn(B(), r(ie), Q()[0].sticky_id), _(ie, null));
        }), d(ke, ye);
      });
      var he = o(ae, 2);
      {
        var Ae = (ke) => {
          var me = rv();
          d(ke, me);
        };
        A(he, (ke) => {
          $().size === 0 && ke(Ae);
        });
      }
      s(R), s(m), s(xe), s(Y);
      var ne = o(Y, 2), X = i(ne), Z = i(X);
      He(Z, 5, () => a().slice(0, 2), ct, (ke, me) => {
        var le = av();
        le.__click = () => Er(k(r(me).prompt), r(me).id);
        var ee = i(le), Q = i(ee, !0);
        s(ee);
        var ye = o(ee, 2), De = i(ye);
        s(ye), s(le), g(() => {
          x(Q, r(me).icon), x(De, `Ask ${r(me).name ?? ""}`);
        }), d(ke, le);
      }), s(Z);
      var _e = o(Z, 2);
      _e.__click = () => Ta(B(), "groom"), _e.textContent = "Groom Stacks →", s(X), s(ne), s(U), g(() => {
        x(Me, `Stickies (${r(K).length ?? ""})`), x(de, `Stacks (${$().size ?? ""})`);
      }), d(L, U);
    }, Qe = (L) => {
      var U = vv(), Y = i(U), xe = i(Y), se = o(i(xe), 2);
      {
        var pe = (ae) => {
          var he = ov();
          He(he, 5, () => [...$().entries()], ([Ae, ne]) => Ae, (Ae, ne) => {
            var X = /* @__PURE__ */ we(() => Ms(r(ne), 2));
            let Z = () => r(X)[0], _e = () => r(X)[1];
            const ke = /* @__PURE__ */ we(() => r(Fe)[Z()]);
            var me = iv(), le = i(me), ee = i(le), Q = i(ee);
            s(ee);
            var ye = o(ee, 4);
            ye.__click = () => {
              r(ke) && Nl(B(), Z(), r(ke));
            }, ye.textContent = "Groom ✂", s(le);
            var De = o(le, 2);
            He(De, 21, _e, (Ge) => Ge.sticky_id, (Ge, Ue) => {
              var Xe = nv();
              Xe.__click = () => _(Fe, { ...r(Fe), [Z()]: r(Ue).sticky_id }, !0);
              var rt = i(Xe), st = o(rt, 2), nt = i(st, !0);
              s(st);
              var yt = o(st, 2), _t = i(yt, !0);
              s(yt), s(Xe), g(() => {
                Re(
                  Xe,
                  1,
                  `w-full text-left flex items-center gap-2 px-3 py-2 rounded text-[11px]
														transition-colors
														${r(ke) === r(Ue).sticky_id ? "bg-hecate-600/20 border border-hecate-500/40 text-hecate-200" : "bg-surface-700/50 border border-transparent text-surface-200 hover:border-surface-500"}`,
                  "svelte-gwxd3p"
                ), Re(
                  rt,
                  1,
                  `w-3 h-3 rounded-full border-2 shrink-0
															${r(ke) === r(Ue).sticky_id ? "border-hecate-400 bg-hecate-400" : "border-surface-500"}`,
                  "svelte-gwxd3p"
                ), x(nt, r(Ue).text), x(_t, r(Ue).author === "user" ? "" : r(Ue).author);
              }), d(Ge, Xe);
            }), s(De), s(me), g(() => {
              x(Q, `Stack (${_e().length ?? ""} stickies)`), ye.disabled = !r(ke), Re(
                ye,
                1,
                `text-[10px] px-2 py-1 rounded transition-colors
													${r(ke) ? "bg-hecate-600/20 text-hecate-300 hover:bg-hecate-600/30" : "bg-surface-700 text-surface-500 cursor-not-allowed"}`,
                "svelte-gwxd3p"
              );
            }), d(Ae, me);
          }), s(he), d(ae, he);
        }, Me = (ae) => {
          var he = cv();
          d(ae, he);
        };
        A(se, (ae) => {
          $().size > 0 ? ae(pe) : ae(Me, !1);
        });
      }
      var Je = o(se, 2);
      {
        var m = (ae) => {
          var he = uv(), Ae = i(he), ne = i(Ae);
          s(Ae);
          var X = o(Ae, 2);
          He(X, 21, () => r(K), (Z) => Z.sticky_id, (Z, _e) => {
            var ke = dv(), me = i(ke), le = o(me);
            {
              var ee = (Q) => {
                var ye = lv(), De = i(ye);
                s(ye), g(() => x(De, `x${r(_e).weight ?? ""}`)), d(Q, ye);
              };
              A(le, (Q) => {
                r(_e).weight > 1 && Q(ee);
              });
            }
            s(ke), g(() => x(me, `${r(_e).text ?? ""} `)), d(Z, ke);
          }), s(X), s(he), g(() => x(ne, `Standalone Stickies (${r(K).length ?? ""})`)), d(ae, he);
        };
        A(Je, (ae) => {
          r(K).length > 0 && ae(m);
        });
      }
      s(xe), s(Y);
      var y = o(Y, 2), de = i(y), R = i(de);
      R.__click = () => Ta(B(), "cluster"), R.textContent = "Cluster Events →", s(de), s(y), s(U), d(L, U);
    }, tt = (L) => {
      var U = yv(), Y = i(U), xe = o(i(Y), 2), se = i(xe), pe = i(se), Me = i(pe);
      s(pe);
      var Je = o(pe, 2), m = i(Je);
      He(m, 1, w, (ee) => ee.sticky_id, (ee, Q) => {
        var ye = pv(), De = i(ye), Ge = i(De, !0);
        s(De);
        var Ue = o(De, 2);
        {
          var Xe = (rt) => {
            var st = fv(), nt = i(st);
            s(st), g(() => x(nt, `x${r(Q).weight ?? ""}`)), d(rt, st);
          };
          A(Ue, (rt) => {
            r(Q).weight > 1 && rt(Xe);
          });
        }
        s(ye), g(() => x(Ge, r(Q).text)), Ot("dragstart", ye, () => _(ie, r(Q).sticky_id, !0)), Ot("dragend", ye, () => _(ie, null)), Ot("dragover", ye, (rt) => rt.preventDefault()), Ot("drop", ye, () => {
          r(ie) && r(ie) !== r(Q).sticky_id && (Jn(B(), r(ie), r(Q).sticky_id), _(ie, null));
        }), d(ee, ye);
      });
      var y = o(m, 2);
      {
        var de = (ee) => {
          var Q = xv();
          d(ee, Q);
        };
        A(y, (ee) => {
          w().length === 0 && ee(de);
        });
      }
      s(Je), s(se);
      var R = o(se, 2), ae = i(R), he = i(ae);
      s(ae);
      var Ae = o(ae, 2), ne = i(Ae);
      He(ne, 1, v, (ee) => ee.cluster_id, (ee, Q) => {
        const ye = /* @__PURE__ */ we(() => be(r(Q).cluster_id));
        var De = gv(), Ge = i(De), Ue = i(Ge), Xe = o(Ue, 2), rt = i(Xe, !0);
        s(Xe);
        var st = o(Xe, 2), nt = i(st, !0);
        s(st);
        var yt = o(st, 2);
        yt.__click = () => Ol(B(), r(Q).cluster_id), yt.textContent = "✕", s(Ge);
        var _t = o(Ge, 2);
        He(_t, 21, () => r(ye), (Ht) => Ht.sticky_id, (Ht, zt) => {
          var ht = hv(), Lt = i(ht), Cr = i(Lt, !0);
          s(Lt);
          var Rn = o(Lt, 2);
          {
            var Vo = (Ss) => {
              var Es = _v(), Go = i(Es);
              s(Es), g(() => x(Go, `x${r(zt).weight ?? ""}`)), d(Ss, Es);
            };
            A(Rn, (Ss) => {
              r(zt).weight > 1 && Ss(Vo);
            });
          }
          var In = o(Rn, 2);
          In.__click = () => Ll(B(), r(zt).sticky_id), In.textContent = "↩", s(ht), g(() => x(Cr, r(zt).text)), Ot("dragstart", ht, () => _(ie, r(zt).sticky_id, !0)), Ot("dragend", ht, () => _(ie, null)), d(Ht, ht);
        }), s(_t), s(De), g(() => {
          Re(
            De,
            1,
            `rounded-lg border-2 p-3 min-h-[120px] transition-colors
											${r(ie) ? "border-dashed border-hecate-500/50 bg-hecate-600/5" : "border-surface-600 bg-surface-800"}`,
            "svelte-gwxd3p"
          ), dr(De, `border-color: ${r(ie) ? "" : r(Q).color + "40"}`), dr(Ue, `background-color: ${r(Q).color ?? ""}`), x(rt, r(Q).name ?? "Unnamed"), x(nt, r(ye).length);
        }), Ot("dragover", De, (Ht) => Ht.preventDefault()), Ot("drop", De, () => {
          r(ie) && r(ye).length > 0 && (Jn(B(), r(ie), r(ye)[0].sticky_id), _(ie, null));
        }), d(ee, De);
      });
      var X = o(ne, 2);
      {
        var Z = (ee) => {
          var Q = bv();
          d(ee, Q);
        };
        A(X, (ee) => {
          v().length === 0 && ee(Z);
        });
      }
      s(Ae), s(R), s(xe), s(Y);
      var _e = o(Y, 2), ke = i(_e), me = i(ke);
      He(me, 5, () => a().slice(0, 2), ct, (ee, Q) => {
        var ye = mv();
        ye.__click = () => Er(k(r(Q).prompt), r(Q).id);
        var De = i(ye), Ge = i(De, !0);
        s(De);
        var Ue = o(De, 2), Xe = i(Ue);
        s(Ue), s(ye), g(() => {
          x(Ge, r(Q).icon), x(Xe, `Ask ${r(Q).name ?? ""}`);
        }), d(ee, ye);
      }), s(me);
      var le = o(me, 2);
      le.__click = () => Ta(B(), "name"), le.textContent = "Name Divisions →", s(ke), s(_e), s(U), g(() => {
        x(Me, `Unclustered (${w().length ?? ""})`), x(he, `Clusters (${v().length ?? ""})`), le.disabled = v().length === 0, Re(
          le,
          1,
          `text-[10px] px-3 py-1 rounded transition-colors
								${v().length === 0 ? "bg-surface-700 text-surface-500 cursor-not-allowed" : "bg-hecate-600/20 text-hecate-300 hover:bg-hecate-600/30"}`,
          "svelte-gwxd3p"
        );
      }), d(L, U);
    }, Ye = (L) => {
      var U = Ev(), Y = i(U), xe = i(Y), se = o(i(xe), 2);
      He(se, 5, v, (m) => m.cluster_id, (m, y) => {
        const de = /* @__PURE__ */ we(() => be(r(y).cluster_id));
        var R = Sv(), ae = i(R), he = i(ae), Ae = o(he, 2);
        {
          var ne = (me) => {
            var le = wv();
            wt(le), le.__keydown = (ee) => qe(ee, r(y).cluster_id), Ot("blur", le, () => _(q, null)), xt(le, () => r(ue), (ee) => _(ue, ee)), d(me, le);
          }, X = (me) => {
            var le = $v();
            le.__click = () => Ve(r(y));
            var ee = i(le, !0);
            s(le), g(() => {
              Re(
                le,
                1,
                `flex-1 text-left text-sm font-semibold transition-colors
													${r(y).name ? "text-surface-100 hover:text-hecate-300" : "text-surface-400 italic hover:text-hecate-300"}`,
                "svelte-gwxd3p"
              ), x(ee, r(y).name ?? "Click to name...");
            }), d(me, le);
          };
          A(Ae, (me) => {
            r(q) === r(y).cluster_id ? me(ne) : me(X, !1);
          });
        }
        var Z = o(Ae, 2), _e = i(Z);
        s(Z), s(ae);
        var ke = o(ae, 2);
        He(ke, 21, () => r(de), (me) => me.sticky_id, (me, le) => {
          var ee = Cv(), Q = i(ee), ye = o(Q);
          {
            var De = (Ge) => {
              var Ue = kv(), Xe = i(Ue);
              s(Ue), g(() => x(Xe, `x${r(le).weight ?? ""}`)), d(Ge, Ue);
            };
            A(ye, (Ge) => {
              r(le).weight > 1 && Ge(De);
            });
          }
          s(ee), g(() => x(Q, `${r(le).text ?? ""} `)), d(me, ee);
        }), s(ke), s(R), g(() => {
          dr(R, `border-color: ${r(y).color ?? ""}40`), dr(he, `background-color: ${r(y).color ?? ""}`), x(_e, `${r(de).length ?? ""} events`);
        }), d(m, R);
      }), s(se), s(xe), s(Y);
      var pe = o(Y, 2), Me = i(pe), Je = i(Me);
      Je.__click = () => Ta(B(), "map"), Je.textContent = "Map Integration Facts →", s(Me), s(pe), s(U), d(L, U);
    }, at = (L) => {
      var U = Nv(), Y = i(U), xe = i(Y), se = o(i(xe), 2), pe = i(se);
      He(pe, 5, v, (ne) => ne.cluster_id, (ne, X) => {
        var Z = Av(), _e = i(Z), ke = o(_e), me = i(ke);
        s(ke), s(Z), g(
          (le) => {
            dr(Z, `border-color: ${r(X).color ?? ""}; background-color: ${r(X).color ?? ""}15`), x(_e, `${r(X).name ?? "Unnamed" ?? ""} `), x(me, `(${le ?? ""})`);
          },
          [() => be(r(X).cluster_id).length]
        ), d(ne, Z);
      }), s(pe);
      var Me = o(pe, 2);
      {
        var Je = (ne) => {
          var X = Pv();
          He(X, 5, p, (Z) => Z.arrow_id, (Z, _e) => {
            const ke = /* @__PURE__ */ we(() => v().find((nt) => nt.cluster_id === r(_e).from_cluster)), me = /* @__PURE__ */ we(() => v().find((nt) => nt.cluster_id === r(_e).to_cluster));
            var le = Dv(), ee = i(le), Q = i(ee, !0);
            s(ee);
            var ye = o(ee, 2);
            ye.textContent = "→";
            var De = o(ye, 2), Ge = i(De, !0);
            s(De);
            var Ue = o(De, 2);
            Ue.textContent = "→";
            var Xe = o(Ue, 2), rt = i(Xe, !0);
            s(Xe);
            var st = o(Xe, 4);
            st.__click = () => Bl(B(), r(_e).arrow_id), st.textContent = "✕", s(le), g(() => {
              dr(ee, `color: ${r(ke)?.color ?? "#888" ?? ""}; background-color: ${r(ke)?.color ?? "#888" ?? ""}15`), x(Q, r(ke)?.name ?? "?"), x(Ge, r(_e).fact_name), dr(Xe, `color: ${r(me)?.color ?? "#888" ?? ""}; background-color: ${r(me)?.color ?? "#888" ?? ""}15`), x(rt, r(me)?.name ?? "?");
            }), d(Z, le);
          }), s(X), d(ne, X);
        };
        A(Me, (ne) => {
          p().length > 0 && ne(Je);
        });
      }
      s(se);
      var m = o(se, 2);
      {
        var y = (ne) => {
          var X = Iv(), Z = o(i(X), 2), _e = i(Z), ke = o(i(_e), 2), me = i(ke);
          me.value = (me.__value = null) ?? "";
          var le = o(me);
          He(le, 1, v, ct, (rt, st) => {
            var nt = Tv(), yt = i(nt, !0);
            s(nt);
            var _t = {};
            g(() => {
              x(yt, r(st).name ?? "Unnamed"), _t !== (_t = r(st).cluster_id) && (nt.value = (nt.__value = r(st).cluster_id) ?? "");
            }), d(rt, nt);
          }), s(ke), s(_e);
          var ee = o(_e, 2), Q = o(i(ee), 2);
          wt(Q), s(ee);
          var ye = o(ee, 2), De = o(i(ye), 2), Ge = i(De);
          Ge.value = (Ge.__value = null) ?? "";
          var Ue = o(Ge);
          He(Ue, 1, v, ct, (rt, st) => {
            var nt = Rv(), yt = i(nt, !0);
            s(nt);
            var _t = {};
            g(() => {
              x(yt, r(st).name ?? "Unnamed"), _t !== (_t = r(st).cluster_id) && (nt.value = (nt.__value = r(st).cluster_id) ?? "");
            }), d(rt, nt);
          }), s(De), s(ye);
          var Xe = o(ye, 2);
          Xe.__click = Se, s(Z), s(X), g(
            (rt, st) => {
              Xe.disabled = rt, Re(
                Xe,
                1,
                `px-3 py-1.5 rounded text-[10px] transition-colors shrink-0
											${st ?? ""}`,
                "svelte-gwxd3p"
              );
            },
            [
              () => !r(Ce) || !r(ge) || r(Ce) === r(ge) || !r(fe).trim(),
              () => r(Ce) && r(ge) && r(Ce) !== r(ge) && r(fe).trim() ? "bg-hecate-600/20 text-hecate-300 hover:bg-hecate-600/30" : "bg-surface-700 text-surface-500 cursor-not-allowed"
            ]
          ), Ga(ke, () => r(Ce), (rt) => _(Ce, rt)), xt(Q, () => r(fe), (rt) => _(fe, rt)), Ga(De, () => r(ge), (rt) => _(ge, rt)), d(ne, X);
        };
        A(m, (ne) => {
          v().length >= 2 && ne(y);
        });
      }
      s(xe), s(Y);
      var de = o(Y, 2), R = i(de), ae = i(R);
      He(ae, 5, () => a().slice(2), ct, (ne, X) => {
        var Z = Mv();
        Z.__click = () => Er(k(r(X).prompt), r(X).id);
        var _e = i(Z), ke = i(_e, !0);
        s(_e);
        var me = o(_e, 2), le = i(me);
        s(me), s(Z), g(() => {
          x(ke, r(X).icon), x(le, `Ask ${r(X).name ?? ""}`);
        }), d(ne, Z);
      }), s(ae);
      var he = o(ae, 2);
      he.__click = Ne;
      var Ae = i(he, !0);
      s(he), s(R), s(de), s(U), g(() => {
        he.disabled = F(), Re(
          he,
          1,
          `text-[10px] px-4 py-1.5 rounded font-medium transition-colors
								${F() ? "bg-surface-700 text-surface-500 cursor-not-allowed" : "bg-hecate-600 text-surface-50 hover:bg-hecate-500"}`,
          "svelte-gwxd3p"
        ), x(Ae, F() ? "Promoting..." : "Promote to Divisions");
      }), d(L, U);
    }, ze = (L) => {
      var U = Lv(), Y = i(U), xe = i(Y);
      xe.textContent = "✓";
      var se = o(xe, 4), pe = i(se);
      s(se);
      var Me = o(se, 4);
      Me.__click = function(...Je) {
        zl?.apply(this, Je);
      }, s(Y), s(U), g(() => x(pe, `${v().length ?? ""} divisions identified from
						${n() ?? ""} domain events, with
						${p().length ?? ""} integration fact${p().length !== 1 ? "s" : ""} mapped.`)), d(L, U);
    }, We = (L) => {
      var U = Ov(), Y = i(U), xe = i(Y);
      xe.textContent = "⏸";
      var se = o(xe, 6);
      se.__click = () => ql(B()), s(Y), s(U), d(L, U);
    };
    A(J, (L) => {
      c() === "ready" ? L(Te) : c() === "storm" ? L(Oe, 1) : c() === "stack" ? L(Ke, 2) : c() === "groom" ? L(Qe, 3) : c() === "cluster" ? L(tt, 4) : c() === "name" ? L(Ye, 5) : c() === "map" ? L(at, 6) : c() === "promoted" ? L(ze, 7) : c() === "shelved" && L(We, 8);
    });
  }
  s(O), s(j), g(() => Re(
    O,
    1,
    `flex-1 overflow-y-auto transition-opacity duration-150
		${r(N) ? "opacity-0" : "opacity-100"}`,
    "svelte-gwxd3p"
  )), d(e, j), mt(), te();
}
At(["click", "keydown"]);
kt(Zs, {}, [], [], { mode: "open" });
const mr = et([]), Pn = et(null), Bv = Tt(mr, (e) => {
  const t = /* @__PURE__ */ new Set();
  for (const a of e)
    a.aggregate && t.add(a.aggregate);
  return Array.from(t).sort();
}), Vv = Tt(mr, (e) => {
  const t = /* @__PURE__ */ new Map(), a = [];
  for (const n of e)
    if (n.aggregate) {
      const c = t.get(n.aggregate) || [];
      c.push(n), t.set(n.aggregate, c);
    } else
      a.push(n);
  return { grouped: t, ungrouped: a };
});
function Gv(e, t, a = "human") {
  const n = crypto.randomUUID(), c = {
    id: n,
    name: e.trim(),
    aggregate: t?.trim() || void 0,
    execution: a,
    policies: [],
    events: []
  };
  return mr.update((l) => [...l, c]), n;
}
function qv(e) {
  mr.update((t) => t.filter((a) => a.id !== e));
}
function Hv(e, t) {
  mr.update(
    (a) => a.map((n) => n.id === e ? { ...n, ...t } : n)
  );
}
function zv(e, t) {
  mr.update(
    (a) => a.map((n) => n.id === e ? { ...n, execution: t } : n)
  );
}
function Uv(e, t) {
  const a = { id: crypto.randomUUID(), text: t.trim() };
  mr.update(
    (n) => n.map(
      (c) => c.id === e ? { ...c, policies: [...c.policies, a] } : c
    )
  );
}
function Wv(e, t) {
  mr.update(
    (a) => a.map(
      (n) => n.id === e ? { ...n, policies: n.policies.filter((c) => c.id !== t) } : n
    )
  );
}
function Yv(e, t) {
  const a = { id: crypto.randomUUID(), text: t.trim() };
  mr.update(
    (n) => n.map(
      (c) => c.id === e ? { ...c, events: [...c.events, a] } : c
    )
  );
}
function Kv(e, t) {
  mr.update(
    (a) => a.map(
      (n) => n.id === e ? { ...n, events: n.events.filter((c) => c.id !== t) } : n
    )
  );
}
async function Jv(e, t) {
  try {
    return await Ze().post(`/design_aggregate/${e}`, t), !0;
  } catch (a) {
    const n = a;
    return Pn.set(n.message || "Failed to design aggregate"), !1;
  }
}
async function Qv(e, t) {
  try {
    return await Ze().post(`/design_event/${e}`, t), !0;
  } catch (a) {
    const n = a;
    return Pn.set(n.message || "Failed to design event"), !1;
  }
}
async function Zn(e, t) {
  try {
    return await Ze().post(`/plan_desk/${e}`, t), !0;
  } catch (a) {
    const n = a;
    return Pn.set(n.message || "Failed to plan desk"), !1;
  }
}
var Xv = /* @__PURE__ */ u(`<button class="text-[10px] px-2.5 py-1 rounded bg-hecate-600/20 text-hecate-300
					hover:bg-hecate-600/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"> </button>`), Zv = /* @__PURE__ */ u(`<button class="text-[10px] px-2 py-1 rounded text-surface-400
					hover:text-hecate-300 hover:bg-hecate-600/10 transition-colors" title="Get AI assistance"></button>`), ef = /* @__PURE__ */ u('<div><div class="flex items-start gap-2"><span class="text-hecate-400 text-sm mt-0.5"> </span> <div class="flex-1 min-w-0"><div class="flex items-center gap-2"><h3 class="text-xs font-semibold text-surface-100"> </h3> <span> </span></div> <p class="text-[11px] text-surface-400 mt-1"> </p></div></div> <div class="flex items-center gap-2 mt-1"><!> <!></div></div>');
function gt(e, t) {
  bt(t, !0);
  let a = pt(t, "title", 7), n = pt(t, "description", 7), c = pt(t, "icon", 7, "■"), l = pt(t, "status", 7, "pending"), f = pt(t, "aiContext", 7), v = pt(t, "onaction", 7), p = pt(t, "actionLabel", 7, "Execute"), h = pt(t, "disabled", 7, !1), b = /* @__PURE__ */ we(() => w(l()));
  function $(N) {
    switch (N) {
      case "active":
        return "border-hecate-600/40";
      case "done":
        return "border-health-ok/30";
      default:
        return "border-surface-600";
    }
  }
  function w(N) {
    switch (N) {
      case "active":
        return { text: "Active", cls: "bg-hecate-600/20 text-hecate-300" };
      case "done":
        return { text: "Done", cls: "bg-health-ok/10 text-health-ok" };
      default:
        return { text: "Pending", cls: "bg-surface-700 text-surface-400" };
    }
  }
  var F = {
    get title() {
      return a();
    },
    set title(N) {
      a(N), ut();
    },
    get description() {
      return n();
    },
    set description(N) {
      n(N), ut();
    },
    get icon() {
      return c();
    },
    set icon(N = "■") {
      c(N), ut();
    },
    get status() {
      return l();
    },
    set status(N = "pending") {
      l(N), ut();
    },
    get aiContext() {
      return f();
    },
    set aiContext(N) {
      f(N), ut();
    },
    get onaction() {
      return v();
    },
    set onaction(N) {
      v(N), ut();
    },
    get actionLabel() {
      return p();
    },
    set actionLabel(N = "Execute") {
      p(N), ut();
    },
    get disabled() {
      return h();
    },
    set disabled(N = !1) {
      h(N), ut();
    }
  }, D = ef(), te = i(D), P = i(te), q = i(P, !0);
  s(P);
  var ue = o(P, 2), Ce = i(ue), ge = i(Ce), fe = i(ge, !0);
  s(ge);
  var ie = o(ge, 2), Fe = i(ie, !0);
  s(ie), s(Ce);
  var Pe = o(Ce, 2), Ie = i(Pe, !0);
  s(Pe), s(ue), s(te);
  var ce = o(te, 2), G = i(ce);
  {
    var M = (N) => {
      var I = Xv();
      I.__click = function(...$e) {
        v()?.apply(this, $e);
      };
      var B = i(I, !0);
      s(I), g(() => {
        I.disabled = h(), x(B, p());
      }), d(N, I);
    };
    A(G, (N) => {
      v() && N(M);
    });
  }
  var z = o(G, 2);
  {
    var W = (N) => {
      var I = Zv();
      I.__click = () => Er(f()), I.textContent = "✦ AI", d(N, I);
    };
    A(z, (N) => {
      f() && N(W);
    });
  }
  return s(ce), s(D), g(
    (N) => {
      Re(D, 1, `rounded-lg bg-surface-800 border ${N ?? ""} p-4 flex flex-col gap-2 transition-colors hover:border-surface-500`), x(q, c()), x(fe, a()), Re(ie, 1, `text-[9px] px-1.5 py-0.5 rounded ${r(b).cls ?? ""}`), x(Fe, r(b).text), x(Ie, n());
    },
    [() => $(l())]
  ), d(e, D), mt(F);
}
At(["click"]);
kt(
  gt,
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
var tf = /* @__PURE__ */ u(`<div class="group/policy flex items-center gap-1 px-2 py-1 rounded-l rounded-r-sm
						bg-es-policy/15 border border-es-policy/30 text-[9px] text-surface-200
						max-w-[160px]"><span class="truncate flex-1"> </span> <button class="text-[7px] text-surface-500 hover:text-health-err
							opacity-0 group-hover/policy:opacity-100 transition-opacity shrink-0"></button></div>`), rf = /* @__PURE__ */ u(`<input class="flex-1 bg-surface-700 border border-es-command/30 rounded px-2 py-0.5
							text-xs font-semibold text-surface-100
							focus:outline-none focus:border-es-command"/>`), af = /* @__PURE__ */ u(`<button class="flex-1 text-left text-xs font-semibold text-surface-100
							hover:text-es-command transition-colors" title="Double-click to rename"> </button>`), sf = /* @__PURE__ */ u('<span class="text-[9px] text-es-aggregate/70"> </span>'), nf = /* @__PURE__ */ u(`<div class="group/event flex items-center gap-1 px-2 py-1 rounded-r rounded-l-sm
						bg-es-event/15 border border-es-event/30 text-[9px] text-surface-200
						max-w-[200px]"><span class="truncate flex-1"> </span> <button class="text-[7px] text-surface-500 hover:text-health-err
							opacity-0 group-hover/event:opacity-100 transition-opacity shrink-0"></button></div>`), of = /* @__PURE__ */ u(`<div class="flex items-stretch gap-0 group/card"><div class="flex flex-col items-end gap-1 -mr-2 z-10 pt-1 min-w-[100px]"><!> <input placeholder="+ policy" class="w-24 bg-transparent border border-dashed border-es-policy/20 rounded
					px-1.5 py-0.5 text-[8px] text-surface-400 placeholder-surface-500
					focus:outline-none focus:border-es-policy/40
					opacity-0 group-hover/card:opacity-100 transition-opacity"/></div> <div class="relative flex-1 rounded-lg border-2 border-es-command/40 bg-es-command/10
				px-4 py-3 min-h-[72px] z-20"><div class="flex items-center gap-2 mb-1"><button> </button> <!> <div class="flex items-center gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity"><button class="text-[8px] px-1.5 py-0.5 rounded text-health-ok
							hover:bg-health-ok/10 transition-colors" title="Promote to daemon"></button> <button class="text-[8px] px-1 py-0.5 rounded text-surface-500
							hover:text-health-err hover:bg-health-err/10 transition-colors" title="Remove desk"></button></div></div> <!></div> <div class="flex flex-col items-start gap-1 -ml-2 z-10 pt-1 min-w-[100px]"><!> <input placeholder="+ event" class="w-32 bg-transparent border border-dashed border-es-event/20 rounded
					px-1.5 py-0.5 text-[8px] text-surface-400 placeholder-surface-500
					focus:outline-none focus:border-es-event/40
					opacity-0 group-hover/card:opacity-100 transition-opacity"/></div></div>`), cf = /* @__PURE__ */ u("<option></option>"), lf = /* @__PURE__ */ u('<div class="space-y-2"><div class="flex items-center gap-2"><div class="w-3 h-3 rounded-sm bg-es-aggregate/40"></div> <span class="text-[10px] font-semibold text-es-aggregate uppercase tracking-wider"> </span> <div class="flex-1 h-px bg-es-aggregate/20"></div> <span class="text-[9px] text-surface-400"> </span></div> <div class="space-y-3 ml-5"></div></div>'), df = /* @__PURE__ */ u('<div class="flex items-center gap-2"><span class="text-[10px] font-semibold text-surface-400 uppercase tracking-wider">No Aggregate</span> <div class="flex-1 h-px bg-surface-600"></div></div>'), uf = /* @__PURE__ */ u("<!> <div></div>", 1), vf = /* @__PURE__ */ u("<!> <!>", 1), ff = /* @__PURE__ */ u(`<div class="text-center py-8 text-surface-500 text-xs border border-dashed border-surface-600 rounded-lg">No desk cards yet. Add your first command desk above,
				or ask an AI agent for suggestions.</div>`), pf = /* @__PURE__ */ u(`<button class="rounded-lg border border-surface-600 bg-surface-800/50
							p-3 text-left transition-all hover:border-hecate-500/40
							hover:bg-surface-700/50 group"><div class="flex items-center gap-2 mb-1.5"><span class="text-hecate-400 group-hover:text-hecate-300 transition-colors"> </span> <span class="text-[11px] font-semibold text-surface-100"> </span></div> <div class="text-[10px] text-surface-400 mb-1"> </div> <div class="text-[9px] text-surface-500"> </div></button>`), xf = /* @__PURE__ */ u(
  `<div class="rounded-lg border border-es-command/20 bg-es-command/5 p-3"><div class="flex items-end gap-2"><div class="flex-1"><label class="text-[9px] text-surface-400 block mb-1">Desk Name (command)</label> <input placeholder="e.g., register_user, process_order" class="w-full bg-surface-700 border border-surface-600 rounded px-2.5 py-1.5
							text-xs text-surface-100 placeholder-surface-400
							focus:outline-none focus:border-es-command/50"/></div> <div class="w-40"><label class="text-[9px] text-surface-400 block mb-1">Aggregate</label> <input placeholder="e.g., user, order" list="existing-aggregates" class="w-full bg-surface-700 border border-surface-600 rounded px-2.5 py-1.5
							text-xs text-surface-100 placeholder-surface-400
							focus:outline-none focus:border-surface-500"/> <datalist id="existing-aggregates"></datalist></div> <div class="w-24"><label class="text-[9px] text-surface-400 block mb-1">Execution</label> <select class="w-full bg-surface-700 border border-surface-600 rounded px-2 py-1.5
							text-xs text-surface-100
							focus:outline-none focus:border-surface-500"><option>Human</option><option>Agent</option><option>Both</option></select></div> <button>+ Desk</button></div></div> <!> <div class="rounded-lg border border-hecate-600/20 bg-hecate-950/20 p-4"><div class="flex items-center gap-2 mb-3"><span class="text-hecate-400"></span> <h4 class="text-xs font-semibold text-surface-100">AI Domain Experts</h4> <span class="text-[10px] text-surface-400">Ask a virtual agent to analyze the domain and suggest desk cards</span></div> <div class="grid grid-cols-2 md:grid-cols-4 gap-2"></div></div> <div><h4 class="text-xs font-semibold text-surface-100 mb-3">Design Tasks</h4> <div class="grid grid-cols-1 md:grid-cols-2 gap-3"><!> <!> <!> <!></div></div>`,
  1
), _f = /* @__PURE__ */ u(`<div class="flex gap-2 items-end mb-4 p-3 rounded bg-surface-700/30"><div class="flex-1"><label for="desk-name" class="text-[10px] text-surface-400 block mb-1">Desk Name</label> <input id="desk-name" placeholder="e.g., register_user" class="w-full bg-surface-700 border border-surface-600 rounded
								px-2.5 py-1.5 text-xs text-surface-100 placeholder-surface-400
								focus:outline-none focus:border-hecate-500/50"/></div> <div class="flex-1"><label for="desk-desc" class="text-[10px] text-surface-400 block mb-1">Description</label> <input id="desk-desc" placeholder="Brief purpose of this desk" class="w-full bg-surface-700 border border-surface-600 rounded
								px-2.5 py-1.5 text-xs text-surface-100 placeholder-surface-400
								focus:outline-none focus:border-hecate-500/50"/></div> <div><label for="desk-dept" class="text-[10px] text-surface-400 block mb-1">Dept</label> <select id="desk-dept" class="bg-surface-700 border border-surface-600 rounded
								px-2 py-1.5 text-xs text-surface-100
								focus:outline-none focus:border-hecate-500/50 cursor-pointer"><option>CMD</option><option>QRY</option><option>PRJ</option></select></div> <button class="px-3 py-1.5 rounded text-xs bg-hecate-600/20 text-hecate-300
							hover:bg-hecate-600/30 transition-colors disabled:opacity-50">Plan</button> <button class="px-3 py-1.5 rounded text-xs text-surface-400 hover:text-surface-100">Cancel</button></div>`), hf = /* @__PURE__ */ u(
  `<div class="rounded-lg border border-surface-600 bg-surface-800/50 p-4"><div class="flex items-center justify-between mb-3"><h4 class="text-xs font-semibold text-surface-100">Desk Inventory</h4> <button class="text-[10px] px-2 py-0.5 rounded bg-hecate-600/10 text-hecate-300
						hover:bg-hecate-600/20 transition-colors">+ Plan Desk</button></div> <!> <p class="text-[10px] text-surface-400">Desks are individual capabilities within a department. Each desk owns a
				vertical slice: command + event + handler + projection.</p></div> <div><h4 class="text-xs font-semibold text-surface-100 mb-3">Planning Tasks</h4> <div class="grid grid-cols-1 md:grid-cols-2 gap-3"><!> <!> <!> <!></div></div>`,
  1
), gf = /* @__PURE__ */ u('<div class="p-4 space-y-6"><div class="flex items-center justify-between"><div><h3 class="text-sm font-semibold text-surface-100">Storming</h3> <p class="text-[11px] text-surface-400 mt-0.5">Design aggregates, events, desks, and dependencies for <span class="text-surface-200"> </span></p></div> <div class="flex items-center gap-1 bg-surface-700/50 rounded-lg p-0.5"><button>Event Storm</button> <button>Desk Inventory</button></div></div> <!></div>');
function Ao(e, t) {
  bt(t, !0);
  const a = () => Ee(Yr, "$selectedDivision", p), n = () => Ee(mr, "$deskCards", p), c = () => Ee(Bv, "$deskAggregates", p), l = () => Ee(Vv, "$deskCardsByAggregate", p), f = () => Ee(Ud, "$designLevelAgents", p), v = () => Ee(Et, "$isLoading", p), [p, h] = Nt(), b = (S, C = Pr) => {
    var H = of(), oe = i(H), Be = i(oe);
    He(Be, 17, () => C().policies, (se) => se.id, (se, pe) => {
      var Me = tf(), Je = i(Me), m = i(Je, !0);
      s(Je);
      var y = o(Je, 2);
      y.__click = () => Wv(C().id, r(pe).id), y.textContent = "✕", s(Me), g(() => x(m, r(pe).text)), d(se, Me);
    });
    var V = o(Be, 2);
    wt(V), V.__keydown = (se) => Ie(se, C().id), s(oe);
    var O = o(oe, 2), J = i(O), Te = i(J);
    Te.__click = () => z(C());
    var Oe = i(Te, !0);
    s(Te);
    var Ke = o(Te, 2);
    {
      var Qe = (se) => {
        var pe = rf();
        wt(pe), pe.__keydown = (Me) => {
          Me.key === "Enter" && M(C().id), Me.key === "Escape" && _(P, null);
        }, Ot("blur", pe, () => M(C().id)), xt(pe, () => r(q), (Me) => _(q, Me)), d(se, pe);
      }, tt = (se) => {
        var pe = af();
        pe.__dblclick = () => G(C());
        var Me = i(pe, !0);
        s(pe), g(() => x(Me, C().name)), d(se, pe);
      };
      A(Ke, (se) => {
        r(P) === C().id ? se(Qe) : se(tt, !1);
      });
    }
    var Ye = o(Ke, 2), at = i(Ye);
    at.__click = () => B(C()), at.textContent = "↑ promote";
    var ze = o(at, 2);
    ze.__click = () => qv(C().id), ze.textContent = "✕", s(Ye), s(J);
    var We = o(J, 2);
    {
      var L = (se) => {
        var pe = sf(), Me = i(pe);
        s(pe), g(() => x(Me, `■ ${C().aggregate ?? ""}`)), d(se, pe);
      };
      A(We, (se) => {
        C().aggregate && se(L);
      });
    }
    s(O);
    var U = o(O, 2), Y = i(U);
    He(Y, 17, () => C().events, (se) => se.id, (se, pe) => {
      var Me = nf(), Je = i(Me), m = i(Je, !0);
      s(Je);
      var y = o(Je, 2);
      y.__click = () => Kv(C().id, r(pe).id), y.textContent = "✕", s(Me), g(() => x(m, r(pe).text)), d(se, Me);
    });
    var xe = o(Y, 2);
    wt(xe), xe.__keydown = (se) => ce(se, C().id), s(U), s(H), g(
      (se, pe, Me) => {
        Re(Te, 1, `text-sm ${se ?? ""}
						hover:scale-110 transition-transform`), Mt(Te, "title", `${pe ?? ""} — click to cycle`), x(Oe, Me);
      },
      [
        () => I(C().execution),
        () => N(C().execution),
        () => W(C().execution)
      ]
    ), xt(V, () => r(D)[C().id], (se) => r(D)[C().id] = se), xt(xe, () => r(te)[C().id], (se) => r(te)[C().id] = se), d(S, H);
  };
  let $ = /* @__PURE__ */ ve(""), w = /* @__PURE__ */ ve(""), F = /* @__PURE__ */ ve("human"), D = /* @__PURE__ */ ve(Vt({})), te = /* @__PURE__ */ ve(Vt({})), P = /* @__PURE__ */ ve(null), q = /* @__PURE__ */ ve(""), ue = /* @__PURE__ */ ve(!1), Ce = /* @__PURE__ */ ve(""), ge = /* @__PURE__ */ ve(""), fe = /* @__PURE__ */ ve("cmd"), ie = /* @__PURE__ */ ve("design");
  function Fe() {
    r($).trim() && (Gv(r($), r(w) || void 0, r(F)), _($, ""), _(w, ""), _(F, "human"));
  }
  function Pe(S) {
    S.key === "Enter" && !S.shiftKey && r($).trim() && (S.preventDefault(), Fe());
  }
  function Ie(S, C) {
    S.key === "Enter" && r(D)[C]?.trim() && (S.preventDefault(), Uv(C, r(D)[C]), r(D)[C] = "");
  }
  function ce(S, C) {
    S.key === "Enter" && r(te)[C]?.trim() && (S.preventDefault(), Yv(C, r(te)[C]), r(te)[C] = "");
  }
  function G(S) {
    _(P, S.id, !0), _(q, S.name, !0);
  }
  function M(S) {
    r(q).trim() && Hv(S, { name: r(q).trim() }), _(P, null);
  }
  function z(S) {
    const C = ["human", "agent", "both"], H = C.indexOf(S.execution);
    zv(S.id, C[(H + 1) % C.length]);
  }
  function W(S) {
    switch (S) {
      case "human":
        return "𝗨";
      case "agent":
        return "⚙";
      case "both":
      case "pair":
        return "✦";
    }
  }
  function N(S) {
    switch (S) {
      case "human":
        return "Interactive (human)";
      case "agent":
        return "Automated (AI agent)";
      case "both":
      case "pair":
        return "Assisted (human + AI)";
    }
  }
  function I(S) {
    switch (S) {
      case "human":
        return "text-es-command";
      case "agent":
        return "text-hecate-400";
      case "both":
      case "pair":
        return "text-phase-crafting";
    }
  }
  async function B(S) {
    if (!a()) return;
    const C = a().division_id;
    await Zn(C, {
      desk_name: S.name,
      description: [
        S.execution === "agent" ? "AI-automated" : S.execution === "both" ? "Human+AI assisted" : "Interactive",
        S.policies.length > 0 ? `Policies: ${S.policies.map((H) => H.text).join(", ")}` : "",
        S.events.length > 0 ? `Emits: ${S.events.map((H) => H.text).join(", ")}` : ""
      ].filter(Boolean).join(". "),
      department: "CMD"
    });
    for (const H of S.events)
      await Qv(C, {
        event_name: H.text,
        aggregate_type: S.aggregate || S.name
      });
    S.aggregate && await Jv(C, { aggregate_name: S.aggregate });
  }
  async function $e() {
    if (!a() || !r(Ce).trim()) return;
    await Zn(a().division_id, {
      desk_name: r(Ce).trim(),
      description: r(ge).trim() || void 0,
      department: r(fe)
    }) && (_(Ce, ""), _(ge, ""), _(ue, !1));
  }
  function je(S) {
    const C = a()?.context_name ?? "this division", H = n(), oe = H.map((J) => J.name).join(", "), Be = H.flatMap((J) => J.events.map((Te) => Te.text)).join(", "), V = H.flatMap((J) => J.policies.map((Te) => Te.text)).join(", ");
    let O = `We are doing Design-Level Event Storming for the "${C}" division.

`;
    return O += `Our board uses command-centric desk cards:
`, O += `- Each card = a desk (command/slice)
`, O += `- Left side: policies (grey) = filter/guard conditions
`, O += `- Right side: events (orange) = what the desk emits
`, O += `- Cards can be human (interactive), agent (AI), or both

`, oe && (O += `Desks so far: ${oe}
`), Be && (O += `Events so far: ${Be}
`), V && (O += `Policies so far: ${V}
`), O += `
${S.prompt}

Please analyze and suggest items for the board.`, O;
  }
  var qe = gf(), Ve = i(qe), Se = i(Ve), Ne = o(i(Se), 2), be = o(i(Ne)), K = i(be, !0);
  s(be), s(Ne), s(Se);
  var k = o(Se, 2), E = i(k);
  E.__click = () => _(ie, "design");
  var j = o(E, 2);
  j.__click = () => _(ie, "plan"), s(k), s(Ve);
  var T = o(Ve, 2);
  {
    var re = (S) => {
      var C = xf(), H = it(C), oe = i(H), Be = i(oe), V = o(i(Be), 2);
      wt(V), V.__keydown = Pe, s(Be);
      var O = o(Be, 2), J = o(i(O), 2);
      wt(J);
      var Te = o(J, 2);
      He(Te, 5, c, ct, (R, ae) => {
        var he = cf(), Ae = {};
        g(() => {
          Ae !== (Ae = r(ae)) && (he.value = (he.__value = r(ae)) ?? "");
        }), d(R, he);
      }), s(Te), s(O);
      var Oe = o(O, 2), Ke = o(i(Oe), 2), Qe = i(Ke);
      Qe.value = Qe.__value = "human";
      var tt = o(Qe);
      tt.value = tt.__value = "agent";
      var Ye = o(tt);
      Ye.value = Ye.__value = "both", s(Ke), s(Oe);
      var at = o(Oe, 2);
      at.__click = Fe, s(oe), s(H);
      var ze = o(H, 2);
      {
        var We = (R) => {
          const ae = /* @__PURE__ */ we(() => {
            const { grouped: Z, ungrouped: _e } = l();
            return { grouped: Z, ungrouped: _e };
          });
          var he = vf(), Ae = it(he);
          He(Ae, 17, () => [...r(ae).grouped.entries()], ct, (Z, _e) => {
            var ke = /* @__PURE__ */ we(() => Ms(r(_e), 2));
            let me = () => r(ke)[0], le = () => r(ke)[1];
            var ee = lf(), Q = i(ee), ye = o(i(Q), 2), De = i(ye, !0);
            s(ye);
            var Ge = o(ye, 4), Ue = i(Ge);
            s(Ge), s(Q);
            var Xe = o(Q, 2);
            He(Xe, 21, le, (rt) => rt.id, (rt, st) => {
              b(rt, () => r(st));
            }), s(Xe), s(ee), g(() => {
              x(De, me()), x(Ue, `${le().length ?? ""} desk${le().length !== 1 ? "s" : ""}`);
            }), d(Z, ee);
          });
          var ne = o(Ae, 2);
          {
            var X = (Z) => {
              var _e = uf(), ke = it(_e);
              {
                var me = (ee) => {
                  var Q = df();
                  d(ee, Q);
                };
                A(ke, (ee) => {
                  r(ae).grouped.size > 0 && ee(me);
                });
              }
              var le = o(ke, 2);
              He(le, 21, () => r(ae).ungrouped, (ee) => ee.id, (ee, Q) => {
                b(ee, () => r(Q));
              }), s(le), g(() => Re(le, 1, `space-y-3 ${r(ae).grouped.size > 0 ? "ml-5" : ""}`)), d(Z, _e);
            };
            A(ne, (Z) => {
              r(ae).ungrouped.length > 0 && Z(X);
            });
          }
          d(R, he);
        }, L = (R) => {
          var ae = ff();
          d(R, ae);
        };
        A(ze, (R) => {
          n().length > 0 ? R(We) : R(L, !1);
        });
      }
      var U = o(ze, 2), Y = i(U), xe = i(Y);
      xe.textContent = "✦", Dt(4), s(Y);
      var se = o(Y, 2);
      He(se, 5, f, ct, (R, ae) => {
        var he = pf();
        he.__click = () => Er(je(r(ae)));
        var Ae = i(he), ne = i(Ae), X = i(ne, !0);
        s(ne);
        var Z = o(ne, 2), _e = i(Z, !0);
        s(Z), s(Ae);
        var ke = o(Ae, 2), me = i(ke, !0);
        s(ke);
        var le = o(ke, 2), ee = i(le, !0);
        s(le), s(he), g(() => {
          x(X, r(ae).icon), x(_e, r(ae).name), x(me, r(ae).role), x(ee, r(ae).description);
        }), d(R, he);
      }), s(se), s(U);
      var pe = o(U, 2), Me = o(i(pe), 2), Je = i(Me);
      {
        let R = /* @__PURE__ */ we(() => `Help me design aggregates for the "${a()?.context_name}" division. What are the natural consistency boundaries? What entities accumulate history over time?`);
        gt(Je, {
          title: "Design Aggregates",
          description: "Identify aggregate boundaries, define stream patterns and status flags",
          icon: "■",
          get aiContext() {
            return r(R);
          }
        });
      }
      var m = o(Je, 2);
      {
        let R = /* @__PURE__ */ we(() => `Help me define status bit flags for aggregates in the "${a()?.context_name}" division. Each aggregate needs lifecycle states as bit flags (powers of 2).`);
        gt(m, {
          title: "Define Status Flags",
          description: "Design bit flag status fields for each aggregate lifecycle",
          icon: "⚑",
          get aiContext() {
            return r(R);
          }
        });
      }
      var y = o(m, 2);
      {
        let R = /* @__PURE__ */ we(() => `Help me identify read models for the "${a()?.context_name}" division. What queries will users run? What data views are needed?`);
        gt(y, {
          title: "Map Read Models",
          description: "Identify what queries users will run and what data they need",
          icon: "▶",
          get aiContext() {
            return r(R);
          }
        });
      }
      var de = o(y, 2);
      {
        let R = /* @__PURE__ */ we(() => `Help me create a domain glossary for the "${a()?.context_name}" division. Define key terms, bounded context boundaries, and ubiquitous language.`);
        gt(de, {
          title: "Domain Glossary",
          description: "Document ubiquitous language and bounded context definitions",
          icon: "✎",
          get aiContext() {
            return r(R);
          }
        });
      }
      s(Me), s(pe), g(
        (R, ae) => {
          at.disabled = R, Re(at, 1, `px-3 py-1.5 rounded text-xs transition-colors shrink-0
						${ae ?? ""}`);
        },
        [
          () => !r($).trim(),
          () => r($).trim() ? "bg-es-command/20 text-es-command hover:bg-es-command/30" : "bg-surface-700 text-surface-500 cursor-not-allowed"
        ]
      ), xt(V, () => r($), (R) => _($, R)), xt(J, () => r(w), (R) => _(w, R)), Ga(Ke, () => r(F), (R) => _(F, R)), d(S, C);
    }, Le = (S) => {
      var C = hf(), H = it(C), oe = i(H), Be = o(i(oe), 2);
      Be.__click = () => _(ue, !r(ue)), s(oe);
      var V = o(oe, 2);
      {
        var O = (Ye) => {
          var at = _f(), ze = i(at), We = o(i(ze), 2);
          wt(We), s(ze);
          var L = o(ze, 2), U = o(i(L), 2);
          wt(U), s(L);
          var Y = o(L, 2), xe = o(i(Y), 2), se = i(xe);
          se.value = se.__value = "cmd";
          var pe = o(se);
          pe.value = pe.__value = "qry";
          var Me = o(pe);
          Me.value = Me.__value = "prj", s(xe), s(Y);
          var Je = o(Y, 2);
          Je.__click = $e;
          var m = o(Je, 2);
          m.__click = () => _(ue, !1), s(at), g((y) => Je.disabled = y, [() => !r(Ce).trim() || v()]), xt(We, () => r(Ce), (y) => _(Ce, y)), xt(U, () => r(ge), (y) => _(ge, y)), Ga(xe, () => r(fe), (y) => _(fe, y)), d(Ye, at);
        };
        A(V, (Ye) => {
          r(ue) && Ye(O);
        });
      }
      Dt(2), s(H);
      var J = o(H, 2), Te = o(i(J), 2), Oe = i(Te);
      {
        let Ye = /* @__PURE__ */ we(() => `Help me create a desk inventory for the "${a()?.context_name}" division. Each desk is a vertical slice (command + event + handler). Organize by CMD (write), QRY (read), and PRJ (projection) departments.`);
        gt(Oe, {
          title: "Desk Inventory",
          description: "Create a complete inventory of desks needed for this division, organized by department (CMD, QRY, PRJ)",
          icon: "▣",
          get aiContext() {
            return r(Ye);
          }
        });
      }
      var Ke = o(Oe, 2);
      {
        let Ye = /* @__PURE__ */ we(() => `Help me map dependencies between desks in the "${a()?.context_name}" division. Which desks depend on which? What's the optimal implementation order?`);
        gt(Ke, {
          title: "Dependency Mapping",
          description: "Map dependencies between desks to determine implementation order",
          icon: "⇄",
          get aiContext() {
            return r(Ye);
          }
        });
      }
      var Qe = o(Ke, 2);
      {
        let Ye = /* @__PURE__ */ we(() => `Help me sequence the implementation of desks in the "${a()?.context_name}" division into logical sprints. Consider dependencies, walking skeleton principles, and the "initiate + archive" first rule.`);
        gt(Qe, {
          title: "Sprint Sequencing",
          description: "Prioritize and sequence desks into implementation sprints",
          icon: "☰",
          get aiContext() {
            return r(Ye);
          }
        });
      }
      var tt = o(Qe, 2);
      {
        let Ye = /* @__PURE__ */ we(() => `Help me design REST API endpoints for the "${a()?.context_name}" division. Follow the pattern: POST /api/{resource}/{action} for commands, GET /api/{resource} for queries.`);
        gt(tt, {
          title: "API Design",
          description: "Design REST API endpoints for each desk's capabilities",
          icon: "↔",
          get aiContext() {
            return r(Ye);
          }
        });
      }
      s(Te), s(J), d(S, C);
    };
    A(T, (S) => {
      r(ie) === "design" ? S(re) : S(Le, !1);
    });
  }
  s(qe), g(() => {
    x(K, a()?.context_name), Re(E, 1, `px-3 py-1 rounded text-[11px] transition-colors
					${r(ie) === "design" ? "bg-surface-600 text-surface-100" : "text-surface-400 hover:text-surface-200"}`), Re(j, 1, `px-3 py-1 rounded text-[11px] transition-colors
					${r(ie) === "plan" ? "bg-surface-600 text-surface-100" : "text-surface-400 hover:text-surface-200"}`);
  }), d(e, qe), mt(), h();
}
At(["click", "keydown", "dblclick"]);
kt(Ao, {}, [], [], { mode: "open" });
bc();
var bf = /* @__PURE__ */ u(`<div class="p-4 space-y-6"><div><h3 class="text-sm font-semibold text-surface-100">Planning</h3> <p class="text-[11px] text-surface-400 mt-0.5">Lifecycle management for <span class="text-surface-200"> </span></p></div> <div class="rounded-lg border border-surface-600 bg-surface-800/50 p-4"><h4 class="text-xs font-semibold text-surface-100 mb-3">Division Lifecycle</h4> <p class="text-[10px] text-surface-400 leading-relaxed">Use the phase controls above to manage this division's planning lifecycle: <span class="text-surface-300">Open</span> to begin work, <span class="text-surface-300">Shelve</span> to pause, <span class="text-surface-300">Resume</span> to continue, or <span class="text-surface-300">Conclude</span> when planning is complete.</p> <p class="text-[10px] text-surface-400 mt-2 leading-relaxed">Content work (designing aggregates, events, desks) happens in the <span class="text-es-event">Storming</span> phase.
			Implementation items are tracked on the <span class="text-hecate-400">Kanban</span> board.</p></div> <div><h4 class="text-xs font-semibold text-surface-100 mb-3">Planning Tasks</h4> <div class="grid grid-cols-1 md:grid-cols-2 gap-3"><!> <!> <!> <!></div></div></div>`);
function Do(e, t) {
  bt(t, !1);
  const a = () => Ee(Yr, "$selectedDivision", n), [n, c] = Nt();
  ol();
  var l = bf(), f = i(l), v = o(i(f), 2), p = o(i(v)), h = i(p, !0);
  s(p), s(v), s(f);
  var b = o(f, 4), $ = o(i(b), 2), w = i($);
  {
    let P = /* @__PURE__ */ va(() => `Help me create a desk inventory for the "${a()?.context_name}" division. Each desk is a vertical slice (command + event + handler). Organize by CMD (write), QRY (read), and PRJ (projection) departments.`);
    gt(w, {
      title: "Desk Inventory",
      description: "Create a complete inventory of desks needed for this division, organized by department (CMD, QRY, PRJ)",
      icon: "▣",
      get aiContext() {
        return r(P);
      }
    });
  }
  var F = o(w, 2);
  {
    let P = /* @__PURE__ */ va(() => `Help me map dependencies between desks in the "${a()?.context_name}" division. Which desks depend on which? What's the optimal implementation order?`);
    gt(F, {
      title: "Dependency Mapping",
      description: "Map dependencies between desks to determine implementation order",
      icon: "⇄",
      get aiContext() {
        return r(P);
      }
    });
  }
  var D = o(F, 2);
  {
    let P = /* @__PURE__ */ va(() => `Help me sequence the implementation of desks in the "${a()?.context_name}" division into logical sprints. Consider dependencies, walking skeleton principles, and the "initiate + archive" first rule.`);
    gt(D, {
      title: "Sprint Sequencing",
      description: "Prioritize and sequence desks into implementation sprints",
      icon: "☰",
      get aiContext() {
        return r(P);
      }
    });
  }
  var te = o(D, 2);
  {
    let P = /* @__PURE__ */ va(() => `Help me design REST API endpoints for the "${a()?.context_name}" division. Follow the pattern: POST /api/{resource}/{action} for commands, GET /api/{resource} for queries.`);
    gt(te, {
      title: "API Design",
      description: "Design REST API endpoints for each desk's capabilities",
      icon: "↔",
      get aiContext() {
        return r(P);
      }
    });
  }
  s($), s(b), s(l), g(() => x(h, a()?.context_name)), d(e, l), mt(), c();
}
kt(Do, {}, [], [], { mode: "open" });
const Tn = 2, Da = 4, ks = 8, Cs = 16, ei = et(null), Lr = et([]), Pt = et(null), en = et(!1), mf = Tt(
  Lr,
  (e) => e.filter(
    (t) => (t.status & ks) === 0 && (t.status & Cs) === 0 && (t.status & Tn) === 0 && (t.status & Da) === 0
  )
), yf = Tt(
  Lr,
  (e) => e.filter(
    (t) => (t.status & Tn) !== 0 && (t.status & ks) === 0 && (t.status & Cs) === 0 && (t.status & Da) === 0
  )
), wf = Tt(
  Lr,
  (e) => e.filter((t) => (t.status & Da) !== 0)
), $f = Tt(
  Lr,
  (e) => e.filter((t) => (t.status & ks) !== 0 && (t.status & Da) === 0)
), kf = Tt(
  Lr,
  (e) => e.filter((t) => (t.status & Cs) !== 0 && (t.status & Da) === 0)
), Cf = Tt(Lr, (e) => {
  let t = 0, a = 0, n = 0, c = 0, l = 0;
  for (const f of e)
    f.status & Da ? n++ : f.status & ks ? c++ : f.status & Cs ? l++ : f.status & Tn ? a++ : t++;
  return { posted: t, picked: a, finished: n, parked: c, blocked: l, total: e.length };
});
async function Fr(e) {
  try {
    en.set(!0), Pt.set(null);
    const a = await Ze().get(
      `/get_division_kanban/${e}`
    );
    ei.set(a.board), Lr.set(a.cards ?? []);
  } catch (t) {
    const a = t;
    Pt.set(a.message || "Failed to fetch kanban board"), ei.set(null), Lr.set([]);
  } finally {
    en.set(!1);
  }
}
async function Sf(e, t) {
  try {
    return Pt.set(null), await Ze().post(`/post_kanban_card/${e}`, t), await Fr(e), !0;
  } catch (a) {
    const n = a;
    return Pt.set(n.message || "Failed to post card"), !1;
  }
}
async function Ef(e, t, a = "hecate-web") {
  try {
    return Pt.set(null), await Ze().post(`/pick_kanban_card/${e}/${t}`, {
      picked_by: a
    }), await Fr(e), !0;
  } catch (n) {
    const c = n;
    return Pt.set(c.message || "Failed to pick card"), !1;
  }
}
async function Af(e, t) {
  try {
    return Pt.set(null), await Ze().post(`/finish_kanban_card/${e}/${t}`, {}), await Fr(e), !0;
  } catch (a) {
    const n = a;
    return Pt.set(n.message || "Failed to finish card"), !1;
  }
}
async function Df(e, t, a) {
  try {
    return Pt.set(null), await Ze().post(`/unpick_kanban_card/${e}/${t}`, { reason: a }), await Fr(e), !0;
  } catch (n) {
    const c = n;
    return Pt.set(c.message || "Failed to unpick card"), !1;
  }
}
async function Pf(e, t, a, n = "hecate-web") {
  try {
    return Pt.set(null), await Ze().post(`/park_kanban_card/${e}/${t}`, {
      reason: a,
      parked_by: n
    }), await Fr(e), !0;
  } catch (c) {
    const l = c;
    return Pt.set(l.message || "Failed to park card"), !1;
  }
}
async function Tf(e, t) {
  try {
    return Pt.set(null), await Ze().post(`/unpark_kanban_card/${e}/${t}`, {}), await Fr(e), !0;
  } catch (a) {
    const n = a;
    return Pt.set(n.message || "Failed to unpark card"), !1;
  }
}
async function Rf(e, t, a, n = "hecate-web") {
  try {
    return Pt.set(null), await Ze().post(`/block_kanban_card/${e}/${t}`, {
      reason: a,
      blocked_by: n
    }), await Fr(e), !0;
  } catch (c) {
    const l = c;
    return Pt.set(l.message || "Failed to block card"), !1;
  }
}
async function If(e, t) {
  try {
    return Pt.set(null), await Ze().post(`/unblock_kanban_card/${e}/${t}`, {}), await Fr(e), !0;
  } catch (a) {
    const n = a;
    return Pt.set(n.message || "Failed to unblock card"), !1;
  }
}
var Mf = /* @__PURE__ */ u('<span class="text-health-warn"> </span>'), Nf = /* @__PURE__ */ u('<span class="text-health-err"> </span>'), Lf = /* @__PURE__ */ u('<div class="flex items-center gap-3 text-[10px] text-surface-400 mr-2"><span> </span> <span> </span> <span> </span> <!> <!></div>'), Of = /* @__PURE__ */ u('<div class="text-[11px] text-health-err bg-health-err/10 rounded px-3 py-2"> </div>'), Ff = /* @__PURE__ */ u(`<div class="rounded-lg border border-hecate-600/30 bg-surface-800/80 p-4 space-y-3"><h4 class="text-xs font-medium text-hecate-300 uppercase tracking-wider">New Work Card</h4> <div class="grid grid-cols-[1fr_auto] gap-3"><div><label for="card-title" class="text-[10px] text-surface-400 block mb-1">Title (desk name)</label> <input id="card-title" placeholder="e.g., register_user" class="w-full bg-surface-700 border border-surface-600 rounded px-2.5 py-1.5
							text-xs text-surface-100 placeholder-surface-400
							focus:outline-none focus:border-hecate-500/50"/></div> <div><label for="card-type" class="text-[10px] text-surface-400 block mb-1">Department</label> <select id="card-type" class="bg-surface-700 border border-surface-600 rounded px-2 py-1.5
							text-xs text-surface-100
							focus:outline-none focus:border-hecate-500/50 cursor-pointer"><option>CMD</option><option>PRJ</option><option>QRY</option></select></div></div> <div><label for="card-desc" class="text-[10px] text-surface-400 block mb-1">Description (optional)</label> <input id="card-desc" placeholder="Brief description of this desk" class="w-full bg-surface-700 border border-surface-600 rounded px-2.5 py-1.5
						text-xs text-surface-100 placeholder-surface-400
						focus:outline-none focus:border-hecate-500/50"/></div> <div class="flex gap-2"><button>Post</button> <button class="px-3 py-1.5 rounded text-xs text-surface-400 hover:text-surface-100">Cancel</button></div></div>`), jf = /* @__PURE__ */ u('<div class="text-center py-8 text-surface-400 text-xs animate-pulse">Loading kanban board...</div>'), Bf = /* @__PURE__ */ u('<div class="text-center py-12 text-surface-500 text-xs border border-dashed border-surface-600 rounded-lg"><div class="text-2xl mb-3 text-surface-400"></div> <p class="mb-1">No work cards yet.</p> <p class="text-[10px] text-surface-500">Post cards from storming output, or add them manually above.</p></div>'), Vf = /* @__PURE__ */ u('<p class="text-[10px] text-surface-400 mb-2 leading-relaxed"> </p>'), Gf = /* @__PURE__ */ u(`<div class="rounded border border-surface-600 bg-surface-800/60 p-2.5 group"><div class="flex items-start gap-2 mb-1.5"><span class="text-xs font-medium text-surface-100 flex-1 leading-tight"> </span> <span> </span></div> <!> <div class="flex items-center justify-between"><span class="text-[9px] text-surface-500"> </span> <div class="flex items-center gap-1
									opacity-0 group-hover:opacity-100 transition-opacity"><button class="text-[10px] px-2 py-0.5 rounded bg-hecate-600/15 text-hecate-300
											hover:bg-hecate-600/25 transition-colors">Pick</button> <button class="text-[10px] px-1.5 py-0.5 rounded text-surface-400
											hover:text-health-warn hover:bg-health-warn/10 transition-colors" title="Park card"></button> <button class="text-[10px] px-1.5 py-0.5 rounded text-surface-400
											hover:text-health-err hover:bg-health-err/10 transition-colors" title="Block card"></button></div></div></div>`), qf = /* @__PURE__ */ u('<p class="text-[10px] text-surface-400 mb-2 leading-relaxed"> </p>'), Hf = /* @__PURE__ */ u('<div class="text-[9px] text-surface-400 mb-2"> </div>'), zf = /* @__PURE__ */ u(`<div class="rounded border border-surface-600 bg-surface-800/60 p-2.5 group"><div class="flex items-start gap-2 mb-1.5"><span class="text-xs font-medium text-surface-100 flex-1 leading-tight"> </span> <span> </span></div> <!> <!> <div class="flex items-center gap-1 justify-end
								opacity-0 group-hover:opacity-100 transition-opacity"><button class="text-[10px] px-2 py-0.5 rounded text-health-warn
										hover:bg-health-warn/10 transition-colors">Unpick</button> <button class="text-[10px] px-1.5 py-0.5 rounded text-surface-400
										hover:text-health-warn hover:bg-health-warn/10 transition-colors" title="Park card"></button> <button class="text-[10px] px-1.5 py-0.5 rounded text-surface-400
										hover:text-health-err hover:bg-health-err/10 transition-colors" title="Block card"></button> <button class="text-[10px] px-2 py-0.5 rounded bg-health-ok/15 text-health-ok
										hover:bg-health-ok/25 transition-colors">Finish</button></div></div>`), Uf = /* @__PURE__ */ u('<div class="rounded border border-surface-600/50 bg-surface-800/30 p-2.5 opacity-70"><div class="flex items-start gap-2 mb-1"><span class="text-[10px] text-health-ok"></span> <span class="text-xs text-surface-300 flex-1 leading-tight"> </span> <span> </span></div> <div class="text-[9px] text-surface-500 ml-4"> </div></div>'), Wf = /* @__PURE__ */ u('<p class="text-[10px] text-health-warn/80 mb-2 italic leading-relaxed"> </p>'), Yf = /* @__PURE__ */ u(`<div class="rounded border border-health-warn/20 bg-surface-800/60 p-2.5 group"><div class="flex items-start gap-2 mb-1"><span class="text-xs font-medium text-surface-200 flex-1 leading-tight"> </span> <span> </span></div> <!> <div class="flex items-center justify-between"><span class="text-[9px] text-surface-500"> </span> <button class="text-[10px] px-2 py-0.5 rounded text-health-warn
											hover:bg-health-warn/15 transition-colors
											opacity-0 group-hover:opacity-100">Unpark</button></div></div>`), Kf = /* @__PURE__ */ u('<p class="text-[10px] text-health-err/80 mb-2 italic leading-relaxed"> </p>'), Jf = /* @__PURE__ */ u(`<div class="rounded border border-health-err/20 bg-surface-800/60 p-2.5 group"><div class="flex items-start gap-2 mb-1"><span class="text-xs font-medium text-surface-200 flex-1 leading-tight"> </span> <span> </span></div> <!> <div class="flex items-center justify-between"><span class="text-[9px] text-surface-500"> </span> <button class="text-[10px] px-2 py-0.5 rounded text-health-err
											hover:bg-health-err/15 transition-colors
											opacity-0 group-hover:opacity-100">Unblock</button></div></div>`), Qf = /* @__PURE__ */ u('<div class="grid grid-cols-2 gap-3"><div class="rounded-lg border border-health-warn/30 bg-health-warn/5"><div class="px-3 py-2 border-b border-health-warn/20 flex items-center gap-2"><span class="text-[11px]"></span> <span class="text-[11px] font-semibold text-health-warn">Parked</span> <span class="text-[10px] text-surface-500 ml-auto"> </span></div> <div class="p-2 space-y-2"></div></div> <div class="rounded-lg border border-health-err/30 bg-health-err/5"><div class="px-3 py-2 border-b border-health-err/20 flex items-center gap-2"><span class="text-[11px]"></span> <span class="text-[11px] font-semibold text-health-err">Blocked</span> <span class="text-[10px] text-surface-500 ml-auto"> </span></div> <div class="p-2 space-y-2"></div></div></div>'), Xf = /* @__PURE__ */ u('<div class="grid grid-cols-3 gap-3 min-h-[300px]"><div class="rounded-lg border border-surface-600 bg-surface-800/30"><div class="px-3 py-2 border-b border-surface-600 flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-hecate-400"></span> <span class="text-[11px] font-semibold text-surface-200">Posted</span> <span class="text-[10px] text-surface-500 ml-auto"> </span></div> <div class="p-2 space-y-2"></div></div> <div class="rounded-lg border border-surface-600 bg-surface-800/30"><div class="px-3 py-2 border-b border-surface-600 flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-phase-crafting"></span> <span class="text-[11px] font-semibold text-surface-200">Picked</span> <span class="text-[10px] text-surface-500 ml-auto"> </span></div> <div class="p-2 space-y-2"></div></div> <div class="rounded-lg border border-surface-600 bg-surface-800/30"><div class="px-3 py-2 border-b border-surface-600 flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-health-ok"></span> <span class="text-[11px] font-semibold text-surface-200">Finished</span> <span class="text-[10px] text-surface-500 ml-auto"> </span></div> <div class="p-2 space-y-2"></div></div></div> <!>', 1), Zf = /* @__PURE__ */ u('<div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" role="dialog" aria-modal="true"><div class="bg-surface-800 border border-surface-600 rounded-xl p-5 w-96 space-y-3"><h4 class="text-sm font-semibold text-surface-100"> </h4> <p class="text-[11px] text-surface-400"> <span class="text-surface-200 font-medium"> </span></p> <div><label for="modal-reason" class="text-[10px] text-surface-400 block mb-1">Reason</label> <textarea id="modal-reason" rows="3"></textarea></div> <div class="flex gap-2 justify-end"><button class="px-3 py-1.5 rounded text-xs text-surface-400 hover:text-surface-100">Cancel</button> <button> </button></div></div></div>'), ep = /* @__PURE__ */ u(`<div class="p-4 space-y-4"><div class="flex items-center justify-between"><div><h3 class="text-sm font-semibold text-surface-100">Kanban</h3> <p class="text-[11px] text-surface-400 mt-0.5">Work cards for <span class="text-surface-200"> </span></p></div> <div class="flex items-center gap-2"><!> <button class="text-[11px] px-3 py-1 rounded bg-hecate-600/20 text-hecate-300
					hover:bg-hecate-600/30 transition-colors">+ Post Card</button></div></div> <!> <!> <!> <!></div>`);
function Po(e, t) {
  bt(t, !0);
  const a = () => Ee(Yr, "$selectedDivision", w), n = () => Ee(Lr, "$kanbanCards", w), c = () => Ee(Cf, "$cardCounts", w), l = () => Ee(Pt, "$kanbanError", w), f = () => Ee(en, "$kanbanLoading", w), v = () => Ee(mf, "$postedCards", w), p = () => Ee(yf, "$pickedCards", w), h = () => Ee(wf, "$finishedCards", w), b = () => Ee($f, "$parkedCards", w), $ = () => Ee(kf, "$blockedCards", w), [w, F] = Nt();
  let D = /* @__PURE__ */ ve(null);
  Rt(() => {
    const V = a();
    V && V.division_id !== r(D) && (_(D, V.division_id, !0), Fr(V.division_id));
  });
  let te = /* @__PURE__ */ ve(!1), P = /* @__PURE__ */ ve(""), q = /* @__PURE__ */ ve(""), ue = /* @__PURE__ */ ve("cmd_desk"), Ce = /* @__PURE__ */ ve(null), ge = /* @__PURE__ */ ve("unpick"), fe = /* @__PURE__ */ ve("");
  async function ie() {
    if (!a() || !r(P).trim()) return;
    await Sf(a().division_id, {
      title: r(P).trim(),
      description: r(q).trim() || void 0,
      card_type: r(ue),
      posted_by: "hecate-web"
    }) && (_(P, ""), _(q, ""), _(te, !1));
  }
  async function Fe(V) {
    a() && await Ef(a().division_id, V.card_id);
  }
  async function Pe(V) {
    a() && await Af(a().division_id, V.card_id);
  }
  function Ie(V, O) {
    _(Ce, V, !0), _(ge, O, !0), _(fe, "");
  }
  async function ce() {
    if (!a() || !r(Ce) || !r(fe).trim()) return;
    const V = a().division_id, O = r(Ce).card_id;
    let J = !1;
    r(ge) === "unpick" ? J = await Df(V, O, r(fe).trim()) : r(ge) === "park" ? J = await Pf(V, O, r(fe).trim()) : r(ge) === "block" && (J = await Rf(V, O, r(fe).trim())), J && (_(Ce, null), _(fe, ""));
  }
  async function G(V) {
    a() && await Tf(a().division_id, V.card_id);
  }
  async function M(V) {
    a() && await If(a().division_id, V.card_id);
  }
  function z(V) {
    switch (V) {
      case "cmd_desk":
        return "CMD";
      case "prj_desk":
        return "PRJ";
      case "qry_desk":
        return "QRY";
      default:
        return V;
    }
  }
  function W(V) {
    switch (V) {
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
  function N(V) {
    return V ? new Date(V).toLocaleDateString(void 0, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }) : "";
  }
  const I = {
    unpick: { title: "Unpick Card", verb: "Unpick", color: "health-warn" },
    park: { title: "Park Card", verb: "Park", color: "health-warn" },
    block: { title: "Block Card", verb: "Block", color: "health-err" }
  };
  var B = ep(), $e = i(B), je = i($e), qe = o(i(je), 2), Ve = o(i(qe)), Se = i(Ve, !0);
  s(Ve), s(qe), s(je);
  var Ne = o(je, 2), be = i(Ne);
  {
    var K = (V) => {
      var O = Lf(), J = i(O), Te = i(J);
      s(J);
      var Oe = o(J, 2), Ke = i(Oe);
      s(Oe);
      var Qe = o(Oe, 2), tt = i(Qe);
      s(Qe);
      var Ye = o(Qe, 2);
      {
        var at = (L) => {
          var U = Mf(), Y = i(U);
          s(U), g(() => x(Y, `${c().parked ?? ""} parked`)), d(L, U);
        };
        A(Ye, (L) => {
          c().parked > 0 && L(at);
        });
      }
      var ze = o(Ye, 2);
      {
        var We = (L) => {
          var U = Nf(), Y = i(U);
          s(U), g(() => x(Y, `${c().blocked ?? ""} blocked`)), d(L, U);
        };
        A(ze, (L) => {
          c().blocked > 0 && L(We);
        });
      }
      s(O), g(() => {
        x(Te, `${c().posted ?? ""} posted`), x(Ke, `${c().picked ?? ""} picked`), x(tt, `${c().finished ?? ""} done`);
      }), d(V, O);
    };
    A(be, (V) => {
      n().length > 0 && V(K);
    });
  }
  var k = o(be, 2);
  k.__click = () => _(te, !r(te)), s(Ne), s($e);
  var E = o($e, 2);
  {
    var j = (V) => {
      var O = Of(), J = i(O, !0);
      s(O), g(() => x(J, l())), d(V, O);
    };
    A(E, (V) => {
      l() && V(j);
    });
  }
  var T = o(E, 2);
  {
    var re = (V) => {
      var O = Ff(), J = o(i(O), 2), Te = i(J), Oe = o(i(Te), 2);
      wt(Oe), s(Te);
      var Ke = o(Te, 2), Qe = o(i(Ke), 2), tt = i(Qe);
      tt.value = tt.__value = "cmd_desk";
      var Ye = o(tt);
      Ye.value = Ye.__value = "prj_desk";
      var at = o(Ye);
      at.value = at.__value = "qry_desk", s(Qe), s(Ke), s(J);
      var ze = o(J, 2), We = o(i(ze), 2);
      wt(We), s(ze);
      var L = o(ze, 2), U = i(L);
      U.__click = ie;
      var Y = o(U, 2);
      Y.__click = () => _(te, !1), s(L), s(O), g(
        (xe, se) => {
          U.disabled = xe, Re(U, 1, `px-3 py-1.5 rounded text-xs transition-colors
						${se ?? ""}`);
        },
        [
          () => !r(P).trim(),
          () => r(P).trim() ? "bg-hecate-600/20 text-hecate-300 hover:bg-hecate-600/30" : "bg-surface-700 text-surface-500 cursor-not-allowed"
        ]
      ), xt(Oe, () => r(P), (xe) => _(P, xe)), Ga(Qe, () => r(ue), (xe) => _(ue, xe)), xt(We, () => r(q), (xe) => _(q, xe)), d(V, O);
    };
    A(T, (V) => {
      r(te) && V(re);
    });
  }
  var Le = o(T, 2);
  {
    var S = (V) => {
      var O = jf();
      d(V, O);
    }, C = (V) => {
      var O = Bf(), J = i(O);
      J.textContent = "☐", Dt(4), s(O), d(V, O);
    }, H = (V) => {
      var O = Xf(), J = it(O), Te = i(J), Oe = i(Te), Ke = o(i(Oe), 4), Qe = i(Ke, !0);
      s(Ke), s(Oe);
      var tt = o(Oe, 2);
      He(tt, 5, v, (m) => m.card_id, (m, y) => {
        var de = Gf(), R = i(de), ae = i(R), he = i(ae, !0);
        s(ae);
        var Ae = o(ae, 2), ne = i(Ae, !0);
        s(Ae), s(R);
        var X = o(R, 2);
        {
          var Z = (De) => {
            var Ge = Vf(), Ue = i(Ge, !0);
            s(Ge), g(() => x(Ue, r(y).description)), d(De, Ge);
          };
          A(X, (De) => {
            r(y).description && De(Z);
          });
        }
        var _e = o(X, 2), ke = i(_e), me = i(ke, !0);
        s(ke);
        var le = o(ke, 2), ee = i(le);
        ee.__click = () => Fe(r(y));
        var Q = o(ee, 2);
        Q.__click = () => Ie(r(y), "park"), Q.textContent = "⏸";
        var ye = o(Q, 2);
        ye.__click = () => Ie(r(y), "block"), ye.textContent = "⛔", s(le), s(_e), s(de), g(
          (De, Ge, Ue) => {
            x(he, r(y).title), Re(Ae, 1, `text-[9px] px-1.5 py-0.5 rounded ${De ?? ""} shrink-0`), x(ne, Ge), x(me, Ue);
          },
          [
            () => W(r(y).card_type),
            () => z(r(y).card_type),
            () => N(r(y).posted_at)
          ]
        ), d(m, de);
      }), s(tt), s(Te);
      var Ye = o(Te, 2), at = i(Ye), ze = o(i(at), 4), We = i(ze, !0);
      s(ze), s(at);
      var L = o(at, 2);
      He(L, 5, p, (m) => m.card_id, (m, y) => {
        var de = zf(), R = i(de), ae = i(R), he = i(ae, !0);
        s(ae);
        var Ae = o(ae, 2), ne = i(Ae, !0);
        s(Ae), s(R);
        var X = o(R, 2);
        {
          var Z = (De) => {
            var Ge = qf(), Ue = i(Ge, !0);
            s(Ge), g(() => x(Ue, r(y).description)), d(De, Ge);
          };
          A(X, (De) => {
            r(y).description && De(Z);
          });
        }
        var _e = o(X, 2);
        {
          var ke = (De) => {
            var Ge = Hf(), Ue = i(Ge);
            s(Ge), g(() => x(Ue, `Picked by ${r(y).picked_by ?? ""}`)), d(De, Ge);
          };
          A(_e, (De) => {
            r(y).picked_by && De(ke);
          });
        }
        var me = o(_e, 2), le = i(me);
        le.__click = () => Ie(r(y), "unpick");
        var ee = o(le, 2);
        ee.__click = () => Ie(r(y), "park"), ee.textContent = "⏸";
        var Q = o(ee, 2);
        Q.__click = () => Ie(r(y), "block"), Q.textContent = "⛔";
        var ye = o(Q, 2);
        ye.__click = () => Pe(r(y)), s(me), s(de), g(
          (De, Ge) => {
            x(he, r(y).title), Re(Ae, 1, `text-[9px] px-1.5 py-0.5 rounded ${De ?? ""} shrink-0`), x(ne, Ge);
          },
          [
            () => W(r(y).card_type),
            () => z(r(y).card_type)
          ]
        ), d(m, de);
      }), s(L), s(Ye);
      var U = o(Ye, 2), Y = i(U), xe = o(i(Y), 4), se = i(xe, !0);
      s(xe), s(Y);
      var pe = o(Y, 2);
      He(pe, 5, h, (m) => m.card_id, (m, y) => {
        var de = Uf(), R = i(de), ae = i(R);
        ae.textContent = "✓";
        var he = o(ae, 2), Ae = i(he, !0);
        s(he);
        var ne = o(he, 2), X = i(ne, !0);
        s(ne), s(R);
        var Z = o(R, 2), _e = i(Z, !0);
        s(Z), s(de), g(
          (ke, me, le) => {
            x(Ae, r(y).title), Re(ne, 1, `text-[9px] px-1.5 py-0.5 rounded ${ke ?? ""} shrink-0`), x(X, me), x(_e, le);
          },
          [
            () => W(r(y).card_type),
            () => z(r(y).card_type),
            () => N(r(y).finished_at)
          ]
        ), d(m, de);
      }), s(pe), s(U), s(J);
      var Me = o(J, 2);
      {
        var Je = (m) => {
          var y = Qf(), de = i(y), R = i(de), ae = i(R);
          ae.textContent = "⏸";
          var he = o(ae, 4), Ae = i(he, !0);
          s(he), s(R);
          var ne = o(R, 2);
          He(ne, 5, b, (ee) => ee.card_id, (ee, Q) => {
            var ye = Yf(), De = i(ye), Ge = i(De), Ue = i(Ge, !0);
            s(Ge);
            var Xe = o(Ge, 2), rt = i(Xe, !0);
            s(Xe), s(De);
            var st = o(De, 2);
            {
              var nt = (ht) => {
                var Lt = Wf(), Cr = i(Lt, !0);
                s(Lt), g(() => x(Cr, r(Q).park_reason)), d(ht, Lt);
              };
              A(st, (ht) => {
                r(Q).park_reason && ht(nt);
              });
            }
            var yt = o(st, 2), _t = i(yt), Ht = i(_t);
            s(_t);
            var zt = o(_t, 2);
            zt.__click = () => G(r(Q)), s(yt), s(ye), g(
              (ht, Lt, Cr) => {
                x(Ue, r(Q).title), Re(Xe, 1, `text-[9px] px-1.5 py-0.5 rounded ${ht ?? ""} shrink-0`), x(rt, Lt), x(Ht, `${r(Q).parked_by ? `by ${r(Q).parked_by}` : ""}
										${Cr ?? ""}`);
              },
              [
                () => W(r(Q).card_type),
                () => z(r(Q).card_type),
                () => N(r(Q).parked_at)
              ]
            ), d(ee, ye);
          }), s(ne), s(de);
          var X = o(de, 2), Z = i(X), _e = i(Z);
          _e.textContent = "⛔";
          var ke = o(_e, 4), me = i(ke, !0);
          s(ke), s(Z);
          var le = o(Z, 2);
          He(le, 5, $, (ee) => ee.card_id, (ee, Q) => {
            var ye = Jf(), De = i(ye), Ge = i(De), Ue = i(Ge, !0);
            s(Ge);
            var Xe = o(Ge, 2), rt = i(Xe, !0);
            s(Xe), s(De);
            var st = o(De, 2);
            {
              var nt = (ht) => {
                var Lt = Kf(), Cr = i(Lt, !0);
                s(Lt), g(() => x(Cr, r(Q).block_reason)), d(ht, Lt);
              };
              A(st, (ht) => {
                r(Q).block_reason && ht(nt);
              });
            }
            var yt = o(st, 2), _t = i(yt), Ht = i(_t);
            s(_t);
            var zt = o(_t, 2);
            zt.__click = () => M(r(Q)), s(yt), s(ye), g(
              (ht, Lt, Cr) => {
                x(Ue, r(Q).title), Re(Xe, 1, `text-[9px] px-1.5 py-0.5 rounded ${ht ?? ""} shrink-0`), x(rt, Lt), x(Ht, `${r(Q).blocked_by ? `by ${r(Q).blocked_by}` : ""}
										${Cr ?? ""}`);
              },
              [
                () => W(r(Q).card_type),
                () => z(r(Q).card_type),
                () => N(r(Q).blocked_at)
              ]
            ), d(ee, ye);
          }), s(le), s(X), s(y), g(() => {
            x(Ae, b().length), x(me, $().length);
          }), d(m, y);
        };
        A(Me, (m) => {
          (b().length > 0 || $().length > 0) && m(Je);
        });
      }
      g(() => {
        x(Qe, v().length), x(We, p().length), x(se, h().length);
      }), d(V, O);
    };
    A(Le, (V) => {
      f() ? V(S) : n().length === 0 && !r(te) ? V(C, 1) : V(H, !1);
    });
  }
  var oe = o(Le, 2);
  {
    var Be = (V) => {
      const O = /* @__PURE__ */ we(() => I[r(ge)]);
      var J = Zf(), Te = i(J), Oe = i(Te), Ke = i(Oe, !0);
      s(Oe);
      var Qe = o(Oe, 2), tt = i(Qe), Ye = o(tt), at = i(Ye, !0);
      s(Ye), s(Qe);
      var ze = o(Qe, 2), We = o(i(ze), 2);
      Ca(We), s(ze);
      var L = o(ze, 2), U = i(L);
      U.__click = () => _(Ce, null);
      var Y = o(U, 2);
      Y.__click = ce;
      var xe = i(Y, !0);
      s(Y), s(L), s(Te), s(J), g(
        (se, pe) => {
          x(Ke, r(O).title), x(tt, `${r(O).verb ?? ""}ing `), x(at, r(Ce).title), Mt(We, "placeholder", `Why is this card being ${r(ge) === "unpick" ? "unpicked" : r(ge) === "park" ? "parked" : "blocked"}?`), Re(We, 1, `w-full bg-surface-700 border border-surface-600 rounded px-2.5 py-1.5
							text-xs text-surface-100 placeholder-surface-400
							focus:outline-none focus:border-${r(O).color ?? ""}/50 resize-none`), Y.disabled = se, Re(Y, 1, `px-3 py-1.5 rounded text-xs transition-colors
							${pe ?? ""}`), x(xe, r(O).verb);
        },
        [
          () => !r(fe).trim(),
          () => r(fe).trim() ? `bg-${r(O).color}/20 text-${r(O).color} hover:bg-${r(O).color}/30` : "bg-surface-700 text-surface-500 cursor-not-allowed"
        ]
      ), xt(We, () => r(fe), (se) => _(fe, se)), d(V, J);
    };
    A(oe, (V) => {
      r(Ce) && V(Be);
    });
  }
  s(B), g(() => x(Se, a()?.context_name)), d(e, B), mt(), F();
}
At(["click"]);
kt(Po, {}, [], [], { mode: "open" });
const To = et(null);
async function tp(e, t) {
  try {
    return await Ze().post(`/generate_module/${e}`, t), !0;
  } catch (a) {
    const n = a;
    return To.set(n.message || "Failed to generate module"), !1;
  }
}
async function rp(e, t) {
  try {
    return await Ze().post(`/deliver_release/${e}`, { version: t }), !0;
  } catch (a) {
    const n = a;
    return To.set(n.message || "Failed to deliver release"), !1;
  }
}
var ap = /* @__PURE__ */ u(`<div class="flex gap-2 items-end mb-4 p-3 rounded bg-surface-700/30"><div class="flex-1"><label for="mod-name" class="text-[10px] text-surface-400 block mb-1">Module Name</label> <input id="mod-name" placeholder="e.g., register_user_v1" class="w-full bg-surface-700 border border-surface-600 rounded
								px-2.5 py-1.5 text-xs text-surface-100 placeholder-surface-400
								focus:outline-none focus:border-hecate-500/50"/></div> <div class="flex-1"><label for="mod-template" class="text-[10px] text-surface-400 block mb-1">Template (optional)</label> <input id="mod-template" placeholder="e.g., command, event, handler" class="w-full bg-surface-700 border border-surface-600 rounded
								px-2.5 py-1.5 text-xs text-surface-100 placeholder-surface-400
								focus:outline-none focus:border-hecate-500/50"/></div> <button class="px-3 py-1.5 rounded text-xs bg-hecate-600/20 text-hecate-300
							hover:bg-hecate-600/30 transition-colors disabled:opacity-50">Generate</button> <button class="px-3 py-1.5 rounded text-xs text-surface-400 hover:text-surface-100">Cancel</button></div>`), sp = /* @__PURE__ */ u(
  `<div class="rounded-lg border border-surface-600 bg-surface-800/50 p-4"><div class="flex items-center justify-between mb-3"><h4 class="text-xs font-semibold text-surface-100">Code Generation</h4> <button class="text-[10px] px-2 py-0.5 rounded bg-hecate-600/10 text-hecate-300
						hover:bg-hecate-600/20 transition-colors">+ Generate Module</button></div> <!> <p class="text-[10px] text-surface-400">Generate Erlang modules from templates based on planned desks and design
				artifacts.</p></div> <div><h4 class="text-xs font-semibold text-surface-100 mb-3">Implementation Tasks</h4> <div class="grid grid-cols-1 md:grid-cols-2 gap-3"><!> <!> <!> <!> <!> <!></div></div>`,
  1
), np = /* @__PURE__ */ u(`<div class="flex gap-2 items-end mb-4 p-3 rounded bg-surface-700/30"><div class="flex-1"><label for="rel-version" class="text-[10px] text-surface-400 block mb-1">Version</label> <input id="rel-version" placeholder="e.g., 0.1.0" class="w-full bg-surface-700 border border-surface-600 rounded
								px-2.5 py-1.5 text-xs text-surface-100 placeholder-surface-400
								focus:outline-none focus:border-hecate-500/50"/></div> <button class="px-3 py-1.5 rounded text-xs bg-hecate-600/20 text-hecate-300
							hover:bg-hecate-600/30 transition-colors disabled:opacity-50">Deliver</button> <button class="px-3 py-1.5 rounded text-xs text-surface-400 hover:text-surface-100">Cancel</button></div>`), ip = /* @__PURE__ */ u(
  `<div class="rounded-lg border border-surface-600 bg-surface-800/50 p-4"><div class="flex items-center justify-between mb-3"><h4 class="text-xs font-semibold text-surface-100">Releases</h4> <button class="text-[10px] px-2 py-0.5 rounded bg-hecate-600/10 text-hecate-300
						hover:bg-hecate-600/20 transition-colors">+ Deliver Release</button></div> <!> <p class="text-[10px] text-surface-400">Deliver through GitOps: version bump, git tag, CI/CD builds and deploys.</p></div> <div><h4 class="text-xs font-semibold text-surface-100 mb-3">Delivery Tasks</h4> <div class="grid grid-cols-1 md:grid-cols-2 gap-3"><!> <!> <!> <!></div></div>`,
  1
), op = /* @__PURE__ */ u('<div class="p-4 space-y-6"><div class="flex items-center justify-between"><div><h3 class="text-sm font-semibold text-surface-100">Crafting</h3> <p class="text-[11px] text-surface-400 mt-0.5">Generate code, run tests, and deliver releases for <span class="text-surface-200"> </span></p></div> <div class="flex items-center gap-1 bg-surface-700/50 rounded-lg p-0.5"><button>Implementation</button> <button>Delivery</button></div></div> <!></div>');
function Ro(e, t) {
  bt(t, !0);
  const a = () => Ee(Yr, "$selectedDivision", c), n = () => Ee(Et, "$isLoading", c), [c, l] = Nt();
  let f = /* @__PURE__ */ ve("implement"), v = /* @__PURE__ */ ve(!1), p = /* @__PURE__ */ ve(""), h = /* @__PURE__ */ ve(""), b = /* @__PURE__ */ ve(!1), $ = /* @__PURE__ */ ve("");
  async function w() {
    if (!a() || !r(p).trim()) return;
    await tp(a().division_id, {
      module_name: r(p).trim(),
      template: r(h).trim() || void 0
    }) && (_(p, ""), _(h, ""), _(v, !1));
  }
  async function F() {
    if (!a() || !r($).trim()) return;
    await rp(a().division_id, r($).trim()) && (_($, ""), _(b, !1));
  }
  var D = op(), te = i(D), P = i(te), q = o(i(P), 2), ue = o(i(q)), Ce = i(ue, !0);
  s(ue), s(q), s(P);
  var ge = o(P, 2), fe = i(ge);
  fe.__click = () => _(f, "implement");
  var ie = o(fe, 2);
  ie.__click = () => _(f, "deliver"), s(ge), s(te);
  var Fe = o(te, 2);
  {
    var Pe = (ce) => {
      var G = sp(), M = it(G), z = i(M), W = o(i(z), 2);
      W.__click = () => _(v, !r(v)), s(z);
      var N = o(z, 2);
      {
        var I = (K) => {
          var k = ap(), E = i(k), j = o(i(E), 2);
          wt(j), s(E);
          var T = o(E, 2), re = o(i(T), 2);
          wt(re), s(T);
          var Le = o(T, 2);
          Le.__click = w;
          var S = o(Le, 2);
          S.__click = () => _(v, !1), s(k), g((C) => Le.disabled = C, [() => !r(p).trim() || n()]), xt(j, () => r(p), (C) => _(p, C)), xt(re, () => r(h), (C) => _(h, C)), d(K, k);
        };
        A(N, (K) => {
          r(v) && K(I);
        });
      }
      Dt(2), s(M);
      var B = o(M, 2), $e = o(i(B), 2), je = i($e);
      {
        let K = /* @__PURE__ */ we(() => `Help me implement the walking skeleton for the "${a()?.context_name}" division. We need initiate_{aggregate} and archive_{aggregate} desks first. Generate the Erlang module structure for each.`);
        gt(je, {
          title: "Walking Skeleton",
          description: "Generate initiate + archive desks first, establishing the aggregate lifecycle foundation",
          icon: "⚲",
          get aiContext() {
            return r(K);
          }
        });
      }
      var qe = o(je, 2);
      {
        let K = /* @__PURE__ */ we(() => `Help me generate Erlang command modules for the "${a()?.context_name}" division. Each command needs: module, record, to_map/1, from_map/1. Use the evoq command pattern.`);
        gt(qe, {
          title: "Generate Commands",
          description: "Create command modules from the desk inventory with proper versioning",
          icon: "▶",
          get aiContext() {
            return r(K);
          }
        });
      }
      var Ve = o(qe, 2);
      {
        let K = /* @__PURE__ */ we(() => `Help me generate Erlang event modules for the "${a()?.context_name}" division. Each event needs: module, record, to_map/1, from_map/1. Follow the event naming convention: {subject}_{verb_past}_v{N}.`);
        gt(Ve, {
          title: "Generate Events",
          description: "Create event modules matching the designed domain events",
          icon: "◆",
          get aiContext() {
            return r(K);
          }
        });
      }
      var Se = o(Ve, 2);
      {
        let K = /* @__PURE__ */ we(() => `Help me write EUnit tests for the "${a()?.context_name}" division. Cover aggregate behavior (execute + apply), handler dispatch, and projection state updates.`);
        gt(Se, {
          title: "Write Tests",
          description: "Generate EUnit test modules for aggregates, handlers, and projections",
          icon: "✓",
          get aiContext() {
            return r(K);
          }
        });
      }
      var Ne = o(Se, 2);
      {
        let K = /* @__PURE__ */ we(() => `Help me analyze test results for the "${a()?.context_name}" division. What patterns should I look for? How do I ensure adequate coverage of the aggregate lifecycle?`);
        gt(Ne, {
          title: "Run Test Suite",
          description: "Execute all tests and review results for quality gates",
          icon: "▷",
          get aiContext() {
            return r(K);
          }
        });
      }
      var be = o(Ne, 2);
      {
        let K = /* @__PURE__ */ we(() => `Help me define acceptance criteria for the "${a()?.context_name}" division. What must be true before we can say this division is implemented correctly?`);
        gt(be, {
          title: "Acceptance Criteria",
          description: "Validate that implementation meets the design specifications",
          icon: "☑",
          get aiContext() {
            return r(K);
          }
        });
      }
      s($e), s(B), d(ce, G);
    }, Ie = (ce) => {
      var G = ip(), M = it(G), z = i(M), W = o(i(z), 2);
      W.__click = () => _(b, !r(b)), s(z);
      var N = o(z, 2);
      {
        var I = (Ne) => {
          var be = np(), K = i(be), k = o(i(K), 2);
          wt(k), s(K);
          var E = o(K, 2);
          E.__click = F;
          var j = o(E, 2);
          j.__click = () => _(b, !1), s(be), g((T) => E.disabled = T, [() => !r($).trim() || n()]), xt(k, () => r($), (T) => _($, T)), d(Ne, be);
        };
        A(N, (Ne) => {
          r(b) && Ne(I);
        });
      }
      Dt(2), s(M);
      var B = o(M, 2), $e = o(i(B), 2), je = i($e);
      {
        let Ne = /* @__PURE__ */ we(() => `Help me prepare a release for the "${a()?.context_name}" division. Walk me through the GitOps flow: version bump, CHANGELOG update, git tag, and CI/CD pipeline.`);
        gt(je, {
          title: "Release Management",
          description: "Prepare release: version bump, changelog, git tag, push for CI/CD",
          icon: "↑",
          get aiContext() {
            return r(Ne);
          }
        });
      }
      var qe = o(je, 2);
      {
        let Ne = /* @__PURE__ */ we(() => `Help me plan a staged rollout for the "${a()?.context_name}" division. How should we structure canary deployments with health gates on the beam cluster?`);
        gt(qe, {
          title: "Staged Rollout",
          description: "Plan a staged rollout with canary deployment and health gates",
          icon: "▤",
          get aiContext() {
            return r(Ne);
          }
        });
      }
      var Ve = o(qe, 2);
      {
        let Ne = /* @__PURE__ */ we(() => `Help me set up health monitoring for the "${a()?.context_name}" division. What health checks should we configure? What SLA thresholds make sense?`);
        gt(Ve, {
          title: "Health Monitoring",
          description: "Configure health checks and SLA thresholds",
          icon: "♥",
          get aiContext() {
            return r(Ne);
          }
        });
      }
      var Se = o(Ve, 2);
      {
        let Ne = /* @__PURE__ */ we(() => `Help me set up observability for the "${a()?.context_name}" division. What should we log? What metrics should we track? How do we set up distributed tracing on the beam cluster?`);
        gt(Se, {
          title: "Observability",
          description: "Set up logging, metrics, and tracing for production visibility",
          icon: "◎",
          get aiContext() {
            return r(Ne);
          }
        });
      }
      s($e), s(B), d(ce, G);
    };
    A(Fe, (ce) => {
      r(f) === "implement" ? ce(Pe) : ce(Ie, !1);
    });
  }
  s(D), g(() => {
    x(Ce, a()?.context_name), Re(fe, 1, `px-3 py-1 rounded text-[11px] transition-colors
					${r(f) === "implement" ? "bg-surface-600 text-surface-100" : "text-surface-400 hover:text-surface-200"}`), Re(ie, 1, `px-3 py-1 rounded text-[11px] transition-colors
					${r(f) === "deliver" ? "bg-surface-600 text-surface-100" : "text-surface-400 hover:text-surface-200"}`);
  }), d(e, D), mt(), l();
}
At(["click"]);
kt(Ro, {}, [], [], { mode: "open" });
var cp = /* @__PURE__ */ u('<div class="svelte-1ug3tqa"> </div>'), lp = /* @__PURE__ */ u('<div class="svelte-1ug3tqa"> </div>'), dp = /* @__PURE__ */ u('<div class="text-[9px] text-surface-400 space-y-0.5 svelte-1ug3tqa"><!> <!></div>'), up = /* @__PURE__ */ u('<div class="text-[9px] text-surface-500 italic svelte-1ug3tqa">No sessions</div>'), vp = /* @__PURE__ */ u(`<span role="button" tabindex="0" class="absolute top-1.5 right-1.5 text-[8px] px-1.5 py-0.5 rounded cursor-pointer
				bg-hecate-600/20 text-hecate-300 hover:bg-hecate-600/30
				opacity-0 group-hover:opacity-100 transition-opacity svelte-1ug3tqa">Run</span>`), fp = /* @__PURE__ */ u('<button><div class="flex items-center gap-2 mb-1.5 svelte-1ug3tqa"><span></span> <span class="text-xs font-semibold text-surface-100 flex-1 truncate svelte-1ug3tqa"> </span> <span class="text-[9px] text-surface-500 svelte-1ug3tqa"> </span></div> <!> <!></button>');
const pp = {
  hash: "svelte-1ug3tqa",
  code: `
	@keyframes svelte-1ug3tqa-pulse-subtle {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.85; }
	}.animate-pulse-subtle {
		animation: svelte-1ug3tqa-pulse-subtle 2s ease-in-out infinite;}`
};
function as(e, t) {
  bt(t, !0), Qi(e, pp);
  let a = pt(t, "roleStatus", 7), n = pt(t, "onSelect", 7), c = pt(t, "onInitiate", 7);
  const l = /* @__PURE__ */ we(() => er[a().role]), f = {
    idle: { dot: "bg-surface-500", label: "Idle" },
    running: { dot: "bg-hecate-400 animate-pulse", label: "Active" },
    completed: { dot: "bg-health-ok", label: "Done" },
    failed: { dot: "bg-health-err", label: "Failed" },
    gate_pending: { dot: "bg-health-warn animate-pulse", label: "Gate" }
  }, v = /* @__PURE__ */ we(() => f[a().status]);
  var p = {
    get roleStatus() {
      return a();
    },
    set roleStatus(fe) {
      a(fe), ut();
    },
    get onSelect() {
      return n();
    },
    set onSelect(fe) {
      n(fe), ut();
    },
    get onInitiate() {
      return c();
    },
    set onInitiate(fe) {
      c(fe), ut();
    }
  }, h = fp();
  h.__click = () => n()(a().role);
  var b = i(h), $ = i(b), w = o($, 2), F = i(w, !0);
  s(w);
  var D = o(w, 2), te = i(D, !0);
  s(D), s(b);
  var P = o(b, 2);
  {
    var q = (fe) => {
      const ie = /* @__PURE__ */ we(() => a().active_session);
      var Fe = dp(), Pe = i(Fe);
      {
        var Ie = (M) => {
          var z = cp(), W = i(z);
          s(z), g((N, I) => x(W, `${N ?? ""} in / ${I ?? ""} out`), [
            () => r(ie).tokens_in.toLocaleString(),
            () => r(ie).tokens_out.toLocaleString()
          ]), d(M, z);
        };
        A(Pe, (M) => {
          (r(ie).tokens_in > 0 || r(ie).tokens_out > 0) && M(Ie);
        });
      }
      var ce = o(Pe, 2);
      {
        var G = (M) => {
          var z = lp(), W = i(z);
          s(z), g(() => x(W, `${a().session_count ?? ""} sessions`)), d(M, z);
        };
        A(ce, (M) => {
          a().session_count > 1 && M(G);
        });
      }
      s(Fe), d(fe, Fe);
    }, ue = (fe) => {
      var ie = up();
      d(fe, ie);
    };
    A(P, (fe) => {
      a().active_session ? fe(q) : fe(ue, !1);
    });
  }
  var Ce = o(P, 2);
  {
    var ge = (fe) => {
      var ie = vp();
      ie.__click = (Fe) => {
        Fe.stopPropagation(), c()(a().role);
      }, ie.__keydown = (Fe) => {
        Fe.key === "Enter" && (Fe.stopPropagation(), c()(a().role));
      }, d(fe, ie);
    };
    A(Ce, (fe) => {
      a().status === "idle" && fe(ge);
    });
  }
  return s(h), g(() => {
    Re(
      h,
      1,
      `group relative text-left p-3 rounded-lg border transition-all
		${a().status === "gate_pending" ? "border-health-warn/50 bg-health-warn/5 shadow-sm shadow-health-warn/10 animate-pulse-subtle" : a().status === "running" ? "border-hecate-500/40 bg-hecate-600/5" : "border-surface-600 bg-surface-800/60 hover:border-surface-500"}`,
      "svelte-1ug3tqa"
    ), Re($, 1, `w-2 h-2 rounded-full ${r(v).dot ?? ""} shrink-0`, "svelte-1ug3tqa"), x(F, r(l).label), x(te, r(v).label);
  }), d(e, h), mt(p);
}
At(["click", "keydown"]);
kt(as, { roleStatus: {}, onSelect: {}, onInitiate: {} }, [], [], { mode: "open" });
var xp = /* @__PURE__ */ u('<span class="text-[9px] text-surface-400 ml-auto"> </span>'), _p = /* @__PURE__ */ u('<div class="rounded bg-surface-800 border border-surface-600 p-3 max-h-64 overflow-y-auto"><pre class="text-[10px] text-surface-200 whitespace-pre-wrap font-mono leading-relaxed"> </pre></div>'), hp = /* @__PURE__ */ u('<div class="rounded bg-surface-800 border border-surface-600 p-3 max-h-64 overflow-y-auto"><pre class="text-[10px] text-surface-200 whitespace-pre-wrap font-mono leading-relaxed"> </pre></div>'), gp = /* @__PURE__ */ u("<span> </span>"), bp = /* @__PURE__ */ u(`<div class="space-y-2"><textarea placeholder="Reason for rejecting..." rows="2" class="w-full bg-surface-700 border border-surface-600 rounded px-2.5 py-1.5
					text-xs text-surface-100 placeholder-surface-400
					focus:outline-none focus:border-health-err/50 resize-none"></textarea> <div class="flex gap-2"><button>Confirm Reject</button> <button class="px-3 py-1.5 rounded text-xs text-surface-400 hover:text-surface-100">Cancel</button></div></div>`), mp = /* @__PURE__ */ u(`<div class="flex gap-2"><button class="px-4 py-1.5 rounded text-xs font-medium
					bg-health-ok/20 text-health-ok hover:bg-health-ok/30 transition-colors"></button> <button class="px-4 py-1.5 rounded text-xs font-medium
					bg-health-err/20 text-health-err hover:bg-health-err/30 transition-colors"></button></div>`), yp = /* @__PURE__ */ u('<div class="rounded-lg border-2 border-health-warn/40 bg-health-warn/5 p-4 space-y-3"><div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-health-warn animate-pulse"></span> <h4 class="text-xs font-semibold text-health-warn uppercase tracking-wider"> </h4> <!></div> <!> <div class="flex items-center gap-4 text-[9px] text-surface-400"><span> </span> <!></div> <!></div>');
function Io(e, t) {
  bt(t, !0);
  let a = pt(t, "session", 7), n = pt(t, "onPass", 7), c = pt(t, "onReject", 7), l = /* @__PURE__ */ ve(""), f = /* @__PURE__ */ ve(!1);
  const v = /* @__PURE__ */ we(() => er[a().role]);
  function p() {
    r(l).trim() && (c()(r(l).trim()), _(l, ""), _(f, !1));
  }
  var h = {
    get session() {
      return a();
    },
    set session(G) {
      a(G), ut();
    },
    get onPass() {
      return n();
    },
    set onPass(G) {
      n(G), ut();
    },
    get onReject() {
      return c();
    },
    set onReject(G) {
      c(G), ut();
    }
  }, b = yp(), $ = i(b), w = o(i($), 2), F = i(w);
  s(w);
  var D = o(w, 2);
  {
    var te = (G) => {
      var M = xp(), z = i(M, !0);
      s(M), g(() => x(z, a().division_id)), d(G, M);
    };
    A(D, (G) => {
      a().division_id && G(te);
    });
  }
  s($);
  var P = o($, 2);
  {
    var q = (G) => {
      var M = _p(), z = i(M), W = i(z, !0);
      s(z), s(M), g(() => x(W, a().gate_output)), d(G, M);
    }, ue = (G) => {
      var M = hp(), z = i(M), W = i(z, !0);
      s(z), s(M), g(() => x(W, a().output)), d(G, M);
    };
    A(P, (G) => {
      a().gate_output ? G(q) : a().output && G(ue, 1);
    });
  }
  var Ce = o(P, 2), ge = i(Ce), fe = i(ge);
  s(ge);
  var ie = o(ge, 2);
  {
    var Fe = (G) => {
      var M = gp(), z = i(M);
      s(M), g((W) => x(z, `Started: ${W ?? ""}`), [() => new Date(a().started_at).toLocaleTimeString()]), d(G, M);
    };
    A(ie, (G) => {
      a().started_at && G(Fe);
    });
  }
  s(Ce);
  var Pe = o(Ce, 2);
  {
    var Ie = (G) => {
      var M = bp(), z = i(M);
      Ca(z);
      var W = o(z, 2), N = i(W);
      N.__click = p;
      var I = o(N, 2);
      I.__click = () => _(f, !1), s(W), s(M), g(
        (B, $e) => {
          N.disabled = B, Re(N, 1, `px-3 py-1.5 rounded text-xs transition-colors
						${$e ?? ""}`);
        },
        [
          () => !r(l).trim(),
          () => r(l).trim() ? "bg-health-err/20 text-health-err hover:bg-health-err/30" : "bg-surface-700 text-surface-500 cursor-not-allowed"
        ]
      ), xt(z, () => r(l), (B) => _(l, B)), d(G, M);
    }, ce = (G) => {
      var M = mp(), z = i(M);
      z.__click = function(...N) {
        n()?.apply(this, N);
      }, z.textContent = "✓ Pass Gate";
      var W = o(z, 2);
      W.__click = () => _(f, !0), W.textContent = "✕ Reject Gate", s(M), d(G, M);
    };
    A(Pe, (G) => {
      r(f) ? G(Ie) : G(ce, !1);
    });
  }
  return s(b), g(
    (G, M) => {
      x(F, `Gate Review: ${r(v).label ?? ""}`), x(fe, `Tokens: ${G ?? ""} in / ${M ?? ""} out`);
    },
    [
      () => a().tokens_in.toLocaleString(),
      () => a().tokens_out.toLocaleString()
    ]
  ), d(e, b), mt(h);
}
At(["click"]);
kt(Io, { session: {}, onPass: {}, onReject: {} }, [], [], { mode: "open" });
var wp = /* @__PURE__ */ u(`<button class="text-[10px] px-2 py-0.5 rounded text-surface-400
					hover:text-surface-200 hover:bg-surface-700 transition-colors">Archive</button>`), $p = /* @__PURE__ */ u('<div class="px-4 py-3 border-b border-surface-600 shrink-0"><h4 class="text-[10px] font-semibold text-surface-300 uppercase tracking-wider mb-2">Output</h4> <div class="rounded bg-surface-800 border border-surface-600 p-3 max-h-48 overflow-y-auto"><pre class="text-[10px] text-surface-200 whitespace-pre-wrap font-mono leading-relaxed"> </pre></div></div>'), kp = /* @__PURE__ */ u('<div class="px-4 py-3 border-b border-surface-600 shrink-0"><div class="text-[10px] text-health-err bg-health-err/10 rounded px-3 py-2"> </div></div>'), Cp = /* @__PURE__ */ u('<div><div class="flex items-center gap-2 mb-1"><span> </span> <span class="text-[8px] text-surface-500"> </span></div> <pre class="text-[10px] text-surface-200 whitespace-pre-wrap font-mono leading-relaxed"> </pre></div>'), Sp = /* @__PURE__ */ u('<div class="flex-1 overflow-y-auto px-4 py-3"><h4 class="text-[10px] font-semibold text-surface-300 uppercase tracking-wider mb-2"> </h4> <div class="space-y-2"></div></div>'), Ep = /* @__PURE__ */ u('<div class="flex-1 flex items-center justify-center text-surface-500 text-xs">No conversation turns recorded</div>'), Ap = /* @__PURE__ */ u('<div class="flex flex-col h-full"><div class="px-4 py-3 border-b border-surface-600 flex items-center gap-3 shrink-0"><button class="text-surface-400 hover:text-surface-100 transition-colors text-sm"></button> <span class="text-sm"> </span> <h3 class="text-sm font-semibold text-surface-100"> </h3> <span> </span> <div class="flex-1"></div> <!></div> <div class="px-4 py-3 border-b border-surface-600 shrink-0"><div class="grid grid-cols-4 gap-3 text-[10px]"><div><span class="text-surface-500 block">Started</span> <span class="text-surface-200"> </span></div> <div><span class="text-surface-500 block">Completed</span> <span class="text-surface-200"> </span></div> <div><span class="text-surface-500 block">Tokens In</span> <span class="text-surface-200"> </span></div> <div><span class="text-surface-500 block">Tokens Out</span> <span class="text-surface-200"> </span></div></div></div> <!> <!> <!></div>');
function Mo(e, t) {
  bt(t, !0);
  let a = pt(t, "session", 7), n = pt(t, "turns", 7), c = pt(t, "onClose", 7), l = pt(t, "onArchive", 7);
  const f = /* @__PURE__ */ we(() => er[a().role]);
  function v(k) {
    return k ? new Date(k).toLocaleString(void 0, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }) : "-";
  }
  const p = {
    pending: "text-surface-400",
    running: "text-hecate-300",
    completed: "text-health-ok",
    failed: "text-health-err",
    gate_pending: "text-health-warn",
    gate_passed: "text-health-ok",
    gate_rejected: "text-health-err",
    archived: "text-surface-500"
  };
  var h = {
    get session() {
      return a();
    },
    set session(k) {
      a(k), ut();
    },
    get turns() {
      return n();
    },
    set turns(k) {
      n(k), ut();
    },
    get onClose() {
      return c();
    },
    set onClose(k) {
      c(k), ut();
    },
    get onArchive() {
      return l();
    },
    set onArchive(k) {
      l(k), ut();
    }
  }, b = Ap(), $ = i(b), w = i($);
  w.__click = function(...k) {
    c()?.apply(this, k);
  }, w.textContent = "←";
  var F = o(w, 2), D = i(F, !0);
  s(F);
  var te = o(F, 2), P = i(te);
  s(te);
  var q = o(te, 2), ue = i(q, !0);
  s(q);
  var Ce = o(q, 4);
  {
    var ge = (k) => {
      var E = wp();
      E.__click = function(...j) {
        l()?.apply(this, j);
      }, d(k, E);
    };
    A(Ce, (k) => {
      a().status !== "archived" && a().status !== "running" && k(ge);
    });
  }
  s($);
  var fe = o($, 2), ie = i(fe), Fe = i(ie), Pe = o(i(Fe), 2), Ie = i(Pe, !0);
  s(Pe), s(Fe);
  var ce = o(Fe, 2), G = o(i(ce), 2), M = i(G, !0);
  s(G), s(ce);
  var z = o(ce, 2), W = o(i(z), 2), N = i(W, !0);
  s(W), s(z);
  var I = o(z, 2), B = o(i(I), 2), $e = i(B, !0);
  s(B), s(I), s(ie), s(fe);
  var je = o(fe, 2);
  {
    var qe = (k) => {
      var E = $p(), j = o(i(E), 2), T = i(j), re = i(T, !0);
      s(T), s(j), s(E), g(() => x(re, a().output)), d(k, E);
    };
    A(je, (k) => {
      a().output && k(qe);
    });
  }
  var Ve = o(je, 2);
  {
    var Se = (k) => {
      var E = kp(), j = i(E), T = i(j, !0);
      s(j), s(E), g(() => x(T, a().error)), d(k, E);
    };
    A(Ve, (k) => {
      a().error && k(Se);
    });
  }
  var Ne = o(Ve, 2);
  {
    var be = (k) => {
      var E = Sp(), j = i(E), T = i(j);
      s(j);
      var re = o(j, 2);
      He(re, 21, n, (Le) => Le.turn_id, (Le, S) => {
        var C = Cp(), H = i(C), oe = i(H), Be = i(oe, !0);
        s(oe);
        var V = o(oe, 2), O = i(V, !0);
        s(V), s(H);
        var J = o(H, 2), Te = i(J, !0);
        s(J), s(C), g(
          (Oe) => {
            Re(C, 1, `rounded p-2.5
						${r(S).role === "assistant" ? "bg-hecate-600/10 border border-hecate-600/20" : r(S).role === "user" ? "bg-surface-700/50 border border-surface-600" : "bg-surface-800 border border-surface-600/50"}`), Re(oe, 1, `text-[9px] font-semibold uppercase tracking-wider
								${r(S).role === "assistant" ? "text-hecate-300" : "text-surface-400"}`), x(Be, r(S).role), x(O, Oe), x(Te, r(S).content);
          },
          [() => new Date(r(S).timestamp).toLocaleTimeString()]
        ), d(Le, C);
      }), s(re), s(E), g(() => x(T, `Conversation (${n().length ?? ""} turns)`)), d(k, E);
    }, K = (k) => {
      var E = Ep();
      d(k, E);
    };
    A(Ne, (k) => {
      n().length > 0 ? k(be) : k(K, !1);
    });
  }
  return s(b), g(
    (k, E, j, T) => {
      x(D, r(f).icon), x(P, `${r(f).label ?? ""} Session`), Re(q, 1, `text-[10px] ${p[a().status] ?? "text-surface-400" ?? ""}`), x(ue, a().status), x(Ie, k), x(M, E), x(N, j), x($e, T);
    },
    [
      () => v(a().started_at),
      () => v(a().completed_at),
      () => a().tokens_in.toLocaleString(),
      () => a().tokens_out.toLocaleString()
    ]
  ), d(e, b), mt(h);
}
At(["click"]);
kt(Mo, { session: {}, turns: {}, onClose: {}, onArchive: {} }, [], [], { mode: "open" });
var Dp = /* @__PURE__ */ u('<span class="text-[10px] text-surface-400 animate-pulse">Refreshing...</span>'), Pp = /* @__PURE__ */ u('<div class="text-[11px] text-health-err bg-health-err/10 rounded px-3 py-2"> </div>'), Tp = /* @__PURE__ */ u('<div class="space-y-3"></div>'), Rp = /* @__PURE__ */ u('<div class="p-4 space-y-4 overflow-y-auto h-full"><div class="flex items-center justify-between"><div><h3 class="text-sm font-semibold text-surface-100">Agent Pipeline</h3> <p class="text-[11px] text-surface-400 mt-0.5">12 roles across the venture lifecycle</p></div> <!></div> <!> <!> <div><h4 class="text-[10px] font-semibold text-surface-400 uppercase tracking-wider mb-2">Tier 1 — Creative</h4> <div class="grid grid-cols-4 gap-2"></div></div> <div class="flex items-center gap-2 px-2"><div class="flex-1 h-px bg-surface-600"></div> <span class="text-[9px] text-surface-500">gate</span> <span class="text-surface-500"></span> <div class="flex-1 h-px bg-surface-600"></div></div> <div><h4 class="text-[10px] font-semibold text-surface-400 uppercase tracking-wider mb-2">Tier 2 — Mechanical</h4> <div class="grid grid-cols-4 gap-2"></div></div> <div><h4 class="text-[10px] font-semibold text-surface-400 uppercase tracking-wider mb-2">Always-On</h4> <div class="grid grid-cols-4 gap-2"></div></div></div>');
function No(e, t) {
  bt(t, !0);
  const a = () => Ee(St, "$activeVenture", w), n = () => Ee(ca, "$agentRoleStatuses", w), c = () => Ee(es, "$selectedSession", w), l = () => Ee(Qs, "$sessionTurns", w), f = () => Ee(Js, "$agentLoading", w), v = () => Ee(tr, "$agentError", w), p = () => Ee(Aa, "$pendingGates", w), h = () => Ee(Yl, "$creativeRoles", w), b = () => Ee(Kl, "$mechanicalRoles", w), $ = () => Ee(Jl, "$alwaysOnRoles", w), [w, F] = Nt();
  let D = /* @__PURE__ */ ve(null);
  Rt(() => {
    const G = a();
    G && G.venture_id !== r(D) && (_(D, G.venture_id, !0), $a(G.venture_id));
  });
  let te;
  Rt(() => {
    const G = a();
    if (G)
      return te = setInterval(() => $a(G.venture_id), 1e4), () => {
        te && clearInterval(te);
      };
  });
  let P = /* @__PURE__ */ ve(!1);
  function q() {
    return a()?.venture_id ?? "";
  }
  async function ue(G) {
    const M = n().find((z) => z.role === G);
    M?.active_session && (await Xl(q(), M.active_session.session_id), (G === "coordinator" || G === "mentor") && await Zl(q(), M.active_session.session_id), _(P, !0));
  }
  async function Ce(G) {
    await ed(q(), G);
  }
  async function ge(G, M) {
    await go(q(), M, G);
  }
  async function fe(G, M, z) {
    await bo(q(), M, G, z);
  }
  async function ie() {
    const G = c();
    G && (await td(q(), G.session_id), _(P, !1), es.set(null));
  }
  var Fe = or(), Pe = it(Fe);
  {
    var Ie = (G) => {
      Mo(G, {
        get session() {
          return c();
        },
        get turns() {
          return l();
        },
        onClose: () => {
          _(P, !1), es.set(null);
        },
        onArchive: ie
      });
    }, ce = (G) => {
      var M = Rp(), z = i(M), W = o(i(z), 2);
      {
        var N = (j) => {
          var T = Dp();
          d(j, T);
        };
        A(W, (j) => {
          f() && j(N);
        });
      }
      s(z);
      var I = o(z, 2);
      {
        var B = (j) => {
          var T = Pp(), re = i(T, !0);
          s(T), g(() => x(re, v())), d(j, T);
        };
        A(I, (j) => {
          v() && j(B);
        });
      }
      var $e = o(I, 2);
      {
        var je = (j) => {
          var T = Tp();
          He(T, 5, p, (re) => re.session_id, (re, Le) => {
            Io(re, {
              get session() {
                return r(Le);
              },
              onPass: () => ge(r(Le).session_id, r(Le).role),
              onReject: (S) => fe(r(Le).session_id, r(Le).role, S)
            });
          }), s(T), d(j, T);
        };
        A($e, (j) => {
          p().length > 0 && j(je);
        });
      }
      var qe = o($e, 2), Ve = o(i(qe), 2);
      He(Ve, 5, h, (j) => j.role, (j, T) => {
        as(j, {
          get roleStatus() {
            return r(T);
          },
          onSelect: ue,
          onInitiate: Ce
        });
      }), s(Ve), s(qe);
      var Se = o(qe, 2), Ne = o(i(Se), 4);
      Ne.textContent = "↓", Dt(2), s(Se);
      var be = o(Se, 2), K = o(i(be), 2);
      He(K, 5, b, (j) => j.role, (j, T) => {
        as(j, {
          get roleStatus() {
            return r(T);
          },
          onSelect: ue,
          onInitiate: Ce
        });
      }), s(K), s(be);
      var k = o(be, 2), E = o(i(k), 2);
      He(E, 5, $, (j) => j.role, (j, T) => {
        as(j, {
          get roleStatus() {
            return r(T);
          },
          onSelect: ue,
          onInitiate: Ce
        });
      }), s(E), s(k), s(M), d(G, M);
    };
    A(Pe, (G) => {
      r(P) && c() ? G(Ie) : G(ce, !1);
    });
  }
  d(e, Fe), mt(), F();
}
kt(No, {}, [], [], { mode: "open" });
var Ip = /* @__PURE__ */ u("<div></div>"), Mp = /* @__PURE__ */ u("<!> <button><span> </span> <span> </span></button>", 1), Np = /* @__PURE__ */ u('<span class="text-[10px] text-surface-500 mr-1">Pending</span>'), Lp = /* @__PURE__ */ u("<button> </button>"), Op = /* @__PURE__ */ u(`<div class="border-b border-surface-600 bg-surface-800/30 px-4 py-2 shrink-0"><div class="flex items-center gap-1"><!> <div class="flex-1"></div> <span class="text-[10px] text-surface-400 mr-2"> </span> <!> <button class="text-[10px] px-2 py-0.5 rounded text-hecate-400
					hover:bg-hecate-600/20 transition-colors ml-1" title="Open AI Assistant"></button></div></div>`);
function Lo(e, t) {
  bt(t, !0);
  const a = () => Ee(Yr, "$selectedDivision", l), n = () => Ee(qa, "$selectedPhase", l), c = () => Ee(Nr, "$isLoading", l), [l, f] = Nt();
  let v = /* @__PURE__ */ we(() => a() ? zs(a(), n()) : []);
  function p(q) {
    qa.set(q);
  }
  function h(q, ue) {
    switch (q) {
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
  function b(q, ue) {
    return q ? ue.length === 0 ? { icon: "✓", css: "text-health-ok" } : ue.includes("resume") ? { icon: "◐", css: "text-health-warn" } : ue.includes("shelve") || ue.includes("conclude") || ue.includes("archive") ? { icon: "●", css: "text-hecate-400 animate-pulse" } : ue.includes("open") ? { icon: "○", css: "text-surface-300" } : { icon: "○", css: "text-surface-500" } : { icon: "○", css: "text-surface-500" };
  }
  function $(q) {
    switch (q) {
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
  function w(q) {
    return q.charAt(0).toUpperCase() + q.slice(1);
  }
  async function F(q) {
    if (!a()) return;
    const ue = a().division_id, Ce = n();
    switch (q) {
      case "open":
        await Cl(ue, Ce);
        break;
      case "shelve":
        await Sl(ue, Ce);
        break;
      case "resume":
        await El(ue, Ce);
        break;
      case "conclude":
        await Al(ue, Ce);
        break;
    }
  }
  var D = or(), te = it(D);
  {
    var P = (q) => {
      var ue = Op(), Ce = i(ue), ge = i(Ce);
      He(ge, 17, () => Ir, ct, (G, M, z) => {
        const W = /* @__PURE__ */ we(() => pa(a(), r(M).code)), N = /* @__PURE__ */ we(() => zs(a(), r(M).code)), I = /* @__PURE__ */ we(() => n() === r(M).code), B = /* @__PURE__ */ we(() => {
          const { icon: E, css: j } = b(r(W), r(N));
          return { icon: E, css: j };
        }), $e = /* @__PURE__ */ we(() => r(W) && r(N).length === 0);
        var je = Mp(), qe = it(je);
        {
          var Ve = (E) => {
            var j = Ip();
            g(() => Re(j, 1, `w-4 h-px ${r($e) ? "bg-health-ok/40" : "bg-surface-600"}`)), d(E, j);
          };
          A(qe, (E) => {
            z > 0 && E(Ve);
          });
        }
        var Se = o(qe, 2);
        Se.__click = () => p(r(M).code);
        var Ne = i(Se), be = i(Ne, !0);
        s(Ne);
        var K = o(Ne, 2), k = i(K, !0);
        s(K), s(Se), g(
          (E) => {
            Re(Se, 1, `flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-all
						border
						${E ?? ""}`), Re(Ne, 1, `${r(B).css ?? ""} text-[10px]`), x(be, r(B).icon), x(k, r(M).shortName);
          },
          [
            () => r(I) ? `bg-surface-700 border-current ${h(r(M).code)}` : "border-transparent text-surface-400 hover:text-surface-200 hover:bg-surface-700/50"
          ]
        ), d(G, je);
      });
      var fe = o(ge, 4), ie = i(fe, !0);
      s(fe);
      var Fe = o(fe, 2);
      {
        var Pe = (G) => {
          const M = /* @__PURE__ */ we(() => pa(a(), n()));
          var z = or(), W = it(z);
          {
            var N = (I) => {
              var B = Np();
              d(I, B);
            };
            A(W, (I) => {
              r(M) || I(N);
            });
          }
          d(G, z);
        }, Ie = (G) => {
          var M = or(), z = it(M);
          He(z, 17, () => r(v), ct, (W, N) => {
            var I = Lp();
            I.__click = () => F(r(N));
            var B = i(I, !0);
            s(I), g(
              ($e, je) => {
                I.disabled = c(), Re(I, 1, `text-[10px] px-2 py-0.5 rounded transition-colors disabled:opacity-50
							${$e ?? ""}`), x(B, je);
              },
              [
                () => $(r(N)),
                () => w(r(N))
              ]
            ), d(W, I);
          }), d(G, M);
        };
        A(Fe, (G) => {
          r(v).length === 0 ? G(Pe) : G(Ie, !1);
        });
      }
      var ce = o(Fe, 2);
      ce.__click = () => Er(`Help with ${Ir.find((G) => G.code === n())?.name} phase for division "${a()?.context_name}"`), ce.textContent = "✦ AI Assist", s(Ce), s(ue), g((G) => x(ie, G), [() => Ir.find((G) => G.code === n())?.name]), d(q, ue);
    };
    A(te, (q) => {
      a() && q(P);
    });
  }
  d(e, D), mt(), f();
}
At(["click"]);
kt(Lo, {}, [], [], { mode: "open" });
var Fp = /* @__PURE__ */ u('<span class="text-[9px] text-surface-500"> </span>'), jp = /* @__PURE__ */ u('<div class="flex items-center justify-center h-full"><div class="text-center text-surface-400"><div class="text-sm mb-2 animate-pulse">...</div> <div class="text-[10px]">Loading events</div></div></div>'), Bp = /* @__PURE__ */ u('<div class="flex items-center justify-center h-full"><div class="text-center text-surface-500 text-xs">Select a venture to view its event stream.</div></div>'), Vp = /* @__PURE__ */ u('<div class="flex items-center justify-center h-full"><div class="text-center text-surface-500"><div class="text-lg mb-2"></div> <div class="text-xs">No events recorded yet.</div> <div class="text-[10px] mt-1">Events will appear here as the venture progresses.</div></div></div>'), Gp = /* @__PURE__ */ u('<span class="text-[9px] px-1 py-0.5 rounded bg-surface-700 text-surface-400 shrink-0"> </span>'), qp = /* @__PURE__ */ u('<span class="text-[9px] text-surface-500 shrink-0 tabular-nums"> </span>'), Hp = /* @__PURE__ */ u(`<div class="px-4 pb-3 pt-0 ml-5"><pre class="text-[10px] text-surface-300 bg-surface-800 border border-surface-600
									rounded p-3 overflow-x-auto whitespace-pre-wrap break-words
									font-mono leading-relaxed"> </pre></div>`), zp = /* @__PURE__ */ u(`<div class="group"><button class="w-full text-left px-4 py-2 flex items-start gap-2
								hover:bg-surface-700/30 transition-colors"><span class="text-[9px] text-surface-500 mt-0.5 shrink-0 w-3"> </span> <span> </span> <!> <!></button> <!></div>`), Up = /* @__PURE__ */ u('<div class="p-3 border-t border-surface-700/50"><button> </button></div>'), Wp = /* @__PURE__ */ u('<div class="divide-y divide-surface-700/50"></div> <!>', 1), Yp = /* @__PURE__ */ u('<div class="flex flex-col h-full"><div class="border-b border-surface-600 bg-surface-800/50 px-4 py-2 shrink-0"><div class="flex items-center gap-2"><span class="text-xs text-surface-400">Event Stream</span> <!> <div class="flex-1"></div> <button title="Refresh events"> </button></div></div> <div class="flex-1 overflow-y-auto"><!></div></div>');
function tn(e, t) {
  bt(t, !0);
  const a = () => Ee(An, "$ventureRawEvents", c), n = () => Ee(St, "$activeVenture", c), [c, l] = Nt(), f = 50;
  let v = /* @__PURE__ */ ve(!1), p = /* @__PURE__ */ ve(0), h = /* @__PURE__ */ ve(0), b = /* @__PURE__ */ ve(Vt(/* @__PURE__ */ new Set())), $ = /* @__PURE__ */ we(() => r(h) + f < r(p)), w = /* @__PURE__ */ we(a);
  async function F(I, B = !0) {
    _(v, !0), B && (_(h, 0), _(b, /* @__PURE__ */ new Set(), !0));
    try {
      const $e = await Yn(I, r(h), f);
      _(p, $e.count, !0);
    } finally {
      _(v, !1);
    }
  }
  async function D() {
    const I = n();
    if (!(!I || r(v))) {
      _(h, r(h) + f), _(v, !0);
      try {
        const B = await Yn(I.venture_id, r(h), f);
        _(p, B.count, !0);
      } finally {
        _(v, !1);
      }
    }
  }
  function te(I) {
    const B = new Set(r(b));
    B.has(I) ? B.delete(I) : B.add(I), _(b, B, !0);
  }
  function P(I) {
    return I.startsWith("venture_") || I.startsWith("big_picture_storm_") ? "text-hecate-400" : I.startsWith("event_sticky_") ? "text-es-event" : I.startsWith("event_stack_") || I.startsWith("event_cluster_") ? "text-success-400" : I.startsWith("fact_arrow_") ? "text-sky-400" : I.startsWith("storm_phase_") ? "text-accent-400" : "text-surface-400";
  }
  function q(I) {
    if (!I) return "";
    const B = typeof I == "string" ? Number(I) || new Date(I).getTime() : I;
    if (isNaN(B)) return "";
    const $e = new Date(B), qe = Date.now() - B, Ve = Math.floor(qe / 1e3);
    if (Ve < 60) return `${Ve}s ago`;
    const Se = Math.floor(Ve / 60);
    if (Se < 60) return `${Se}m ago`;
    const Ne = Math.floor(Se / 60);
    if (Ne < 24) return `${Ne}h ago`;
    const be = Math.floor(Ne / 24);
    return be < 7 ? `${be}d ago` : $e.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  function ue(I) {
    try {
      return JSON.stringify(I, null, 2);
    } catch {
      return String(I);
    }
  }
  Rt(() => {
    const I = n();
    I && F(I.venture_id);
  });
  var Ce = Yp(), ge = i(Ce), fe = i(ge), ie = o(i(fe), 2);
  {
    var Fe = (I) => {
      var B = Fp(), $e = i(B);
      s(B), g(() => x($e, `${r(w).length ?? ""}${r(p) > r(w).length ? ` / ${r(p)}` : ""} events`)), d(I, B);
    };
    A(ie, (I) => {
      r(w).length > 0 && I(Fe);
    });
  }
  var Pe = o(ie, 4);
  Pe.__click = () => {
    const I = n();
    I && F(I.venture_id);
  };
  var Ie = i(Pe, !0);
  s(Pe), s(fe), s(ge);
  var ce = o(ge, 2), G = i(ce);
  {
    var M = (I) => {
      var B = jp();
      d(I, B);
    }, z = (I) => {
      var B = Bp();
      d(I, B);
    }, W = (I) => {
      var B = Vp(), $e = i(B), je = i($e);
      je.textContent = "○", Dt(4), s($e), s(B), d(I, B);
    }, N = (I) => {
      var B = Wp(), $e = it(B);
      He($e, 21, () => r(w), ct, (Ve, Se, Ne) => {
        const be = /* @__PURE__ */ we(() => r(b).has(Ne)), K = /* @__PURE__ */ we(() => P(r(Se).event_type));
        var k = zp(), E = i(k);
        E.__click = () => te(Ne);
        var j = i(E), T = i(j, !0);
        s(j);
        var re = o(j, 2), Le = i(re, !0);
        s(re);
        var S = o(re, 2);
        {
          var C = (O) => {
            var J = Gp(), Te = i(J);
            s(J), g(() => x(Te, `v${r(Se).version ?? ""}`)), d(O, J);
          };
          A(S, (O) => {
            r(Se).version !== void 0 && O(C);
          });
        }
        var H = o(S, 2);
        {
          var oe = (O) => {
            var J = qp(), Te = i(J, !0);
            s(J), g((Oe) => x(Te, Oe), [() => q(r(Se).timestamp)]), d(O, J);
          };
          A(H, (O) => {
            r(Se).timestamp && O(oe);
          });
        }
        s(E);
        var Be = o(E, 2);
        {
          var V = (O) => {
            var J = Hp(), Te = i(J), Oe = i(Te, !0);
            s(Te), s(J), g((Ke) => x(Oe, Ke), [() => ue(r(Se).data)]), d(O, J);
          };
          A(Be, (O) => {
            r(be) && O(V);
          });
        }
        s(k), g(() => {
          x(T, r(be) ? "▾" : "▸"), Re(re, 1, `text-[11px] font-mono ${r(K) ?? ""} flex-1 min-w-0 truncate`), x(Le, r(Se).event_type);
        }), d(Ve, k);
      }), s($e);
      var je = o($e, 2);
      {
        var qe = (Ve) => {
          var Se = Up(), Ne = i(Se);
          Ne.__click = D;
          var be = i(Ne, !0);
          s(Ne), s(Se), g(() => {
            Ne.disabled = r(v), Re(Ne, 1, `w-full text-[10px] py-1.5 rounded transition-colors
							${r(v) ? "bg-surface-700 text-surface-500 cursor-not-allowed" : "bg-surface-700 text-surface-300 hover:text-surface-100 hover:bg-surface-600"}`), x(be, r(v) ? "Loading..." : `Load More (${r(p) - r(w).length} remaining)`);
          }), d(Ve, Se);
        };
        A(je, (Ve) => {
          r($) && Ve(qe);
        });
      }
      d(I, B);
    };
    A(G, (I) => {
      r(v) && r(w).length === 0 ? I(M) : n() ? r(w).length === 0 ? I(W, 2) : I(N, !1) : I(z, 1);
    });
  }
  s(ce), s(Ce), g(() => {
    Pe.disabled = r(v) || !n(), Re(Pe, 1, `text-[10px] px-2 py-0.5 rounded transition-colors
					${r(v) || !n() ? "text-surface-500 cursor-not-allowed" : "text-surface-400 hover:text-surface-200 hover:bg-surface-700"}`), x(Ie, r(v) ? "Loading..." : "Refresh");
  }), d(e, Ce), mt(), l();
}
At(["click"]);
kt(tn, {}, [], [], { mode: "open" });
var Kp = /* @__PURE__ */ u(`<div class="flex justify-end"><div class="max-w-[85%] rounded-lg px-3 py-2 text-[11px]
						bg-hecate-600/20 text-surface-100 border border-hecate-600/20"> </div></div>`), Jp = /* @__PURE__ */ u('<div class="flex justify-start"><div><div class="whitespace-pre-wrap break-words"> </div></div></div>'), Qp = /* @__PURE__ */ u('<div class="whitespace-pre-wrap break-words"> <span class="inline-block w-1.5 h-3 bg-hecate-400 animate-pulse ml-0.5"></span></div>'), Xp = /* @__PURE__ */ u('<div class="flex items-center gap-1.5 text-surface-400"><span class="animate-bounce" style="animation-delay: 0ms">.</span> <span class="animate-bounce" style="animation-delay: 150ms">.</span> <span class="animate-bounce" style="animation-delay: 300ms">.</span></div>'), Zp = /* @__PURE__ */ u(`<div class="flex justify-start"><div class="max-w-[85%] rounded-lg px-3 py-2 text-[11px]
					bg-surface-700 text-surface-200 border border-surface-600"><!></div></div>`), e0 = /* @__PURE__ */ u('<span class="text-[9px] text-hecate-400 ml-1">(code-optimized)</span>'), t0 = /* @__PURE__ */ u('<span class="text-hecate-400"> </span> <!>', 1), r0 = /* @__PURE__ */ u('<span class="text-health-warn">No model available</span>'), a0 = /* @__PURE__ */ u('<div class="flex items-center justify-center h-full"><div class="text-center text-surface-400"><div class="text-xl mb-2"></div> <div class="text-[11px]">AI Assistant ready <br/> <!></div></div></div>'), s0 = /* @__PURE__ */ u(`<div class="w-[380px] border-l border-surface-600 bg-surface-800 flex flex-col shrink-0 overflow-hidden"><div class="flex items-center gap-2 px-3 py-2 border-b border-surface-600 shrink-0"><span class="text-hecate-400"></span> <span class="text-xs font-semibold text-surface-100">AI</span> <!> <div class="flex-1"></div> <span class="text-[9px] text-surface-400"> </span> <button class="text-surface-400 hover:text-surface-100 transition-colors px-1" title="Close AI Assistant"></button></div> <div class="flex-1 overflow-y-auto p-3 space-y-3"><!> <!> <!></div> <div class="border-t border-surface-600 p-2 shrink-0"><div class="flex gap-1.5"><textarea class="flex-1 bg-surface-700 border border-surface-600 rounded px-2.5 py-1.5
					text-[11px] text-surface-100 placeholder-surface-400 resize-none
					focus:outline-none focus:border-hecate-500
					disabled:opacity-50 disabled:cursor-not-allowed"></textarea> <button>Send</button></div></div></div>`);
function rn(e, t) {
  bt(t, !0);
  const a = () => Ee(qa, "$selectedPhase", p), n = () => Ee(co, "$phaseModelPrefs", p), c = () => Ee(kn, "$aiModel", p), l = () => Ee(so, "$aiAssistContext", p), f = () => Ee(St, "$activeVenture", p), v = () => Ee(Yr, "$selectedDivision", p), [p, h] = Nt(), b = ao();
  let $ = /* @__PURE__ */ ve(Vt([])), w = /* @__PURE__ */ ve(""), F = /* @__PURE__ */ ve(!1), D = /* @__PURE__ */ ve(""), te = /* @__PURE__ */ ve(void 0), P = /* @__PURE__ */ ve(null), q = /* @__PURE__ */ ve(null), ue = /* @__PURE__ */ we(() => yl(a())), Ce = /* @__PURE__ */ we(() => n()[a()]);
  Rt(() => {
    const E = c();
    r(q) !== null && r(q) !== E && (r(P) && (r(P).cancel(), _(P, null)), _($, [], !0), _(D, ""), _(F, !1)), _(q, E, !0);
  }), Rt(() => {
    const E = l();
    E && r($).length === 0 && fe(E);
  });
  function ge() {
    const E = [], j = Xt(So);
    j && E.push(j);
    const T = Ir.find((re) => re.code === a());
    if (T && E.push(`You are currently assisting with the ${T.name} phase. ${T.description}.`), f()) {
      let re = `Venture: "${f().name}"`;
      f().brief && (re += ` — ${f().brief}`), E.push(re);
    }
    return v() && E.push(`Division: "${v().context_name}" (bounded context)`), E.push(Xt(Yd)), E.join(`

---

`);
  }
  async function fe(E) {
    const j = c();
    if (!j || !E.trim() || r(F)) return;
    const T = { role: "user", content: E.trim() };
    _($, [...r($), T], !0), _(w, "");
    const re = [], Le = ge();
    Le && re.push({ role: "system", content: Le }), re.push(...r($)), _(F, !0), _(D, "");
    let S = "";
    const C = b.stream.chat(j, re);
    _(P, C, !0), C.onChunk((H) => {
      H.content && (S += H.content, _(D, S, !0));
    }).onDone(async (H) => {
      _(P, null), H.content && (S += H.content);
      const oe = {
        role: "assistant",
        content: S || "(empty response)"
      };
      if (_($, [...r($), oe], !0), _(D, ""), _(F, !1), Xt(yn) === "oracle" && S) {
        const V = Xt(St)?.venture_id;
        if (V) {
          const O = $l(S);
          for (const J of O)
            await Za(V, J, "oracle");
        }
      }
    }).onError((H) => {
      _(P, null);
      const oe = { role: "assistant", content: `Error: ${H}` };
      _($, [...r($), oe], !0), _(D, ""), _(F, !1);
    });
    try {
      await C.start();
    } catch (H) {
      const oe = { role: "assistant", content: `Error: ${String(H)}` };
      _($, [...r($), oe], !0), _(F, !1);
    }
  }
  let ie = /* @__PURE__ */ ve(void 0);
  function Fe(E) {
    E.key === "Enter" && !E.shiftKey && (E.preventDefault(), fe(r(w)), r(ie) && (r(ie).style.height = "auto"));
  }
  function Pe(E) {
    const j = E.target;
    j.style.height = "auto", j.style.height = Math.min(j.scrollHeight, 120) + "px";
  }
  function Ie() {
    wl(), _($, [], !0), _(D, "");
  }
  Rt(() => {
    r($), r(D), gn().then(() => {
      r(te) && (r(te).scrollTop = r(te).scrollHeight);
    });
  });
  var ce = s0(), G = i(ce), M = i(G);
  M.textContent = "✦";
  var z = o(M, 4);
  {
    let E = /* @__PURE__ */ we(() => Ir.find((j) => j.code === a())?.shortName ?? "");
    $s(z, {
      get currentModel() {
        return c();
      },
      onSelect: (j) => Cn(j),
      showPhaseInfo: !0,
      get phasePreference() {
        return r(Ce);
      },
      get phaseAffinity() {
        return r(ue);
      },
      onPinModel: (j) => Wn(a(), j),
      onClearPin: () => Wn(a(), null),
      get phaseName() {
        return r(E);
      }
    });
  }
  var W = o(z, 4), N = i(W, !0);
  s(W);
  var I = o(W, 2);
  I.__click = Ie, I.textContent = "✕", s(G);
  var B = o(G, 2), $e = i(B);
  He($e, 17, () => r($), ct, (E, j) => {
    var T = or(), re = it(T);
    {
      var Le = (C) => {
        var H = Kp(), oe = i(H), Be = i(oe, !0);
        s(oe), s(H), g(() => x(Be, r(j).content)), d(C, H);
      }, S = (C) => {
        var H = Jp(), oe = i(H), Be = i(oe), V = i(Be, !0);
        s(Be), s(oe), s(H), g(
          (O) => {
            Re(oe, 1, `max-w-[85%] rounded-lg px-3 py-2 text-[11px]
						bg-surface-700 text-surface-200 border border-surface-600
						${O ?? ""}`), x(V, r(j).content);
          },
          [
            () => r(j).content.startsWith("Error:") ? "border-health-err/30 text-health-err" : ""
          ]
        ), d(C, H);
      };
      A(re, (C) => {
        r(j).role === "user" ? C(Le) : r(j).role === "assistant" && C(S, 1);
      });
    }
    d(E, T);
  });
  var je = o($e, 2);
  {
    var qe = (E) => {
      var j = Zp(), T = i(j), re = i(T);
      {
        var Le = (C) => {
          var H = Qp(), oe = i(H, !0);
          Dt(), s(H), g(() => x(oe, r(D))), d(C, H);
        }, S = (C) => {
          var H = Xp();
          d(C, H);
        };
        A(re, (C) => {
          r(D) ? C(Le) : C(S, !1);
        });
      }
      s(T), s(j), d(E, j);
    };
    A(je, (E) => {
      r(F) && E(qe);
    });
  }
  var Ve = o(je, 2);
  {
    var Se = (E) => {
      var j = a0(), T = i(j), re = i(T);
      re.textContent = "✦";
      var Le = o(re, 2), S = o(i(Le), 3);
      {
        var C = (oe) => {
          var Be = t0(), V = it(Be), O = i(V, !0);
          s(V);
          var J = o(V, 2);
          {
            var Te = (Oe) => {
              var Ke = e0();
              d(Oe, Ke);
            };
            A(J, (Oe) => {
              r(ue) === "code" && Oe(Te);
            });
          }
          g(() => x(O, c())), d(oe, Be);
        }, H = (oe) => {
          var Be = r0();
          d(oe, Be);
        };
        A(S, (oe) => {
          c() ? oe(C) : oe(H, !1);
        });
      }
      s(Le), s(T), s(j), d(E, j);
    };
    A(Ve, (E) => {
      r($).length === 0 && !r(F) && E(Se);
    });
  }
  s(B), ea(B, (E) => _(te, E), () => r(te));
  var Ne = o(B, 2), be = i(Ne), K = i(be);
  Ca(K), K.__keydown = Fe, K.__input = Pe, Mt(K, "rows", 1), ea(K, (E) => _(ie, E), () => r(ie));
  var k = o(K, 2);
  k.__click = () => fe(r(w)), s(be), s(Ne), s(ce), g(
    (E, j, T) => {
      x(N, E), Mt(K, "placeholder", r(F) ? "Waiting..." : "Ask about this phase..."), K.disabled = r(F) || !c(), k.disabled = j, Re(k, 1, `px-2.5 rounded text-[11px] transition-colors self-end
					${T ?? ""}`);
    },
    [
      () => Ir.find((E) => E.code === a())?.shortName ?? "",
      () => r(F) || !r(w).trim() || !c(),
      () => r(F) || !r(w).trim() || !c() ? "bg-surface-600 text-surface-400 cursor-not-allowed" : "bg-hecate-600 text-surface-50 hover:bg-hecate-500"
    ]
  ), xt(K, () => r(w), (E) => _(w, E)), d(e, ce), mt(), h();
}
At(["click", "keydown", "input"]);
kt(rn, {}, [], [], { mode: "open" });
var n0 = /* @__PURE__ */ u("<button> </button>"), i0 = /* @__PURE__ */ u('<div><button><span class="font-medium truncate block"> </span></button> <div class="flex items-center gap-1 ml-2 mt-0.5"></div></div>'), o0 = /* @__PURE__ */ u('<div class="text-[10px] text-surface-500 px-2 py-3 text-center">No divisions yet</div>'), c0 = /* @__PURE__ */ u('<div class="px-2 pb-2 space-y-1"><!> <!></div>'), l0 = /* @__PURE__ */ u('<span class="ml-auto text-[9px] px-1.5 py-0.5 rounded-full bg-hecate-600/20 text-hecate-300"> </span>'), d0 = /* @__PURE__ */ u('<span class="ml-auto text-[9px] text-surface-500 truncate max-w-[60px]"> </span>'), u0 = /* @__PURE__ */ u(`<button class="w-full flex items-center gap-1.5 px-2 py-1 rounded text-[10px]
							text-surface-300 hover:bg-surface-700/50 transition-colors"><span> </span> <span class="truncate"> </span> <!></button>`), v0 = /* @__PURE__ */ u('<div class="px-2 pb-2 space-y-0.5"></div>'), f0 = /* @__PURE__ */ u('<span class="ml-auto text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 animate-pulse"> </span>'), p0 = /* @__PURE__ */ u('<div class="text-[9px] text-surface-400 ml-3 mt-0.5 truncate"> </div>'), x0 = /* @__PURE__ */ u(`<button class="w-full text-left p-2 rounded bg-amber-500/5 border border-amber-500/20
							hover:bg-amber-500/10 transition-colors"><div class="flex items-center gap-1.5"><span class="text-[8px] text-amber-400 animate-pulse"></span> <span class="text-[10px] font-medium text-amber-300 truncate"> </span></div> <!></button>`), _0 = /* @__PURE__ */ u('<div class="text-[10px] text-surface-500 px-2 py-3 text-center">No pending gates</div>'), h0 = /* @__PURE__ */ u('<div class="px-2 pb-2 space-y-1"><!> <!></div>'), g0 = /* @__PURE__ */ u(`<div class="w-52 border-r border-surface-600 bg-surface-800/30 overflow-y-auto shrink-0 flex flex-col"><div class="border-b border-surface-700/50"><button class="w-full flex items-center gap-1.5 px-3 py-2 text-[10px] text-surface-400
				uppercase tracking-wider hover:text-surface-300 transition-colors"><span class="text-[8px]"> </span> <span>Divisions</span> <span class="ml-auto text-surface-500"> </span></button> <!></div> <div class="border-b border-surface-700/50"><button class="w-full flex items-center gap-1.5 px-3 py-2 text-[10px] text-surface-400
				uppercase tracking-wider hover:text-surface-300 transition-colors"><span class="text-[8px]"> </span> <span>Agents</span> <!></button> <!></div> <div class="flex-1"><button class="w-full flex items-center gap-1.5 px-3 py-2 text-[10px] text-surface-400
				uppercase tracking-wider hover:text-surface-300 transition-colors"><span class="text-[8px]"> </span> <span>Gates</span> <!></button> <!></div></div>`);
function Oo(e, t) {
  bt(t, !0);
  const a = () => Ee(Ur, "$divisions", f), n = () => Ee(xa, "$selectedDivisionId", f), c = () => Ee(ca, "$agentRoleStatuses", f), l = () => Ee(Aa, "$pendingGates", f), [f, v] = Nt();
  let p = pt(t, "onSelectAgent", 7), h = pt(t, "onSelectGate", 7), b = /* @__PURE__ */ ve(Vt({}));
  function $(T) {
    _(
      b,
      {
        ...r(b),
        [T]: !r(b)[T]
      },
      !0
    );
  }
  function w(T) {
    xa.set(T);
  }
  function F(T, re) {
    xa.set(T), qa.set(re);
  }
  function D(T, re) {
    return T ? re.length === 0 ? { icon: "●", css: "text-health-ok" } : re.includes("resume") ? { icon: "○", css: "text-health-warn" } : re.includes("shelve") || re.includes("conclude") || re.includes("archive") ? { icon: "◐", css: "text-hecate-400" } : re.includes("open") ? { icon: "○", css: "text-surface-300" } : { icon: "○", css: "text-surface-500" } : { icon: "○", css: "text-surface-500" };
  }
  function te(T) {
    switch (T) {
      case "running":
        return { icon: "●", css: "text-hecate-400 animate-pulse" };
      case "gate_pending":
        return { icon: "●", css: "text-amber-400 animate-pulse" };
      case "completed":
        return { icon: "✓", css: "text-health-ok" };
      case "failed":
        return { icon: "✗", css: "text-health-err" };
      default:
        return { icon: "○", css: "text-surface-500" };
    }
  }
  function P(T) {
    return T.replace(/_/g, " ").replace(/\b\w/g, (re) => re.toUpperCase());
  }
  var q = {
    get onSelectAgent() {
      return p();
    },
    set onSelectAgent(T) {
      p(T), ut();
    },
    get onSelectGate() {
      return h();
    },
    set onSelectGate(T) {
      h(T), ut();
    }
  }, ue = g0(), Ce = i(ue), ge = i(Ce);
  ge.__click = () => $("divisions");
  var fe = i(ge), ie = i(fe, !0);
  s(fe);
  var Fe = o(fe, 4), Pe = i(Fe, !0);
  s(Fe), s(ge);
  var Ie = o(ge, 2);
  {
    var ce = (T) => {
      var re = c0(), Le = i(re);
      He(Le, 1, a, ct, (H, oe) => {
        const Be = /* @__PURE__ */ we(() => n() === r(oe).division_id);
        var V = i0(), O = i(V);
        O.__click = () => w(r(oe).division_id);
        var J = i(O), Te = i(J, !0);
        s(J), s(O);
        var Oe = o(O, 2);
        He(Oe, 21, () => Ir, ct, (Ke, Qe) => {
          const tt = /* @__PURE__ */ we(() => pa(r(oe), r(Qe).code)), Ye = /* @__PURE__ */ we(() => zs(r(oe), r(Qe).code)), at = /* @__PURE__ */ we(() => {
            const { icon: L, css: U } = D(r(tt), r(Ye));
            return { icon: L, css: U };
          });
          var ze = n0();
          ze.__click = () => F(r(oe).division_id, r(Qe).code);
          var We = i(ze, !0);
          s(ze), g(() => {
            Re(ze, 1, `text-[9px] ${r(at).css ?? ""} hover:opacity-80 transition-opacity`), Mt(ze, "title", `${r(Qe).shortName ?? ""}: ${(r(tt) || "Pending") ?? ""}`), x(We, r(at).icon);
          }), d(Ke, ze);
        }), s(Oe), s(V), g(() => {
          Re(O, 1, `w-full text-left px-2 py-1 rounded text-xs transition-colors
								${r(Be) ? "bg-surface-700 text-surface-100" : "text-surface-300 hover:bg-surface-700/50 hover:text-surface-100"}`), x(Te, r(oe).context_name);
        }), d(H, V);
      });
      var S = o(Le, 2);
      {
        var C = (H) => {
          var oe = o0();
          d(H, oe);
        };
        A(S, (H) => {
          a().length === 0 && H(C);
        });
      }
      s(re), d(T, re);
    };
    A(Ie, (T) => {
      r(b).divisions || T(ce);
    });
  }
  s(Ce);
  var G = o(Ce, 2), M = i(G);
  M.__click = () => $("agents");
  var z = i(M), W = i(z, !0);
  s(z);
  var N = o(z, 4);
  {
    var I = (T) => {
      var re = l0(), Le = i(re);
      s(re), g((S) => x(Le, `${S ?? ""} active`), [
        () => c().filter((S) => S.status === "running").length
      ]), d(T, re);
    }, B = /* @__PURE__ */ we(() => c().filter((T) => T.status === "running").length > 0);
    A(N, (T) => {
      r(B) && T(I);
    });
  }
  s(M);
  var $e = o(M, 2);
  {
    var je = (T) => {
      var re = v0();
      He(re, 5, c, ct, (Le, S) => {
        const C = /* @__PURE__ */ we(() => {
          const { icon: Oe, css: Ke } = te(r(S).status);
          return { icon: Oe, css: Ke };
        });
        var H = u0();
        H.__click = () => p()?.(r(S).role);
        var oe = i(H), Be = i(oe, !0);
        s(oe);
        var V = o(oe, 2), O = i(V, !0);
        s(V);
        var J = o(V, 2);
        {
          var Te = (Oe) => {
            var Ke = d0(), Qe = i(Ke, !0);
            s(Ke), g(() => x(Qe, r(S).active_session.division_id)), d(Oe, Ke);
          };
          A(J, (Oe) => {
            r(S).active_session?.division_id && Oe(Te);
          });
        }
        s(H), g(
          (Oe) => {
            Re(oe, 1, `${r(C).css ?? ""} text-[8px]`), x(Be, r(C).icon), x(O, Oe);
          },
          [() => P(r(S).role)]
        ), d(Le, H);
      }), s(re), d(T, re);
    };
    A($e, (T) => {
      r(b).agents || T(je);
    });
  }
  s(G);
  var qe = o(G, 2), Ve = i(qe);
  Ve.__click = () => $("gates");
  var Se = i(Ve), Ne = i(Se, !0);
  s(Se);
  var be = o(Se, 4);
  {
    var K = (T) => {
      var re = f0(), Le = i(re, !0);
      s(re), g(() => x(Le, l().length)), d(T, re);
    };
    A(be, (T) => {
      l().length > 0 && T(K);
    });
  }
  s(Ve);
  var k = o(Ve, 2);
  {
    var E = (T) => {
      var re = h0(), Le = i(re);
      He(Le, 1, l, ct, (H, oe) => {
        var Be = x0();
        Be.__click = () => h()?.(r(oe).session_id);
        var V = i(Be), O = i(V);
        O.textContent = "●";
        var J = o(O, 2), Te = i(J, !0);
        s(J), s(V);
        var Oe = o(V, 2);
        {
          var Ke = (Qe) => {
            var tt = p0(), Ye = i(tt, !0);
            s(tt), g(() => x(Ye, r(oe).division_id)), d(Qe, tt);
          };
          A(Oe, (Qe) => {
            r(oe).division_id && Qe(Ke);
          });
        }
        s(Be), g((Qe) => x(Te, Qe), [() => P(r(oe).role)]), d(H, Be);
      });
      var S = o(Le, 2);
      {
        var C = (H) => {
          var oe = _0();
          d(H, oe);
        };
        A(S, (H) => {
          l().length === 0 && H(C);
        });
      }
      s(re), d(T, re);
    };
    A(k, (T) => {
      r(b).gates || T(E);
    });
  }
  s(qe), s(ue), g(() => {
    x(ie, r(b).divisions ? "▶" : "▼"), x(Pe, a().length), x(W, r(b).agents ? "▶" : "▼"), x(Ne, r(b).gates ? "▶" : "▼");
  }), d(e, ue);
  var j = mt(q);
  return v(), j;
}
At(["click"]);
kt(Oo, { onSelectAgent: {}, onSelectGate: {} }, [], [], { mode: "open" });
var b0 = /* @__PURE__ */ u('<span class="text-surface-500 truncate"> </span>'), m0 = /* @__PURE__ */ u('<span> </span> <!> <span class="text-surface-500 shrink-0"> </span>', 1), y0 = /* @__PURE__ */ u('<span class="text-surface-500">No recent activity</span>'), w0 = /* @__PURE__ */ u('<span class="px-1.5 py-0.5 rounded-full bg-hecate-600/30 text-hecate-300 text-[9px]"> </span>'), $0 = /* @__PURE__ */ u('<span class="text-[9px] text-surface-500 ml-1"> </span>'), k0 = /* @__PURE__ */ u(`<div class="flex items-start gap-2 px-4 py-1.5 hover:bg-surface-700/20
					transition-colors border-b border-surface-700/30 last:border-b-0"><span></span> <div class="min-w-0 flex-1"><span> </span> <!></div> <span class="text-[9px] text-surface-500 shrink-0 tabular-nums"> </span></div>`), C0 = /* @__PURE__ */ u('<div class="text-center py-4 text-[10px] text-surface-500">Activity will appear here as events stream in</div>'), S0 = /* @__PURE__ */ u('<div class="max-h-48 overflow-y-auto border-t border-surface-700/50"><!> <!></div>'), E0 = /* @__PURE__ */ u(`<div class="border-t border-surface-600 bg-surface-800/50 shrink-0"><button class="w-full flex items-center gap-2 px-4 py-1.5 text-[10px]
			hover:bg-surface-700/30 transition-colors"><span></span> <!> <span class="flex-1"></span> <!> <span class="text-surface-500 text-[8px]"> </span></button> <!></div>`);
function Fo(e, t) {
  bt(t, !0);
  const a = () => Ee(pr, "$sseStatus", l), n = () => Ee(ud, "$recentActivity", l), c = () => Ee(Dn, "$unreadCount", l), [l, f] = Nt();
  let v = /* @__PURE__ */ ve(!1);
  function p(Pe) {
    switch (Pe) {
      case "success":
        return "text-health-ok";
      case "warning":
        return "text-amber-400";
      case "error":
        return "text-health-err";
      default:
        return "text-surface-400";
    }
  }
  function h(Pe) {
    switch (Pe) {
      case "success":
        return "bg-health-ok";
      case "warning":
        return "bg-amber-400";
      case "error":
        return "bg-health-err";
      default:
        return "bg-surface-500";
    }
  }
  function b(Pe) {
    const Ie = Math.floor((Date.now() - Pe) / 1e3);
    if (Ie < 5) return "now";
    if (Ie < 60) return `${Ie}s ago`;
    const ce = Math.floor(Ie / 60);
    return ce < 60 ? `${ce}m ago` : `${Math.floor(ce / 60)}h ago`;
  }
  function $() {
    _(v, !r(v)), r(v) && pd();
  }
  var w = E0(), F = i(w);
  F.__click = $;
  var D = i(F), te = o(D, 2);
  {
    var P = (Pe) => {
      const Ie = /* @__PURE__ */ we(() => n()[0]);
      var ce = m0(), G = it(ce), M = i(G, !0);
      s(G);
      var z = o(G, 2);
      {
        var W = (B) => {
          var $e = b0(), je = i($e, !0);
          s($e), g(() => x(je, r(Ie).detail)), d(B, $e);
        };
        A(z, (B) => {
          r(Ie).detail && B(W);
        });
      }
      var N = o(z, 2), I = i(N, !0);
      s(N), g(
        (B, $e) => {
          Re(G, 1, `${B ?? ""} truncate`), x(M, r(Ie).summary), x(I, $e);
        },
        [
          () => p(r(Ie).severity),
          () => b(r(Ie).timestamp)
        ]
      ), d(Pe, ce);
    }, q = (Pe) => {
      var Ie = y0();
      d(Pe, Ie);
    };
    A(te, (Pe) => {
      n().length > 0 ? Pe(P) : Pe(q, !1);
    });
  }
  var ue = o(te, 4);
  {
    var Ce = (Pe) => {
      var Ie = w0(), ce = i(Ie, !0);
      s(Ie), g(() => x(ce, c())), d(Pe, Ie);
    };
    A(ue, (Pe) => {
      c() > 0 && Pe(Ce);
    });
  }
  var ge = o(ue, 2), fe = i(ge, !0);
  s(ge), s(F);
  var ie = o(F, 2);
  {
    var Fe = (Pe) => {
      var Ie = S0(), ce = i(Ie);
      He(ce, 1, n, (z) => z.id, (z, W) => {
        var N = k0(), I = i(N), B = o(I, 2), $e = i(B), je = i($e, !0);
        s($e);
        var qe = o($e, 2);
        {
          var Ve = (be) => {
            var K = $0(), k = i(K, !0);
            s(K), g(() => x(k, r(W).detail)), d(be, K);
          };
          A(qe, (be) => {
            r(W).detail && be(Ve);
          });
        }
        s(B);
        var Se = o(B, 2), Ne = i(Se, !0);
        s(Se), s(N), g(
          (be, K, k) => {
            Re(I, 1, `inline-block w-1.5 h-1.5 rounded-full mt-1 shrink-0
						${be ?? ""}`), Re($e, 1, `text-[10px] ${K ?? ""}`), x(je, r(W).summary), x(Ne, k);
          },
          [
            () => h(r(W).severity),
            () => p(r(W).severity),
            () => b(r(W).timestamp)
          ]
        ), d(z, N);
      });
      var G = o(ce, 2);
      {
        var M = (z) => {
          var W = C0();
          d(z, W);
        };
        A(G, (z) => {
          n().length === 0 && z(M);
        });
      }
      s(Ie), d(Pe, Ie);
    };
    A(ie, (Pe) => {
      r(v) && Pe(Fe);
    });
  }
  s(w), g(() => {
    Re(D, 1, `inline-block w-1.5 h-1.5 rounded-full shrink-0
				${a() === "connected" ? "bg-health-ok" : a() === "connecting" ? "bg-amber-400 animate-pulse" : "bg-surface-500"}`), Mt(D, "title", `SSE: ${a() ?? ""}`), x(fe, r(v) ? "▼" : "▲");
  }), d(e, w), mt(), f();
}
At(["click"]);
kt(Fo, {}, [], [], { mode: "open" });
var A0 = /* @__PURE__ */ u('<span class="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-medium"> </span>'), D0 = /* @__PURE__ */ u('<div class="text-center py-8 text-surface-500 text-xs">No gates awaiting decision</div>'), P0 = /* @__PURE__ */ u('<span class="text-[10px] text-surface-400"></span> <span class="text-[10px] text-surface-300"> </span>', 1), T0 = /* @__PURE__ */ u('<div class="rounded bg-surface-800 border border-surface-600 p-3 max-h-64 overflow-y-auto"><pre class="text-[10px] text-surface-200 whitespace-pre-wrap font-mono leading-relaxed"> </pre></div>'), R0 = /* @__PURE__ */ u("<span> </span>"), I0 = /* @__PURE__ */ u(`<div class="space-y-2"><textarea placeholder="Reason for rejecting..." rows="2" class="w-full bg-surface-700 border border-surface-600 rounded px-2.5 py-1.5
													text-xs text-surface-100 placeholder-surface-400
													focus:outline-none focus:border-health-err/50 resize-none"></textarea> <div class="flex gap-2"><button>Confirm Reject</button> <button class="px-3 py-1.5 rounded text-xs text-surface-400 hover:text-surface-100">Cancel</button></div></div>`), M0 = /* @__PURE__ */ u(`<div class="flex gap-2"><button class="px-4 py-1.5 rounded text-xs font-medium
													bg-health-ok/20 text-health-ok hover:bg-health-ok/30 transition-colors"></button> <button class="px-4 py-1.5 rounded text-xs font-medium
													bg-health-err/20 text-health-err hover:bg-health-err/30 transition-colors"></button></div>`), N0 = /* @__PURE__ */ u('<div class="border-t border-amber-500/10 px-4 py-3 space-y-3"><!> <div class="flex items-center gap-4 text-[9px] text-surface-400"><span> </span> <!></div> <!></div>'), L0 = /* @__PURE__ */ u('<div class="rounded-lg border border-amber-500/20 bg-amber-500/5 overflow-hidden"><button class="w-full text-left px-4 py-3 hover:bg-amber-500/10 transition-colors"><div class="flex items-center gap-3"><span class="text-amber-400 text-[8px] animate-pulse"></span> <span class="text-xs font-semibold text-amber-300"> </span> <!> <span class="text-[10px] text-surface-400"></span> <span class="text-[10px] text-surface-400"> </span> <span class="text-[10px] text-surface-500 ml-auto"> </span> <span class="text-[8px] text-surface-500"> </span></div> <div class="text-[10px] text-surface-400 mt-1 ml-5 truncate"> </div></button> <!></div>'), O0 = /* @__PURE__ */ u('<div class="space-y-3"></div>'), F0 = /* @__PURE__ */ u('<span class="text-[10px] text-surface-500"></span> <span class="text-[10px] text-surface-400"> </span>', 1), j0 = /* @__PURE__ */ u('<div class="text-[10px] text-surface-400 mt-1 ml-5 truncate"> </div>'), B0 = /* @__PURE__ */ u('<div class="rounded-lg border border-surface-600/50 bg-surface-800/30 px-4 py-3"><div class="flex items-center gap-3"><span> </span> <span> </span> <!> <span class="text-[10px] text-surface-500"></span> <span class="text-[10px] text-surface-500"> </span> <span class="text-[10px] text-surface-500 ml-auto"> </span></div> <!></div>'), V0 = /* @__PURE__ */ u('<div><h3 class="text-[10px] text-surface-400 uppercase tracking-wider mb-3">Decided (recent)</h3> <div class="space-y-2"></div></div>'), G0 = /* @__PURE__ */ u('<div class="flex flex-col h-full overflow-hidden"><div class="border-b border-surface-600 bg-surface-800/50 px-5 py-3 shrink-0"><div class="flex items-center gap-3"><h2 class="text-sm font-semibold text-surface-100">Gates</h2> <!></div></div> <div class="flex-1 overflow-y-auto p-5 space-y-6"><div><h3 class="text-[10px] text-surface-400 uppercase tracking-wider mb-3 flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span> Pending</h3> <!></div> <!></div></div>');
function jo(e, t) {
  bt(t, !0);
  const a = () => Ee(ho, "$agentSessions", l), n = () => Ee(St, "$activeVenture", l), c = () => Ee(Aa, "$pendingGates", l), [l, f] = Nt();
  let v = /* @__PURE__ */ ve(null), p = /* @__PURE__ */ ve(null), h = /* @__PURE__ */ ve("");
  const b = /* @__PURE__ */ we(() => a().filter((M) => M.status === "gate_passed" || M.status === "gate_rejected").sort((M, z) => (z.completed_at ?? 0) - (M.completed_at ?? 0)).slice(0, 10));
  function $(M) {
    switch (M) {
      case "visionary":
        return "VISION GATE";
      case "explorer":
        return "BOUNDARY GATE";
      case "stormer":
        return "DESIGN GATE";
      case "reviewer":
        return "REVIEW GATE";
      case "architect":
        return "ARCHITECTURE GATE";
      case "tester":
        return "TEST GATE";
      default:
        return `${er[M]?.label?.toUpperCase() ?? M.toUpperCase()} GATE`;
    }
  }
  function w(M) {
    if (!M) return "";
    const z = Math.floor((Date.now() - M) / 1e3);
    if (z < 5) return "just now";
    if (z < 60) return `${z}s ago`;
    const W = Math.floor(z / 60);
    return W < 60 ? `${W}m ago` : `${Math.floor(W / 60)}h ago`;
  }
  function F(M) {
    if (M.gate_output) {
      const z = M.gate_output.split(`
`).filter((W) => W.trim());
      if (z.length > 0) return z[0].slice(0, 120);
    }
    if (M.output) {
      const z = M.output.split(`
`).filter((W) => W.trim());
      if (z.length > 0) return z[0].slice(0, 120);
    }
    return "Awaiting review";
  }
  async function D(M) {
    const z = n()?.venture_id;
    z && await go(z, M.role, M.session_id);
  }
  async function te(M) {
    const z = n()?.venture_id;
    !z || !r(h).trim() || (await bo(z, M.role, M.session_id, r(h).trim()), _(h, ""), _(p, null));
  }
  var P = G0(), q = i(P), ue = i(q), Ce = o(i(ue), 2);
  {
    var ge = (M) => {
      var z = A0(), W = i(z);
      s(z), g(() => x(W, `${c().length ?? ""} pending`)), d(M, z);
    };
    A(Ce, (M) => {
      c().length > 0 && M(ge);
    });
  }
  s(ue), s(q);
  var fe = o(q, 2), ie = i(fe), Fe = o(i(ie), 2);
  {
    var Pe = (M) => {
      var z = D0();
      d(M, z);
    }, Ie = (M) => {
      var z = O0();
      He(z, 5, c, (W) => W.session_id, (W, N) => {
        const I = /* @__PURE__ */ we(() => r(v) === r(N).session_id), B = /* @__PURE__ */ we(() => r(p) === r(N).session_id);
        var $e = L0(), je = i($e);
        je.__click = () => {
          _(v, r(I) ? null : r(N).session_id, !0);
        };
        var qe = i(je), Ve = i(qe);
        Ve.textContent = "●";
        var Se = o(Ve, 2), Ne = i(Se, !0);
        s(Se);
        var be = o(Se, 2);
        {
          var K = (V) => {
            var O = P0(), J = it(O);
            J.textContent = "·";
            var Te = o(J, 2), Oe = i(Te, !0);
            s(Te), g(() => x(Oe, r(N).division_id)), d(V, O);
          };
          A(be, (V) => {
            r(N).division_id && V(K);
          });
        }
        var k = o(be, 2);
        k.textContent = "·";
        var E = o(k, 2), j = i(E, !0);
        s(E);
        var T = o(E, 2), re = i(T, !0);
        s(T);
        var Le = o(T, 2), S = i(Le, !0);
        s(Le), s(qe);
        var C = o(qe, 2), H = i(C, !0);
        s(C), s(je);
        var oe = o(je, 2);
        {
          var Be = (V) => {
            var O = N0(), J = i(O);
            {
              var Te = (L) => {
                var U = T0(), Y = i(U), xe = i(Y, !0);
                s(Y), s(U), g(() => x(xe, r(N).gate_output || r(N).output)), d(L, U);
              };
              A(J, (L) => {
                (r(N).gate_output || r(N).output) && L(Te);
              });
            }
            var Oe = o(J, 2), Ke = i(Oe), Qe = i(Ke);
            s(Ke);
            var tt = o(Ke, 2);
            {
              var Ye = (L) => {
                var U = R0(), Y = i(U);
                s(U), g((xe) => x(Y, `Started: ${xe ?? ""}`), [() => new Date(r(N).started_at).toLocaleTimeString()]), d(L, U);
              };
              A(tt, (L) => {
                r(N).started_at && L(Ye);
              });
            }
            s(Oe);
            var at = o(Oe, 2);
            {
              var ze = (L) => {
                var U = I0(), Y = i(U);
                Ca(Y);
                var xe = o(Y, 2), se = i(xe);
                se.__click = () => te(r(N));
                var pe = o(se, 2);
                pe.__click = () => {
                  _(p, null);
                }, s(xe), s(U), g(
                  (Me, Je) => {
                    se.disabled = Me, Re(se, 1, `px-3 py-1.5 rounded text-xs transition-colors
														${Je ?? ""}`);
                  },
                  [
                    () => !r(h).trim(),
                    () => r(h).trim() ? "bg-health-err/20 text-health-err hover:bg-health-err/30" : "bg-surface-700 text-surface-500 cursor-not-allowed"
                  ]
                ), xt(Y, () => r(h), (Me) => _(h, Me)), d(L, U);
              }, We = (L) => {
                var U = M0(), Y = i(U);
                Y.__click = () => D(r(N)), Y.textContent = "✓ Pass Gate";
                var xe = o(Y, 2);
                xe.__click = () => {
                  _(p, r(N).session_id, !0);
                }, xe.textContent = "✕ Reject", s(U), d(L, U);
              };
              A(at, (L) => {
                r(B) ? L(ze) : L(We, !1);
              });
            }
            s(O), g((L, U) => x(Qe, `Tokens: ${L ?? ""} in / ${U ?? ""} out`), [
              () => r(N).tokens_in.toLocaleString(),
              () => r(N).tokens_out.toLocaleString()
            ]), d(V, O);
          };
          A(oe, (V) => {
            r(I) && V(Be);
          });
        }
        s($e), g(
          (V, O, J) => {
            x(Ne, V), x(j, er[r(N).role]?.label ?? r(N).role), x(re, O), x(S, r(I) ? "▼" : "▶"), x(H, J);
          },
          [
            () => $(r(N).role),
            () => w(r(N).started_at),
            () => F(r(N))
          ]
        ), d(W, $e);
      }), s(z), d(M, z);
    };
    A(Fe, (M) => {
      c().length === 0 ? M(Pe) : M(Ie, !1);
    });
  }
  s(ie);
  var ce = o(ie, 2);
  {
    var G = (M) => {
      var z = V0(), W = o(i(z), 2);
      He(W, 21, () => r(b), (N) => N.session_id, (N, I) => {
        const B = /* @__PURE__ */ we(() => r(I).status === "gate_passed");
        var $e = B0(), je = i($e), qe = i(je), Ve = i(qe, !0);
        s(qe);
        var Se = o(qe, 2), Ne = i(Se, !0);
        s(Se);
        var be = o(Se, 2);
        {
          var K = (C) => {
            var H = F0(), oe = it(H);
            oe.textContent = "·";
            var Be = o(oe, 2), V = i(Be, !0);
            s(Be), g(() => x(V, r(I).division_id)), d(C, H);
          };
          A(be, (C) => {
            r(I).division_id && C(K);
          });
        }
        var k = o(be, 2);
        k.textContent = "·";
        var E = o(k, 2), j = i(E, !0);
        s(E);
        var T = o(E, 2), re = i(T, !0);
        s(T), s(je);
        var Le = o(je, 2);
        {
          var S = (C) => {
            var H = j0(), oe = i(H);
            s(H), g(() => x(oe, `${r(B) ? "Passed with feedback" : "Rejected"}: "${r(I).error ?? ""}"`)), d(C, H);
          };
          A(Le, (C) => {
            r(I).error && C(S);
          });
        }
        s($e), g(
          (C, H) => {
            Re(qe, 1, `text-[10px] ${r(B) ? "text-health-ok" : "text-health-err"}`), x(Ve, r(B) ? "✓" : "✕"), Re(Se, 1, `text-xs font-medium ${r(B) ? "text-health-ok/80" : "text-health-err/80"}`), x(Ne, C), x(j, er[r(I).role]?.label ?? r(I).role), x(re, H);
          },
          [
            () => $(r(I).role),
            () => w(r(I).completed_at)
          ]
        ), d(N, $e);
      }), s(W), s(z), d(M, z);
    };
    A(ce, (M) => {
      r(b).length > 0 && M(G);
    });
  }
  s(fe), s(P), d(e, P), mt(), f();
}
At(["click"]);
kt(jo, {}, [], [], { mode: "open" });
var q0 = /* @__PURE__ */ u('<div class="text-center py-8 text-surface-500 text-xs">No divisions identified yet</div>'), H0 = /* @__PURE__ */ u("<span></span>"), z0 = /* @__PURE__ */ u('<div class="flex items-center gap-1.5 text-[9px]"><span></span> <span class="text-surface-300 truncate"> </span></div>'), U0 = /* @__PURE__ */ u('<div class="text-[9px] text-surface-500">idle</div>'), W0 = /* @__PURE__ */ u(`<button class="group text-left p-3 rounded-lg border border-surface-600
								bg-surface-800/60 hover:border-hecate-500/50 hover:bg-hecate-600/5
								transition-all"><div class="text-xs font-medium text-surface-100 truncate mb-2"> </div> <div class="flex items-center gap-1.5 mb-2"></div> <!></button>`), Y0 = /* @__PURE__ */ u('<div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"></div>'), K0 = /* @__PURE__ */ u('<div class="flex items-center gap-3"><span class="text-[10px] text-surface-300 w-16 text-right shrink-0"> </span> <div class="flex-1 h-2 bg-surface-700 rounded-full overflow-hidden"><div></div></div> <span class="text-[10px] text-surface-400 w-10 shrink-0 tabular-nums"> </span></div>'), J0 = /* @__PURE__ */ u('<div><h3 class="text-[10px] text-surface-400 uppercase tracking-wider mb-3">Progress</h3> <div class="space-y-2.5"></div></div>'), Q0 = /* @__PURE__ */ u('<div class="text-center py-6 text-surface-500 text-xs">No agents currently active</div>'), X0 = /* @__PURE__ */ u('<span class="text-[9px] text-surface-500 tabular-nums shrink-0"> </span>'), Z0 = /* @__PURE__ */ u('<div class="flex items-center gap-3 px-3 py-2 rounded-lg bg-surface-800/40 border border-surface-700/50"><span></span> <span class="text-xs text-surface-200 font-medium w-20 shrink-0"> </span> <span class="text-[10px] text-surface-400 flex-1 truncate"><!></span> <!></div>'), ex = /* @__PURE__ */ u('<div class="space-y-2"></div>'), tx = /* @__PURE__ */ u("<span> </span>"), rx = /* @__PURE__ */ u("<span> </span>"), ax = /* @__PURE__ */ u('<div class="flex items-center gap-4 mt-3 text-[9px] text-surface-500"><!> <!></div>'), sx = /* @__PURE__ */ u('<div class="flex flex-col h-full overflow-hidden"><div class="border-b border-surface-600 bg-surface-800/50 px-5 py-3 shrink-0"><h2 class="text-sm font-semibold text-surface-100">Venture Overview</h2></div> <div class="flex-1 overflow-y-auto p-5 space-y-6"><div><h3 class="text-[10px] text-surface-400 uppercase tracking-wider mb-3">Divisions</h3> <!></div> <!> <div><h3 class="text-[10px] text-surface-400 uppercase tracking-wider mb-3">Agent Activity</h3> <!> <!></div></div></div>');
function Bo(e, t) {
  bt(t, !0);
  const a = () => Ee(ca, "$agentRoleStatuses", c), n = () => Ee(Ur, "$divisions", c), [c, l] = Nt();
  let f = pt(t, "onSelectDivision", 7);
  function v(W) {
    return Ir.map((N) => {
      const I = W.length, B = W.filter((qe) => {
        const Ve = pa(qe, N.code);
        return Ve === "concluded" || Ve === "completed" || Ve === "submitted";
      }).length, $e = W.filter((qe) => {
        const Ve = pa(qe, N.code);
        return Ve === "open" || Ve === "active" || Ve === "initiated";
      }).length, je = B + $e * 0.5;
      return {
        code: N.code,
        name: N.shortName,
        completed: B,
        total: I,
        percent: I > 0 ? Math.round(je / I * 100) : 0
      };
    });
  }
  function p(W, N) {
    const I = pa(W, N);
    return !I || I === "pending" ? { css: "bg-surface-600", label: "Not started" } : I === "concluded" || I === "completed" || I === "submitted" ? { css: "bg-health-ok", label: "Complete" } : I === "shelved" ? { css: "bg-amber-400", label: "Shelved" } : I === "open" || I === "active" || I === "initiated" ? { css: "bg-hecate-400", label: "In progress" } : { css: "bg-surface-500", label: I };
  }
  function h(W) {
    return a().find((N) => (N.status === "running" || N.status === "gate_pending") && N.active_session?.division_id === W) ?? null;
  }
  function b() {
    return a().filter((W) => W.status === "running" || W.status === "gate_pending");
  }
  const $ = /* @__PURE__ */ we(() => v(n())), w = /* @__PURE__ */ we(b);
  var F = {
    get onSelectDivision() {
      return f();
    },
    set onSelectDivision(W) {
      f(W), ut();
    }
  }, D = sx(), te = o(i(D), 2), P = i(te), q = o(i(P), 2);
  {
    var ue = (W) => {
      var N = q0();
      d(W, N);
    }, Ce = (W) => {
      var N = Y0();
      He(N, 5, n, (I) => I.division_id, (I, B) => {
        const $e = /* @__PURE__ */ we(() => h(r(B).division_id));
        var je = W0();
        je.__click = () => {
          xa.set(r(B).division_id), f()?.(r(B).division_id);
        };
        var qe = i(je), Ve = i(qe, !0);
        s(qe);
        var Se = o(qe, 2);
        He(Se, 21, () => Ir, ct, (k, E) => {
          const j = /* @__PURE__ */ we(() => p(r(B), r(E).code));
          var T = H0();
          g(() => {
            Re(T, 1, `w-2 h-2 rounded-full ${r(j).css ?? ""}`), Mt(T, "title", `${r(E).shortName ?? ""}: ${r(j).label ?? ""}`);
          }), d(k, T);
        }), s(Se);
        var Ne = o(Se, 2);
        {
          var be = (k) => {
            var E = z0(), j = i(E), T = o(j, 2), re = i(T, !0);
            s(T), s(E), g(() => {
              Re(j, 1, `w-1.5 h-1.5 rounded-full ${r($e).status === "gate_pending" ? "bg-amber-400 animate-pulse" : "bg-hecate-400 animate-pulse"}`), x(re, er[r($e).role]?.label ?? r($e).role);
            }), d(k, E);
          }, K = (k) => {
            var E = U0();
            d(k, E);
          };
          A(Ne, (k) => {
            r($e) ? k(be) : k(K, !1);
          });
        }
        s(je), g(() => x(Ve, r(B).context_name)), d(I, je);
      }), s(N), d(W, N);
    };
    A(q, (W) => {
      n().length === 0 ? W(ue) : W(Ce, !1);
    });
  }
  s(P);
  var ge = o(P, 2);
  {
    var fe = (W) => {
      var N = J0(), I = o(i(N), 2);
      He(I, 21, () => r($), ct, (B, $e) => {
        var je = K0(), qe = i(je), Ve = i(qe, !0);
        s(qe);
        var Se = o(qe, 2), Ne = i(Se);
        s(Se);
        var be = o(Se, 2), K = i(be);
        s(be), s(je), g(() => {
          x(Ve, r($e).name), Re(Ne, 1, `h-full rounded-full transition-all duration-500
										${r($e).code === "storming" ? "bg-orange-400/70" : r($e).code === "planning" ? "bg-blue-400/70" : r($e).code === "kanban" ? "bg-emerald-400/70" : "bg-purple-400/70"}`), dr(Ne, `width: ${r($e).percent ?? ""}%`), x(K, `${r($e).percent ?? ""}%`);
        }), d(B, je);
      }), s(I), s(N), d(W, N);
    };
    A(ge, (W) => {
      n().length > 0 && W(fe);
    });
  }
  var ie = o(ge, 2), Fe = o(i(ie), 2);
  {
    var Pe = (W) => {
      var N = Q0();
      d(W, N);
    }, Ie = (W) => {
      var N = ex();
      He(N, 21, () => r(w), ct, (I, B) => {
        var $e = Z0(), je = i($e), qe = o(je, 2), Ve = i(qe, !0);
        s(qe);
        var Se = o(qe, 2), Ne = i(Se);
        {
          var be = (T) => {
            var re = As("waiting for gate decision");
            d(T, re);
          }, K = (T) => {
            var re = As();
            g(() => x(re, `working on "${r(B).active_session.division_id ?? ""}"`)), d(T, re);
          }, k = (T) => {
            var re = As("running");
            d(T, re);
          };
          A(Ne, (T) => {
            r(B).status === "gate_pending" ? T(be) : r(B).active_session?.division_id ? T(K, 1) : T(k, !1);
          });
        }
        s(Se);
        var E = o(Se, 2);
        {
          var j = (T) => {
            var re = X0(), Le = i(re);
            s(re), g((S, C) => x(Le, `${S ?? ""}+${C ?? ""} tok`), [
              () => r(B).active_session.tokens_in.toLocaleString(),
              () => r(B).active_session.tokens_out.toLocaleString()
            ]), d(T, re);
          };
          A(E, (T) => {
            r(B).active_session && T(j);
          });
        }
        s($e), g(() => {
          Re(je, 1, `w-2 h-2 rounded-full shrink-0
								${r(B).status === "gate_pending" ? "bg-amber-400 animate-pulse" : "bg-hecate-400 animate-pulse"}`), x(Ve, er[r(B).role]?.label ?? r(B).role);
        }), d(I, $e);
      }), s(N), d(W, N);
    };
    A(Fe, (W) => {
      r(w).length === 0 ? W(Pe) : W(Ie, !1);
    });
  }
  var ce = o(Fe, 2);
  {
    var G = (W) => {
      var N = ax(), I = i(N);
      {
        var B = (Se) => {
          var Ne = tx(), be = i(Ne);
          s(Ne), g((K) => x(be, `${K ?? ""} completed`), [
            () => a().filter((K) => K.status === "completed").length
          ]), d(Se, Ne);
        }, $e = /* @__PURE__ */ we(() => a().filter((Se) => Se.status === "completed").length > 0);
        A(I, (Se) => {
          r($e) && Se(B);
        });
      }
      var je = o(I, 2);
      {
        var qe = (Se) => {
          var Ne = rx(), be = i(Ne);
          s(Ne), g((K) => x(be, `${K ?? ""} idle`), [
            () => a().filter((K) => K.status === "idle").length
          ]), d(Se, Ne);
        }, Ve = /* @__PURE__ */ we(() => a().filter((Se) => Se.status === "idle").length > 0);
        A(je, (Se) => {
          r(Ve) && Se(qe);
        });
      }
      s(N), d(W, N);
    }, M = /* @__PURE__ */ we(() => a().filter((W) => W.status === "idle").length > 0 || a().filter((W) => W.status === "completed").length > 0);
    A(ce, (W) => {
      r(M) && W(G);
    });
  }
  s(ie), s(te), s(D), d(e, D);
  var z = mt(F);
  return l(), z;
}
At(["click"]);
kt(Bo, { onSelectDivision: {} }, [], [], { mode: "open" });
var nx = /* @__PURE__ */ u('<div class="flex items-center justify-center h-full"><div class="text-center text-surface-400"><div class="text-2xl mb-2 animate-pulse"></div> <div class="text-sm">Loading venture...</div></div></div>'), ix = /* @__PURE__ */ u('<div class="text-[11px] text-health-err bg-health-err/10 rounded px-3 py-2"> </div>'), ox = /* @__PURE__ */ u(`<div class="rounded-xl border border-hecate-600/30 bg-surface-800/80 p-5 space-y-4"><h3 class="text-xs font-medium text-hecate-300 uppercase tracking-wider">New Venture</h3> <div class="grid grid-cols-[1fr_2fr] gap-4"><div><label for="venture-name" class="text-[11px] text-surface-300 block mb-1.5">Name</label> <input id="venture-name" placeholder="e.g., my-saas-app" class="w-full bg-surface-700 border border-surface-600 rounded-lg
										px-3 py-2 text-sm text-surface-100 placeholder-surface-500
										focus:outline-none focus:border-hecate-500"/></div> <div><label for="venture-brief" class="text-[11px] text-surface-300 block mb-1.5">Brief (optional)</label> <input id="venture-brief" placeholder="What does this venture aim to achieve?" class="w-full bg-surface-700 border border-surface-600 rounded-lg
										px-3 py-2 text-sm text-surface-100 placeholder-surface-500
										focus:outline-none focus:border-hecate-500"/></div></div> <!> <div class="flex gap-3"><button> </button> <button class="px-4 py-2 rounded-lg text-xs text-hecate-400 border border-hecate-600/30
									hover:bg-hecate-600/10 transition-colors"></button></div></div>`), cx = /* @__PURE__ */ u(`<div class="flex flex-col items-center justify-center py-20 text-center"><div class="text-4xl mb-4 text-hecate-400"></div> <h2 class="text-lg font-semibold text-surface-100 mb-2">No Ventures Yet</h2> <p class="text-xs text-surface-400 leading-relaxed max-w-sm mb-6">A venture is the umbrella for your software endeavor. It houses
							divisions (bounded contexts) and guides them through the development
							lifecycle.</p> <button class="px-5 py-2.5 rounded-lg text-sm font-medium bg-hecate-600 text-surface-50
								hover:bg-hecate-500 transition-colors">+ Create Your First Venture</button></div>`), lx = /* @__PURE__ */ u('<div class="text-[11px] text-surface-400 truncate mt-1.5 ml-5"> </div>'), dx = /* @__PURE__ */ u(`<button class="group text-left p-4 rounded-xl bg-surface-800/80 border border-surface-600
												hover:border-hecate-500 hover:bg-hecate-600/5 transition-all"><div class="flex items-center gap-2"><span class="text-hecate-400 group-hover:text-hecate-300"></span> <span class="font-medium text-sm text-surface-100 truncate"> </span> <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-surface-700 text-surface-300 border border-surface-600 shrink-0"> </span></div> <!></button>`), ux = /* @__PURE__ */ u('<div><h3 class="text-[11px] text-surface-400 uppercase tracking-wider mb-3">Recently Updated</h3> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"></div></div>'), vx = /* @__PURE__ */ u('<div class="text-[11px] text-surface-500 truncate mt-1.5 ml-5"> </div>'), fx = /* @__PURE__ */ u(`<button class="group text-left p-4 rounded-xl bg-surface-800/40 border border-surface-700
													hover:border-surface-500 transition-all opacity-60 hover:opacity-80"><div class="flex items-center gap-2"><span class="text-surface-500"></span> <span class="font-medium text-sm text-surface-300 truncate"> </span> <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-surface-700 text-surface-400 border border-surface-600 shrink-0">Archived</span></div> <!></button>`), px = /* @__PURE__ */ u('<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"></div>'), xx = /* @__PURE__ */ u(`<div><button class="flex items-center gap-2 text-[11px] text-surface-500 uppercase tracking-wider
										hover:text-surface-300 transition-colors mb-3"><span class="text-[9px]"> </span> <span class="text-surface-600"> </span></button> <!></div>`), _x = /* @__PURE__ */ u('<div class="text-[11px] text-surface-400 truncate mt-1.5 ml-5"> </div>'), hx = /* @__PURE__ */ u(`<button class="group text-left p-4 rounded-xl bg-surface-800/80 border border-surface-600
												hover:border-hecate-500 hover:bg-hecate-600/5 transition-all"><div class="flex items-center gap-2"><span class="text-hecate-400 group-hover:text-hecate-300"></span> <span class="font-medium text-sm text-surface-100 truncate"> </span> <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-surface-700 text-surface-300 border border-surface-600 shrink-0"> </span></div> <!></button>`), gx = /* @__PURE__ */ u('<div><h3 class="text-[11px] text-surface-400 uppercase tracking-wider mb-3"> </h3> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"></div></div>'), bx = /* @__PURE__ */ u('<div class="text-center py-12 text-surface-400 text-sm"> </div>'), mx = /* @__PURE__ */ u("<!>  <!> <!>", 1), yx = /* @__PURE__ */ u('<div class="absolute top-0 right-0 bottom-0 z-10"><!></div>'), wx = /* @__PURE__ */ u(
  `<div class="flex flex-col h-full overflow-hidden"><div class="border-b border-surface-600 bg-surface-800/50 px-4 py-3 shrink-0"><div class="flex items-center gap-3"><span class="text-hecate-400 text-lg"></span> <h1 class="text-sm font-semibold text-surface-100">Ventures</h1> <div class="flex items-center gap-1.5 text-[10px]"><span></span> <span class="text-surface-500"> </span></div> <!> <div class="flex-1"></div> <input placeholder="Search ventures..." class="w-48 bg-surface-700 border border-surface-600 rounded-lg
							px-3 py-1.5 text-xs text-surface-100 placeholder-surface-500
							focus:outline-none focus:border-hecate-500"/> <button> </button></div></div> <div class="flex-1 overflow-y-auto p-4 space-y-6"><!> <!></div></div> <!>`,
  1
), $x = /* @__PURE__ */ u(`<button class="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300
						border border-amber-500/30 animate-pulse hover:bg-amber-500/30 transition-colors"> </button>`), kx = /* @__PURE__ */ u('<!> <div class="flex-1 overflow-y-auto"><!></div>', 1), Cx = /* @__PURE__ */ u('<div class="w-80 border-l border-surface-600 overflow-hidden shrink-0"><!></div>'), Sx = /* @__PURE__ */ u('<div class="flex h-full"><div class="flex-1 overflow-hidden"><!></div> <!></div>'), Ex = /* @__PURE__ */ u('<div class="w-80 border-l border-surface-600 overflow-hidden shrink-0"><!></div>'), Ax = /* @__PURE__ */ u('<div class="flex h-full"><div class="flex-1 overflow-hidden"><!></div> <!></div>'), Dx = /* @__PURE__ */ u('<!> <div class="absolute top-2 right-2 flex items-center gap-2 text-[10px] z-10"><!> <button title="Gate Inbox">Gates</button> <button title="Agent Pipeline">Agents</button> <span class="flex items-center gap-1.5"><span></span> <span class="text-surface-500"> </span></span></div> <div class="flex flex-1 overflow-hidden relative"><!> <div class="flex-1 flex flex-col overflow-hidden"><div class="flex-1 flex flex-col overflow-hidden"><!></div> <!></div> <!></div>', 1), Px = /* @__PURE__ */ u('<div class="flex flex-col h-full"><!></div>');
function Tx(e, t) {
  bt(t, !0);
  const a = () => Ee(Et, "$isLoading", q), n = () => Ee(St, "$activeVenture", q), c = () => Ee(pr, "$sseStatus", q), l = () => Ee(kn, "$aiModel", q), f = () => Ee(br, "$ventureError", q), v = () => Ee(wa, "$ventures", q), p = () => Ee(mn, "$showAIAssist", q), h = () => Ee(Ql, "$hasPendingGates", q), b = () => Ee(Aa, "$pendingGates", q), $ = () => Ee(Ur, "$divisions", q), w = () => Ee(Yr, "$selectedDivision", q), F = () => Ee(qa, "$selectedPhase", q), D = () => Ee(bs, "$ventureStep", q), te = () => Ee(sa, "$bigPicturePhase", q), P = () => Ee(Ys, "$showEventStream", q), [q, ue] = Nt();
  let Ce = pt(t, "api", 7), ge = /* @__PURE__ */ ve(null), fe, ie = /* @__PURE__ */ ve(""), Fe = /* @__PURE__ */ ve(""), Pe = /* @__PURE__ */ ve(""), Ie = /* @__PURE__ */ ve(!1), ce = /* @__PURE__ */ ve(!1), G = /* @__PURE__ */ ve(!1), M = /* @__PURE__ */ ve(!1), z;
  function W(K, k) {
    let E = K;
    if (k.trim()) {
      const C = k.toLowerCase();
      E = K.filter((H) => H.name.toLowerCase().includes(C) || H.brief && H.brief.toLowerCase().includes(C));
    }
    const j = [], T = [], re = [], Le = [];
    for (const C of E)
      Br(C.status, Fa) ? Le.push(C) : Br(C.status, eo) || Br(C.status, to) ? T.push(C) : C.phase === "initiated" || C.phase === "vision_refined" || C.phase === "vision_submitted" ? j.push(C) : C.phase === "discovery_completed" || C.phase === "designing" || C.phase === "planning" || C.phase === "crafting" || C.phase === "deploying" ? re.push(C) : j.push(C);
    const S = [];
    return j.length > 0 && S.push({ label: "Setup", ventures: j }), T.length > 0 && S.push({ label: "Discovery", ventures: T }), re.length > 0 && S.push({ label: "Building", ventures: re }), Le.length > 0 && S.push({ label: "Archived", ventures: Le }), S;
  }
  function N(K) {
    return K.filter((k) => !Br(k.status, Fa)).sort((k, E) => (E.updated_at ?? "").localeCompare(k.updated_at ?? "")).slice(0, 5);
  }
  async function I() {
    try {
      _(ge, await Ce().get("/health"), !0);
    } catch {
      _(ge, null);
    }
  }
  Ji(async () => {
    vl(Ce()), I(), fe = setInterval(I, 3e4), kr(), ms();
    const K = await fl();
    wn.set(K), yo(), z = fd();
  }), Yc(() => {
    fe && clearInterval(fe), dd(), z && z();
  });
  async function B() {
    if (!r(ie).trim()) return;
    await lo(r(ie).trim(), r(Fe).trim() || "") && (_(ie, ""), _(Fe, ""), _(Ie, !1));
  }
  var $e = {
    get api() {
      return Ce();
    },
    set api(K) {
      Ce(K), ut();
    }
  }, je = Px(), qe = i(je);
  {
    var Ve = (K) => {
      var k = nx(), E = i(k), j = i(E);
      j.textContent = "◆", Dt(2), s(E), s(k), d(K, k);
    }, Se = (K) => {
      var k = wx(), E = it(k), j = i(E), T = i(j), re = i(T);
      re.textContent = "◆";
      var Le = o(re, 4), S = i(Le), C = o(S, 2), H = i(C, !0);
      s(C), s(Le);
      var oe = o(Le, 2);
      $s(oe, {
        get currentModel() {
          return l();
        },
        onSelect: (ze) => Cn(ze)
      });
      var Be = o(oe, 4);
      wt(Be);
      var V = o(Be, 2);
      V.__click = () => _(Ie, !r(Ie));
      var O = i(V, !0);
      s(V), s(T), s(j);
      var J = o(j, 2), Te = i(J);
      {
        var Oe = (ze) => {
          var We = ox(), L = o(i(We), 2), U = i(L), Y = o(i(U), 2);
          wt(Y), s(U);
          var xe = o(U, 2), se = o(i(xe), 2);
          wt(se), s(xe), s(L);
          var pe = o(L, 2);
          {
            var Me = (R) => {
              var ae = ix(), he = i(ae, !0);
              s(ae), g(() => x(he, f())), d(R, ae);
            };
            A(pe, (R) => {
              f() && R(Me);
            });
          }
          var Je = o(pe, 2), m = i(Je);
          m.__click = B;
          var y = i(m, !0);
          s(m);
          var de = o(m, 2);
          de.__click = () => Er("Help me define a new venture. What should I consider? Ask me about the problem domain, target users, and core functionality."), de.textContent = "✦ AI Help", s(Je), s(We), g(
            (R, ae) => {
              m.disabled = R, Re(m, 1, `px-4 py-2 rounded-lg text-xs font-medium transition-colors
									${ae ?? ""}`), x(y, a() ? "Initiating..." : "Initiate Venture");
            },
            [
              () => !r(ie).trim() || a(),
              () => !r(ie).trim() || a() ? "bg-surface-600 text-surface-400 cursor-not-allowed" : "bg-hecate-600 text-surface-50 hover:bg-hecate-500"
            ]
          ), xt(Y, () => r(ie), (R) => _(ie, R)), xt(se, () => r(Fe), (R) => _(Fe, R)), d(ze, We);
        };
        A(Te, (ze) => {
          r(Ie) && ze(Oe);
        });
      }
      var Ke = o(Te, 2);
      {
        var Qe = (ze) => {
          var We = cx(), L = i(We);
          L.textContent = "◆";
          var U = o(L, 6);
          U.__click = () => _(Ie, !0), s(We), d(ze, We);
        }, tt = (ze) => {
          const We = /* @__PURE__ */ we(() => W(v(), r(Pe)));
          var L = mx(), U = it(L);
          {
            var Y = (m) => {
              const y = /* @__PURE__ */ we(() => N(v()));
              var de = or(), R = it(de);
              {
                var ae = (he) => {
                  var Ae = ux(), ne = o(i(Ae), 2);
                  He(ne, 21, () => r(y), ct, (X, Z) => {
                    var _e = dx();
                    _e.__click = () => ja(r(Z));
                    var ke = i(_e), me = i(ke);
                    me.textContent = "◆";
                    var le = o(me, 2), ee = i(le, !0);
                    s(le);
                    var Q = o(le, 2), ye = i(Q, !0);
                    s(Q), s(ke);
                    var De = o(ke, 2);
                    {
                      var Ge = (Ue) => {
                        var Xe = lx(), rt = i(Xe, !0);
                        s(Xe), g(() => x(rt, r(Z).brief)), d(Ue, Xe);
                      };
                      A(De, (Ue) => {
                        r(Z).brief && Ue(Ge);
                      });
                    }
                    s(_e), g(() => {
                      x(ee, r(Z).name), x(ye, r(Z).status_label ?? r(Z).phase);
                    }), d(X, _e);
                  }), s(ne), s(Ae), d(he, Ae);
                };
                A(R, (he) => {
                  r(y).length > 0 && he(ae);
                });
              }
              d(m, de);
            }, xe = /* @__PURE__ */ we(() => !r(Pe).trim() && v().filter((m) => !Br(m.status, Fa)).length > 3);
            A(U, (m) => {
              r(xe) && m(Y);
            });
          }
          var se = o(U, 2);
          He(se, 17, () => r(We), ct, (m, y) => {
            var de = or(), R = it(de);
            {
              var ae = (Ae) => {
                var ne = xx(), X = i(ne);
                X.__click = () => _(ce, !r(ce));
                var Z = i(X), _e = i(Z, !0);
                s(Z);
                var ke = o(Z), me = o(ke), le = i(me);
                s(me), s(X);
                var ee = o(X, 2);
                {
                  var Q = (ye) => {
                    var De = px();
                    He(De, 21, () => r(y).ventures, ct, (Ge, Ue) => {
                      var Xe = fx();
                      Xe.__click = () => ja(r(Ue));
                      var rt = i(Xe), st = i(rt);
                      st.textContent = "◆";
                      var nt = o(st, 2), yt = i(nt, !0);
                      s(nt), Dt(2), s(rt);
                      var _t = o(rt, 2);
                      {
                        var Ht = (zt) => {
                          var ht = vx(), Lt = i(ht, !0);
                          s(ht), g(() => x(Lt, r(Ue).brief)), d(zt, ht);
                        };
                        A(_t, (zt) => {
                          r(Ue).brief && zt(Ht);
                        });
                      }
                      s(Xe), g(() => x(yt, r(Ue).name)), d(Ge, Xe);
                    }), s(De), d(ye, De);
                  };
                  A(ee, (ye) => {
                    r(ce) && ye(Q);
                  });
                }
                s(ne), g(() => {
                  x(_e, r(ce) ? "▼" : "▶"), x(ke, ` ${r(y).label ?? ""} `), x(le, `(${r(y).ventures.length ?? ""})`);
                }), d(Ae, ne);
              }, he = (Ae) => {
                var ne = gx(), X = i(ne), Z = i(X, !0);
                s(X);
                var _e = o(X, 2);
                He(_e, 21, () => r(y).ventures, ct, (ke, me) => {
                  var le = hx();
                  le.__click = () => ja(r(me));
                  var ee = i(le), Q = i(ee);
                  Q.textContent = "◆";
                  var ye = o(Q, 2), De = i(ye, !0);
                  s(ye);
                  var Ge = o(ye, 2), Ue = i(Ge, !0);
                  s(Ge), s(ee);
                  var Xe = o(ee, 2);
                  {
                    var rt = (st) => {
                      var nt = _x(), yt = i(nt, !0);
                      s(nt), g(() => x(yt, r(me).brief)), d(st, nt);
                    };
                    A(Xe, (st) => {
                      r(me).brief && st(rt);
                    });
                  }
                  s(le), g(() => {
                    x(De, r(me).name), x(Ue, r(me).status_label ?? r(me).phase);
                  }), d(ke, le);
                }), s(_e), s(ne), g(() => x(Z, r(y).label)), d(Ae, ne);
              };
              A(R, (Ae) => {
                r(y).label === "Archived" ? Ae(ae) : Ae(he, !1);
              });
            }
            d(m, de);
          });
          var pe = o(se, 2);
          {
            var Me = (m) => {
              var y = bx(), de = i(y);
              s(y), g(() => x(de, `No ventures matching "${r(Pe) ?? ""}"`)), d(m, y);
            }, Je = /* @__PURE__ */ we(() => r(We).length === 0 && r(Pe).trim());
            A(pe, (m) => {
              r(Je) && m(Me);
            });
          }
          d(ze, L);
        };
        A(Ke, (ze) => {
          v().length === 0 && !r(Ie) ? ze(Qe) : ze(tt, !1);
        });
      }
      s(J), s(E);
      var Ye = o(E, 2);
      {
        var at = (ze) => {
          var We = yx(), L = i(We);
          rn(L, {}), s(We), d(ze, We);
        };
        A(Ye, (ze) => {
          p() && ze(at);
        });
      }
      g(() => {
        Re(S, 1, `inline-block w-1.5 h-1.5 rounded-full ${c() === "connected" ? "bg-success-400" : c() === "connecting" ? "bg-yellow-400 animate-pulse" : "bg-danger-400"}`), x(H, c() === "connected" ? `v${r(ge)?.version ?? "?"}` : c()), Re(V, 1, `px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
							${r(Ie) ? "bg-surface-600 text-surface-300" : "bg-hecate-600 text-surface-50 hover:bg-hecate-500"}`), x(O, r(Ie) ? "Cancel" : "+ New Venture");
      }), xt(Be, () => r(Pe), (ze) => _(Pe, ze)), d(K, k);
    }, Ne = (K) => {
      var k = Dx(), E = it(k);
      Co(E, {});
      var j = o(E, 2), T = i(j);
      {
        var re = (Y) => {
          var xe = $x();
          xe.__click = () => {
            _(M, !0), _(G, !1);
          };
          var se = i(xe);
          s(xe), g(() => x(se, `${b().length ?? ""} gate${b().length !== 1 ? "s" : ""}`)), d(Y, xe);
        };
        A(T, (Y) => {
          h() && Y(re);
        });
      }
      var Le = o(T, 2);
      Le.__click = () => {
        _(M, !r(M)), r(M) && _(G, !1);
      };
      var S = o(Le, 2);
      S.__click = () => {
        _(G, !r(G)), r(G) && _(M, !1);
      };
      var C = o(S, 2), H = i(C), oe = o(H, 2), Be = i(oe, !0);
      s(oe), s(C), s(j);
      var V = o(j, 2), O = i(V);
      {
        var J = (Y) => {
          Oo(Y, {
            onSelectAgent: (xe) => {
              _(G, !0), _(M, !1);
            },
            onSelectGate: (xe) => {
              _(M, !0), _(G, !1);
            }
          });
        };
        A(O, (Y) => {
          ($().length > 0 || b().length > 0) && Y(J);
        });
      }
      var Te = o(O, 2), Oe = i(Te), Ke = i(Oe);
      {
        var Qe = (Y) => {
          jo(Y, {});
        }, tt = (Y) => {
          No(Y, {});
        }, Ye = (Y) => {
          var xe = kx(), se = it(xe);
          Lo(se, {});
          var pe = o(se, 2), Me = i(pe);
          {
            var Je = (R) => {
              Ao(R, {});
            }, m = (R) => {
              Do(R, {});
            }, y = (R) => {
              Po(R, {});
            }, de = (R) => {
              Ro(R, {});
            };
            A(Me, (R) => {
              F() === "storming" ? R(Je) : F() === "planning" ? R(m, 1) : F() === "kanban" ? R(y, 2) : F() === "crafting" && R(de, 3);
            });
          }
          s(pe), d(Y, xe);
        }, at = (Y) => {
          var xe = or(), se = it(xe);
          {
            var pe = (R) => {
              var ae = Sx(), he = i(ae), Ae = i(he);
              Zs(Ae, {}), s(he);
              var ne = o(he, 2);
              {
                var X = (Z) => {
                  var _e = Cx(), ke = i(_e);
                  tn(ke, {}), s(_e), d(Z, _e);
                };
                A(ne, (Z) => {
                  P() && Z(X);
                });
              }
              s(ae), d(R, ae);
            }, Me = (R) => {
              Eo(R, {});
            }, Je = (R) => {
              rs(R, { nextAction: "discovery" });
            }, m = (R) => {
              var ae = Ax(), he = i(ae), Ae = i(he);
              Zs(Ae, {}), s(he);
              var ne = o(he, 2);
              {
                var X = (Z) => {
                  var _e = Ex(), ke = i(_e);
                  tn(ke, {}), s(_e), d(Z, _e);
                };
                A(ne, (Z) => {
                  P() && Z(X);
                });
              }
              s(ae), d(R, ae);
            }, y = (R) => {
              rs(R, { nextAction: "identify" });
            }, de = (R) => {
              rs(R, { nextAction: "discovery" });
            };
            A(se, (R) => {
              D() === "discovering" || te() !== "ready" ? R(pe) : D() === "initiated" || D() === "vision_refined" ? R(Me, 1) : D() === "vision_submitted" ? R(Je, 2) : D() === "discovery_paused" ? R(m, 3) : D() === "discovery_completed" ? R(y, 4) : R(de, !1);
            });
          }
          d(Y, xe);
        }, ze = (Y) => {
          Bo(Y, {
            onSelectDivision: (xe) => {
              _(M, !1), _(G, !1);
            }
          });
        };
        A(Ke, (Y) => {
          r(M) ? Y(Qe) : r(G) ? Y(tt, 1) : w() ? Y(Ye, 2) : $().length === 0 ? Y(at, 3) : Y(ze, !1);
        });
      }
      s(Oe);
      var We = o(Oe, 2);
      Fo(We, {}), s(Te);
      var L = o(Te, 2);
      {
        var U = (Y) => {
          rn(Y, {});
        };
        A(L, (Y) => {
          p() && Y(U);
        });
      }
      s(V), g(() => {
        Re(Le, 1, `px-2 py-0.5 rounded transition-colors
					${r(M) ? "bg-amber-500/20 text-amber-300" : "text-surface-400 hover:text-surface-200 hover:bg-surface-700"}`), Re(S, 1, `px-2 py-0.5 rounded transition-colors
					${r(G) ? "bg-hecate-600/20 text-hecate-300" : "text-surface-400 hover:text-surface-200 hover:bg-surface-700"}`), Re(H, 1, `inline-block w-1.5 h-1.5 rounded-full ${c() === "connected" ? "bg-success-400" : c() === "connecting" ? "bg-yellow-400 animate-pulse" : "bg-danger-400"}`), x(Be, c() === "connected" ? `v${r(ge)?.version ?? "?"}` : c());
      }), d(K, k);
    };
    A(qe, (K) => {
      a() && !n() ? K(Ve) : n() ? K(Ne, !1) : K(Se, 1);
    });
  }
  s(je), d(e, je);
  var be = mt($e);
  return ue(), be;
}
At(["click"]);
customElements.define("martha-studio", kt(Tx, { api: {} }, [], []));
export {
  Tx as default
};
