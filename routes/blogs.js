const express = require('express');
const Router = express.Router();
const time = require('../controllers/blogs');

Router.get('/', time);

module.exports = Router;
