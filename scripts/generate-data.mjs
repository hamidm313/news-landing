/**
 * Turns scripts/content.mjs into the JSON files the mock backend reads:
 *
 *   data/<locale>/energy.json
 *   data/<locale>/oil.json
 *   data/<locale>/petrochemical.json
 *   data/<locale>/breaking.json
 *
 * Run:  npm run data:generate
 *
 * All content is fictional. Dates live in the Iranian year 1404.
 */

import { promises as fs } from "node:fs";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  LOCALES,
  SECTION_META,
  ARTICLES,
  EXTRA_BREAKING,
} from "./content.mjs";
import { isoFromJalali, jalaliDisplay, toFa } from "./jalaali.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DATA_ROOT = path.join(ROOT, "data");

/**
 * Real CC0 cover photos, downloaded by scripts/fetch-media.mjs into
 * public/media/**. When a slug has one, `image` points at the static file;
 * otherwise it falls back to the generated-SVG route /api/media/<section>/<slug>
 * (served by the mock API and the PHP backend alike).
 */
const MEDIA_MANIFEST = path.join(ROOT, "public", "media", "manifest.json");
const mediaBySlug = new Map();
if (existsSync(MEDIA_MANIFEST)) {
  const m = JSON.parse(readFileSync(MEDIA_MANIFEST, "utf8"));
  for (const [key, entry] of Object.entries(m)) {
    // key is "<section>/<slug>"
    mediaBySlug.set(key.split("/").pop(), entry.file);
  }
}

function imageFor(kernel) {
  const file = mediaBySlug.get(kernel.slug);
  return file
    ? `/media/${file}`
    : `/api/media/${kernel.section}/${kernel.slug}`;
}

const AR_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
const toAr = (s) => String(s).replace(/\d/g, (d) => AR_DIGITS[+d]);

/** Localise the digits in a "HH:MM" clock string per locale. */
function clock(hh, mm, locale) {
  const s = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
  if (locale === "fa") return toFa(s);
  if (locale === "ar") return toAr(s);
  return s;
}

/** Jalali date label per locale (only fa/ar localise the digits). */
function jalaliLabel(jy, jm, jd, locale) {
  const raw = `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`;
  if (locale === "fa") return jalaliDisplay(jy, jm, jd);
  if (locale === "ar") return toAr(raw);
  return raw;
}

function buildArticle(kernel, locale, index) {
  const [jy, jm, jd] = kernel.jd;
  const [hh, mm] = kernel.t;
  const { gregorian, iso } = isoFromJalali(jy, jm, jd, hh, mm);

  return {
    id: `${kernel.section}-${String(index + 1).padStart(3, "0")}`,
    slug: kernel.slug,
    section: kernel.section,
    topic: kernel.topic,
    title: kernel.title[locale],
    lead: kernel.lead[locale],
    body: kernel.body[locale],
    tags: kernel.tags[locale],
    author: kernel.author[locale],
    source: kernel.source[locale],
    dateJalali: jalaliLabel(jy, jm, jd, locale),
    dateGregorian: gregorian,
    publishedAt: iso,
    readingMinutes: kernel.readingMinutes,
    views: kernel.views,
    image: imageFor(kernel),
    featured: Boolean(kernel.featured),
    breaking: Boolean(kernel.breaking),
  };
}

function buildSectionMeta(sectionSlug, locale) {
  const m = SECTION_META[sectionSlug];
  return {
    slug: sectionSlug,
    title: m.title[locale],
    description: m.description[locale],
    accent: m.accent,
    topics: Object.entries(m.topics).map(([slug, label]) => ({
      slug,
      title: label[locale],
    })),
  };
}

function buildBreaking(locale) {
  const fromArticles = ARTICLES.filter((a) => a.breaking).map((a) => {
    const [jy, jm, jd] = a.jd;
    const [hh, mm] = a.t;
    return {
      id: `bk-${a.slug}`,
      section: a.section,
      slug: a.slug,
      title: a.title[locale],
      time: clock(hh, mm, locale),
      _iso: isoFromJalali(jy, jm, jd, hh, mm).iso,
    };
  });

  const extra = EXTRA_BREAKING.map((b, i) => {
    const [hh, mm] = b.t;
    return {
      id: `bk-extra-${i + 1}`,
      section: b.section,
      slug: b.slug,
      title: b.title[locale],
      time: clock(hh, mm, locale),
      _iso: `2025-08-27T${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:00+03:30`,
    };
  });

  return [...fromArticles, ...extra]
    .sort((a, b) => new Date(b._iso) - new Date(a._iso))
    .map(({ _iso, ...rest }) => rest);
}

async function writeJson(relPath, value) {
  const full = path.join(DATA_ROOT, relPath);
  await fs.mkdir(path.dirname(full), { recursive: true });
  await fs.writeFile(full, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  return relPath;
}

async function main() {
  const sections = Object.keys(SECTION_META);
  const written = [];

  // stable per-section index so ids line up across locales
  const indexBySection = Object.fromEntries(sections.map((s) => [s, []]));
  ARTICLES.forEach((a) => indexBySection[a.section].push(a));

  for (const locale of LOCALES) {
    for (const section of sections) {
      const kernels = indexBySection[section];
      const payload = {
        meta: buildSectionMeta(section, locale),
        articles: kernels.map((k, i) => buildArticle(k, locale, i)),
      };
      written.push(await writeJson(`${locale}/${section}.json`, payload));
    }
    written.push(
      await writeJson(`${locale}/breaking.json`, { items: buildBreaking(locale) }),
    );
  }

  const totalArticles = ARTICLES.length * LOCALES.length;
  console.log(
    `Generated ${written.length} files (${LOCALES.length} locales × ${sections.length} sections + breaking).`,
  );
  console.log(`Total localised article records: ${totalArticles}`);
  written.forEach((w) => console.log(`  data/${w}`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
