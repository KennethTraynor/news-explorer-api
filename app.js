require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const auth = require('./middlewares/auth');

const { errorHandler } = require('./controllers/errorHandler');
const NotFoundError = require('./errors/not-found-error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { register } = require('./controllers/registration');
const { login } = require('./controllers/login');
const userRouter = require('./routes/users');
const articleRouter = require('./routes/articles');

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cors());
app.options('*', cors());

// Limiter

app.use(helmet());

app.use(requestLogger);

app.post('/signup', register);
app.post('/signin', login);
app.use('/users', auth, userRouter);
app.use('/articles', auth, articleRouter);

app.get('*', (req, res, next) => next(new NotFoundError('Requested resource not found')));

app.use(errorLogger);

// Celebrate Error Handler

app.use(errorHandler);

app.listen(PORT);
