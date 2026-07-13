import { Clock, SealCheck } from "@phosphor-icons/react/dist/ssr";
import { ChipCloud } from "./ChipCloud";

// "HR community" light card (design handoff Block 2): a white rounded card with
// a 2-column top region (pitch + coverage chip cloud) over a 3-cell stat strip.
// Neutral hex values are from the handoff; oranges use our brand token. The chip
// cloud is a client child so it can animate on scroll-into-view.

export function HrCommunity() {
  return (
    <section className="bg-bg px-4 py-11 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-[1360px]">
        <div className="relative z-10 overflow-hidden rounded-[32px] border border-[#ededea] bg-white shadow-[0_1px_0_rgba(0,0,0,0.02),0_40px_80px_-48px_rgba(20,20,18,0.2)]">
          {/* Top region: pitch + coverage chips */}
          <div className="grid md:grid-cols-[1.25fr_1fr]">
            {/* Left cell */}
            <div className="p-8 sm:p-12 md:p-[52px]">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#b0afa9]">
                The people layer
              </p>
              <h2 className="font-display mt-4 text-[30px] font-extrabold leading-[1.08] tracking-[-0.025em] text-[#15140f] sm:text-[36px] lg:text-[40px]">
                Need more HR support?
                <br className="hidden sm:inline" /> We&apos;ll connect you with the{" "}
                <span className="whitespace-nowrap text-orange">right partner</span>.
              </h2>
              <p className="mt-5 max-w-[460px] text-[16.5px] leading-[1.6] text-[#7c7c77]">
                Need more than benefits, payroll, and compliance? We&apos;ll match
                you with the right fractional HR leader based on your
                company&apos;s needs.
              </p>
            </div>

            {/* Right cell */}
            <div className="bg-[#fafaf9] p-8 sm:p-12 md:border-l md:border-[#ededea] md:p-[52px]">
              <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#b0afa9]">
                Areas they cover
              </p>
              <ChipCloud />
            </div>
          </div>

          {/* Bottom stat strip */}
          <div className="grid divide-y divide-[#ededea] border-t border-[#ededea] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            <div className="flex items-center gap-2.5 px-6 py-7 sm:px-6 lg:px-8">
              <span className="text-[24px] font-extrabold leading-none text-orange">50+</span>
              <span className="whitespace-nowrap text-[15px] text-[#7c7c77]">
                fractional HR leaders
              </span>
            </div>
            <div className="flex items-center gap-2.5 px-6 py-7 sm:px-6 lg:px-8">
              <SealCheck size={19} weight="bold" className="shrink-0 text-orange" />
              <span className="whitespace-nowrap text-[15px] text-[#7c7c77]">
                Matched based on your needs
              </span>
            </div>
            <div className="flex items-center gap-2.5 px-6 py-7 sm:px-6 lg:px-8">
              <Clock size={19} weight="bold" className="shrink-0 text-orange" />
              <span className="whitespace-nowrap text-[15px] text-[#7c7c77]">
                Hourly or ongoing engagements
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
