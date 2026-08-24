import Link from "next/link";
import { SpineLogo } from "@/components/SpineLogo";

// The funnel surface's only chrome: the wordmark, centred, with an optional
// line naming the tool beneath it. Progress indicators do not live here — the
// scan's stepper sits above its card, at the card's width, so it lines up with
// the thing it describes.
export function FunnelHeader({
  label,
}: {
  label?: { title: string; note: string };
}) {
  return (
    <header className="flex flex-col items-center gap-2 px-6 py-5 text-center sm:px-10">
      <Link href="/" aria-label="Spine home" className="inline-block">
        <SpineLogo className="!h-[26px]" />
      </Link>
      {label && (
        <div className="max-w-[420px]">
          <p className="text-[13px] font-extrabold leading-snug tracking-[-0.01em] text-ink sm:text-[15px]">
            {label.title}
          </p>
          <p className="mt-0.5 text-[11.5px] leading-snug text-muted sm:text-[12.5px]">
            {label.note}
          </p>
        </div>
      )}
    </header>
  );
}
