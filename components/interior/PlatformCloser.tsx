"use client";

// Merged closing section for Template A — folds the "By the numbers" stat cards
// and the CTA (heading, lead, button) into ONE section over the falling-tag
// physics field (see TagField). Replaces the separate stats + CTA band + the
// global TagDrop on pages that opt in (see lib/interior/closers.ts).
import { ArrowRight } from "@phosphor-icons/react";
import { useDemoModal } from "@/components/cta/DemoModal";
import { TagField } from "@/components/footer/TagField";
import { TwoToneText } from "@/components/interior/parts";
import type { PlatformPage } from "@/lib/interior/types";

export function PlatformCloser({ page }: { page: PlatformPage }) {
  const { open } = useDemoModal();
  return (
    <TagField className="h-[820px] sm:h-[880px] lg:h-[940px]">
      <div className="mx-auto max-w-[1160px] px-6 pt-[72px] text-center sm:pt-[88px]">
        <h2 className="mx-auto max-w-[820px] text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[44px]">
          <TwoToneText parts={page.cta.heading} mono />
        </h2>

        {/* stat cards (from "By the numbers") */}
        <div className="mt-10 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
          {page.numbers.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-[18px] border border-hairline bg-white px-6 py-[26px] shadow-[0_1px_0_rgba(0,0,0,0.02),0_40px_80px_-60px_rgba(20,20,18,0.2)]"
            >
              <div className="text-[44px] font-extrabold tracking-[-0.03em] text-orange">
                {s.figure}
              </div>
              <div className="mt-1.5 text-[14px] text-body-2">{s.label}</div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-9 max-w-[560px] text-[16px] leading-[1.55] text-grey-text sm:text-[18px]">
          {page.cta.lead}
        </p>
        <button
          type="button"
          onClick={open}
          className="pointer-events-auto mt-9 inline-flex cursor-pointer items-center gap-2 rounded-pill bg-orange px-7 py-3.5 text-[16px] font-semibold text-white transition-[background-color,scale] duration-200 hover:scale-[1.03] hover:bg-orange-600 sm:px-[30px] sm:py-[18px] sm:text-[18px]"
        >
          {page.cta.button.label}
          <ArrowRight size={18} weight="bold" />
        </button>
      </div>
    </TagField>
  );
}
