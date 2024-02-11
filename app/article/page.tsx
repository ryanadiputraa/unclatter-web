'use client';

import { useProtectedRoute } from '@/hooks/useAuth';
import { Header } from '../components/header';
import { redirect } from 'next/navigation';

export default function Article() {
  useProtectedRoute(() => redirect('/'));

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto flex flex-col justify-start pt-10">
        <form className="flex gap-4 items-center justify-center">
          <input
            required
            placeholder="insert article url..."
            type="url"
            className="w-3/4 md:w-11/12 py-2 px-4 border-none focus:outline-none text-text rounded-lg"
          />
          <button type="submit" className="bg-accent dark:bg-accent-dark rounded-lg p-2">
            <img src="/send.svg" alt="send" className="w-6" />
          </button>
        </form>
      </main>
    </>
  );
}
