// Site-wide nav + CTA config. Typed so "Log in" / "Request a demo" can switch
// between routed pages and modals/external links without touching the Header.
import { partnersMenu, platformMenu, whoMenu, type MegaMenu } from "@/lib/nav/megaMenu";

export type NavItem = { label: string; href: string; menu?: MegaMenu };

export const nav: NavItem[] = [
  { label: "Platform", href: "/platform", menu: platformMenu },
  { label: "Who we serve", href: "/who-we-serve", menu: whoMenu },
  { label: "Partners", href: "/partners", menu: partnersMenu },
  { label: "Blog", href: "/blog" },
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
