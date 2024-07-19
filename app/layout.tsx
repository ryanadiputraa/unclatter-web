import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { cookies } from "next/headers";

import { Theme } from "@/context/reducers/main";

import { Footer } from "./components/footer";
import { Header } from "./components/header";

import "./globals.css";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "UnClatter",
  description:
    "UnClatter is an article bookmarking tool that also removes distractions like ads and popups. It offers a clean reading experience, allowing users to focus solely on the essential content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesStore = cookies();
  const initialTheme = cookiesStore.get("theme")?.value as Theme;

  return (
    <html lang="en" className={initialTheme}>
      <body
        className={`${inter.className} bg-bg dark:bg-bg-dark text-text dark:text-text-dark`}
      >
        <Header />
        <main className="min-h-[94vh] pt-20 pb-8">{children}</main>
        <Footer initialTheme={initialTheme ?? "dark"} />
      </body>
    </html>
  );
}
