import type {
  ArticleListResponse,
  ArticleResponse,
  BreakingItem,
  Locale,
  SectionSlug,
} from "./types";

/**
 * Thin client over the news API.
 *
 * Default: the in-app mock route handlers under `/api` (data from `data/*.json`).
 * Set `NEXT_PUBLIC_API_BASE` (e.g. http://127.0.0.1:8090) to point every call at
 * the real backend instead — the `cmms-backend/php` engine (vendor `news`),
 * whose response shapes are identical. The mock routes stay in place as an
 * offline fallback.
 */

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE ?? "").replace(/\/+$/, "");
const BASE = API_BASE ? `${API_BASE}/api` : "/api";

/** True when calls go to the standalone PHP backend rather than the mock. */
export const usingRealBackend = API_BASE !== "";

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { accept: "application/json" } });
  const body = await res.json().catch(() => null);

  // The PHP backend wraps every response in the cmms envelope
  // { result, message, data, token }; the mock routes return the payload raw.
  // Unwrap the envelope so callers see one shape either way.
  const isEnvelope =
    body &&
    typeof body === "object" &&
    "result" in body &&
    "data" in body &&
    "token" in body;
  const payload = isEnvelope ? (body as { data: unknown }).data : body;

  if (!res.ok || (isEnvelope && (body as { result: boolean }).result === false)) {
    const msg =
      (isEnvelope && (body as { message?: string }).message) ||
      (typeof body === "string" ? body : "");
    throw new Error(
      `Request failed (${res.status}) for ${url}${msg ? `: ${msg}` : ""}`,
    );
  }
  return payload as T;
}

export interface ListParams {
  locale: Locale;
  section: SectionSlug;
  page?: number;
  pageSize?: number;
  topic?: string;
}

export function fetchArticles({
  locale,
  section,
  page = 1,
  pageSize = 6,
  topic,
}: ListParams): Promise<ArticleListResponse> {
  const qs = new URLSearchParams({
    locale,
    page: String(page),
    pageSize: String(pageSize),
  });
  if (topic && topic !== "all") qs.set("topic", topic);
  return getJson<ArticleListResponse>(
    `${BASE}/news/${section}?${qs.toString()}`,
  );
}

export function fetchArticle(
  locale: Locale,
  section: SectionSlug,
  slug: string,
): Promise<ArticleResponse> {
  const qs = new URLSearchParams({ locale });
  return getJson<ArticleResponse>(
    `${BASE}/news/${section}/${slug}?${qs.toString()}`,
  );
}

export function fetchFeatured(
  locale: Locale,
  limit = 5,
): Promise<ArticleListResponse["items"]> {
  const qs = new URLSearchParams({ locale, limit: String(limit) });
  return getJson<{ items: ArticleListResponse["items"] }>(
    `${BASE}/featured?${qs.toString()}`,
  ).then((r) => r.items);
}

export function fetchBreaking(locale: Locale): Promise<BreakingItem[]> {
  const qs = new URLSearchParams({ locale });
  return getJson<{ items: BreakingItem[] }>(
    `${BASE}/breaking?${qs.toString()}`,
  ).then((r) => r.items);
}

export function fetchMostViewed(
  locale: Locale,
  section?: SectionSlug,
  limit = 6,
): Promise<ArticleListResponse["items"]> {
  const qs = new URLSearchParams({ locale, limit: String(limit) });
  if (section) qs.set("section", section);
  return getJson<{ items: ArticleListResponse["items"] }>(
    `${BASE}/most-viewed?${qs.toString()}`,
  ).then((r) => r.items);
}
