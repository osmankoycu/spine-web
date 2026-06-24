"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { buildTags } from "@/lib/hero/heroConfig";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import { cn } from "@/lib/cn";

// Deterministic layout (built once at module load → SSR/client markup match).
const TAGS = buildTags();

type TagFieldProps = {
  /** Fired once the INTRO pop-in completes → opens HERO_REST. */
  onIntroComplete?: () => void;
  className?: string;
};

/**
 * Data-driven HR-event tag grid (Section 6) + INTRO pop-in (Section 4).
 * The grid is SCALE-TO-FIT: it lays out at its natural size, then the whole
 * field is uniformly scaled so it always sits fully inside the stage (never
 * overflowing above the header or below) — recomputed on resize, so the fit is
 * dynamic. TagFlow detects that scale and divides it out of its translate writes.
 */
export function TagField({ onIntroComplete, className }: TagFieldProps) {
  const root = useRef<HTMLDivElement>(null);
  const fit = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const rootEl = root.current;
      const fitEl = fit.current;
      const gridEl = grid.current;
      if (!rootEl || !fitEl || !gridEl) return;

      // Scale the grid down (never up) so it fits the available stage area.
      const fitToArea = () => {
        fitEl.style.transform = "scale(1)"; // measure natural size first
        const cs = getComputedStyle(rootEl);
        const availW =
          rootEl.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
        const availH =
          rootEl.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
        const gw = gridEl.offsetWidth;
        const gh = gridEl.offsetHeight;
        if (!gw || !gh) return;
        const s = Math.min(1, availW / gw, availH / gh);
        fitEl.style.transform = `scale(${s})`;
      };
      fitToArea();
      window.addEventListener("resize", fitToArea);

      const pills = gsap.utils.toArray<HTMLElement>("[data-tag]", gridEl);

      if (prefersReducedMotion()) {
        gsap.set(pills, { opacity: 1, scale: 1 });
        onIntroComplete?.();
        return () => window.removeEventListener("resize", fitToArea);
      }

      // Hide pre-paint (useGSAP runs in a layout effect → no flash).
      gsap.set(pills, { opacity: 0, scale: 0, transformOrigin: "50% 50%" });
      gsap.to(pills, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.8)", // spring overshoot
        stagger: { each: 0.035, from: "random" }, // randomized pop order
        onComplete: () => onIntroComplete?.(),
      });

      return () => window.removeEventListener("resize", fitToArea);
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden
      className={cn(
        "absolute inset-0 flex items-center justify-center px-[var(--page-px)]",
        "pb-12 pt-[calc(var(--header-h)+16px)]",
        className,
      )}
    >
      {/* Scale wrapper (transform applied imperatively in fitToArea). */}
      <div ref={fit} className="origin-center">
        {/* Natural-size grid — fills the width up to 1280px, packs rows edge to
            edge (justify-between) like the Figma reference. */}
        <div
          ref={grid}
          className="flex w-full max-w-[1280px] flex-wrap content-center justify-between gap-y-[10px]"
        >
          {TAGS.map((tag, i) => (
            <span
              key={`${tag.label}-${i}`}
              data-tag
              data-important={tag.important || undefined}
              className={cn(
                // Figma: every pill shares the same #e1e5ea bg; only the TEXT
                // colour distinguishes them — important = black, normal = ghost.
                "whitespace-nowrap rounded-pill bg-grey-pill px-[30px] py-[21px] text-[24px] font-medium leading-[39.42px] tracking-[-0.27px] will-change-transform select-none",
                tag.important ? "text-black" : "text-bg",
              )}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
