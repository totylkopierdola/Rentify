import React, { useEffect } from 'react';
import ListingForm from './ListingForm';
import { useParams } from 'react-router-dom';
import { useListingForm } from '@/hooks/useListingForm';
import useData from '@/hooks/useData';
import { convertTimestampToDate } from '@/api/helpers';
import DataRenderer from './DataRendered';

const EditListingForm = () => {
  const { listingId } = useParams();
  console.log('listingId', listingId);
  const { data: listingData, error } = useData(listingId); // Fetch initial listing data
  console.log('listingData', listingData);
  const {
    createListingError,
    imagePreviews,
    setImagePreviews,
    dates,
    setDates,
    handleImageChange,
    removeImagePreview,
    handleSubmit,
    register,
    errors,
    isSubmitting,
    onSubmit,
    setValue,
  } = useListingForm(listingData);

  const fromDate = convertTimestampToDate(listingData.dates?.from);
  const toDate = convertTimestampToDate(listingData.dates?.to);

  useEffect(() => {
    if (listingData) {
      setValue('name', listingData.name);
      setValue('description', listingData.description);
      setValue('location', listingData.location);
      setValue('maxGuests', listingData.maxGuests);
      setValue('price', listingData.price);

      const dates = { from: fromDate, to: toDate };
      setValue('dates', dates);
      setDates(dates);

      if (listingData.images) {
        setImagePreviews(listingData.images);
        setValue('images', listingData.images);
      }
    }
  }, [listingData, setValue]);

  return (
    <div className='flex w-full items-center justify-center'>
      <DataRenderer
        data={listingData}
        error={createListingError}
        isLoading={isSubmitting}
      >
        <ListingForm
          title='Edit Listing'
          onSubmit={handleSubmit((data) => onSubmit(data, true, listingId))}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          imagePreviews={imagePreviews}
          handleImageChange={handleImageChange}
          removeImagePreview={removeImagePreview}
          dates={dates}
          setDates={setDates}
          createListingError={createListingError}
          setValue={setValue}
        />
      </DataRenderer>
    </div>
  );
};

export default EditListingForm;
