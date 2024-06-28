import React from 'react';
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
import { X } from 'lucide-react';
import ConfirmationDialog from '../components/ConfirmationDialog';

const ListingForm = ({
  title,
  onSubmit,
  handleSubmit,
  register,
  errors,
  isSubmitting,
  imagePreviews,
  handleImageChange,
  removeImagePreview,
  dates,
  setDates,
  setValue,
  createListingError,
}) => (
  <Card className='mx-auto w-full max-w-lg'>
    <CardHeader>
      <h2 className='text-center text-2xl'>{title}</h2>
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
          {errors.name && (
            <div className='mt-2 text-sm text-red-500'>
              {errors.name.message}
            </div>
          )}
        </div>

        <div>
          <Label htmlFor='description'>Description</Label>
          <Textarea
            className='max-h-[300px]'
            id='description'
            {...register('description')}
            placeholder='Describe the apartment listing'
          />
          {errors.description && (
            <div className='mt-2 text-sm text-red-500'>
              {errors.description.message}
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
          {errors.location && (
            <div className='mt-2 text-sm text-red-500'>
              {errors.location.message}
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
            className='appearance-none'
          />
          {errors.maxGuests && (
            <div className='mt-2 text-sm text-red-500'>
              {errors.maxGuests.message}
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
          {errors.price && (
            <div className='mt-2 text-sm text-red-500'>
              {errors.price.message}
            </div>
          )}
        </div>

        <div>
          <Label htmlFor='pictures'>Pictures</Label>
          <Input
            id='pictures'
            type='file'
            multiple
            onChange={(e) => {
              handleImageChange(e);
              console.log('Image input changed');
            }}
            {...register('images', {
              onChange: handleImageChange,
            })}
          />
          {/* on click log uploaded images */}
          <button type='button' onClick={() => console.log(imagePreviews)}>
            log
          </button>
          {errors.images && (
            <div className='mt-2 text-sm text-red-500'>
              {errors.images.message}
            </div>
          )}
        </div>

        <div className='relative grid grid-cols-3 gap-2'>
          {imagePreviews.map((preview, index) => (
            <div key={`${preview}-${index}`} className='relative'>
              <img
                src={preview}
                alt={`Preview ${index}`}
                className='h-full w-full rounded object-cover'
              />
              <ConfirmationDialog
                trigger={
                  <X className='absolute right-0 top-0 cursor-pointer shadow-2xl hover:scale-110 hover:text-red-500' />
                }
                title='Are you sure?'
                description='Removing image cannot be undone. This will permanently delete the image from database.'
                confirmLabel='Remove'
                onConfirm={() => removeImagePreview(index)}
              />
            </div>
          ))}
        </div>

        <div>
          <Label htmlFor='availability'>
            Availability <span className='font-extralight'>(optional)</span>
          </Label>
          <DateRangePicker
            id='availability'
            mode='range'
            value={dates}
            onChange={(newDates) => {
              setDates(newDates);
              setValue('dates', newDates);
            }}
            minDate={new Date()}
            placeholder='Add dates'
            disabled={isSubmitting}
          />
        </div>
        {errors.dates && (
          <div className='mt-2 text-sm text-red-500'>
            {errors.dates.message}
          </div>
        )}

        <Separator className='mt-5' />

        <Button disabled={isSubmitting} type='submit'>
          {title}
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

export default ListingForm;
