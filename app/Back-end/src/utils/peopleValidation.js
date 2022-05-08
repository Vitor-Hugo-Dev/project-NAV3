const Joi = require('joi');
const { People } = require('../database/models');
const errorHandler = require('../utils/errorHandler');
const { badRequest } = require('../utils/statusCode');

const peopleValidation = async (peopleData) => {
  const isRegistered = await People.findOne({
    where: { cpf: peopleData.cpf },
  });
  if (isRegistered) throw errorHandler(badRequest, 'Pessoa já cadastrada!');

  const schema = Joi.object({
    fullName: Joi.string().min(10).required(),
    cpf: Joi.string()
      .length(14)
      .pattern(/^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/)
      .required(),
    birthDate: Joi.string().required(),
  }).options({ abortEarly: false });

  return schema.validate(peopleData);
};

module.exports = {
  peopleValidation,
};
