# Spine Studio — the blog admin panel

Sanity Studio for the Spine blog. This is the **admin panel** where posts are
written and published. It's a standalone app (Vite) that lives in the same repo
as the Next.js site but builds and deploys independently to Sanity's hosting.

- **Project:** `Spine` (id `r2fgeqld`), dataset `production`
- **Hosted admin panel:** https://joinspine-blog.sanity.studio (after first deploy)
- **Content model:** `post`, `author`, `category` (+ `blockContent` body)

## First-time setup

```bash
cd studio
npm install
npx sanity login          # once, opens the browser to authenticate
npx sanity schema deploy   # push the schema to the Content Lake (needed for the app + imports)
npx sanity deploy          # host the Studio at joinspine-blog.sanity.studio
```

> If `spine-blog` is taken, change `studioHost` in `sanity.cli.ts` and re-run
> `npx sanity deploy`.

## Day-to-day

```bash
npm run dev      # local Studio at http://localhost:3333
npm run deploy   # redeploy the hosted admin panel
npm run schema   # redeploy the schema after changing schemaTypes/*
```

## Writing a post

1. **Post → Create new.**
2. Fill Title (slug auto-fills), Excerpt (~150–200 chars), Hero image (+ alt),
   Author, Categories, Body.
3. Body supports headings, lists, quotes, links, inline images, and **tables**
   (Insert → Table) for cost-comparison content.
4. Optional **SEO** tab overrides the meta title/description and social image.
5. **Publish.** A Sanity webhook revalidates the live site within seconds
   (see the app's `/api/revalidate` route).

Content is never lost on redesign — the schema stores *what things are*, and the
Next.js site at `joinspine.ai/blog` renders them.
