import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0A1628",
        "navy-light": "#162036",
        ocean: "#1A6FD4",
        "ocean-dark": "#1558A8",
        "ocean-light": "#E8F2FC",
        sky: "#3a8ef7",
        foam: "#EAF4F6",
        sand: "#FAFBFC",
        muted: "#94A3B8",
        "muted-dark": "#64748B",
        glass: "rgba(255,255,255,0.06)",
        "glass-light": "rgba(255,255,255,0.08)",
        "glass-border": "rgba(255,255,255,0.10)",
        stone: "#F1F5F9",
      },
      fontFamily: {
        heading: ['"Roboto Condensed"', 'sans-serif'],
        body: ['Rubik', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
export default config;
