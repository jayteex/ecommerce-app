import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  calculateTotal,
  getCurrencySymbol,
} from '../../utils/currencyLogic';
import { changeItemQuantity } from './cartSlice.js';

export const Cart = () => {
  const dispatch = useDispatch(); // Get the dispatch function
  const cart = useSelector((state) => state.cart);
  const currencyFilter = useSelector((state) => state.currencyFilter);

  const onInputChangeHandler = (name, input) => {
    if (!cart || input === '') {
      return;
    }
    const newQuantity = Number(input);
    dispatch(changeItemQuantity({ name, newQuantity })); // Dispatch the action
  };

  const cartElements = cart ? Object.keys(cart).map(createCartItem) : null;
  const total = calculateTotal(cart, currencyFilter);

  return (
    <div id="cart-container">
      <ul id="cart-items">{cartElements}</ul>
      <h3 className="total">
        Total{' '}
        <span className="total-value">
          {getCurrencySymbol(currencyFilter)}
          {total} {currencyFilter}
        </span>
      </h3>
    </div>
  );

  function createCartItem(name) {
    const item = cart[name];

    if (!item || item.quantity === 0) {
      return;
    }

    return (
      <li key={name}>
        <p>{name}</p>
        <select
          className="item-quantity"
          value={item.quantity}
          onChange={(e) => {
            onInputChangeHandler(name, e.target.value);
          }}
        >
          {[...Array(21).keys()].map((_, index) => (
            <option key={index} value={index}>
              {index}
            </option>
          ))}
        </select>
      </li>
    );
  }
};
