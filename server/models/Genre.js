const mongoose = require('mongoose');
const capitalize = require('../helpers/Capitalize');

const Genre = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  endPoint: {
    type: String,
  },
  coverUrl: {
    type: String,
    default: "",
  }
}, { collection: 'Genre', versionKey: false });

Genre.pre('save', function (next) {
  this.endPoint = `/books/genre/${this.name}`;
  this.name = capitalize(this.name);
  next();
});

module.exports = mongoose.model('Genre', Genre);