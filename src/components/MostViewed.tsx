"use client";

import Link from "next/link";
import { useMostViewed } from "@/lib/queries";
import { getDictionary } from "@/lib/i18n";
import { formatNumber } from "@/lib/format";
import { CompactRowSkeleton, QueryError } from "./Skeletons";
import type { Locale, SectionSlug } from "@/lib/types";

export default function MostViewed({
  locale,
  section,
}: {
  locale: Locale;
  section?: SectionSlug;
}) {
  const t = getDictionary(locale);
  const { data, isLoading, isError, refetch } = useMostViewed(locale, section);

  return (
    <section className="card p-4">
      <h2 className="section-title mb-4">{t.common.mostViewed}</h2>

      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <CompactRowSkeleton key={i} />
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
        <ol className="space-y-4">
          {(data ?? []).map((a, idx) => (
            <li key={a.id} className="flex gap-3">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-100 text-xs font-black text-brand-700">
                {formatNumber(idx + 1, locale)}
              </span>
              <div className="min-w-0">
                <h3 className="line-clamp-2 text-sm font-bold leading-6">
                  <Link
                    href={`/${locale}/${a.section}/${a.slug}`}
                    className="hover:text-brand-700"
                  >
                    {a.title}
                  </Link>
                </h3>
                <p className="mt-1 text-xs text-black/45">
                  {formatNumber(a.views, locale)} {t.common.views}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
