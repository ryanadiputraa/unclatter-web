import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

function toTheme(value: string): Theme {
  if (value === 'light' || value === 'dark') {
    return value as Theme;
  }
  return 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme((prev) => {
      const toggle = prev === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') window.localStorage.setItem('theme', toggle);
      const html = document.querySelector('html');
      html?.classList.replace(prev, toggle);
      return toggle;
    });
  };

  useEffect(() => {
    const saved = window.localStorage.getItem('theme');
    const prevTheme = toTheme(saved ?? 'light');
    const html = document.querySelector('html');
    html?.classList.add(prevTheme ?? theme);
    if (prevTheme) setTheme(prevTheme);
  }, []);

  return { theme, toggleTheme };
}
