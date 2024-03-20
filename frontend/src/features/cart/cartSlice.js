// frontend/src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: {},
    count: 0  
  },
  reducers: {
    addItem(state, action) {
      const { name, price } = action.payload;
      const quantity = state.items[name] ? state.items[name].quantity + 1 : 1;
      state.items[name] = { price, quantity };
      state.count++; 
    },
    changeItemQuantity(state, action) {
      const { name, newQuantity } = action.payload;
      state.items[name].quantity = newQuantity;
    }
  }
});

export const { addItem, changeItemQuantity } = cartSlice.actions;
export const cartReducer = cartSlice.reducer; 
