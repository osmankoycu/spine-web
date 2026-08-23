"use client";

import { useState, type FormEvent } from "react";
import { IconArrowRight, IconLock } from "@/components/audit/icons";

// The scan's email step: AFTER the six questions, immediately before the
// report, framed as "where do we send it". Same forgiveness policy as the
// audit gate: only a 400 blocks, server hiccups never hold the report
// hostage.

export function ScanEmailGate({
  onSubmit,
}: {
  onSubmit: (email: string) => Promise<{ ok: boolean; error?: string }>;
}) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);
    const res = await onSubmit(email);
    if (!res.ok) {
      setError(res.error ?? "Please check your email and try again.");
      setSending(false);
    }
  };

  return (
    <div>
      <h2 className="text-[22px] font-extrabold tracking-[-0.02em] text-ink sm:text-[26px]">
        Where do we send your report?
      </h2>
      <p className="mt-2 max-w-[480px] text-[14.5px] leading-[1.5] text-body-2">
        Your scan is done. Drop your work email and the report shows up right
        here. The only thing that leaves this page is your six answers.
      </p>

      <form onSubmit={submit} className="mt-6 flex max-w-[520px] flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="scan-email" className="sr-only">
            Work email
          </label>
          <input
            id="scan-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@yourstartup.com"
            autoComplete="email"
            className="w-full rounded-2xl border border-black/15 bg-white px-5 py-4 text-[16px] text-ink outline-none transition-colors placeholder:text-grey-text/70 focus:border-orange focus:ring-4 focus:ring-orange/15"
          />
        </div>
        <button
          type="submit"
          disabled={sending}
          className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-pill bg-orange px-7 py-4 text-[16px] font-semibold text-white transition-[background-color,scale] duration-200 hover:scale-[1.02] hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {sending ? "One moment…" : "Show my report"}
          {!sending && <IconArrowRight size={18} />}
        </button>
      </form>

      {error && (
        <p role="alert" className="mt-3 text-[13.5px] font-medium text-orange-600">
          {error}
        </p>
      )}

      <p className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] text-grey-text">
        <IconLock size={14} />
        No password, no credit card. No spam, no list.
      </p>
    </div>
  );
}
