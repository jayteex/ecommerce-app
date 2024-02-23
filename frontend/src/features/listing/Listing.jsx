import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadData } from './listingSlice';
import { inventoryData } from './mockData';
import { calculatePrice, getCurrencySymbol } from '../../utils/currencyLogic';
import { addItem } from '../cart/cartSlice.js';

// The product listing 
export const Listing = ({ currencyFilter }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadData(inventoryData));
  }, [dispatch]);

  const inventory = useSelector((state) => state.listing);

  const onClickHandler = (inventoryItem) => {
    dispatch(addItem(inventoryItem));
  };

  if (!inventory || inventory.length === 0) {
    return <p> Sorry, no products are currently available... </p>;
  }

  return (
    <ul id="inventory-container">
      {inventory.map((inventoryItem) => (
        <li key={inventoryItem.name} className="item">
          <img src={inventoryItem.img} alt={''} />
          <h3>{inventoryItem.name}</h3>
          <h3 className="price">
            {getCurrencySymbol(currencyFilter)}
            {calculatePrice(inventoryItem.price, currencyFilter).toFixed(2)} {currencyFilter}
          </h3>
          <button
            onClick={() => onClickHandler(inventoryItem)}
            className="add-to-cart-button"
          >
            Add to Cart
          </button>
        </li>
      ))}
    </ul>
  );
};
