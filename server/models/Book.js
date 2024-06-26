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
  series: {
    type: mongoose.Types.ObjectId,
    ref: 'Series',
  },
  cover: {
    type: String,
    required: true,
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
  rating: {
    type: Number,
    default: 0,
  },
  ratingsCount: {
    type: Number,
    default: 0,
  }
}, { collection: 'Book', versionKey: false });

Book.pre('save', function(next) {
  this.title = capitalize(this.title.trim());
  this.originalTitle = capitalize(this.originalTitle.trim());
  this.language = capitalize(this.language.trim());
  this.cover = this.cover.trim();
  this.published = this.published.trim();
  this.description = this.description.trim();
  next();
});

module.exports = mongoose.model('Book', Book);