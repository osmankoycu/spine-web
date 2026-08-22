// Plain-English trust strip next to the upload zone. Server-renderable; no
// interactivity. Copy rule: short sentences, no jargon, no em-dashes.
import Link from "next/link";
import { IconLock } from "./icons";

export function PrivacyStrip() {
  return (
    <div className="flex items-start gap-3 rounded-[16px] bg-surface-band px-5 py-4">
      <IconLock size={18} className="mt-0.5 shrink-0 text-ink-2" />
      <p className="text-[13.5px] leading-relaxed text-ink-2">
        Your file is read right here in your browser. It is never uploaded.
        When you ask for your number we send only totals: team size, average
        age, state mix, and your email. Carriers pay us, so the audit is
        genuinely free.{" "}
        <Link href="/privacy" className="font-semibold text-ink underline underline-offset-2">
          Privacy
        </Link>{" "}
        ·{" "}
        <Link href="/terms" className="font-semibold text-ink underline underline-offset-2">
          Terms
        </Link>
      </p>
    </div>
  );
}
