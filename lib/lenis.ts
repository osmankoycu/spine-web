// Client-side Lenis singleton. Created lazily on first use, wired into GSAP's
// ticker and ScrollTrigger. A singleton (not React state) so any component can
// grab the imperative handle synchronously, with no effect-ordering races.
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/reducedMotion";

let instance: Lenis | null = null;
let tickerFn: ((time: number) => void) | null = null;

export function getLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (prefersReducedMotion()) return null; // native scrolling only
  if (!instance) {
    // `anchors` is what makes same-page hash links work at all: Lenis drives the
    // scroll position every frame, so a native hash jump is overwritten before
    // it lands and the link silently does nothing. Lenis subtracts the target's
    // scroll-margin-top, so `scroll-mt-*` on the target keeps it clear of the
    // fixed header on both paths (under reduced motion there is no Lenis and
    // the browser applies the same margin). `href="#"` has an empty hash and is
    // left alone, and the "#demo" CTAs render as <button>, not anchors.
    instance = new Lenis({ duration: 1.1, smoothWheel: true, anchors: true });
    instance.on("scroll", ScrollTrigger.update);
    tickerFn = (time: number) => instance?.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);
  }
  return instance;
}

export function destroyLenis(): void {
  if (tickerFn) gsap.ticker.remove(tickerFn);
  instance?.destroy();
  instance = null;
  tickerFn = null;
}
