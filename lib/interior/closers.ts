// Which routes render their OWN merged tag-field closer (title + stat boxes +
// lead + CTA over the falling tags), so the global TagDrop must not also render.
//
// Every Platform detail page (/platform/<slug>) uses the merged closer + the
// black-box how-it-works + centered section headers. The /platform index itself
// (no trailing slug) is excluded, so it keeps the global TagDrop.
export function hasOwnCloser(pathname: string | null): boolean {
  return pathname != null && pathname.startsWith("/platform/");
}
