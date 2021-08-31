require('dotenv').config();

const { NODE_ENV, DB_ADDRESS } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { DB_ADDRESS_DEV } = require('./app-config');

const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { errorHandler } = require('./controllers/errorHandler');
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());

mongoose.connect(NODE_ENV === 'production' ? DB_ADDRESS : DB_ADDRESS_DEV, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cors());
app.options('*', cors());

app.use(helmet());

// Request Logging
app.use(requestLogger);

app.use(limiter);

// Routes
app.use(routes);

// Error Logging
app.use(errorLogger);

// Celebrate Error Handler
app.use(errors());

// Centralized Error Handler
app.use(errorHandler);

app.listen(PORT);
