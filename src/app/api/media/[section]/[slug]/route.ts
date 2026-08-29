import { NextResponse } from "next/server";
import { getArticle } from "@/lib/server/dataStore";
import { SECTIONS, type SectionSlug } from "@/lib/types";

export const runtime = "nodejs";

/**
 * Mock counterpart of the PHP backend's GET /api/media/{section}/{slug}.
 * Renders a deterministic **editorial scene** per article (oil: pump jacks +
 * tanks; energy: pylons + turbine; petrochemical: columns + flare) in the
 * نفت فوری palette, 3 variants by slug. Kept byte-for-byte equivalent to
 * MediaController::svg() so `image` resolves the same in both modes.
 */

const SKY: Record<SectionSlug, [string, string]> = {
  oil: ["#e0536e", "#8c0a20"],
  energy: ["#6f929b", "#22343a"],
  petrochemical: ["#83a7af", "#2e4a54"],
};
const GROUND: Record<SectionSlug, string> = {
  oil: "#4a0713",
  energy: "#1b2a2f",
  petrochemical: "#22343a",
};
const ACCENT = "#c8102e";

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) & 0xffffffff;
  }
  return Math.abs(h);
}
function esc(s: string): string {
  return s.replace(
    /[<>&'"]/g,
    (c) =>
      ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!,
  );
}
const i = Math.trunc;

// --- oil -----------------------------------------------------------------
function jack(x: number, s: number, accent: boolean): string {
  const c = accent ? ACCENT : "#ffffff";
  const o = accent ? "1" : "0.9";
  return (
    `<g transform="translate(${x} 404) scale(${s})" fill="${c}" fill-opacity="${o}">` +
    `<polygon points="-46,0 -8,-84 8,-84 46,0" fill-opacity="0.25"/>` +
    `<rect x="-54" y="-8" width="108" height="10"/>` +
    `<rect x="-70" y="-152" width="150" height="12"/>` +
    `<polygon points="80,-146 104,-140 96,-112 80,-116"/>` +
    `<circle cx="-70" cy="-138" r="17"/>` +
    `<rect x="-3" y="-116" width="6" height="116"/></g>`
  );
}
function tank(x: number, r: number): string {
  const top = -60;
  return (
    `<g transform="translate(${x} 404)" fill="#ffffff" fill-opacity="0.5">` +
    `<path d="M${-r} 0 v${top} a${r} ${r} 0 0 1 ${2 * r} 0 v${-top} z"/>` +
    `<ellipse cx="0" cy="${top}" rx="${r}" ry="${i(r * 0.3)}" fill-opacity="0.7"/></g>`
  );
}
const pipeline =
  `<g transform="translate(0 372)" fill="#ffffff" fill-opacity="0.8">` +
  `<rect x="0" y="0" width="800" height="14"/>` +
  `<rect x="120" y="14" width="12" height="24"/><rect x="470" y="14" width="12" height="24"/><rect x="710" y="14" width="12" height="24"/></g>`;

function oil(v: number): string {
  const g =
    v === 0
      ? [jack(180, 1.15, true), jack(430, 0.9, false), tank(650, 70)]
      : v === 1
        ? [tank(150, 62), tank(255, 48), jack(470, 1.2, false), jack(690, 0.85, true)]
        : [jack(140, 0.95, false), jack(340, 1.25, true), jack(560, 0.9, false), tank(720, 58)];
  return g.join("") + pipeline;
}

// --- energy ------------------------------------------------------------
const wires =
  `<path d="M60 214 Q 250 296 440 214 T 800 214" stroke="#ffffff" stroke-opacity="0.45" stroke-width="3" fill="none"/>` +
  `<path d="M60 250 Q 250 332 440 250 T 800 250" stroke="#ffffff" stroke-opacity="0.45" stroke-width="3" fill="none"/>`;
function pylon(x: number, s: number): string {
  return (
    `<g transform="translate(${x} 404) scale(${s})" stroke="#ffffff" stroke-opacity="0.8" stroke-width="5" fill="none" stroke-linecap="round">` +
    `<path d="M-34 0 L-10 -190 L10 -190 L34 0 M-34 0 L10 -190 M34 0 L-10 -190 M-24 -70 L24 -70 M-18 -130 L18 -130"/>` +
    `<path d="M-58 -150 L58 -150 M-50 -178 L50 -178" stroke-width="6"/></g>`
  );
}
function turbine(x: number, y: number, accent: boolean): string {
  const c = accent ? ACCENT : "#ffffff";
  return (
    `<g transform="translate(${x} ${y})">` +
    `<polygon points="-6,158 6,158 3,0 -3,0" fill="#ffffff" fill-opacity="0.9"/>` +
    `<circle r="9" fill="#ffffff"/>` +
    `<path d="M0 0 L7 -78 L-8 -68 Z M0 0 L74 34 L64 50 Z M0 0 L-74 34 L-64 50 Z" fill="${c}" fill-opacity="0.92"/></g>`
  );
}
function energy(v: number): string {
  const g =
    v === 0
      ? [wires, pylon(120, 1), pylon(440, 1), turbine(660, 244, true)]
      : v === 1
        ? [turbine(180, 244, false), turbine(360, 268, true), pylon(600, 1.05), wires]
        : [wires, pylon(150, 0.9), pylon(400, 1.05), pylon(650, 0.9), turbine(730, 250, true)];
  return g.join("");
}

// --- petrochemical ---------------------------------------------------
function column(x: number, h: number, r: number): string {
  const b1 = -i(h * 0.72);
  const b2 = -i(h * 0.44);
  return (
    `<g transform="translate(${x} 404)">` +
    `<rect x="${-r}" y="${-h}" width="${2 * r}" height="${h}" rx="${r}" fill="#ffffff" fill-opacity="0.9"/>` +
    `<rect x="${-r}" y="${b1}" width="${2 * r}" height="6" fill="#000000" fill-opacity="0.15"/>` +
    `<rect x="${-r}" y="${b2}" width="${2 * r}" height="6" fill="#000000" fill-opacity="0.15"/>` +
    `<rect x="${r - 2}" y="${-i(h * 0.6)}" width="16" height="4" fill="#ffffff" fill-opacity="0.7"/></g>`
  );
}
function sphere(x: number, r: number): string {
  const y = 404 - r - 14;
  const leg = r + 6;
  return (
    `<g transform="translate(${x} ${y})">` +
    `<circle r="${r}" fill="#ffffff" fill-opacity="0.5"/>` +
    `<path d="M${-r} 0 h${2 * r}" stroke="#000000" stroke-opacity="0.12" stroke-width="3"/>` +
    `<path d="M${-i(r * 0.7)} ${i(r * 0.7)} l-6 ${leg} M${i(r * 0.7)} ${i(r * 0.7)} l6 ${leg} M0 ${r} v${leg}" stroke="#ffffff" stroke-opacity="0.7" stroke-width="4"/></g>`
  );
}
function flare(x: number): string {
  return (
    `<g transform="translate(${x} 404)">` +
    `<rect x="-4" y="-210" width="8" height="210" fill="#ffffff" fill-opacity="0.85"/>` +
    `<path d="M0 -210 q-28 -16 -12 -52 q20 18 12 4 q10 -28 24 -38 q-6 32 10 44 q12 18 -6 42 q-14 12 -28 4 z" fill="${ACCENT}"/></g>`
  );
}
function petro(v: number): string {
  const g =
    v === 0
      ? [column(170, 300, 26), column(252, 210, 18), sphere(430, 54), flare(650)]
      : v === 1
        ? [sphere(150, 50), sphere(268, 42), column(470, 320, 30), column(560, 200, 17), flare(712)]
        : [flare(150), column(320, 280, 24), column(402, 340, 30), sphere(600, 56), sphere(712, 40)];
  return g.join("");
}

function scene(section: SectionSlug, v: number): string {
  return section === "oil" ? oil(v) : section === "energy" ? energy(v) : petro(v);
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
  if (found) label = found.article.title.slice(0, 52);

  const [skyA, skyB] = SKY[section];
  const ground = GROUND[section];
  const v = hash(slug) % 3;
  const id = `g${hash(slug).toString(36)}`;
  const caption = label
    ? `<rect x="0" y="416" width="800" height="84" fill="#000000" fill-opacity="0.35"/>` +
      `<text x="40" y="470" fill="#ffffff" font-size="30" font-weight="700" font-family="Vazirmatn, Tahoma, Arial, sans-serif">${esc(label)}</text>`
    : "";

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500" role="img">` +
    `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0%" stop-color="${skyA}"/><stop offset="100%" stop-color="${skyB}"/></linearGradient></defs>` +
    `<rect width="800" height="500" fill="url(#${id})"/>` +
    `<circle cx="648" cy="104" r="46" fill="#ffffff" fill-opacity="0.12"/>` +
    `<path d="M0 372 Q 220 350 420 366 T 800 358 V500 H0 Z" fill="${ground}" fill-opacity="0.5"/>` +
    `<rect x="0" y="404" width="800" height="96" fill="${ground}"/>` +
    scene(section, v) +
    caption +
    `</svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
