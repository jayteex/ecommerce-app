// frontend/src/features/search/searchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    setSearchTerm(state, action) {
      return action.payload;
    },
    clearSearchTerm() {
      return '';
    }
  }
});

export const { setSearchTerm, clearSearchTerm } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;

