const mongoose = require('mongoose');
const capitalize = require('../helpers/Capitalize');

const Book = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  originalTitle: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
  coverUrl: {
    type: String,
    default: "",
  },
  published: {
    type: String,
    required: true,
  },
  genres: {
    type: [{
      type: String,
    }],
    required: true,
    default: [],
  },
  language: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  format: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  ratingsCount: {
    type: Number,
    default: 0,
  },
  reviews: {
    type:[{
      type: mongoose.Types.ObjectId,
      ref: 'Reviews',
    }],
    default: [],
  },
}, { collection: 'Book', versionKey: false });

Book.pre('save', function(next) {
  this.title = capitalize(this.title.trim());
  this.originalTitle = capitalize(this.originalTitle.trim());
  this.language = capitalize(this.language.trim());
  this.coverUrl = this.coverUrl.trim();
  this.published = this.published.trim();
  this.format = this.format.trim();
  this.description = this.description.trim();
  next();
});

module.exports = mongoose.model('Book', Book);