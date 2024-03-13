'use client';

import { useContext, useEffect } from 'react';

import { AppContext } from '@/context';
import { useMainAction } from '@/context/actions/main';
import { ToastType } from '@/context/reducers/main';

export function Toast() {
  const { isOpen, type, message } = useContext(AppContext).main.toast;
  const toggleToast = useMainAction().toggleToast;

  const closeToast = () => toggleToast({ isOpen: false, type: type, message: message });

  useEffect(() => {
    const t = setTimeout(() => closeToast(), 3000);
    return () => clearTimeout(t);
  }, [isOpen]); // eslint-disable-line

  return (
    <div className={`${isOpen ? 'fixed' : 'hidden'} bottom-4 right-8 min-w-48`}>
      <div
        className="flex items-center w-full max-w-xs p-4 mb-4 text-text-dark dark:text-text bg-accent dark:bg-accent-dark rounded-lg shadow"
        role="alert"
      >
        <ToastIco type={type} />
        <div className="ms-3 text-sm font-normal pr-4 line-clamp-2">{message}</div>
        <button
          type="button"
          className="ms-auto bg-white dark:bg-black text-secondary dark:text-secondary-dark  rounded-lg focus:ring-2 focus:ring-gray-300 p-2 inline-flex items-center justify-center h-8 w-8"
          data-dismiss-target="#toast-success"
          aria-label="Close"
          onClick={closeToast}
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

const ToastIco = ({ type }: { type: ToastType }) => {
  switch (type) {
    case 'warning':
      return (
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
          </svg>
          <span className="sr-only">Warning icon</span>
        </div>
      );

    case 'error':
      return (
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
          </svg>
          <span className="sr-only">Error icon</span>
        </div>
      );

    default:
      return (
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span className="sr-only">Check icon</span>
        </div>
      );
  }
};
