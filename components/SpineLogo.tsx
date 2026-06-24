import { cn } from "@/lib/cn";

// Placeholder wordmark. Replace with the stylized "Spine" SVG from Figma later
// (the real logo has a custom lowercase treatment + orange dot on the "i").
export function SpineLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display text-[26px] font-bold leading-none tracking-tight text-orange select-none",
        className,
      )}
    >
      Spine
    </span>
  );
}
