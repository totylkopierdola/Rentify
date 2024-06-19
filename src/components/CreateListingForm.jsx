import React from 'react';
import ListingForm from './ListingForm';
import { useListingForm } from '@/hooks/useListingForm';

const CreateListingForm = () => {
  const {
    createListingError,
    imagePreviews,
    dates,
    setDates,
    setValue,
    handleImageChange,
    removeImagePreview,
    handleSubmit,
    register,
    errors,
    isSubmitting,
    onSubmit,
  } = useListingForm();

  return (
    <ListingForm
      title='Create Listing'
      onSubmit={handleSubmit((data) => onSubmit(data))}
      handleSubmit={handleSubmit}
      register={register}
      errors={errors}
      isSubmitting={isSubmitting}
      imagePreviews={imagePreviews}
      handleImageChange={handleImageChange}
      removeImagePreview={removeImagePreview}
      dates={dates}
      setDates={setDates}
      setValue={setValue}
      createListingError={createListingError}
    />
  );
};

export default CreateListingForm;
