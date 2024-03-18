const mongoose = require('mongoose');

const Author = new mongoose.Schema({

}, { collection: 'author', versionKey: false });

module.exports = mongoose.model('author', Author);