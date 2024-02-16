'use client';

import { useGetJWTToken } from './useAuth';

interface ScrapeArticle {
  data: string;
}

export const useArticle = () => {
  const jwt = useGetJWTToken();

  const scrapeArticle = async (url: string): Promise<ScrapeArticle | undefined> => {
    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles?url=${url}`, {
        headers: {
          Authorization: `Bearer ${jwt?.access_token}`,
        },
      });
      const json: ScrapeArticle = await resp.json();
      return json;
    } catch (error) {
      console.error('fail to scrape', error);
    }
  };

  return { scrapeArticle };
};
