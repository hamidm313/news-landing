import { NextResponse } from "next/server";
import { assertLocale, getBreaking } from "@/lib/server/dataStore";
import { DEFAULT_LOCALE } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") ?? DEFAULT_LOCALE;

  try {
    assertLocale(locale);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 400 },
    );
  }

  const items = await getBreaking(locale);
  return NextResponse.json({ items });
}
