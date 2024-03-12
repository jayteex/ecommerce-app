// backend/src/routes/logout.js
const express = require('express');
const router = express.Router();

// Define function to handle logout with injected client object
const handleLogout = (client) => async (req, res) => {
  try {
    // Destroy session
    req.session.destroy((error) => {
      if (error) {
        throw error;
      }
      // Remove session data from Redis
      client.del(req.sessionID, (delError, response) => {
        if (delError) {
          throw delError;
        }

        // Clear session cookie on client-side
        res.cookie('sessionCookieName', '', { expires: new Date(0) });
        
        // Send success response
        res.status(200).json({ message: 'Logout successful' });
      });
    });
  } catch (error) {
    console.error(`Logout Error: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Define logout route with client argument
const logoutRouter = (client) => {
  const logoutHandler = handleLogout(client);

  router.post('/', logoutHandler);

  return router;
};

module.exports = logoutRouter;


