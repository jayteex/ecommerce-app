import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {},
  reducers: {
    addItem(state, action) {
      const { name, price } = action.payload;
      const quantity = state[name] ? state[name].quantity + 1 : 1;
      state[name] = { price, quantity };
    },
    changeItemQuantity(state, action) {
      const { name, newQuantity } = action.payload;
      state[name].quantity = newQuantity;
    }
  }
});

export const { addItem, changeItemQuantity } = cartSlice.actions;
export const cartReducer = cartSlice.reducer; 
