const express = require('express');
const bcrypt = require('bcryptjs');
const Cryptr = require('cryptr');
const User = require('../models/User');
const UserRole = require('../models/UserRole');
const List = require('../models/List');
const Book = require('../models/Book');
const Author = require('../models/Author');
const Review = require('../models/Review');
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
const emailVerifySuccess = require('../services/html template');
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
    sendVerifyMail(newUser.email, newUser._id, newUser.name);
    res.status(201).json({ message: "Verify mail sent, please verify email address" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// VERIFY EMAIL ADDRESS
router.get('/register/verify/:hashid', async (req, res) => {
  try {
    const hashId = req.params.hashid;
    const id = cryptr.decrypt(hashId);
    const user = await User.findById(id);
    user.active = true;
    await user.save();
    res.status(200).send(emailVerifySuccess);
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
    sendVerifyUpdateMail(email, email, user.name);
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
    res.status(200).send(emailVerifySuccess);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET ALL USERS
router.get('/all', authenticationToken, async (req, res) => {
  try {
    if (req.userRole !== 'admin') return res.status(401).json({ message: "Access denied" });
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET USERS STATS
router.get('/stats', authenticationToken, async (req, res) => {
  try {
    if (req.userRole !== 'admin') return res.status(401).json({ message: "Access denied" });
    const users = await User.find();
    const reviews = await Review.find();
    const lists = await List.find();
    const monthlyUsers = users.filter(user => {
      const date  = new Date();
      date.setDate(0);
      if (new Date(user.createdAt) > date) {
        return true;
      }
    });
    const newUsers = users.filter(user => {
      const date  = new Date();
      const lastWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
      if (new Date(user.createdAt) > lastWeek) {
        return true;
      }
    });
    res.status(200).json({
      totalUsers: users.length,
      monthlyUsers: monthlyUsers.length,
      newUsers: newUsers.length,
    })
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

// GET USER LISTS
router.get('/:id/lists', getUser, async (req, res) => {
  try {
    const userId = req.params.id
    const userLists = await List.find({ user: userId }).populate({
      path: 'books',
      populate: {
        path: 'author'
      }
    }).populate('user', 'name username');
    res.status(200).json(userLists);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET USER REVIEWS
router.get('/:id/reviews', getUser, async (req, res) => {
  try {
    const user = req.params.id;
    const userReviews = await Review.find({ user }).populate('user');
    res.status(200).json(userReviews);
  } catch (error) {
    res.status(500).json(error);
  }
})

// UPDATE USER
router.patch('/update', authenticationToken, usernameValidationRules(), validation, checkUsername, async (req, res) => {
  try {
    const user = await User.findById(req.user).populate('favoriteBooks').populate('favoriteAuthors');
    const { name, username, profileImage, location } = req.body;
    if (name) user.name = name;
    if (username) user.username = username;
    if (location) user.location = location;
    if (profileImage) user.profileImage = profileImage;
    await user.save();
    res.status(200).json({ 
      message: "User updated",
      user
    });
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
    res.status(200).json({ 
      message: "Book added to favorites",
      book
    });
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
    res.status(200).json({
      message: "Book removed from favorites",
      book
    });
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
    res.status(200).json({ 
      message: "Author added to favorites",
      author
    });
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
    res.status(200).json({ 
      message: "Author removed from favorites",
      author
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE USER
router.patch('/', authenticationToken, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('+password');
    const password = req.body.password;
    if (!(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: 'Password is incorrect' });
    } else {
      await User.deleteOne(user)
      res.status(200).json({ message: "User deleted" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;