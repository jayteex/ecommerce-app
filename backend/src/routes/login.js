// backend/src/routes/login.js
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res) => {
  const errorMessage = req.query.error ? encodeURIComponent(req.query.error) : '';
  res.send(`Login Page${errorMessage ? ` - Error: ${errorMessage}` : ''}`);
});

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(`Login Error: ${err}`);
      return res.redirect('/api/login?error=An error occurred during login.');
    }
    if (!user) {
      console.log(`Login Failed: ${info.message}`);
      return res.redirect(`/api/login?error=${encodeURIComponent(info.message)}`);
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error(`Login Error during session creation: ${err}`);
        return next(err);
      }
      console.log(`Login Successful: User ${req.user.email} logged in`);
      return res.redirect('/home');
    });
  })(req, res, next);
});

module.exports = router;

