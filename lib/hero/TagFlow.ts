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
// Writes ONLY translate x/y via gsap.quickSetter → composes with the master
// timeline's scale/opacity tween (STATS pop-down): different matrix channels.

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
const Z = 0.85; // zeta — well-damped → smooth ease-out, no bounce
const K = W * W; // spring stiffness
const C = 2 * Z * W; // spring damping
const PAD_X = 40; // breathing room a body keeps around itself, x (pills stand back)
const PAD_Y = 14; // …y (smaller → tighter vertical band)
const GAP = 18; // min gap between two pills (matches the roomier grid spacing)
const PUSH_STIFF = 2200; // body→pill penalty stiffness (how firmly a pill is cleared)
const PUSH_DAMP = 80; // body→pill damping (≈ critical for PUSH_STIFF → no jitter)
const PAIR_STIFF = 1500; // pill→pill penalty stiffness (cascade)
const PAIR_DAMP = 60; // pill→pill damping (≈ critical → smooth, no bounce)
const VMAX = 2600; // velocity clamp
const DT = 1 / 120; // small fixed step → 2 substeps/frame → stiff springs stay stable
const MAXSUB = 4;
const SLEEP_V = 5; // px/s — settle deadzone (with low net force)
const SLEEP_F = 130; // net-force deadzone
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

  constructor(stage: HTMLElement) {
    this.stage = stage;
    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { __tf?: TagFlow }).__tf = this;
    }
    const els = gsap.utils.toArray<HTMLElement>("[data-tag]", stage);
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
    for (const t of this.tags) {
      t.setX(0);
      t.setY(0);
    }
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
    for (const t of this.tags) {
      t.setX(t.x - t.hx);
      t.setY(t.y - t.hy);
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
    for (const t of this.tags) {
      t.setX(t.x - t.hx);
      t.setY(t.y - t.hy);
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

    // 1. Base force: under-damped home spring (+ cursor repel).
    for (const t of tags) {
      let fx = -K * (t.x - t.hx) - C * t.vx;
      let fy = -K * (t.y - t.hy) - C * t.vy;
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

    // 4. Integrate (semi-implicit Euler) with a velocity clamp.
    for (const t of tags) {
      t.vx += t.fx * dt;
      t.vy += t.fy * dt;
      const sp = Math.hypot(t.vx, t.vy);
      if (sp > VMAX) {
        const k = VMAX / sp;
        t.vx *= k;
        t.vy *= k;
      }
      t.x += t.vx * dt;
      t.y += t.vy * dt;
    }

    // 5. Settle deadzone: at equilibrium (tiny speed + low net force) stop.
    for (const t of tags) {
      if (Math.hypot(t.vx, t.vy) < SLEEP_V && Math.hypot(t.fx, t.fy) < SLEEP_F) {
        t.vx = 0;
        t.vy = 0;
      }
    }
  }

  // Outward penalty force from a (growing) text body. On-line pills are pushed
  // SIDEWAYS (horizontal lane, may overflow edges); pills merely grazing from the
  // row above/below get a short vertical push.
  private pushText(t: Tag, o: Obstacle): void {
    const g = o.strength;
    if (g <= 0.02) return;
    const ehx = (o.ohw + o.padX) * g + t.hw;
    const ehy = (o.ohh + o.padY) * g + t.hh;
    const dx = t.x - o.ox;
    const dy = t.y - o.oy;
    const penX = ehx - Math.abs(dx);
    const penY = ehy - Math.abs(dy);
    if (penX <= 0 || penY <= 0) return;
    // Classify the pill by its HOME row, not its live position — otherwise a pill
    // drifting across the threshold would flip its push axis every frame and
    // oscillate forever (jitter). Home-based → the axis is fixed, so it settles.
    const onLine = Math.abs(t.hy - o.oy) < o.ohh + t.hh * 0.5;
    if (onLine) {
      const nrm = dx < 0 ? -1 : dx > 0 ? 1 : t.side;
      t.fx += nrm * penX * PUSH_STIFF - t.vx * PUSH_DAMP; // spring + damper
    } else {
      const nrm = dy < 0 ? -1 : 1;
      t.fy += nrm * penY * PUSH_STIFF - t.vy * PUSH_DAMP;
    }
  }

  // Soft pill↔pill separation along the min-overlap axis (penalty + damping).
  private repel2(a: Tag, b: Tag): void {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const ox = a.hw + b.hw + GAP - Math.abs(dx);
    const oy = a.hh + b.hh + GAP - Math.abs(dy);
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
