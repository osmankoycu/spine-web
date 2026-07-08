"use client";

import { usePathname } from "next/navigation";
import { useDemoModal } from "@/components/cta/DemoModal";
import { TagField } from "@/components/footer/TagField";
import { hasOwnCloser } from "@/lib/interior/closers";

// Global closing CTA over the physics "tag pile" (see TagField). Rendered once in
// the root layout, so it appears on every page — EXCEPT interior pages that
// render their own merged tag-field closer (see hasOwnCloser), where showing it
// too would double up the closer.

const CONTACT_EMAIL = "hello@joinspine.ai";

export function TagDrop() {
  const { open } = useDemoModal();
  const pathname = usePathname();
  if (hasOwnCloser(pathname)) return null;

  return (
    <TagField className="h-[620px] sm:h-[720px] lg:h-[800px]">
      <div className="mx-auto flex max-w-[760px] flex-col items-center px-6 pt-[88px] text-center sm:pt-[110px] lg:pt-[120px]">
        <h2 className="font-display text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[52px] lg:text-[64px]">
          Offload your <span className="text-orange">people stack</span> in 30 minutes.
        </h2>
        <p className="mt-6 max-w-[560px] text-[16px] leading-[1.55] text-grey-text sm:text-[18px]">
          Free 30-minute call. We&apos;ll show you exactly what we&apos;d take over: benefits,
          compliance, payroll, onboarding, and how much you&apos;d save. No commitment.
        </p>
        <button
          type="button"
          onClick={open}
          className="pointer-events-auto mt-9 cursor-pointer rounded-pill bg-orange px-7 py-3.5 text-[16px] font-semibold text-white transition-[background-color,scale] duration-200 hover:scale-[1.03] hover:bg-orange-600 sm:px-[30px] sm:py-[18px] sm:text-[18px]"
        >
          Request your free audit →
        </button>
        <p className="mt-6 text-[15px] text-grey-text">
          Or email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="pointer-events-auto font-medium text-ink underline underline-offset-2"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          directly
        </p>
      </div>
    </TagField>
  );
}
