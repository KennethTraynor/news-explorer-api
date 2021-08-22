const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

function validateUrl(value, helpers) {
  return validator.isURL(value) ? value : helpers.error('string.uri');
}

const { getSavedArticles, saveArticle, deleteArticle } = require('../controllers/articles');

router.get('/', getSavedArticles);

router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom(validateUrl),
    image: Joi.string().required().custom(validateUrl),
  }),
}), saveArticle);

router.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().hex().length(24),
  }),
}), deleteArticle);

module.exports = router;
