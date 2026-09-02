"use client";

import { useState } from "react";
import type { SectionSlug } from "@/lib/types";

/**
 * Article cover. Renders `src` from the data as an <img> over a deterministic
 * gradient derived from the slug. `src` is normally a static CC0 photo under
 * /media/... (bundled in public/, served by the frontend in either data mode);
 * slugs without a downloaded photo fall back to the generated-SVG route
 * /api/media/... which is resolved against the backend when NEXT_PUBLIC_API_BASE
 * is set. If `src` is missing or fails to load, the gradient alone stands in —
 * no network required, works in any theme.
 */

const PALETTES: Record<SectionSlug, [string, string]> = {
  oil: ["#c8102e", "#6d0a1b"],
  energy: ["#2e4a54", "#1b2a2f"],
  petrochemical: ["#587c85", "#273d45"],
};

const GLYPHS: Record<SectionSlug, string> = {
  energy: "M13 2 4 14h6l-1 8 9-12h-6l1-8Z",
  oil: "M6 21h12M8 21V10l4-6 4 6v11M12 4v6M9 13h6",
  petrochemical:
    "M9 3v4L4 20h16L15 7V3M9 3h6M8 14h8M11 10h.01M14 12h.01",
};

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE ?? "").replace(/\/+$/, "");

function resolveSrc(src?: string): string | undefined {
  if (!src) return undefined;
  if (/^https?:\/\//.test(src)) return src;
  if (src.startsWith("/api/") && API_BASE) return `${API_BASE}${src}`;
  return src;
}

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export default function Thumbnail({
  seed,
  section,
  className = "",
  label,
  src,
}: {
  seed: string;
  section: SectionSlug;
  className?: string;
  label?: string;
  src?: string;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const [from, to] = PALETTES[section];
  const angle = hash(seed) % 360;
  const id = `g-${hash(seed).toString(36)}`;
  const resolved = resolveSrc(src);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      aria-hidden="true"
      role="img"
    >
      <svg
        viewBox="0 0 400 260"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient
            id={id}
            gradientTransform={`rotate(${angle} 0.5 0.5)`}
          >
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        <rect width="400" height="260" fill={`url(#${id})`} />
        <g
          transform="translate(200 130) scale(6)"
          fill="none"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="1.4"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          <path d={GLYPHS[section]} transform="translate(-12 -12)" />
        </g>
        {label ? (
          <text
            x="20"
            y="238"
            fill="rgba(255,255,255,0.9)"
            fontSize="18"
            fontWeight="700"
          >
            {label}
          </text>
        ) : null}
      </svg>

      {resolved && !imgFailed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={resolved}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setImgFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
    </div>
  );
}
