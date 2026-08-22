// Results: 2–3 directional plan-mix cards, framing shared with the employer
// dashboard (Protection-focused / Balanced / Cost-optimized / Family-friendly).
// Bands are indicative directions, never quotes, and the footer says so.
import type { ArchetypeFit } from "@/lib/audit/auditEngine";

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export function ArchetypeCards({
  archetypes,
  wellPriced,
}: {
  archetypes: ArchetypeFit[];
  wellPriced: boolean;
}) {
  return (
    <div>
      <h3 className="text-[17px] font-extrabold tracking-[-0.01em] text-ink">
        {wellPriced
          ? "Same spend, richer coverage directions"
          : "Where a better mix could take you"}
      </h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {archetypes.map((a, i) => (
          <div
            key={a.id}
            className={`rounded-[18px] border p-5 ${
              i === 0
                ? "border-orange-150 bg-orange-100"
                : "border-hairline bg-surface-inset"
            }`}
          >
            {i === 0 && (
              <div className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-orange-ink">
                Primary direction
              </div>
            )}
            <div className="text-[15.5px] font-extrabold text-ink">{a.label}</div>
            <div className="mt-1 text-[16px] font-extrabold text-ink-2">
              {usd(a.pepmLow)}–{usd(a.pepmHigh)}
              <span className="ml-1 text-[12px] font-medium text-muted">
                /employee/mo
              </span>
            </div>
            <p className="mt-2 text-[13px] leading-snug text-body-2">{a.blurb}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[12px] text-muted">
        Directional price bands from market rates, not quotes. The call turns
        these into real carrier options.
      </p>
    </div>
  );
}
