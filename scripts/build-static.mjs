#!/usr/bin/env node
/**
 * Static-export production build for one vendor (cPanel-deployable, same
 * shape as vsd-landing's own `npm run build` -> `build/`), pointed at that
 * vendor's real PHP backend instead of this app's own mock data.
 *
 *   node scripts/build-static.mjs --env=innosolutionsir
 *
 * Reads env/<vendor>/.env.production for NEXT_PUBLIC_API_BASE (root-env
 * convention, matching cmms-backend/cmms-frontend's own env/<vendor>/ --
 * added here 2026-09-07 for the same "one canonical place to edit a
 * vendor's config" reason).
 *
 * Why this needs its own script instead of a plain `next build`:
 *  1. `output: 'export'` (this repo's next.config.mjs turns it on via
 *     STATIC_EXPORT=1, set below) can't coexist with the mock API route
 *     handlers under src/app/api/** (dynamic, not static-export-eligible --
 *     Next's export build fails on them). They're genuinely unused in real-
 *     backend mode anyway (@/lib/api's `BASE` becomes an absolute URL at the
 *     real backend the moment NEXT_PUBLIC_API_BASE is set -- this app never
 *     calls its own mock routes once that's true), so this script moves
 *     src/app/api/ OUT of the app directory for the duration of the build
 *     (restored after, success or failure -- see the try/finally below)
 *     rather than requiring a permanent code change.
 *  2. Output directory renamed out/ -> build/ to match vsd-landing's own
 *     upload-this-folder convention, so the "copy there" step feels
 *     identical across both landing sites.
 */
import { existsSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? true] : [a, true];
  }),
);
const vendor = args.env || args.client || args.vendor;
if (!vendor) {
  console.error("build-static: --env=<vendor> is required (e.g. innosolutionsir)");
  process.exit(1);
}

const envFile = join(ROOT, "env", vendor, ".env.production");
if (!existsSync(envFile)) {
  console.error(`build-static: ${envFile} not found -- create env/${vendor}/.env.production (copy an existing vendor's, e.g. env/innosolutionsir/).`);
  process.exit(1);
}

function parseEnvFile(path) {
  const out = {};
  for (const rawLine of readFileSync(path, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (key) out[key] = value;
  }
  return out;
}

const vars = parseEnvFile(envFile);
if (!vars.NEXT_PUBLIC_API_BASE) {
  console.error(`build-static: env/${vendor}/.env.production has no NEXT_PUBLIC_API_BASE -- required, that's what points this build at the real backend.`);
  process.exit(1);
}

const apiDir = join(ROOT, "src", "app", "api");
// Must live OUTSIDE src/app/ entirely -- Next's App Router only treats an
// underscore-prefixed folder ("_foo") as private/excluded from routing, NOT
// a dot-prefixed one, so a rename to ".api-parked..." *within* src/app/ is
// still discovered and compiled as a route (confirmed the hard way: Next
// tried to build "/.api-parked-during-static-export/featured" as a page and
// failed on its `export const dynamic = "force-dynamic"`). One level above
// src/ is not scanned by the router at all.
const apiDirParked = join(ROOT, ".api-parked-during-static-export");
const outDir = join(ROOT, "out");
const buildDir = join(ROOT, "build");

// Clear any stale .next/ from a previous failed/different-mode build (e.g.
// the routes Next partially compiled under the old, broken parked-folder
// location) so this run starts from a clean slate.
rmSync(join(ROOT, ".next"), { recursive: true, force: true });

// IMPORTANT: process.exit() inside a try does NOT run a pending finally --
// it terminates the process immediately, bypassing normal stack unwinding
// (a real Node.js gotcha, hit the hard way here: the very first version of
// this script called process.exit() on a build failure from inside the try,
// which skipped the restore-the-parked-folder step below on every failed
// build, silently stranding src/app/api under its parked name for the NEXT
// run to trip over too). So: never exit from inside the try -- just record
// what happened and act on it after the try/finally has fully completed.
let parked = false;
let buildStatus = 1;
try {
  if (existsSync(apiDir)) {
    rmSync(apiDirParked, { recursive: true, force: true });
    renameSync(apiDir, apiDirParked);
    parked = true;
  }

  console.log(`\n  build-static  vendor=${vendor}  NEXT_PUBLIC_API_BASE=${vars.NEXT_PUBLIC_API_BASE}\n`);

  const result = spawnSync("npx", ["next", "build"], {
    cwd: ROOT,
    stdio: "inherit",
    shell: true,
    env: {
      ...process.env,
      STATIC_EXPORT: "1",
      NEXT_PUBLIC_API_BASE: vars.NEXT_PUBLIC_API_BASE,
    },
  });
  buildStatus = result.status ?? 1;
} finally {
  if (parked) {
    rmSync(apiDir, { recursive: true, force: true });
    renameSync(apiDirParked, apiDir);
  }
}

if (buildStatus !== 0) {
  console.error("\nbuild-static: next build failed -- see output above. src/app/api has been restored.");
  process.exit(buildStatus);
}

if (!existsSync(outDir)) {
  console.error(`build-static: next build succeeded but ${outDir} wasn't produced -- is output:'export' actually active (STATIC_EXPORT=1)?`);
  process.exit(1);
}
rmSync(buildDir, { recursive: true, force: true });
renameSync(outDir, buildDir);

// Bare "/" has no page (this app only defines /[locale]/**) -- normally
// src/middleware.ts redirects it to /<default-locale>/, but middleware
// never runs on a static host (no server process at request time), so it's
// dead code for this build. Apache-level redirect instead: DirectoryIndex
// is explicit too, belt-and-braces alongside next.config.mjs's
// trailingSlash (which is what makes fa/index.html exist in the first
// place for this to redirect TO).
writeFileSync(
  join(buildDir, ".htaccess"),
  `DirectoryIndex index.html\n\nRewriteEngine On\nRewriteRule ^$ /fa/ [R=302,L]\n`,
);

console.log(`\n  -> ${buildDir}\n`);
console.log(`  next: upload the CONTENTS of build/ to this vendor's document root.\n`);
