import { EmployeeBenefits } from "./EmployeeBenefits";
import { EmployerBenefits } from "./EmployerBenefits";

// Platform pillar "01 · Benefits". Two halves in the same section: "For
// employees" (the Heal app + agent rail) and, below a full-bleed separator,
// "For employers" (app window + employer copy). Returns ONE padded block — the
// parent supplies the white card wrapper (its overflow-hidden clips the
// full-bleed separator cleanly to the card edges).

export function Benefits() {
  return (
    <div className="px-6 pt-12 sm:px-10 sm:pt-14 lg:px-12 lg:pt-14">
      <EmployeeBenefits />

      {/* Full-bleed floor line the avatars stand on — divides the employee half
          from the employer half (the negative margins cancel the block padding
          so it spans the full card width). */}
      <div className="-mx-6 border-t border-[#e9e9e6] sm:-mx-10 lg:-mx-12" />

      <div className="pb-12 pt-12 sm:pb-14 sm:pt-14">
        <EmployerBenefits />
      </div>
    </div>
  );
}
