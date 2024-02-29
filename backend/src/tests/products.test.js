const request = require('supertest');
const app = require('../app'); 

describe('Products Route', () => {
  it('responds with JSON containing all products', async () => {
    const response = await request(app).get('/home');
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual(expect.any(Array)); // Expecting an array of products
  });

  it('responds with JSON containing a single product by ID', async () => {
    const response = await request(app).get('/home/10005'); // Assuming product ID 10005 exists
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual(expect.any(Object)); // Expecting a single product object
  });

  it('responds with 404 for a non-existing product ID', async () => {
    const response = await request(app).get('/home/999'); // Assuming product ID 999 does not exist
    expect(response.status).toBe(404);
  });
});
