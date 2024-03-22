const mongoose = require('mongoose');
const bcyrpt = require('bcryptjs');
const capitalize = require('../helpers/Capitalize');

const UserSchema = new mongoose.Schema({
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
  lists: {
    type: [{
      type: mongoose.Types.ObjectId,
      ref: 'List',
    }],
    default: []
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

UserSchema.pre('save', async function(next) {
  this.name = capitalize(this.name);
  this.username = this.username.trim().toLowerCase();
  this.password = await bcyrpt.hash(this.password, 8);
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', UserSchema);