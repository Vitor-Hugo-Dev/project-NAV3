const Joi = require('joi');
const errorHandler = require('./errorHandler');
const { badRequest } = require('./statusCode');

const scheema = Joi.object({
  district: Joi.string().required(),
  neighborhood: Joi.string().required(),
  street: Joi.string().required(),
  number: Joi.number().required(),
  peopleId: Joi.number().required(),
  complement: Joi.string(),
});

module.exports = {
  validateAddress: (addressData) => {
    const { error } = scheema.validate(addressData);
    if (error) throw errorHandler(badRequest, error.message);
  },
};
