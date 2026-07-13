"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import {
  BatteryFull,
  CaretLeft,
  CellSignalFull,
  PaperPlaneRight,
  VideoCamera,
  WifiHigh,
} from "@phosphor-icons/react/dist/ssr";
import { gsap } from "@/lib/gsap";
import type { BenefitsAgent } from "./benefitsAgents";

// useLayoutEffect on the client (so we hide/re-hide the thread BEFORE the
// browser paints — no flash of the new agent's messages on switch), useEffect
// on the server to avoid React's SSR warning.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// The Heal-app phone mockup on the right of the employee Benefits half. Header,
// chat thread, picture-in-picture clip and input all follow the selected agent.
// On first scroll-into-view — and again every time a new agent is picked — the
// thread clears and re-plays: the PiP clip pops in (scale + opacity) while the
// employee question and then the agent's replies tick in one-by-one.

function QuestionBubble({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-lead
      className="max-w-[80%] self-start rounded-[18px_18px_18px_5px] bg-white px-3.5 py-[10px] shadow-[0_1px_2px_rgba(20,20,18,0.06)]"
    >
      <p className="text-[13px] leading-[1.4] text-[#2e2d28]">{children}</p>
    </div>
  );
}

function AnswerBubble({ children }: { children: React.ReactNode }) {
  return (
    <div data-answer className="max-w-[82%] self-end rounded-[18px_18px_5px_18px] bg-aqua-100 px-3.5 py-[10px]">
      <p className="text-[13px] leading-[1.4] text-aqua-700">{children}</p>
    </div>
  );
}

export function AgentPhone({ agent }: { agent: BenefitsAgent }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const inViewRef = useRef(false);

  // Collect the animated pieces (queried fresh so a re-render's new nodes count).
  const collect = useCallback(() => {
    const root = rootRef.current;
    if (!root) return null;
    return {
      lead: gsap.utils.toArray<HTMLElement>("[data-lead]", root),
      answers: gsap.utils.toArray<HTMLElement>("[data-answer]", root),
      pip: root.querySelector<HTMLElement>("[data-pip]"),
    };
  }, []);

  const reduced = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hide everything instantly (used pre-paint so nothing flashes before it plays).
  const hide = useCallback(() => {
    const els = collect();
    if (!els) return;
    tlRef.current?.kill();
    gsap.set([...els.lead, ...els.answers], { opacity: 0, y: 10, scale: 0.96 });
    if (els.pip) gsap.set(els.pip, { opacity: 0, scale: 0.82 });
  }, [collect]);

  // Clear the thread, pop the clip, then tick the question and replies in.
  const play = useCallback(() => {
    const els = collect();
    if (!els) return;
    tlRef.current?.kill();
    if (reduced()) {
      gsap.set([...els.lead, ...els.answers, els.pip].filter(Boolean), {
        opacity: 1,
        y: 0,
        scale: 1,
      });
      return;
    }
    gsap.set([...els.lead, ...els.answers], { opacity: 0, y: 10, scale: 0.96 });
    if (els.pip) gsap.set(els.pip, { opacity: 0, scale: 0.82 });

    const tl = gsap.timeline();
    if (els.pip) {
      tl.to(els.pip, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" }, 0);
    }
    tl.to(
      els.lead,
      { opacity: 1, y: 0, scale: 1, duration: 0.34, ease: "back.out(1.5)", stagger: 0.14 },
      0.08,
    );
    tl.to(
      els.answers,
      { opacity: 1, y: 0, scale: 1, duration: 0.34, ease: "back.out(1.5)", stagger: 0.2 },
      ">0.22",
    );
    tlRef.current = tl;
  }, [collect]);

  // Re-run whenever the agent changes. Hiding first (pre-paint) means the new
  // thread never shows fully before it animates; if the phone is already on
  // screen we play immediately, otherwise the observer below plays on entry.
  useIsoLayoutEffect(() => {
    if (reduced()) {
      play();
      return;
    }
    hide();
    if (inViewRef.current) play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agent.id]);

  // First play on scroll-into-view.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          inViewRef.current = true;
          play();
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "-20% 0px -20% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, [play]);

  return (
    <div
      ref={rootRef}
      className="flex min-h-[520px] w-full flex-col overflow-hidden rounded-[34px] border border-[#e6e6e8] bg-white shadow-[0_40px_80px_-44px_rgba(20,20,18,0.35)] lg:h-full"
    >
      {/* iOS status bar */}
      <div className="flex items-center justify-between px-[24px] pb-1 pt-4">
        <span className="text-[13px] font-bold text-[#15140f]">9:41</span>
        <div className="flex items-center gap-1.5 text-[#15140f]">
          <CellSignalFull size={13} weight="fill" />
          <WifiHigh size={13} weight="fill" />
          <BatteryFull size={15} weight="fill" />
        </div>
      </div>

      {/* App header — the agent's name centred, a back caret to balance it, and
          a video-call action on the right (ties to the talking clip below). */}
      <div className="flex items-center gap-2 border-b border-[#eef0f1] px-3.5 pb-3.5 pt-2">
        <span className="grid size-8 shrink-0 place-items-center text-[#bcc6ca]">
          <CaretLeft size={18} weight="bold" />
        </span>
        <div className="flex-1 text-center text-[16px] font-extrabold tracking-[-0.01em] text-aqua-500">
          {agent.name}
        </div>
        <button
          type="button"
          aria-label={`Video call ${agent.name}`}
          className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full text-aqua-500 transition-colors hover:bg-aqua-100"
        >
          <VideoCamera size={19} weight="fill" />
        </button>
      </div>

      {/* Messages */}
      <div className="relative flex flex-1 flex-col gap-2.5 bg-[#f4f5f6] px-[18px] py-5">
        <div
          data-lead
          className="self-center rounded-full bg-[#e5e6e8] px-3 py-1 text-[11px] font-semibold text-[#8b8b91]"
        >
          Today
        </div>

        <QuestionBubble>{agent.question}</QuestionBubble>
        {agent.answer.map((line, i) => (
          <AnswerBubble key={i}>{line}</AnswerBubble>
        ))}

        {/* Picture-in-picture — the agent's talking clip */}
        <div
          data-pip
          className="absolute bottom-3 right-[18px] h-[104px] w-[86px] overflow-hidden rounded-[16px] border-2 border-white bg-aqua-100 shadow-[0_10px_24px_-8px_rgba(20,20,18,0.35)]"
        >
          <video
            key={agent.id}
            src={`/agents/${agent.id}.mp4`}
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2.5 border-t border-[#eef0f1] bg-white px-4 pb-[18px] pt-3">
        <div className="flex-1 truncate rounded-full border border-[#e6e6e8] bg-[#f4f5f6] px-4 py-[11px] text-[13px] text-[#a9a9a3]">
          Message {agent.name}…
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-aqua-400">
          <PaperPlaneRight size={18} weight="fill" className="text-white" />
        </span>
      </div>
    </div>
  );
}
