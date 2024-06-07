import { configureStore } from '@reduxjs/toolkit';
import listingsReducer from './listings/listingsSlice';

export const store = configureStore({
  reducer: {
    listings: listingsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // ^ Firebase does have serializable objects, so we need to disable this check. exact case here is this:
  /*
        {
          "from": {
              "seconds": 1716847200,
              "nanoseconds": 0
          },
          "to": {
              "seconds": 1719439200,
              "nanoseconds": 0
          }
      }
  */
});
