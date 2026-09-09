import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticleView from "@/components/ArticleView";
import MostViewed from "@/components/MostViewed";
import { isLocale } from "@/lib/i18n";
import { getArticle, getSection } from "@/lib/server/dataStore";
import { LOCALES, SECTIONS, type Locale, type SectionSlug } from "@/lib/types";

// Required for `output: 'export'` (static export) -- without this, Next has
// no way to know which article slugs exist and either fails the build or
// silently emits none. Added 2026-09-07 alongside dataStore.ts's real-backend
// wiring, for the same reason: enumerates every real article (or, in mock
// mode, every mock one) at build time, from whichever source getSection()
// itself is currently reading.
export async function generateStaticParams() {
  const params: { locale: string; section: string; slug: string }[] = [];
  for (const locale of LOCALES) {
    for (const section of SECTIONS) {
      const data = await getSection(locale, section);
      for (const article of data.articles) {
        params.push({ locale, section, slug: article.slug });
      }
    }
  }
  return params;
}

function parse(params: {
  locale: string;
  section: string;
  slug: string;
}) {
  if (!isLocale(params.locale)) return null;
  if (!(SECTIONS as string[]).includes(params.section)) return null;
  return {
    locale: params.locale as Locale,
    section: params.section as SectionSlug,
    slug: params.slug,
  };
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; section: string; slug: string };
}): Promise<Metadata> {
  const parsed = parse(params);
  if (!parsed) return {};
  const result = await getArticle(parsed.locale, parsed.section, parsed.slug);
  if (!result) return {};
  return {
    title: result.article.title,
    description: result.article.lead,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: { locale: string; section: string; slug: string };
}) {
  const parsed = parse(params);
  if (!parsed) notFound();
  const { locale, section, slug } = parsed;

  // 404 early if the slug is unknown; ArticleView re-fetches via TanStack Query.
  const exists = await getArticle(locale, section, slug);
  if (!exists) notFound();

  return (
    <div className="container-page grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="card p-5 sm:p-8">
        <ArticleView locale={locale} section={section} slug={slug} />
      </div>
      <aside className="space-y-6">
        <MostViewed locale={locale} section={section} />
      </aside>
    </div>
  );
}
