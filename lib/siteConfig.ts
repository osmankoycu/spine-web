// Site-wide nav + CTA config. Typed so "Log in" / "Request a demo" can switch
// between routed pages and modals/external links without touching the Header.
export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "Platform", href: "/platform" },
  { label: "Who we serve", href: "/who-we-serve" },
  { label: "Partners", href: "/partners" },
];

// kind: "route" today; later could become "modal" | "external" with no Header change.
export const actions = {
  login: { label: "Log in", href: "/login", kind: "route" as const },
  demo: { label: "Request a demo", href: "/request-a-demo", kind: "route" as const },
};

export const heroCta = {
  label: "Get your PEO exit plan",
  href: "/request-a-demo",
};
