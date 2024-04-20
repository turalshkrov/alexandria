const { body } = require('express-validator');

const userValidationRules = () => [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 64 }).withMessage('Name  can be at most 64 characters long')
    .matches(/[a-zA-Z\s]/).withMessage('Name can only contain letters and spaces'),
  body('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3, max: 32}).withMessage('Username can be at least 3 and at most 32 characters long')
    .isAlphanumeric().withMessage('Username can only contain letters of the alphabet and numbers'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ).withMessage('Email is not valid'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8, max: 32 }).withMessage('Password can be at least 8 and at most 32 characters long')
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .withMessage(' Password must contain at least one uppercase letter, one lowercase letter, one number and one special character')
];

module.exports = userValidationRules;