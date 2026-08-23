"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { track } from "@/lib/audit/track";
import { variantFromRef } from "@/lib/audit/ycVariant";
import { headcountForBucket, TEAM_SIZE_BUCKETS, type TeamSizeId } from "@/lib/funnel/teamSize";
import { IconArrowRight } from "@/components/audit/icons";

// The /start entry: one tap sorts visitors between the two funnels and
// carries the answer over as a prefill. Team size ≤ 10 → the setup scan;
// bigger → the renewal audit. People who already know they have a group plan
// can skip straight to the audit via the line under the card. /audit and
// /scan stay fully usable standalone — this is a router, not a gate.

export function StartRouter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const variant = variantFromRef(searchParams.get("ref"));

  const ev = (props: Record<string, string | number | boolean> = {}) => ({
    funnel: "router",
    ...props,
    ...(variant ? { ref: variant.ref } : {}),
  });

  const viewedRef = useRef(false);
  useEffect(() => {
    if (viewedRef.current) return;
    viewedRef.current = true;
    track("router_view", ev());
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fire once per page view
  }, []);

  const refQs = variant ? `ref=${variant.ref}&` : "";

  const route = (size: TeamSizeId) => {
    const small = size === "1-4" || size === "5-10";
    const destination = small
      ? `/scan?${refQs}size=${size}`
      : `/audit?${refQs}headcount=${headcountForBucket(size)}`;
    track("router_routed", ev({ size, destination: small ? "scan" : "audit" }));
    router.push(destination);
  };

  const auditHref = variant ? `/audit?ref=${variant.ref}` : "/audit";

  return (
    <main className="text-ink">
      <div className="mx-auto w-full max-w-[640px] px-6 pb-16 pt-8 sm:pt-14">
        {variant ? (
          <div className="mb-3 inline-flex items-center rounded-pill border border-orange-150 bg-orange-100 px-4 py-1.5 text-[12px] font-extrabold text-orange-ink">
            {variant.eyebrow}
          </div>
        ) : (
          <div className="mb-3 text-[11.5px] font-extrabold uppercase tracking-[0.16em] text-orange-700">
            Payroll, benefits, compliance
          </div>
        )}
        <h1 className="text-[28px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[36px]">
          45 seconds to what you&apos;re <span className="text-orange">missing or overpaying.</span>
        </h1>
        {variant && (
          <p className="mt-3 text-[14.5px] font-semibold text-ink-2">{variant.note}</p>
        )}

        <div className="mt-8 rounded-[24px] border border-hairline bg-white p-6 shadow-[0_30px_80px_-40px_rgba(20,20,18,0.35)] sm:p-8">
          <h2 className="text-[21px] font-extrabold tracking-[-0.02em] text-ink sm:text-[24px]">
            How big is the team?
          </h2>
          <p className="mt-1.5 text-[14px] text-body-2">
            One tap. It picks the right tool, both free and instant.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-2.5">
            {TEAM_SIZE_BUCKETS.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => route(b.id)}
                className="cursor-pointer rounded-2xl border border-black/15 bg-white px-5 py-5 text-center text-[17px] font-bold text-ink transition-colors hover:border-orange hover:bg-orange-100/40"
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-5 text-center text-[13.5px] text-body-2">
          Already have a group health plan?{" "}
          <Link
            href={auditHref}
            className="inline-flex items-center gap-1 font-bold text-orange-700 underline underline-offset-2 hover:text-orange-600"
          >
            Check your renewal instead
            <IconArrowRight size={13} />
          </Link>
        </p>
      </div>
    </main>
  );
}
