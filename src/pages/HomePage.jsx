import ListingList from '@/components/ListingList';
import { getListingDataFromFirestore } from '@/api/data/listings';
import { useEffect, useState } from 'react';
import ListingFilters from '@/components/ListingFilters';
import { Separator, Spinner } from '@/components/ui';
import useData from '@/hooks/useData';

const HomePage = () => {
  const [filters, setFilters] = useState({
    dates: undefined,
    guests: 0,
    search: '',
  });

  const handleFilters = (filters) => {
    setFilters(filters);
  };

  const { data: listings, error, isLoading } = useData(filters);

  const renderListingList = () => {
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

    return <ListingList listings={listings} />;
  };

  return (
    <div className='container py-4'>
      <h1>{error}</h1>
      <button onClick={() => console.log(listings)}>zxc</button>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} isLoading={isLoading} />
        <Separator className='my-4' />
        <h2 onClick={() => console.log(isLoading)}>
          isLoading: {isLoading.toString()}
        </h2>
      </div>
      {renderListingList()}
    </div>
  );
};

export default HomePage;
