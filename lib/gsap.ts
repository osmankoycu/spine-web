// Single GSAP entry point. Registers plugins once, client-side only.
// Import { gsap, ScrollTrigger, Flip } from "@/lib/gsap" everywhere so plugin
// registration is guaranteed and never duplicated.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip);
}

export { gsap, ScrollTrigger, Flip };
