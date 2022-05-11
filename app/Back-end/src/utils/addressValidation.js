const Joi = require('joi');

const validateAddress = (addressData) => {
  const scheema = Joi.object({
    district: Joi.string().required(),
    street: Joi.string().required(),
    number: Joi.number().required(),
    complement: Joi.string().min(10).required(),
    peopleId: Joi.number().required(),
  });
  return scheema.validate(addressData);
};

module.exports = {
  validateAddress,
};
