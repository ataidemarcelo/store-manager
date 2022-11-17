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

  const { type, result } = await productService.addProduct(product);

  if (type) return res.status(errorMapper.mapper(type)).json({ message: result });

  res.status(201).json(result);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { type, result } = await productService.updateProduct(Number(id), name);

  if (type) return res.status(errorMapper.mapper(type)).json({ message: result });

  return res.status(200).json(result);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { type, result } = await productService.deleteProduct(Number(id));

  if (type) return res.status(errorMapper.mapper(type)).json({ message: result });

  return res.status(204).end();
};

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
