import React from 'react';

interface FormsProps {
  onSubmit: () => void;
  children: React.ReactNode;
}

const Forms: React.FC<FormsProps> = ({ onSubmit, children }) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Do something with the form data
    onSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {/* Permet de respecter le dark mode */}
      <div className="px-4 py-3 mb-8 bg-white shadow-md dark:bg-gray-800">
        {/* Children components */}
        {children}
      </div>
    </form>
  );
};

export default Forms;
