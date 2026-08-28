"use client";

import { useMemo, useState } from "react";
import { useArticleList } from "@/lib/queries";
import { getDictionary } from "@/lib/i18n";
import { formatNumber } from "@/lib/format";
import NewsCard from "./NewsCard";
import { ListRowSkeleton, QueryError } from "./Skeletons";
import type { Locale, SectionMeta, SectionSlug } from "@/lib/types";

const PAGE_SIZE = 4;

/**
 * Section landing feed: topic filter chips + paginated "load more" list,
 * all driven by TanStack Query. `initialMeta` comes from the server render
 * so the chips paint instantly.
 */
export default function SectionFeed({
  locale,
  section,
  initialMeta,
}: {
  locale: Locale;
  section: SectionSlug;
  initialMeta: SectionMeta;
}) {
  const t = getDictionary(locale);
  const [topic, setTopic] = useState<string>("all");
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, isError, refetch, isPlaceholderData } =
    useArticleList({
      locale,
      section,
      topic,
      // "Load more" grows a single window rather than paging: the API slices
      // from the start, so page stays 1 and only the size increases.
      page: 1,
      pageSize: page * PAGE_SIZE,
    });

  const meta = data?.meta ?? initialMeta;
  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const canLoadMore = items.length < total;

  const chips = useMemo(
    () => [{ slug: "all", title: t.common.allTopics }, ...meta.topics],
    [meta.topics, t.common.allTopics],
  );

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {chips.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => {
              setTopic(c.slug);
              setPage(1);
            }}
            className={`chip ${topic === c.slug ? "chip-active" : ""}`}
          >
            {c.title}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="card px-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ListRowSkeleton key={i} />
          ))}
        </div>
      )}

      {isError && (
        <QueryError
          message={t.common.error}
          retryLabel={t.common.retry}
          onRetry={() => refetch()}
        />
      )}

      {!isLoading && !isError && (
        <>
          <div
            className={`card px-4 transition-opacity ${
              isPlaceholderData && isFetching ? "opacity-60" : "opacity-100"
            }`}
          >
            {items.length === 0 ? (
              <p className="py-10 text-center text-sm text-black/40">
                {t.common.noResults}
              </p>
            ) : (
              items.map((a) => (
                <NewsCard
                  key={a.id}
                  article={a}
                  locale={locale}
                  variant="list"
                />
              ))
            )}
          </div>

          {canLoadMore && (
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setPage((p) => p + 1)}
                disabled={isFetching}
                className="rounded-md border border-brand-600 px-6 py-2 text-sm font-bold text-brand-700 transition hover:bg-brand-50 disabled:opacity-50"
              >
                {isFetching ? t.common.loading : t.common.loadMore}
              </button>
            </div>
          )}

          {total > 0 && (
            <p className="mt-3 text-center text-xs text-black/40">
              {formatNumber(items.length, locale)} / {formatNumber(total, locale)}
            </p>
          )}
        </>
      )}
    </div>
  );
}
