import { useAuth } from '@/components/AuthProvider';
import DataRenderer from '@/components/DataRendered';
import ListingList from '@/components/ListingList';
import { Separator } from '@/components/ui';
import useData from '@/hooks/useData'; // Assuming correct path to useData
import React, { useMemo } from 'react';

const MyListingsPage = () => {
  const { userLoggedIn } = useAuth();
  const userId = userLoggedIn.uid;

  // Memoize filters to prevent unnecessary changes
  const filters = useMemo(
    () => ({
      createdBy: userId,
    }),
    [userId],
  );

  const { data: myListings, error, isLoading } = useData(filters);

  return (
    <div className='container py-4'>
      <h1 className='text-center'>My Listings</h1>
      <Separator className='my-4' />
      <DataRenderer error={error} isLoading={isLoading}>
        <ListingList listings={myListings} />
      </DataRenderer>
    </div>
  );
};

export default MyListingsPage;
