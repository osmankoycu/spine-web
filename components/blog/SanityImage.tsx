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
}: {
  image: SanityImageSource;
  width: number;
  height: number;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const src = urlFor(image)
    .width(width)
    .height(height)
    .fit("crop")
    .auto("format")
    .url();

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
