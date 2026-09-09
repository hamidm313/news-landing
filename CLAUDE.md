# news-landing — instructions

Fars-style news site (Next.js 14 App Router + TypeScript + Tailwind +
TanStack Query), 4 locales (fa/ar RTL, en/tr LTR). Runs fully offline on
mock data (`data/<locale>/*.json`) by default; a one-line switch points it
at the real backend — `cmms-backend/php/` (vendor `news`) — instead. See
`README.md` for the two modes.

## No live checks unless asked (added 2026-09-06 — user directive)

Don't start a dev server, run a build, or open a browser preview to "verify"
a change on your own initiative — the user runs those themselves. This also
covers ad-hoc/throwaway scripts that execute this repo's own code to
sanity-check something — even fully isolated, no dev server/DB touched, that
still counts as a live check. Static review of the diff/code (and a
syntax-only lint, e.g. `tsc --noEmit`) is the default; only run or check
something live when the user explicitly asks for it.


## No dev notes in user-facing content (added 2026-09-07 — user directive)

Internal development notes — backlog/row references, "TODO," "pending
extraction," placeholder-status commentary — must never end up in anything a
real user/visitor/admin sees: seeded content strings, translations, UI copy,
labels, user-facing error messages. That kind of note belongs only in code
comments or `plan/*.md` files. Found live on the vsd site (2026-09-07): a
business-line description read literally "(see Backlog rows #8 and #15)" in
all four locales, seeded straight from a placeholder EN string and
translated verbatim. When content is genuinely incomplete, write a minimal
clean description (or omit it) — never encode *why* it is incomplete inside
the string itself.
