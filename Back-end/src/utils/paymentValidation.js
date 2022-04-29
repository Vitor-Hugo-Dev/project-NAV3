const Joi = require('joi');
const errorHandler = require('../utils/errorHandler');
const { badRequest } = require('../utils/statusCode');
const { Payment } = require('../database/models');

const schema = Joi.object({
  value: Joi.number().required(),
  peopleId: Joi.number().required(),
});
