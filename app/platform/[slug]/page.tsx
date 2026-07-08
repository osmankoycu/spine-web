import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TemplateA } from "@/components/interior/TemplateA";
import { platformPages, platformSlugs } from "@/lib/interior/platform";

export function generateStaticParams() {
  return platformSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = platformPages[slug];
  if (!page) return {};
  const title = [page.h1.pre, page.h1.accent].filter(Boolean).join(" ");
  return { title: `${title} · Spine`, description: page.lead };
}

export default async function PlatformDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = platformPages[slug];
  if (!page) notFound();
  return <TemplateA page={page} />;
}
