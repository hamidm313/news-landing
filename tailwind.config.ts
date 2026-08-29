import type { Config } from "tailwindcss";

/**
 * "نفت فوری" (Naft Fouri) brand — from the logo badge:
 *   crimson  #c8102e  (droplet-half, bolt, signal arcs, speed streaks)
 *   slate-teal #2e4a54 (droplet-half, ring)
 */
const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fdf2f4",
          100: "#fce4e8",
          200: "#f7bcc7",
          300: "#f08fa2",
          400: "#e0536e",
          500: "#c8102e",
          600: "#b10d28",
          700: "#8c0a20",
          800: "#6d0a1b",
          900: "#490713",
        },
        ink: {
          50: "#f2f5f6",
          100: "#dde6e8",
          200: "#bacbcf",
          300: "#8ba6ad",
          400: "#587c85",
          500: "#3b5b64",
          600: "#2e4a54",
          700: "#273d45",
          800: "#22343a",
          900: "#1b2a2f",
        },
        // section accents (Thumbnail covers, chips)
        oil: "#c8102e",
        energy: "#2e4a54",
        petro: "#587c85",
      },
      fontFamily: {
        sans: [
          "var(--font-vazir)",
          "Vazirmatn",
          "IRANSans",
          "Tahoma",
          "Segoe UI",
          "system-ui",
          "sans-serif",
        ],
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          "2xl": "1200px",
        },
      },
    },
  },
  plugins: [],
};

export default config;
