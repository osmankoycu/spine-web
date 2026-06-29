"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { buildTags } from "@/lib/hero/heroConfig";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import { cn } from "@/lib/cn";

// Deterministic layout (built once at module load → SSR/client markup match).
// Laid out at a fixed DESIGN width (1280px) in a fixed row count; the parent
// canvas in <Hero> uniformly scales the whole thing to fit the viewport, so the
// row count never changes with resolution — only the size scales.
const TAGS = buildTags(38);

type TagFieldProps = {
  /** Fired once the INTRO pop-in completes → opens HERO_REST. */
  onIntroComplete?: () => void;
  className?: string;
};

/**
 * Data-driven HR-event tag grid (Section 6) + INTRO pop-in (Section 4):
 * pills pop in one-by-one in randomized order with a spring overshoot, ~1.5s.
 * Packed edge to edge (justify-between) at a fixed 1280px design width.
 */
export function TagField({ onIntroComplete, className }: TagFieldProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const pills = gsap.utils.toArray<HTMLElement>("[data-tag]", el);

      if (prefersReducedMotion()) {
        gsap.set(pills, { opacity: 1, scale: 1 });
        onIntroComplete?.();
        return;
      }

      // Hide pre-paint (useGSAP runs in a layout effect → no flash).
      gsap.set(pills, { opacity: 0, scale: 0, transformOrigin: "50% 50%" });
      gsap.to(pills, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.8)", // spring overshoot
        stagger: { each: 0.04, from: "random" }, // randomized pop order
        // Hold a clean beat after the LAST pill settles before handing off to the
        // headline. HERO_REST's enter() ghosts the field + reveals the type the
        // instant it's called, so firing it immediately overlaps the tail of the
        // pop-in (pills not fully settled yet). The pause separates the two:
        // tags open first, THEN the type arrives — no clash.
        onComplete: () => gsap.delayedCall(0.15, () => onIntroComplete?.()),
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden
      className={cn(
        "flex w-[1280px] flex-wrap content-center justify-between gap-y-[10px]",
        className,
      )}
    >
      {TAGS.map((tag, i) => (
        <span
          key={`${tag.label}-${i}`}
          data-tag
          data-important={tag.important || undefined}
          className={cn(
            // Figma: every pill shares the same #e1e5ea bg; only the TEXT colour
            // distinguishes them — important = black, normal = bg-colour ghost.
            "relative box-border flex items-center justify-center whitespace-nowrap rounded-pill bg-grey-pill px-[30px] py-[21px] text-[24px] font-medium leading-[39.42px] tracking-[-0.27px] will-change-transform select-none",
            tag.important ? "text-black" : "text-bg",
          )}
        >
          <span data-tag-label>{tag.label}</span>
        </span>
      ))}
    </div>
  );
}
