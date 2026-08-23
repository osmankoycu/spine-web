import type { Metadata } from "next";
import { BenefitsBenchmarks } from "@/components/interior/BenefitsBenchmarks";

export const metadata: Metadata = {
  title: "Benefits benchmarks · Spine",
  description:
    "Typical benefits spend, savings, and PEO fees by team size and stage — Spine's own figures from the companies we run benefits for. Sanity-check your numbers, then get a free custom estimate.",
};

export default function BenefitsBenchmarksPage() {
  return <BenefitsBenchmarks />;
}
