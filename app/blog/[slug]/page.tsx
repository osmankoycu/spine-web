import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { client, sanityFetch } from "@/lib/sanity/client";
import { POST_QUERY, MORE_POSTS_QUERY, SLUGS_QUERY } from "@/lib/sanity/queries";
import type { PostCardData, PostData } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/image";
import { formatDate, readingTime } from "@/lib/blog/format";
import { PortableBody } from "@/components/blog/PortableBody";
import { PostCard } from "@/components/blog/PostCard";
import { SanityImage } from "@/components/blog/SanityImage";

const SITE_URL = "https://joinspine.ai";

export async function generateStaticParams() {
  const slugs = await client
    .withConfig({ useCdn: false })
    .fetch<{ slug: string }[]>(SLUGS_QUERY);
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<PostData | null>(POST_QUERY, { slug }, [`post:${slug}`]);
  if (!post) return {};

  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt || "";
  const ogSource = post.seo?.ogImage || post.heroImage;
  const ogImage = ogSource
    ? urlFor(ogSource).width(1200).height(630).fit("crop").auto("format").url()
    : undefined;

  return {
    title: `${title} · Spine Blog`,
    description,
    alternates: { canonical: `/blog/${slug}` },
    robots: post.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      title,
      description,
      url: `${SITE_URL}/blog/${slug}`,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await sanityFetch<PostData | null>(POST_QUERY, { slug }, [`post:${slug}`]);
  if (!post) notFound();

  const morePosts = await sanityFetch<PostCardData[]>(MORE_POSTS_QUERY, { slug }, ["post"]);
  const minutes = readingTime(post.body);
  const primaryCategory = post.categories?.[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: post.author?.name
      ? { "@type": "Person", name: post.author.name }
      : { "@type": "Organization", name: "Spine" },
    publisher: { "@type": "Organization", name: "Spine" },
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
    image: post.heroImage
      ? urlFor(post.heroImage).width(1200).height(630).fit("crop").url()
      : undefined,
  };

  return (
    <main className="bg-surface-page text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HEADER ── */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[820px] px-6 pt-[128px] sm:px-8">
          {/* breadcrumb */}
          <nav className="mb-6 flex items-center gap-1.5 text-[13px] text-muted">
            <Link href="/blog" className="text-body-2 hover:text-ink">
              Blog
            </Link>
            <CaretRight size={12} weight="bold" className="opacity-50" />
            <span className="line-clamp-1 font-semibold text-ink">{post.title}</span>
          </nav>

          {primaryCategory && (
            <Link
              href="/blog"
              className="mb-4 inline-flex items-center rounded-pill bg-orange-100 px-3 py-1 text-[11.5px] font-bold uppercase tracking-[0.06em] text-orange-700"
            >
              {primaryCategory.title}
            </Link>
          )}

          <h1 className="font-display text-[34px] font-extrabold leading-[1.06] tracking-[-0.03em] sm:text-[44px] lg:text-[50px]">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-5 text-[19px] leading-[1.55] text-body">{post.excerpt}</p>
          )}

          {/* meta */}
          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-hairline pt-6 text-[14px] text-subline">
            {post.author?.image && (
              <SanityImage
                image={post.author.image}
                width={80}
                height={80}
                alt={post.author.name ?? ""}
                className="size-9 rounded-pill object-cover"
              />
            )}
            {post.author?.name && (
              <span className="font-bold text-ink">{post.author.name}</span>
            )}
            {post.publishedAt && (
              <>
                <span className="opacity-40">·</span>
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </>
            )}
            <span className="opacity-40">·</span>
            <span>{minutes} min read</span>
          </div>
        </div>

        {/* hero image */}
        {post.heroImage && (
          <div className="mx-auto mt-9 w-full max-w-[1080px] px-6 sm:px-8">
            <SanityImage
              image={post.heroImage}
              width={1600}
              height={900}
              alt={post.title}
              priority
              sizes="(min-width: 1080px) 1080px, 100vw"
              className="aspect-[16/9] w-full rounded-[24px] border border-hairline object-cover"
            />
          </div>
        )}
      </section>

      {/* ── BODY ── */}
      <article className="mx-auto max-w-[720px] px-6 py-14 sm:px-8">
        {post.body && <PortableBody value={post.body} />}

        {/* author bio */}
        {post.author?.name && post.author?.bio && (
          <div className="mt-14 flex gap-4 rounded-[20px] border border-hairline bg-white p-6">
            {post.author.image && (
              <SanityImage
                image={post.author.image}
                width={112}
                height={112}
                alt={post.author.name}
                className="size-14 flex-none rounded-pill object-cover"
              />
            )}
            <div>
              <div className="text-[15px] font-extrabold text-ink">{post.author.name}</div>
              {post.author.role && (
                <div className="text-[13px] text-muted">{post.author.role}</div>
              )}
              <p className="mt-2 text-[14.5px] leading-[1.55] text-body-2">{post.author.bio}</p>
            </div>
          </div>
        )}
      </article>

      {/* ── MORE POSTS ── */}
      {morePosts.length > 0 && (
        <section className="mx-auto max-w-[1240px] px-6 pb-16 md:px-10">
          <h2 className="font-display mb-7 text-[24px] font-extrabold tracking-[-0.02em] text-ink">
            More from the blog
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {morePosts.map((p) => (
              <PostCard key={p._id} post={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
