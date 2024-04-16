const Author = require('../../models/Author');

const getAuthor = async (req, res, next) => {
  try {
    const authorId = req.body.author;
    const author = await Author.findById(authorId);
    if (!author) return res.status(404).json({ message: 'Author not found' });
    res.author = author;
    return next();
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = getAuthor;