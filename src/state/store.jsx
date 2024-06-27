import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import listingsReducer from './listings/listingsSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  listings: listingsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

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

export const persistor = persistStore(store);
