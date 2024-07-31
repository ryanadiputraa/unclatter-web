"use client";

import Image from "next/image";
import { useState } from "react";

import { Theme } from "@/context/reducers/main";
import { setCookie } from "@/lib/storage";
import { GITHUB_URL, ONE_YEAR_IN_MILISECOND } from "@/utils/constant";

export function Footer({ initialTheme }: { initialTheme: Theme }) {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const cookieExpireDate = new Date();
  cookieExpireDate.setTime(cookieExpireDate.getTime() + ONE_YEAR_IN_MILISECOND);

  const toggleTheme = () => {
    const html = document.querySelector("html");
    const newVal = theme === "light" ? "dark" : "light";
    html?.classList.remove(theme);
    html?.classList.add(newVal);
    setTheme(newVal);
    setCookie("theme", newVal, cookieExpireDate);
  };

  return (
    <footer className="bg-primary dark:bg-primary-dark py-3 px-[4%] lg:px-6 text-xs sm:text-base flex justify-between items-center border-secondary dark:border-secondary-dark border-t-[0.02rem]">
      <a
        href={GITHUB_URL}
        target="_blank"
        referrerPolicy="no-referrer"
        className="flex items-center gap-3"
      >
        <Image
          src={theme === "light" ? "/github.svg" : "/github-white.svg"}
          width={24}
          height={24}
          alt="github"
          className="text-red"
        />
        <span className="text-text dark:text-text-dark">Ryan Adi Putra</span>
      </a>
      <button
        className="h-10 w-10 p-2 grid place-items-center rounded-full hover:bg-gray-400 dark:hover:bg-gray-800"
        onClick={toggleTheme}
      >
        <Image
          width={20}
          height={20}
          src={theme === "light" ? "/day.svg" : "/night.svg"}
          alt="theme-ico"
          className="h-auto"
        />
      </button>
    </footer>
  );
}
