"use client";

import {
  BatteryFull,
  CellSignalFull,
  PaperPlaneRight,
  WifiHigh,
} from "@phosphor-icons/react/dist/ssr";
import type { BenefitsAgent } from "./benefitsAgents";

// The Heal-app phone mockup on the right of the employee Benefits half. Header,
// chat thread, picture-in-picture clip and input all follow the selected agent.
// PHASE 1: static — the whole thread renders at once and switching agents swaps
// the content instantly. The looping "talking" sequence lands in a later phase.

function QuestionBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[80%] self-start rounded-[18px_18px_18px_5px] bg-white px-3.5 py-[10px] shadow-[0_1px_2px_rgba(20,20,18,0.06)]">
      <p className="text-[13px] leading-[1.4] text-[#2e2d28]">{children}</p>
    </div>
  );
}

function AnswerBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[82%] self-end rounded-[18px_18px_5px_18px] bg-aqua-100 px-3.5 py-[10px]">
      <p className="text-[13px] leading-[1.4] text-aqua-700">{children}</p>
    </div>
  );
}

export function AgentPhone({ agent }: { agent: BenefitsAgent }) {
  return (
    <div className="flex min-h-[520px] w-full flex-col overflow-hidden rounded-[34px] border border-[#e6e6e8] bg-white shadow-[0_40px_80px_-44px_rgba(20,20,18,0.35)] lg:h-full">
      {/* iOS status bar */}
      <div className="flex items-center justify-between px-[24px] pb-1 pt-4">
        <span className="text-[13px] font-bold text-[#15140f]">9:41</span>
        <div className="flex items-center gap-1.5 text-[#15140f]">
          <CellSignalFull size={13} weight="fill" />
          <WifiHigh size={13} weight="fill" />
          <BatteryFull size={15} weight="fill" />
        </div>
      </div>

      {/* App header — the agent's name, centred */}
      <div className="border-b border-[#eef0f1] px-5 pb-3.5 pt-2 text-center">
        <div className="text-[16px] font-extrabold tracking-[-0.01em] text-aqua-500">
          {agent.name}
        </div>
      </div>

      {/* Messages */}
      <div className="relative flex flex-1 flex-col gap-2.5 bg-[#f4f5f6] px-[18px] py-5">
        <div className="self-center rounded-full bg-[#e5e6e8] px-3 py-1 text-[11px] font-semibold text-[#8b8b91]">
          Today
        </div>

        <QuestionBubble>{agent.question}</QuestionBubble>
        {agent.answer.map((line, i) => (
          <AnswerBubble key={i}>{line}</AnswerBubble>
        ))}

        {/* Picture-in-picture — the agent's talking clip */}
        <div className="absolute bottom-3 right-[18px] h-[104px] w-[86px] overflow-hidden rounded-[16px] border-2 border-white bg-aqua-100 shadow-[0_10px_24px_-8px_rgba(20,20,18,0.35)]">
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
