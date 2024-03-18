const mongoose = require('mongoose');

const User = new mongoose.Schema({

}, { collection: 'user', versionKey: false });

module.exports = mongoose.model('user', User);