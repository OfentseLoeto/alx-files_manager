// controllers/UsersController.js

const sha1 = require('sha1');
const dbClient = require('../utils/db');

class UsersController {
  static async postNew(req, res) {
    try {
      const { email, password } = req.body;

      // Check if email and password are provided
      if (!email) {
        return res.status(400).json({ error: 'Missing email' });
      }

      if (!password) {
        return res.status(400).json({ error: 'Missing password' });
      }

      // Check if the email already exists in DB
      const existingUser = await dbClient.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Already exists' });
      }

      // Hash the password using SHA1
      const hashedPassword = sha1(password);

      // Create a new user
      const newUser = {
        email,
        password: hashedPassword,
      };

      // Save the new user in the database
      const result = await dbClient.insertUser(newUser);

      // Return the new user with only email and id
      return res.status(201).json({
        email: result.ops[0].email,
        id: result.insertedId,
      });
    } catch (error) {
      console.error(`Error in postNew: ${error}`);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = UsersController;
