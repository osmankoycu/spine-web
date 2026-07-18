import { Check, X } from "@phosphor-icons/react/dist/ssr";
import { ForEmployeesHero } from "@/components/interior/ForEmployeesHero";
import { PlatformCloser } from "@/components/interior/PlatformCloser";
import { Eyebrow } from "@/components/interior/parts";
import { cn } from "@/lib/cn";

// "For employees" — bespoke benefits-explainer landing linked from the footer's
// Platform column. The hero IS the interactive concierge showcase (rail +
// swappable phone) reused from the homepage — see ForEmployeesHero. Below it:
// employee stats, a custom "how benefits used to feel → the Spine app" shift, the
// free-for-employees band, and the tag-field closer. Employee accent = aqua.
// (We say "the Spine app", not the legacy "Heal".)

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

const container = "mx-auto max-w-[1240px] px-6 md:px-10";
const sectionHeading =
  "text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[40px]";

export function ForEmployees() {
  return (
    <main className="bg-surface-page text-ink">
      {/* ── HERO — interactive concierge showcase (reused from the homepage) ── */}
      <ForEmployeesHero />

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
