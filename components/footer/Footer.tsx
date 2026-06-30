import Link from "next/link";
import { SpineLogo } from "@/components/SpineLogo";
import { footerColumns, footerTagline } from "@/lib/footerConfig";

// Orange footer — 400px tall. White wordmark (90px), tagline + copyright on the
// LEFT (wider cell); the four link columns are EVENLY distributed across the rest
// (a 1.5fr + 4×1fr grid) so the row reads balanced — no big gap after the logo,
// no column jammed against the right edge.
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white px-4 text-black sm:px-6 lg:px-8">
      {/* Inset orange card — side gutters match the header width, top corners
          rounded (close to the menu panel's radius); flat bottom to the page edge. */}
      <div className="mx-auto max-w-[1480px] rounded-t-[40px] bg-orange">
        <div className="grid grid-cols-1 gap-12 px-8 py-16 md:h-[400px] md:grid-cols-[2.3fr_repeat(4,1fr)] md:items-center md:gap-x-10 md:py-0 lg:px-14">
          {/* Brand */}
          <div className="md:max-w-[360px]">
          <SpineLogo fill="#ffffff" className="!h-[90px]" />
          <p className="mt-6 text-[15px] font-medium leading-snug text-black/85">
            {footerTagline}
          </p>
          <p className="mt-7 text-[13px] text-black/60">
            © {year} Spine. All rights reserved.
          </p>
        </div>

        {/* Link columns */}
        {footerColumns.map((col) => (
          <div key={col.title}>
            <h3 className="text-[13px] font-bold uppercase tracking-[0.08em] text-white">
              {col.title}
            </h3>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="whitespace-nowrap text-[15px] text-black/80 transition-colors hover:text-black"
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
    </footer>
  );
}
