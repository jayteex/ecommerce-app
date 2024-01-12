const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const db = require('../config/dbConfig');
const bcrypt = require('bcrypt');

router.post('/',
    // Validation
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('name').notEmpty().withMessage('Name is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, email, password, address, phone } = req.body;

            // Check if customer already exists
            const customerExists = await db.query('SELECT * FROM customers WHERE email = $1', [email]);
            if (customerExists.rows.length) {
                return res.status(409).send('Registration failed, customer already exists');
            }

            // Hash password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Start a database transaction
            await db.query('BEGIN');

            // Insert new customer into database
            const insertCustomerQuery = 'INSERT INTO customers (name, email, password, address, phone) VALUES ($1, $2, $3, $4, $5) RETURNING customerid';
            const customerResult = await db.query(insertCustomerQuery, [name, email, hashedPassword, address, phone]);
            const customerId = customerResult.rows[0].customerid;

            // Create a new cart for the customer
            const insertCartQuery = 'INSERT INTO cart (customerid, dateadded) VALUES ($1, NOW())';
            await db.query(insertCartQuery, [customerId]);

            // Commit the transaction
            await db.query('COMMIT');

            res.status(201).send('Customer registered successfully');
        } catch (err) {
            // If an error occurs, roll back the transaction
            await db.query('ROLLBACK');
            console.error('Error:', err.message);
            res.status(500).send('Server error');
        }
    });

module.exports = router;