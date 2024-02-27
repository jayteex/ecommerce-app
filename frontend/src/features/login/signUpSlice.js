// frontend/src/features/login/signUpSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    signupRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    signupSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    signupFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      console.error('Signup failed with error:', action.payload); 
    },
  },
});

export const { signupRequest, signupSuccess, signupFailure } = signupSlice.actions;
export const signupReducer = signupSlice.reducer;
