const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

class AppController {
  static getStatus(req, res) {
    const redisAlive = redisClient.isAlive();
    const dbAlive = dbClient.isAlive();

    res.status(200).json({ redis: redisAlive, db: dbAlive });
  }

  static getStats(req, res) {
    try {
      const nbUsers = dbClient.nbUsers();
      const nbFiles = dbClient.nbUsers();

      res.status(200).json({ users: nbUsers, files: nbFiles });
    } catch (error) {
      console.log(`Error in getStats: ${error}`);

      res.status(500).json('{ error: Internal Server Error }');
    }
  }
}
module.exports = AppController;
