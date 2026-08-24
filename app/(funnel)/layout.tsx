"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FunnelHeader } from "@/components/funnel/FunnelHeader";

// Standalone shell for the funnel surface (/audit, /scan, the router entry):
// no site header, no nav, no site footer. Just the wordmark (home = the
// marketing site, joinspine.ai in production) and a one-line legal footer.
// Deliberately thin — Osman restyles this page himself later, so structure
// over styling here.
//
// /start runs on #fbfbfb — sampled to match the hero video's own background
// (its scenes render at 250-252, not pure white), so the video melts into the
// page with no visible edge. The tool pages keep the warm surface.
// What the visitor is looking at, shown opposite the wordmark. Keyed by route
// so each funnel surface can name itself; the tool pages carry their own
// eyebrow in-page, so only the router entry labels itself up here for now.
const HEADER_LABELS: Record<string, { title: string; note: string }> = {
  "/start": {
    title: "See what you're missing or overpaying for.",
    note: "Takes about 45 seconds. Free.",
  },
};

// Routes that render FunnelHeader themselves, because they feed its centre
// slot from page state.
const PAGE_OWNS_HEADER = new Set(["/scan"]);

export default function FunnelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const videoPage = pathname === "/start";
  const label = HEADER_LABELS[pathname ?? ""];
  return (
    <div
      className={`flex min-h-screen flex-col ${videoPage ? "bg-[#fbfbfb]" : "bg-surface-page"}`}
    >
      {/* /scan renders its own header: the stepper sits in the centre slot and
          that state lives in the page. */}
      {!PAGE_OWNS_HEADER.has(pathname ?? "") && <FunnelHeader label={label} />}
      <div className="flex flex-1 flex-col">{children}</div>
      <footer className="flex items-center justify-center gap-4 px-6 py-2 text-[12.5px] text-muted">
        <span>© {new Date().getFullYear()} Spine</span>
        <Link href="/privacy" className="underline underline-offset-2 hover:text-ink">
          Privacy
        </Link>
        <Link href="/terms" className="underline underline-offset-2 hover:text-ink">
          Terms
        </Link>
      </footer>
    </div>
  );
}
