import { getListingDataFromFirestore } from '@/api/data/listings';
import { useEffect, useState } from 'react';
import { Spinner } from '@/components/ui';
import { useParams } from 'react-router-dom';
import useData from '@/hooks/useData';

import ListingDetailsCard from '@/components/ListingDetailsCard';

const ListingDetailsPage = () => {
  const params = useParams();
  const listingId = params.listingId;

  const { data: listing, error, isLoading } = useData(listingId);

  const renderListing = () => {
    if (isLoading) {
      return (
        <div className='flex justify-center'>
          <Spinner size='sm' />
        </div>
      );
    }

    if (error) {
      return <div className='text-center text-red-500'>{error}</div>;
    }
  };

  return (
    <div className='container py-4'>
      <h1 onClick={() => console.log(listingId)}>{listingId}</h1>
      <h1>{error}</h1>
      <button onClick={() => console.log(listing)}>zxc</button>
      <div className='mb-4'>
        <ListingDetailsCard listing={listing} />
        <button onClick={() => console.log('listing', listing)}>zxcxxxx</button>
      </div>
      {renderListing()}
    </div>
  );
};

export default ListingDetailsPage;
