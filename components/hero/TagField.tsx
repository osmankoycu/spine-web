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
 * Data-driven HR-event tag grid (Section 6) + INTRO pop-in (Section 4):
 * pills pop in one-by-one in randomized order with a spring overshoot, ~1.5s.
 * The same pills are later popped DOWN in place by the master timeline.
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
        stagger: { each: 0.035, from: "random" }, // randomized pop order
        onComplete: () => onIntroComplete?.(),
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden
      className={cn(
        "flex items-center justify-center px-[var(--page-px)]",
        className,
      )}
    >
      {/* Bounded, centered grid (~1200px) so the initial layout is stable across
          viewport sizes — the physics then pushes pills out of this box and they
          may overflow the edges (that's fine). */}
      <div className="flex max-w-[1200px] flex-wrap content-center justify-center gap-x-7 gap-y-6">
        {TAGS.map((tag, i) => (
          <span
            key={`${tag.label}-${i}`}
            data-tag
            data-important={tag.important || undefined}
            className={cn(
              "whitespace-nowrap rounded-pill px-8 py-[1.1rem] text-[1.2rem] font-medium leading-none will-change-transform select-none",
              tag.important
                ? "bg-black text-white"
                : "bg-grey-pill text-grey-text",
            )}
          >
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
}
