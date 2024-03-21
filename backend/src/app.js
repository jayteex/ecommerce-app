// backend/src/app.js
const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const RedisStore = require('connect-redis')(session);
const Redis = require("ioredis");
const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser');
const supabase = require('./config/supabase');

// Middleware to trust proxy headers
app.set('trust proxy', 1);

// Middleware to set Content-Type header for JSON responses
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

const { REDIS_URL } = process.env; // Load from .env

const client = new Redis(REDIS_URL);

client.on("connect", () => console.log("Connected to Redis"));
client.on("error", (error) => console.error("Redis Error:", error));

// Session x Redis configuration
app.use(session({
  store: new RedisStore({ client: client }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// Passport
const passport = require('passport');
const initializePassport = require('./config/passport.js');
initializePassport(passport, client);
app.use(passport.initialize());
app.use(passport.session());

// Cookie parser
app.use(cookieParser());

// Use CORS
app.use(cors({
  origin: ['http://localhost:5173', 'https://ecommerce-app-frontend-d845.onrender.com', 'https://pixabay.com'],
  credentials: true
}));

const initializeCartId = async (req, res, next) => {
  try {
    if (!req.session.cartid) {
      req.session.cartid = uuidv4(); // Generate new cartid if not present
      const cartid = req.session.cartid;
      await supabase.from('cart').insert({ cartid }).single();
    } else {
      console.log(`Session already has a cartid: ${req.session.cartid}`);
    }
    next();
  } catch (error) {
    console.error('Error inserting into cart:', error);
    // Handle the error
    next(error); // Pass the error to the error handling middleware
  }
};

app.use(initializeCartId);

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
});

// Route setup (need to consider moving Redis interaction logic inside routes)
app.use('/home', require('./routes/products.js'));
app.use('/sign-up', require('./routes/register.js'));
app.use('/sign-in', require('./routes/login.js'));
const logoutRouter = require('./routes/logout.js')(client); // Pass the Redis client object
app.use('/logout', logoutRouter);
app.use('/api-session', require('./routes/session.js'));
app.use('/session-test', require('./routes/session-test.js'));
app.use('/update-account', require('./routes/account.js'));
app.use('/cart', require('./routes/cart.js'));

// Wildcard route and debugging middleware 
// React Routing and server side rendering are clashing at the moment, leads to "Not found" error on hosted site, this might help
app.get('*', (req, res) => {
  console.log('Wildcard route triggered for path:', req.originalUrl);
  const indexPath = path.join(__dirname, '/public', 'index.html');
  console.log('Serving index.html from path:', indexPath);
  res.sendFile(indexPath);
});

// Listener (only start server if this file is being executed directly - had issues with that previously)
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

module.exports = { app, client };
