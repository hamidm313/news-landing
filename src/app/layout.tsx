/**
 * Pass-through root layout.
 *
 * The real <html>/<body> (with per-locale `lang` and `dir`) lives in
 * src/app/[locale]/layout.tsx. This file only exists because Next.js
 * requires an app/layout.tsx for the top-level not-found.tsx to resolve.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
