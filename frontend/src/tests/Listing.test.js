import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'; // Importing screen and fireEvent
import { Provider } from 'react-redux';
import { Listing } from '../features/listing/Listing';
import configureStore from 'redux-mock-store';
import { useSelector, useDispatch } from 'react-redux'; // Importing useSelector and useDispatch
import fetchMock from 'jest-fetch-mock'; // Importing jest-fetch-mock to mock fetch API
import { addItem } from '../features/cart/cartSlice'; // Importing addItem action from cartSlice

const mockStore = configureStore([]);

fetchMock.enableMocks(); // Enable mocking fetch API

describe('Listing Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      // Mocking Redux store state
      listing: {
        products: [
          { productid: 1, name: 'Product 1', price: 10.99, image_url: 'product1.jpg' },
          { productid: 2, name: 'Product 2', price: 19.99, image_url: 'product2.jpg' },
        ],
        loading: false,
      },
    });
  });

  test('renders a loading message when products are being fetched', () => {
    useSelector.mockReturnValueOnce([]); // Mocking useSelector to return an empty array
    render(
      <Provider store={store}>
        <Listing />
      </Provider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument(); // Assuming 'Loading...' is the loading message
  });

  test('renders product list with correct data', () => {
    useSelector.mockReturnValueOnce([
      { productid: 1, name: 'Product 1', price: 10.99, image_url: 'product1.jpg' },
      { productid: 2, name: 'Product 2', price: 19.99, image_url: 'product2.jpg' },
    ]); // Mocking useSelector to return an array of products
    render(
      <Provider store={store}>
        <Listing />
      </Provider>
    );
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  test('dispatches addItem when "Add to Cart" button is clicked', () => {
    useSelector.mockReturnValueOnce([{ productid: 1, name: 'Product 1', price: 10.99, image_url: 'product1.jpg' }]);
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock); // Mocking useDispatch to return dispatchMock function
    render(
      <Provider store={store}>
        <Listing />
      </Provider>
    );
    fireEvent.click(screen.getByText('Add to Cart')); // Assuming 'Add to Cart' is the button text
    expect(dispatchMock).toHaveBeenCalledWith(addItem({ productid: 1, name: 'Product 1', price: 10.99, image_url: 'product1.jpg' }));
  });
});
