const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { ObjectId } = require('mongodb');
const { redisClient } = require('../utils/redis');
const dbClient = require('../utils/db');

class AuthController {
  static async getConnect(req, res) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii').split(':');
    const email = credentials[0];
    const password = credentials[1];

    const user = await dbClient.db.collection('users').findOne({ email });
    if (!user || user.password !== crypto.createHash('sha1').update(password).digest('hex')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = uuidv4();

    await redisClient.set(`auth_${token}`, user._id.toString(), 24 * 60 * 60);

    res.status(200).json({ token });
  }

  static async getDisconnect(req, res) {
    const token = req.headers['x-token'];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await redisClient.del(`auth_${token}`);

    res.status(204).send();
  }
}

module.exports = AuthController;
