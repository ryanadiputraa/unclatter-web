'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { TextSkeleton } from '@/app/components/skeleton';
import { TextField } from '@/app/components/text-field';
import { WSYGIField } from '@/app/components/wsygi-field';
import { Article, useArticle } from '@/hooks/useArticle';

export default function BookmarkContent({ params }: { params: { articleId: string } }) {
  const [article, setArticle] = useState<Article>();
  const [isFetching, setIsFetching] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { fetchArticleById, updateArticle, deleteArticle } = useArticle();
  const router = useRouter();

  const updateArticleField = (field: string, value: any) => {
    setArticle((prev) => {
      if (!prev) return undefined;
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const onSave = async () => {
    if (!article) return;
    setIsSaving(true);
    await updateArticle(article.id, {
      title: article.title,
      article_link: article.article_link,
      content: article.content,
    });
    setIsSaving(false);
    router.push('/bookmark');
  };

  const onDelete = async () => {
    if (!article) return;
    setIsSaving(true);
    const isSuccess = await deleteArticle(article.id);
    setIsSaving(false);
    if (isSuccess) router.push('/bookmark');
  };

  useEffect(() => {
    const getArticle = async () => {
      setIsFetching(true);
      const article = await fetchArticleById(params.articleId);
      setIsFetching(false);
      setArticle(article?.data);
    };
    getArticle();
  }, [params.articleId]); // eslint-disable-line

  return (
    <div className="max-w-4xl mx-auto flex flex-col justify-start px-[4%] lg:px-0">
      {isFetching && <TextSkeleton classNames="my-8 w-full mx-auto min-w-0" />}
      {article && (
        <>
          <div className="flex items-center gap-4">
            <TextField
              placeholder="Bookmark title..."
              value={article.title}
              onchange={(e) => updateArticleField('title', e)}
              classNames={`font-bold w-full ${false ? 'border-red-400 border-2' : ''}`}
            />
            <button
              disabled={isSaving}
              className="py-3 px-6 bg-accent dark:bg-accent-dark rounded-lg text-text-dark dark:text-text"
              onClick={onSave}
            >
              Save
            </button>
          </div>
          <div className="p-2 mt-4 rounded-lg bg-gray-300 dark:bg-gray-800">
            <WSYGIField
              content={article.content ?? ''}
              onchange={(e) => updateArticleField('content', e)}
              classNames={`${article.content ? 'inline-block' : 'hidden'} w-full`}
              toolbarAction={
                <div className="flex items-center gap-2 sm:gap-4">
                  <a
                    href={article.article_link}
                    target="_blank"
                    className="text-xs text-text dark:text-text-dark flex items-center gap-2"
                  >
                    <Image
                      src={'/external-link.svg'}
                      alt="external-link"
                      width={12}
                      height={12}
                      className="dark:invert"
                    />{' '}
                    Visit Link
                  </a>
                  <button onClick={onDelete}>
                    <Image src={'/trash.svg'} alt="delete" width={28} height={36} className="dark:invert w-6" />
                  </button>
                </div>
              }
              toolbarClassNames="border-b-[0.02rem] pb-3 border-primary-dark dark:border-primary rounded-none"
            />
          </div>
        </>
      )}
    </div>
  );
}
