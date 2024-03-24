const { body } = require('express-validator');

const seriesValidationRules = () => [
  body('title')
    .notEmpty().withMessage('Title is required')
];

module.exports = seriesValidationRules;