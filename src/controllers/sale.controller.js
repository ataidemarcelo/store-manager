const { saleService } = require('../services');
const errorMapper = require('../utils/errorMapper');

const createSale = async (req, res) => {
  const sales = req.body;

  const { type, result } = await saleService.addSale(sales);

  if (type) return res.status(errorMapper.mapper(type)).json({ message: result });

  res.status(201).json(result);
};

const listSales = async (req, res) => {
  const { type, result } = await saleService.findAllSales();

  if (type) return res.status(errorMapper.mapper(type)).json({ message: result });

  res.status(200).json(result);
};

const getSale = async (req, res) => {
  const { id } = req.params;
  const { type, result } = await saleService.findSaleById(Number(id));

  if (type) return res.status(errorMapper.mapper(type)).json({ message: result });

  res.status(200).json(result);
};

module.exports = {
  createSale,
  listSales,
  getSale,
};
