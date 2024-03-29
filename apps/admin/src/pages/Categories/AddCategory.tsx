import React, { ChangeEvent, useState } from "react";
import Forms from "../../components/Forms/Forms";
import CustomFormButton from "../../components/Forms/CustomFormButton";
import CustomFormInput from "../../components/Forms/CustomFormInput";
import CustomFormTitle from "@/components/Forms/CustomFormTitle";
import { createCategory, getAllCategories } from "@/api/category.api";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const categoryExists = async (categoryName: string): Promise<boolean> => {
    const categories = await getAllCategories();
    return categories.some((category) => category.name === categoryName);
  };

  const handleFormSubmit = async () => {
    try {
      const exists = await categoryExists(categoryName);
      if (exists) {
        setErrorMessage("Cette catégorie existe déjà.");
        setSuccessMessage("");
        return;
      }

      const newCategory = {
        name: categoryName,
      };

      await createCategory(newCategory);
      setSuccessMessage("La catégorie a été ajoutée avec succès !");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        "Une erreur s'est produite lors de l'ajout de la catégorie. Veuillez réessayer."
      );
      setSuccessMessage("");
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
          error={errorMessage}
          success={successMessage}
        />
      </div>
      <div className="space-x-4">
        <CustomFormButton size="regular" label="Add" />
      </div>
    </Forms>
  );
};

export default AddCategory;
