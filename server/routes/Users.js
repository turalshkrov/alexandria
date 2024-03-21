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
const Bookshelf = require('../models/Bookshelf');
const router = express.Router();
require('dotenv').config();
const cryptr = new Cryptr(process.env.CRYPTR_SECRETKEY);

// CREATE USER
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

// VERIFY EMAIL ADDRESS
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

// GET USERS
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

// GET USER BY ID
router.get('/:id', getUser, async (req, res) => {
  try {
    const user = res.user;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE USER NAME AND USERNAME
router.patch('/:id', getUser, userValidationRules(), userValidation, checkUsername, async (req, res) => {
  try {
    const { name, username } = req.body;
    res.user.name = name;
    res.user.username = username;
    await res.user.save();
    res.status(200).json({
      message: "User updated"
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE PASSWORD
router.patch('/update-password/:id', getUser, userPasswordValidationRules(), userValidation, async (req, res) => {
  try {
    const password = req.body.password;
    if (!(await bcrypt.compare(password, res.user.password))) {
      res.status(401).json({ message: 'Password is incorrect' });
    } else {
      res.user.password = req.body.newPassword;
      await res.user.save();
      res.status(200).json({ 
        message: 'Password updated' 
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE USER
router.delete('/:id', getUser, async (req, res) => {
  try {
    res.user.active = false;
    await res.user.save();
    res.status(200).json({
      message: "User deleted"
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// CRAETE BOOKSHELF
router.patch('/:id/create-bookshelf', async (req, res) => {
  try {
    const userId = req.params.id;
    const { title } = req.body;
    const user = await User.findById(userId);
    const bookshelf = new Bookshelf({ title });
    user.bookshelves.push(bookshelf);
    await user.save();
    res.status(200).json({
      message: "Bookshelf created"
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE BOOKSHELF
router.patch('/:id/delete-bookshelf', async (req, res) => {
  try {
    const userId = req.params.id;
    const { bookshelfId } = req.body;
    const user = await User.findById(userId);
    user.bookshelves = [ ...user.bookshelves.filter(bookshelf => bookshelf._id.toString() !== bookshelfId) ];
    console.log(bookshelfId, user.bookshelves);
    await user.save();
    res.status(200).json({
      message: "Bookshelf deleted"
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE BOOKSHELF NAME
router.patch('/:id/update-bookshelf', async (req, res) => {
  try {
    const userId = req.params.id;
    const { bookshelfId, title } = req.body;
    const user = await User.findById(userId);
    user.bookshelves.find(bookshelf => bookshelf._id.toString() === bookshelfId).title = title;
    user.markModified('bookshelves');
    await user.save();
    res.status(200).json({
      message: "Bookshelf created"
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ADD BOOK TO BOOKSHELF
router.patch('/:id/add-to-bookshelf', async (req, res) => {
  try {
    let bookshelfTitle;
    const userId = req.params.id;
    const { bookshelfId, bookId } = req.body;
    const user = await User.findById(userId);
    user.bookshelves.map(bookshelf => {
      if (bookshelf._id.toString() === bookshelfId) {
        const index = bookshelf.books.indexOf(bookId);
        if (index > -1) {
          bookshelf.books.push(bookId);
          bookshelfTitle = bookshelf.title;
        }
      }
    });
    user.markModified('bookshelves');
    await user.save();
    res.status(200).json({
      message: `Added to ${bookshelfTitle}`,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// REMOVE BOOK FROM BOOKSHELF
router.patch('/:id/remove-from-bookshelf', async (req, res) => {
  try {
    let bookshelfTitle;
    const userId = req.params.id;
    const { bookshelfId, bookId } = req.body;
    const user = await User.findById(userId);
    user.bookshelves.map(bookshelf => {
      if (bookshelf._id.toString() === bookshelfId) {
        const index = bookshelf.books.indexOf(bookId);
        if (index > -1) {
          bookshelf.books.splice(index, 1);
          bookshelfTitle = bookshelf.title;
        }
      }
    });
    user.markModified('bookshelves');
    await user.save();
    res.status(200).json({
      message: `Removed from ${bookshelfTitle}`,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;