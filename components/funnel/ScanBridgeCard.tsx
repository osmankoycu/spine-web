// Quiet cross-funnel nudge shown on the audit when the team reads early-stage
// (step-0 slider ≤ 10, or skipping the census at that size): the setup scan
// is the better tool. Deliberately low-key — a whisper, not a detour.
import Link from "next/link";
import { IconArrowRight } from "@/components/audit/icons";

export function ScanBridgeCard({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-3 rounded-[14px] border border-hairline bg-surface-inset px-5 py-3.5 transition-colors hover:border-orange-150 hover:bg-orange-100/40"
    >
      <span className="text-[13.5px] text-ink-2">
        <span className="font-bold">Early stage?</span> The 45-second setup scan
        fits better.
      </span>
      <span className="inline-flex shrink-0 items-center gap-1 text-[13.5px] font-bold text-orange-700">
        Run the scan
        <IconArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
