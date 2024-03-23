const { body } = require('express-validator');

const reviewValidationRules = () => [
  body('rating', 'Rating must be between 1 and 5')
    .notEmpty().isNumeric().isInt({ min: 1, max: 5 }),
];

module.exports = reviewValidationRules;