import type { Metadata } from "next";
import { ForEmployees } from "@/components/interior/ForEmployees";

// Explicit route — takes precedence over app/platform/[slug]. The bespoke "for
// employees" benefits-explainer linked from the footer's Platform column.
export const metadata: Metadata = {
  title: "For employees · Spine",
  description:
    "One place for every healthcare question. A 24/7 concierge — AI plus a real team — helps every employee use their benefits, find care, cut prescription costs, and fight wrong medical bills. Free on iOS and Android.",
};

export default function ForEmployeesPage() {
  return <ForEmployees />;
}
