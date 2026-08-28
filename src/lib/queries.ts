import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  fetchArticle,
  fetchArticles,
  fetchBreaking,
  fetchFeatured,
  fetchMostViewed,
  type ListParams,
} from "./api";
import type { Locale, SectionSlug } from "./types";

/** Centralised query keys so every consumer stays in sync. */
export const queryKeys = {
  breaking: (locale: Locale) => ["breaking", locale] as const,
  featured: (locale: Locale) => ["featured", locale] as const,
  mostViewed: (locale: Locale, section?: SectionSlug) =>
    ["most-viewed", locale, section ?? "all"] as const,
  articleList: (params: ListParams) =>
    [
      "articles",
      params.section,
      params.locale,
      params.topic ?? "all",
      params.page ?? 1,
      params.pageSize ?? 6,
    ] as const,
  article: (locale: Locale, section: SectionSlug, slug: string) =>
    ["article", locale, section, slug] as const,
};

export function useBreaking(locale: Locale) {
  return useQuery({
    queryKey: queryKeys.breaking(locale),
    queryFn: () => fetchBreaking(locale),
    staleTime: 30_000,
  });
}

export function useFeatured(locale: Locale) {
  return useQuery({
    queryKey: queryKeys.featured(locale),
    queryFn: () => fetchFeatured(locale),
    staleTime: 60_000,
  });
}

export function useMostViewed(locale: Locale, section?: SectionSlug) {
  return useQuery({
    queryKey: queryKeys.mostViewed(locale, section),
    queryFn: () => fetchMostViewed(locale, section),
    staleTime: 60_000,
  });
}

export function useArticleList(params: ListParams) {
  return useQuery({
    queryKey: queryKeys.articleList(params),
    queryFn: () => fetchArticles(params),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });
}

export function useArticle(
  locale: Locale,
  section: SectionSlug,
  slug: string,
) {
  return useQuery({
    queryKey: queryKeys.article(locale, section, slug),
    queryFn: () => fetchArticle(locale, section, slug),
    staleTime: 5 * 60_000,
  });
}
