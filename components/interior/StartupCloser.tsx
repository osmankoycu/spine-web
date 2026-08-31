import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { TagField } from "@/components/footer/TagField";

// Closing section for /startups — same tag-field signature as PlatformCloser,
// but the button anchors to the on-page application form (#apply) instead of
// opening the demo modal. A campaign page gets exactly one conversion action;
// don't "simplify" this back to PlatformCloser, whose button hardcodes the
// modal. The global TagDrop is suppressed for this route (lib/interior/closers).
export function StartupCloser() {
  return (
    <TagField className="min-h-[560px] sm:h-[720px] lg:h-[800px]">
      <div className="mx-auto flex max-w-[760px] flex-col items-center px-6 pb-0 pt-[72px] text-center sm:pt-[110px] lg:pt-[120px]">
        <h2 className="font-display text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[52px] lg:text-[60px]">
          Real benefits, from your first hire.
        </h2>
        <p className="mt-6 max-w-[560px] text-[16px] leading-[1.55] text-grey-text sm:text-[18px]">
          No PEO. No admin fees. No co-employment. Just enterprise-grade benefits
          and people ops, built for startups.
        </p>
        <a
          href="#apply"
          className="pointer-events-auto mt-9 flex w-full cursor-pointer items-center justify-center gap-2 rounded-pill bg-orange px-7 py-3.5 text-[16px] font-semibold text-white transition-[background-color,scale] duration-200 hover:scale-[1.03] hover:bg-orange-600 sm:w-auto sm:px-[30px] sm:py-[18px] sm:text-[18px]"
        >
          Apply for the startup program
          <ArrowRight size={18} weight="bold" />
        </a>
      </div>
    </TagField>
  );
}
