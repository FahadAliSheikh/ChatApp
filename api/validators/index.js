const { body, param, validationResult } = require('express-validator')

const signUpValidationRules = () => {
  return [
    body('username').exists(),
    // username must be an email
    body('email').exists().isEmail(),
    // password must be at least 5 chars long
    body('password').exists().isLength({ min: 4 }),
  ]
}

const signInValidationRules = () => {
  return [
    // password is required
    body('username').exists(),
    // password must be at least 5 chars long
    body('password').exists().isLength({ min: 5 }),
  ]
}

const saveMessageValidationRules = () => {
  return [
    // Sender id must exist
    body('senderId').notEmpty(),
    // Receiver id must exist
    body('receiverId').notEmpty(),
    // Message text must exist
    body('text').notEmpty(),
  ]
}
const getMessageValidationRules = () => {

  return [
    // Sender id must exist
    param('senderId').notEmpty(),
    // Receiver id must exist
    param('receiverId').notEmpty()
  ]
}

const validate = (req, res, next) => {
  // console.log('inside validate');
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    // console.log('no error found');
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  signUpValidationRules,
  signInValidationRules,
  saveMessageValidationRules,
  getMessageValidationRules,
  validate,
}