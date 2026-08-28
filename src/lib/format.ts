import type { Locale } from "./types";

const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
const AR_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export function toFaDigits(input: string | number): string {
  return String(input).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);
}

/** Localise ASCII digits in a string for the given locale. */
export function localizeDigits(input: string | number, locale: Locale): string {
  const map = locale === "fa" ? FA_DIGITS : locale === "ar" ? AR_DIGITS : null;
  if (!map) return String(input);
  return String(input).replace(/\d/g, (d) => map[Number(d)]);
}

/** Localised number with thousands separators. */
export function formatNumber(value: number, locale: Locale): string {
  const grouped = value.toLocaleString("en-US");
  return localizeDigits(grouped, locale);
}

const INTL_LOCALE: Record<Locale, string> = {
  fa: "fa-IR",
  en: "en-GB",
  ar: "ar",
  tr: "tr-TR",
};

/**
 * Pick the display date for a locale.
 * fa -> the pre-formatted Jalali string; others -> a readable Gregorian string.
 */
export function displayDate(
  article: { dateJalali: string; dateGregorian: string },
  locale: Locale,
): string {
  if (locale === "fa") return article.dateJalali;
  const d = new Date(article.dateGregorian);
  if (Number.isNaN(d.getTime())) return article.dateGregorian;
  return d.toLocaleDateString(INTL_LOCALE[locale], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** "3 hours ago" style relative label. */
export function relativeTime(iso: string, locale: Locale): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffMin = Math.round((now - then) / 60000);
  const rtf = new Intl.RelativeTimeFormat(INTL_LOCALE[locale], {
    numeric: "auto",
  });
  if (Math.abs(diffMin) < 60) return rtf.format(-diffMin, "minute");
  const diffHour = Math.round(diffMin / 60);
  if (Math.abs(diffHour) < 24) return rtf.format(-diffHour, "hour");
  const diffDay = Math.round(diffHour / 24);
  return rtf.format(-diffDay, "day");
}
