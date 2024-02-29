// frontend/src/features/signin/signInSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null, // Initialize user from localStorage
  isLoading: false,
  error: null,
};

const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    signInRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    signInFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { signInRequest, signInSuccess, signInFailure } = signInSlice.actions;
export const selectUser = (state) => state.signIn.user; // Selector to access user state
export const signInReducer = signInSlice.reducer;

