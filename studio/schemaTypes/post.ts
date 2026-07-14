import { defineType, defineField, defineArrayMember } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

// A blog post. Modeled as data (what it is), not presentation. Sanity's native
// draft/publish state is the "draft" mechanism — no draft boolean needed.
export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      description: "The URL: /blog/<slug>. Generated from the title — keep it stable once published.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) =>
        rule.required().custom((slug) => {
          if (slug?.current && !/^[a-z0-9-]+$/.test(slug.current)) {
            return "Use lowercase letters, numbers and hyphens only";
          }
          return true;
        }),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      group: "content",
      description: "150–200 characters. Used as the card excerpt and the default meta description.",
      validation: (rule) =>
        rule.max(240).warning("Keep it under ~200 characters for best SEO"),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
          description: "Describe the image for screen readers and SEO.",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "author",
      type: "reference",
      group: "content",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "categories",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "reference", to: [{ type: "category" }] })],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      name: "seo",
      title: "SEO overrides",
      type: "object",
      group: "seo",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "metaTitle",
          type: "string",
          description: "Overrides the page/OG title. ~60 characters.",
          validation: (rule) => rule.max(70).warning("Keep under ~60 characters"),
        }),
        defineField({
          name: "metaDescription",
          type: "text",
          rows: 2,
          description: "Overrides the excerpt as the meta description.",
          validation: (rule) => rule.max(200).warning("Keep under ~160 characters"),
        }),
        defineField({
          name: "ogImage",
          title: "Social share image",
          type: "image",
          description: "Falls back to the hero image if empty.",
        }),
        defineField({
          name: "noIndex",
          title: "Hide from search engines",
          type: "boolean",
          initialValue: false,
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", author: "author.name", media: "heroImage", date: "publishedAt" },
    prepare({ title, author, media, date }) {
      const day = date ? new Date(date).toISOString().slice(0, 10) : "unpublished";
      return { title, subtitle: [day, author].filter(Boolean).join(" · "), media };
    },
  },
});
