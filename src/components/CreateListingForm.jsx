import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  DateRangePicker,
  Input,
  Separator,
} from '@/components/ui';
import { Textarea } from './ui/Textarea';
import { Label } from './ui/Label';
import { createListingInFirestore } from '../api/data/listings';
import { useAuth } from './AuthProvider';
import { uploadImage } from '../api/uploadImage';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { X } from 'lucide-react';

// Define the schema for the rental listing form data
const rentalListingSchema = z.object({
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long'),
  images: z.array(z.string()).optional(),
  location: z.string().min(1, 'Location is required'),
  maxGuests: z.number().positive('Max guests must be a positive number'),
  name: z.string().min(5, 'Title must be at least 5 characters long'),
  price: z.number().positive('Price must be a positive number'),
  // dates are optional
  dates: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }),
});

const CreateListingForm = () => {
  const [createListingError, setCreateListingError] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [files, setFiles] = useState([]);
  const [dates, setDates] = useState();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
    setValue,
    getValues,
  } = useForm({
    resolver: zodResolver(rentalListingSchema),
  });
  const navigate = useNavigate();

  const { token, currentUser, userLoggedIn, loading } = useAuth();

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(newFiles); // Update files state

    const newPreviews = [];
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === newFiles.length) {
          setImagePreviews([...imagePreviews, ...newPreviews]); // Update image previews state
          setValue('images', [...imagePreviews, ...newPreviews]); // Update form value
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (data) => {
    try {
      const userId = userLoggedIn.uid;
      const imageUrls = await Promise.all(
        files.map((file) => uploadImage(file)),
      );
      data.images = [...data.images, ...imageUrls];
      await createListingInFirestore(data, userId);
      navigate('/my-listings');
    } catch (error) {
      setCreateListingError(error.message);
    }
  };

  return (
    <Card className='mx-auto w-full max-w-lg'>
      <CardHeader>
        <h2 className='text-center text-2xl'>Create Rental Offer</h2>
        <Separator />
      </CardHeader>
      <CardContent>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor='name'>Title</Label>
            <Input
              id='name'
              {...register('name')}
              placeholder='Title of the apartment listing'
            />
            {errors['name'] && (
              <div className='mt-2 text-sm text-red-500'>
                {errors['name'].message}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              {...register('description')}
              placeholder='Describe the apartment listing'
            />
            {errors['description'] && (
              <div className='mt-2 text-sm text-red-500'>
                {errors['description'].message}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor='location'>Location</Label>
            <Input
              id='location'
              {...register('location')}
              placeholder='Location of the apartment'
            />
            {errors['location'] && (
              <div className='mt-2 text-sm text-red-500'>
                {errors['location'].message}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor='maxGuests'>Max Guests</Label>
            <Input
              id='maxGuests'
              {...register('maxGuests', { valueAsNumber: true })}
              type='number'
              placeholder='Max Guests'
            />
            {errors['maxGuests'] && (
              <div className='mt-2 text-sm text-red-500'>
                {errors['maxGuests'].message}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor='price'>Price</Label>
            <Input
              id='price'
              {...register('price', { valueAsNumber: true })}
              type='number'
              placeholder='Price for a night (USD)'
            />
            {errors['price'] && (
              <div className='mt-2 text-sm text-red-500'>
                {errors['price'].message}
              </div>
            )}
          </div>

          {/* FILE UPLOAD */}
          <div className=''>
            <Label htmlFor='pictures'>Pictures</Label>
            <Input
              id='pictures'
              type='file'
              multiple
              onChange={handleImageChange}
            />
            {errors['images'] && (
              <div className='mt-2 text-sm text-red-500'>
                {errors['images'].message}
              </div>
            )}
          </div>

          <div className='flex flex-wrap gap-4'>
            {imagePreviews.map((preview, index) => (
              <div key={`${preview}-${index}`} className='relative'>
                <img
                  key={index}
                  src={preview}
                  alt={`Preview ${index}`}
                  className='h-16 w-16 rounded object-cover lg:h-32 lg:w-32'
                />
                <Dialog>
                  <DialogTrigger>
                    <X className='absolute right-0 top-0 cursor-pointer shadow-2xl hover:scale-110 hover:text-red-500' />{' '}
                  </DialogTrigger>
                  <DialogContent className='w-[90%] lg:w-auto'>
                    <DialogHeader>
                      <DialogTitle>Are you sure?</DialogTitle>
                      <DialogDescription>
                        Removing image cannot be undone. <br />
                        This will permanently delete the image from database.
                      </DialogDescription>
                    </DialogHeader>
                    <div className='flex flex-row justify-center gap-1'>
                      <Button
                        variant='destructive'
                        className='w-full lg:w-40'
                        onClick={() => removeImagePreview(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
          <DateRangePicker
            mode='range'
            value={dates || {}}
            onChange={(newDates) => {
              setDates(newDates);
              setValue('dates', newDates);
            }}
            minDate={new Date()}
            placeholder='Add dates'
            disabled={isSubmitting}
          />
          {errors['dates'] && (
            <div className='mt-2 text-sm text-red-500'>
              {errors['dates'].message}
            </div>
          )}

          <Button disabled={isSubmitting} type='submit'>
            Create Listing
          </Button>

          {createListingError && (
            <div className='text-center text-sm text-red-500'>
              {createListingError}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateListingForm;
