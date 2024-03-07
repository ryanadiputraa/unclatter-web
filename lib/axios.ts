import axios, { AxiosError, isAxiosError } from 'axios';

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

interface DataAPIResponse<T> {
  data: T;
}

interface ErrorAPIResponse {
  message: string;
  error?: ErrorResponse;
}

type ErrorResponse = {
  [key: string]: string;
};

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
