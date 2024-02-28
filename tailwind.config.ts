import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'selector',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        text: '#130e01',
        bg: '#efefef',
        primary: '#0042db',
        secondary: '#98b3c5',
        accent: '#005475',
        'text-dark': '#fef9ec',
        'bg-dark': '#141412',
        'primary-dark': '#2465ff',
        'secondary-dark': '#acb9cf',
        'accent-dark': '#8adeff',
      },
    },
  },
  plugins: [],
};
export default config;
