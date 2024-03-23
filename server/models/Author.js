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
  imageUrl: {
    type: String,
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
  },
}, { collection: 'Author', versionKey: false });

Author.pre('save', function(next) {
  this.name = capitalize(this.name);
  this.nativeName = capitalize(this.nativeName);
  if (this.authorInfo) this.authorInfo = this.authorInfo.trim();
  if (this.imageUrl) this.imageUrl = this.imageUrl.trim();
  if (this.born) this.born = this.born.trim();
  if (this.died) this.died = this.died.trim();
  next();
});

module.exports = mongoose.model('Author', Author);