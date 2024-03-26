const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserRole = require('../models/UserRole');
const authenticationToken = require('../middlewares/auth/authenticationToken');
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const userRole = await UserRole.findOne({ userId: user._id });
    if (!user) {
      return res.status(404).json({ message: "Couldn't find your account" });
    }
    if (!user.active) {
      if (userRole.role === 'user') return res.status(401).json({ message: "Please verify your email address" });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const tokenOptions = {
      expiresIn: '30d',
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETKEY, tokenOptions);

    res.status(200).json({ 
      message: "Login success",
      token: token,
      userId: user._id,
      role: userRole,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;