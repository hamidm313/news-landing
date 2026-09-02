# news-landing

Fars-style news site for the News project — energy / oil / petrochemical
sections in 4 locales (fa, ar = RTL; en, tr = LTR). Next.js 14 (App Router) +
TypeScript + Tailwind + TanStack Query.

By default it runs **fully offline** on mock data (`data/<locale>/*.json` served
by in-app route handlers under `src/app/api/`). A one-line switch points every
request at `news-backend` instead.

---

## Requirements

- **Node 18+** (Node 20 / npm 10 on this machine).
- For *backend mode* only: `news-backend` running on `http://127.0.0.1:8090`
  (see `../news-backend/README.md`).

## Quick start (dev, mock mode — no backend needed)

```bash
npm install
```

```bash
npm run dev
```

Open <http://localhost:3000> → redirects to `/fa`. Also `/en`, `/ar`, `/tr`.

## Dev against the live backend

1. Start `news-backend` (`cd ../news-backend && ./serve.sh`).
2. Create `.env.local`:

   ```bash
   cp .env.local.example .env.local
   ```

   It sets `NEXT_PUBLIC_API_BASE=http://127.0.0.1:8090`. Every data fetch now
   goes to the PHP backend. Article cover photos are static CC0 files under
   `public/media/**` (served by this app in either mode); the few slugs without
   a photo fall back to the generated-SVG route `/api/media/...` on the backend.
3. `npm run dev` (restart if it was already running).
4. Back to mock mode: delete `.env.local` and restart.

## Build + run (production)

`NEXT_PUBLIC_API_BASE` is inlined **at build time**. If the production site
should use the backend, set it (in `.env.local` or the host's env) to the
deployed API URL *before* building.

```bash
npm run build
```

```bash
npm start
```

Serves the optimized build on <http://localhost:3000>. Or deploy the repo to
Vercel / any Node host (`build` then `start`).

Pre-flight checks:

```bash
npm run lint
```

```bash
npx tsc --noEmit
```

## Mock data

All content is fabricated and dated in the Jalali year 1404 (frozen "today" =
1404/06/05). To change it, edit `scripts/content.mjs`, then regenerate the 16
JSON files:

```bash
npm run data:generate
```

If `news-backend` is seeded from these files, re-run `../news-backend/console.sh
seed` (or `fresh`) afterward so the two stay in sync.

### Cover photos

`public/media/<section>/<slug>.jpg` holds a real **CC0 / public-domain** photo
per article (Wikimedia Commons). `scripts/fetch-media.mjs` downloads them and
writes `public/media/manifest.json` + `CREDITS.md`; `data:generate` reads the
manifest to set each article's `image`. Refresh or extend them with:

```bash
npm run media:fetch      # skips slugs already downloaded; --force refetches
```

```bash
npm run data:generate    # picks up new images from the manifest
```

Slugs with no downloaded photo fall back to the generated-SVG route
`/api/media/<section>/<slug>`.

## Scripts

| command | does |
|---|---|
| `npm run dev` | dev server on `:3000` (HMR) |
| `npm run build` | production build → `.next/` |
| `npm start` | serve the production build on `:3000` |
| `npm run lint` | ESLint (`next lint`) |
| `npm run media:fetch` | download CC0 cover photos → `public/media/**` + manifest |
| `npm run data:generate` | rewrite `data/<locale>/*.json` from `scripts/content.mjs` |

## Layout

```
src/app/[locale]/            home, section, article pages (App Router)
src/app/api/                 mock API — mirrors news-backend response shapes
src/components/              SiteHeader, NewsCard, SectionFeed, Thumbnail, …
src/lib/api.ts               fetch layer + NEXT_PUBLIC_API_BASE switch
src/lib/queries.ts           TanStack Query hooks + keys
src/lib/i18n.ts              dictionaries, dir(), locale list
src/lib/server/dataStore.ts  reads data/*.json for SSR meta / 404 checks
data/<locale>/*.json         generated mock content
public/media/                CC0 cover photos + manifest.json + CREDITS.md
scripts/                     content.mjs (source) + generate-data.mjs + fetch-media.mjs + jalaali.mjs
```

## Notes

- `.env.local` is git-ignored. `.env.local.example` is the template.
- The mock API (`src/app/api/**` + `src/lib/server/dataStore.ts`) and
  `news-backend` (PHP) must return **byte-identical payloads** for every field,
  locale and endpoint — the frontend switches between them with only an env
  change. **Change one → change the other in the same edit.** This mock side is
  the reference (`data/<locale>/*.json` is the canonical localised form). Only
  accepted differences: article `id` (UUID in PHP vs `<section>-NNN` here) and
  `views` (PHP bumps it on article read).
  See `../news-backend/plan/cmms-port-plan.md` §"Stage 9b".
- Server components read `data/*.json` directly for SSR metadata even in backend
  mode — fine while the seed matches; revisit if the two ever diverge.
