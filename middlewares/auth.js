const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { JWT_DEV } = require('../app-config');
const UnauthorizedError = require('../errors/unauthorized-error');
const { AuthorizationRequired } = require('../app-constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(AuthorizationRequired)));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV);
  } catch (err) {
    next(new UnauthorizedError(AuthorizationRequired));
  }

  req.user = payload;

  next();
};
