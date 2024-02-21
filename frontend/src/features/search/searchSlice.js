import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const searchSlice = createSlice({
  name: 'search',
  initialState,
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
