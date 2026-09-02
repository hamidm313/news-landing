import { NextResponse } from "next/server";
import { assertLocale, assertSection, getSection } from "@/lib/server/dataStore";
import { DEFAULT_LOCALE } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Mock counterpart of the PHP backend's GET /api/sections/{slug} — one section's
 * meta for the current locale. Same shape either way: { meta, locale }.
 */
export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") ?? DEFAULT_LOCALE;

  try {
    assertLocale(locale);
    assertSection(params.slug);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }

  const data = await getSection(locale, params.slug);
  return NextResponse.json({ meta: data.meta, locale });
}
