const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    // Set default values or use environmental variables
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // MongoDB connectio URI
    const uri = `mongodb://${host}:${port}/${database}`;

    // Create new MongoDb Client
    this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    // Connect to MongoDB client
    this.client.connect((err) => {
      if (err) {
        console.error(`MongoDB connection error: ${err}`);
      }
    });
  }

  isAlive() {
    // Check if connection to MongoDB is successful
    return this.client.isConnected();
  }

  async nbUsers() {
    // returns the number of documents in the 'users' collection
    const db = this.client.db();
    const usersCollection = db.collection('users');
    return usersCollection.countDocuments();
  }

  nbFiles() {
    // Returns the number of documents in the 'files' collection
    const db = this.client.db();
    const filesCollection = db.collection('files');
    return filesCollection.countDocuments();
  }
}

// Create and export an instance of DBClient called 'dbClient'
const dbClient = new DBClient();
module.exports = dbClient;
