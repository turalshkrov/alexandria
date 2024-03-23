const express = require('express')
const Author = require('../models/Author');
const authorValidationRules = require('../validations/author/authorValidationRules');
const validation = require('../middlewares/validation');
const authenticationToken = require('../middlewares/auth/authenticationToken');
const getAuthor = require('../middlewares/author/getAuthor');
const capitalize = require('../helpers/Capitalize');
const router = express.Router();

// CREATE AUTHOR
router.post('/create', authenticationToken, authorValidationRules(), validation, async (req, res) => {
  try {
    if (req.userRole !== 'admin') return res.status(401).json({ message: "Access denied" });
    const { name, nativeName, imageUrl, born, died, genres, authorInfo } = req.body;
    const author = new Author({ name, nativeName, imageUrl, born, died, genre, authorInfo });
    await author.save();
    res.status(201).json({ message: "Author created" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE AUTHOR
router.patch('/:id', getAuthor, authenticationToken, authorValidationRules(), validation, async (req, res) => {
  try {
    if (req.userRole !== 'admin') return res.status(401).json({ message: "Access denied" });
    const id = req.params.id;
    const { name, nativeName, imageUrl, born, died, genres, authorInfo } = req.body;
    res.author.name = name;
    res.author.nativeName = nativeName;
    if (imageUrl) res.author.imageUrl = imageUrl;
    if (born) res.author.born = born;
    if (died) res.author.died = died;
    if (genres) res.author.genres = genres;
    if (authorInfo) res.author.authorInfo = authorInfo;
    await res.author.save();
    res.status(201).json({ message: "Author updated" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET AUTHORS
router.get('/', async (req, res) => {
  try {
    let searchKey = req.query.search || "";
    searchKey = searchKey.toLowerCase();
    const authors = await Author.find();
    const filteredAuthors = authors.filter(author => author.name.toLowerCase().includes(searchKey) ||
    author.nativeName.toLowerCase().includes(searchKey) ||
    author.authorInfo.toLowerCase().includes(searchKey));
    res.status(200).json(filteredAuthors);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET AUTHOR BY ID
router.get('/:id', getAuthor, async (req, res) => {
  try {
    res.status(200).json(res.author);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET AUTHOR BY GENRES
router.get('/genres/:genre', async (req, res) => {
  try {
    const genre = capitalize(req.params.genre);
    const authors = await Author.find();
    const authorsByGenre = authors.filter(author => author.genres.includes(genre));
    res.status(200).json(authorsByGenre);
  } catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router;