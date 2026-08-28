export type Locale = "fa" | "en" | "ar" | "tr";

export const LOCALES: Locale[] = ["fa", "en", "ar", "tr"];
export const DEFAULT_LOCALE: Locale = "fa";

export const RTL_LOCALES: Locale[] = ["fa", "ar"];

/** Section slugs used across routing, data files and the API. */
export type SectionSlug = "energy" | "oil" | "petrochemical";

export const SECTIONS: SectionSlug[] = ["energy", "oil", "petrochemical"];

/** A sub-topic tag inside a section (e.g. gas, refining, electricity). */
export interface Topic {
  slug: string;
  title: string;
}

export interface Article {
  id: string;
  slug: string;
  section: SectionSlug;
  /** Sub-topic slug, matches one of the section's topics. */
  topic: string;
  title: string;
  lead: string;
  body: string[];
  tags: string[];
  author: string;
  source: string;
  /** Persian (Jalali) date string, already localised digits, e.g. ۱۴۰۴/۰۵/۱۲ */
  dateJalali: string;
  /** Gregorian date string, e.g. 2025-08-03 */
  dateGregorian: string;
  /** ISO timestamp, used for sorting. */
  publishedAt: string;
  readingMinutes: number;
  views: number;
  image: string;
  featured: boolean;
  breaking: boolean;
}

export interface SectionMeta {
  slug: SectionSlug;
  title: string;
  description: string;
  accent: string;
  topics: Topic[];
}

export interface SectionData {
  meta: SectionMeta;
  articles: Article[];
}

export interface BreakingItem {
  id: string;
  section: SectionSlug;
  slug: string;
  title: string;
  time: string;
}

/** Shape returned by the mock API list endpoint. */
export interface ArticleListResponse {
  section: SectionSlug;
  locale: Locale;
  meta: SectionMeta;
  items: Article[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ArticleResponse {
  locale: Locale;
  article: Article;
  related: Article[];
}
