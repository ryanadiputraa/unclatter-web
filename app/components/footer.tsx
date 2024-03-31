'use client';

import Image from 'next/image';

import { useTheme } from '@/hooks/useTheme';

export function Footer() {
  const date = new Date();
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="bg-primary dark:bg-primary-dark py-3 px-[4%] lg:px-6 text-xs sm:text-base flex justify-between items-center border-secondary dark:border-secondary-dark border-t-[0.02rem]">
      <a href="https://devzy.my.id/" target="_blank" referrerPolicy="no-referrer">
        © {date.getFullYear()}, devzy
      </a>
      <button
        className="h-10 w-10 p-2 grid place-items-center rounded-full hover:bg-gray-400 dark:hover:bg-gray-800"
        onClick={toggleTheme}
      >
        <Image
          width={20}
          height={20}
          src={theme === 'light' ? '/day.svg' : '/night.svg'}
          alt="theme-ico"
          className="h-auto"
        />
      </button>
    </footer>
  );
}
