const { body } = require('express-validator');

const userPasswordValidationRules = () => [
  body('newPassword')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8, max: 32 }).withMessage('Password can be at least 8 and at most 32 characters long')
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .withMessage(' Password must contain at least one uppercase letter, one lowercase letter, one number and one special character')
];

module.exports = userPasswordValidationRules;