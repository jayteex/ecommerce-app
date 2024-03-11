// backend/src/config/redisUtils.js
const { serializeUser, deserializeUser } = require('redis');
const redis = require('redis');
const redisClient = redis.createClient();

// Serialize user object and store in Redis session
function serializeUser(user, done) {
  console.log('Serialized User:', user);
  done(null, user.customerid);
}

// Deserialize user object and retrieve from Redis session
function deserializeUser(id, done) {
  redisClient.get(id, (err, user) => {
    if (err) {
      console.error(`Deserialization Error: ${err.message}`);
      return done(err);
    }
    if (!user) return done(null, false);
    console.log('Deserialized User:', user);
    done(null, user);
  });
}

module.exports = { serializeUser, deserializeUser };
