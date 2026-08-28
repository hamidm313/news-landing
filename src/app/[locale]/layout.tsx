import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import Providers from "@/components/Providers";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { vazirmatn } from "@/lib/fonts";
import { getDictionary, isLocale, dir } from "@/lib/i18n";
import { LOCALES, type Locale } from "@/lib/types";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const locale = (isLocale(params.locale) ? params.locale : "fa") as Locale;
  const t = getDictionary(locale);
  return {
    title: {
      default: `${t.siteName} — ${t.tagline}`,
      template: `%s | ${t.siteName}`,
    },
    description: t.tagline,
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;

  return (
    <html lang={locale} dir={dir(locale)} className={vazirmatn.variable}>
      <body className="min-h-screen font-sans antialiased">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <SiteHeader locale={locale} />
            <main className="flex-1 py-6">{children}</main>
            <SiteFooter locale={locale} />
          </div>
        </Providers>
      </body>
    </html>
  );
}
