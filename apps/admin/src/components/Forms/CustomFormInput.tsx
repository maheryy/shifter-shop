import React, { ChangeEvent, TextareaHTMLAttributes } from 'react';

interface CustomFormInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  placeholder: string;
  type?: 'text' | 'textarea' | 'number';
  className?: string;
  value: string; // Ajout de la prop value avec le type string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}


const CustomFormInput: React.FC<CustomFormInputProps> = ({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  className,
}) => {
  const inputWrapperClassName = 'relative mb-4';

  const commonInputClassName =
    'w-full px-4 py-3 leading-tight text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded shadow appearance-none focus:outline-none focus:border-purple-500';
  const textInputClassName = `${commonInputClassName}`;
  const textareaInputClassName = `${commonInputClassName} form-textarea`;
  const numberInputClassName = `${commonInputClassName}`;

  const labelClassName = 'block mb-1 text-sm text-gray-700 dark:text-gray-300';

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
    </div>
  );
};

export default CustomFormInput;
