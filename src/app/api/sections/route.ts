import { NextResponse } from "next/server";
import { assertLocale, getSections } from "@/lib/server/dataStore";
import { DEFAULT_LOCALE } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Mock counterpart of the PHP backend's GET /api/sections — the list of section
 * metas (slug, title, description, accent, localised topics) for the current
 * locale. Same shape either way: { items, locale }.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") ?? DEFAULT_LOCALE;

  try {
    assertLocale(locale);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }

  const items = await getSections(locale);
  return NextResponse.json({ items, locale });
}
