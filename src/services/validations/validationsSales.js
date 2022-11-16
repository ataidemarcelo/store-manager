const { fieldsSaleSchema } = require('./schemasSales');
const productModel = require('../../models/product.model');

const objectType = {
  'any.required': 'INVALID_VALUE',
  'number.min': 'UNPROCESSABLE_ENTITY',
};

const validateFields = (sales) => {
  let result = { type: null, result: null };
  let firstError = false;

  sales.forEach((sale) => {
    const { error } = fieldsSaleSchema.validate(sale);
    if (error && !firstError) {
      const { details } = error;
      const { type, message } = details[0];
      firstError = true;

      result = {
        type: objectType[type], result: message,
      };
    }
  });

  return result;
};

const validateProductExists = async (sales) => {
  let result = { type: null, result: null };
  const promisesProductExist = sales.map((sale) => productModel.selectById(sale.productId));

  const checkProductExist = await Promise.all(promisesProductExist);

  const productExist = checkProductExist.every((value) => typeof value === 'object');

  if (!productExist) {
    result = { type: 'PRODUCT_NOT_FOUND', result: 'Product not found' };
  }

  return result;
 };

module.exports = {
  validateProductExists,
  validateFields,
};
