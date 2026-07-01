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
// Desktop settles at this comfortable scale regardless of viewport HEIGHT; the row
// count fills the height instead (see the fit logic). MIN_SCALE stops very narrow
// screens going unreadable.
const DESKTOP_TARGET_SCALE = 1.0;
const MIN_SCALE = 0.5;
const ROW_PITCH = 99; // px per row (pill height 81 + 18px gap)
const COL_PITCH = 200; // ~avg pill + gap → columns per row
const LABEL_ROWS_HALF = 4; // 9 labelled rows (k = -4..4)
const LABEL_COLS_HALF = 2; // 5 labelled cells per labelled row
const REF_W = 1200; // reference labelled-block width (for the width fit)
// On phones we fit a NARROWER reference width → larger scale → the tags read big,
// only the centre region shows, and we let the motto wrap. It's a "zoom in", not
// a shrink.
const REF_W_MOBILE = 480;
const MOBILE_MAX_W = 640; // below this viewport width we treat it as mobile
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
        const mobile = availW < MOBILE_MAX_W;
        // Scale is driven by WIDTH only (so the labelled block fits), clamped to a
        // comfortable band — NOT by height. The number of rows fills the height
        // instead (buildGrid below). This keeps tags & text a consistent, readable
        // size at any aspect ratio: short viewports simply show fewer rows ("zoom
        // in") and tall viewports show more rows ("tighter"), instead of shrinking
        // to unreadable (short/wide) or ballooning huge (tall/square).
        const widthFit = availW / (mobile ? REF_W_MOBILE : REF_W);
        // Phones zoom via the narrow mobile reference (stay width-bound), so their
        // ceiling is MAX_SCALE; desktop settles at the comfortable target.
        const ceil = mobile ? MAX_SCALE : DESKTOP_TARGET_SCALE;
        const s = Math.max(MIN_SCALE, Math.min(ceil, widthFit));
        fit.style.transform = `scale(${s})`;
        // The grid centre sits at the centre of the area below the header.
        const sr = stage.getBoundingClientRect();
        // On mobile, cap BOTH motto lines to ~the stage width (÷ scale, since the
        // canvas is scaled) so they WRAP into a big multi-line block — the "zoom
        // in" look — instead of overflowing (incl. long rotating words like
        // "Compliance" on line 2). Desktop stays one line per line.
        const measures = fit.querySelectorAll<HTMLElement>("[data-h-measure]");
        const cap = `${Math.round((sr.width * 0.9) / s)}px`;
        measures.forEach((m) => {
          m.style.maxWidth = mobile ? cap : "";
          m.style.whiteSpace = mobile ? "normal" : "";
        });
        // Subtitle: on mobile its 560px (unscaled) max-width, once scaled, is wider
        // than the phone → it overflows. Cap it to the stage width (÷ scale) so it
        // wraps inside the screen. Desktop keeps the className max-width.
        const subtitle = fit.querySelector<HTMLElement>("[data-subtitle]");
        if (subtitle) subtitle.style.maxWidth = mobile ? cap : "";
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
        // The field forms FAST — ~2× quicker than before (half the per-pill pop +
        // half the stagger) so the wall snaps into place.
        duration: 0.25,
        ease: "back.out(1.8)",
        stagger: { each: 0.007, from: "random" },
        // …then hold a slightly LONGER beat after the last pill settles before the
        // type arrives (HERO_REST's enter() reveals the headline + parts the tags),
        // so the fast formation and the text read as two clean, separated moments.
        onComplete: () => gsap.delayedCall(0.4, settle),
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
          className="absolute inset-0 flex items-center justify-center px-5 py-[84px] sm:px-12"
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
