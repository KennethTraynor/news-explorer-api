const router = require('express').Router();

const { getSavedArticles, saveArticle, deleteArticle } = require('../controllers/articles');

router.get('/', getSavedArticles);

router.post('/', saveArticle);

router.delete('/:articleId', deleteArticle);

module.exports = router;
