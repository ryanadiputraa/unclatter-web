import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'selector',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    boxShadow: {
      sm: '0 0 2px 1px rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 0 5px 1px rgba(0, 0, 0, 0.06)',
      lg: '0 0 7px 1px rgba(0, 0, 0, 0.06)',
      xl: '0 0 10px 1px rgba(0, 0, 0, 0.06)',
      '2xl': '0 0 12px 2px rgba(0, 0, 0, 0.06)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
    },
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
