require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

console.log("👉 MONGODB_URI:", process.env.MONGODB_URI);


mongoose.connect("mongodb+srv://sarayalexandramartinez:8KrfzLBUyDOPjB7N@recipiesapp.mgnonro.mongodb.net/?retryWrites=true&w=majority&appName=recipiesApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection
db.on('error', (error) => console.error('MongoDB connection error:', error))
db.once('open', () => console.log('Connected to Database'))


app.use(express.json())

// Recipes Router
const recipesRouter = require('./routes/recipes')
app.use('/recipes', recipesRouter)

// User Router
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// Categories Router
const categoriesRouter = require('./routes/categories')
app.use('/categories', categoriesRouter)

app.listen(3000, () => console.log('Server Started'))

