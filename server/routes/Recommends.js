const Recommend = require('../models/Recommend');
const express = require('express');
const router = express.Router();

router.get('/:title', async (req, res) => {
  try {
    const title = req.params.title;
    const data = await Recommend.findOne({ title })
    .populate({
      path: 'books',
      populate: {
        path: 'author'
      }
    });
    res.status(200).json(data.books);
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;