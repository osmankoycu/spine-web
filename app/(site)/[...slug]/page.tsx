import { redirect } from "next/navigation";

// Catch-all for any route without a real page (most nav / footer / mega-menu
// links point to pages that don't exist yet). Instead of a 404, send the visitor
// to the homepage. Real routes (/, /platform, /who-we-serve, …) are more specific
// and take precedence, so this only fires for unmatched paths.
export default function CatchAll() {
  redirect("/");
}
