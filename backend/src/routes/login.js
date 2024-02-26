const express = require('express');
const router = express.Router();
const passport = require('passport');

/*

// Handler for GET request to /login - Display the login page/form
router.get('/', (req, res) => {
    const errorMessage = req.query.error;
    // Render the login page with the error message
    // or send a response with the error message
    res.send('Login Page' + (errorMessage ? ` - Error: ${errorMessage}` : ''));
});

router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(`Login Error: ${err}`);
            return next(err);
        }
        if (!user) {
            console.log(`Login Failed: ${info.message}`);
            return res.redirect('/api/login?error=' + info.message);
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error(`Login Error during session creation: ${err}`);
                return next(err);
            }
            console.log(`Login Successful: User ${req.user.email} logged in`);
            return res.redirect('/dashboard');
        });
    })(req, res, next);
});

module.exports = router;

*/