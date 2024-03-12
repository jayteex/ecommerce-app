// backend/src/routes/session.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  try {
    // Check if session exists
    if (!req.session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Check if user is authenticated
    if (!req.session.passport || !req.session.passport.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    
    // Logging to see if it contains necessary information
    console.log("req.session: ", req.session);
    console.log("req.user: ", req.user);
    console.log("req.session.passport.user: ", req.session.passport.user);

    // Return user data from Redis or from req.user if populated
    res.status(200).json(req.user);
  } catch (error) {
    console.error(`Error fetching session data: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

