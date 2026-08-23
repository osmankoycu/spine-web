import { client } from "@/lib/sanity/client";
import { POSTS_QUERY } from "@/lib/sanity/queries";
import type { PostCardData } from "@/lib/sanity/types";

const SITE = "https://joinspine.ai";

function escapeXml(s = ""): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await client.fetch<PostCardData[]>(POSTS_QUERY);

  const items = posts
    .map((p) => {
      const url = `${SITE}/blog/${p.slug}`;
      const date = p.publishedAt ? new Date(p.publishedAt).toUTCString() : "";
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      ${date ? `<pubDate>${date}</pubDate>` : ""}
      <description>${escapeXml(p.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Spine Blog</title>
    <link>${SITE}/blog</link>
    <description>Playbooks, cost math, and lessons on benefits, compliance, and people ops.</description>
    <language>en-us</language>
    <atom:link href="${SITE}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
