// frontend/src/features/signin/signInSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchSessionData } from '../../api/getSession';

const initialState = {
  user: null,
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

export const fetchSessionDataAndUpdateStore = () => async (dispatch) => {
  try {
    dispatch(signInRequest());
    const response = await fetchSessionData();
    dispatch(signInSuccess(response));
  } catch (error) {
    dispatch(signInFailure(error.message));
  }
};

export const { signInRequest, signInSuccess, signInFailure } = signInSlice.actions;
export const selectUser = (state) => state.signIn.user;
export const signInReducer = signInSlice.reducer;