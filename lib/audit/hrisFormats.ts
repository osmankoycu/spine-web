// HRIS census-export formats: how we recognize a Rippling / Gusto / Deel
// export from its column headers and which columns carry the fields we need.
// This config is the seam for later HRIS API connections (Finch etc.) — adding
// a format is data, not code.
//
// Headers are matched in normalized form: lowercased, everything but [a-z0-9]
// stripped ("Employee current home address (state)" → "employeecurrenthomeaddressstate").
//
// Signatures researched Aug 2026. Gusto's spellings are from Gusto's own
// reports article (support.gusto.com #101334493100000). Rippling's help center
// is login-walled, so its spellings come from three agreeing integration
// guides (Check, Lattice, CultureBot) documenting the custom-report Variable
// Selector fields; headers mirror whatever fields the admin adds, hence the
// distinctive "Legal …"/"Home - …" prefixes rather than a fixed set. Deel's
// Benefits Census headers aren't public; its fingerprint uses the documented
// Bulk Edit CSV fields (Employee number, Direct manager, Nationality, …).
// Signatures deliberately avoid headers shared across vendors (Date of birth)
// and generic pairs (First/Last name) that would false-positive plain CSVs.
// TODO: validate against one real export per vendor; re-check each quarter —
// HRIS vendors rename columns without notice.

export type HrisFormatId = "rippling" | "gusto" | "deel" | "generic";
export type FieldKey = "dob" | "age" | "state" | "zip" | "tier";

export type HrisFormat = {
  id: HrisFormatId;
  label: string;
  // Distinctive normalized headers. A format is detected when at least
  // MIN_SIGNATURE_HITS of them appear and it out-scores every other format.
  signature: string[];
  // Candidate normalized headers per field, priority order.
  columns: Partial<Record<FieldKey, string[]>>;
};

export const MIN_SIGNATURE_HITS = 2;

export const HRIS_FORMATS: HrisFormat[] = [
  {
    id: "rippling",
    label: "Rippling",
    signature: [
      "legalfirstname",
      "legallastname",
      "homestatecode",
      "homestreetaddress",
      "homezip",
      "worklocationname",
      "worklocationstatecode",
    ],
    columns: {
      dob: ["dateofbirth"],
      state: ["homestatecode", "worklocationstatecode", "homestate", "workstate"],
      zip: ["homezip", "worklocationzip", "zip"],
    },
  },
  {
    id: "gusto",
    label: "Gusto",
    signature: [
      "employeecurrenthomeaddress",
      "employeecurrenthomeaddressstate",
      "employeecurrenthomeaddresszip",
      "employeecurrentworkaddress",
      "employeecurrentworkaddressstate",
    ],
    columns: {
      dob: ["dateofbirth"],
      state: [
        "employeecurrenthomeaddressstate",
        "employeecurrentworkaddressstate",
        "homeaddressstate",
        "state",
      ],
      zip: ["employeecurrenthomeaddresszip", "zip"],
    },
  },
  {
    id: "deel",
    label: "Deel",
    signature: [
      "employeenumber",
      "directmanager",
      "nationality",
      "personalemail",
      "workemail",
      "callingcode",
    ],
    columns: {
      dob: ["dateofbirth", "birthdate"],
      state: ["state", "stateprovince"],
      zip: ["zip"],
    },
  },
];

// Broad fallback candidates for unrecognized exports; also backfills a field a
// detected format's own candidates didn't find.
export const GENERIC_CANDIDATES: Record<FieldKey, string[]> = {
  age: ["age", "employeeage"],
  dob: ["dob", "dateofbirth", "birthdate", "birthday", "birthdateyyyymmdd"],
  state: ["state", "homestate", "workstate", "stateprovince", "homeaddressstate", "region"],
  zip: ["zip", "zipcode", "postalcode", "homezip"],
  tier: [
    "tier",
    "coveragetier",
    "enrollmenttier",
    "coveragelevel",
    "plantier",
    "coverage",
    "enrollment",
  ],
};

export function normalizeHeader(h: string): string {
  return h.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export type DetectedMapping = {
  format: HrisFormatId;
  // FieldKey → original header name, resolved against the real header list.
  mapping: Partial<Record<FieldKey, string>>;
};

// Pick the format whose signature best matches the headers, then resolve each
// field to an actual header (format candidates first, generic as backfill).
export function detectFormat(headers: string[]): DetectedMapping {
  const byNorm = new Map<string, string>();
  for (const h of headers) {
    const n = normalizeHeader(h);
    if (!byNorm.has(n)) byNorm.set(n, h);
  }

  let best: HrisFormat | null = null;
  let bestHits = 0;
  for (const f of HRIS_FORMATS) {
    const hits = f.signature.filter((s) => byNorm.has(s)).length;
    if (hits > bestHits) {
      best = f;
      bestHits = hits;
    }
  }
  const format: HrisFormatId =
    best && bestHits >= MIN_SIGNATURE_HITS ? best.id : "generic";

  const resolve = (candidates: string[] | undefined): string | undefined => {
    for (const c of candidates ?? []) {
      const hit = byNorm.get(c);
      if (hit !== undefined) return hit;
    }
    return undefined;
  };

  const mapping: Partial<Record<FieldKey, string>> = {};
  const fields: FieldKey[] = ["age", "dob", "state", "zip", "tier"];
  for (const field of fields) {
    const fromFormat =
      format !== "generic" ? resolve(best?.columns[field]) : undefined;
    const value = fromFormat ?? resolve(GENERIC_CANDIDATES[field]);
    if (value !== undefined) mapping[field] = value;
  }
  return { format, mapping };
}
