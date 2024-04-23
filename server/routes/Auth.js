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
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }
    if (!user.active) {
      return res.status(401).json({ message: "Please verify your email address" });
    }
    
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRETKEY, { expiresIn: '1h'});
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRETKEY, { expiresIn: '30d'});

    res.status(200).json({
      message: "Login success",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/token', (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
  
    jwt.verify(refreshToken, process.env.JWT_SECRETKEY, (err, user) => {
      if (err) return res.sendStatus(403);
      const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRETKEY, { expiresIn: '1h' });
      res.status(200).json({ 
        message: "Login success",
        accessToken,
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/getMe', authenticationToken, async (req, res) => {
  try {
    const user = await User.findById(req.user).populate('favoriteBooks').populate('favoriteAuthors');
    if (!user) {
      return res.status(401);
    }
    const userRole = await UserRole.findOne({ userId: user._id });
    res.status(200).json({
      user,
      role: userRole.role,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;