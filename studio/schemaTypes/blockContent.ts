import { defineType, defineField, defineArrayMember } from "sanity";
import { ImageIcon, ThListIcon } from "@sanity/icons";

// Portable Text body: prose blocks + inline images + data tables. Tables are a
// first-class block because the blog's cost-comparison content depends on them
// (Portable Text has no native table). Rendered by the frontend PortableText map.
export const blockContent = defineType({
  name: "blockContent",
  title: "Body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "href",
                type: "url",
                title: "URL",
                validation: (rule) =>
                  rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
              }),
              defineField({
                name: "blank",
                type: "boolean",
                title: "Open in new tab",
                initialValue: true,
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      icon: ImageIcon,
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
          validation: (rule) => rule.required(),
        }),
        defineField({ name: "caption", type: "string", title: "Caption" }),
      ],
    }),
    defineArrayMember({
      name: "table",
      title: "Table",
      type: "object",
      icon: ThListIcon,
      fields: [
        defineField({
          name: "hasHeader",
          title: "First row is a header",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "rows",
          title: "Rows",
          type: "array",
          of: [
            defineArrayMember({
              name: "row",
              title: "Row",
              type: "object",
              fields: [
                defineField({
                  name: "cells",
                  title: "Cells",
                  type: "array",
                  of: [defineArrayMember({ type: "string" })],
                }),
              ],
              preview: {
                select: { cells: "cells" },
                prepare({ cells }) {
                  return { title: (cells as string[] | undefined)?.join(" · ") || "Empty row" };
                },
              },
            }),
          ],
        }),
        defineField({ name: "caption", type: "string", title: "Caption" }),
      ],
      preview: {
        select: { rows: "rows", caption: "caption" },
        prepare({ rows, caption }) {
          const n = Array.isArray(rows) ? rows.length : 0;
          return { title: caption || "Table", subtitle: `${n} row${n === 1 ? "" : "s"}` };
        },
      },
    }),
  ],
});
