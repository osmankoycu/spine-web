"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useHeroScene } from "@/lib/hero/useHeroScene";
import { TagField } from "./TagField";
import { HeadlineMorph } from "./HeadlineMorph";

// Cap so the hero doesn't balloon on ultra-wide / very tall screens.
const MAX_SCALE = 1.35;

export function Hero() {
  const { stageRef, completeIntro } = useHeroScene();
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
      {/* Full-viewport hero stage. The INTRO pop-in + HERO_REST opening play here
          on load; you then scroll past it normally to the rest of the page. */}
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
          </div>
        </div>
      </div>
    </section>
  );
}
