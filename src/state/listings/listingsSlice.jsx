import { getListingDataFromFirestore } from '@/api/data/listings';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get } from 'react-hook-form';

const initialState = {
  listings: [],
  error: null,
  status: 'idle',
  favoriteListingIds: [],
};

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    addFavoriteListing(state, action) {
      state.favoriteListingIds.push(action.payload);
      console.log('state.favoriteListingIds', state.favoriteListingIds);
      console.log('action.payload', action.payload);
    },
    removeFavoriteListing(state, action) {
      state.favoriteListingIds = state.favoriteListingIds.filter(
        (id) => id !== action.payload,
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getListings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getListings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.listings = action.payload;
      })
      .addCase(getListings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export const getListings = createAsyncThunk(
  'listings/getListings',
  async (filters) => {
    const response = await getListingDataFromFirestore(filters);
    return response;
  },
);

export const { addFavoriteListing, removeFavoriteListing } =
  listingsSlice.actions;

export default listingsSlice.reducer;
