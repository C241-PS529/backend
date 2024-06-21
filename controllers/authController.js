const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  try {
      console.log(req.body);
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
          return res.status(401).json({ error: 'Invalid credentials' });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
          return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user.id_user }, 'your_jwt_secret');
      res.json({ token });
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};
