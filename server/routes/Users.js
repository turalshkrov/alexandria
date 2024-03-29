const express = require('express');
const bcrypt = require('bcryptjs');
const Cryptr = require('cryptr');
const User = require('../models/User');
const UserRole = require('../models/UserRole');
const List = require('../models/List');
const Book = require('../models/Book');
const Author = require('../models/Author');
const getUser = require('../middlewares/user/getUser');
const sendVerifyMail = require('../services/mail/verifyEmail');
const validation = require('../middlewares/validation');
const userValidationRules = require('../validations/user/userValidationRules');
const usernameValidationRules = require('../validations/user/usernameValidationRules');
const userPasswordValidationRules = require('../validations/user/userPasswordValidationRules');
const checkEmail = require('../middlewares/user/checkEmail');
const checkUsername = require('../middlewares/user/checkUsername');
const authenticationToken = require('../middlewares/auth/authenticationToken');
const emailValidationRules = require('../validations/user/emailValidationRules');
const sendVerifyUpdateMail = require('../services/mail/verifyUpdateMail');
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

// UPDATE EMAIL ADRESS
router.patch('/update-email', authenticationToken, emailValidationRules(), checkEmail, validation, async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findById(req.user);
    user.newEmail = email;
    await user.save();
    res.status(200).json({ message: "Verify link sent email, please check your email" });
    sendVerifyUpdateMail(email, email);
  } catch (error) {
    res.status(500).send(error);
  }
});

// VERIFY NEW EMAIL
router.get('/update-email/verify/:hashEmail', async (req, res) => {
  try {
    const hashEmail = req.params.hashEmail;
    const email = cryptr.decrypt(hashEmail);
    const user = await User.findOne({ newEmail: email });
    user.email = email;
    user.newEmail = undefined;
    await user.save();
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
    const users = await User.find({ active: true }).populate('favoriteBooks').populate('favoriteAuthors');
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
    const listsByUser = await List.find({ user: userId }).populate('user');
    res.status(200).json(listsByUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE USER
router.patch('/update', authenticationToken, usernameValidationRules(), validation, checkUsername, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const { name, username, profileImage } = req.body;
    user.name = name;
    user.username = username;
    user.profileImage = profileImage;
    await user.save();
    res.status(200).json({ message: "User updated" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE PASSWORD
router.patch('/update-password', authenticationToken, userPasswordValidationRules(), validation, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('+password');
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

// ADD TO FAVORITE BOOKS
router.patch('/add-favorite-books', authenticationToken, async (req, res) => {
  try {
    const { bookId } = req.body;
    const book = await Book.findById(bookId);
    if (!book) return res.status(409).json({ message: "Book not found" });
    const user = await User.findById(req.user);
    if (user.favoriteBooks.includes(book._id)) return res.status(409).json({ message: "Book is already in favorites" });
    user.favoriteBooks.push(book._id);
    await user.save();
    res.status(200).json({ message: "Book added to favorites" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ROMOVE FROM FAVORITE BOOKS
router.patch('/remove-favorite-books', authenticationToken, async (req, res) => {
  try {
    const { bookId } = req.body;
    const book = await Book.findById(bookId);
    if (!book) return res.status(409).json({ message: "Book not found" });
    const user = await User.findById(req.user);
    if (!user.favoriteBooks.includes(book._id)) return res.status(409).json({ message: "Book not found in favorites" });
    user.favoriteBooks = user.favoriteBooks.filter(id => id.toString() !== bookId);
    await user.save();
    res.status(200).json({ message: "Book removed from favorites" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ADD TO FAVORITE AUTHORS
router.patch('/add-favorite-authors', authenticationToken, async (req, res) => {
  try {
    const { authorId } = req.body;
    const author = await Author.findById(authorId);
    if (!author) return res.status(409).json({ message: "Author not found" });
    const user = await User.findById(req.user);
    if (user.favoriteAuthors.includes(author._id)) return res.status(409).json({ message: "Author is already in favorites" });
    user.favoriteAuthors.push(author._id);
    await user.save();
    res.status(200).json({ message: "Author added to favorites" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ROMOVE FROM FAVORITE AUTHORS
router.patch('/remove-favorite-authors', authenticationToken, async (req, res) => {
  try {
    const { authorId } = req.body;
    const author = await Author.findById(authorId);
    if (!author) return res.status(409).json({ message: "Author not found" });
    const user = await User.findById(req.user);
    if (!user.favoriteAuthors.includes(author._id)) return res.status(409).json({ message: "Author not found in favorites" });
    user.favoriteAuthors = user.favoriteAuthors.filter(id => id.toString() !== authorId);
    await user.save();
    res.status(200).json({ message: "Author removed from favorites" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE USER
router.delete('/', authenticationToken, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    user.active = false;
    await user.save();
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;