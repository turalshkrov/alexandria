const Book = require('../../models/Book');

const getBooks = async (req, res, next) => {
  try {
    const { books } = req.body;
    if (books) {
      books.map(async (id, index) => {
        const book = await Book.findById(id);
        if (!book) return res.status(404).json({ message: `Book ${index + 1} not found` });
      });
    }
    return next();
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = getBooks;