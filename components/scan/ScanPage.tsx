"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import { track } from "@/lib/audit/track";
import { variantFromRef } from "@/lib/audit/ycVariant";
import { headcountForBucket, isTeamSize } from "@/lib/funnel/teamSize";
import { buildScanLeadPayload } from "@/lib/scan/scanLead";
import { IconArrowRight } from "@/components/audit/icons";
import {
  runScan,
  severityCounts,
  SCAN_QUESTIONS,
  type ScanAnswers,
} from "@/lib/scan/scanRules";
import { ScanEmailGate } from "./ScanEmailGate";
import { ScanQuestion } from "./ScanQuestion";
import { ScanReport } from "./ScanReport";
import { ScanTheater } from "./ScanTheater";

// Orchestrator for the 45-second setup scan. Unlike the audit's append-below
// flow, this is one card whose screen swaps: six tap-only questions → the
// email step ("where do we send it") → a ~2s scan beat → the exposure report.
// Same rails as the audit: track wrapper (funnel:"scan" on every event),
// GSAP with reduced-motion fallbacks, lead forgiveness policy.

type Stage =
  | { kind: "question"; index: number }
  | { kind: "bridge"; nextIndex: number } // "Group plan already" → audit hand-off
  | { kind: "email" }
  | { kind: "scanning" }
  | { kind: "report" };

export function ScanPage() {
  const searchParams = useSearchParams();
  const variant = variantFromRef(searchParams.get("ref"));
  // Router prefill (/start carries ?size=…); feeds the lead subject's size
  // bucket and the audit bridge's headcount.
  const sizeParam = searchParams.get("size");
  const teamSize = isTeamSize(sizeParam) ? sizeParam : null;

  const [stage, setStage] = useState<Stage>({ kind: "question", index: 0 });
  const [answers, setAnswers] = useState<ScanAnswers>({});

  const ev = (props: Record<string, string | number | boolean> = {}) => ({
    funnel: "scan",
    ...props,
    ...(variant ? { ref: variant.ref } : {}),
  });

  const viewedRef = useRef(false);
  useEffect(() => {
    if (viewedRef.current) return;
    viewedRef.current = true;
    track("scan_view", ev());
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fire once per page view
  }, []);

  // Quick swap transition between screens; reduced motion renders instantly.
  const cardRef = useRef<HTMLDivElement>(null);
  const stageKey =
    stage.kind === "question" ? `question-${stage.index}` : stage.kind;
  useEffect(() => {
    const el = cardRef.current;
    if (!el || prefersReducedMotion()) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" },
    );
  }, [stageKey]);

  const findings = useMemo(
    () => (stage.kind === "report" ? runScan(answers) : []),
    [stage.kind, answers],
  );

  const reportedRef = useRef(false);
  useEffect(() => {
    if (stage.kind !== "report" || reportedRef.current) return;
    reportedRef.current = true;
    const counts = severityCounts(findings);
    track(
      "scan_report_viewed",
      ev({ red: counts.red, amber: counts.amber, green: counts.green }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fire once per report
  }, [stage.kind, findings]);

  const onAnswer = (index: number) => (value: string | string[]) => {
    const q = SCAN_QUESTIONS[index];
    setAnswers((a) => ({ ...a, [q.id]: value }));
    track("scan_question_answered", ev({ index }));
    // Bridge: a group plan means they're past setup — offer the renewal audit
    // instead of finishing a scan built for people without one.
    if (q.id === "health" && value === "Group plan already") {
      setStage({ kind: "bridge", nextIndex: index + 1 });
      return;
    }
    setStage(
      index < SCAN_QUESTIONS.length - 1
        ? { kind: "question", index: index + 1 }
        : { kind: "email" },
    );
  };

  const auditBridgeHref = (() => {
    const params = new URLSearchParams();
    if (variant) params.set("ref", variant.ref);
    if (teamSize) params.set("headcount", String(headcountForBucket(teamSize)));
    const qs = params.toString();
    return qs ? `/audit?${qs}` : "/audit";
  })();

  // Forgiveness policy: only a 400 (bad email) blocks the report.
  const onEmailSubmit = async (email: string): Promise<{ ok: boolean; error?: string }> => {
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          buildScanLeadPayload({ email, ref: variant?.ref ?? null, answers, teamSize }),
        ),
      });
      if (res.status === 400) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        return { ok: false, error: data.error };
      }
      if (!res.ok) {
        console.error("Scan lead capture failed:", res.status);
        track("scan_lead_send_failed", ev({ reason: `http_${res.status}` }));
      }
    } catch (err) {
      console.error("Scan lead capture failed:", err);
      track("scan_lead_send_failed", ev({ reason: "network" }));
    }
    track("scan_email_submitted", ev());
    setStage({ kind: "scanning" });
    return { ok: true };
  };

  const answeredCount = Object.keys(answers).length;
  const dotsTotal = SCAN_QUESTIONS.length + 1; // six questions + the email step
  const dotsDone = answeredCount + (stage.kind === "scanning" || stage.kind === "report" ? 1 : 0);
  const showDots = stage.kind === "question" || stage.kind === "email";

  return (
    <main className="text-ink">
      <div className="mx-auto w-full max-w-[720px] px-6 pb-16 pt-6 sm:pt-10">
        {stage.kind === "question" && (
          <div className="mb-8">
            {variant ? (
              <div className="mb-3 inline-flex items-center rounded-pill border border-orange-150 bg-orange-100 px-4 py-1.5 text-[12px] font-extrabold text-orange-ink">
                {variant.eyebrow}
              </div>
            ) : (
              <div className="mb-3 text-[11.5px] font-extrabold uppercase tracking-[0.16em] text-orange-700">
                45-second setup scan
              </div>
            )}
            <h1 className="text-[27px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[34px]">
              Payroll, benefits, and compliance.
              <br />
              <span className="text-orange">Handled by a teammate, not a tool.</span>
            </h1>
            <p className="mt-3 max-w-[520px] text-[14.5px] leading-[1.55] text-body-2">
              Answer six questions. We scan your setup for what&apos;s missing,
              then a licensed specialist starts clearing it today. Free,
              carriers pay us, not you.
            </p>
          </div>
        )}

        {showDots && (
          <div className="mb-6 flex items-center gap-1.5">
            {Array.from({ length: dotsTotal }, (_, i) => (
              <span key={i} className="contents">
                <span
                  className={`size-2.5 shrink-0 rounded-pill ${
                    i < dotsDone ? "bg-orange" : "bg-grey-pill"
                  }`}
                />
                {i < dotsTotal - 1 && (
                  <span
                    className={`h-0.5 flex-1 rounded-pill ${
                      i < dotsDone ? "bg-orange-150" : "bg-grey-pill"
                    }`}
                  />
                )}
              </span>
            ))}
          </div>
        )}

        <div
          ref={cardRef}
          key={stageKey}
          className="rounded-[24px] border border-hairline bg-white p-6 shadow-[0_30px_80px_-40px_rgba(20,20,18,0.35)] sm:p-8"
        >
          {stage.kind === "question" && (
            <ScanQuestion
              key={SCAN_QUESTIONS[stage.index].id}
              question={SCAN_QUESTIONS[stage.index]}
              onAnswer={onAnswer(stage.index)}
            />
          )}
          {stage.kind === "bridge" && (
            <div className="py-2">
              <h2 className="text-[22px] font-extrabold tracking-[-0.02em] text-ink sm:text-[26px]">
                You&apos;re past the setup stage.
              </h2>
              <p className="mt-2 max-w-[480px] text-[14.5px] leading-[1.55] text-body-2">
                A group plan means the setup scan isn&apos;t your tool. The
                better question: is that plan priced right? Our 90-second audit
                checks your renewal.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href={auditBridgeHref}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-pill bg-orange px-7 py-4 text-[16px] font-semibold text-white transition-[background-color,scale] duration-200 hover:scale-[1.02] hover:bg-orange-600"
                >
                  Check your renewal instead
                  <IconArrowRight size={18} />
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    setStage(
                      stage.nextIndex < SCAN_QUESTIONS.length
                        ? { kind: "question", index: stage.nextIndex }
                        : { kind: "email" },
                    )
                  }
                  className="cursor-pointer text-[13.5px] font-semibold text-grey-text underline underline-offset-2 hover:text-ink"
                >
                  Finish the scan anyway
                </button>
              </div>
            </div>
          )}
          {stage.kind === "email" && <ScanEmailGate onSubmit={onEmailSubmit} />}
          {stage.kind === "scanning" && (
            <ScanTheater onDone={() => setStage({ kind: "report" })} />
          )}
          {stage.kind === "report" && (
            <ScanReport
              findings={findings}
              handoffBody={{
                funnel: "scan",
                answers,
                ...(teamSize ? { teamSize } : {}),
                ...(variant ? { ref: variant.ref } : {}),
              }}
              onSlackCta={() => track("scan_slack_cta_clicked", ev())}
              onCallCta={() => track("scan_call_cta_clicked", ev())}
            />
          )}
        </div>
      </div>
    </main>
  );
}
