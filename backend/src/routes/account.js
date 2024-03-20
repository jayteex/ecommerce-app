// backend/src/routes/account.js
const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase'); 

router.put('/', async (req, res) => {
    try {
        const { customerid, firstname, lastname, email, address, city } = req.body;
        const { data, error } = await supabase
            .from('customers')
            .update({
                firstname,
                lastname,
                email,
                address,
                city
            })
            .eq('customerid', customerid)
            .select();
        if (error) {
            throw error;
        }
        console.log("Account route: ", data);
        res.status(200).send(data[0]);
    } catch (error) {
        console.error('Error updating account:', error.message);
        res.status(500).send('Error updating account');
    }
});

module.exports = router;
