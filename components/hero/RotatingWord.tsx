import { rotatingWords } from "@/lib/hero/heroConfig";

// The orange rotating word in the HERO_REST headline. Markup only — the swap
// animation and reflow are driven imperatively by HeroRestController (it cycles
// the text and re-measures the headline width). inline-block so it can transform.
export function RotatingWord() {
  return (
    <span data-rword className="inline-block text-orange">
      {rotatingWords[0]}
    </span>
  );
}
