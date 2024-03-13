'use client';

import { useContext, useEffect, useState } from 'react';

import { AppContext } from '@/context';
import { useArticle } from '@/hooks/useArticle';
import { TextSkeleton } from '../components/skeleton';

export default function Bookmark() {
  const { jwt } = useContext(AppContext).auth;
  const [isFetching, setIsFetching] = useState(true);
  const { fetchBookmarkedArticle } = useArticle();

  useEffect(() => {
    if (!jwt) return;
    const fetchArticles = async () => {
      setIsFetching(true);
      const articles = await fetchBookmarkedArticle();
      console.log(articles);
      setIsFetching(false);
    };

    fetchArticles();
  }, [jwt]);

  return <div className="px-[4%] lg:px-20">{isFetching && <Placeholder />}</div>;
}

const Placeholder = () => {
  return (
    <div className="flex flex-wrap justify-between gap-x-12 gap-y-20">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((v) => (
        <TextSkeleton key={v} classNames="h-40 min-w-0 w-full sm:w-2/5 md:w-1/4" />
      ))}
    </div>
  );
};
