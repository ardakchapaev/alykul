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
        navy: {
          DEFAULT: '#0A1628',
          light: '#0D2137',
          dark: '#06101B',
        },
        ocean: {
          DEFAULT: '#0077B6',
          light: '#00B4D8',
          dark: '#023E8A',
        },
        teal: {
          DEFAULT: '#00897B',
          light: '#26A69A',
          dark: '#00695C',
        },
        gold: {
          DEFAULT: '#FFB300',
          light: '#FFCA28',
          dark: '#FF8F00',
        },
        foam: {
          DEFAULT: '#F4F8FB',
          muted: '#E8F0F7',
        },
        sand: '#FAFAF8',
        muted: '#6B7280',
        sky: '#3a8ef7',
        'ocean-dark': '#1a5ab0',
      },
      fontFamily: {
        heading: ['var(--font-cormorant)', '"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['var(--font-playfair)', '"Playfair Display"', 'Georgia', 'serif'],
        body: ['var(--font-outfit)', '"Outfit"', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', '"JetBrains Mono"', 'monospace'],
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
