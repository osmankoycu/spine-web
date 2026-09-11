import type { Metadata } from "next";
import { StartupProgram } from "@/components/interior/StartupProgram";

export const metadata: Metadata = {
  title: "Startup program · Spine",
  description:
    "Free benefits, compliance, and people ops for startups with 2+ employees. Live in 7–10 days, no PEO, no co-employment. Carriers pay us, not you.",
};

export default function StartupsPage() {
  return <StartupProgram />;
}
