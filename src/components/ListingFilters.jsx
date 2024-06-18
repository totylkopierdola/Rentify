import { useState, memo } from 'react';
import { Button, DateRangePicker, Input, Stepper } from '@/components/ui';
import { Eraser, Search } from 'lucide-react';

const ListingFilters = ({ onChange, isLoading }) => {
  const [dates, setDates] = useState();
  const [guests, setGuests] = useState(0);
  const [search, setSearch] = useState('');

  const handleSubmit = () => {
    onChange({ dates, guests, search });
  };

  const handleClearFilters = () => {
    dates !== undefined && setDates(undefined);
    guests !== 0 && setGuests(0);
    search !== '' && setSearch('');
    onChange({});
  };

  return (
    <div className='flex flex-row flex-wrap gap-2 lg:flex-nowrap lg:justify-between'>
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

      <div className='flex gap-2'>
        <Stepper
          label='guest'
          value={guests}
          onChange={setGuests}
          disabled={isLoading}
        />
        <Button className='w-full ' disabled={isLoading} onClick={handleSubmit}>
          Search
          <Search className='0 ml-2 h-4 w-4' />
        </Button>

        <Button
          onClick={() => handleClearFilters()}
          className='w-14 lg:w-full '
          variant='secondary'
        >
          Clear
          <Eraser className='hidden  h-4 w-4 lg:ml-2 lg:flex' />
        </Button>
      </div>
    </div>
  );
};

export default memo(ListingFilters);
