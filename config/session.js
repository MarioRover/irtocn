const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

module.exports = {
  name : 'session_shams',
  secret: process.env.SESSION_SECRETKEY,
  resave: true,
  cookie: {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
  },
  saveUninitialized: true,
  store: new mongoStore({
    mongooseConnection: mongoose.connection
  })
}