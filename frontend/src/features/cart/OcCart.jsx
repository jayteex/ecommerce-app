// frontend/src/features/cart/OcCart.jsx
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotal, getCurrencySymbol } from '../../utils/currencyLogic';
import { changeItemQuantity } from './cartSlice';
import { updateItemQuantity } from './cartSlice';
import { useNavigate } from 'react-router-dom'; 
import "./OcCart.css";

function OcCart() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const cart = useSelector((state) => state.cart);
  const currencyFilter = useSelector((state) => state.currencyFilter);
  const navigate = useNavigate(); 

  // Calculate cart count
  const cartCount = Object.values(cart?.items || {}).reduce((acc, item) => acc + item.quantity, 0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onInputChangeHandler = (name, input) => {
    if (!cart || input === '') {
      return;
    }
    const newQuantity = Number(input);
    dispatch(updateItemQuantity(name, newQuantity));
  };

  const cartElements = cart ? Object.keys(cart.items).map(createCartItem) : null;
  const total = calculateTotal(cart.items, currencyFilter);

  function createCartItem(name) {
    const item = cart.items[name];

    if (!item || item.quantity === 0) {
      return;
    }

    return (
      <div key={name} className="cart-item">
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
        <img src={item.image_url} alt={name} className="cart-item-image" />
      </div>
    );
  }

  const goToCheckout = () => {
    handleClose();
    navigate('/checkout'); // Navigate to the checkout page
  };

  return (
    <>
      <div className="cart-icon-container">
        <i className="fa-solid fa-cart-shopping oc-icon" onClick={handleShow}></i>
        {cartCount > 0 && <div className="cart-counter">{cartCount}</div>} 
      </div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div id="cart-items">{cartElements}</div>
          <h3 className="total">
            Total{' '}
            <span className="total-value">
              {getCurrencySymbol(currencyFilter)}
              {total}
            </span>
          </h3>
          {cartCount > 0 && (
            <Button id="checkout-button" onClick={goToCheckout}>Go to Checkout</Button>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );

}

export default OcCart;


