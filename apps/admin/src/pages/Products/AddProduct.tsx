import React, { ChangeEvent, useEffect, useState } from 'react';
import Forms from '../../components/Forms/Forms';
import CustomFormButton from '../../components/Forms/CustomFormButton';
import CustomFormInput from '../../components/Forms/CustomFormInput';
import CustomFormTitle from '@/components/Forms/CustomFormTitle';
import CustomFormDropdown from '@/components/Forms/CustomFormDropdown';
import { createProduct } from '@/api/product.api';
import { getAllCategories } from '@/api/category.api';
import { TCategory } from '@shifter-shop/dictionary';

const AddProduct: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState<TCategory | undefined>(undefined);

  const handleFormSubmit = async () => {
    try {
      const newProduct: {
        name: string;
        description: string;
        price: number;
        categoryId: string | undefined;
      } = {
        name: productName,
        description: productDescription,
        price: parseFloat(productPrice),
        categoryId: productCategory?.id,
      };
      
      await createProduct(newProduct);
  
      // Handle success, such as showing a success message or redirecting to another page
    } catch (error) {
      console.log(error);
      // Handle error, such as showing an error message
    }
  };
  

  const handleProductNameChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductName(e.target.value);
  };

  const handleProductDescriptionChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductDescription(e.target.value);
  };

  const handleProductPriceChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductPrice(e.target.value);
  };

  const handleProductCategoryChange = (category: string) => {
    const selectedCategory = options.find((option) => option.id === category);
    if (selectedCategory) {
      setProductCategory(selectedCategory);
    }
  };

  const [categories, setCategories] = useState<TCategory[]>([]);
  useEffect(() => {
    getAllCategories()
      .then((categories) => {
        setCategories(categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const options = Object.values(categories);

  return (
    <Forms onSubmit={handleFormSubmit}>
      {/* Form title */}
      <CustomFormTitle text="Add product" />
      <div className="mt-4 text-sm">
        {/* name */}
        <CustomFormInput
          type="text"
          label="Name"
          placeholder="Name of the product"
          value={productName}
          onChange={handleProductNameChange}
        />
        {/* description */}
        <CustomFormInput
          type="textarea"
          label="Description"
          placeholder="Description of the product"
          value={productDescription}
          onChange={handleProductDescriptionChange}
        />
        {/* price */}
        <CustomFormInput
          type="number"
          label="Price"
          placeholder="Price of the product"
          value={productPrice}
          onChange={handleProductPriceChange}
        />
        {/* category */}
        <CustomFormDropdown label="Category" options={options} onChange={handleProductCategoryChange} />
      </div>
      <div className="space-x-4">
        <CustomFormButton size="regular" label="Add" />
      </div>
    </Forms>
  );
};

export default AddProduct;
