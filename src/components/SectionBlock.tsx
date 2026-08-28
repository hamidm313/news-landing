"use client";

import Link from "next/link";
import { useArticleList } from "@/lib/queries";
import { getDictionary } from "@/lib/i18n";
import NewsCard from "./NewsCard";
import { CardSkeleton, CompactRowSkeleton, QueryError } from "./Skeletons";
import type { Locale, SectionSlug } from "@/lib/types";

/**
 * Home-page block for one section: a lead story plus a short list.
 * Fetched client-side through TanStack Query against the mock API.
 */
export default function SectionBlock({
  locale,
  section,
}: {
  locale: Locale;
  section: SectionSlug;
}) {
  const t = getDictionary(locale);
  const { data, isLoading, isError, refetch } = useArticleList({
    locale,
    section,
    page: 1,
    pageSize: 5,
  });

  const [lead, ...rest] = data?.items ?? [];

  return (
    <section className="card p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="section-title">{t.nav[section]}</h2>
        <Link
          href={`/${locale}/${section}`}
          className="text-xs font-semibold text-brand-700 hover:underline"
        >
          {t.common.latestNews} →
        </Link>
      </div>

      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2">
          <CardSkeleton />
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <CompactRowSkeleton key={i} />
            ))}
          </div>
        </div>
      )}

      {isError && (
        <QueryError
          message={t.common.error}
          retryLabel={t.common.retry}
          onRetry={() => refetch()}
        />
      )}

      {!isLoading && !isError && lead && (
        <div className="grid gap-5 md:grid-cols-2">
          <NewsCard article={lead} locale={locale} variant="standard" />
          <div className="space-y-4">
            {rest.map((a) => (
              <NewsCard
                key={a.id}
                article={a}
                locale={locale}
                variant="compact"
              />
            ))}
          </div>
        </div>
      )}

      {!isLoading && !isError && !lead && (
        <p className="py-6 text-center text-sm text-black/40">
          {t.common.noResults}
        </p>
      )}
    </section>
  );
}
