const mongoose = require('mongoose');
const bcyrpt = require('bcryptjs');
const capitalize = require('../helpers/Capitalize');

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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date
  },
  active: {
    type: Boolean,
    default: false,
  }
}, { collection: 'User', versionKey: false });

User.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcyrpt.hash(this.password, 8);
  }
  this.name = capitalize(this.name);
  this.username = this.username.trim().toLowerCase();
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', User);