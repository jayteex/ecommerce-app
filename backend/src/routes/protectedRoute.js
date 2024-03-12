// backend/src/routes/protectedRoute.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { supabase } = require('../config/supabase');
const authMiddleware = require('../config/auth');
const router = express.Router();

// Currently not in use, using Redis, passport.js and express-session for authentication

// Apply authentication middleware to this route
router.use(authMiddleware);

router.get('/', (req, res) => {
  // Access user information from req.user
  // You can use req.user to retrieve user-specific data or perform operations
  res.json({ message: 'You have accessed the account route.', user: req.user });
});

module.exports = router;


/*

// GET a single user by ID
router.get('/:userId', async (req, res) => {
	try {
		const { userId } = req.params;
		const { data: user, error } = await supabase
            .from('customers')
            .select('*')
            .eq('customerid', userId)
            .single();

		if (error) {
			console.error(error);
			return res.status(500).send('Server error');
		}

		if (!user) {
			return res.status(404).send('User not found');
		}

		delete user.password;

		res.json(user);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
	}
});

// Update a specific user
router.put('/:userId', [
	body('email').optional().isEmail(),
	body('firstname').optional().notEmpty(),
	body('lastname').optional().notEmpty(),
	body('address').optional().notEmpty(),
], async (req, res) => {
	try {
		const { userId } = req.params;
		const { firstname, lastname, email, password, address } = req.body;
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		let updateFields = [];
		let fieldValues = [];
		let fieldCount = 1;

		if (firstname) {
			updateFields.push(`firstname = $${fieldCount++}`);
			fieldValues.push(firstname);
		}
		if (lastname) {
			updateFields.push(`lastname = $${fieldCount++}`);
			fieldValues.push(lastname);
		}
		if (email) {
			updateFields.push(`email = $${fieldCount++}`);
			fieldValues.push(email);
		}
		if (password) {
			const hashedPassword = await bcrypt.hash(password, 10);
			updateFields.push(`password = $${fieldCount++}`);
			fieldValues.push(hashedPassword);
		}
		if (address) {
			updateFields.push(`address = $${fieldCount++}`);
			fieldValues.push(address);
		}

		if (updateFields.length === 0) {
			return res.status(400).send('No update information provided');
		}

		const updateQuery = `UPDATE customers SET ${updateFields.join(', ')} WHERE customerid = $${fieldCount}`;
		fieldValues.push(userId);

		await supabase.from('customers').update(updateQuery, fieldValues);

		res.send('User updated successfully');
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
	}
});

module.exports = router;

*/