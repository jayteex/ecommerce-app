// frontend/src/features/listing/listingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const listingSlice = createSlice({
  name: 'listing',
  initialState: {
    products: [],
    loading: false
  },
  reducers: {
    loadDataStart(state) {
      state.loading = true;
    },
    loadDataSuccess(state, action) {
      state.products = action.payload;
      state.loading = false;
    },
    loadDataFailure(state) {
      state.loading = false;
    }
  }
});

export const { loadDataStart, loadDataSuccess, loadDataFailure } = listingSlice.actions;
export const listingReducer = listingSlice.reducer;

