// backend/src/config/passportConfig.js
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const supabase = require('./supabase');

const initialize = (passport) => {
  passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
    try {
      const { data: user, error } = await supabase
        .from('customers')
        .select('customerid, email, password') // Include password field
        .eq('email', email)
        .single();

      if (error) throw error;

      if (!user) {
        console.log(`Authentication Failed: No user found with email ${email}`);
        return done(null, false, { message: 'User not found' });
      }

      if (await bcrypt.compare(password, user.password)) {
        console.log(`Authentication Success: User ${email} logged in`);
        return done(null, user);
      } else {
        console.log(`Authentication Failed: Incorrect password for user ${email}`);
        return done(null, false, { message: 'Incorrect password' });
      }
    } catch (err) {
      console.error(`Authentication Error: ${err.message}`);
      return done(err);
    }
  }));

// Serialize user object based on environment
if (process.env.NODE_ENV === 'production') {
  const { serializeUser, deserializeUser } = require('./redisUtils');
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);
} else {
  // Use default serialization for local environment
  passport.serializeUser((user, done) => {
    console.log('Serialized User:', user);
    done(null, user.customerid);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const { data: user, error } = await supabase
        .from('customers')
        .select('customerid, email, firstname, lastname, city, address')
        .eq('customerid', id)
        .single();

      if (error) throw error;

      if (!user) return done(null, false);

      console.log('Deserialized User:', user);
      done(null, user);
    } catch (err) {
      console.error(`Deserialization Error: ${err.message}`);
      done(err);
    }
  });
}

};

module.exports = initialize;