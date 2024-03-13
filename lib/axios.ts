import axios, { AxiosError, isAxiosError } from 'axios';

import { BASE_API_URL } from '@/utils/constant';

export default axios.create({
  baseURL: BASE_API_URL,
  timeout: 5000,
});

interface DataAPIResponse<T> {
  data: T;
  meta?: Pagination;
}

interface ErrorAPIResponse {
  message: string;
  error?: ErrorResponse;
}

type ErrorResponse = {
  [key: string]: string;
};

interface Pagination {
  current_page: number;
  total_page: number;
  size: number;
  total_data: number;
}

export type { DataAPIResponse, ErrorAPIResponse };

export function catchAxiosError(error: unknown): ErrorAPIResponse {
  const unexpectedError = 'Something went wrong, please try again later';

  if (isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorAPIResponse>;
    return {
      message: axiosError.response?.data.message ?? unexpectedError,
      error: axiosError.response?.data.error,
    };
  }

  return {
    message: unexpectedError,
  };
}
