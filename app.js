const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const { PORT = 3000 } = process.env;
const app = express();

// Mongoose
mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Cors
app.use(cors());
app.options('*', cors());

// Limiter

// Helmet
app.use(helmet);

// Request Logger

// Routes

// Error Logger

// Celebrate Error Handler

// Centralized Error Handler

app.listen(PORT);
