const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// importing routes
const blogRoutes = require('./routes/blogs');
const authRoutes = require('./routes/auth');

// app initialisation
const app = express();

// database
mongoose
  .connect(process.env.DATABASE_URL, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connected successfully!'))
  .catch((err) => console.log(err));
//adding middlewares

//parsers for parsing request headers and parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// only on development we are allowing our client to request from different port
if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}

// routes middlewares
app.use('/api', blogRoutes);
app.use('/api', authRoutes);

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
