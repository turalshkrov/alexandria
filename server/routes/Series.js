const express = require('express');
const Series = require('../models/Series');
const Book = require('../models/Book');
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
    const { title, description, books } = req.body;
    const series = new Series({ title, description, books });
    await series.save();
    res.status(200).json({ 
      message: "Series created",
      series,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE SERIES
router.patch('/:id', authenticationToken, getSeries, seriesValidationRules(), validation, getBooks, async (req, res) => {
  try {
    if (req.userRole !== 'admin') return res.status(409).json({ message: "Access denied" });
    const { title, description, books } = req.body;
    if (title) res.series.title = title;
    if (description)  res.series.description = description;
    if (books.length)  res.series.books = books;
    await res.series.save();
    res.status(200).json({ 
      message: "Series updated",
      series: res.series,
    });
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

// GET SERIES BY ID
router.get('/:id', getSeries, async (req, res) => {
  try {
    res.status(200).json(res.series);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE SERIES
router.delete('/:id', authenticationToken, getSeries, async (req, res) => {
  try {
    if (req.userRole !== 'admin') return res.status(409).json({ message: "Access denied" });
    res.series.books.map(async (bookId) => {
      const book = await Book.findById(bookId);
      book.series = undefined;
      await book.save();
    });
    await Series.findByIdAndDelete(req.params.id);
    res.status(200).json({ 
      message: "Series deleted",
      series: res.series,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;