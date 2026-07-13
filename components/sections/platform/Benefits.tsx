import { EmployeeBenefits } from "./EmployeeBenefits";

// Platform pillar "01 · Benefits". Split into two halves in the same section:
// "For employees" (the Heal app + agent rail) and, below a full-bleed separator,
// "For employers" (added in a later phase). Returns ONE padded block — the
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

      {/* TODO(phase 3): "For employers" half goes here, below the separator */}
      <div className="pb-12 sm:pb-14" />
    </div>
  );
}
