const Author = require('../../models/Author');

const getAuthor = async (req, res, next) => {
  try {
    const id = req.params.id;
    const author = await Author.findById(id);
    if (!author) return res.status(404).json({ message: "Author not found" });
    res.author = author;
    return next();
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = getAuthor;