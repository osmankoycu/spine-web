// Which routes render their OWN merged tag-field closer (CTA over the falling
// tags), so the global TagDrop must not also render. Every Platform and Who-we-
// serve detail page opts in; the section indexes (no trailing slug) are excluded
// and keep the global TagDrop.
export function hasOwnCloser(pathname: string | null): boolean {
  return (
    pathname != null &&
    (pathname.startsWith("/platform/") ||
      pathname.startsWith("/who-we-serve/") ||
      pathname.startsWith("/partners/") ||
      pathname.startsWith("/compare/"))
  );
}
