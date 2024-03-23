const express = require('express');
const bcrypt = require('bcryptjs');
const Cryptr = require('cryptr');
const User = require('../models/User');
const UserRole = require('../models/UserRole');
const List = require('../models/List');
const getUser = require('../middlewares/user/getUser');
const sendVerifyMail = require('../services/mail/verifyEmail');
const validation = require('../middlewares/validation');
const userValidationRules = require('../validations/user/userValidationRules');
const userPasswordValidationRules = require('../validations/user/userPasswordValidationRules');
const checkEmail = require('../middlewares/user/checkEmail');
const checkUsername = require('../middlewares/user/checkUsername');
const authenticationToken = require('../middlewares/auth/authenticationToken');
const router = express.Router();
require('dotenv').config();
const cryptr = new Cryptr(process.env.CRYPTR_SECRETKEY);

// CREATE USER
router.post('/register', userValidationRules(), validation, checkEmail, checkUsername, async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const user = new User({ name, username, email, password });
    const userRole = new UserRole({ userId: user._id });
    const newUser = await user.save();
    await userRole.save();
    res.status(201).json({ message: "User created successfully, Please verify email address" });
    sendVerifyMail(newUser.email, newUser._id);
  } catch (error) {
    res.status(500).json(error);
  }
});

// VERIFY EMAIL ADDRESS
router.get('/register/verify/:hashid', async (req, res) => {
  try {
    const hashId = req.params.hashid;
    const id = cryptr.decrypt(hashId);
    await User.findByIdAndUpdate(id, {
      active: true,
    });
    res.status(200).json({ message: "Email verifed successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET USERS
router.get('/', async (req, res) => {
  try {
    let searchKey = req.query.search || "";
    searchKey = searchKey.toLowerCase();
    const users = await User.find({ active: true });
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchKey) ||
      user.username.toLowerCase().includes(searchKey) ||
      user.email.toLowerCase().includes(searchKey));
    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET USER BY ID
router.get('/:id', getUser, async (req, res) => {
  try {
    if (!res.user.active) return res.status(404).json({ message: "User not found" });
    res.status(200).json(res.user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET LISTS BY USER
router.get('/:id/lists', getUser, async (req, res) => {
  try {
    const userId = req.params.id
    const listsByUser = await List.find({ user: userId });
    res.status(200).json(listsByUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE USER NAME AND USERNAME
router.patch('/update', authenticationToken, userValidationRules(), validation, checkUsername, async (req, res) => {
  try {
    if (req.userRole !== 'user') return res.status(401).json({ message: "Access denied" });
    const user = await User.findById(req.user);
    const { name, username } = req.body;
    user.name = name;
    user.username = username;
    await user.save();
    res.status(200).json({
      message: "User updated"
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE PASSWORD
router.patch('/update-password', authenticationToken, userPasswordValidationRules(), validation, async (req, res) => {
  try {
    if (req.userRole !== 'user') return res.status(401).json({ message: "Access denied" });
    const user = await User.findById(req.user);
    const password = req.body.password;
    if (!(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: 'Password is incorrect' });
    } else {
      user.password = req.body.newPassword;
      await user.save();
      res.status(200).json({ 
        message: 'Password updated' 
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE USER
router.delete('/:id', authenticationToken, async (req, res) => {
  try {
    if (req.userRole !== 'user') return res.status(401).json({ message: "Access denied" });
    const user = await User.findById(req.user);
    user.active = false;
    await user.save();
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;