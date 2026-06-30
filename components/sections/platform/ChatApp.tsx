"use client";

import { useEffect, useRef } from "react";
import {
  BatteryFull,
  CellSignalFull,
  FileText,
  PaperPlaneRight,
  Phone,
  WifiHigh,
} from "@phosphor-icons/react/dist/ssr";
import { gsap } from "@/lib/gsap";

// The concierge chat-app mockup (Benefits pillar, right column). Answered by our
// AI agent — rename here. On scroll-into-view the panel rises/fades in and the
// messages then pop in one-by-one (medium-fast stagger), like a live thread.
const AGENT = "Care Navigator";

function ReceivedBubble({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-msg
      className="max-w-[78%] self-start rounded-[18px_18px_18px_5px] border border-[#eaeaec] bg-white px-3.5 py-[11px]"
    >
      <p className="text-[13.5px] leading-[1.4] text-[#2e2d28]">{children}</p>
    </div>
  );
}

function SentBubble({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-msg
      className="max-w-[80%] self-end rounded-[18px_18px_5px_18px] bg-aqua-100 px-3.5 py-[11px]"
    >
      <p className="text-[13.5px] leading-[1.4] text-aqua-700">{children}</p>
    </div>
  );
}

export function ChatApp() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const msgs = gsap.utils.toArray<HTMLElement>("[data-msg]", root);
    gsap.set(root, { opacity: 0, y: 22, scale: 0.97, transformOrigin: "50% 60%" });
    gsap.set(msgs, { opacity: 0, y: 12, scale: 0.96 });

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      const tl = gsap.timeline();
      tl.to(root, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" });
      // messages tick in one-by-one as soon as the panel starts revealing
      tl.to(
        msgs,
        { opacity: 1, y: 0, scale: 1, duration: 0.32, ease: "back.out(1.5)", stagger: 0.13 },
        0.2,
      );
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "-40% 0px -40% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="flex min-h-[520px] flex-col overflow-hidden rounded-[30px] border border-[#e6e6e8] bg-[#f2f2f3] shadow-[0_30px_60px_-36px_rgba(20,20,18,0.3)]"
    >
      {/* iOS status bar */}
      <div className="flex items-center justify-between bg-white px-[22px] pb-1.5 pt-3.5">
        <span className="text-[13px] font-bold text-[#15140f]">9:41</span>
        <div className="flex items-center gap-1.5 text-[#15140f]">
          <CellSignalFull size={13} weight="fill" />
          <WifiHigh size={13} weight="fill" />
          <BatteryFull size={15} weight="fill" />
        </div>
      </div>

      {/* App header */}
      <div className="flex items-center gap-3 border-b border-[#eaeaec] bg-white px-[18px] pb-3.5 pt-1.5">
        <span className="relative grid size-[42px] shrink-0 place-items-center rounded-full bg-gradient-to-br from-aqua-400 to-aqua-500">
          <span className="text-[18px] font-extrabold text-white">{AGENT[0]}</span>
          <span className="absolute -bottom-px -right-px size-3 rounded-full border-2 border-white bg-[#2ec46b]" />
        </span>
        <div className="flex-1">
          <div className="text-[15px] font-extrabold tracking-[-0.01em] text-[#15140f]">
            {AGENT}
          </div>
          <div className="text-[12px] font-semibold text-[#2a8b3f]">
            Spine agent · online, replies in ~1 min
          </div>
        </div>
        <Phone size={20} className="text-[#b0afa9]" />
      </div>

      {/* Messages */}
      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-[18px] py-5">
        <div
          data-msg
          className="self-center rounded-full bg-[#e9e9eb] px-3 py-1 text-[11px] font-semibold text-[#909096]"
        >
          Today
        </div>
        <ReceivedBubble>I got a $1,200 ER bill, is this right?</ReceivedBubble>
        <SentBubble>Looking into it now, hang tight.</SentBubble>
        <SentBubble>
          Found it, you were billed out-of-network by mistake. We&apos;re disputing
          it for you.
        </SentBubble>
        <div
          data-msg
          className="flex items-center gap-2 self-start rounded-[14px] border border-[#eaeaec] bg-white px-3.5 py-2.5"
        >
          <FileText size={18} weight="duotone" className="text-aqua-500" />
          <div>
            <div className="text-[12.5px] font-bold text-[#15140f]">Claim #4821</div>
            <div className="text-[11px] text-[#a9a9a3]">In review · we&apos;ll update you</div>
          </div>
        </div>
        <SentBubble>No action needed on your end.</SentBubble>
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2.5 border-t border-[#eaeaec] bg-white px-4 pb-[18px] pt-3">
        <div className="flex-1 rounded-full border border-[#e6e6e8] bg-[#f2f2f3] px-4 py-[11px] text-[13.5px] text-[#a9a9a3]">
          Message {AGENT}…
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-aqua-400">
          <PaperPlaneRight size={18} weight="fill" className="text-white" />
        </span>
      </div>
    </div>
  );
}
