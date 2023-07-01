import React, { useState } from 'react';

interface CustomFormDropdownProps {
  label: string;
  options: string[];
}

const CustomFormDropdown: React.FC<CustomFormDropdownProps> = ({ label, options }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
  };

  const dropdownWrapperClassName = 'relative mb-4';

  const labelClassName = 'block mb-1 text-sm text-gray-700 dark:text-gray-300';

  const selectClassName =
    'block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray';

  return (
    <div className={dropdownWrapperClassName}>
      <label className={labelClassName}>{label}</label>
      <select className={selectClassName} value={selectedOption} onChange={handleOptionChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomFormDropdown;
