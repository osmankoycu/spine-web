import Link from "next/link";
import { SpineLogo } from "@/components/SpineLogo";

// Standalone shell for the funnel surface (/audit, /scan, the router entry):
// no site header, no nav, no site footer. Just the wordmark (home = the
// marketing site, joinspine.ai in production) and a one-line legal footer.
// Deliberately thin — Osman restyles this page himself later, so structure
// over styling here.
export default function FunnelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col bg-surface-page">
      <header className="px-6 py-5 sm:px-10">
        <Link href="/" aria-label="Spine home" className="inline-block">
          <SpineLogo className="!h-[26px]" />
        </Link>
      </header>
      <div className="flex-1">{children}</div>
      <footer className="flex items-center justify-center gap-4 px-6 py-6 text-[12.5px] text-muted">
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
