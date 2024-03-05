// backend/src/config/auth.js
const supabase = require('./supabase');

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.session.passport || !req.session.passport.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data: dbuser, error } = await supabase
      .from('customers')
      .select('customerid, email, firstname, lastname, city, address')
      .eq('customerid', req.session.passport.user.customerid)
      .single();

    if (error) {
      console.error(`Error fetching user details: ${error.message}`);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!dbuser) {
      console.log(`User not found with id: ${req.session.passport.user.customerid}`);
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = dbuser; // Attach user information to the request object
    next();
  } catch (err) {
    console.error(`Authentication Error: ${err.message}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = authMiddleware;
