# Plan: live content vs. SEO (static export)

See vsd-landing's own `plan/live-content-and-seo.md` for the full writeup —
same underlying issue, same tradeoffs. This file is the news-landing-specific
half.

## Where this site already stood (checked 2026-09-07)

Unlike vsd-landing, most of news-landing's actual content was **already**
client-fetched at runtime before today: `SectionFeed`, `MostViewed`,
`BreakingTicker`, `ArticleView` are all `"use client"` components built on
TanStack Query (`@/lib/queries` → `@/lib/api`), which already reads from the
real backend once `NEXT_PUBLIC_API_BASE` is set. `SectionFeed`'s
`initialMeta` (server-provided, for the topic chips) is a flash-avoidance
fallback only — `meta = data?.meta ?? initialMeta` — superseded within
moments by the live query result on every page load.

What genuinely needed fixing (and was fixed earlier the same day): `src/lib/
server/dataStore.ts` — the build-time data source for `generateMetadata()`
and `generateStaticParams()` — was hardcoded to mock data regardless of
`NEXT_PUBLIC_API_BASE`, so a static-export build would have shipped generic
demo articles as SEO metadata even in "real backend" mode. Now branches on
`usingRealBackend` like the rest of the app.

## What's still build-time-only (same limitation as vsd-landing)

- SEO `<title>`/`<meta>` tags (`generateMetadata`) — necessarily build-time
  for a static export; this is also *desirable*, not just a limitation
  (crawlers need it in the initial HTML).
- Routing itself (`generateStaticParams`) — a brand-new article needs a
  rebuild before its own URL resolves; editing an *existing* article's text
  needs nothing (already live, see above).

No further action needed here unless the "brand-new article needs a
rebuild" gap itself becomes the priority — that requires the same kind of
routing-structure decision as vsd-landing's `[solutionSlug]`/`[newsSlug]`
(see that plan file's own options list).
