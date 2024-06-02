import { useEffect, useState } from 'react';
import { getListingDataFromFirestore } from '@/api/data/listings';

const useData = (filters) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setIsLoading(true);

      try {
        const listings = await getListingDataFromFirestore(filters);
        setData(listings);
      } catch (error) {
        setError(
          error.message || 'Something went wrong. Please try again later.',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  return { data, error, isLoading };
};

export default useData;
