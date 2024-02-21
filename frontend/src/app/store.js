// Import createStore and combineReducers here.
import { configureStore, combineReducers } from '@reduxjs/toolkit';

// Import the slice reducers here.
import { listingReducer } from '../features/listing/listingSlice';
import { cartReducer } from '../features/cart/cartSlice';
import { currencyFilterReducer } from '../features/currencyFilter/currencyFilterSlice.js';
import { searchReducer } from '../features/search/searchSlice'; // Import searchReducer

const rootReducer = combineReducers({
  listing: listingReducer,
  cart: cartReducer,
  currencyFilter: currencyFilterReducer,
  search: searchReducer, // Add searchReducer to rootReducer
});

export const store = configureStore({
  reducer: rootReducer
});


