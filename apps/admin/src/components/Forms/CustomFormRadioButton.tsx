import React from 'react';

interface CustomFormRadioButton {
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
}

const CustomRadioButton: React.FC<CustomFormRadioButton> = ({ value, label, checked, onChange }) => {
  const handleChange = () => {
    onChange(value);
  };

  return (
    <label className="inline-flex items-center text-gray-600 dark:text-gray-400">
      <input
        type="radio"
        className="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
        name="accountType"
        value={value}
        checked={checked}
        onChange={handleChange}
      />
      <span className="ml-2">{label}</span>
    </label>
  );
};

export default CustomRadioButton;
