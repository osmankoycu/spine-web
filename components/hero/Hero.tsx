"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { buildTags } from "@/lib/hero/heroConfig";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import { useHeroScene } from "@/lib/hero/useHeroScene";
import { TagField, type Cell } from "./TagField";
import { HeadlineMorph } from "./HeadlineMorph";

// One unified, viewport-filling tag grid. We lay pills across the whole screen on
// a single row flow; the central LABEL_ROWS×LABEL_COLS block carries the curated
// text labels, every other cell is faint random-width filler — so labels and
// filler are the SAME system (aligned, never overlapping). The whole grid is
// uniformly scaled to fit (so the 9 label rows clear the header and read large),
// and over-fills the viewport: filler runs up behind the header and out to every
// edge. TagFlow reads this one scale for every pill.
const MAX_SCALE = 1.6;
const ROW_PITCH = 91; // px per row (pill height + gap)
const COL_PITCH = 186; // ~avg pill + gap → columns per row
const LABEL_ROWS_HALF = 4; // 9 labelled rows (k = -4..4)
const LABEL_COLS_HALF = 2; // 5 labelled cells per labelled row
const REF_W = 1200; // reference labelled-block width (for the width fit)
const FILLER_MIN_W = 72;
const FILLER_MAX_W = 300;
const FILLER_OPACITY = 0.4;
const PILL_H = 81;

// Deterministic per-cell pseudo-random filler width → stable across resizes.
function fillerWidth(r: number, c: number): number {
  let s = (((r + 512) * 73856093) ^ ((c + 1) * 19349663)) >>> 0;
  s = Math.imul(s ^ (s >>> 13), 1274126177) >>> 0;
  const u = ((s ^ (s >>> 16)) >>> 0) / 4294967295;
  return Math.round(FILLER_MIN_W + u * (FILLER_MAX_W - FILLER_MIN_W));
}

// Build the unified grid (in unscaled local rows). It is symmetric around the
// centre row so the field's centre = the label block's centre; `vDist`/`hDist`
// are the screen distances (÷ scale) the grid must cover to reach the farthest
// viewport edge, so filler over-fills to every edge.
function buildGrid(vDist: number, hDist: number): Cell[][] {
  const cols = Math.max(1, Math.ceil((hDist * 2) / COL_PITCH) + 2);
  const R = Math.max(LABEL_ROWS_HALF, Math.ceil(vDist / ROW_PITCH + 0.5));
  const labels = buildTags((2 * LABEL_COLS_HALF + 1) * (2 * LABEL_ROWS_HALF + 1));
  const cc = (cols - 1) / 2;
  let li = 0;
  const rows: Cell[][] = [];
  for (let k = -R; k <= R; k++) {
    const labRow = Math.abs(k) <= LABEL_ROWS_HALF;
    const row: Cell[] = [];
    for (let c = 0; c < cols; c++) {
      const lab = labRow && Math.abs(c - cc) <= LABEL_COLS_HALF;
      if (lab && li < labels.length) {
        const t = labels[li++];
        row.push({ filler: false, label: t.label, important: !!t.important });
      } else {
        row.push({ filler: true, w: fillerWidth(k, c) });
      }
    }
    rows.push(row);
  }
  return rows;
}

export function Hero() {
  const { stageRef, completeIntro } = useHeroScene();
  const areaRef = useRef<HTMLDivElement>(null);
  const fitRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState<Cell[][] | null>(null);
  const popped = useRef(false);
  const fired = useRef(false);

  // Fit: scale the unified grid so the 9 label rows clear the header and read
  // large; then size the grid to over-fill the viewport at that scale.
  useGSAP(
    () => {
      const stage = stageRef.current;
      const area = areaRef.current;
      const fit = fitRef.current;
      if (!stage || !area || !fit) return;
      const apply = () => {
        const cs = getComputedStyle(area);
        const padT = parseFloat(cs.paddingTop);
        const padB = parseFloat(cs.paddingBottom);
        const padL = parseFloat(cs.paddingLeft);
        const padR = parseFloat(cs.paddingRight);
        const availW = area.clientWidth - padL - padR;
        const availH = area.clientHeight - padT - padB;
        if (availW <= 0 || availH <= 0) return;
        const s = Math.min(
          MAX_SCALE,
          availW / REF_W,
          availH / ((2 * LABEL_ROWS_HALF + 1) * ROW_PITCH),
        );
        fit.style.transform = `scale(${s})`;
        // The grid centre sits at the centre of the area below the header.
        const sr = stage.getBoundingClientRect();
        const centerY = padT + availH / 2;
        const vDist = Math.max(centerY, sr.height - centerY) / s;
        const hDist = sr.width / 2 / s;
        setRows(buildGrid(vDist, hDist));
      };
      apply();
      window.addEventListener("resize", apply);
      return () => window.removeEventListener("resize", apply);
    },
    { scope: fitRef },
  );

  // INTRO pop-in over every pill (labels + filler), once the grid is laid out.
  useGSAP(
    () => {
      const fit = fitRef.current;
      if (!fit || rows === null) return;
      const pills = gsap.utils.toArray<HTMLElement>("[data-tag]", fit);
      if (!pills.length) return;

      const target = (_i: number, t: Element) =>
        (t as HTMLElement).hasAttribute("data-filler") ? FILLER_OPACITY : 1;
      const settle = () => {
        if (fired.current) return;
        fired.current = true;
        completeIntro();
      };

      // Already popped (a resize rebuilt the grid) or reduced motion: just show.
      if (popped.current || prefersReducedMotion()) {
        gsap.set(pills, { opacity: target, scale: 1 });
        settle();
        return;
      }
      popped.current = true;

      gsap.set(pills, { opacity: 0, scale: 0, transformOrigin: "50% 50%" });
      gsap.to(pills, {
        opacity: target,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.8)",
        stagger: { each: 0.014, from: "random" },
        // Hold a clean beat after the LAST pill settles before handing off to the
        // headline (HERO_REST's enter() reveals the type the instant it fires).
        onComplete: () => gsap.delayedCall(0.15, settle),
      });
    },
    { dependencies: [rows], scope: fitRef },
  );

  return (
    <section aria-label="Spine hero" className="relative">
      {/* Full-viewport hero stage. The unified grid over-fills the whole stage. */}
      <div ref={stageRef} className="relative h-screen w-full overflow-hidden bg-bg">
        {/* Fit area — its centre (below the header) is the grid/label-block centre. */}
        <div
          ref={areaRef}
          className="absolute inset-0 flex items-center justify-center px-12 pb-4 pt-[164px]"
        >
          {/* Scaled wrapper (sized to the unified grid). HeadlineMorph overlays its
              centre, which is the centre of the label block. */}
          <div ref={fitRef} className="relative origin-center shrink-0 will-change-transform">
            <TagField rows={rows ?? []} pillH={PILL_H} />
            <HeadlineMorph />
          </div>
        </div>
      </div>
    </section>
  );
}
