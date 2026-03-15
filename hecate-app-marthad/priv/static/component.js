typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
const Ho = 1, zo = 2, ri = 4, Uo = 8, Wo = 16, Yo = 2, Ko = 4, Jo = 8, Qo = 1, Xo = 2, sn = "[", us = "[!", nn = "]", ta = {}, Ft = /* @__PURE__ */ Symbol(), Zo = "http://www.w3.org/1999/xhtml", Is = !1;
var on = Array.isArray, ec = Array.prototype.indexOf, _a = Array.prototype.includes, vs = Array.from, ss = Object.keys, Ba = Object.defineProperty, fa = Object.getOwnPropertyDescriptor, ai = Object.getOwnPropertyDescriptors, tc = Object.prototype, rc = Array.prototype, cn = Object.getPrototypeOf, Nn = Object.isExtensible;
const Pr = () => {
};
function ac(e) {
  return e();
}
function ns(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function si() {
  var e, t, a = new Promise((n, c) => {
    e = n, t = c;
  });
  return { promise: a, resolve: e, reject: t };
}
function Ns(e, t) {
  if (Array.isArray(e))
    return e;
  if (!(Symbol.iterator in e))
    return Array.from(e);
  const a = [];
  for (const n of e)
    if (a.push(n), a.length === t) break;
  return a;
}
const jt = 2, is = 4, Ha = 8, ni = 1 << 24, Or = 16, _r = 32, Wr = 64, ln = 128, nr = 512, Mt = 1024, Bt = 2048, xr = 4096, Zt = 8192, Tr = 16384, fs = 32768, ha = 65536, Ln = 1 << 17, ii = 1 << 18, na = 1 << 19, oi = 1 << 20, Ar = 1 << 25, ra = 32768, Ls = 1 << 21, dn = 1 << 22, Gr = 1 << 23, qr = /* @__PURE__ */ Symbol("$state"), sc = /* @__PURE__ */ Symbol("legacy props"), nc = /* @__PURE__ */ Symbol(""), ua = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), za = 3, ia = 8;
function ci(e) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function ic() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function oc(e, t, a) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function cc(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function lc() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function dc(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function uc() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function vc() {
  throw new Error("https://svelte.dev/e/hydration_failed");
}
function fc() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function pc() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function xc() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function _c() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function Ua(e) {
  console.warn("https://svelte.dev/e/hydration_mismatch");
}
function hc() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function gc() {
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
      if (n === nn) {
        if (t === 0) return a;
        t -= 1;
      } else (n === sn || n === us || // "[1", "[2", etc. for if blocks
      n[0] === "[" && !isNaN(Number(n.slice(1)))) && (t += 1);
    }
    var c = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ hr(a)
    );
    e && a.remove(), a = c;
  }
}
function li(e) {
  if (!e || e.nodeType !== ia)
    throw Ua(), ta;
  return (
    /** @type {Comment} */
    e.data
  );
}
function di(e) {
  return e === this.v;
}
function ui(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function vi(e) {
  return !ui(e, this.v);
}
let ka = !1, bc = !1;
function mc() {
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
      Ri(n);
  }
  return e !== void 0 && (t.x = e), t.i = !0, $t = t.p, e ?? /** @type {T} */
  {};
}
function Wa() {
  return !ka || $t !== null && $t.l === null;
}
let Kr = [];
function fi() {
  var e = Kr;
  Kr = [], ns(e);
}
function yr(e) {
  if (Kr.length === 0 && !Na) {
    var t = Kr;
    queueMicrotask(() => {
      t === Kr && fi();
    });
  }
  Kr.push(e);
}
function yc() {
  for (; Kr.length > 0; )
    fi();
}
function pi(e) {
  var t = vt;
  if (t === null)
    return lt.f |= Gr, e;
  if ((t.f & fs) === 0) {
    if ((t.f & ln) === 0)
      throw e;
    t.b.error(e);
  } else
    ma(e, t);
}
function ma(e, t) {
  for (; t !== null; ) {
    if ((t.f & ln) !== 0)
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
const wc = -7169;
function Ct(e, t) {
  e.f = e.f & wc | t;
}
function un(e) {
  (e.f & nr) !== 0 || e.deps === null ? Ct(e, Mt) : Ct(e, xr);
}
function xi(e) {
  if (e !== null)
    for (const t of e)
      (t.f & jt) === 0 || (t.f & ra) === 0 || (t.f ^= ra, xi(
        /** @type {Derived} */
        t.deps
      ));
}
function _i(e, t, a) {
  (e.f & Bt) !== 0 ? t.add(e) : (e.f & xr) !== 0 && a.add(e), xi(e.deps), Ct(e, Mt);
}
const Ja = /* @__PURE__ */ new Set();
let ft = null, cs = null, ur = null, Yt = [], ps = null, Os = !1, Na = !1;
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
        mi(c, l);
    } else {
      for (const c of this.#e) c();
      this.#e.clear(), this.#r === 0 && this.#d(), cs = this, ft = null, On(n), On(a), cs = null, this.#o?.resolve();
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
    t.f ^= Mt;
    for (var c = t.first, l = null; c !== null; ) {
      var f = c.f, v = (f & (_r | Wr)) !== 0, p = v && (f & Mt) !== 0, h = p || (f & Zt) !== 0 || this.#n.has(c);
      if (!h && c.fn !== null) {
        v ? c.f ^= Mt : l !== null && (f & (is | Ha | ni)) !== 0 ? l.b.defer_effect(c) : (f & is) !== 0 ? a.push(c) : Ka(c) && ((f & Or) !== 0 && this.#a.add(c), Va(c));
        var m = c.first;
        if (m !== null) {
          c = m;
          continue;
        }
      }
      var C = c.parent;
      for (c = c.next; c === null && C !== null; )
        C === l && (l = null), c = C.next, C = C.parent;
    }
  }
  /**
   * @param {Effect[]} effects
   */
  #u(t) {
    for (var a = 0; a < t.length; a += 1)
      _i(t[a], this.#s, this.#a);
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
      if (hi(), ft !== null && ft !== this)
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
            gi(h, f, v, p);
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
    return (this.#o ??= si()).promise;
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
      if (yc(), Yt.length === 0 && (ft?.flush(), Yt.length === 0))
        return ps = null, /** @type {T} */
        a;
      hi();
    }
  } finally {
    Na = t;
  }
}
function hi() {
  Os = !0;
  var e = null;
  try {
    for (var t = 0; Yt.length > 0; ) {
      var a = Rr.ensure();
      if (t++ > 1e3) {
        var n, c;
        $c();
      }
      a.process(Yt), Hr.clear();
    }
  } finally {
    Yt = [], Os = !1, ps = null;
  }
}
function $c() {
  try {
    uc();
  } catch (e) {
    ma(e, ps);
  }
}
let Sr = null;
function On(e) {
  var t = e.length;
  if (t !== 0) {
    for (var a = 0; a < t; ) {
      var n = e[a++];
      if ((n.f & (Tr | Zt)) === 0 && Ka(n) && (Sr = /* @__PURE__ */ new Set(), Va(n), n.deps === null && n.first === null && n.nodes === null && (n.teardown === null && n.ac === null ? Li(n) : n.fn = null), Sr?.size > 0)) {
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
function gi(e, t, a, n) {
  if (!a.has(e) && (a.add(e), e.reactions !== null))
    for (const c of e.reactions) {
      const l = c.f;
      (l & jt) !== 0 ? gi(
        /** @type {Derived} */
        c,
        t,
        a,
        n
      ) : (l & (dn | Or)) !== 0 && (l & Bt) === 0 && bi(c, t, n) && (Ct(c, Bt), vr(
        /** @type {Effect} */
        c
      ));
    }
}
function bi(e, t, a) {
  const n = a.get(e);
  if (n !== void 0) return n;
  if (e.deps !== null)
    for (const c of e.deps) {
      if (_a.call(t, c))
        return !0;
      if ((c.f & jt) !== 0 && bi(
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
    if (Os && t === vt && (a & Or) !== 0 && (a & ii) === 0)
      return;
    if ((a & (Wr | _r)) !== 0) {
      if ((a & Mt) === 0) return;
      t.f ^= Mt;
    }
  }
  Yt.push(t);
}
function mi(e, t) {
  if (!((e.f & _r) !== 0 && (e.f & Mt) !== 0)) {
    (e.f & Bt) !== 0 ? t.d.push(e) : (e.f & xr) !== 0 && t.m.push(e), Ct(e, Mt);
    for (var a = e.first; a !== null; )
      mi(a, t), a = a.next;
  }
}
function kc(e) {
  let t = 0, a = aa(0), n;
  return () => {
    xn() && (r(a), gs(() => (t === 0 && (n = oa(() => e(() => La(a)))), t += 1, () => {
      yr(() => {
        t -= 1, t === 0 && (n?.(), n = void 0, La(a));
      });
    })));
  };
}
var Cc = ha | na | ln;
function Sc(e, t, a) {
  new Ec(e, t, a);
}
class Ec {
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
  #y = kc(() => (this.#v = aa(this.#u), () => {
    this.#v = null;
  }));
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   */
  constructor(t, a, n) {
    this.#e = t, this.#r = a, this.#i = n, this.parent = /** @type {Effect} */
    vt.b, this.is_pending = !!this.#r.pending, this.#o = hn(() => {
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
    }, Cc), ot && (this.#e = dt);
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
    _i(t, this.#x, this.#_);
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
      return pi(l), null;
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
    ), ji(this.#s, this.#c)), this.#a === null && (this.#a = ar(() => t(this.#e)));
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
        gc();
        return;
      }
      c = !0, l && _c(), Rr.ensure(), this.#u = 0, this.#n !== null && Xr(this.#n, () => {
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
function Ac(e, t, a, n) {
  const c = Wa() ? Ya : va;
  var l = e.filter((w) => !w.settled);
  if (a.length === 0 && l.length === 0) {
    n(t.map(c));
    return;
  }
  var f = ft, v = (
    /** @type {Effect} */
    vt
  ), p = Dc(), h = l.length === 1 ? l[0].promise : l.length > 1 ? Promise.all(l.map((w) => w.promise)) : null;
  function m(w) {
    p();
    try {
      n(w);
    } catch (V) {
      (v.f & Tr) === 0 && ma(V, v);
    }
    f?.deactivate(), Fs();
  }
  if (a.length === 0) {
    h.then(() => m(t.map(c)));
    return;
  }
  function C() {
    p(), Promise.all(a.map((w) => /* @__PURE__ */ Pc(w))).then((w) => m([...t.map(c), ...w])).catch((w) => ma(w, v));
  }
  h ? h.then(C) : C();
}
function Dc() {
  var e = vt, t = lt, a = $t, n = ft;
  return function(l = !0) {
    $r(e), cr(t), ba(a), l && n?.activate();
  };
}
function Fs() {
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
    equals: di,
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
function Pc(e, t, a) {
  let n = (
    /** @type {Effect | null} */
    vt
  );
  n === null && ic();
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
  return Fc(() => {
    var h = si();
    l = h.promise;
    try {
      Promise.resolve(e()).then(h.resolve, h.reject).then(() => {
        m === ft && m.committed && m.deactivate(), Fs();
      });
    } catch (V) {
      h.reject(V), Fs();
    }
    var m = (
      /** @type {Batch} */
      ft
    );
    if (v) {
      var C = c.is_rendered();
      c.update_pending_count(1), m.increment(C), p.get(m)?.reject(ua), p.delete(m), p.set(m, h);
    }
    const w = (V, D = void 0) => {
      if (m.activate(), D)
        D !== ua && (f.f |= Gr, ya(f, D));
      else {
        (f.f & Gr) !== 0 && (f.f ^= Gr), ya(f, V);
        for (const [se, R] of p) {
          if (p.delete(se), se === m) break;
          R.reject(ua);
        }
      }
      v && (c.update_pending_count(-1), m.decrement(C));
    };
    h.promise.then(w, (V) => w(null, V || "unknown"));
  }), hs(() => {
    for (const h of p.values())
      h.reject(ua);
  }), new Promise((h) => {
    function m(C) {
      function w() {
        C === l ? h(f) : m(l);
      }
      C.then(w, w);
    }
    m(l);
  });
}
// @__NO_SIDE_EFFECTS__
function we(e) {
  const t = /* @__PURE__ */ Ya(e);
  return Bi(t), t;
}
// @__NO_SIDE_EFFECTS__
function va(e) {
  const t = /* @__PURE__ */ Ya(e);
  return t.equals = vi, t;
}
function yi(e) {
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
function Tc(e) {
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
function vn(e) {
  var t, a = vt;
  $r(Tc(e));
  try {
    e.f &= ~ra, yi(e), t = Hi(e);
  } finally {
    $r(a);
  }
  return t;
}
function wi(e) {
  var t = vn(e);
  if (!e.equals(t) && (e.wv = Gi(), (!ft?.is_fork || e.deps === null) && (e.v = t, e.deps === null))) {
    Ct(e, Mt);
    return;
  }
  zr || (ur !== null ? (xn() || ft?.is_fork) && ur.set(e, t) : un(e));
}
let js = /* @__PURE__ */ new Set();
const Hr = /* @__PURE__ */ new Map();
let $i = !1;
function aa(e, t) {
  var a = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: di,
    rv: 0,
    wv: 0
  };
  return a;
}
// @__NO_SIDE_EFFECTS__
function ve(e, t) {
  const a = aa(e);
  return Bi(a), a;
}
// @__NO_SIDE_EFFECTS__
function fn(e, t = !1, a = !0) {
  const n = aa(e);
  return t || (n.equals = vi), ka && a && $t !== null && $t.l !== null && ($t.l.s ??= []).push(n), n;
}
function _(e, t, a = !1) {
  lt !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!fr || (lt.f & Ln) !== 0) && Wa() && (lt.f & (jt | Or | dn | Ln)) !== 0 && (ir === null || !_a.call(ir, e)) && xc();
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
      (e.f & Bt) !== 0 && vn(c), un(c);
    }
    e.wv = Gi(), ki(e, Bt), Wa() && vt !== null && (vt.f & Mt) !== 0 && (vt.f & (_r | Wr)) === 0 && (rr === null ? Bc([e]) : rr.push(e)), !n.is_fork && js.size > 0 && !$i && Rc();
  }
  return t;
}
function Rc() {
  $i = !1;
  for (const e of js)
    (e.f & Mt) !== 0 && Ct(e, xr), Ka(e) && Va(e);
  js.clear();
}
function La(e) {
  _(e, e.v + 1);
}
function ki(e, t) {
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
          ur?.delete(h), (v & ra) === 0 && (v & nr && (f.f |= ra), ki(h, xr));
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
  const t = cn(e);
  if (t !== tc && t !== rc)
    return e;
  var a = /* @__PURE__ */ new Map(), n = on(e), c = /* @__PURE__ */ ve(0), l = Zr, f = (v) => {
    if (Zr === l)
      return v();
    var p = lt, h = Zr;
    cr(null), Gn(l);
    var m = v();
    return cr(p), Gn(h), m;
  };
  return n && a.set("length", /* @__PURE__ */ ve(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(v, p, h) {
        (!("value" in h) || h.configurable === !1 || h.enumerable === !1 || h.writable === !1) && fc();
        var m = a.get(p);
        return m === void 0 ? f(() => {
          var C = /* @__PURE__ */ ve(h.value);
          return a.set(p, C), C;
        }) : _(m, h.value, !0), !0;
      },
      deleteProperty(v, p) {
        var h = a.get(p);
        if (h === void 0) {
          if (p in v) {
            const m = f(() => /* @__PURE__ */ ve(Ft));
            a.set(p, m), La(c);
          }
        } else
          _(h, Ft), La(c);
        return !0;
      },
      get(v, p, h) {
        if (p === qr)
          return e;
        var m = a.get(p), C = p in v;
        if (m === void 0 && (!C || fa(v, p)?.writable) && (m = f(() => {
          var V = Vt(C ? v[p] : Ft), D = /* @__PURE__ */ ve(V);
          return D;
        }), a.set(p, m)), m !== void 0) {
          var w = r(m);
          return w === Ft ? void 0 : w;
        }
        return Reflect.get(v, p, h);
      },
      getOwnPropertyDescriptor(v, p) {
        var h = Reflect.getOwnPropertyDescriptor(v, p);
        if (h && "value" in h) {
          var m = a.get(p);
          m && (h.value = r(m));
        } else if (h === void 0) {
          var C = a.get(p), w = C?.v;
          if (C !== void 0 && w !== Ft)
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
        var h = a.get(p), m = h !== void 0 && h.v !== Ft || Reflect.has(v, p);
        if (h !== void 0 || vt !== null && (!m || fa(v, p)?.writable)) {
          h === void 0 && (h = f(() => {
            var w = m ? Vt(v[p]) : Ft, V = /* @__PURE__ */ ve(w);
            return V;
          }), a.set(p, h));
          var C = r(h);
          if (C === Ft)
            return !1;
        }
        return m;
      },
      set(v, p, h, m) {
        var C = a.get(p), w = p in v;
        if (n && p === "length")
          for (var V = h; V < /** @type {Source<number>} */
          C.v; V += 1) {
            var D = a.get(V + "");
            D !== void 0 ? _(D, Ft) : V in v && (D = f(() => /* @__PURE__ */ ve(Ft)), a.set(V + "", D));
          }
        if (C === void 0)
          (!w || fa(v, p)?.writable) && (C = f(() => /* @__PURE__ */ ve(void 0)), _(C, Vt(h)), a.set(p, C));
        else {
          w = C.v !== Ft;
          var se = f(() => Vt(h));
          _(C, se);
        }
        var R = Reflect.getOwnPropertyDescriptor(v, p);
        if (R?.set && R.set.call(m, h), !w) {
          if (n && typeof p == "string") {
            var U = (
              /** @type {Source<number>} */
              a.get("length")
            ), ue = Number(p);
            Number.isInteger(ue) && ue >= U.v && _(U, ue + 1);
          }
          La(c);
        }
        return !0;
      },
      ownKeys(v) {
        r(c);
        var p = Reflect.ownKeys(v).filter((C) => {
          var w = a.get(C);
          return w === void 0 || w.v !== Ft;
        });
        for (var [h, m] of a)
          m.v !== Ft && !(h in v) && p.push(h);
        return p;
      },
      setPrototypeOf() {
        pc();
      }
    }
  );
}
function Fn(e) {
  try {
    if (e !== null && typeof e == "object" && qr in e)
      return e[qr];
  } catch {
  }
  return e;
}
function Mc(e, t) {
  return Object.is(Fn(e), Fn(t));
}
var jn, Ci, Si, Ei;
function Bs() {
  if (jn === void 0) {
    jn = window, Ci = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, a = Text.prototype;
    Si = fa(t, "firstChild").get, Ei = fa(t, "nextSibling").get, Nn(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), Nn(a) && (a.__t = void 0);
  }
}
function Jt(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function sr(e) {
  return (
    /** @type {TemplateNode | null} */
    Si.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function hr(e) {
  return (
    /** @type {TemplateNode | null} */
    Ei.call(e)
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
function pn(e) {
  e.textContent = "";
}
function Ai() {
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
  ot && /* @__PURE__ */ sr(e) !== null && pn(e);
}
let Bn = !1;
function Di() {
  Bn || (Bn = !0, document.addEventListener(
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
function Pi(e, t, a, n = a) {
  e.addEventListener(t, () => _s(a));
  const c = e.__on_r;
  c ? e.__on_r = () => {
    c(), n(!0);
  } : e.__on_r = () => n(!0), Di();
}
function Ti(e) {
  vt === null && (lt === null && dc(), lc()), zr && cc();
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
function xn() {
  return lt !== null && !fr;
}
function hs(e) {
  const t = gr(Ha, null, !1);
  return Ct(t, Mt), t.teardown = e, t;
}
function Rt(e) {
  Ti();
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
    return Ri(e);
}
function Ri(e) {
  return gr(is | oi, e, !1);
}
function Nc(e) {
  return Ti(), gr(Ha | oi, e, !0);
}
function Lc(e) {
  Rr.ensure();
  const t = gr(Wr | na, e, !0);
  return () => {
    Ut(t);
  };
}
function Oc(e) {
  Rr.ensure();
  const t = gr(Wr | na, e, !0);
  return (a = {}) => new Promise((n) => {
    a.outro ? Xr(t, () => {
      Ut(t), n(void 0);
    }) : (Ut(t), n(void 0));
  });
}
function _n(e) {
  return gr(is, e, !1);
}
function Fc(e) {
  return gr(dn | na, e, !0);
}
function gs(e, t = 0) {
  return gr(Ha | t, e, !0);
}
function g(e, t = [], a = [], n = []) {
  Ac(n, t, a, (c) => {
    gr(Ha, () => e(...c.map(r)), !0);
  });
}
function hn(e, t = 0) {
  var a = gr(Or | t, e, !0);
  return a;
}
function ar(e) {
  return gr(_r | na, e, !0);
}
function Mi(e) {
  var t = e.teardown;
  if (t !== null) {
    const a = zr, n = lt;
    Vn(!0), cr(null);
    try {
      t.call(null);
    } finally {
      Vn(a), cr(n);
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
function jc(e) {
  for (var t = e.first; t !== null; ) {
    var a = t.next;
    (t.f & _r) === 0 && Ut(t), t = a;
  }
}
function Ut(e, t = !0) {
  var a = !1;
  (t || (e.f & ii) !== 0) && e.nodes !== null && e.nodes.end !== null && (Ni(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), a = !0), Ii(e, t && !a), ls(e, 0), Ct(e, Tr);
  var n = e.nodes && e.nodes.t;
  if (n !== null)
    for (const l of n)
      l.stop();
  Mi(e);
  var c = e.parent;
  c !== null && c.first !== null && Li(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = null;
}
function Ni(e, t) {
  for (; e !== null; ) {
    var a = e === t ? null : /* @__PURE__ */ hr(e);
    e.remove(), e = a;
  }
}
function Li(e) {
  var t = e.parent, a = e.prev, n = e.next;
  a !== null && (a.next = n), n !== null && (n.prev = a), t !== null && (t.first === e && (t.first = n), t.last === e && (t.last = a));
}
function Xr(e, t, a = !0) {
  var n = [];
  Oi(e, n, !0);
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
function Oi(e, t, a) {
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
      Oi(c, t, f ? a : !1), c = l;
    }
  }
}
function gn(e) {
  Fi(e, !0);
}
function Fi(e, t) {
  if ((e.f & Zt) !== 0) {
    e.f ^= Zt, (e.f & Mt) === 0 && (Ct(e, Bt), vr(e));
    for (var a = e.first; a !== null; ) {
      var n = a.next, c = (a.f & ha) !== 0 || (a.f & _r) !== 0;
      Fi(a, c ? t : !1), a = n;
    }
    var l = e.nodes && e.nodes.t;
    if (l !== null)
      for (const f of l)
        (f.is_global || t) && f.in();
  }
}
function ji(e, t) {
  if (e.nodes)
    for (var a = e.nodes.start, n = e.nodes.end; a !== null; ) {
      var c = a === n ? null : /* @__PURE__ */ hr(a);
      t.append(a), a = c;
    }
}
let Qa = !1, zr = !1;
function Vn(e) {
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
function Bi(e) {
  lt !== null && (ir === null ? ir = [e] : ir.push(e));
}
let Kt = null, Qt = 0, rr = null;
function Bc(e) {
  rr = e;
}
let Vi = 1, Jr = 0, Zr = Jr;
function Gn(e) {
  Zr = e;
}
function Gi() {
  return ++Vi;
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
      ) && wi(
        /** @type {Derived} */
        l
      ), l.wv > e.wv)
        return !0;
    }
    (t & nr) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    ur === null && Ct(e, Mt);
  }
  return !1;
}
function qi(e, t, a = !0) {
  var n = e.reactions;
  if (n !== null && !(ir !== null && _a.call(ir, e)))
    for (var c = 0; c < n.length; c++) {
      var l = n[c];
      (l.f & jt) !== 0 ? qi(
        /** @type {Derived} */
        l,
        t,
        !1
      ) : t === l && (a ? Ct(l, Bt) : (l.f & Mt) !== 0 && Ct(l, xr), vr(
        /** @type {Effect} */
        l
      ));
    }
}
function Hi(e) {
  var t = Kt, a = Qt, n = rr, c = lt, l = ir, f = $t, v = fr, p = Zr, h = e.f;
  Kt = /** @type {null | Value[]} */
  null, Qt = 0, rr = null, lt = (h & (_r | Wr)) === 0 ? e : null, ir = null, ba(e.ctx), fr = !1, Zr = ++Jr, e.ac !== null && (_s(() => {
    e.ac.abort(ua);
  }), e.ac = null);
  try {
    e.f |= Ls;
    var m = (
      /** @type {Function} */
      e.fn
    ), C = m(), w = e.deps, V = ft?.is_fork;
    if (Kt !== null) {
      var D;
      if (V || ls(e, Qt), w !== null && Qt > 0)
        for (w.length = Qt + Kt.length, D = 0; D < Kt.length; D++)
          w[Qt + D] = Kt[D];
      else
        e.deps = w = Kt;
      if (xn() && (e.f & nr) !== 0)
        for (D = Qt; D < w.length; D++)
          (w[D].reactions ??= []).push(e);
    } else !V && w !== null && Qt < w.length && (ls(e, Qt), w.length = Qt);
    if (Wa() && rr !== null && !fr && w !== null && (e.f & (jt | xr | Bt)) === 0)
      for (D = 0; D < /** @type {Source[]} */
      rr.length; D++)
        qi(
          rr[D],
          /** @type {Effect} */
          e
        );
    if (c !== null && c !== e) {
      if (Jr++, c.deps !== null)
        for (let se = 0; se < a; se += 1)
          c.deps[se].rv = Jr;
      if (t !== null)
        for (const se of t)
          se.rv = Jr;
      rr !== null && (n === null ? n = rr : n.push(.../** @type {Source[]} */
      rr));
    }
    return (e.f & Gr) !== 0 && (e.f ^= Gr), C;
  } catch (se) {
    return pi(se);
  } finally {
    e.f ^= Ls, Kt = t, Qt = a, rr = n, lt = c, ir = l, ba(f), fr = v, Zr = p;
  }
}
function Vc(e, t) {
  let a = t.reactions;
  if (a !== null) {
    var n = ec.call(a, e);
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
    (l.f & nr) !== 0 && (l.f ^= nr, l.f &= ~ra), un(l), yi(l), ls(l, 0);
  }
}
function ls(e, t) {
  var a = e.deps;
  if (a !== null)
    for (var n = t; n < a.length; n++)
      Vc(e, a[n]);
}
function Va(e) {
  var t = e.f;
  if ((t & Tr) === 0) {
    Ct(e, Mt);
    var a = vt, n = Qa;
    vt = e, Qa = !0;
    try {
      (t & (Or | ni)) !== 0 ? jc(e) : Ii(e), Mi(e);
      var c = Hi(e);
      e.teardown = typeof c == "function" ? c : null, e.wv = Vi;
      var l;
      Is && bc && (e.f & Bt) !== 0 && e.deps;
    } finally {
      Qa = n, vt = a;
    }
  }
}
async function bn() {
  await Promise.resolve(), ut();
}
function r(e) {
  var t = e.f, a = (t & jt) !== 0;
  if (lt !== null && !fr) {
    var n = vt !== null && (vt.f & Tr) !== 0;
    if (!n && (ir === null || !_a.call(ir, e))) {
      var c = lt.deps;
      if ((lt.f & Ls) !== 0)
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
      return ((f.f & Mt) === 0 && f.reactions !== null || Ui(f)) && (v = vn(f)), Hr.set(f, v), v;
    }
    var p = (f.f & nr) === 0 && !fr && lt !== null && (Qa || (lt.f & nr) !== 0), h = f.deps === null;
    Ka(f) && (p && (f.f |= nr), wi(f)), p && !h && zi(f);
  }
  if (ur?.has(e))
    return ur.get(e);
  if ((e.f & Gr) !== 0)
    throw e.v;
  return e.v;
}
function zi(e) {
  if (e.deps !== null) {
    e.f |= nr;
    for (const t of e.deps)
      (t.reactions ??= []).push(e), (t.f & jt) !== 0 && (t.f & nr) === 0 && zi(
        /** @type {Derived} */
        t
      );
  }
}
function Ui(e) {
  if (e.v === Ft) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (Hr.has(t) || (t.f & jt) !== 0 && Ui(
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
function Gc(e) {
  if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
    if (qr in e)
      Vs(e);
    else if (!Array.isArray(e))
      for (let t in e) {
        const a = e[t];
        typeof a == "object" && a && qr in a && Vs(a);
      }
  }
}
function Vs(e, t = /* @__PURE__ */ new Set()) {
  if (typeof e == "object" && e !== null && // We don't want to traverse DOM elements
  !(e instanceof EventTarget) && !t.has(e)) {
    t.add(e), e instanceof Date && e.getTime();
    for (let n in e)
      try {
        Vs(e[n], t);
      } catch {
      }
    const a = cn(e);
    if (a !== Object.prototype && a !== Array.prototype && a !== Map.prototype && a !== Set.prototype && a !== Date.prototype) {
      const n = ai(a);
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
const Wi = /* @__PURE__ */ new Set(), Gs = /* @__PURE__ */ new Set();
function qc(e, t, a, n = {}) {
  function c(l) {
    if (n.capture || Ma.call(t, l), !l.cancelBubble)
      return _s(() => a?.call(this, l));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? yr(() => {
    t.addEventListener(e, c, n);
  }) : t.addEventListener(e, c, n), c;
}
function Ot(e, t, a, n, c) {
  var l = { capture: n, passive: c }, f = qc(e, t, a, l);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && hs(() => {
    t.removeEventListener(e, f, l);
  });
}
function At(e) {
  for (var t = 0; t < e.length; t++)
    Wi.add(e[t]);
  for (var a of Gs)
    a(e);
}
let qn = null;
function Ma(e) {
  var t = this, a = (
    /** @type {Node} */
    t.ownerDocument
  ), n = e.type, c = e.composedPath?.() || [], l = (
    /** @type {null | Element} */
    c[0] || e.target
  );
  qn = e;
  var f = 0, v = qn === e && e.__root;
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
    var m = lt, C = vt;
    cr(null), $r(null);
    try {
      for (var w, V = []; l !== null; ) {
        var D = l.assignedSlot || l.parentNode || /** @type {any} */
        l.host || null;
        try {
          var se = l["__" + n];
          se != null && (!/** @type {any} */
          l.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === l) && se.call(l, e);
        } catch (R) {
          w ? V.push(R) : w = R;
        }
        if (e.cancelBubble || D === t || D === null)
          break;
        l = D;
      }
      if (w) {
        for (let R of V)
          queueMicrotask(() => {
            throw R;
          });
        throw w;
      }
    } finally {
      e.__root = t, delete e.currentTarget, cr(m), $r(C);
    }
  }
}
function Yi(e) {
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
  var a = (t & Qo) !== 0, n = (t & Xo) !== 0, c, l = !e.startsWith("<!>");
  return () => {
    if (ot)
      return wr(dt, null), dt;
    c === void 0 && (c = Yi(l ? e : "<!>" + e), a || (c = /** @type {TemplateNode} */
    /* @__PURE__ */ sr(c)));
    var f = (
      /** @type {TemplateNode} */
      n || Ci ? document.importNode(c, !0) : c.cloneNode(!0)
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
function Ds(e = "") {
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
const Hc = ["touchstart", "touchmove"];
function zc(e) {
  return Hc.includes(e);
}
function x(e, t) {
  var a = t == null ? "" : typeof t == "object" ? t + "" : t;
  a !== (e.__t ??= e.nodeValue) && (e.__t = a, e.nodeValue = a + "");
}
function Ki(e, t) {
  return Ji(e, t);
}
function Uc(e, t) {
  Bs(), t.intro = t.intro ?? !1;
  const a = t.target, n = ot, c = dt;
  try {
    for (var l = /* @__PURE__ */ sr(a); l && (l.nodeType !== ia || /** @type {Comment} */
    l.data !== sn); )
      l = /* @__PURE__ */ hr(l);
    if (!l)
      throw ta;
    Dr(!0), Gt(
      /** @type {Comment} */
      l
    );
    const f = Ji(e, { ...t, anchor: l });
    return Dr(!1), /**  @type {Exports} */
    f;
  } catch (f) {
    if (f instanceof Error && f.message.split(`
`).some((v) => v.startsWith("https://svelte.dev/e/")))
      throw f;
    return f !== ta && console.warn("Failed to hydrate: ", f), t.recover === !1 && vc(), Bs(), pn(a), Dr(!1), Ki(e, t);
  } finally {
    Dr(n), Gt(c);
  }
}
const la = /* @__PURE__ */ new Map();
function Ji(e, { target: t, anchor: a, props: n = {}, events: c, context: l, intro: f = !0 }) {
  Bs();
  var v = /* @__PURE__ */ new Set(), p = (C) => {
    for (var w = 0; w < C.length; w++) {
      var V = C[w];
      if (!v.has(V)) {
        v.add(V);
        var D = zc(V);
        t.addEventListener(V, Ma, { passive: D });
        var se = la.get(V);
        se === void 0 ? (document.addEventListener(V, Ma, { passive: D }), la.set(V, 1)) : la.set(V, se + 1);
      }
    }
  };
  p(vs(Wi)), Gs.add(p);
  var h = void 0, m = Oc(() => {
    var C = a ?? t.appendChild(Jt());
    return Sc(
      /** @type {TemplateNode} */
      C,
      {
        pending: () => {
        }
      },
      (w) => {
        bt({});
        var V = (
          /** @type {ComponentContext} */
          $t
        );
        if (l && (V.c = l), c && (n.$$events = c), ot && wr(
          /** @type {TemplateNode} */
          w,
          null
        ), h = e(w, n) || {}, ot && (vt.nodes.end = dt, dt === null || dt.nodeType !== ia || /** @type {Comment} */
        dt.data !== nn))
          throw Ua(), ta;
        mt();
      }
    ), () => {
      for (var w of v) {
        t.removeEventListener(w, Ma);
        var V = (
          /** @type {number} */
          la.get(w)
        );
        --V === 0 ? (document.removeEventListener(w, Ma), la.delete(w)) : la.set(w, V);
      }
      Gs.delete(p), C !== a && C.parentNode?.removeChild(C);
    };
  });
  return qs.set(h, m), h;
}
let qs = /* @__PURE__ */ new WeakMap();
function Wc(e, t) {
  const a = qs.get(e);
  return a ? (qs.delete(e), a(t)) : Promise.resolve();
}
class Yc {
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
        gn(n), this.#i.delete(a);
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
            ji(f, h), h.append(Jt()), this.#r.set(l, { effect: f, fragment: h });
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
    ), c = Ai();
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
function Qi(e) {
  $t === null && ci(), ka && $t.l !== null ? Jc($t).m.push(e) : Rt(() => {
    const t = oa(e);
    if (typeof t == "function") return (
      /** @type {() => void} */
      t
    );
  });
}
function Kc(e) {
  $t === null && ci(), Qi(() => () => oa(e));
}
function Jc(e) {
  var t = (
    /** @type {ComponentContextLegacy} */
    e.l
  );
  return t.u ??= { a: [], b: [], m: [] };
}
function A(e, t, a = !1) {
  ot && ga();
  var n = new Yc(e), c = a ? ha : 0;
  function l(f, v) {
    if (ot) {
      const m = li(e);
      var p;
      if (m === sn ? p = 0 : m === us ? p = !1 : p = parseInt(m.substring(1)), f !== p) {
        var h = os();
        Gt(h), n.anchor = h, Dr(!1), n.ensure(f, v), Dr(!0);
        return;
      }
    }
    n.ensure(f, v);
  }
  hn(() => {
    var f = !1;
    t((v, p = 0) => {
      f = !0, l(p, v);
    }), f || l(!1, null);
  }, c);
}
function ct(e, t) {
  return t;
}
function Qc(e, t, a) {
  for (var n = [], c = t.length, l, f = t.length, v = 0; v < c; v++) {
    let C = t[v];
    Xr(
      C,
      () => {
        if (l) {
          if (l.pending.delete(C), l.done.add(C), l.pending.size === 0) {
            var w = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            Hs(vs(l.done)), w.delete(l), w.size === 0 && (e.outrogroups = null);
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
      ), m = (
        /** @type {Element} */
        h.parentNode
      );
      pn(m), m.append(h), e.items.clear();
    }
    Hs(t, !p);
  } else
    l = {
      pending: new Set(t),
      done: /* @__PURE__ */ new Set()
    }, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(l);
}
function Hs(e, t = !0) {
  for (var a = 0; a < e.length; a++)
    Ut(e[a], t);
}
var Hn;
function He(e, t, a, n, c, l = null) {
  var f = e, v = /* @__PURE__ */ new Map(), p = (t & ri) !== 0;
  if (p) {
    var h = (
      /** @type {Element} */
      e
    );
    f = ot ? Gt(/* @__PURE__ */ sr(h)) : h.appendChild(Jt());
  }
  ot && ga();
  var m = null, C = /* @__PURE__ */ va(() => {
    var U = a();
    return on(U) ? U : U == null ? [] : vs(U);
  }), w, V = !0;
  function D() {
    R.fallback = m, Xc(R, w, f, t, n), m !== null && (w.length === 0 ? (m.f & Ar) === 0 ? gn(m) : (m.f ^= Ar, Ia(m, null, f)) : Xr(m, () => {
      m = null;
    }));
  }
  var se = hn(() => {
    w = /** @type {V[]} */
    r(C);
    var U = w.length;
    let ue = !1;
    if (ot) {
      var Ce = li(f) === us;
      Ce !== (U === 0) && (f = os(), Gt(f), Dr(!1), ue = !0);
    }
    for (var ge = /* @__PURE__ */ new Set(), fe = (
      /** @type {Batch} */
      ft
    ), ie = Ai(), Fe = 0; Fe < U; Fe += 1) {
      ot && dt.nodeType === ia && /** @type {Comment} */
      dt.data === nn && (f = /** @type {Comment} */
      dt, ue = !0, Dr(!1));
      var Pe = w[Fe], Me = n(Pe, Fe), ce = V ? null : v.get(Me);
      ce ? (ce.v && ya(ce.v, Pe), ce.i && ya(ce.i, Fe), ie && fe.unskip_effect(ce.e)) : (ce = Zc(
        v,
        V ? f : Hn ??= Jt(),
        Pe,
        Me,
        Fe,
        c,
        t,
        a
      ), V || (ce.e.f |= Ar), v.set(Me, ce)), ge.add(Me);
    }
    if (U === 0 && l && !m && (V ? m = ar(() => l(f)) : (m = ar(() => l(Hn ??= Jt())), m.f |= Ar)), U > ge.size && oc(), ot && U > 0 && Gt(os()), !V)
      if (ie) {
        for (const [G, I] of v)
          ge.has(G) || fe.skip_effect(I.e);
        fe.oncommit(D), fe.ondiscard(() => {
        });
      } else
        D();
    ue && Dr(!0), r(C);
  }), R = { effect: se, items: v, outrogroups: null, fallback: m };
  V = !1, ot && (f = dt);
}
function Pa(e) {
  for (; e !== null && (e.f & _r) === 0; )
    e = e.next;
  return e;
}
function Xc(e, t, a, n, c) {
  var l = (n & Uo) !== 0, f = t.length, v = e.items, p = Pa(e.effect.first), h, m = null, C, w = [], V = [], D, se, R, U;
  if (l)
    for (U = 0; U < f; U += 1)
      D = t[U], se = c(D, U), R = /** @type {EachItem} */
      v.get(se).e, (R.f & Ar) === 0 && (R.nodes?.a?.measure(), (C ??= /* @__PURE__ */ new Set()).add(R));
  for (U = 0; U < f; U += 1) {
    if (D = t[U], se = c(D, U), R = /** @type {EachItem} */
    v.get(se).e, e.outrogroups !== null)
      for (const ce of e.outrogroups)
        ce.pending.delete(R), ce.done.delete(R);
    if ((R.f & Ar) !== 0)
      if (R.f ^= Ar, R === p)
        Ia(R, null, a);
      else {
        var ue = m ? m.next : p;
        R === e.effect.last && (e.effect.last = R.prev), R.prev && (R.prev.next = R.next), R.next && (R.next.prev = R.prev), jr(e, m, R), jr(e, R, ue), Ia(R, ue, a), m = R, w = [], V = [], p = Pa(m.next);
        continue;
      }
    if ((R.f & Zt) !== 0 && (gn(R), l && (R.nodes?.a?.unfix(), (C ??= /* @__PURE__ */ new Set()).delete(R))), R !== p) {
      if (h !== void 0 && h.has(R)) {
        if (w.length < V.length) {
          var Ce = V[0], ge;
          m = Ce.prev;
          var fe = w[0], ie = w[w.length - 1];
          for (ge = 0; ge < w.length; ge += 1)
            Ia(w[ge], Ce, a);
          for (ge = 0; ge < V.length; ge += 1)
            h.delete(V[ge]);
          jr(e, fe.prev, ie.next), jr(e, m, fe), jr(e, ie, Ce), p = Ce, m = ie, U -= 1, w = [], V = [];
        } else
          h.delete(R), Ia(R, p, a), jr(e, R.prev, R.next), jr(e, R, m === null ? e.effect.first : m.next), jr(e, m, R), m = R;
        continue;
      }
      for (w = [], V = []; p !== null && p !== R; )
        (h ??= /* @__PURE__ */ new Set()).add(p), V.push(p), p = Pa(p.next);
      if (p === null)
        continue;
    }
    (R.f & Ar) === 0 && w.push(R), m = R, p = Pa(R.next);
  }
  if (e.outrogroups !== null) {
    for (const ce of e.outrogroups)
      ce.pending.size === 0 && (Hs(vs(ce.done)), e.outrogroups?.delete(ce));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (p !== null || h !== void 0) {
    var Fe = [];
    if (h !== void 0)
      for (R of h)
        (R.f & Zt) === 0 && Fe.push(R);
    for (; p !== null; )
      (p.f & Zt) === 0 && p !== e.fallback && Fe.push(p), p = Pa(p.next);
    var Pe = Fe.length;
    if (Pe > 0) {
      var Me = (n & ri) !== 0 && f === 0 ? a : null;
      if (l) {
        for (U = 0; U < Pe; U += 1)
          Fe[U].nodes?.a?.measure();
        for (U = 0; U < Pe; U += 1)
          Fe[U].nodes?.a?.fix();
      }
      Qc(e, Fe, Me);
    }
  }
  l && yr(() => {
    if (C !== void 0)
      for (R of C)
        R.nodes?.a?.apply();
  });
}
function Zc(e, t, a, n, c, l, f, v) {
  var p = (f & Ho) !== 0 ? (f & Wo) === 0 ? /* @__PURE__ */ fn(a, !1, !1) : aa(a) : null, h = (f & zo) !== 0 ? aa(c) : null;
  return {
    v: p,
    i: h,
    e: ar(() => (l(t, p ?? a, h ?? c, v), () => {
      e.delete(n);
    }))
  };
}
function Ia(e, t, a) {
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
function el(e, t, a = !1, n = !1, c = !1) {
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
    if (v.nodes !== null && (Ni(
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
      var m = f + "";
      a ? m = `<svg>${m}</svg>` : n && (m = `<math>${m}</math>`);
      var C = Yi(m);
      if ((a || n) && (C = /** @type {Element} */
      /* @__PURE__ */ sr(C)), wr(
        /** @type {TemplateNode} */
        /* @__PURE__ */ sr(C),
        /** @type {TemplateNode} */
        C.lastChild
      ), a || n)
        for (; /* @__PURE__ */ sr(C); )
          l.before(
            /** @type {TemplateNode} */
            /* @__PURE__ */ sr(C)
          );
      else
        l.before(C);
    }
  });
}
function Xi(e, t) {
  _n(() => {
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
function tl(e, t, a) {
  var n = e == null ? "" : "" + e;
  return t && (n = n ? n + " " + t : t), n === "" ? null : n;
}
function rl(e, t) {
  return e == null ? null : String(e);
}
function Re(e, t, a, n, c, l) {
  var f = e.__className;
  if (ot || f !== a || f === void 0) {
    var v = tl(a, n);
    (!ot || v !== e.getAttribute("class")) && (v == null ? e.removeAttribute("class") : e.className = v), e.__className = a;
  }
  return l;
}
function dr(e, t, a, n) {
  var c = e.__style;
  if (ot || c !== t) {
    var l = rl(t);
    (!ot || l !== e.getAttribute("style")) && (l == null ? e.removeAttribute("style") : e.style.cssText = l), e.__style = t;
  }
  return n;
}
function Zi(e, t, a = !1) {
  if (e.multiple) {
    if (t == null)
      return;
    if (!on(t))
      return hc();
    for (var n of e.options)
      n.selected = t.includes(Oa(n));
    return;
  }
  for (n of e.options) {
    var c = Oa(n);
    if (Mc(c, t)) {
      n.selected = !0;
      return;
    }
  }
  (!a || t !== void 0) && (e.selectedIndex = -1);
}
function al(e) {
  var t = new MutationObserver(() => {
    Zi(e, e.__value);
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
  Pi(e, "change", (l) => {
    var f = l ? "[selected]" : ":checked", v;
    if (e.multiple)
      v = [].map.call(e.querySelectorAll(f), Oa);
    else {
      var p = e.querySelector(f) ?? // will fall back to first non-disabled option if no option is selected
      e.querySelector("option:not([disabled])");
      v = p && Oa(p);
    }
    a(v), ft !== null && n.add(ft);
  }), _n(() => {
    var l = t();
    if (e === document.activeElement) {
      var f = (
        /** @type {Batch} */
        cs ?? ft
      );
      if (n.has(f))
        return;
    }
    if (Zi(e, l, c), c && l === void 0) {
      var v = e.querySelector(":checked");
      v !== null && (l = Oa(v), a(l));
    }
    e.__value = l, c = !1;
  }), al(e);
}
function Oa(e) {
  return "__value" in e ? e.__value : e.value;
}
const sl = /* @__PURE__ */ Symbol("is custom element"), nl = /* @__PURE__ */ Symbol("is html");
function wt(e) {
  if (ot) {
    var t = !1, a = () => {
      if (!t) {
        if (t = !0, e.hasAttribute("value")) {
          var n = e.value;
          It(e, "value", null), e.value = n;
        }
        if (e.hasAttribute("checked")) {
          var c = e.checked;
          It(e, "checked", null), e.checked = c;
        }
      }
    };
    e.__on_r = a, yr(a), Di();
  }
}
function It(e, t, a, n) {
  var c = il(e);
  ot && (c[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === "LINK") || c[t] !== (c[t] = a) && (t === "loading" && (e[nc] = a), a == null ? e.removeAttribute(t) : typeof a != "string" && ol(e).includes(t) ? e[t] = a : e.setAttribute(t, a));
}
function il(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    e.__attributes ??= {
      [sl]: e.nodeName.includes("-"),
      [nl]: e.namespaceURI === Zo
    }
  );
}
var zn = /* @__PURE__ */ new Map();
function ol(e) {
  var t = e.getAttribute("is") || e.nodeName, a = zn.get(t);
  if (a) return a;
  zn.set(t, a = []);
  for (var n, c = e, l = Element.prototype; l !== c; ) {
    n = ai(c);
    for (var f in n)
      n[f].set && a.push(f);
    c = cn(c);
  }
  return a;
}
function xt(e, t, a = t) {
  var n = /* @__PURE__ */ new WeakSet();
  Pi(e, "input", async (c) => {
    var l = c ? e.defaultValue : e.value;
    if (l = Ps(e) ? Ts(l) : l, a(l), ft !== null && n.add(ft), await bn(), l !== (l = t())) {
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
  oa(t) == null && e.value) && (a(Ps(e) ? Ts(e.value) : e.value), ft !== null && n.add(ft)), gs(() => {
    var c = t();
    if (e === document.activeElement) {
      var l = (
        /** @type {Batch} */
        cs ?? ft
      );
      if (n.has(l))
        return;
    }
    Ps(e) && c === Ts(e.value) || e.type === "date" && !c && !e.value || c !== e.value && (e.value = c ?? "");
  });
}
function Ps(e) {
  var t = e.type;
  return t === "number" || t === "range";
}
function Ts(e) {
  return e === "" ? null : +e;
}
function Un(e, t) {
  return e === t || e?.[qr] === t;
}
function ea(e = {}, t, a, n) {
  return _n(() => {
    var c, l;
    return gs(() => {
      c = l, l = [], oa(() => {
        e !== a(...l) && (t(e, ...l), c && Un(a(...c), e) && t(null, ...c));
      });
    }), () => {
      yr(() => {
        l && Un(a(...l), e) && t(null, ...l);
      });
    };
  }), e;
}
function cl(e = !1) {
  const t = (
    /** @type {ComponentContextLegacy} */
    $t
  ), a = t.l.u;
  if (!a) return;
  let n = () => Gc(t.s);
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
  a.b.length && Nc(() => {
    Wn(t, n), ns(a.b);
  }), Rt(() => {
    const c = oa(() => a.m.map(ac));
    return () => {
      for (const l of c)
        typeof l == "function" && l();
    };
  }), a.a.length && Rt(() => {
    Wn(t, n), ns(a.a);
  });
}
function Wn(e, t) {
  if (e.l.s)
    for (const a of e.l.s) r(a);
  t();
}
function mn(e, t, a) {
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
function ll(e, t) {
  return {
    subscribe: et(e, t).subscribe
  };
}
function et(e, t = Pr) {
  let a = null;
  const n = /* @__PURE__ */ new Set();
  function c(v) {
    if (ui(e, v) && (e = v, a)) {
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
  return ll(a, (f, v) => {
    let p = !1;
    const h = [];
    let m = 0, C = Pr;
    const w = () => {
      if (m)
        return;
      C();
      const D = t(n ? h[0] : h, f, v);
      l ? f(D) : C = typeof D == "function" ? D : Pr;
    }, V = c.map(
      (D, se) => mn(
        D,
        (R) => {
          h[se] = R, m &= ~(1 << se), p && w();
        },
        () => {
          m |= 1 << se;
        }
      )
    );
    return p = !0, w(), function() {
      ns(V), C(), p = !1;
    };
  });
}
function Xt(e) {
  let t;
  return mn(e, (a) => t = a)(), t;
}
let zs = /* @__PURE__ */ Symbol();
function Ee(e, t, a) {
  const n = a[t] ??= {
    store: null,
    source: /* @__PURE__ */ fn(void 0),
    unsubscribe: Pr
  };
  if (n.store !== e && !(zs in a))
    if (n.unsubscribe(), n.store = e ?? null, e == null)
      n.source.v = void 0, n.unsubscribe = Pr;
    else {
      var c = !0;
      n.unsubscribe = mn(e, (l) => {
        c ? n.source.v = l : _(n.source, l);
      }), c = !1;
    }
  return e && zs in a ? Xt(e) : r(n.source);
}
function Nt() {
  const e = {};
  function t() {
    hs(() => {
      for (var a in e)
        e[a].unsubscribe();
      Ba(e, zs, {
        enumerable: !1,
        value: !0
      });
    });
  }
  return [e, t];
}
function pt(e, t, a, n) {
  var c = !ka || (a & Yo) !== 0, l = (a & Jo) !== 0, f = (
    /** @type {V} */
    n
  ), v = !0, p = () => (v && (v = !1, f = /** @type {V} */
  n), f), h;
  h = /** @type {V} */
  e[t], h === void 0 && n !== void 0 && (h = p());
  var m;
  if (c ? m = () => {
    var D = (
      /** @type {V} */
      e[t]
    );
    return D === void 0 ? p() : (v = !0, D);
  } : m = () => {
    var D = (
      /** @type {V} */
      e[t]
    );
    return D !== void 0 && (f = /** @type {V} */
    void 0), D === void 0 ? f : D;
  }, c && (a & Ko) === 0)
    return m;
  var C = !1, w = /* @__PURE__ */ Ya(() => (C = !1, m())), V = (
    /** @type {Effect} */
    vt
  );
  return (
    /** @type {() => V} */
    (function(D, se) {
      if (arguments.length > 0) {
        const R = se ? r(w) : c && l ? Vt(D) : D;
        return _(w, R), C = !0, f !== void 0 && (f = R), D;
      }
      return zr && C || (V.f & Tr) !== 0 ? w.v : r(w);
    })
  );
}
function dl(e) {
  return new ul(e);
}
class ul {
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
      var v = /* @__PURE__ */ fn(f, !1, !1);
      return a.set(l, v), v;
    };
    const c = new Proxy(
      { ...t.props || {}, $$events: {} },
      {
        get(l, f) {
          return r(a.get(f) ?? n(f, Reflect.get(l, f)));
        },
        has(l, f) {
          return f === sc ? !0 : (r(a.get(f) ?? n(f, Reflect.get(l, f))), Reflect.has(l, f));
        },
        set(l, f, v) {
          return _(a.get(f) ?? n(f, v), v), Reflect.set(l, f, v);
        }
      }
    );
    this.#t = (t.hydrate ? Uc : Ki)(t.component, {
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
      Wc(this.#t);
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
let eo;
typeof HTMLElement == "function" && (eo = class extends HTMLElement {
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
      const t = {}, a = vl(this);
      for (const n of this.$$s)
        n in a && (n === "default" && !this.$$d.children ? (this.$$d.children = e(n), t.default = !0) : t[n] = e(n));
      for (const n of this.attributes) {
        const c = this.$$g_p(n.name);
        c in this.$$d || (this.$$d[c] = Xa(c, n.value, this.$$p_d, "toProp"));
      }
      for (const n in this.$$p_d)
        !(n in this.$$d) && this[n] !== void 0 && (this.$$d[n] = this[n], delete this[n]);
      this.$$c = dl({
        component: this.$$ctor,
        target: this.$$shadowRoot || this,
        props: {
          ...this.$$d,
          $$slots: t,
          $$host: this
        }
      }), this.$$me = Lc(() => {
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
function vl(e) {
  const t = {};
  return e.childNodes.forEach((a) => {
    t[
      /** @type {Element} node */
      a.slot || "default"
    ] = !0;
  }), t;
}
function kt(e, t, a, n, c, l) {
  let f = class extends eo {
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
          var m = fa(h, v)?.get;
          m ? h[v] = p : h.$set({ [v]: p });
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
const to = 8, ro = 16, Fa = 64;
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
function Us(e, t) {
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
let Ws;
function fl(e) {
  Ws = e;
}
function Ze() {
  if (!Ws)
    throw new Error("Martha API not initialized. Call setApi() first.");
  return Ws;
}
const ao = "hecate://localhost";
async function pl() {
  try {
    const e = await fetch(`${ao}/api/llm/models`);
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
function xl(e, t) {
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
          const v = await fetch(`${ao}/api/llm/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model: e, messages: t })
          });
          if (l) return;
          if (!v.ok) {
            const h = await v.text().catch(() => v.statusText);
            c && c(h || "LLM request failed");
            return;
          }
          const p = await v.json();
          a && a({ content: p.content }), n && n({ content: "", done: !0 });
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
function so() {
  return {
    stream: {
      chat: xl
    }
  };
}
const yn = et(!1), no = et(""), wn = et(null), io = et(null), $n = et([]);
function kn(e) {
  const t = e.name.toLowerCase(), a = e.context_length;
  return e.format !== "api" ? "local" : /claude-opus|claude-sonnet-4|o4-mini|o3|gpt-4o$/.test(t) || /gemini-2\.5-pro/.test(t) ? "flagship" : /claude-haiku|claude-sonnet|gpt-4o-mini|gemini-2\.5-flash|gemini-2\.0-flash/.test(t) || /llama-3\.3|llama-3\.1/.test(t) && a >= 32e3 ? "balanced" : /flash|mini|nano|small|lite|fast/.test(t) || a > 0 && a <= 8192 ? "fast" : "balanced";
}
function oo(e, t) {
  const a = kn(e);
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
function _l(e, t = "general") {
  return e.length === 0 ? null : e.map((n) => ({ model: n, tier: kn(n), score: oo(n, t) })).sort((n, c) => c.score - n.score)[0]?.model ?? null;
}
function hl(e, t = "general", a = 5) {
  return e.map((n) => ({ model: n, tier: kn(n), score: oo(n, t) })).sort((n, c) => c.score - n.score).slice(0, a);
}
const Cn = Tt(
  [io, $n],
  ([e, t]) => e || (_l(t, "general")?.name ?? null)
), co = "hecate-app-martha-phase-models";
function gl() {
  try {
    const e = localStorage.getItem(co);
    if (e)
      return { storming: null, planning: null, kanban: null, crafting: null, ...JSON.parse(e) };
  } catch {
  }
  return { storming: null, planning: null, kanban: null, crafting: null };
}
function bl(e) {
  try {
    localStorage.setItem(co, JSON.stringify(e));
  } catch {
  }
}
const lo = et(gl()), ml = [
  /code/i,
  /coder/i,
  /codestral/i,
  /starcoder/i,
  /codellama/i,
  /wizard-?coder/i,
  /deepseek-coder/i
];
function yl(e) {
  return ml.some((t) => t.test(e)) ? "code" : "general";
}
function wl(e) {
  return e === "crafting" ? "code" : e === "storming" ? "creative" : "general";
}
function Rs(e) {
  return e <= 0 ? "" : e >= 1e6 ? `${Math.round(e / 1e6)}M` : e >= 1e3 ? `${Math.round(e / 1e3)}k` : `${e}`;
}
function Er(e, t) {
  wn.set(t ?? null), no.set(e), yn.set(!0);
}
function $l() {
  yn.set(!1), wn.set(null);
}
function Sn(e) {
  io.set(e);
}
function Yn(e, t) {
  lo.update((a) => {
    const n = { ...a, [e]: t };
    return bl(n), n;
  });
}
function kl(e) {
  return e.split(`
`).map((t) => t.replace(/^[\s\-*\u2022\d.]+/, "").trim()).filter((t) => t.length > 0 && t.length < 80 && !t.includes(":")).map((t) => t.replace(/["`]/g, ""));
}
const Mr = [
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
  (e) => e ? Br(e.status, Fa) ? "archived" : Br(e.status, ro) ? "discovery_paused" : Br(e.status, to) ? "discovering" : e.phase || "initiated" : "none"
);
function ja(e) {
  St.set(e);
}
function Ys() {
  St.set(null);
}
async function ms() {
  try {
    const t = await Ze().get("/ventures");
    wa.set(t.ventures);
  } catch {
    wa.set([]);
  }
}
async function kr() {
  try {
    const t = await Ze().get("/venture");
    St.set(t.venture);
  } catch {
    St.set(null);
  }
}
async function Sa(e) {
  try {
    const a = await Ze().get(
      `/ventures/${e}/divisions`
    );
    Ur.set(a.divisions);
  } catch {
    Ur.set([]);
  }
}
async function uo(e, t) {
  try {
    Et.set(!0);
    const n = await Ze().post("/ventures/initiate", { name: e, brief: t, initiated_by: "hecate-web" }), c = {
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
async function vo(e, t, a, n, c) {
  try {
    return Et.set(!0), await Ze().post(`/ventures/${e}/repo`, {
      repo_url: t,
      vision: a || void 0,
      name: n || void 0,
      brief: c || void 0
    }), await kr(), !0;
  } catch (l) {
    const f = l;
    return br.set(f.message || "Failed to scaffold venture repo"), !1;
  } finally {
    Et.set(!1);
  }
}
async function En(e) {
  try {
    return Et.set(!0), await Ze().post(`/ventures/${e}/discovery/start`, {}), await kr(), !0;
  } catch (t) {
    const a = t;
    return br.set(a.message || "Failed to start discovery"), !1;
  } finally {
    Et.set(!1);
  }
}
async function fo(e, t, a) {
  try {
    return Et.set(!0), await Ze().post(`/ventures/${e}/discovery/identify`, {
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
async function po(e, t) {
  try {
    return Et.set(!0), await Ze().post(`/ventures/${e}/discovery/pause`, {
      reason: t || null
    }), await kr(), !0;
  } catch (a) {
    const n = a;
    return br.set(n.message || "Failed to pause discovery"), !1;
  } finally {
    Et.set(!1);
  }
}
async function xo(e) {
  try {
    return Et.set(!0), await Ze().post(`/ventures/${e}/discovery/resume`, {}), await kr(), !0;
  } catch (t) {
    const a = t;
    return br.set(a.message || "Failed to resume discovery"), !1;
  } finally {
    Et.set(!1);
  }
}
async function _o(e) {
  try {
    return Et.set(!0), await Ze().post(`/ventures/${e}/discovery/complete`, {}), await kr(), !0;
  } catch (t) {
    const a = t;
    return br.set(a.message || "Failed to complete discovery"), !1;
  } finally {
    Et.set(!1);
  }
}
const Cl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activeVenture: St,
  clearActiveVenture: Ys,
  completeDiscovery: _o,
  divisions: Ur,
  fetchActiveVenture: kr,
  fetchDivisions: Sa,
  fetchVentures: ms,
  identifyDivision: fo,
  initiateVenture: uo,
  isLoading: Et,
  pauseDiscovery: po,
  resumeDiscovery: xo,
  scaffoldVentureRepo: vo,
  selectVenture: ja,
  selectedDivision: Yr,
  selectedDivisionId: xa,
  startDiscovery: En,
  ventureError: br,
  ventureStep: bs,
  ventures: wa
}, Symbol.toStringTag, { value: "Module" })), qa = et("storming"), ys = et(null), Nr = et(!1);
function ws(e) {
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
async function Sl(e, t) {
  try {
    Nr.set(!0), await Ze().post(`/${ws(t)}/${e}/open`, {});
    const n = Xt(St);
    return n && await Sa(n.venture_id), !0;
  } catch (a) {
    const n = a;
    return ys.set(n.message || `Failed to open ${t}`), !1;
  } finally {
    Nr.set(!1);
  }
}
async function El(e, t, a) {
  try {
    Nr.set(!0), await Ze().post(`/${ws(t)}/${e}/shelve`, {
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
async function Al(e, t) {
  try {
    Nr.set(!0), await Ze().post(`/${ws(t)}/${e}/resume`, {});
    const n = Xt(St);
    return n && await Sa(n.venture_id), !0;
  } catch (a) {
    const n = a;
    return ys.set(n.message || `Failed to resume ${t}`), !1;
  } finally {
    Nr.set(!1);
  }
}
async function Dl(e, t) {
  try {
    Nr.set(!0), await Ze().post(`/${ws(t)}/${e}/conclude`, {});
    const n = Xt(St);
    return n && await Sa(n.venture_id), !0;
  } catch (a) {
    const n = a;
    return ys.set(n.message || `Failed to conclude ${t}`), !1;
  } finally {
    Nr.set(!1);
  }
}
const sa = et("ready"), Ea = et([]), $s = et([]), An = et([]), ds = et(600), Dn = et([]), Ks = et(!1), qt = et(null), Js = et(!1);
let Qr = null;
const Pl = Tt(
  Ea,
  (e) => e.filter((t) => !t.cluster_id)
), Tl = Tt(
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
), Rl = Tt(
  Ea,
  (e) => e.length
);
async function Wt(e) {
  try {
    const n = (await Ze().get(
      `/ventures/${e}/storm/state`
    )).storm;
    sa.set(n.phase), Ea.set(n.stickies), $s.set(n.clusters), An.set(n.arrows);
  } catch {
    sa.set("ready");
  }
}
async function Kn(e, t = 0, a = 50) {
  try {
    const c = await Ze().get(
      `/ventures/${e}/events?offset=${t}&limit=${a}`
    );
    return Dn.set(c.events), { events: c.events, count: c.count };
  } catch {
    return { events: [], count: 0 };
  }
}
async function Ml(e) {
  try {
    return Js.set(!0), await Ze().post(`/ventures/${e}/storm/start`, {}), sa.set("storm"), ds.set(600), Qr = setInterval(() => {
      ds.update((a) => a <= 1 ? (Qr && (clearInterval(Qr), Qr = null), 0) : a - 1);
    }, 1e3), !0;
  } catch (t) {
    const a = t;
    return qt.set(a.message || "Failed to start storm"), !1;
  } finally {
    Js.set(!1);
  }
}
async function Za(e, t, a = "user") {
  try {
    return await Ze().post(`/ventures/${e}/storm/sticky`, { text: t, author: a }), await Wt(e), !0;
  } catch (n) {
    const c = n;
    return qt.set(c.message || "Failed to post sticky"), !1;
  }
}
async function Il(e, t) {
  try {
    return await Ze().post(`/ventures/${e}/storm/sticky/${t}/pull`, {}), await Wt(e), !0;
  } catch (a) {
    const n = a;
    return qt.set(n.message || "Failed to pull sticky"), !1;
  }
}
async function Jn(e, t, a) {
  try {
    return await Ze().post(`/ventures/${e}/storm/sticky/${t}/stack`, {
      target_sticky_id: a
    }), await Wt(e), !0;
  } catch (n) {
    const c = n;
    return qt.set(c.message || "Failed to stack sticky"), !1;
  }
}
async function Nl(e, t) {
  try {
    return await Ze().post(`/ventures/${e}/storm/sticky/${t}/unstack`, {}), await Wt(e), !0;
  } catch (a) {
    const n = a;
    return qt.set(n.message || "Failed to unstack sticky"), !1;
  }
}
async function Ll(e, t, a) {
  try {
    return await Ze().post(`/ventures/${e}/storm/stack/${t}/groom`, {
      canonical_sticky_id: a
    }), await Wt(e), !0;
  } catch (n) {
    const c = n;
    return qt.set(c.message || "Failed to groom stack"), !1;
  }
}
async function Qn(e, t, a) {
  try {
    return await Ze().post(`/ventures/${e}/storm/sticky/${t}/cluster`, {
      target_cluster_id: a
    }), await Wt(e), !0;
  } catch (n) {
    const c = n;
    return qt.set(c.message || "Failed to cluster sticky"), !1;
  }
}
async function Ol(e, t) {
  try {
    return await Ze().post(`/ventures/${e}/storm/sticky/${t}/uncluster`, {}), await Wt(e), !0;
  } catch (a) {
    const n = a;
    return qt.set(n.message || "Failed to uncluster sticky"), !1;
  }
}
async function Fl(e, t) {
  try {
    return await Ze().post(`/ventures/${e}/storm/cluster/${t}/dissolve`, {}), await Wt(e), !0;
  } catch (a) {
    const n = a;
    return qt.set(n.message || "Failed to dissolve cluster"), !1;
  }
}
async function jl(e, t, a) {
  try {
    return await Ze().post(`/ventures/${e}/storm/cluster/${t}/name`, { name: a }), await Wt(e), !0;
  } catch (n) {
    const c = n;
    return qt.set(c.message || "Failed to name cluster"), !1;
  }
}
async function Bl(e, t, a, n) {
  try {
    return await Ze().post(`/ventures/${e}/storm/fact`, {
      from_cluster: t,
      to_cluster: a,
      fact_name: n
    }), await Wt(e), !0;
  } catch (c) {
    const l = c;
    return qt.set(l.message || "Failed to draw fact arrow"), !1;
  }
}
async function Vl(e, t) {
  try {
    return await Ze().post(`/ventures/${e}/storm/fact/${t}/erase`, {}), await Wt(e), !0;
  } catch (a) {
    const n = a;
    return qt.set(n.message || "Failed to erase fact arrow"), !1;
  }
}
async function Gl(e, t) {
  try {
    return await Ze().post(`/ventures/${e}/storm/cluster/${t}/promote`, {}), await Wt(e), !0;
  } catch (a) {
    const n = a;
    return qt.set(n.message || "Failed to promote cluster"), !1;
  }
}
async function Ta(e, t) {
  try {
    return await Ze().post(`/ventures/${e}/storm/phase/advance`, {
      target_phase: t
    }), await Wt(e), !0;
  } catch (a) {
    const n = a;
    return qt.set(n.message || "Failed to advance phase"), !1;
  }
}
async function ql(e) {
  try {
    return await Ze().post(`/ventures/${e}/storm/shelve`, {}), sa.set("shelved"), !0;
  } catch (t) {
    const a = t;
    return qt.set(a.message || "Failed to shelve storm"), !1;
  }
}
async function Hl(e) {
  try {
    return await Ze().post(`/ventures/${e}/storm/resume`, {}), await Wt(e), !0;
  } catch (t) {
    const a = t;
    return qt.set(a.message || "Failed to resume storm"), !1;
  }
}
async function zl(e) {
  const t = Xt($s);
  let a = !0;
  for (const n of t) {
    if (n.status !== "active" || !n.name?.trim()) continue;
    await Gl(e, n.cluster_id) || (a = !1);
  }
  if (a) {
    const { fetchDivisions: n } = await Promise.resolve().then(() => Cl);
    await n(e);
  }
  return a;
}
function Ul() {
  Qr && (clearInterval(Qr), Qr = null), sa.set("ready"), Ea.set([]), $s.set([]), An.set([]), Dn.set([]), ds.set(600);
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
}, Wl = [
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
], ho = et([]), ca = et([]), tr = et(null), Qs = et(!1), es = et(null), Xs = et([]), Aa = et([]), Yl = Tt(
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
    Qs.set(!0), tr.set(null);
    const a = await Ze().get(
      `/ventures/${e}/agents/sessions`
    );
    ho.set(a.sessions ?? []), rd(a.sessions ?? []), ad(a.sessions ?? []);
  } catch (t) {
    const a = t;
    tr.set(a.message || "Failed to fetch agent sessions");
  } finally {
    Qs.set(!1);
  }
}
async function Xl(e, t) {
  try {
    tr.set(null);
    const n = await Ze().get(
      `/ventures/${e}/agents/sessions/${t}`
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
      `/ventures/${e}/agents/sessions/${t}/turns`
    );
    Xs.set(n.turns ?? []);
  } catch {
    Xs.set([]);
  }
}
async function ed(e, t, a) {
  try {
    tr.set(null);
    const n = Ze(), c = {};
    return await n.post(`/ventures/${e}/agents/${t}/initiate`, c), await $a(e), !0;
  } catch (n) {
    const c = n;
    return tr.set(c.message || `Failed to initiate ${t}`), !1;
  }
}
async function go(e, t, a) {
  try {
    return tr.set(null), await Ze().post(`/ventures/${e}/agents/${t}/gate/pass`, { session_id: a }), await $a(e), !0;
  } catch (n) {
    const c = n;
    return tr.set(c.message || "Failed to pass gate"), !1;
  }
}
async function bo(e, t, a, n) {
  try {
    return tr.set(null), await Ze().post(`/ventures/${e}/agents/${t}/gate/reject`, {
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
    return tr.set(null), await Ze().post(`/ventures/${e}/agents/sessions/${t}/archive`, {}), await $a(e), !0;
  } catch (a) {
    const n = a;
    return tr.set(n.message || "Failed to archive session"), !1;
  }
}
function rd(e) {
  const t = Wl.map((a) => {
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
const pr = et("disconnected"), sd = et(null), mo = "hecate://localhost", yo = "/plugin/hecate-app-martha/api/events/stream", nd = 3e3;
let Vr = null, Ir = null, ts = [];
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
function wo() {
  if (!Vr) {
    pr.set("connecting");
    try {
      Vr = new EventSource(`${mo}${yo}`), Vr.onopen = () => {
        pr.set("connected"), Ir && (clearTimeout(Ir), Ir = null);
      }, Vr.onerror = () => {
        pr.set("disconnected"), ko(), Zs();
      }, Vr.onmessage = (e) => {
        $o("message", e.data);
      };
    } catch {
      pr.set("disconnected"), cd();
    }
  }
}
async function cd() {
  pr.set("connecting");
  try {
    const e = await fetch(`${mo}${yo}`);
    if (!e.ok || !e.body) {
      pr.set("disconnected"), Zs();
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
  pr.set("disconnected"), Zs();
}
function ld(e) {
  let t = "message", a = "";
  for (const n of e.split(`
`))
    n.startsWith("event: ") ? t = n.slice(7) : n.startsWith("data: ") && (a = n.slice(6));
  a && $o(t, a);
}
function $o(e, t) {
  try {
    const a = JSON.parse(t);
    od({ type: e, data: a, receivedAt: Date.now() });
  } catch {
  }
}
function Zs() {
  Ir || (Ir = setTimeout(() => {
    Ir = null, wo();
  }, nd));
}
function ko() {
  Vr && (Vr.close(), Vr = null);
}
function dd() {
  Ir && (clearTimeout(Ir), Ir = null), ko(), pr.set("disconnected");
}
const Xn = 50;
let lr = 0;
const Co = et([]), Pn = et(0), ud = Tt(
  Co,
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
    const c = Ms(t);
    return {
      id: `act-${lr++}`,
      type: t,
      summary: `${c} phase opened`,
      severity: "info",
      timestamp: n
    };
  }
  if (t.includes("_shelved_v")) {
    const c = Ms(t);
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
    const c = Ms(t);
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
function Ms(e) {
  return e.includes("planning") ? "Planning" : e.includes("crafting") ? "Crafting" : e.includes("storming") ? "Storming" : e.includes("kanban") ? "Kanban" : "Phase";
}
function Ra(e) {
  return e.replace(/_v\d+$/, "").replace(/_/g, " ").replace(/\b\w/g, (t) => t.toUpperCase());
}
function fd() {
  return id((e) => {
    const t = vd(e);
    t && (Co.update((a) => {
      const n = [t, ...a];
      return n.length > Xn && (n.length = Xn), n;
    }), Pn.update((a) => a + 1));
  });
}
function pd() {
  Pn.set(0);
}
const Zn = et(!1), xd = et(null), _d = et(null);
async function hd(e, t) {
  try {
    Zn.set(!0);
    const n = await Ze().post(
      `/ventures/${e}/vision/refine`,
      { vision: t }
    );
    return xd.set(n.refined), await kr(), !0;
  } catch (a) {
    const n = a;
    return _d.set(n.message || "Failed to refine vision"), !1;
  } finally {
    Zn.set(!1);
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
function So(e, t) {
  bt(t, !0);
  const a = () => Ee(St, "$activeVenture", p), n = () => Ee(wa, "$ventures", p), c = () => Ee(bs, "$ventureStep", p), l = () => Ee(Ur, "$divisions", p), f = () => Ee(Et, "$isLoading", p), v = () => Ee(br, "$ventureError", p), [p, h] = Nt();
  let m = /* @__PURE__ */ ve(!1), C = /* @__PURE__ */ ve(!1), w = /* @__PURE__ */ ve(!1), V = /* @__PURE__ */ ve(""), D = /* @__PURE__ */ ve(""), se = /* @__PURE__ */ ve("");
  async function R() {
    if (!a() || !r(V).trim()) return;
    await hd(a().venture_id, r(V).trim()) && (_(m, !1), _(V, ""));
  }
  async function U() {
    a() && await En(a().venture_id);
  }
  async function ue() {
    if (!a() || !r(D).trim()) return;
    await fo(a().venture_id, r(D).trim(), r(se).trim() || void 0) && (_(C, !1), _(D, ""), _(se, ""));
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
  ie.__click = () => Ys();
  var Fe = i(ie);
  Fe.textContent = "←", Dt(2), s(ie);
  var Pe = o(ie, 4), Me = i(Pe);
  Me.textContent = "◆";
  var ce = o(Me, 2);
  ce.__click = () => _(w, !r(w));
  var G = i(ce), I = o(G);
  I.textContent = "▾", s(ce);
  var H = o(ce, 2);
  {
    var W = (S) => {
      var k = md(), q = i(k);
      He(q, 1, () => n().filter((Be) => !(Be.status & Fa)), ct, (Be, B) => {
        var O = bd();
        O.__click = () => {
          ja(r(B)), _(w, !1);
        };
        var J = i(O), Te = i(J, !0);
        s(J);
        var Oe = o(J, 2);
        {
          var Ke = (Qe) => {
            var tt = gd(), Ye = i(tt, !0);
            s(tt), g(() => x(Ye, r(B).brief)), d(Qe, tt);
          };
          A(Oe, (Qe) => {
            r(B).brief && Qe(Ke);
          });
        }
        s(O), g(() => {
          Re(O, 1, `w-full text-left px-3 py-2 text-xs transition-colors
								${r(B).venture_id === a()?.venture_id ? "bg-hecate-600/20 text-hecate-300" : "text-surface-200 hover:bg-surface-600"}`), x(Te, r(B).name);
        }), d(Be, O);
      });
      var oe = o(q, 2);
      oe.__click = () => {
        Ys(), _(w, !1);
      }, s(k), d(S, k);
    };
    A(H, (S) => {
      r(w) && S(W);
    });
  }
  s(Pe);
  var N = o(Pe, 2), M = i(N, !0);
  s(N);
  var j = o(N, 2);
  {
    var $e = (S) => {
      var k = yd(), q = i(k, !0);
      s(k), g(() => x(q, a().brief)), d(S, k);
    };
    A(j, (S) => {
      a()?.brief && S($e);
    });
  }
  var je = o(j, 4);
  {
    var qe = (S) => {
      var k = wd(), q = i(k);
      s(k), g(() => x(q, `${l().length ?? ""} division${l().length !== 1 ? "s" : ""}`)), d(S, k);
    };
    A(je, (S) => {
      l().length > 0 && S(qe);
    });
  }
  var Ve = o(je, 2);
  {
    var Se = (S) => {
      var k = $d();
      d(S, k);
    }, Ne = (S) => {
      var k = kd();
      k.__click = U, g(() => k.disabled = f()), d(S, k);
    }, be = (S) => {
      var k = Sd(), q = it(k);
      q.__click = () => _(C, !r(C));
      var oe = o(q, 2);
      oe.__click = () => a() && po(a().venture_id);
      var Be = o(oe, 2);
      {
        var B = (O) => {
          var J = Cd();
          J.__click = () => a() && _o(a().venture_id), g(() => J.disabled = f()), d(O, J);
        };
        A(Be, (O) => {
          l().length > 0 && O(B);
        });
      }
      g(() => {
        q.disabled = f(), oe.disabled = f();
      }), d(S, k);
    }, K = (S) => {
      var k = Ed();
      k.__click = () => a() && xo(a().venture_id), g(() => k.disabled = f()), d(S, k);
    };
    A(Ve, (S) => {
      c() === "initiated" || c() === "vision_refined" ? S(Se) : c() === "vision_submitted" ? S(Ne, 1) : c() === "discovering" ? S(be, 2) : c() === "discovery_paused" && S(K, 3);
    });
  }
  s(fe);
  var $ = o(fe, 2);
  {
    var E = (S) => {
      var k = Ad(), q = i(k, !0);
      s(k), g(() => x(q, v())), d(S, k);
    };
    A($, (S) => {
      v() && S(E);
    });
  }
  var F = o($, 2);
  {
    var P = (S) => {
      var k = Dd(), q = i(k), oe = o(i(q), 2);
      Ca(oe), It(oe, "rows", 2), s(q);
      var Be = o(q, 2);
      Be.__click = R;
      var B = o(Be, 2);
      B.__click = () => _(m, !1), s(k), g((O) => Be.disabled = O, [() => !r(V).trim() || f()]), xt(oe, () => r(V), (O) => _(V, O)), d(S, k);
    };
    A(F, (S) => {
      r(m) && S(P);
    });
  }
  var te = o(F, 2);
  {
    var Le = (S) => {
      var k = Pd(), q = i(k), oe = o(i(q), 2);
      wt(oe), s(q);
      var Be = o(q, 2), B = o(i(Be), 2);
      wt(B), s(Be);
      var O = o(Be, 2);
      O.__click = ue;
      var J = o(O, 2);
      J.__click = () => _(C, !1), s(k), g((Te) => O.disabled = Te, [() => !r(D).trim() || f()]), xt(oe, () => r(D), (Te) => _(D, Te)), xt(B, () => r(se), (Te) => _(se, Te)), d(S, k);
    };
    A(te, (S) => {
      r(C) && S(Le);
    });
  }
  s(ge), g(
    (S) => {
      x(G, `${a()?.name ?? "Venture" ?? ""} `), Re(N, 1, `text-[10px] px-2 py-0.5 rounded-full border ${S ?? ""}`), x(M, a()?.status_label ?? "New");
    },
    [() => Ce(c())]
  ), d(e, ge), mt(), h();
}
At(["click"]);
kt(So, {}, [], [], { mode: "open" });
var Rd = /* @__PURE__ */ u('<p class="text-xs text-surface-300 mt-1.5 max-w-md mx-auto"> </p>'), Md = /* @__PURE__ */ u("<span></span>"), Id = /* @__PURE__ */ u('<div class="flex items-center gap-1"><div class="flex flex-col items-center gap-0.5 px-2"><span> </span> <span> </span></div> <!></div>'), Nd = /* @__PURE__ */ u('<div class="rounded-lg border border-surface-600 bg-surface-800 p-3 col-span-2"><div class="text-[9px] text-surface-400 uppercase tracking-wider mb-1">Repository</div> <div class="text-xs text-surface-200 font-mono"> </div></div>'), Ld = /* @__PURE__ */ u('<div class="rounded-lg border border-hecate-600/30 bg-hecate-600/5 p-5 text-center"><div class="text-xs text-surface-200 mb-3">Your venture repo has been scaffolded. The next step is <strong class="text-hecate-300">Big Picture Event Storming</strong> </div> <button> </button></div>'), Od = /* @__PURE__ */ u(`<div class="rounded-lg border border-surface-600 bg-surface-800 p-5 text-center"><div class="text-xs text-surface-200 mb-2">Discovery is complete. Identify divisions (bounded contexts)
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
    await En(a().venture_id) && (await kr(), await ms());
  }
  const m = [
    { key: "vision", label: "Vision", icon: "◇" },
    { key: "discovery", label: "Discovery", icon: "○" },
    { key: "design", label: "Design", icon: "△" },
    { key: "plan", label: "Plan", icon: "□" },
    { key: "implement", label: "Implement", icon: "⚙" },
    { key: "deploy", label: "Deploy", icon: "▲" },
    { key: "monitor", label: "Monitor", icon: "◉" },
    { key: "rescue", label: "Rescue", icon: "↺" }
  ];
  let C = /* @__PURE__ */ we(() => {
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
  }, V = Bd(), D = i(V), se = i(D);
  {
    var R = (ue) => {
      var Ce = jd(), ge = it(Ce), fe = i(ge);
      fe.textContent = "◆";
      var ie = o(fe, 2), Fe = i(ie, !0);
      s(ie);
      var Pe = o(ie, 2);
      {
        var Me = (be) => {
          var K = Rd(), $ = i(K, !0);
          s(K), g(() => x($, a().brief)), d(be, K);
        };
        A(Pe, (be) => {
          a().brief && be(Me);
        });
      }
      s(ge);
      var ce = o(ge, 2);
      He(ce, 21, () => m, ct, (be, K, $) => {
        const E = /* @__PURE__ */ we(() => $ < r(C)), F = /* @__PURE__ */ we(() => $ === r(C)), P = /* @__PURE__ */ we(() => $ === r(C) + 1);
        var te = Id(), Le = i(te), S = i(Le), k = i(S, !0);
        s(S);
        var q = o(S, 2), oe = i(q, !0);
        s(q), s(Le);
        var Be = o(Le, 2);
        {
          var B = (O) => {
            var J = Md();
            J.textContent = "→", g(() => Re(J, 1, `text-[10px]
									${r(E) ? "text-health-ok/40" : "text-surface-700"}`)), d(O, J);
          };
          A(Be, (O) => {
            $ < m.length - 1 && O(B);
          });
        }
        s(te), g(() => {
          It(Le, "title", r(K).label), Re(S, 1, `text-sm transition-colors
									${r(E) ? "text-health-ok" : r(F) ? "text-hecate-400" : "text-surface-600"}`), x(k, r(E) ? "✓" : r(K).icon), Re(q, 1, `text-[9px] transition-colors
									${r(E) ? "text-health-ok/70" : r(F) ? "text-hecate-300" : r(P) ? "text-surface-400" : "text-surface-600"}`), x(oe, r(K).label);
        }), d(be, te);
      }), s(ce);
      var G = o(ce, 2), I = i(G), H = o(i(I), 2), W = i(H, !0);
      s(H), s(I);
      var N = o(I, 2), M = o(i(N), 2), j = i(M, !0);
      s(M), s(N);
      var $e = o(N, 2);
      {
        var je = (be) => {
          var K = Nd(), $ = o(i(K), 2), E = i($, !0);
          s($), s(K), g(() => x(E, a().repos[0])), d(be, K);
        };
        A($e, (be) => {
          a().repos && a().repos.length > 0 && be(je);
        });
      }
      s(G);
      var qe = o(G, 2);
      {
        var Ve = (be) => {
          var K = Ld(), $ = i(K), E = o(i($), 2);
          E.nodeValue = " — discover the domain events that define your system.", s($);
          var F = o($, 2);
          F.__click = h;
          var P = i(F, !0);
          s(F), s(K), g(() => {
            F.disabled = c(), Re(F, 1, `px-5 py-2.5 rounded-lg text-sm font-medium transition-colors
							${c() ? "bg-surface-600 text-surface-400 cursor-not-allowed" : "bg-hecate-600 text-surface-50 hover:bg-hecate-500"}`), x(P, c() ? "Starting..." : "Start Discovery");
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
          x(Fe, a().name), x(W, a().status_label), x(j, be);
        },
        [() => p(a().initiated_at ?? 0)]
      ), d(ue, Ce);
    };
    A(se, (ue) => {
      a() && ue(R);
    });
  }
  s(D), s(V), d(e, V);
  var U = mt(w);
  return f(), U;
}
At(["click"]);
kt(rs, { nextAction: {} }, [], [], { mode: "open" });
const Eo = et(
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
function ks(e, t) {
  bt(t, !0);
  const a = () => Ee($n, "$availableModels", n), [n, c] = Nt();
  let l = pt(t, "currentModel", 7), f = pt(t, "onSelect", 7), v = pt(t, "showPhaseInfo", 7, !1), p = pt(t, "phasePreference", 7, null), h = pt(t, "phaseAffinity", 7, "general"), m = pt(t, "onPinModel", 7), C = pt(t, "onClearPin", 7), w = pt(t, "phaseName", 7, ""), V = /* @__PURE__ */ ve(!1), D = /* @__PURE__ */ ve(""), se = /* @__PURE__ */ ve(void 0), R = /* @__PURE__ */ ve(void 0), U = /* @__PURE__ */ ve(Vt(/* @__PURE__ */ new Set()));
  const ue = ["Anthropic", "OpenAI", "Google", "Groq", "Ollama", "Other"];
  let Ce = /* @__PURE__ */ we(() => {
    const $ = a(), E = r(D).toLowerCase(), F = E ? $.filter((S) => S.name.toLowerCase().includes(E) || S.provider.toLowerCase().includes(E) || S.family.toLowerCase().includes(E)) : $, P = /* @__PURE__ */ new Map();
    for (const S of F) {
      const k = Fe(S.provider), q = P.get(k) ?? [];
      q.push(S), P.set(k, q);
    }
    const te = [], Le = [...P.keys()].sort((S, k) => {
      const q = ue.indexOf(S), oe = ue.indexOf(k);
      return (q === -1 ? 999 : q) - (oe === -1 ? 999 : oe) || S.localeCompare(k);
    });
    for (const S of Le) {
      const k = P.get(S) ?? [];
      k.sort((q, oe) => oe.context_length - q.context_length || q.name.localeCompare(oe.name)), te.push({ provider: S, models: k });
    }
    return te;
  }), ge = /* @__PURE__ */ we(() => hl(a(), h(), 4)), fe = /* @__PURE__ */ we(() => a().length), ie = /* @__PURE__ */ we(() => a().find(($) => $.name === l()) ?? null);
  function Fe($) {
    const E = $.toLowerCase();
    return E.includes("anthropic") ? "Anthropic" : E.includes("openai") ? "OpenAI" : E.includes("google") || E.includes("gemini") ? "Google" : E.includes("groq") ? "Groq" : E.includes("ollama") ? "Ollama" : $ ? $.charAt(0).toUpperCase() + $.slice(1) : "Other";
  }
  function Pe($) {
    switch ($) {
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
  function Me($) {
    const E = [], F = Rs($.context_length);
    return F && E.push({ label: F, css: "text-surface-400 bg-surface-700" }), $.format !== "api" && E.push({ label: "local", css: "text-emerald-400 bg-emerald-500/10" }), yl($.name) === "code" && E.push({ label: "code", css: "text-hecate-400 bg-hecate-500/10" }), $.parameter_size && $.parameter_size !== "" && $.parameter_size !== "unknown" && E.push({
      label: $.parameter_size,
      css: "text-surface-400 bg-surface-700"
    }), E;
  }
  function ce($) {
    f()($), _(V, !1), _(D, ""), _(U, /* @__PURE__ */ new Set(), !0);
  }
  function G($) {
    const E = new Set(r(U));
    E.has($) ? E.delete($) : E.add($), _(U, E, !0);
  }
  function I($) {
    r(se) && !r(se).contains($.target) && (_(V, !1), _(D, ""), _(U, /* @__PURE__ */ new Set(), !0));
  }
  function H($) {
    return $.length <= 24 ? $ : $.slice(0, 22) + "…";
  }
  function W($) {
    $.key === "Escape" && (_(V, !1), _(D, ""));
  }
  Rt(() => (r(V) ? (document.addEventListener("click", I, !0), requestAnimationFrame(() => r(R)?.focus())) : document.removeEventListener("click", I, !0), () => document.removeEventListener("click", I, !0)));
  var N = {
    get currentModel() {
      return l();
    },
    set currentModel($) {
      l($), ut();
    },
    get onSelect() {
      return f();
    },
    set onSelect($) {
      f($), ut();
    },
    get showPhaseInfo() {
      return v();
    },
    set showPhaseInfo($ = !1) {
      v($), ut();
    },
    get phasePreference() {
      return p();
    },
    set phasePreference($ = null) {
      p($), ut();
    },
    get phaseAffinity() {
      return h();
    },
    set phaseAffinity($ = "general") {
      h($), ut();
    },
    get onPinModel() {
      return m();
    },
    set onPinModel($) {
      m($), ut();
    },
    get onClearPin() {
      return C();
    },
    set onClearPin($) {
      C($), ut();
    },
    get phaseName() {
      return w();
    },
    set phaseName($ = "") {
      w($), ut();
    }
  }, M = _u(), j = i(M);
  j.__click = () => _(V, !r(V));
  var $e = i(j);
  {
    var je = ($) => {
      var E = Qd(), F = it(E), P = i(F, !0);
      s(F);
      var te = o(F, 2);
      {
        var Le = (S) => {
          const k = /* @__PURE__ */ we(() => Rs(r(ie).context_length));
          var q = or(), oe = it(q);
          {
            var Be = (B) => {
              var O = Jd(), J = i(O, !0);
              s(O), g(() => x(J, r(k))), d(B, O);
            };
            A(oe, (B) => {
              r(k) && B(Be);
            });
          }
          d(S, q);
        };
        A(te, (S) => {
          r(ie) && S(Le);
        });
      }
      g((S) => x(P, S), [() => H(l())]), d($, E);
    }, qe = ($) => {
      var E = Xd();
      d($, E);
    };
    A($e, ($) => {
      l() ? $(je) : $(qe, !1);
    });
  }
  var Ve = o($e, 2), Se = i(Ve, !0);
  s(Ve), s(j);
  var Ne = o(j, 2);
  {
    var be = ($) => {
      var E = xu();
      E.__keydown = W;
      var F = i(E), P = i(F);
      wt(P), ea(P, (O) => _(R, O), () => r(R)), s(F);
      var te = o(F, 2);
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
              L.__click = () => C()?.(), d(We, L);
            };
            A(at, (We) => {
              p() && We(ze);
            });
          }
          s(J), g(() => x(Ke, w())), d(O, J);
        };
        A(te, (O) => {
          v() && w() && O(Le);
        });
      }
      var S = o(te, 2), k = i(S);
      {
        var q = (O) => {
          var J = au(), Te = i(J, !0);
          s(J), g(() => x(Te, r(fe) === 0 ? "No models available" : "No matching models")), d(O, J);
        };
        A(k, (O) => {
          r(Ce).length === 0 && O(q);
        });
      }
      var oe = o(k, 2);
      {
        var Be = (O) => {
          var J = ou(), Te = i(J), Oe = i(Te);
          s(Te);
          var Ke = o(Te, 2);
          He(Ke, 17, () => r(ge), ct, (Qe, tt) => {
            let Ye = () => r(tt).model, at = () => r(tt).tier;
            const ze = /* @__PURE__ */ we(() => Ye().name === l()), We = /* @__PURE__ */ we(() => Me(Ye()));
            var L = iu();
            L.__click = () => ce(Ye().name);
            var z = i(L), Y = i(z, !0);
            s(z);
            var xe = o(z, 2), ae = i(xe, !0);
            s(xe);
            var pe = o(xe, 2);
            He(pe, 17, () => r(We), ct, (de, T) => {
              var re = su(), he = i(re, !0);
              s(re), g(() => {
                Re(re, 1, `text-[8px] px-1 py-0.5 rounded ${r(T).css ?? ""} shrink-0`), x(he, r(T).label);
              }), d(de, re);
            });
            var Ie = o(pe, 2), Je = i(Ie, !0);
            s(Ie);
            var b = o(Ie, 2);
            {
              var y = (de) => {
                var T = nu();
                T.textContent = "✓", d(de, T);
              };
              A(b, (de) => {
                r(ze) && de(y);
              });
            }
            s(L), g(
              (de) => {
                Re(L, 1, `w-full text-left px-2 py-1.5 text-[11px] flex items-center gap-1.5
									transition-colors cursor-pointer
									${r(ze) ? "bg-hecate-600/20 text-hecate-300" : "text-surface-200 hover:bg-surface-700"}`), x(Y, de), x(ae, Ye().name), Re(Ie, 1, `text-[8px] px-1 py-0.5 rounded shrink-0
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
      var B = o(oe, 2);
      He(B, 17, () => r(Ce), ct, (O, J) => {
        const Te = /* @__PURE__ */ we(() => r(D) !== "" || r(U).has(r(J).provider));
        var Oe = pu(), Ke = i(Oe);
        Ke.__click = () => !r(D) && G(r(J).provider);
        var Qe = i(Ke);
        {
          var tt = (ae) => {
            var pe = cu(), Ie = i(pe, !0);
            s(pe), g(() => x(Ie, r(Te) ? "▼" : "▶")), d(ae, pe);
          };
          A(Qe, (ae) => {
            r(D) || ae(tt);
          });
        }
        var Ye = o(Qe, 2), at = i(Ye, !0);
        s(Ye);
        var ze = o(Ye, 2), We = i(ze, !0);
        s(ze);
        var L = o(ze, 2), z = i(L);
        s(L), s(Ke);
        var Y = o(Ke, 2);
        {
          var xe = (ae) => {
            var pe = or(), Ie = it(pe);
            He(Ie, 17, () => r(J).models, ct, (Je, b) => {
              const y = /* @__PURE__ */ we(() => r(b).name === l()), de = /* @__PURE__ */ we(() => r(b).name === p()), T = /* @__PURE__ */ we(() => Me(r(b)));
              var re = fu();
              re.__click = () => ce(r(b).name);
              var he = i(re), Ae = i(he, !0);
              s(he);
              var ne = o(he, 2);
              He(ne, 17, () => r(T), ct, (ee, Q) => {
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
                    ye.stopPropagation(), m()?.(r(b).name);
                  }, g(() => It(Q, "title", `Pin for ${w() ?? ""} phase`)), d(ee, Q);
                };
                A(me, (ee) => {
                  v() && m() && !r(de) && ee(le);
                });
              }
              s(re), g(() => {
                Re(re, 1, `w-full text-left px-2 py-1.5 text-[11px] flex items-center gap-1.5
										transition-colors cursor-pointer
										${r(D) ? "pl-2" : "pl-7"}
										${r(y) ? "bg-hecate-600/20 text-hecate-300" : "text-surface-200 hover:bg-surface-700"}`), x(Ae, r(b).name);
              }), d(Je, re);
            }), d(ae, pe);
          };
          A(Y, (ae) => {
            r(Te) && ae(xe);
          });
        }
        s(Oe), g(
          (ae) => {
            Re(Ke, 1, `px-2 py-1 text-[9px] uppercase tracking-wider font-medium flex items-center gap-1.5
								${r(D) ? "text-surface-500" : "text-surface-500 hover:text-surface-300 cursor-pointer"}`), x(at, ae), x(We, r(J).provider), x(z, `(${r(J).models.length ?? ""})`);
          },
          [() => Pe(r(J).provider)]
        ), d(O, Oe);
      }), s(S), s(E), g(() => It(P, "placeholder", `Search ${r(fe) ?? ""} models...`)), xt(P, () => r(D), (O) => _(D, O)), d($, E);
    };
    A(Ne, ($) => {
      r(V) && $(be);
    });
  }
  s(M), ea(M, ($) => _(se, $), () => r(se)), g(
    ($) => {
      It(j, "title", $), x(Se, r(V) ? "▲" : "▼");
    },
    [
      () => l() ? `${l()}${r(ie) ? ` (${r(ie).provider}, ${Rs(r(ie).context_length)} ctx)` : ""}` : "No model selected"
    ]
  ), d(e, M);
  var K = mt(N);
  return c(), K;
}
At(["click", "keydown"]);
kt(
  ks,
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
						bg-surface-700 text-surface-200 border border-surface-600"><!></div></div>`), Eu = /* @__PURE__ */ u('<div class="flex items-center justify-center h-full"><div class="text-center text-surface-400"><div class="text-2xl mb-2"></div> <div class="text-[11px]">The Oracle is preparing...</div></div></div>'), Au = /* @__PURE__ */ u('<span class="text-[10px] text-health-ok"></span>'), Du = /* @__PURE__ */ u('<span class="text-[10px] text-accent-400"></span>'), Pu = /* @__PURE__ */ u('<span class="text-[10px] text-surface-400"></span>'), Tu = /* @__PURE__ */ u('<span class="text-[10px] text-surface-400">Waiting for Oracle...</span>'), Ru = /* @__PURE__ */ u('<div class="mt-4 p-2 rounded bg-surface-700 border border-surface-600"><div class="text-[9px] text-surface-400 uppercase tracking-wider mb-1">Brief</div> <div class="text-[11px] text-surface-200"> </div></div>'), Mu = /* @__PURE__ */ u('<div class="prose prose-sm prose-invert"><!></div> <!>', 1), Iu = /* @__PURE__ */ u(`<div class="flex items-center justify-center h-full"><div class="text-center text-surface-400 max-w-[220px]"><div class="text-2xl mb-2"></div> <div class="text-[11px]">Your vision will take shape here as the Oracle
							gathers context about your venture.</div></div></div>`), Nu = /* @__PURE__ */ u('<div class="text-[10px] text-health-err bg-health-err/10 rounded px-2 py-1"> </div>'), Lu = /* @__PURE__ */ u(`<div class="space-y-2"><div><label for="repo-path" class="text-[10px] text-surface-400 block mb-1">Repository Path</label> <input id="repo-path" placeholder="~/ventures/my-venture" class="w-full bg-surface-700 border border-surface-600 rounded px-3 py-1.5
								text-[11px] text-surface-100 placeholder-surface-400
								focus:outline-none focus:border-hecate-500"/></div> <!> <button> </button></div>`), Ou = /* @__PURE__ */ u('<div class="text-center text-[10px] text-surface-400 py-2"></div>'), Fu = /* @__PURE__ */ u('<div class="text-center text-[10px] text-surface-400 py-2">The Oracle will guide you through defining your venture</div>'), ju = /* @__PURE__ */ u(`<div class="flex h-full overflow-hidden"><div class="flex flex-col overflow-hidden"><div class="flex items-center gap-2 px-4 py-2.5 border-b border-surface-600 shrink-0"><span class="text-hecate-400"></span> <span class="text-xs font-semibold text-surface-100">The Oracle</span> <span class="text-[10px] text-surface-400">Vision Architect</span> <div class="flex-1"></div> <!></div> <div class="flex-1 overflow-y-auto p-4 space-y-3"><!> <!> <!></div> <div class="border-t border-surface-600 p-3 shrink-0"><div class="flex gap-2"><textarea class="flex-1 bg-surface-700 border border-surface-600 rounded-lg px-3 py-2
						text-[11px] text-surface-100 placeholder-surface-400 resize-none
						focus:outline-none focus:border-hecate-500
						disabled:opacity-50 disabled:cursor-not-allowed"></textarea> <button>Send</button></div></div></div>  <div></div> <div class="flex flex-col overflow-hidden flex-1"><div class="flex items-center gap-2 px-4 py-2.5 border-b border-surface-600 shrink-0"><span class="text-surface-400 text-xs"></span> <span class="text-xs font-semibold text-surface-100">Vision Preview</span> <div class="flex-1"></div> <!></div> <div class="flex-1 overflow-y-auto p-4"><!></div> <div class="border-t border-surface-600 p-3 shrink-0"><!></div></div></div>`);
function Ao(e, t) {
  bt(t, !0);
  const a = () => Ee(St, "$activeVenture", l), n = () => Ee(Cn, "$aiModel", l), c = () => Ee(Et, "$isLoading", l), [l, f] = Nt(), v = so();
  let p = /* @__PURE__ */ ve(Vt([])), h = /* @__PURE__ */ ve(""), m = /* @__PURE__ */ ve(!1), C = /* @__PURE__ */ ve(""), w = /* @__PURE__ */ ve(void 0), V = /* @__PURE__ */ ve(!1), D = /* @__PURE__ */ ve(""), se = /* @__PURE__ */ ve(""), R = /* @__PURE__ */ ve(null), U = /* @__PURE__ */ ve(null), ue = /* @__PURE__ */ ve(65), Ce = /* @__PURE__ */ ve(!1), ge = /* @__PURE__ */ ve(void 0);
  function fe(b) {
    let y = b.replace(/```markdown\n[\s\S]*?```/g, "◇ Vision updated ↗");
    return y = y.replace(/```markdown\n[\s\S]*$/, "◇ Synthesizing vision... ↗"), y;
  }
  function ie(b) {
    const y = fe(b), de = [];
    let T = y;
    for (; T.length > 0; ) {
      const re = T.indexOf("<think>");
      if (re === -1) {
        T.trim() && de.push({ type: "text", content: T });
        break;
      }
      if (re > 0) {
        const ne = T.slice(0, re);
        ne.trim() && de.push({ type: "text", content: ne });
      }
      const he = T.indexOf("</think>", re);
      if (he === -1) {
        const ne = T.slice(re + 7);
        ne.trim() && de.push({ type: "think", content: ne });
        break;
      }
      const Ae = T.slice(re + 7, he);
      Ae.trim() && de.push({ type: "think", content: Ae }), T = T.slice(he + 8);
    }
    return de.length > 0 ? de : [{ type: "text", content: y }];
  }
  function Fe(b) {
    return b.includes("<think>") && !b.includes("</think>");
  }
  function Pe(b) {
    const y = fe(b);
    return y.includes("</think>") ? (y.split("</think>").pop() || "").trim() : y.includes("<think>") ? "" : y;
  }
  function Me(b) {
    const y = fe(b), de = y.indexOf("<think>");
    if (de === -1) return "";
    const T = y.indexOf("</think>");
    return T === -1 ? y.slice(de + 7) : y.slice(de + 7, T);
  }
  let ce = /* @__PURE__ */ we(() => {
    for (let b = r(p).length - 1; b >= 0; b--)
      if (r(p)[b].role === "assistant") {
        const y = r(p)[b].content.match(/```markdown\n([\s\S]*?)```/);
        if (y) return y[1].trim();
      }
    if (r(C)) {
      const b = r(C).match(/```markdown\n([\s\S]*?)```/);
      if (b) return b[1].trim();
      const y = r(C).match(/```markdown\n([\s\S]*)$/);
      if (y) return y[1].trim();
    }
    return null;
  }), G = /* @__PURE__ */ we(() => r(ce) !== null && !r(ce).includes("(Not yet explored)") && !r(ce).includes("*(Hypothetical)*")), I = /* @__PURE__ */ we(() => {
    if (!r(ce)) return null;
    const b = r(ce).match(/<!--\s*brief:\s*(.*?)\s*-->/);
    return b ? b[1].trim() : null;
  }), H = /* @__PURE__ */ ve(null);
  Rt(() => {
    const b = a(), y = b?.venture_id ?? null;
    if (y !== r(H) && (_(p, [], !0), _(C, ""), _(m, !1), _(D, ""), _(se, ""), _(H, y, !0)), b && !r(se)) {
      const de = "~/ventures", T = b.name.toLowerCase().replace(/[^a-z0-9-]/g, "-");
      _(se, `${de}/${T}`);
    }
  }), Rt(() => {
    const b = n();
    r(U) !== null && r(U) !== b && (r(R) && (r(R).cancel(), _(R, null)), _(p, [], !0), _(C, ""), _(m, !1)), _(U, b, !0);
  }), Rt(() => {
    const b = a();
    if (b && r(p).length === 0 && !r(m)) {
      const y = `I just initiated a new venture called "${b.name}". ${b.brief ? `Here's what I know so far: ${b.brief}` : "I need help defining the vision for this venture."}`;
      N(y);
    }
  });
  function W() {
    const b = [], y = Xt(Eo);
    y && b.push(y);
    const de = Xt(Wd);
    if (b.push(Kd(de, { venture_name: a()?.name ?? "Unnamed" })), a()) {
      let T = `The venture is called "${a().name}"`;
      a().brief && (T += `. Initial brief: ${a().brief}`), b.push(T);
    }
    return b.join(`

---

`);
  }
  async function N(b) {
    const y = n();
    if (!y || !b.trim() || r(m)) return;
    const de = { role: "user", content: b.trim() };
    _(p, [...r(p), de], !0), _(h, "");
    const T = [], re = W();
    re && T.push({ role: "system", content: re }), T.push(...r(p)), _(m, !0), _(C, "");
    let he = "";
    const Ae = v.stream.chat(y, T);
    _(R, Ae, !0), Ae.onChunk((ne) => {
      ne.content && (he += ne.content, _(C, he, !0));
    }).onDone(async (ne) => {
      ne.content && (he += ne.content);
      const X = {
        role: "assistant",
        content: he || "(empty response)"
      };
      _(p, [...r(p), X], !0), _(C, ""), _(m, !1), _(R, null);
    }).onError((ne) => {
      const X = { role: "assistant", content: `Error: ${ne}` };
      _(p, [...r(p), X], !0), _(C, ""), _(m, !1), _(R, null);
    });
    try {
      await Ae.start();
    } catch (ne) {
      const X = { role: "assistant", content: `Error: ${String(ne)}` };
      _(p, [...r(p), X], !0), _(m, !1);
    }
  }
  async function M() {
    if (!a() || !r(ce) || !r(se).trim()) return;
    _(V, !0), _(D, ""), await vo(a().venture_id, r(se).trim(), r(ce), a().name, r(I) ?? void 0) ? (await kr(), await ms()) : _(D, Xt(br) || "Failed to scaffold venture repo", !0), _(V, !1);
  }
  let j = /* @__PURE__ */ ve(void 0);
  function $e(b) {
    b.key === "Enter" && !b.shiftKey && (b.preventDefault(), N(r(h)), r(j) && (r(j).style.height = "auto"));
  }
  function je(b) {
    const y = b.target;
    y.style.height = "auto", y.style.height = Math.min(y.scrollHeight, 150) + "px";
  }
  function qe(b) {
    _(Ce, !0), b.preventDefault();
  }
  function Ve(b) {
    if (!r(Ce) || !r(ge)) return;
    const y = r(ge).getBoundingClientRect(), T = (b.clientX - y.left) / y.width * 100;
    _(ue, Math.max(30, Math.min(80, T)), !0);
  }
  function Se() {
    _(Ce, !1);
  }
  Rt(() => {
    r(p), r(C), bn().then(() => {
      r(w) && (r(w).scrollTop = r(w).scrollHeight);
    });
  });
  function Ne(b) {
    return b.replace(/<!--.*?-->/gs, "").replace(/^### (.*$)/gm, '<h3 class="text-xs font-semibold text-surface-100 mt-3 mb-1">$1</h3>').replace(/^## (.*$)/gm, '<h2 class="text-sm font-semibold text-hecate-300 mt-4 mb-1.5">$1</h2>').replace(/^# (.*$)/gm, '<h1 class="text-base font-bold text-surface-100 mb-2">$1</h1>').replace(/^(\d+)\.\s+(.*$)/gm, '<div class="text-[11px] text-surface-200 ml-3 mb-1"><span class="text-surface-400 mr-1.5">$1.</span>$2</div>').replace(/^\- (.*$)/gm, '<div class="text-[11px] text-surface-200 ml-3 mb-1"><span class="text-surface-400 mr-1.5">&bull;</span>$1</div>').replace(/\*\*(.*?)\*\*/g, '<strong class="text-surface-100">$1</strong>').replace(/\*(.*?)\*/g, '<em class="text-surface-300">$1</em>').replace(/\n\n/g, "<br/><br/>").trim();
  }
  var be = ju();
  be.__mousemove = Ve, be.__mouseup = Se;
  var K = i(be), $ = i(K), E = i($);
  E.textContent = "◇";
  var F = o(E, 8);
  ks(F, {
    get currentModel() {
      return n();
    },
    onSelect: (b) => Sn(b)
  }), s($);
  var P = o($, 2), te = i(P);
  He(te, 17, () => r(p), ct, (b, y) => {
    var de = or(), T = it(de);
    {
      var re = (Ae) => {
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
      A(T, (Ae) => {
        r(y).role === "user" ? Ae(re) : r(y).role === "assistant" && Ae(he, 1);
      });
    }
    d(b, de);
  });
  var Le = o(te, 2);
  {
    var S = (b) => {
      var y = Su(), de = i(y), T = i(de);
      {
        var re = (X) => {
          var Z = wu(), _e = o(it(Z), 2);
          {
            var ke = (le) => {
              var ee = yu(), Q = i(ee), ye = i(Q);
              ye.textContent = "▶", Dt(), s(Q);
              var De = o(Q, 2), Ge = i(De, !0);
              Dt(), s(De), s(ee), g((Ue) => x(Ge, Ue), [
                () => Me(r(C)).trim()
              ]), d(le, ee);
            }, me = /* @__PURE__ */ we(() => Me(r(C)).trim());
            A(_e, (le) => {
              r(me) && le(ke);
            });
          }
          d(X, Z);
        }, he = /* @__PURE__ */ we(() => r(C) && Fe(r(C))), Ae = (X) => {
          var Z = ku(), _e = it(Z);
          {
            var ke = (Q) => {
              var ye = $u(), De = i(ye), Ge = i(De);
              Ge.textContent = "▶", Dt(), s(De);
              var Ue = o(De, 2), Xe = i(Ue, !0);
              s(Ue), s(ye), g((rt) => x(Xe, rt), [
                () => Me(r(C)).trim()
              ]), d(Q, ye);
            }, me = /* @__PURE__ */ we(() => Me(r(C)).trim());
            A(_e, (Q) => {
              r(me) && Q(ke);
            });
          }
          var le = o(_e, 2), ee = i(le, !0);
          Dt(), s(le), g((Q) => x(ee, Q), [() => Pe(r(C))]), d(X, Z);
        }, ne = (X) => {
          var Z = Cu();
          d(X, Z);
        };
        A(T, (X) => {
          r(he) ? X(re) : r(C) ? X(Ae, 1) : X(ne, !1);
        });
      }
      s(de), s(y), d(b, y);
    };
    A(Le, (b) => {
      r(m) && b(S);
    });
  }
  var k = o(Le, 2);
  {
    var q = (b) => {
      var y = Eu(), de = i(y), T = i(de);
      T.textContent = "◇", Dt(2), s(de), s(y), d(b, y);
    };
    A(k, (b) => {
      r(p).length === 0 && !r(m) && b(q);
    });
  }
  s(P), ea(P, (b) => _(w, b), () => r(w));
  var oe = o(P, 2), Be = i(oe), B = i(Be);
  Ca(B), B.__keydown = $e, B.__input = je, It(B, "rows", 1), ea(B, (b) => _(j, b), () => r(j));
  var O = o(B, 2);
  O.__click = () => N(r(h)), s(Be), s(oe), s(K);
  var J = o(K, 2);
  J.__mousedown = qe;
  var Te = o(J, 2), Oe = i(Te), Ke = i(Oe);
  Ke.textContent = "📄";
  var Qe = o(Ke, 6);
  {
    var tt = (b) => {
      var y = Au();
      y.textContent = "● Complete", d(b, y);
    }, Ye = (b) => {
      var y = Du();
      y.textContent = "◐ Drafting...", d(b, y);
    }, at = (b) => {
      var y = Pu();
      y.textContent = "◐ Listening...", d(b, y);
    }, ze = (b) => {
      var y = Tu();
      d(b, y);
    };
    A(Qe, (b) => {
      r(G) ? b(tt) : r(ce) ? b(Ye, 1) : r(m) ? b(at, 2) : b(ze, !1);
    });
  }
  s(Oe);
  var We = o(Oe, 2), L = i(We);
  {
    var z = (b) => {
      var y = Mu(), de = it(y), T = i(de);
      el(T, () => Ne(r(ce))), s(de);
      var re = o(de, 2);
      {
        var he = (Ae) => {
          var ne = Ru(), X = o(i(ne), 2), Z = i(X, !0);
          s(X), s(ne), g(() => x(Z, r(I))), d(Ae, ne);
        };
        A(re, (Ae) => {
          r(I) && Ae(he);
        });
      }
      d(b, y);
    }, Y = (b) => {
      var y = Iu(), de = i(y), T = i(de);
      T.textContent = "📄", Dt(2), s(de), s(y), d(b, y);
    };
    A(L, (b) => {
      r(ce) ? b(z) : b(Y, !1);
    });
  }
  s(We);
  var xe = o(We, 2), ae = i(xe);
  {
    var pe = (b) => {
      var y = Lu(), de = i(y), T = o(i(de), 2);
      wt(T), s(de);
      var re = o(de, 2);
      {
        var he = (X) => {
          var Z = Nu(), _e = i(Z, !0);
          s(Z), g(() => x(_e, r(D))), d(X, Z);
        };
        A(re, (X) => {
          r(D) && X(he);
        });
      }
      var Ae = o(re, 2);
      Ae.__click = M;
      var ne = i(Ae, !0);
      s(Ae), s(y), g(
        (X, Z) => {
          Ae.disabled = X, Re(Ae, 1, `w-full px-3 py-2 rounded-lg text-xs font-medium transition-colors
							${Z ?? ""}`), x(ne, r(V) ? "Scaffolding..." : "Scaffold Venture");
        },
        [
          () => r(V) || c() || !r(se).trim(),
          () => r(V) || c() || !r(se).trim() ? "bg-surface-600 text-surface-400 cursor-not-allowed" : "bg-hecate-600 text-surface-50 hover:bg-hecate-500"
        ]
      ), xt(T, () => r(se), (X) => _(se, X)), d(b, y);
    }, Ie = (b) => {
      var y = Ou();
      y.textContent = "Vision is taking shape — keep exploring with the Oracle", d(b, y);
    }, Je = (b) => {
      var y = Fu();
      d(b, y);
    };
    A(ae, (b) => {
      r(G) ? b(pe) : r(ce) ? b(Ie, 1) : b(Je, !1);
    });
  }
  s(xe), s(Te), s(be), ea(be, (b) => _(ge, b), () => r(ge)), g(
    (b, y) => {
      dr(K, `width: ${r(ue) ?? ""}%`), It(B, "placeholder", r(m) ? "Oracle is thinking..." : "Describe your venture..."), B.disabled = r(m) || !n(), O.disabled = b, Re(O, 1, `px-3 rounded-lg text-[11px] transition-colors self-end
						${y ?? ""}`), Re(J, 1, `w-1 cursor-col-resize shrink-0 transition-colors
			${r(Ce) ? "bg-hecate-500" : "bg-surface-600 hover:bg-surface-500"}`);
    },
    [
      () => r(m) || !r(h).trim() || !n(),
      () => r(m) || !r(h).trim() || !n() ? "bg-surface-600 text-surface-400 cursor-not-allowed" : "bg-hecate-600 text-surface-50 hover:bg-hecate-500"
    ]
  ), Ot("mouseleave", be, Se), xt(B, () => r(h), (b) => _(h, b)), d(e, be), mt(), f();
}
At([
  "mousemove",
  "mouseup",
  "keydown",
  "input",
  "click",
  "mousedown"
]);
kt(Ao, {}, [], [], { mode: "open" });
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
												bg-surface-800 border border-surface-600 text-xs svelte-gwxd3p"><span class="px-1.5 py-0.5 rounded text-[10px] font-medium svelte-gwxd3p"> </span> <span class="text-surface-400 svelte-gwxd3p"></span> <span class="text-es-event font-mono text-[10px] svelte-gwxd3p"> </span> <span class="text-surface-400 svelte-gwxd3p"></span> <span class="px-1.5 py-0.5 rounded text-[10px] font-medium svelte-gwxd3p"> </span> <div class="flex-1 svelte-gwxd3p"></div> <button class="text-surface-500 hover:text-health-err text-[9px] transition-colors svelte-gwxd3p"></button></div>`), Pv = /* @__PURE__ */ u('<div class="space-y-1.5 mb-4 svelte-gwxd3p"></div>'), Tv = /* @__PURE__ */ u('<option class="svelte-gwxd3p"> </option>'), Rv = /* @__PURE__ */ u('<option class="svelte-gwxd3p"> </option>'), Mv = /* @__PURE__ */ u(`<div class="rounded-lg border border-surface-600 bg-surface-800 p-4 svelte-gwxd3p"><h4 class="text-[10px] font-semibold text-surface-300 uppercase tracking-wider mb-3 svelte-gwxd3p">Add Integration Fact</h4> <div class="flex items-end gap-2 svelte-gwxd3p"><div class="flex-1 svelte-gwxd3p"><label class="text-[9px] text-surface-400 block mb-1 svelte-gwxd3p">From (publishes)</label> <select class="w-full bg-surface-700 border border-surface-600 rounded px-2 py-1.5
												text-[10px] text-surface-100 focus:outline-none focus:border-hecate-500 svelte-gwxd3p"><option class="svelte-gwxd3p">Select...</option><!></select></div> <div class="flex-1 svelte-gwxd3p"><label class="text-[9px] text-surface-400 block mb-1 svelte-gwxd3p">Fact name</label> <input placeholder="e.g., order_confirmed" class="w-full bg-surface-700 border border-surface-600 rounded px-2 py-1.5
												text-[10px] text-surface-100 placeholder-surface-400
												focus:outline-none focus:border-hecate-500 svelte-gwxd3p"/></div> <div class="flex-1 svelte-gwxd3p"><label class="text-[9px] text-surface-400 block mb-1 svelte-gwxd3p">To (consumes)</label> <select class="w-full bg-surface-700 border border-surface-600 rounded px-2 py-1.5
												text-[10px] text-surface-100 focus:outline-none focus:border-hecate-500 svelte-gwxd3p"><option class="svelte-gwxd3p">Select...</option><!></select></div> <button>Add</button></div></div>`), Iv = /* @__PURE__ */ u(`<button class="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded
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
function en(e, t) {
  bt(t, !0), Xi(e, jv);
  const a = () => Ee(zd, "$bigPictureAgents", D), n = () => Ee(Rl, "$bigPictureEventCount", D), c = () => Ee(sa, "$bigPicturePhase", D), l = () => Ee(St, "$activeVenture", D), f = () => Ee(Ea, "$bigPictureEvents", D), v = () => Ee($s, "$eventClusters", D), p = () => Ee(An, "$factArrows", D), h = () => Ee(ds, "$highOctaneRemaining", D), m = () => Ee(Ks, "$showEventStream", D), C = () => Ee(Tl, "$stickyStacks", D), w = () => Ee(Pl, "$unclusteredEvents", D), V = () => Ee(Js, "$isLoading", D), [D, se] = Nt();
  let R = /* @__PURE__ */ ve(""), U = /* @__PURE__ */ ve(null), ue = /* @__PURE__ */ ve(""), Ce = /* @__PURE__ */ ve(null), ge = /* @__PURE__ */ ve(null), fe = /* @__PURE__ */ ve(""), ie = /* @__PURE__ */ ve(null), Fe = /* @__PURE__ */ ve(Vt({})), Pe = /* @__PURE__ */ ve(Vt(/* @__PURE__ */ new Map()));
  function Me(L) {
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
    await Za(j(), L.text, "oracle"), _(ce, r(ce).filter((z) => z.id !== L.id), !0);
  }
  function I(L) {
    _(ce, r(ce).filter((z) => z.id !== L.id), !0);
  }
  let H = /* @__PURE__ */ ve(!1), W = /* @__PURE__ */ ve(0);
  Rt(() => {
    const L = n();
    L > r(W) && r(W) > 0 && (_(H, !0), setTimeout(() => _(H, !1), 300)), _(W, L, !0);
  });
  let N = /* @__PURE__ */ ve(!1), M = /* @__PURE__ */ ve("");
  Rt(() => {
    const L = c();
    L !== r(M) && r(M) !== "" && (_(N, !0), setTimeout(() => _(N, !1), 300)), _(M, L, !0);
  });
  function j() {
    return l()?.venture_id ?? "";
  }
  function $e(L) {
    const z = Math.floor(L / 60), Y = L % 60;
    return `${z}:${Y.toString().padStart(2, "0")}`;
  }
  async function je(L) {
    L.key === "Enter" && !L.shiftKey && r(R).trim() && (L.preventDefault(), await Za(j(), r(R)), _(R, ""));
  }
  async function qe(L, z) {
    L.key === "Enter" && r(ue).trim() ? (await jl(j(), z, r(ue).trim()), _(U, null), _(ue, "")) : L.key === "Escape" && _(U, null);
  }
  function Ve(L) {
    _(U, L.cluster_id, !0), _(ue, L.name ?? "", !0);
  }
  async function Se() {
    r(Ce) && r(ge) && r(Ce) !== r(ge) && r(fe).trim() && (await Bl(j(), r(Ce), r(ge), r(fe).trim()), _(fe, ""));
  }
  async function Ne() {
    await zl(j());
  }
  function be(L) {
    return f().filter((z) => z.cluster_id === L);
  }
  let K = /* @__PURE__ */ we(() => f().filter((L) => !L.stack_id));
  function $(L) {
    const z = l(), Y = f(), xe = v(), ae = p();
    let pe = L + `

---

`;
    if (z && (pe += `Venture: "${z.name}"`, z.brief && (pe += ` — ${z.brief}`), pe += `

`), Y.length > 0 && (pe += `Events on the board:
`, pe += Y.map((Ie) => `- ${Ie.text}${Ie.weight > 1 ? ` (x${Ie.weight})` : ""}`).join(`
`), pe += `

`), xe.length > 0) {
      pe += `Current clusters (candidate divisions):
`;
      for (const Ie of xe) {
        const Je = Y.filter((b) => b.cluster_id === Ie.cluster_id);
        pe += `- ${Ie.name ?? "(unnamed)"}: ${Je.map((b) => b.text).join(", ") || "(empty)"}
`;
      }
      pe += `
`;
    }
    if (ae.length > 0) {
      pe += `Integration fact arrows:
`;
      for (const Ie of ae) {
        const Je = xe.find((y) => y.cluster_id === Ie.from_cluster)?.name ?? "?", b = xe.find((y) => y.cluster_id === Ie.to_cluster)?.name ?? "?";
        pe += `- ${Je} → ${Ie.fact_name} → ${b}
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
  var F = Fv(), P = i(F), te = i(P), Le = o(i(te), 2);
  He(Le, 17, () => E, ct, (L, z, Y) => {
    const xe = /* @__PURE__ */ we(() => c() === r(z).phase), ae = /* @__PURE__ */ we(() => E.findIndex((he) => he.phase === c()) > Y);
    var pe = Vu(), Ie = it(pe);
    {
      var Je = (he) => {
        var Ae = Bu();
        g(() => Re(Ae, 1, `w-6 h-px ${r(ae) ? "bg-hecate-400/60" : "bg-surface-600"}`, "svelte-gwxd3p")), d(he, Ae);
      };
      A(Ie, (he) => {
        Y > 0 && he(Je);
      });
    }
    var b = o(Ie, 2), y = i(b), de = i(y, !0);
    s(y);
    var T = o(y, 2), re = i(T, !0);
    s(T), s(b), g(() => {
      Re(
        b,
        1,
        `flex items-center gap-1 px-2 py-1 rounded text-[10px]
						${r(xe) ? "bg-surface-700 border border-hecate-500/40 text-hecate-300" : r(ae) ? "text-hecate-400/60" : "text-surface-500"}`,
        "svelte-gwxd3p"
      ), x(de, r(z).icon), x(re, r(z).label);
    }), d(L, pe);
  });
  var S = o(Le, 4);
  {
    var k = (L) => {
      var z = Gu(), Y = i(z);
      s(z), g(() => {
        Re(
          z,
          1,
          `text-[10px] transition-all duration-300
						${r(H) ? "scale-110 text-es-event font-bold" : "text-surface-400"}`,
          "svelte-gwxd3p"
        ), x(Y, `${n() ?? ""} events`);
      }), d(L, z);
    };
    A(S, (L) => {
      c() !== "ready" && c() !== "promoted" && c() !== "shelved" && L(k);
    });
  }
  var q = o(S, 2);
  {
    var oe = (L) => {
      var z = qu(), Y = i(z, !0);
      s(z), g(
        (xe) => {
          Re(
            z,
            1,
            `text-sm font-bold tabular-nums ml-2
						${h() <= 60 ? "text-health-err animate-pulse" : h() <= 180 ? "text-health-warn" : "text-es-event"}`,
            "svelte-gwxd3p"
          ), x(Y, xe);
        },
        [() => $e(h())]
      ), d(L, z);
    };
    A(q, (L) => {
      c() === "storm" && L(oe);
    });
  }
  var Be = o(q, 2);
  {
    var B = (L) => {
      var z = Hu(), Y = it(z);
      Y.__click = () => Ks.update((ae) => !ae);
      var xe = o(Y, 2);
      xe.__click = () => ql(j()), g(() => Re(
        Y,
        1,
        `text-[9px] px-2 py-0.5 rounded ml-1
						${m() ? "text-hecate-300 bg-hecate-600/20" : "text-surface-400 hover:text-surface-200 hover:bg-surface-700"} transition-colors`,
        "svelte-gwxd3p"
      )), d(L, z);
    };
    A(Be, (L) => {
      c() !== "ready" && c() !== "promoted" && c() !== "shelved" && L(B);
    });
  }
  s(te), s(P);
  var O = o(P, 2), J = i(O);
  {
    var Te = (L) => {
      var z = Uu(), Y = i(z), xe = i(Y);
      xe.textContent = "⚡";
      var ae = o(xe, 6), pe = i(ae);
      pe.__click = () => Ml(j()), pe.textContent = "⚡ Start High Octane (10 min)";
      var Ie = o(pe, 2);
      He(Ie, 5, a, ct, (Je, b) => {
        var y = zu();
        y.__click = () => Er($(r(b).prompt), r(b).id);
        var de = i(y), T = i(de, !0);
        s(de);
        var re = o(de, 2), he = i(re, !0);
        s(re), s(y), g(() => {
          It(y, "title", r(b).description), x(T, r(b).icon), x(he, r(b).name);
        }), d(Je, y);
      }), s(Ie), s(ae), s(Y), s(z), d(L, z);
    }, Oe = (L) => {
      var z = Qu(), Y = i(z), xe = i(Y), ae = i(xe);
      He(ae, 1, f, (ne) => ne.sticky_id, (ne, X) => {
        const Z = /* @__PURE__ */ we(() => Me(r(X).sticky_id));
        var _e = Wu(), ke = i(_e), me = i(ke, !0);
        s(ke);
        var le = o(ke, 2), ee = i(le, !0);
        s(le);
        var Q = o(le, 2);
        Q.__click = () => Il(j(), r(X).sticky_id), Q.textContent = "✕", s(_e), g(() => {
          dr(_e, `transform: rotate(${r(Z).rotate ?? ""}deg) translate(${r(Z).dx ?? ""}px, ${r(Z).dy ?? ""}px)`), x(me, r(X).text), x(ee, r(X).author === "user" ? "" : r(X).author);
        }), d(ne, _e);
      });
      var pe = o(ae, 2);
      He(pe, 17, () => r(ce), (ne) => ne.id, (ne, X) => {
        var Z = Yu();
        dr(Z, `transform: rotate(${(Math.random() - 0.5) * 4}deg)`);
        var _e = i(Z), ke = i(_e, !0);
        s(_e);
        var me = o(_e, 4), le = i(me);
        le.__click = () => G(r(X)), le.textContent = "✓";
        var ee = o(le, 2);
        ee.__click = () => I(r(X)), ee.textContent = "✕", s(me), s(Z), g(() => x(ke, r(X).text)), d(ne, Z);
      });
      var Ie = o(pe, 2);
      {
        var Je = (ne) => {
          var X = Ku();
          d(ne, X);
        };
        A(Ie, (ne) => {
          f().length === 0 && r(ce).length === 0 && ne(Je);
        });
      }
      s(xe), s(Y);
      var b = o(Y, 2), y = i(b), de = i(y);
      wt(de), de.__keydown = je;
      var T = o(de, 2);
      T.__click = async () => {
        r(R).trim() && (await Za(j(), r(R)), _(R, ""));
      }, s(y);
      var re = o(y, 2), he = i(re);
      He(he, 5, a, ct, (ne, X) => {
        var Z = Ju();
        Z.__click = () => Er($(r(X).prompt), r(X).id);
        var _e = i(Z), ke = i(_e, !0);
        s(_e);
        var me = o(_e, 2), le = i(me, !0);
        s(me), s(Z), g(() => {
          It(Z, "title", r(X).description), x(ke, r(X).icon), x(le, r(X).role);
        }), d(ne, Z);
      }), s(he);
      var Ae = o(he, 2);
      Ae.__click = () => Ta(j(), "stack"), Ae.textContent = "End Storm → Stack", s(re), s(b), s(z), g(
        (ne, X) => {
          T.disabled = ne, Re(
            T,
            1,
            `px-3 py-2 rounded text-xs transition-colors
								${X ?? ""}`,
            "svelte-gwxd3p"
          );
        },
        [
          () => !r(R).trim(),
          () => r(R).trim() ? "bg-es-event text-surface-50 hover:bg-es-event/80" : "bg-surface-600 text-surface-400 cursor-not-allowed"
        ]
      ), xt(de, () => r(R), (ne) => _(R, ne)), d(L, z);
    }, Ke = (L) => {
      var z = sv(), Y = i(z), xe = o(i(Y), 2), ae = i(xe), pe = i(ae), Ie = i(pe);
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
          r(ie) && r(ie) !== r(me).sticky_id && (Jn(j(), r(ie), r(me).sticky_id), _(ie, null));
        }), d(ke, le);
      }), s(Je), s(ae);
      var b = o(ae, 2), y = i(b), de = i(y);
      s(y);
      var T = o(y, 2), re = i(T);
      He(re, 1, () => [...C().entries()], ([ke, me]) => ke, (ke, me) => {
        var le = /* @__PURE__ */ we(() => Ns(r(me), 2));
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
          ht.__click = () => Nl(j(), r(yt).sticky_id), ht.textContent = "↩", s(_t), g(() => x(zt, r(yt).text)), d(nt, _t);
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
          r(ie) && Q().length > 0 && (Jn(j(), r(ie), Q()[0].sticky_id), _(ie, null));
        }), d(ke, ye);
      });
      var he = o(re, 2);
      {
        var Ae = (ke) => {
          var me = rv();
          d(ke, me);
        };
        A(he, (ke) => {
          C().size === 0 && ke(Ae);
        });
      }
      s(T), s(b), s(xe), s(Y);
      var ne = o(Y, 2), X = i(ne), Z = i(X);
      He(Z, 5, () => a().slice(0, 2), ct, (ke, me) => {
        var le = av();
        le.__click = () => Er($(r(me).prompt), r(me).id);
        var ee = i(le), Q = i(ee, !0);
        s(ee);
        var ye = o(ee, 2), De = i(ye);
        s(ye), s(le), g(() => {
          x(Q, r(me).icon), x(De, `Ask ${r(me).name ?? ""}`);
        }), d(ke, le);
      }), s(Z);
      var _e = o(Z, 2);
      _e.__click = () => Ta(j(), "groom"), _e.textContent = "Groom Stacks →", s(X), s(ne), s(z), g(() => {
        x(Ie, `Stickies (${r(K).length ?? ""})`), x(de, `Stacks (${C().size ?? ""})`);
      }), d(L, z);
    }, Qe = (L) => {
      var z = vv(), Y = i(z), xe = i(Y), ae = o(i(xe), 2);
      {
        var pe = (re) => {
          var he = ov();
          He(he, 5, () => [...C().entries()], ([Ae, ne]) => Ae, (Ae, ne) => {
            var X = /* @__PURE__ */ we(() => Ns(r(ne), 2));
            let Z = () => r(X)[0], _e = () => r(X)[1];
            const ke = /* @__PURE__ */ we(() => r(Fe)[Z()]);
            var me = iv(), le = i(me), ee = i(le), Q = i(ee);
            s(ee);
            var ye = o(ee, 4);
            ye.__click = () => {
              r(ke) && Ll(j(), Z(), r(ke));
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
          }), s(he), d(re, he);
        }, Ie = (re) => {
          var he = cv();
          d(re, he);
        };
        A(ae, (re) => {
          C().size > 0 ? re(pe) : re(Ie, !1);
        });
      }
      var Je = o(ae, 2);
      {
        var b = (re) => {
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
          }), s(X), s(he), g(() => x(ne, `Standalone Stickies (${r(K).length ?? ""})`)), d(re, he);
        };
        A(Je, (re) => {
          r(K).length > 0 && re(b);
        });
      }
      s(xe), s(Y);
      var y = o(Y, 2), de = i(y), T = i(de);
      T.__click = () => Ta(j(), "cluster"), T.textContent = "Cluster Events →", s(de), s(y), s(z), d(L, z);
    }, tt = (L) => {
      var z = yv(), Y = i(z), xe = o(i(Y), 2), ae = i(xe), pe = i(ae), Ie = i(pe);
      s(pe);
      var Je = o(pe, 2), b = i(Je);
      He(b, 1, w, (ee) => ee.sticky_id, (ee, Q) => {
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
          r(ie) && r(ie) !== r(Q).sticky_id && (Qn(j(), r(ie), r(Q).sticky_id), _(ie, null));
        }), d(ee, ye);
      });
      var y = o(b, 2);
      {
        var de = (ee) => {
          var Q = xv();
          d(ee, Q);
        };
        A(y, (ee) => {
          w().length === 0 && ee(de);
        });
      }
      s(Je), s(ae);
      var T = o(ae, 2), re = i(T), he = i(re);
      s(re);
      var Ae = o(re, 2), ne = i(Ae);
      He(ne, 1, v, (ee) => ee.cluster_id, (ee, Q) => {
        const ye = /* @__PURE__ */ we(() => be(r(Q).cluster_id));
        var De = gv(), Ge = i(De), Ue = i(Ge), Xe = o(Ue, 2), rt = i(Xe, !0);
        s(Xe);
        var st = o(Xe, 2), nt = i(st, !0);
        s(st);
        var yt = o(st, 2);
        yt.__click = () => Fl(j(), r(Q).cluster_id), yt.textContent = "✕", s(Ge);
        var _t = o(Ge, 2);
        He(_t, 21, () => r(ye), (Ht) => Ht.sticky_id, (Ht, zt) => {
          var ht = hv(), Lt = i(ht), Cr = i(Lt, !0);
          s(Lt);
          var Mn = o(Lt, 2);
          {
            var Go = (Es) => {
              var As = _v(), qo = i(As);
              s(As), g(() => x(qo, `x${r(zt).weight ?? ""}`)), d(Es, As);
            };
            A(Mn, (Es) => {
              r(zt).weight > 1 && Es(Go);
            });
          }
          var In = o(Mn, 2);
          In.__click = () => Ol(j(), r(zt).sticky_id), In.textContent = "↩", s(ht), g(() => x(Cr, r(zt).text)), Ot("dragstart", ht, () => _(ie, r(zt).sticky_id, !0)), Ot("dragend", ht, () => _(ie, null)), d(Ht, ht);
        }), s(_t), s(De), g(() => {
          Re(
            De,
            1,
            `rounded-lg border-2 p-3 min-h-[120px] transition-colors
											${r(ie) ? "border-dashed border-hecate-500/50 bg-hecate-600/5" : "border-surface-600 bg-surface-800"}`,
            "svelte-gwxd3p"
          ), dr(De, `border-color: ${r(ie) ? "" : r(Q).color + "40"}`), dr(Ue, `background-color: ${r(Q).color ?? ""}`), x(rt, r(Q).name ?? "Unnamed"), x(nt, r(ye).length);
        }), Ot("dragover", De, (Ht) => Ht.preventDefault()), Ot("drop", De, () => {
          r(ie) && r(ye).length > 0 && (Qn(j(), r(ie), r(ye)[0].sticky_id), _(ie, null));
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
      s(Ae), s(T), s(xe), s(Y);
      var _e = o(Y, 2), ke = i(_e), me = i(ke);
      He(me, 5, () => a().slice(0, 2), ct, (ee, Q) => {
        var ye = mv();
        ye.__click = () => Er($(r(Q).prompt), r(Q).id);
        var De = i(ye), Ge = i(De, !0);
        s(De);
        var Ue = o(De, 2), Xe = i(Ue);
        s(Ue), s(ye), g(() => {
          x(Ge, r(Q).icon), x(Xe, `Ask ${r(Q).name ?? ""}`);
        }), d(ee, ye);
      }), s(me);
      var le = o(me, 2);
      le.__click = () => Ta(j(), "name"), le.textContent = "Name Divisions →", s(ke), s(_e), s(z), g(() => {
        x(Ie, `Unclustered (${w().length ?? ""})`), x(he, `Clusters (${v().length ?? ""})`), le.disabled = v().length === 0, Re(
          le,
          1,
          `text-[10px] px-3 py-1 rounded transition-colors
								${v().length === 0 ? "bg-surface-700 text-surface-500 cursor-not-allowed" : "bg-hecate-600/20 text-hecate-300 hover:bg-hecate-600/30"}`,
          "svelte-gwxd3p"
        );
      }), d(L, z);
    }, Ye = (L) => {
      var z = Ev(), Y = i(z), xe = i(Y), ae = o(i(xe), 2);
      He(ae, 5, v, (b) => b.cluster_id, (b, y) => {
        const de = /* @__PURE__ */ we(() => be(r(y).cluster_id));
        var T = Sv(), re = i(T), he = i(re), Ae = o(he, 2);
        {
          var ne = (me) => {
            var le = wv();
            wt(le), le.__keydown = (ee) => qe(ee, r(y).cluster_id), Ot("blur", le, () => _(U, null)), xt(le, () => r(ue), (ee) => _(ue, ee)), d(me, le);
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
            r(U) === r(y).cluster_id ? me(ne) : me(X, !1);
          });
        }
        var Z = o(Ae, 2), _e = i(Z);
        s(Z), s(re);
        var ke = o(re, 2);
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
        }), s(ke), s(T), g(() => {
          dr(T, `border-color: ${r(y).color ?? ""}40`), dr(he, `background-color: ${r(y).color ?? ""}`), x(_e, `${r(de).length ?? ""} events`);
        }), d(b, T);
      }), s(ae), s(xe), s(Y);
      var pe = o(Y, 2), Ie = i(pe), Je = i(Ie);
      Je.__click = () => Ta(j(), "map"), Je.textContent = "Map Integration Facts →", s(Ie), s(pe), s(z), d(L, z);
    }, at = (L) => {
      var z = Nv(), Y = i(z), xe = i(Y), ae = o(i(xe), 2), pe = i(ae);
      He(pe, 5, v, (ne) => ne.cluster_id, (ne, X) => {
        var Z = Av(), _e = i(Z), ke = o(_e), me = i(ke);
        s(ke), s(Z), g(
          (le) => {
            dr(Z, `border-color: ${r(X).color ?? ""}; background-color: ${r(X).color ?? ""}15`), x(_e, `${r(X).name ?? "Unnamed" ?? ""} `), x(me, `(${le ?? ""})`);
          },
          [() => be(r(X).cluster_id).length]
        ), d(ne, Z);
      }), s(pe);
      var Ie = o(pe, 2);
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
            st.__click = () => Vl(j(), r(_e).arrow_id), st.textContent = "✕", s(le), g(() => {
              dr(ee, `color: ${r(ke)?.color ?? "#888" ?? ""}; background-color: ${r(ke)?.color ?? "#888" ?? ""}15`), x(Q, r(ke)?.name ?? "?"), x(Ge, r(_e).fact_name), dr(Xe, `color: ${r(me)?.color ?? "#888" ?? ""}; background-color: ${r(me)?.color ?? "#888" ?? ""}15`), x(rt, r(me)?.name ?? "?");
            }), d(Z, le);
          }), s(X), d(ne, X);
        };
        A(Ie, (ne) => {
          p().length > 0 && ne(Je);
        });
      }
      s(ae);
      var b = o(ae, 2);
      {
        var y = (ne) => {
          var X = Mv(), Z = o(i(X), 2), _e = i(Z), ke = o(i(_e), 2), me = i(ke);
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
        A(b, (ne) => {
          v().length >= 2 && ne(y);
        });
      }
      s(xe), s(Y);
      var de = o(Y, 2), T = i(de), re = i(T);
      He(re, 5, () => a().slice(2), ct, (ne, X) => {
        var Z = Iv();
        Z.__click = () => Er($(r(X).prompt), r(X).id);
        var _e = i(Z), ke = i(_e, !0);
        s(_e);
        var me = o(_e, 2), le = i(me);
        s(me), s(Z), g(() => {
          x(ke, r(X).icon), x(le, `Ask ${r(X).name ?? ""}`);
        }), d(ne, Z);
      }), s(re);
      var he = o(re, 2);
      he.__click = Ne;
      var Ae = i(he, !0);
      s(he), s(T), s(de), s(z), g(() => {
        he.disabled = V(), Re(
          he,
          1,
          `text-[10px] px-4 py-1.5 rounded font-medium transition-colors
								${V() ? "bg-surface-700 text-surface-500 cursor-not-allowed" : "bg-hecate-600 text-surface-50 hover:bg-hecate-500"}`,
          "svelte-gwxd3p"
        ), x(Ae, V() ? "Promoting..." : "Promote to Divisions");
      }), d(L, z);
    }, ze = (L) => {
      var z = Lv(), Y = i(z), xe = i(Y);
      xe.textContent = "✓";
      var ae = o(xe, 4), pe = i(ae);
      s(ae);
      var Ie = o(ae, 4);
      Ie.__click = function(...Je) {
        Ul?.apply(this, Je);
      }, s(Y), s(z), g(() => x(pe, `${v().length ?? ""} divisions identified from
						${n() ?? ""} domain events, with
						${p().length ?? ""} integration fact${p().length !== 1 ? "s" : ""} mapped.`)), d(L, z);
    }, We = (L) => {
      var z = Ov(), Y = i(z), xe = i(Y);
      xe.textContent = "⏸";
      var ae = o(xe, 6);
      ae.__click = () => Hl(j()), s(Y), s(z), d(L, z);
    };
    A(J, (L) => {
      c() === "ready" ? L(Te) : c() === "storm" ? L(Oe, 1) : c() === "stack" ? L(Ke, 2) : c() === "groom" ? L(Qe, 3) : c() === "cluster" ? L(tt, 4) : c() === "name" ? L(Ye, 5) : c() === "map" ? L(at, 6) : c() === "promoted" ? L(ze, 7) : c() === "shelved" && L(We, 8);
    });
  }
  s(O), s(F), g(() => Re(
    O,
    1,
    `flex-1 overflow-y-auto transition-opacity duration-150
		${r(N) ? "opacity-0" : "opacity-100"}`,
    "svelte-gwxd3p"
  )), d(e, F), mt(), se();
}
At(["click", "keydown"]);
kt(en, {}, [], [], { mode: "open" });
const mr = et([]), Tn = et(null), Bv = Tt(mr, (e) => {
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
    return await Ze().post(`/stormings/${e}/design-aggregate`, t), !0;
  } catch (a) {
    const n = a;
    return Tn.set(n.message || "Failed to design aggregate"), !1;
  }
}
async function Qv(e, t) {
  try {
    return await Ze().post(`/stormings/${e}/design-event`, t), !0;
  } catch (a) {
    const n = a;
    return Tn.set(n.message || "Failed to design event"), !1;
  }
}
async function ei(e, t) {
  try {
    return await Ze().post(`/stormings/${e}/plan-desk`, t), !0;
  } catch (a) {
    const n = a;
    return Tn.set(n.message || "Failed to plan desk"), !1;
  }
}
var Xv = /* @__PURE__ */ u(`<button class="text-[10px] px-2.5 py-1 rounded bg-hecate-600/20 text-hecate-300
					hover:bg-hecate-600/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"> </button>`), Zv = /* @__PURE__ */ u(`<button class="text-[10px] px-2 py-1 rounded text-surface-400
					hover:text-hecate-300 hover:bg-hecate-600/10 transition-colors" title="Get AI assistance"></button>`), ef = /* @__PURE__ */ u('<div><div class="flex items-start gap-2"><span class="text-hecate-400 text-sm mt-0.5"> </span> <div class="flex-1 min-w-0"><div class="flex items-center gap-2"><h3 class="text-xs font-semibold text-surface-100"> </h3> <span> </span></div> <p class="text-[11px] text-surface-400 mt-1"> </p></div></div> <div class="flex items-center gap-2 mt-1"><!> <!></div></div>');
function gt(e, t) {
  bt(t, !0);
  let a = pt(t, "title", 7), n = pt(t, "description", 7), c = pt(t, "icon", 7, "■"), l = pt(t, "status", 7, "pending"), f = pt(t, "aiContext", 7), v = pt(t, "onaction", 7), p = pt(t, "actionLabel", 7, "Execute"), h = pt(t, "disabled", 7, !1), m = /* @__PURE__ */ we(() => w(l()));
  function C(N) {
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
  var V = {
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
  }, D = ef(), se = i(D), R = i(se), U = i(R, !0);
  s(R);
  var ue = o(R, 2), Ce = i(ue), ge = i(Ce), fe = i(ge, !0);
  s(ge);
  var ie = o(ge, 2), Fe = i(ie, !0);
  s(ie), s(Ce);
  var Pe = o(Ce, 2), Me = i(Pe, !0);
  s(Pe), s(ue), s(se);
  var ce = o(se, 2), G = i(ce);
  {
    var I = (N) => {
      var M = Xv();
      M.__click = function(...$e) {
        v()?.apply(this, $e);
      };
      var j = i(M, !0);
      s(M), g(() => {
        M.disabled = h(), x(j, p());
      }), d(N, M);
    };
    A(G, (N) => {
      v() && N(I);
    });
  }
  var H = o(G, 2);
  {
    var W = (N) => {
      var M = Zv();
      M.__click = () => Er(f()), M.textContent = "✦ AI", d(N, M);
    };
    A(H, (N) => {
      f() && N(W);
    });
  }
  return s(ce), s(D), g(
    (N) => {
      Re(D, 1, `rounded-lg bg-surface-800 border ${N ?? ""} p-4 flex flex-col gap-2 transition-colors hover:border-surface-500`), x(U, c()), x(fe, a()), Re(ie, 1, `text-[9px] px-1.5 py-0.5 rounded ${r(m).cls ?? ""}`), x(Fe, r(m).text), x(Me, n());
    },
    [() => C(l())]
  ), d(e, D), mt(V);
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
function Do(e, t) {
  bt(t, !0);
  const a = () => Ee(Yr, "$selectedDivision", p), n = () => Ee(mr, "$deskCards", p), c = () => Ee(Bv, "$deskAggregates", p), l = () => Ee(Vv, "$deskCardsByAggregate", p), f = () => Ee(Ud, "$designLevelAgents", p), v = () => Ee(Et, "$isLoading", p), [p, h] = Nt(), m = (S, k = Pr) => {
    var q = of(), oe = i(q), Be = i(oe);
    He(Be, 17, () => k().policies, (ae) => ae.id, (ae, pe) => {
      var Ie = tf(), Je = i(Ie), b = i(Je, !0);
      s(Je);
      var y = o(Je, 2);
      y.__click = () => Wv(k().id, r(pe).id), y.textContent = "✕", s(Ie), g(() => x(b, r(pe).text)), d(ae, Ie);
    });
    var B = o(Be, 2);
    wt(B), B.__keydown = (ae) => Me(ae, k().id), s(oe);
    var O = o(oe, 2), J = i(O), Te = i(J);
    Te.__click = () => H(k());
    var Oe = i(Te, !0);
    s(Te);
    var Ke = o(Te, 2);
    {
      var Qe = (ae) => {
        var pe = rf();
        wt(pe), pe.__keydown = (Ie) => {
          Ie.key === "Enter" && I(k().id), Ie.key === "Escape" && _(R, null);
        }, Ot("blur", pe, () => I(k().id)), xt(pe, () => r(U), (Ie) => _(U, Ie)), d(ae, pe);
      }, tt = (ae) => {
        var pe = af();
        pe.__dblclick = () => G(k());
        var Ie = i(pe, !0);
        s(pe), g(() => x(Ie, k().name)), d(ae, pe);
      };
      A(Ke, (ae) => {
        r(R) === k().id ? ae(Qe) : ae(tt, !1);
      });
    }
    var Ye = o(Ke, 2), at = i(Ye);
    at.__click = () => j(k()), at.textContent = "↑ promote";
    var ze = o(at, 2);
    ze.__click = () => qv(k().id), ze.textContent = "✕", s(Ye), s(J);
    var We = o(J, 2);
    {
      var L = (ae) => {
        var pe = sf(), Ie = i(pe);
        s(pe), g(() => x(Ie, `■ ${k().aggregate ?? ""}`)), d(ae, pe);
      };
      A(We, (ae) => {
        k().aggregate && ae(L);
      });
    }
    s(O);
    var z = o(O, 2), Y = i(z);
    He(Y, 17, () => k().events, (ae) => ae.id, (ae, pe) => {
      var Ie = nf(), Je = i(Ie), b = i(Je, !0);
      s(Je);
      var y = o(Je, 2);
      y.__click = () => Kv(k().id, r(pe).id), y.textContent = "✕", s(Ie), g(() => x(b, r(pe).text)), d(ae, Ie);
    });
    var xe = o(Y, 2);
    wt(xe), xe.__keydown = (ae) => ce(ae, k().id), s(z), s(q), g(
      (ae, pe, Ie) => {
        Re(Te, 1, `text-sm ${ae ?? ""}
						hover:scale-110 transition-transform`), It(Te, "title", `${pe ?? ""} — click to cycle`), x(Oe, Ie);
      },
      [
        () => M(k().execution),
        () => N(k().execution),
        () => W(k().execution)
      ]
    ), xt(B, () => r(D)[k().id], (ae) => r(D)[k().id] = ae), xt(xe, () => r(se)[k().id], (ae) => r(se)[k().id] = ae), d(S, q);
  };
  let C = /* @__PURE__ */ ve(""), w = /* @__PURE__ */ ve(""), V = /* @__PURE__ */ ve("human"), D = /* @__PURE__ */ ve(Vt({})), se = /* @__PURE__ */ ve(Vt({})), R = /* @__PURE__ */ ve(null), U = /* @__PURE__ */ ve(""), ue = /* @__PURE__ */ ve(!1), Ce = /* @__PURE__ */ ve(""), ge = /* @__PURE__ */ ve(""), fe = /* @__PURE__ */ ve("cmd"), ie = /* @__PURE__ */ ve("design");
  function Fe() {
    r(C).trim() && (Gv(r(C), r(w) || void 0, r(V)), _(C, ""), _(w, ""), _(V, "human"));
  }
  function Pe(S) {
    S.key === "Enter" && !S.shiftKey && r(C).trim() && (S.preventDefault(), Fe());
  }
  function Me(S, k) {
    S.key === "Enter" && r(D)[k]?.trim() && (S.preventDefault(), Uv(k, r(D)[k]), r(D)[k] = "");
  }
  function ce(S, k) {
    S.key === "Enter" && r(se)[k]?.trim() && (S.preventDefault(), Yv(k, r(se)[k]), r(se)[k] = "");
  }
  function G(S) {
    _(R, S.id, !0), _(U, S.name, !0);
  }
  function I(S) {
    r(U).trim() && Hv(S, { name: r(U).trim() }), _(R, null);
  }
  function H(S) {
    const k = ["human", "agent", "both"], q = k.indexOf(S.execution);
    zv(S.id, k[(q + 1) % k.length]);
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
  function M(S) {
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
  async function j(S) {
    if (!a()) return;
    const k = a().division_id;
    await ei(k, {
      desk_name: S.name,
      description: [
        S.execution === "agent" ? "AI-automated" : S.execution === "both" ? "Human+AI assisted" : "Interactive",
        S.policies.length > 0 ? `Policies: ${S.policies.map((q) => q.text).join(", ")}` : "",
        S.events.length > 0 ? `Emits: ${S.events.map((q) => q.text).join(", ")}` : ""
      ].filter(Boolean).join(". "),
      department: "CMD"
    });
    for (const q of S.events)
      await Qv(k, {
        event_name: q.text,
        aggregate_type: S.aggregate || S.name
      });
    S.aggregate && await Jv(k, { aggregate_name: S.aggregate });
  }
  async function $e() {
    if (!a() || !r(Ce).trim()) return;
    await ei(a().division_id, {
      desk_name: r(Ce).trim(),
      description: r(ge).trim() || void 0,
      department: r(fe)
    }) && (_(Ce, ""), _(ge, ""), _(ue, !1));
  }
  function je(S) {
    const k = a()?.context_name ?? "this division", q = n(), oe = q.map((J) => J.name).join(", "), Be = q.flatMap((J) => J.events.map((Te) => Te.text)).join(", "), B = q.flatMap((J) => J.policies.map((Te) => Te.text)).join(", ");
    let O = `We are doing Design-Level Event Storming for the "${k}" division.

`;
    return O += `Our board uses command-centric desk cards:
`, O += `- Each card = a desk (command/slice)
`, O += `- Left side: policies (grey) = filter/guard conditions
`, O += `- Right side: events (orange) = what the desk emits
`, O += `- Cards can be human (interactive), agent (AI), or both

`, oe && (O += `Desks so far: ${oe}
`), Be && (O += `Events so far: ${Be}
`), B && (O += `Policies so far: ${B}
`), O += `
${S.prompt}

Please analyze and suggest items for the board.`, O;
  }
  var qe = gf(), Ve = i(qe), Se = i(Ve), Ne = o(i(Se), 2), be = o(i(Ne)), K = i(be, !0);
  s(be), s(Ne), s(Se);
  var $ = o(Se, 2), E = i($);
  E.__click = () => _(ie, "design");
  var F = o(E, 2);
  F.__click = () => _(ie, "plan"), s($), s(Ve);
  var P = o(Ve, 2);
  {
    var te = (S) => {
      var k = xf(), q = it(k), oe = i(q), Be = i(oe), B = o(i(Be), 2);
      wt(B), B.__keydown = Pe, s(Be);
      var O = o(Be, 2), J = o(i(O), 2);
      wt(J);
      var Te = o(J, 2);
      He(Te, 5, c, ct, (T, re) => {
        var he = cf(), Ae = {};
        g(() => {
          Ae !== (Ae = r(re)) && (he.value = (he.__value = r(re)) ?? "");
        }), d(T, he);
      }), s(Te), s(O);
      var Oe = o(O, 2), Ke = o(i(Oe), 2), Qe = i(Ke);
      Qe.value = Qe.__value = "human";
      var tt = o(Qe);
      tt.value = tt.__value = "agent";
      var Ye = o(tt);
      Ye.value = Ye.__value = "both", s(Ke), s(Oe);
      var at = o(Oe, 2);
      at.__click = Fe, s(oe), s(q);
      var ze = o(q, 2);
      {
        var We = (T) => {
          const re = /* @__PURE__ */ we(() => {
            const { grouped: Z, ungrouped: _e } = l();
            return { grouped: Z, ungrouped: _e };
          });
          var he = vf(), Ae = it(he);
          He(Ae, 17, () => [...r(re).grouped.entries()], ct, (Z, _e) => {
            var ke = /* @__PURE__ */ we(() => Ns(r(_e), 2));
            let me = () => r(ke)[0], le = () => r(ke)[1];
            var ee = lf(), Q = i(ee), ye = o(i(Q), 2), De = i(ye, !0);
            s(ye);
            var Ge = o(ye, 4), Ue = i(Ge);
            s(Ge), s(Q);
            var Xe = o(Q, 2);
            He(Xe, 21, le, (rt) => rt.id, (rt, st) => {
              m(rt, () => r(st));
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
                  r(re).grouped.size > 0 && ee(me);
                });
              }
              var le = o(ke, 2);
              He(le, 21, () => r(re).ungrouped, (ee) => ee.id, (ee, Q) => {
                m(ee, () => r(Q));
              }), s(le), g(() => Re(le, 1, `space-y-3 ${r(re).grouped.size > 0 ? "ml-5" : ""}`)), d(Z, _e);
            };
            A(ne, (Z) => {
              r(re).ungrouped.length > 0 && Z(X);
            });
          }
          d(T, he);
        }, L = (T) => {
          var re = ff();
          d(T, re);
        };
        A(ze, (T) => {
          n().length > 0 ? T(We) : T(L, !1);
        });
      }
      var z = o(ze, 2), Y = i(z), xe = i(Y);
      xe.textContent = "✦", Dt(4), s(Y);
      var ae = o(Y, 2);
      He(ae, 5, f, ct, (T, re) => {
        var he = pf();
        he.__click = () => Er(je(r(re)));
        var Ae = i(he), ne = i(Ae), X = i(ne, !0);
        s(ne);
        var Z = o(ne, 2), _e = i(Z, !0);
        s(Z), s(Ae);
        var ke = o(Ae, 2), me = i(ke, !0);
        s(ke);
        var le = o(ke, 2), ee = i(le, !0);
        s(le), s(he), g(() => {
          x(X, r(re).icon), x(_e, r(re).name), x(me, r(re).role), x(ee, r(re).description);
        }), d(T, he);
      }), s(ae), s(z);
      var pe = o(z, 2), Ie = o(i(pe), 2), Je = i(Ie);
      {
        let T = /* @__PURE__ */ we(() => `Help me design aggregates for the "${a()?.context_name}" division. What are the natural consistency boundaries? What entities accumulate history over time?`);
        gt(Je, {
          title: "Design Aggregates",
          description: "Identify aggregate boundaries, define stream patterns and status flags",
          icon: "■",
          get aiContext() {
            return r(T);
          }
        });
      }
      var b = o(Je, 2);
      {
        let T = /* @__PURE__ */ we(() => `Help me define status bit flags for aggregates in the "${a()?.context_name}" division. Each aggregate needs lifecycle states as bit flags (powers of 2).`);
        gt(b, {
          title: "Define Status Flags",
          description: "Design bit flag status fields for each aggregate lifecycle",
          icon: "⚑",
          get aiContext() {
            return r(T);
          }
        });
      }
      var y = o(b, 2);
      {
        let T = /* @__PURE__ */ we(() => `Help me identify read models for the "${a()?.context_name}" division. What queries will users run? What data views are needed?`);
        gt(y, {
          title: "Map Read Models",
          description: "Identify what queries users will run and what data they need",
          icon: "▶",
          get aiContext() {
            return r(T);
          }
        });
      }
      var de = o(y, 2);
      {
        let T = /* @__PURE__ */ we(() => `Help me create a domain glossary for the "${a()?.context_name}" division. Define key terms, bounded context boundaries, and ubiquitous language.`);
        gt(de, {
          title: "Domain Glossary",
          description: "Document ubiquitous language and bounded context definitions",
          icon: "✎",
          get aiContext() {
            return r(T);
          }
        });
      }
      s(Ie), s(pe), g(
        (T, re) => {
          at.disabled = T, Re(at, 1, `px-3 py-1.5 rounded text-xs transition-colors shrink-0
						${re ?? ""}`);
        },
        [
          () => !r(C).trim(),
          () => r(C).trim() ? "bg-es-command/20 text-es-command hover:bg-es-command/30" : "bg-surface-700 text-surface-500 cursor-not-allowed"
        ]
      ), xt(B, () => r(C), (T) => _(C, T)), xt(J, () => r(w), (T) => _(w, T)), Ga(Ke, () => r(V), (T) => _(V, T)), d(S, k);
    }, Le = (S) => {
      var k = hf(), q = it(k), oe = i(q), Be = o(i(oe), 2);
      Be.__click = () => _(ue, !r(ue)), s(oe);
      var B = o(oe, 2);
      {
        var O = (Ye) => {
          var at = _f(), ze = i(at), We = o(i(ze), 2);
          wt(We), s(ze);
          var L = o(ze, 2), z = o(i(L), 2);
          wt(z), s(L);
          var Y = o(L, 2), xe = o(i(Y), 2), ae = i(xe);
          ae.value = ae.__value = "cmd";
          var pe = o(ae);
          pe.value = pe.__value = "qry";
          var Ie = o(pe);
          Ie.value = Ie.__value = "prj", s(xe), s(Y);
          var Je = o(Y, 2);
          Je.__click = $e;
          var b = o(Je, 2);
          b.__click = () => _(ue, !1), s(at), g((y) => Je.disabled = y, [() => !r(Ce).trim() || v()]), xt(We, () => r(Ce), (y) => _(Ce, y)), xt(z, () => r(ge), (y) => _(ge, y)), Ga(xe, () => r(fe), (y) => _(fe, y)), d(Ye, at);
        };
        A(B, (Ye) => {
          r(ue) && Ye(O);
        });
      }
      Dt(2), s(q);
      var J = o(q, 2), Te = o(i(J), 2), Oe = i(Te);
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
      s(Te), s(J), d(S, k);
    };
    A(P, (S) => {
      r(ie) === "design" ? S(te) : S(Le, !1);
    });
  }
  s(qe), g(() => {
    x(K, a()?.context_name), Re(E, 1, `px-3 py-1 rounded text-[11px] transition-colors
					${r(ie) === "design" ? "bg-surface-600 text-surface-100" : "text-surface-400 hover:text-surface-200"}`), Re(F, 1, `px-3 py-1 rounded text-[11px] transition-colors
					${r(ie) === "plan" ? "bg-surface-600 text-surface-100" : "text-surface-400 hover:text-surface-200"}`);
  }), d(e, qe), mt(), h();
}
At(["click", "keydown", "dblclick"]);
kt(Do, {}, [], [], { mode: "open" });
mc();
var bf = /* @__PURE__ */ u(`<div class="p-4 space-y-6"><div><h3 class="text-sm font-semibold text-surface-100">Planning</h3> <p class="text-[11px] text-surface-400 mt-0.5">Lifecycle management for <span class="text-surface-200"> </span></p></div> <div class="rounded-lg border border-surface-600 bg-surface-800/50 p-4"><h4 class="text-xs font-semibold text-surface-100 mb-3">Division Lifecycle</h4> <p class="text-[10px] text-surface-400 leading-relaxed">Use the phase controls above to manage this division's planning lifecycle: <span class="text-surface-300">Open</span> to begin work, <span class="text-surface-300">Shelve</span> to pause, <span class="text-surface-300">Resume</span> to continue, or <span class="text-surface-300">Conclude</span> when planning is complete.</p> <p class="text-[10px] text-surface-400 mt-2 leading-relaxed">Content work (designing aggregates, events, desks) happens in the <span class="text-es-event">Storming</span> phase.
			Implementation items are tracked on the <span class="text-hecate-400">Kanban</span> board.</p></div> <div><h4 class="text-xs font-semibold text-surface-100 mb-3">Planning Tasks</h4> <div class="grid grid-cols-1 md:grid-cols-2 gap-3"><!> <!> <!> <!></div></div></div>`);
function Po(e, t) {
  bt(t, !1);
  const a = () => Ee(Yr, "$selectedDivision", n), [n, c] = Nt();
  cl();
  var l = bf(), f = i(l), v = o(i(f), 2), p = o(i(v)), h = i(p, !0);
  s(p), s(v), s(f);
  var m = o(f, 4), C = o(i(m), 2), w = i(C);
  {
    let R = /* @__PURE__ */ va(() => `Help me create a desk inventory for the "${a()?.context_name}" division. Each desk is a vertical slice (command + event + handler). Organize by CMD (write), QRY (read), and PRJ (projection) departments.`);
    gt(w, {
      title: "Desk Inventory",
      description: "Create a complete inventory of desks needed for this division, organized by department (CMD, QRY, PRJ)",
      icon: "▣",
      get aiContext() {
        return r(R);
      }
    });
  }
  var V = o(w, 2);
  {
    let R = /* @__PURE__ */ va(() => `Help me map dependencies between desks in the "${a()?.context_name}" division. Which desks depend on which? What's the optimal implementation order?`);
    gt(V, {
      title: "Dependency Mapping",
      description: "Map dependencies between desks to determine implementation order",
      icon: "⇄",
      get aiContext() {
        return r(R);
      }
    });
  }
  var D = o(V, 2);
  {
    let R = /* @__PURE__ */ va(() => `Help me sequence the implementation of desks in the "${a()?.context_name}" division into logical sprints. Consider dependencies, walking skeleton principles, and the "initiate + archive" first rule.`);
    gt(D, {
      title: "Sprint Sequencing",
      description: "Prioritize and sequence desks into implementation sprints",
      icon: "☰",
      get aiContext() {
        return r(R);
      }
    });
  }
  var se = o(D, 2);
  {
    let R = /* @__PURE__ */ va(() => `Help me design REST API endpoints for the "${a()?.context_name}" division. Follow the pattern: POST /api/{resource}/{action} for commands, GET /api/{resource} for queries.`);
    gt(se, {
      title: "API Design",
      description: "Design REST API endpoints for each desk's capabilities",
      icon: "↔",
      get aiContext() {
        return r(R);
      }
    });
  }
  s(C), s(m), s(l), g(() => x(h, a()?.context_name)), d(e, l), mt(), c();
}
kt(Po, {}, [], [], { mode: "open" });
const Rn = 2, Da = 4, Cs = 8, Ss = 16, ti = et(null), Lr = et([]), Pt = et(null), tn = et(!1), mf = Tt(
  Lr,
  (e) => e.filter(
    (t) => (t.status & Cs) === 0 && (t.status & Ss) === 0 && (t.status & Rn) === 0 && (t.status & Da) === 0
  )
), yf = Tt(
  Lr,
  (e) => e.filter(
    (t) => (t.status & Rn) !== 0 && (t.status & Cs) === 0 && (t.status & Ss) === 0 && (t.status & Da) === 0
  )
), wf = Tt(
  Lr,
  (e) => e.filter((t) => (t.status & Da) !== 0)
), $f = Tt(
  Lr,
  (e) => e.filter((t) => (t.status & Cs) !== 0 && (t.status & Da) === 0)
), kf = Tt(
  Lr,
  (e) => e.filter((t) => (t.status & Ss) !== 0 && (t.status & Da) === 0)
), Cf = Tt(Lr, (e) => {
  let t = 0, a = 0, n = 0, c = 0, l = 0;
  for (const f of e)
    f.status & Da ? n++ : f.status & Cs ? c++ : f.status & Ss ? l++ : f.status & Rn ? a++ : t++;
  return { posted: t, picked: a, finished: n, parked: c, blocked: l, total: e.length };
});
async function Fr(e) {
  try {
    tn.set(!0), Pt.set(null);
    const a = await Ze().get(
      `/kanbans/${e}`
    );
    ti.set(a.board), Lr.set(a.cards ?? []);
  } catch (t) {
    const a = t;
    Pt.set(a.message || "Failed to fetch kanban board"), ti.set(null), Lr.set([]);
  } finally {
    tn.set(!1);
  }
}
async function Sf(e, t) {
  try {
    return Pt.set(null), await Ze().post(`/kanbans/${e}/cards`, t), await Fr(e), !0;
  } catch (a) {
    const n = a;
    return Pt.set(n.message || "Failed to post card"), !1;
  }
}
async function Ef(e, t, a = "hecate-web") {
  try {
    return Pt.set(null), await Ze().post(`/kanbans/${e}/cards/${t}/pick`, {
      picked_by: a
    }), await Fr(e), !0;
  } catch (n) {
    const c = n;
    return Pt.set(c.message || "Failed to pick card"), !1;
  }
}
async function Af(e, t) {
  try {
    return Pt.set(null), await Ze().post(`/kanbans/${e}/cards/${t}/finish`, {}), await Fr(e), !0;
  } catch (a) {
    const n = a;
    return Pt.set(n.message || "Failed to finish card"), !1;
  }
}
async function Df(e, t, a) {
  try {
    return Pt.set(null), await Ze().post(`/kanbans/${e}/cards/${t}/unpick`, { reason: a }), await Fr(e), !0;
  } catch (n) {
    const c = n;
    return Pt.set(c.message || "Failed to unpick card"), !1;
  }
}
async function Pf(e, t, a, n = "hecate-web") {
  try {
    return Pt.set(null), await Ze().post(`/kanbans/${e}/cards/${t}/park`, {
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
    return Pt.set(null), await Ze().post(`/kanbans/${e}/cards/${t}/unpark`, {}), await Fr(e), !0;
  } catch (a) {
    const n = a;
    return Pt.set(n.message || "Failed to unpark card"), !1;
  }
}
async function Rf(e, t, a, n = "hecate-web") {
  try {
    return Pt.set(null), await Ze().post(`/kanbans/${e}/cards/${t}/block`, {
      reason: a,
      blocked_by: n
    }), await Fr(e), !0;
  } catch (c) {
    const l = c;
    return Pt.set(l.message || "Failed to block card"), !1;
  }
}
async function Mf(e, t) {
  try {
    return Pt.set(null), await Ze().post(`/kanbans/${e}/cards/${t}/unblock`, {}), await Fr(e), !0;
  } catch (a) {
    const n = a;
    return Pt.set(n.message || "Failed to unblock card"), !1;
  }
}
var If = /* @__PURE__ */ u('<span class="text-health-warn"> </span>'), Nf = /* @__PURE__ */ u('<span class="text-health-err"> </span>'), Lf = /* @__PURE__ */ u('<div class="flex items-center gap-3 text-[10px] text-surface-400 mr-2"><span> </span> <span> </span> <span> </span> <!> <!></div>'), Of = /* @__PURE__ */ u('<div class="text-[11px] text-health-err bg-health-err/10 rounded px-3 py-2"> </div>'), Ff = /* @__PURE__ */ u(`<div class="rounded-lg border border-hecate-600/30 bg-surface-800/80 p-4 space-y-3"><h4 class="text-xs font-medium text-hecate-300 uppercase tracking-wider">New Work Card</h4> <div class="grid grid-cols-[1fr_auto] gap-3"><div><label for="card-title" class="text-[10px] text-surface-400 block mb-1">Title (desk name)</label> <input id="card-title" placeholder="e.g., register_user" class="w-full bg-surface-700 border border-surface-600 rounded px-2.5 py-1.5
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
function To(e, t) {
  bt(t, !0);
  const a = () => Ee(Yr, "$selectedDivision", w), n = () => Ee(Lr, "$kanbanCards", w), c = () => Ee(Cf, "$cardCounts", w), l = () => Ee(Pt, "$kanbanError", w), f = () => Ee(tn, "$kanbanLoading", w), v = () => Ee(mf, "$postedCards", w), p = () => Ee(yf, "$pickedCards", w), h = () => Ee(wf, "$finishedCards", w), m = () => Ee($f, "$parkedCards", w), C = () => Ee(kf, "$blockedCards", w), [w, V] = Nt();
  let D = /* @__PURE__ */ ve(null);
  Rt(() => {
    const B = a();
    B && B.division_id !== r(D) && (_(D, B.division_id, !0), Fr(B.division_id));
  });
  let se = /* @__PURE__ */ ve(!1), R = /* @__PURE__ */ ve(""), U = /* @__PURE__ */ ve(""), ue = /* @__PURE__ */ ve("cmd_desk"), Ce = /* @__PURE__ */ ve(null), ge = /* @__PURE__ */ ve("unpick"), fe = /* @__PURE__ */ ve("");
  async function ie() {
    if (!a() || !r(R).trim()) return;
    await Sf(a().division_id, {
      title: r(R).trim(),
      description: r(U).trim() || void 0,
      card_type: r(ue),
      posted_by: "hecate-web"
    }) && (_(R, ""), _(U, ""), _(se, !1));
  }
  async function Fe(B) {
    a() && await Ef(a().division_id, B.card_id);
  }
  async function Pe(B) {
    a() && await Af(a().division_id, B.card_id);
  }
  function Me(B, O) {
    _(Ce, B, !0), _(ge, O, !0), _(fe, "");
  }
  async function ce() {
    if (!a() || !r(Ce) || !r(fe).trim()) return;
    const B = a().division_id, O = r(Ce).card_id;
    let J = !1;
    r(ge) === "unpick" ? J = await Df(B, O, r(fe).trim()) : r(ge) === "park" ? J = await Pf(B, O, r(fe).trim()) : r(ge) === "block" && (J = await Rf(B, O, r(fe).trim())), J && (_(Ce, null), _(fe, ""));
  }
  async function G(B) {
    a() && await Tf(a().division_id, B.card_id);
  }
  async function I(B) {
    a() && await Mf(a().division_id, B.card_id);
  }
  function H(B) {
    switch (B) {
      case "cmd_desk":
        return "CMD";
      case "prj_desk":
        return "PRJ";
      case "qry_desk":
        return "QRY";
      default:
        return B;
    }
  }
  function W(B) {
    switch (B) {
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
  function N(B) {
    return B ? new Date(B).toLocaleDateString(void 0, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }) : "";
  }
  const M = {
    unpick: { title: "Unpick Card", verb: "Unpick", color: "health-warn" },
    park: { title: "Park Card", verb: "Park", color: "health-warn" },
    block: { title: "Block Card", verb: "Block", color: "health-err" }
  };
  var j = ep(), $e = i(j), je = i($e), qe = o(i(je), 2), Ve = o(i(qe)), Se = i(Ve, !0);
  s(Ve), s(qe), s(je);
  var Ne = o(je, 2), be = i(Ne);
  {
    var K = (B) => {
      var O = Lf(), J = i(O), Te = i(J);
      s(J);
      var Oe = o(J, 2), Ke = i(Oe);
      s(Oe);
      var Qe = o(Oe, 2), tt = i(Qe);
      s(Qe);
      var Ye = o(Qe, 2);
      {
        var at = (L) => {
          var z = If(), Y = i(z);
          s(z), g(() => x(Y, `${c().parked ?? ""} parked`)), d(L, z);
        };
        A(Ye, (L) => {
          c().parked > 0 && L(at);
        });
      }
      var ze = o(Ye, 2);
      {
        var We = (L) => {
          var z = Nf(), Y = i(z);
          s(z), g(() => x(Y, `${c().blocked ?? ""} blocked`)), d(L, z);
        };
        A(ze, (L) => {
          c().blocked > 0 && L(We);
        });
      }
      s(O), g(() => {
        x(Te, `${c().posted ?? ""} posted`), x(Ke, `${c().picked ?? ""} picked`), x(tt, `${c().finished ?? ""} done`);
      }), d(B, O);
    };
    A(be, (B) => {
      n().length > 0 && B(K);
    });
  }
  var $ = o(be, 2);
  $.__click = () => _(se, !r(se)), s(Ne), s($e);
  var E = o($e, 2);
  {
    var F = (B) => {
      var O = Of(), J = i(O, !0);
      s(O), g(() => x(J, l())), d(B, O);
    };
    A(E, (B) => {
      l() && B(F);
    });
  }
  var P = o(E, 2);
  {
    var te = (B) => {
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
      var L = o(ze, 2), z = i(L);
      z.__click = ie;
      var Y = o(z, 2);
      Y.__click = () => _(se, !1), s(L), s(O), g(
        (xe, ae) => {
          z.disabled = xe, Re(z, 1, `px-3 py-1.5 rounded text-xs transition-colors
						${ae ?? ""}`);
        },
        [
          () => !r(R).trim(),
          () => r(R).trim() ? "bg-hecate-600/20 text-hecate-300 hover:bg-hecate-600/30" : "bg-surface-700 text-surface-500 cursor-not-allowed"
        ]
      ), xt(Oe, () => r(R), (xe) => _(R, xe)), Ga(Qe, () => r(ue), (xe) => _(ue, xe)), xt(We, () => r(U), (xe) => _(U, xe)), d(B, O);
    };
    A(P, (B) => {
      r(se) && B(te);
    });
  }
  var Le = o(P, 2);
  {
    var S = (B) => {
      var O = jf();
      d(B, O);
    }, k = (B) => {
      var O = Bf(), J = i(O);
      J.textContent = "☐", Dt(4), s(O), d(B, O);
    }, q = (B) => {
      var O = Xf(), J = it(O), Te = i(J), Oe = i(Te), Ke = o(i(Oe), 4), Qe = i(Ke, !0);
      s(Ke), s(Oe);
      var tt = o(Oe, 2);
      He(tt, 5, v, (b) => b.card_id, (b, y) => {
        var de = Gf(), T = i(de), re = i(T), he = i(re, !0);
        s(re);
        var Ae = o(re, 2), ne = i(Ae, !0);
        s(Ae), s(T);
        var X = o(T, 2);
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
        Q.__click = () => Me(r(y), "park"), Q.textContent = "⏸";
        var ye = o(Q, 2);
        ye.__click = () => Me(r(y), "block"), ye.textContent = "⛔", s(le), s(_e), s(de), g(
          (De, Ge, Ue) => {
            x(he, r(y).title), Re(Ae, 1, `text-[9px] px-1.5 py-0.5 rounded ${De ?? ""} shrink-0`), x(ne, Ge), x(me, Ue);
          },
          [
            () => W(r(y).card_type),
            () => H(r(y).card_type),
            () => N(r(y).posted_at)
          ]
        ), d(b, de);
      }), s(tt), s(Te);
      var Ye = o(Te, 2), at = i(Ye), ze = o(i(at), 4), We = i(ze, !0);
      s(ze), s(at);
      var L = o(at, 2);
      He(L, 5, p, (b) => b.card_id, (b, y) => {
        var de = zf(), T = i(de), re = i(T), he = i(re, !0);
        s(re);
        var Ae = o(re, 2), ne = i(Ae, !0);
        s(Ae), s(T);
        var X = o(T, 2);
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
        le.__click = () => Me(r(y), "unpick");
        var ee = o(le, 2);
        ee.__click = () => Me(r(y), "park"), ee.textContent = "⏸";
        var Q = o(ee, 2);
        Q.__click = () => Me(r(y), "block"), Q.textContent = "⛔";
        var ye = o(Q, 2);
        ye.__click = () => Pe(r(y)), s(me), s(de), g(
          (De, Ge) => {
            x(he, r(y).title), Re(Ae, 1, `text-[9px] px-1.5 py-0.5 rounded ${De ?? ""} shrink-0`), x(ne, Ge);
          },
          [
            () => W(r(y).card_type),
            () => H(r(y).card_type)
          ]
        ), d(b, de);
      }), s(L), s(Ye);
      var z = o(Ye, 2), Y = i(z), xe = o(i(Y), 4), ae = i(xe, !0);
      s(xe), s(Y);
      var pe = o(Y, 2);
      He(pe, 5, h, (b) => b.card_id, (b, y) => {
        var de = Uf(), T = i(de), re = i(T);
        re.textContent = "✓";
        var he = o(re, 2), Ae = i(he, !0);
        s(he);
        var ne = o(he, 2), X = i(ne, !0);
        s(ne), s(T);
        var Z = o(T, 2), _e = i(Z, !0);
        s(Z), s(de), g(
          (ke, me, le) => {
            x(Ae, r(y).title), Re(ne, 1, `text-[9px] px-1.5 py-0.5 rounded ${ke ?? ""} shrink-0`), x(X, me), x(_e, le);
          },
          [
            () => W(r(y).card_type),
            () => H(r(y).card_type),
            () => N(r(y).finished_at)
          ]
        ), d(b, de);
      }), s(pe), s(z), s(J);
      var Ie = o(J, 2);
      {
        var Je = (b) => {
          var y = Qf(), de = i(y), T = i(de), re = i(T);
          re.textContent = "⏸";
          var he = o(re, 4), Ae = i(he, !0);
          s(he), s(T);
          var ne = o(T, 2);
          He(ne, 5, m, (ee) => ee.card_id, (ee, Q) => {
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
                () => H(r(Q).card_type),
                () => N(r(Q).parked_at)
              ]
            ), d(ee, ye);
          }), s(ne), s(de);
          var X = o(de, 2), Z = i(X), _e = i(Z);
          _e.textContent = "⛔";
          var ke = o(_e, 4), me = i(ke, !0);
          s(ke), s(Z);
          var le = o(Z, 2);
          He(le, 5, C, (ee) => ee.card_id, (ee, Q) => {
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
            zt.__click = () => I(r(Q)), s(yt), s(ye), g(
              (ht, Lt, Cr) => {
                x(Ue, r(Q).title), Re(Xe, 1, `text-[9px] px-1.5 py-0.5 rounded ${ht ?? ""} shrink-0`), x(rt, Lt), x(Ht, `${r(Q).blocked_by ? `by ${r(Q).blocked_by}` : ""}
										${Cr ?? ""}`);
              },
              [
                () => W(r(Q).card_type),
                () => H(r(Q).card_type),
                () => N(r(Q).blocked_at)
              ]
            ), d(ee, ye);
          }), s(le), s(X), s(y), g(() => {
            x(Ae, m().length), x(me, C().length);
          }), d(b, y);
        };
        A(Ie, (b) => {
          (m().length > 0 || C().length > 0) && b(Je);
        });
      }
      g(() => {
        x(Qe, v().length), x(We, p().length), x(ae, h().length);
      }), d(B, O);
    };
    A(Le, (B) => {
      f() ? B(S) : n().length === 0 && !r(se) ? B(k, 1) : B(q, !1);
    });
  }
  var oe = o(Le, 2);
  {
    var Be = (B) => {
      const O = /* @__PURE__ */ we(() => M[r(ge)]);
      var J = Zf(), Te = i(J), Oe = i(Te), Ke = i(Oe, !0);
      s(Oe);
      var Qe = o(Oe, 2), tt = i(Qe), Ye = o(tt), at = i(Ye, !0);
      s(Ye), s(Qe);
      var ze = o(Qe, 2), We = o(i(ze), 2);
      Ca(We), s(ze);
      var L = o(ze, 2), z = i(L);
      z.__click = () => _(Ce, null);
      var Y = o(z, 2);
      Y.__click = ce;
      var xe = i(Y, !0);
      s(Y), s(L), s(Te), s(J), g(
        (ae, pe) => {
          x(Ke, r(O).title), x(tt, `${r(O).verb ?? ""}ing `), x(at, r(Ce).title), It(We, "placeholder", `Why is this card being ${r(ge) === "unpick" ? "unpicked" : r(ge) === "park" ? "parked" : "blocked"}?`), Re(We, 1, `w-full bg-surface-700 border border-surface-600 rounded px-2.5 py-1.5
							text-xs text-surface-100 placeholder-surface-400
							focus:outline-none focus:border-${r(O).color ?? ""}/50 resize-none`), Y.disabled = ae, Re(Y, 1, `px-3 py-1.5 rounded text-xs transition-colors
							${pe ?? ""}`), x(xe, r(O).verb);
        },
        [
          () => !r(fe).trim(),
          () => r(fe).trim() ? `bg-${r(O).color}/20 text-${r(O).color} hover:bg-${r(O).color}/30` : "bg-surface-700 text-surface-500 cursor-not-allowed"
        ]
      ), xt(We, () => r(fe), (ae) => _(fe, ae)), d(B, J);
    };
    A(oe, (B) => {
      r(Ce) && B(Be);
    });
  }
  s(j), g(() => x(Se, a()?.context_name)), d(e, j), mt(), V();
}
At(["click"]);
kt(To, {}, [], [], { mode: "open" });
const Ro = et(null);
async function tp(e, t) {
  try {
    return await Ze().post(`/craftings/${e}/generate-module`, t), !0;
  } catch (a) {
    const n = a;
    return Ro.set(n.message || "Failed to generate module"), !1;
  }
}
async function rp(e, t) {
  try {
    return await Ze().post(`/craftings/${e}/deliver-release`, { version: t }), !0;
  } catch (a) {
    const n = a;
    return Ro.set(n.message || "Failed to deliver release"), !1;
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
function Mo(e, t) {
  bt(t, !0);
  const a = () => Ee(Yr, "$selectedDivision", c), n = () => Ee(Et, "$isLoading", c), [c, l] = Nt();
  let f = /* @__PURE__ */ ve("implement"), v = /* @__PURE__ */ ve(!1), p = /* @__PURE__ */ ve(""), h = /* @__PURE__ */ ve(""), m = /* @__PURE__ */ ve(!1), C = /* @__PURE__ */ ve("");
  async function w() {
    if (!a() || !r(p).trim()) return;
    await tp(a().division_id, {
      module_name: r(p).trim(),
      template: r(h).trim() || void 0
    }) && (_(p, ""), _(h, ""), _(v, !1));
  }
  async function V() {
    if (!a() || !r(C).trim()) return;
    await rp(a().division_id, r(C).trim()) && (_(C, ""), _(m, !1));
  }
  var D = op(), se = i(D), R = i(se), U = o(i(R), 2), ue = o(i(U)), Ce = i(ue, !0);
  s(ue), s(U), s(R);
  var ge = o(R, 2), fe = i(ge);
  fe.__click = () => _(f, "implement");
  var ie = o(fe, 2);
  ie.__click = () => _(f, "deliver"), s(ge), s(se);
  var Fe = o(se, 2);
  {
    var Pe = (ce) => {
      var G = sp(), I = it(G), H = i(I), W = o(i(H), 2);
      W.__click = () => _(v, !r(v)), s(H);
      var N = o(H, 2);
      {
        var M = (K) => {
          var $ = ap(), E = i($), F = o(i(E), 2);
          wt(F), s(E);
          var P = o(E, 2), te = o(i(P), 2);
          wt(te), s(P);
          var Le = o(P, 2);
          Le.__click = w;
          var S = o(Le, 2);
          S.__click = () => _(v, !1), s($), g((k) => Le.disabled = k, [() => !r(p).trim() || n()]), xt(F, () => r(p), (k) => _(p, k)), xt(te, () => r(h), (k) => _(h, k)), d(K, $);
        };
        A(N, (K) => {
          r(v) && K(M);
        });
      }
      Dt(2), s(I);
      var j = o(I, 2), $e = o(i(j), 2), je = i($e);
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
      s($e), s(j), d(ce, G);
    }, Me = (ce) => {
      var G = ip(), I = it(G), H = i(I), W = o(i(H), 2);
      W.__click = () => _(m, !r(m)), s(H);
      var N = o(H, 2);
      {
        var M = (Ne) => {
          var be = np(), K = i(be), $ = o(i(K), 2);
          wt($), s(K);
          var E = o(K, 2);
          E.__click = V;
          var F = o(E, 2);
          F.__click = () => _(m, !1), s(be), g((P) => E.disabled = P, [() => !r(C).trim() || n()]), xt($, () => r(C), (P) => _(C, P)), d(Ne, be);
        };
        A(N, (Ne) => {
          r(m) && Ne(M);
        });
      }
      Dt(2), s(I);
      var j = o(I, 2), $e = o(i(j), 2), je = i($e);
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
      s($e), s(j), d(ce, G);
    };
    A(Fe, (ce) => {
      r(f) === "implement" ? ce(Pe) : ce(Me, !1);
    });
  }
  s(D), g(() => {
    x(Ce, a()?.context_name), Re(fe, 1, `px-3 py-1 rounded text-[11px] transition-colors
					${r(f) === "implement" ? "bg-surface-600 text-surface-100" : "text-surface-400 hover:text-surface-200"}`), Re(ie, 1, `px-3 py-1 rounded text-[11px] transition-colors
					${r(f) === "deliver" ? "bg-surface-600 text-surface-100" : "text-surface-400 hover:text-surface-200"}`);
  }), d(e, D), mt(), l();
}
At(["click"]);
kt(Mo, {}, [], [], { mode: "open" });
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
  bt(t, !0), Xi(e, pp);
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
  var m = i(h), C = i(m), w = o(C, 2), V = i(w, !0);
  s(w);
  var D = o(w, 2), se = i(D, !0);
  s(D), s(m);
  var R = o(m, 2);
  {
    var U = (fe) => {
      const ie = /* @__PURE__ */ we(() => a().active_session);
      var Fe = dp(), Pe = i(Fe);
      {
        var Me = (I) => {
          var H = cp(), W = i(H);
          s(H), g((N, M) => x(W, `${N ?? ""} in / ${M ?? ""} out`), [
            () => r(ie).tokens_in.toLocaleString(),
            () => r(ie).tokens_out.toLocaleString()
          ]), d(I, H);
        };
        A(Pe, (I) => {
          (r(ie).tokens_in > 0 || r(ie).tokens_out > 0) && I(Me);
        });
      }
      var ce = o(Pe, 2);
      {
        var G = (I) => {
          var H = lp(), W = i(H);
          s(H), g(() => x(W, `${a().session_count ?? ""} sessions`)), d(I, H);
        };
        A(ce, (I) => {
          a().session_count > 1 && I(G);
        });
      }
      s(Fe), d(fe, Fe);
    }, ue = (fe) => {
      var ie = up();
      d(fe, ie);
    };
    A(R, (fe) => {
      a().active_session ? fe(U) : fe(ue, !1);
    });
  }
  var Ce = o(R, 2);
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
    ), Re(C, 1, `w-2 h-2 rounded-full ${r(v).dot ?? ""} shrink-0`, "svelte-1ug3tqa"), x(V, r(l).label), x(se, r(v).label);
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
  }, m = yp(), C = i(m), w = o(i(C), 2), V = i(w);
  s(w);
  var D = o(w, 2);
  {
    var se = (G) => {
      var I = xp(), H = i(I, !0);
      s(I), g(() => x(H, a().division_id)), d(G, I);
    };
    A(D, (G) => {
      a().division_id && G(se);
    });
  }
  s(C);
  var R = o(C, 2);
  {
    var U = (G) => {
      var I = _p(), H = i(I), W = i(H, !0);
      s(H), s(I), g(() => x(W, a().gate_output)), d(G, I);
    }, ue = (G) => {
      var I = hp(), H = i(I), W = i(H, !0);
      s(H), s(I), g(() => x(W, a().output)), d(G, I);
    };
    A(R, (G) => {
      a().gate_output ? G(U) : a().output && G(ue, 1);
    });
  }
  var Ce = o(R, 2), ge = i(Ce), fe = i(ge);
  s(ge);
  var ie = o(ge, 2);
  {
    var Fe = (G) => {
      var I = gp(), H = i(I);
      s(I), g((W) => x(H, `Started: ${W ?? ""}`), [() => new Date(a().started_at).toLocaleTimeString()]), d(G, I);
    };
    A(ie, (G) => {
      a().started_at && G(Fe);
    });
  }
  s(Ce);
  var Pe = o(Ce, 2);
  {
    var Me = (G) => {
      var I = bp(), H = i(I);
      Ca(H);
      var W = o(H, 2), N = i(W);
      N.__click = p;
      var M = o(N, 2);
      M.__click = () => _(f, !1), s(W), s(I), g(
        (j, $e) => {
          N.disabled = j, Re(N, 1, `px-3 py-1.5 rounded text-xs transition-colors
						${$e ?? ""}`);
        },
        [
          () => !r(l).trim(),
          () => r(l).trim() ? "bg-health-err/20 text-health-err hover:bg-health-err/30" : "bg-surface-700 text-surface-500 cursor-not-allowed"
        ]
      ), xt(H, () => r(l), (j) => _(l, j)), d(G, I);
    }, ce = (G) => {
      var I = mp(), H = i(I);
      H.__click = function(...N) {
        n()?.apply(this, N);
      }, H.textContent = "✓ Pass Gate";
      var W = o(H, 2);
      W.__click = () => _(f, !0), W.textContent = "✕ Reject Gate", s(I), d(G, I);
    };
    A(Pe, (G) => {
      r(f) ? G(Me) : G(ce, !1);
    });
  }
  return s(m), g(
    (G, I) => {
      x(V, `Gate Review: ${r(v).label ?? ""}`), x(fe, `Tokens: ${G ?? ""} in / ${I ?? ""} out`);
    },
    [
      () => a().tokens_in.toLocaleString(),
      () => a().tokens_out.toLocaleString()
    ]
  ), d(e, m), mt(h);
}
At(["click"]);
kt(Io, { session: {}, onPass: {}, onReject: {} }, [], [], { mode: "open" });
var wp = /* @__PURE__ */ u(`<button class="text-[10px] px-2 py-0.5 rounded text-surface-400
					hover:text-surface-200 hover:bg-surface-700 transition-colors">Archive</button>`), $p = /* @__PURE__ */ u('<div class="px-4 py-3 border-b border-surface-600 shrink-0"><h4 class="text-[10px] font-semibold text-surface-300 uppercase tracking-wider mb-2">Output</h4> <div class="rounded bg-surface-800 border border-surface-600 p-3 max-h-48 overflow-y-auto"><pre class="text-[10px] text-surface-200 whitespace-pre-wrap font-mono leading-relaxed"> </pre></div></div>'), kp = /* @__PURE__ */ u('<div class="px-4 py-3 border-b border-surface-600 shrink-0"><div class="text-[10px] text-health-err bg-health-err/10 rounded px-3 py-2"> </div></div>'), Cp = /* @__PURE__ */ u('<div><div class="flex items-center gap-2 mb-1"><span> </span> <span class="text-[8px] text-surface-500"> </span></div> <pre class="text-[10px] text-surface-200 whitespace-pre-wrap font-mono leading-relaxed"> </pre></div>'), Sp = /* @__PURE__ */ u('<div class="flex-1 overflow-y-auto px-4 py-3"><h4 class="text-[10px] font-semibold text-surface-300 uppercase tracking-wider mb-2"> </h4> <div class="space-y-2"></div></div>'), Ep = /* @__PURE__ */ u('<div class="flex-1 flex items-center justify-center text-surface-500 text-xs">No conversation turns recorded</div>'), Ap = /* @__PURE__ */ u('<div class="flex flex-col h-full"><div class="px-4 py-3 border-b border-surface-600 flex items-center gap-3 shrink-0"><button class="text-surface-400 hover:text-surface-100 transition-colors text-sm"></button> <span class="text-sm"> </span> <h3 class="text-sm font-semibold text-surface-100"> </h3> <span> </span> <div class="flex-1"></div> <!></div> <div class="px-4 py-3 border-b border-surface-600 shrink-0"><div class="grid grid-cols-4 gap-3 text-[10px]"><div><span class="text-surface-500 block">Started</span> <span class="text-surface-200"> </span></div> <div><span class="text-surface-500 block">Completed</span> <span class="text-surface-200"> </span></div> <div><span class="text-surface-500 block">Tokens In</span> <span class="text-surface-200"> </span></div> <div><span class="text-surface-500 block">Tokens Out</span> <span class="text-surface-200"> </span></div></div></div> <!> <!> <!></div>');
function No(e, t) {
  bt(t, !0);
  let a = pt(t, "session", 7), n = pt(t, "turns", 7), c = pt(t, "onClose", 7), l = pt(t, "onArchive", 7);
  const f = /* @__PURE__ */ we(() => er[a().role]);
  function v($) {
    return $ ? new Date($).toLocaleString(void 0, {
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
    set session($) {
      a($), ut();
    },
    get turns() {
      return n();
    },
    set turns($) {
      n($), ut();
    },
    get onClose() {
      return c();
    },
    set onClose($) {
      c($), ut();
    },
    get onArchive() {
      return l();
    },
    set onArchive($) {
      l($), ut();
    }
  }, m = Ap(), C = i(m), w = i(C);
  w.__click = function(...$) {
    c()?.apply(this, $);
  }, w.textContent = "←";
  var V = o(w, 2), D = i(V, !0);
  s(V);
  var se = o(V, 2), R = i(se);
  s(se);
  var U = o(se, 2), ue = i(U, !0);
  s(U);
  var Ce = o(U, 4);
  {
    var ge = ($) => {
      var E = wp();
      E.__click = function(...F) {
        l()?.apply(this, F);
      }, d($, E);
    };
    A(Ce, ($) => {
      a().status !== "archived" && a().status !== "running" && $(ge);
    });
  }
  s(C);
  var fe = o(C, 2), ie = i(fe), Fe = i(ie), Pe = o(i(Fe), 2), Me = i(Pe, !0);
  s(Pe), s(Fe);
  var ce = o(Fe, 2), G = o(i(ce), 2), I = i(G, !0);
  s(G), s(ce);
  var H = o(ce, 2), W = o(i(H), 2), N = i(W, !0);
  s(W), s(H);
  var M = o(H, 2), j = o(i(M), 2), $e = i(j, !0);
  s(j), s(M), s(ie), s(fe);
  var je = o(fe, 2);
  {
    var qe = ($) => {
      var E = $p(), F = o(i(E), 2), P = i(F), te = i(P, !0);
      s(P), s(F), s(E), g(() => x(te, a().output)), d($, E);
    };
    A(je, ($) => {
      a().output && $(qe);
    });
  }
  var Ve = o(je, 2);
  {
    var Se = ($) => {
      var E = kp(), F = i(E), P = i(F, !0);
      s(F), s(E), g(() => x(P, a().error)), d($, E);
    };
    A(Ve, ($) => {
      a().error && $(Se);
    });
  }
  var Ne = o(Ve, 2);
  {
    var be = ($) => {
      var E = Sp(), F = i(E), P = i(F);
      s(F);
      var te = o(F, 2);
      He(te, 21, n, (Le) => Le.turn_id, (Le, S) => {
        var k = Cp(), q = i(k), oe = i(q), Be = i(oe, !0);
        s(oe);
        var B = o(oe, 2), O = i(B, !0);
        s(B), s(q);
        var J = o(q, 2), Te = i(J, !0);
        s(J), s(k), g(
          (Oe) => {
            Re(k, 1, `rounded p-2.5
						${r(S).role === "assistant" ? "bg-hecate-600/10 border border-hecate-600/20" : r(S).role === "user" ? "bg-surface-700/50 border border-surface-600" : "bg-surface-800 border border-surface-600/50"}`), Re(oe, 1, `text-[9px] font-semibold uppercase tracking-wider
								${r(S).role === "assistant" ? "text-hecate-300" : "text-surface-400"}`), x(Be, r(S).role), x(O, Oe), x(Te, r(S).content);
          },
          [() => new Date(r(S).timestamp).toLocaleTimeString()]
        ), d(Le, k);
      }), s(te), s(E), g(() => x(P, `Conversation (${n().length ?? ""} turns)`)), d($, E);
    }, K = ($) => {
      var E = Ep();
      d($, E);
    };
    A(Ne, ($) => {
      n().length > 0 ? $(be) : $(K, !1);
    });
  }
  return s(m), g(
    ($, E, F, P) => {
      x(D, r(f).icon), x(R, `${r(f).label ?? ""} Session`), Re(U, 1, `text-[10px] ${p[a().status] ?? "text-surface-400" ?? ""}`), x(ue, a().status), x(Me, $), x(I, E), x(N, F), x($e, P);
    },
    [
      () => v(a().started_at),
      () => v(a().completed_at),
      () => a().tokens_in.toLocaleString(),
      () => a().tokens_out.toLocaleString()
    ]
  ), d(e, m), mt(h);
}
At(["click"]);
kt(No, { session: {}, turns: {}, onClose: {}, onArchive: {} }, [], [], { mode: "open" });
var Dp = /* @__PURE__ */ u('<span class="text-[10px] text-surface-400 animate-pulse">Refreshing...</span>'), Pp = /* @__PURE__ */ u('<div class="text-[11px] text-health-err bg-health-err/10 rounded px-3 py-2"> </div>'), Tp = /* @__PURE__ */ u('<div class="space-y-3"></div>'), Rp = /* @__PURE__ */ u('<div class="p-4 space-y-4 overflow-y-auto h-full"><div class="flex items-center justify-between"><div><h3 class="text-sm font-semibold text-surface-100">Agent Pipeline</h3> <p class="text-[11px] text-surface-400 mt-0.5">12 roles across the venture lifecycle</p></div> <!></div> <!> <!> <div><h4 class="text-[10px] font-semibold text-surface-400 uppercase tracking-wider mb-2">Tier 1 — Creative</h4> <div class="grid grid-cols-4 gap-2"></div></div> <div class="flex items-center gap-2 px-2"><div class="flex-1 h-px bg-surface-600"></div> <span class="text-[9px] text-surface-500">gate</span> <span class="text-surface-500"></span> <div class="flex-1 h-px bg-surface-600"></div></div> <div><h4 class="text-[10px] font-semibold text-surface-400 uppercase tracking-wider mb-2">Tier 2 — Mechanical</h4> <div class="grid grid-cols-4 gap-2"></div></div> <div><h4 class="text-[10px] font-semibold text-surface-400 uppercase tracking-wider mb-2">Always-On</h4> <div class="grid grid-cols-4 gap-2"></div></div></div>');
function Lo(e, t) {
  bt(t, !0);
  const a = () => Ee(St, "$activeVenture", w), n = () => Ee(ca, "$agentRoleStatuses", w), c = () => Ee(es, "$selectedSession", w), l = () => Ee(Xs, "$sessionTurns", w), f = () => Ee(Qs, "$agentLoading", w), v = () => Ee(tr, "$agentError", w), p = () => Ee(Aa, "$pendingGates", w), h = () => Ee(Yl, "$creativeRoles", w), m = () => Ee(Kl, "$mechanicalRoles", w), C = () => Ee(Jl, "$alwaysOnRoles", w), [w, V] = Nt();
  let D = /* @__PURE__ */ ve(null);
  Rt(() => {
    const G = a();
    G && G.venture_id !== r(D) && (_(D, G.venture_id, !0), $a(G.venture_id));
  });
  let se;
  Rt(() => {
    const G = a();
    if (G)
      return se = setInterval(() => $a(G.venture_id), 1e4), () => {
        se && clearInterval(se);
      };
  });
  let R = /* @__PURE__ */ ve(!1);
  function U() {
    return a()?.venture_id ?? "";
  }
  async function ue(G) {
    const I = n().find((H) => H.role === G);
    I?.active_session && (await Xl(U(), I.active_session.session_id), (G === "coordinator" || G === "mentor") && await Zl(U(), I.active_session.session_id), _(R, !0));
  }
  async function Ce(G) {
    await ed(U(), G);
  }
  async function ge(G, I) {
    await go(U(), I, G);
  }
  async function fe(G, I, H) {
    await bo(U(), I, G, H);
  }
  async function ie() {
    const G = c();
    G && (await td(U(), G.session_id), _(R, !1), es.set(null));
  }
  var Fe = or(), Pe = it(Fe);
  {
    var Me = (G) => {
      No(G, {
        get session() {
          return c();
        },
        get turns() {
          return l();
        },
        onClose: () => {
          _(R, !1), es.set(null);
        },
        onArchive: ie
      });
    }, ce = (G) => {
      var I = Rp(), H = i(I), W = o(i(H), 2);
      {
        var N = (F) => {
          var P = Dp();
          d(F, P);
        };
        A(W, (F) => {
          f() && F(N);
        });
      }
      s(H);
      var M = o(H, 2);
      {
        var j = (F) => {
          var P = Pp(), te = i(P, !0);
          s(P), g(() => x(te, v())), d(F, P);
        };
        A(M, (F) => {
          v() && F(j);
        });
      }
      var $e = o(M, 2);
      {
        var je = (F) => {
          var P = Tp();
          He(P, 5, p, (te) => te.session_id, (te, Le) => {
            Io(te, {
              get session() {
                return r(Le);
              },
              onPass: () => ge(r(Le).session_id, r(Le).role),
              onReject: (S) => fe(r(Le).session_id, r(Le).role, S)
            });
          }), s(P), d(F, P);
        };
        A($e, (F) => {
          p().length > 0 && F(je);
        });
      }
      var qe = o($e, 2), Ve = o(i(qe), 2);
      He(Ve, 5, h, (F) => F.role, (F, P) => {
        as(F, {
          get roleStatus() {
            return r(P);
          },
          onSelect: ue,
          onInitiate: Ce
        });
      }), s(Ve), s(qe);
      var Se = o(qe, 2), Ne = o(i(Se), 4);
      Ne.textContent = "↓", Dt(2), s(Se);
      var be = o(Se, 2), K = o(i(be), 2);
      He(K, 5, m, (F) => F.role, (F, P) => {
        as(F, {
          get roleStatus() {
            return r(P);
          },
          onSelect: ue,
          onInitiate: Ce
        });
      }), s(K), s(be);
      var $ = o(be, 2), E = o(i($), 2);
      He(E, 5, C, (F) => F.role, (F, P) => {
        as(F, {
          get roleStatus() {
            return r(P);
          },
          onSelect: ue,
          onInitiate: Ce
        });
      }), s(E), s($), s(I), d(G, I);
    };
    A(Pe, (G) => {
      r(R) && c() ? G(Me) : G(ce, !1);
    });
  }
  d(e, Fe), mt(), V();
}
kt(Lo, {}, [], [], { mode: "open" });
var Mp = /* @__PURE__ */ u("<div></div>"), Ip = /* @__PURE__ */ u("<!> <button><span> </span> <span> </span></button>", 1), Np = /* @__PURE__ */ u('<span class="text-[10px] text-surface-500 mr-1">Pending</span>'), Lp = /* @__PURE__ */ u("<button> </button>"), Op = /* @__PURE__ */ u(`<div class="border-b border-surface-600 bg-surface-800/30 px-4 py-2 shrink-0"><div class="flex items-center gap-1"><!> <div class="flex-1"></div> <span class="text-[10px] text-surface-400 mr-2"> </span> <!> <button class="text-[10px] px-2 py-0.5 rounded text-hecate-400
					hover:bg-hecate-600/20 transition-colors ml-1" title="Open AI Assistant"></button></div></div>`);
function Oo(e, t) {
  bt(t, !0);
  const a = () => Ee(Yr, "$selectedDivision", l), n = () => Ee(qa, "$selectedPhase", l), c = () => Ee(Nr, "$isLoading", l), [l, f] = Nt();
  let v = /* @__PURE__ */ we(() => a() ? Us(a(), n()) : []);
  function p(U) {
    qa.set(U);
  }
  function h(U, ue) {
    switch (U) {
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
  function m(U, ue) {
    return U ? ue.length === 0 ? { icon: "✓", css: "text-health-ok" } : ue.includes("resume") ? { icon: "◐", css: "text-health-warn" } : ue.includes("shelve") || ue.includes("conclude") || ue.includes("archive") ? { icon: "●", css: "text-hecate-400 animate-pulse" } : ue.includes("open") ? { icon: "○", css: "text-surface-300" } : { icon: "○", css: "text-surface-500" } : { icon: "○", css: "text-surface-500" };
  }
  function C(U) {
    switch (U) {
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
  function w(U) {
    return U.charAt(0).toUpperCase() + U.slice(1);
  }
  async function V(U) {
    if (!a()) return;
    const ue = a().division_id, Ce = n();
    switch (U) {
      case "open":
        await Sl(ue, Ce);
        break;
      case "shelve":
        await El(ue, Ce);
        break;
      case "resume":
        await Al(ue, Ce);
        break;
      case "conclude":
        await Dl(ue, Ce);
        break;
    }
  }
  var D = or(), se = it(D);
  {
    var R = (U) => {
      var ue = Op(), Ce = i(ue), ge = i(Ce);
      He(ge, 17, () => Mr, ct, (G, I, H) => {
        const W = /* @__PURE__ */ we(() => pa(a(), r(I).code)), N = /* @__PURE__ */ we(() => Us(a(), r(I).code)), M = /* @__PURE__ */ we(() => n() === r(I).code), j = /* @__PURE__ */ we(() => {
          const { icon: E, css: F } = m(r(W), r(N));
          return { icon: E, css: F };
        }), $e = /* @__PURE__ */ we(() => r(W) && r(N).length === 0);
        var je = Ip(), qe = it(je);
        {
          var Ve = (E) => {
            var F = Mp();
            g(() => Re(F, 1, `w-4 h-px ${r($e) ? "bg-health-ok/40" : "bg-surface-600"}`)), d(E, F);
          };
          A(qe, (E) => {
            H > 0 && E(Ve);
          });
        }
        var Se = o(qe, 2);
        Se.__click = () => p(r(I).code);
        var Ne = i(Se), be = i(Ne, !0);
        s(Ne);
        var K = o(Ne, 2), $ = i(K, !0);
        s(K), s(Se), g(
          (E) => {
            Re(Se, 1, `flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-all
						border
						${E ?? ""}`), Re(Ne, 1, `${r(j).css ?? ""} text-[10px]`), x(be, r(j).icon), x($, r(I).shortName);
          },
          [
            () => r(M) ? `bg-surface-700 border-current ${h(r(I).code)}` : "border-transparent text-surface-400 hover:text-surface-200 hover:bg-surface-700/50"
          ]
        ), d(G, je);
      });
      var fe = o(ge, 4), ie = i(fe, !0);
      s(fe);
      var Fe = o(fe, 2);
      {
        var Pe = (G) => {
          const I = /* @__PURE__ */ we(() => pa(a(), n()));
          var H = or(), W = it(H);
          {
            var N = (M) => {
              var j = Np();
              d(M, j);
            };
            A(W, (M) => {
              r(I) || M(N);
            });
          }
          d(G, H);
        }, Me = (G) => {
          var I = or(), H = it(I);
          He(H, 17, () => r(v), ct, (W, N) => {
            var M = Lp();
            M.__click = () => V(r(N));
            var j = i(M, !0);
            s(M), g(
              ($e, je) => {
                M.disabled = c(), Re(M, 1, `text-[10px] px-2 py-0.5 rounded transition-colors disabled:opacity-50
							${$e ?? ""}`), x(j, je);
              },
              [
                () => C(r(N)),
                () => w(r(N))
              ]
            ), d(W, M);
          }), d(G, I);
        };
        A(Fe, (G) => {
          r(v).length === 0 ? G(Pe) : G(Me, !1);
        });
      }
      var ce = o(Fe, 2);
      ce.__click = () => Er(`Help with ${Mr.find((G) => G.code === n())?.name} phase for division "${a()?.context_name}"`), ce.textContent = "✦ AI Assist", s(Ce), s(ue), g((G) => x(ie, G), [() => Mr.find((G) => G.code === n())?.name]), d(U, ue);
    };
    A(se, (U) => {
      a() && U(R);
    });
  }
  d(e, D), mt(), f();
}
At(["click"]);
kt(Oo, {}, [], [], { mode: "open" });
var Fp = /* @__PURE__ */ u('<span class="text-[9px] text-surface-500"> </span>'), jp = /* @__PURE__ */ u('<div class="flex items-center justify-center h-full"><div class="text-center text-surface-400"><div class="text-sm mb-2 animate-pulse">...</div> <div class="text-[10px]">Loading events</div></div></div>'), Bp = /* @__PURE__ */ u('<div class="flex items-center justify-center h-full"><div class="text-center text-surface-500 text-xs">Select a venture to view its event stream.</div></div>'), Vp = /* @__PURE__ */ u('<div class="flex items-center justify-center h-full"><div class="text-center text-surface-500"><div class="text-lg mb-2"></div> <div class="text-xs">No events recorded yet.</div> <div class="text-[10px] mt-1">Events will appear here as the venture progresses.</div></div></div>'), Gp = /* @__PURE__ */ u('<span class="text-[9px] px-1 py-0.5 rounded bg-surface-700 text-surface-400 shrink-0"> </span>'), qp = /* @__PURE__ */ u('<span class="text-[9px] text-surface-500 shrink-0 tabular-nums"> </span>'), Hp = /* @__PURE__ */ u(`<div class="px-4 pb-3 pt-0 ml-5"><pre class="text-[10px] text-surface-300 bg-surface-800 border border-surface-600
									rounded p-3 overflow-x-auto whitespace-pre-wrap break-words
									font-mono leading-relaxed"> </pre></div>`), zp = /* @__PURE__ */ u(`<div class="group"><button class="w-full text-left px-4 py-2 flex items-start gap-2
								hover:bg-surface-700/30 transition-colors"><span class="text-[9px] text-surface-500 mt-0.5 shrink-0 w-3"> </span> <span> </span> <!> <!></button> <!></div>`), Up = /* @__PURE__ */ u('<div class="p-3 border-t border-surface-700/50"><button> </button></div>'), Wp = /* @__PURE__ */ u('<div class="divide-y divide-surface-700/50"></div> <!>', 1), Yp = /* @__PURE__ */ u('<div class="flex flex-col h-full"><div class="border-b border-surface-600 bg-surface-800/50 px-4 py-2 shrink-0"><div class="flex items-center gap-2"><span class="text-xs text-surface-400">Event Stream</span> <!> <div class="flex-1"></div> <button title="Refresh events"> </button></div></div> <div class="flex-1 overflow-y-auto"><!></div></div>');
function rn(e, t) {
  bt(t, !0);
  const a = () => Ee(Dn, "$ventureRawEvents", c), n = () => Ee(St, "$activeVenture", c), [c, l] = Nt(), f = 50;
  let v = /* @__PURE__ */ ve(!1), p = /* @__PURE__ */ ve(0), h = /* @__PURE__ */ ve(0), m = /* @__PURE__ */ ve(Vt(/* @__PURE__ */ new Set())), C = /* @__PURE__ */ we(() => r(h) + f < r(p)), w = /* @__PURE__ */ we(a);
  async function V(M, j = !0) {
    _(v, !0), j && (_(h, 0), _(m, /* @__PURE__ */ new Set(), !0));
    try {
      const $e = await Kn(M, r(h), f);
      _(p, $e.count, !0);
    } finally {
      _(v, !1);
    }
  }
  async function D() {
    const M = n();
    if (!(!M || r(v))) {
      _(h, r(h) + f), _(v, !0);
      try {
        const j = await Kn(M.venture_id, r(h), f);
        _(p, j.count, !0);
      } finally {
        _(v, !1);
      }
    }
  }
  function se(M) {
    const j = new Set(r(m));
    j.has(M) ? j.delete(M) : j.add(M), _(m, j, !0);
  }
  function R(M) {
    return M.startsWith("venture_") || M.startsWith("big_picture_storm_") ? "text-hecate-400" : M.startsWith("event_sticky_") ? "text-es-event" : M.startsWith("event_stack_") || M.startsWith("event_cluster_") ? "text-success-400" : M.startsWith("fact_arrow_") ? "text-sky-400" : M.startsWith("storm_phase_") ? "text-accent-400" : "text-surface-400";
  }
  function U(M) {
    if (!M) return "";
    const j = typeof M == "string" ? Number(M) || new Date(M).getTime() : M;
    if (isNaN(j)) return "";
    const $e = new Date(j), qe = Date.now() - j, Ve = Math.floor(qe / 1e3);
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
  function ue(M) {
    try {
      return JSON.stringify(M, null, 2);
    } catch {
      return String(M);
    }
  }
  Rt(() => {
    const M = n();
    M && V(M.venture_id);
  });
  var Ce = Yp(), ge = i(Ce), fe = i(ge), ie = o(i(fe), 2);
  {
    var Fe = (M) => {
      var j = Fp(), $e = i(j);
      s(j), g(() => x($e, `${r(w).length ?? ""}${r(p) > r(w).length ? ` / ${r(p)}` : ""} events`)), d(M, j);
    };
    A(ie, (M) => {
      r(w).length > 0 && M(Fe);
    });
  }
  var Pe = o(ie, 4);
  Pe.__click = () => {
    const M = n();
    M && V(M.venture_id);
  };
  var Me = i(Pe, !0);
  s(Pe), s(fe), s(ge);
  var ce = o(ge, 2), G = i(ce);
  {
    var I = (M) => {
      var j = jp();
      d(M, j);
    }, H = (M) => {
      var j = Bp();
      d(M, j);
    }, W = (M) => {
      var j = Vp(), $e = i(j), je = i($e);
      je.textContent = "○", Dt(4), s($e), s(j), d(M, j);
    }, N = (M) => {
      var j = Wp(), $e = it(j);
      He($e, 21, () => r(w), ct, (Ve, Se, Ne) => {
        const be = /* @__PURE__ */ we(() => r(m).has(Ne)), K = /* @__PURE__ */ we(() => R(r(Se).event_type));
        var $ = zp(), E = i($);
        E.__click = () => se(Ne);
        var F = i(E), P = i(F, !0);
        s(F);
        var te = o(F, 2), Le = i(te, !0);
        s(te);
        var S = o(te, 2);
        {
          var k = (O) => {
            var J = Gp(), Te = i(J);
            s(J), g(() => x(Te, `v${r(Se).version ?? ""}`)), d(O, J);
          };
          A(S, (O) => {
            r(Se).version !== void 0 && O(k);
          });
        }
        var q = o(S, 2);
        {
          var oe = (O) => {
            var J = qp(), Te = i(J, !0);
            s(J), g((Oe) => x(Te, Oe), [() => U(r(Se).timestamp)]), d(O, J);
          };
          A(q, (O) => {
            r(Se).timestamp && O(oe);
          });
        }
        s(E);
        var Be = o(E, 2);
        {
          var B = (O) => {
            var J = Hp(), Te = i(J), Oe = i(Te, !0);
            s(Te), s(J), g((Ke) => x(Oe, Ke), [() => ue(r(Se).data)]), d(O, J);
          };
          A(Be, (O) => {
            r(be) && O(B);
          });
        }
        s($), g(() => {
          x(P, r(be) ? "▾" : "▸"), Re(te, 1, `text-[11px] font-mono ${r(K) ?? ""} flex-1 min-w-0 truncate`), x(Le, r(Se).event_type);
        }), d(Ve, $);
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
          r(C) && Ve(qe);
        });
      }
      d(M, j);
    };
    A(G, (M) => {
      r(v) && r(w).length === 0 ? M(I) : n() ? r(w).length === 0 ? M(W, 2) : M(N, !1) : M(H, 1);
    });
  }
  s(ce), s(Ce), g(() => {
    Pe.disabled = r(v) || !n(), Re(Pe, 1, `text-[10px] px-2 py-0.5 rounded transition-colors
					${r(v) || !n() ? "text-surface-500 cursor-not-allowed" : "text-surface-400 hover:text-surface-200 hover:bg-surface-700"}`), x(Me, r(v) ? "Loading..." : "Refresh");
  }), d(e, Ce), mt(), l();
}
At(["click"]);
kt(rn, {}, [], [], { mode: "open" });
var Kp = /* @__PURE__ */ u(`<div class="flex justify-end"><div class="max-w-[85%] rounded-lg px-3 py-2 text-[11px]
						bg-hecate-600/20 text-surface-100 border border-hecate-600/20"> </div></div>`), Jp = /* @__PURE__ */ u('<div class="flex justify-start"><div><div class="whitespace-pre-wrap break-words"> </div></div></div>'), Qp = /* @__PURE__ */ u('<div class="whitespace-pre-wrap break-words"> <span class="inline-block w-1.5 h-3 bg-hecate-400 animate-pulse ml-0.5"></span></div>'), Xp = /* @__PURE__ */ u('<div class="flex items-center gap-1.5 text-surface-400"><span class="animate-bounce" style="animation-delay: 0ms">.</span> <span class="animate-bounce" style="animation-delay: 150ms">.</span> <span class="animate-bounce" style="animation-delay: 300ms">.</span></div>'), Zp = /* @__PURE__ */ u(`<div class="flex justify-start"><div class="max-w-[85%] rounded-lg px-3 py-2 text-[11px]
					bg-surface-700 text-surface-200 border border-surface-600"><!></div></div>`), e0 = /* @__PURE__ */ u('<span class="text-[9px] text-hecate-400 ml-1">(code-optimized)</span>'), t0 = /* @__PURE__ */ u('<span class="text-hecate-400"> </span> <!>', 1), r0 = /* @__PURE__ */ u('<span class="text-health-warn">No model available</span>'), a0 = /* @__PURE__ */ u('<div class="flex items-center justify-center h-full"><div class="text-center text-surface-400"><div class="text-xl mb-2"></div> <div class="text-[11px]">AI Assistant ready <br/> <!></div></div></div>'), s0 = /* @__PURE__ */ u(`<div class="w-[380px] border-l border-surface-600 bg-surface-800 flex flex-col shrink-0 overflow-hidden"><div class="flex items-center gap-2 px-3 py-2 border-b border-surface-600 shrink-0"><span class="text-hecate-400"></span> <span class="text-xs font-semibold text-surface-100">AI</span> <!> <div class="flex-1"></div> <span class="text-[9px] text-surface-400"> </span> <button class="text-surface-400 hover:text-surface-100 transition-colors px-1" title="Close AI Assistant"></button></div> <div class="flex-1 overflow-y-auto p-3 space-y-3"><!> <!> <!></div> <div class="border-t border-surface-600 p-2 shrink-0"><div class="flex gap-1.5"><textarea class="flex-1 bg-surface-700 border border-surface-600 rounded px-2.5 py-1.5
					text-[11px] text-surface-100 placeholder-surface-400 resize-none
					focus:outline-none focus:border-hecate-500
					disabled:opacity-50 disabled:cursor-not-allowed"></textarea> <button>Send</button></div></div></div>`);
function an(e, t) {
  bt(t, !0);
  const a = () => Ee(qa, "$selectedPhase", p), n = () => Ee(lo, "$phaseModelPrefs", p), c = () => Ee(Cn, "$aiModel", p), l = () => Ee(no, "$aiAssistContext", p), f = () => Ee(St, "$activeVenture", p), v = () => Ee(Yr, "$selectedDivision", p), [p, h] = Nt(), m = so();
  let C = /* @__PURE__ */ ve(Vt([])), w = /* @__PURE__ */ ve(""), V = /* @__PURE__ */ ve(!1), D = /* @__PURE__ */ ve(""), se = /* @__PURE__ */ ve(void 0), R = /* @__PURE__ */ ve(null), U = /* @__PURE__ */ ve(null), ue = /* @__PURE__ */ we(() => wl(a())), Ce = /* @__PURE__ */ we(() => n()[a()]);
  Rt(() => {
    const E = c();
    r(U) !== null && r(U) !== E && (r(R) && (r(R).cancel(), _(R, null)), _(C, [], !0), _(D, ""), _(V, !1)), _(U, E, !0);
  }), Rt(() => {
    const E = l();
    E && r(C).length === 0 && fe(E);
  });
  function ge() {
    const E = [], F = Xt(Eo);
    F && E.push(F);
    const P = Mr.find((te) => te.code === a());
    if (P && E.push(`You are currently assisting with the ${P.name} phase. ${P.description}.`), f()) {
      let te = `Venture: "${f().name}"`;
      f().brief && (te += ` — ${f().brief}`), E.push(te);
    }
    return v() && E.push(`Division: "${v().context_name}" (bounded context)`), E.push(Xt(Yd)), E.join(`

---

`);
  }
  async function fe(E) {
    const F = c();
    if (!F || !E.trim() || r(V)) return;
    const P = { role: "user", content: E.trim() };
    _(C, [...r(C), P], !0), _(w, "");
    const te = [], Le = ge();
    Le && te.push({ role: "system", content: Le }), te.push(...r(C)), _(V, !0), _(D, "");
    let S = "";
    const k = m.stream.chat(F, te);
    _(R, k, !0), k.onChunk((q) => {
      q.content && (S += q.content, _(D, S, !0));
    }).onDone(async (q) => {
      _(R, null), q.content && (S += q.content);
      const oe = {
        role: "assistant",
        content: S || "(empty response)"
      };
      if (_(C, [...r(C), oe], !0), _(D, ""), _(V, !1), Xt(wn) === "oracle" && S) {
        const B = Xt(St)?.venture_id;
        if (B) {
          const O = kl(S);
          for (const J of O)
            await Za(B, J, "oracle");
        }
      }
    }).onError((q) => {
      _(R, null);
      const oe = { role: "assistant", content: `Error: ${q}` };
      _(C, [...r(C), oe], !0), _(D, ""), _(V, !1);
    });
    try {
      await k.start();
    } catch (q) {
      const oe = { role: "assistant", content: `Error: ${String(q)}` };
      _(C, [...r(C), oe], !0), _(V, !1);
    }
  }
  let ie = /* @__PURE__ */ ve(void 0);
  function Fe(E) {
    E.key === "Enter" && !E.shiftKey && (E.preventDefault(), fe(r(w)), r(ie) && (r(ie).style.height = "auto"));
  }
  function Pe(E) {
    const F = E.target;
    F.style.height = "auto", F.style.height = Math.min(F.scrollHeight, 120) + "px";
  }
  function Me() {
    $l(), _(C, [], !0), _(D, "");
  }
  Rt(() => {
    r(C), r(D), bn().then(() => {
      r(se) && (r(se).scrollTop = r(se).scrollHeight);
    });
  });
  var ce = s0(), G = i(ce), I = i(G);
  I.textContent = "✦";
  var H = o(I, 4);
  {
    let E = /* @__PURE__ */ we(() => Mr.find((F) => F.code === a())?.shortName ?? "");
    ks(H, {
      get currentModel() {
        return c();
      },
      onSelect: (F) => Sn(F),
      showPhaseInfo: !0,
      get phasePreference() {
        return r(Ce);
      },
      get phaseAffinity() {
        return r(ue);
      },
      onPinModel: (F) => Yn(a(), F),
      onClearPin: () => Yn(a(), null),
      get phaseName() {
        return r(E);
      }
    });
  }
  var W = o(H, 4), N = i(W, !0);
  s(W);
  var M = o(W, 2);
  M.__click = Me, M.textContent = "✕", s(G);
  var j = o(G, 2), $e = i(j);
  He($e, 17, () => r(C), ct, (E, F) => {
    var P = or(), te = it(P);
    {
      var Le = (k) => {
        var q = Kp(), oe = i(q), Be = i(oe, !0);
        s(oe), s(q), g(() => x(Be, r(F).content)), d(k, q);
      }, S = (k) => {
        var q = Jp(), oe = i(q), Be = i(oe), B = i(Be, !0);
        s(Be), s(oe), s(q), g(
          (O) => {
            Re(oe, 1, `max-w-[85%] rounded-lg px-3 py-2 text-[11px]
						bg-surface-700 text-surface-200 border border-surface-600
						${O ?? ""}`), x(B, r(F).content);
          },
          [
            () => r(F).content.startsWith("Error:") ? "border-health-err/30 text-health-err" : ""
          ]
        ), d(k, q);
      };
      A(te, (k) => {
        r(F).role === "user" ? k(Le) : r(F).role === "assistant" && k(S, 1);
      });
    }
    d(E, P);
  });
  var je = o($e, 2);
  {
    var qe = (E) => {
      var F = Zp(), P = i(F), te = i(P);
      {
        var Le = (k) => {
          var q = Qp(), oe = i(q, !0);
          Dt(), s(q), g(() => x(oe, r(D))), d(k, q);
        }, S = (k) => {
          var q = Xp();
          d(k, q);
        };
        A(te, (k) => {
          r(D) ? k(Le) : k(S, !1);
        });
      }
      s(P), s(F), d(E, F);
    };
    A(je, (E) => {
      r(V) && E(qe);
    });
  }
  var Ve = o(je, 2);
  {
    var Se = (E) => {
      var F = a0(), P = i(F), te = i(P);
      te.textContent = "✦";
      var Le = o(te, 2), S = o(i(Le), 3);
      {
        var k = (oe) => {
          var Be = t0(), B = it(Be), O = i(B, !0);
          s(B);
          var J = o(B, 2);
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
        }, q = (oe) => {
          var Be = r0();
          d(oe, Be);
        };
        A(S, (oe) => {
          c() ? oe(k) : oe(q, !1);
        });
      }
      s(Le), s(P), s(F), d(E, F);
    };
    A(Ve, (E) => {
      r(C).length === 0 && !r(V) && E(Se);
    });
  }
  s(j), ea(j, (E) => _(se, E), () => r(se));
  var Ne = o(j, 2), be = i(Ne), K = i(be);
  Ca(K), K.__keydown = Fe, K.__input = Pe, It(K, "rows", 1), ea(K, (E) => _(ie, E), () => r(ie));
  var $ = o(K, 2);
  $.__click = () => fe(r(w)), s(be), s(Ne), s(ce), g(
    (E, F, P) => {
      x(N, E), It(K, "placeholder", r(V) ? "Waiting..." : "Ask about this phase..."), K.disabled = r(V) || !c(), $.disabled = F, Re($, 1, `px-2.5 rounded text-[11px] transition-colors self-end
					${P ?? ""}`);
    },
    [
      () => Mr.find((E) => E.code === a())?.shortName ?? "",
      () => r(V) || !r(w).trim() || !c(),
      () => r(V) || !r(w).trim() || !c() ? "bg-surface-600 text-surface-400 cursor-not-allowed" : "bg-hecate-600 text-surface-50 hover:bg-hecate-500"
    ]
  ), xt(K, () => r(w), (E) => _(w, E)), d(e, ce), mt(), h();
}
At(["click", "keydown", "input"]);
kt(an, {}, [], [], { mode: "open" });
var n0 = /* @__PURE__ */ u("<button> </button>"), i0 = /* @__PURE__ */ u('<div><button><span class="font-medium truncate block"> </span></button> <div class="flex items-center gap-1 ml-2 mt-0.5"></div></div>'), o0 = /* @__PURE__ */ u('<div class="text-[10px] text-surface-500 px-2 py-3 text-center">No divisions yet</div>'), c0 = /* @__PURE__ */ u('<div class="px-2 pb-2 space-y-1"><!> <!></div>'), l0 = /* @__PURE__ */ u('<span class="ml-auto text-[9px] px-1.5 py-0.5 rounded-full bg-hecate-600/20 text-hecate-300"> </span>'), d0 = /* @__PURE__ */ u('<span class="ml-auto text-[9px] text-surface-500 truncate max-w-[60px]"> </span>'), u0 = /* @__PURE__ */ u(`<button class="w-full flex items-center gap-1.5 px-2 py-1 rounded text-[10px]
							text-surface-300 hover:bg-surface-700/50 transition-colors"><span> </span> <span class="truncate"> </span> <!></button>`), v0 = /* @__PURE__ */ u('<div class="px-2 pb-2 space-y-0.5"></div>'), f0 = /* @__PURE__ */ u('<span class="ml-auto text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 animate-pulse"> </span>'), p0 = /* @__PURE__ */ u('<div class="text-[9px] text-surface-400 ml-3 mt-0.5 truncate"> </div>'), x0 = /* @__PURE__ */ u(`<button class="w-full text-left p-2 rounded bg-amber-500/5 border border-amber-500/20
							hover:bg-amber-500/10 transition-colors"><div class="flex items-center gap-1.5"><span class="text-[8px] text-amber-400 animate-pulse"></span> <span class="text-[10px] font-medium text-amber-300 truncate"> </span></div> <!></button>`), _0 = /* @__PURE__ */ u('<div class="text-[10px] text-surface-500 px-2 py-3 text-center">No pending gates</div>'), h0 = /* @__PURE__ */ u('<div class="px-2 pb-2 space-y-1"><!> <!></div>'), g0 = /* @__PURE__ */ u(`<div class="w-52 border-r border-surface-600 bg-surface-800/30 overflow-y-auto shrink-0 flex flex-col"><div class="border-b border-surface-700/50"><button class="w-full flex items-center gap-1.5 px-3 py-2 text-[10px] text-surface-400
				uppercase tracking-wider hover:text-surface-300 transition-colors"><span class="text-[8px]"> </span> <span>Divisions</span> <span class="ml-auto text-surface-500"> </span></button> <!></div> <div class="border-b border-surface-700/50"><button class="w-full flex items-center gap-1.5 px-3 py-2 text-[10px] text-surface-400
				uppercase tracking-wider hover:text-surface-300 transition-colors"><span class="text-[8px]"> </span> <span>Agents</span> <!></button> <!></div> <div class="flex-1"><button class="w-full flex items-center gap-1.5 px-3 py-2 text-[10px] text-surface-400
				uppercase tracking-wider hover:text-surface-300 transition-colors"><span class="text-[8px]"> </span> <span>Gates</span> <!></button> <!></div></div>`);
function Fo(e, t) {
  bt(t, !0);
  const a = () => Ee(Ur, "$divisions", f), n = () => Ee(xa, "$selectedDivisionId", f), c = () => Ee(ca, "$agentRoleStatuses", f), l = () => Ee(Aa, "$pendingGates", f), [f, v] = Nt();
  let p = pt(t, "onSelectAgent", 7), h = pt(t, "onSelectGate", 7), m = /* @__PURE__ */ ve(Vt({}));
  function C(P) {
    _(
      m,
      {
        ...r(m),
        [P]: !r(m)[P]
      },
      !0
    );
  }
  function w(P) {
    xa.set(P);
  }
  function V(P, te) {
    xa.set(P), qa.set(te);
  }
  function D(P, te) {
    return P ? te.length === 0 ? { icon: "●", css: "text-health-ok" } : te.includes("resume") ? { icon: "○", css: "text-health-warn" } : te.includes("shelve") || te.includes("conclude") || te.includes("archive") ? { icon: "◐", css: "text-hecate-400" } : te.includes("open") ? { icon: "○", css: "text-surface-300" } : { icon: "○", css: "text-surface-500" } : { icon: "○", css: "text-surface-500" };
  }
  function se(P) {
    switch (P) {
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
  function R(P) {
    return P.replace(/_/g, " ").replace(/\b\w/g, (te) => te.toUpperCase());
  }
  var U = {
    get onSelectAgent() {
      return p();
    },
    set onSelectAgent(P) {
      p(P), ut();
    },
    get onSelectGate() {
      return h();
    },
    set onSelectGate(P) {
      h(P), ut();
    }
  }, ue = g0(), Ce = i(ue), ge = i(Ce);
  ge.__click = () => C("divisions");
  var fe = i(ge), ie = i(fe, !0);
  s(fe);
  var Fe = o(fe, 4), Pe = i(Fe, !0);
  s(Fe), s(ge);
  var Me = o(ge, 2);
  {
    var ce = (P) => {
      var te = c0(), Le = i(te);
      He(Le, 1, a, ct, (q, oe) => {
        const Be = /* @__PURE__ */ we(() => n() === r(oe).division_id);
        var B = i0(), O = i(B);
        O.__click = () => w(r(oe).division_id);
        var J = i(O), Te = i(J, !0);
        s(J), s(O);
        var Oe = o(O, 2);
        He(Oe, 21, () => Mr, ct, (Ke, Qe) => {
          const tt = /* @__PURE__ */ we(() => pa(r(oe), r(Qe).code)), Ye = /* @__PURE__ */ we(() => Us(r(oe), r(Qe).code)), at = /* @__PURE__ */ we(() => {
            const { icon: L, css: z } = D(r(tt), r(Ye));
            return { icon: L, css: z };
          });
          var ze = n0();
          ze.__click = () => V(r(oe).division_id, r(Qe).code);
          var We = i(ze, !0);
          s(ze), g(() => {
            Re(ze, 1, `text-[9px] ${r(at).css ?? ""} hover:opacity-80 transition-opacity`), It(ze, "title", `${r(Qe).shortName ?? ""}: ${(r(tt) || "Pending") ?? ""}`), x(We, r(at).icon);
          }), d(Ke, ze);
        }), s(Oe), s(B), g(() => {
          Re(O, 1, `w-full text-left px-2 py-1 rounded text-xs transition-colors
								${r(Be) ? "bg-surface-700 text-surface-100" : "text-surface-300 hover:bg-surface-700/50 hover:text-surface-100"}`), x(Te, r(oe).context_name);
        }), d(q, B);
      });
      var S = o(Le, 2);
      {
        var k = (q) => {
          var oe = o0();
          d(q, oe);
        };
        A(S, (q) => {
          a().length === 0 && q(k);
        });
      }
      s(te), d(P, te);
    };
    A(Me, (P) => {
      r(m).divisions || P(ce);
    });
  }
  s(Ce);
  var G = o(Ce, 2), I = i(G);
  I.__click = () => C("agents");
  var H = i(I), W = i(H, !0);
  s(H);
  var N = o(H, 4);
  {
    var M = (P) => {
      var te = l0(), Le = i(te);
      s(te), g((S) => x(Le, `${S ?? ""} active`), [
        () => c().filter((S) => S.status === "running").length
      ]), d(P, te);
    }, j = /* @__PURE__ */ we(() => c().filter((P) => P.status === "running").length > 0);
    A(N, (P) => {
      r(j) && P(M);
    });
  }
  s(I);
  var $e = o(I, 2);
  {
    var je = (P) => {
      var te = v0();
      He(te, 5, c, ct, (Le, S) => {
        const k = /* @__PURE__ */ we(() => {
          const { icon: Oe, css: Ke } = se(r(S).status);
          return { icon: Oe, css: Ke };
        });
        var q = u0();
        q.__click = () => p()?.(r(S).role);
        var oe = i(q), Be = i(oe, !0);
        s(oe);
        var B = o(oe, 2), O = i(B, !0);
        s(B);
        var J = o(B, 2);
        {
          var Te = (Oe) => {
            var Ke = d0(), Qe = i(Ke, !0);
            s(Ke), g(() => x(Qe, r(S).active_session.division_id)), d(Oe, Ke);
          };
          A(J, (Oe) => {
            r(S).active_session?.division_id && Oe(Te);
          });
        }
        s(q), g(
          (Oe) => {
            Re(oe, 1, `${r(k).css ?? ""} text-[8px]`), x(Be, r(k).icon), x(O, Oe);
          },
          [() => R(r(S).role)]
        ), d(Le, q);
      }), s(te), d(P, te);
    };
    A($e, (P) => {
      r(m).agents || P(je);
    });
  }
  s(G);
  var qe = o(G, 2), Ve = i(qe);
  Ve.__click = () => C("gates");
  var Se = i(Ve), Ne = i(Se, !0);
  s(Se);
  var be = o(Se, 4);
  {
    var K = (P) => {
      var te = f0(), Le = i(te, !0);
      s(te), g(() => x(Le, l().length)), d(P, te);
    };
    A(be, (P) => {
      l().length > 0 && P(K);
    });
  }
  s(Ve);
  var $ = o(Ve, 2);
  {
    var E = (P) => {
      var te = h0(), Le = i(te);
      He(Le, 1, l, ct, (q, oe) => {
        var Be = x0();
        Be.__click = () => h()?.(r(oe).session_id);
        var B = i(Be), O = i(B);
        O.textContent = "●";
        var J = o(O, 2), Te = i(J, !0);
        s(J), s(B);
        var Oe = o(B, 2);
        {
          var Ke = (Qe) => {
            var tt = p0(), Ye = i(tt, !0);
            s(tt), g(() => x(Ye, r(oe).division_id)), d(Qe, tt);
          };
          A(Oe, (Qe) => {
            r(oe).division_id && Qe(Ke);
          });
        }
        s(Be), g((Qe) => x(Te, Qe), [() => R(r(oe).role)]), d(q, Be);
      });
      var S = o(Le, 2);
      {
        var k = (q) => {
          var oe = _0();
          d(q, oe);
        };
        A(S, (q) => {
          l().length === 0 && q(k);
        });
      }
      s(te), d(P, te);
    };
    A($, (P) => {
      r(m).gates || P(E);
    });
  }
  s(qe), s(ue), g(() => {
    x(ie, r(m).divisions ? "▶" : "▼"), x(Pe, a().length), x(W, r(m).agents ? "▶" : "▼"), x(Ne, r(m).gates ? "▶" : "▼");
  }), d(e, ue);
  var F = mt(U);
  return v(), F;
}
At(["click"]);
kt(Fo, { onSelectAgent: {}, onSelectGate: {} }, [], [], { mode: "open" });
var b0 = /* @__PURE__ */ u('<span class="text-surface-500 truncate"> </span>'), m0 = /* @__PURE__ */ u('<span> </span> <!> <span class="text-surface-500 shrink-0"> </span>', 1), y0 = /* @__PURE__ */ u('<span class="text-surface-500">No recent activity</span>'), w0 = /* @__PURE__ */ u('<span class="px-1.5 py-0.5 rounded-full bg-hecate-600/30 text-hecate-300 text-[9px]"> </span>'), $0 = /* @__PURE__ */ u('<span class="text-[9px] text-surface-500 ml-1"> </span>'), k0 = /* @__PURE__ */ u(`<div class="flex items-start gap-2 px-4 py-1.5 hover:bg-surface-700/20
					transition-colors border-b border-surface-700/30 last:border-b-0"><span></span> <div class="min-w-0 flex-1"><span> </span> <!></div> <span class="text-[9px] text-surface-500 shrink-0 tabular-nums"> </span></div>`), C0 = /* @__PURE__ */ u('<div class="text-center py-4 text-[10px] text-surface-500">Activity will appear here as events stream in</div>'), S0 = /* @__PURE__ */ u('<div class="max-h-48 overflow-y-auto border-t border-surface-700/50"><!> <!></div>'), E0 = /* @__PURE__ */ u(`<div class="border-t border-surface-600 bg-surface-800/50 shrink-0"><button class="w-full flex items-center gap-2 px-4 py-1.5 text-[10px]
			hover:bg-surface-700/30 transition-colors"><span></span> <!> <span class="flex-1"></span> <!> <span class="text-surface-500 text-[8px]"> </span></button> <!></div>`);
function jo(e, t) {
  bt(t, !0);
  const a = () => Ee(pr, "$sseStatus", l), n = () => Ee(ud, "$recentActivity", l), c = () => Ee(Pn, "$unreadCount", l), [l, f] = Nt();
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
  function m(Pe) {
    const Me = Math.floor((Date.now() - Pe) / 1e3);
    if (Me < 5) return "now";
    if (Me < 60) return `${Me}s ago`;
    const ce = Math.floor(Me / 60);
    return ce < 60 ? `${ce}m ago` : `${Math.floor(ce / 60)}h ago`;
  }
  function C() {
    _(v, !r(v)), r(v) && pd();
  }
  var w = E0(), V = i(w);
  V.__click = C;
  var D = i(V), se = o(D, 2);
  {
    var R = (Pe) => {
      const Me = /* @__PURE__ */ we(() => n()[0]);
      var ce = m0(), G = it(ce), I = i(G, !0);
      s(G);
      var H = o(G, 2);
      {
        var W = (j) => {
          var $e = b0(), je = i($e, !0);
          s($e), g(() => x(je, r(Me).detail)), d(j, $e);
        };
        A(H, (j) => {
          r(Me).detail && j(W);
        });
      }
      var N = o(H, 2), M = i(N, !0);
      s(N), g(
        (j, $e) => {
          Re(G, 1, `${j ?? ""} truncate`), x(I, r(Me).summary), x(M, $e);
        },
        [
          () => p(r(Me).severity),
          () => m(r(Me).timestamp)
        ]
      ), d(Pe, ce);
    }, U = (Pe) => {
      var Me = y0();
      d(Pe, Me);
    };
    A(se, (Pe) => {
      n().length > 0 ? Pe(R) : Pe(U, !1);
    });
  }
  var ue = o(se, 4);
  {
    var Ce = (Pe) => {
      var Me = w0(), ce = i(Me, !0);
      s(Me), g(() => x(ce, c())), d(Pe, Me);
    };
    A(ue, (Pe) => {
      c() > 0 && Pe(Ce);
    });
  }
  var ge = o(ue, 2), fe = i(ge, !0);
  s(ge), s(V);
  var ie = o(V, 2);
  {
    var Fe = (Pe) => {
      var Me = S0(), ce = i(Me);
      He(ce, 1, n, (H) => H.id, (H, W) => {
        var N = k0(), M = i(N), j = o(M, 2), $e = i(j), je = i($e, !0);
        s($e);
        var qe = o($e, 2);
        {
          var Ve = (be) => {
            var K = $0(), $ = i(K, !0);
            s(K), g(() => x($, r(W).detail)), d(be, K);
          };
          A(qe, (be) => {
            r(W).detail && be(Ve);
          });
        }
        s(j);
        var Se = o(j, 2), Ne = i(Se, !0);
        s(Se), s(N), g(
          (be, K, $) => {
            Re(M, 1, `inline-block w-1.5 h-1.5 rounded-full mt-1 shrink-0
						${be ?? ""}`), Re($e, 1, `text-[10px] ${K ?? ""}`), x(je, r(W).summary), x(Ne, $);
          },
          [
            () => h(r(W).severity),
            () => p(r(W).severity),
            () => m(r(W).timestamp)
          ]
        ), d(H, N);
      });
      var G = o(ce, 2);
      {
        var I = (H) => {
          var W = C0();
          d(H, W);
        };
        A(G, (H) => {
          n().length === 0 && H(I);
        });
      }
      s(Me), d(Pe, Me);
    };
    A(ie, (Pe) => {
      r(v) && Pe(Fe);
    });
  }
  s(w), g(() => {
    Re(D, 1, `inline-block w-1.5 h-1.5 rounded-full shrink-0
				${a() === "connected" ? "bg-health-ok" : a() === "connecting" ? "bg-amber-400 animate-pulse" : "bg-surface-500"}`), It(D, "title", `SSE: ${a() ?? ""}`), x(fe, r(v) ? "▼" : "▲");
  }), d(e, w), mt(), f();
}
At(["click"]);
kt(jo, {}, [], [], { mode: "open" });
var A0 = /* @__PURE__ */ u('<span class="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-medium"> </span>'), D0 = /* @__PURE__ */ u('<div class="text-center py-8 text-surface-500 text-xs">No gates awaiting decision</div>'), P0 = /* @__PURE__ */ u('<span class="text-[10px] text-surface-400"></span> <span class="text-[10px] text-surface-300"> </span>', 1), T0 = /* @__PURE__ */ u('<div class="rounded bg-surface-800 border border-surface-600 p-3 max-h-64 overflow-y-auto"><pre class="text-[10px] text-surface-200 whitespace-pre-wrap font-mono leading-relaxed"> </pre></div>'), R0 = /* @__PURE__ */ u("<span> </span>"), M0 = /* @__PURE__ */ u(`<div class="space-y-2"><textarea placeholder="Reason for rejecting..." rows="2" class="w-full bg-surface-700 border border-surface-600 rounded px-2.5 py-1.5
													text-xs text-surface-100 placeholder-surface-400
													focus:outline-none focus:border-health-err/50 resize-none"></textarea> <div class="flex gap-2"><button>Confirm Reject</button> <button class="px-3 py-1.5 rounded text-xs text-surface-400 hover:text-surface-100">Cancel</button></div></div>`), I0 = /* @__PURE__ */ u(`<div class="flex gap-2"><button class="px-4 py-1.5 rounded text-xs font-medium
													bg-health-ok/20 text-health-ok hover:bg-health-ok/30 transition-colors"></button> <button class="px-4 py-1.5 rounded text-xs font-medium
													bg-health-err/20 text-health-err hover:bg-health-err/30 transition-colors"></button></div>`), N0 = /* @__PURE__ */ u('<div class="border-t border-amber-500/10 px-4 py-3 space-y-3"><!> <div class="flex items-center gap-4 text-[9px] text-surface-400"><span> </span> <!></div> <!></div>'), L0 = /* @__PURE__ */ u('<div class="rounded-lg border border-amber-500/20 bg-amber-500/5 overflow-hidden"><button class="w-full text-left px-4 py-3 hover:bg-amber-500/10 transition-colors"><div class="flex items-center gap-3"><span class="text-amber-400 text-[8px] animate-pulse"></span> <span class="text-xs font-semibold text-amber-300"> </span> <!> <span class="text-[10px] text-surface-400"></span> <span class="text-[10px] text-surface-400"> </span> <span class="text-[10px] text-surface-500 ml-auto"> </span> <span class="text-[8px] text-surface-500"> </span></div> <div class="text-[10px] text-surface-400 mt-1 ml-5 truncate"> </div></button> <!></div>'), O0 = /* @__PURE__ */ u('<div class="space-y-3"></div>'), F0 = /* @__PURE__ */ u('<span class="text-[10px] text-surface-500"></span> <span class="text-[10px] text-surface-400"> </span>', 1), j0 = /* @__PURE__ */ u('<div class="text-[10px] text-surface-400 mt-1 ml-5 truncate"> </div>'), B0 = /* @__PURE__ */ u('<div class="rounded-lg border border-surface-600/50 bg-surface-800/30 px-4 py-3"><div class="flex items-center gap-3"><span> </span> <span> </span> <!> <span class="text-[10px] text-surface-500"></span> <span class="text-[10px] text-surface-500"> </span> <span class="text-[10px] text-surface-500 ml-auto"> </span></div> <!></div>'), V0 = /* @__PURE__ */ u('<div><h3 class="text-[10px] text-surface-400 uppercase tracking-wider mb-3">Decided (recent)</h3> <div class="space-y-2"></div></div>'), G0 = /* @__PURE__ */ u('<div class="flex flex-col h-full overflow-hidden"><div class="border-b border-surface-600 bg-surface-800/50 px-5 py-3 shrink-0"><div class="flex items-center gap-3"><h2 class="text-sm font-semibold text-surface-100">Gates</h2> <!></div></div> <div class="flex-1 overflow-y-auto p-5 space-y-6"><div><h3 class="text-[10px] text-surface-400 uppercase tracking-wider mb-3 flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span> Pending</h3> <!></div> <!></div></div>');
function Bo(e, t) {
  bt(t, !0);
  const a = () => Ee(ho, "$agentSessions", l), n = () => Ee(St, "$activeVenture", l), c = () => Ee(Aa, "$pendingGates", l), [l, f] = Nt();
  let v = /* @__PURE__ */ ve(null), p = /* @__PURE__ */ ve(null), h = /* @__PURE__ */ ve("");
  const m = /* @__PURE__ */ we(() => a().filter((I) => I.status === "gate_passed" || I.status === "gate_rejected").sort((I, H) => (H.completed_at ?? 0) - (I.completed_at ?? 0)).slice(0, 10));
  function C(I) {
    switch (I) {
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
        return `${er[I]?.label?.toUpperCase() ?? I.toUpperCase()} GATE`;
    }
  }
  function w(I) {
    if (!I) return "";
    const H = Math.floor((Date.now() - I) / 1e3);
    if (H < 5) return "just now";
    if (H < 60) return `${H}s ago`;
    const W = Math.floor(H / 60);
    return W < 60 ? `${W}m ago` : `${Math.floor(W / 60)}h ago`;
  }
  function V(I) {
    if (I.gate_output) {
      const H = I.gate_output.split(`
`).filter((W) => W.trim());
      if (H.length > 0) return H[0].slice(0, 120);
    }
    if (I.output) {
      const H = I.output.split(`
`).filter((W) => W.trim());
      if (H.length > 0) return H[0].slice(0, 120);
    }
    return "Awaiting review";
  }
  async function D(I) {
    const H = n()?.venture_id;
    H && await go(H, I.role, I.session_id);
  }
  async function se(I) {
    const H = n()?.venture_id;
    !H || !r(h).trim() || (await bo(H, I.role, I.session_id, r(h).trim()), _(h, ""), _(p, null));
  }
  var R = G0(), U = i(R), ue = i(U), Ce = o(i(ue), 2);
  {
    var ge = (I) => {
      var H = A0(), W = i(H);
      s(H), g(() => x(W, `${c().length ?? ""} pending`)), d(I, H);
    };
    A(Ce, (I) => {
      c().length > 0 && I(ge);
    });
  }
  s(ue), s(U);
  var fe = o(U, 2), ie = i(fe), Fe = o(i(ie), 2);
  {
    var Pe = (I) => {
      var H = D0();
      d(I, H);
    }, Me = (I) => {
      var H = O0();
      He(H, 5, c, (W) => W.session_id, (W, N) => {
        const M = /* @__PURE__ */ we(() => r(v) === r(N).session_id), j = /* @__PURE__ */ we(() => r(p) === r(N).session_id);
        var $e = L0(), je = i($e);
        je.__click = () => {
          _(v, r(M) ? null : r(N).session_id, !0);
        };
        var qe = i(je), Ve = i(qe);
        Ve.textContent = "●";
        var Se = o(Ve, 2), Ne = i(Se, !0);
        s(Se);
        var be = o(Se, 2);
        {
          var K = (B) => {
            var O = P0(), J = it(O);
            J.textContent = "·";
            var Te = o(J, 2), Oe = i(Te, !0);
            s(Te), g(() => x(Oe, r(N).division_id)), d(B, O);
          };
          A(be, (B) => {
            r(N).division_id && B(K);
          });
        }
        var $ = o(be, 2);
        $.textContent = "·";
        var E = o($, 2), F = i(E, !0);
        s(E);
        var P = o(E, 2), te = i(P, !0);
        s(P);
        var Le = o(P, 2), S = i(Le, !0);
        s(Le), s(qe);
        var k = o(qe, 2), q = i(k, !0);
        s(k), s(je);
        var oe = o(je, 2);
        {
          var Be = (B) => {
            var O = N0(), J = i(O);
            {
              var Te = (L) => {
                var z = T0(), Y = i(z), xe = i(Y, !0);
                s(Y), s(z), g(() => x(xe, r(N).gate_output || r(N).output)), d(L, z);
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
                var z = R0(), Y = i(z);
                s(z), g((xe) => x(Y, `Started: ${xe ?? ""}`), [() => new Date(r(N).started_at).toLocaleTimeString()]), d(L, z);
              };
              A(tt, (L) => {
                r(N).started_at && L(Ye);
              });
            }
            s(Oe);
            var at = o(Oe, 2);
            {
              var ze = (L) => {
                var z = M0(), Y = i(z);
                Ca(Y);
                var xe = o(Y, 2), ae = i(xe);
                ae.__click = () => se(r(N));
                var pe = o(ae, 2);
                pe.__click = () => {
                  _(p, null);
                }, s(xe), s(z), g(
                  (Ie, Je) => {
                    ae.disabled = Ie, Re(ae, 1, `px-3 py-1.5 rounded text-xs transition-colors
														${Je ?? ""}`);
                  },
                  [
                    () => !r(h).trim(),
                    () => r(h).trim() ? "bg-health-err/20 text-health-err hover:bg-health-err/30" : "bg-surface-700 text-surface-500 cursor-not-allowed"
                  ]
                ), xt(Y, () => r(h), (Ie) => _(h, Ie)), d(L, z);
              }, We = (L) => {
                var z = I0(), Y = i(z);
                Y.__click = () => D(r(N)), Y.textContent = "✓ Pass Gate";
                var xe = o(Y, 2);
                xe.__click = () => {
                  _(p, r(N).session_id, !0);
                }, xe.textContent = "✕ Reject", s(z), d(L, z);
              };
              A(at, (L) => {
                r(j) ? L(ze) : L(We, !1);
              });
            }
            s(O), g((L, z) => x(Qe, `Tokens: ${L ?? ""} in / ${z ?? ""} out`), [
              () => r(N).tokens_in.toLocaleString(),
              () => r(N).tokens_out.toLocaleString()
            ]), d(B, O);
          };
          A(oe, (B) => {
            r(M) && B(Be);
          });
        }
        s($e), g(
          (B, O, J) => {
            x(Ne, B), x(F, er[r(N).role]?.label ?? r(N).role), x(te, O), x(S, r(M) ? "▼" : "▶"), x(q, J);
          },
          [
            () => C(r(N).role),
            () => w(r(N).started_at),
            () => V(r(N))
          ]
        ), d(W, $e);
      }), s(H), d(I, H);
    };
    A(Fe, (I) => {
      c().length === 0 ? I(Pe) : I(Me, !1);
    });
  }
  s(ie);
  var ce = o(ie, 2);
  {
    var G = (I) => {
      var H = V0(), W = o(i(H), 2);
      He(W, 21, () => r(m), (N) => N.session_id, (N, M) => {
        const j = /* @__PURE__ */ we(() => r(M).status === "gate_passed");
        var $e = B0(), je = i($e), qe = i(je), Ve = i(qe, !0);
        s(qe);
        var Se = o(qe, 2), Ne = i(Se, !0);
        s(Se);
        var be = o(Se, 2);
        {
          var K = (k) => {
            var q = F0(), oe = it(q);
            oe.textContent = "·";
            var Be = o(oe, 2), B = i(Be, !0);
            s(Be), g(() => x(B, r(M).division_id)), d(k, q);
          };
          A(be, (k) => {
            r(M).division_id && k(K);
          });
        }
        var $ = o(be, 2);
        $.textContent = "·";
        var E = o($, 2), F = i(E, !0);
        s(E);
        var P = o(E, 2), te = i(P, !0);
        s(P), s(je);
        var Le = o(je, 2);
        {
          var S = (k) => {
            var q = j0(), oe = i(q);
            s(q), g(() => x(oe, `${r(j) ? "Passed with feedback" : "Rejected"}: "${r(M).error ?? ""}"`)), d(k, q);
          };
          A(Le, (k) => {
            r(M).error && k(S);
          });
        }
        s($e), g(
          (k, q) => {
            Re(qe, 1, `text-[10px] ${r(j) ? "text-health-ok" : "text-health-err"}`), x(Ve, r(j) ? "✓" : "✕"), Re(Se, 1, `text-xs font-medium ${r(j) ? "text-health-ok/80" : "text-health-err/80"}`), x(Ne, k), x(F, er[r(M).role]?.label ?? r(M).role), x(te, q);
          },
          [
            () => C(r(M).role),
            () => w(r(M).completed_at)
          ]
        ), d(N, $e);
      }), s(W), s(H), d(I, H);
    };
    A(ce, (I) => {
      r(m).length > 0 && I(G);
    });
  }
  s(fe), s(R), d(e, R), mt(), f();
}
At(["click"]);
kt(Bo, {}, [], [], { mode: "open" });
var q0 = /* @__PURE__ */ u('<div class="text-center py-8 text-surface-500 text-xs">No divisions identified yet</div>'), H0 = /* @__PURE__ */ u("<span></span>"), z0 = /* @__PURE__ */ u('<div class="flex items-center gap-1.5 text-[9px]"><span></span> <span class="text-surface-300 truncate"> </span></div>'), U0 = /* @__PURE__ */ u('<div class="text-[9px] text-surface-500">idle</div>'), W0 = /* @__PURE__ */ u(`<button class="group text-left p-3 rounded-lg border border-surface-600
								bg-surface-800/60 hover:border-hecate-500/50 hover:bg-hecate-600/5
								transition-all"><div class="text-xs font-medium text-surface-100 truncate mb-2"> </div> <div class="flex items-center gap-1.5 mb-2"></div> <!></button>`), Y0 = /* @__PURE__ */ u('<div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"></div>'), K0 = /* @__PURE__ */ u('<div class="flex items-center gap-3"><span class="text-[10px] text-surface-300 w-16 text-right shrink-0"> </span> <div class="flex-1 h-2 bg-surface-700 rounded-full overflow-hidden"><div></div></div> <span class="text-[10px] text-surface-400 w-10 shrink-0 tabular-nums"> </span></div>'), J0 = /* @__PURE__ */ u('<div><h3 class="text-[10px] text-surface-400 uppercase tracking-wider mb-3">Progress</h3> <div class="space-y-2.5"></div></div>'), Q0 = /* @__PURE__ */ u('<div class="text-center py-6 text-surface-500 text-xs">No agents currently active</div>'), X0 = /* @__PURE__ */ u('<span class="text-[9px] text-surface-500 tabular-nums shrink-0"> </span>'), Z0 = /* @__PURE__ */ u('<div class="flex items-center gap-3 px-3 py-2 rounded-lg bg-surface-800/40 border border-surface-700/50"><span></span> <span class="text-xs text-surface-200 font-medium w-20 shrink-0"> </span> <span class="text-[10px] text-surface-400 flex-1 truncate"><!></span> <!></div>'), ex = /* @__PURE__ */ u('<div class="space-y-2"></div>'), tx = /* @__PURE__ */ u("<span> </span>"), rx = /* @__PURE__ */ u("<span> </span>"), ax = /* @__PURE__ */ u('<div class="flex items-center gap-4 mt-3 text-[9px] text-surface-500"><!> <!></div>'), sx = /* @__PURE__ */ u('<div class="flex flex-col h-full overflow-hidden"><div class="border-b border-surface-600 bg-surface-800/50 px-5 py-3 shrink-0"><h2 class="text-sm font-semibold text-surface-100">Venture Overview</h2></div> <div class="flex-1 overflow-y-auto p-5 space-y-6"><div><h3 class="text-[10px] text-surface-400 uppercase tracking-wider mb-3">Divisions</h3> <!></div> <!> <div><h3 class="text-[10px] text-surface-400 uppercase tracking-wider mb-3">Agent Activity</h3> <!> <!></div></div></div>');
function Vo(e, t) {
  bt(t, !0);
  const a = () => Ee(ca, "$agentRoleStatuses", c), n = () => Ee(Ur, "$divisions", c), [c, l] = Nt();
  let f = pt(t, "onSelectDivision", 7);
  function v(W) {
    return Mr.map((N) => {
      const M = W.length, j = W.filter((qe) => {
        const Ve = pa(qe, N.code);
        return Ve === "concluded" || Ve === "completed" || Ve === "submitted";
      }).length, $e = W.filter((qe) => {
        const Ve = pa(qe, N.code);
        return Ve === "open" || Ve === "active" || Ve === "initiated";
      }).length, je = j + $e * 0.5;
      return {
        code: N.code,
        name: N.shortName,
        completed: j,
        total: M,
        percent: M > 0 ? Math.round(je / M * 100) : 0
      };
    });
  }
  function p(W, N) {
    const M = pa(W, N);
    return !M || M === "pending" ? { css: "bg-surface-600", label: "Not started" } : M === "concluded" || M === "completed" || M === "submitted" ? { css: "bg-health-ok", label: "Complete" } : M === "shelved" ? { css: "bg-amber-400", label: "Shelved" } : M === "open" || M === "active" || M === "initiated" ? { css: "bg-hecate-400", label: "In progress" } : { css: "bg-surface-500", label: M };
  }
  function h(W) {
    return a().find((N) => (N.status === "running" || N.status === "gate_pending") && N.active_session?.division_id === W) ?? null;
  }
  function m() {
    return a().filter((W) => W.status === "running" || W.status === "gate_pending");
  }
  const C = /* @__PURE__ */ we(() => v(n())), w = /* @__PURE__ */ we(m);
  var V = {
    get onSelectDivision() {
      return f();
    },
    set onSelectDivision(W) {
      f(W), ut();
    }
  }, D = sx(), se = o(i(D), 2), R = i(se), U = o(i(R), 2);
  {
    var ue = (W) => {
      var N = q0();
      d(W, N);
    }, Ce = (W) => {
      var N = Y0();
      He(N, 5, n, (M) => M.division_id, (M, j) => {
        const $e = /* @__PURE__ */ we(() => h(r(j).division_id));
        var je = W0();
        je.__click = () => {
          xa.set(r(j).division_id), f()?.(r(j).division_id);
        };
        var qe = i(je), Ve = i(qe, !0);
        s(qe);
        var Se = o(qe, 2);
        He(Se, 21, () => Mr, ct, ($, E) => {
          const F = /* @__PURE__ */ we(() => p(r(j), r(E).code));
          var P = H0();
          g(() => {
            Re(P, 1, `w-2 h-2 rounded-full ${r(F).css ?? ""}`), It(P, "title", `${r(E).shortName ?? ""}: ${r(F).label ?? ""}`);
          }), d($, P);
        }), s(Se);
        var Ne = o(Se, 2);
        {
          var be = ($) => {
            var E = z0(), F = i(E), P = o(F, 2), te = i(P, !0);
            s(P), s(E), g(() => {
              Re(F, 1, `w-1.5 h-1.5 rounded-full ${r($e).status === "gate_pending" ? "bg-amber-400 animate-pulse" : "bg-hecate-400 animate-pulse"}`), x(te, er[r($e).role]?.label ?? r($e).role);
            }), d($, E);
          }, K = ($) => {
            var E = U0();
            d($, E);
          };
          A(Ne, ($) => {
            r($e) ? $(be) : $(K, !1);
          });
        }
        s(je), g(() => x(Ve, r(j).context_name)), d(M, je);
      }), s(N), d(W, N);
    };
    A(U, (W) => {
      n().length === 0 ? W(ue) : W(Ce, !1);
    });
  }
  s(R);
  var ge = o(R, 2);
  {
    var fe = (W) => {
      var N = J0(), M = o(i(N), 2);
      He(M, 21, () => r(C), ct, (j, $e) => {
        var je = K0(), qe = i(je), Ve = i(qe, !0);
        s(qe);
        var Se = o(qe, 2), Ne = i(Se);
        s(Se);
        var be = o(Se, 2), K = i(be);
        s(be), s(je), g(() => {
          x(Ve, r($e).name), Re(Ne, 1, `h-full rounded-full transition-all duration-500
										${r($e).code === "storming" ? "bg-orange-400/70" : r($e).code === "planning" ? "bg-blue-400/70" : r($e).code === "kanban" ? "bg-emerald-400/70" : "bg-purple-400/70"}`), dr(Ne, `width: ${r($e).percent ?? ""}%`), x(K, `${r($e).percent ?? ""}%`);
        }), d(j, je);
      }), s(M), s(N), d(W, N);
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
    }, Me = (W) => {
      var N = ex();
      He(N, 21, () => r(w), ct, (M, j) => {
        var $e = Z0(), je = i($e), qe = o(je, 2), Ve = i(qe, !0);
        s(qe);
        var Se = o(qe, 2), Ne = i(Se);
        {
          var be = (P) => {
            var te = Ds("waiting for gate decision");
            d(P, te);
          }, K = (P) => {
            var te = Ds();
            g(() => x(te, `working on "${r(j).active_session.division_id ?? ""}"`)), d(P, te);
          }, $ = (P) => {
            var te = Ds("running");
            d(P, te);
          };
          A(Ne, (P) => {
            r(j).status === "gate_pending" ? P(be) : r(j).active_session?.division_id ? P(K, 1) : P($, !1);
          });
        }
        s(Se);
        var E = o(Se, 2);
        {
          var F = (P) => {
            var te = X0(), Le = i(te);
            s(te), g((S, k) => x(Le, `${S ?? ""}+${k ?? ""} tok`), [
              () => r(j).active_session.tokens_in.toLocaleString(),
              () => r(j).active_session.tokens_out.toLocaleString()
            ]), d(P, te);
          };
          A(E, (P) => {
            r(j).active_session && P(F);
          });
        }
        s($e), g(() => {
          Re(je, 1, `w-2 h-2 rounded-full shrink-0
								${r(j).status === "gate_pending" ? "bg-amber-400 animate-pulse" : "bg-hecate-400 animate-pulse"}`), x(Ve, er[r(j).role]?.label ?? r(j).role);
        }), d(M, $e);
      }), s(N), d(W, N);
    };
    A(Fe, (W) => {
      r(w).length === 0 ? W(Pe) : W(Me, !1);
    });
  }
  var ce = o(Fe, 2);
  {
    var G = (W) => {
      var N = ax(), M = i(N);
      {
        var j = (Se) => {
          var Ne = tx(), be = i(Ne);
          s(Ne), g((K) => x(be, `${K ?? ""} completed`), [
            () => a().filter((K) => K.status === "completed").length
          ]), d(Se, Ne);
        }, $e = /* @__PURE__ */ we(() => a().filter((Se) => Se.status === "completed").length > 0);
        A(M, (Se) => {
          r($e) && Se(j);
        });
      }
      var je = o(M, 2);
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
    }, I = /* @__PURE__ */ we(() => a().filter((W) => W.status === "idle").length > 0 || a().filter((W) => W.status === "completed").length > 0);
    A(ce, (W) => {
      r(I) && W(G);
    });
  }
  s(ie), s(se), s(D), d(e, D);
  var H = mt(V);
  return l(), H;
}
At(["click"]);
kt(Vo, { onSelectDivision: {} }, [], [], { mode: "open" });
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
  const a = () => Ee(Et, "$isLoading", U), n = () => Ee(St, "$activeVenture", U), c = () => Ee(pr, "$sseStatus", U), l = () => Ee(Cn, "$aiModel", U), f = () => Ee(br, "$ventureError", U), v = () => Ee(wa, "$ventures", U), p = () => Ee(yn, "$showAIAssist", U), h = () => Ee(Ql, "$hasPendingGates", U), m = () => Ee(Aa, "$pendingGates", U), C = () => Ee(Ur, "$divisions", U), w = () => Ee(Yr, "$selectedDivision", U), V = () => Ee(qa, "$selectedPhase", U), D = () => Ee(bs, "$ventureStep", U), se = () => Ee(sa, "$bigPicturePhase", U), R = () => Ee(Ks, "$showEventStream", U), [U, ue] = Nt();
  let Ce = pt(t, "api", 7), ge = /* @__PURE__ */ ve(null), fe, ie = /* @__PURE__ */ ve(""), Fe = /* @__PURE__ */ ve(""), Pe = /* @__PURE__ */ ve(""), Me = /* @__PURE__ */ ve(!1), ce = /* @__PURE__ */ ve(!1), G = /* @__PURE__ */ ve(!1), I = /* @__PURE__ */ ve(!1), H;
  function W(K, $) {
    let E = K;
    if ($.trim()) {
      const k = $.toLowerCase();
      E = K.filter((q) => q.name.toLowerCase().includes(k) || q.brief && q.brief.toLowerCase().includes(k));
    }
    const F = [], P = [], te = [], Le = [];
    for (const k of E)
      Br(k.status, Fa) ? Le.push(k) : Br(k.status, to) || Br(k.status, ro) ? P.push(k) : k.phase === "initiated" || k.phase === "vision_refined" || k.phase === "vision_submitted" ? F.push(k) : k.phase === "discovery_completed" || k.phase === "designing" || k.phase === "planning" || k.phase === "crafting" || k.phase === "deploying" ? te.push(k) : F.push(k);
    const S = [];
    return F.length > 0 && S.push({ label: "Setup", ventures: F }), P.length > 0 && S.push({ label: "Discovery", ventures: P }), te.length > 0 && S.push({ label: "Building", ventures: te }), Le.length > 0 && S.push({ label: "Archived", ventures: Le }), S;
  }
  function N(K) {
    return K.filter(($) => !Br($.status, Fa)).sort(($, E) => (E.updated_at ?? "").localeCompare($.updated_at ?? "")).slice(0, 5);
  }
  async function M() {
    try {
      _(ge, await Ce().get("/health"), !0);
    } catch {
      _(ge, null);
    }
  }
  Qi(async () => {
    fl(Ce()), M(), fe = setInterval(M, 3e4), kr(), ms();
    const K = await pl();
    $n.set(K), wo(), H = fd();
  }), Kc(() => {
    fe && clearInterval(fe), dd(), H && H();
  });
  async function j() {
    if (!r(ie).trim()) return;
    await uo(r(ie).trim(), r(Fe).trim() || "") && (_(ie, ""), _(Fe, ""), _(Me, !1));
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
      var $ = nx(), E = i($), F = i(E);
      F.textContent = "◆", Dt(2), s(E), s($), d(K, $);
    }, Se = (K) => {
      var $ = wx(), E = it($), F = i(E), P = i(F), te = i(P);
      te.textContent = "◆";
      var Le = o(te, 4), S = i(Le), k = o(S, 2), q = i(k, !0);
      s(k), s(Le);
      var oe = o(Le, 2);
      ks(oe, {
        get currentModel() {
          return l();
        },
        onSelect: (ze) => Sn(ze)
      });
      var Be = o(oe, 4);
      wt(Be);
      var B = o(Be, 2);
      B.__click = () => _(Me, !r(Me));
      var O = i(B, !0);
      s(B), s(P), s(F);
      var J = o(F, 2), Te = i(J);
      {
        var Oe = (ze) => {
          var We = ox(), L = o(i(We), 2), z = i(L), Y = o(i(z), 2);
          wt(Y), s(z);
          var xe = o(z, 2), ae = o(i(xe), 2);
          wt(ae), s(xe), s(L);
          var pe = o(L, 2);
          {
            var Ie = (T) => {
              var re = ix(), he = i(re, !0);
              s(re), g(() => x(he, f())), d(T, re);
            };
            A(pe, (T) => {
              f() && T(Ie);
            });
          }
          var Je = o(pe, 2), b = i(Je);
          b.__click = j;
          var y = i(b, !0);
          s(b);
          var de = o(b, 2);
          de.__click = () => Er("Help me define a new venture. What should I consider? Ask me about the problem domain, target users, and core functionality."), de.textContent = "✦ AI Help", s(Je), s(We), g(
            (T, re) => {
              b.disabled = T, Re(b, 1, `px-4 py-2 rounded-lg text-xs font-medium transition-colors
									${re ?? ""}`), x(y, a() ? "Initiating..." : "Initiate Venture");
            },
            [
              () => !r(ie).trim() || a(),
              () => !r(ie).trim() || a() ? "bg-surface-600 text-surface-400 cursor-not-allowed" : "bg-hecate-600 text-surface-50 hover:bg-hecate-500"
            ]
          ), xt(Y, () => r(ie), (T) => _(ie, T)), xt(ae, () => r(Fe), (T) => _(Fe, T)), d(ze, We);
        };
        A(Te, (ze) => {
          r(Me) && ze(Oe);
        });
      }
      var Ke = o(Te, 2);
      {
        var Qe = (ze) => {
          var We = cx(), L = i(We);
          L.textContent = "◆";
          var z = o(L, 6);
          z.__click = () => _(Me, !0), s(We), d(ze, We);
        }, tt = (ze) => {
          const We = /* @__PURE__ */ we(() => W(v(), r(Pe)));
          var L = mx(), z = it(L);
          {
            var Y = (b) => {
              const y = /* @__PURE__ */ we(() => N(v()));
              var de = or(), T = it(de);
              {
                var re = (he) => {
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
                A(T, (he) => {
                  r(y).length > 0 && he(re);
                });
              }
              d(b, de);
            }, xe = /* @__PURE__ */ we(() => !r(Pe).trim() && v().filter((b) => !Br(b.status, Fa)).length > 3);
            A(z, (b) => {
              r(xe) && b(Y);
            });
          }
          var ae = o(z, 2);
          He(ae, 17, () => r(We), ct, (b, y) => {
            var de = or(), T = it(de);
            {
              var re = (Ae) => {
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
              A(T, (Ae) => {
                r(y).label === "Archived" ? Ae(re) : Ae(he, !1);
              });
            }
            d(b, de);
          });
          var pe = o(ae, 2);
          {
            var Ie = (b) => {
              var y = bx(), de = i(y);
              s(y), g(() => x(de, `No ventures matching "${r(Pe) ?? ""}"`)), d(b, y);
            }, Je = /* @__PURE__ */ we(() => r(We).length === 0 && r(Pe).trim());
            A(pe, (b) => {
              r(Je) && b(Ie);
            });
          }
          d(ze, L);
        };
        A(Ke, (ze) => {
          v().length === 0 && !r(Me) ? ze(Qe) : ze(tt, !1);
        });
      }
      s(J), s(E);
      var Ye = o(E, 2);
      {
        var at = (ze) => {
          var We = yx(), L = i(We);
          an(L, {}), s(We), d(ze, We);
        };
        A(Ye, (ze) => {
          p() && ze(at);
        });
      }
      g(() => {
        Re(S, 1, `inline-block w-1.5 h-1.5 rounded-full ${c() === "connected" ? "bg-success-400" : c() === "connecting" ? "bg-yellow-400 animate-pulse" : "bg-danger-400"}`), x(q, c() === "connected" ? `v${r(ge)?.version ?? "?"}` : c()), Re(B, 1, `px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
							${r(Me) ? "bg-surface-600 text-surface-300" : "bg-hecate-600 text-surface-50 hover:bg-hecate-500"}`), x(O, r(Me) ? "Cancel" : "+ New Venture");
      }), xt(Be, () => r(Pe), (ze) => _(Pe, ze)), d(K, $);
    }, Ne = (K) => {
      var $ = Dx(), E = it($);
      So(E, {});
      var F = o(E, 2), P = i(F);
      {
        var te = (Y) => {
          var xe = $x();
          xe.__click = () => {
            _(I, !0), _(G, !1);
          };
          var ae = i(xe);
          s(xe), g(() => x(ae, `${m().length ?? ""} gate${m().length !== 1 ? "s" : ""}`)), d(Y, xe);
        };
        A(P, (Y) => {
          h() && Y(te);
        });
      }
      var Le = o(P, 2);
      Le.__click = () => {
        _(I, !r(I)), r(I) && _(G, !1);
      };
      var S = o(Le, 2);
      S.__click = () => {
        _(G, !r(G)), r(G) && _(I, !1);
      };
      var k = o(S, 2), q = i(k), oe = o(q, 2), Be = i(oe, !0);
      s(oe), s(k), s(F);
      var B = o(F, 2), O = i(B);
      {
        var J = (Y) => {
          Fo(Y, {
            onSelectAgent: (xe) => {
              _(G, !0), _(I, !1);
            },
            onSelectGate: (xe) => {
              _(I, !0), _(G, !1);
            }
          });
        };
        A(O, (Y) => {
          (C().length > 0 || m().length > 0) && Y(J);
        });
      }
      var Te = o(O, 2), Oe = i(Te), Ke = i(Oe);
      {
        var Qe = (Y) => {
          Bo(Y, {});
        }, tt = (Y) => {
          Lo(Y, {});
        }, Ye = (Y) => {
          var xe = kx(), ae = it(xe);
          Oo(ae, {});
          var pe = o(ae, 2), Ie = i(pe);
          {
            var Je = (T) => {
              Do(T, {});
            }, b = (T) => {
              Po(T, {});
            }, y = (T) => {
              To(T, {});
            }, de = (T) => {
              Mo(T, {});
            };
            A(Ie, (T) => {
              V() === "storming" ? T(Je) : V() === "planning" ? T(b, 1) : V() === "kanban" ? T(y, 2) : V() === "crafting" && T(de, 3);
            });
          }
          s(pe), d(Y, xe);
        }, at = (Y) => {
          var xe = or(), ae = it(xe);
          {
            var pe = (T) => {
              var re = Sx(), he = i(re), Ae = i(he);
              en(Ae, {}), s(he);
              var ne = o(he, 2);
              {
                var X = (Z) => {
                  var _e = Cx(), ke = i(_e);
                  rn(ke, {}), s(_e), d(Z, _e);
                };
                A(ne, (Z) => {
                  R() && Z(X);
                });
              }
              s(re), d(T, re);
            }, Ie = (T) => {
              Ao(T, {});
            }, Je = (T) => {
              rs(T, { nextAction: "discovery" });
            }, b = (T) => {
              var re = Ax(), he = i(re), Ae = i(he);
              en(Ae, {}), s(he);
              var ne = o(he, 2);
              {
                var X = (Z) => {
                  var _e = Ex(), ke = i(_e);
                  rn(ke, {}), s(_e), d(Z, _e);
                };
                A(ne, (Z) => {
                  R() && Z(X);
                });
              }
              s(re), d(T, re);
            }, y = (T) => {
              rs(T, { nextAction: "identify" });
            }, de = (T) => {
              rs(T, { nextAction: "discovery" });
            };
            A(ae, (T) => {
              D() === "discovering" || se() !== "ready" ? T(pe) : D() === "initiated" || D() === "vision_refined" ? T(Ie, 1) : D() === "vision_submitted" ? T(Je, 2) : D() === "discovery_paused" ? T(b, 3) : D() === "discovery_completed" ? T(y, 4) : T(de, !1);
            });
          }
          d(Y, xe);
        }, ze = (Y) => {
          Vo(Y, {
            onSelectDivision: (xe) => {
              _(I, !1), _(G, !1);
            }
          });
        };
        A(Ke, (Y) => {
          r(I) ? Y(Qe) : r(G) ? Y(tt, 1) : w() ? Y(Ye, 2) : C().length === 0 ? Y(at, 3) : Y(ze, !1);
        });
      }
      s(Oe);
      var We = o(Oe, 2);
      jo(We, {}), s(Te);
      var L = o(Te, 2);
      {
        var z = (Y) => {
          an(Y, {});
        };
        A(L, (Y) => {
          p() && Y(z);
        });
      }
      s(B), g(() => {
        Re(Le, 1, `px-2 py-0.5 rounded transition-colors
					${r(I) ? "bg-amber-500/20 text-amber-300" : "text-surface-400 hover:text-surface-200 hover:bg-surface-700"}`), Re(S, 1, `px-2 py-0.5 rounded transition-colors
					${r(G) ? "bg-hecate-600/20 text-hecate-300" : "text-surface-400 hover:text-surface-200 hover:bg-surface-700"}`), Re(q, 1, `inline-block w-1.5 h-1.5 rounded-full ${c() === "connected" ? "bg-success-400" : c() === "connecting" ? "bg-yellow-400 animate-pulse" : "bg-danger-400"}`), x(Be, c() === "connected" ? `v${r(ge)?.version ?? "?"}` : c());
      }), d(K, $);
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
