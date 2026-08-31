import { carrierLogos } from "./carrierLogos";

// One-line proof closing the employer half of the Benefits pillar: the claim as
// a sentence with the four carrier wordmarks standing in for their names.
//
// It's a flex row rather than inline <img>s in a <p> because the UnitedHealthcare
// mark is a two-line lockup — in normal text flow it would drag the baseline
// around; centred flex items just make the row a little taller.
export function CarrierRow() {
  return (
    <div className="mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 text-center text-[15px] leading-[1.5] text-[#7c7c77] sm:mt-22 sm:gap-x-8">
      <span>Access plans from</span>

      {carrierLogos.map((logo) => (
        <span
          key={logo.label}
          role="img"
          aria-label={logo.label}
          style={{ height: logo.h }}
          className="block text-[#8f8e87] [&>svg]:h-full [&>svg]:w-auto"
          dangerouslySetInnerHTML={{ __html: logo.svg }}
        />
      ))}

      <span>
        and<span className="ml-2 font-semibold text-[#15140f]">200+ carriers</span>.
      </span>
    </div>
  );
}
