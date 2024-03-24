const express = require('express');
const Series = require('../models/Series');
const authenticationToken = require('../middlewares/auth/authenticationToken');
const getSeries = require('../middlewares/series/getSeries');
const getBooks = require('../middlewares/series/getBooks');
const checkBookId = require('../middlewares/series/checkBookId');
const seriesValidationRules = require('../validations/series/seriesValidationRules');
const validation = require('../middlewares/validation');
const router = express.Router();

// CREATE SERIES
router.post('/create', authenticationToken, seriesValidationRules(), validation, getBooks, async (req, res) => {
  try {
    if (req.userRole !== 'admin') return res.status(409).json({ message: "Access denied" });
    const { title, books } = req.body;
    const series = new Series({ title, books });
    await series.save();
    res.status(200).json({ message: "Series created" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE SERIES
router.patch('/:id', authenticationToken, getSeries, seriesValidationRules(), validation, getBooks, async (req, res) => {
  try {
    if (req.userRole !== 'admin') return res.status(409).json({ message: "Access denied" });
    const { title, books } = req.body;
    res.series.title = title;
    res.series.books = books;
    await res.series.save();
    res.status(200).json({ message: "Series updated" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ADD BOOK TO SERIES
router.patch('/:id/add-book', authenticationToken, getSeries, checkBookId, async (req, res) => {
  try {
    if (req.userRole !== 'admin') return res.status(409).json({ message: "Access denied" });
    const { bookId } = req.body;
    res.series.books.push(bookId);
    await res.series.save();
    res.status(200).json({ message: "Book added" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// REMOVE BOOK FROM SERIES
router.patch('/:id/remove-book', authenticationToken, getSeries, checkBookId, async (req, res) => {
  try {
    if (req.userRole !== 'admin') return res.status(409).json({ message: "Access denied" });
    const { bookId } = req.body;
    res.series.books = res.series.books.filter(bookid => bookId.toString() !== bookId);
    await res.series.save();
    res.status(200).json({ message: "Book removed" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET SERIES
router.get('/', async (req, res) => {
  try {
    let searchKey = req.query.search || "";
    searchKey = searchKey.toLowerCase();
    const series = await Series.find().populate('books');
    const filteredSeries = series.filter(series => series.title.toLowerCase().includes(searchKey));
    res.status(200).json(filteredSeries);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;