const { idSchema, productSchema } = require('./schemasProducts');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', result: '"id" must be a number' };

  return { type: null, result: null };
};

const objectType = {
  'any.required': 'INVALID_VALUE',
  'string.min': 'UNPROCESSABLE_ENTITY',
};

const validateNewProduct = (product) => {
  const { error } = productSchema.validate(product);

  if (error) {
    const { details } = error;
    const { type, message } = details[0];

    return {
      type: objectType[type], result: message,
    };
  }

  return { type: null, result: null };
};

module.exports = {
  validateId,
  validateNewProduct,
};
