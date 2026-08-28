"use client";

import Link from "next/link";
import { useArticle } from "@/lib/queries";
import { getDictionary } from "@/lib/i18n";
import { displayDate, formatNumber } from "@/lib/format";
import Thumbnail from "./Thumbnail";
import NewsCard from "./NewsCard";
import { QueryError } from "./Skeletons";
import type { Locale, SectionSlug } from "@/lib/types";

export default function ArticleView({
  locale,
  section,
  slug,
}: {
  locale: Locale;
  section: SectionSlug;
  slug: string;
}) {
  const t = getDictionary(locale);
  const { data, isLoading, isError, refetch } = useArticle(
    locale,
    section,
    slug,
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="skeleton h-6 w-24" />
        <div className="skeleton h-9 w-full" />
        <div className="skeleton h-9 w-2/3" />
        <div className="skeleton h-72 w-full" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-5/6" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <QueryError
        message={t.common.error}
        retryLabel={t.common.retry}
        onRetry={() => refetch()}
      />
    );
  }

  const { article, related } = data;

  return (
    <article>
      <nav className="mb-3 text-sm text-black/50">
        <Link href={`/${locale}`} className="hover:text-brand-700">
          {t.nav.home}
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/${locale}/${section}`}
          className="hover:text-brand-700"
        >
          {t.nav[section]}
        </Link>
      </nav>

      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="chip">{article.tags[0] ?? article.topic}</span>
        {article.breaking && (
          <span className="rounded bg-red-600 px-2 py-0.5 font-bold text-white">
            {t.common.breaking}
          </span>
        )}
      </div>

      <h1 className="text-2xl font-black leading-9 sm:text-3xl sm:leading-[2.75rem]">
        {article.title}
      </h1>
      <p className="mt-3 text-lg font-medium text-black/70">{article.lead}</p>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-y border-black/10 py-3 text-xs text-black/50">
        <span>
          {t.common.publishedOn}: {displayDate(article, locale)}
        </span>
        <span>
          {t.common.source}: {article.source}
        </span>
        <span>
          {formatNumber(article.views, locale)} {t.common.views}
        </span>
        <span>
          {formatNumber(article.readingMinutes, locale)} {t.common.minRead}
        </span>
      </div>

      <Thumbnail
        seed={article.slug}
        section={article.section}
        src={article.image}
        className="mt-5 h-64 w-full rounded-xl sm:h-96"
        label={article.source}
      />

      <div className="prose-news mt-6 space-y-4 text-[15px] leading-8 text-black/80">
        {article.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {article.tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span key={tag} className="chip">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="section-title mb-4">{t.common.relatedNews}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((a) => (
              <NewsCard
                key={a.id}
                article={a}
                locale={locale}
                variant="standard"
              />
            ))}
          </div>
        </section>
      )}

      <div className="mt-8">
        <Link
          href={`/${locale}/${section}`}
          className="text-sm font-bold text-brand-700 hover:underline"
        >
          ← {t.common.backToSection}
        </Link>
      </div>
    </article>
  );
}
