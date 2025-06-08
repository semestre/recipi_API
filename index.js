// To start it npm run devStart
// Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

console.log("👉 MONGODB_URI:", process.env.MONGODB_URI);

mongoose.connect("mongodb+srv://saray78544:sLxA7Po5jsPkCeF4@apirecipie.ak8y38r.mongodb.net/?retryWrites=true&w=majority&appName=ApiRecipie")  
  .then(() => console.log('✅ Connected to Database'))
  .catch((error) => console.error('❌ MongoDB connection error:', error));

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
console.log("✅ /users route loaded:", typeof usersRouter === 'function');

// Categories Rgethttp://localhost:3000/categories/Query%20Paramsouter
const categoriesRouter = require('./routes/categories')
app.use('/categories', categoriesRouter)


app.listen(3000, () => console.log('Server Started'))