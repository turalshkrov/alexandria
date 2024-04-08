const express = require('express');
const Genre = require('../models/Genre');
const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { name, cover } = req.body;
    const genre = new Genre({ name, cover });
    await genre.save();
    res.status(200).json({ message: "Genre created" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;