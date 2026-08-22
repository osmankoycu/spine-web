// Collapsible "How to export your census" guides under the drop zone. Native
// <details> — no JS, keyboard-accessible for free. Menu paths must mirror the
// vendors' real export UIs verbatim (researched, not guessed).
import { IconChevronDown, IconFileText } from "./icons";

type Guide = { hris: string; badge?: string; steps: string[] };

// Menu paths mirror each vendor's export UI as of Aug 2026 (Gusto and Deel
// from their own help centers; Rippling from its integration partners' guides,
// since help.rippling.com is login-walled). Re-verify quarterly.
// Deel leads: its canned "Benefits Census" report is exactly this file, no
// report building needed.
const GUIDES: Guide[] = [
  {
    hris: "Deel",
    badge: "Easiest",
    steps: [
      "In the left sidebar, open Analytics, then Reports.",
      "Pick the Benefits Census report. It lists every worker with demographics and enrollment info, ready to go.",
      "Open the report's three-dot menu, select Export, and choose CSV.",
    ],
  },
  {
    hris: "Gusto",
    steps: [
      "Go to Reports and click New Custom Report in the top right.",
      "Set Group by to Employee, then under Columns add Date of birth and Employee current home address (state).",
      "Click Download and choose CSV.",
    ],
  },
  {
    hris: "Rippling",
    steps: [
      "Go to Tools, then Reports, and click New Report. Choose Start from Scratch.",
      "Add these fields: Date of birth, Home - State code, Home - Zip. Skip names. We only read ages and states.",
      "Run the report, click the download icon, set File Type to CSV, and hit Download.",
    ],
  },
];

export function ExportGuides() {
  return (
    <div>
      <div className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-ink-2">
        How to export your census
      </div>
      <div className="mt-3 space-y-2">
        {GUIDES.map((g) => (
          <details
            key={g.hris}
            className="group rounded-[14px] border border-hairline bg-white"
          >
            <summary className="flex cursor-pointer list-none items-center gap-2.5 px-4 py-3 [&::-webkit-details-marker]:hidden">
              <IconFileText size={16} className="shrink-0 text-ink-2" />
              <span className="text-[14.5px] font-semibold text-ink">From {g.hris}</span>
              {g.badge && (
                <span className="rounded-pill bg-success-tint px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-success">
                  {g.badge}
                </span>
              )}
              <IconChevronDown
                size={16}
                className="ml-auto shrink-0 text-grey-text transition-transform group-open:rotate-180"
              />
            </summary>
            <ol className="space-y-2 px-4 pb-4 pt-1">
              {g.steps.map((step, i) => (
                <li key={i} className="flex gap-2.5 text-[13.5px] leading-snug text-body-2">
                  <span className="grid size-5 shrink-0 place-items-center rounded-pill bg-grey-pill text-[11px] font-extrabold text-ink-2">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </details>
        ))}
      </div>
    </div>
  );
}
