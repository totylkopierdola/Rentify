import ListingList from '@/components/ListingList';
import {
  isListingAvailable,
  listings as staticListings,
} from '@/api/data/listings';
import { useState } from 'react';
import ListingFilters from '@/components/ListingFilters';
import { Separator } from '@/components/ui';

const HomePage = () => {
  const [listings, setListings] = useState(staticListings);

  const handleFilters = (filters) => {
    const { dates, guests, search } = filters;

    let filteredListings = staticListings;

    if (dates) {
      filteredListings = filteredListings.filter((listing) =>
        isListingAvailable(listing, dates),
      );
    }

    if (guests) {
      filteredListings = filteredListings.filter(
        (listing) => guests <= listing.maxGuests,
      );
    }

    if (search) {
      filteredListings = filteredListings.filter((listing) =>
        listing.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setListings(filteredListings);
  };

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      <ListingList listings={listings} />
    </div>
  );
};

export default HomePage;
