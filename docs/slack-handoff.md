# Slack handoff contract

How the funnel pages (`/audit`, `/scan`) hand their context to the Spine
Slack bot, so its first message can reference the visitor's result ("I
already pulled your top item: …"). This documents the web side, which is
implemented; **the bot side is the integration TODO** (see bottom).

## Flow

1. A report renders (`/scan` exposure report, or `/audit` results panel).
2. The page POSTs its context to `POST /api/handoff` (see payloads below).
   The server rebuilds the summary itself — the scan re-runs its rules from
   whitelisted answers, audit numbers are clamped — so the client cannot
   inject content into what the bot will say.
3. The server returns a signed, stateless token (no storage; this repo has
   no KV). The page appends it to the Slack install link:
   `NEXT_PUBLIC_SLACK_INSTALL_URL` + `&state=<token>`.
4. The visitor installs the app; Slack echoes `state` back to the bot's
   OAuth redirect handler. The bot verifies + decodes the token and opens
   with the personalized first message.

Degradation is layered and safe: no `SLACK_HANDOFF_SECRET` → `/api/handoff`
returns 503 and the CTA links to the plain install URL (install works, no
personalization); no `NEXT_PUBLIC_SLACK_INSTALL_URL` → the CTA falls back to
the talk-to-a-specialist link.

## Token format

`base64url(payload_json) + "." + base64url(HMAC_SHA256(base64url(payload_json), SLACK_HANDOFF_SECRET))`

- Signature is computed over the **encoded** payload string (the part before
  the dot), exactly as produced.
- Expiry: `exp` (unix seconds), 1 hour from minting.
- Reference implementation (sign + verify): `lib/funnel/handoffToken.ts`,
  tests in `lib/funnel/handoffToken.test.ts`.

## Payload shape (decoded)

```jsonc
{
  "v": 1,                 // format version; reject anything else
  "exp": 1787482800,      // unix seconds; reject if now >= exp
  "ref": "yc",            // optional source attribution
  "summary": { ... }      // one of the two shapes below
}
```

Scan summary:

```jsonc
{
  "funnel": "scan",
  "top": { "id": "ca-workers-comp", "title": "No workers' comp in California" },
  // ^ first red finding, else the first finding; null when none
  "counts": { "red": 1, "amber": 2, "green": 2 },
  "teamSize": "5-10",     // optional; one of "1-4" | "5-10" | "11-25" | "26-plus"
  "states": ["CA", "NY"]  // optional; 2-letter codes plus "Other / remote"
}
```

Audit summary:

```jsonc
{
  "funnel": "audit",
  "wellPriced": false,
  "low": 33300,           // annual overpayment range, USD, 0 when wellPriced
  "high": 61900,
  "confidence": "reported" // "reported" | "estimated" | "rough"
}
```

Finding `id`s are the stable rule ids in `lib/scan/scanRules.ts`.

## Bot-side verification (pseudo)

```
(body, sig) = token.rsplit(".", 1)
expected    = hmac_sha256(key=SLACK_HANDOFF_SECRET, msg=body)
valid       = timing_safe_equal(base64url_decode(sig), expected)
payload     = json(base64url_decode(body))
accept iff valid AND payload.v == 1 AND now < payload.exp
```

An invalid/expired/absent state is NOT an error: install proceeds, the bot
just opens with its generic first message.

## Env

| Var | Where | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SLACK_INSTALL_URL` | browser-safe | The Slack app install link the CTAs point at. Unset → specialist link takes the primary slot. |
| `SLACK_HANDOFF_SECRET` | server-only (web) + bot | Shared HMAC key. Unset on web → tokens aren't minted, CTA degrades to plain URL. |

## Integration TODO (bot side)

- [ ] Confirm the install URL and set `NEXT_PUBLIC_SLACK_INSTALL_URL` (Vercel env).
- [ ] Generate `SLACK_HANDOFF_SECRET` (32+ random bytes), set on web + bot.
- [ ] Bot OAuth redirect handler: read `state`, verify per above, compose the
      first message from `summary` (top finding title for scan; the range +
      confidence for audit).
- [ ] Confirmed readable `state` through the install flow end to end
      (user-side answer: readable; bot consumption is the open TODO).
