// backend/src/app.js
const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const cors = require('cors');

// Middleware to set Content-Type header for JSON responses
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Session
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false, 
  saveUninitialized: false, 
  cookie: {
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production", 
    maxAge: 24 * 60 * 60 * 1000, 
  }
}));

// Passport
const passport = require('passport');
const initializePassport = require('./config/passportConfig.js');
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Use CORS
app.use(cors({
  origin: ['http://localhost:5173', 'https://ecommerce-app-frontend-d845.onrender.com', 'https://pixabay.com'],
  credentials: true
}));

// Redirect root URL to "/home"
app.get('/', (req, res) => {
  res.redirect('/home');
});

// Images for products
app.use('/images', express.static(path.join(__dirname, 'images')));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(morgan('dev'));

// Global error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message || 'Internal Server Error',
    },
  });
  next();
});

// Route setup
app.use('/home', require('./routes/products.js'));
app.use('/sign-up', require('./routes/register.js')); 
app.use('/sign-in', require('./routes/login.js'));
app.use('/logout', require('./routes/logout.js'));
app.use('/api-session', require('./routes/session.js'));
app.use('/session-test', require('./routes/session-test.js'));
app.use('/update-account', require('./routes/account.js'));

// Listener (Only start server if this file is being executed directly)
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

module.exports = app;
