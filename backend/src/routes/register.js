// backend/src/routes/register.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const supabase = require('../config/supabase');

router.post('/',
  // Validation middleware
  body('email').isEmail().withMessage('Enter a valid email address'),
  body('firstname').notEmpty().withMessage('First name is required'),
  body('lastname').notEmpty().withMessage('Last name is required'),
  body('address').notEmpty().withMessage('Address is required'),
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { firstname, lastname, email, password, address } = req.body;

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Check if customer already exists
      const { data: existingCustomers, error: customerError } = await supabase
        .from('customers')
        .select('customerid')
        .order('customerid', { ascending: false }) // Get the highest customerid
        .limit(1);

      if (customerError) {
        console.error('Error fetching existing customers:', customerError.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const maxCustomerId = existingCustomers.length > 0 ? existingCustomers[0].customerid : 0;
      const newCustomerId = maxCustomerId + 1;

      // Insert new customer into database with calculated customerid
      const { data: insertedCustomer, error: insertError } = await supabase
        .from('customers')
        .insert([{ customerid: newCustomerId, firstname, lastname, email, password: hashedPassword, address }]);

      if (insertError) {
        console.error('Error inserting new customer:', insertError.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Create a new cart for the customer
      const { error: cartError } = await supabase
        .from('cart')
        .insert([{ customerid: newCustomerId, dateadded: new Date() }]);

      if (cartError) {
        console.error('Error creating cart:', cartError.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.status(201).json({ message: 'Customer registered successfully' });
    } catch (err) {
      console.error('Error:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
