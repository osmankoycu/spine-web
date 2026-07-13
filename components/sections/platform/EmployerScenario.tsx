"use client";

import { useEffect, useRef, useState } from "react";
import { UsersThree, Percent } from "@phosphor-icons/react/dist/ssr";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";

// The "Why this mix" scenario inside the employer window — a simplified take on
// the HR dashboard feature. Four plan archetypes are plotted by annual savings
// (x) and workforce fit (y); the one that lands highest in the "strong fit" band
// is what Heal recommends. Two sliders (headcount + employer contribution) drive
// the positions: raising contribution lifts fit, raising headcount grows savings.
// On scroll-into-view the sliders auto-sweep to a target so the Balanced plan
// rises into the recommend zone and lights up — but the user can also drag.

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

// Axis domains.
const SAV_MAX = 500; // $K
const FIT_MIN = 35;
const FIT_MAX = 95;
const FIT_ZONE = 75; // strong-fit threshold

type Arch = { id: string; label: string; sav: number; fit: number };

// Positions as a function of headcount H (25–250) and contribution C (50–90).
function compute(H: number, C: number): Arch[] {
  const h = (H - 100) / 150;
  const c = (C - 70) / 20;
  return [
    { id: "protection", label: "Protection-focused", sav: 90 + h * 60 - c * 40, fit: 90 + c * 3 - h * 2 },
    { id: "balanced", label: "Balanced", sav: 180 + h * 90 - c * 60, fit: 78 + c * 9 - h * 3 },
    { id: "family", label: "Family-friendly", sav: 175 + h * 80 - c * 50, fit: 68 + c * 5 - h },
    { id: "cost", label: "Cost-optimized", sav: 330 + h * 120 - c * 70, fit: 70 + c * 4 - h * 2 },
  ].map((a) => ({ ...a, sav: clamp(a.sav, 0, SAV_MAX), fit: clamp(a.fit, FIT_MIN, FIT_MAX) }));
}

// Recommend the plan sitting in the strong-fit band with the most savings.
function recommend(arches: Arch[]): string {
  const inZone = arches.filter((a) => a.fit >= FIT_ZONE);
  const pool = inZone.length ? inZone : arches;
  return pool.reduce((best, a) => (a.sav > best.sav ? a : best), pool[0]).id;
}

const START = { H: 40, C: 55 };
const TARGET = { H: 100, C: 70 };

// Distinct stroke per plan chip so the three carriers read as three separate
// picks. Muted, low-saturation hues — none close to the employer blue or the
// green "recommended" cue (soft pink / ochre / mauve).
const CHIP_BORDERS = ["border-[#d5a1b3]", "border-[#cbb079]", "border-[#b6a6c9]"];

// The three carrier plans each portfolio bundles, plus a one-line rationale.
// Shown between the map and the sliders; swaps whenever the recommendation does.
type Plan = { name: string; meta: string };
const PORTFOLIOS: Record<string, { why: string; plans: Plan[] }> = {
  balanced: {
    why: "A full spread — one plan for every kind of employee, value to premium.",
    plans: [
      { name: "Aetna HSA Bronze", meta: "Value · HDHP" },
      { name: "UHC Choice Gold", meta: "Standard · PPO" },
      { name: "UHC Choice Platinum", meta: "Premium · PPO" },
    ],
  },
  protection: {
    why: "Richer coverage and low out-of-pocket caps for a higher-need team.",
    plans: [
      { name: "UHC Choice Gold", meta: "Standard · PPO" },
      { name: "Aetna PPO Premier", meta: "Premium · PPO" },
      { name: "UHC Choice Platinum", meta: "Premium · PPO" },
    ],
  },
  family: {
    why: "Broad networks and dependent-friendly cost sharing for families.",
    plans: [
      { name: "UHC Choice Gold", meta: "Standard · PPO" },
      { name: "Aetna Family PPO", meta: "Standard · PPO" },
      { name: "Kaiser HMO Plus", meta: "Value · HMO" },
    ],
  },
  cost: {
    why: "Lean, HSA-first plans that keep premiums as low as possible.",
    plans: [
      { name: "Aetna HSA Bronze", meta: "Value · HDHP" },
      { name: "UHC HDHP Silver", meta: "Value · HDHP" },
      { name: "Cigna Local Plus", meta: "Value · HMO" },
    ],
  },
};

export function EmployerScenario() {
  const rootRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const [H, setH] = useState(START.H);
  const [C, setC] = useState(START.C);

  const arches = compute(H, C);
  const recId = recommend(arches);
  const rec = arches.find((a) => a.id === recId) ?? arches[0];
  const portfolio = PORTFOLIOS[recId] ?? PORTFOLIOS.balanced;

  // Auto-sweep once, when the window scrolls into view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        io.disconnect();
        if (reduce) {
          setH(TARGET.H);
          setC(TARGET.C);
          return;
        }
        const proxy = { H: START.H, C: START.C };
        tweenRef.current = gsap.to(proxy, {
          H: TARGET.H,
          C: TARGET.C,
          duration: 1.7,
          ease: "power2.inOut",
          onUpdate: () => {
            setH(Math.round(proxy.H));
            setC(Math.round(proxy.C));
          },
        });
      },
      { threshold: 0, rootMargin: "-15% 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Any manual drag cancels the auto-sweep and takes over.
  const takeOver = () => {
    startedRef.current = true;
    tweenRef.current?.kill();
  };

  return (
    <div ref={rootRef} className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-start justify-between px-4 pt-4 sm:px-5">
        <div>
          <div className="text-[15px] font-extrabold leading-snug tracking-[-0.01em] text-[#15140f]">
            Spine recommends the{" "}
            <span className="text-[#2a8b3f]">{rec.label}</span> mix
          </div>
          <div className="mt-1 text-[12px] leading-snug text-[#8a897f]">
            The best balance of savings and fit for this open enrollment.
          </div>
        </div>
        <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-[#f1f1ef] px-2.5 py-1 text-[11px] font-bold text-[#8a897f] sm:inline-flex">
          <span className="size-1.5 rounded-full bg-[#b9b9b3]" />
          Map
        </span>
      </div>

      {/* Plot */}
      <div className="relative min-h-[220px] flex-1 px-4 pb-1 pt-4 sm:px-5">
        {/* inner plot area (space for axis labels: left + bottom) */}
        <div className="absolute inset-y-4 left-[42px] right-[42px] bottom-7">
          <div className="relative h-full w-full rounded-[10px] bg-[#f4f4f2]">
            {/* strong-fit zone (fit >= 75) */}
            <div
              className="absolute inset-x-0 top-0 rounded-t-[10px] bg-[#e7f4ea]"
              style={{ height: `${((FIT_MAX - FIT_ZONE) / (FIT_MAX - FIT_MIN)) * 100}%` }}
            >
              <span className="absolute right-2.5 top-2 text-[10px] font-bold uppercase tracking-[0.04em] text-[#2a8b3f]">
                Strong fit — Spine recommends here
              </span>
            </div>
            {/* zone divider line (y = 75) */}
            <div
              className="absolute inset-x-0 border-t border-dashed border-[#9ccfa8]"
              style={{ top: `${((FIT_MAX - FIT_ZONE) / (FIT_MAX - FIT_MIN)) * 100}%` }}
            />
            {/* vertical divider ($250K) */}
            <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-[#dcdcd7]" />

            {/* bubbles */}
            {arches.map((a) => {
              const sel = a.id === recId;
              const left = `${(a.sav / SAV_MAX) * 100}%`;
              const top = `${(1 - (a.fit - FIT_MIN) / (FIT_MAX - FIT_MIN)) * 100}%`;
              return (
                <div
                  key={a.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 transition-[left,top] duration-500 ease-out"
                  style={{ left, top }}
                >
                  <div className="relative grid place-items-center">
                    {sel && (
                      <span className="absolute size-11 rounded-full bg-[#2a8b3f]/20" />
                    )}
                    <span
                      className={cn(
                        "rounded-full transition-colors duration-300",
                        sel ? "size-7 bg-[#2a8b3f]" : "size-[26px] bg-[#b9b9b3]",
                      )}
                    />
                    <span
                      className={cn(
                        "absolute left-1/2 top-[calc(100%+4px)] -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold",
                        sel ? "text-[#15140f]" : "text-[#8a897f]",
                      )}
                    >
                      {a.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* y-axis ticks */}
        <div className="absolute left-4 top-4 bottom-7 flex w-[34px] flex-col justify-between text-right text-[10px] font-semibold text-[#a9a9a3]">
          <span>95</span>
          <span>{FIT_ZONE}</span>
          <span>35</span>
        </div>
        {/* x-axis ticks */}
        <div className="absolute bottom-1.5 left-[42px] right-[42px] flex justify-between text-[10px] font-semibold text-[#a9a9a3]">
          <span>$0</span>
          <span>$250K</span>
          <span>$500K</span>
        </div>
      </div>

      {/* Portfolio contents — the three plans in the recommended mix + why it
          was picked. Simple by design; re-renders when the recommendation
          changes as the sliders move. */}
      <div className="border-t border-[#ededea] px-4 py-3 sm:px-5">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[12px] font-extrabold text-[#2a8b3f]">
            {rec.label} portfolio
          </span>
          <span className="text-[11px] font-semibold text-[#a9a9a3]">
            · 3 plans included
          </span>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {portfolio.plans.map((p, i) => (
            <div
              key={p.name}
              className={cn(
                "rounded-lg border-[1.5px] bg-white px-2.5 py-1.5",
                CHIP_BORDERS[i % CHIP_BORDERS.length],
              )}
            >
              <div className="truncate text-[11.5px] font-bold text-[#15140f]">
                {p.name}
              </div>
              <div className="mt-0.5 truncate text-[9.5px] font-bold uppercase tracking-[0.04em] text-[#a9a9a3]">
                {p.meta}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sliders */}
      <div className="border-t border-[#ededea] bg-white px-4 py-3.5 sm:px-5">
        <div className="mb-2.5 flex items-center gap-2">
          <span className="text-[12px] font-extrabold text-[#15140f]">Adjust scenario</span>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#2a8b3f]">
            <span className="size-1.5 rounded-full bg-[#2a8b3f]" />
            LIVE
          </span>
        </div>
        <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
          <SliderRow
            icon={<UsersThree size={15} weight="bold" />}
            label="Headcount"
            value={H}
            display={`${H}`}
            min={25}
            max={250}
            step={5}
            onChange={(v) => {
              takeOver();
              setH(v);
            }}
          />
          <SliderRow
            icon={<Percent size={15} weight="bold" />}
            label="Contribution"
            value={C}
            display={`${C}%`}
            min={0}
            max={100}
            step={1}
            onChange={(v) => {
              takeOver();
              setC(v);
            }}
          />
        </div>
      </div>
    </div>
  );
}

function SliderRow({
  icon,
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  // Fill the track up to the current value with light blue so how "full" the
  // slider is reads at a glance.
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-1.5 text-[#6e6e68]">
        <span className="text-cobalt-400">{icon}</span>
        <span className="text-[12px] font-semibold">{label}</span>
        <span className="ml-auto text-[13px] font-extrabold text-[#15140f]">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        style={{
          background: `linear-gradient(to right, var(--color-cobalt-200) ${pct}%, #e6e6e2 ${pct}%)`,
        }}
        className="scenario-slider h-1.5 w-full cursor-pointer appearance-none rounded-full"
      />
    </div>
  );
}
