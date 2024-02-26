import { getProducts } from '../api/products';

const HOST = 'http://localhost:5173'; 

describe('API Tests', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockReset(); // Reset fetch mocks before each test
  });

  test('getProducts fetches data from the backend', async () => {
    const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    global.fetch.mockResolvedValueOnce({ json: () => mockProducts }); // Mock fetch response

    const products = await getProducts();

    expect(products).toEqual(mockProducts); // Verify that the returned data matches the mock data
    expect(global.fetch).toHaveBeenCalledWith(`${HOST}/home`); // Verify that fetch was called with the correct URL
  });

  test('getProducts handles fetch errors', async () => {
    const errorMessage = 'Failed to fetch data';
    global.fetch.mockRejectedValueOnce(new Error(errorMessage)); // Mock fetch error

    await expect(getProducts()).rejects.toThrow(errorMessage); // Verify that an error is thrown
    expect(global.fetch).toHaveBeenCalledWith(`${HOST}/home`); // Verify that fetch was called with the correct URL
  });
});
