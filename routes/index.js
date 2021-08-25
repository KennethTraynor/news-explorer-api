const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');

const NotFoundError = require('../errors/not-found-error');
const { ResourceNotFound } = require('../app-constants');

const { register } = require('../controllers/registration');
const { login } = require('../controllers/login');
const userRouter = require('./users');
const articleRouter = require('./articles');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
  }),
}), register);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.use('/users', auth, userRouter);
router.use('/articles', auth, articleRouter);

router.get('*', (req, res, next) => next(new NotFoundError(ResourceNotFound)));

module.exports = router;
