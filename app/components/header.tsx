'use client';

import Link from 'next/link';

import { useIsAuthenticated } from '@/hooks/useAuth';
import { SIGN_IN_GOOGLE_URL } from '@/utils/constant';

export function Header() {
  const isAuthenticated = useIsAuthenticated();

  const signOut = () => {
    // TODO: remove cookie & redirect
  };

  return (
    <header className="flex justify-between items-center px-[4%] sm:px-8 py-4 border-secondary border-b-[0.02rem]">
      <Link href="/" className="flex items-center gap-2">
        <img src="/unclatter.svg" alt="unclatter" className="w-6" />
        <h1 className="text-xl font-bold">UnClatter</h1>
      </Link>
      <div className="text-sm">
        {}
        <Link href={isAuthenticated ? '/article' : SIGN_IN_GOOGLE_URL} className="px-4 py-2 ">
          <button className="border-b-2 border-transparent hover:border-secondary">Sign In</button>
        </Link>
        {!isAuthenticated && (
          <a
            href={SIGN_IN_GOOGLE_URL}
            className="px-4 py-2 border-secondary border-[0.02rem] rounded-lg hover:bg-secondary dark:hover:bg-secondary-dark"
          >
            <button>Sign Up</button>
          </a>
        )}
      </div>
    </header>
  );
}
