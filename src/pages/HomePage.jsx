import ListingList from '@/components/ListingList';
import { useCallback, useEffect, useState } from 'react';
import ListingFilters from '@/components/ListingFilters';
import { Separator } from '@/components/ui';
// import useData from '@/hooks/useData';
import DataRenderer from '@/components/DataRendered';
import { useSelector, useDispatch } from 'react-redux';
import { getListings } from '../state/listings/listingsSlice';

const HomePage = () => {
  const [filters, setFilters] = useState({
    dates: undefined,
    guests: 0,
    search: '',
  });

  const handleFilters = useCallback((filters) => {
    setFilters(filters);
  }, []);

  // const { data: listings, error, isLoading } = useData(filters);
  const { listings, error, status } = useSelector((state) => state.listings);
  console.log(listings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListings(filters));
  }, [dispatch, filters]);

  return (
    <div className='container py-4'>
      <button onClick={() => dispatch(getListings())}>xD</button>

      <div className='mb-4'>
        <ListingFilters
          onChange={handleFilters}
          isLoading={status === 'loading'}
        />
        <Separator className='my-4' />
        <DataRenderer error={error} isLoading={status === 'loading'}>
          <ListingList listings={listings} />;
        </DataRenderer>
      </div>
    </div>
  );
};

export default HomePage;
