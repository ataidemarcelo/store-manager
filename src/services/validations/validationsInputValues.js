const { idSchema, productSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', result: '"id" must be a number' };

  return { type: null, result: null };
};

const validateNewProduct = (product) => {
  const { error } = productSchema.validate(product);

  if (error) {
    const { details } = error;
    const { type, message } = details[0];
    console.log(type);

    if (type === 'any.required') {
      return {
        type: 'INVALID_VALUE', result: message,
      };
    }

    if (type === 'string.min') {
      return {
        type: 'UNPROCESSABLE_ENTITY', result: message,
      };
    }
  }

  return { type: null, result: null };
};

module.exports = {
  validateId,
  validateNewProduct,
};
