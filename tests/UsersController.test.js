const request = require('supertest');
const app = require('../server.js'); 

const mockUser = {
  name: 'Test User',
  email: 'test@example.com',
};

describe('API Endpoints', () => {
  describe('POST /users', () => {
    it('should create a new user and return status 201', async () => {
      const response = await request(app).post('/users').send(mockUser);
      expect(response.status).toBe(201);
      expect(response.body.user).toBeDefined();
    });
  });

  describe('GET /users/me', () => {
    it('should return status 200 and the current user information', async () => {
      const response = await request(app).get('/users/me');
      expect(response.status).toBe(200);
      expect(response.body.user).toBeDefined();
    });
  });
});
