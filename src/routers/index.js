const express = require('express');
const productRouter = require('./product.router');

const routers = express.Router();

routers.use('/products', productRouter);

module.exports = routers;
