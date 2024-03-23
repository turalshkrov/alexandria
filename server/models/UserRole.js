const mongoose = require('mongoose');

const UserRole = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
  }
}, { collection: 'UserRole', versionKey: false });

module.exports = mongoose.model('UserRole', UserRole);