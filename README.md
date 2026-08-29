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

   It sets `NEXT_PUBLIC_API_BASE=http://127.0.0.1:8090`. Every fetch — including
   the article cover images at `/api/media/...` — now goes to the PHP backend.
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

## Scripts

| command | does |
|---|---|
| `npm run dev` | dev server on `:3000` (HMR) |
| `npm run build` | production build → `.next/` |
| `npm start` | serve the production build on `:3000` |
| `npm run lint` | ESLint (`next lint`) |
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
scripts/                     content.mjs (source) + generate-data.mjs + jalaali.mjs
```

## Notes

- `.env.local` is git-ignored. `.env.local.example` is the template.
- The mock API and `news-backend` return identical shapes, so switching modes
  needs no code changes.
- Server components read `data/*.json` directly for SSR metadata even in backend
  mode — fine while the seed matches; revisit if the two ever diverge.
