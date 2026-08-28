"use client";

import Link from "next/link";
import { useBreaking } from "@/lib/queries";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export default function BreakingTicker({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const { data, isLoading, isError } = useBreaking(locale);

  const items = data ?? [];

  return (
    <div className="card flex items-stretch overflow-hidden">
      <div className="flex shrink-0 items-center gap-2 bg-red-600 px-4 text-sm font-black text-white">
        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white" />
        {t.common.breaking}
      </div>
      <div className="ticker-viewport relative flex-1 overflow-hidden py-2">
        {isLoading && (
          <span className="px-4 text-sm text-black/40">{t.common.loading}</span>
        )}
        {isError && (
          <span className="px-4 text-sm text-black/40">{t.common.error}</span>
        )}
        {!isLoading && !isError && (
          <div className="ticker-track px-4 text-sm">
            {[...items, ...items].map((item, i) => (
              <Link
                key={`${item.id}-${i}`}
                href={`/${locale}/${item.section}/${item.slug}`}
                className="text-black/75 hover:text-brand-700"
              >
                <span className="text-brand-600">◆</span> {item.title}
                <span className="mx-2 text-black/30">|</span>
                <span className="text-black/40">{item.time}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
