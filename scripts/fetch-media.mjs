/**
 * Fills public/media/<section>/<slug>.jpg with a real, relevant photo for every
 * article kernel in scripts/content.mjs. Every image is **CC0 / public domain**,
 * from Wikimedia Commons. Each slug has a curated list of Commons files (PICKS);
 * a keyword search (restricted to Category:CC-Zero) is the fallback. Both paths
 * re-check the licence from `extmetadata` before saving. Writes:
 *
 *   public/media/<section>/<slug>.jpg   the images
 *   public/media/manifest.json          slug -> { file, title, author, license, source }
 *   public/media/CREDITS.md             human-readable attribution list
 *
 * Re-run any time:  npm run media:fetch   (skips slugs already downloaded;
 * pass --force to refetch everything). Then `npm run data:generate` picks the
 * images up via the manifest.
 *
 * The articles are fictional; these are generic industry photos and do not
 * depict the invented events. Be a good API citizen: this throttles hard and
 * backs off on HTTP 429.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ARTICLES } from "./content.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "public", "media");

const API = "https://commons.wikimedia.org/w/api.php";
const UA =
  "news-landing-demo/1.0 (local dev; CC0 industry stock for a fictional demo site)";
const FORCE = process.argv.includes("--force");
const THUMB_W = 1280;
const MIN_GAP_MS = 1600; // minimum spacing between any two network calls

/** Accept only genuinely free files: CC0 or public domain. */
const OK_LICENSE = /^(cc0|pd|public domain)/i;

/**
 * Curated CC0 / PD Commons files per slug, best first. The articles are
 * fictional, so these are generic sector images (refinery, wind farm, tank
 * farm, …), not depictions of real events.
 */
const PICKS = {
  // ---- energy ----------------------------------------------------------
  "grid-summer-peak-record-1404": ["File:Electric transmission power tower.jpg"],
  "solar-capacity-milestone-1404": [
    "File:Solar Power Plant of Brežice Hydroelectric Power Plant 03.jpg",
  ],
  "gas-winter-storage-plan-1404": [
    "File:Berlin Schoeneberg Gasometer 28.11.2013 11-59-14.JPG",
    "File:Gasometer Stadtwerke Dinslaken Gerhard-Malina-Straße.jpg",
  ],
  "appliance-labelling-rules-1404": [
    "File:HK CWB 銅鑼灣 Causeway Bay 恆隆中心 Hang Lung Centre shop 友和電器 YOHO Electronics July 2026 N13P 51.jpg",
  ],
  "northeast-wind-farm-financing-1404": [
    "File:Rio-Vista-Montezuma-Hills-Wind-Farms-2.jpg",
    "File:Red Lily Wind Farm Moosomin.jpg",
  ],
  "cross-border-power-export-renewed-1404": [
    "File:69kV Power Line Tower.jpg",
    "File:Anchor pylon of high-voltage overhead power line 750 kV.jpg",
  ],
  "smart-meter-rollout-progress-1404": [
    "File:Electricians fixing electricity meter 5.jpg",
  ],
  "grid-battery-storage-pilot-1404": [
    "File:Air-cooled industrial and commercial battery energy storage system.jpg",
  ],
  // ---- oil ------------------------------------------------------------
  "southern-field-redevelopment-contract-1404": ["File:Long Beach Oil Field.jpg"],
  "crude-condensate-exports-q1-1404": [
    "File:Crude oil tanker Eagle San Diego.jpg",
  ],
  "refinery-upgrade-gasoline-output-1404": [
    "File:Petron Bataan Refinery in Limay Bataan.jpg",
    "File:Gulf raffinaderij, Rozenburg, Bestanddeelnr 924-8259.jpg",
  ],
  "brent-range-analysis-late-summer-1404": [
    "File:Delaware City Refinery June 2021.jpg",
  ],
  "enhanced-oil-recovery-pilot-results-1404": [
    "File:Campo Petrolífero de Ayoluengo (Burgos) 07.jpg",
    "File:Campo Petrolífero de Ayoluengo (Burgos) 08.jpg",
  ],
  "floating-storage-terminal-flexibility-1404": [
    "File:Terra Nova FPSO p1 15July2006.jpg",
  ],
  "refining-margins-narrow-report-1404": [
    "File:Preemraff Lysekil oil refinery on a foggy night.jpg",
  ],
  "heavy-crude-discount-widens-1404": ["File:Tank farm in Balti.jpg"],
  // ---- petrochemical ------------------------------------------------
  "methanol-complex-startup-1404": [
    "File:Petrochemical Plant Near Mulhurst Bay Alberta Canada 03A.jpg",
    "File:Jampilen Petrochemical Co. 02.jpg",
  ],
  "polymer-exports-quarterly-record-1404": [
    "File:Pellets di masterbatch carbonato per plastica 2.jpg",
  ],
  "ethane-feedstock-allocation-1404": ["File:Point of Ayr Gas Terminal.jpg"],
  "pdh-plant-construction-progress-1404": [
    "File:Mod chem plant.jpg",
    "File:Bdg BPPT spalarnia 2 5-2015.jpg",
  ],
  "domestic-catalyst-production-share-1404": [
    "File:Chemistry Laboratory, Augustine University, Ilara Epe.jpg",
  ],
  "urea-ammonia-output-debottleneck-1404": [
    "File:Fertilizer NPK 008.JPG",
    "File:Fertilizer NPK 013.JPG",
  ],
  "petrochemical-port-logistics-upgrade-1404": [
    "File:Port of Algeciras 2023 and BF CARODA ship.jpg",
  ],
  "gas-feedstock-price-formula-1404": [
    "File:Gas flare on top of a flare stack at Preemraff Lysekil 5.jpg",
  ],
};

/** Search terms for the fallback path, tried in order. */
const QUERIES = {
  "grid-summer-peak-record-1404": ["electrical substation power lines"],
  "solar-capacity-milestone-1404": ["solar power plant", "photovoltaic power station"],
  "gas-winter-storage-plan-1404": ["gasometer gas holder", "LNG storage tanks"],
  "appliance-labelling-rules-1404": ["home appliances store", "washing machines retail"],
  "northeast-wind-farm-financing-1404": ["wind farm turbines", "onshore wind turbines"],
  "cross-border-power-export-renewed-1404": ["high voltage transmission line towers"],
  "smart-meter-rollout-progress-1404": ["electricity meter", "electric energy meter"],
  "grid-battery-storage-pilot-1404": ["battery energy storage system"],
  "southern-field-redevelopment-contract-1404": ["oil pump jack field", "oil field"],
  "crude-condensate-exports-q1-1404": ["crude oil tanker ship"],
  "refinery-upgrade-gasoline-output-1404": ["oil refinery"],
  "brent-range-analysis-late-summer-1404": ["oil refinery", "oil storage tanks"],
  "enhanced-oil-recovery-pilot-results-1404": ["oil field wells", "pumpjack oil well"],
  "floating-storage-terminal-flexibility-1404": ["FPSO floating storage offshore"],
  "refining-margins-narrow-report-1404": ["oil refinery night", "refinery fog"],
  "heavy-crude-discount-widens-1404": ["oil storage tank farm", "petroleum tanks"],
  "methanol-complex-startup-1404": ["petrochemical plant", "chemical plant"],
  "polymer-exports-quarterly-record-1404": ["plastic pellets granules", "masterbatch pellets"],
  "ethane-feedstock-allocation-1404": ["gas terminal", "gas processing plant"],
  "pdh-plant-construction-progress-1404": ["chemical plant construction", "industrial plant construction"],
  "domestic-catalyst-production-share-1404": ["chemistry laboratory", "chemical laboratory"],
  "urea-ammonia-output-debottleneck-1404": ["fertilizer plant", "fertilizer granules"],
  "petrochemical-port-logistics-upgrade-1404": ["container port terminal", "port cargo cranes"],
  "gas-feedstock-price-formula-1404": ["gas flare stack", "gas processing plant"],
};

const SECTION_FALLBACK = {
  energy: ["power station", "power plant"],
  oil: ["oil industry", "oil and gas facility"],
  petrochemical: ["chemical plant", "petrochemical industry"],
};

const STOPWORDS = new Set(["the", "of", "and", "on", "in", "at", "a", "an"]);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let lastCall = 0;
async function throttled(fn) {
  const wait = Math.max(0, lastCall + MIN_GAP_MS - Date.now());
  if (wait) await sleep(wait);
  lastCall = Date.now();
  return fn();
}

/** GET with UA, 429/503 backoff (honours Retry-After), retry on network error. */
async function httpGet(url) {
  let netErr = 0;
  for (let attempt = 1; attempt <= 6; attempt++) {
    let res;
    try {
      res = await throttled(() => fetch(url, { headers: { "User-Agent": UA } }));
    } catch (err) {
      if (++netErr > 3) throw err;
      console.warn(`   … network error, retry ${netErr}`);
      await sleep(3000 * netErr);
      continue;
    }
    if (res.ok) return res;
    if (res.status === 429 || res.status === 503) {
      const ra = Number(res.headers.get("retry-after"));
      const backoff =
        Number.isFinite(ra) && ra > 0
          ? ra * 1000
          : Math.min(30000, 2000 * 2 ** (attempt - 1));
      console.warn(`   … HTTP ${res.status}, waiting ${(backoff / 1000) | 0}s`);
      await sleep(backoff);
      continue;
    }
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  throw new Error(`gave up after retries: ${url}`);
}

function isFree(ii) {
  const em = ii.extmetadata ?? {};
  const short = String(em.LicenseShortName?.value ?? "").trim();
  const code = String(em.License?.value ?? "").trim();
  return OK_LICENSE.test(code) || OK_LICENSE.test(short);
}

async function imageinfoByTitles(titles) {
  const u = new URL(API);
  u.search = new URLSearchParams({
    action: "query",
    format: "json",
    origin: "*",
    maxlag: "5",
    titles: titles.join("|"),
    prop: "imageinfo",
    iiprop: "url|extmetadata|mime|size|user",
    iiurlwidth: String(THUMB_W),
  }).toString();
  const res = await httpGet(u);
  const json = await res.json();
  const byTitle = new Map();
  for (const p of Object.values(json?.query?.pages ?? {})) {
    if (p.imageinfo?.[0]) byTitle.set(p.title, p.imageinfo[0]);
  }
  return byTitle;
}

async function commonsSearch(term) {
  const u = new URL(API);
  u.search = new URLSearchParams({
    action: "query",
    format: "json",
    origin: "*",
    maxlag: "5",
    generator: "search",
    gsrnamespace: "6",
    gsrsearch: `${term} filetype:bitmap incategory:CC-Zero`,
    gsrlimit: "25",
    gsrsort: "relevance",
    prop: "imageinfo",
    iiprop: "url|extmetadata|mime|size|user",
    iiurlwidth: String(THUMB_W),
  }).toString();
  const res = await httpGet(u);
  const json = await res.json();
  return Object.values(json?.query?.pages ?? {});
}

/** Fallback relevance guard: the file title must share a real word with the
 *  query, so "gas holder" can't match "police station (formerly a gas plant)". */
function titleMatchesQuery(title, term) {
  const hay = title.toLowerCase();
  const words = term
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
  return words.some((w) => hay.includes(w) || hay.includes(w.replace(/s$/, "")));
}

function penalty(cand) {
  const ii = cand.ii;
  const w = ii.thumbwidth ?? ii.width ?? 0;
  const h = ii.thumbheight ?? ii.height ?? 0;
  const rank = cand.index ?? 999;
  const portrait = w >= h ? 0 : 4;
  const small = (ii.width ?? 0) >= 1100 ? 0 : 1.5;
  return rank + portrait + small;
}

async function pickImage(slug, section, used) {
  // 1) curated files
  const picks = (PICKS[slug] ?? []).filter((t) => !used.has(t));
  if (picks.length) {
    const info = await imageinfoByTitles(picks);
    for (const title of picks) {
      const ii = info.get(title);
      if (ii && ii.mime === "image/jpeg" && isFree(ii)) {
        return { term: "curated", title, index: 0, ii };
      }
      if (ii && !isFree(ii)) {
        console.warn(`   ! ${title} is not CC0/PD, skipping`);
      }
    }
  }

  // 2) keyword search fallback
  const terms = [...(QUERIES[slug] ?? []), ...SECTION_FALLBACK[section]];
  for (const term of terms) {
    let pages;
    try {
      pages = await commonsSearch(term);
    } catch (err) {
      console.warn(`   ! ${err.message}`);
      continue;
    }
    const cands = pages
      .map((p) => ({ title: p.title, index: p.index, ii: p.imageinfo?.[0] }))
      .filter((c) => c.ii && c.ii.mime === "image/jpeg")
      .filter((c) => !used.has(c.title))
      .filter((c) => isFree(c.ii))
      .filter((c) => (c.ii.thumbwidth ?? 0) >= 900)
      .filter((c) => titleMatchesQuery(c.title, term))
      .sort((a, b) => penalty(a) - penalty(b));
    if (cands[0]) return { term, ...cands[0] };
  }
  return null;
}

async function download(url, dest) {
  const res = await httpGet(url);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(dest, buf);
  return buf.length;
}

const plainText = (html) =>
  String(html ?? "")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

async function writeManifest(manifest) {
  const sorted = Object.fromEntries(
    Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)),
  );
  await fs.writeFile(
    path.join(OUT, "manifest.json"),
    `${JSON.stringify(sorted, null, 2)}\n`,
    "utf8",
  );

  const lines = [
    "# Media credits",
    "",
    "Article cover photos in `public/media/**`. Every file is **CC0 / public",
    "domain**, sourced from Wikimedia Commons via `scripts/fetch-media.mjs`.",
    "The articles on this site are fictional; these are generic industry photos",
    "and do not depict the invented events.",
    "",
    "| Article | Photo | Author | Licence | Source |",
    "| --- | --- | --- | --- | --- |",
  ];
  for (const [key, m] of Object.entries(sorted)) {
    lines.push(
      `| \`${key}\` | ${m.pageTitle} | ${m.author || "—"} | ${m.license} | ${m.source} |`,
    );
  }
  await fs.writeFile(path.join(OUT, "CREDITS.md"), `${lines.join("\n")}\n`, "utf8");
  return sorted;
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  let manifest = {};
  try {
    manifest = JSON.parse(
      await fs.readFile(path.join(OUT, "manifest.json"), "utf8"),
    );
  } catch {
    /* first run */
  }

  const used = new Set(
    Object.values(manifest).map((m) => m.title).filter(Boolean),
  );
  let done = 0;
  let skipped = 0;

  for (const a of ARTICLES) {
    const key = `${a.section}/${a.slug}`;
    const rel = `${a.section}/${a.slug}.jpg`;
    const dest = path.join(OUT, rel);
    const have = await fs.access(dest).then(() => true).catch(() => false);

    if (have && manifest[key] && !FORCE) {
      skipped++;
      continue;
    }

    process.stdout.write(`• ${key} … `);
    const hit = await pickImage(a.slug, a.section, used);
    if (!hit) {
      console.log("no CC0 match");
      continue;
    }

    await fs.mkdir(path.dirname(dest), { recursive: true });
    const bytes = await download(hit.ii.thumburl, dest);
    used.add(hit.title);

    const em = hit.ii.extmetadata ?? {};
    manifest[key] = {
      file: rel,
      title: hit.title,
      pageTitle:
        plainText(em.ObjectName?.value) || hit.title.replace(/^File:/, ""),
      author: plainText(em.Artist?.value) || hit.ii.user || "Unknown",
      license: plainText(em.LicenseShortName?.value) || "CC0",
      credit: plainText(em.Credit?.value),
      source: `https://commons.wikimedia.org/wiki/${encodeURIComponent(hit.title)}`,
      via: hit.term,
      fetchedAt: new Date().toISOString().slice(0, 10),
    };
    await writeManifest(manifest); // checkpoint after every success
    console.log(
      `${hit.title.replace(/^File:/, "")}  (${(bytes / 1024) | 0} KB${
        hit.term === "curated" ? "" : `, via "${hit.term}"`
      })`,
    );
    done++;
  }

  const sorted = await writeManifest(manifest);
  console.log(
    `\nDownloaded ${done}, skipped ${skipped} (already present), ` +
      `${Object.keys(sorted).length}/${ARTICLES.length} slugs have a photo.`,
  );
  const missing = ARTICLES.filter((a) => !sorted[`${a.section}/${a.slug}`]);
  if (missing.length) {
    console.log(
      "Missing:",
      missing.map((a) => `${a.section}/${a.slug}`).join(", "),
    );
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
