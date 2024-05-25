import ListingList from '@/components/ListingList';
import { listings } from '@/api/data/listings';

const HomePage = () => {
  console.log('listings', listings);
  return (
    <div className='container'>
      <h1>Hello world!</h1>
      <ListingList listings={listings} />
    </div>
  );
};

export default HomePage;
