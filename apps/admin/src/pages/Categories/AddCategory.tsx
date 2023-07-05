import React, { ChangeEvent, useState } from "react";
import Forms from "../../components/Forms/Forms";
import CustomFormButton from "../../components/Forms/CustomFormButton";
import CustomFormInput from "../../components/Forms/CustomFormInput";
import CustomFormTitle from "@/components/Forms/CustomFormTitle";
import { createCategory } from "@/api/category.api";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");

  const handleFormSubmit = async () => {
    try {
      const newCategory = {
        name: categoryName,
      };

      await createCategory(newCategory);

      // Handle success, such as showing a success message or redirecting to another page
    } catch (error) {
      console.log(error);
      // Handle error, such as showing an error message
    }
  };

  const handleCategoryNameChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCategoryName(e.target.value);
  };

  return (
    <Forms onSubmit={handleFormSubmit}>
      {/* Form title */}
      <CustomFormTitle text="Add Category" />
      <div className="mt-4 text-sm">
        {/* name */}
        <CustomFormInput
          type="text"
          label="Name"
          placeholder="Name of the new Category"
          value={categoryName}
          onChange={handleCategoryNameChange}
        />
      </div>
      <div className="space-x-4">
        <CustomFormButton size="regular" label="Add" />
      </div>
    </Forms>
  );
};

export default AddCategory;
