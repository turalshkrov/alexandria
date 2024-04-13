const mongoose = require('mongoose');
const capitalize = require('../helpers/Capitalize');

const Blog = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  preview: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  }
}, { collection: 'Blog', versionKey: false });

Blog.pre('save', function (next) {
  this.title = capitalize(this.title);
  this.content = this.content.trim();
  next();
});

module.exports = mongoose.model('Blog', Blog);