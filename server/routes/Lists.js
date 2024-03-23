const express = require('express');
const List = require('../models/List');
const authenticationToken = require('../middlewares/auth/authenticationToken');
const listValidationRules = require('../validations/list/listValidationRules');
const validation = require('../middlewares/validation');
const getList = require('../middlewares/list/getList');
const checkBookId = require('../middlewares/list/checkBookId');
const router = express.Router();

// CREATE LIST
router.post('/create', authenticationToken, listValidationRules(), validation, async (req, res) => {
  try {
    const { title } = req.body;
    const list = new List({ user: req.user.userId, title });
    await list.save();
    res.status(201).json({ message: "List created successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET LISTS
router.get('/', async (req, res) => {
  try {
    let searchKey = req.query.search || "";
    searchKey = searchKey.toLowerCase();
    const lists = await List.find().populate('books');
    const filteredLists = lists.filter(list => list.title.toLowerCase().includes(searchKey));
    res.status(200).json(filteredLists);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET LIST BY ID
router.get('/:id', getList, async (req, res) => {
  try {
    res.status(200).json(res.list);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE LIST TITLE
router.patch('/:id', authenticationToken, getList, listValidationRules(), validation, async (req, res) => {
  try {
    if(res.list.user.toString() !== req.user) return res.status(401).json({ message: "Access denied" });
    const { title } = req.body;
    res.list.title = title;
    await res.list.save();
    res.status(200).json({ message: "List updated" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE LIST
router.delete('/:id', authenticationToken, getList, async (req, res) => {
  try {
    if(res.list.user.toString() !== req.user) return res.status(401).json({ message: "Access denied" });
    await List.deleteOne(res.list);
    res.status(200).json({ message: "List deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ADD TO LIST
router.patch('/:id/add-book', authenticationToken, checkBookId, async (req, res) => {
  try {
    if(res.list.user.toString() !== req.user) return res.status(401).json({ message: "Access denied" });
    const bookId = req.body.bookId;
    res.list.books.push(bookId);
    await res.list.save();
    res.status(200).json({
      message: `Added to ${res.list.title}`,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// REMOVE FROM LIST
router.patch('/:id/remove-book', authenticationToken, checkBookId, async (req, res) => {
  try {
    if(res.list.user.toString() !== req.user) return res.status(401).json({ message: "Access denied" });
    const bookId = req.body.bookId;
    res.list.books = [ ...res.list.books.filter(_id => _id.toString() !== bookId) ];
    await res.list.save();
    res.status(200).json({
      message: `Removed from ${res.list.title}`,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;