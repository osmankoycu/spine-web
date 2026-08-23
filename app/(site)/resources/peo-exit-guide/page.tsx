import type { Metadata } from "next";
import { PeoExitGuide } from "@/components/interior/PeoExitGuide";

export const metadata: Metadata = {
  title: "PEO exit guide · Spine",
  description:
    "Leaving your PEO? The signals, the trade-offs you stop making, a 7–10 day switch path, and the FAQ — plus a free exit audit. Keep your entity, keep your stack, lose the co-employment.",
};

export default function PeoExitGuidePage() {
  return <PeoExitGuide />;
}
