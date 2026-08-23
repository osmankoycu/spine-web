import { Suspense } from "react";
import type { Metadata } from "next";
import { StartRouter } from "@/components/funnel/StartRouter";

// Funnel router entry — /yc lands here (307, ref preserved) and one tap
// routes to /audit or /scan with prefills. Static; ref resolves client-side.
export const metadata: Metadata = {
  title: "Get started · Spine",
  description:
    "Tell us your team size and we'll point you at the right 45 seconds: the setup scan or the renewal audit. Free, carriers pay us.",
};

export default function StartRoute() {
  return (
    <Suspense fallback={null}>
      <StartRouter />
    </Suspense>
  );
}
