import type { ReactNode } from "react";
import { IconCheckCircle, IconTimer } from "@/components/audit/icons";

// A compact Slack window, in Slack's own visual language (borrowed from the
// marketing site's SlackWindow: aubergine chrome, APP badge, Block Kit style
// attachment), showing what the specialist opens with once you add Spine —
// written from THIS visitor's own result.
//
// It carries a "Preview" chip on purpose. It reads like their Slack, which is
// the point, but we never want it mistaken for a conversation that already
// happened.

export type SlackPreviewItem = { label: string; tag: string; done?: boolean };

export function SlackPreview({
  channel,
  message,
  itemsTitle,
  items,
}: {
  channel: string;
  message: ReactNode;
  itemsTitle?: string;
  items?: SlackPreviewItem[];
}) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-[#d6d6d1] bg-white text-left shadow-[0_20px_44px_-28px_rgba(0,0,0,0.55)]">
      <div className="flex items-center gap-1.5 border-b border-[#e2e2e2] px-3.5 py-2.5">
        <span className="text-[14px] font-normal text-[#868686]">#</span>
        <span className="text-[13px] font-extrabold tracking-[-0.01em] text-[#1d1c1d]">
          {channel}
        </span>
        <span className="ml-auto rounded-full bg-[#f4f4f2] px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.07em] text-[#868686]">
          Preview
        </span>
      </div>

      <div className="flex gap-2.5 px-3.5 py-3">
        <span className="grid size-[30px] flex-none place-items-center rounded-[5px] bg-orange/[0.12] text-[12px] font-extrabold text-orange">
          S
        </span>
        <div className="min-w-0 flex-1">
          <div className="mb-0.5 flex flex-wrap items-center gap-1.5">
            <span className="text-[13.5px] font-extrabold tracking-[-0.01em] text-[#1d1c1d]">
              Spine
            </span>
            <span className="rounded-[2px] bg-[#e8e8e8] px-1 py-px text-[9px] font-bold uppercase leading-[1.5] tracking-[0.05em] text-[#5d5d5d]">
              App
            </span>
            <span className="text-[11px] text-[#616061]">now</span>
          </div>

          <p className="text-[13px] leading-[1.45] text-[#1d1c1d]">{message}</p>

          {items && items.length > 0 && (
            <div className="mt-2 rounded-r-[6px] border-l-[3px] border-l-orange bg-orange/[0.04] px-3 py-2.5">
              {itemsTitle && (
                <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.07em] text-[#616061]">
                  {itemsTitle}
                </div>
              )}
              {items.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex items-center gap-2 py-[5px] text-[12.5px] text-[#1d1c1d] ${
                    i > 0 ? "border-t border-[#e5e5e2]" : ""
                  }`}
                >
                  {row.done ? (
                    <IconCheckCircle size={13} className="flex-none text-[#2a8b3f]" />
                  ) : (
                    <IconTimer size={13} className="flex-none text-orange" />
                  )}
                  <span className="min-w-0 leading-snug">{row.label}</span>
                  <span
                    className={`ml-auto flex-none whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.05em] ${
                      row.done ? "text-[#8a8a8a]" : "text-orange"
                    }`}
                  >
                    {row.tag}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="px-3.5 pb-3.5">
        <div className="flex items-center gap-2 rounded-lg border border-[#8d8d8d] px-3 py-[7px]">
          <span className="flex-1 truncate text-[12.5px] text-[#8d8d8d]">
            Message #{channel}
          </span>
          <span className="grid size-[22px] flex-none place-items-center rounded bg-[#007a5a] text-[10px] font-bold text-white">
            ➤
          </span>
        </div>
      </div>
    </div>
  );
}
