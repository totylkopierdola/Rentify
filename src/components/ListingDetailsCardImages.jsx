import { useState } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui';
import { getImageUrl } from '@/lib/utils/images';
import { addListingToFirestore } from '../api/data/listings';
import { listingObject } from '@/api/data/listings';

const ListingDetailsCardImages = ({ listing }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!listing.images || listing.images.length === 0) {
    return (
      <>
        <h1
          onClick={() => {
            addListingToFirestore(listingObject);
          }}
        >
          addListing
        </h1>
        <h1
          onClick={() => {
            console.log('listing', listing);
          }}
        >
          log listing/s
        </h1>
        <p>No images available</p>;
      </>
    );
  }

  return (
    <>
      <img
        className='mb-4 h-[500px] w-full rounded-md object-cover'
        src={listing.images[currentImageIndex]}
        alt={listing.name}
      />

      <h1 onClick={() => console.log(listing.images[currentImageIndex])}>xd</h1>
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
                className='h-52 w-full object-cover shadow-sm'
                src={image}
                alt={listing.name}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default ListingDetailsCardImages;
