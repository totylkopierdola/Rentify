import { useMemo } from 'react';
import { Button } from './ui';
import { Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFavoriteListing,
  removeFavoriteListing,
} from '@/state/listings/listingsSlice';

const ListingFavoriteButton = ({ className, listing }) => {
  const favoriteListingIds = useSelector(
    (state) => state.listings.favoriteListingIds,
  );

  const dispatch = useDispatch();

  const isFavorite = useMemo(
    () => favoriteListingIds.includes(listing.id),
    [listing, favoriteListingIds],
  );

  return (
    <Button
      className={className}
      variant='ghost'
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isFavorite) {
          dispatch(removeFavoriteListing(listing.id));
        } else {
          dispatch(addFavoriteListing(listing.id));
        }
      }}
    >
      <Heart
        className={`h-10 w-10 rounded-full border-none ${isFavorite && 'fill-red-500 text-white'}`}
      />
    </Button>
  );
};

export default ListingFavoriteButton;
