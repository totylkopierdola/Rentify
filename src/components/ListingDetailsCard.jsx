import { CalendarRange, DollarSign, Pencil, Pin, Users } from 'lucide-react';
import { Button, Card, Separator } from '@/components/ui';
import ListingDetailsCardImages from './ListingDetailsCardImages';
import ListingFavoriteButton from './ListingFavoriteButton';
import { convertTimestampToDate } from '@/api/helpers';
import { useEffect } from 'react';
import { formatDate } from '@/api/helpers';
import { useAuth } from './AuthProvider';
import { Link } from 'react-router-dom';

const ListingDetailsCard = ({ listing, isEditable }) => {
  const availability = {};
  if (listing.dates) {
    availability.from = convertTimestampToDate(listing.dates.from);
    availability.to = convertTimestampToDate(listing.dates.to);
  }

  const userId = useAuth().userLoggedIn.uid;
  const isCreatedByCurrentUser = listing.createdBy === userId;

  return (
    <Card className='mx-auto p-4'>
      <div className='relative flex items-center '>
        <h1 className='mb-2 font-bold'>{listing.name}</h1>
        <div className='flex flex-row'>
          <ListingFavoriteButton
            listing={listing}
            className='z-10 ml-2 h-9 w-9 rounded-full border-none bg-secondary bg-opacity-50 p-2 hover:bg-destructive  hover:bg-opacity-10 '
          />
          {/* edit button */}
          {isCreatedByCurrentUser && (
            <Link to={`/listings/${listing.id}/edit`}>
              <Button variant='secondary' className='ml-2 '>
                Edit Offer
                <Pencil className='ml-2 h-4 w-4 ' />
              </Button>
            </Link>
          )}
        </div>
      </div>
      <Separator className='my-4' />

      <ListingDetailsCardImages listing={listing} />
      <Separator className='my-4' />
      <div className='flex flex-col gap-2'>
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
        {/* section for dates availability */}
        {listing.dates && (
          <div className='flex items-center gap-2'>
            <span className='font-medium text-muted-foreground'>
              <CalendarRange className='h-4 w-4 text-primary' />
            </span>
            <span className='text-muted-foreground'>
              {`${formatDate(availability.from)} - ${formatDate(
                availability.to,
              )}`}
            </span>
          </div>
        )}
      </div>
      <Separator className='my-4' />
      <div className='whitespace-pre-line'>{listing.description}</div>
    </Card>
  );
};

export default ListingDetailsCard;
