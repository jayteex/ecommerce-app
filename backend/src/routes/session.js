// backend/src/routes/session.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  try {
    // Check if session and passport properties exist
    if (!req.session || !req.session.passport || !req.session.passport.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // Access authenticated user from req.user (provided by Passport.js)
    console.log("This is the authenticated user:", req.user);
    res.status(200).json(req.user);
  } catch (error) {
    console.error(`Error fetching session data: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

