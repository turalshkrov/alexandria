const checkBookId = async (req, res, next) => {
  try {
    const { bookId } = req.body;
    if (res.list.books.find(_id => _id.toString() === bookId)) {
      res.hasBookId = true;
    }
    if(req.originalUrl.includes('add-book')){
      if (res.hasBookId) {
        return res.status(409).json({ message: `This is already in ${res.list.title}` });
      }
      return next();
    } else if (req.originalUrl.includes('remove-book')) {
      if (!res.hasBookId) {
        return res.status(404).json({ message: `Book not found in ${res.list.title}` });
      }
      return next();
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = checkBookId;