'use client';

import { Suspense } from 'react';

import { AppProvider } from '@/context';
import { Toast } from '../components/toast';

export default function ArticleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <Suspense>
        {children}
        <Toast />
      </Suspense>
    </AppProvider>
  );
}
