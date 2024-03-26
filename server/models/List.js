const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  books: {
    type: [{
      type: mongoose.Types.ObjectId,
      ref: 'Book',
    }],
    default: [],
  },
  cover: {
    type: String,
    required: true,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  }
}, { collection: 'List', versionKey: false });

ListSchema.pre('save', function(next) {
  this.title = this.title.trim();
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('List', ListSchema);