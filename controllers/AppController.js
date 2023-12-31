import { isAlive as isRedisAlive, getCount as getUsersCount } from '../utils/redis';
import { getCount as getFilesCount } from '../utils/db';

const AppController = {
  async getStatus(req, res) {
    try {
      const isRedis = await isRedisAlive();
      const isDB = await getFilesCount();
      res.status(200).json({ redis: isRedis, db: isDB });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async getStats(req, res) {
    try {
      const usersCount = await getUsersCount();
      const filesCount = await getFilesCount();
      res.status(200).json({ users: usersCount, files: filesCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default AppController;
