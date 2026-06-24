import Link from "next/link";
import { SpineLogo } from "@/components/SpineLogo";
import { actions, nav } from "@/lib/siteConfig";

// Minimal footer for the rest-of-page (after RELEASE). Fleshed out later.
export function Footer() {
  return (
    <footer className="page-gutter border-t border-black/10 py-16">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <SpineLogo />
          <p className="mt-4 text-sm text-grey-text">
            Replace your broker and your PEO. Benefits, Compliance, and People
            Ops — one team.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-10 gap-y-3">
          {[...nav, actions.login, actions.demo].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink/80 transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <p className="mt-12 text-xs text-grey-text">
        © {new Date().getFullYear()} Spine. All rights reserved.
      </p>
    </footer>
  );
}
