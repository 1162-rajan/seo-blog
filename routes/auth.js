const express = require('express');
const Router = express.Router();
const { signup } = require('../controllers/auth');
const { signin } = require('../controllers/auth');
const { signout } = require('../controllers/auth');
const { requireSignin } = require('../controllers/auth');

//importing validators

//signup validator
const { userSignupValidator } = require('../validator/auth'); // since its is available at index.js

//signin validator
const { userSigninValidator } = require('../validator/auth'); // since its is available at index.js

//main validator for checking actual error and messages
const runValidator = require('../validator');

Router.post('/signup', userSignupValidator, runValidator, signup);
Router.post('/signin', userSigninValidator, runValidator, signin);
Router.get('/signout', signout);
Router.get('/secret', requireSignin, (req, res) => {
  res.json({ msg: 'Secret page' });
});

module.exports = Router;
