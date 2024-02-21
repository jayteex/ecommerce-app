import { createSlice } from '@reduxjs/toolkit';

const listingSlice = createSlice({
  name: 'listing',
  initialState: [],
  reducers: {
    loadData(state, action) {
      return action.payload; // Set the state to the payload
    }
  }
});

export const { loadData } = listingSlice.actions;
export const listingReducer = listingSlice.reducer;

