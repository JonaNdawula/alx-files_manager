import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    this.client = new MongoClient(`mongodb://${host}:${port}`, { useUnifiedTopology: true });
    this.dbName = database;
    this.connected = false;

    (async () => {
      try {
        await this.client.connect();
        this.connected = true;
        this.db = this.client.db(this.dbName);
      } catch (err) {
        console.error('Connection to MongoDB failed', err);
        this.connected = false;
      }
    })();
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    if (!this.connected) return 0;
    const collection = this.db.collection('users');
    return collection.countDocuments();
  }

  async nbFiles() {
    if (!this.connected) return 0;
    const collection = this.db.collection('files');
    return collection.countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
