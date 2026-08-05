"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Inline Calendly scheduler, dropped straight into whatever sheet the visitor is
// already looking at (the demo modal, the cost-audit card) once they've given us
// their details. Nothing Calendly-related loads until someone reaches this step:
// the widget script is injected on demand and only once per page.
//
// The scheduling link lives in NEXT_PUBLIC_CALENDLY_URL — e.g.
//   NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/onur-joinspine/30min
// so it can be repointed without a code change. If it is missing, or the script
// can't load, the embed degrades to a plain link (or a "we'll email you" note)
// instead of trapping the visitor in a dead sheet — their details already
// reached us on the previous step.

export const CALENDLY_URL = (process.env.NEXT_PUBLIC_CALENDLY_URL ?? "").trim();

type Prefill = { firstName?: string; lastName?: string; email?: string };

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Prefill & { name?: string };
      }) => void;
    };
  }
}

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
let loading: Promise<void> | null = null;

function loadWidget(): Promise<void> {
  if (window.Calendly) return Promise.resolve();
  if (loading) return loading;
  loading = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      loading = null; // let a later attempt retry
      reject(new Error("Calendly widget failed to load"));
    };
    document.head.appendChild(s);
  });
  return loading;
}

export function CalendlyEmbed({
  firstName,
  lastName,
  email,
  onScheduled,
  className,
}: Prefill & {
  /** fired once Calendly confirms a booking */
  onScheduled?: () => void;
  /** must set the height — the widget fills its parent */
  className?: string;
}) {
  const holder = useRef<HTMLDivElement>(null);
  // No link configured → straight to the fallback, no effect needed.
  const [state, setState] = useState<"loading" | "ready" | "failed">(
    CALENDLY_URL ? "loading" : "failed",
  );

  useEffect(() => {
    if (!CALENDLY_URL || !holder.current) return;

    let cancelled = false;
    loadWidget()
      .then(() => {
        const parent = holder.current;
        if (cancelled || !parent || !window.Calendly) return;
        parent.innerHTML = ""; // never stack two iframes
        const sep = CALENDLY_URL.includes("?") ? "&" : "?";
        window.Calendly.initInlineWidget({
          url: `${CALENDLY_URL}${sep}hide_gdpr_banner=1&hide_event_type_details=1`,
          parentElement: parent,
          prefill: {
            name: [firstName, lastName].filter(Boolean).join(" ") || undefined,
            firstName,
            lastName,
            email,
          },
        });
        setState("ready");
      })
      .catch(() => {
        if (!cancelled) setState("failed");
      });

    return () => {
      cancelled = true;
    };
  }, [firstName, lastName, email]);

  // Calendly talks back over postMessage; a completed booking is the only event
  // we act on.
  const handle = useCallback(
    (e: MessageEvent) => {
      const data = e.data as { event?: string } | null;
      if (
        data?.event === "calendly.event_scheduled" &&
        /(^|\.)calendly\.com$/.test(new URL(e.origin).hostname)
      ) {
        onScheduled?.();
      }
    },
    [onScheduled],
  );

  useEffect(() => {
    if (!onScheduled) return;
    window.addEventListener("message", handle);
    return () => window.removeEventListener("message", handle);
  }, [handle, onScheduled]);

  if (state === "failed") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-hairline bg-surface-page px-6 py-10 text-center">
        <p className="text-[15px] leading-relaxed text-grey-text">
          {CALENDLY_URL
            ? "The calendar didn't load. You can open it in a new tab — or sit tight, we'll email you."
            : "We've got your details. A Spine specialist will email you a time within one business day."}
        </p>
        {CALENDLY_URL && (
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 rounded-pill bg-black px-7 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-black/85"
          >
            Open the calendar ↗
          </a>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className ?? ""}`}>
      <div ref={holder} className="h-full w-full" />
      {state === "loading" && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <span className="size-7 animate-spin rounded-full border-2 border-black/10 border-t-orange" />
        </div>
      )}
    </div>
  );
}
