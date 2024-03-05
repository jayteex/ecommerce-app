// backend/src/routes/session-test.js
const express = require('express');
const router = express.Router();

// Route to set session data
router.post('/set-session', (req, res) => {
    req.session.user = { id: 1, username: 'example' };
    res.send('Session data set successfully');
});
  
// Route to retrieve session data
router.get('/get-session', (req, res) => {
    const user = req.session.user;
    res.json({ user });
});

module.exports = router;

  