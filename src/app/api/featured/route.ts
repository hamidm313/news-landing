import { NextResponse } from "next/server";
import { assertLocale, getFeatured } from "@/lib/server/dataStore";
import { DEFAULT_LOCALE } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") ?? DEFAULT_LOCALE;
  const limit = Math.min(
    8,
    Math.max(1, Number(url.searchParams.get("limit") ?? "5")),
  );

  try {
    assertLocale(locale);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 400 },
    );
  }

  const items = await getFeatured(locale, limit);
  await new Promise((r) => setTimeout(r, 200));
  return NextResponse.json({ items });
}
