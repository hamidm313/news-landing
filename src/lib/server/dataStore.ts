import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import type {
  Article,
  BreakingItem,
  Locale,
  SectionData,
  SectionMeta,
  SectionSlug,
} from "@/lib/types";
import { LOCALES, SECTIONS } from "@/lib/types";
import {
  fetchArticle,
  fetchArticles,
  fetchBreaking,
  fetchFeatured,
  fetchMostViewed,
  usingRealBackend,
} from "@/lib/api";

/**
 * Reads the JSON mock data that lives in /data/<locale>/<section>.json --
 * unless `NEXT_PUBLIC_API_BASE` is set, in which case every function here
 * instead calls the real backend through `@/lib/api` (the same client
 * already used client-side for pagination/most-viewed/etc, see that file's
 * own `usingRealBackend`).
 *
 * Fixed 2026-09-07: this used to be mock-only regardless of
 * `NEXT_PUBLIC_API_BASE` ("the single seam where a real backend would plug
 * in later" — never actually wired up). Since every function here backs
 * server-rendered pages (and a static export has no server left at request
 * time to fall back on), that meant every page was silently shipping
 * generic mock demo articles even in "backend mode" — only client-side
 * interactive bits (pagination, most-viewed, etc, via `@/lib/api` directly)
 * were ever actually hitting the real backend. Caught while wiring up a
 * real static-export production build for the "innosolutionsir" vendor —
 * would have shipped fake نفت‌فوری demo articles as that site's real,
 * permanent content otherwise.
 */

const DATA_ROOT = path.join(process.cwd(), "data");

export function assertLocale(value: string): asserts value is Locale {
  if (!(LOCALES as string[]).includes(value)) {
    throw new Error(`Unknown locale: ${value}`);
  }
}

export function assertSection(value: string): asserts value is SectionSlug {
  if (!(SECTIONS as string[]).includes(value)) {
    throw new Error(`Unknown section: ${value}`);
  }
}

async function readJson<T>(relPath: string): Promise<T> {
  // Guard against path traversal from route params.
  const full = path.join(DATA_ROOT, relPath);
  if (!full.startsWith(DATA_ROOT)) throw new Error("Invalid data path");
  const raw = await fs.readFile(full, "utf8");
  return JSON.parse(raw) as T;
}

const sortByDateDesc = (a: Article, b: Article) =>
  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();

// Real-backend list calls are paginated (see @/lib/api's ListParams); a
// section page needs the WHOLE section, not one page of it, so this asks
// for a page big enough to cover any realistic content volume in one call
// rather than teaching every caller below about pagination.
const FULL_SECTION_PAGE_SIZE = 1000;

export async function getSection(
  locale: Locale,
  section: SectionSlug,
): Promise<SectionData> {
  if (usingRealBackend) {
    const res = await fetchArticles({
      locale,
      section,
      page: 1,
      pageSize: FULL_SECTION_PAGE_SIZE,
    });
    return {
      meta: res.meta,
      articles: [...res.items].sort(sortByDateDesc),
    };
  }
  const data = await readJson<SectionData>(`${locale}/${section}.json`);
  data.articles = [...data.articles].sort(sortByDateDesc);
  return data;
}

export async function getSections(locale: Locale): Promise<SectionMeta[]> {
  const metas = await Promise.all(
    SECTIONS.map((s) => getSection(locale, s).then((d) => d.meta)),
  );
  return metas;
}

export async function getAllArticles(locale: Locale): Promise<Article[]> {
  const all = await Promise.all(
    SECTIONS.map((s) => getSection(locale, s).then((d) => d.articles)),
  );
  return all.flat().sort(sortByDateDesc);
}

export async function getArticle(
  locale: Locale,
  section: SectionSlug,
  slug: string,
): Promise<{ article: Article; related: Article[] } | null> {
  if (usingRealBackend) {
    try {
      const res = await fetchArticle(locale, section, slug);
      return { article: res.article, related: res.related };
    } catch {
      // 404 (or any other failure) from the backend -- same "not found"
      // contract the mock branch below returns for an unknown slug.
      return null;
    }
  }
  const data = await getSection(locale, section);
  const article = data.articles.find((a) => a.slug === slug);
  if (!article) return null;
  const related = data.articles
    .filter(
      (a) =>
        a.slug !== slug &&
        (a.topic === article.topic ||
          a.tags.some((t) => article.tags.includes(t))),
    )
    .slice(0, 4);
  return { article, related };
}

export async function getFeatured(
  locale: Locale,
  limit: number,
): Promise<Article[]> {
  if (usingRealBackend) return fetchFeatured(locale, limit);
  const all = await getAllArticles(locale);
  const featured = all.filter((a) => a.featured);
  const pool = featured.length >= limit ? featured : all;
  return pool.slice(0, limit);
}

export async function getBreaking(locale: Locale): Promise<BreakingItem[]> {
  if (usingRealBackend) return fetchBreaking(locale);
  return readJson<{ items: BreakingItem[] }>(`${locale}/breaking.json`).then(
    (r) => r.items,
  );
}

export async function getMostViewed(
  locale: Locale,
  section: SectionSlug | undefined,
  limit: number,
): Promise<Article[]> {
  if (usingRealBackend) return fetchMostViewed(locale, section, limit);
  const pool = section
    ? (await getSection(locale, section)).articles
    : await getAllArticles(locale);
  return [...pool].sort((a, b) => b.views - a.views).slice(0, limit);
}
