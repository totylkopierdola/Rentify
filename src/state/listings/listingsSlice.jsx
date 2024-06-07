import { getListingDataFromFirestore } from '@/api/data/listings';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  listings: [],
  error: null,
  status: 'idle',
};

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {},
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
        // state.error = action.error.message;
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

export default listingsSlice.reducer;
