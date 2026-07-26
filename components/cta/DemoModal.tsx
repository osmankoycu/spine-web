"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type FormEvent,
} from "react";
import { CheckCircle, X } from "@phosphor-icons/react";
import { getLenis } from "@/lib/lenis";
import { CalendlyEmbed } from "./CalendlyEmbed";

// Booking modal opened by the "See how much you'd save" CTA (and any other CTA
// that calls useDemoModal().open()). Three steps in the SAME sheet:
//   form → the sheet becomes the Calendly scheduler (name/email prefilled) →
//   "you're booked".
// The lead still goes out by email on step one, so an abandoned booking is not a
// lost lead.

type Ctx = { open: () => void };
const DemoModalCtx = createContext<Ctx | null>(null);

export function useDemoModal(): Ctx {
  return useContext(DemoModalCtx) ?? { open: () => {} };
}

export function DemoModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  return (
    <DemoModalCtx.Provider value={{ open }}>
      {children}
      <DemoModal open={isOpen} onClose={close} />
    </DemoModalCtx.Provider>
  );
}

function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [render, setRender] = useState(false);
  const [shown, setShown] = useState(false);
  const [step, setStep] = useState<"form" | "booking" | "booked">("form");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Enter/exit: mount → next frame fade+scale in; on close, animate out then unmount.
  useEffect(() => {
    if (open) {
      setRender(true);
      // Double rAF: let the hidden state paint first so the transition actually
      // plays (a single frame gets batched with the mount → it would just snap in).
      let id2 = 0;
      const id1 = requestAnimationFrame(() => {
        id2 = requestAnimationFrame(() => setShown(true));
      });
      return () => {
        cancelAnimationFrame(id1);
        cancelAnimationFrame(id2);
      };
    }
    setShown(false);
    const t = setTimeout(() => {
      setRender(false);
      setStep("form");
      setEmail("");
      setFirstName("");
      setLastName("");
      setError(null);
      setSending(false);
    }, 220);
    return () => clearTimeout(t);
  }, [open]);

  // Lock scrolling (stop Lenis + native fallback) and close on Escape.
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const onScheduled = useCallback(() => setStep("booked"), []);

  if (!render) return null;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, lastName, intent: "meeting" }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      // A 400 is about what they typed — worth showing. Anything else is our
      // problem (mail misconfigured, provider down) and must NOT stand between
      // the visitor and the calendar: Calendly captures them on booking anyway.
      if (res.status === 400) {
        setError(data.error ?? "Please check your details and try again.");
        setSending(false);
        return;
      }
      if (!res.ok) console.error("Lead capture failed:", res.status, data.error);
      setStep("booking");
    } catch (err) {
      console.error("Lead capture failed:", err);
      setStep("booking");
    }
  };

  return (
    <div
      // Scrollable, top-aligned below sm. The card is ~640px tall at 375px —
      // already taller than an iPhone SE — and once the keyboard opens the
      // visual viewport halves, so with a centred non-scrolling overlay the
      // submit button was simply unreachable.
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 py-6 sm:items-center sm:py-4"
      role="dialog"
      aria-modal="true"
      aria-label="See how much you'd save"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/55 backdrop-blur-[2px] transition-opacity duration-300 ${
          shown ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Card — the same sheet throughout; it widens and loses its generous
          padding once the scheduler takes it over. */}
      <div
        className={`relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-[28px] bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] transition-[opacity,scale,translate,max-width] duration-300 ease-out ${
          step === "booking"
            ? "max-w-[720px] p-4 sm:p-5"
            : "max-w-[560px] p-6 sm:p-8 md:p-10"
        } ${
          shown ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-95 opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/5 text-ink transition-colors hover:bg-black/10"
        >
          <X size={18} weight="bold" />
        </button>

        {step === "booked" ? (
          <div className="flex flex-col items-center py-6 text-center">
            <CheckCircle size={56} weight="fill" className="text-orange" />
            <h2 className="font-display mt-5 text-[28px] font-extrabold tracking-[-0.02em] text-ink">
              You&apos;re booked
            </h2>
            <p className="mt-3 max-w-[400px] text-[16px] leading-relaxed text-grey-text">
              The calendar invite is on its way to {email || "your inbox"}. We&apos;ll
              bring your savings numbers to the call.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-7 cursor-pointer rounded-pill bg-orange px-7 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Done
            </button>
          </div>
        ) : step === "booking" ? (
          <div className="pt-1">
            <div className="px-2 pb-3 text-center">
              <h2 className="font-display text-[21px] font-extrabold tracking-[-0.02em] text-ink">
                Pick a time
              </h2>
              <p className="mt-1 text-[13.5px] text-grey-text">
                30 minutes with a Spine specialist · we&apos;ll walk you through your
                numbers live
              </p>
            </div>
            <CalendlyEmbed
              firstName={firstName}
              lastName={lastName}
              email={email}
              onScheduled={onScheduled}
              className="h-[560px] sm:h-[620px]"
            />
          </div>
        ) : (
          <>
            <h2 className="font-display mx-auto max-w-[400px] px-6 text-center text-[27px] font-extrabold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[31px]">
              See how much
              <br />
              you&apos;d save
            </h2>
            <p className="mx-auto mt-6 max-w-[440px] text-center text-[16px] leading-relaxed text-grey-text">
              Pick a 30-minute slot and we&apos;ll walk you through exactly what Spine
              saves you on benefits, compliance, and payroll.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[13px] font-medium text-ink/65">
              <span>Free for your company</span>
              <span className="text-ink/20">•</span>
              <span>No commitment</span>
              <span className="text-ink/20">•</span>
              <span>30 min</span>
            </div>

            {/* Labels + a stacked name row below sm, matching EstimateForm —
                see the comments there for why placeholders alone aren't enough
                and why 2-up names don't fit at 375px. */}
            <form onSubmit={onSubmit} className="mt-8">
              <label htmlFor="demo-email" className="sr-only">
                Work email
              </label>
              <input
                id="demo-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Work email"
                autoComplete="email"
                className="w-full rounded-2xl border border-black/15 bg-white px-5 py-4 text-[16px] text-ink outline-none transition-colors placeholder:text-grey-text/70 focus:border-orange focus:ring-4 focus:ring-orange/15"
              />
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="demo-first" className="sr-only">
                    First name
                  </label>
                  <input
                    id="demo-first"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    autoComplete="given-name"
                    className="w-full rounded-2xl border border-black/15 bg-white px-5 py-4 text-[16px] text-ink outline-none transition-colors placeholder:text-grey-text/70 focus:border-orange focus:ring-4 focus:ring-orange/15"
                  />
                </div>
                <div>
                  <label htmlFor="demo-last" className="sr-only">
                    Last name
                  </label>
                  <input
                    id="demo-last"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    autoComplete="family-name"
                    className="w-full rounded-2xl border border-black/15 bg-white px-5 py-4 text-[16px] text-ink outline-none transition-colors placeholder:text-grey-text/70 focus:border-orange focus:ring-4 focus:ring-orange/15"
                  />
                </div>
              </div>

              {error && (
                <p role="alert" className="mt-4 text-center text-[13.5px] font-medium text-orange-600">
                  {error}
                </p>
              )}

              <p className="mt-7 px-2 text-center text-[12.5px] leading-relaxed text-grey-text">
                We respect your data. By submitting, you agree that Spine may contact you about our
                products and services, per our{" "}
                <a href="/privacy" className="font-medium text-ink underline underline-offset-2">
                  privacy policy
                </a>
                .
              </p>

              <button
                type="submit"
                disabled={sending}
                className="mt-7 w-full cursor-pointer rounded-pill bg-black px-8 py-4 text-[16px] font-semibold text-white transition-colors hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {sending ? "Opening the calendar…" : "Pick a time →"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
