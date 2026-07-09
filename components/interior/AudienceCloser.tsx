"use client";

// Merged closing section for Template B — the page's CTA (heading + lead) with
// the bento (feature + cards) folded in above the button, all over the falling-
// tag physics field (see TagField), replacing the global "Offload your people"
// closer (suppressed on these routes; see lib/interior/closers.ts).
//
// The bento's black feature tile would clash on the white tag-field, so here it's
// re-skinned as a light orange-tint tile; the white cards get a soft lift so they
// read against the white. TagField grows to fit (min-h, not a fixed height).
import { useDemoModal } from "@/components/cta/DemoModal";
import { TagField } from "@/components/footer/TagField";
import { InteriorIcon } from "@/components/interior/icons";
import type { AudiencePage } from "@/lib/interior/types";

const CARD_LIFT = "shadow-[0_1px_0_rgba(0,0,0,0.02),0_30px_60px_-42px_rgba(20,20,18,0.22)]";

export function AudienceCloser({
  cta,
  bento,
}: {
  cta: AudiencePage["cta"];
  bento: AudiencePage["bento"];
}) {
  const { open } = useDemoModal();
  const title = [cta.heading.pre, cta.heading.accent, cta.heading.post]
    .filter(Boolean)
    .join(" ");

  return (
    <TagField className="min-h-[760px]">
      <div className="mx-auto max-w-[1240px] px-6 pb-[280px] pt-[84px]">
        <h2 className="mx-auto max-w-[820px] text-center font-display text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[44px]">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-[580px] text-center text-[16px] leading-[1.55] text-grey-text sm:text-[18px]">
          {cta.lead}
        </p>

        {/* bento (folded in) */}
        <div className="mt-12 grid gap-4 text-left lg:grid-cols-3 lg:[grid-auto-rows:1fr]">
          {/* feature tile — employer-blue tint (was black) so it reads on the white field */}
          <div
            className={`flex flex-col justify-between rounded-[22px] border border-cobalt-200 bg-cobalt-100 p-8 lg:row-span-2 ${CARD_LIFT}`}
          >
            <div>
              <span className="mb-[18px] grid size-12 place-items-center rounded-[13px] bg-white">
                <InteriorIcon name={bento.feature.icon} size={24} className="text-cobalt-400" />
              </span>
              <h3 className="mb-2.5 text-[24px] font-extrabold tracking-[-0.02em] text-ink">
                {bento.feature.title}
              </h3>
              <p className="text-[15px] leading-[1.55] text-body-2">{bento.feature.body}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {bento.feature.chips.map((c) => (
                <span
                  key={c}
                  className="rounded-pill border border-cobalt-200 bg-white px-3 py-1.5 text-[12.5px] font-medium text-ink-2"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
          {/* small cards */}
          {bento.cards.map((c) => (
            <div
              key={c.title}
              className={`rounded-[22px] border border-hairline bg-white p-[26px] ${CARD_LIFT}`}
            >
              <span className="mb-4 grid size-11 place-items-center rounded-[12px] bg-cobalt-100">
                <InteriorIcon name={c.icon} size={22} className="text-cobalt-400" />
              </span>
              <h3 className="mb-[7px] text-[17px] font-extrabold tracking-[-0.01em]">{c.title}</h3>
              <p className="text-[14px] leading-[1.5] text-body-2">{c.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={open}
            className="pointer-events-auto inline-flex cursor-pointer items-center gap-2 rounded-pill bg-orange px-7 py-3.5 text-[16px] font-semibold text-white transition-[background-color,scale] duration-200 hover:scale-[1.03] hover:bg-orange-600 sm:px-[30px] sm:py-[18px] sm:text-[18px]"
          >
            {cta.button.label} →
          </button>
        </div>
      </div>
    </TagField>
  );
}
