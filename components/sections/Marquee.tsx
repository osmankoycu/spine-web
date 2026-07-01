import { cn } from "@/lib/cn";

// Seamless horizontal marquee: renders `items` twice (a visible track + an
// aria-hidden duplicate) and slides the pair by -50%, so it loops with no jump.
// Edges fade out via a mask. Pure CSS animation (frozen under reduced motion).
export function Marquee({
  items,
  durationSec = 42,
  gapClass = "gap-x-14",
  className,
}: {
  items: React.ReactNode[];
  durationSec?: number;
  gapClass?: string;
  className?: string;
}) {
  const Group = ({ hidden }: { hidden?: boolean }) => (
    <ul
      aria-hidden={hidden}
      className={cn("flex shrink-0 items-center", gapClass)}
      style={{ paddingRight: "3.5rem" }}
    >
      {items.map((node, i) => (
        <li key={i} className="flex shrink-0 items-center">
          {node}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn("overflow-hidden", className)}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <div
        className="flex w-max"
        style={{ animation: `marquee ${durationSec}s linear infinite` }}
      >
        <Group />
        <Group hidden />
      </div>
    </div>
  );
}
