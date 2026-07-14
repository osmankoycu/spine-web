import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import { POSTS_QUERY } from "@/lib/sanity/queries";
import type { PostCardData } from "@/lib/sanity/types";
import { PostCard } from "@/components/blog/PostCard";

export const metadata: Metadata = {
  title: "Blog · Spine",
  description:
    "Playbooks and cost math on benefits, compliance, and people ops — for teams leaving the PEO and modernizing their stack.",
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
};

export default async function BlogIndex() {
  const posts = await sanityFetch<PostCardData[]>(POSTS_QUERY, {}, ["post"]);
  const [featured, ...rest] = posts;

  return (
    <main className="bg-surface-page text-ink">
      {/* ── HERO ── */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1480px] px-9 pb-12 pt-[140px] sm:px-[52px] lg:px-[60px]">
          <span className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-orange-700">
            The Spine Blog
          </span>
          <h1 className="font-display mt-4 max-w-[760px] text-[40px] font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-[52px] lg:text-[58px]">
            Benefits, compliance & people ops — decoded.
          </h1>
          <p className="mt-5 max-w-[560px] text-[18px] leading-[1.55] text-body">
            Playbooks, cost math, and hard-won lessons for teams leaving the PEO and
            building a modern benefits stack.
          </p>
        </div>
      </section>

      {/* ── POSTS ── */}
      <section className="mx-auto max-w-[1240px] px-6 py-14 md:px-10">
        {posts.length === 0 ? (
          <div className="rounded-[24px] border border-hairline bg-white px-8 py-20 text-center">
            <h2 className="font-display text-[24px] font-extrabold text-ink">
              New posts are on the way.
            </h2>
            <p className="mx-auto mt-3 max-w-[420px] text-[16px] leading-[1.55] text-body-2">
              We&apos;re writing the first pieces now. Check back soon.
            </p>
          </div>
        ) : (
          <>
            {featured && (
              <div className="mb-10">
                <PostCard post={featured} featured />
              </div>
            )}
            {rest.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
