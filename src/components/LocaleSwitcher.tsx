"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getDictionary, localeNames } from "@/lib/i18n";
import { LOCALES, type Locale } from "@/lib/types";

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;
  const t = getDictionary(locale);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const pathFor = (target: Locale) =>
    pathname.replace(/^\/(fa|en|ar|tr)(?=\/|$)/, `/${target}`);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t.common.language}
        className="flex items-center gap-1.5 rounded-md border border-white/25 px-2.5 py-1 text-xs font-semibold text-white/90 transition hover:bg-white/10"
      >
        <span aria-hidden>🌐</span>
        {localeNames[locale]}
        <span aria-hidden className="text-[10px]">▾</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute end-0 z-30 mt-1 min-w-[9rem] overflow-hidden rounded-lg border border-black/10 bg-white py-1 text-sm text-black shadow-lg"
        >
          {LOCALES.map((l) => (
            <Link
              key={l}
              href={pathFor(l)}
              prefetch={false}
              role="menuitem"
              onClick={() => setOpen(false)}
              className={`block px-3 py-1.5 transition hover:bg-brand-50 ${
                l === locale ? "font-black text-brand-700" : "text-black/70"
              }`}
            >
              {localeNames[l]}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
