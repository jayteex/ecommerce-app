const express = require('express');
const router = express.Router();

let db;

// GET endpoint to retrieve all orders for a user
router.get('/', async (req, res) => {
    // How to specifically get the user id has to still be implememted 
    // This is one way of doing it
    // Session code needs to be updated 
    const userId = req.session.userId; 

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
    // More logic is needed

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