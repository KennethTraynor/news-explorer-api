const bcrypt = require('bcryptjs');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');

module.exports.register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email, name: req.body.name, password: hash,
    }))
    .then((user) => res.status(200).send({ _id: user._id, email: user.email, name: user.name }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Invalid Syntax'));
      }
      if (err.name === 'MongoError') {
        if (err.code === 11000) {
          next(new ConflictError('Conflicting email'));
        }
      }
      next(err);
    });
};
