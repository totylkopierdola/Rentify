import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui';
import useWindowWidth from '@/hooks/useWindowWidth';

const ListingDetailsCardImages = ({ listing }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const width = useWindowWidth();

  if (!listing.images || listing.images.length === 0) {
    return (
      <>
        <p>No images available</p>;
      </>
    );
  }

  return (
    <>
      <img
        className='mb-4 w-full rounded-md object-cover lg:h-[500px]'
        src={listing.images[currentImageIndex]}
        alt={listing.name}
      />

      <Carousel className='mx-auto mb-4 w-[90%]'>
        <CarouselContent>
          {listing.images.map((image, index) => (
            <CarouselItem
              key={`${image}-${index}`}
              className='basis-1/3 cursor-pointer'
              onClick={() => setCurrentImageIndex(index)}
              isSelected={index === currentImageIndex}
            >
              <img
                className='w-full object-cover shadow-sm lg:h-52'
                src={image}
                alt={listing.name}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='hidden lg:flex' />
        <CarouselNext className='hidden lg:flex' />
      </Carousel>
    </>
  );
};

export default ListingDetailsCardImages;
