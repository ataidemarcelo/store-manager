const { productModel } = require('../models');
const { validateId } = require('./validations/validationsInputValues');

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

module.exports = {
  findAll,
  findById,
};