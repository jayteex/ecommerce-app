// backend/src/routes/session.js
const express = require('express');
const router = express.Router();

// This logic exists to ensure authentication persists after reload. Currently only working properly locally

router.get('/', (req, res) => {
  try {
    // Check if session exists
    if (!req.session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    
    // Logging to see if it contains necessary information
    console.log("req.session (from session.js): ", req.session);
    console.log("req.session.cartid (from session.js): ", req.session.cartid);
    console.log("req.user(from session.js): ", req.user);
    console.log("req.session.passport.user(from session.js): ", req.session.passport.user);

    // Return user data from Redis or from req.user if populated
    res.status(200).json(req.user);
  } catch (error) {
    console.error(`Error fetching session data: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

