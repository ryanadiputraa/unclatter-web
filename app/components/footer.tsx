'use client';

import { useTheme } from '@/hooks/useTheme';

export function Footer() {
  const date = new Date();
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="py-3 px-[4%] lg:px-6 flex justify-between items-center border-secondary dark:border-secondary-dark border-t-[0.02rem]">
      <a href="https://ryanadiputra.vercel.app/" target="_blank" referrerPolicy="no-referrer">
        © {date.getFullYear()}, RYAN ADI PUTRA
      </a>
      <button className="h-10 w-10 p-2 rounded-full hover:bg-gray-400 dark:hover:bg-gray-800" onClick={toggleTheme}>
        <img src={theme === 'light' ? '/day.svg' : '/night.svg'} alt="theme-ico" className="h-full" />
      </button>
    </footer>
  );
}
