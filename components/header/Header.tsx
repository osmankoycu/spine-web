import Link from "next/link";
import { SpineLogo } from "@/components/SpineLogo";
import { actions, nav } from "@/lib/siteConfig";

// Persistent across the entire hero sequence — fixed, does NOT animate with the
// phases (Section 4). Sits above the pinned stage; inside the rounded page card.
export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[var(--header-h)]">
      <div className="page-gutter flex h-full items-center justify-between">
        <Link href="/" aria-label="Spine home" className="shrink-0">
          <SpineLogo />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] text-ink/85 transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Link
            href={actions.login.href}
            className="hidden text-[15px] text-ink/85 transition-colors hover:text-ink sm:block"
          >
            {actions.login.label}
          </Link>
          <Link
            href={actions.demo.href}
            className="rounded-pill bg-black px-5 py-2.5 text-[14px] font-medium text-white transition-transform hover:-translate-y-px active:translate-y-0"
          >
            {actions.demo.label}
          </Link>
        </div>
      </div>
    </header>
  );
}
