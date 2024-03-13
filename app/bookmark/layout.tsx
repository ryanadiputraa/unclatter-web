'use client';

import { Suspense } from 'react';

import { AppProvider } from '@/context';
import ProtectedRouteProvider from '@/hooks/useAuth';
import { Toast } from '../components/toast';

export default function BookmarkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <Suspense>
        <ProtectedRouteProvider>{children}</ProtectedRouteProvider>
        <Toast />
      </Suspense>
    </AppProvider>
  );
}
