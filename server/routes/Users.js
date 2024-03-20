const express = require('express');
const User = require('../models/User');
const getUser = require('../middlewares/getUser');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const user = new User({ name, username, email, password });
    const newUser = await user.save()
    res.status(201).json({
      message: "User created successfully",
      content: newUser,
    });
  } catch (error) {
    res.status(500).json(error);
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
    const { name, username, email } = req.body;
    if (name) res.user.name = name;
    if (username) res.user.username = username;
    if (email) res.user.email = email;
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