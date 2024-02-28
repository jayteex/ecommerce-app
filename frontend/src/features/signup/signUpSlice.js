// frontend/src/features/login/signUpSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
};

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    signUpRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    signUpSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    signUpFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      console.error('Signup failed with error:', action.payload); 
    },
  },
});

export const { signUpRequest, signUpSuccess, signUpFailure } = signUpSlice.actions;
export const signUpReducer = signUpSlice.reducer;
