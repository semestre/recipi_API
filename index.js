require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
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