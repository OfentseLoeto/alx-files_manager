import { createUser, isEmailExist } from '../utils/db';

const UsersController = {
  async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const emailExists = await isEmailExist(email);

    if (emailExists) {
      return res.status(400).json({ error: 'Already exist' });
    }

    // Hash the password
    const hashedPassword = require('crypto').createHash('sha1').update(password).digest('hex');

    const newUser = {
      email,
      password: hashedPassword,
    };

    try {
      const createdUser = await createUser(newUser);
      const userResponse = { id: createdUser._id, email: createdUser.email };
      return res.status(201).json(userResponse);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default UsersController;
