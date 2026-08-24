"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import { benchmarkBand } from "@/lib/audit/auditEngine";
import { COMMON_STATE_CODES, US_STATES } from "@/lib/audit/usStates";
import { track } from "@/lib/audit/track";
import type { AuditVariant } from "@/lib/audit/ycVariant";
import { IconArrowRight, IconChevronDown } from "./icons";

// Step 0: the hook. Three inputs are live before any signup; every move
// re-renders the "companies like yours typically pay" band with a fast springy
// tween. The CTA hands off to the flow below (step 1).

export type PreviewInputs = {
  headcount: number;
  states: string[]; // 2-letter codes; empty = national average
  avgAge: number;
};

const REST_STATE_CODES = US_STATES.map((s) => s.code)
  .filter((c) => !COMMON_STATE_CODES.includes(c))
  .sort();

function StateChip({
  code,
  active,
  onClick,
  compact,
}: {
  code: string;
  active: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`cursor-pointer rounded-xl border text-center font-bold transition-colors ${
        compact ? "px-1 py-2 text-[12px]" : "px-2 py-2.5 text-[14px]"
      } ${
        active
          ? "border-black bg-black text-white"
          : "border-black/15 bg-white text-ink-2 hover:border-orange hover:bg-orange-100/40"
      }`}
    >
      {code}
    </button>
  );
}

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
  const [showAllStates, setShowAllStates] = useState(false);

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

  const toggleState = (code: string) => {
    touched("state");
    onChange({
      ...value,
      states: value.states.includes(code)
        ? value.states.filter((s) => s !== code)
        : [...value.states, code],
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
          {variant && (
            <div className="mb-3 inline-flex items-center rounded-pill border border-orange-150 bg-orange-100 px-4 py-1.5 text-[12.5px] font-extrabold text-orange-ink">
              {variant.eyebrow}
            </div>
          )}
          <h1 className="text-[27px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[34px]">
            <span className="text-ink">Find out if you&apos;re overpaying</span>
            <br />
            <span className="text-orange">for health insurance.</span>
          </h1>
          <p className="mx-auto mt-3 max-w-[520px] text-[14.5px] leading-[1.55] text-body-2">
            Move the three inputs and watch the market band. Drop in your census
            and it gets real. Free, carriers pay us, not you.
          </p>
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
                <span className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-ink-2">
                  States
                  <span className="ml-1.5 font-medium normal-case tracking-normal text-muted">
                    {value.states.length > 0
                      ? "tap all where your team works"
                      : "leave empty for the national average"}
                  </span>
                </span>
                {/* Same picker shape as the scan: the common states are one tap
                    away, the rest sit behind the expander. Premiums are rated
                    per work location, so multiple states blend the rate. */}
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {COMMON_STATE_CODES.map((code) => (
                    <StateChip
                      key={code}
                      code={code}
                      active={value.states.includes(code)}
                      onClick={() => toggleState(code)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setShowAllStates((v) => !v)}
                  className="mt-2.5 inline-flex cursor-pointer items-center gap-1 text-[12.5px] font-semibold text-orange-700 underline underline-offset-2 hover:text-orange-600"
                >
                  {showAllStates ? "Hide the rest" : "Somewhere else? Show all states"}
                  <IconChevronDown
                    size={14}
                    className={showAllStates ? "rotate-180" : undefined}
                  />
                </button>
                {showAllStates && (
                  // Capped and scrollable: 43 more chips would otherwise double
                  // the card's height. data-lenis-prevent is required — Lenis
                  // owns the wheel globally and would scroll the page instead of
                  // this box; overscroll-contain stops the scroll chaining on
                  // once you hit either end.
                  <div
                    data-lenis-prevent
                    className="mt-2.5 max-h-[196px] overflow-y-auto overscroll-contain pr-1"
                  >
                    <div className="grid grid-cols-6 gap-1.5">
                      {REST_STATE_CODES.map((code) => (
                        <StateChip
                          key={code}
                          code={code}
                          active={value.states.includes(code)}
                          onClick={() => toggleState(code)}
                          compact
                        />
                      ))}
                    </div>
                  </div>
                )}
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

            {/* Live band. self-start so it keeps its own height instead of
                stretching to match the controls (the state list can make that
                column tall), and sticky so it stays in view while you pick. */}
            <div className="flex flex-col gap-8 rounded-[20px] bg-surface-inset p-6 ring-1 ring-hairline sm:p-8 lg:sticky lg:top-6 lg:self-start">
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

              <div>
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
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-pill bg-orange px-7 py-4 text-[16px] font-semibold text-white transition-[background-color,scale] duration-200 hover:scale-[1.02] hover:bg-orange-600"
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
