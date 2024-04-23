const mongoose = require('mongoose');

const Recommend = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  books: {
    type: [{
      type: mongoose.Types.ObjectId,
      ref: 'Book'
    }]
  }
}, { collection: 'Recommend', versionKey: false });

module.exports = mongoose.model('Recommend', Recommend);