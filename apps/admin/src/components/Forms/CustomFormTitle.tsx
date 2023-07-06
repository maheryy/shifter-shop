import React from 'react';

interface CustomFormTitle {
  text: string;
}

const FormTitle: React.FC<CustomFormTitle> = ({ text }) => {
  return (
    <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
      {text}
    </h4>
  );
};

export default FormTitle;
