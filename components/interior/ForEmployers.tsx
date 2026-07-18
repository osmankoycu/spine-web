import Link from "next/link";
import { ArrowRight, Check, X } from "@phosphor-icons/react/dist/ssr";
import { EmployerWindow } from "@/components/sections/platform/EmployerWindow";
import { PlatformCloser } from "@/components/interior/PlatformCloser";
import { InteriorIcon } from "@/components/interior/icons";
import { Button, CheckRow, Eyebrow } from "@/components/interior/parts";
import { cn } from "@/lib/cn";

// "For employers" — bespoke benefits-explainer landing linked from the footer's
// Platform column. Employer accent = cobalt (the company-facing product colour).
// It reuses the interior page chrome (white hero + dark stat bar + tag-field
// closer) and the homepage employer console (EmployerWindow), then adds a custom
// "what you leave behind → what you gain" shift and a three-pillar map that links
// out to the detailed platform pages. Copy is pulled from the on-site employer
// sections (EmployerBenefits, WhySpine, FreeHero) so the two read as one system.

const STATS = [
  { figure: "25%", label: "Average reduction in healthcare costs" },
  { figure: "$4K", label: "Saved per employee, per year" },
  { figure: "100%", label: "Filings on-time, zero missed deadlines" },
  { figure: "$0", label: "Cost to your company. Always." },
];

// Parallel rows: BEFORE[i] is answered by AFTER[i] (mirrors the WhySpine matrix).
const BEFORE = [
  "Lazy renewals — premiums spike a little more every year",
  "PEO co-employment on your EIN, with lock-in when you leave",
  "Forced onto their HRIS and payroll stack",
  "A generic support pool and ticket queues",
  "Compliance you track yourself, across spreadsheets and portals",
  "≈$150–200 per employee each month in PEO fees",
];
const AFTER = [
  "Every carrier shopped with your own claims data, every cycle",
  "Your own entity — no co-employment, ever",
  "Runs on your existing Gusto, Rippling, ADP or Justworks",
  "A dedicated senior consultant plus AI, answering in hours",
  "ACA, ERISA, COBRA, Form 5500 and multi-state — handled for you",
  "$0 to your company — carriers pay us, like every broker",
];

// Three pillars link the umbrella page down to the detailed platform pages.
const PILLARS = [
  {
    icon: "ChartLineUp",
    title: "Benefits",
    body: "AI-optimized plans across every major carrier, right-sized to your workforce at every renewal.",
    href: "/platform/plan-optimization",
    link: "Plan optimization",
  },
  {
    icon: "ShieldCheck",
    title: "Compliance",
    body: "ACA, ERISA, COBRA, Form 5500 and multi-state tax — monitored and filed for you.",
    href: "/platform/healthcare-compliance",
    link: "Healthcare compliance",
  },
  {
    icon: "Money",
    title: "People ops",
    body: "Payroll, onboarding, offboarding and the day-to-day — run on your existing stack.",
    href: "/platform/payroll",
    link: "Payroll runs",
  },
];

const PLAN_TYPES = [
  "Fully insured",
  "Level-funded",
  "Self-funded",
  "ICHRA",
  "QSEHRA",
  "401(k)",
  "Dental & vision",
  "HSA / FSA",
];

const container = "mx-auto max-w-[1240px] px-6 md:px-10";
const sectionHeading =
  "text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[40px]";

export function ForEmployers() {
  return (
    <main className="bg-surface-page text-ink">
      {/* ── HERO (white) — spans the nav width; left inset matches the header ── */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1480px] px-9 pb-16 pt-[140px] sm:px-[52px] lg:px-[60px]">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <Eyebrow>For employers</Eyebrow>
              <h1 className="mb-5 mt-4 text-[44px] font-extrabold leading-[0.98] tracking-[-0.035em] sm:text-[52px] lg:text-[60px]">
                <span className="text-ink">Better plans. Lower premiums.</span>
                <br />
                <span className="text-orange">Run entirely for you.</span>
              </h1>
              <p className="mb-[30px] max-w-[520px] text-[18px] leading-[1.55] text-body">
                Spine is the modern alternative to brokers and PEOs. One team runs
                your healthcare, payroll, and compliance — backed by AI, on your
                own entity, and free for your company.
              </p>
              <div className="mb-[26px] flex flex-wrap gap-3">
                <Button cta={{ label: "Get your savings estimate", href: "#demo" }} arrow />
                <Button cta={{ label: "See the platform", href: "/" }} variant="secondary" />
              </div>
              <CheckRow
                items={["Keep your own entity", "Free for your company", "25% average savings"]}
              />
            </div>

            {/* Employer product console — the "Why this mix" scenario map. */}
            <div className="lg:h-full">
              <EmployerWindow />
            </div>
          </div>
        </div>
      </section>

      {/* ── STAT BAR (dark) ── */}
      <section className="mx-auto max-w-[1240px] px-6 py-10 md:px-10">
        <div className="grid grid-cols-2 overflow-hidden rounded-[24px] border border-white/10 bg-[#15140f] lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                "px-7 py-8",
                i % 2 === 0 && "border-r border-white/10",
                "lg:border-r lg:last:border-r-0",
                i < 2 && "border-b border-white/10 lg:border-b-0",
              )}
            >
              <div className="whitespace-nowrap text-[30px] font-extrabold tracking-[-0.03em] text-white sm:text-[34px]">
                {s.figure}
              </div>
              <div className="mt-2 text-[13.5px] text-white/55">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE SHIFT — what you leave behind → what you gain ── */}
      <section className={`${container} py-16`}>
        <div className="mx-auto max-w-[680px] text-center">
          <Eyebrow>The shift</Eyebrow>
          <h2 className={`mt-4 ${sectionHeading}`}>What you leave behind. What you gain.</h2>
          <p className="mx-auto mt-3 max-w-[560px] text-[17px] leading-[1.55] text-body-2">
            Brokers and PEOs bundle their fees, their stack, and their lock-in.
            Spine unbundles all of it and rightsizes it to your company.
          </p>
        </div>

        <div className="mt-11 grid gap-4 lg:grid-cols-2">
          {/* Before — the old broker + PEO way */}
          <div className="rounded-[24px] border border-hairline bg-white p-7 sm:p-8">
            <div className="mb-5 text-[13px] font-bold uppercase tracking-[0.12em] text-muted">
              Before Spine — broker + PEO
            </div>
            <ul className="space-y-4">
              {BEFORE.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-px flex size-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#d6d5d0] text-[#a9a9a3]">
                    <X size={10} weight="bold" />
                  </span>
                  <span className="text-[14.5px] leading-[1.45] text-body-2">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* With Spine — cobalt, the company-facing accent */}
          <div className="rounded-[24px] border border-cobalt-400/25 bg-cobalt-400/[0.04] p-7 sm:p-8">
            <div className="mb-5 text-[13px] font-bold uppercase tracking-[0.12em] text-cobalt-400">
              With Spine
            </div>
            <ul className="space-y-4">
              {AFTER.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-px flex size-[18px] shrink-0 items-center justify-center rounded-full bg-cobalt-400 text-white">
                    <Check size={11} weight="bold" />
                  </span>
                  <span className="text-[14.5px] font-medium leading-[1.45] text-[#2e2d28]">
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── THREE PILLARS — links down to the detailed platform pages ── */}
      <section className={`${container} pb-4`}>
        <div className="mx-auto max-w-[680px] text-center">
          <Eyebrow>One team, three jobs</Eyebrow>
          <h2 className={`mt-4 ${sectionHeading}`}>Benefits, compliance, and people ops. One bill.</h2>
          <p className="mx-auto mt-3 max-w-[560px] text-[17px] leading-[1.55] text-body-2">
            The whole back office of employment, run by Spine and priced at zero
            to your company.
          </p>
        </div>

        <div className="mt-11 grid gap-4 md:grid-cols-3">
          {PILLARS.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className="group rounded-[20px] border border-hairline bg-white px-6 py-[26px] transition-shadow duration-200 hover:shadow-[0_24px_50px_-40px_rgba(20,20,18,0.4)]"
            >
              <span className="mb-4 grid size-12 place-items-center rounded-[13px] bg-cobalt-100">
                <InteriorIcon name={p.icon} size={24} className="text-cobalt-400" />
              </span>
              <h3 className="mb-[7px] text-[18px] font-extrabold tracking-[-0.01em]">{p.title}</h3>
              <p className="text-[14.5px] leading-[1.5] text-body-2">{p.body}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-cobalt-400">
                {p.link}
                <ArrowRight
                  size={14}
                  weight="bold"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          ))}
        </div>

        {/* Every plan type — concrete detail from the employer benefits half. */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <span className="mr-1 text-[11px] font-bold uppercase tracking-[0.1em] text-muted">
            Every plan type
          </span>
          {PLAN_TYPES.map((plan) => (
            <span
              key={plan}
              className="rounded-full border border-[#ececea] bg-white px-3 py-1.5 text-[13px] text-[#56554f]"
            >
              {plan}
            </span>
          ))}
        </div>
      </section>

      {/* ── FREE MODEL band ── */}
      <section className={`${container} py-14`}>
        <div className="overflow-hidden rounded-[28px] border border-hairline bg-white px-8 py-14 text-center">
          <p className="mb-5 text-[12px] font-bold uppercase tracking-[0.16em] text-orange">
            Free for employers · Paired support
          </p>
          <h2 className="font-display mx-auto max-w-[720px] text-[32px] font-extrabold leading-[1.03] tracking-[-0.035em] text-ink sm:text-[44px]">
            Spine is{" "}
            <span
              className="text-orange"
              style={{ borderBottom: "3px dotted #f4a072", paddingBottom: "2px" }}
            >
              free
            </span>{" "}
            for your company. Always.
          </h2>
          <p className="mx-auto mt-5 max-w-[560px] text-[16px] leading-[1.55] text-body-2 sm:text-[18px]">
            No setup fees. No admin fees. No per-employee charges. We get paid by
            carriers, just like every broker.
          </p>
        </div>
      </section>

      {/* ── CLOSER (CTA over the falling tags) ── */}
      <PlatformCloser
        cta={{
          heading: { pre: "See what Spine could", accent: "save you." },
          lead: "Free cost audit. We pull your current plans, run them against our optimization engine, and show you exactly what you're leaving on the table.",
          button: { label: "Run free cost analysis", href: "#demo" },
        }}
      />
    </main>
  );
}
