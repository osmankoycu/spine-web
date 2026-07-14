import { PortableText, type PortableTextComponents } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/lib/sanity/image";

// Renders a post body (Portable Text) with Spine's editorial styling. Server
// component — no client JS. Supports headings, lists, quotes, links, inline
// images, and data tables (the custom `table` block from the schema).

type TableValue = {
  rows?: { cells?: string[] }[];
  hasHeader?: boolean;
  caption?: string;
};

function TableBlock({ value }: { value: TableValue }) {
  const rows = value.rows ?? [];
  if (!rows.length) return null;
  const [head, ...rest] = value.hasHeader ? rows : [undefined, ...rows];
  const bodyRows = value.hasHeader ? rest : rows;

  return (
    <figure className="my-8 overflow-x-auto">
      <table className="w-full border-collapse text-left text-[14.5px]">
        {value.hasHeader && head?.cells && (
          <thead>
            <tr className="border-b border-hairline">
              {head.cells.map((c, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-[12.5px] font-extrabold uppercase tracking-[0.04em] text-ink"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {bodyRows.map((row, ri) => (
            <tr key={ri} className="border-b border-hairline-2 last:border-0">
              {(row?.cells ?? []).map((c, ci) => (
                <td
                  key={ci}
                  className={
                    ci === 0
                      ? "px-4 py-3 font-semibold text-ink-2"
                      : "px-4 py-3 text-body-2"
                  }
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {value.caption && (
        <figcaption className="mt-3 text-[13px] text-muted">{value.caption}</figcaption>
      )}
    </figure>
  );
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-5 text-[17px] leading-[1.7] text-ink-2">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-display mb-4 mt-12 text-[28px] font-extrabold leading-[1.15] tracking-[-0.02em] text-ink sm:text-[32px]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display mb-3 mt-9 text-[22px] font-extrabold leading-[1.2] tracking-[-0.01em] text-ink sm:text-[24px]">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 mt-7 text-[18px] font-bold tracking-[-0.01em] text-ink">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-7 border-l-[3px] border-orange pl-5 text-[19px] font-medium italic leading-[1.55] text-ink">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 ml-1 space-y-2.5 text-[17px] leading-[1.65] text-ink-2 [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.7em] [&>li]:before:size-[6px] [&>li]:before:-translate-y-1/2 [&>li]:before:rounded-full [&>li]:before:bg-orange">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 ml-5 list-decimal space-y-2.5 text-[17px] leading-[1.65] text-ink-2 marker:font-bold marker:text-orange">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li className="pl-1.5">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-ink">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded-[6px] bg-surface-band px-1.5 py-0.5 font-mono text-[0.9em] text-ink">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = (value as { href?: string; blank?: boolean })?.href ?? "#";
      const blank = (value as { blank?: boolean })?.blank;
      return (
        <a
          href={href}
          {...(blank ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="font-semibold text-orange underline decoration-orange/30 underline-offset-2 transition-colors hover:decoration-orange"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const v = value as { alt?: string; caption?: string } & SanityImageSource;
      const src = urlFor(v).width(1400).auto("format").url();
      return (
        <figure className="my-8">
          {/* Inline body images vary in aspect; let height flow. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={v.alt ?? ""}
            loading="lazy"
            className="w-full rounded-[16px] border border-hairline"
          />
          {v.caption && (
            <figcaption className="mt-3 text-center text-[13px] text-muted">
              {v.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    table: ({ value }) => <TableBlock value={value as TableValue} />,
  },
};

export function PortableBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
