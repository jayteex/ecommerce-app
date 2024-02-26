const request = require('supertest');
const app = require('../app'); 

describe('Express Server', () => {
  it('responds with 404 for undefined routes', async () => {
    const response = await request(app).get('/undefined-route');
    expect(response.status).toBe(404);
  });
});
