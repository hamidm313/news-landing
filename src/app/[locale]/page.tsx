import { notFound } from "next/navigation";
import BreakingTicker from "@/components/BreakingTicker";
import SectionBlock from "@/components/SectionBlock";
import MostViewed from "@/components/MostViewed";
import PhotoNews from "@/components/PhotoNews";
import HomeHero from "@/components/HomeHero";
import { getDictionary, isLocale } from "@/lib/i18n";
import { SECTIONS, type Locale } from "@/lib/types";

export default function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = getDictionary(locale);

  return (
    <div className="container-page space-y-6">
      <BreakingTicker locale={locale} />

      <HomeHero locale={locale} />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {SECTIONS.map((section) => (
            <SectionBlock key={section} locale={locale} section={section} />
          ))}
        </div>

        <aside className="space-y-6">
          <MostViewed locale={locale} />
          <PhotoNews locale={locale} section="energy" />
          <div className="card p-4 text-xs leading-6 text-black/50">
            {t.footer.disclaimer}
          </div>
        </aside>
      </div>
    </div>
  );
}
