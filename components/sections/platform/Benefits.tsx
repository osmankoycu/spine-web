import { EmployeeBenefits } from "./EmployeeBenefits";
import { EmployerBenefits } from "./EmployerBenefits";

// Platform pillar "01 · Benefits". Two halves in the same section: "For
// employers" (app window + employer copy) and, below a full-bleed separator,
// "For employees" (the Heal app + agent rail). Returns ONE padded block — the
// parent supplies the white card wrapper (its overflow-hidden clips the
// full-bleed separator cleanly to the card edges).

export function Benefits() {
  return (
    <div className="px-6 pt-12 sm:px-10 sm:pt-14 lg:px-12 lg:pt-14">
      <EmployerBenefits />

      {/* Full-bleed floor line dividing the employer half from the employee
          half (the negative margins cancel the block padding so it spans the
          full card width). */}
      <div className="-mx-6 mt-20 border-t border-[#e9e9e6] sm:-mx-10 sm:mt-24 lg:-mx-12 lg:mt-28" />

      {/* No bottom padding — the agent avatars rest flush on the card's bottom
          edge (they sit at the foot of their mask). */}
      <div className="pt-20 sm:pt-24 lg:pt-28">
        <EmployeeBenefits />
      </div>
    </div>
  );
}
