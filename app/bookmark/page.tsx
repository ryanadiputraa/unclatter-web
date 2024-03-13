'use client';

import { format } from 'date-fns';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { AppContext } from '@/context';
import { Article, useArticle } from '@/hooks/useArticle';
import { TextSkeleton } from '../components/skeleton';

export default function Bookmark() {
  const { jwt } = useContext(AppContext).auth;
  const { fetchBookmarkedArticle } = useArticle();
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchArticles = async () => {
    const { data, meta } = await fetchBookmarkedArticle(page, 15);
    setArticles((prev) => [...prev, ...data]);

    if (!meta) return;
    setPage(meta?.current_page + 1);
    setHasMore(meta.current_page < meta.total_page);
  };

  useEffect(() => {
    if (!jwt) return;
    fetchArticles();
  }, [jwt]);

  return (
    <div className="px-[4%] lg:px-20">
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchArticles}
        hasMore={hasMore}
        loader={<Placeholder />}
        className="flex flex-wrap justify-between lg:justify-start gap-0 lg:gap-x-20 gap-y-20 p-2"
      >
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
      </InfiniteScroll>
    </div>
  );
}

const Placeholder = () =>
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((v) => (
    <TextSkeleton key={v} classNames="h-40 min-w-0 max-w-md w-full sm:w-[45%] lg:w-[30%]" />
  ));
