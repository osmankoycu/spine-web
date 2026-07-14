import { createClient } from "next-sanity";

// Read-only client for the Spine blog. Public project coordinates only — no
// token, so this is safe to import anywhere. Draft/preview would add a token,
// but the public blog reads published content over the CDN.
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-15",
  useCdn: true, // fast edge reads; freshness comes from tag-based revalidation
});

// Cache Components is off (see next.config.ts), so we use the classic fetch
// cache: time-based `revalidate` as a floor plus `tags` for instant, webhook-
// driven invalidation when a post is published (see app/api/revalidate).
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = [],
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate: 3600, tags },
  });
}
