"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import { track } from "@/lib/audit/track";
import { variantFromRef } from "@/lib/audit/ycVariant";
import { headcountForBucket, TEAM_SIZE_BUCKETS, type TeamSizeId } from "@/lib/funnel/teamSize";
import { IconArrowRight } from "@/components/audit/icons";

// The /start entry: the hero video carries the pitch (white-on-white, no
// frame — it melts into the page, which the funnel shell paints pure white
// for this route), and the one-tap team-size bar docked at the bottom sorts
// visitors between the two funnels with the answer carried as a prefill.
// Sizes ≤ 10 → the setup scan; bigger → the renewal audit. /audit and /scan
// stay fully usable standalone — this is a router, not a gate.

export function StartRouter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const variant = variantFromRef(searchParams.get("ref"));
  const videoRef = useRef<HTMLVideoElement>(null);

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

  // The video is decorative; under reduced motion it holds its first frame.
  // Otherwise nudge playback — Safari and low-power modes sometimes ignore
  // the autoplay attribute even for muted video.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (prefersReducedMotion()) v.pause();
    else v.play().catch(() => {});
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
    // No background of its own: the shell paints #fbfbfb for this route, and a
    // pure-white main here would band against the header above it.
    <main className="flex flex-1 flex-col text-ink">
      {/* ── Hero video: frameless, melts into the page (see .start-video) ── */}
      <div className="flex flex-col items-center pt-2 sm:pt-6">
        {variant && (
          <div className="mx-6 mb-4 inline-flex items-center rounded-pill border border-orange-150 bg-orange-100 px-4 py-1.5 text-[12px] font-extrabold text-orange-ink">
            {variant.eyebrow}
          </div>
        )}
        {/* Plays once and rests on its last frame. On phones it scales past
            the viewport edges (the scene is centred, the sides are empty), so
            the wrapper clips the bleed and the wider mobile feather hides it.
            overflow-x-clip, not hidden: no scroll container, no page-level
            horizontal scrollbar. */}
        <div className="flex w-full justify-center overflow-x-clip">
          <video
            ref={videoRef}
            src="/start/spine-yc-video.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="start-video w-[138%] max-w-none shrink-0 object-contain sm:w-full sm:max-w-[1080px]"
            style={{ maxHeight: "min(62vh, 640px)" }}
          />
        </div>
      </div>

      <div className="flex-1" />

      {/* ── Team-size bar, docked at the bottom ── */}
      {/* pb keeps the bar + link block clear of the footer below. */}
      <div className="w-full px-6 pb-12">
        <div className="mx-auto w-full max-w-[880px] rounded-[20px] border border-hairline bg-white p-4 shadow-[0_18px_50px_-30px_rgba(20,20,18,0.3)] sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="shrink-0">
              <div className="text-[16px] font-extrabold tracking-[-0.01em] text-ink">
                How big is the team?
              </div>
              <div className="mt-0.5 text-[12.5px] text-muted">
                One tap picks the right tool. Free and instant.
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {TEAM_SIZE_BUCKETS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => route(b.id)}
                  className="cursor-pointer whitespace-nowrap rounded-xl border border-black/15 bg-white px-5 py-3 text-[15px] font-bold text-ink transition-colors hover:border-orange hover:bg-orange-100/40"
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-7 text-center text-[13px] text-body-2">
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
