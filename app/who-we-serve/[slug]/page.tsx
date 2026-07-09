import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TemplateB } from "@/components/interior/TemplateB";
import { audiencePages, audienceSlugs } from "@/lib/interior/audiences";

export function generateStaticParams() {
  return audienceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = audiencePages[slug];
  if (!page) return {};
  const title = [page.h1.pre, page.h1.accent].filter(Boolean).join(" ");
  return { title: `${title} · Spine`, description: page.lead };
}

export default async function AudienceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = audiencePages[slug];
  if (!page) notFound();
  return <TemplateB page={page} />;
}
