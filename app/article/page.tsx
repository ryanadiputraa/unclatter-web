'use client';

import { useProtectedRoute } from '@/hooks/useAuth';
import { redirect } from 'next/navigation';
import { FormEvent, useState } from 'react';

import { useArticle } from '@/hooks/useArticle';
import { TextSkeleton } from '../components/skeleton';
import { TextField } from '../components/text-field';
import { WSYGIField } from '../components/wsygi-field';

import './style.css';

export default function Article() {
  const [url, setUrl] = useState<string>('');
  const [isFetching, setIsFetching] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string | null>(null);

  useProtectedRoute(() => redirect('/'));
  const { scrapeArticle } = useArticle();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsFetching(true);
    e.preventDefault();
    const resp = await scrapeArticle(url);
    setIsFetching(false);
    if (resp) setContent(resp.data);
    setTitle('');
  };

  return (
    <main className="max-w-4xl mx-auto flex flex-col justify-start pt-10 px-[4%] lg:px-0">
      <form className="flex gap-4 items-center justify-center" onSubmit={onSubmit}>
        <input
          required
          placeholder="insert article url..."
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full py-2 px-4 border-none focus:outline-none text-text rounded-lg"
        />
        <button type="submit" className="bg-accent dark:bg-accent-dark rounded-lg p-2">
          <img src="/send.svg" alt="send" className="w-6" />
        </button>
      </form>
      {isFetching ? (
        <TextSkeleton classNames="my-8 w-5/6 md:w-[98%] mx-auto" />
      ) : (
        <div className="flex flex-col mt-12 gap-4">
          <span className="text-center">Bookmark your article!</span>
          <div className="flex items-center gap-4">
            <TextField
              placeholder="Your Content Title..."
              value={title}
              onchange={setTitle}
              classNames="font-bold w-full"
            />
            <button className="py-3 px-6 bg-primary-dark rounded-lg">Save</button>
          </div>
          <WSYGIField
            content={content ?? ''}
            onchange={setContent}
            classNames={`${content ? 'inline-block' : 'hidden'} w-full`}
          />
        </div>
      )}
    </main>
  );
}
