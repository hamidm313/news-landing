/**
 * "نفت فوری" logo — circular badge: a droplet split slate-teal / crimson,
 * a crimson bolt through it, signal arcs top-left, speed streaks to the right.
 * Recreated as inline SVG (no external asset, crisp at any size, theme-safe).
 */
export default function Logo({
  className = "h-9 w-9",
  title = "نفت فوری",
}: {
  className?: string;
  title?: string;
}) {
  const teal = "#2e4a54";
  const crimson = "#c8102e";

  return (
    <svg
      viewBox="0 0 128 128"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>

      {/* ring */}
      <circle cx="64" cy="64" r="56" fill="none" stroke={teal} strokeWidth="8" />

      {/* droplet — clip so both halves + the bolt sit inside it */}
      <defs>
        <path
          id="drop"
          d="M64 22 C64 22 34 58 34 80 a30 30 0 0 0 60 0 C94 58 64 22 64 22 Z"
        />
        <clipPath id="dropClip">
          <use href="#drop" />
        </clipPath>
      </defs>

      <g clipPath="url(#dropClip)">
        <rect x="20" y="10" width="44" height="108" fill={teal} />
        <rect x="64" y="10" width="44" height="108" fill={crimson} />
        {/* bolt */}
        <path
          d="M70 30 L44 74 h16 l-8 30 30 -46 h-16 z"
          fill="#fff"
          opacity="0.96"
        />
      </g>
      <use href="#drop" fill="none" stroke={teal} strokeWidth="4" />

      {/* signal arcs, top-left */}
      <g fill="none" stroke={crimson} strokeWidth="6" strokeLinecap="round">
        <path d="M30 54 a20 20 0 0 1 18 -22" />
        <path d="M26 44 a30 30 0 0 1 26 -30" opacity="0.85" />
        <path d="M23 34 a40 40 0 0 1 33 -22" opacity="0.6" />
      </g>

      {/* speed streaks, right */}
      <g fill={crimson}>
        <path d="M92 40 l30 -6 -28 12 z" />
        <path d="M96 58 l28 -3 -26 10 z" opacity="0.8" />
        <path d="M94 74 l24 2 -23 8 z" opacity="0.6" />
      </g>
    </svg>
  );
}
