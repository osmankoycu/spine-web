// prefers-reduced-motion helper. When true, the hero skips the choreography
// and renders the resting state of each phase statically (see Section 3.6).
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
