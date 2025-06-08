const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true  // no duplicate usernames allowed, babes
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false  // optional, 'cause maybe not everyone wants a profile pic rn
  },
  favorits: {
    type: [String], // string for favorits
    required: false
  }
});

module.exports = mongoose.model('User', userSchema);
