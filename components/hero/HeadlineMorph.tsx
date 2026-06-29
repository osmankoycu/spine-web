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
    <div data-center className="pointer-events-none absolute inset-0 z-20">
      {/* Headline + subtitle — nudged above the field centre so the motto sits a
          little higher (but not a full row, which read as too high). */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          data-center-content
          className="flex -translate-y-[72px] flex-col items-center text-center"
        >
          {/* Fixed px sizes (NOT vw/clamp) so the headline scales uniformly with
              the parent canvas, staying proportional to the tags at every size. */}
          <h1
            data-headline
            className="font-display text-[90px] font-bold leading-[1.05] tracking-[-0.02em] text-ink"
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
            className="mt-6 max-w-[560px] text-[18px] leading-[1.55] text-grey-text opacity-0"
          >
            {copy.rest.subtitle}
          </p>
        </div>
      </div>

      {/* CTA as a tag-sized orange "pill" pinned to a tag ROW below the copy (2
          rows / ~182px below the field centre, the row pitch is 91px), centred —
          so it lands ON the tag line under the text and reads as one of the tags,
          set apart only by its colour. */}
      <div
        className="absolute inset-x-0 flex justify-center"
        style={{ top: "calc(50% + 142px)" }}
      >
        <a
          data-cta
          href={heroCta.href}
          className="pointer-events-auto box-border flex items-center justify-center whitespace-nowrap rounded-pill bg-orange px-[30px] py-[21px] text-[24px] font-medium leading-[39.42px] tracking-[-0.27px] text-white opacity-0 transition-colors hover:bg-orange-600"
        >
          {copy.cta}
        </a>
      </div>
    </div>
  );
}
