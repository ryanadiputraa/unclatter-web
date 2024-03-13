'use client';

import { format } from 'date-fns';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

import { AppContext } from '@/context';
import { Article, useArticle } from '@/hooks/useArticle';
import { TextSkeleton } from '../components/skeleton';

export default function Bookmark() {
  const { jwt } = useContext(AppContext).auth;
  const { fetchBookmarkedArticle } = useArticle();
  const [isFetching, setIsFetching] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (!jwt) return;
    const fetchArticles = async () => {
      setIsFetching(true);
      const articles = await fetchBookmarkedArticle();
      setArticles(articles);
      setIsFetching(false);
    };
    fetchArticles();
  }, [jwt]);

  return (
    <div className="px-[4%] lg:px-20">
      <div className="flex flex-wrap justify-between lg:justify-start gap-0 lg:gap-x-20 gap-y-20">
        {isFetching && <Placeholder />}
        {articles.map((article) => (
          <Link
            href={`/bookmark/${article.id}`}
            key={article.id}
            className="shadow-md shadow-secondary dark:shadow-secondary-dark lg:max-w-md w-full sm:w-[45%] lg:w-[30%] p-4 rounded-lg flex flex-col items-start gap-2 hover:scale-105 transition-transform"
          >
            <h4 className="text-lg font-bold">{article.title}</h4>
            <p className="italic text-sm truncate w-full">{article.article_link}</p>
            <span className="self-end text-sm">{format(article.updated_at, 'MMM do, yyyy - hh:mm aaa')}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

const Placeholder = () =>
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((v) => (
    <TextSkeleton key={v} classNames="h-40 min-w-0 max-w-md w-full sm:w-[45%] lg:w-[30%]" />
  ));
