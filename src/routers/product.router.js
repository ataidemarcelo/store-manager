const express = require('express');

const { productController } = require('../controllers');

const router = express.Router();

router.get('/', productController.listProducts);
router.get('/:id', productController.getProduct);
router.put('/:id', productController.updateProduct);
router.post('/', productController.createProduct);

module.exports = router;
