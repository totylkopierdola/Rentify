import React from 'react';
import { Card, CardContent } from '@/components/ui';
import { DollarSign, Pencil, Pin, Users, X } from 'lucide-react';
import ListingCardImages from '@/components/ListingCardImages';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ListingFavoriteButton from './ListingFavoriteButton';
import { useAuth } from './AuthProvider';
import { deleteListingById } from '@/api/data/listings';
import ConfirmationDialog from '../components/ConfirmationDialog';

const ListingCard = ({ listing }) => {
  const userId = useAuth()?.userLoggedIn?.uid;
  const isCreatedByCurrentUser = listing.createdBy === userId;
  const navigate = useNavigate();
  const isMyListingsPage = useLocation().pathname.startsWith('/my-listings');

  const handlePencilClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/listings/${listing.id}/edit`);
  };

  return (
    <Card className='group relative w-[320px]'>
      {!isMyListingsPage && (
        <div className='relative'>
          <ListingFavoriteButton
            className='absolute right-2 top-2 z-10 h-10 w-10 rounded-full border-none bg-secondary bg-opacity-0 p-2 opacity-0 transition-opacity duration-200 group-hover:bg-secondary group-hover:bg-opacity-50 group-hover:opacity-100'
            listing={listing}
          />
        </div>
      )}
      {isMyListingsPage && (
        <ConfirmationDialog
          trigger={
            <div className='absolute right-2 top-2 z-10 flex h-6 w-6 items-center rounded-full border-none bg-opacity-0 p-1 transition-all hover:cursor-pointer hover:bg-secondary hover:bg-opacity-80 hover:text-red-500'>
              <X className='h-6 w-6 ' />
            </div>
          }
          title='Do you want to remove that listing?'
          description='This will permanently delete the listing from database.'
          confirmLabel='Remove'
          onConfirm={async () => {
            // delete the listing and after deletion, navigate to the first page
            // deleteListingById(listing.id);
            // navigate(0);
            await deleteListingById(listing.id);
            navigate(0);
          }}
        />
      )}
      <Link to={`/listings/${listing.id}`}>
        <div className='relative h-[200px] w-full'>
          {isCreatedByCurrentUser && (
            <>
              {!isMyListingsPage && (
                <div className='absolute left-2 top-2 z-10 rounded bg-primary px-2 py-1 text-secondary opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100'>
                  Your listing
                </div>
              )}
              {isMyListingsPage && (
                <div
                  onClick={handlePencilClick}
                  className='absolute bottom-2 right-2 z-20 flex h-10 w-10 scale-[0.9] items-center justify-center rounded-md bg-secondary bg-opacity-80 shadow-sm duration-500 hover:scale-100 hover:transition-all'
                >
                  <Pencil />
                </div>
              )}
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
      </Link>
    </Card>
  );
};

export default ListingCard;
