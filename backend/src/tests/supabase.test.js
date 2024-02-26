const supabase = require('../config/supabase');

describe('Supabase Connection', () => {
  test('should connect to Supabase successfully', async () => {
    try {
      // Attempt to fetch some data from Supabase
      const { data, error } = await supabase.from('products').select('*').limit(1);
      
      // Assert that there is no error and data is fetched successfully
      expect(error).toBeNull();
      expect(data).toBeTruthy();
    } catch (err) {
      // If an error occurs during the test, fail the test
      fail(err);
    }
  });
});