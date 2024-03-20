const { validationResult } = require('express-validator');

const userValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = errors.array().map(err => ({ [err.path]: err.msg }));
  return res.status(400).json({
    errors: extractedErrors
  })
}

module.exports = userValidation;