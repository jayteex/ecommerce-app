const express = require('express');
const app = express();
const port = 3000;
const pool = require('./config/dbConfig.js');

// Include the routes
const productRoutes = require('../src/routes/products.js'); // Adjust the path as necessary

// Middleware to parse JSON bodies
app.use(express.json());

// Use the product routes
app.use('/products', productRoutes);


app.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products');
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message); // Send back the error message to the client for debugging purposes
  }
});

app.listen(port, () => {
  console.log(`Ecommerce app listening on port ${port}`)
})

