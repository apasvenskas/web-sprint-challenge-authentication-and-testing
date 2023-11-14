// const router = require("express").Router();
// const bcrypt = require("bcryptjs");
// const { insert, getByUsername }= require("../users/user-model");
// const jwt = require("jsonwebtoken");
// const { JWT_SECRET } = require("./secret");
// const restricted = require("../middleware/restricted")

// const generateToken = (user) => {
//   const payload = {
//     subject: user.id,
//   };
//   const token = jwt.sign(payload, JWT_SECRET);
//   return token;
// };

// const verifyPassword = async (password, hash) => {
//   return await bcrypt.compare(password, hash);
// }

// router.post("/api/auth/register", async (req, res) => {
//   console.log(req.body);
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.status(400).json("username and password required");
//   }
//   const user = await getByUsername({ username });
//   if (user) {
//     return res.status(409).json("username taken");
//   }
//   const hashedPassword = await bcrypt.hash(password, 8);
//   const newUser = await insert({
//     username,
//     password: hashedPassword,
//   });
//   const valid = await verifyPassword(password, newUser.password);
//   if (!valid) {
//     return res.status(401).json({ message: "invalid credentials" });
//   }
//   res.status(201).json({
//     id: newUser.id,
//     username: newUser.username,
//   });
// });

// router.post("/api/auth/login", async (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.status(400).json({ message: "username and password required" });
//   }
//   const user = await getByUsername({ username });
//   if (!user) {
//     return res.status(401).json({ message: "invalid credentials" });
//   }
//   const valid = await verifyPassword(password, user.password);
//   if (!valid) {
//     return res.status(401).json({ message: "invalid credentials" });
//   }
//   const token = generateToken(user);
//   res.status(200).json({ message: `welcome, ${user.username}`, token });
// });

// module.exports = router;

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
    const newUser = await User.insert({
      username,
      password: bcrypt.hashSync(password, 8),
    });
    res.status(201).json(newUser);
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
