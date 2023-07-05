import React, { useState } from 'react';
import { TCategory } from '@shifter-shop/dictionary';

interface CustomFormDropdownProps {
  label: string;
  options: TCategory[];
  onChange: (category: string) => void;
  error?: string;
  success?: string;
}

const CustomFormDropdown: React.FC<CustomFormDropdownProps> = ({
  label,
  options,
  onChange,
  error,
  success,
}) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    onChange(selectedValue); // Appelez la fonction onChange avec la valeur sélectionnée (chaîne de caractères)
  };

  const dropdownWrapperClassName = 'relative mb-4';
  const labelClassName = 'block mb-1 text-sm text-gray-700 dark:text-gray-300';
  const selectClassName =
    'block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray';
  const errorClassName = 'mt-1 block text-sm text-red-600';
  const successClassName = 'mt-1 block text-sm text-green-600';

  const selectWrapperClassName = error ? `${dropdownWrapperClassName} border-red-600` : dropdownWrapperClassName;

  return (
    <div className={selectWrapperClassName}>
      <label className={labelClassName}>{label}</label>
      <select className={selectClassName} value={selectedOption} onChange={handleOptionChange}>
        {options.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {error && <span className={`${errorClassName} form-input`}>{error}</span>}
      {success && <span className={`${successClassName} form-input`}>{success}</span>}
    </div>
  );
};

export default CustomFormDropdown;