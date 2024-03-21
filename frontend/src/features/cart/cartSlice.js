// frontend/src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { HOST } from "../../api/index.js";
import axios from 'axios';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: {},
    count: 0,
    loading: false,
    error: null
  },
  reducers: {
    addItemStart(state) {
      state.loading = true;
      state.error = null;
    },
    addItemSuccess(state, action) {
      const { name, price, image_url, productid } = action.payload;
      state.items[name] = {
        price,
        quantity: (state.items[name] ? state.items[name].quantity + 1 : 1),
        image_url,
        productid
      };
      state.count++;
      state.loading = false;
    },
    addItemFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    changeItemQuantity(state, action) {
      const { name, newQuantity } = action.payload;
      if (state.items[name]) {
        state.items[name].quantity = newQuantity;
        state.count = Object.values(state.items).reduce((acc, item) => acc + item.quantity, 0);
      }
    },
    refillCart(state, action) {
      const { cartData } = action.payload;
      state.items = {};
      state.count = 0;
      cartData.forEach(item => {
        const { productid, name, price, image_url, quantity } = item;
        state.items[name] = { productid, price, image_url, quantity };
        state.count += quantity;
      });
    }
  }
});

export const { addItemStart, addItemSuccess, addItemFailure, changeItemQuantity, refillCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

export const addItem = (product) => async (dispatch) => {
  dispatch(addItemStart());

  try {
    await axios.post(`${HOST}/cart/add`, product, { withCredentials: true });
    dispatch(addItemSuccess(product));
  } catch (error) {
    dispatch(addItemFailure(error.message));
  }
};

export const refillCartData = () => async (dispatch) => {
  try {
    const response = await axios.get(`${HOST}/cart/items`, { withCredentials: true });
    dispatch(refillCart({ cartData: response.data }));
  } catch (error) {
    console.error('Error refilling cart data:', error);
  }
};

export const updateItemQuantity = (productName, newQuantity) => async (dispatch, getState) => {
  const { cart: { items } } = getState();
  const product = items[productName];

  if (!product) {
    console.error('Product not found in cart:', productName);
    return;
  }

  const updatedProduct = { ...product, quantity: newQuantity };

  try {
    await axios.put(`${HOST}/cart/updateQuantity`, updatedProduct, { withCredentials: true });
    dispatch(changeItemQuantity({ name: productName, newQuantity }));
  } catch (error) {
    console.error('Error updating quantity:', error);
  }
};








