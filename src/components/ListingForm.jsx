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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { X } from 'lucide-react';

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
            onChange={handleImageChange}
          />
          {errors.images && (
            <div className='mt-2 text-sm text-red-500'>
              {errors.images.message}
            </div>
          )}
        </div>

        {/* <div className='flex flex-wrap gap-x-4'> */}
        <div className='relative grid grid-cols-3 gap-2'>
          {imagePreviews.map((preview, index) => (
            <div key={`${preview}-${index}`} className='relative'>
              <img
                src={preview}
                alt={`Preview ${index}`}
                className='h-full w-full rounded object-cover'
              />
              <Dialog>
                <DialogTrigger>
                  <X className='absolute right-0 top-0 cursor-pointer shadow-2xl hover:scale-110 hover:text-red-500' />
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

        <div>
          <Label htmlFor='availability'>Availability</Label>
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
