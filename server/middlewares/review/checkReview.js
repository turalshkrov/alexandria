const Review = require('../../models/Review');

const checkReview = async (req, res, next) => {
  try {
    const userId = req.user;
    const bookId = req.params.id;
    const review = await Review.findOne({ userId, bookId });
    if (review)  {
      res.review = review;
    } else {
      const newReview = new Review({ userId, bookId });
      res.review = newReview;
    }
    return next();
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = checkReview;