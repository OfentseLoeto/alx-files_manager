const Redis = require('redis');

class RedisClient {
  constructor() {
    this.client = Redis.createClient();

    // Displaying any error to the console
    this.client.on('error', (err) => {
      console.log(`Redis client error: ${err}`);
    });
  }

  isAlive() {
    // Check if connection to Redis is successful
    return this.client.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  async set(key, value, duration) {
    // Store the value in Redis with an expireation
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', duration, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }
}

// Create and export an instance of RedisClient called RedisClient
const redisClient = new RedisClient();
module.exports = redisClient;
