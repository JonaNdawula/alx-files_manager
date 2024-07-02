const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

class AppController {
  static async getStatus(req, res) {
    const redisAlive = redisClient.redisClient.isAlive();
    const dbAlive = dbClient.isAlive();
    res.status(200).json({ redis: redisAlive, db: dbAlive });
  }

  static async getStats(req, res) {
    const nbUsers = await dbClient.nbUsers();
    const nbFiles = await dbClient.nbFiles();
    res.status(200).json({ users: nbUsers, files: nbFiles });
  }
}

module.exports = AppController;
