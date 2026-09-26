"use client";

import { CaretDown } from "@phosphor-icons/react";
import { US_STATES } from "@/lib/audit/usStates";

const states = [...US_STATES].sort((a, b) => a.name.localeCompare(b.name));

export function CompanyDetailsFields({
  idPrefix,
  hqState,
  numberOfEmployees,
  onHqStateChange,
  onNumberOfEmployeesChange,
  inputClassName,
}: {
  idPrefix: string;
  hqState: string;
  numberOfEmployees: string;
  onHqStateChange: (value: string) => void;
  onNumberOfEmployeesChange: (value: string) => void;
  inputClassName: string;
}) {
  return (
    <div className="mt-4 grid grid-cols-1 items-end gap-3 sm:grid-cols-2">
      <div>
        <label htmlFor={`${idPrefix}-hq-state`} className="mb-2 block text-[14px] font-medium text-ink">
          HQ state <span className="font-normal text-grey-text">(optional)</span>
        </label>
        <div className="relative">
          <select
            id={`${idPrefix}-hq-state`}
            name="hqState"
            value={hqState}
            onChange={(event) => onHqStateChange(event.target.value)}
            className={`${inputClassName} appearance-none pr-12`}
          >
            <option value="">Select a state</option>
            {states.map((state) => (
              <option key={state.code} value={state.code}>{state.name}</option>
            ))}
          </select>
          <CaretDown size={18} weight="bold" aria-hidden="true" className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-ink/60" />
        </div>
      </div>
      <div>
        <label htmlFor={`${idPrefix}-employees`} className="mb-2 block text-[14px] font-medium text-ink">
          Number of Employees <span className="font-normal text-grey-text">(optional)</span>
        </label>
        <input
          id={`${idPrefix}-employees`}
          name="numberOfEmployees"
          type="number"
          inputMode="numeric"
          min={1}
          max={Number.MAX_SAFE_INTEGER}
          step={1}
          value={numberOfEmployees}
          onChange={(event) => onNumberOfEmployeesChange(event.target.value)}
          placeholder="e.g. 25"
          className={inputClassName}
        />
      </div>
    </div>
  );
}
