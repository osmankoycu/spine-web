import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TemplateD } from "@/components/interior/TemplateD";
import { comparePages, compareSlugs } from "@/lib/interior/compare";

export function generateStaticParams() {
  return compareSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = comparePages[slug];
  if (!page) return {};
  return {
    title: `Spine vs ${page.competitor} · Compare`,
    description: page.lead,
  };
}

export default async function CompareDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = comparePages[slug];
  if (!page) notFound();
  return <TemplateD page={page} />;
}
