import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Sanity → Next revalidation. Configure a webhook in the Studio project
// (Manage → API → Webhooks) pointing at POST /api/revalidate with:
//   - Filter:     _type == "post"
//   - Projection: { "_type": _type, "slug": slug.current }
//   - Secret:     SANITY_REVALIDATE_SECRET (same value as .env)
// On publish/unpublish we drop the "post" tag (index + rails) and the
// per-post tag, so the affected pages regenerate within seconds.

type WebhookPayload = { _type?: string; slug?: string };

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true, // small delay so Sanity's CDN is fresh before we revalidate
    );

    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 401 });
    }
    if (body?._type !== "post") {
      return new Response("Ignored", { status: 200 });
    }

    // Next 16 requires a stale-window profile; "max" = serve stale while the
    // affected pages regenerate in the background.
    revalidateTag("post", "max");
    if (body.slug) revalidateTag(`post:${body.slug}`, "max");

    return NextResponse.json({ revalidated: true, slug: body.slug ?? null });
  } catch (err) {
    return new Response((err as Error).message, { status: 500 });
  }
}
