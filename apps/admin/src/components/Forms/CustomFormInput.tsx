import React, { TextareaHTMLAttributes } from 'react';

interface CustomFormInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  placeholder: string;
  type?: 'text' | 'textarea' | 'number';
  className?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  success?: string;
  error?: string;
}

const CustomFormInput: React.FC<CustomFormInputProps> = ({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  success,
  error,
}) => {
  const inputWrapperClassName = 'relative mb-4';

  const commonInputClassName = `w-full px-4 py-3 leading-tight text-gray-700 dark:text-gray-300 bg-white ${
    error ? 'border-red-600' : 'dark:border-gray-600'
  } dark:bg-gray-700 focus:outline-none ${
    error ? 'focus:border-red-400 focus:shadow-outline-red' : 'focus:border-purple-500 focus:shadow-outline-purple'
  } rounded shadow appearance-none form-input`;

  const textInputClassName = `${commonInputClassName}`;
  const textareaInputClassName = `${commonInputClassName} form-textarea`;
  const numberInputClassName = `${commonInputClassName}`;

  const labelClassName = 'block mb-1 text-sm text-gray-700 dark:text-gray-300';
  const errorClassName = 'mt-1 block text-xs text-red-600 dark:text-red-400';

  let inputElement: JSX.Element;

  if (type === 'textarea') {
    inputElement = (
      <textarea
        className={textareaInputClassName}
        placeholder={placeholder}
        value={value}
        onChange={onChange ? (e) => onChange(e as React.ChangeEvent<HTMLTextAreaElement>) : undefined}
      />
    );
  } else if (type === 'number') {
    inputElement = (
      <input
        className={numberInputClassName}
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={onChange ? (e) => onChange(e as React.ChangeEvent<HTMLInputElement>) : undefined}
      />
    );
  } else {
    inputElement = (
      <input
        className={textInputClassName}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange ? (e) => onChange(e as React.ChangeEvent<HTMLInputElement>) : undefined}
      />
    );
  }

  return (
    <div className={inputWrapperClassName}>
      <label className={labelClassName}>{label}</label>
      {inputElement}
      {error && <span className={errorClassName}>{error}</span>}
      {success && <span className="mt-1 block text-xs text-green-600">{success}</span>}
    </div>
  );
};

export default CustomFormInput;
