// frontend/src/features/listing/listingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const listingSlice = createSlice({
  name: 'listing',
  initialState: [],
  reducers: {
    loadData(state, action) {
      return action.payload; 
    }
  }
});

export const { loadData } = listingSlice.actions;
export const listingReducer = listingSlice.reducer;

