import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/files_manager', { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model('User', {
  email: String,
  password: String,
});

async function createUser(user) {
  const newUser = new User(user);
  return newUser.save();
}

async function isEmailExist(email) {
  const user = await User.findOne({ email });
  return user !== null;
}

export { createUser, isEmailExist };
