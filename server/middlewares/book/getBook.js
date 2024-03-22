const Book = require('../../models/Book');

const getBook = async (req, res, next) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id).populate('author');
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.book = book;
    return next();
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = getBook;