const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Couldn't find your account" });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const tokenOptions = {
      expiresIn: '30d',
    }
    const token = jwt.sign({
      userId: user._id
    }, process.env.CRYPTR_SECRETKEY, tokenOptions);

    res.status(200).json({ 
      message: "Login success",
      token: token
    });
  } catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router;