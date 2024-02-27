// backend/src/routes/products.js
const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase'); 

// GET all products or filter by category
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        let { data: products, error } = await supabase
            .from('products')
            .select('*');

        if (error) {
            throw error;
        }
        if (category) {
            ({ data: products, error } = await supabase
                .from('products')
                .select('*')
                .eq('categoryid', category));

            if (error) {
                throw error;
            }
        }
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// GET a single product by ID
router.get('/:productId', async (req, res) => {
    try {
        const { productId } = req.params;

        const { data: product, error } = await supabase
            .from('products')
            .select('*')
            .eq('productid', productId)
            .single();

        if (error) {
            throw error;
        }

        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;

