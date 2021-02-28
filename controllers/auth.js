const User = require('../models/user');
const shortid = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
//sign up functionality
const signup = (req, res) => {
  const { name, email, password } = req.body;

  //check for user email exist or not
  User.findOne({ email }).exec((error, user) => {
    // handling promise error
    if (error) return res.status(422).json({ error: error });

    // if user already exist
    if (user) return res.status(400).json({ error: 'Email already taken!' });
  });

  // creating username user
  let username = shortid.generate();

  //create profile for user
  let profile = `${process.env.CLIENT_URL}/profile/${username}`;

  const newUser = new User({
    name,
    email,
    password,
    profile,
    username,
  });

  //savinf new user to database
  newUser.save((error, user) => {
    if (error) return res.status(400).json({ error: error });

    if (user)
      return res
        .status(200)
        .json({ msg: "You've successfully signup! please signin." });
  });
};

//signin functionality
const signin = (req, res) => {
  //check for the user exist or not : if not--->say to signup
  const { email, password } = req.body;
  User.findOne({ email }).exec((err, user) => {
    //checking for existence of user
    if (err) return res.status(400).json({ error: 'No user with this email!' });

    //authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({ error: 'Password does not match!' });
    }

    //generating token

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    //setting in cookies
    res.cookie('token', token, { expiresIn: '1d' });
    const { _id, username, name, email, role } = user;
    return res.status(200).json({ token, user });
  });
};

//signout functionality-->easy just clear res.cookies that we set earlier
const signout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ msg: 'signout Successfully!' });
};

//protecting routes
const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});

module.exports = { signup, signin, signout, requireSignin };
