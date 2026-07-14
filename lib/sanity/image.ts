import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";

const builder = imageUrlBuilder(client);

// Build a Sanity CDN URL for an image ref, honoring hotspot/crop set in Studio.
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
