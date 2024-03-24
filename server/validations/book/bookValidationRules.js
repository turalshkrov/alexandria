const { body } = require('express-validator');

const bookValidationRules = () => [
  body('title')
    .notEmpty().withMessage('Title is required'),
  body('originalTitle')
    .notEmpty().withMessage('Original title is required')
];

module.exports = bookValidationRules;