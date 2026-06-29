// Mega-menu content for the header dropdowns. Pure data (no React) so it is
// server-safe; `icon` is a string key resolved to a Phosphor icon in the client
// (see components/header/menuIcons.ts). Content adapted from the reference site —
// emojis dropped, brand is Spine, our own icon set.

export type MegaItem = {
  icon: string; // key into menuIcons
  title: string;
  desc?: string;
  href: string;
  featured?: boolean; // accent the icon (flagship)
};

export type MegaColumn = {
  label: string;
  items: MegaItem[];
};

export type MegaFeature = {
  label: string; // column label, e.g. "Featured"
  tag: string;
  title: string;
  desc: string;
  linkLabel: string;
  href: string;
};

export type MegaMenu = {
  width: number; // panel width hint (px)
  columns: MegaColumn[];
  feature?: MegaFeature;
};

export const platformMenu: MegaMenu = {
  width: 860,
  columns: [
    {
      label: "01 · Benefits",
      items: [
        {
          icon: "ChartBar",
          title: "Plan optimization",
          desc: "Right-sized plans, every carrier",
          href: "/platform/plan-optimization",
        },
        {
          icon: "Headset",
          title: "Employee concierge",
          desc: "24/7 in-house team + AI",
          href: "/platform/employee-concierge",
        },
      ],
    },
    {
      label: "02 · Compliance",
      items: [
        {
          icon: "ShieldCheck",
          title: "Healthcare compliance",
          desc: "ACA, ERISA, COBRA, 5500",
          href: "/platform/healthcare-compliance",
        },
        {
          icon: "MapTrifold",
          title: "Multi-state tax",
          desc: "All 50 states, payroll & hiring",
          href: "/platform/multi-state-tax",
        },
        {
          icon: "Envelope",
          title: "Notice resolution",
          desc: ".gov correspondence, on autopilot",
          href: "/platform/notice-resolution",
        },
      ],
    },
    {
      label: "03 · People Ops",
      items: [
        {
          icon: "Money",
          title: "Payroll runs",
          desc: "We run it on Gusto, Rippling, etc.",
          href: "/platform/payroll",
        },
        {
          icon: "Handshake",
          title: "Onboarding & offboarding",
          desc: "I-9, E-Verify, final paychecks",
          href: "/platform/onboarding",
        },
        {
          icon: "ClipboardText",
          title: "Employee records & PTO",
          desc: "Day-to-day HR ops",
          href: "/platform/records-pto",
        },
      ],
    },
  ],
};

export const whoMenu: MegaMenu = {
  width: 900,
  columns: [
    {
      label: "By size",
      items: [
        {
          icon: "Rocket",
          title: "Startups",
          desc: "From your first hire to Series A",
          href: "/who-we-serve/startups",
        },
        {
          icon: "TrendUp",
          title: "Mid-Market",
          desc: "30–200 person teams scaling fast",
          href: "/who-we-serve/mid-market",
        },
        {
          icon: "Buildings",
          title: "Enterprise",
          desc: "200+ employees, multi-state",
          href: "/who-we-serve/enterprise",
        },
      ],
    },
    {
      label: "By team",
      items: [
        {
          icon: "UsersThree",
          title: "HR & People",
          desc: "Stop fielding benefits questions",
          href: "/who-we-serve/hr-people",
        },
        {
          icon: "Wallet",
          title: "Finance & CFO",
          desc: "Cut healthcare spend without cutting benefits",
          href: "/who-we-serve/finance-cfo",
        },
        {
          icon: "Lightning",
          title: "Founders",
          desc: "Real benefits from day one, zero admin",
          href: "/who-we-serve/founders",
        },
        {
          icon: "Target",
          title: "Chief of Staff",
          desc: "One platform that just works",
          href: "/who-we-serve/chief-of-staff",
        },
      ],
    },
    {
      label: "By industry",
      items: [
        { icon: "Laptop", title: "Tech & SaaS", href: "/who-we-serve/tech-saas" },
        { icon: "Robot", title: "AI companies", href: "/who-we-serve/ai-companies" },
        { icon: "CreditCard", title: "Fintech", href: "/who-we-serve/fintech" },
        {
          icon: "Dna",
          title: "Healthcare & biotech",
          href: "/who-we-serve/healthcare-biotech",
        },
        {
          icon: "Briefcase",
          title: "Professional services",
          href: "/who-we-serve/professional-services",
        },
      ],
    },
  ],
};

export const partnersMenu: MegaMenu = {
  width: 720,
  columns: [
    {
      label: "Partner with Spine",
      items: [
        {
          icon: "Star",
          title: "Fractional HR community",
          desc: "Our flagship partner network · 50+ practitioners",
          href: "/partners/fractional-hr",
          featured: true,
        },
        {
          icon: "Notebook",
          title: "Accountants & fractional CFOs",
          desc: "Save your clients on their largest people cost",
          href: "/partners/accountants",
        },
        {
          icon: "Diamond",
          title: "Venture capital",
          desc: "Portfolio benefits for your funded companies",
          href: "/partners/vc",
        },
        {
          icon: "Bank",
          title: "Private equity",
          desc: "Cut healthcare spend across your portfolio",
          href: "/partners/private-equity",
        },
      ],
    },
  ],
  feature: {
    label: "Featured",
    tag: "Flagship partner",
    title: "The Spine HR Community",
    desc: "50+ vetted fractional HR practitioners. Spine handles benefits and compliance — they handle people strategy. Both grow together.",
    linkLabel: "Join the community →",
    href: "/partners/fractional-hr",
  },
};
