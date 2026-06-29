import { gsap } from "@/lib/gsap";

// Collision tag field (Section 3.5) — fully FORCE-BASED (penalty method) so every
// pill moves with eased, animated motion, never a hard snap. The center content
// (headline lines / subtitle / CTA) are immovable bodies that GROW in as each
// element appears; while a body overlaps a pill it applies a smooth outward
// SPRING force (∝ penetration) instead of teleporting it — so the pill
// accelerates out, eases to rest, and rings a touch (under-damped home spring).
// Pills also soft-repel each other (penalty spring + damping) so the shove
// cascades smoothly through the field. No precomputed targets: the clearing is
// emergent, and because nothing is edge-relative it's stable across resizes.
// Pills may overflow the field/viewport — that's intended.
//
// Writes ONLY translate x/y via gsap.quickSetter → composes with any scale/
// opacity tweens (e.g. the INTRO pop-in): different matrix channels.

type Tag = {
  el: HTMLElement;
  hx: number; // home center (stage coords)
  hy: number;
  hw: number; // half width / height
  hh: number;
  x: number; // current center
  y: number;
  vx: number; // velocity
  vy: number;
  fx: number; // force accumulator (this step)
  fy: number;
  side: number; // tiebreak push dir when a pill sits dead-center
  setX: (v: number) => void;
  setY: (v: number) => void;
};

type Obstacle = {
  el: HTMLElement;
  ox: number; // center (stage coords)
  oy: number;
  ohw: number; // half size (live)
  ohh: number;
  padX: number;
  padY: number;
  strength: number; // 0..1 grow factor — tweened by the controller via obstacle(i)
  holdW: number; // held half-width floor (anti mid-swap flicker), 0 = off
  holdUntil: number;
};

type PadOpt = { padX?: number; padY?: number } | undefined;

// ── tunables (top-level so they're easy to art-direct) ──────────────────────
// Every spring below is paired with a near-CRITICAL damper so nothing rings or
// jitters: a pill glides to rest and stops. (crit damp c ≈ 2·√k.)
const W = 7; // omega — home spring frequency (rad/s); holds the grid, ~0.8s settle
const Z = 1.1; // zeta — over-damped → the field eases to a dead-still rest
const K = W * W; // spring stiffness
const C = 2 * Z * W; // spring damping
const HOME_CAP = 400; // SATURATE the home pull: beyond ~40px displacement the
//   inward force stops growing, so pills shoved into the edge piles flow out and
//   spread (decompressing the pile) instead of ramming together → no jitter.
const PAD_X = 56; // breathing room a body keeps around itself, x (pills stand back)
const PAD_Y = 14; // …y (smaller → tighter vertical band)
// Min gap kept between two pills when they collide. Asymmetric: a roomy
// HORIZONTAL gap so pushed-aside pills don't stick together (their home rows are
// spread ~60px+ by justify-between, so this stays well under that → no resting
// tension), and a small VERTICAL gap that stays below the 10px row gap so
// stacked rows don't fight at rest.
const GAP_X = 32;
const GAP_Y = 8;
const PUSH_STIFF = 2200; // body→pill penalty stiffness (how firmly a pill is cleared)
const PUSH_DAMP = 185; // body→pill damping — heavily over-damped so the growing
//   text body GLIDES pills aside (terminal speed ≈ stiff·pen/damp) instead of
//   flinging them (no reveal "burst"/scatter); also calms the rest.
const PAIR_STIFF = 1500; // pill→pill penalty stiffness (cascade)
const PAIR_DAMP = 115; // pill→pill damping (over critical → kills residual
//   oscillation in the squeezed lower-region pile)
const VMAX = 1000; // velocity clamp (backstop so nothing flings during reveal/swap)
const DT = 1 / 240; // tiny fixed step → ~4 substeps/frame, so the strong damping
const MAXSUB = 6; //    (PUSH/PAIR) stays stable in explicit Euler (damp·dt < 1)
const SLEEP_V = 26; // px/s — settle deadzone: catch the slow low-force drift the
const SLEEP_F = 420; // home-cap leaves behind (reveal motion is far faster, untouched)
const CURSOR_FORCE = 1700; // ambient mouse-repel (step 5)
const CURSOR_RADIUS = 150;

export class TagFlow {
  private readonly stage: HTMLElement;
  private tags: Tag[] = [];
  private obs: Obstacle[] = [];
  private cursor: { x: number; y: number } | null = null;
  private repel = false;
  private active = false;
  private running = false;
  private acc = 0;
  private scale = 1; // the whole hero is CSS-scaled to fit; translate writes ÷ this

  constructor(stage: HTMLElement) {
    this.stage = stage;
    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { __tf?: TagFlow }).__tf = this;
    }
    this.scan();
  }

  // (Re)collect every [data-tag] in the stage and build a fresh body per pill.
  // Called on construction AND at each measureHome, so tags added after mount
  // (the viewport-filling filler wall, which renders client-side once the area
  // is measured) are picked up the next time the field is (re)measured.
  private scan(): void {
    const els = gsap.utils.toArray<HTMLElement>("[data-tag]", this.stage);
    this.tags = els.map((el, i) => ({
      el,
      hx: 0,
      hy: 0,
      hw: 0,
      hh: 0,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      fx: 0,
      fy: 0,
      side: i % 2 === 0 ? -1 : 1,
      setX: gsap.quickSetter(el, "x", "px") as (v: number) => void,
      setY: gsap.quickSetter(el, "y", "px") as (v: number) => void,
    }));
  }

  /** Capture grid home positions (transforms cleared first). Resets motion. */
  measureHome(): void {
    this.scan();
    for (const t of this.tags) {
      t.setX(0);
      t.setY(0);
    }
    // The hero is uniformly CSS-scaled to fit the stage; detect that factor
    // (gBCR is post-scale, offsetWidth is the layout size) so translate writes —
    // which live in the unscaled local space — can divide it out. Tags AND the
    // text obstacles are inside the same scaled wrapper, so the field stays
    // self-consistent (no jamming).
    const t0 = this.tags[0];
    this.scale =
      t0 && t0.el.offsetWidth
        ? t0.el.getBoundingClientRect().width / t0.el.offsetWidth
        : 1;
    const s = this.stage.getBoundingClientRect();
    for (const t of this.tags) {
      const r = t.el.getBoundingClientRect();
      t.hw = r.width / 2;
      t.hh = r.height / 2;
      t.hx = r.left - s.left + t.hw;
      t.hy = r.top - s.top + t.hh;
      t.x = t.hx;
      t.y = t.hy;
      t.vx = 0;
      t.vy = 0;
    }
  }

  /** Define the center elements that collide with the field (one body each). */
  setObstacles(els: (HTMLElement | null)[], opts?: PadOpt[]): void {
    this.obs = els
      .map((el, i) => ({ el, opt: opts?.[i] }))
      .filter((o): o is { el: HTMLElement; opt: PadOpt } => o.el != null)
      .map(({ el, opt }) => ({
        el,
        ox: 0,
        oy: 0,
        ohw: 0,
        ohh: 0,
        padX: opt?.padX ?? PAD_X,
        padY: opt?.padY ?? PAD_Y,
        strength: 0,
        holdW: 0,
        holdUntil: 0,
      }));
  }

  /** Back-compat alias. */
  setTextElements(els: (HTMLElement | null)[]): void {
    this.setObstacles(els);
  }

  /** Grow handle for body i — controller does gsap.to(obstacle(i), {strength:1}). */
  obstacle(i: number): Obstacle | undefined {
    return this.obs[i];
  }

  /** Hold body i's width for `ms` (anti-flicker during a word swap). */
  holdWidth(i: number, ms: number): void {
    const o = this.obs[i];
    if (!o) return;
    o.holdW = o.ohw;
    o.holdUntil = performance.now() + ms;
  }

  setActive(v: boolean): void {
    this.active = v;
  }

  setRepel(v: boolean): void {
    this.repel = v;
    if (!v) this.cursor = null;
  }

  setCursor(clientX: number, clientY: number): void {
    const s = this.stage.getBoundingClientRect();
    this.cursor = { x: clientX - s.left, y: clientY - s.top };
  }

  clearCursor(): void {
    this.cursor = null;
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.acc = 0;
    gsap.ticker.add(this.frame);
  }

  stop(): void {
    if (!this.running) return;
    this.running = false;
    gsap.ticker.remove(this.frame);
  }

  /** Run to a steady state synchronously (reduced motion). */
  settle(iters: number): void {
    this.measureObs(true);
    for (const o of this.obs) o.strength = 1;
    for (let i = 0; i < iters; i++) this.step(DT);
    const inv = 1 / this.scale;
    for (const t of this.tags) {
      t.setX((t.x - t.hx) * inv);
      t.setY((t.y - t.hy) * inv);
    }
  }

  // gsap.ticker: time(s), deltaTime(ms). Fixed-step accumulator → frame-rate
  // independent and hitch-proof.
  private frame = (_time: number, deltaTime: number): void => {
    if (!this.running) return;
    this.measureObs(false);
    let dt = (deltaTime || 16.67) / 1000;
    const cap = DT * MAXSUB;
    if (dt > cap) dt = cap;
    this.acc += dt;
    let n = 0;
    while (this.acc >= DT && n < MAXSUB) {
      this.step(DT);
      this.acc -= DT;
      n++;
    }
    const inv = 1 / this.scale;
    for (const t of this.tags) {
      t.setX((t.x - t.hx) * inv);
      t.setY((t.y - t.hy) * inv);
    }
  };

  private measureObs(now0: boolean): void {
    const s = this.stage.getBoundingClientRect();
    const now = now0 ? 0 : performance.now();
    for (const o of this.obs) {
      const r = o.el.getBoundingClientRect();
      o.ox = r.left - s.left + r.width / 2;
      o.oy = r.top - s.top + r.height / 2;
      o.ohw = r.width / 2;
      o.ohh = r.height / 2;
      if (!now0 && o.holdUntil > now && o.holdW > o.ohw) o.ohw = o.holdW;
    }
  }

  private step(dt: number): void {
    const tags = this.tags;
    const n = tags.length;

    // 1. Base force: saturating home spring (+ damping + cursor repel).
    const cap = HOME_CAP * this.scale;
    for (const t of tags) {
      const dxh = t.x - t.hx;
      const dyh = t.y - t.hy;
      const dh = Math.hypot(dxh, dyh);
      let fx = -C * t.vx;
      let fy = -C * t.vy;
      if (dh > 0.001) {
        const mag = Math.min(K * dh, cap) / dh; // linear near home, capped far out
        fx -= mag * dxh;
        fy -= mag * dyh;
      }
      if (this.repel && this.cursor) {
        const dx = t.x - this.cursor.x;
        const dy = t.y - this.cursor.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 0.01 && dist < CURSOR_RADIUS) {
          const u = dist / CURSOR_RADIUS;
          const m = (CURSOR_FORCE * (1 - (3 * u * u - 2 * u * u * u))) / dist;
          fx += dx * m;
          fy += dy * m;
        }
      }
      t.fx = fx;
      t.fy = fy;
    }

    // 2. Smooth outward push from each growing text body (penalty spring).
    if (this.active) {
      for (let i = 0; i < n; i++) {
        for (const o of this.obs) this.pushText(tags[i], o);
      }
    }

    // 3. Smooth pill↔pill repulsion (penalty spring + damping) → the cascade.
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) this.repel2(tags[i], tags[j]);
    }

    // Velocity/force thresholds live in design space; the sim runs in post-scale
    // px, so scale them to match.
    const sc = this.scale;
    const vmax = VMAX * sc;

    // 4. Integrate (semi-implicit Euler) with a velocity clamp. The Y axis is
    // LOCKED: pills part purely SIDEWAYS (left/right) and never move up/down, so
    // the field opens around the headline with no vertical jostling. (Vertical
    // forces are still summed above but discarded here.)
    for (const t of tags) {
      t.vx += t.fx * dt;
      if (t.vx > vmax) t.vx = vmax;
      else if (t.vx < -vmax) t.vx = -vmax;
      t.x += t.vx * dt;
      t.vy = 0;
      t.y = t.hy;
    }

    // 5. Settle deadzone: at equilibrium (tiny speed + low net force) stop.
    const sleepV = SLEEP_V * sc;
    const sleepF = SLEEP_F * sc;
    for (const t of tags) {
      if (Math.abs(t.vx) < sleepV && Math.abs(t.fx) < sleepF) t.vx = 0;
    }
  }

  // Outward penalty force from a (growing) text body. On-line pills are pushed
  // SIDEWAYS (horizontal lane, may overflow edges); pills merely grazing from the
  // row above/below get a short vertical push.
  private pushText(t: Tag, o: Obstacle): void {
    const g = o.strength;
    if (g <= 0.02) return;
    // pad is a design-space distance; the measured sizes are post-scale → ×scale.
    const ehx = (o.ohw + o.padX * this.scale) * g + t.hw;
    const ehy = (o.ohh + o.padY * this.scale) * g + t.hh;
    const dx = t.x - o.ox;
    const dy = t.y - o.oy;
    const penX = ehx - Math.abs(dx);
    const penY = ehy - Math.abs(dy);
    if (penX <= 0 || penY <= 0) return;
    // ALWAYS clear SIDEWAYS (horizontal). Every penetrating pill — whether on the
    // text's own row or merely grazing it from the row above/below — slides out
    // along x, so it keeps its HOME Y and the vertical row spacing stays uniform
    // around the (tall) headline. (The old code nudged grazing rows vertically,
    // which opened big gaps in the rows the text fell across.) A fixed axis also
    // means no per-frame axis flip → no jitter.
    const nrm = dx < 0 ? -1 : dx > 0 ? 1 : t.side;
    t.fx += nrm * penX * PUSH_STIFF - t.vx * PUSH_DAMP; // spring + damper
  }

  // Soft pill↔pill separation along the min-overlap axis (penalty + damping).
  private repel2(a: Tag, b: Tag): void {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const ox = a.hw + b.hw + GAP_X * this.scale - Math.abs(dx);
    const oy = a.hh + b.hh + GAP_Y * this.scale - Math.abs(dy);
    if (ox <= 0 || oy <= 0) return;
    if (ox < oy) {
      const nrm = dx < 0 ? -1 : 1;
      const vrel = (b.vx - a.vx) * nrm;
      const f = ox * PAIR_STIFF - vrel * PAIR_DAMP;
      a.fx -= nrm * f;
      b.fx += nrm * f;
    } else {
      const nrm = dy < 0 ? -1 : 1;
      const vrel = (b.vy - a.vy) * nrm;
      const f = oy * PAIR_STIFF - vrel * PAIR_DAMP;
      a.fy -= nrm * f;
      b.fy += nrm * f;
    }
  }

  destroy(): void {
    this.stop();
    for (const t of this.tags) {
      t.setX(0);
      t.setY(0);
    }
  }
}
