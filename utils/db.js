const MongoClient = require('mongodb').MongoClient;

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = parseInt(process.env.DB_PORT, 10) || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.client = null;
    this.db = null;
    this.connect();
  }

  async connect() {
    try {
      this.client = await MongoClient.connect(`mongodb://${this.host}:${this.port}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      this.db = this.client.db(this.database);
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  isAlive() {
    return this.client && this.client.isConnected();
  }

  async nbUsers() {
    try {
      const count = await this.db.collection('users').countDocuments();
      return count;
    } catch (error) {
      console.error('Error counting users:', error);
      return 0;
    }
  }

  async nbFiles() {
    try {
      const count = await this.db.collection('files').countDocuments();
      return count;
    } catch (error) {
      console.error('Error counting files:', error);
      return 0;
    }
  }
}

const dbClient = new DBClient();

module.exports = dbClient;
