const { idSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', result: '"id" must be a number' };

  return { type: null, result: null };
};

module.exports = {
  validateId,
};
