// backend/src/app.js
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
// Cors
const cors = require('cors');

// Middleware to set Content-Type header for JSON responses
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Redirect root URL to "/home"
app.get('/', (req, res) => {
  res.redirect('/home');
});

// Use CORS
app.use(cors({
  origin: ['http://localhost:5173', 'https://ecommerce-app-frontend-d845.onrender.com', 'https://pixabay.com']
}));

// Images for products
// Serve static files from the 'pictures' directory
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
app.use('/sign-in', require('./routes/register.js')); // Adjusted route to '/sign-in'

// Listener (Only start server if this file is being executed directly)
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

module.exports = app;


/*
// Session
app.use(session({
  secret: process.env.SESSION_SECRET, // Secret used to sign the session ID cookie
  resave: false, // Don't save session if unmodified
  saveUninitialized: false, // Don't create session until something stored
  cookie: {
    httpOnly: true, // Prevents client side JS from reading the cookie 
    secure: process.env.NODE_ENV === "production", // Ensures cookies are only used over HTTPS
  }
}));
*/

/*
app.use('/login', require('./routes/login.js'));
app.use('/users', require('./routes/users.js'));
app.use('/cart', require('./routes/cart.js'));
app.use('/checkout', require('./routes/checkout.js'));
app.use('/orders', require('./routes/orders.js'));
*/


/*
// Passport
const passport = require('passport');
const initializePassport = require('./config/passportConfig.js');
// Initialize passport
initializePassport(passport);

// Use passport
app.use(passport.initialize());
app.use(passport.session());
*/