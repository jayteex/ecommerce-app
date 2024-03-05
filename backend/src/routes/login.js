// backend/src/routes/login.js
const express = require('express');
const passport = require('passport');
const supabase = require('../config/supabase');

const router = express.Router();

router.get('/', (req, res) => {
  const errorMessage = req.query.error ? encodeURIComponent(req.query.error) : '';
  res.send(`Login Page${errorMessage ? ` - Error: ${errorMessage}` : ''}`);
});

router.post('/', passport.authenticate('local', { failureRedirect: '/login?error=Invalid credentials' }), async (req, res) => {
  try {
    const { data: dbuser, error } = await supabase
      .from('customers')
      .select('customerid, email, firstname, lastname, city, address')
      .eq('customerid', req.user.customerid)
      .single();

    if (error) {
      console.error(`Error fetching user details: ${error.message}`);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!dbuser) {
      console.log(`User not found with id: ${req.user.customerid}`);
      return res.status(404).json({ error: 'User not found' });
    }

    // Store only the user id in the session
    req.session.userId = req.user.customerid;

    return res.status(200).json(dbuser);
  } catch (err) {
    console.error(`Authentication Error: ${err.message}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;