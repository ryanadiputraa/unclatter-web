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
  const [isFetching, setIsFetching] = useState(true);

  const fetchArticles = async () => {
    setIsFetching(true);
    const { data, meta } = await fetchBookmarkedArticle(page, 30);
    setArticles((prev) => (page === 1 ? data : [...prev, ...data]));
    setIsFetching(false);

    if (!meta) return;
    setPage(meta?.current_page + 1);
    setHasMore(meta.current_page < meta.total_page);
  };

  useEffect(() => {
    if (!jwt) return;
    fetchArticles();
  }, [jwt]); // eslint-disable-line

  return (
    <InfiniteScroll
      dataLength={articles.length}
      next={fetchArticles}
      hasMore={hasMore}
      loader={<Placeholder isFetching={isFetching} />}
      className="flex flex-wrap justify-between lg:justify-start gap-0 lg:gap-x-20 gap-y-20 px-[4%] lg:px-20 py-2"
    >
      {articles.length || isFetching ? (
        articles.map((article) => (
          <Link
            href={`/bookmark/${article.id}`}
            key={article.id}
            className="shadow-md shadow-secondary dark:shadow-secondary-dark lg:max-w-md w-full sm:w-[45%] lg:w-[30%] p-4 rounded-lg flex flex-col items-start gap-2 hover:scale-105 transition-transform"
          >
            <h4 className="text-lg font-bold">{article.title}</h4>
            <p className="italic text-sm truncate w-full">{article.article_link}</p>
            <span className="self-end text-sm text-gray-500 dark:text-gray-300">
              {format(article.updated_at, 'MMM do, yyyy - hh:mm aaa')}
            </span>
          </Link>
        ))
      ) : (
        <span className="mx-auto h-[85vh] text-center grid place-items-center">No bookmarked articles found.</span>
      )}
    </InfiniteScroll>
  );
}

const Placeholder = ({ isFetching }: { isFetching: boolean }) =>
  isFetching
    ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((v) => (
        <TextSkeleton key={v} classNames="h-40 min-w-0 max-w-md w-full sm:w-[45%] lg:w-[30%]" />
      ))
    : null;
