import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef7f1",
          100: "#d6ecdf",
          200: "#addac0",
          300: "#7fc39d",
          400: "#4fa877",
          500: "#2f8d5b",
          600: "#217046",
          700: "#1b5a39",
          800: "#17472f",
          900: "#123a27",
        },
        oil: "#0f766e",
        petro: "#7c3aed",
        energy: "#c2410c",
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
