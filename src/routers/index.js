const express = require('express');

const productRouter = require('./product.router');
const saleRouter = require('./sale.router');

const routers = express.Router();

routers.use('/products', productRouter);
routers.use('/sales', saleRouter);

module.exports = routers;
