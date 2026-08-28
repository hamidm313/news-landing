import Link from "next/link";
import Thumbnail from "./Thumbnail";
import { getDictionary } from "@/lib/i18n";
import { displayDate, formatNumber } from "@/lib/format";
import type { Article, Locale } from "@/lib/types";

type Variant = "hero" | "standard" | "compact" | "list";

function topicLabel(article: Article): string {
  return article.tags[0] ?? article.topic;
}

export default function NewsCard({
  article,
  locale,
  variant = "standard",
}: {
  article: Article;
  locale: Locale;
  variant?: Variant;
}) {
  const t = getDictionary(locale);
  const href = `/${locale}/${article.section}/${article.slug}`;
  const date = displayDate(article, locale);
  const views = formatNumber(article.views, locale);

  if (variant === "compact") {
    return (
      <article className="flex gap-3">
        <Link href={href} className="shrink-0">
          <Thumbnail
            seed={article.slug}
            section={article.section}
            src={article.image}
            className="h-16 w-24 rounded-lg"
          />
        </Link>
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-sm font-bold leading-6">
            <Link href={href} className="hover:text-brand-700">
              {article.title}
            </Link>
          </h3>
          <p className="mt-1 text-xs text-black/50">{date}</p>
        </div>
      </article>
    );
  }

  if (variant === "list") {
    return (
      <article className="flex flex-col gap-4 border-b border-black/5 py-4 last:border-0 sm:flex-row">
        <Link href={href} className="shrink-0">
          <Thumbnail
            seed={article.slug}
            section={article.section}
            src={article.image}
            className="h-40 w-full rounded-xl sm:h-28 sm:w-44"
          />
        </Link>
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-2 text-xs">
            <span className="chip">{topicLabel(article)}</span>
            {article.breaking && (
              <span className="rounded bg-red-600 px-1.5 py-0.5 font-bold text-white">
                {t.common.breaking}
              </span>
            )}
          </div>
          <h3 className="text-base font-extrabold leading-7">
            <Link href={href} className="hover:text-brand-700">
              {article.title}
            </Link>
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-black/60">
            {article.lead}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-black/45">
            <span>{date}</span>
            <span>
              {views} {t.common.views}
            </span>
            <span>
              {formatNumber(article.readingMinutes, locale)} {t.common.minRead}
            </span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "hero") {
    return (
      <article className="card group relative overflow-hidden">
        <Link href={href}>
          <Thumbnail
            seed={article.slug}
            section={article.section}
            src={article.image}
            className="h-72 w-full sm:h-96"
          />
        </Link>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 text-white">
          <div className="mb-2 flex items-center gap-2 text-xs">
            <span className="rounded bg-brand-600 px-2 py-0.5 font-bold">
              {t.nav[article.section]}
            </span>
            {article.breaking && (
              <span className="rounded bg-red-600 px-2 py-0.5 font-bold">
                {t.common.breaking}
              </span>
            )}
          </div>
          <h2 className="pointer-events-auto text-xl font-black leading-8 sm:text-2xl">
            <Link href={href}>{article.title}</Link>
          </h2>
          <p className="mt-2 line-clamp-2 max-w-2xl text-sm text-white/80">
            {article.lead}
          </p>
          <p className="mt-2 text-xs text-white/60">{date}</p>
        </div>
      </article>
    );
  }

  // standard
  return (
    <article className="card group flex flex-col overflow-hidden">
      <Link href={href}>
        <Thumbnail
          seed={article.slug}
          section={article.section}
          src={article.image}
          className="h-44 w-full"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-2 text-xs">
          <span className="chip">{topicLabel(article)}</span>
        </div>
        <h3 className="text-base font-extrabold leading-7">
          <Link href={href} className="hover:text-brand-700">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-black/60">
          {article.lead}
        </p>
        <div className="mt-3 flex items-center justify-between text-xs text-black/45">
          <span>{date}</span>
          <span>
            {views} {t.common.views}
          </span>
        </div>
      </div>
    </article>
  );
}
