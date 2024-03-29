const Review = require('../../models/Review');

const checkReview = async (req, res, next) => {
  try {
    const user = req.user;
    const book = req.params.id;
    const review = await Review.findOne({ user, book });
    if (review)  {
      res.review = review;
    } else {
      const newReview = new Review({ user, book });
      res.review = newReview;
    }
    return next();
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = checkReview;