const mongoose = require('mongoose');

const Review = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bookId: {
    type: mongoose.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  }
}, { collection: 'Review', versionKey: false });

Review.pre('save', function(next) {
  if (this.title) this.title = this.title.trim();
  if (this.content) this.content = this.content.trim();
  this.date = Date.now();
  next();
});

module.exports = mongoose.model('Review', Review);