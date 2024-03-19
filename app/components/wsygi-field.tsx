'use client';

import Image from 'next/image';
import { Dispatch, ReactNode, SetStateAction } from 'react';

import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface Props {
  content: string;
  onchange: Dispatch<SetStateAction<string | null>>;
  classNames?: string;
  toolbarAction?: ReactNode;
  toolbarClassNames?: string;
}

export function WSYGIField({ content, onchange, classNames = '', toolbarAction, toolbarClassNames = '' }: Props) {
  const editor = useEditor({
    extensions: [StarterKit.configure()],
    content: content,
    editorProps: {
      attributes: {
        class: 'py-3 px-6 bg-gray-300 dark:bg-gray-800 text-text dark:text-text-dark rounded-lg focus:outline-none',
      },
    },
    onUpdate({ editor }) {
      onchange(editor.getHTML());
    },
  });

  return (
    <div className={`flex flex-col ${classNames}`}>
      <Toolbar editor={editor} action={toolbarAction} classNames={toolbarClassNames} />
      <EditorContent editor={editor} />
    </div>
  );
}

function Toolbar({
  editor,
  action,
  classNames = '',
}: {
  editor: Editor | null;
  action?: ReactNode;
  classNames?: string;
}) {
  const toggleHeader = () => editor?.chain().focus().toggleHeading({ level: 2 }).run();
  const toggleBold = () => editor?.chain().focus().toggleBold().run();
  const toggleItalic = () => editor?.chain().focus().toggleItalic().run();

  if (!editor) return null;
  return (
    <div
      className={`flex justify-between p-1 pr-5 bg-gray-300 dark:bg-gray-800 text-text dark:text-text-dark rounded-lg my-1 ${classNames}`}
    >
      <div>
        <button
          className={`py-2 px-5 hover:bg-gray-700 rounded-lg cursor-pointer ${
            editor.isActive('heading') ? 'bg-gray-400 dark:bg-gray-700' : ''
          }`}
          onClick={toggleHeader}
        >
          <Image width={20} height={20} src="/heading.svg" alt="heading-ico" className="h-5" />
        </button>
        <button
          className={`py-2 px-5 hover:bg-gray-700 rounded-lg cursor-pointer ${
            editor.isActive('bold') ? 'bg-gray-400 dark:bg-gray-700' : ''
          }`}
          onClick={toggleBold}
        >
          <Image width={20} height={20} src="/bold.svg" alt="bold-ico" className="h-5" />
        </button>
        <button
          className={`py-2 px-5 hover:bg-gray-700 rounded-lg cursor-pointer ${
            editor.isActive('italic') ? 'bg-gray-400 dark:bg-gray-700' : ''
          }`}
          onClick={toggleItalic}
        >
          <Image width={20} height={20} src="/italic.svg" alt="italic-ico" className="h-5" />
        </button>
      </div>
      {action}
    </div>
  );
}
