// backend/src/config/passportConfig.js
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const supabase = require('./supabase'); 

const initialize = (passport) => {
    // Defining Strategy
    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
        try {
            const { data: dbuser, error } = await supabase
                .from('customers')
                .select('*')
                .eq('email', email)
                .single();
                
            if (error) {
                console.error(`Authentication Error: ${error.message}`);
                return done(error);
            }

            if (dbuser) {
                const user = dbuser;
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
            console.error(`Authentication Error: ${err.message}`);
            return done(err);
        }
    }));

    // De- and serialization
    passport.serializeUser((user, done) => done(null, user.customerid));

    passport.deserializeUser(async (id, done) => {
        try {
            const { data: dbuser, error } = await supabase
                .from('customers')
                .select('*')
                .eq('customerid', id)
                .single();

            if (error) {
                console.error(`Deserialization Error: ${error.message}`);
                return done(error);
            }

            done(null, dbuser);
        } catch (err) {
            console.error(`Deserialization Error: ${err.message}`);
            done(err, null);
        }
    });
};

module.exports = initialize;
