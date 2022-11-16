const { saleService } = require('../services');
const errorMapper = require('../utils/errorMapper');

const createSale = async (req, res) => {
  const sales = req.body;

  const { type, result } = await saleService.addSale(sales);

  if (type) return res.status(errorMapper.mapper(type)).json({ message: result });

  res.status(201).json(result);
};

module.exports = {
  createSale,
};
