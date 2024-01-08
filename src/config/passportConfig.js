const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('./dbConfig');

const initialize = (passport) => {
    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
        try {
            const { rows } = await db.query('SELECT * FROM customers WHERE email = $1', [email]);
            if (rows.length > 0) {
                const user = rows[0];
                if (await bcrypt.compare(password, user.password)) {
                    console.log(`Authentication Success: User ${email} logged in`);
                    return done(null, user);
                } else {
                    console.log(`Authentication Failed: Incorrect password for user ${email}`);
                    return done(null, false);
                }
            } else {
                console.log(`Authentication Failed: No user found with email ${email}`);
                return done(null, false);
            }
        } catch (err) {
            console.error(`Authentication Error: ${err}`);
            return done(err);
        }
    }));

    passport.serializeUser((user, done) => done(null, user.customerid));
    passport.deserializeUser(async (id, done) => {
        try {
            const { rows } = await db.query('SELECT * FROM customers WHERE customerid = $1', [id]);
            done(null, rows[0]);
        } catch (err) {
            done(err, null);
        }
    });
};

module.exports = initialize;