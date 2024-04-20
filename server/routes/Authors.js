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
    const { name, nativeName, image, born, died, genres, authorInfo } = req.body;
    const author = new Author({ name, nativeName, image, born, died, genres, authorInfo });
    await author.save();
    res.status(201).json({ 
      message: "Author created",
      author,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE AUTHOR
router.patch('/:id', getAuthor, authenticationToken, authorValidationRules(), validation, async (req, res) => {
  try {
    if (req.userRole !== 'admin') return res.status(401).json({ message: "Access denied" });
    const id = req.params.id;
    const { name, nativeName, image, born, died, genres, authorInfo } = req.body;
    res.author.name = name;
    res.author.nativeName = nativeName;
    if (image) res.author.image = image;
    if (born) res.author.born = born;
    if (died) res.author.died = died;
    if (genres) res.author.genres = genres;
    if (authorInfo) res.author.authorInfo = authorInfo;
    await res.author.save();
    res.status(201).json({ 
      message: "Author updated",
      author: res.author,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL AUTHORS
router.get('/all', authenticationToken, async (req, res) => {
  try {
    if (req.userRole !== 'admin') return res.status(401).json({ message: "Access denied" });
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET AUTHORS
router.get('/', async (req, res) => {
  try {
    let searchKey = req.query.search || "";
    const limit = req.query.limit || 5;
    const page = req.query.page || 1;
    const skip = (page - 1) * limit;
    const authors = await Author.find({
      $or: [
        { name: { $regex: new RegExp(searchKey, 'i') } },
        { nativeName: { $regex: new RegExp(searchKey, 'i') } },
        { authorInfo: { $regex: new RegExp(searchKey, 'i') } }
      ]
    })
    .skip(skip)
    .limit(limit);
    res.status(200).json(authors);
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
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;
    const genre = capitalize(req.params.genre);
    const authors = await Author.find({ genres: genre })
    .skip(skip).limit(limit);
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE AUTHOR
router.delete('/:id', authenticationToken, getAuthor, async (req, res) => {
  try {
    if (req.userRole !== 'admin') return res.status(401).json({ message: "Access denied" });
    await Author.deleteOne(res.author);
    res.status(200).json({ 
      message: "Author deleted",
      author: res.author,
    });
  } catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router;