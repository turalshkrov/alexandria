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
}, { collection: 'user', versionKey: false });

module.exports = mongoose.model('bookshelf', BookshelfSchema);