const express = require('express');
const Book = require('../models/Book');
const Review = require('../models/Review');
const bookValidationRules = require('../validations/book/bookValidationRules');
const reviewValidationRules = require('../validations/review/reviewValidationRules');
const validation = require('../middlewares/validation');
const getBook = require('../middlewares/book/getBook');
const checkReview = require('../middlewares/review/checkReview');
const getSeries = require('../middlewares/book/getSeries');
const capitalize = require('../helpers/Capitalize');
const authenticationToken = require('../middlewares/auth/authenticationToken');
const router = express.Router();

// CREATE BOOK
router.post('/create', authenticationToken, bookValidationRules(), validation, getSeries, async (req, res) => {
  try {
    if (req.userRole !== 'admin') return res.status(401).json({ message: "Access denied" });
    const { title, originalTitle, author, cover, published, genres, language, description, epub, audio } = req.body;
    const book = new Book({ title, originalTitle, author, cover, published, genres, language, description, epub, audio });
    if (res.series) {
      res.series.books.push(book._id);
      book.series = res.series._id;
      await res.series.save();
    }
    await book.save();
    res.status(201).json({ messsage: "Book created" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET BOOKS
router.get('/', async (req, res) => {
  try {
    let searchKey = req.query.search || "";
    searchKey = searchKey.toLowerCase();
    const books = await Book.find().populate('author').populate('series');
    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchKey) ||
      book.originalTitle.toLowerCase().includes(searchKey) ||
      book.description.toLowerCase().includes(searchKey) ||
      book.author.name.toLowerCase().includes(searchKey) ||
      book.author.nativeName.toLowerCase().includes(searchKey));
    res.status(200).json(filteredBooks);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET BOOK BY ID
router.get('/:id', getBook, async (req, res) => {
  try {
    res.status(200).json(res.book);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET BOOKS BY AUTHOR ID
router.get('/author/:authorId', async (req, res) => {
  try {
    const authorId = req.params.authorId;
    const books = await Book.find({ author: authorId }).populate('author').populate('series');
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET BOOKS BY GENRE
router.get('/genre/:genre', async (req, res) => {
  try {
    const genre = capitalize(req.params.genre);
    const books = await Book.find().populate('author').populate('series');
    const booksByGenre = books.filter(book => book.genres.includes(genre));
    res.status(200).json(booksByGenre);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE BOOK
router.patch('/:id', authenticationToken, getBook, bookValidationRules(), validation, getSeries, async (req, res) => {
  try {
    if (req.userRole !== 'admin') return res.status(401).json({ message: "Access denied" });
    const { title, originalTitle, author, cover, published, genres, language, description, epub, audio } = req.body;
    res.book.title = title;
    res.book.originalTitle = originalTitle;
    res.book.author = author;
    res.book.published = published;
    res.book.genres = genres;
    res.book.language = language;
    res.book.description = description;
    res.book.epub = epub;
    res.book.audio = audio;
    if (cover) res.cover = cover;
    if (res.series) {
      res.series.books.push(res.book._id);
      res.book.series = res.series._id;
      await res.series.save();
    }
    await res.book.save();
    res.status(200).json({ message: "Book updated" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE BOOK BY ID
router.delete('/:id', authenticationToken, getBook, async (req, res) => {
  try {
    if (req.userRole !== 'admin') return res.status(401).json({ message: "Access denied" });
    await Book.deleteOne(res.book);
    res.status(200).json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/:id/reviews/add', authenticationToken, getBook, reviewValidationRules(), validation, checkReview, async (req, res) => {
  try {
    if (req.userRole !== 'user') return res.status(401).json({ message: "User not verified" });
    const { rating, title, content } = req.body;
    res.review.rating = rating;
    res.review.title = title;
    res.review.content = content;
    await res.review.save();
    const reviews = await Review.find({ bookId: res.book._id });
    res.book.ratingsCount = reviews.length;
    res.book.rating = Math.floor(reviews.map(review => review.rating).reduce((a, b) => a + b) * 10 / reviews.length) / 10;
    await res.book.save();
    res.status(201).json({ message: "Review updated" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id/reviews', getBook, async (req, res) => {
  try {
    const bookId = req.params.id;
    const reviews = await Review.find({ bookId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router;