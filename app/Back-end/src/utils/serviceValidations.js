const { Service } = require('../database/models');
const Joi = require('joi');
const errorHandler = require('./errorHandler');
const { badRequest } = require('./statusCode');

const scheema = Joi.object({
  sku: Joi.number().required(),
  serviceName: Joi.string().min(5).required(),
});

const validateScheema = (serviceData) => {
  const { error } = scheema.validate(serviceData);
  if (error) throw errorHandler(badRequest, error.message);
};

/**
 * verifySkuExists - dynamic function that verifies if the sku exists in create
 * and update a service.
 */
const verifySkuExists = async (sku, skuUpdate) => {
  const skuVerify = await Service.findByPk(sku);
  if (!skuUpdate) {
    if (skuVerify)
      throw errorHandler(badRequest, 'this sku code already exists');
  } else {
    const skuUpdateVerify = await Service.findByPk(skuUpdate);
    if (!skuVerify)
      throw errorHandler(badRequest, 'this service does not exist');
    else if (parseInt(sku) !== parseInt(skuUpdate) && skuUpdateVerify)
      throw errorHandler(badRequest, 'this new sku code already exists');
  }
};

module.exports = {
  createServiceValidations: async (serviceData) => {
    validateScheema(serviceData);
    await verifySkuExists(serviceData.sku);
  },
  updateServiceValidation: async (serviceData, sku) => {
    validateScheema(serviceData);
    await verifySkuExists(sku, serviceData.sku);
  },
  deleteServiceValidation: async (sku) => {
    const skuVerify = await Service.findByPk(sku);
    if (!skuVerify)
      throw errorHandler(badRequest, 'this service does not exist');
  },
};
