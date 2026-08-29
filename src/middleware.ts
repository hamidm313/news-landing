import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["fa", "en", "ar", "tr"];
const DEFAULT_LOCALE = "fa";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  // Redirect bare "/" (and any locale-less path) to the default locale.
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, the mock API and static assets.
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|icon.svg|apple-icon.png|robots.txt|sitemap.xml).*)",
  ],
};
