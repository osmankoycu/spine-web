// Which routes render their OWN merged tag-field closer (CTA over the falling
// tags), so the global TagDrop must not also render. Every Platform, Who-we-
// serve, Partners, Compare and Resources detail page opts in; the section
// indexes (no trailing slug) are excluded and keep the global TagDrop.
// "/startups" is an exact match: the campaign page ends with its own closer
// anchored to the application form, and it has no child routes.
export function hasOwnCloser(pathname: string | null): boolean {
  return (
    pathname != null &&
    (pathname === "/startups" ||
      pathname.startsWith("/platform/") ||
      pathname.startsWith("/who-we-serve/") ||
      pathname.startsWith("/partners/") ||
      pathname.startsWith("/compare/") ||
      pathname.startsWith("/resources/"))
  );
}
