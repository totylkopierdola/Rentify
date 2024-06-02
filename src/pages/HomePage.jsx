import ListingList from '@/components/ListingList';
import { getListingsFromFirestore } from '@/api/data/listings';
import { useEffect, useState } from 'react';
import ListingFilters from '@/components/ListingFilters';
import { Separator, Spinner } from '@/components/ui';

const HomePage = () => {
  const [listings, setListings] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    dates: undefined,
    guests: 0,
    search: '',
  });

  const handleFilters = (filters) => {
    setFilters(filters);
  };

  useEffect(() => {
    setIsLoading(true);

    getListingsFromFirestore(filters)
      .then((listings) => {
        setListings(listings);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [filters]);

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
