"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { IconArrowRight } from "@/components/audit/icons";
import { IconSlack } from "@/components/scan/icons";

// The funnel-wide closing CTA: Add to Slack primary on EVERY verdict state,
// talk-to-a-specialist secondary. On mount it POSTs the funnel context to
// /api/handoff and threads the returned token through the Slack install URL's
// OAuth `state` param (contract: docs/slack-handoff.md) so the bot's first
// message can reference the verdict. Degradations, in order: no handoff
// secret → plain install URL, no personalization; no install URL at all →
// the specialist link takes the primary slot.

export const SLACK_INSTALL_URL = (process.env.NEXT_PUBLIC_SLACK_INSTALL_URL ?? "").trim();

export function SlackCta({
  headline,
  body,
  note,
  handoffBody,
  onSlackCta,
  onCallCta,
  extra,
}: {
  headline: string;
  body: string;
  note?: string; // e.g. the YC perk line
  handoffBody: Record<string, unknown>; // minted server-side into the state token
  onSlackCta: () => void;
  onCallCta: () => void;
  extra?: ReactNode; // tertiary row (e.g. the audit's "Email me this result")
}) {
  const [token, setToken] = useState<string | null>(null);

  // Re-mint when the context meaningfully changes (e.g. the audit tightener
  // sharpening the verdict before the visitor clicks through to Slack).
  const bodyKey = JSON.stringify(handoffBody);
  const bodyRef = useRef(handoffBody);
  useEffect(() => {
    bodyRef.current = handoffBody;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodyKey]);

  useEffect(() => {
    if (!SLACK_INSTALL_URL) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/handoff", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyRef.current),
        });
        if (!res.ok) return; // 503 until the secret lands — plain URL is fine
        const data = (await res.json()) as { token?: string };
        if (!cancelled && data.token) setToken(data.token);
      } catch {
        // Network hiccup: the CTA still works without personalization.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [bodyKey]);

  const slackHref = SLACK_INSTALL_URL
    ? SLACK_INSTALL_URL +
      (token
        ? (SLACK_INSTALL_URL.includes("?") ? "&" : "?") + "state=" + encodeURIComponent(token)
        : "")
    : null;

  return (
    <div className="rounded-[20px] bg-[#15140f] p-6 sm:p-7">
      <p className="text-[17px] font-extrabold leading-snug text-white sm:text-[19px]">
        {headline}
      </p>
      <p className="mt-2 max-w-[560px] text-[13.5px] leading-[1.55] text-white/60">{body}</p>
      {note && <p className="mt-2 text-[13.5px] font-semibold text-orange">{note}</p>}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        {slackHref ? (
          <>
            <a
              href={slackHref}
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
          <Link
            href="/request-a-demo"
            onClick={onCallCta}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-pill bg-orange px-7 py-4 text-[16px] font-semibold text-white transition-[background-color,scale] duration-200 hover:scale-[1.02] hover:bg-orange-600"
          >
            Talk to a specialist
            <IconArrowRight size={18} />
          </Link>
        )}
        {extra}
      </div>
    </div>
  );
}
