'use client';

import { redirect, useSearchParams } from 'next/navigation';

import { useStoreJWTToken } from '@/hooks/useAuth';
import { Header } from '../components/header';

export default function Auth() {
  const params = useSearchParams();
  const accessToken = params.get('access_token') ?? '';
  const expiresAt = params.get('expires_at') ?? '';

  useStoreJWTToken({ access_token: accessToken, expires_at: expiresAt }, () => redirect('/article'));

  return (
    <>
      <Header />
      <main className="grid place-items-center min-h-[93vh]">
        <p>Authenticating...</p>
      </main>
    </>
  );
}
