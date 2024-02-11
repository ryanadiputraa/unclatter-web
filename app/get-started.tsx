'use client';

import Link from 'next/link';

import { useIsAuthenticated } from '@/hooks/useAuth';
import { SIGN_IN_GOOGLE_URL } from '@/utils/constant';

export function GetStarted() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <Link href={isAuthenticated ? '/article' : SIGN_IN_GOOGLE_URL}>
      <button className="px-4 py-2 border-secondary border-[0.02rem] rounded-lg hover:bg-secondary dark:hover:bg-secondary-dark">
        Get Started
      </button>
    </Link>
  );
}
