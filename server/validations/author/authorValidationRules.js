const { body } = require('express-validator');

const authorValidationRules = () => [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 64 }).withMessage('Name  can be at most 64 characters long')
    .matches(/[a-zA-Z\s]/).withMessage('Name can only contain letters and spaces'),
  body('nativeName')
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 64 }).withMessage('Name  can be at most 64 characters long')
    .matches(/[a-zA-Z\s]/).withMessage('Name can only contain letters and spaces'),
];

module.exports = authorValidationRules;