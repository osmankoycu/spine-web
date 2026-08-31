import Link from "next/link";
import { ArrowRight, Check, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { Marquee } from "@/components/sections/Marquee";
import { trustedLogos } from "@/components/sections/trustedLogos";
import { CarrierRow } from "@/components/sections/platform/CarrierRow";
import { StartupApplyForm } from "@/components/cta/StartupApplyForm";
import { Faq } from "@/components/interior/Faq";
import { InteriorIcon } from "@/components/interior/icons";
import { StartupCloser } from "@/components/interior/StartupCloser";
import { Button, CheckRow, Eyebrow } from "@/components/interior/parts";

// "/startups" — the startup program campaign page (attio.com/startups shape,
// Spine content). Standalone campaign URL: linked from the footer's Resources
// column only, meant to be hit from ads/links/YC channels. Copy is pulled from
// the audience pages (lib/interior/audiences.ts startups/founders), FreeHero and
// the PEO exit guide so it reads as one system with the rest of the site. The
// global TagDrop closer is suppressed for this route (lib/interior/closers.ts);
// the page ends with its own closer anchored to the application form.

const STATS = [
  { figure: "7–10d", label: "From signed BOR to live" },
  { figure: "$0", label: "Cost to your company. Always." },
  { figure: "25%", label: "Average reduction in healthcare costs" },
  { figure: "2+", label: "Minimum team size" },
];

// The concrete offer — every line is a live claim from the audience pages.
const OFFER = [
  "Free cost audit, savings modeled in 48 hours",
  "Your own carrier plans, on your own EIN",
  "Live in 7–10 days from the signed BOR letter",
  "A dedicated senior benefits consultant",
  "The Heal app for every employee: plan picker, digital cards, 24/7 concierge",
  "Multi-state registration, withholding, and filings handled",
];

const ELIGIBILITY = [
  { title: "2+ W-2 employees", sub: "On your own entity. That's the whole bar." },
  { title: "US companies, pre-seed through Series A", sub: "Later stage? Same product, same price: free." },
  { title: "With or without existing coverage", sub: "Got plans? We audit them. If not, we build from scratch." },
];

// Feature cards — verbatim from audiences.ts startups.bento.cards.
const FEATURES = [
  {
    icon: "CurrencyCircleDollar",
    title: "Free for employers",
    body: "No setup fees, no admin charges. We earn carrier commission, like every broker.",
  },
  {
    icon: "LockKeyOpen",
    title: "No co-employment",
    body: "You keep your entity and hire on your own EIN. We run the benefits layer on top.",
  },
  {
    icon: "MapPinLine",
    title: "Multi-state from day 1",
    body: "Remote hires? We handle registration, withholding, and new-hire reporting everywhere.",
  },
  {
    icon: "Headset",
    title: "Founder-friendly support",
    body: "Direct line to a dedicated consultant. No junior account managers.",
  },
];

// The 10-day path — verbatim from audiences.ts startups.timeline.
const TIMELINE = [
  { icon: "MagnifyingGlass", day: "Day 0–2", title: "Free cost audit", sub: "Plans modeled, savings projected in 48h." },
  { icon: "Signature", day: "Day 2–3", title: "BOR letter signed", sub: "Spine becomes your broker of record." },
  { icon: "PlugsConnected", day: "Day 3–9", title: "Carriers set up · plans live", sub: "Employees onboarded in the Heal app." },
  { icon: "Check", day: "Day 10", title: "Compliance & payroll integrated", sub: "ACA, multi-state, filings, on autopilot." },
];

const FAQ_ITEMS = [
  {
    q: "Who's eligible for the startup program?",
    a: "Any company with 2 or more W-2 employees. You don't need existing coverage: if you have plans, we audit them; if not, we build from scratch.",
  },
  {
    q: "What does Spine cost?",
    a: "Nothing, ever. No setup fees, no admin fees, no per-employee charges. Carriers pay us standard broker commission, like every broker.",
  },
  {
    q: "We're on a PEO. Can we switch?",
    a: "Yes. We time the move around your renewal and stand up your own plans on your own EIN before the PEO plans end, so coverage is continuous.",
  },
  {
    q: "We already have a broker.",
    a: "Switching is a one-page broker-of-record letter, signed on day 2–3 of the timeline. Your plans keep running while we shop the next renewal.",
  },
  {
    q: "We hire across states.",
    a: "Multi-state from day 1: registration, withholding, and new-hire reporting handled everywhere you hire.",
  },
  {
    q: "What do employees get?",
    a: "The Heal app, free for every employee: plan picker, digital cards, and a 24/7 concierge for every healthcare question.",
  },
  {
    q: "How fast are we live?",
    a: "7 to 10 days from the signed BOR letter to live benefits, with compliance and payroll integrated by day 10.",
  },
  {
    q: "We're a YC company.",
    a: (
      <>
        Take the{" "}
        <Link href="/yc" className="font-semibold text-orange-700 underline underline-offset-2">
          YC fast track
        </Link>
        {" "}— built by a YC F26 company, for YC companies. One call, your exact
        number, no sales loop.
      </>
    ),
  },
];

// Optical size tuning for the logo strip — same treatment as StatsBand.
const LOGO_H = 24;
const LOGO_SCALE: Record<string, number> = { fal: 1.18, Firefly: 0.88, FreshDirect: 1.1 };

const container = "mx-auto max-w-[1240px] px-6 md:px-10";
const sectionHeading =
  "text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[40px]";

export function StartupProgram() {
  return (
    <main className="bg-surface-page text-ink">
      {/* ── HERO (white, centred) ── */}
      <section className="relative overflow-hidden bg-white">
        {/* Reserved backdrop slot for the future 3D-character scene. All hero
            sizing lives on the content column below (min-h + padding), so a
            wide image or video can drop in here with zero layout shift: give
            it absolute inset-0 + object-cover, borrow the .start-video feather
            mask if it ships as a video, and add a radial white wash above it
            so the centred copy stays legible. Today it's clean white. */}
        <div aria-hidden="true" className="absolute inset-0" />

        <div className="relative mx-auto flex min-h-[540px] w-full max-w-[880px] flex-col items-center px-6 pb-20 pt-[150px] text-center lg:min-h-[600px] lg:pt-[170px]">
          <div className="inline-flex items-center rounded-pill border border-orange-150 bg-orange-100 px-4 py-1.5 text-[12px] font-extrabold text-orange-ink">
            The startup program
          </div>
          <h1 className="mt-6 text-[38px] font-extrabold leading-[0.99] tracking-[-0.035em] sm:text-[52px] lg:text-[64px]">
            <span className="text-ink">From first hire to Series A.</span>
            <br />
            <span className="text-orange">No PEO needed.</span>
          </h1>
          <p className="mt-6 max-w-[640px] text-[16px] leading-[1.55] text-body sm:text-[18px]">
            Enterprise-grade benefits, compliance, and people ops for early-stage
            teams. Free for your company, live in 7 to 10 days, no co-employment.
          </p>
          <div className="mt-[30px] flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
            <Button cta={{ label: "Apply in 2 minutes", href: "#apply" }} arrow />
            <Button cta={{ label: "YC company? Fast track", href: "/yc" }} variant="secondary" />
          </div>
          <div className="mt-[26px] flex justify-center">
            <CheckRow
              items={["Free for your company", "2+ employees to start", "Live in 7–10 days"]}
            />
          </div>
        </div>
      </section>

      {/* ── LOGO STRIP ── */}
      <section className="py-12">
        <p className="mb-7 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-[#a9a9a3] sm:text-[12px]">
          Trusted by ambitious tech companies
        </p>
        <Marquee
          className="text-[#c9c9c4]"
          items={trustedLogos.map((logo) => (
            <span
              key={logo.label}
              role="img"
              aria-label={logo.label}
              style={{ height: LOGO_H * (LOGO_SCALE[logo.label] ?? 1) }}
              className="block [&>svg]:h-full [&>svg]:w-auto"
              dangerouslySetInnerHTML={{ __html: logo.svg }}
            />
          ))}
        />
      </section>

      {/* ── DARK STAT BAND ── */}
      <section className={`${container} pb-16 pt-4`}>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-white/10 bg-white/10 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col justify-between bg-[#15140f] px-7 py-8 lg:px-8">
              <div className="text-[40px] font-extrabold tracking-[-0.03em] text-white sm:text-[46px]">
                {s.figure}
              </div>
              <p className="mt-3 text-[13.5px] leading-snug text-white/55">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE OFFER + ELIGIBILITY ── */}
      <section className={`${container} pb-16`}>
        <div className="mx-auto max-w-[680px] text-center">
          <Eyebrow>What you get</Eyebrow>
          <h2 className={`mt-4 ${sectionHeading}`}>
            Everything a benefits team does. Priced at zero.
          </h2>
        </div>
        <div className="mt-11 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col rounded-[24px] border border-hairline bg-white p-5 sm:p-7 lg:p-8">
            <ul className="space-y-4">
              {OFFER.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <span className="mt-px flex size-[20px] shrink-0 items-center justify-center rounded-full bg-orange/10 text-orange">
                    <Check size={12} weight="bold" />
                  </span>
                  <span className="text-[15px] leading-[1.5] text-[#2e2d28]">{s}</span>
                </li>
              ))}
            </ul>
            <p className="mt-auto border-t border-hairline pt-5 text-[14px] leading-[1.55] text-body-2 max-lg:mt-6">
              No setup fees. No admin fees. No per-employee charges. We get paid
              by carriers, just like every broker.
            </p>
          </div>
          <div className="rounded-[24px] border border-orange/25 bg-orange/[0.04] p-5 sm:p-7 lg:p-8">
            <h3 className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-orange-700">
              Who it&apos;s for
            </h3>
            <ul className="mt-5 space-y-5">
              {ELIGIBILITY.map((e) => (
                <li key={e.title} className="flex items-start gap-3">
                  <CheckCircle size={20} weight="bold" className="mt-px shrink-0 text-orange" />
                  <div>
                    <div className="text-[15px] font-extrabold text-ink">{e.title}</div>
                    <div className="mt-0.5 text-[13.5px] leading-[1.5] text-body-2">{e.sub}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── YC FAST-TRACK BAND ── */}
      <section className={`${container} pb-16`}>
        <div className="flex flex-col items-start gap-6 rounded-[28px] border border-white/10 bg-[#15140f] px-7 py-8 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-[52px] lg:py-10">
          <div>
            <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-orange">
              Built by a YC F26 company, for YC companies
            </p>
            <h2 className="mt-3 text-[24px] font-extrabold leading-[1.1] tracking-[-0.02em] text-white sm:text-[28px]">
              In the current batch? Skip the form.
            </h2>
            <p className="mt-2 max-w-[520px] text-[14.5px] leading-[1.55] text-white/55">
              Book straight onto a founder call. One call, your exact number, no
              sales loop.
            </p>
          </div>
          <Link
            href="/yc"
            className="flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-pill bg-orange px-7 py-4 text-[15px] font-bold text-white transition-colors hover:bg-orange-600 sm:inline-flex sm:w-auto"
          >
            Take the YC fast track
            <ArrowRight size={15} weight="bold" />
          </Link>
        </div>
      </section>

      {/* ── FEATURE CARDS ── */}
      <section className={`${container} pb-16`}>
        <div className="mx-auto max-w-[680px] text-center">
          <Eyebrow>Built for your stage</Eyebrow>
          <h2 className={`mt-4 ${sectionHeading}`}>Startup-ready, enterprise-grade.</h2>
        </div>
        <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((c) => (
            <div key={c.title} className="rounded-[20px] border border-hairline bg-white px-6 py-[26px]">
              <span className="mb-4 grid size-12 place-items-center rounded-[13px] bg-orange-100">
                <InteriorIcon name={c.icon} size={24} className="text-orange-700" />
              </span>
              <h3 className="mb-[7px] text-[17px] font-extrabold tracking-[-0.01em]">{c.title}</h3>
              <p className="text-[14px] leading-[1.5] text-body-2">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE FIRST 10 DAYS (dark box) ── */}
      <section className={`${container} pb-16`}>
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[#15140f] px-7 pb-9 pt-10 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.5)] sm:px-10 lg:px-[60px] lg:pb-[52px] lg:pt-[56px]">
          <div className="mb-10 text-center">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-orange">
              Your first 10 days
            </p>
            <h2 className="mt-4 text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:text-[40px]">
              Startup → Spine, in a week.
            </h2>
            <p className="mx-auto mt-3 max-w-[520px] text-[15px] leading-[1.55] text-white/55">
              From signed contract to live benefits in 7–10 days. We&apos;ve done
              it dozens of times for early-stage teams.
            </p>
          </div>
          <div className="grid grid-cols-1 divide-y divide-white/10 lg:grid-cols-4 lg:divide-y-0">
            {TIMELINE.map((s) => (
              <div
                key={s.title}
                className="px-0 py-7 first:pt-0 last:pb-0 lg:px-7 lg:py-0 lg:first:pl-0 lg:last:pr-0 lg:[&:not(:last-child)]:border-r lg:[&:not(:last-child)]:border-white/10"
              >
                <span className="mb-4 grid size-[38px] place-items-center rounded-pill bg-orange text-white">
                  <InteriorIcon name={s.icon} size={18} weight="bold" />
                </span>
                <div className="text-[11.5px] font-extrabold uppercase tracking-[0.12em] text-orange">
                  {s.day}
                </div>
                <h3 className="mb-1.5 mt-1.5 text-[17px] font-extrabold tracking-[-0.01em] text-white">
                  {s.title}
                </h3>
                <p className="text-[13.5px] leading-[1.5] text-white/55">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL + CARRIERS ── */}
      <section className={`${container} pb-20`}>
        <figure className="mx-auto max-w-[840px] text-center">
          <blockquote className="text-[22px] font-extrabold leading-[1.3] tracking-[-0.02em] text-ink sm:text-[28px]">
            &ldquo;We onboarded our first ten hires with real Aetna plans in under
            two weeks, for <span className="text-orange">zero platform cost.</span>{" "}
            Spine felt like having a benefits team before we could afford
            one.&rdquo;
          </blockquote>
          <figcaption className="mt-5 text-[14.5px] text-body-2">
            <span className="font-bold text-ink">Dana Reyes</span> · Co-founder
            &amp; COO · Northwind (Seed, 14 people)
          </figcaption>
        </figure>
        <CarrierRow />
      </section>

      {/* ── FAQ ── */}
      <section className={`${container} pb-20`}>
        <div className="mx-auto max-w-[720px]">
          <div className="text-center">
            <Eyebrow>Common questions</Eyebrow>
            <h2 className={`mt-4 ${sectionHeading}`}>The startup program, answered.</h2>
          </div>
          <div className="mt-10">
            <Faq items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

      {/* ── APPLY ── */}
      {/* scroll-mt clears the fixed header when the hero CTA anchors down. */}
      <section id="apply" className={`${container} scroll-mt-[120px] pb-20`}>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div className="text-center lg:text-left">
            <Eyebrow>Apply</Eyebrow>
            <h2 className={`mt-4 ${sectionHeading}`}>
              Two minutes now.
              <br />
              Benefits in ten days.
            </h2>
            <p className="mx-auto mt-3 max-w-[440px] text-[17px] leading-[1.55] text-body-2 lg:mx-0">
              Tell us who you are and pick a slot. A specialist brings your free
              cost audit to the call, savings modeled in 48 hours.
            </p>
            <div className="mt-7 flex justify-center lg:justify-start">
              <CheckRow items={["Free for your company", "No commitment", "48-hour cost audit"]} />
            </div>
          </div>
          <StartupApplyForm />
        </div>
      </section>

      {/* ── CLOSER ── */}
      <StartupCloser />
    </main>
  );
}
