import Link from "next/link";
import { ArrowRight, Check, X } from "@phosphor-icons/react/dist/ssr";
import { ChatApp } from "@/components/sections/platform/ChatApp";
import { PlatformCloser } from "@/components/interior/PlatformCloser";
import { InteriorIcon } from "@/components/interior/icons";
import { Button, CheckRow, Eyebrow } from "@/components/interior/parts";
import { cn } from "@/lib/cn";

// "For employees" — bespoke benefits-explainer landing linked from the footer's
// Platform column. The employee counterpart to ForEmployers: employee accent =
// aqua (the employee-app colour). Same interior chrome (white hero + dark stat
// bar + tag-field closer) and the homepage concierge chat mockup (ChatApp), then
// a custom "old benefits experience → the Spine app" shift and the real agent
// scripts. Copy is pulled from EmployeeBenefits, benefitsAgents and the
// employee-concierge page so the two read as one system. (We say "the Spine
// app", not the legacy "Heal" name still lingering on the homepage.)

const STATS = [
  { figure: "$340", label: "Average savings per employee, per year" },
  { figure: "4.8★", label: "App Store rating" },
  { figure: "60s", label: "Average AI response time" },
  { figure: "24/7", label: "In-house team + AI" },
];

// Parallel rows: BEFORE[i] is answered by AFTER[i].
const BEFORE = [
  "A benefits PDF and a 1-800 number nobody answers",
  "Hold music and business-hours-only support",
  "Surprise bills you pay without knowing if they're right",
  "Hunting for your insurance card when a clinic asks",
  "Guessing which doctors are actually in-network",
  "Paying full price at the pharmacy counter",
];
const AFTER = [
  "A 24/7 concierge that answers in seconds — AI plus real people",
  "Chat or call anytime; a human picks up when you need one",
  "Snap a bill — we check it for errors and dispute it for you",
  "Digital insurance cards in your Apple Wallet",
  "In-network care filtered to your plan and location",
  "Cheaper generics, coupons, and lower-cost pharmacies for every Rx",
];

// The real concierge agents (from benefitsAgents.ts) — one everyday question each.
const AGENTS = [
  {
    icon: "FirstAidKit",
    name: "Care Finder",
    q: "I need a dermatologist who speaks Spanish.",
    blurb: "Finds in-network providers that fit and books the soonest appointment.",
  },
  {
    icon: "Scales",
    name: "Plan Picker",
    q: "My wife is pregnant — which plan should we choose?",
    blurb: "Models every option against your expected care, down to the dollar.",
  },
  {
    icon: "Pill",
    name: "Meds Finder",
    q: "Ozempic isn't covered. What are my options?",
    blurb: "Finds covered alternatives and coupons, and starts prior authorization.",
  },
  {
    icon: "MagnifyingGlass",
    name: "Check Coverage",
    q: "Does my plan cover therapy?",
    blurb: "Instant, plan-specific answers on exactly what's covered.",
  },
  {
    icon: "HandCoins",
    name: "FightBack",
    q: "I got a $1,200 ER bill — is this right?",
    blurb: "Reviews every bill for errors and disputes the wrong ones for you.",
  },
];

const container = "mx-auto max-w-[1240px] px-6 md:px-10";
const sectionHeading =
  "text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[40px]";

export function ForEmployees() {
  return (
    <main className="bg-surface-page text-ink">
      {/* ── HERO (white) ── */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1480px] px-9 pb-16 pt-[140px] sm:px-[52px] lg:px-[60px]">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <Eyebrow>For employees</Eyebrow>
              <h1 className="mb-5 mt-4 text-[44px] font-extrabold leading-[0.98] tracking-[-0.035em] sm:text-[52px] lg:text-[60px]">
                <span className="text-ink">One place for every</span>
                <br />
                <span className="text-orange">healthcare question.</span>
              </h1>
              <p className="mb-[30px] max-w-[520px] text-[18px] leading-[1.55] text-body">
                Every employee on a Spine plan gets a 24/7 concierge — AI plus a
                real in-house team — to understand their benefits, find in-network
                care, cut prescription costs, and fight wrong medical bills.
              </p>
              <div className="mb-[26px] flex flex-wrap gap-3">
                <Button cta={{ label: "Request a demo", href: "#demo" }} arrow />
                <Button cta={{ label: "See the platform", href: "/" }} variant="secondary" />
              </div>
              <CheckRow
                items={["Live for all employees", "iOS + Android", "24/7 in-house team + AI"]}
              />
            </div>

            {/* The Spine app — concierge chat mockup. */}
            <div className="mx-auto w-full max-w-[400px] lg:h-full">
              <ChatApp />
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

      {/* ── THE SHIFT — old benefits experience → the Spine app ── */}
      <section className={`${container} py-16`}>
        <div className="mx-auto max-w-[680px] text-center">
          <Eyebrow>The shift</Eyebrow>
          <h2 className={`mt-4 ${sectionHeading}`}>How benefits used to feel. How they feel now.</h2>
          <p className="mx-auto mt-3 max-w-[560px] text-[17px] leading-[1.55] text-body-2">
            Most people never use half their benefits because no one makes them
            usable. The Spine app puts a real answer one message away.
          </p>
        </div>

        <div className="mt-11 grid gap-4 lg:grid-cols-2">
          {/* Before — the old employee experience */}
          <div className="rounded-[24px] border border-hairline bg-white p-7 sm:p-8">
            <div className="mb-5 text-[13px] font-bold uppercase tracking-[0.12em] text-muted">
              The old way
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

          {/* With the Spine app — aqua, the employee-app accent */}
          <div className="rounded-[24px] border border-aqua-400/30 bg-aqua-400/[0.05] p-7 sm:p-8">
            <div className="mb-5 text-[13px] font-bold uppercase tracking-[0.12em] text-aqua-600">
              With the Spine app
            </div>
            <ul className="space-y-4">
              {AFTER.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-px flex size-[18px] shrink-0 items-center justify-center rounded-full bg-aqua-400 text-white">
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

      {/* ── THE CONCIERGE — the real agent scripts ── */}
      <section className={`${container} pb-4`}>
        <div className="mx-auto max-w-[680px] text-center">
          <Eyebrow>24/7 concierge</Eyebrow>
          <h2 className={`mt-4 ${sectionHeading}`}>Ask Spine anything.</h2>
          <p className="mx-auto mt-3 max-w-[560px] text-[17px] leading-[1.55] text-body-2">
            AI answers in seconds; a real in-house team steps in when it matters.
            Here&apos;s the kind of thing your team asks every day.
          </p>
        </div>

        <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map((a) => (
            <div
              key={a.name}
              className="rounded-[20px] border border-hairline bg-white px-6 py-[26px]"
            >
              <span className="mb-4 grid size-12 place-items-center rounded-[13px] bg-aqua-100">
                <InteriorIcon name={a.icon} size={24} className="text-aqua-500" />
              </span>
              <div className="text-[12px] font-bold uppercase tracking-[0.08em] text-aqua-600">
                {a.name}
              </div>
              <p className="mt-2 text-[15px] font-semibold leading-snug text-[#2e2d28]">
                “{a.q}”
              </p>
              <p className="mt-2 text-[13.5px] leading-[1.5] text-body-2">{a.blurb}</p>
            </div>
          ))}

          {/* Link out to the full employee-app page. */}
          <Link
            href="/platform/employee-concierge"
            className="group flex flex-col justify-center rounded-[20px] border border-aqua-400/30 bg-aqua-400/[0.05] px-6 py-[26px]"
          >
            <div className="text-[16px] font-extrabold tracking-[-0.01em] text-[#15140f]">
              Digital cards, pharmacy savings, claims tracking, and more.
            </div>
            <span className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-aqua-600">
              See the employee app
              <ArrowRight
                size={14}
                weight="bold"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </div>
      </section>

      {/* ── FREE band ── */}
      <section className={`${container} py-14`}>
        <div className="overflow-hidden rounded-[28px] border border-hairline bg-white px-8 py-14 text-center">
          <p className="mb-5 text-[12px] font-bold uppercase tracking-[0.16em] text-orange">
            Free for employees · iOS + Android
          </p>
          <h2 className="font-display mx-auto max-w-[720px] text-[32px] font-extrabold leading-[1.03] tracking-[-0.035em] text-ink sm:text-[44px]">
            The Spine app is{" "}
            <span
              className="text-orange"
              style={{ borderBottom: "3px dotted #f4a072", paddingBottom: "2px" }}
            >
              free
            </span>{" "}
            for every employee. Always.
          </h2>
          <p className="mx-auto mt-5 max-w-[560px] text-[16px] leading-[1.55] text-body-2 sm:text-[18px]">
            Everyone on a Spine plan gets the app on iOS and Android at no cost. No
            per-seat fees, no upsells — it&apos;s included.
          </p>
        </div>
      </section>

      {/* ── CLOSER (CTA over the falling tags) ── */}
      <PlatformCloser
        cta={{
          heading: { pre: "Benefits in every", accent: "pocket." },
          lead: "The Spine app is included with every Spine benefits plan — free for your whole team. Onboard everyone in under 10 minutes.",
          button: { label: "Get started", href: "#demo" },
        }}
      />
    </main>
  );
}
