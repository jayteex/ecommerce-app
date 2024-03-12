// backend/src/routes/logout.js
const express = require('express');
const router = express.Router();
const client = require('../app.js'); // Assuming you export Redis client from config

// Function to logout user
const logout = (req) => {
  return new Promise((resolve, reject) => {
    req.logout((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

// Function to destroy session
const destroySession = (req) => {
  return new Promise((resolve, reject) => {
    req.session.destroy((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

// Function to reset req.user
const resetUser = (req) => {
  req.user = null;
};

// Function to remove session data from Redis
const removeSessionFromRedis = (sessionId) => {
  return new Promise((resolve, reject) => {
    client.del(sessionId, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};

router.post('/', async (req, res) => {
  try {
    // Logout user
    await logout(req);

    // Destroy session
    await destroySession(req);

    // Remove session data from Redis
    await removeSessionFromRedis(req.sessionID);

    // Function to reset req.user
    resetUser(req);

    // Send success response
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error(`Logout Error: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;









