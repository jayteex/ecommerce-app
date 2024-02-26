import { loadData, listingReducer } from '../features/listing/listingSlice.js';

describe('listingSlice', () => {
  test('loadData action creator creates correct action', () => {
    const products = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    const action = loadData(products);

    expect(action.type).toEqual('listing/loadData');
    expect(action.payload).toEqual(products);
  });

  test('listingReducer returns correct state for loadData action', () => {
    const initialState = [];
    const products = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    const action = loadData(products);

    const newState = listingReducer(initialState, action);

    expect(newState).toEqual(products);
  });
});
