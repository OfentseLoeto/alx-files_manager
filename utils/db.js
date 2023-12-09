const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    // Set default values or use environmental variables
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // MongoDB connection URI
    const uri = `mongodb://${host}:${port}/${database}`;

    // Create new MongoDB Client
    this.client = new MongoClient(uri, { useUnifiedTopology: true });

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
    // Returns the number of documents in the 'users' collection
    const db = this.client.db();
    const usersCollection = db.collection('users');
    return usersCollection.countDocuments();
  }

  async nbFiles() {
    // Returns the number of documents in the 'files' collection
    const db = this.client.db();
    const filesCollection = db.collection('files');
    return filesCollection.countDocuments();
  }

  async getUserByEmail(email) {
    const db = this.client.db();
    const usersCollection = db.collection('users');
    return usersCollection.findOne({ email });
  } catch (error) {
        console.error(`Error in getUserByEmail: ${error}`);
        throw error;
    }

  async insertUser(user) {
    const db = this.client.db();
    const usersCollection = db.collection('users');
    const result = await usersCollection.insertOne(user);
    return result.ops[0];
  } catch (error) {
        console.error(`Error in insertUser: ${error}`);
        throw error;
  }
}

// Create and export an instance of DBClient called 'dbClient'
const dbClient = new DBClient();
module.exports = dbClient;
