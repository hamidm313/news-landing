"use client";

import Link from "next/link";
import { useArticleList } from "@/lib/queries";
import { getDictionary } from "@/lib/i18n";
import Thumbnail from "./Thumbnail";
import { CardSkeleton } from "./Skeletons";
import type { Locale, SectionSlug } from "@/lib/types";

export default function PhotoNews({
  locale,
  section,
}: {
  locale: Locale;
  section: SectionSlug;
}) {
  const t = getDictionary(locale);
  const { data, isLoading } = useArticleList({
    locale,
    section,
    page: 1,
    pageSize: 4,
  });

  return (
    <section className="card p-4">
      <h2 className="section-title mb-4">{t.common.photoNews}</h2>
      <div className="grid grid-cols-2 gap-3">
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
        {!isLoading &&
          (data?.items ?? []).map((a) => (
            <Link
              key={a.id}
              href={`/${locale}/${a.section}/${a.slug}`}
              className="group relative overflow-hidden rounded-lg"
            >
              <Thumbnail
                seed={a.slug}
                section={a.section}
                src={a.image}
                className="h-28 w-full"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-[11px] font-bold leading-4 text-white line-clamp-2">
                {a.title}
              </span>
            </Link>
          ))}
      </div>
    </section>
  );
}
