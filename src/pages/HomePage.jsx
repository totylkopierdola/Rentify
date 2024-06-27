import ListingList from '@/components/ListingList';
import { useCallback, useState } from 'react';
import ListingFilters from '@/components/ListingFilters';
import { Separator } from '@/components/ui';
import DataRenderer from '@/components/DataRendered';
import useData from '@/hooks/useData'; // Assuming the correct path to useData

const HomePage = () => {
  const [filters, setFilters] = useState({
    dates: undefined,
    guests: 0,
    search: '',
  });

  const handleFilterChange = useCallback((filters) => {
    setFilters(filters);
  }, []);

  const { data: listings, error, isLoading } = useData(filters);

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilterChange} isLoading={isLoading} />
        <Separator className='my-4' />
        <DataRenderer error={error} isLoading={isLoading}>
          <ListingList listings={listings} />
        </DataRenderer>
      </div>
    </div>
  );
};

export default HomePage;
