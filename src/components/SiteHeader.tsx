import Link from "next/link";
import LocaleSwitcher from "./LocaleSwitcher";
import Logo from "./Logo";
import { getDictionary } from "@/lib/i18n";
import { mastheadDate } from "@/lib/demo";
import { SECTIONS, type Locale } from "@/lib/types";

export default function SiteHeader({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const base = `/${locale}`;

  const navItems = [
    { href: base, label: t.nav.home },
    ...SECTIONS.map((s) => ({ href: `${base}/${s}`, label: t.nav[s] })),
  ];

  return (
    <header className="border-b-2 border-brand-500 bg-ink-800 text-white">
      <div className="container-page flex items-center justify-between gap-4 py-3">
        <div className="flex items-center gap-3">
          <Link href={base} className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white p-1">
              <Logo className="h-full w-full" title={t.siteName} />
            </span>
            <span className="leading-tight">
              <span className="block text-base font-black tracking-tight">
                {t.siteName}
              </span>
              <span className="block text-[11px] font-medium text-white/70">
                {t.tagline}
              </span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-white/70 sm:inline">
            {mastheadDate(locale)}
          </span>
          <LocaleSwitcher locale={locale} />
        </div>
      </div>

      <nav className="bg-ink-900/60">
        <div className="container-page flex items-center gap-1 overflow-x-auto py-1.5 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-md px-3 py-1.5 font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
