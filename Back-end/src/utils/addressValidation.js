const Joi = require('joi');

const validateAddress = (addressData) => {
  const scheema = Joi.object({
    district: Joi.string().required(),
    // peopleId: Joi.number().required(),
    street: Joi.string().required(),
    number: Joi.number().required(),
    complement: Joi.string().min(10).required(),
  });
  return scheema.validate(addressData);
};

module.exports = {
  validateAddress,
};
