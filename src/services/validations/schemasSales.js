const Joi = require('joi');

const fieldsSaleSchema = Joi.object({
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
}).options({ abortEarly: true });

module.exports = {
  fieldsSaleSchema,
};
