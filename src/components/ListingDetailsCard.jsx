import { DollarSign, Pin, Users } from 'lucide-react';

import { Card, Separator } from '@/components/ui';
import ListingDetailsCardImages from './ListingDetailsCardImages';
import ListingFavoriteButton from './ListingFavoriteButton';

const ListingDetailsCard = ({ listing }) => {
  return (
    <Card className='mx-auto p-4'>
      <h3 onClick={() => console.log('listing', listing)}>log listing</h3>
      <ListingDetailsCardImages listing={listing} />
      <Separator className='my-4' />
      <div className='flex flex-col gap-2'>
        <div className='relative flex '>
          <h1 className='mb-2 text-2xl font-bold'>{listing.name}</h1>
          <ListingFavoriteButton
            listing={listing}
            className='z-10 ml-2 h-9 w-9 rounded-full border-none bg-secondary bg-opacity-50 p-2 hover:bg-red-500  hover:bg-opacity-10 '
          />
        </div>
        <div className='flex items-center gap-2'>
          <DollarSign className='h-4 w-4 text-primary' />
          <span className='text-muted-foreground'>
            <span className='font-bold text-foreground'>{listing.price}</span> /
            night
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <Pin className='h-4 w-4 text-primary' />
          <span className='text-muted-foreground'>{listing.location}</span>
        </div>
        <div className='flex items-center gap-2'>
          <Users className='h-4 w-4 text-primary' />
          <span className='text-muted-foreground'>
            {listing.maxGuests} Guests
          </span>
        </div>
      </div>
      <Separator className='my-4' />
      <div className='whitespace-pre-line'>{listing.description}</div>
    </Card>
  );
};

export default ListingDetailsCard;
