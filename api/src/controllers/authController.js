const auth = require('../auth');
const Joi = require('joi');

exports.createToken = function(req, res) {
  // create schema object
  const schema = Joi.object({
    user: Joi.string().required(),
    role: Joi.string().valid('Admin', 'User', 'App').required(),
  });
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
  const {error, value} = schema.validate(req.body, options);
  if (error) {
    res.status(403);
    res.json(`${error.details.map((x) => x.message).join(', ')}`);
  }

  const token = auth.generateAccessToken({username: value.user});
  res.json({'token': token});
};

