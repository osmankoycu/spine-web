import Link from "next/link";
import { GithubLogo, LinkedinLogo, XLogo } from "@phosphor-icons/react/dist/ssr";
import { SpineLogo } from "@/components/SpineLogo";
import { footerBottomLinks, footerColumns, footerTagline } from "@/lib/footerConfig";

// Near-black footer (solid) in the tone of the dark comparison matrix above.
// White wordmark with an orange "." accent; orange column headings; a divided
// bottom bar carries the copyright and, on the right, the legal links (+ socials).
const SOCIALS = [
  { label: "LinkedIn", href: "#", Icon: LinkedinLogo },
  { label: "X", href: "#", Icon: XLogo },
  { label: "GitHub", href: "#", Icon: GithubLogo },
];
// Socials are hidden for now (kept here to re-enable later — flip to true).
const SHOW_SOCIALS = false;

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white px-1 text-white sm:px-6 lg:px-8">
      {/* Inset card — side gutters match the header width, top corners rounded. */}
      <div className="mx-auto max-w-[1480px] rounded-t-[22px] bg-[#15140f] px-4 pb-8 pt-9 sm:rounded-t-[28px] sm:px-8 sm:pt-14 md:rounded-t-[40px] lg:px-14 lg:pb-9 lg:pt-16">
        {/* Top — brand + link columns */}
        <div className="grid grid-cols-1 gap-9 sm:gap-12 lg:grid-cols-[2.3fr_repeat(3,1fr)] lg:gap-x-10">
          {/* Brand */}
          <div className="md:max-w-[360px]">
            <SpineLogo fill="#ffffff" dotFill="#ff6c16" className="!h-[52px] md:!h-[70px]" />
            <p className="mt-5 text-[15px] font-medium leading-snug text-white/70">
              {footerTagline}
            </p>
          </div>

          {/* Link columns — 2-up from the smallest width. Three columns do leave
              the bottom-right quadrant empty, but stacking them made the footer
              roughly three screens long on a phone; the short last column reads
              as a deliberate step, not a hole. lg+ hands each one its own track. */}
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-8 sm:gap-y-10 lg:contents">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[13px] font-bold uppercase tracking-[0.08em] text-orange">
                  {col.title}
                </h3>
                {/* space-y-0 + per-link padding: same visual rhythm, but each
                    link's hit area is ~46px instead of the 22px text box.
                    nowrap only from lg, where the column track guarantees room —
                    below that it pushed long labels out of the card padding. */}
                <ul className="mt-3 space-y-0">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="inline-block py-2 text-[14px] leading-snug text-white/60 transition-colors hover:text-white sm:py-[11px] sm:text-[15px] lg:py-1.5 lg:whitespace-nowrap"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar — copyright · legal links (+ socials, hidden for now) */}
        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-6 sm:mt-14 sm:gap-6 sm:pt-7 md:mt-16 md:flex-row md:items-center md:justify-between">
          <span className="text-[14px] text-white/45">
            © {year} Spine. All rights reserved.
          </span>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-[14px]">
            {footerBottomLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="font-medium text-white/65 transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            {SHOW_SOCIALS && (
              <div className="ml-1 flex items-center gap-5">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="text-white/55 transition-colors hover:text-white"
                  >
                    <Icon size={23} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
