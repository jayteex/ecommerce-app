// Express
const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
// Will be obsolete with supabase integration
const pool = require('./config/dbConfig.js');
const session = require('express-session');
// Passport
const passport = require('passport');
const initializePassport = require('./config/passportConfig.js');
// Cors
const cors = require('cors');

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
  next(); 
});

// Use CORS
app.use(cors({
  origin: ['http://localhost:5173', 'https://ecommerce-app-frontend-d845.onrender.com']
}));

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

// Route setup
app.use('/home', require('./routes/products.js'));
app.use('/register', require('./routes/register.js'));
app.use('/login', require('./routes/login.js'));
app.use('/users', require('./routes/users.js'));
app.use('/cart', require('./routes/cart.js'));
app.use('/checkout', require('./routes/checkout.js'));
app.use('/orders', require('./routes/orders.js'));

// Listener (Only start server if this file is being executed directly)
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

module.exports = app;


/*
// Swagger options
const options = {
  definition: {
    openapi: '3.0.3', 
    info: {
      title: 'ECommerce App', 
      version: '1.0.0', 
    },
  },
  apis: ['./routes/*.js'], 
  // Include the other paths...
};
const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
*/

/*
// Dashboard route
app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) {
      return res.redirect('/login');
  }
  // Render or send the dashboard page
  res.send('Welcome to your dashboard!');
});
*/


/*
// General entry point into site
app.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products');
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message); 
  }
});
*/