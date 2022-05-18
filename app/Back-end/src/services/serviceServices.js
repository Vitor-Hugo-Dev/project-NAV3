const { Service } = require('../database/models');
const errorHandler = require('../utils/errorHandler');
const { badRequest } = require('../utils/statusCode');
const {
  createServiceValidations,
  updateServiceValidation,
  deleteServiceValidation,
} = require('../utils/serviceValidations');

module.exports = {
  createServiceService: async (serviceData) => {
    try {
      await createServiceValidations(serviceData);
      const service = await Service.create(serviceData);
      return service;
    } catch (err) {
      throw errorHandler(badRequest, err.message);
    }
  },
  updateServiceService: async (newServiceData, sku) => {
    try {
      await updateServiceValidation(newServiceData, sku);
      const serviceUpdated = await Service.update(newServiceData, {
        where: { sku },
      });
      return serviceUpdated;
    } catch (err) {
      throw errorHandler(badRequest, err.message);
    }
  },
  getAllServicesService: async () => {
    try {
      const services = await Service.findAll();
      return services;
    } catch (err) {
      throw errorHandler(badRequest, err.message);
    }
  },
  deleteServiceService: async (sku) => {
    try {
      await deleteServiceValidation(sku);
      await Service.destroy({ where: { sku } });
    } catch (err) {
      throw errorHandler(badRequest, err.message);
    }
  },
};
