// The /audit?ref=yc variant: one config object of copy overrides, not a forked
// page. AuditPage resolves it from the ref query param; components render the
// overrides when present. (UI copy: no em-dashes, per the audit copy rules.)

export type AuditVariant = {
  ref: string;
  eyebrow: string; // replaces the hero eyebrow
  note: string; // support line under the hero subline
  perk: string; // batch perk callout, rendered near the results CTA
};

const YC: AuditVariant = {
  ref: "yc",
  eyebrow: "Built by a YC F26 company, for YC companies",
  note: "Q4 renewals are coming. Get your number before the wave.",
  perk: "YC batch perk: book straight onto a founder call. One call, your exact number, no sales loop.",
};

export function variantFromRef(ref: string | null | undefined): AuditVariant | null {
  return ref === "yc" ? YC : null;
}
