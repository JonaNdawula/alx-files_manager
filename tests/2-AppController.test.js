const request = require('supertest');
const app = require('../server.js'); 

describe('API Endpoints', () => {
  describe('GET /status', () => {
    it('should return status 200 and a status message', async () => {
      const response = await request(app).get('/status');
      expect(response.status).toBe(200);
      expect(response.body.status).toBeDefined();
    });
  });

  describe('GET /stats', () => {
    it('should return status 200 and statistics', async () => {
      const response = await request(app).get('/stats');
      expect(response.status).toBe(200);
      expect(response.body.stats).toBeDefined();
    });
  });
});

