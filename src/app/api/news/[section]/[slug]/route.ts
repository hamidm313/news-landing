import { NextResponse } from "next/server";
import {
  assertLocale,
  assertSection,
  getArticle,
} from "@/lib/server/dataStore";
import { DEFAULT_LOCALE } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { section: string; slug: string } },
) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") ?? DEFAULT_LOCALE;

  try {
    assertLocale(locale);
    assertSection(params.section);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 400 },
    );
  }

  const result = await getArticle(locale, params.section, params.slug);
  if (!result) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  await new Promise((r) => setTimeout(r, 200));

  return NextResponse.json({
    locale,
    article: result.article,
    related: result.related,
  });
}
