import { NextResponse } from "next/server";
import { getArticle } from "@/lib/server/dataStore";
import { SECTIONS, type SectionSlug } from "@/lib/types";

export const runtime = "nodejs";

/**
 * Mock counterpart of news-backend's GET /api/media/{section}/{slug}.
 * Generates a deterministic SVG cover for an article (gradient from the slug +
 * a section glyph). Keeps parity so `article.image` resolves in both modes.
 */

const PALETTES: Record<SectionSlug, [string, string]> = {
  oil: ["#c8102e", "#6d0a1b"],
  energy: ["#2e4a54", "#1b2a2f"],
  petrochemical: ["#587c85", "#273d45"],
};

const GLYPHS: Record<SectionSlug, string> = {
  energy: "M13 2 4 14h6l-1 8 9-12h-6l1-8Z",
  oil: "M6 21h12M8 21V10l4-6 4 6v11M12 4v6M9 13h6",
  petrochemical: "M9 3v4L4 20h16L15 7V3M9 3h6M8 14h8M11 10h.01M14 12h.01",
};

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) & 0xffffffff;
  }
  return Math.abs(h);
}

function escapeXml(s: string): string {
  return s.replace(/[<>&'"]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!,
  );
}

export async function GET(
  _request: Request,
  { params }: { params: { section: string; slug: string } },
) {
  const section = params.section as SectionSlug;
  if (!(SECTIONS as string[]).includes(section)) {
    return NextResponse.json({ error: "Unknown section" }, { status: 404 });
  }
  const slug = params.slug.replace(/\.svg$/, "");

  let label = "";
  const found = await getArticle("fa", section, slug).catch(() => null);
  if (found) label = found.article.title.slice(0, 48);

  const [from, to] = PALETTES[section];
  const angle = hash(slug) % 360;
  const id = `g${hash(slug).toString(36)}`;
  const labelEl = label
    ? `<text x="40" y="470" fill="rgba(255,255,255,0.92)" font-size="30" font-family="Vazirmatn, Tahoma, Arial, sans-serif" font-weight="700">${escapeXml(label)}</text>`
    : "";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500" role="img">
  <defs>
    <linearGradient id="${id}" gradientTransform="rotate(${angle} 0.5 0.5)">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#${id})"/>
  <g transform="translate(400 250) scale(12)" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round">
    <path d="${GLYPHS[section]}" transform="translate(-12 -12)"/>
  </g>
  ${labelEl}
</svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
