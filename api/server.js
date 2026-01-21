const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

module.exports = app;
