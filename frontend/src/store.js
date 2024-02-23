// Import createStore and combineReducers here.
import { configureStore, combineReducers } from '@reduxjs/toolkit';

// Import the slice reducers here.
import { listingReducer } from './features/listing/listingSlice.js';
import { cartReducer } from './features/cart/cartSlice.js';
import { currencyFilterReducer } from './features/currencyFilter/currencyFilterSlice.js';
import { searchReducer } from './features/search/searchSlice.js'; 

const rootReducer = combineReducers({
  listing: listingReducer,
  cart: cartReducer,
  currencyFilter: currencyFilterReducer,
  search: searchReducer, 
});

export const store = configureStore({
  reducer: rootReducer
});


