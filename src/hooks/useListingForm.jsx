import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '../api/uploadImage';
import {
  createListingInFirestore,
  updateListingInFirestore,
} from '../api/data/listings';
import { useAuth } from '@/components/AuthProvider';

const rentalListingSchema = z.object({
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long'),
  // images: z.array(z.string()).optional(), // Ensure it is an array of strings
  // images: z.array(z.any()).optional(),
  images: z.array(z.string().optional()).optional(),
  location: z.string().min(1, 'Location is required'),
  maxGuests: z.number().positive('Max guests must be a positive number'),
  name: z.string().min(5, 'Title must be at least 5 characters long'),
  price: z.number().positive('Price must be a positive number'),
  dates: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),
});

export const useListingForm = (initialData = {}) => {
  const [createListingError, setCreateListingError] = useState(null);
  const [imagePreviews, setImagePreviews] = useState(initialData.images || []);
  const [files, setFiles] = useState([]);
  const [dates, setDates] = useState(initialData.dates || {});
  const navigate = useNavigate();
  const { token, currentUser, userLoggedIn, loading } = useAuth();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
    setValue,
    getValues,
  } = useForm({
    resolver: zodResolver(rentalListingSchema),
    defaultValues: initialData,
  });

  const handleImageChange = (e) => {
    console.log('File input changed');

    const newFiles = Array.from(e.target.files);
    console.log('newFiles:', newFiles);

    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles, ...newFiles];
      console.log('Updated files state:', updatedFiles);
      return updatedFiles;
    });

    const newPreviews = [];
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === newFiles.length) {
          console.log('New previews before setting state:', newPreviews);
          setImagePreviews((prevPreviews) => {
            const updatedPreviews = [...prevPreviews, ...newPreviews];
            console.log('Updated imagePreviews state:', updatedPreviews);
            return updatedPreviews;
          });
          const currentImages = getValues('images') || [];
          console.log(
            'Current form images before setting new value:',
            currentImages,
          );
          setValue('images', [...currentImages, ...newPreviews]);
          console.log('Form values after setting new images:', getValues());
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImagePreview = (index) => {
    setImagePreviews((prevPreviews) => {
      const updatedPreviews = [...prevPreviews];
      updatedPreviews.splice(index, 1);
      setValue('images', updatedPreviews);
      return updatedPreviews;
    });
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  const onSubmit = async (data, isEdit = false, listingId) => {
    try {
      const userId = userLoggedIn.uid;

      // Upload only new images
      const newFiles = files.filter(
        (file) => !data.images?.includes(URL.createObjectURL(file)),
      );
      const imageUrls = await Promise.all(
        newFiles.map((file) => uploadImage(file)),
      );

      // Combine existing and new image URLs
      data.images = [...(data.images || []), ...imageUrls];

      if (isEdit) {
        await updateListingInFirestore(listingId, data);
        navigate(`/listings/${listingId}`);
      } else {
        await createListingInFirestore(data, userId);
        navigate('/my-listings');
      }
    } catch (error) {
      setCreateListingError(error.message);
    }
  };

  return {
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
  };
};
