// frontend/src/features/currencyFilter/currencyFilterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialCurrencyFilter = 'USD';

const currencyFilterSlice = createSlice({
  name: 'currencyFilter',
  initialState: initialCurrencyFilter,
  reducers: {
    setCurrency(state, action) {
      return action.payload;
    }
  }
});

export const { setCurrency } = currencyFilterSlice.actions;
export const currencyFilterReducer = currencyFilterSlice.reducer;
