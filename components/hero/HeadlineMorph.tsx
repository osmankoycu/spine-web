"use client";

import { RotatingWord } from "./RotatingWord";
import { copy } from "@/lib/hero/heroConfig";
import { useDemoModal } from "@/components/cta/DemoModal";

// Center content for HERO_REST: the headline (with the rotating word), subtitle,
// and CTA. Initially opacity-0 — popped in on HERO_REST entry by
// HeroRestController. [data-center-content] is the box the tag corridor is
// measured from.
export function HeadlineMorph() {
  const { open } = useDemoModal();
  return (
    <div data-center className="pointer-events-none absolute inset-0 z-20">
      {/* Headline + subtitle — nudged above the field centre. The shift (-58px)
          and the subtitle margin (53px) are paired so the motto stays put while
          the gap motto→subtitle EQUALS the gap subtitle→CTA. */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          data-center-content
          className="flex -translate-y-[58px] flex-col items-center text-center"
        >
          {/* Fixed px sizes (NOT vw/clamp) so the headline scales uniformly with
              the parent canvas, staying proportional to the tags at every size. */}
          <h1
            data-headline
            className="font-display text-[90px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink"
          >
            <span data-h-line className="block opacity-0">
              {/* inner inline-block = tight per-line width so each line's tag band
                  is measured from its OWN text, independent of the other line */}
              <span data-h-measure className="inline-block">{copy.rest.line1}</span>
            </span>
            <span data-h-line className="relative block opacity-0">
              <span data-h-measure className="inline-block">
                {copy.rest.line2Prefix} <RotatingWord />
              </span>
              {/* Fixed-width collider for the rotating line — its width is locked
                  to the WIDEST word (set by HeroRestController), centred, so the
                  field is parted ONCE and the tags never move again when the word
                  swaps. The visible text above still glides to re-centre. */}
              <span
                data-h-obstacle
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-0 h-full -translate-x-1/2"
              />
            </span>
          </h1>

          <p
            data-subtitle
            className="mt-[53px] max-w-[560px] text-[28px] leading-[1.5] text-grey-text opacity-0 md:text-[20px] md:leading-[1.55]"
          >
            {copy.rest.subtitle.map((s, i) =>
              s.em ? (
                <strong key={i} className="font-semibold text-grey-text">
                  {s.t}
                </strong>
              ) : (
                <span key={i}>{s.t}</span>
              ),
            )}
          </p>
        </div>
      </div>

      {/* CTA as a tag-sized orange "pill" pinned to a tag ROW below the copy (2
          rows / ~198px below the field centre, the row pitch is 99px), centred —
          so it lands ON the tag line under the text and reads as one of the tags,
          set apart only by its colour. */}
      <div
        className="absolute inset-x-0 flex justify-center"
        style={{ top: "calc(50% + 158px)" }}
      >
        <button
          type="button"
          data-cta
          onClick={open}
          className="pointer-events-auto box-border flex cursor-pointer items-center justify-center whitespace-nowrap rounded-pill bg-orange px-[30px] py-[21px] text-[30px] font-medium leading-[39.42px] tracking-[-0.27px] text-white opacity-0 transition-[background-color,scale] duration-200 hover:scale-[1.03] hover:bg-orange-600 md:text-[24px]"
        >
          {copy.cta}
        </button>
      </div>
    </div>
  );
}
