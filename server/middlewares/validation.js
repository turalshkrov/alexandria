const { validationResult } = require('express-validator');

const validation = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    const extractedErrors = errors.array().map(err => ({ [err.path]: err.msg }));
    return res.status(409).json({
      errors: extractedErrors
    });
  }
}

module.exports = validation;