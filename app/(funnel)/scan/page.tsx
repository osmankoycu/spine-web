import { Suspense } from "react";
import type { Metadata } from "next";
import { ScanPage } from "@/components/scan/ScanPage";

// The 45-second setup scan — the early-stage funnel (2–10 people, usually no
// group plan yet). /setup redirects here (see next.config.ts). Static page;
// ?ref=yc resolves client-side inside the Suspense boundary.
export const metadata: Metadata = {
  title: "The 45-second setup scan · Spine",
  description:
    "Six taps. We scan your payroll, benefits, and compliance setup for what's missing, then a licensed specialist starts clearing it today. Free, carriers pay us.",
};

export default function ScanRoute() {
  return (
    <Suspense fallback={null}>
      <ScanPage />
    </Suspense>
  );
}
