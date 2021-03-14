const schemas = require('./schemas');
const InvalidRequest = require('../exceptions/invalidRequest');
const customerRepository = require('../repository/customerRepository');

const validator = async (schema, body, params) => {
  if (schemas[schema]) {
    const schemaValidator = schemas[schema];
    // schema options
    const options = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
      errors: {
        wrap: {
          label: '',
        },
      },
    };

    // validate request body against schema
    const {error, value} = await schemaValidator.validate(body, options);
    if (error) {
      const {details} = error;
      const message = details.map((i) => i.message).join(',');
      throw new InvalidRequest(message);
    }

    if (!Object.keys(value).length) {
      throw new InvalidRequest('Required values!');
    }

    if (value.email &&
        (schema === 'createCustomer' || schema === 'updateCustomer')) {
      const customer = await customerRepository.findByEmail(value.email);
      if (customer !== null) {
        if ((schema === 'createCustomer') ||
            (schema === 'updateCustomer' && customer.id !==
                Number(params.id))) {
          throw new InvalidRequest('Email already registered!');
        }
      }
    }
    return value;
  }
  return true;
};
module.exports = validator;
