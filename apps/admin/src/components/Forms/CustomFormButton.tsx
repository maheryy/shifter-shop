import React from 'react';

interface CustomFormButton {
  size: 'large' | 'regular' | 'small';
  label: string;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomFormButton> = ({ size, label, onClick }) => {
  let buttonClassName = 'font-medium leading-5 text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-purple';
  
  if (size === 'large') {
    buttonClassName += ' px-10 py-4 bg-purple-600 active:bg-purple-600 hover:bg-purple-700';
  } else if (size === 'regular') {
    buttonClassName += ' px-5 py-3 bg-purple-600 active:bg-purple-600 hover:bg-purple-700';
  } else if (size === 'small') {
    buttonClassName += ' px-4 py-2 text-sm bg-purple-600 active:bg-purple-600 hover:bg-purple-700';
  }

  return (
    <button className={buttonClassName} onClick={onClick}>
      {label}
    </button>
  );
};

export default CustomButton;
