// frontend/src/features/checkout/Checkout.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../signin/signInSlice';
import { calculatePrice, getCurrencySymbol } from '../../utils/currencyLogic';
import './Checkout.css';

function Checkout() {
  const user = useSelector(selectUser);
  const cart = useSelector((state) => state.cart);
  const currencyFilter = useSelector((state) => state.currencyFilter);

  const renderUserInformation = () => {
    if (!user) {
      return (
        <div className="checkout-user-info">
          <p>Please sign in to view your information.</p>
        </div>
      );
    }

    return (
      <div className="checkout-user-info">
        <h2>User Information</h2>
        <p><strong>Name:</strong> {user.firstname} {user.lastname}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>City:</strong> {user.city}</p>
      </div>
    );
  };

  const renderCartItems = () => {
    if (!cart || Object.keys(cart.items).length === 0) {
      return (
        <div className="checkout-cart-empty">
          <p>Your cart is empty.</p>
        </div>
      );
    }

    return (
      <div className="checkout-cart-items">
        <h2>Cart Items</h2>
        {Object.keys(cart.items).map((itemName) => {
          const item = cart.items[itemName];
          return (
            <div key={itemName} className="checkout-cart-item">
              <img src={item.image_url} alt={itemName} className="checkout-cart-item-image" />
              <div className="checkout-cart-item-details">
                <h3>{itemName}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {getCurrencySymbol(currencyFilter)}{calculatePrice(item.price, currencyFilter).toFixed(2)}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="checkout-container">
      {renderUserInformation()}
      {renderCartItems()}
    </div>
  );
}

export default Checkout;
