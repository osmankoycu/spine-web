"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { Marquee } from "./Marquee";
import { trustedLogos } from "./trustedLogos";

// Proof band (handoff Block 0): a white rounded card — four headline metrics,
// each topped by an orange accent bar, over a full-width trusted-by logo row.
// On scroll-into-view the metrics animate: 3-in-1 / 24/7 pop with a light spring;
// 25% counts up 0→25; $0 counts rapidly down from 999. Real SVG logos kept.

type Anim =
  | { kind: "scale" }
  | { kind: "count"; from: number; to: number; prefix?: string; suffix?: string };

const STATS: { value: string; caption: string; anim: Anim }[] = [
  { value: "3-in-1", caption: "Benefits, compliance, people ops, one team", anim: { kind: "scale" } },
  {
    value: "25%",
    caption: "Average reduction in healthcare costs",
    anim: { kind: "count", from: 0, to: 25, suffix: "%" },
  },
  { value: "24/7", caption: "Employee support, in-house team + AI", anim: { kind: "scale" } },
  {
    value: "$0",
    caption: "Cost to your company. Free, always.",
    anim: { kind: "count", from: 999, to: 0, prefix: "$" },
  },
];

// Optical size tuning — equal heights don't read as equal weight; nudge a few.
const LOGO_H = 26;
const LOGO_SCALE: Record<string, number> = { fal: 1.18, Firefly: 0.88, FreshDirect: 1.1 };

// Display order — fal centred, Billups last.
const LOGO_ORDER = ["HockeyStack", "Firefly", "fal", "FreshDirect", "Maven", "Merge", "Billups"];
const orderedLogos = [...trustedLogos].sort(
  (a, b) => LOGO_ORDER.indexOf(a.label) - LOGO_ORDER.indexOf(b.label),
);

const fmt = (a: Extract<Anim, { kind: "count" }>, v: number) => {
  let n = Math.round(v);
  if (a.from > a.to) n = Math.max(a.to, n); // countdown: never dip below the target
  return `${a.prefix ?? ""}${n}${a.suffix ?? ""}`;
};

export function StatsBand({ variant = "light" }: { variant?: "light" | "dark" }) {
  const dark = variant === "dark";
  const gridRef = useRef<HTMLDivElement>(null);
  const numRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // SSR already renders the final values

    // Prime the start states (the section is below the fold on load, so no flash).
    STATS.forEach((s, i) => {
      const el = numRefs.current[i];
      if (!el) return;
      if (s.anim.kind === "scale") {
        gsap.set(el, { scale: 0.4, opacity: 0, transformOrigin: "50% 50%" });
      } else {
        gsap.set(el, { opacity: 0 });
        el.textContent = fmt(s.anim, s.anim.from);
      }
    });

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      STATS.forEach((s, i) => {
        const el = numRefs.current[i];
        if (!el) return;
        const delay = i * 0.06;
        if (s.anim.kind === "scale") {
          gsap.to(el, { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.7)", delay });
          return;
        }
        const a = s.anim;
        const countingDown = a.from > a.to;
        gsap.to(el, { opacity: 1, duration: 0.3, delay });
        const obj = { v: a.from };
        gsap.to(obj, {
          v: a.to,
          duration: countingDown ? 0.85 : 1.3, // $0 races down; 25% eases up
          ease: "back.out(1.1)", // a little spring on the count too
          delay,
          onUpdate: () => {
            el.textContent = fmt(a, obj.v);
          },
        });
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "-30% 0px -30% 0px" },
    );
    io.observe(grid);
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-bg px-4 py-11 sm:px-6 lg:px-8 lg:py-14">
      <div
        className={cn(
          "relative z-10 mx-auto max-w-[1200px] overflow-hidden rounded-[32px] border px-7 pb-9 pt-10 sm:px-10 sm:pb-11 sm:pt-12 lg:px-[60px] lg:pb-[52px] lg:pt-[56px]",
          dark
            ? "border-white/10 bg-[#15140f] shadow-[0_40px_90px_-50px_rgba(0,0,0,0.5)]"
            : "border-[#ededea] bg-white shadow-[0_1px_0_rgba(0,0,0,0.02),0_40px_80px_-48px_rgba(20,20,18,0.2)]",
        )}
      >
        {/* Stats */}
        <div
          ref={gridRef}
          className={cn(
            "grid grid-cols-1 divide-y sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0",
            dark ? "divide-white/10" : "divide-[#ededea]",
          )}
        >
          {STATS.map((s, i) => (
            <div
              key={s.value}
              className={cn(
                "px-0 py-8 first:pt-0 last:pb-0 sm:px-9 sm:py-0 lg:first:pl-0 lg:last:pr-0 lg:[&:not(:last-child)]:border-r",
                dark ? "lg:[&:not(:last-child)]:border-white/10" : "lg:[&:not(:last-child)]:border-[#ededea]",
              )}
            >
              <div className="h-1 w-[30px] rounded-[2px] bg-orange" />
              <div
                ref={(el) => {
                  numRefs.current[i] = el;
                }}
                className={cn(
                  "mt-[22px] font-display text-[44px] font-extrabold leading-[0.95] tracking-[-0.04em] sm:text-[54px] lg:text-[64px]",
                  dark ? "text-white" : "text-[#15140f]",
                )}
              >
                {s.value}
              </div>
              <p
                className={cn(
                  "mt-[18px] max-w-[200px] text-[15px] font-medium leading-[1.45]",
                  dark ? "text-white/55" : "text-[#86857e]",
                )}
              >
                {s.caption}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className={cn("mb-10 mt-[52px] h-px", dark ? "bg-white/10" : "bg-[#ededea]")} />

        {/* Trusted by */}
        <p
          className={cn(
            "mb-8 text-center text-[12px] font-bold uppercase tracking-[0.18em]",
            dark ? "text-white/40" : "text-[#a9a9a3]",
          )}
        >
          Trusted by ambitious tech companies
        </p>
        <Marquee
          className={dark ? "text-white/[0.22]" : "text-[#d3d3ce]"}
          items={orderedLogos.map((logo) => (
            <span
              key={logo.label}
              role="img"
              aria-label={logo.label}
              style={{ height: LOGO_H * (LOGO_SCALE[logo.label] ?? 1) }}
              className="block [&>svg]:h-full [&>svg]:w-auto"
              dangerouslySetInnerHTML={{ __html: logo.svg }}
            />
          ))}
        />
      </div>
    </section>
  );
}
