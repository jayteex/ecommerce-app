import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadData } from './listingSlice';
import { getProducts } from '../../api/products.js';
import { calculatePrice, getCurrencySymbol } from '../../utils/currencyLogic';
import { addItem } from '../cart/cartSlice';

// The product listing 
export const Listing = ({ currencyFilter }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch product data from backend when the component mounts
    const fetchProducts = async () => {
      try {
        const products = await getProducts(); // Fetch products from backend
        dispatch(loadData(products)); // Dispatch the action to load data into Redux store
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [dispatch]);

  const products = useSelector((state) => state.listing);

  const onClickHandler = (product) => {
    dispatch(addItem(product));
  };

  if (!products || products.length === 0) {
    return <p>Sorry, no products are currently available...</p>;
  }

  return (
    <ul id="inventory-container">
      {products.map((product) => (
        <li key={product.productid} className="item"> {/* Update key to productid */}
          <img src={product.image_url} alt={product.name} />
          <h3>{product.name}</h3>
          <h3 className="price">
            {getCurrencySymbol(currencyFilter)}
            {calculatePrice(product.price, currencyFilter).toFixed(2)} {currencyFilter}
          </h3>
          <button
            onClick={() => onClickHandler(product)}
            className="add-to-cart-button"
          >
            Add to Cart
          </button>
        </li>
      ))}
    </ul>
  );
};
