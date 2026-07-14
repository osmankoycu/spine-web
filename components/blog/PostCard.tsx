import Link from "next/link";
import type { PostCardData } from "@/lib/sanity/types";
import { formatDate } from "@/lib/blog/format";
import { SanityImage } from "./SanityImage";

// A blog post card for the index grid + "more posts" rail. `featured` renders a
// larger, horizontal layout (used for the latest post at the top of the index).
export function PostCard({
  post,
  featured,
}: {
  post: PostCardData;
  featured?: boolean;
}) {
  const href = `/blog/${post.slug}`;

  return (
    <Link
      href={href}
      className={
        featured
          ? "group grid overflow-hidden rounded-[24px] border border-hairline bg-white transition-shadow hover:shadow-[0_40px_80px_-50px_rgba(20,20,18,0.35)] md:grid-cols-2"
          : "group flex flex-col overflow-hidden rounded-[20px] border border-hairline bg-white transition-shadow hover:shadow-[0_30px_60px_-45px_rgba(20,20,18,0.35)]"
      }
    >
      <div
        className={
          featured
            ? "aspect-[25/16] overflow-hidden bg-[#f4f7fe] md:order-last"
            : "aspect-[25/16] overflow-hidden bg-[#f4f7fe]"
        }
      >
        {post.heroImage ? (
          <SanityImage
            image={post.heroImage}
            width={featured ? 900 : 760}
            height={featured ? 576 : 486}
            alt=""
            fit="max"
            sizes={featured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
            priority={featured}
            className="h-full w-full object-cover object-bottom transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="h-full w-full bg-[#f4f7fe]" />
        )}
      </div>

      <div className={featured ? "flex flex-col justify-center p-8 lg:p-10" : "flex flex-1 flex-col p-6"}>
        {post.category && (
          <span className="mb-3 inline-flex w-fit items-center rounded-pill bg-orange-100 px-3 py-1 text-[11.5px] font-bold uppercase tracking-[0.06em] text-orange-700">
            {post.category}
          </span>
        )}
        <h3
          className={
            featured
              ? "font-display text-[26px] font-extrabold leading-[1.12] tracking-[-0.02em] text-ink transition-colors group-hover:text-orange sm:text-[30px]"
              : "font-display text-[19px] font-extrabold leading-[1.18] tracking-[-0.01em] text-ink transition-colors group-hover:text-orange"
          }
        >
          {post.title}
        </h3>
        {post.excerpt && (
          <p
            className={
              featured
                ? "mt-3 line-clamp-3 text-[16px] leading-[1.55] text-body-2"
                : "mt-2 line-clamp-2 text-[14.5px] leading-[1.5] text-body-2"
            }
          >
            {post.excerpt}
          </p>
        )}
        <div className="mt-5 flex items-center gap-2 text-[13px] text-muted">
          {post.author?.name && <span className="font-semibold text-subline">{post.author.name}</span>}
          {post.author?.name && post.publishedAt && <span className="opacity-50">·</span>}
          {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
        </div>
      </div>
    </Link>
  );
}
