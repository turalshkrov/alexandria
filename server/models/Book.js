const mongoose = require('mongoose');

const Book = new mongoose.Schema({
  
}, { collection: 'book', versionKey: false });

module.exports = mongoose.model('book', Book);