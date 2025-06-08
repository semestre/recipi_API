const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String],  
    required: true
  },
  image: {
    type: String,
    required: false  
  },
  description: {
    type: String,
    required: false
  },
  pasos: {
    type: [String], 
    required: true
  },
  idcategory: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: false
  },
  serving: {
    type: String,
    required: false
  },
  calories: {
    type: String,
    required: false
  },
  dificulty: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('Recipe', recipeSchema)
