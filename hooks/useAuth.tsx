'use client';

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export interface JWTToken {
  access_token: string;
  expires_at: string;
}

export const LS_KEY = 'auth';

export function useStoreJWTToken(token: JWTToken, callback?: () => any) {
  useEffect(() => {
    const tokenString = JSON.stringify(token);
    window.localStorage.setItem(LS_KEY, tokenString);
    if (callback) callback();
  }, []);
}

export function useGetJWTToken(): JWTToken | null {
  const [token, setToken] = useState<JWTToken | null>(null);

  useEffect(() => {
    const tokenString = window.localStorage.getItem(LS_KEY);
    const token: JWTToken = JSON.parse(tokenString ?? '{access_token:"",expires_at:""}');
    setToken(token);
  }, []);

  return token;
}

export function useIsAuthenticated(): boolean {
  const token = useGetJWTToken();
  const isExpired = new Date(token?.expires_at ?? '') < new Date();
  return Boolean(token?.access_token.length && !isExpired);
}

export function useProtectedRoute(callback?: () => any) {
  useEffect(() => {
    const tokenString = window.localStorage.getItem(LS_KEY);
    const token: JWTToken = JSON.parse(tokenString ?? '{}');
    if (!callback) {
      redirect('/');
    }
    if (!token?.access_token?.length) callback();
    if (new Date(token.expires_at) < new Date()) callback();
  }, []);
}
