// backend/src/routes/cart.js
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const supabase = require('../config/supabase'); 

router.post('/add', async (req, res) => {
  try {
    const cartid = req.session.cartid;
    const { productid } = req.body;

    // Check if the product ID exists in the table
    const { data: existingProduct } = await supabase
      .from('cartitems')
      .select('quantity')
      .eq('cartid', cartid)
      .eq('productid', productid)
      .single();

    if (!existingProduct) {
      // If the product ID doesn't exist, insert it with a quantity of 1
      const { error: insertError } = await supabase
        .from('cartitems')
        .insert([{ cartid, productid, quantity: 1 }]);

      if (insertError) {
        console.error('Error inserting product:', insertError);
        return res.status(500).json({ error: 'Internal server error' });
      }
    } else {
      // If the product ID exists, update its quantity by incrementing the old quantity by 1
      const { error: updateError } = await supabase
        .from('cartitems')
        .update({ quantity: existingProduct.quantity + 1 })
        .eq('cartid', cartid)
        .eq('productid', productid);

      if (updateError) {
        console.error('Error updating quantity:', updateError);
        return res.status(500).json({ error: 'Internal server error' });
      }
    }

    res.status(200).json(req.session.cartid);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/items', async (req, res) => {
  try {
    const cartid = req.session.cartid;

    // Query cart items based on cartid
    const { data: cartItems, error: cartItemsError } = await supabase
      .from('cartitems')
      .select('productid, quantity')
      .eq('cartid', cartid);

    if (cartItemsError) {
      throw cartItemsError;
    }

    // Fetch product details for each productid
    const productsPromises = cartItems.map(async (item) => {
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('productid, name, price, image_url') // Include productid in the selection
        .eq('productid', item.productid)
        .single();
    
      if (productError) {
        throw productError;
      }
    
      return {
        ...productData,
        quantity: item.quantity,
      };
    });

    const productsData = await Promise.all(productsPromises);

    res.json(productsData);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/updateQuantity', async (req, res) => {
  try {
    const cartid = req.session.cartid;
    const { productid, quantity } = req.body;

    // Update the quantity of the product in the cartitems table
    const { error: updateError } = await supabase
      .from('cartitems')
      .update({ quantity })
      .eq('cartid', cartid)
      .eq('productid', productid);

    if (updateError) {
      throw updateError;
    }

    res.status(200).send('Quantity updated successfully');
  } catch (error) {
    console.error('Error updating quantity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;



