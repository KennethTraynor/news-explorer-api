const Article = require('../models/article');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.getSavedArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .populate(['owner'])
    .then((articles) => res.status(200).send(articles))
    .catch(next);
};

module.exports.saveArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => Article.findById(article._id).populate('owner'))
    .then((article) => res.status(200).send(article))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Invalid Syntax'));
      }
      next(err);
    });
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Article Not Found');
      }
      if (String(article.owner) !== req.user._id || !req.user._id) {
        throw new ForbiddenError('Insufficient Permissions');
      }
    })
    .then(() => {
      Article.findByIdAndDelete(req.params.articleId)
        .populate('owner')
        .then((article) => {
          if (!article) {
            throw new NotFoundError('Article Not Found');
          }
          res.status(200).send(article);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Invalid ID'));
      }
      next(err);
    });
};
