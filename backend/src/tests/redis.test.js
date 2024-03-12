// backend/src/tests/redis.test.js
require('dotenv').config(); // Import dotenv to load environment variables
const { connectToRedis } = require('../app.js');

describe('Redis Connection', () => {
  test('should successfully connect to Redis', async () => {
    // Test the connection function
    try {
      await connectToRedis(); // Ensure to await the function call
    } catch (error) {
      // Handle errors if any
      console.error('Error connecting to Redis:', error);
      throw error;
    }
  });
});









