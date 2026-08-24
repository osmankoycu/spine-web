"use client";

import { useState } from "react";
import type { ScanQuestion as Q } from "@/lib/scan/scanRules";
import { IconArrowRight, IconCheckCircle, IconChevronDown } from "@/components/audit/icons";
import { ScanIcon } from "./icons";

// One question on screen at a time. Single-select advances instantly on tap
// (the mock's core interaction); the multi-select states question collects
// toggles behind a Continue button. Remounted per question (key=q.id), so the
// multi state resets for free.

export function ScanQuestion({
  question,
  onAnswer,
}: {
  question: Q;
  onAnswer: (value: string | string[]) => void;
}) {
  const [multiSel, setMultiSel] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  const toggle = (option: string) =>
    setMultiSel((sel) =>
      sel.includes(option) ? sel.filter((s) => s !== option) : [...sel, option],
    );

  // Questions with a `common` list show those first; everything else waits
  // behind the expander (states: 8 common + catch-all, then the other 43).
  const primaryOptions = question.common ?? question.options;
  const restOptions = question.common
    ? question.options.filter((o) => !question.common!.includes(o))
    : [];

  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-[12px] bg-orange-100">
          <ScanIcon name={question.icon} size={22} className="text-orange-700" />
        </span>
        <h2 className="text-[22px] font-extrabold tracking-[-0.02em] text-ink sm:text-[26px]">
          {question.q}
        </h2>
      </div>
      {question.hint && (
        <p className="ml-14 mt-1 text-[14px] leading-snug text-body-2">{question.hint}</p>
      )}

      {/* Two columns from sm up: the card is wide now, so a single stack of
          rows would leave it tall and thin. */}
      <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
        {primaryOptions.map((option) => {
          const active = question.multi && multiSel.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={question.multi ? active : undefined}
              onClick={() => (question.multi ? toggle(option) : onAnswer(option))}
              className={`flex cursor-pointer items-center justify-between rounded-2xl border px-5 py-4 text-left text-[16px] font-medium transition-colors ${
                active
                  ? "border-black bg-black text-white"
                  : "border-black/15 bg-white text-ink hover:border-orange hover:bg-orange-100/40"
              }`}
            >
              {option}
              {question.multi && (
                <span
                  className={`grid size-5 place-items-center rounded-[6px] border ${
                    active ? "border-white bg-white" : "border-black/20 bg-transparent"
                  }`}
                >
                  {active && <IconCheckCircle size={14} className="text-black" />}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* The remaining states: compact code chips, so all 51 stay one tap away
          without burying the common ones. */}
      {restOptions.length > 0 && (
        <div className="mt-3">
          {!showAll ? (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex cursor-pointer items-center gap-1.5 text-[13.5px] font-semibold text-orange-700 underline underline-offset-2 hover:text-orange-600"
            >
              Somewhere else? Show all states
              <IconChevronDown size={15} />
            </button>
          ) : (
            <div className="grid grid-cols-6 gap-2 sm:grid-cols-10">
              {restOptions.map((option) => {
                const active = multiSel.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggle(option)}
                    className={`cursor-pointer rounded-xl border px-2 py-2.5 text-center text-[13.5px] font-bold transition-colors ${
                      active
                        ? "border-black bg-black text-white"
                        : "border-black/15 bg-white text-ink-2 hover:border-orange hover:bg-orange-100/40"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {question.multi && (
        <button
          type="button"
          disabled={multiSel.length === 0}
          onClick={() => onAnswer(multiSel)}
          className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-pill bg-black px-7 py-3.5 text-[15.5px] font-semibold text-white transition-colors hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue
          <IconArrowRight size={17} />
        </button>
      )}
    </div>
  );
}
