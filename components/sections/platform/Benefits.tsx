import { EmployeeBenefits } from "./EmployeeBenefits";
import { EmployerBenefits } from "./EmployerBenefits";
import { CarrierRow } from "./CarrierRow";

// Platform pillar "01 · Benefits". Two halves in the same section: "For
// employers" (app window + employer copy) and, below a full-bleed separator,
// "For employees" (the Heal app + agent rail). Returns ONE padded block — the
// parent supplies the white card wrapper (its overflow-hidden clips the
// full-bleed separator cleanly to the card edges).

export function Benefits() {
  return (
    <div className="px-3 pt-7 sm:px-10 sm:pt-14 lg:px-12 lg:pt-14">
      <EmployerBenefits />

      {/* Carrier proof, closing the employer half — it answers "every carrier,
          every renewal" from the copy card with the actual names. */}
      <CarrierRow />

      {/* Full-bleed floor line dividing the employer half from the employee
          half (the negative margins cancel the block padding so it spans the
          full card width). Tighter above than below on purpose: the carrier row
          is a footnote to the employer half, so it sits close to the line that
          closes it, while the employee block below keeps its full run-up. */}
      <div className="-mx-3 mt-9 border-t border-[#e9e9e6] sm:-mx-10 sm:mt-14 lg:-mx-12 lg:mt-16" />

      {/* No bottom padding — the agent avatars rest flush on the card's bottom
          edge (they sit at the foot of their mask). */}
      <div className="pt-14 sm:pt-24 lg:pt-28">
        <EmployeeBenefits />
      </div>
    </div>
  );
}
