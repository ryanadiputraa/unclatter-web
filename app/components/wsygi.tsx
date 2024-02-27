'use client';

import { Dispatch, SetStateAction } from 'react';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface Props {
  content: string;
  onchange: Dispatch<SetStateAction<string | null>>;
  classNames?: string;
}

export function WSYGIEditor({ content, onchange, classNames }: Props) {
  const editor = useEditor({
    extensions: [StarterKit.configure()],
    content: content,
    editorProps: {
      attributes: {
        class: 'p-3 bg-gray-300 dark:bg-gray-800 text-text dark:text-text-dark rounded-lg focus:outline-none',
      },
    },
    onUpdate({ editor }) {
      onchange(editor.getHTML());
    },
  });

  return (
    <div className={`${classNames}`}>
      {/* TODO: toolbar */}
      <EditorContent editor={editor} />
    </div>
  );
}
