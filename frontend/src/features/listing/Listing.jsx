// frontend/src/features/listing/Listing.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadDataStart, loadDataSuccess, loadDataFailure } from './listingSlice';
import { getProducts } from '../../api/products.js';
import { calculatePrice, getCurrencySymbol } from '../../utils/currencyLogic';
import { addItem } from '../cart/cartSlice';

export default function Listing() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.listing.products);
  const loading = useSelector((state) => state.listing.loading);
  const currencyFilter = useSelector((state) => state.currencyFilter);

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

  if (loading) {
    return (
      <div className="loading-container">
        <p>Due to the slowness of Render's and Supabase's free tier, fetching of assets on initial load might take 10-15 seconds.</p>
        <p>After MVP is finished I will see if I can boost performance. Once the app has loaded, though, it is very fast.</p>
        <p>Sorry for the inconvenience, I hope you have a nice day!</p>
        <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmExdWxtbmR0NjJlZWZqc3cwODhpcmRwbnVwbnUxcmF6M2U5dXVpOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/DhstvI3zZ598Nb1rFf/giphy.gif" alt="Loading" />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <p>Sorry, no products are currently available...</p>;
  }

  return (
    <ul id="inventory-container">
      {products.map((product) => (
        <li key={product.productid} className="item">
          <img src={product.image_url} alt={product.name} />
          <h3>{product.name}</h3>
          <h3 className="price">
            {getCurrencySymbol(currencyFilter)}
            {calculatePrice(product.price, currencyFilter).toFixed(2)}
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



