"use client";

import { useFeatured } from "@/lib/queries";
import { getDictionary } from "@/lib/i18n";
import NewsCard from "./NewsCard";
import { CardSkeleton, CompactRowSkeleton, QueryError } from "./Skeletons";
import type { Locale } from "@/lib/types";

export default function HomeHero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const { data, isLoading, isError, refetch } = useFeatured(locale);

  const [hero, ...side] = data ?? [];

  if (isLoading) {
    return (
      <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <CardSkeleton />
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <CompactRowSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !hero) {
    return (
      <QueryError
        message={t.common.error}
        retryLabel={t.common.retry}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
      <NewsCard article={hero} locale={locale} variant="hero" />
      <div className="card divide-y divide-black/5 p-4">
        {side.slice(0, 4).map((a) => (
          <div key={a.id} className="py-3 first:pt-0 last:pb-0">
            <NewsCard article={a} locale={locale} variant="compact" />
          </div>
        ))}
      </div>
    </div>
  );
}
