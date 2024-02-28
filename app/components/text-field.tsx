import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from 'react';

interface Props {
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string | readonly string[];
  onchange?: Dispatch<SetStateAction<string>>;
  classNames?: string;
}

export function TextField({ type = 'text', required = false, placeholder, value, onchange, classNames }: Props) {
  return (
    <input
      type={type}
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        if (!onchange) return;
        onchange(e.target.value);
      }}
      className={`py-3 px-6 bg-gray-300 dark:bg-gray-800 text-text dark:text-text-dark rounded-lg focus:outline-none ${classNames}`}
    />
  );
}
