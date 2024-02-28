// frontend/src/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { listingReducer } from './features/listing/listingSlice.js';
import { cartReducer } from './features/cart/cartSlice.js';
import { currencyFilterReducer } from './features/currencyFilter/currencyFilterSlice.js';
import { searchReducer } from './features/search/searchSlice.js'; 
import { signUpReducer } from './features/signup/signUpSlice.js';
import { signInReducer } from './features/signin/signInSlice.js';


const rootReducer = combineReducers({
  listing: listingReducer,
  cart: cartReducer,
  currencyFilter: currencyFilterReducer,
  search: searchReducer, 
  signUp: signUpReducer,
  signIn: signInReducer,
});

export const store = configureStore({
  reducer: rootReducer
});


