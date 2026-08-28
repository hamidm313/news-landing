import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SectionFeed from "@/components/SectionFeed";
import MostViewed from "@/components/MostViewed";
import PhotoNews from "@/components/PhotoNews";
import BreakingTicker from "@/components/BreakingTicker";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getSection } from "@/lib/server/dataStore";
import { LOCALES, SECTIONS, type Locale, type SectionSlug } from "@/lib/types";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    SECTIONS.map((section) => ({ locale, section })),
  );
}

function parse(params: { locale: string; section: string }) {
  if (!isLocale(params.locale)) return null;
  if (!(SECTIONS as string[]).includes(params.section)) return null;
  return {
    locale: params.locale as Locale,
    section: params.section as SectionSlug,
  };
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; section: string };
}): Promise<Metadata> {
  const parsed = parse(params);
  if (!parsed) return {};
  const data = await getSection(parsed.locale, parsed.section);
  return {
    title: data.meta.title,
    description: data.meta.description,
  };
}

export default async function SectionPage({
  params,
}: {
  params: { locale: string; section: string };
}) {
  const parsed = parse(params);
  if (!parsed) notFound();
  const { locale, section } = parsed;
  const t = getDictionary(locale);
  const data = await getSection(locale, section);

  return (
    <div className="container-page space-y-6">
      <BreakingTicker locale={locale} />

      <header className="card overflow-hidden">
        <div className="bg-brand-800 p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
            {t.common.latestNews}
          </p>
          <h1 className="mt-1 text-2xl font-black sm:text-3xl">
            {data.meta.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/75">
            {data.meta.description}
          </p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <SectionFeed
          locale={locale}
          section={section}
          initialMeta={data.meta}
        />
        <aside className="space-y-6">
          <MostViewed locale={locale} section={section} />
          <PhotoNews locale={locale} section={section} />
        </aside>
      </div>
    </div>
  );
}
