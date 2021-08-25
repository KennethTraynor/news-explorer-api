require('dotenv').config();
const { NODE_ENV, DB_ADDRESS } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');

const auth = require('./middlewares/auth');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { errorHandler } = require('./controllers/errorHandler');
const NotFoundError = require('./errors/not-found-error');

const { register } = require('./controllers/registration');
const { login } = require('./controllers/login');
const userRouter = require('./routes/users');
const articleRouter = require('./routes/articles');

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());

mongoose.connect(NODE_ENV === 'production' ? DB_ADDRESS : 'mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cors());
app.options('*', cors());

app.use(limiter);

app.use(helmet());

// Request Logging
app.use(requestLogger);

// Routes
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
  }),
}), register);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.use('/users', auth, userRouter);
app.use('/articles', auth, articleRouter);
app.get('*', (req, res, next) => next(new NotFoundError('Requested resource not found')));

// Error Logging
app.use(errorLogger);

// Celebrate Error Handler
app.use(errors());

// Centralized Error Handler
app.use(errorHandler);

app.listen(PORT);
