const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String],  // List of strings
    required: true
  },
  image: {
    type: String,
    required: false  // Optional, but you can make it required if you want
  },
  description: {
    type: String,
    required: false
  },
  pasos: {
    type: [String],  // List of steps as strings
    required: true
  },
  idcategory: {
    type: String,
    required: true
  },
  favorite: {
    type: Boolean,
    default: false  
  }
})

module.exports = mongoose.model('Recipe', recipeSchema)
