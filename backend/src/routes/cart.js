const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');

// This route still needs to be connected to the frontend (Redux) logic

// POST endpoint to add items to a cart
router.post('/:cartId', async (req, res) => {
  const { cartId } = req.params;
  const { productid, quantity } = req.body;

  try {
    // Check if the cart exists
    const { data: cart, error: cartError } = await supabase
      .from('cart')
      .select('*')
      .eq('cartid', cartId)
      .single();

    if (cartError) {
      console.error(cartError);
      return res.status(500).send('Server error');
    }

    if (!cart) {
      return res.status(404).send('Cart not found');
    }

    // Add item to cartitems
    const { error: addItemError } = await supabase
      .from('cartitems')
      .insert([{ cartid: cartId, productid, quantity }]);

    if (addItemError) {
      console.error(addItemError);
      return res.status(500).send('Server error');
    }

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
    const { data: cartItems, error: cartItemsError } = await supabase
      .from('cartitems')
      .select('*')
      .eq('cartid', cartId);

    if (cartItemsError) {
      console.error(cartItemsError);
      return res.status(500).send('Server error');
    }

    res.json(cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
