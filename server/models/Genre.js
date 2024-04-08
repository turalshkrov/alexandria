const mongoose = require('mongoose');
const capitalize = require('../helpers/Capitalize');

const Genre = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    default: "",
  }
}, { collection: 'Genre', versionKey: false });

Genre.pre('save', function (next) {
  this.name = capitalize(this.name);
  next();
});

module.exports = mongoose.model('Genre', Genre);