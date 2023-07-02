import React, { useState } from 'react';

interface CustomFormImageProps {
  label: string;
}

const CustomFormImage: React.FC<CustomFormImageProps> = ({ label }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  const imageWrapperClassName = 'relative mb-4';

  const labelClassName = 'block mb-1 text-sm text-gray-700 dark:text-gray-300';

  const inputClassName =
    'w-full px-4 py-3 leading-tight text-gray-700 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded shadow appearance-none focus:outline-none focus:border-purple-500';

  return (
    <div className={imageWrapperClassName}>
      <label className={labelClassName}>{label}</label>
      <input
        className={inputClassName}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {selectedFile && (
        <p className="mt-2 text-sm text-gray-500">{selectedFile.name}</p>
      )}
    </div>
  );
};

export default CustomFormImage;
