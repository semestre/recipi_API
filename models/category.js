const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true, // means it's necessary
  },
  image: {
    type: String,
    required: true, // like a URL or path to the image
  }
});

module.exports = mongoose.model('Category', categorySchema);
