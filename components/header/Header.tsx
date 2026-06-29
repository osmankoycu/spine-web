"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SpineLogo } from "@/components/SpineLogo";
import { actions, nav } from "@/lib/siteConfig";
import { cn } from "@/lib/cn";

// Distance (px) the user must scroll before the header condenses into its pill.
// Deliberately past the first beat of scroll so it is NOT immediate.
const PILL_AT = 90;

// Persistent across the whole page — fixed, above everything. At the very top it
// is chrome-less (logo / nav / actions floating directly on the page). Once the
// user scrolls a little, a fully-rounded, blurred PILL fades in behind the bar —
// wrapping from the logo through the "Request a demo" button with even internal
// padding — so the header reads as one floating pill.
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > PILL_AT);
    onScroll(); // sync on mount (e.g. a reload mid-page)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[var(--header-h)]">
      <div className="mx-auto flex h-full max-w-[1480px] items-start px-4 pt-6 sm:px-6 lg:px-8">
        {/* The bar. The pill background is a separate inset layer whose OPACITY is
            tweened (cheap + smooth — backdrop-filter itself doesn't transition
            well); content sits above it. px gives the logo/button breathing room
            from the pill edge. */}
        {/* Asymmetric padding: the logo (left) keeps a roomy inset, but the right
            inset is tightened so the rounded "Request a demo" button nestles
            CONCENTRICALLY into the pill's rounded right cap (gap ≈ outer radius −
            button radius) instead of leaving a big arc of empty space. */}
        <div className="relative flex h-[64px] w-full items-center justify-between pl-5 pr-3 sm:pl-7">
          <div
            aria-hidden
            className={cn(
              "absolute inset-0 rounded-pill bg-white/55 shadow-[0_8px_30px_rgba(0,0,0,0.07)] ring-1 ring-black/[0.06] backdrop-blur-xl transition-opacity duration-500 ease-out",
              scrolled ? "opacity-100" : "opacity-0",
            )}
          />

          <Link href="/" aria-label="Spine home" className="relative z-10 shrink-0">
            <SpineLogo />
          </Link>

          <nav className="absolute left-1/2 z-10 hidden -translate-x-1/2 items-center gap-9 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[15px] font-semibold text-[#3b424b] transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="relative z-10 flex items-center gap-2.5">
            <Link
              href={actions.login.href}
              className="hidden px-3 py-2 text-[15px] font-semibold text-[#3b424b] transition-colors hover:text-ink sm:block"
            >
              {actions.login.label}
            </Link>
            <Link
              href={actions.demo.href}
              className="rounded-pill bg-black px-[18px] py-2.5 text-[15px] font-semibold text-white transition-transform hover:-translate-y-px active:translate-y-0"
            >
              {actions.demo.label}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
