const { body } = require('express-validator');

const emailValidationRules = () => [
  body('email')
    .notEmpty().withMessage('Email is required')
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ).withMessage('Email is not valid')
];

module.exports = emailValidationRules;