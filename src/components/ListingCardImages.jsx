import { useState } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui';

const ListingCardImages = ({ listing }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Carousel
      className='group w-full'
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent className='ml-0'>
        {listing.images.map((image, index) => (
          // <CarouselItem key={image} className='pl-0'>
          <CarouselItem key={`${image}-${index}`} className='pl-0'>
            <img
              className='h-[200px] w-full rounded-md object-cover'
              src={image}
              alt={`${listing.name} Image ${index + 1}`}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {isHovering && listing.images.length > 1 && (
        <>
          <CarouselPrevious
            className={`absolute left-4 ${isHovering ? 'animate-fadeIn' : 'animate-fadeOut'}`}
          />
          <CarouselNext
            className={`absolute right-4 ${isHovering ? 'animate-fadeIn' : 'animate-fadeOut'}`}
          />
        </>
      )}
    </Carousel>
  );
};

export default ListingCardImages;
