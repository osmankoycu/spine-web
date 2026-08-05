"use client";

import { useEffect, useRef } from "react";
import {
  At,
  CaretDown,
  Check,
  Clock,
  MagnifyingGlass,
  Paperclip,
  PaperPlaneRight,
  PencilSimpleLine,
  Smiley,
  Users,
} from "@phosphor-icons/react/dist/ssr";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import {
  type Block,
  type Message,
  type TaskRow,
  thread,
  workspace,
} from "./slackThread";

// Spine inside Slack — the People Ops pillar's right column. Slack's own chrome
// (aubergine sidebar, APP badge, Block Kit style attachments) so it reads as
// Slack at a glance; Spine's orange for anything Spine says or does. On scroll
// into view the thread replays: each block ticks in, with a "Spine is typing…"
// beat before the app answers. Reduced motion / no JS shows the finished thread.

const AUBERGINE = "#3f0e40";

export function SlackWindow() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Only opacity/y is animated — never height. Every message already occupies
    // its final space at opacity 0 and the typing bubble is out of flow, so the
    // window never resizes mid-replay.
    const steps = gsap.utils.toArray<HTMLElement>("[data-step]", root);
    steps.forEach((el) => {
      gsap.set(el, el.hasAttribute("data-typing") ? { opacity: 0 } : { opacity: 0, y: 8 });
    });

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      const tl = gsap.timeline({ delay: 0.15 });
      steps.forEach((el) => {
        if (el.hasAttribute("data-typing")) {
          tl.to(el, { opacity: 1, duration: 0.12 }, "+=0.04");
          tl.to(el, { opacity: 0, duration: 0.1 }, "+=0.45");
        } else {
          // a message lands as ONE block — avatar, name and body together
          tl.to(el, { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" }, "+=0.06");
        }
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "-25% 0px -25% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="flex h-full min-h-[440px] overflow-hidden rounded-[20px] border border-[#d6d6d1] bg-white shadow-[0_24px_50px_-34px_rgba(20,20,18,0.25)]"
    >
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />

        {/* Feed */}
        <div className="min-h-0 flex-1 overflow-hidden px-4 pb-1 pt-2 sm:px-5">
          {thread.map((msg) => (
            <MessageRow key={msg.id} msg={msg} />
          ))}
        </div>

        <Composer />
      </div>
    </div>
  );
}

/* ── Sidebar ─────────────────────────────────────────────────────────────── */

function Sidebar() {
  return (
    <aside
      // md, not sm: at sm the gutters grow AND the sidebar arrives at once, so
      // the message body would drop from ~487px to ~280px crossing 640px —
      // narrower than on a phone. Holding it to md keeps the width monotonic.
      className="hidden w-[152px] flex-none flex-col pb-4 text-[13px] text-white/70 md:flex"
      style={{ background: AUBERGINE }}
    >
      <div className="flex h-[46px] flex-none items-center justify-between border-b border-white/10 px-3">
        <span className="flex items-center gap-1 text-[13px] font-extrabold tracking-[-0.01em] text-white">
          {workspace.name}
          <CaretDown size={9} weight="fill" className="opacity-80" />
        </span>
        <span className="grid size-[22px] place-items-center rounded-full bg-white">
          <PencilSimpleLine size={11} weight="bold" style={{ color: AUBERGINE }} />
        </span>
      </div>

      <div className="mx-2.5 mt-2.5 flex h-[26px] items-center gap-1.5 rounded-md bg-white/10 px-2 text-[11px] text-white/65">
        <MagnifyingGlass size={11} weight="bold" />
        Search
      </div>

      <SidebarLabel>Channels</SidebarLabel>
      {workspace.channels.map((c) => (
        <div
          key={c.name}
          className={cn(
            "flex h-[26px] items-center gap-1.5 px-3 text-[12.5px]",
            c.active && "bg-[#1164a3] font-bold text-white",
          )}
        >
          <span className={c.active ? "opacity-90" : "opacity-70"}>#</span>
          <span className="truncate">{c.name}</span>
          {c.badge && (
            <span className="ml-auto rounded-full bg-[#cd2553] px-1.5 py-px text-[10px] font-bold leading-tight text-white">
              {c.badge}
            </span>
          )}
        </div>
      ))}

      <SidebarLabel className="mt-3">Apps</SidebarLabel>
      <div className="flex h-[26px] items-center gap-2 px-3 text-[12.5px] font-bold text-white">
        <span className="size-1.5 flex-none rounded-full bg-[#2eb67d]" />
        Spine
      </div>
    </aside>
  );
}

function SidebarLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 px-3 pb-1 pt-2 text-[11.5px] font-bold text-white/70",
        className,
      )}
    >
      <CaretDown size={8} weight="fill" />
      {children}
    </div>
  );
}

/* ── Top bar ─────────────────────────────────────────────────────────────── */

function TopBar() {
  return (
    <div className="flex h-[46px] flex-none items-center gap-2.5 border-b border-[#e2e2e2] px-4 sm:px-5">
      <h3 className="flex items-center gap-1 text-[14px] font-extrabold tracking-[-0.01em] text-[#1d1c1d]">
        <span className="text-[15px] font-normal text-[#868686]">#</span>
        {workspace.channel}
      </h3>
      <span className="hidden border-l border-[#e2e2e2] pl-2.5 text-[11.5px] text-[#616061] md:block">
        {workspace.topic}
      </span>
      <span className="ml-auto flex items-center gap-1.5 rounded-md border border-[#e2e2e2] px-2 py-1 text-[11.5px] text-[#616061]">
        <Users size={12} weight="fill" />
        {workspace.members}
      </span>
    </div>
  );
}

/* ── Messages ────────────────────────────────────────────────────────────── */

function MessageRow({ msg }: { msg: Message }) {
  const isSpine = msg.author === "spine";
  return (
    <>
      {/* Typing beat — zero-height wrapper + absolute bubble, so it floats over
          the space the message is about to fill instead of pushing layout. */}
      {msg.typing && (
        <div
          data-step
          data-typing
          // opacity-0 by default: the replay reveals it via an inline style, so
          // with no JS — or under reduced motion, where the replay is skipped
          // and every message is already shown — the bubble never appears
          // floating over a finished thread.
          className="pointer-events-none relative h-0 overflow-visible opacity-0"
        >
          <div className="absolute left-[40px] top-2 flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-[#f4f4f2] px-2.5 py-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="size-1.5 animate-pulse rounded-full bg-[#b0afa9]"
                  style={{ animationDelay: `${i * 0.16}s` }}
                />
              ))}
            </span>
            <span className="text-[11px] text-[#868686]">Spine is typing…</span>
          </div>
        </div>
      )}

      <div data-step className="flex gap-2.5 py-[5px]">
        <span
          className={cn(
            "grid size-[30px] flex-none place-items-center rounded-[5px] text-[12px] font-extrabold",
            isSpine ? "bg-orange/[0.12] text-orange" : "text-white",
          )}
          style={isSpine ? undefined : { background: AUBERGINE }}
        >
          {msg.initials}
        </span>

        <div className="min-w-0 flex-1">
          <div className="mb-0.5 flex items-center gap-1.5">
            <span className="text-[13.5px] font-extrabold tracking-[-0.01em] text-[#1d1c1d]">
              {msg.name}
            </span>
            {isSpine && (
              <span className="rounded-[2px] bg-[#e8e8e8] px-1 py-px text-[9px] font-bold uppercase tracking-[0.05em] leading-[1.5] text-[#5d5d5d]">
                App
              </span>
            )}
            <span className="text-[11px] text-[#616061]">{msg.time}</span>
          </div>

          {msg.blocks.map((block, i) => (
            <BlockView key={i} block={block} />
          ))}
        </div>
      </div>
    </>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "text":
      return (
        <p className="mt-1 text-[13px] leading-[1.45] text-[#1d1c1d] first:mt-0">
          {block.text}
        </p>
      );

    case "tasks":
      return (
        <Attachment className="border-l-orange bg-orange/[0.04]">
          <AttachmentTitle>{block.title}</AttachmentTitle>
          {block.rows.map((row, i) => (
            <TaskLine key={row.label} row={row} first={i === 0} />
          ))}
        </Attachment>
      );

    case "digest":
      return (
        <Attachment className="border-l-[#2a8b3f] bg-[#f6faf7]">
          <AttachmentTitle>{block.title}</AttachmentTitle>
          {/* stats stay two-line (label, then value + note inline) so the digest
              reads at a glance without adding a third row of height */}
          <div className="grid grid-cols-2 gap-3 pb-1.5">
            {block.stats.map((s) => (
              <div key={s.label}>
                <div className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#8a8a8a]">
                  {s.label}
                </div>
                {/* Side by side only once the column can hold both (~163px is
                    needed; md gives 160, lg gives 229). Below that the note
                    drops under the figure instead of truncating to nothing. */}
                <div className="flex flex-col lg:flex-row lg:items-baseline lg:gap-1.5">
                  <span className="text-[19px] font-extrabold leading-tight tracking-[-0.03em] text-[#15140f]">
                    {s.value}
                  </span>
                  <span
                    className={cn(
                      "text-[11px] font-semibold leading-snug lg:truncate",
                      s.good ? "text-[#2a8b3f]" : "text-[#8a8a8a]",
                    )}
                  >
                    {s.good && "✓ "}
                    {s.note}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {block.rows.map((row) => (
            <TaskLine key={row.label} row={row} />
          ))}
        </Attachment>
      );

    case "person":
      return (
        <Attachment className="border-l-[#4a154b] bg-[#f5f2f6]">
          {/* Wraps below sm: the button drops to its own line instead of
              squeezing the name and role into ~60px. */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
            <span
              className="grid size-[30px] flex-none place-items-center rounded-[5px] text-[11px] font-extrabold text-white"
              style={{ background: "#1d1c1d" }}
            >
              {block.initials}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-1.5">
                <span className="text-[13px] font-extrabold text-[#1d1c1d]">
                  {block.name}
                </span>
                <span className="text-[11.5px] text-[#616061]">{block.role}</span>
              </div>
              <div className="text-[11.5px] text-[#1264a3]">{block.status}</div>
            </div>
            <span className="ml-auto flex-none rounded border border-[#bdbdbd] bg-white px-2.5 py-1.5 text-[11.5px] font-bold text-[#1d1c1d]">
              {block.action}
            </span>
          </div>
        </Attachment>
      );
  }
}

function Attachment({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mt-2 rounded-r-[6px] border-l-[3px] px-3 py-2.5", className)}>
      {children}
    </div>
  );
}

function AttachmentTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.07em] text-[#616061]">
      {children}
    </div>
  );
}

function TaskLine({ row, first }: { row: TaskRow; first?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 py-[5px] text-[12.5px] text-[#1d1c1d]",
        !first && "border-t border-[#e5e5e2]",
      )}
    >
      {row.done ? (
        <Check size={13} weight="bold" className="flex-none text-[#2a8b3f]" />
      ) : (
        <Clock size={13} weight="bold" className="flex-none text-orange" />
      )}
      {/* Wraps until md — that's where the row first has room (~257px) for the
          longest label. Below it, truncating would cut the label mid-word. */}
      <span className="min-w-0 leading-snug md:truncate">{row.label}</span>
      <span
        className={cn(
          "ml-auto flex-none text-[10px] font-bold uppercase tracking-[0.05em]",
          row.done ? "text-[#8a8a8a]" : "text-orange",
        )}
      >
        {row.tag}
      </span>
    </div>
  );
}

/* ── Composer ────────────────────────────────────────────────────────────── */

function Composer() {
  return (
    <div className="flex-none px-4 pb-4 pt-1 sm:px-5">
      {/* Single-line composer — no formatting toolbar, no second tool row. The
          input + send button read as Slack, and the panel sits next to a
          height-constrained timeline. */}
      <div className="flex items-center gap-2.5 rounded-lg border border-[#8d8d8d] px-3 py-[7px] text-[#616061]">
        <span className="flex-1 truncate text-[13px] text-[#8d8d8d]">
          Message #{workspace.channel}
        </span>
        <Smiley size={15} />
        <At size={15} className="hidden sm:block" />
        <Paperclip size={15} className="hidden sm:block" />
        <span className="grid size-[24px] flex-none place-items-center rounded bg-[#007a5a]">
          <PaperPlaneRight size={11} weight="fill" className="text-white" />
        </span>
      </div>
    </div>
  );
}
