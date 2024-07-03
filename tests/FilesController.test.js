const request = require('supertest');
const app = require('../server.js'); 

const mockFile = {
  name: 'Test File',
  type: 'text/plain',
  data: 'This is a test file',
};

describe('API Endpoints', () => {
  describe('POST /files', () => {
    it('should upload a new file and return status 201', async () => {
      const response = await request(app).post('/files').send(mockFile);
      expect(response.status).toBe(201);
      expect(response.body.file).toBeDefined();
    });
  });

  describe('GET /files/:id', () => {
    let fileId;

    beforeEach(async () => {
      const response = await request(app).post('/files').send(mockFile);
      fileId = response.body.file.id;
    });

    it('should return status 200 and the file information', async () => {
      const response = await request(app).get(`/files/${fileId}`);
      expect(response.status).toBe(200);
      expect(response.body.file).toBeDefined();
    });
  });

  describe('GET /files', () => {
    let fileId;

    beforeEach(async () => {
      const response = await request(app).post('/files').send(mockFile);
      fileId = response.body.file.id;
    });

    it('should return status 200 and a list of files', async () => {
      const response = await request(app).get('/files');
      expect(response.status).toBe(200);
      expect(response.body.files).toBeDefined();
    });

    it('should handle pagination correctly', async () => {
      const response = await request(app).get('/files?page=2&limit=10'); 
      expect(response.status).toBe(200);
      expect(response.body.files).toBeDefined();
    });
  });

  describe('PUT /files/:id/publish', () => {
    let fileId;

    beforeEach(async () => {
      const response = await request(app).post('/files').send(mockFile);
      fileId = response.body.file.id;
    });

    it('should publish a file and return status 200', async () => {
      const response = await request(app).put(`/files/${fileId}/publish`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBeDefined();
    });
  });

  describe('PUT /files/:id/unpublish', () => {
    let fileId;

    beforeEach(async () => {
      const response = await request(app).post('/files').send(mockFile);
      fileId = response.body.file.id;
      await request(app).put(`/files/${fileId}/publish`);
    });

    it('should unpublish a file and return status 200', async () => {
      const response = await request(app).put(`/files/${fileId}/unpublish`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBeDefined();
    });
  });

  describe('GET /files/:id/data', () => {
    let fileId;

    beforeEach(async () => {
      const response = await request(app).post('/files').send(mockFile);
      fileId = response.body.file.id;
    });

    it('should return status 200 and the file data', async () => {
      const response = await request(app).get(`/files/${fileId}/data`);
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });
});
