// Which routes render their OWN merged tag-field closer (title + stat boxes +
// lead + CTA over the falling tags), so the global TagDrop must not also render.
//
// Proof stage: only multi-state-tax. On rollout, widen to a prefix check, e.g.
//   return pathname.startsWith("/platform/");
const OWN_CLOSER = new Set(["/platform/multi-state-tax"]);

export function hasOwnCloser(pathname: string | null): boolean {
  return pathname != null && OWN_CLOSER.has(pathname);
}
