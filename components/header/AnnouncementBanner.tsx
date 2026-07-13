"use client";

import { useLayoutEffect, useState } from "react";
import { ArrowRight, X } from "@phosphor-icons/react";

// App Store listing for the Heal employee app.
const HEAL_APP_URL = "https://apps.apple.com/us/app/heal-family-health/id6503223686";
// sessionStorage flag so a dismissal sticks for the browsing session but the
// banner returns on the visitor's next visit.
const DISMISS_KEY = "heal-banner-dismissed";
const BANNER_H = "44px";

// Slim announcement bar above the header (Warp-style). It lives in normal flow at
// the very top of <body>, so it pushes the page down AND scrolls away with it —
// the header (which reads --banner-h) then slides up to the top, reclaiming the
// space. Dismissing collapses it to 0 the same way.
export function AnnouncementBanner() {
  const [visible, setVisible] = useState(true);

  // Restore a prior dismissal before paint, and keep --banner-h in sync so the
  // header never overlaps the bar (or leaves a gap once it's gone).
  useLayoutEffect(() => {
    const dismissed = sessionStorage.getItem(DISMISS_KEY) === "1";
    if (dismissed) setVisible(false);
  }, []);

  useLayoutEffect(() => {
    document.documentElement.style.setProperty("--banner-h", visible ? BANNER_H : "0px");
    // Let the fixed header re-sync its top offset in step with our collapse.
    window.dispatchEvent(new Event("bannerresize"));
  }, [visible]);

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  };

  return (
    <div
      className="relative z-[60] overflow-hidden bg-[#101114] text-white transition-[height] duration-300 ease-out"
      style={{ height: visible ? BANNER_H : "0px" }}
    >
      {/* Fixed-height content band, so the close button's vertical centring never
          drifts while the outer wrapper animates its height on dismiss. */}
      <div className="relative h-[44px]">
        <div className="mx-auto flex h-full max-w-[1480px] items-center px-4 sm:px-6 lg:px-8">
          <a
            href={HEAL_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mx-auto flex min-w-0 items-center gap-2.5 text-[13.5px] sm:gap-3 sm:text-[14px]"
          >
            <span className="shrink-0 font-semibold text-orange">New</span>
            <span aria-hidden className="hidden h-3.5 w-px bg-white/20 sm:block" />
            <span className="truncate font-semibold">
              The Heal app is now live for your team
            </span>
            <span className="hidden items-center gap-1 whitespace-nowrap text-white/55 transition-colors group-hover:text-white/80 sm:inline-flex">
              Download it now
              <ArrowRight
                size={13}
                weight="bold"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </span>
          </a>
        </div>
        {/* Pinned to the viewport's right edge with an 8px inset — equal to the
            (44−28)/2 gap above and below, so its whitespace reads balanced. */}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X size={15} weight="bold" />
        </button>
      </div>
    </div>
  );
}
