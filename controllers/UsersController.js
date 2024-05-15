import { v4 as uuidv4 } from 'uuid';
import sha1 from 'sha1';

import dbClient from '../utils/db';

const UsersController = {
  async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const user = await dbClient.usersCollection.findOne({ email });

    if (user) {
      return res.status(400).json({ error: 'Already exist' });
    }

    const hashedPassword = sha1(password);

    const newUser = {
      email,
      password: hashedPassword,
      _id: uuidv4(),
    };

    await dbClient.usersCollection.insertOne(newUser);

    return res.status(201).json({ email: newUser.email, id: newUser._id });
  },
};

module.exports = UsersController;
