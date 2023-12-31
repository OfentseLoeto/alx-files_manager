import redisClient from '../utils/redis';
import { countUsers, countFiles } from '../utils/db';

class AppController {
  static async getStatus(req, res) {
    const redisAlive = redisClient.isAlive();
    const dbAlive = true;

    res.status(200).json({ redis: redisAlive, db: dbAlive });
  }

  static async getStats(req, res) {
    const usersCount = await countUsers();
    const filesCount = await countFiles();

    res.status(200).json({ users: usersCount, files: filesCount });
  }
}

export default AppController;
