const Joi = require('joi');
const errorHandler = require('../utils/errorHandler');
const { badRequest } = require('../utils/statusCode');
const { Payment, People } = require('../database/models');

const schema = Joi.object({
  value: Joi.number().required(),
  peopleId: Joi.number().required(),
});

const validatePayment = async (paymentData) => {
  const { error } = schema.validate(paymentData);
  if (error) throw errorHandler(badRequest, error.message);

  const people = await People.findByPk(paymentData.peopleId);
  if (!people)
    throw errorHandler(
      badRequest,
      'Não é possivel registrar pagamento para pessoa não cadastrada',
    );

  const {
    dataValues: { payments },
  } = people;
};

module.exports = {
  validatePayment,
};
