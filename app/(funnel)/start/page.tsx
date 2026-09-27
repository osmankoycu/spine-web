import { Suspense } from "react";
import type { Metadata } from "next";
import { StartRouter } from "@/components/funnel/StartRouter";

// General funnel entry; ref=yc selects the YC video on this same page.
// One tap routes to /audit or /scan with prefills.
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
