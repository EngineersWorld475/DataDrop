import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (
      !username ||
      !email ||
      !password ||
      username === '' ||
      email === '' ||
      password === ''
    ) {
      res.status(400).send({
        message: 'All fields are required',
      });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const user = await new User({
      username,
      email,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      message: 'User registered successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message,
    });
  }
};
