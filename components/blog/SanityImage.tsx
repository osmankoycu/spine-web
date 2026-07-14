import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/lib/sanity/image";

// next/image wrapper that resolves a Sanity image ref to a cropped CDN URL
// (honoring the hotspot set in Studio). Fixed width/height → crisp, no CLS.
export function SanityImage({
  image,
  width,
  height,
  alt,
  className,
  sizes,
  priority,
  fit = "crop",
}: {
  image: SanityImageSource;
  width: number;
  height: number;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  // "crop" fills width×height (hotspot crop). "max" preserves the source aspect
  // and transparency — used for cut-out hero illustrations shown object-contain.
  fit?: "crop" | "max";
}) {
  const builder = urlFor(image).width(width).auto("format");
  const src =
    fit === "crop"
      ? builder.height(height).fit("crop").url()
      : builder.fit("max").url();

  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  );
}
