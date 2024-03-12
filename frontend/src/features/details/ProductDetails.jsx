// frontend/src/features/details/ProductDetails.jsx

// Pretty basic, will be enhanced

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../api/products.js';
import { loadDataStart, loadDataSuccess, loadDataFailure } from '../listing/listingSlice.js';
import { calculatePrice, getCurrencySymbol } from '../../utils/currencyLogic';
import './ProductDetails.css'; 

export default function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(state => state.listing.products);
  const currencyFilter = useSelector(state => state.currencyFilter);

  console.log(productId);
  console.log(products);

  useEffect(() => {
    if (!products.length) {
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

  const product = products.find(product => parseInt(product.productid) === parseInt(productId));

  if (!product) {
    return <p>Product not found!</p>;
  }

  const { name, image_url, price, description, stockquantity } = product;

  return (
    <div className="product-details-container">
      <img src={image_url} alt={name} className="product-image"/>
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Price: {getCurrencySymbol(currencyFilter)}{calculatePrice(price, currencyFilter).toFixed(2)}</p>
      <p>Stock Quantity: {stockquantity}</p>
    </div>
  );
}



