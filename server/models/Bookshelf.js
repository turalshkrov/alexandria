const mongoose = require('mongoose');

const BookshelfSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  books: {
    type: Array,
    default: [],
  },
}, { versionKey: false });

module.exports = mongoose.model('bookshelf', BookshelfSchema);