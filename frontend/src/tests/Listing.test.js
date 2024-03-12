import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'; 
import { Provider } from 'react-redux';
import { Listing } from '../features/listing/Listing';
import configureStore from 'redux-mock-store';
import { useSelector, useDispatch } from 'react-redux'; 
import fetchMock from 'jest-fetch-mock';
import { addItem } from '../features/cart/cartSlice'; 

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
    expect(screen.getByText('Loading...')).toBeInTheDocument(); // Assuming 'Loading...' is the loading message -> that changed, need to update this test
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
    fireEvent.click(screen.getByText('Add to Cart')); // Assuming 'Add to Cart' is the button text -> need to change this as well
    expect(dispatchMock).toHaveBeenCalledWith(addItem({ productid: 1, name: 'Product 1', price: 10.99, image_url: 'product1.jpg' }));
  });
});
