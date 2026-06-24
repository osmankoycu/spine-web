import Link from "next/link";
import { SpineLogo } from "@/components/SpineLogo";
import { actions, nav } from "@/lib/siteConfig";

// Persistent across the entire hero sequence — fixed, does NOT animate with the
// phases (Section 4). Sits above the pinned stage; inside the rounded page card.
// Layout: logo hard-left, action buttons hard-right (both at the same px-28
// gutter as the hero stage), nav links ABSOLUTELY centred on the viewport.
export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[var(--header-h)]">
      <div className="relative flex h-full items-center justify-between px-28">
        <Link href="/" aria-label="Spine home" className="relative z-10 shrink-0">
          <SpineLogo />
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] font-medium text-[#3b424b] transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="relative z-10 flex items-center gap-2.5">
          <Link
            href={actions.login.href}
            className="hidden px-3 py-2 text-[15px] font-medium text-[#3b424b] transition-colors hover:text-ink sm:block"
          >
            {actions.login.label}
          </Link>
          <Link
            href={actions.demo.href}
            className="rounded-pill bg-black px-[18px] py-2.5 text-[15px] font-medium text-white transition-transform hover:-translate-y-px active:translate-y-0"
          >
            {actions.demo.label}
          </Link>
        </div>
      </div>
    </header>
  );
}
