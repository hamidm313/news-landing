import { Vazirmatn } from "next/font/google";

/**
 * Vazirmatn is the primary UI face. It ships Persian, Arabic and Latin
 * glyphs, so it also covers the English and Turkish locales without a
 * second download. Exposed as the CSS variable `--font-vazir`, wired into
 * Tailwind's `font-sans` in tailwind.config.ts.
 */
export const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-vazir",
  display: "swap",
});
