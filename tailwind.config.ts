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
        navy: "#182F48",
        ocean: "#246DC9",
        "ocean-dark": "#1a5ab0",
        sky: "#3a8ef7",
        foam: "#EAF4F6",
        sand: "#F9FBFD",
        muted: "#8EA0A2",
      },
      fontFamily: {
        heading: ['"Roboto Condensed"', 'sans-serif'],
        body: ['Rubik', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
