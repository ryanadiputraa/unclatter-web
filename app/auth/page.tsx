'use client';

import { redirect, useSearchParams } from 'next/navigation';

import { useStoreJWTToken } from '@/hooks/useJWT';
import { Header } from '../components/header';

export default function Auth() {
  const params = useSearchParams();
  const accessToken = params.get('access_token') ?? '';
  const expiresAt = params.get('expires_at') ?? '';

  useStoreJWTToken({ access_token: accessToken, expires_at: expiresAt }, () => redirect('/'));

  return (
    <>
      {/* TODO: isAuthenticated */}
      <Header isAuthenticated={false} />
      <main className="grid place-items-center min-h-[93vh]">
        <p>Authenticating...</p>
      </main>
    </>
  );
}
