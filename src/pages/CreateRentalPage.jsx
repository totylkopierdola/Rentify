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
  // Textarea,
  // Label,
  // ImageUploader,
} from '@/components/ui'; // Assuming you have UI components for input fields, buttons, etc.
import { Link } from 'react-router-dom';
import { Textarea } from '../components/ui/Textarea';
import { Label } from '../components/ui/Label';

// Define the schema for the rental listing form data
const rentalListingSchema = z.object({
  availability: z.object({
    from: z.string(),
    to: z.string(),
    createdAt: z.string(),
  }),
  description: z.string(),
  guestFavorite: z.boolean(),
  id: z.number(),
  images: z.array(z.string()),
  location: z.string(),
  maxGuests: z.number(),
  modifiedAt: z.string(),
  name: z.string(),
  price: z.number(),
  rating: z.number(),
});

const CreateRentalPage = () => {
  const [createListingError, setCreateListingError] = useState(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm({
    resolver: zodResolver(rentalListingSchema),
  });

  const onSubmit = async (data) => {
    // Handle submission of rental listing data
    console.log(data);
  };

  return (
    <Card className='mx-auto mt-10 w-[500px]'>
      <CardHeader>
        <h2 className='text-center text-2xl'>Create Rental Listing</h2>
        <Separator />
      </CardHeader>
      <CardContent>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
          {/* Add input fields for other properties in a similar manner */}
          {/* Example: */}
          <div>
            <Textarea {...register('description')} placeholder='Description' />
            {/* Add error handling for 'description' if needed */}
          </div>

          <div>
            <Input {...register('location')} placeholder='Location' />
            {/* Add error handling for 'location' if needed */}
          </div>

          {/* Add input fields for other properties */}
          {/* Example: */}

          <div>
            <Input
              {...register('maxGuests')}
              type='number'
              placeholder='Max Guests'
            />
            {/* Add error handling for 'price' if needed */}
          </div>

          <div>
            <Input {...register('price')} type='number' placeholder='Price' />
            {/* Add error handling for 'price' if needed */}
          </div>

          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='picture'>Picture</Label>
            <Input id='picture' type='file' />
          </div>

          <Button disabled={isSubmitting} type='submit'>
            {isSubmitting ? 'Creating...' : 'Create Listing'}
          </Button>

          {/* Add error display for any general form submission error */}
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

export default CreateRentalPage;
