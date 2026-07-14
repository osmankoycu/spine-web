import { defineQuery } from "next-sanity";

// Card projection for the index grid — no body (keep the list payload small).
export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    heroImage,
    "category": categories[0]->title,
    author->{ name, role, image }
  }
`);

// Full post for the detail page.
export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    heroImage,
    body,
    categories[]->{ title, "slug": slug.current },
    author->{ name, role, bio, image },
    seo
  }
`);

// "More posts" rail on the detail page — exclude the current slug.
export const MORE_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && slug.current != $slug]
    | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    heroImage,
    "category": categories[0]->title,
    author->{ name, role, image }
  }
`);

// All slugs for static generation.
export const SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current }
`);
