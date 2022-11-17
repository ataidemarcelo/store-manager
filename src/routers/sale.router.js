const express = require('express');

const { saleController } = require('../controllers');

const router = express.Router();

router.get('/', saleController.listSales);
router.get('/:id', saleController.getSale);
router.delete('/:id', saleController.deleteSale);
router.post('/', saleController.createSale);

module.exports = router;
