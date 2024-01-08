const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const pool = require('./config/dbConfig.js');
const session = require('express-session');
const passport = require('passport');
const initializePassport = require('./config/passportConfig.js');
// Include the routes
const productRoutes = require('../src/routes/products.js');
const userRoutes = require('../src/routes/register.js');
const loginRoutes = require('../src/routes/login.js');

// Initialize passport
initializePassport(passport);

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
  next(); // Add this line to call the next middleware in the pipeline
});

// Passport config
app.use(session({
  secret: process.env.SESSION_SECRET, // Secret used to sign the session ID cookie
  resave: false, // Don't save session if unmodified
  saveUninitialized: false, // Don't create session until something stored
  cookie: {
    httpOnly: true, // Prevents client side JS from reading the cookie 
    secure: process.env.NODE_ENV === "production", // Ensures cookies are only used over HTTPS
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// Use the product routes
app.use('/products', productRoutes);

// Dashboard route
app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) {
      return res.redirect('/api/login');
  }
  // Render or send the dashboard page
  res.send('Welcome to your dashboard!');
});

// Use the user routes
app.use('/api', userRoutes);

// Login routes
app.use('/api', loginRoutes);

// General entry point into site
app.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products');
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message); // Send back the error message to the client for debugging purposes
  }
});

// Listener
app.listen(port, () => {
  console.log(`Ecommerce app listening on port ${port}`)
})

