import type { Locale } from "./types";
import { localizeDigits } from "./format";

/**
 * The whole site is frozen at a fixed "today" inside the year 1404 so the
 * mock data always reads as current. 1404/06/05 ≈ 2025-08-27.
 */
export const DEMO_TODAY = {
  jalali: "۱۴۰۴/۰۶/۰۵",
  gregorian: "2025-08-27",
} as const;

const FA_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const WEEKDAY: Record<Locale, string> = {
  fa: "چهارشنبه",
  en: "Wednesday",
  ar: "الأربعاء",
  tr: "Çarşamba",
};

/** Human date shown in the masthead. */
export function mastheadDate(locale: Locale): string {
  if (locale === "fa") {
    return `${WEEKDAY.fa} ${localizeDigits(5, "fa")} ${FA_MONTHS[5]} ${localizeDigits(
      1404,
      "fa",
    )}`;
  }
  if (locale === "ar") {
    return `${WEEKDAY.ar} ${localizeDigits(5, "ar")} شهريور ١٤٠٤ هـ.ش`;
  }
  const d = new Date(DEMO_TODAY.gregorian);
  const intlLocale = locale === "tr" ? "tr-TR" : "en-GB";
  const gregorian = d.toLocaleDateString(intlLocale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const suffix = locale === "tr" ? "5 Şehrivar 1404" : "5 Shahrivar 1404";
  return `${gregorian} · ${suffix}`;
}
