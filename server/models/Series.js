const mongoose = require('mongoose');

const Series = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  books: {
    type: [{
      type: mongoose.Types.ObjectId,
      ref: 'Book',
      unique: true,
    }],
    required: true,
    deffault: [],
  }
}, { collection: 'Series', versionKey: false });

Series.pre('save', function (next){
  this.title = this.title.trim();
  next();
});

module.exports = mongoose.model('Series', Series);