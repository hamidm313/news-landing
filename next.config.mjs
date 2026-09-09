/**
 * `output: 'export'` is opt-in via STATIC_EXPORT=1 (see scripts/build-static.mjs)
 * rather than always-on, so plain `npm run dev` / `npm run build` (mock mode,
 * or SSR "backend mode" per README's "Dev against the live backend" section)
 * stay exactly as they were -- the API route handlers under src/app/api/**
 * only need to be absent for a STATIC_EXPORT build (see that script for why,
 * and how it makes them absent).
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  ...(process.env.STATIC_EXPORT === "1"
    ? {
        output: "export",
        // Without this, `/fa` exports as the FILE fa.html, not fa/index.html
        // -- a request for the directory-style URL /fa/ (what every internal
        // link on the site actually produces) then 404s on a static host
        // (Apache looks inside fa/ for an index and finds none). Only
        // switched on for the static-export build so dev/mock/SSR-backend
        // mode's URLs are unaffected. Also affects every OTHER route the
        // same way (/fa/energy, /fa/energy/<slug>, ...), not just the
        // locale roots -- same underlying bug either way.
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
