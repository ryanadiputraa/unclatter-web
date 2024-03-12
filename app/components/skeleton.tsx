export const TextSkeleton = ({ classNames = '' }: { classNames?: string }) => (
  <div className={`animate-pulse min-w-80 ${classNames}`}>
    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-2/4 mb-4"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-11/12 mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-5/6 mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-11/12"></div>
    <span className="sr-only">Loading...</span>
  </div>
);
