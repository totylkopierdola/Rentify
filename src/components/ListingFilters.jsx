import { useState, useEffect, memo } from 'react';
import { Button, DateRangePicker, Input, Stepper } from '@/components/ui';
import { Search } from 'lucide-react';

const ListingFilters = ({ onChange, isLoading }) => {
  const [dates, setDates] = useState();
  const [guests, setGuests] = useState(0);
  const [search, setSearch] = useState('');

  const handleSubmit = () => {
    onChange({ dates, guests, search });
  };

  return (
    <div className='flex flex-row flex-wrap gap-2 xl:flex-nowrap xl:justify-between'>
      <Input
        className=''
        placeholder='Search destinations'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={(e) => {
          e.key === 'Enter' && handleSubmit();
        }}
        disabled={isLoading}
      />

      <DateRangePicker
        className=''
        mode='single'
        value={dates}
        onChange={setDates}
        minDate={new Date()}
        placeholder='Add dates'
        disabled={isLoading}
      />

      <div className='flex w-full justify-between gap-4 xl:w-[300px] xl:justify-center xl:gap-2'>
        <Stepper
          label='guest'
          value={guests}
          onChange={setGuests}
          disabled={isLoading}
        />
        <Button
          className='w-full xl:w-[200px]'
          disabled={isLoading}
          onClick={handleSubmit}
        >
          Search
          <Search className='0 ml-2 h-4 w-4' />
        </Button>
      </div>
    </div>
  );
};

export default memo(ListingFilters);
