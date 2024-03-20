// frontend/src/features/details/ProductDetails.jsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../api/products.js';
import { loadDataStart, loadDataSuccess, loadDataFailure } from '../listing/listingSlice.js';
import { calculatePrice, getCurrencySymbol } from '../../utils/currencyLogic';
import { addItem } from '../cart/cartSlice'; 
import './ProductDetails.css'; 

export default function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(state => state.listing.products);
  const currencyFilter = useSelector(state => state.currencyFilter);

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

  const handleAddToCart = () => {
    dispatch(addItem({ name, price }));
  };

  return (
    <div className="product-details-container">
      <img src={image_url} alt={name} className="product-image"/>
      <div className="product-info">
        <h2>{name}</h2>
        <p>{description}</p>
        <p>Price: <span>{getCurrencySymbol(currencyFilter)}{calculatePrice(price, currencyFilter).toFixed(2)}</span></p>
        <p>Stock Quantity: {stockquantity}</p>
        <button onClick={handleAddToCart} className="add-to-cart-button">Add to Cart</button>
      </div>
    </div>
  );
}





