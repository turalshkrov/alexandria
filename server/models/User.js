const mongoose = require('mongoose');
const bcyrpt = require('bcryptjs');

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: {
    type: Array,
    default: [],
  },
  ratings: {
    type: Array,
    default: [],
  },
  lists: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date
  },
}, { collection: 'user', versionKey: false });

User.pre('save', async function(next) {
  this.password = await bcyrpt.hash(this.password, 8);
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('user', User);