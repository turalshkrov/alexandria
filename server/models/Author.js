const mongoose = require('mongoose');
const capitalize = require('../helpers/Capitalize');

const Author = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nativeName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default: "",
  },
  born: {
    type: String,
    required: true,
  },
  died: {
    type: String,
    default: "",
  },
  genres: {
    type: [{
      type: String,
    }],
    default: [],
  },
  authorInfo: {
    type: String,
    required: true,
  },
}, { collection: 'Author', versionKey: false });

Author.pre('save', function(next) {
  this.name = capitalize(this.name);
  this.nativeName = capitalize(this.nativeName);
  this.authorInfo = this.authorInfo.trim();
  this.image = this.image.trim();
  this.born = this.born.trim();
  this.died = this.died.trim();
  next();
});

module.exports = mongoose.model('Author', Author);