const express = require('express');
const Book = require('../models/Book');
const bookValidationRules = require('../validations/book/bookValidationRules');
const validation = require('../middlewares/validation');
const getBook = require('../middlewares/book/getBook');
const capitalize = require('../helpers/Capitalize');
const router = express.Router();

// CREATE BOOK
router.post('/create', bookValidationRules(), validation, async (req, res) => {
  try {
    const { title, originalTitle, author, published, genres, language, description, format } = req.body;
    const book = new Book({ title, originalTitle, author, published, genres, language, description, format });
    console.log(book);
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
    const books = await Book.find();
    const filteredBooks = books.filter(book => book.title.includes(searchKey) ||
    book.originalTitle.includes(searchKey));
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
    const books = await Book.find();
    const booksByAuthor = books.filter(book => book.author.toString() === authorId);
    res.status(200).json(booksByAuthor);
  } catch (error) {
   res.status(500).json(error);
  }
});

// GET BOOKS BY GENRE
router.get('/genre/:genre', async (req, res) => {
  try {
    const genre = capitalize(req.params.genre);
    const books = await Book.find();
    const booksByGenre = books.filter(book => book.genres.includes(genre));
    res.status(200).json(booksByGenre);
  } catch (error) {
   res.status(500).json(error);
  }
});

// UPDATE BOOK
router.patch('/:id', getBook, bookValidationRules(), validation, async (req, res) => {
  try {
    const { title, originalTitle, author, published, genres, language, description, format } = req.body;
    res.book.title = title;
    res.book.originalTitle = originalTitle;
    res.book.author = author;
    res.book.published = published;
    res.book.genres = genres;
    res.book.language = language;
    res.book.description = description;
    res.book.format = format;
    await res.book.save();
    res.status(200).json({ message: "Book updated" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE BOOK BY ID
router.delete('/:id', getBook, async (req, res) => {
  try {
    await Book.deleteOne(res.book);
    res.status(200).json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;