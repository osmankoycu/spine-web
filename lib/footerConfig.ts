// Footer content (orange section). Data-driven so columns are easy to edit.
export type FooterLink = { label: string; href: string };
export type FooterColumn = { title: string; links: FooterLink[] };

// Small legal/utility links in the footer's bottom bar.
export const footerBottomLinks: FooterLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export const footerTagline =
  "Enterprise benefits, compliance, and care for ambitious startups, without the PEO.";

export const footerColumns: FooterColumn[] = [
  {
    title: "Platform",
    links: [
      { label: "For employees", href: "/platform/for-employees" },
      { label: "For employers", href: "/platform/for-employers" },
      { label: "AI Concierge", href: "/platform/ai-concierge" },
      { label: "Plan optimizer", href: "/platform/plan-optimizer" },
      { label: "Compliance", href: "/platform/compliance" },
    ],
  },
  {
    title: "Compare",
    links: [
      { label: "vs TriNet PEO", href: "/compare/trinet" },
      { label: "vs Rippling PEO", href: "/compare/rippling" },
      { label: "vs Broker + Gusto", href: "/compare/gusto" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Free cost audit", href: "/request-a-demo" },
      { label: "PEO exit guide", href: "/resources/peo-exit-guide" },
      { label: "Benefits benchmarks", href: "/resources/benefits-benchmarks" },
    ],
  },
];
