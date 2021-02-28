const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
      unique: true,
      index: true,
      lowerCase: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      maxLength: 50,
      unique: true,
    },

    profile: {
      type: String,
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    about: {
      type: String,
    },
    role: {
      type: Number,
      trim: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    resetPassword: {
      data: String,
      default: '',
    },
  },
  { timestamps: true }
);

// creating the virtual fields
userSchema
  .virtual('password')
  .set(function (password) {
    //create a temp variable _password
    this._password = password;

    //generate salt
    this.salt = this.makeSalt();

    //encrypt the password
    this.hashedPassword = this.encryptPassword(password);
  })

  .get(function () {
    return this.hashedPassword;
  });

//defining userSchema methods
userSchema.methods = {
  // for authenticate
  authenticate: function (plainPassword) {
    return this.encryptPassword(plainPassword) === this.hashedPassword;
  },

  //for making salt
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random() + '');
  },

  //hashing password
  encryptPassword: function (password) {
    if (!password) return '';

    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },
};

const User = mongoose.model('User', userSchema);
module.exports = User;
