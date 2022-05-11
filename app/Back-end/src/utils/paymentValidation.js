const Joi = require('joi');
const errorHandler = require('../utils/errorHandler');
const { badRequest } = require('../utils/statusCode');
const { People } = require('../database/models');

const schema = Joi.object({
  value: Joi.number().required(),
  peopleId: Joi.number().required(),
});

const validatePayment = async (paymentData) => {
  const { error } = schema.validate(paymentData);
  const month = (new Date().getMonth() + 1).toString();
  if (error) throw errorHandler(badRequest, error.message);

  const people = await People.findByPk(paymentData.peopleId, { raw: true });
  if (!people)
    throw errorHandler(
      badRequest,
      'Não é possivel registrar pagamento para pessoa não cadastrada',
    );
  if (people.paymentMonth === month)
    throw errorHandler(badRequest, 'Pagamento já registrado');
};

module.exports = {
  validatePayment,
};
