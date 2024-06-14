import { useAuth } from '@/components/AuthProvider';
import DataRenderer from '@/components/DataRendered';
import ListingList from '@/components/ListingList';
import { getListings } from '@/state/listings/listingsSlice';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MyListingsPage = () => {
  const { listings, error, status } = useSelector((state) => state.listings);
  const userId = useAuth().userLoggedIn.uid;
  console.log(userId);
  const [myListings, setMyListings] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const filters = {
      createdBy: userId,
    };
    dispatch(getListings(filters));
  }, [userId]);

  useMemo(() => {
    setMyListings(listings.filter((listing) => listing.createdBy === userId));
  }, [listings]);

  return (
    <div className='container py-4'>
      <DataRenderer error={error} isLoading={status === 'loading'}>
        <ListingList listings={myListings} />
      </DataRenderer>
    </div>
  );
};

export default MyListingsPage;
