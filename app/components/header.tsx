'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useIsAuthenticated } from '@/hooks/useAuth';
import { AUTH_LS_KEY, SIGN_IN_GOOGLE_URL } from '@/utils/constant';

export function Header() {
  const isAuthenticated = useIsAuthenticated();
  const pathname = usePathname();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const signOut = () => {
    if (!isMounted) return;
    window.localStorage.removeItem(AUTH_LS_KEY);
    router.push('/');
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="flex justify-between items-center px-[4%] sm:px-8 py-3 border-secondary dark:border-secondary-dark border-b-[0.02rem]">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 sm:mr-4">
          <Image height={60} width={60} src="/unclatter.svg" alt="unclatter" className="w-6" />
          <h1 className="text-xl font-bold hidden sm:inline-block">UnClatter</h1>
        </Link>
        <Link href="/article">
          <h4 className="text-xs sm:text-sm">Article</h4>
        </Link>
        <Link href="/bookmark">
          <h4 className="text-xs sm:text-sm">Bookmark</h4>
        </Link>
      </div>
      <div className="text-sm">
        {pathname === '/' ? (
          <>
            <Link href={isAuthenticated ? '/article' : SIGN_IN_GOOGLE_URL}>
              <button className="py-2 border-b-2 border-transparent hover:border-secondary">Sign In</button>
            </Link>
            {!isAuthenticated && (
              <Link
                href={SIGN_IN_GOOGLE_URL}
                className="px-4 py-2 ml-4 border-secondary border-[0.02rem] rounded-lg hover:bg-secondary dark:hover:bg-secondary-dark"
              >
                <button>Sign Up</button>
              </Link>
            )}
          </>
        ) : (
          <button
            onClick={signOut}
            className="px-4 py-2 text-xs sm:text-sm border-secondary border-[0.02rem] rounded-lg hover:bg-secondary dark:hover:bg-secondary-dark"
          >
            Sign Out
          </button>
        )}
      </div>
    </header>
  );
}
