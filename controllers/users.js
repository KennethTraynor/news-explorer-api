const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const { ResourceNotFound, InvalidID } = require('../app-constants');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(ResourceNotFound);
      } else {
        res.status(200).send({ email: user.email, name: user.name });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(InvalidID));
      }
      next(err);
    });
};
