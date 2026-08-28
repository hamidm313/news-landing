import { NextResponse } from "next/server";
import {
  assertLocale,
  assertSection,
  getMostViewed,
} from "@/lib/server/dataStore";
import { DEFAULT_LOCALE } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") ?? DEFAULT_LOCALE;
  const section = url.searchParams.get("section") ?? undefined;
  const limit = Math.min(
    12,
    Math.max(1, Number(url.searchParams.get("limit") ?? "6")),
  );

  try {
    assertLocale(locale);
    if (section) assertSection(section);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 400 },
    );
  }

  const items = await getMostViewed(
    locale,
    section as Parameters<typeof getMostViewed>[1],
    limit,
  );
  return NextResponse.json({ items });
}
