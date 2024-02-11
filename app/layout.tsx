import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const inter = Poppins({
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'UnClatter',
  description:
    'UnClatter is an article bookmarking tool that also removes distractions like ads and popups. It offers a clean reading experience, allowing users to focus solely on the essential content.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-bg dark:bg-bg-dark text-text dark:text-text-dark`}>{children}</body>
    </html>
  );
}
