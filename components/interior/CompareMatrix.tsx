"use client";

// Template D · the signature head-to-head matrix. Same dark language as the
// homepage "Why Spine" matrix (WhySpine.tsx), but two columns instead of three:
// Spine (lit orange once scrolled into view) vs a single named competitor.
// Desktop = the aligned 3-col grid [dimension · Spine · them]; mobile = two
// stacked per-side cards, Spine first.
import { Fragment, useEffect, useRef, useState } from "react";
import { Check, X } from "@phosphor-icons/react/dist/ssr";
import { SpineLogo } from "@/components/SpineLogo";
import { InteriorIcon } from "@/components/interior/icons";
import { cn } from "@/lib/cn";
import type { CompareRow } from "@/lib/interior/types";

const RADIAL =
  "radial-gradient(130% 130% at 50% -10%, #232220 0%, #161513 60%, #100f0e 100%)";

export function CompareMatrix({
  competitor,
  competitorSub,
  rows,
}: {
  competitor: string;
  competitorSub: string;
  rows: CompareRow[];
}) {
  const matrixRef = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(false);

  // Spine column starts neutral and lights to orange when scrolled into view.
  useEffect(() => {
    const el = matrixRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLit(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setLit(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "-25% 0px -25% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      // px-4 below sm: section px-6 + this shell + the card's own px-4 stacked
      // to ~45% of a 375px screen, leaving a ~207px measure that wrapped every
      // matrix row to three lines.
      className="relative overflow-hidden rounded-[32px] px-4 py-10 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.5)] sm:px-10 sm:py-12 lg:px-[56px] lg:pb-[52px] lg:pt-[56px]"
      style={{ background: RADIAL }}
    >
      {/* Matrix — desktop */}
      <div
        ref={matrixRef}
        className="hidden overflow-hidden rounded-[24px] border border-white/10 lg:grid lg:grid-cols-[0.85fr_1.25fr_1.25fr]"
      >
        {/* Header row */}
        <div className="bg-white/[0.02] px-7 py-[22px]" />
        {/* Spine header — neutral until in view, then the orange gradient fades in. */}
        <div className="relative overflow-hidden border-l border-white/10 bg-white/[0.02] px-[26px] py-[22px]">
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-b from-orange to-orange-600 transition-opacity duration-700 ease-out",
              lit ? "opacity-100" : "opacity-0",
            )}
          />
          <div className="relative">
            <SpineLogo fill="#ffffff" className="!h-[20px] w-auto" />
            <div
              className={cn(
                "mt-1.5 text-[12px] transition-colors duration-700",
                lit ? "text-[#ffe3d2]" : "text-[#7e7c77]",
              )}
            >
              AI-native brokerage
            </div>
          </div>
        </div>
        <ProviderHead name={competitor} sub={competitorSub} />

        {/* Data rows */}
        {rows.map((row) => (
          <Fragment key={row.label}>
            <div className="flex items-center gap-[11px] border-t border-white/10 bg-white/[0.03] px-[22px] py-6">
              <InteriorIcon name={row.icon} size={20} className="shrink-0 text-orange" />
              <span className="text-[14px] font-bold text-[#d9d7d2]">{row.label}</span>
            </div>
            <PosCell text={row.spine} lit={lit} />
            <NegCell text={row.them} leftBorder />
          </Fragment>
        ))}
      </div>

      {/* Mobile: one card PER DIMENSION, not per side. Stacking the two sides as
          two full-length cards put ~950px between a claim and its counter-claim,
          so nothing was ever compared — the page's whole argument was lost. Each
          card here is a self-contained head-to-head, and the duplicated column
          headers disappear. */}
      <div className="space-y-3 lg:hidden">
        {rows.map((row) => (
          <MobileRowCard key={row.label} row={row} competitor={competitor} lit={lit} />
        ))}
      </div>
    </div>
  );
}

function ProviderHead({ name, sub }: { name: string; sub: string }) {
  return (
    <div className="border-l border-white/10 bg-white/[0.02] px-6 py-[22px]">
      <div className="text-[16px] font-extrabold text-[#e9e8e4]">{name}</div>
      <div className="mt-0.5 text-[12px] text-[#7e7c77]">{sub}</div>
    </div>
  );
}

function NegCell({ text, leftBorder }: { text: string; leftBorder?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-start gap-2.5 border-t border-white/10 px-6 py-6",
        leftBorder && "border-l",
      )}
    >
      <span className="mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-white/[0.18] text-[#6f6d68]">
        <X size={10} weight="bold" />
      </span>
      <span className="text-[13.5px] leading-[1.4] text-[#8c8a85]">{text}</span>
    </div>
  );
}

function PosCell({ text, lit }: { text: string; lit: boolean }) {
  return (
    <div
      className={cn(
        "flex items-start gap-2.5 border-l border-t border-white/10 px-[26px] py-6 transition-colors duration-700",
        lit ? "bg-[rgba(247,101,27,0.1)]" : "bg-transparent",
      )}
    >
      <span
        className={cn(
          "mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[1.5px] transition-colors duration-700",
          lit
            ? "border-orange bg-orange text-white"
            : "border-white/20 bg-transparent text-[#8c8a85]",
        )}
      >
        <Check size={11} weight="bold" />
      </span>
      <span
        className={cn(
          "text-[13.5px] font-semibold leading-[1.4] transition-colors duration-700",
          lit ? "text-[#ffcdb0]" : "text-[#8c8a85]",
        )}
      >
        {text}
      </span>
    </div>
  );
}

// One comparison dimension as a self-contained card: the dimension is the
// header (with the icon the desktop grid uses), then Spine's answer directly
// above the competitor's so the contrast is readable without scrolling.
function MobileRowCard({
  row,
  competitor,
  lit,
}: {
  row: CompareRow;
  competitor: string;
  lit: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.03]">
      <div className="flex items-center gap-2.5 border-b border-white/10 bg-white/[0.03] px-4 py-3.5">
        <InteriorIcon name={row.icon} size={18} className="shrink-0 text-orange" />
        {/* #7e7c77 on this card measured ~4.1:1 — under AA for 11px text, and
            this label is the wayfinding for the whole comparison. */}
        <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#a3a19b]">
          {row.label}
        </span>
      </div>

      <div
        className={cn(
          "flex items-start gap-2.5 px-4 py-3.5 transition-colors duration-700",
          lit ? "bg-[rgba(247,101,27,0.1)]" : "bg-transparent",
        )}
      >
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange text-white">
          <Check size={11} weight="bold" />
        </span>
        <div className="min-w-0">
          <SpineLogo fill="#e9e8e4" className="!h-[13px] w-auto" />
          <p
            className={cn(
              "mt-1 text-[14px] font-semibold leading-snug transition-colors duration-700",
              lit ? "text-[#ffcdb0]" : "text-[#c9c7c2]",
            )}
          >
            {row.spine}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-2.5 border-t border-white/10 px-4 py-3.5">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-white/[0.18] text-[#6f6d68]">
          <X size={10} weight="bold" />
        </span>
        <div className="min-w-0">
          <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#a3a19b]">
            {competitor}
          </div>
          <p className="mt-1 text-[14px] leading-snug text-[#8c8a85]">{row.them}</p>
        </div>
      </div>
    </div>
  );
}
