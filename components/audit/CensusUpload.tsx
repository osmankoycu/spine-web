"use client";

import { useRef, useState, type DragEvent } from "react";
import {
  analyzeCensus,
  type CensusAggregates,
  type CensusRow,
} from "@/lib/audit/censusParse";
import type { HrisFormatId } from "@/lib/audit/hrisFormats";
import { ColumnMapper } from "./ColumnMapper";
import { ParseTheater } from "./ParseTheater";
import { PrivacyStrip } from "./PrivacyStrip";
import { ExportGuides } from "./ExportGuides";
import { IconCheckCircle, IconUpload } from "./icons";

// Step 2: census drop zone. Everything parses client-side (censusParse.ts);
// the file never leaves the browser and the UI says so where you can't miss
// it. Detection badge → ParseTheater reveal → the flow advances. XLSX is out
// of scope in v1, so we say "export as CSV" instead of failing silently.

const MAX_BYTES = 5 * 1024 * 1024;

const FORMAT_BADGES: Record<HrisFormatId, string> = {
  rippling: "Rippling export detected",
  gusto: "Gusto export detected",
  deel: "Deel export detected",
  generic: "CSV parsed",
};

type Phase =
  | { name: "idle" }
  | { name: "mapping"; headers: string[]; rows: CensusRow[] }
  | { name: "parsed"; aggregates: CensusAggregates; format: HrisFormatId };

export function CensusUpload({
  onParsed,
  onSkip,
}: {
  onParsed: (aggregates: CensusAggregates, format: HrisFormatId) => void;
  onSkip: () => void;
}) {
  const [phase, setPhase] = useState<Phase>({ name: "idle" });
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError(null);
    const lower = file.name.toLowerCase();
    if (/\.xlsx?$/.test(lower)) {
      setError(
        "Excel files aren't supported yet. In your spreadsheet app choose File, then Save As CSV, and drop that here.",
      );
      return;
    }
    if (!lower.endsWith(".csv") && !file.type.includes("csv") && !file.type.includes("text")) {
      setError("That doesn't look like a CSV file. Export your census as CSV and try again.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("That file is over 5MB. Export just your employee list as CSV.");
      return;
    }

    const text = await file.text();
    const outcome = analyzeCensus(text, new Date());
    if (outcome.status === "error") {
      setError(
        outcome.reason === "empty"
          ? "That file is empty."
          : "We couldn't read that file. Check it opens as a normal CSV and try again.",
      );
      return;
    }
    if (outcome.status === "needs-mapping") {
      setPhase({ name: "mapping", headers: outcome.headers, rows: outcome.rows });
      return;
    }
    setPhase({ name: "parsed", aggregates: outcome.aggregates, format: outcome.format });
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) void handleFile(file);
  };

  const reset = () => {
    setPhase({ name: "idle" });
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="rounded-[24px] border border-hairline bg-white p-6 shadow-[0_30px_80px_-40px_rgba(20,20,18,0.35)] sm:p-8">
      <div className="text-[11.5px] font-extrabold uppercase tracking-[0.16em] text-orange-700">
        Step 2 · Your census
      </div>
      <h2 className="mt-2 text-[22px] font-extrabold tracking-[-0.02em] text-ink sm:text-[26px]">
        Drop in your team.
      </h2>
      <p className="mt-2 max-w-[560px] text-[14.5px] leading-[1.5] text-body-2">
        A census export from Rippling, Gusto, Deel, or any CSV with birth dates.
        It makes your estimate real instead of rough.
      </p>

      {phase.name === "parsed" ? (
        <div className="mt-6">
          <div className="inline-flex items-center gap-2 rounded-pill bg-success-tint px-4 py-2 text-[13.5px] font-bold text-success">
            <IconCheckCircle size={16} />
            {FORMAT_BADGES[phase.format]}
          </div>
          <div className="mt-6">
            <ParseTheater
              aggregates={phase.aggregates}
              onDone={() => onParsed(phase.aggregates, phase.format)}
            />
          </div>
          <button
            type="button"
            onClick={reset}
            className="mt-6 cursor-pointer text-[13.5px] font-semibold text-grey-text underline underline-offset-2 hover:text-ink"
          >
            Use a different file
          </button>
        </div>
      ) : (
        <>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={`mt-6 rounded-[20px] border-2 border-dashed px-6 py-10 text-center transition-colors ${
              dragging ? "border-orange bg-orange-100" : "border-btn-line bg-surface-inset"
            }`}
          >
            <span className="mx-auto grid size-12 place-items-center rounded-[13px] bg-orange-100">
              <IconUpload size={24} className="text-orange-700" />
            </span>
            <p className="mt-4 text-[16px] font-extrabold text-ink">
              Drag your census CSV here
            </p>
            <p className="mt-1 text-[13.5px] text-body-2">
              or{" "}
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="cursor-pointer font-semibold text-ink underline underline-offset-2 hover:text-orange-600"
              >
                browse for a file
              </button>
            </p>
            <p className="mt-3 text-[12.5px] font-semibold text-ink-2">
              Parsed in your browser. Never uploaded.
            </p>
            <input
              ref={inputRef}
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleFile(file);
              }}
            />
          </div>

          {error && (
            <p role="alert" className="mt-3 text-[13.5px] font-medium text-orange-600">
              {error}
            </p>
          )}

          {phase.name === "mapping" && (
            <div className="mt-4">
              <ColumnMapper
                headers={phase.headers}
                rows={phase.rows}
                onMapped={(aggregates) =>
                  setPhase({ name: "parsed", aggregates, format: "generic" })
                }
              />
            </div>
          )}

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={onSkip}
              className="cursor-pointer text-[13.5px] font-semibold text-grey-text underline underline-offset-2 hover:text-ink"
            >
              No census handy? Skip. We&apos;ll estimate from your inputs.
            </button>
          </div>

          <div className="mt-6">
            <ExportGuides />
          </div>
        </>
      )}

      <div className="mt-6">
        <PrivacyStrip />
      </div>
    </div>
  );
}
