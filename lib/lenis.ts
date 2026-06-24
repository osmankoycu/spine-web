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
    instance = new Lenis({ duration: 1.1, smoothWheel: true });
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
