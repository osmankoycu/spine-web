"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import { benchmarkBand } from "@/lib/audit/auditEngine";
import { US_STATES } from "@/lib/audit/usStates";
import { track } from "@/lib/audit/track";
import type { AuditVariant } from "@/lib/audit/ycVariant";
import { IconArrowRight, IconChevronDown, IconLock, IconTimer } from "./icons";

// Step 0: the hook. Three inputs are live before any signup; every move
// re-renders the "companies like yours typically pay" band with a fast springy
// tween. The CTA hands off to the flow below (step 1).

export type PreviewInputs = {
  headcount: number;
  state: string; // 2-letter code, or "" for the national average
  avgAge: number;
};

export const AGE_PRESETS = [
  { label: "Mostly 20s", age: 27 },
  { label: "Mostly 30s", age: 34 },
  { label: "Mixed ages", age: 40 },
  { label: "40s and up", age: 48 },
] as const;

// Fixed $/employee/mo domain for the band track, so the band visibly travels
// as the inputs move (roughly HI-young to AK-older across the tables).
const DOMAIN_LOW = 500;
const DOMAIN_HIGH = 1600;

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export function BenchmarkPreview({
  value,
  onChange,
  onCta,
  variant,
  bridge,
}: {
  value: PreviewInputs;
  onChange: (v: PreviewInputs) => void;
  onCta: () => void;
  variant: AuditVariant | null;
  bridge?: React.ReactNode; // quiet cross-funnel card when the team reads early-stage
}) {
  const lowRef = useRef<HTMLSpanElement>(null);
  const highRef = useRef<HTMLSpanElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  // Numbers tween through this proxy; the first effect run seeds it with the
  // current band, so the mount pass has nothing to animate (SSR text is
  // already correct).
  const proxyRef = useRef<{ low: number; high: number } | null>(null);
  const touchedRef = useRef<Set<string>>(new Set());

  const band = benchmarkBand(value);

  const pct = (pepm: number) =>
    Math.min(100, Math.max(0, ((pepm - DOMAIN_LOW) / (DOMAIN_HIGH - DOMAIN_LOW)) * 100));
  const leftPct = pct(band.pepmLow);
  const widthPct = Math.max(4, pct(band.pepmHigh) - leftPct);

  useEffect(() => {
    if (proxyRef.current === null) {
      proxyRef.current = { low: band.pepmLow, high: band.pepmHigh };
    }
    const proxy = proxyRef.current;
    const write = () => {
      if (lowRef.current) lowRef.current.textContent = usd(proxy.low);
      if (highRef.current) highRef.current.textContent = usd(proxy.high);
    };
    if (prefersReducedMotion()) {
      proxy.low = band.pepmLow;
      proxy.high = band.pepmHigh;
      write();
      if (bandRef.current) {
        gsap.set(bandRef.current, { left: `${leftPct}%`, width: `${widthPct}%` });
      }
      return;
    }
    gsap.to(proxy, {
      low: band.pepmLow,
      high: band.pepmHigh,
      duration: 0.55,
      ease: "expo.out",
      overwrite: "auto",
      onUpdate: write,
    });
    if (bandRef.current) {
      gsap.to(bandRef.current, {
        left: `${leftPct}%`,
        width: `${widthPct}%`,
        duration: 0.55,
        ease: "back.out(1.2)",
        overwrite: "auto",
      });
    }
  }, [band.pepmLow, band.pepmHigh, leftPct, widthPct]);

  // First touch per control → one funnel event each, never per keystroke.
  const touched = (control: string) => {
    if (touchedRef.current.has(control)) return;
    touchedRef.current.add(control);
    track("audit_preview_interacted", {
      funnel: "audit",
      control,
      ...(variant ? { ref: variant.ref } : {}),
    });
  };

  const sliderPct = ((value.headcount - 5) / (200 - 5)) * 100;

  return (
    // No surface of its own: the page runs one uniform background, like the
    // scan does.
    <section>
      {/* Same column as the steps below and as the scan, so every card on the
          funnel surface lands on the identical width. No fixed site header
          above either, so no top clearance. */}
      <div className="mx-auto w-full max-w-[1080px] px-6 pb-8 pt-2 sm:pt-6 md:px-10">
        {/* ── Hero copy ── */}
        <div className="mx-auto max-w-[780px] text-center">
          {variant ? (
            <div className="inline-flex items-center rounded-pill border border-orange-150 bg-orange-100 px-4 py-1.5 text-[12.5px] font-extrabold text-orange-ink">
              {variant.eyebrow}
            </div>
          ) : (
            <div className="text-[11.5px] font-extrabold uppercase tracking-[0.16em] text-orange-700">
              Instant benefits audit
            </div>
          )}
          <h1 className="mt-3 text-[27px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[34px]">
            <span className="text-ink">Find out if you&apos;re overpaying</span>
            <br />
            <span className="text-orange">for health insurance.</span>
          </h1>
          <p className="mx-auto mt-3 max-w-[520px] text-[14.5px] leading-[1.55] text-body-2">
            Move the three inputs and watch the market band. Drop in your census
            and it gets real. Free, carriers pay us, not you.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-muted">
            <span className="inline-flex items-center gap-1.5">
              <IconTimer size={15} className="text-orange" />
              About 90 seconds
            </span>
            <span className="inline-flex items-center gap-1.5">
              <IconLock size={15} className="text-orange" />
              Your census never leaves your browser
            </span>
          </div>
          {variant && (
            <p className="mt-3 text-[14.5px] font-semibold text-ink-2">{variant.note}</p>
          )}
        </div>

        {/* ── The instrument ── */}
        <div className="mt-8 rounded-[24px] border border-hairline bg-white p-6 shadow-[0_30px_80px_-40px_rgba(20,20,18,0.35)] sm:p-8">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
            {/* Controls */}
            <div className="space-y-7">
              <div>
                <div className="flex items-baseline justify-between">
                  <label htmlFor="audit-headcount" className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-ink-2">
                    Team size
                  </label>
                  <span className="text-[15px] font-extrabold tabular-nums text-ink">
                    {value.headcount} employees
                  </span>
                </div>
                <input
                  id="audit-headcount"
                  type="range"
                  min={5}
                  max={200}
                  step={1}
                  value={value.headcount}
                  onChange={(e) => {
                    touched("headcount");
                    onChange({ ...value, headcount: +e.target.value });
                  }}
                  style={{
                    background: `linear-gradient(to right, var(--color-orange) ${sliderPct}%, var(--color-grey-pill) ${sliderPct}%)`,
                  }}
                  className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-pill outline-none [&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-pill [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-orange [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(20,20,18,0.3)] [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-pill [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-orange"
                />
              </div>

              <div>
                <label htmlFor="audit-state" className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-ink-2">
                  State
                </label>
                <div className="relative mt-3">
                  <select
                    id="audit-state"
                    value={value.state}
                    onChange={(e) => {
                      touched("state");
                      onChange({ ...value, state: e.target.value });
                    }}
                    className="w-full cursor-pointer appearance-none rounded-2xl border border-black/15 bg-white px-5 py-3.5 text-[16px] text-ink outline-none transition-colors focus:border-orange focus:ring-4 focus:ring-orange/15"
                  >
                    <option value="">Anywhere, USA</option>
                    {US_STATES.map((s) => (
                      <option key={s.code} value={s.code}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  <IconChevronDown
                    size={18}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-grey-text"
                  />
                </div>
              </div>

              <div>
                <span className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-ink-2">
                  Team age
                </span>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
                  {AGE_PRESETS.map((p) => {
                    const active = value.avgAge === p.age;
                    return (
                      <button
                        key={p.label}
                        type="button"
                        aria-pressed={active}
                        onClick={() => {
                          touched("age");
                          onChange({ ...value, avgAge: p.age });
                        }}
                        className={`cursor-pointer rounded-pill px-4 py-2.5 text-[14px] font-semibold transition-colors ${
                          active
                            ? "bg-black text-white"
                            : "bg-grey-pill text-ink-2 hover:bg-grey-pill/70"
                        }`}
                      >
                        {p.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Live band */}
            <div className="flex flex-col justify-between rounded-[20px] bg-surface-inset p-6 ring-1 ring-hairline sm:p-8">
              <div>
                <div className="text-[13.5px] font-medium text-body-2">
                  Companies like yours typically pay
                </div>
                {/* No tabular-nums here: Schibsted Grotesk gives the comma a
                    full digit-width tabular cell, rendering "$1 , 120". The
                    0.55s tween churns every digit anyway, so proportional
                    figures don't visibly jitter. */}
                <div className="mt-2 text-[27px] font-extrabold tracking-[-0.03em] text-ink sm:text-[38px] lg:text-[46px]">
                  <span ref={lowRef}>{usd(band.pepmLow)}</span>
                  <span className="px-1.5 text-grey-word">to</span>
                  <span ref={highRef}>{usd(band.pepmHigh)}</span>
                </div>
                <div className="text-[14px] text-body-2">per employee, per month</div>
              </div>

              <div className="mt-8">
                <div className="relative h-3 rounded-pill bg-grey-pill">
                  <div
                    ref={bandRef}
                    className="absolute top-0 h-3 rounded-pill bg-gradient-to-r from-orange to-orange-600"
                    style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-[12px] text-muted">
                  <span>{usd(DOMAIN_LOW)}</span>
                  <span>{usd(DOMAIN_HIGH)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onCta}
                className="mt-8 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-pill bg-orange px-7 py-4 text-[16px] font-semibold text-white transition-[background-color,scale] duration-200 hover:scale-[1.02] hover:bg-orange-600"
              >
                Get your number
                <IconArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Continuation cue: signals the flow keeps going below the card.
            Present from first paint (no layout shift) and doubles as a second
            way in. The bounce freezes under the global reduced-motion rule. */}
        <button
          type="button"
          onClick={onCta}
          className="mx-auto mt-7 flex cursor-pointer flex-col items-center gap-1.5 text-muted transition-colors hover:text-ink-2"
        >
          <span className="text-[11.5px] font-extrabold uppercase tracking-[0.14em]">
            Step 1 of 3 · Company basics
          </span>
          <IconChevronDown size={16} className="animate-bounce" />
        </button>

        {bridge && <div className="mx-auto mt-6 max-w-[560px]">{bridge}</div>}
      </div>
    </section>
  );
}
