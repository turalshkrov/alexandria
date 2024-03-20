const express = require('express');
const bcrypt = require('bcryptjs');
const Cryptr = require('cryptr');
const User = require('../models/User');
const getUser = require('../middlewares/user/getUser');
const sendVerifyMail = require('../services/mail/verifyEmail');
const userValidation = require('../middlewares/user/userValidation');
const userValidationRules = require('../validations/userValidationRules');
const userPasswordValidationRules = require('../validations/userPasswordValidationRules');
const checkEmail = require('../middlewares/user/checkEmail');
const checkUsername = require('../middlewares/user/checkUsername');
const router = express.Router();
require('dotenv').config();
const cryptr = new Cryptr(process.env.CRYPTR_SECRETKEY);

router.post('/register', userValidationRules(), userValidation, checkEmail, checkUsername, async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const user = new User({ name, username, email, password });
    const newUser = await user.save();
    res.status(201).json({
      message: "User created successfully, Please verify email address",
    });
    sendVerifyMail(newUser.email, newUser._id);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/register/verify/:hashid', async (req, res) => {
  try {
    const hashId = req.params.hashid;
    const id = cryptr.decrypt(hashId);
    await User.findByIdAndUpdate(id, {
      active: true,
    });
    res.status(200).json({
      message: "Email verifed successfully"
    })
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const searchKey = req.query.search || "";
    const users = await User.find();
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchKey.toLowerCase()) ||
      user.username.toLowerCase().includes(searchKey.toLowerCase()) ||
      user.email.toLowerCase().includes(searchKey.toLowerCase()));
    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', getUser, async (req, res) => {
  try {
    const user = res.user;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.patch('/:id', getUser, userValidationRules(), userValidation, checkUsername, async (req, res) => {
  try {
    const { name, username } = req.body;
    res.user.name = name;
    res.user.username = username;
    await res.user.save();
    res.status(200).json({
      message: "User updated successfully"
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.patch('/update-password/:id', getUser, userPasswordValidationRules(), userValidation, async (req, res) => {
  try {
    const password = req.body.password;
    if(!(await bcrypt.compare(password, res.user.password))) {
      res.status(401).json({ message: 'Password is incorrect' });
    } else {
      res.user.password = req.body.newPassword;
      await res.user.save();
      res.status(200).json({ message: 'Password updated successfully' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', getUser, async (req, res) => {
  try {
    await User.deleteOne(res.user);
    res.status(200).json({
      message: "User deleted successfully"
    })
  } catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router;