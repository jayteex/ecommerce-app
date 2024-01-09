const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig'); 

// GET endpoint to retrieve all orders for a user
router.get('/', async (req, res) => {
    // Assuming user ID is obtained from authenticated session or token
    const userId = req.session.userId; // or however you have implemented authentication

    try {
        const ordersQuery = 'SELECT * FROM orders WHERE customerid = $1';
        const { rows: orders } = await db.query(ordersQuery, [userId]);
        
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// GET endpoint to retrieve details of a specific order
router.get('/:orderId', async (req, res) => {
    const { orderId } = req.params;
    // Again, assuming you can verify the user has rights to view this order

    try {
        const orderDetailsQuery = 'SELECT * FROM orderdetails WHERE orderid = $1';
        const { rows: orderDetails } = await db.query(orderDetailsQuery, [orderId]);

        if (orderDetails.length === 0) {
            return res.status(404).send('Order not found');
        }

        res.json(orderDetails);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;