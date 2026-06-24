"use client";

import { RotatingWord } from "./RotatingWord";
import { copy } from "@/lib/hero/heroConfig";
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
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-[var(--page-px)]"
    >
      <div data-center-content className="flex flex-col items-center text-center">
        <h1
          data-headline
          className="font-display text-[clamp(2.75rem,6.2vw,5.25rem)] font-bold leading-[1.04] tracking-[-0.02em] text-ink"
        >
          <span data-h-line className="block opacity-0">
            {/* inner inline-block = tight per-line width so each line's tag band
                is measured from its OWN text, independent of the other line */}
            <span data-h-measure className="inline-block">{copy.rest.line1}</span>
          </span>
          <span data-h-line className="block opacity-0">
            <span data-h-measure className="inline-block">
              {copy.rest.line2Prefix} <RotatingWord />
              <span className="text-orange">.</span>
            </span>
          </span>
        </h1>

        <p
          data-subtitle
          className="mt-7 max-w-md text-[clamp(0.95rem,1.15vw,1.0625rem)] leading-relaxed text-grey-text opacity-0"
        >
          {copy.rest.subtitle}
        </p>

        <a
          data-cta
          href={heroCta.href}
          className="pointer-events-auto mt-8 inline-flex items-center gap-2 rounded-pill bg-orange px-7 py-3.5 text-[15px] font-medium text-white opacity-0 transition-[transform,background-color] hover:-translate-y-px hover:bg-orange-600"
        >
          {copy.cta}
          <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}
