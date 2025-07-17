const Joi = require('joi');

const userValidationSchema = Joi.object({
  fullname: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required()
});

module.exports = userValidationSchema;