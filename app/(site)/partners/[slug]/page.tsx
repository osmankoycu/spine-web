import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TemplateC } from "@/components/interior/TemplateC";
import { partnerPages, partnerSlugs } from "@/lib/interior/partners";

export function generateStaticParams() {
  return partnerSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = partnerPages[slug];
  if (!page) return {};
  const title = [page.h1.pre, page.h1.accent].filter(Boolean).join(" ");
  return { title: `${title} · Spine`, description: page.lead };
}

export default async function PartnerDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = partnerPages[slug];
  if (!page) notFound();
  return <TemplateC page={page} />;
}
