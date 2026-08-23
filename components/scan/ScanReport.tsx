"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import {
  severityCounts,
  SCAN_DISCLAIMER,
  SEVERITY_LABELS,
  type ScanFinding,
  type Severity,
} from "@/lib/scan/scanRules";
import { IconArrowRight } from "@/components/audit/icons";
import { IconSlack, ScanIcon } from "./icons";

// The exposure report: severity pills, the findings timeline, and the CTA
// card. Slack is the primary CTA; without NEXT_PUBLIC_SLACK_INSTALL_URL the
// specialist call takes its place (same graceful degradation as Calendly).
// Zero red+amber findings get a first-class "in good shape" headline — the
// honest state, not manufactured alarm.

export const SLACK_INSTALL_URL = (process.env.NEXT_PUBLIC_SLACK_INSTALL_URL ?? "").trim();

const SEV_STYLES: Record<Severity, { dot: string; chip: string }> = {
  red: { dot: "bg-[#b42318]", chip: "bg-[#fbecea] text-[#a61b12]" },
  amber: { dot: "bg-[#b57d0a]", chip: "bg-[#faf1e1] text-[#8a5807]" },
  green: { dot: "bg-success", chip: "bg-success-tint text-success" },
};

export function ScanReport({
  findings,
  onSlackCta,
  onCallCta,
}: {
  findings: ScanFinding[];
  onSlackCta: () => void;
  onCallCta: () => void;
}) {
  const counts = severityCounts(findings);
  const clean = counts.red === 0 && counts.amber === 0;
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const targets = root.querySelectorAll("[data-scan-finding]");
    const tween = gsap.from(targets, {
      opacity: 0,
      y: 14,
      duration: 0.4,
      stagger: 0.09,
      ease: "power2.out",
    });
    // Kill + clear on cleanup: StrictMode's dev double-mount otherwise makes
    // the second from() capture a card mid-tween at ~0 opacity and pin it
    // there (the first card literally disappeared without this).
    return () => {
      tween.kill();
      gsap.set(targets, { clearProps: "opacity,transform" });
    };
  }, []);

  return (
    <div ref={rootRef}>
      <p className="text-[11.5px] font-extrabold uppercase tracking-[0.14em] text-orange-700">
        {SCAN_DISCLAIMER}
      </p>
      <h2 className="mt-3 text-[26px] font-extrabold leading-[1.06] tracking-[-0.02em] text-ink sm:text-[30px]">
        {clean
          ? "You're in good shape."
          : `We found ${findings.length} things running under the hood.`}
      </h2>
      {clean && (
        <p className="mt-2 max-w-[520px] text-[14.5px] leading-[1.5] text-body-2">
          Nothing urgent in your setup. The items below are what we keep
          handled in the background so it stays that way.
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {(["red", "amber", "green"] as const)
          .filter((sev) => counts[sev] > 0)
          .map((sev) => (
            <span
              key={sev}
              className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-[12.5px] font-bold ${SEV_STYLES[sev].chip}`}
            >
              <span className={`size-2 rounded-pill ${SEV_STYLES[sev].dot}`} />
              {counts[sev]} {SEVERITY_LABELS[sev]}
            </span>
          ))}
      </div>

      {/* Findings timeline */}
      <div className="relative mt-7 pl-8">
        <div className="absolute bottom-2 left-[9px] top-2 w-[3px] rounded-pill bg-grey-pill" />
        <div className="space-y-3.5">
          {findings.map((f) => (
            <div key={f.id} data-scan-finding className="relative">
              <span className="absolute -left-8 top-4 grid size-[21px] place-items-center rounded-pill border-4 border-surface-page bg-white">
                <span className={`size-2.5 rounded-pill ${SEV_STYLES[f.sev].dot}`} />
              </span>
              <div className="rounded-[16px] border border-hairline bg-white p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[15.5px] font-extrabold leading-snug text-ink">
                    {f.title}
                  </h3>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1 rounded-[7px] px-2 py-1 text-[11px] font-bold ${SEV_STYLES[f.sev].chip}`}
                  >
                    <ScanIcon name={f.ic} size={11} />
                    {f.tag}
                  </span>
                </div>
                <p className="mt-1.5 text-[13.5px] leading-[1.55] text-body-2">{f.detail}</p>
                <div className="mt-2.5 flex items-center gap-1.5 text-orange-700">
                  <IconArrowRight size={14} />
                  <span className="text-[13.5px] font-bold">{f.action}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA card */}
      <div className="mt-8 rounded-[20px] bg-[#15140f] p-6 sm:p-7">
        <p className="text-[17px] font-extrabold leading-snug text-white sm:text-[19px]">
          Your specialist starts today.
        </p>
        <p className="mt-2 max-w-[560px] text-[13.5px] leading-[1.55] text-white/60">
          An AI teammate does the work, backed by licensed brokers and
          compliance specialists who sign off on every filing. Add them to your
          Slack and the first item is done before you&apos;re back from lunch.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          {SLACK_INSTALL_URL ? (
            <>
              <a
                href={SLACK_INSTALL_URL}
                onClick={onSlackCta}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-pill bg-orange px-7 py-4 text-[16px] font-semibold text-white transition-[background-color,scale] duration-200 hover:scale-[1.02] hover:bg-orange-600"
              >
                <IconSlack size={18} />
                Add to Slack
              </a>
              <Link
                href="/request-a-demo"
                onClick={onCallCta}
                className="inline-flex cursor-pointer items-center justify-center rounded-pill border border-white/25 px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
              >
                Talk to a specialist
              </Link>
            </>
          ) : (
            // No Slack install URL configured yet: the specialist call is the
            // primary until the env lands (same degradation as Calendly).
            <Link
              href="/request-a-demo"
              onClick={onCallCta}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-pill bg-orange px-7 py-4 text-[16px] font-semibold text-white transition-[background-color,scale] duration-200 hover:scale-[1.02] hover:bg-orange-600"
            >
              Talk to a specialist
              <IconArrowRight size={18} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
