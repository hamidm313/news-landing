import { NextResponse } from "next/server";
import {
  assertLocale,
  assertSection,
  getSection,
} from "@/lib/server/dataStore";
import { DEFAULT_LOCALE } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { section: string } },
) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") ?? DEFAULT_LOCALE;
  const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));
  const pageSize = Math.min(
    30,
    Math.max(1, Number(url.searchParams.get("pageSize") ?? "6")),
  );
  const topicParam = url.searchParams.get("topic") ?? undefined;
  // "" and "all" both mean "no topic filter" (matches the PHP backend).
  const topic = topicParam && topicParam !== "all" ? topicParam : undefined;

  try {
    assertLocale(locale);
    assertSection(params.section);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 400 },
    );
  }

  const data = await getSection(locale, params.section);
  const filtered = topic
    ? data.articles.filter((a) => a.topic === topic)
    : data.articles;

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  // Simulate a little network latency so loading states are visible.
  await new Promise((r) => setTimeout(r, 250));

  return NextResponse.json({
    section: params.section,
    locale,
    meta: data.meta,
    items,
    page,
    pageSize,
    total,
    totalPages,
  });
}
