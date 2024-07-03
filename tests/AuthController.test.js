const request = require('supertest');
const app = require('../server.js'); 

describe('API Endpoints', () => {
  describe('GET /connect', () => {
    it('should return status 200 and authentication information', async () => {
      const response = await request(app).get('/connect');
      expect(response.status).toBe(200);
    });
  });

  describe('GET /disconnect', () => {
    it('should return status 200 and log out the user', async () => {
      const response = await request(app).get('/disconnect');
      expect(response.status).toBe(200);
    });
  });
});
