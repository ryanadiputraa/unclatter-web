'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import { useMainAction } from '@/context/actions/main';
import { useArticle } from '@/hooks/useArticle';
import { TextSkeleton } from '../components/skeleton';
import { TextField } from '../components/text-field';
import { WSYGIField } from '../components/wsygi-field';

import './style.css';

export default function Article() {
  const [inputURL, setInputURL] = useState<string>('');
  const [isScrapping, setIsScrapping] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [title, setTitle] = useState<string>('');
  const [titleError, setTitleError] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [articleURL, setArticleURL] = useState<string>('');

  const router = useRouter();
  const { scrapeArticle, bookmarkArticle } = useArticle();
  const toggleToast = useMainAction().toggleToast;

  const scrape = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsScrapping(true);
    const result = await scrapeArticle(inputURL);
    setIsScrapping(false);

    if (result) {
      setTitle('');
      setContent(result);
      setArticleURL(inputURL);
    }
  };

  const bookmark = async () => {
    setIsSaving(true);
    const error = await bookmarkArticle({
      title: title,
      content: content ?? '',
      article_link: articleURL,
    });
    setIsSaving(false);

    if (!error) {
      toggleToast({ isOpen: true, type: 'info', message: 'Article saved!' });
      setTitleError(null);
      router.push('/bookmark');
    } else if (error.error?.title) {
      setTitleError(error.error.title);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col justify-start px-[4%] lg:px-0">
      <form className="flex gap-4 items-center justify-center" onSubmit={scrape}>
        <input
          required
          placeholder="insert article url..."
          type="url"
          value={inputURL}
          onChange={(e) => setInputURL(e.target.value)}
          className="w-full py-2 px-4 border-none focus:outline-none text-text rounded-lg"
        />
        <button disabled={isScrapping || isSaving} type="submit" className="bg-accent-dark rounded-lg p-2">
          <Image width={40} height={40} src="/send.svg" alt="send" className="w-6" />
        </button>
      </form>
      {isScrapping && <TextSkeleton classNames="my-8 w-full mx-auto min-w-0" />}
      {content && !isScrapping && (
        <div className="flex flex-col mt-12">
          {titleError && <span className="text-red-400 text-sm mb-2">{titleError}</span>}
          <div className="flex items-center gap-4">
            <TextField
              placeholder="Bookmark title..."
              value={title}
              onchange={setTitle}
              classNames={`font-bold w-full ${titleError ? 'border-red-400 border-2' : ''}`}
            />
            <button
              disabled={isScrapping || isSaving}
              className="py-3 px-6 bg-primary-dark rounded-lg text-text-dark"
              onClick={bookmark}
            >
              Save
            </button>
          </div>
          <WSYGIField
            content={content ?? ''}
            onchange={setContent}
            classNames={`${content ? 'inline-block' : 'hidden'} w-full mt-4`}
          />
        </div>
      )}
    </div>
  );
}
