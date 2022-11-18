const { productModel } = require('../models');
const {
  validateId,
  validateNewProduct,
} = require('./validations/validationsProducts');

const findAll = async () => {
  const products = await productModel.selectAll();

  if (products.length === 0) {
    return {
      type: 'EMPTY_LIST',
      result: 'There is no registered product',
    };
  }

  return { type: null, result: products };
};

const findById = async (id) => {
  const error = validateId(id);
  if (error.type) return error;

  const result = await productModel.selectById(id);
  if (!result) {
    return { type: 'PRODUCT_NOT_FOUND', result: 'Product not found' };
  }
  return { type: null, result };
};

const addProduct = async (product) => {
  const error = validateNewProduct(product);
  if (error.type) return error;

  const insertId = await productModel.insert(product);
  const newProduct = await productModel.selectById(insertId);

  return { type: null, result: newProduct };
};

const updateProduct = async (id, name) => {
  let error = validateId(id);
  if (error.type) return error;

  error = validateNewProduct({ name });
  if (error.type) return error;

  const result = await productModel.selectById(id);
  if (!result) {
    return { type: 'PRODUCT_NOT_FOUND', result: 'Product not found' };
  }

  await productModel.updateProduct(id, name);
  const updatedProduct = await productModel.selectById(id);

  return { type: null, result: updatedProduct };
};

const deleteProduct = async (id) => {
  const error = validateId(id);
  if (error.type) return error;

  const result = await productModel.selectById(id);
  if (!result) {
    return { type: 'PRODUCT_NOT_FOUND', result: 'Product not found' };
  }

  await productModel.deleteProduct(id);

  return { type: null };
};

const searchProduct = async (searchTerm) => {
  const result = await productModel.searchProduct(searchTerm);

  return { type: null, result };
};

module.exports = {
  findAll,
  findById,
  addProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};
