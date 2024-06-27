import { getListingDataFromFirestore } from '@/api/data/listings';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // for localStorage

const initialState = {
  listings: [],
  error: null,
  status: 'idle',
  favoriteListingIds: [],
};

export const getListings = createAsyncThunk(
  'listings/getListings',
  async (filters) => {
    const persistedState = await storage.getItem('persist:root');
    let listingsData = null;

    if (persistedState) {
      const parsedState = JSON.parse(persistedState);
      const listingsString = parsedState?.listings;
      if (listingsString) {
        const listingsObject = JSON.parse(listingsString);
        listingsData = listingsObject?.listings || [];
      }
    }

    // If listings data is found in localStorage, return it
    if (listingsData && listingsData.length > 0) {
      return listingsData;
    }

    // Otherwise, fetch the listings data from Firestore
    const response = await getListingDataFromFirestore(filters);
    return response;
  },
);

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
  extraReducers: (builder) => {
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
        state.error = action.error.message; // Fix here
      });
  },
});

export const { addFavoriteListing, removeFavoriteListing } =
  listingsSlice.actions;

export default listingsSlice.reducer;
