// backend/src/routes/logout.js
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // Logout user
    await logout(req);
    
    // Destroy session
    await destroySession(req);
    
    // Send success response
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error(`Logout Error: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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

module.exports = router;








