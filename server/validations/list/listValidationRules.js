const { body } = require('express-validator');

const listValidationRules = () => [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 64 }).withMessage('Title can be at most 64 character long'),
];

module.exports = listValidationRules;