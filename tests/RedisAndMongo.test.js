const { redisClient, dbClient } = require('../utils/db');

describe('Database Client', () => {
  it('should connect to the database', async () => {
    expect(dbClient.isConnected).toBe(true);
  });
});

describe('Redis Client', () => {
  it('should connect to the Redis server', async () => {
    expect(redisClient.connected).toBe(true); 
  });
});

