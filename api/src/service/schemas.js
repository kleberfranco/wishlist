const Joi = require('joi');
const schemas = {
  createCustomer: Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().lowercase().trim().email().required(),
  }),
  updateCustomer: Joi.object({
    name: Joi.string().trim().empty(''),
    email: Joi.string().lowercase().trim().email().empty(''),
    active: Joi.string().empty(''),
  }),
  createWishlist: Joi.object({
    products: Joi.array().required(),
  }),
};
module.exports = schemas;
