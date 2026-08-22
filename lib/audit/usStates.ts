// US states for the audit tool: the step-0 select, census state normalization,
// and the parse-animation tile map (gridCol/gridRow position each state square
// on the classic tile-grid layout).
export type UsState = {
  code: string;
  name: string;
  gridCol: number; // 1-based, 11 columns
  gridRow: number; // 1-based, 8 rows
};

export const US_STATES: UsState[] = [
  { code: "AK", name: "Alaska", gridCol: 1, gridRow: 1 },
  { code: "ME", name: "Maine", gridCol: 11, gridRow: 1 },
  { code: "VT", name: "Vermont", gridCol: 10, gridRow: 2 },
  { code: "NH", name: "New Hampshire", gridCol: 11, gridRow: 2 },
  { code: "WA", name: "Washington", gridCol: 1, gridRow: 3 },
  { code: "ID", name: "Idaho", gridCol: 2, gridRow: 3 },
  { code: "MT", name: "Montana", gridCol: 3, gridRow: 3 },
  { code: "ND", name: "North Dakota", gridCol: 4, gridRow: 3 },
  { code: "MN", name: "Minnesota", gridCol: 5, gridRow: 3 },
  { code: "WI", name: "Wisconsin", gridCol: 6, gridRow: 3 },
  { code: "MI", name: "Michigan", gridCol: 8, gridRow: 3 },
  { code: "NY", name: "New York", gridCol: 9, gridRow: 3 },
  { code: "MA", name: "Massachusetts", gridCol: 10, gridRow: 3 },
  { code: "RI", name: "Rhode Island", gridCol: 11, gridRow: 3 },
  { code: "OR", name: "Oregon", gridCol: 1, gridRow: 4 },
  { code: "NV", name: "Nevada", gridCol: 2, gridRow: 4 },
  { code: "WY", name: "Wyoming", gridCol: 3, gridRow: 4 },
  { code: "SD", name: "South Dakota", gridCol: 4, gridRow: 4 },
  { code: "IA", name: "Iowa", gridCol: 5, gridRow: 4 },
  { code: "IL", name: "Illinois", gridCol: 6, gridRow: 4 },
  { code: "IN", name: "Indiana", gridCol: 7, gridRow: 4 },
  { code: "OH", name: "Ohio", gridCol: 8, gridRow: 4 },
  { code: "PA", name: "Pennsylvania", gridCol: 9, gridRow: 4 },
  { code: "NJ", name: "New Jersey", gridCol: 10, gridRow: 4 },
  { code: "CT", name: "Connecticut", gridCol: 11, gridRow: 4 },
  { code: "CA", name: "California", gridCol: 1, gridRow: 5 },
  { code: "UT", name: "Utah", gridCol: 2, gridRow: 5 },
  { code: "CO", name: "Colorado", gridCol: 3, gridRow: 5 },
  { code: "NE", name: "Nebraska", gridCol: 4, gridRow: 5 },
  { code: "MO", name: "Missouri", gridCol: 5, gridRow: 5 },
  { code: "KY", name: "Kentucky", gridCol: 6, gridRow: 5 },
  { code: "WV", name: "West Virginia", gridCol: 7, gridRow: 5 },
  { code: "VA", name: "Virginia", gridCol: 8, gridRow: 5 },
  { code: "MD", name: "Maryland", gridCol: 9, gridRow: 5 },
  { code: "DE", name: "Delaware", gridCol: 10, gridRow: 5 },
  { code: "AZ", name: "Arizona", gridCol: 2, gridRow: 6 },
  { code: "NM", name: "New Mexico", gridCol: 3, gridRow: 6 },
  { code: "KS", name: "Kansas", gridCol: 4, gridRow: 6 },
  { code: "AR", name: "Arkansas", gridCol: 5, gridRow: 6 },
  { code: "TN", name: "Tennessee", gridCol: 6, gridRow: 6 },
  { code: "NC", name: "North Carolina", gridCol: 7, gridRow: 6 },
  { code: "SC", name: "South Carolina", gridCol: 8, gridRow: 6 },
  { code: "DC", name: "Washington DC", gridCol: 9, gridRow: 6 },
  { code: "OK", name: "Oklahoma", gridCol: 4, gridRow: 7 },
  { code: "LA", name: "Louisiana", gridCol: 5, gridRow: 7 },
  { code: "MS", name: "Mississippi", gridCol: 6, gridRow: 7 },
  { code: "AL", name: "Alabama", gridCol: 7, gridRow: 7 },
  { code: "GA", name: "Georgia", gridCol: 8, gridRow: 7 },
  { code: "HI", name: "Hawaii", gridCol: 1, gridRow: 8 },
  { code: "TX", name: "Texas", gridCol: 4, gridRow: 8 },
  { code: "FL", name: "Florida", gridCol: 9, gridRow: 8 },
];

const BY_NAME = new Map(
  US_STATES.map((s) => [s.name.toLowerCase(), s.code] as const),
);
const CODES = new Set(US_STATES.map((s) => s.code));

// Normalize a census cell ("NY", "ny", "New York", "New York, USA") to a
// 2-letter code, or null if it isn't a US state.
export function toStateCode(raw: string): string | null {
  const v = raw.trim();
  if (!v) return null;
  const upper = v.toUpperCase();
  if (CODES.has(upper)) return upper;
  const named = BY_NAME.get(v.toLowerCase().replace(/[.,].*$/, "").trim());
  return named ?? null;
}
