"use client";

import { useState, type FormEvent } from "react";
import { IconArrowRight, IconLock } from "./icons";

// Step 3's gate: one field, one button. The parent posts the lead (aggregates
// only) and reveals the results. Same forgiveness policy as the demo form:
// only a 400 (bad email) blocks; server hiccups never hold the reveal
// hostage. Client-side and bypassable by design; we don't over-engineer it.

export function EmailGate({
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
    <div className="rounded-[24px] border border-hairline bg-white p-6 shadow-[0_30px_80px_-40px_rgba(20,20,18,0.35)] sm:p-8">
      <div className="text-[11.5px] font-extrabold uppercase tracking-[0.16em] text-orange-700">
        Step 3 · Your number
      </div>
      <h2 className="mt-2 text-[22px] font-extrabold tracking-[-0.02em] text-ink sm:text-[26px]">
        Your estimate is ready.
      </h2>
      <p className="mt-2 max-w-[520px] text-[14.5px] leading-[1.5] text-body-2">
        Drop your work email and we&apos;ll reveal it right here. We send only
        totals: team size, average age, state mix. Never your file.
      </p>

      <form onSubmit={submit} className="mt-6 flex max-w-[560px] flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="audit-email" className="sr-only">
            Work email
          </label>
          <input
            id="audit-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Work email"
            autoComplete="email"
            className="w-full rounded-2xl border border-black/15 bg-white px-5 py-4 text-[16px] text-ink outline-none transition-colors placeholder:text-grey-text/70 focus:border-orange focus:ring-4 focus:ring-orange/15"
          />
        </div>
        <button
          type="submit"
          disabled={sending}
          className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-pill bg-orange px-7 py-4 text-[16px] font-semibold text-white transition-[background-color,scale] duration-200 hover:scale-[1.02] hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {sending ? "One moment…" : "Reveal my number"}
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
        No spam, no list. One follow-up from a real person at most.
      </p>
    </div>
  );
}
