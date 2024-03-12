const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');

// Checkout frontend logic still TO DO

// POST endpoint for checkout
router.post('/cart/:cartId/checkout', async (req, res) => {
  const { cartId } = req.params;

  try {
    // Validate the cart
    const { data: cart, error: cartError } = await supabase
      .from('cart')
      .select('customerid')
      .eq('cartid', cartId)
      .single();

    if (cartError) {
      console.error(cartError);
      return res.status(500).send('Server error');
    }

    if (!cart) {
      return res.status(404).send('Cart not found');
    }

    // Create an order
    const { customerid: customerId } = cart;
    const { data: insertedOrder, error: insertOrderError } = await supabase
      .from('orders')
      .insert([{ customerid: customerId, orderdate: new Date(), status: 'Processed' }]);

    if (insertOrderError) {
      console.error(insertOrderError);
      return res.status(500).send('Server error');
    }

    const orderId = insertedOrder[0].orderid;

    // Add items from cart to orderdetails
    const { data: cartItems, error: cartItemsError } = await supabase
      .from('cartitems')
      .select('*')
      .eq('cartid', cartId);

    if (cartItemsError) {
      console.error(cartItemsError);
      return res.status(500).send('Server error');
    }

    for (const item of cartItems) {
      const { productid, quantity } = item;
      // Placeholder value for price used here.
      await supabase
        .from('orderdetails')
        .insert([{ orderid: orderId, productid, quantity, price: 10 }]); // Replace 10 with actual price. Connection with products needed
    }

    res.status(201).send('Checkout successful');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
