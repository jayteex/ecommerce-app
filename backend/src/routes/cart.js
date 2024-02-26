const express = require('express');
const router = express.Router();

let db;

// POST endpoint to add items to a cart
router.post('/:cartId', async (req, res) => {
    const { cartId } = req.params;
    const { productid, quantity } = req.body;

    try {
        // Optionally, validate productid and quantity here

        // Check if the cart exists
        const cartExists = await db.query('SELECT * FROM cart WHERE cartid = $1', [cartId]);
        if (cartExists.rows.length === 0) {
            return res.status(404).send('Cart not found');
        }

        // Add item to cartitems
        const addItemQuery = 'INSERT INTO cartitems (cartid, productid, quantity) VALUES ($1, $2, $3)';
        await db.query(addItemQuery, [cartId, productid, quantity]);

        res.status(201).send('Item added to cart');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// GET endpoint to retrieve the contents of a cart
router.get('/:cartId', async (req, res) => {
    const { cartId } = req.params;

    try {
        // Fetch the items in the cart
        const getItemsQuery = 'SELECT * FROM cartitems WHERE cartid = $1';
        const cartItems = await db.query(getItemsQuery, [cartId]);

        res.json(cartItems.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;