const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Wrong url format',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Wrong url format',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
});

module.exports = mongoose.model('article', articleSchema);
