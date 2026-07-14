import type { MetadataRoute } from "next";
import { client } from "@/lib/sanity/client";
import { SLUGS_QUERY } from "@/lib/sanity/queries";
import { compareSlugs } from "@/lib/interior/compare";

const SITE = "https://joinspine.ai";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await client.fetch<{ slug: string }[]>(SLUGS_QUERY);

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/blog",
    ...compareSlugs.map((s) => `/compare/${s}`),
  ].map((path) => ({
    url: `${SITE}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map(({ slug }) => ({
    url: `${SITE}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
