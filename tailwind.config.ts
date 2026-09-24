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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#e4d1cb',
          300: '#d1b2a7',
          400: '#b88979',
          500: '#a36b59',
          600: '#8c5342',
          700: '#734133',
          800: '#60372b',
          900: '#513026',
          950: '#2c1712',
        },
        gold: {
          400: '#F59E0B',
          500: '#D97706',
          600: '#B45309',
        }
      },
    },
  },
  plugins: [],
};
export default config;
