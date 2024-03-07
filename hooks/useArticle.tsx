'use client';

import { useMainAction } from '@/context/actions/main';
import axios, { DataAPIResponse, ErrorAPIResponse, catchAxiosError } from '@/lib/axios';
import { useGetJWTToken } from './useAuth';

interface Article {
  id: string;
  title: string;
  content: string;
  article_link: string;
  created_at: string;
  updated_at: string;
}

interface BookmarkArticlePayload {
  title: string;
  content: string;
  article_link: string;
}

export const useArticle = () => {
  const jwt = useGetJWTToken();
  const toggleToast = useMainAction().toggleToast;

  const scrapeArticle = async (url: string): Promise<string | undefined> => {
    try {
      const resp = await axios.get<DataAPIResponse<string>>(`/api/articles?url=${url}`, {
        headers: {
          Authorization: `Bearer ${jwt?.access_token}`,
        },
      });
      return resp.data.data;
    } catch (error) {
      const err = catchAxiosError(error);
      toggleToast({ isOpen: true, type: 'error', message: err.message });
    }
  };

  const bookmarkArticle = async (payload: BookmarkArticlePayload): Promise<ErrorAPIResponse | null> => {
    try {
      await axios.post<Article>('/api/articles/bookmarks', payload, {
        headers: {
          Authorization: `Bearer ${jwt?.access_token}`,
        },
      });
      return null;
    } catch (error) {
      const err = catchAxiosError(error);
      toggleToast({ isOpen: true, type: 'error', message: err.message });
      return { message: err.message, error: err.error };
    }
  };

  return { scrapeArticle, bookmarkArticle };
};
