import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import type {
  Article,
  BreakingItem,
  Locale,
  SectionData,
  SectionSlug,
} from "@/lib/types";
import { LOCALES, SECTIONS } from "@/lib/types";

/**
 * Reads the JSON mock data that lives in /data/<locale>/<section>.json.
 * This is the single seam where a real backend would plug in later.
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

export async function getSection(
  locale: Locale,
  section: SectionSlug,
): Promise<SectionData> {
  const data = await readJson<SectionData>(`${locale}/${section}.json`);
  data.articles = [...data.articles].sort(sortByDateDesc);
  return data;
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
  const all = await getAllArticles(locale);
  const featured = all.filter((a) => a.featured);
  const pool = featured.length >= limit ? featured : all;
  return pool.slice(0, limit);
}

export async function getBreaking(locale: Locale): Promise<BreakingItem[]> {
  return readJson<{ items: BreakingItem[] }>(`${locale}/breaking.json`).then(
    (r) => r.items,
  );
}

export async function getMostViewed(
  locale: Locale,
  section: SectionSlug | undefined,
  limit: number,
): Promise<Article[]> {
  const pool = section
    ? (await getSection(locale, section)).articles
    : await getAllArticles(locale);
  return [...pool].sort((a, b) => b.views - a.views).slice(0, limit);
}
