'use client';

import { Dispatch, SetStateAction } from 'react';

import { Editor, EditorContent, useEditor } from '@tiptap/react';
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
        class: 'py-3 px-6 bg-gray-300 dark:bg-gray-800 text-text dark:text-text-dark rounded-lg focus:outline-none',
      },
    },
    onUpdate({ editor }) {
      onchange(editor.getHTML());
    },
  });

  return (
    <div className={`flex flex-col ${classNames}`}>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

function Toolbar({ editor }: { editor: Editor | null }) {
  const toggleHeader = () => editor?.chain().focus().toggleHeading({ level: 2 }).run();

  if (!editor) return null;
  return (
    <div className="flex p-1 bg-gray-300 dark:bg-gray-800 text-text dark:text-text-dark rounded-lg my-1">
      <button
        className={`py-2 px-5 hover:bg-gray-700 rounded-lg cursor-pointer ${
          editor.isActive('heading') ? 'bg-gray-400 dark:bg-gray-700' : ''
        }`}
        onClick={toggleHeader}
      >
        H
      </button>
    </div>
  );
}
