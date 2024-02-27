// frontend/src/features/listing/Listing.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadData } from './listingSlice';
import { getProducts } from '../../api/products.js';
import { calculatePrice, getCurrencySymbol } from '../../utils/currencyLogic';
import { addItem } from '../cart/cartSlice';

// The product listing 
export const Listing = ({ currencyFilter }) => {
  const dispatch = useDispatch();
  const [isDataFetched, setIsDataFetched] = useState(false); // State to track whether data has been fetched before
  const [showLoading, setShowLoading] = useState(false); // State to track whether to show loading message

  useEffect(() => {
    if (!isDataFetched) {
      // Show loading message only if it hasn't been shown before
      setShowLoading(true);
      // Fetch product data from backend when the component mounts and data hasn't been fetched before
      const fetchProducts = async () => {
        try {
          const products = await getProducts(); // Fetch products from backend
          dispatch(loadData(products)); // Dispatch the action to load data into Redux store
          setIsDataFetched(true); // Set data fetched flag to true
          setShowLoading(false); // Hide loading message after data is fetched
        } catch (error) {
          console.error('Error fetching products:', error);
          setShowLoading(false); // Hide loading message in case of error
        }
      };
      fetchProducts();
    }
  }, [dispatch, isDataFetched]);

  const products = useSelector((state) => state.listing);

  const onClickHandler = (product) => {
    dispatch(addItem(product));
  };

  if (showLoading) {
    setTimeout(() => {
      return (
        <div className="loading-container">
          <p>Due to the slowness of Render's free tier, fetching of assets on initial load might take 5-10 seconds.</p>
          <p>Sorry for the inconvenience, I hope you have a nice day!</p>
          <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmExdWxtbmR0NjJlZWZqc3cwODhpcmRwbnVwbnUxcmF6M2U5dXVpOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/DhstvI3zZ598Nb1rFf/giphy.gif" alt="Loading" />
        </div>
      );
    }, 200);
  }


  if (!products || products.length === 0) {
    setTimeout(() => {
    return <p>Sorry, no products are currently available...</p>;
    }, 300);
  }

  return (
    <ul id="inventory-container">
      {products.map((product) => (
        <li key={product.productid} className="item">
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
