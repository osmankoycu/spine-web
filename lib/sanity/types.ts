import type { PortableTextBlock } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";

export type AuthorRef = {
  name?: string;
  role?: string;
  bio?: string;
  image?: SanityImageSource;
};

// Card data used by the index grid and the "more posts" rail.
export type PostCardData = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  heroImage?: SanityImageSource;
  category?: string;
  author?: AuthorRef;
};

// Full post for the detail page.
export type PostData = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  heroImage?: SanityImageSource;
  body?: PortableTextBlock[];
  categories?: { title: string; slug: string }[];
  author?: AuthorRef;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImageSource;
    noIndex?: boolean;
  };
};
