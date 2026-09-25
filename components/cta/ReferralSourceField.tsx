"use client";

import { CaretDown } from "@phosphor-icons/react";

const options = [
  "Google / Search engine",
  "LinkedIn",
  "Friend or colleague",
  "Partner referral",
  "Y Combinator",
  "Event or community",
  "Other",
];

export function ReferralSourceField({
  id,
  value,
  details,
  onChange,
  onDetailsChange,
  inputClassName,
}: {
  id: string;
  value: string;
  details: string;
  onChange: (value: string) => void;
  onDetailsChange: (value: string) => void;
  inputClassName: string;
}) {
  return (
    <div className="mt-4 space-y-3">
      <label htmlFor={id} className="block text-[14px] font-medium text-ink">
        Where did you hear about us?{" "}
        <span className="font-normal text-grey-text">(optional)</span>
      </label>
      <div className="relative">
        <select
          id={id}
          name="referralSource"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${inputClassName} appearance-none pr-12`}
        >
          <option value="">Select an option</option>
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
        <CaretDown
          size={18}
          weight="bold"
          aria-hidden="true"
          className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-ink/60"
        />
      </div>
      {value === "Other" && (
        <div>
          <label htmlFor={`${id}-details`} className="sr-only">Please tell us where</label>
          <input
            id={`${id}-details`}
            name="referralSourceDetails"
            type="text"
            maxLength={300}
            value={details}
            onChange={(event) => onDetailsChange(event.target.value)}
            placeholder="Please tell us where"
            className={inputClassName}
          />
        </div>
      )}
    </div>
  );
}
