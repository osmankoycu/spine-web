import type { Metadata } from "next";
import { ForEmployers } from "@/components/interior/ForEmployers";

// Explicit route — takes precedence over app/platform/[slug] (which renders the
// data-driven TemplateA for the 8 feature slugs). This is the bespoke "for
// employers" benefits-explainer linked from the footer's Platform column.
export const metadata: Metadata = {
  title: "For employers · Spine",
  description:
    "Better plans, lower premiums, run for you. Spine is the modern alternative to brokers and PEOs — benefits, compliance, and people ops on your own entity, free for your company.",
};

export default function ForEmployersPage() {
  return <ForEmployers />;
}
