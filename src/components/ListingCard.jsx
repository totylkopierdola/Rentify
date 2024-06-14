import React from 'react';
import { Card, CardContent } from '@/components/ui';
import { DollarSign, Pencil, Pin, Users } from 'lucide-react';
import { getImageUrl } from '@/lib/utils/images';
import ListingCardImages from '@/components/ListingCardImages';
import { Link } from 'react-router-dom';
import ListingFavoriteButton from './ListingFavoriteButton';
import { useAuth } from './AuthProvider';

const ListingCard = ({ listing }) => {
  const userId = useAuth()?.userLoggedIn?.uid;
  const isCreatedByCurrentUser = listing.createdBy === userId;

  return (
    <Link to={`/listings/${listing.id}`}>
      <Card className='group w-[320px]'>
        <div className='relative'>
          <ListingFavoriteButton
            className='absolute right-2 top-2 z-10 h-10 w-10 rounded-full border-none bg-secondary bg-opacity-0 p-2 opacity-0 transition-opacity duration-200 group-hover:bg-secondary group-hover:bg-opacity-50 group-hover:opacity-100'
            listing={listing}
          />
        </div>
        <div className='relative h-[200px] w-full'>
          {isCreatedByCurrentUser && (
            <>
              <div className='absolute left-2 top-2 z-10 rounded bg-primary px-2 py-1 text-secondary shadow-md'>
                Your listing
              </div>
              <div className='absolute bottom-2 right-2 z-20 flex h-10 w-10 scale-[0.9] items-center justify-center rounded-md bg-secondary shadow-sm duration-500 hover:scale-100 hover:transition-all'>
                <Pencil />
              </div>
            </>
          )}
          <ListingCardImages listing={listing} />
        </div>
        <CardContent className='flex flex-col gap-2 p-4'>
          <h2 className='mb-2 text-xl font-semibold'>{listing.name}</h2>
          <div className='flex items-center gap-2'>
            <DollarSign className='h-4 w-4 text-primary' />
            <span className='text-muted-foreground'>
              <span className='font-bold text-foreground'>{listing.price}</span>{' '}
              / night
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
        </CardContent>
      </Card>
    </Link>
  );
};

export default ListingCard;
