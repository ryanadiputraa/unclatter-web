'use client';

import { useProtectedRoute } from '@/hooks/useAuth';
import { redirect } from 'next/navigation';
import { FormEvent, useState } from 'react';

import { useArticle } from '@/hooks/useArticle';
import { Header } from '../components/header';
import { TextSkeleton } from '../components/skeleton';

import './style.css';
import { WSYGIEditor } from '../components/wsygi';

export default function Article() {
  const [url, setUrl] = useState<string>('');
  const [isFetching, setIsFetching] = useState(false);
  const [content, setContent] = useState<string | null>(null);

  useProtectedRoute(() => redirect('/'));
  const { scrapeArticle } = useArticle();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsFetching(true);
    e.preventDefault();
    const resp = await scrapeArticle(url);
    setIsFetching(false);
    if (resp) setContent(resp.data);
  };

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto flex flex-col justify-start pt-10">
        <form className="flex gap-4 items-center justify-center" onSubmit={onSubmit}>
          <input
            required
            placeholder="insert article url..."
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-3/4 md:w-11/12 py-2 px-4 border-none focus:outline-none text-text rounded-lg"
          />
          <button type="submit" className="bg-accent dark:bg-accent-dark rounded-lg p-2">
            <img src="/send.svg" alt="send" className="w-6" />
          </button>
        </form>
        {isFetching ? (
          <TextSkeleton classNames="my-8 w-5/6 md:w-[98%] mx-auto" />
        ) : (
          <WSYGIEditor
            content={content ?? ''}
            onchange={setContent}
            classNames={`${content ? 'inline-block' : 'hidden'} w-5/6 md:w-[98%] mx-auto my-8`}
          />
        )}
      </main>
    </>
  );
}
