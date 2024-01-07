// routes/products.js
const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig.js'); 

// GET all products or filter by category
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        let query = 'SELECT * FROM products';
        const params = [];

        if (category) {
            query += ' WHERE categoryid = $1';
            params.push(category);
        }

        const { rows } = await db.query(query, params);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// GET a single product by ID
router.get('/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const { rows } = await db.query('SELECT * FROM products WHERE productid = $1', [productId]);

        if (rows.length === 0) {
            return res.status(404).send('Product not found');
        }

        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Add more CRUD endpoints as needed here

module.exports = router;
