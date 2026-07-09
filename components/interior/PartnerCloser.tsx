"use client";

// Merged closing section for Template C — the page's CTA (heading + lead +
// button) over the falling-tag physics field (see TagField), replacing the
// global "Offload your people" closer (suppressed on /partners/* — see
// lib/interior/closers.ts).
import { useDemoModal } from "@/components/cta/DemoModal";
import { TagField } from "@/components/footer/TagField";
import type { PartnerPage } from "@/lib/interior/types";

export function PartnerCloser({ cta }: { cta: PartnerPage["cta"] }) {
  const { open } = useDemoModal();
  const title = [cta.heading.pre, cta.heading.accent, cta.heading.post]
    .filter(Boolean)
    .join(" ");
  return (
    <TagField className="h-[620px] sm:h-[720px] lg:h-[800px]">
      <div className="mx-auto flex max-w-[760px] flex-col items-center px-6 pt-[88px] text-center sm:pt-[110px] lg:pt-[120px]">
        <h2 className="font-display text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[52px] lg:text-[60px]">
          {title}
        </h2>
        <p className="mt-6 max-w-[560px] text-[16px] leading-[1.55] text-grey-text sm:text-[18px]">
          {cta.lead}
        </p>
        <button
          type="button"
          onClick={open}
          className="pointer-events-auto mt-9 cursor-pointer rounded-pill bg-orange px-7 py-3.5 text-[16px] font-semibold text-white transition-[background-color,scale] duration-200 hover:scale-[1.03] hover:bg-orange-600 sm:px-[30px] sm:py-[18px] sm:text-[18px]"
        >
          {cta.button.label} →
        </button>
      </div>
    </TagField>
  );
}
