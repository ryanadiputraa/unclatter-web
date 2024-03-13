'use client';

import { redirect } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

import { AppContext } from '@/context';
import { useAuthAction } from '@/context/actions/auth';
import { JWTToken } from '@/context/reducers/auth';
import { AUTH_LS_KEY, SIGN_IN_GOOGLE_URL } from '@/utils/constant';

export default function ProtectedRouteProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useProtectedRoute(() => redirect(SIGN_IN_GOOGLE_URL));
  return children;
}

export function useStoreJWTToken(token: JWTToken, callback?: () => any) {
  const { setJWTToken } = useAuthAction();

  useEffect(() => {
    const tokenString = JSON.stringify(token);
    window.localStorage.setItem(AUTH_LS_KEY, tokenString);
    setJWTToken(token);

    if (callback) callback();
  }, []);
}

export function useGetJWTToken(): JWTToken | null {
  const [token, setToken] = useState<JWTToken | null>(null);

  useEffect(() => {
    const tokenString = window.localStorage.getItem(AUTH_LS_KEY);
    const token: JWTToken = JSON.parse(tokenString ?? '{}');
    setToken(token);
  }, []);

  return token;
}

export function useIsAuthenticated(): boolean {
  const token = useGetJWTToken();
  const isExpired = new Date(token?.expires_at ?? '') < new Date();
  return Boolean(token?.access_token?.length && !isExpired);
}

export function useProtectedRoute(callback?: () => any) {
  const { jwt } = useContext(AppContext).auth;
  const { setJWTToken } = useAuthAction();

  useEffect(() => {
    let token: JWTToken;
    if (jwt) {
      token = jwt;
    } else {
      const tokenString = window.localStorage.getItem(AUTH_LS_KEY);
      const parsed: JWTToken = JSON.parse(tokenString ?? '{}');
      token = parsed;
    }
    setJWTToken(token);

    if (!callback) {
      redirect('/');
    }
    if (!token?.access_token?.length) callback();
    if (new Date(token.expires_at) < new Date()) callback();
  }, []);
}
