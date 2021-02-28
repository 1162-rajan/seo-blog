const { check } = require('express-validator');

const userSignupValidator = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required!')
    .isLength({ max: 50, min: 2 })
    .withMessage('Name must be of 2 letters'),

  check('email').isEmail().withMessage('Email should be in proper format!'),

  check('password')
    .not()
    .isEmpty()
    .isLength({ max: 40, min: 6 })
    .withMessage('Password min length 6 is required!'),
];

//signin validator

const userSigninValidator = [
  check('email').isEmail().withMessage('Email should be in proper format!'),

  check('password')
    .not()
    .isEmpty()
    .isLength({ max: 40, min: 6 })
    .withMessage('Password min length 6 is required!'),
];

module.exports = { userSignupValidator, userSigninValidator };
