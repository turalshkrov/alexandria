const { body } = require('express-validator');

const bookValidationRules = () => [
  body('title')
    .notEmpty().withMessage('Title is required')
    .matches(/[a-zA-Z0-9\s]/).withMessage('Title can only contain letters, numbers and spaces'),
  body('originalTitle')
    .notEmpty().withMessage('Original title is required')
    .matches(/[a-zA-Z0-9\s]/).withMessage('Original title can only contain letters, numbers and spaces'),
];

module.exports = bookValidationRules;