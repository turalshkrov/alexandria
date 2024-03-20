const express = require('express');
const Cryptr = require('cryptr');
const User = require('../models/User');
const getUser = require('../middlewares/getUser');
const sendVerifyMail = require('../services/mail/verifyEmail');
const userValidation = require('../middlewares/userValidation');
const userValidationRules = require('../validations/userValidationRules');
const router = express.Router();
require('dotenv').config();
const cryptr = new Cryptr(process.env.CRYPTR_SECRETKEY);

router.post('/register', userValidationRules(), userValidation, async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const user = new User({ name, username, email, password });
    const newUser = await user.save()
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

router.patch('/:id', getUser, async (req, res) => {
  try {
    const { name, username } = req.body;
    if (name) res.user.name = name;
    if (username) res.user.username = username;
    const updatedUser = await res.user.save();
    res.status(200).json({
      message: "User updated successfully",
      content: updatedUser,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', getUser, async (req, res) => {
  try {
    const deletedUser = await User.deleteOne(res.user);
    res.status(200).json({
      message: "User deleted successfully",
      content: deletedUser,
    })
  } catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router;