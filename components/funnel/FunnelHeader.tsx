import Link from "next/link";
import type { ReactNode } from "react";
import { SpineLogo } from "@/components/SpineLogo";

// The funnel surface's only chrome: the wordmark, plus whatever the page wants
// beside it. `center` takes a progress indicator (the scan's stepper lives
// here); `label` names the tool. Rendered by the funnel layout for most
// routes, and by the page itself when the page owns header state.
export function FunnelHeader({
  center,
  label,
}: {
  center?: ReactNode;
  label?: { title: string; note: string };
}) {
  return (
    // Phones stack it centred (logo over the rest); from sm up the logo sits
    // left with the centre slot truly centred in the page.
    <header className="flex flex-col items-center gap-3 px-6 py-5 text-center sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-5 sm:px-10 sm:text-left">
      <Link href="/" aria-label="Spine home" className="inline-block shrink-0 sm:justify-self-start">
        <SpineLogo className="!h-[26px]" />
      </Link>

      <div className="w-full sm:w-auto sm:justify-self-center">{center}</div>

      {label ? (
        <div className="max-w-[320px] sm:max-w-none sm:justify-self-end sm:text-right">
          <p className="text-[13px] font-extrabold leading-snug tracking-[-0.01em] text-ink sm:text-[15px]">
            {label.title}
          </p>
          <p className="mt-0.5 text-[11.5px] leading-snug text-muted sm:text-[12.5px]">
            {label.note}
          </p>
        </div>
      ) : (
        <span aria-hidden="true" className="hidden sm:block" />
      )}
    </header>
  );
}
