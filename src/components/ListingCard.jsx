import React from 'react';
import { Button, Card, CardContent } from '@/components/ui';
import { DollarSign, Pencil, Pin, Users, X } from 'lucide-react';
import ListingCardImages from '@/components/ListingCardImages';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ListingFavoriteButton from './ListingFavoriteButton';
import { useAuth } from './AuthProvider';

const ListingCard = ({ listing }) => {
  const userId = useAuth()?.userLoggedIn?.uid;
  const isCreatedByCurrentUser = listing.createdBy === userId;
  const navigate = useNavigate();
  // get url using hook
  const isMyListingsPage = useLocation().pathname.startsWith('/my-listings');

  const handlePencilClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/listings/${listing.id}/edit`);
  };

  return (
    <Card className='group w-[320px]'>
      <div className='relative'>
        {/* i need X button here to remove the selected listing */}
        <div
          className='absolute right-2 top-2 z-10 flex h-6 w-6 items-center rounded-full border-none bg-opacity-0 p-1 transition-all hover:cursor-pointer hover:bg-secondary hover:bg-opacity-80 hover:text-red-500'
          onClick={() => alert('remove?')}
        >
          <X className='h-6 w-6 ' />
        </div>
      </div>
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
                <>
                  <div
                    onClick={handlePencilClick}
                    className='absolute bottom-2 right-2 z-20 flex h-10 w-10 scale-[0.9] items-center justify-center rounded-md bg-secondary bg-opacity-80 shadow-sm duration-500 hover:scale-100 hover:transition-all'
                  >
                    <Pencil />
                  </div>
                </>
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
