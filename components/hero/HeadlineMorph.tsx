"use client";

import { RotatingWord } from "./RotatingWord";
import { copy } from "@/lib/hero/heroConfig";
import { heroCta } from "@/lib/siteConfig";

// Center content for HERO_REST: the headline (with the rotating word), subtitle,
// and CTA. Initially opacity-0 — popped in on HERO_REST entry by
// HeroRestController. [data-center-content] is the box the tag corridor is
// measured from.
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
    </div>
  );
}
