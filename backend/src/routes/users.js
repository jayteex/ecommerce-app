const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig'); 
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

/** 
@swagger
 * /users:
 *   get:
 * 
 * 
 * 
 * 
*/

// GET a single user by ID
router.get('/:userId', async (req, res) => {
	try {
		const { userId } = req.params;
		const { rows } = await db.query('SELECT * FROM customers WHERE customerid = $1', [userId]);

		if (rows.length === 0) {
			return res.status(404).send('User not found');
		}

		const user = rows[0];
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
	body('name').optional().notEmpty(),
	body('address').optional().notEmpty(),
	body('phone').optional().notEmpty(),
], async (req, res) => {
	try {
		const { userId } = req.params;
		const { name, email, password, address, phone } = req.body;
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		let updateFields = [];
		let fieldValues = [];
		let fieldCount = 1;

		if (name) {
			updateFields.push(`name = $${fieldCount++}`);
			fieldValues.push(name);
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
		if (phone) {
			updateFields.push(`phone = $${fieldCount++}`);
			fieldValues.push(phone);
		}

		if (updateFields.length === 0) {
			return res.status(400).send('No update information provided');
		}

		const updateQuery = `UPDATE customers SET ${updateFields.join(', ')} WHERE customerid = $${fieldCount}`;
		fieldValues.push(userId);

		// Debugging
		console.log("Update Query:", updateQuery);
		console.log("Field Values:", fieldValues);

		await db.query(updateQuery, fieldValues);

		res.send('User updated successfully');
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
	}
});

module.exports = router;