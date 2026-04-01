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
        // M1 defaults (original)
        navy: "#182F48",
        ocean: "#246DC9",
        "ocean-dark": "#1a5ab0",
        sky: "#3a8ef7",
        foam: "#EAF4F6",
        sand: "#F9FBFD",
        muted: "#8EA0A2",
      },
      fontFamily: {
        heading: ['var(--font-cormorant)', '"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['var(--font-outfit)', '"Outfit"', 'system-ui', 'sans-serif'],
        "m3-display": ['var(--font-cormorant)', '"Cormorant Garamond"', 'Georgia', 'serif'],
        "m3-body": ['var(--font-outfit)', '"Outfit"', 'system-ui', 'sans-serif'],
        "m4-display": ['var(--font-playfair)', '"Playfair Display"', 'Georgia', 'serif'],
        "m4-body": ['var(--font-inter)', '"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
