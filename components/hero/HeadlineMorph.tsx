"use client";

import { RotatingWord } from "./RotatingWord";
import { copy, rotatingWords } from "@/lib/hero/heroConfig";
import { heroCta } from "@/lib/siteConfig";

// Persistent center content (Section 3.2). For HERO_REST it renders the headline
// (with the rotating word), subtitle, and CTA. These single instances persist
// and later Flip-morph in STATS/BENEFITS. Initially opacity-0 (popped in on
// HERO_REST entry by HeroRestController). [data-center-content] is the box the
// tag corridor is measured from.
export function HeadlineMorph() {
  return (
    <div
      data-center
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
    >
      <div data-center-content className="flex flex-col items-center text-center">
        {/* Fixed px sizes (NOT vw/clamp) so the headline scales uniformly with
            the parent canvas, staying proportional to the tags at every size. */}
        <h1
          data-headline
          className="font-display text-[78px] font-bold leading-[1.05] tracking-[-0.02em] text-ink"
        >
          <span data-h-line className="block opacity-0">
            {/* inner inline-block = tight per-line width so each line's tag band
                is measured from its OWN text, independent of the other line */}
            <span data-h-measure className="inline-block">{copy.rest.line1}</span>
          </span>
          <span data-h-line className="block opacity-0">
            <span data-h-measure className="inline-block">
              {copy.rest.line2Prefix} <RotatingWord />
            </span>
          </span>
        </h1>

        <p
          data-subtitle
          className="mt-7 max-w-[560px] text-[18px] leading-[1.55] text-grey-text opacity-0"
        >
          {copy.rest.subtitle}
        </p>

        <a
          data-cta
          href={heroCta.href}
          className="pointer-events-auto mt-8 inline-flex items-center gap-2.5 rounded-pill bg-orange px-[32px] py-[17px] text-[18px] font-medium text-white opacity-0 transition-colors hover:bg-orange-600"
        >
          {copy.cta}
          <span aria-hidden>→</span>
        </a>
      </div>

      {/* STATS headline — the rotating word resolves into this 4-line block.
          Centred by a transform-free flex wrapper (= the STATS headline slot)
          so the master can y-tween [data-h-stats] without fighting a centring
          transform. The master cross-fades [data-headline] out and this in.
          The 3 word spans are individually addressable: in BENEFITS they TRAVEL
          up + shrink into the horizontal top line (data-stat-word 0/1/2), and
          [data-stat-oneteam] fades out. */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          data-h-stats
          aria-hidden
          className="flex flex-col items-center text-center font-display text-[78px] font-bold leading-[79px] tracking-[-0.013em] opacity-0"
        >
          <span data-stat-word="0" className="block text-orange">
            {rotatingWords[0]},
          </span>
          <span data-stat-word="1" className="block text-orange">
            {rotatingWords[1]},
          </span>
          <span data-stat-word="2" className="block text-orange">
            {rotatingWords[2]}
          </span>
          <span data-stat-oneteam className="block text-black">
            {copy.oneTeam}
          </span>
        </div>
      </div>

      {/* BENEFITS headline — MEASUREMENT JIG only (visibility:hidden so it lays
          out + is measurable but never shows). The real 48px horizontal line
          near the canvas top; BenefitsController measures each word's box and
          travels the live data-h-stats spans onto it. Never animated. */}
      <div
        data-h-benefits
        aria-hidden
        style={{ visibility: "hidden" }}
        className="pointer-events-none absolute left-1/2 top-[-10px] -translate-x-1/2 whitespace-nowrap font-display text-[48px] font-bold leading-[39px] tracking-[-1px]"
      >
        <span data-bn-word="0" className="text-orange">
          {rotatingWords[0]},
        </span>{" "}
        <span data-bn-word="1">{rotatingWords[1]},</span>{" "}
        <span data-bn-word="2">{rotatingWords[2]}</span>
      </div>

      {/* BENEFITS CTA slot — measurement jig at the page bottom (above the
          paging). The CTA travels here instead of fading, and STAYS through
          COMPLIANCE / PEOPLE_OPS. Sized to the CTA so its centre is the target. */}
      <div
        data-cta-bottom
        aria-hidden
        style={{ visibility: "hidden" }}
        className="pointer-events-none absolute bottom-[-60px] left-1/2 h-[58px] -translate-x-1/2"
      />
    </div>
  );
}
