"use client";

// Shared building blocks for the three interior detail templates. Kept small and
// presentational; all page copy is passed in from lib/interior/*.
import Link from "next/link";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import { useDemoModal } from "@/components/cta/DemoModal";
import type { Breadcrumb as Crumb, Cta, TwoTone } from "@/lib/interior/types";

// ── Two-tone heading text ──────────────────────────────────────────
// Inline: pre (base) + accent (orange) + post (base). When `block`, the accent
// drops to its own line (used for the split H1 in template A). When `mono`, the
// accent renders in the base colour instead of orange — used for every heading
// except the main hero H1 (only the hero is two-tone, per brand direction).
export function TwoToneText({
  parts,
  block,
  light,
  mono,
}: {
  parts: TwoTone;
  block?: boolean;
  light?: boolean;
  mono?: boolean;
}) {
  const base = light ? "text-white" : "text-ink";
  return (
    <>
      {parts.pre ? <span className={base}>{parts.pre}</span> : null}
      {parts.accent ? (
        <>
          {block ? <br /> : parts.pre ? " " : null}
          <span className={mono ? base : "text-orange"}>{parts.accent}</span>
        </>
      ) : null}
      {parts.post ? <span className={base}>{parts.post}</span> : null}
    </>
  );
}

// ── Eyebrow (uppercase micro-label) ────────────────────────────────
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-[12px] font-extrabold uppercase tracking-[0.16em] text-orange-700",
        className,
      )}
    >
      {children}
    </span>
  );
}

// ── Breadcrumb row ─────────────────────────────────────────────────
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <div className="mb-[22px] flex flex-wrap items-center gap-2 text-[13px] text-muted">
      {items.map((c, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="opacity-50">/</span>}
          {c.current ? (
            <span className="font-semibold text-ink">{c.label}</span>
          ) : c.href ? (
            <Link href={c.href} className="text-body-2 hover:text-ink">
              {c.label}
            </Link>
          ) : (
            <span className="text-body-2">{c.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}

// ── Buttons ────────────────────────────────────────────────────────
type ButtonProps = {
  cta: Cta;
  variant?: "primary" | "secondary" | "ink";
  size?: "md" | "lg";
  arrow?: boolean;
};

export function Button({ cta, variant = "primary", size = "md", arrow }: ButtonProps) {
  const { open } = useDemoModal();
  const pad = size === "lg" ? "px-[30px] py-4 text-[16px]" : "px-6 py-[14px] text-[15px]";
  const styles = {
    primary: "bg-orange text-white hover:bg-orange-600",
    secondary: "border border-btn-line bg-white text-ink hover:border-muted",
    ink: "bg-ink text-white hover:bg-black",
  }[variant];
  // Full-width below sm. Hero CTA pairs sit in a flex-wrap row, so at phone
  // widths they broke onto two lines but kept their content widths — a ~260px
  // pill above a ~170px one, ragged on the right and reading as an accident.
  // Full-bleed stacking gives them a shared edge and lets fill (not width)
  // carry the primary/secondary hierarchy. Inline widths return from sm up.
  const cls = cn(
    "flex w-full cursor-pointer items-center justify-center gap-2 rounded-pill font-bold transition-colors sm:inline-flex sm:w-auto",
    pad,
    styles,
  );
  const inner = (
    <>
      {cta.label}
      {arrow && <ArrowRight size={size === "lg" ? 16 : 15} weight="bold" />}
    </>
  );

  // "#demo" is a sentinel: open the Request-a-demo modal instead of navigating.
  if (cta.href === "#demo") {
    return (
      <button type="button" onClick={open} className={cls}>
        {inner}
      </button>
    );
  }
  return (
    <Link href={cta.href} className={cls}>
      {inner}
    </Link>
  );
}

// ── Inline check items (hero) ──────────────────────────────────────
export function CheckRow({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2.5">
      {items.map((c) => (
        <span
          key={c}
          className="flex items-center gap-[7px] text-[14px] font-medium text-ink-2"
        >
          <CheckCircle size={16} weight="bold" className="text-orange" />
          {c}
        </span>
      ))}
    </div>
  );
}
