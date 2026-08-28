import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import { SECTIONS, type Locale } from "@/lib/types";

export default function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const base = `/${locale}`;

  return (
    <footer className="mt-8 border-t border-black/10 bg-brand-900 text-white/80">
      <div className="container-page grid gap-8 py-10 md:grid-cols-3">
        <div>
          <h3 className="mb-3 text-sm font-black text-white">{t.footer.about}</h3>
          <p className="text-sm leading-7 text-white/70">{t.footer.aboutText}</p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-black text-white">
            {t.footer.quickLinks}
          </h3>
          <ul className="space-y-2 text-sm">
            {SECTIONS.map((s) => (
              <li key={s}>
                <Link
                  href={`${base}/${s}`}
                  className="text-white/70 transition hover:text-white"
                >
                  {t.nav[s]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-black text-white">
            {t.footer.contact}
          </h3>
          <p className="text-sm text-white/70">{t.footer.address}</p>
          <p className="mt-2 text-sm text-white/70">info@energy-news.example</p>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {t.siteName} — {t.footer.rights}{" "}
        <span className="mx-1">·</span> {t.footer.disclaimer}
      </div>
    </footer>
  );
}
