import { useState, useEffect } from 'react';
import { Button, DateRangePicker, Input, Stepper } from '@/components/ui';
import { Search } from 'lucide-react';

const ListingFilters = ({ onChange, isLoading }) => {
  const [dates, setDates] = useState();
  const [guests, setGuests] = useState(0);
  const [search, setSearch] = useState('');

  // Log date changes
  useEffect(() => {
    console.log('Selected dates:', dates);
  }, [dates]);

  const handleSubmit = () => {
    onChange({ dates, guests, search });
  };

  return (
    <div className='flex flex-row items-center justify-center gap-2'>
      <Input
        className='w-[400px]'
        placeholder='Search destinations'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={(e) => {
          e.key === 'Enter' && handleSubmit();
        }}
        disabled={isLoading}
      />

      <DateRangePicker
        mode='single'
        value={dates}
        onChange={setDates}
        minDate={new Date()}
        placeholder='Add dates'
        disabled={isLoading}
      />
      <Stepper
        label='guest'
        value={guests}
        onChange={setGuests}
        disabled={isLoading}
      />
      <Button disabled={isLoading} onClick={handleSubmit}>
        <Search className='h-4 w-4' />
      </Button>
    </div>
  );
};

export default ListingFilters;
