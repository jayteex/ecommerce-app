// frontend/src/features/account/accountSlice.jsx

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    updateUserRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action) => {
      console.log('action.payload: ', action.payload);
      console.log('state: ', state);
      console.log('action: ', action);
      state.isLoading = false;
      state.user = action.payload;
    },
    updateUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { updateUserRequest, updateUserSuccess, updateUserFailure } = accountSlice.actions;
export const selectUser = (state) => state.account.user;
export const accountReducer = accountSlice.reducer;
