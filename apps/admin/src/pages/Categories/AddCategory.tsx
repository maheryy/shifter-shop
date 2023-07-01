import Forms from '../../components/Forms/Forms';
import CustomFormButton from '../../components/Forms/CustomFormButton';
import CustomFormInput from '../../components/Forms/CustomFormInput';
import CustomFormTitle from '@/components/Forms/CustomFormTitle';

const AddCategory = () => {

  const handleFormSubmit = () => {
    // Handle form submit
  };

  return (
    <Forms onSubmit={handleFormSubmit}>
      {/* Form title */}
      <CustomFormTitle text="Add Category" />
      <div className="mt-4 text-sm">
        {/* name */}
        <CustomFormInput type="text" label="Name" placeholder="Name of the new Category" />
      </div>
      <div className="space-x-4">
        <CustomFormButton size="regular" label="Add" onClick={handleFormSubmit} />
      </div>
    </Forms>
  );
};
export default AddCategory;