import { MongoClient } from 'mongodb';

class MongoDbHelper {
  constructor(url) {
    this.client = new MongoClient(url);
  }

  async connect() {
    await this.client.connect();
  }

  getDb(dbName) {
    if (!this.client) {
      throw new Error("MongoDB client is not initialized. Call 'connect' method first.");
    }
    return this.client.db(dbName);
  }
}

module.exports = MongoDbHelper;
