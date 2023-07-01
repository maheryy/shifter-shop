import React from 'react';
import Forms from '../../components/Forms/Forms';
import CustomFormButton from '../../components/Forms/CustomFormButton';
import CustomFormInput from '../../components/Forms/CustomFormInput';
import CustomFormImage from '@/components/Forms/CustomFormImage';
import CustomFormTitle from '@/components/Forms/CustomFormTitle';

const AddProduct: React.FC = () => {
  const handleFormSubmit = () => {
    // Handle form submit
  };

  return (
    <Forms onSubmit={handleFormSubmit}>
      {/* Form title */}
      <CustomFormTitle text="Add product" />
      <div className="mt-4 text-sm">
        {/* name */}
        <CustomFormInput type="text" label="Name" placeholder="Name of the product" />
        {/* description */}
        <CustomFormInput type="textarea" label="Desctiption" placeholder="Description of the product" />
        {/* price */}
        <CustomFormInput type="number" label="Price" placeholder="Price of the product" />
        {/* image */}
        <CustomFormImage label="Image" />
      </div>
      <div className="space-x-4">
        <CustomFormButton size="regular" label="Add" onClick={handleFormSubmit} />
      </div>
    </Forms>
  );
};

export default AddProduct;
