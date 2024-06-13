import { getListingDataFromFirestore } from '@/api/data/listings';
import { useEffect, useState } from 'react';
import { Spinner } from '@/components/ui';
import { useParams } from 'react-router-dom';
import useData from '@/hooks/useData';

import ListingDetailsCard from '@/components/ListingDetailsCard';
import DataRenderer from '@/components/DataRendered';

const ListingDetailsPage = () => {
  const params = useParams();
  const listingId = params.listingId;

  const { data: listing, error, isLoading } = useData(listingId);

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <DataRenderer error={error} isLoading={isLoading}>
          <ListingDetailsCard listing={listing} />
        </DataRenderer>
      </div>
    </div>
  );
};

export default ListingDetailsPage;
