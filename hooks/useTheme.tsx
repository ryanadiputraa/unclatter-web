import { useEffect, useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<string>('light');

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
    const prevTheme = window.localStorage.getItem('theme');
    const html = document.querySelector('html');
    html?.classList.add(prevTheme ?? theme);
    if (prevTheme) setTheme(prevTheme);
  }, []);

  return { theme, toggleTheme };
}
