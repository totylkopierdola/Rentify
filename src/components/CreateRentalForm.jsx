import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Separator,
} from '@/components/ui'; // Assuming you have UI components for input fields, buttons, etc.
import { Textarea } from '../components/ui/Textarea';
import { Label } from '../components/ui/Label';
import { createListingInFirestore } from '../api/data/listings'; // Import the function to create a listing in Firestore
import { useAuth } from './AuthProvider';

// Define the schema for the rental listing form data
const rentalListingSchema = z.object({
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long'),
  // images: z.array(z.string()).nonempty('At least one image is required'),
  location: z.string().nonempty('Location is required'),
  maxGuests: z.number().positive('Max guests must be a positive number'),
  name: z.string().min(5, 'Title must be at least 5 characters long'),
  price: z.number().positive('Price must be a positive number'),
});

const CreateRentalForm = () => {
  const [createListingError, setCreateListingError] = useState(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm({
    resolver: zodResolver(rentalListingSchema),
  });

  const { token, currentUser, userLoggedIn, loading } = useAuth();

  const onSubmit = async (data) => {
    try {
      // Handle submission of rental listing data
      const userId = userLoggedIn.uid;

      const listingId = await createListingInFirestore(data, userId);
      console.log('Listing created with ID:', listingId);

      console.log(data);
    } catch (error) {
      setCreateListingError(error.message);
    }
  };

  return (
    <div className='container flex  items-center py-4'>
      <Card className='mx-auto w-[500px]'>
        <CardHeader>
          <h2
            className='text-center text-2xl'
            onClick={() =>
              console.log('userLoggedIn', userLoggedIn, 'uid', userLoggedIn.uid)
            }
          >
            Create Rental Offer
          </h2>
          <Separator />
        </CardHeader>
        <CardContent>
          <form
            className='flex flex-col gap-4'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Label htmlFor='name' className=''>
                Title
              </Label>
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
            {/* 
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='pictures'>Pictures</Label>
            <Input id='pictures' type='file' multiple {...register('images')} />
            {errors['images'] && (
              <div className='mt-2 text-sm text-red-500'>
                {errors['images'].message}
              </div>
            )}
          </div> */}

            <Button disabled={isSubmitting} type='submit'>
              {isSubmitting ? 'Creating...' : 'Create Offer'}
            </Button>

            {createListingError && (
              <div className='text-center text-sm text-red-500'>
                {createListingError}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateRentalForm;
