const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const User = require('../users/user-model');
const uniqueUsername = require('../middleware/unique-username');
const usernameExists = require('../middleware/username-exists');
const secret = process.env.SECRET || 'shh';

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, secret, options);
}
router.post('/register', uniqueUsername, async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: 'username and password required' });
    } else {
      const newUser = await User.insert({
        username,
        password: bcrypt.hashSync(password, 8),
      });
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', usernameExists, async (req, res) => {
  try {
    const { body: { password }, user } = req;
    if (bcrypt.compareSync(password, user.password)) {
      res.json({ message: `welcome, ${user.username}`, token: generateToken(user) });
    } else {
      res.status(401).json({ message: 'invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
