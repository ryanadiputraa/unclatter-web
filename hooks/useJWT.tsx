'use client';

import { useEffect, useState } from 'react';

export interface JWTToken {
  access_token: string;
  expires_at: string;
}

const LS_KEY = 'auth';

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
    const token: JWTToken = JSON.parse(tokenString ?? '{}');
    setToken(token);
  }, []);

  return token;
}
