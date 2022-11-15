const { productService } = require('../services');
const errorMapper = require('../utils/errorMapper');

const listProducts = async (_req, res) => {
  const { type, result } = await productService.findAll();

  if (type) return res.status(errorMapper.mapper(type)).json({ message: result });

  res.status(200).json(result);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, result } = await productService.findById(id);

  if (type) return res.status(errorMapper.mapper(type)).json({ message: result });

  res.status(200).json(result);
};

const createProduct = async (req, res) => {
  const product = req.body;

  const { result } = await productService.addProduct(product);

  res.status(201).json(result);
};

module.exports = {
  listProducts,
  getProduct,
  createProduct,
};
