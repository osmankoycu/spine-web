// Footer content (orange section). Data-driven so columns are easy to edit.
export type FooterLink = { label: string; href: string };
export type FooterColumn = { title: string; links: FooterLink[] };

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
      { label: "vs TriNet", href: "/compare/trinet" },
      { label: "vs Rippling", href: "/compare/rippling" },
      { label: "vs Gusto", href: "/compare/gusto" },
      { label: "vs Justworks", href: "/compare/justworks" },
      { label: "vs Newfront", href: "/compare/newfront" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Free cost audit", href: "/request-a-demo" },
      { label: "PEO exit guide", href: "/resources/peo-exit-guide" },
      { label: "Benefits benchmarks", href: "/resources/benefits-benchmarks" },
      { label: "Blog", href: "/blog" },
      { label: "Partners", href: "/partners" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Customers", href: "/customers" },
      { label: "Careers", href: "/careers" },
      { label: "Security", href: "/security" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
