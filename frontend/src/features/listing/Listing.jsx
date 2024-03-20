// frontend/src/features/listing/Listing.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadDataStart, loadDataSuccess, loadDataFailure } from './listingSlice';
import { getProducts } from '../../api/products.js';
import { calculatePrice, getCurrencySymbol } from '../../utils/currencyLogic';
import { addItem } from '../cart/cartSlice';
import "./Listing.css";

export default function Listing() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.listing.products);
  const loading = useSelector((state) => state.listing.loading);
  const currencyFilter = useSelector((state) => state.currencyFilter);
  const searchTerm = useSelector((state) => state.search); // Get search term from Search slice

  useEffect(() => {
    if (products.length === 0) {
      dispatch(loadDataStart());
      getProducts()
        .then(products => {
          dispatch(loadDataSuccess(products));
        })
        .catch(error => {
          console.error('Error fetching products:', error);
          dispatch(loadDataFailure());
        });
    }
  }, [dispatch, products.length]);

  const onClickHandler = (product) => {
    dispatch(addItem(product));
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Some text and GIF to appease long waiting time after databases were inactive for a while
  if (loading) {
    return (
      <div className="loading-container">
        <p>Due to the slowness of Render's and Supabase's free tier, fetching of assets on initial load might take 10-20 seconds.</p>
        <p>After MVP is finished I will see if I can boost performance. Once the app has loaded, though, it is very fast.</p>
        <p>Sorry for the inconvenience, I hope you have a nice day!</p>
        <img className="loadingGIF" src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXc4YTBiZnltcDJiaHVic2premprbnBldm4xZ2tlOHI2OTFxanVkMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TvLuZ00OIADoQ/giphy.gif" alt="Loading" />
      </div>
    );
  }

  if (!filteredProducts || filteredProducts.length === 0) {
    return <p>No products matching the search term...</p>;
  }

  return (
    <ul id="inventory-container">
      {filteredProducts.map((product) => (
        <li key={product.productid} className="item">
          {/* Wrap each product item with Link */}
          <Link to={`/product/${product.productid}`}>
            <img src={product.image_url} alt={product.name} />
            <h3 className="product-name">{product.name}</h3>
            <h3 className="product-price">
              {getCurrencySymbol(currencyFilter)}
              {calculatePrice(product.price, currencyFilter).toFixed(2)}
            </h3>
          </Link>
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




