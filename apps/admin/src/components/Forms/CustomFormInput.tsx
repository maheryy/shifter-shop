import React from 'react';

interface CustomFormInputProps {
  label: string;
  placeholder: string;
  type?: 'text' | 'textarea' | 'number'; // Ajout de la valeur 'number' pour le type
  className?: string;
}

const CustomFormInput: React.FC<CustomFormInputProps> = ({
  label,
  placeholder,
  type = 'text',
  className,
}) => {
  const inputWrapperClassName = 'relative mb-4';

  const commonInputClassName = 'w-full px-4 py-3 leading-tight text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded shadow appearance-none focus:outline-none focus:border-purple-500';
  const textInputClassName = `${commonInputClassName}`;
  const textareaInputClassName = `${commonInputClassName} form-textarea`;
  const numberInputClassName = `${commonInputClassName}`;

  const labelClassName = 'block mb-1 text-sm text-gray-700 dark:text-gray-300';

  let inputElement: JSX.Element;

  if (type === 'textarea') {
    inputElement = <textarea className={textareaInputClassName} placeholder={placeholder} />;
  } else if (type === 'number') {
    inputElement = <input className={numberInputClassName} type="number" placeholder={placeholder} />;
  } else {
    inputElement = <input className={textInputClassName} type="text" placeholder={placeholder} />;
  }

  return (
    <div className={inputWrapperClassName}>
      <label className={labelClassName}>{label}</label>
      {inputElement}
    </div>
  );
};

export default CustomFormInput;
