const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');

// GET endpoint to retrieve all orders for a user
router.get('/', async (req, res) => {
  // How to specifically get the user id has to still be implememted 
  // This is one way of doing it
  // Session code needs to be updated 
  const userId = req.session.userId;

  try {
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .eq('customerid', userId);

    if (ordersError) {
      console.error(ordersError);
      return res.status(500).send('Server error');
    }

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
    const { data: orderDetails, error: orderDetailsError } = await supabase
      .from('orderdetails')
      .select('*')
      .eq('orderid', orderId);

    if (orderDetailsError) {
      console.error(orderDetailsError);
      return res.status(500).send('Server error');
    }

    if (!orderDetails || orderDetails.length === 0) {
      return res.status(404).send('Order not found');
    }

    res.json(orderDetails);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
