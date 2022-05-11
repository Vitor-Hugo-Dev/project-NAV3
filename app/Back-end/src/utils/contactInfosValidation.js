const Joi = require('joi');
const errorHandler = require('./errorHandler');
const { badRequest } = require('./statusCode');

const scheema = Joi.object({
  peopleId: Joi.number().required(),
  phoneNumber: Joi.string().min(15).required(),
  email: Joi.string().required(),
});
module.exports = {
  validateCreateContactInfos: (data) => {
    const { error } = scheema.validate(data);

    if (error) throw errorHandler(badRequest, error.message);
  },
};
