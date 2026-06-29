"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { SpineLogo } from "@/components/SpineLogo";
import { actions, nav } from "@/lib/siteConfig";
import type { MegaFeature, MegaItem, MegaMenu } from "@/lib/nav/megaMenu";
import { menuIcons } from "./menuIcons";
import { cn } from "@/lib/cn";

// Distance (px) the user must scroll before the header condenses into its pill.
// Deliberately past the first beat of scroll so it is NOT immediate.
const PILL_AT = 90;

// Persistent across the whole page — fixed, above everything. At the very top it
// is chrome-less; once the user scrolls a little (or a menu is open) a fully-
// rounded, blurred PILL fades in behind the bar. The three primary nav items
// carry a caret and open a mega-menu panel on click.
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > PILL_AT);
      setOpen(null); // any scroll dismisses an open menu
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the open menu on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 h-[var(--header-h)]">
      <div className="mx-auto flex h-full max-w-[1480px] items-start px-4 pt-6 sm:px-6 lg:px-8">
        {/* The bar. The pill background is a separate inset layer whose OPACITY is
            tweened (cheap + smooth); content sits above it. */}
        <div className="relative flex h-[64px] w-full items-center justify-between pl-5 pr-3 sm:pl-7">
          <div
            aria-hidden
            className={cn(
              // Pill surface appears ONLY on scroll — opening a menu at the top of
              // the page does NOT bring it in (the panel floats on its own there).
              "absolute inset-0 rounded-pill bg-white/55 shadow-[0_8px_30px_rgba(0,0,0,0.07)] ring-1 ring-black/[0.06] backdrop-blur-xl transition-opacity duration-500 ease-out",
              scrolled ? "opacity-100" : "opacity-0",
            )}
          />

          <Link
            href="/"
            aria-label="Spine home"
            className="relative z-10 shrink-0"
            onClick={() => setOpen(null)}
          >
            <SpineLogo />
          </Link>

          <nav className="absolute left-1/2 z-10 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {nav.map((item) =>
              item.menu ? (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setOpen((o) => (o === item.label ? null : item.label))}
                  aria-expanded={open === item.label}
                  className={cn(
                    "flex cursor-pointer items-center gap-1.5 rounded-pill px-3.5 py-2 text-[15px] font-semibold transition-[color,background-color,box-shadow] duration-200",
                    // Hover = a thin STROKE; active (its menu is open) = a solid
                    // fill — clearly distinct states (outline vs filled).
                    open === item.label
                      ? "bg-black/[0.07] text-ink"
                      : "text-[#3b424b] hover:text-ink hover:ring-1 hover:ring-inset hover:ring-black/15",
                  )}
                >
                  {item.label}
                  <CaretDown
                    size={12}
                    weight="bold"
                    className={cn(
                      "mt-px transition-transform duration-300",
                      open === item.label && "rotate-180",
                    )}
                  />
                </button>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="cursor-pointer rounded-pill px-3.5 py-2 text-[15px] font-semibold text-[#3b424b] transition-[color,box-shadow] duration-200 hover:text-ink hover:ring-1 hover:ring-inset hover:ring-black/15"
                >
                  {item.label}
                </Link>
              ),
            )}
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

      {/* Mega-menu panels — centred under the bar; one is shown at a time. */}
      {nav.map((item) =>
        item.menu ? (
          <MegaPanel
            key={item.label}
            menu={item.menu}
            open={open === item.label}
            surfaced={scrolled}
            onNavigate={() => setOpen(null)}
          />
        ) : null,
      )}
    </header>
  );
}

function MegaPanel({
  menu,
  open,
  surfaced,
  onNavigate,
}: {
  menu: MegaMenu;
  open: boolean;
  surfaced: boolean;
  onNavigate: () => void;
}) {
  return (
    <div
      className={cn(
        "absolute left-1/2 z-40 hidden max-w-[calc(100vw-2rem)] -translate-x-1/2 md:block",
        // Sits right under the nav when the bar is chrome-less; drops a little
        // lower (clearing the pill with a gap) once the bar has its surface.
        surfaced ? "top-[102px]" : "top-[86px]",
        // Open: fade in while rising ~12px FROM BELOW. Close: reverse (fade out
        // while sinking back down). No `invisible` so the close tween is visible;
        // opacity-0 + pointer-events-none + aria-hidden keep it inert when closed.
        // NOTE: Tailwind v4 drives `translate-*` via the `translate` CSS property
        // (NOT `transform`), so the transition MUST list `translate` or the slide
        // snaps while only opacity fades.
        "origin-top transition-[opacity,translate] duration-200 ease-out",
        open
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
      style={{ width: menu.width }}
      aria-hidden={!open}
    >
      <div className="rounded-[28px] border border-black/10 bg-white/95 p-4 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.18)] backdrop-blur-xl">
        <div className="flex gap-2">
          {menu.columns.map((col) => (
            <div key={col.label} className="flex-1">
              <ColLabel>{col.label}</ColLabel>
              <div className="mt-1 space-y-0.5">
                {col.items.map((it) => (
                  <MegaItemRow key={it.title} item={it} onNavigate={onNavigate} />
                ))}
              </div>
            </div>
          ))}
          {menu.feature ? (
            <FeatureCard feature={menu.feature} onNavigate={onNavigate} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ColLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-grey-text">
      {children}
    </div>
  );
}

function MegaItemRow({ item, onNavigate }: { item: MegaItem; onNavigate: () => void }) {
  const Icon = menuIcons[item.icon];
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className="group flex cursor-pointer items-start gap-3 rounded-2xl px-3 py-2.5 transition-shadow duration-150 hover:ring-1 hover:ring-inset hover:ring-black/10"
    >
      <span
        className={cn(
          "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 transition-colors",
          item.featured
            ? "bg-orange/10 text-orange ring-orange/15"
            : "bg-grey-pill/50 text-ink ring-black/[0.04] group-hover:bg-grey-pill",
        )}
      >
        {Icon ? <Icon size={18} weight={item.featured ? "fill" : "regular"} /> : null}
      </span>
      <span className="min-w-0">
        <span className="block text-[14.5px] font-semibold leading-tight text-ink">
          {item.title}
        </span>
        {item.desc ? (
          <span className="mt-0.5 block text-[12.5px] leading-snug text-grey-text">
            {item.desc}
          </span>
        ) : null}
      </span>
    </Link>
  );
}

function FeatureCard({ feature, onNavigate }: { feature: MegaFeature; onNavigate: () => void }) {
  return (
    <div className="flex-1">
      <ColLabel>{feature.label}</ColLabel>
      <div className="mt-1 rounded-2xl bg-gradient-to-br from-[#fff4ec] to-[#ffe9d8] p-5">
        <span className="inline-flex items-center rounded-pill bg-orange/15 px-2.5 py-1 text-[11px] font-semibold text-orange">
          {feature.tag}
        </span>
        <div className="mt-3 text-[16px] font-semibold leading-tight text-ink">
          {feature.title}
        </div>
        <div className="mt-2 text-[12.5px] leading-snug text-grey-text">{feature.desc}</div>
        <Link
          href={feature.href}
          onClick={onNavigate}
          className="mt-3 inline-block text-[13px] font-semibold text-orange transition-colors hover:text-orange-600"
        >
          {feature.linkLabel}
        </Link>
      </div>
    </div>
  );
}
