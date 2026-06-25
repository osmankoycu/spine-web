"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useHeroScene } from "@/lib/hero/useSceneController";
import { TagField } from "./TagField";
import { HeadlineMorph } from "./HeadlineMorph";
import { BenefitsContent } from "./BenefitsContent";
import { STOPS } from "@/lib/hero/types";
import { cn } from "@/lib/cn";

// Cap so the hero doesn't balloon on ultra-wide / very tall screens.
const MAX_SCALE = 1.35;

export function Hero() {
  const { stageRef, phase, stopIndex, completeIntro } = useHeroScene();
  const areaRef = useRef<HTMLDivElement>(null);
  const fitRef = useRef<HTMLDivElement>(null);

  // Uniform fit-to-area: the hero is one fixed design (TagField sets its natural
  // size; HeadlineMorph overlays it). We scale the WHOLE thing — tags AND text
  // together — to fill the available area, so the layout (row count, spread) is
  // identical at every resolution and only the size changes. Recomputed on
  // resize. TagFlow reads this same scale and divides it out of its writes.
  useGSAP(() => {
    const area = areaRef.current;
    const fit = fitRef.current;
    if (!area || !fit) return;
    const apply = () => {
      fit.style.transform = "scale(1)"; // measure natural size unscaled
      const cs = getComputedStyle(area);
      const availW =
        area.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const availH =
        area.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      const w = fit.offsetWidth;
      const h = fit.offsetHeight;
      if (!w || !h) return;
      const s = Math.min(MAX_SCALE, availW / w, availH / h);
      fit.style.transform = `scale(${s})`;
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  });

  return (
    <section aria-label="Spine hero" className="relative">
      {/* One pinned, full-viewport stage. Everything morphs IN PLACE here. */}
      <div ref={stageRef} className="relative h-screen w-full overflow-hidden bg-bg">
        {/* Available area for the hero (clears the fixed header + edges). */}
        <div
          ref={areaRef}
          className="absolute inset-0 flex items-center justify-center px-28 pb-28 pt-[176px]"
        >
          {/* Scaled design canvas: TagField sizes it; HeadlineMorph overlays it. */}
          <div
            ref={fitRef}
            className="relative z-10 shrink-0 origin-center will-change-transform"
          >
            <TagField onIntroComplete={completeIntro} />
            <HeadlineMorph />
            <BenefitsContent phase={phase} />
          </div>
        </div>

        {/* Page indicator dots, pinned near the bottom. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-30 flex items-center justify-center gap-2.5">
          {STOPS.map((stop, i) => (
            <span
              key={stop}
              className={cn(
                "h-2 rounded-pill transition-all duration-300",
                i === stopIndex
                  ? "w-7 bg-ink"
                  : i < stopIndex
                    ? "w-2 bg-ink/40"
                    : "w-2 bg-ink/15",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
