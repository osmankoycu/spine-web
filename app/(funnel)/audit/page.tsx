import { Suspense } from "react";
import type { Metadata } from "next";
import { AuditPage } from "@/components/audit/AuditPage";

// The instant benefits audit — the self-serve front door for the "send us your
// plans and census" sales wedge. /overpaying and /yc redirect here (see
// next.config.ts). The page itself stays static: the ?ref=yc variant is
// resolved client-side (useSearchParams inside the Suspense boundary).
export const metadata: Metadata = {
  title: "Are you overpaying for health insurance? · Spine",
  description:
    "Answer three questions, drop in your census, and get an instant estimate of your annual overpayment. Free, runs in your browser, takes about 90 seconds.",
};

export default function AuditRoute() {
  return (
    <Suspense fallback={null}>
      <AuditPage />
    </Suspense>
  );
}
