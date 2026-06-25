"use client";

import { useEffect, useRef } from "react";
import { benefitsPage, type BenefitFeature } from "@/lib/hero/heroConfig";
import type { PhaseId } from "@/lib/hero/types";

// Display the illustrations at 1× their Figma node size; the PNGs are exported at
// 3× so they stay retina-crisp even at the hero's max canvas up-scale.
const ICON = 1.0;

function Feature({ f }: { f: BenefitFeature }) {
  // Icons TOP-align (the row is items-start) — the taller middle illustration
  // therefore reaches further down and pushes its own caption lower than the
  // shorter side ones, exactly like the Figma.
  return (
    <div className="flex w-[160px] flex-col items-center text-center">
      {/* max-w-none + explicit style: Tailwind preflight caps imgs at max-w-100%
          (and height:auto), which was clipping the wide optimization icon to the
          column width — so the size/scale never took. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={f.img}
        alt=""
        className="max-w-none"
        style={{
          width: Math.round(f.w * ICON * (f.scale ?? 1)),
          height: Math.round(f.h * ICON * (f.scale ?? 1)),
        }}
      />
      <h4 className="mt-5 font-display text-[16px] font-bold leading-[1.12] tracking-[-0.01em] text-[#0e1419]">
        {f.title}
      </h4>
      <p className="mt-1.5 text-[13.5px] leading-[1.35] text-[#3b424b]">{f.desc}</p>
    </div>
  );
}

function Column({ data }: { data: typeof benefitsPage.company }) {
  return (
    <div className="flex flex-1 flex-col items-center px-7 pt-7">
      <h3
        className="font-display text-[24px] font-bold tracking-[-0.2px]"
        style={{ color: data.color }}
      >
        {data.title}
      </h3>
      <div className="mt-5 flex w-full items-start justify-between">
        {data.features.map((f) => (
          <Feature key={f.title} f={f} />
        ))}
      </div>
    </div>
  );
}

/** BENEFITS-stop page content. Lives in the scaled hero canvas (inset-0, like
 *  HeadlineMorph) so it scales with everything else; hidden until the BENEFITS
 *  phase fades [data-benefits-content] in. The docked title, CTA and paging are
 *  rendered elsewhere and persist. */
export function BenefitsContent({ phase }: { phase: PhaseId }) {
  const { headline, subtitle, consultant, company, employees } = benefitsPage;
  const videoRef = useRef<HTMLVideoElement>(null);
  // Play the consultant clip ONCE each time the BENEFITS screen opens (not on
  // page load, no loop). While hidden, park it on FRAME 0 so re-opening never
  // flashes the last frame before it restarts.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (phase === "BENEFITS") {
      v.currentTime = 0;
      void v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [phase]);
  return (
    <div
      data-benefits-content
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 opacity-0"
    >
      {/* Left — heading + subtitle. RIGHT-aligned, anchored just left of the
          consultant (Figma: items-end / text-right, 38px heading). */}
      <div className="absolute right-[820px] top-[150px] flex flex-col items-end text-right">
        <h2 className="font-display text-[38px] font-bold leading-[40px] tracking-[-0.18px] text-ink">
          {headline.map((line) => (
            <span key={line} className="block whitespace-nowrap">
              {line}
            </span>
          ))}
        </h2>
        <p className="mt-3 w-[375px] text-[15px] leading-[20px] tracking-[0.5px] text-grey-text">
          {subtitle}
        </p>
      </div>

      {/* Center — consultant (transparent WebM; the still PNG is poster/fallback).
          z-10 lifts her ABOVE the card so her hands rest on its top edge; she
          sits a touch lower so the wrists cross onto the card. */}
      <video
        ref={videoRef}
        src="/benefits/consultant.webm"
        muted
        playsInline
        preload="auto"
        width={317}
        height={286}
        className="absolute left-1/2 top-[98px] z-10 -translate-x-1/2"
      />

      {/* Right — consultant card */}
      <div className="absolute left-[804px] top-[166px] w-[290px]">
        <p className="text-[11px] font-semibold uppercase leading-none tracking-[1.1px] text-[#6c7682]">
          {consultant.eyebrow}
        </p>
        <p className="mt-3 font-display text-[18px] font-bold tracking-[-0.16px] text-[#0e1419]">
          {consultant.name}
        </p>
        <p className="mt-1 text-[13px] text-[#3b424b]">{consultant.role}</p>
        <span className="mt-3.5 inline-flex rounded-pill bg-black px-[9px] py-[4px] text-[11px] font-bold uppercase tracking-[0.66px] text-white">
          {consultant.badge}
        </span>
      </div>

      {/* Bottom — two-column feature card */}
      <div className="absolute inset-x-[16px] bottom-[-8px] top-[366px] flex rounded-[28px] bg-white ring-1 ring-black/[0.06]">
        <Column data={company} />
        <div className="w-px self-stretch bg-black/[0.07]" />
        <Column data={employees} />
      </div>
    </div>
  );
}
