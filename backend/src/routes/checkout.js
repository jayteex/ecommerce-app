const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig'); 

// POST endpoint for checkout
router.post('/cart/:cartId/checkout', async (req, res) => {
    const { cartId } = req.params;

    try {
        // Validate the cart
        const cartResult = await db.query('SELECT * FROM cart WHERE cartid = $1', [cartId]);
        if (cartResult.rows.length === 0) {
            return res.status(404).send('Cart not found');
        }

        // Simulate payment processing
        // For now, assume payment is always successful
        // In a real scenario, integration with a payment gateway would be necessary

        // Create an order
        const customerId = cartResult.rows[0].customerid; // Is customerid in cart?
        const createOrderQuery = 'INSERT INTO orders (customerid, orderdate, status) VALUES ($1, NOW(), $2) RETURNING orderid';
        const orderResult = await db.query(createOrderQuery, [customerId, 'Processed']);
        const orderId = orderResult.rows[0].orderid;

        // Add items from cart to orderdetails
        const cartItemsResult = await db.query('SELECT * FROM cartitems WHERE cartid = $1', [cartId]);
        for (const item of cartItemsResult.rows) {
            const insertOrderDetailQuery = 'INSERT INTO orderdetails (orderid, productid, quantity, price) VALUES ($1, $2, $3, $4)';
            // Placeholder value for price used here.
            await db.query(insertOrderDetailQuery, [orderId, item.productid, item.quantity, 10]); // Replace 10 with actual price. Connection with products needed
        }

        res.status(201).send('Checkout successful');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;