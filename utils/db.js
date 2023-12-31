import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.client = new MongoClient(`mongodb://${this.host}:${this.port}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.client.connect((err) => {
      if (err) {
        console.error(`MongoDB connection error: ${err}`);
      } else {
        console.log('MongoDB connected');
      }
    });
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const usersCollection = this.client.db(this.database).collection('users');
    const usersCount = await usersCollection.countDocuments();
    return usersCount;
  }

  async nbFiles() {
    const filesCollection = this.client.db(this.database).collection('files');
    const filesCount = await filesCollection.countDocuments();
    return filesCount;
  }
}

const dbClient = new DBClient();

export default dbClient;
