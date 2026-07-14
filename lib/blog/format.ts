import type { PortableTextBlock } from "next-sanity";

// "July 14, 2026". Server-rendered, so locale is stable.
export function formatDate(iso?: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Rough reading time from the Portable Text body (~220 wpm).
export function readingTime(body?: PortableTextBlock[]): number {
  if (!body?.length) return 1;
  const words = body.reduce((sum, block) => {
    if (block._type !== "block" || !Array.isArray(block.children)) return sum;
    const text = block.children
      .map((c) => (typeof (c as { text?: string }).text === "string" ? (c as { text?: string }).text : ""))
      .join(" ");
    return sum + text.split(/\s+/).filter(Boolean).length;
  }, 0);
  return Math.max(1, Math.round(words / 220));
}
