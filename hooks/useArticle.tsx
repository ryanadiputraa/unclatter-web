'use client';

import { useContext } from 'react';

import { AppContext } from '@/context';
import { useMainAction } from '@/context/actions/main';
import axios, { DataAPIResponse, ErrorAPIResponse, catchAxiosError } from '@/lib/axios';

export interface Article {
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
  const { jwt } = useContext(AppContext).auth;
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

  const fetchBookmarkedArticle = async (page: number = 1, size: number = 20): Promise<DataAPIResponse<Article[]>> => {
    try {
      const resp = await axios.get<DataAPIResponse<Article[]>>(`/api/articles/bookmarks?page=${page}&size=${size}`, {
        headers: {
          Authorization: `Bearer ${jwt?.access_token}`,
        },
      });
      return resp.data;
    } catch (error) {
      const err = catchAxiosError(error);
      toggleToast({ isOpen: true, type: 'error', message: err.message });
      return { data: [] };
    }
  };

  const fetchArticleById = async (id: string): Promise<DataAPIResponse<Article> | null> => {
    try {
      const resp = await axios.get<DataAPIResponse<Article>>(`/api/articles/bookmarks/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt?.access_token}`,
        },
      });
      return resp.data;
    } catch (error) {
      const err = catchAxiosError(error);
      toggleToast({ isOpen: true, type: 'error', message: err.message });
      return null;
    }
  };

  const updateArticle = async (articleId: string, payload: BookmarkArticlePayload): Promise<Article | null> => {
    try {
      const resp = await axios.put<DataAPIResponse<Article>>(`/api/articles/bookmarks/${articleId}`, payload, {
        headers: {
          Authorization: `Bearer ${jwt?.access_token}`,
        },
      });
      toggleToast({ isOpen: true, type: 'info', message: 'article updated!' });
      return resp.data.data;
    } catch (error) {
      const err = catchAxiosError(error);
      toggleToast({ isOpen: true, type: 'error', message: err.message });
      return null;
    }
  };

  const deleteArticle = async (articleId: string): Promise<boolean> => {
    try {
      await axios.delete(`/api/articles/bookmarks/${articleId}`, {
        headers: {
          Authorization: `Bearer ${jwt?.access_token}`,
        },
      });
      toggleToast({ isOpen: true, type: 'info', message: 'article deleted!' });
      return true;
    } catch (error) {
      const err = catchAxiosError(error);
      toggleToast({ isOpen: true, type: 'error', message: err.message });
      return false;
    }
  };

  return { scrapeArticle, bookmarkArticle, fetchBookmarkedArticle, fetchArticleById, updateArticle, deleteArticle };
};
